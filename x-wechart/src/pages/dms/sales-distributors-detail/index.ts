import wepy, {Event} from 'wepy';
import { connect, getStore } from 'wepy-redux';
import {map, findIndex, propEq, clone, forEach, length, is} from 'ramda';
import { getSalesOrderDetail,getSalesCisStock,orderInventoryFast } from '@/store/actions/salesorderdetail';
import Toast from '@/components/vant/toast/toast';
import { baseUrl, request } from '@/utils/request';
import { dmsRequest } from '@/store/actions/dmsrequest';
import { getOutWarehouseList, getInvStatusList ,getInvQty} from '@/store/actions/dmsoutwarehouse';
import { getInvStatusType, getSystemParameters, getIsOpenSharedWarehouse } from '@/store/actions/dmsorder';
import { getDmsGoodsInventory} from '@/store/actions/classification';
import { DMS_ORDER_CHOOSE_ITEM } from '@/store/types/dmsorder';

interface Data {
  visible: boolean;
  orderpopup: boolean;
  showMore: boolean;
  id: string;
  baseUrl: string;
  commentForm: object;
  commentVisible: boolean;
  calendarConfig: object;
  calendarVisible: boolean;
  currentOrderId: string;
  commentDetailVisible: boolean;
  commentDetail: object;
  beDismissed: boolean;
  reviewConsent: boolean;
  canBuy: string;
  orderdetail: object;
  warehouseVisible: boolean;
  invStatusVisible: boolean;
  invStatusTypeVisible:boolean;
  itemIndex: Number;
  outIndex: Number;
  beConsentMsg: string;
  testData: '';
  isOpenSharedWarehouse: string;
}

@connect({
  /*orderdetail({ salesorderdetail }) {
    return salesorderdetail.orderdetail
  },*/
  loadingInfo({ salesorderdetail }) {
    return salesorderdetail.loadingInfo
  },
  warehouseList({ dmsoutwarehouse }) {
    return dmsoutwarehouse.warehouseList
  },
  invStatusList({ dmsoutwarehouse }) {
    return dmsoutwarehouse.invStatusList
  },
  invStatusTypeList({ dmsorder }){
    return dmsorder.invStatusType
  },
  additionOrderDetailItem({ dmsorder }) {
    return dmsorder.chooseItemInfo
  }
}, {
  getSalesOrderDetail,
  getSalesCisStock,
  getInvStatusType,
  getOutWarehouseList,
  getInvStatusList,
  getDmsGoodsInventory,
  getIsOpenSharedWarehouse,
  getSystemParameters,
  orderInventoryFast, // 订单审核快速满足
})
export default class orderdetail extends wepy.page {
  config = {
    navigationBarTitleText: '订单审核',
    usingComponents: {
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-search': '../../../components/vant/search/index',
      'van-tab': '../../../components/vant/tab/index',
      'van-row': '../../../components/vant/row/index',
      'van-col': '../../../components/vant/col/index',
      'van-tabs': '../../../components/vant/tabs/index',
      'van-radio': '../../../components/vant/radio/index',
      "van-submit-bar": "/components/vant/submit-bar/index",
      'van-radio-group': '../../../components/vant/radio-group/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-stepper': '../../../components/vant/stepper/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-button': '../../../components/vant/button/index',
      'van-steps': '../../../components/vant/steps/index',
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index',
      'sales-distributors-detail-item': '../../../components/sales-distributors-detail-item/index'
    },
  };
  watch = {
    loadingInfo() {
      const { code,orgCode,orgId } = this.loadingInfo
      this.methods.getSalesCisStock({
        code,
        orgCode,
        orgId
      })
    },
    'testData': function(value) {
    },
    additionOrderDetailItem() {

    },
    'chooseItemInfo': function(newValue: any, oldValue: any) {
      if (!newValue) {
        return
      }
      const { inventoryName } = this.data
      if (newValue.invStatusId && '请选择' === inventoryName && newValue.invStatus.length > 0) {
        const r = newValue.invStatus.filter((item: any) => newValue.invStatusId === item.key)
        if (r.length > 0) {
          this.setData({
            inventoryName: r[0].value
          })
          // info.inventoryName = r[0].name
        }
      }

      if ((newValue || {}).productCode !== (oldValue || {}).productCode) {
        const info = {
          inventory: '',
          inventoryName: '请选择',
          quantity: '1',
          price: '',
          lock: (newValue || {}).lock || false,
          time: (newValue || {}).time
        }
        let newAmount = '0.00'
        let newVolume = '0.00'

        if (newValue.price) {
          info.price = newValue.price
        }

        if (newValue.invStatusId) {
          info.inventory = newValue.invStatusId
        }

        if (newValue.quantity) {
          info.quantity = newValue.quantity
        }

        this.setData(info)

        if (newValue.amount) {
          newAmount = newValue.amount
        }
        const { amount } = this.data
        if (amount !== newAmount) {
          this.setData({
            amount: newAmount,
          })
          this.$emit('amountChange', {
            amount: (+newAmount) - (+amount)
          })
        }


        const { volumeTotal } = this.data
        if (volumeTotal !== newVolume) {
          this.setData({
            volumeTotal: newVolume,
          })
          this.$emit('volumeChange', {
            volumeTotal: (+newVolume) - (+volumeTotal)
          })
        }

      } else if ((newValue || {}).price !== this.data.price && newValue.refreshPrice && newValue.time !== this.data.time) {
        const { amount, quantity } = this.data
        const newPrice = (newValue || {}).price
        const newAmount = (newPrice || 0) * (quantity || 0)
        this.setData({
          lock: (newValue || {}).lock || false,
          price: newPrice,
          amount: newAmount,
          time: (newValue || {}).time
        })
        if (amount !== newAmount) {
          this.$emit('amountChange', {
            amount: (+newAmount) - (+amount)
          })
        }
      } else if ((newValue || {}).lock !== this.data.lock) {
        this.setData({
          lock: (newValue || {}).lock || false,
          time: (newValue || {}).time
        })
      } else if ((newValue || {}).time !== this.data.time) {
        this.setData({
          time: newValue.time
        })
      }
      this.calcVolume()
    }
  };
  data: Data = {
    reviewConsent: false,
    beDismissed: false,
    visible: false,
    orderpopup: false,
    warehouseVisible: false,
    invStatusVisible: false,
    invStatusTypeVisible: false,
    id: '',
    canBuy: '',
    showMore: false,
    baseUrl: baseUrl,
    commentForm: {},
    commentVisible: false,
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    calendarVisible: false,
    currentOrderId: '',
    commentDetailVisible: false,
    commentDetail: {},
    orderdetail: {},
    itemIndex: 0,
    outIndex: 0,
    beConsentMsg: '确认是否同意',
    ItemBox:[],
    orgId:'',
    showBUcha:null,
    isOpenSharedWarehouse: '',
  };
  // 页面内交互写在methods里
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
    // 审核同意弹框
    orderConsent() {
      let that = this
      const { salesOrderItem } = that.orderdetail.data;
      that.beConsentMsg = '确认是否同意';

      //校验数据合法性
      if(salesOrderItem) {
        let errMsg = ''; let totalQty = 0;
        for(let i=0; i<salesOrderItem.length; i++){
          let item = salesOrderItem[i];
          if(item.outItems&&item.outItems.length>0) {
            // 明细下单数量
            let backnowledgedQty = item.backnowledgedQty*1;
            // 明细出库合计
            let totalBactualQty = 0;
            let errmsg = '';
            for(let j=0; j< item.outItems.length; j++){
              let out = item.outItems[j];
              //出库数量
              let bactualQty = out.bactualQty*1;
              //可用数量
              let bavailQty = out.bavailQty*1;
              //出库求和
              totalBactualQty += bactualQty;
              if(bactualQty > bavailQty) {
                Toast.fail('出库数量不能大于可用数量');
                return;
              }
              if(!out.warehouseName){
                Toast.fail('仓库不能为空');
                return;
              }
              if(!out.invStatus){
                Toast.fail('库存状态不能为空');
                return;
              }
              /*if(!out.invStatusTypeName){
                Toast.fail('补差类型不能为空');
                return;
              }*/
            };

            totalQty += totalBactualQty;

            if(totalBactualQty > backnowledgedQty){
              Toast.fail('明细中出库数量不可超过下单数量');
              return;
            }
            if(totalBactualQty < backnowledgedQty){
              //需要弹出确认页面
              //this.beConsentMsg = '出库数量小于分销商下单数量,未满足的部分将作废,是否确认审核通过';
              errMsg += item.model+'、';
            }
          }
        }

        if(totalQty==0){
          Toast.fail('合计出库数要大于0');
          return;
        }

        if(errMsg) {
          errMsg = errMsg.substring(errMsg-1);
          that.beConsentMsg = '您当前选择的' + errMsg + '出库数量小于分销商下单数量,未满足的部分将作废,是否确认审核通过';
        }
      }
      that.reviewConsent = true
      that.$apply()
    },
    // 审核驳回弹框取消
    cancelConsent() {
      this.reviewConsent = false
      this.$apply()
    },
    // 审核驳回弹框
    orderDismissed() {
      this.beDismissed = true
      this.$apply()
    },
    tryNumber(e: { backnowledgedPrice: any; }) {
      const { backnowledgedPrice } = e
      const isNumber = /^[0-9]\d*\,\d*|[0-9]\d*$/
      return isNumber.test(backnowledgedPrice)
    },

    //TODO 接口不通，导致无法赋值，暂时屏蔽
    onToggleWarehouse(evt: { target: { dataset: { itemIndex: any; outIndex: any; }; } }) {
      const { target: { dataset: { itemIndex, outIndex } } } = evt
      this.itemIndex = itemIndex
      this.outIndex = outIndex
      const picker = this.$wxpage.selectComponent('#out-warehouse-detail-warehouse-picker')
      // const { warehouseName } = this.orderdetail.data.outBoundItem[itemIndex].outItems[outIndex]
      // picker.setColumnValue(0, warehouseName)
      this.toggleWarehouse();
    },
    onCloseWarehouse() {
      this.toggleWarehouse()
    },
    onWarehouseCancel() {
      this.toggleWarehouse()
    },
    onWarehouseConfirm(evt: { detail: { value: { id: any; value: any; itemIndex: any; outIndex: any; }; }; } ) {
      const { itemIndex, outIndex } = this
      const { detail: { value: { id, value } } } = evt
      const newOrderDetail = clone(this.orderdetail)
      const { productCode, warehouseId,invStatusId,invStatusType } = newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex];
      if(warehouseId !== id) {
        //根据仓库获取剩余库存
        let invBatchId = '';
        if(warehouseId) {
          getInvQty({productCode, warehouseId: id, invBatchId, invStatusId, invStatusType}).then((invQtyResult: any) => {
            if (invQtyResult.code === '0') {
              newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = invQtyResult.bavailqty
            }
            this.$apply()
          })
        }
        newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].warehouseId = id
        newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].warehouseName = value
        this.orderdetail = newOrderDetail;
        this.$apply();

      }
      this.toggleWarehouse()
      this.$apply()
    },

    onToggleInvStatusType(evt: { target: { dataset: { itemIndex: any; outIndex: any; }; }; }) {

      const { target: { dataset: { itemIndex, outIndex } } } = evt
      this.itemIndex = itemIndex
      this.outIndex = outIndex
      const picker = this.$wxpage.selectComponent('#out-warehouse-detail-status-type-picker')
      const { invStatusTypeName } = this.orderdetail.data.salesOrderItem[itemIndex].outItems[outIndex]
      picker.setColumnValue(0, invStatusTypeName)
      this.toggleInvStatusType()
    },
    onToggleInvStatus(evt: { target: { dataset: { itemIndex: any; outIndex: any; }; }; }) {

      const { target: { dataset: { itemIndex, outIndex } } } = evt
      this.itemIndex = itemIndex
      this.outIndex = outIndex
      const picker = this.$wxpage.selectComponent('#out-warehouse-detail-status-picker')
      const { invStatus } = this.orderdetail.data.salesOrderItem[itemIndex].outItems[outIndex]
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
      const { detail: { value: { id, value } } } = evt
      // this.outItem.invStatusId = id
      // this.outItem.invStatus = value
      const newOrderDetail = clone(this.orderdetail)
      if(newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatusId !== id) {
        newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatusId = id
        newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatus = value
        const { productCode,warehouseId, invStatusId,invBatchId,invStatusType } = newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex]
        getInvQty({ productCode, warehouseId,invBatchId,invStatusId,invStatusType }).then((invQtyResult: any) => {
          if(invQtyResult.code === '0') {

            newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].bavailQty= invQtyResult.bavailqty
          }
          this.orderdetail = newOrderDetail
          this.$apply()
        }).catch((e: any) => {
          newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].bavailQty= 0
          this.orderdetail = newOrderDetail
          this.$apply()
        })
      }
      this.toggleInvStatus()
    },
    // 补差类型
    onInvStatusTypeConfirm(evt: { detail: { value: { id: any; name: any; }; }; }) {
      const { itemIndex, outIndex } = this
      const { detail: { value: { id, name } } } = evt
      // this.outItem.invStatusType = id
      // this.outItem.invStatusTypeName = name
      const newOrderDetail = clone(this.orderdetail)
      if(newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatusType !== id) {
        newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatusType = id
        newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatusTypeName = name
        const { productCode,warehouseId, invStatusId,invBatchId,invStatusType } = newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex]


        getInvQty({ productCode, warehouseId,invBatchId,invStatusId,invStatusType}).then((invQtyResult: any) => {
          if(invQtyResult.code === '0') {
            newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].bavailQty= invQtyResult.bavailqty
          }
          this.orderdetail = newOrderDetail
          this.$apply()
        }).catch((e: any) => {

          newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].bavailQty= 0
          this.orderdetail = newOrderDetail
          this.$apply()
        })
      }
      this.toggleInvStatusType()
    },


    //确认同意
    beConsent() {
      this.reviewConsent = false
      this.$apply()
      const { salesOrderItem, id } = this.orderdetail.data
      const account = wepy.$instance.globalData.account


      let orderItem = [];
      if(salesOrderItem){
        forEach((item: any)=> {
          //出库信息校验
          if(item.outItems && item.outItems.length>0) {
            forEach((out: any) => {
              const data = {
                productCode: out.productCode,
                backnowledgedQty: out.bactualQty,
                gicOutWarehouse: out.warehouseId,
                invStatus: out.invStatusId,
                invStatusType: out.invStatusType ? out.invStatusType : '',
                materialCode: out.materialCode //物料编码
              };
              orderItem.push(data);
            }, item.outItems);
          }
        },salesOrderItem);
      }

      dmsRequest({
        data: {
          _loading: true,
          userAccount: account,
          salesOrderId: id,
          // changes: item
          orderItem: orderItem
        },
        method: 'examPurchaseOrder'
      }).then((res: any) => {
        if (res && res.code == '0') {
          Toast.success('审核同意成功');

          // 审核通过暂不需要回滚
          // this.submitTransFlag();
          wx.navigateBack({
            delta: 1,
          });
          setTimeout(() => {
            this.getMyOrderDetail(this.currentOrderId)
          }, 2000);

        }
      })

    },

    // 删除
    onRemoveOutItem(evt: { currentTarget: { dataset: { itemIndex: any; outIndex: any; }; }; }) {
      const { currentTarget: { dataset: { itemIndex, outIndex } } } = evt
      const newOrderDetail = clone(this.orderdetail)
      const length = newOrderDetail.data.salesOrderItem[itemIndex].outItems.length
      if(length > 0) {
        newOrderDetail.data.salesOrderItem[itemIndex].outItems.splice(outIndex, 1)
        this.orderdetail = newOrderDetail
      }
    },

    // 取消驳回
    cancelDismissed() {
      this.beDismissed = false
      this.$apply()
    },
    // 确认驳回
    beDismissed() {
      const { id, salesOrderItem } = this.orderdetail.data
      const account = wepy.$instance.globalData.account
      this.beDismissed = false
      this.$apply()
      let outQty = 0;
      if(salesOrderItem) {
        forEach((item: any) => {
          if(item.outItems&&item.outItems.length>0) {
            forEach((out: any) => {
              outQty += out.bactualQty * 1;
            }, item.outItems);
          }
        }, salesOrderItem);
      }

      if(outQty!=0){
        Toast.fail('出库数量不能大于0！');
        return;
      }
      dmsRequest({
        data: {
          _loading: true,
          userAccount: account,
          salesOrderId: id,
        },
        method: 'rejectPurchaseOrder'
      }).then((res: any) => {
        if (res && res.code == '0') {
          Toast.success('审核驳回成功');

          this.submitTransFlag('turnDown');

        }
      })
    },
    tranfor(list: any) {
      return map(({ itemId, acknowledgedAmount, backnowledgedPrice, backnowledgedQty, invStatus }) => {
        return {
          itemId,
          acknowledgedAmount,
          backnowledgedPrice,
          backnowledgedQty,
          invStatusId: invStatus.selected.invStatusId
        }
      }, list || [])
    },
    goodInfo(e: { detail: any; }) {

      const { detail } = e
      const { salesOrderItem } = this.orderdetail.data
      const { itemId, acknowledgedAmount, backnowledgedPrice, backnowledgedQty } = detail
      const newItem = findIndex(propEq('itemId', itemId), salesOrderItem)
      if (newItem !== -1) {
        salesOrderItem[newItem] = {
          ...salesOrderItem[newItem],
          itemId,
          acknowledgedAmount,
          backnowledgedPrice,
          backnowledgedQty,
          invStatus: {
            options: salesOrderItem[newItem].invStatus.options,
            selected: detail.selected
          }
        }
      }
    },
    // 快速满足
    quickGratification(e: { detail: any; }){
      const { detail } = e
      let itemIndex = detail.itemIndex
      let gicWarehouseType = ''
      if(detail.type == 'own'){
        gicWarehouseType = '70' // 自有仓70
      }else{
        gicWarehouseType = '20' // 共享仓20
      }
      let currItem = this.orderdetail.data.salesOrderItem[itemIndex]
      let param = {
        cisCode: wepy.$instance.globalData.cisCode,
        terms: {
          isFuzzy: false, // 是否模糊查询 -> false精准查询
          zzprdmodel: currItem.zzprdmodel, // 型号
          code: currItem.productCode, // 产品code
          orgCode: this.orgId,
          model: currItem.zzprdmodel, // 型号
          invType: '110', // 库存类型 -> 110代表在库
          gicInvStatus: '110', // gic库存状态 -> 110代表只查正品
          gicWarehouseType: gicWarehouseType, // gic仓库类型
          borderedQty: currItem.backnowledgedQty, // 订单数量
          customerCode: this.orderdetail.data.customerCode
        }
      }
      this.methods.orderInventoryFast(param).then((res)=>{
        if(res.payload.code && res.payload.code == 0){
          if(res.payload.data){
            res.payload.data.materialCode = res.payload.data.material
            res.payload.data.bactualQty = currItem.backnowledgedQty // 出库数量默认订单数量
            this.productAssignment(res.payload.data, itemIndex, '')
          }else{
            Toast.fail('暂无符合条件的库存');
          }
        }
      })
    },
    showMore: () => {
      this.showMore = true
    },
    hiddenMore: () => {
      this.showMore = false
    },
    jumpClick (evt: { currentTarget: { dataset: { itemIndex: any; outIndex: any; }; }; } ){
      const { currentTarget: { dataset: { itemIndex, outIndex } } } = evt
      const productCode = this.orderdetail.data.salesOrderItem[itemIndex].model
      const zzprdmodel = this.orderdetail.data.salesOrderItem[itemIndex].zzprdmodel
      const { id } = itemIndex
      getStore().dispatch({
        type: DMS_ORDER_CHOOSE_ITEM,
        payload: id
      })
      wx.navigateTo({
        url: '/pages/dms/order-item-choose/index?id=' + productCode + '&type=' + 'ReviewOrder'+ '&ly=' + 'ReviewOrder' +'&itemIndex=' + itemIndex +'&outIndex=' + outIndex + '&orgId=' + this.orgId + '&zzprdmodel=' + zzprdmodel+ '&isFuzzy=false' + '&isOpenSharedWarehouse=' + this.isOpenSharedWarehouse
      })
    },
    // 添加
    onAddOutItem(evt: { target: { dataset: { itemIndex: any; }; }; }) {
      const { target: { dataset: { itemIndex } } } = evt
      let outItems = this.orderdetail.data.salesOrderItem[itemIndex].outItems;
      if(outItems && outItems.length>0){
        const newOrderDetail = clone(this.orderdetail)
        const length = newOrderDetail.data.salesOrderItem[itemIndex].outItems.length;
        let outBoundItem = clone(newOrderDetail.data.salesOrderItem[itemIndex].outItems[length-1]);
        this.orderdetail.data.salesOrderItem[itemIndex].outItems.push(outBoundItem);
      }else{
        let outBoundItem = {
          bactualQty: 0,
          warehouseName: '',
          invStatusName: '',
          invStatusTypeName: '',
          bavailQty: 0,
          invBatchId: '',
          productCode: this.orderdetail.data.salesOrderItem[itemIndex].productCode,

        };
        outItems = [];
        outItems.push(outBoundItem);
        this.orderdetail.data.salesOrderItem[itemIndex].outItems = outItems;
      }
      this.$apply();
    },

    //校验数据
    //result -1:失败  0需要提示 1成功
    validate(salesOrderItem){
      if(salesOrderItem) {
        forEach((item: any) => {
          if(item.outItems&&item.outItems.length>0) {
            // 明细下单数量
            let backnowledgedQty = item.backnowledgedQty*1;
            // 明细出库合计
            let totalBactualQty = 0;

            forEach((out: any) => {
              //出库数量
              let bactualQty = out.bactualQty*1;
              //可用数量
              let bavailQty = out.bavailQty*1;
              //出库求和
              totalBactualQty += bactualQty;
              if(bactualQty>bavailQty) {
                Toast.fail('出库数量不能大于可用数量');
                return -1;
              }
            }, item.outItems);

            if(totalBactualQty > backnowledgedQty){
              Toast.fail('明细中出库数量不可超过下单数量');
              return -1;
            }
            if(totalBactualQty < backnowledgedQty){
              //需要弹出确认页面
              //todo
              return 0;
            }
          }

        }, salesOrderItem);
      }
      return 1;
    },

    onShippedBqtyChg(evt: Event) {
      const { detail, target: { dataset: { itemIndex, outIndex } } } = evt
      // bug:  触发两次
      if (typeof detail === 'undefined') {
        return
      }
      const newOrderDetail = clone(this.orderdetail)
      newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].bactualQty = detail
      this.orderdetail = newOrderDetail
    },

    //获取可用库存
    getBavailqty() {
      try {
        const {itemInfo,warehouseId,invState,inventory} = this.data;
        if (itemInfo.productCode && warehouseId && invState && inventory) {
          const bavailqtyPromise: any = dmsRequest({
            data: {
              productCode: itemInfo.productCode,
              warehouseId: warehouseId,//this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.warehouseId,
              invStatusType: invState,  //补差类型
              invStatusId: inventory,  //库存状态
              invBatchId: '', //库存批次id
            },
            method: 'getInvQty'
          })
          const {bavailqty} = bavailqtyPromise;
          this.bavailqty = bavailqty;
        }
      } catch (error) {

      }
    }

  };

  // 驳回、通过之后数据回滚
  submitTransFlag(type){
    const { id, salesOrderItem } = this.orderdetail.data
    if(this.orderdetail.data.activityName){
        let data = {}
        let qtys = []
        let productIds = []

        if(type=='turnDown'){
          this.orderdetail.data.salesOrderItem.forEach((item)=>{
            qtys.push(-item.backnowledgedQty)
            productIds.push(item.productCode)
          })
        }else{
          this.orderdetail.data.salesOrderItem.forEach((item)=>{

            // 出库数量
            let shipmentsNum = 0
            item.outItems.forEach(oItem => {
              shipmentsNum += oItem.bactualQty
            })

            // 回滚数量 = 总数量-出库数量
            let turnNum = item.backnowledgedQty-shipmentsNum

            if(turnNum > 0){
              // 回滚数量传负值
              qtys.push(-turnNum)
              productIds.push(item.productCode)
            }

          })

        }

        data = {
          userActivityCode:this.orderdetail.data.userActivityCode,
          dmsOrderCode:this.orderdetail.data.purchaseNum,
          qtys:qtys.toString(),
          productIds:productIds.toString(),
        }

      request({
        api: `marketActivity/changeTransFlag.nd`,
        method: "POST",
        data: data,
        callback: (res1: any) => {
          wx.navigateBack({
            delta: 1,
          });
          setTimeout(() => {
            this.getMyOrderDetail(this.currentOrderId)
          }, 2000);
        }
      });
    }else{
      wx.navigateBack({
        delta: 1,
      });
      setTimeout(() => {
        this.getMyOrderDetail(this.currentOrderId)
      }, 2000);
    }
  }

  getMyOrderDetail(id: any) {
    Toast.loading({
      message: '正在加载',
      duration: 3000
    })
    this.methods.getSalesOrderDetail({ salesOrderId: id }).then((res: { payload: { data: { orgId: any; }; code: number; }; }) => {
      this.orderdetail = res.payload;
      if(res && res.payload &&  res.payload.data && res.payload.code == 0) {
        const { orgId,orgCode } = res.payload.data
        request({
          api: 'cart/canDirectBuy.nd',
          method: 'POST',
          data: { orgId },
          callback: (res: any) => {

            Toast.clear()
            const { code, canBuy } = res.data;
            if (code == 0) {
              this.canBuy = canBuy;
            } else {
              this.canBuy = 'N'
            }
            this.$apply()
          },
        });

        // 加载库存
        const{ salesOrderItem } = res.payload.data;
        forEach((item: any)=> {
          const data = { code: item.productCode, orgId:orgId, orgCode:orgCode}
          // 查询海信库存和共享库存
          request({ api: 'product/getStocks.nd', method: 'POST', data }).then((res: any) => {
            if (is(Array, res) && length(res) > 0) {
              item.inventory = res[0].inventory;
              item.sharedInv = res[0].sharedInv;
              this.$apply()
            }
          })
          //查询自有仓库存和共享仓库存
          this.methods.getDmsGoodsInventory({supplierCode:'',productCodes:[item.productCode]}).then((res: { payload: { data : any; code: number; }; }) => {

            let invlist = res.payload.data;
            item.invQty = invlist[0].invQty;
            item.gicInvQty = invlist[0].gicInvQty;
            this.$apply()
          });

        },salesOrderItem)

        if(salesOrderItem[0] && salesOrderItem[0].materialGroupCode){
          this.getOutWarehouseListData(salesOrderItem[0].materialGroupCode)
        }

      }

      Toast.clear();
    })
  }

  toggleWarehouse() {
    this.warehouseVisible = !this.warehouseVisible
  }

  toggleInvStatus() {
    this.invStatusVisible = !this.invStatusVisible
  }
  toggleInvStatusType() {
    this.invStatusTypeVisible = !this.invStatusTypeVisible
  }
  // 添加或修改产品赋值
  productAssignment(chooseItem, itemIndex, outIndex){
    let outItems = this.orderdetail.data.salesOrderItem[itemIndex].outItems;
    let outBoundItem = {
      bactualQty: chooseItem.bactualQty <= chooseItem.bigQty ? chooseItem.bactualQty : chooseItem.bigQty, // 出库数量 订单数量小于可用数量用订单数量，否则用可用数量
      warehouseId: chooseItem.gicWarehouse, // 仓库id
      warehouseName: chooseItem.gicWarehouseName, // 仓库名称
      invStatusType: chooseItem.invStatusType, // 补差类型id
      invStatusTypeName: chooseItem.invStatusTypeName, // 补差类型名称
      materialCode: chooseItem.materialCode, // 物料编码
      invStatus: chooseItem.invStatusName, // 库存状态名称
      invStatusId: chooseItem.invStatusId, // 库存状态id
      bavailQty: chooseItem.bigQty, // 可用数量
      inInvDate: chooseItem.inInvDate, // 入库时间
      invBatchId:'',
      productCode: chooseItem.productCode, // 产品编码
      orgCode: chooseItem.orgCode, // 组织编码
    };
    if(!Array.isArray(outItems)){
      outItems =[];
    }
    if(outIndex && outIndex !== 'undefined'){ // 如果outIndex有值为编辑直接替换数据；否则为新增
      outItems[outIndex] = outBoundItem ;
    }else{
      outItems.push(outBoundItem);
    }
    this.orderdetail.data.salesOrderItem[itemIndex].outItems = outItems
    this.$apply()
  }
  // 获取仓库列表
  async getOutWarehouseListData(materialGroupCode){
    // 1、先请求总开关量
    // 2、如果总开关返回Y，查询光伟的接口（入参：组织、物料组，返回值：Y、N）校验物料组是否开启共享
    // 如果开启共享，不允许从原仓发货，，， 仓库只显示统仓数据
    // 如果未开启共享 仓库显示全部
    this.isOpenSharedWarehouse = ''
    let systemParametersObj =  await this.methods.getSystemParameters({key: 'QD_ONLY_SHARE_STORE'})
    let systemParameters = ''
    if(systemParametersObj && systemParametersObj.payload && systemParametersObj.payload.data){
      systemParameters = systemParametersObj.payload.data
    }
    if(systemParameters == 'Y'){
      let isOpenSharedWarehouseObj = await this.methods.getIsOpenSharedWarehouse({orgId: this.orgId, matklId: materialGroupCode})
      let isOpenSharedWarehouse = ''
      if(isOpenSharedWarehouseObj && isOpenSharedWarehouseObj.payload && isOpenSharedWarehouseObj.payload.data){
        isOpenSharedWarehouse = isOpenSharedWarehouseObj.payload.data
        if(isOpenSharedWarehouse == 'Y'){
          this.methods.getOutWarehouseList(this.orgId, '20')
          this.isOpenSharedWarehouse = '20'
        }else{
          this.methods.getOutWarehouseList(this.orgId)
        }
      }
    }else{
      this.methods.getOutWarehouseList(this.orgId)
    }

  }
  onLoad(e: { id: any;orgId: any }) {
    const { id,orgId } = e
    this.orgId = orgId
    this.currentOrderId = id
    this.methods.getInvStatusList()
    this.methods.getInvStatusType()

    // this.methods.getBucha(orgId)
    let that = this
    setTimeout(() => {
      that.getMyOrderDetail(id)
    }, 2000);
    this.$apply()
  }
  onUnload() {
    this.canBuy = ''
  }
  onShow() {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if(currPage.data.chooseItem ) {
        const itemIndex  = currPage.data.itemIndexR
        const outIndex  = currPage.data.outIndexR
        if(this.orderdetail.data.salesOrderItem[itemIndex].productCode !== currPage.data.chooseItem.productCode){
          setTimeout(() => {
            Toast.fail('不是同一产品，请重新选择')
          }, 500);
        } else {
          currPage.data.chooseItem.bactualQty = 0 // 出库数量默认0
          this.productAssignment(currPage.data.chooseItem, itemIndex, outIndex)
          currPage.data.chooseItem = null
          this.$apply();
        }
    }
  }
}
