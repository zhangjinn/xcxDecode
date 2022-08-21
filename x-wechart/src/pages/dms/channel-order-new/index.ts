import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import OrderDetail from '@/components/dms-order-addition-detail/index';
import {getNormalSalesOrderCustomerInfo, submitChannelOrderNew, getCisPrice, getDeliveryMethod, getSystemParameters, getIsOpenSharedWarehouse, getWarehouseList} from '@/store/actions/dmsorder';
import { getBaseData } from '@/store/actions/purchaseshop';
import { getDmsShopAddress } from '@/store/actions/distributorsorder';
import channelOrder from '@/mixins/channel-retail-order';
import { debounce } from 'throttle-debounce';
import { formatDate, getAlertInfo } from '@/utils/index';
import { DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR } from '@/store/types/dmsorder';
import Dialog from '@/components/vant/dialog/dialog';
import PopupToast from '@/components/popup-toast/index';

interface ChooseInfo {
  id: number | string;
  name: string;
}

interface Data {
  showMore: boolean; // 是否显示更多
  org: ChooseInfo; // 供应商
  sendInventoryInfo: object; // 发货仓库信息
  receiveInventoryInfo: ChooseInfo; // 入库仓库信息
  receiveUnitInfo: ChooseInfo,
  deliveryMethod: ChooseInfo; // 配送方式
  receiverInfo: ChooseInfo; // 收货地址信息
  saleType: ChooseInfo; // 销售类型
  invoiceInfo: ChooseInfo; // 开票信息
  saler: ChooseInfo; // 业务员
  note: string; // 备注
  amount: string;
  volume: string;//体积
  popVisible: boolean;
  popList: Array<any>;  // pop弹出框 列表
  popTitle: string;   // pop弹出框 标题
  compareInfo: Object;
  popFiledName: string;
  item: Object;
  isNoticePopupShow:boolean;
  freeShippingTip:string;
  warehouseList: any[];
  isDisabled: boolean;
  customerAddressAllList: any[];
}

@connect({
  chooseCustomerInfo({ dmsorder }) {
    return dmsorder.chooseCustomerInfo
  },
  customerInfos({ dmsorder }) {
    return dmsorder.customerInfos
  },
  loading({ loading }) {
    return loading.loading
  },
  kpfList({ purchaseshop }) {
    return purchaseshop.kpfList
  },
  ywyList({ purchaseshop }) {
    return purchaseshop.ywyList
  },
  // fhckList({ purchaseshop }) {
  //   return purchaseshop.fhckList
  // },
  additionOrderDetailItem({ dmsorder }) {
    return dmsorder.chooseItemInfo
  },
  deliveryMode({ dmsorder }) {
    return dmsorder.deliveryMode
  },
}, {
  getBaseData,
  getNormalSalesOrderCustomerInfo,
  submitChannelOrderNew,
  getCisPrice,
  getDeliveryMethod,
  getSystemParameters,
  getIsOpenSharedWarehouse,
  getWarehouseList,
  getDmsShopAddress, // 获取与分销商渠道下单收货地址相同接口
})
export default class ChannelOrder extends wepy.page {
  config = {
    navigationBarTitleText: '分销录入(新)',
    usingComponents: {
      "van-popup": "/components/vant/popup/index",
      "van-toast": "/components/vant/toast/index",
      "item": "/components/dms-order-addition-detail-item/index",
      "van-icon": "/components/vant/icon/index",
      "van-submit-bar": "/components/vant/submit-bar/index",
      "van-transition": "/components/vant/transition/index",
      "van-field": "/components/vant/field/index",
      "van-dialog": "/components/vant/dialog/index",
      'distributor-material-group': '../../../components/distributor-material-group/'
    },
  };

  mixins = [channelOrder];

  saleTypes = [{
    id: 'wholesale',
    name: '批发'
  }, {
    id: 'engineering',
    name: '工程'
  }];

  data: Data = {
    isDisabled: true, // 如果传参isDisabled=true，组件components/dms-order-addition-detail-item/index表单不可编辑（销售数量、销售价格除外）
    showMore: false,
    item: {
      customerCode: '',
      orgId: ''
    },
    org: {
      id: '',
      name: '请选择'
    }, // 供应商  id name
    sendInventoryInfo: {
      id: '',
      name: '请选择',
      type: '',
    },  // id name
    receiveInventoryInfo: {
      id: '',
      name: '请选择'
    },
    receiveUnitInfo: {
      id: '',
      name: ''
    },
    receiverInfo: {
      id: '',
      name: '请选择'
    },   // id name
    saleType: {
      id: 'wholesale',
      name: '批发'
    },    // id name
    invoiceInfo: {
      id: '',
      name: '请选择'
    },  // id name
    saler: {
      id: '',
      name: '请选择'
    },   // id name
    deliveryMethod: {
      id: '',
      name: '请选择'
    },
    note: '',
    amount: '0.00',
    volume: '0.00',//体积
    popList: [],
    popTitle: '',
    popVisible: false,
    popFiledName: '',
    compareInfo: {},
    isNoticePopupShow:false,
    expressFee: wepy.$instance.globalData.expressFee,
    freeShippingTip: '',
    warehouseList: [],
    customerAddressAllList: [], // 收货地址列表
  };

  components = {
    order: OrderDetail,
    popup: PopupToast
  };

  /**
   * TODO: 保存成功后删除客户信息，商品信息
   */
  methods = {
    //提示框
    noticePopupOpen:() => {
      this.isNoticePopupShow = true;
    },
    noticePopupClose:() => {
      this.isNoticePopupShow = false;
    },
    // 应该获取那个值给popList   应该对比那个字段为选中信息
    openChoose: (propName: string, fieldName: string, titleName: string) => {
      let list = this[propName]
      if (!list) {
        list = this.customerInfos[propName]
      }
      if (list.length === 0) {
        // Toast(`暂无${titleName}`)
        return
      }
      this.popList = list

      this.compareInfo = this.data[fieldName]
      this.popFiledName = fieldName
      this.popTitle = titleName
      this.popVisible = true
    },
    onClose: () => {
      this.popVisible = false
    },
    onChoose: ({ currentTarget }: e) => {
      const { dataset } = currentTarget
      const { index } = dataset
      const { popFiledName, popList } = this.data
      if('receiverInfo' == popFiledName){
        if(popList[index] && popList[index].regionStatus === 'D'){ // 判断行政区域地址库是否失效 A有效，D失效。失效的话禁止选择
          Toast.fail('由于行政区划调整，请您及时更新您的收获地址信息')
          return false
        }
      }
      this[popFiledName] = popList[index]
      //
      // if(popFiledName == 'org'){
      //   this.getWarehouseListData()
      // }
      this.popVisible = false
    },

    showMore: () => {
      this.showMore = true
    },
    hiddenMore: () => {
      this.showMore = false
    },
    submit: () => {
      this.methods.submited('submitted')
    },
    cache: () => {
      this.methods.submited('draft')
    },
    // ”draft”为保存，”submitted”为提交
    submited: async (status: string) => {
      let that = this
      let products=[]
      // 只要有一个产品包含免运费标识需要加提示
      for(const key in this.additionOrderDetailItem.itemInfo) {
        const item = this.additionOrderDetailItem.itemInfo[key]
        if (item.productLabel && item.productLabel.indexOf('15691143850') >= 0) {
          products.push(item)
        }
      }
      if(products.length>0){
        wx.showModal({
          title: '提示',
          content: '1、当天截单时间内，同批量订单达到起运量（电视3台，白电或全品类2方），则免配送费！\r\n2、当天截单时间内，同批量订单若包含至少1件单价超万元产品或激光，则免配送费！\r\n3、若不满足以上条件，将按照统仓统配合同不足起运量收费标准向您收取物流费用！\r\n⭐以上政策仅限开通统仓统配区域商家！！！',
          success: function (res) {
            if (res.confirm) {
              if (that.methods.checkParam()) {
                that.methods.sendRequest(status)
              }
            }
          },
        })
      }else{
        if (that.methods.checkParam()) {
          that.methods.sendRequest(status)
        }
      }
    },
    sendRequest: async (status: string) => {
      const { chooseCustomerInfo } = this
      const { org, sendInventoryInfo, receiveUnitInfo,  receiveInventoryInfo, receiverInfo, saleType, invoiceInfo, saler, note, deliveryMethod } = this.data

      const params = this.$invoke('order', 'getParam')
      // 校验产品是否重复
      const paramObj : string[] = []
      for (const index in params) {
        const param = params[index]
        const key = `${param.itemInfo.model}_${param.itemInfo.colour}`
        if (paramObj.indexOf(key) > -1) {
          Toast(`产品型号${param.itemInfo.model}重复，请重新选择产品!`)
          return
        } else {
          paramObj.push(key)
        }
      }

      // 1、先请求总开关量
      // 2、渠道订单录入点击提交时，需要遍历产品依次查询光伟的接口（入参：组织、物料组，返回值：Y、N）校验物料组是否开启共享
      // Tip: 产品列表中如果有一个产品开启共享且仓库类型等于70，不允许从原仓发货
      let systemParametersObj =  await this.methods.getSystemParameters({key: 'QD_ONLY_SHARE_STORE'})
      let systemParameters = ''
      if(systemParametersObj && systemParametersObj.payload && systemParametersObj.payload.data){
        systemParameters = systemParametersObj.payload.data
      }
      if(systemParameters == 'Y'){
        for (const idx in params){
          let org = params[idx].itemInfo.orgCode
          let matklId = params[idx].itemInfo.materialGroupCode
          let gicWarehouseType = params[idx].itemInfo.gicWarehouseType
          let isOpenSharedWarehouseObj = await this.methods.getIsOpenSharedWarehouse({orgId: org, matklId: matklId})
          if(isOpenSharedWarehouseObj && isOpenSharedWarehouseObj.payload && isOpenSharedWarehouseObj.payload.data){
            let isOpenSharedWarehouse = isOpenSharedWarehouseObj.payload.data

            if(isOpenSharedWarehouse == 'Y' && gicWarehouseType == '70'){
              Toast.fail('开通共享仓的商家只能从统仓发货')
              return false
            }
          }
        }
      }

      const time = formatDate(Date.parse(new Date()), 'Y-M-D')
      // 组装数据
      const orderInfo = {
        salesOrder: {
          retailType: saleType.id, // 销售类型
          addressId: receiverInfo.id, // 收货地址id
          message: note, // 备注
          customerName: chooseCustomerInfo.customerName, // 客户名称
          customerCode: chooseCustomerInfo.customerCode, // 客户编码
          billFromId: invoiceInfo.id, // 开票方id
          billToId: receiveUnitInfo.id, // 收货单位id
          sellerCode: saler.id, // 业务员编码
          sellerName: saler.name, // 业务员名称
          inWarehouseId: receiveInventoryInfo.id, // 入库仓库id
          edt: time, // 期望时间
          deliveryMode: deliveryMethod.id, // 配送方式编码
          salesOrderItem: params.map((param: any) => {
            const itemInfo = param.itemInfo
            return {
              orgId: itemInfo.orgCode, // 组织编码
              warehouseId: itemInfo.gicWarehouse, // 发货仓库id
              productCode: itemInfo.productCode, // 产品编码
              model: itemInfo.model, // 型号
              materialCode: itemInfo.materialCode, // 物料编码
              invStatus: param.inventory, // 库存状态id
              invStatusType: param.invState, // 补差类型编码
              borderedQty: param.quantity, // 销售数量
              bdemandQty: param.quantity, // 需求数量
              bprice: (+param.price).toFixed(2), // 销售价格
              amount: param.amount, // 金额小计
            }
          })
        }
      }

      Dialog.confirm({
        title: '提示',
        message: `本单据共有${params.length}个产品，确定要${ status === 'submitted' ? '提交' : '暂存'}吗?`
      }).then(() => {
        this.methods.submitChannelOrderNew({
          ...orderInfo,
          _ignoreToast: true,
          _popup: true
        }).then((res: any) => {
          const { code } = res.payload || '-1'

          if (code === '0') {
            // 保存成功
            Toast.success({
              message: `${ status === 'submitted' ? '提交' : '暂存'}成功`,
              onClose: () => {
                this.amount = '0.00'

                const store = getStore()
                store.dispatch({
                  type: DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
                })
                this.$broadcast('relaunch')
                this.initData()
              }
            })
            this.note = ''

            this.saleType = {
              id: 'wholesale',
              name: '批发'
            }
            this.$apply()
          }
        })
      }).catch(() => {
        // on cancel
      });
    },

    checkParam: () => {
      // 检查Head里面必填信息
      // 除发货仓库，其他均是必选
      const { chooseCustomerInfo } = this
      const { org, receiveInventoryInfo, receiverInfo, saleType, invoiceInfo, saler } = this.data
      if (!chooseCustomerInfo.customerCode) {
        Toast.fail('请选择客户信息')
        return false
      }
      // if (!org.id) {
      //   Toast.fail('请选择供应商')
      //   return false
      // }
      //不校验入库仓库
      /*if (!receiveInventoryInfo.id) {
        Toast.fail('请选择入库仓库')
        return false
      }*/
      if (!receiverInfo.id) {
        Toast.fail('请选择收货地址')
        return false
      }
      if (!saleType.id) {
        Toast.fail('请选择销售类型')
        return false
      }
      if (!invoiceInfo.id) {
        Toast.fail('请选择开票方')
        return false
      }
      if (!saler.id) {
        Toast.fail('请选择业务员')
        return false
      }

      const { errMsg, submitLines } = this.$invoke('order', 'checkParam')
      if (errMsg !== '') {
        Toast.fail(errMsg)
        return false
      } else if (submitLines === 0) {
        Toast.fail('请先添加产品再保存')
        return false
      }

      return true
    },
    onNoteChange: debounce(500, ({ detail } : any) => {
      this.note = detail
      this.$apply()
    })
  }

  watch = {
    'loading': function (newValue: Boolean) {
      if (!newValue) {
        Toast.clear()
      }
    },
    'chooseCustomerInfo': () => {
      if(this.chooseCustomerInfo && this.chooseCustomerInfo.customerCode && this.chooseCustomerInfo.legalPerson !== '' ) {
        this.item.customerCode = this.chooseCustomerInfo.customerCode
        this.item.orgId = ''
        this.$apply()
      }
    },
    'org': () => {
      if (this.org && this.org.id) {
        this.additionOrderDetailItem.orgId = this.org.id
        this.additionOrderDetailItem.cisCode = this.customerInfos.cisCode

        const productIds = []
        const orgIds = []

        for(const key in this.additionOrderDetailItem.itemInfo) {
          const item = this.additionOrderDetailItem.itemInfo[key]
          if (item.productCode) {
            productIds.push(item.productCode)
            orgIds.push(this.org.id)
          }
        }
        if(productIds.length > 0) {
          // 获取最新价格
          this.methods.getCisPrice({
            type: '2',
            cisCode: this.customerInfos.cisCode,
            refreshPrice: true,
            orgId: orgIds.join(','),
            productId: productIds.join(',')
          })
        }
        this.getWarehouseListData()
        this.getDmsShopAddressData()
      }
      if(this.org && this.org.orgId && this.chooseCustomerInfo && this.chooseCustomerInfo.legalPerson !== '') {
        this.item.orgId = this.org.orgId
        this.$apply()
      }
    },
    'customerInfos': (newValue: any) => {
      if (newValue.customerAllList.length > 0) {
        const item = newValue.customerAllList[0]
        this.receiveUnitInfo = item
      } else {
        this.receiveUnitInfo = {
          id: '',
          name: '请选择'
        }
      }
      // 入库仓库
      // receiveInventoryInfo
      if (newValue.inWarehouseList.length > 0) {
        this.receiveInventoryInfo = newValue.inWarehouseList[0]
      } else {
        this.receiveInventoryInfo = {
          id: '',
          name: '请选择'
        }
      }
      //
      // 供应商
      if (newValue.orgList.length > 0) {
        const item = newValue.orgList[0]
        this.org = item
      } else {
        this.org = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    },
    'kpfList': (newValue: Array<Object>) => {
      if (newValue.length > 0) {
        const item = newValue[0]
        this.invoiceInfo = item
      } else {
        this.invoiceInfo = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    },
    'ywyList': (newValue: Array<Object>) => {
      if (newValue.length > 0) {
        const item = newValue[0]
        this.saler = item
      } else {
        this.saler = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    },
    // 'fhckList': (newValue: Array<Object>) => {
    //   if (newValue.length > 0) {
    //     const item = newValue[0]
    //     this.sendInventoryInfo = item
    //   } else {
    //     this.sendInventoryInfo = {
    //       id: '',
    //       name: '请选择'
    //     }
    //   }
    //   this.$apply()
    // },
    'warehouseList': (newValue: Array<Object>) => {
      if (newValue.length > 0) {
        const item = newValue[0]
        this.sendInventoryInfo = item
      } else {
        this.sendInventoryInfo = {
          id: '',
          name: '请选择',
          type: '',
        }
      }
      this.$apply()
    },

    'deliveryMode': function(newValue: Array<ChooseInfo>) {
      if (newValue && newValue.length > 0) {
        this.deliveryMethod = newValue[0]
      } else {
        this.deliveryMethod = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    }
  }

  events = {
    'amount-change': (payload: any) => {
      //let payAmount = Number(payload.amount);
      //this.amount = (payAmount).toFixed(2)
      this.amount = `${((+this.amount) + (+payload.amount)).toFixed(2)}`
    },
    'volume-change': (payload: any) => {
      //let payVolume = Number(payload.volume);
      //this.volume = (payVolume).toFixed(2)
      this.volume = `${((+this.volume) + (+payload.volume)).toFixed(2)}`
    }
  }

  onShow() {
    this.freeShippingTip = getAlertInfo('14187495683') // 免运费提示信息
  }

  initData() {
    this.methods.getBaseData({
      type: 'kpf'
    })
    this.methods.getBaseData({
      type: 'ywy'
    })
    this.warehouseList = []
    // this.methods.getBaseData({
    //   type: 'fhck',
    //   warehouseType: 20
    // })


  }

  // 渠道订单录入中收货地址的获取改为CIS分销商地址的接口，与分销商渠道下单收货地址接口一致
  getDmsShopAddressData(){
    const cisCode = this.chooseCustomerInfo && this.chooseCustomerInfo.customerCisCode
    this.methods.getDmsShopAddress({
      cisCode,
      orgId: this.org.id,
    }).then((res)=>{
      if(res && res.payload && res.payload.list && res.payload.list.length > 0) {
        let addresslist = []
        res.payload.list.forEach((item)=>{
          const add : any= {
            name: item.address,
            id: item.id,
            regionStatus: item.regionStatus, // 判断行政区域地址库是否失效 A有效，D失效。失效的话禁止选择
          }
          addresslist.push(add)
        })
        this.customerAddressAllList = addresslist
        // 收货地址
        if (this.customerAddressAllList.length > 0 && this.customerAddressAllList[0].regionStatus === 'A') {
          const item = this.customerAddressAllList[0]
          this.receiverInfo = item
        } else {
          this.receiverInfo = {
            id: '',
            name: '请选择'
          }
        }
      }
    })
  }
  //  获取仓库列表
  getWarehouseListData(){
    // 获取仓库列表
    this.methods.getWarehouseList(this.org.id).then(res => {
      const data = res.payload.data || [];
      this.warehouseList = data.map(it => {
        return {
          name: it.name,
          id: it.cId,
          type: it.type//20统仓 70原仓
        }
      })
      this.$apply();
    })
  }

  onLoad() {
    this.initData()
    //获取配送方式
    this.methods.getDeliveryMethod();
  }
}
