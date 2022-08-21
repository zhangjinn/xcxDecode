import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import {
  getOrderList,
} from '@/store/actions/order';
import {
  findAllInventoryLogNew,
  getOutWarehouseList,
} from '@/store/actions/dmsoutwarehouse';
import { fillZero, getLastMonthYesterday,addDate, addMonth } from '@/utils/index';
import { baseUrl, request } from '@/utils/request';
import utilsWxs from '../../../wxs/utils.wxs';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
import { againCommonOrder, agentCanceleOrder } from '@/store/actions/order';
import {
  getNormalSalesOrderCustomerInfo
} from '@/store/actions/dmsorder';
import {forEach} from 'ramda';
import { RESET_ORDER_LIST } from '@/store/types/order';
import { getDistributorType } from '@/store/actions/inventory';

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
  cancelOrderPopup: boolean;
  continuePayPopup: boolean;
  showFlag: boolean;
  scrollTop: number;
  warehouseName: string;
  materialGroupOptions: any[];
  inventoryTypeOptions: any[];
  inventoryStatusOptions: any[];
  qualityLevelOptions: any[];
  viewAccountOptions: any[];
  orgOptions: any[];
  headerTabList: any[];
}

@connect({
  logList({dmsoutwarehouse}){
    return dmsoutwarehouse.inventoryLogList
  },
  logPage({dmsoutwarehouse}){
    return dmsoutwarehouse.logPage
  },
  warehouseList({ dmsoutwarehouse }) { // 仓库筛选列表
    return dmsoutwarehouse.warehouseList
  },
}, {
  getOrderList,
  againCommonOrder,
  agentCanceleOrder,
  findAllInventoryLogNew,
  getOutWarehouseList,
  getNormalSalesOrderCustomerInfo,
  getDistributorType,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '收发明细',
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
    currentDateName: '',
    cancelOrderPopup: false,
    continuePayPopup: false,
    scrollTop: 0,
    filterForm: {
      model: '', // 产品型号
      warehouseId: '', // 仓库id
      stvNum: '', // 单据
      startDate: '',// 订单日期开始
      endDate: '',// 订单日期结束
      materialGroupId: '', // 物料组id
      inventoryTypeId: '', // 库存类型id
      inventoryStatusId: '', // 库存状态id
      qualityLevelId: '', // 质量等级id
      viewAccountId: [], // 查看账户id
      orgId: '', // 销售组织id
      pageNo: 1
    },
    filterFormExtra: {
      materialGroupName: '', // 物料组名称
      warehouseName:'', // 仓库名称
      inventoryTypeName:'', // 库存类型名称
      inventoryStatusName:'', // 库存状态名称
      qualityLevelName:'', // 质量等级名称
      viewAccountName:[], // 查看账户名称
      orgName:'', // 销售组织名称
      timeFrame:''
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    baseUrl: baseUrl,
    materialGroupOptions: [], // 物料组选项列表
    inventoryTypeOptions: [], // 库存类型选项列表
    inventoryStatusOptions: [], // 库存状态选项列表
    qualityLevelOptions: [], // 质量等级选项列表
    viewAccountOptions: [], // 查看账户选项列表
    orgOptions: [], // 销售组织选项列表
    headerTabList: [
      { name: '仓库', type: 'warehouseName', selectValue: '' },
      { name: '日期', type: 'date', selectValue: '' },
    ], // 顶部搜索切换按钮列表
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

    // 请输入产品型号
    onOrderCodeChange(e) {
      this.filterForm = { ...this.filterForm, model: e.detail }
    },

    //请输入单据编号
    onOrderIdChange(e) {
      this.filterForm = { ...this.filterForm, stvNum: e.detail }
    },

    // 修改仓库
    selectChangewarehouse: (key: any) => {
      this.filterFormExtra.warehouseName = ''
      this.filterForm.warehouseId = ''
      forEach((item) => {
        if(item.id == key) {
          this.filterFormExtra.warehouseName = item.value
          this.filterForm.warehouseId = key
        }
      },this.warehouseList)
      this.agentPopup = false
      this.$apply()
    },

    // 筛选条件列表选择之后赋值
    selectChangeFilterStatus: (e) => {
      const { key, name, item, type } = e.currentTarget.dataset
      if(type && type === 'multiple'){
        let oIndex = this.filterForm[key].indexOf(item.code)
        if (oIndex > -1) {
          this.filterForm[key].splice(oIndex, 1)
          this.filterFormExtra[name].splice(oIndex, 1)
        } else {
          this.filterForm[key].push(item.code)
          this.filterFormExtra[name].push(item.name)
        }
      }else{
        this.filterForm[key] = item.code
        this.filterFormExtra[name] = item.name
        this.agentPopup = false
      }
      this.$apply()
    },
    //库存流水 侧边筛选下拉选
    selectagentPopup: (e) => {
      if(e == 'ckmc') {
        this.popupTitle = '仓库'
      } else if (e == 'wlz') {
        this.popupTitle = '物料组'
      } else if (e == 'kclx') {
        this.popupTitle = '库存类型'
      } else if (e == 'kczt') {
        this.popupTitle = '库存状态'
      } else if (e == 'zldj') {
        this.popupTitle = '质量等级'
      } else if (e == 'ckzh') {
        this.popupTitle = '查看账户'
      } else if (e == 'swlx') {
        this.popupTitle = '业务类型'
      } else if (e == 'kcsw') {
        this.popupTitle = '库存事务'
      } else if (e == 'xszz'){
        this.popupTitle = '销售组织'
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
      const now = new Date()
      const month = now.getMonth() +1
      const day = now.getDate()

      this.filterForm = {
        ...this.filterForm,
        model: '', // 产品型号
        warehouseId: '', // 仓库id
        stvNum: '', // 单据
        startDate: getLastMonthYesterday(),
        endDate: `${now.getFullYear()}-${ month > 9 ? month : `0${month}`}-${day > 9 ? day: `0${day}`}`,
        materialGroupId: '', // 物料组id
        inventoryTypeId: '', // 库存类型id
        inventoryStatusId: '', // 库存状态id
        qualityLevelId: '', // 质量等级id
        viewAccountId: [], // 查看账户id
        orgId: '', // 销售组织id
        pageNo: 1
      }
      this.filterFormExtra = {
        ...this.filterFormExtra,
        materialGroupName: '', // 物料组名称
        warehouseName:'', // 仓库名称
        inventoryTypeName:'', // 库存类型名称
        inventoryStatusName:'', // 库存状态名称
        qualityLevelName:'', // 质量等级名称
        viewAccountName:[], // 查看账户名称
        orgName:'', // 销售组织名称
        timeFrame:''
      }
      this.$apply()
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
    isItemShowFun(item, index){
      this.logList.data[index].isShowActive = !this.logList.data[index].isShowActive
      this.$apply()
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
    onSelectStatus(status) {
      this.filterForm = { ...this.filterForm, status, pageNo: 1 }
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    //仓库选择
    onSelectWarehouseName(warehouseId, warehouseName) {
      this.warehouseName = warehouseName;
      this.filterForm = { ...this.filterForm, warehouseId, pageNo: 1  }
      this.filterFormExtra = { ...this.filterFormExtra, warehouseName }
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

    onSelectTimeFrame(timeFrame) {

      let type = timeFrame;
      const now = new Date()
      const month = now.getMonth() +1
      now.setMonth(month)
      const day = now.getDate()
      if('1' == type){//最近一个月
        this.filterForm = {
          ...this.filterForm,
          startDate: addMonth(now,-1),
          endDate: `${now.getFullYear()}-${ month > 9 ? month : `0${month}`}-${day > 9 ? day: `0${day}`}`
        }
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
    openCalendar(e) {
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
      this.calendarShow = false;
      if(this.currentDateName == 'djDate'){
        this.filterForm = { ...this.filterForm, endDate: day, pageNo: 1 }
        this.myGetOrderList();
      }else{
        this.filterForm = { ...this.filterForm, [this.currentDateName]: day }
        if(this.currentDateName=='startDate' || this.currentDateName=='endDate' ){
          this.filterFormExtra = { ...this.filterFormExtra, timeFrame:'' }
        }
      }
      this.$apply()
    },
    onGetOrderListNext() {
      const { totalPage } = this.logPage
      if(totalPage > this.filterForm.pageNo) {
        this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1}
        this.myGetOrderList()
      }
    }
  };

  myGetOrderList() {
    let { warehouseId, model, startDate, endDate, stvNum, inventoryTypeId, inventoryStatusId, qualityLevelId, viewAccountId, orgId, materialGroupId} = this.filterForm
    let terms = {
      gicWarehouse: warehouseId, // 仓库
      materialmodel: model, // 产品型号
      startbizTime: startDate, // 单据日期开始
      endbizTime: endDate, // 单据日期结束
      billno: stvNum, // 单据编号
      invType: inventoryTypeId, // 库存类型
      gicInvStatus: inventoryStatusId, // 库存状态
      invStatusId: qualityLevelId, // 质量等级
      allDealerCode: viewAccountId.toString(), // 查看账户(可多选)
      biztype: '', // 业务类型--暂时隐藏先不传
      invstatusname: '', // 库存事务--暂时隐藏先不传
      orgCode: orgId, // 销售组织
      materialgroup: materialGroupId, // 物料组
    }
    this.methods.findAllInventoryLogNew(wepy.$instance.globalData.cisCode,terms,this.filterForm.pageNo);

  }
// 获取销售组织选项列表
  getOrgData() {
    this.orgOptions = [{code: '', name: '全部'}]
    request({ api: `comm/queryOrg.nd` }).then(res => {
      if(res.orgList){
        this.orgOptions = [...this.orgOptions, ...res.orgList]
      }
      this.$apply()
    })
  }
  // 获取物料组选项列表
  getMaterialGroupData() {
    this.materialGroupOptions = [{code: '', name: '全部'}]
    request({
      api: 'comm/queryMatklCode.nd',
      callback: (res: any) => {
        if (res.data && res.data.list) {
          this.materialGroupOptions = [...this.materialGroupOptions, ...res.data.list]
        }
      },
    });
  }
  getFilterList(){
    const cisCode = wepy.$instance.globalData.cisCode

    this.getMaterialGroupData()
    this.getOrgData()
    // 获取库存类型选项列表
    this.inventoryTypeOptions = [{code: '', name: '全部'}]
    this.methods.getDistributorType({
      cisCode: cisCode,
      field: "invType",
      formCode: "dmsAllInventoryLogCondition",
    }).then((res)=>{
      const { payload: { data }} = res
      if(data && data.length){
        this.inventoryTypeOptions = [...this.inventoryTypeOptions, ...data]
      }
    })

    // 获取库存状态选项列表
    this.inventoryStatusOptions = [{code: '', name: '全部'}]
    this.methods.getDistributorType({
      cisCode: cisCode,
      field: "gicInvStatus",
      formCode: "dmsAllInventoryLogCondition",
    }).then((res)=>{
      const { payload: { data }} = res
      if(data && data.length){
        this.inventoryStatusOptions = [...this.inventoryStatusOptions, ...data]
      }
    })

    // 获取质量等级选项列表
    this.qualityLevelOptions = [{code: '', name: '全部'}]
    this.methods.getDistributorType({
      cisCode: cisCode,
      field: "invStatusId",
      formCode: "dmsAllInventoryLogCondition",
    }).then((res)=>{
      const { payload: { data }} = res
      if(data && data.length){
        this.qualityLevelOptions = [...this.qualityLevelOptions, ...data]
      }
    })

    // 获取查看账户选项列表
    this.methods.getDistributorType({
      cisCode: cisCode,
      field: "allDealerCode",
      formCode: "dmsAllInventoryLogCondition",
    }).then((res)=>{
      const { payload: { data }} = res
      if(data && data.length){
        this.viewAccountOptions = [...this.viewAccountOptions, ...data]
      }
    })
  }
  onLoad() {
    this.methods.getOutWarehouseList()
    this.getFilterList()

    const now = new Date()
    const month = now.getMonth() +1
    const day = now.getDate()
    this.filterForm = {
      ...this.filterForm,
      startDate: getLastMonthYesterday(),
      endDate: `${now.getFullYear()}-${ month > 9 ? month : `0${month}`}-${day > 9 ? day: `0${day}`}`,
      pageNo: 1
    }
    this.myGetOrderList()
  }
}
