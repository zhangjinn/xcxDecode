import wepy, { Event } from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { clone, indexOf, remove, add, forEach, findIndex, includes, length } from 'ramda';
import CommonMixin from '@/mixins/common';
import { fillZero, } from '@/utils/index';
import { getInvStatusType } from '@/store/actions/dmsorder';
import { getOutWarehouseOrderDetail,getOutWarehouseOrderList,getOutWarehouseList, getInvStatusList, getInvBatch, salesOrderOut,getInvQty, getModelByBarCode } from '@/store/actions/dmsoutwarehouse';
import { DMS_OUT_WAREHOUSE_CHG } from '@/store/types/dmsoutwarehouse';
import Toast from '@/components/vant/toast/toast';
import Dialog from '@/components/vant/dialog/dialog';
import utilsWxs from '../../../../wxs/utils.wxs';
import { dmsRequest } from '@/store/actions/dmsrequest';
interface Data {
  warehouseVisible: boolean;
  invBatchVisible: boolean;
  invStatusVisible: boolean;
  invStatusTypeVisible:boolean;
  itemIndex: Number,
  outIndex: Number,
  currentInvBatchList: any[];
  orderDetail: object;
  barCode: string;
  isSubmitBarCode: boolean;
  invStatusTypeList: [];
  btnLoading: false;
  dataSource: string;
  isCanOutbound: boolean;
}
//invStatusType
const stores = getStore()

@connect({
  warehouseList({ dmsoutwarehouse }) {
    return dmsoutwarehouse.warehouseList
  },
  invStatusList({ dmsoutwarehouse }) {
    return dmsoutwarehouse.invStatusList
  },
  invStatusTypeList({ dmsorder }){
    return dmsorder.invStatusType
  }
}, {
  getOutWarehouseOrderList,
  getOutWarehouseList,
  getInvStatusList,
  salesOrderOut,
  getInvStatusType
  // getOutWarehouseOrderDetail,
})
export default class List extends wepy.page {
  config = {
    navigationBarTitleText: '订单详情',
    usingComponents: {
      'van-icon': '/components/vant/icon/index',
      'van-popup': '/components/vant/popup/index',
      'van-field': '/components/vant/field/index',
      'van-toast': '/components/vant/toast/index',
      'van-picker': '/components/vant/picker/index',
      'van-stepper': '/components/vant/stepper/index',
      'van-dialog': '/components/vant/dialog/index',
      'van-checkbox': '/components/vant/checkbox/index',
      'van-button': '/components/vant/button/index',
    },
  };
  wxs = {
    utils: utilsWxs,
  };
  mixins = [ CommonMixin ];
  data: Data = {
    warehouseVisible: false,
    invBatchVisible: false,
    invStatusVisible: false,
    invStatusTypeVisible: false,
    itemIndex: 0,
    outIndex: 0,
    currentInvBatchList: [],
    orderDetail: {},
    barCode: '',
    isSubmitBarCode: false,
    invStatusTypeList: [],
    btnLoading: false,
    showBUcha: null,
    dataSource: '',
    isCanOutbound: true
  }
  methods = {
     // 根据销售组织判断是否显示不差类型
     getBucha:(orgId)=>{
      const app = this
      dmsRequest({
        data: {
          'cisCode': wepy.$instance.globalData.cisCode,
          'orgCode': orgId
        },
        method: 'isEnableOrNot'
      }).then((res) => {
        this.showBUcha = res.data
        app.$apply()

      })

    },
    onDmsGoodsItems:(itemIndex: any,evt: { detail: string; }) => {
      let isNumber = /^(([1-9]{1}\d*)(\.\d{0,2})?|(0{1}\.\d{0,2}))$/
      const newOrderDetail = clone(this.orderDetail)
      if (evt.detail !== '') {
        if (isNumber.test(evt.detail)) {
          newOrderDetail.salesOrderItem[itemIndex].bprice = parseFloat(evt.detail)
          newOrderDetail.salesOrderItem[itemIndex].acknowledgedAmount = newOrderDetail.salesOrderItem[itemIndex].backnowledgedQty * (100 * parseFloat(evt.detail))/100

        } else {
          Toast.fail({
            message: '请输入正确的数字',
            duration: 2000,
          })
        }
      } else {
        newOrderDetail.salesOrderItem[itemIndex].bprice = 0
        newOrderDetail.salesOrderItem[itemIndex].acknowledgedAmount = 0
      }
      this.orderDetail = newOrderDetail
    },
    onShippedBqtyChg(evt: Event) {
      const { detail, target: { dataset: { itemIndex, outIndex } } } = evt
      // bug:  触发两次
      if (typeof detail === 'undefined') {
        return
      }
      const newOrderDetail = clone(this.orderDetail)
      newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].shippedBqty = detail
      this.orderDetail = newOrderDetail
    },
    onToggleWarehouse(evt: { target: { dataset: { itemIndex: any; outIndex: any; }; }; }) {
      //分销商发起的渠道采购订单，销售出库时，仓库和库存状态不可修改
      if(this.orderDetail.documentType === 'normal' && this.orderDetail.purchaseNum !== ''){
        return;
      }
      const { target: { dataset: { itemIndex, outIndex } } } = evt
      this.itemIndex = itemIndex
      this.outIndex = outIndex
      const picker = this.$wxpage.selectComponent('#out-warehouse-detail-warehouse-picker')
      const { warehouseName } = this.orderDetail.salesOrderItem[itemIndex].outItems[outIndex]
      picker.setColumnValue(0, warehouseName)
      this.toggleWarehouse()
    },
    onCloseWarehouse() {
      this.toggleWarehouse()
    },
    onWarehouseCancel() {
      this.toggleWarehouse()
    },
    async onWarehouseConfirm(evt: { detail: { value: { id: any; value: any; }; }; }) {
      const { itemIndex, outIndex } = this
      const { detail: { value: { id, value } } } = evt
      const newOrderDetail = clone(this.orderDetail)
      const { productCode, warehouseId,invStatusId,invStatusType } = newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex]
      if(warehouseId !== id) {
        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].warehouseId = id
        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].warehouseName = value
        const { invBatchId, invBatchName, invBatchList,bavailQty } = await this.getInvBatchWithHandle({ productCode, warehouseId: id,invStatusId,invStatusType })
        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchId = invBatchId
        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchName = invBatchName
        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchList = invBatchList
        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = bavailQty
        this.orderDetail = newOrderDetail
      }
      this.toggleWarehouse()
      this.$apply()
    },
    onToggleInvBatch(evt: { target: { dataset: { itemIndex: any; outIndex: any; }; }; }) {
      const { target: { dataset: { itemIndex, outIndex } } } = evt
      this.itemIndex = itemIndex
      this.outIndex = outIndex
      const newOrderDetail = clone(this.orderDetail)
      this.currentInvBatchList = newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchList
      if (this.currentInvBatchList.length > 0) {
        const picker = this.$wxpage.selectComponent('#out-warehouse-detail-batch-picker')
        const { invBatchName } = this.orderDetail.salesOrderItem[itemIndex].outItems[outIndex]
        picker.setColumnValue(0, invBatchName)
        this.toggleInvBatch()
      }
    },
    onCloseInvBatch(){
      this.toggleInvBatch()
    },
    onInvBatchCancel() {
      this.toggleInvBatch()
    },
    // 批次确认
    onInvBatchConfirm(evt: { detail: { value: { id: any; value: any; }; }; }) {
      const { itemIndex, outIndex } = this
      let that = this
      const { detail: { value: { id, value } } } = evt
      const newOrderDetail = clone(this.orderDetail)
      if(newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchId !== id) {
        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchId = id
        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchName = value
        const { productCode,warehouseId, invStatusId,invBatchId,invStatusType } = newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex]
        getInvQty({ productCode, warehouseId,invBatchId,invStatusId,invStatusType}).then((invQtyResult: any) => {

          if(invQtyResult.code === '0') {
            let qty = 0;
            if(invQtyResult.isShare === '0'){
              qty = invQtyResult.bavailqty;
            }else if(that.dataSource === 'job'){
              qty = invQtyResult.bavailqty;
            }else{
              qty = invQtyResult.bigQtyLock;
            }
            newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = qty
          }
          this.orderDetail = newOrderDetail
          this.$apply()
        })
      }
      this.toggleInvBatch()
    },

    onToggleInvStatusType(evt: { target: { dataset: { itemIndex: any; outIndex: any; }; }; }) {
      const { target: { dataset: { itemIndex, outIndex } } } = evt
      this.itemIndex = itemIndex
      this.outIndex = outIndex
      const picker = this.$wxpage.selectComponent('#out-warehouse-detail-status-type-picker')
      const { invStatusTypeName } = this.orderDetail.salesOrderItem[itemIndex].outItems[outIndex]
      picker.setColumnValue(0, invStatusTypeName)
      this.toggleInvStatusType()
    },
    onToggleInvStatus(evt: { target: { dataset: { itemIndex: any; outIndex: any; }; }; }) {
      //分销商发起的渠道采购订单，销售出库时，仓库和库存状态不可修改
      if(this.orderDetail.documentType === 'normal' && this.orderDetail.purchaseNum !== ''){
        return;
      }
      const { target: { dataset: { itemIndex, outIndex } } } = evt
      this.itemIndex = itemIndex
      this.outIndex = outIndex
      const picker = this.$wxpage.selectComponent('#out-warehouse-detail-status-picker')
      const { invStatus } = this.orderDetail.salesOrderItem[itemIndex].outItems[outIndex]
      picker.setColumnValue(0, invStatus)
      this.toggleInvStatus()
    },
    onCloseInvStatus() {
      this.toggleInvStatus()
    },
    onInvStatusCancel() {
      this.toggleInvStatus()
    },

    onCloseInvStatusType(){
      this.toggleInvStatusType()
    },
    onInvStatusTypeCancel() {
      this.toggleInvStatusType()
    },
    // 库存状态选择
    onInvStatusConfirm(evt: { detail: { value: { id: any; value: any; }; }; }) {
      const { itemIndex, outIndex } = this
      let that = this
      const { detail: { value: { id, value } } } = evt
      const newOrderDetail = clone(this.orderDetail)
      if(newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatusId !== id) {
        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatusId = id
        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatus = value
        const { productCode,warehouseId, invStatusId,invBatchId,invStatusType } = newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex]
        getInvQty({ productCode, warehouseId,invBatchId,invStatusId,invStatusType }).then((invQtyResult: any) => {
          if(invQtyResult.code === '0') {
            let qty = 0;
            if(invQtyResult.isShare === '0'){
              qty = invQtyResult.bavailqty;
            }else if(that.dataSource === 'job'){
              qty = invQtyResult.bavailqty;
            }else{
              qty = invQtyResult.bigQtyLock;
            }
            newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = qty
          }
          this.orderDetail = newOrderDetail
          this.$apply()
        }).catch((e: any) => {
          newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].bavailQty= 0
          this.orderDetail = newOrderDetail
          this.$apply()
        })
      }
      this.toggleInvStatus()
    },
    // 补差类型
    onInvStatusTypeConfirm(evt: { detail: { value: { id: any; name: any; }; }; }) {
      const { itemIndex, outIndex } = this
      let that = this
      const { detail: { value: { id, name } } } = evt
      const newOrderDetail = clone(this.orderDetail)
      if(newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatusType !== id) {
        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatusType = id
        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatusTypeName = name
        const { productCode,warehouseId, invStatusId,invBatchId,invStatusType } = newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex]


        getInvQty({ productCode, warehouseId,invBatchId,invStatusId,invStatusType}).then((invQtyResult: any) => {
          if(invQtyResult.code === '0') {
            let qty = 0;
            if(invQtyResult.isShare === '0'){
              qty = invQtyResult.bavailqty;
            }else if(that.dataSource === 'job'){
              qty = invQtyResult.bavailqty;
            }else{
              qty = invQtyResult.bigQtyLock;
            }
            newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = qty
          }
          this.orderDetail = newOrderDetail
          this.$apply()
        }).catch((e: any) => {

          newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].bavailQty= 0
          this.orderDetail = newOrderDetail
          this.$apply()
        })
      }
      this.toggleInvStatusType()
    },
    // 添加
    onAddOutItem(evt: { target: { dataset: { itemIndex: any; }; }; }) {
      const { target: { dataset: { itemIndex } } } = evt
      const newOrderDetail = clone(this.orderDetail)
      const length = newOrderDetail.salesOrderItem[itemIndex].outItems.length
      newOrderDetail.salesOrderItem[itemIndex].outItems.push(clone(newOrderDetail.salesOrderItem[itemIndex].outItems[length-1]))
      this.handleBarCode(newOrderDetail, newOrderDetail.salesOrderItem[itemIndex].model, null , 'addOutItem')
      this.orderDetail = newOrderDetail
    },
    // 删除
    onRemoveOutItem(evt: { target: { dataset: { itemIndex: any; outIndex: any; }; }; }) {
      const { target: { dataset: { itemIndex, outIndex } } } = evt
      const newOrderDetail = clone(this.orderDetail)
      const length = newOrderDetail.salesOrderItem[itemIndex].outItems.length
      if(length > 1) {
        newOrderDetail.salesOrderItem[itemIndex].outItems.splice(outIndex, 1)
        this.handleBarCode(newOrderDetail, newOrderDetail.salesOrderItem[itemIndex].model, null, 'delOutItem')
        this.orderDetail = newOrderDetail
      }
    },

    // 已出库不允许出库
    onSubmitCancel(){
      Toast.fail({
        message: '该销售单已出库，请返回！',
        duration: 2000,
      });
    },

    //判断是否是扫码订单
    onSubmitConfirmOutFrom(){
      let that = this
      const { salesOrderItem } = this.orderDetail
      let products = []
      salesOrderItem.forEach(item => {
        if (item.productLabel && item.productLabel.indexOf('15691143850') >= 0) {
          products.push(item)
        }
      })
      if(products.length>0){
        wx.showModal({
          title: '提示',
          content: '1、当天截单时间内，同批量订单达到起运量（电视3台，白电或全品类2方），则免配送费！\r\n2、当天截单时间内，同批量订单若包含至少1件单价超万元产品或激光，则免配送费！\r\n3、若不满足以上条件，将按照统仓统配合同不足起运量收费标准向您收取物流费用！\r\n⭐以上政策仅限开通统仓统配区域商家！！！',
          success: function (res) {
            if (res.confirm) {
              //防止重复点击
              if(that.btnLoading){
                return;
              }
              //防止多次触发
              that.btnLoading = true;
              //isScan=true 扫码订单
              // const { isScan } = clone(this.orderDetail)
              // let scanModel  = this.orderDetail.salesOrderItem
              //   .map(orderItem => orderItem.outItems)
              //   .flat(1)
              //   .filter(outItem => outItem.maxShippedBqty > 0 && (!outItem.barCodes || outItem.barCodes.length === 0))
              //   .map(outItem => outItem.model)
              //
              // scanModel = Array.from(new Set(scanModel))

              // if(isScan && scanModel.length > 0){
              //   //本订单需要扫码出库，您是否需要进行强制出库？
              //   Dialog.confirm({
              //     title: '出库提醒',
              //     message: `型号: ${scanModel} 需要扫码出库，您是否需要进行强制出库？`,
              //     confirmButtonText: '强制出库'
              //   }).then(() => {
              //
              //     this.onSubmitOutForm();
              //   }).catch(()=>{
              //     //cancle
              //   })
              // }else{
              //   this.onSubmitOutForm();
              // }

              that.onSubmitOutForm();
            }
          },
        })
      }else{
        //防止重复点击
        if(that.btnLoading){
          return;
        }
        //防止多次触发
        that.btnLoading = true;
        that.onSubmitOutForm();
      }


    },
    // 扫码操作
    onScanCode() {
      const context = this
      wx.scanCode({
        // onlyFromCamera: true,
        scanType: ['barCode'],
        success (res) {
          context.barCode = res.result
          context.isSubmitBarCode = true
          context.$apply()
        },
        fail (res) {
          // console.log('失败')
        },
        complete(res) {
          // context.isSubmitBarCode = true
          // context.$apply()
        }
      })

    },
    // 切换条形码选择
    onChangeBarCode(model: string, barCode: string, outIndex: number) {
      const newOrderDetail = clone(this.orderDetail)
      this.handleBarCode(newOrderDetail, model, barCode, 'update', outIndex)
      this.orderDetail = newOrderDetail
    },
    // 删除条形码
    onDelBarCode(model: string, barCode: string, outIndex: number) {
      const newOrderDetail = clone(this.orderDetail)
      this.handleBarCode(newOrderDetail, model, barCode, 'delBarCode', outIndex)
      this.orderDetail = newOrderDetail
    },
    // 确认二维码
    submitBarCode() {
      if (this.barCode && this.barCode.length != 23) {
        Toast.fail({
          message: '请输入23位条形码',
          duration: 2000,
        });
        return
      }
      const newOrderDetail = clone(this.orderDetail)
      getModelByBarCode({ barCode: this.barCode }).then(res => {
        if (res.model === '') {
          Toast.fail({
            message: '匹配条码库失败, 请重新扫描！',
            duration: 2000,
          });
          return
        }
        // 判断条形码是否匹配该订单
        const models = newOrderDetail.salesOrderItem.map(orderItem => orderItem.model)
        if (!models.includes(res.model)) {
          Toast.fail({
            message: '该条码未找到对应商品型号，请确认！',
            duration: 2000,
          });
          return
        }
        this.handleBarCode(newOrderDetail, res.model, this.barCode, 'add')
        this.orderDetail = newOrderDetail
        this.isSubmitBarCode = false;
        this.$apply()

      }).catch(() => {
      })
    },
    closeScan() {
      this.isSubmitBarCode = false;
    },
    onBarCodeChange(target) {
      const {detail} = target
      this.barCode = detail
    }
  }

  // 条形码操作
  handleBarCode = (newOrderDetail: object, model: string, barCode: string, operate: string, outIndex: number) => {
    // 判断是否是扫码出库
    if (!newOrderDetail.isScan) {
      return
    }
    newOrderDetail.salesOrderItem.forEach(item => {
      if (item.model === model) {
        switch (operate) {
          case 'add': {
            item.outItems.forEach((outItem, index) => {
              const checked = index === 0
              const isChecked = index === 0
              const bar = { barCode, checked, isChecked }
              if (!outItem.barCodes) {
                outItem.barCodes = new Array(bar)
              } else if (outItem.barCodes.findIndex(element => element.barCode === barCode) < 0) {
                outItem.barCodes.splice(0, 0, bar)
              }
            })
            break;
          }
          case 'addOutItem': {
            // 找到最后的元素把内容修改掉
            const barCodes = item.outItems
              .filter((outItem, index) => index !== item.outItems.length -1)
              .map(outItem => outItem.barCodes)
              .flat(1)
              .map(bar => {
                if (bar && bar.checked) {
                  return bar.barCode
                }
              })
            if (item.outItems[item.outItems.length-1].barCodes) {
              item.outItems[item.outItems.length-1].barCodes.forEach(bar => {
                bar.checked = false
                bar.isChecked = !barCodes.includes(bar.barCode)
              })
            }
            break;
          }
          case 'delBarCode': {
            item.outItems.forEach(outItem => {
              outItem.barCodes = outItem.barCodes.filter(item => item.barCode != barCode)
            })
            break;
          }
          case 'delOutItem': {
            // 删选出来选中的barcode 更改其它剩余的状态
            const barCodes = item.outItems.map(outItem => outItem.barCodes).flat(1).map(bar => {
              if (bar && bar.checked) {
                return bar.barCode
              }
            })
            // 删除对应的outItems
            item.outItems.forEach(outItem => {
              if (outItem.barCodes) {
                outItem.barCodes.forEach(bar => {
                  if (!barCodes.includes(bar.barCode)) {
                    bar.isChecked = true
                  }
                })
              }
            })
            break;
          }
          case 'update': {
            // 查找原状态
            const {checked, isChecked} = item.outItems[outIndex].barCodes.find(item => item.barCode === barCode)
            if (!isChecked) {
              break;
            }
            item.outItems.forEach((outItem, index) => {
              if (index === outIndex) {
                outItem.barCodes.forEach(bar => {
                  if (bar.barCode === barCode) {
                    bar.checked = !checked
                  }
                })
              } else {
                outItem.barCodes.forEach(bar => {
                  if (bar.barCode === barCode) {
                    bar.isChecked = checked
                  }
                })
              }
            })
            break;
          }
          default: {
            break;
          }
        }

        // 计算选中的条形码数量
        item.outItems.forEach(outItem => {
          if (outItem.barCodes) {
            outItem.shippedBqty = outItem.barCodes.filter(bar => bar.checked).length
            if (outItem.shippedBqty === 0 && outItem.barCodes.length === 0) {
              outItem.shippedBqty = item.backnowledgedQty - item.shippedBqty
            }
          }
        })

      }
    })

    return newOrderDetail;
  }

  // 确认出库
  async onSubmitOutForm() {
    const { id, salesOrderItem, dataSource } = clone(this.orderDetail)
    let status = false
    let message = '出库数总量已超出销售数量，请重新选择'
    let isFinished = true
    const isNumber = /^(([1-9]{1}\d*)(\.\d{0,2})?|(0{1}\.\d{0,2}))$/
    // 增加审核时出库数量的校验 add by yangchangwei 2020-9-11
    //TODO checkShippedBqty 预定义 需要审核时存储出库数量并传递过来
    salesOrderItem.forEach((item: { backnowledgedQty: any; shippedBqty: any;  outItems: any; bprice: any; checkShippedBqty: any }) => {
      const { backnowledgedQty, shippedBqty, outItems, bprice, checkShippedBqty } = item
      if(!isNumber.test(bprice)) {
        status = true
        message = '单价不正确，请重新填写'
      }

      const barCodes = outItems
        .filter(outItem => outItem.barCodes && outItem.barCodes.length > 0)
        .map(outItem => outItem.barCodes).flat(1)

      if (barCodes.length > 0) {
        // 条形码选中数量
        const selectNum = barCodes.filter(bar => bar.checked)
          .map(bar => bar.barCode).reduce((sum, barCode) => sum + 1, 0)
        // 条形码总数
        const barNum = Array.from(new Set(barCodes.map(bar => bar.barCode))).length
        if (selectNum != barNum) {
          status = true
          message = '存在未选中的条形码，请确认'
        }
      }

      const sum = outItems.reduce((sum: number, outItem: { shippedBqty: string; }) => {
        if(!/^[0-9]\d*$/.test(outItem.shippedBqty) && dataSource!=='job') {
          status = true
          message = '出库数量不能小于0，请重新填写'
        }
        if((outItem.shippedBqty > outItem.bavailQty) && dataSource!=='job'){
          status = true
          message = '可用库存不能小于出库数量'
        }

        if(outItem.bavailQty == 0){
          status = true
          message = '可用库存为0，不允许出库'
        }

        const outShippedBqty = outItem.shippedBqty ? Number(outItem.shippedBqty) : 0
        return sum += outShippedBqty
      }, 0)
      // 出库数量<=订单审核时填写的仓库的出库数量-已出库数量
      if(!status && (sum > checkShippedBqty - shippedBqty)  && dataSource!=='job'){
        message = '出库数量不能大于已审核的剩余出库数量'
        status = true
      }

      if(!status && sum > (backnowledgedQty - shippedBqty) && dataSource!=='job') {
        status = true
      }
      if(!status && sum < backnowledgedQty - shippedBqty) {
        isFinished = false
      }
    })
    if(status) {
      Toast.fail(message)
      //出库按钮控制
      this.btnLoading = false;
      return
    }
    let outSalesOrdeItem: any[] = []
    salesOrderItem.forEach((item: { outItems: any[]; bprice: number; oprice: any; itemId: any; }) => {
      item.outItems.forEach((outItem: { shippedBqty: number; invBatchList: any; invBatchName: any;
        warehouseName: any; bprice: any; acknowledgedAmount: number; isChange: boolean; itemId: any; iceBoxNum: any; barCodes: any; }) => {
        outItem.invStatusTypeName = outItem.invStatusTypeName==='请选择' ? '' : outItem.invStatusTypeName;
        if(outItem.shippedBqty) {
          delete(outItem.invBatchList)
          // delete(outItem.invStatus)
          delete(outItem.invBatchName)
          delete(outItem.warehouseName)
          outItem.bprice = item.bprice
          outItem.acknowledgedAmount = item.bprice * outItem.shippedBqty
          // 更改接口 添加两个字段  itemId isChange
          if (item.bprice !== item.oprice) {
            outItem.isChange = true
          } else {
            outItem.isChange = false
          }
          outItem.itemId = item.itemId
          // 将invStatusId赋值给invStatus
          outItem.invStatus = outItem.invStatusId
          // 条形码存在 放在iceBoxNum字段并删除barCodes
          if (outItem.barCodes) {
            outItem.iceBoxNum = outItem.barCodes.filter(bar => bar.checked).map(bar => bar.barCode).join(',')
            delete(outItem.barCodes)
          }
          outSalesOrdeItem.push(outItem)
        }
      })
    })
    const item = {
      userAccount: wepy.$instance.globalData.account,
      data :{
        isFinished,
        salesOrderId: id,
        salesOrderItem: outSalesOrdeItem,
      },
      _loading:true,
      _ignoreToast: true
    }
    this.methods.salesOrderOut(item).then((res: any) => {
      if(res && res.payload && res.payload && res.payload.code === "0") {
        this.isCanOutbound = false
        Toast.success({
          message: '出库成功',
          duration:2000,
          onClose: () => {
            this.onLoad({"id":id})
          },
        })
      } else if (res && res.payload && res.payload.data && res.payload.data.code === "1") {
        Toast.fail({
          message: res.payload.data.msg,
          duration: 3000,
        })
        this.btnLoading = false;
      }
    }).catch(() => {
      this.btnLoading = false;
    })
  }

  toggleWarehouse() {
    this.warehouseVisible = !this.warehouseVisible
  }
  toggleInvBatch() {
    this.invBatchVisible = !this.invBatchVisible
  }
  toggleInvStatus() {
    this.invStatusVisible = !this.invStatusVisible
  }
  toggleInvStatusType() {
    this.invStatusTypeVisible = !this.invStatusTypeVisible
  }
  // 获取批次  并且不再批次获取的时候请求可用库存
  async getInvBatchWithHandle({ productCode, warehouseId,invStatusId, invStatusType}) {
    let that = this
    const invBatchResult: any = await getInvBatch({ productCode, warehouseId })
    let invBatchList: string | any[] = []
    let invBatchId = ''
    let invBatchName
    let bavailQty
    if(invBatchResult.code === '0') {
      invBatchList = Object.keys(invBatchResult.invBatch).map(key => {
        return { id: key, value: invBatchResult.invBatch[key] }
      })
      if(invBatchList && invBatchList.length > 0) {
        const item = {
          id: '',
          value: '请选择批次'
        }
        invBatchList.unshift(item)
      }
      // 只记录批次的内容 选择批次时重新请求可用库存
      if (invStatusId) {
        try {

          let invQtyResult = await getInvQty({ productCode, warehouseId, invStatusId, invBatchId:'' ,invStatusType})
          if(invQtyResult.code === '0') {
            let qty = 0;
            if(invQtyResult.isShare === '0'){
              qty = invQtyResult.bavailqty;
            }else if(that.dataSource === 'job'){
              qty = invQtyResult.bavailqty;
            }else{
              qty = invQtyResult.bigQtyLock;
            }
            //bavailQty=invQtyResult.bavailqty
            bavailQty = qty
          }
        } catch (e) {
          bavailQty = 0
        }
      }
      // if(invBatchList.length > 0) {
      //   invBatchId = invBatchList[0].id
      //   invBatchName = invBatchList[0].value
      //   if(invStatusId){
      //     const invQtyResult = await getInvQty({ productCode, warehouseId,invBatchId,invStatusId })
      //     if(invQtyResult.code === '0') {
      //       bavailQty=invQtyResult.bavailqty
      //     }
      //   }
      //   Toast.clear()
      // } else {
      //   Toast.fail({
      //     message: invBatchResult.msg,
      //     duration: 4000,
      //   })
      // }
    }
    return { invBatchId, invBatchName, invBatchList,bavailQty }
  }
  // 获取订单详细信息
  async onLoad({ id,orgId = '' }) {
    Toast.loading({
      message: '正在加载',
      duration: 2000
    });
    this.methods.getOutWarehouseList(orgId);
    this.methods.getInvStatusList()
    this.methods.getInvStatusType()
    // this.methods.getBucha(orgId)
    const { code, data } = await getOutWarehouseOrderDetail(id)
    if(code === '0') {
      let newDetail = clone(data)

      this.dataSource = newDetail.dataSource // documentType='retail' And dataSource='job' 是销量转换单信小蜜转换过来的；dataSource!='job'是普通单

      for(let i = 0; i < newDetail.salesOrderItem.length; i++) {
        const warehouseFilter = this.warehouseList.filter((item: { value: any; }) => item.value === newDetail.salesOrderItem[i].warehouseName)
        let warehouseSelected = warehouseFilter.length > 0 ? warehouseFilter[0] : this.warehouseList[0]
        const { id, value } = warehouseSelected

        const { productCode, backnowledgedQty, shippedBqty, invStatusId,invStatusType,materialGroupCode } = newDetail.salesOrderItem[i]
        const { invBatchId, invBatchName, invBatchList,bavailQty } = await this.getInvBatchWithHandle({ productCode, warehouseId: id,invStatusId,invStatusType })
        let invStatusObj=this.invStatusList.filter((item: { id: any; }) => item.id === invStatusId)
        let invStatusvalue
        let invStatusId
        if(invStatusObj.length>0){
          invStatusvalue=invStatusObj[0].value
          invStatusId=invStatusObj[0].id
        }
        let invStatusTypeObj=this.invStatusTypeList.filter((item: { id: any; }) => item.id === invStatusType)
        let invStatusTypevalue
        if(invStatusTypeObj.length>0){
          invStatusTypevalue=invStatusTypeObj[0].name
        }
        let outItems = [{
          ...newDetail.salesOrderItem[i],
          shippedBqty: backnowledgedQty - shippedBqty,
          invStatus: invStatusvalue,
          invStatusId: invStatusId,
          invStatusTypeName: invStatusTypevalue,
          warehouseId: id,
          warehouseName: value,
          invBatchId,
          invBatchName,
          materialGroupCode,
          invBatchList,
          bavailQty,
          maxShippedBqty: backnowledgedQty - shippedBqty,
        }]
        newDetail.salesOrderItem[i].outItems = outItems
        // 增加原始价格记录  搞不明白啥都让前端判断 奇葩
        newDetail.salesOrderItem[i].oprice = newDetail.salesOrderItem[i].bprice
      }
      this.orderDetail = newDetail
      Toast.clear()
      this.$apply()
    }
    Toast.clear()
  }
}
