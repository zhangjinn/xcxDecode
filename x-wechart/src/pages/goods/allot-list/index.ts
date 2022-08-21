import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { getInvStatusType,getAllotOrderList,getStockTransBaseInfo, getAllocationRatio} from '@/store/actions/dmsorder';
import { getInvStatusList} from '@/store/actions/dmsoutwarehouse';
import { fillZero } from '@/utils/index';
import { baseUrl } from '@/utils/request';
import { forEach } from 'ramda'
import Toast from '@/components/vant/toast/toast';
import { dmsRequest } from '@/store/actions/dmsrequest';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  visible: boolean;
  messagepopup:boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  calendarShow: boolean;
  filterForm: object;
  filterFormExtra:object;
  calendarConfig: object;
  currentDateName: string;
  baseUrl: string;
  scrollTop: number;
  cancelSucMes: string;
  agentPopup:boolean;
  popupTitle: string;
  popAllocationRatioVisible:boolean
  headerTabList: any[];
}

@connect({
  orderList({ dmsorder }) {
    return dmsorder.orderList
  },
  warehousesInList({ dmsorder }) {
    return dmsorder.warehousesIn
  },
  warehousesOutList({ dmsorder }) {
    return dmsorder.warehousesOut
  },

  stockStatus({ dmsorder }) {
    return dmsorder.stockStatus
  },
  invStatusList({ dmsoutwarehouse }) {
    return dmsoutwarehouse.invStatusList
  },
  invStatusTypeList({ dmsorder }){
    return dmsorder.invStatusType
  },
  allocationRatioList({ dmsorder }) {
    return dmsorder.allocationRatioList
  },
}, {
  getInvStatusList,
  getInvStatusType,
  getAllotOrderList,
  getStockTransBaseInfo,
  getAllocationRatio
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '调拨查询',
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
  data: Data = {
    visible: false,
    messagepopup:false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    calendarShow: false,
    agentPopup: false,
    currentDateName: '',
    cancelSucMes:'',
    popupTitle: '',
    scrollTop: -1,
    filterForm: {
      cisCode:'',
      terms: {
        documentNum: '',
        documentDateFrom: '',
        documentDateTo: '',
        gicOutWarehouse: '',
        gicInWarehouse: '',
        // invStatusId: '',
        // productModel:'',
        // productColor:'',
        // invStatusTypeId:'',
        status:''
      },
      page: {
        pageNo: 1,
        pageSize: 10,
      },
    },
    filterFormExtra: {
      invStatus: '',
      invStatusTypeName:'',
      stockStatusName:''
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    baseUrl: baseUrl,
    isImg:false,
    ImgArr:[],
    popAllocationRatioVisible: false, // 调拨比例显示隐藏变量

    ImgArr:[],
    headerTabList: [
      { name: '移出仓库', type: 'orderStatus', selectValue: '' },
      { name: '移入仓库', type: 'orderType', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };
  // 页面内交互写在methods里
  methods = {
    // 回单影像
    receiptEffect(item) {
      console.log('item',item);
      let id = item.documentNum
      dmsRequest({
        data: {
          'cisCode': wepy.$instance.globalData.cisCode,
          'documentNum': id
        },
        method: 'toOmsView'
      }).then((res: any) => {
        if(res.data) {
          this.isImg = true
          this.ImgArr = res.data
        } else {
          Toast.fail('暂无回单影像');
        }
      })
    },
    onClose(){
      this.isImg = false
    },
    viewDetail: (e: any) => {
      if (e) {
        wx.navigateTo({
          url: `/pages/goods/allot-list/detail/index?documentNum=${e.documentNum}`
        })
      }
    },
    //移入移出筛选条件
    touchOrderSFilter: (tabItem) => {
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
      if (!this.OrderSFilterVisible) {
        this.OrderSFilterVisible = true
        this.CurrentOrderSFilterName = name
        return
      }
      if (!name) {
        this.OrderSFilterVisible = false
        this.CurrentOrderSFilterName = ''
        return
      }
      if (this.CurrentOrderSFilterName === name) {
        this.OrderSFilterVisible = false
        this.CurrentOrderSFilterName = ''
        return
      }
      if (['orderType', 'orderStatus'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    // 产品型号 点击事件
    onZzprdmodelChange(e) {
      this.filterForm = { ...this.filterForm.terms, productModel: e.detail }
    },
    //产品颜色 点击事件
    onOrderColorChange(e) {
      this.filterForm = { ...this.filterForm.terms, productColor: e.detail }
    },
    onOrderNumChange(e){
      this.filterForm.terms.documentNum = e.detail;
    },
    // 筛选条件显示/隐藏
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    // 移入仓库 点击事件
    onSelectOrderTypeCode(gicInWarehouse) {
      this.filterForm.terms = { ...this.filterForm.terms, gicInWarehouse }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.headerTabList[1].selectValue = gicInWarehouse
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },
    // 移出仓库 点击事件
    onSelectStatus(gicOutWarehouse) {
      this.filterForm.terms = { ...this.filterForm.terms, gicOutWarehouse }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.headerTabList[0].selectValue = gicOutWarehouse
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },
    // 库存状态点击事件
    selectChangeInvStatus: (key: any) => {
      forEach((item) => {
        if(item.id == key) {
          this.filterFormExtra.invStatus = item.value
          this.filterForm.terms.invStatusId = item.id
        }
      },this.invStatusList)
      this.agentPopup = false
      this.$apply()
    },
    //补差类型 点击事件
    selectInvStatusType: (key: any) => {
      forEach((item) => {
        if(item.id == key) {
          this.filterFormExtra.invStatusTypeName = item.name
          this.filterForm.terms.invStatusTypeId = key
        }
      },this.invStatusTypeList)
      this.agentPopup = false
      this.$apply()
    },
    selectStockStatus: (key: any) => {
      forEach((item) => {
        if(item.id == key) {
          this.filterFormExtra.stockStatusName = item.name
          this.filterForm.terms.status = key
          this.filterFormExtra.stockStatusName = item.name
          this.filterForm.terms.status = key
        }
      },this.stockStatus)
      this.agentPopup = false
      this.$apply()
    },

    //调拨查询 侧边筛选下拉选
    selectagentPopup: (e) => {
      if (e == 'kczt') {
        this.popupTitle = '库存状态'
      } else if (e == 'bclx') {
        this.popupTitle = '补差类型'
      } else if (e == 'dbzt') {
        this.popupTitle = '调拨状态'
      }
      this.agentPopup = !this.agentPopup
    },

    //筛选条件提交
    onSubmitFilterForm() {
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
      this.methods.scrollToTop()
    },
    // 回到顶部
    scrollToTop: () => {
      this.scrollTop = 0
    },
    //订单详情滚动
    onScroll: (event: Weapp.Event) => {
      if (this.scrollTop === 0) {
        this.scrollTop = event.detail.scrollTop
      }

    },
    //重置按钮
    onResetFilterForm() {
      this.filterForm.terms = {
        documentNum: '',
        documentDateFrom: '',
        documentDateTo: '',
        gicOutWarehouse: '',
        gicInWarehouse: '',
        status:''
      }
      this.filterFormExtra.stockStatusName = '';
    },
    // 选择日期
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { documentDateFrom, documentDateTo } = this.filterForm.terms;
      const { name, type } = e.target.dataset
      this.currentDateName = name
      let begin, end;
      if (type === 'date') {
        begin = documentDateFrom
        end = documentDateTo
      }
      if (type === 'sapDate') {
        begin = documentDateFrom
        end = documentDateTo
      }
      if (name.indexOf('documentDateFrom') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if (name.indexOf('documentDateTo') > -1) {
        this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
      }
      this.calendarShow = true;
    },
    closeCalendar() {
      this.calendarShow = false;
    },
    clearCalendar(name) {
      this.filterForm.terms = { ...this.filterForm.terms, [name]: '' }
    },
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.filterForm.terms = { ...this.filterForm.terms, [this.currentDateName]: day }
      this.calendarShow = false;
    },

    onGetOrderListNext() {
      const { totalPage, totalCount } = this.orderList.page
      if (totalPage > this.filterForm.page.pageNo) {
        this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1 }
        this.myGetOrderList()
      }
    },

    // 调拨比例弹框显示
    handleCheckAllocationRatio(){
      this.popAllocationRatioVisible = true
    },

    // 调拨比例弹框隐藏
    onCloseAllocationRatio(){
      this.popAllocationRatioVisible = false
    }
  };
  myGetOrderList() {
    this.filterForm.cisCode = wepy.$instance.globalData.cisCode;
    this.methods.getAllotOrderList({ _loading: true, ...this.filterForm });
  }
  onShow() {
    this.myGetOrderList()
    this.methods.getInvStatusList()
    this.methods.getInvStatusType()
    this.methods.getStockTransBaseInfo()
    this.methods.getAllocationRatio()

  }
  onLoad() {

  }
}
