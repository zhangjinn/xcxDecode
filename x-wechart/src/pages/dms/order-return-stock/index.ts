import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import OrderDetail from '@/components/dms-order-addition-detail/index';
import { getNormalSalesOrderCustomerInfo, submitChannelOrder } from '@/store/actions/dmsorder';
import { getBaseData } from '@/store/actions/purchaseshop';
import channelOrder from '@/mixins/channel-retail-order';
import { debounce } from 'throttle-debounce';
import { formatDate, fillZero } from '@/utils/index';
import { DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR } from '@/store/types/dmsorder';
import Dialog from '@/components/vant/dialog/dialog';
import { ORDER_RETURN_STOCK, ADD_CHOOSE_INFO } from '@/store/types/return-stock'
import { getReturnSupplier, getReturnIn } from '@/store/actions/return-stock';
import { dmsRequest } from '@/store/actions/dmsrequest';
import { forEachObjIndexed } from 'ramda';
interface ChooseInfo {
  key: number | string;
  id: number | string;
  name: string;
  value: string;
}

interface Data {
  showMore: boolean; // 是否显示更多
  org: ChooseInfo; // 供应商
  sendInventoryInfo: ChooseInfo; // 发货仓库信息
  receiveInventoryInfo: ChooseInfo; // 入库仓库信息
  receiveUnitInfo: ChooseInfo,
  receiverInfo: ChooseInfo; // 收货地址信息
  saleType: ChooseInfo; // 销售类型
  invoiceInfo: ChooseInfo; // 开票信息
  saler: ChooseInfo; // 业务员
  note: string; // 备注
  amount: string;
  popVisible: boolean;
  popList: Array<any>;  // pop弹出框 列表
  popTitle: string;   // pop弹出框 标题
  compareInfo: Object;
  popFiledName: string;
}

@connect({
  returnOrderList({ returnstock }) {
    return returnstock.returnOrderList
  }
  chooseCustomerInfo({ dmsorder }) {
    return dmsorder.chooseCustomerInfo
  },
  customerInfos({ dmsorder }) {
    return dmsorder.customerInfos
  },
  orgList({ returnstock }) {
    return returnstock.orgList
  },
  inWarehouseList({ purchaseshop }) {
    return purchaseshop.baseData
  },
  loading({ loading }) {
    return loading.loading
  },
  kpfList({ purchaseshop }) {
    return purchaseshop.kpfList
  },
  StoresList({ purchaseshop }) {
    return purchaseshop.StoresList
  },
  ywyList({ purchaseshop }) {
    return purchaseshop.ywyList
  },
  fhckList({ purchaseshop }) {
    return purchaseshop.fhckList
  }
}, {
  getBaseData,
  getNormalSalesOrderCustomerInfo,
  submitChannelOrder,
  getReturnSupplier,
  getReturnIn
})
export default class ReturnStock extends wepy.page {
  config = {
    navigationBarTitleText: '退货入库',
    usingComponents: {
      "van-popup": "/components/vant/popup/index",
      "van-toast": "/components/vant/toast/index",
      "item": "/components/dms-order-addition-detail-item/index",
      "van-icon": "/components/vant/icon/index",
      "van-submit-bar": "/components/vant/submit-bar/index",
      "van-transition": "/components/vant/transition/index",
      "van-field": "/components/vant/field/index",
      "van-dialog": "/components/vant/dialog/index",
      'stores': '../../../components/stores-return/index',
      'calendar': '../../../components/calendar/index',
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
    item: {
      customerCode: '',
      orgId: ''
    }
    personalsupply: [],
    calendarShow: false,
    currentDateName: '',
    documentDate: '',
    showMore: false,
    org: {
      key: '',
      value: '请选择'
    }, // 供应商  id name
    ssmdInfo: {
      value: '请选择',
      key: '',
      isSelect: ''
    },
    sendInventoryInfo: {
      id: '',
      name: '请选择'
    },  // id name
    receiveInventoryInfo: {
      key: '',
      value: '请选择'
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
    note: '',
    amount: '0.00',
    popList: [],
    popTitle: '',
    popVisible: false,
    popFiledName: '',
    compareInfo: {},
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
  };

  components = {
    order: OrderDetail,
  };

  methods = {
    checkParam: () => {
      // 检查Head里面必填信息
      // 除发货仓库，其他均是必选
      const { chooseCustomerInfo } = this
      // receiverInfo, saleType, invoiceInfo, saler
      const { org, receiveInventoryInfo } = this.data
      if (!chooseCustomerInfo.customerCode) {
        Toast.fail('请选择客户信息')
        return false
      }
      if (!receiveInventoryInfo.key) {
        Toast.fail('请选择入库仓库')
        return false
      }
      if (!org.key) {
        Toast.fail('请选择供应商')
        return false
      }
      if (!this.documentDate) {
        Toast.fail('请选择单据日期')
        return false
      }

      const { errMsg } = this.$invoke('order', 'checkParam')
      if (errMsg !== '') {
        Toast.fail(errMsg)
        return false
      }
      return true
    },
    // 入库
    OnseleWarehouse: () => {
      if (this.methods.checkParam()) {
        const { chooseCustomerInfo } = this
        const { org, ssmdInfo, receiveInventoryInfo, note } = this.data
        const params = this.$invoke('order', 'getParam')
        const paramObj: string[] = []
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
        const orderinfo = {
          _loading: true,
          userAccount: wepy.$instance.globalData.account,
          data: {
            documentDate: this.documentDate,
            customerCode: chooseCustomerInfo.customerCode,
            billFromId: this.kpfList[0].id,
            sellerCode: this.ywyList[0].id,
            storeCode: ssmdInfo.key,
            inWarehouseId: receiveInventoryInfo.key,
            supplierCode: org.supplierCode,
            orgId: org.orgId,
            message: note,
            orderItems: params.map((param: { itemInfo: any; quantity: any; price: string | number; amount: any; inventory: any; }) => {
              const itemInfo = param.itemInfo
              return {
                productCode: itemInfo.productCode,
                productName: itemInfo.productName,
                model: itemInfo.model,
                colour: itemInfo.colour,
                borderedQty: param.quantity,
                bprice: (+param.price).toFixed(2),
                amount: param.amount,
                invStatusId: param.inventory,
              }
            })
          }
        }
        this.methods.getReturnIn(orderinfo).then((res: { payload: { code: string; }; }) => {
          if (res && res.payload && res.payload.code && res.payload.code == "0") {
            Toast.success({
              message: '商品入库成功',
              duration: 1000,
            });
            this.$broadcast('relaunch')
            this.chooseCustomerInfo.address = ''
            this.chooseCustomerInfo.customerCode = ''
            this.chooseCustomerInfo.customerTypeName = ''
            this.chooseCustomerInfo.customerName = ''
            this.chooseCustomerInfo.legalPerson = ''
            this.org = {
              key: '',
              value: '请选择',
              orgId: '',
            }
            this.receiveInventoryInfo = {
              key: '',
              value: '请选择'
            }

            this.documentDate = ''
            this.note = ''
            this.amount = 0.00
            this.$apply()
          }
        })
      }
    },
    // 选择日期
    openCalendar(e: { target: { dataset: { name: any; type: any; }; }; }) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { documentDate } = this;
      const { name } = e.target.dataset
      this.currentDateName = name
      let begin;
      begin = documentDate
      this.$wxpage.calendar.enableArea([minDate, maxDate]);
      this.calendarShow = true;
    },
    chooseDay(evt: { detail: { year: any; month: any; day: any; }; }) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.documentDate = day
      this.calendarShow = false;
    },
    closeCalendar() {
      this.calendarShow = false;
    },
    // 选择下拉列表
    openChoose: (propName: string, fieldName: string, titleName: string) => {
      let list = this[propName]
      if (!list) {
        list = this.customerInfos[propName]
      }
      if (list.length === 0) {
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
      this[popFiledName] = popList[index]
      const Status = {
        cisCode: wepy.$instance.globalData.cisCode,
        storeCode: this.ssmdInfo.key
      }
      if (this.popFiledName == 'ssmdInfo') {
        dmsRequest({
          data: Status,
          method: 'findMaterialByStore'
        }).then((res) => {
          let Item = []
          forEachObjIndexed((value, key) => {
            let item = {
              value,
              key,
            }
            Item.push(item)
          }, res.materialGroup)
          this.personalsupply = Item
          this.$apply()
        })
      }
      this.popVisible = false
    },

    showMore: () => {
      this.showMore = true
    },
    hiddenMore: () => {
      this.showMore = false
    },
    submit: (status: string) => {
      this.methods.submited('submitted')
    },
    cache: () => {
      this.methods.submited('draft')
    },
    onNoteChange: debounce(500, ({ detail }: any) => {
      this.note = detail
    })
  }
  watch = {
    'chooseCustomerInfo': () => {
      this.org = {
        key: '',
        value: '请选择',
        orgId: '',
      }
      if(this.chooseCustomerInfo && this.chooseCustomerInfo.customerCode && this.chooseCustomerInfo.legalPerson !== '' ) {
        this.item.customerCode = this.chooseCustomerInfo.customerCode
        this.item.orgId = ''
        this.$apply()
      } else {
        this.item.customerCode = '',
        this.item.orgId = ''
      }
    },
    'org': () => {
      if(this.org && this.org.orgId && this.chooseCustomerInfo && this.chooseCustomerInfo.legalPerson !== '') {
        this.item.orgId = this.org.orgId
        this.$apply()
      }
    },
    'customerInfos': (newValue: any) => {
      // 收货地址
      if (newValue.customerAddressAllList.length > 0) {
        const item = newValue.customerAddressAllList[0]
        this.receiverInfo = item
      } else {
        this.receiverInfo = {
          id: '',
          name: '请选择'
        }
      }

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
    'fhckList': (newValue: Array<Object>) => {
      if (newValue.length > 0) {
        const item = newValue[0]
        this.sendInventoryInfo = item
      } else {
        this.sendInventoryInfo = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    },
  }

  events = {
    'amount-change': (payload: any) => {
      this.amount = `${((+this.amount) + (+payload.amount)).toFixed(2)}`
    }
  }

  onShow() {
    if (this.loading) {
      Toast.loading({
        message: '正在加载',
        duration: 0
      })
    }
  }

  onLoad() {
    this.$broadcast('return-stock')
    this.methods.getReturnSupplier({
      _loading: true,
      cisCode: wepy.$instance.globalData.cisCode
    })
    // 获取基本信息
    this.methods.getBaseData({
      type: 'cglrrkck' // 入库仓库
    })
    this.methods.getBaseData({
      type: 'ssmd' // 所属门店
    })
    this.methods.getBaseData({
      type: 'ywy' // 业务员
    })
    this.methods.getBaseData({
      type: 'kpf' // 开票方
    })
    this.methods.getBaseData({
      type: 'gys' // 供应商
    })
  }
}
