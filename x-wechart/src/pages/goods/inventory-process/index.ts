import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { getOrderList, getOrderFilter,getOrderDeliveryMethod } from '@/store/actions/order';
import { findAllInventoryLog,getInvStatusList,getOutWarehouseList,getSupperlierList,getTransactionType} from '@/store/actions/dmsoutwarehouse';
import { fillZero, getLastMonthYesterday, getDateDiff,addDate, addMonth } from '@/utils/index';
import { baseUrl, request } from '@/utils/request';
import utilsWxs from '../../../wxs/utils.wxs';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
import { againCommonOrder, agentCanceleOrder } from '@/store/actions/order';
import { getInvStatusType, getNormalSalesOrderCustomerInfo} from '@/store/actions/dmsorder';
import {forEach, type} from 'ramda';
import { RESET_ORDER_LIST } from '@/store/types/order';
import {RESET_INVENTORY_QUERIES_LIST} from '@/store/types/inventory';

interface Data {
  visible: boolean;
  Suppliersextend: boolean;
  Itemgroupextend: boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  timeFrameVisible: boolean;
  calendarShow: boolean;
  filterForm: object;
  filterFormExtra: object;
  calendarConfig: object;
  currentDateName: string;
  baseUrl: string;
  popupTitle: string;
  agentPopup: boolean;
  agentPopupName: string;
  deliveryPopupName: string;
  purchasePopupName: string;
  cancelOrderPopup: boolean;
  cancelOrderId: string;
  continuePayPopup: boolean;
  showFlag: boolean;
  continuePayId: string;
  scrollTop: number;
  warehouseName: string;
  headerTabList: any[];
}

/*const defaultFilterForm = {
  _loading: true,
  logLsit :[],
  agentCheckStart: '',
  agentCheckEnd: '',
  pageNo: 1,
  orderTypeCode: '',
  status: '',
  sapOrderStatus: '',
  zzprdmodel: '',
  orgId: '',
  matklId: '',
  beginDate: '',
  endDate: '',
  timeFrame: '',
  // sapBeginDate: '', 不用了
  // sapEndDate: '',
  agentId: '',
  trans: '',
  directBuy: '',
  purchaseTypeId: '',




  //库存流水
  orderCode: '',//产品型号
  orderColor: '',//产品颜色
  orderId: '',//单据编号
  ckmcId: '',
  kcztId: '',
  bclxId: '',
  swlxId: '',
  gysId: '',
  xszzId: '',
  czryId: '',
  sjlyId: '',
  ckmcPopName: '全部',
  kcztPopName: '全部',
  bclxPopName: '全部',
  swlxPopName: '全部',
  gysPopName: '全部',
  xszzPopName: '全部',
  czryPopName: '全部',
  sjlyPopName: '全部',
  ckmc: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  kczt: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  bclx: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  swlx: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  gys: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  xszz: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  czry: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  sjly: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ]
}*/

@connect({
  logList({dmsoutwarehouse}){
    return dmsoutwarehouse.inventoryLogList
  },
  logPage({dmsoutwarehouse}){
    return dmsoutwarehouse.logPage
  },
  deliveryMethod({ order }) {
    return order.deliveryMethod
  },
  mixinCurrentUser({ user }) {
    return user.info || {}
  },
  filter({ order }) {
    return order.filter
  },

  invStatusList({ dmsoutwarehouse }) {
    return dmsoutwarehouse.invStatusList
  },
  warehouseList({ dmsoutwarehouse }) {
    return dmsoutwarehouse.warehouseList
  },
  invStatusTypeList({ dmsorder }){

    return dmsorder.invStatusType
  },
  orgList({ dmsorder }) {
    return dmsorder.customerInfos.orgList
  },
  supperlierList({dmsoutwarehouse}){
    return dmsoutwarehouse.supperlierList
  },
  transactionType({dmsoutwarehouse}){
    return dmsoutwarehouse.transactionType
  }
}, {
  getOrderList,
  getOrderFilter,
  againCommonOrder,
  getOrderDeliveryMethod,
  agentCanceleOrder,
  findAllInventoryLog,
  getInvStatusList,
  getOutWarehouseList,
  getInvStatusType,
  getNormalSalesOrderCustomerInfo,
  getSupperlierList,
  getTransactionType
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '库存流水',
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
      'van-radio-group': '../../../components/vant/radio-group/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-stepper': '../../../components/vant/stepper/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-button': '../../../components/vant/button/index',
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index',
    },
  };
  components = {
    emptyDataType,
    headerTab,
  };
  wxs = {
    utils: utilsWxs,
  };
  data: Data = {
    visible: false,
    Suppliersextend: false,
    Itemgroupextend: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    timeFrameVisible: false,
    calendarShow: false,
    agentPopup: false,//下拉显隐flag
    popupTitle: '',
    filterStr: '',
    agentPopupName: '全部',
    deliveryPopupName: '全部',
    purchasePopupName: '全部',
    currentDateName: '',
    cancelOrderPopup: false,
    cancelOrderId: '',
    continuePayPopup: false,
    continuePayId: '',
    scrollTop: 0,
    filterForm: {
      productCode: '',
      productName: '',
      model: '',
      colour: '',
      warehouseId: '',
      invStatusId: '',
      invStatusType: '',
      supplierName: '',
      orgName: '',
      stvNum: '',
      transactionType: '',
      operator: '',
      dataSource: '',
      startDate: '',//订单日期开始
      endDate: '',//订单日期结束
      sapBeginDate: '', //要求到货日期开始
      sapEndDate: '',//要求到货日期结束
      gicWarehouseType: '',
      pageNo: 1
    },
    filterFormExtra: {
      orgName: '',
      matklName: '',
      invStatus: '',
      warehouse:'',
      invStatusTypeName:'',
      supperlierName:'',
      transactionTypeName:'',
      timeFrame:''
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    baseUrl: baseUrl,
    headerTabList: [
      { name: '仓库', type: 'warehouseName', selectValue: '' },
      { name: '事务类型', type: 'transtype', selectValue: '' },
      { name: '单据日期', type: 'date', selectValue: '' },
    ], // 顶部搜索切换按钮列表
    // purchaseType: [
    //   {
    //     key: 1,
    //     value: '项目一'
    //   },
    //   {
    //     key: 2,
    //     value: '项目二'
    //   }
    // ]
  };
  // 页面内交互写在methods里
  methods = {
    goMe:() => {
      wx.switchTab({
        url: '/pages/main/me/index'
      })
    },


    onScroll: (event: Weapp.Event) => {
      if (event.detail.scrollTop >= 350) {
        if (this.scrollTop === 0) {
          this.scrollTop = event.detail.scrollTop
        }
      }
    },


    onCheckDirectOrders: () => {
      if(this.filterForm.directBuy == '') {
        this.filterForm.directBuy = 1
      } else {
        this.filterForm.directBuy = ''
      }
      this.$apply()
    },
    selectAgent: (key: any) => {
      forEach((item) => {
        if(item.key == key) {
          this.agentPopupName = item.value
          this.filterForm = { ...this.filterForm, agentId: item.key }
        }
      },this.filter.itemAgent)
      this.agentPopup = false
      this.$apply()
    },
    selectDelivery: (key: any) => {
      forEach((item: any) => {
        if(item.code == key) {
          this.deliveryPopupName = item.name
          this.filterForm = { ...this.filterForm, trans: item.code }
        }
      },this.deliveryMethod)
      this.agentPopup = false
      this.$apply()
    },
    selectPurchaseType: (key: any) => {
      forEach((item: any) => {
        if(item.key == key) {
          this.purchasePopupName = item.value
          this.filterForm = { ...this.filterForm, purchaseTypeId: item.key }
        }
      },this.purchaseType)
      this.agentPopup = false
      this.$apply()
    },
    //***************************库存流水 侧边筛选 start***************************//
    //库存流水 侧边筛选 产品型号文本
    onOrderCodeChange(e) {
      this.filterForm = { ...this.filterForm, model: e.detail }
    },
    //库存流水 侧边筛选 产品颜色文本
    onOrderColorChange(e) {
      this.filterForm = { ...this.filterForm, colour: e.detail }
    },
    //库存流水 侧边筛选 单据编号文本
    onOrderIdChange(e) {
      this.filterForm = { ...this.filterForm, stvNum: e.detail }
    },
    // 库存流水 下拉选中 仓库名称为例
    selectChangewarehouse: (key: any) => {
      forEach((item) => {

        if(item.id == key) {
          this.filterFormExtra.warehouse = item.value
          this.filterForm.warehouseId = key
        }
      },this.warehouseList)
      this.agentPopup = false
      this.$apply()
    },

    selectInvStatusType: (key: any) => {
      forEach((item) => {
        if(item.id == key) {
          this.filterFormExtra.invStatusTypeName = item.name
          this.filterForm.invStatusType = key
        }
      },this.invStatusTypeList)
      this.agentPopup = false
      this.$apply()
    },

    selectSupperlier: (key: any) => {
      forEach((item) => {
        if(item.id == key) {
          this.filterFormExtra.supperlierName = item.value
          this.filterForm.supplierName = item.value
        }
      },this.supperlierList)
      this.agentPopup = false
      this.$apply()
    },

    selectChangeInvStatus: (key: any) => {
      forEach((item) => {
        if(item.id == key) {
          this.filterFormExtra.invStatus = item.value
          this.filterForm.invStatusId = item.id
        }
      },this.invStatusList)
      this.agentPopup = false
      this.$apply()
    },
    selectTransaction: (key: any) => {
      forEach((item) => {
        if(item.id == key) {
          this.filterFormExtra.transactionTypeName = item.value
          this.filterForm.transactionType = item.id
        }
      },this.transactionType)
      this.agentPopup = false
      this.$apply()
    },
    //库存流水 侧边筛选下拉选
    selectagentPopup: (e) => {
      if(e == 'ckmc') {
        this.popupTitle = '仓库名称'
      } else if (e == 'kczt') {
        this.popupTitle = '质量等级'
      } else if (e == 'bclx') {
        this.popupTitle = '补差类型'
      } else if (e == 'swlx'){
        this.popupTitle = '事务类型'
      } else if (e == 'gys'){
        this.popupTitle = '供应商'
      } else if (e == 'xszz'){
        this.popupTitle = '销售组织'
      } else if (e == 'czry'){
        this.popupTitle = '操作人员'
      } else if (e == 'sjly'){
        this.popupTitle = '数据来源'
      }
      this.agentPopup = !this.agentPopup
    },
    onTabChange: (tabItem) => {
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
      if(name == 'date'){
        this.methods.openCalendarDj()
      }else{
        this.methods.touchOrderSFilter(name)
      }
    },
    //库存流水 主要三种筛选条件点击
    touchOrderSFilter: (name) => {
      if(!this.OrderSFilterVisible) {
        this.OrderSFilterVisible = true
        this.CurrentOrderSFilterName = name
        return
      }
      if(!name) {
        this.OrderSFilterVisible = false
        this.CurrentOrderSFilterName = ''
        return
      }
      if(this.CurrentOrderSFilterName === name) {
        this.OrderSFilterVisible = false
        this.CurrentOrderSFilterName = ''
        return
      }
      if(['orderType', 'transtype', 'auditStatus'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    // 单据时间变更事件
    onToggleTimeFrame() {
      this.timeFrameVisible = !this.timeFrameVisible

    },
    // 筛选重置
    onResetFilterForm() {

    },

    //库存流水 左侧筛选 单据日期
    openCalendarDj: () => {
      // const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { startDate } = this.filterForm;
      this.currentDateName = 'djDate'
      this.$wxpage.calendar.enableArea([startDate,  maxDate]);
      this.calendarShow = true;
    },


    //单据展开
    isItemShowFun(item){
      // debugger
      for (const key in this.logList.data) {
        if(item.id == this.logList.data[key].id){
          this.logList.data[key].isShowActive = !this.logList.data[key].isShowActive
        }
        console.log(this.logList)
        this.$apply()
      }
    },

    viewDetail: (e: any) => {
      if (e) {
        wx.navigateTo({
          url: `/pages/me/order-detail/index?id=${e}`
        })
      }
    },
    Suppliers: () => {
      this.Suppliersextend = !this.Suppliersextend
    },
    Itemgroup: () => {
      this.Itemgroupextend = !this.Itemgroupextend
    },
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    onSelectOrderTypeCode(gicWarehouseType) {
      this.filterForm = { ...this.filterForm, gicWarehouseType, pageNo: 1 }
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    onSelectStatus(status) {
      this.filterForm = { ...this.filterForm, status, pageNo: 1 }
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    onSelectTransa(transactionType,transtypeName){
      console.log("事务相关：id,value",transactionType,transtypeName);
      this.filterForm = { ...this.filterForm, transactionType, pageNo: 1 }
      this.filterFormExtra.transactionTypeName = transtypeName
      this.headerTabList[1].selectValue = transactionType
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    //仓库选择
    onSelectWarehouseName(warehouseId, warehouseName) {
      this.warehouseName = warehouseName;
      this.filterForm = { ...this.filterForm, warehouseId, pageNo: 1  }
      this.headerTabList[0].selectValue = warehouseId
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    onSelectSOStatus(sapOrderStatus) {
      this.filterForm = { ...this.filterForm, sapOrderStatus, pageNo: 1 }
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    onSelectOrg(org: any) {
      const { key, value } = org
      if(this.filterForm.orgId === key) {
        this.filterForm = { ...this.filterForm, orgId: '' }
        this.filterFormExtra = { ...this.filterFormExtra, orgName: '' }
        return
      }
      this.filterForm = { ...this.filterForm, orgId: key }
      this.filterFormExtra = { ...this.filterFormExtra, orgName: value }
      this.agentPopup = false
    },
    onSelectmatkl(matkl: any) {
      const { key, value } = matkl
      if(this.filterForm.matklId === key) {
        this.filterForm = { ...this.filterForm, matklId: '' }
        this.filterFormExtra = { ...this.filterFormExtra, matklName: '' }
        return
      }
      this.filterForm = { ...this.filterForm, matklId: key }
      this.filterFormExtra = { ...this.filterFormExtra, matklName: value }
    },
    onSelectTimeFrame(timeFrame) {

      let type = timeFrame;
      const now = new Date()
      const month = now.getMonth() +1
      now.setMonth(month)
      const day = now.getDate()
      console.log("now,month,day:",now,month,day);
      if('1' == type){//最近一个月
        this.filterForm = {
          ...this.filterForm,
          startDate: addMonth(now,-1),
          endDate: `${now.getFullYear()}-${ month > 9 ? month : `0${month}`}-${day > 9 ? day: `0${day}`}`
        }
        console.log("startDate,enddate:",this.filterForm.startDate,this.filterForm.endDate)
      }
      if('3' == type){//最近3个月
        this.filterForm = {
          ...this.filterForm,
          startDate: addMonth(now,-3),
          endDate: `${now.getFullYear()}-${ month > 9 ? month : `0${month}`}-${day > 9 ? day: `0${day}`}`
        }
      }
      if('6' == type){//最近6个月
        this.filterForm = {
          ...this.filterForm,
          startDate: addMonth(now,-6),
          endDate: `${now.getFullYear()}-${ month > 9 ? month : `0${month}`}-${day > 9 ? day: `0${day}`}`
        }
      }
      if('7' == type){//最近一个周
        this.filterForm = {
          ...this.filterForm,
          startDate: addDate(now,-7),
          endDate: `${now.getFullYear()}-${ month > 9 ? month : `0${month}`}-${day > 9 ? day: `0${day}`}`
        }
      }
      this.filterFormExtra.timeFrame = type;
    },
    onSubmitFilterForm() {
      this.filterForm = { ...this.filterForm, pageNo: 1 }
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.myGetOrderList()
      this.methods.orderfiltering()
    },
    // 选择日期

    // openCalendar(e) {
    //   debugger
    //   console.log(e)
    //   const minDate = '1970-01-01'
    //   const maxDate = '9999-12-31'
    //   const { startDate, endDate, sapBeginDate, sapEndDate, agentCheckStart, agentCheckEnd } = this.filterForm;
    //   const { name, type } = e.target.dataset
    //   this.currentDateName = name
    //   let begin, end;
    //   if(type === 'date') {
    //     begin = startDate
    //     end = endDate
    //   }
    //   if(type === 'agent') {
    //     begin = agentCheckStart
    //     end = agentCheckEnd
    //   }
    //   if(type === 'sapDate') {
    //     begin = sapBeginDate
    //     end = sapEndDate
    //   }
    //   if(name.indexOf('beginDate') > -1) {
    //     this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
    //   }
    //   if(name.indexOf('endDate') > -1) {
    //     this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
    //   }
    //   if(name.indexOf('agent') > -1) {
    //     this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
    //   }
    //   this.calendarShow = true;
    // },


    openCalendar(e) {
      // debugger
      console.log(e)
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { startDate, endDate, sapBeginDate, sapEndDate } = this.filterForm;
      // const { name, type } = e.target.dataset
      const { name, type } =  e.currentTarget.dataset
      this.currentDateName = name
      let begin, end;
      if(type === 'date') {
        begin = startDate
        end = endDate
      }
      if(type === 'sapDate') {
        begin = sapBeginDate
        end = sapEndDate
      }

      if(name.indexOf('startDate') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if(name.indexOf('eginDate') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if(name.indexOf('ndDate') > -1) {
        this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
      }
      this.calendarShow = true;
    },
    closeCalendar() {
      this.calendarShow = false;
    },
    clearCalendar(name) {
      this.filterForm = { ...this.filterForm, [name]: '' }
    },
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      // this.filterForm.startDate = day
      // this.filterForm.endDate = day
      this.filterForm = { ...this.filterForm, [this.currentDateName]: day }

      if(this.currentDateName=='startDate' || this.currentDateName=='endDate' ){
        this.filterFormExtra = { ...this.filterFormExtra, timeFrame:'' }
      }

      this.calendarShow = false;
      this.myGetOrderList();
      this.$apply()
    },
    onGetOrderListNext() {

      const { totalPage } = this.logPage
      console.log("----->获取下一页，",totalPage,this.filterForm.pageNo);
      if(totalPage > this.filterForm.pageNo) {
        this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1}
        this.myGetOrderList()
      }
    }
    // takeAgainOrder(id: string) {
    //   Toast.loading({
    //     message: '下单中....',
    //     duration: 0,
    //   });
    //   this.methods.againCommonOrder({ id } , (res: any) => {
    //     const { data } = res;
    //     if (data && data.cartOrder) {
    //       Toast.clear();
    //       wx.navigateTo({
    //         url: '/pages/goods/order/index?type=again',
    //       });
    //     } else {
    //       Toast.fail(data.msg || '结算失败');
    //     }
    //   });
    // },
    // //代理商取消订单
    // canceleOrder(id: string) {
    //   Toast.loading({
    //     message: '取消中....',
    //     duration: 0,
    //   });
    //   this.methods.agentCanceleOrder({ id } , (res: any) => {
    //     const { data } = res;
    //     if (data && data.code === '0') {
    //       Toast.clear();
    //       wx.navigateTo({
    //         url: '/pages/goods/order/index?type=again',
    //       });
    //     } else {
    //       Toast.fail(data.msg || '取消失败');
    //     }
    //   });
    //
    // }
  };

  myGetOrderList() {
    // let cisCode: wepy.$instance.globalData.cisCode;
    this.methods.findAllInventoryLog(wepy.$instance.globalData.cisCode,this.filterForm,this.filterForm.pageNo);

  }
  onLoad() {

    this.methods.getInvStatusList()
    this.methods.getOutWarehouseList()
    this.methods.getInvStatusType()
    this.methods.getSupperlierList()
    this.methods.getTransactionType()

    // this.methods.getCustomer({ filterStr: (this.data.filterStr || '').trim() })

    this.methods.getOrderDeliveryMethod({type: ''})
    const now = new Date()
    const month = now.getMonth() +1
    const day = now.getDate()
    this.filterForm = {
      ...this.filterForm,
      // beginDate: `${now.getFullYear()}-01-01`,
      startDate: getLastMonthYesterday(),
      endDate: `${now.getFullYear()}-${ month > 9 ? month : `0${month}`}-${day > 9 ? day: `0${day}`}`

    }
    this.myGetOrderList()
    this.methods.getOrderFilter({ type: 1});
  }
}
