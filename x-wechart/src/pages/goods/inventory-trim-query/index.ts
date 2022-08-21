import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { getInvStatusType,getStockTransBaseInfo} from '@/store/actions/dmsorder';
import { getInvStatusList} from '@/store/actions/dmsoutwarehouse';
import { getInventoryList,getBaseInfo,getStoreHouse} from '@/store/actions/inventoryTrim';
import { fillZero } from '@/utils/index';
import { baseUrl } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import { dmsRequest } from '@/store/actions/dmsrequest';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  visible: boolean;
  // messagepopup:boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  calendarShow: boolean;
  filterForm: object;
  filterFormExtra:object;
  calendarConfig: object;
  currentDateName: string;
  baseUrl: string;
  scrollTop: number;
  // cancelSucMes: string;
  agentPopup:boolean;
  popupTitle: string;
  timeFrameVisible:boolean;
  timeList:Array<any>;
  timeFrameCenter:String;
  postTrimParams:Object;
  headerTabList: any[];
}

@connect({
  inventoryTrimList({ inventoryTrim }) {
    return inventoryTrim.inventoryTrimList
  },
  staStatus({ inventoryTrim }) {//单据状态
    return inventoryTrim.staStatus
  },
  transactionType({ inventoryTrim }) {//事务类型
    return inventoryTrim.transactionType
  },
  storeHouse({ inventoryTrim }) {//库存列表
    return inventoryTrim.storeHouse
  },
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
  }
}, {
  getInvStatusList,
  getInvStatusType,
  getStockTransBaseInfo,
  getInventoryList,
  getBaseInfo,
  getStoreHouse
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '库存调整明细',
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
    timeFrameVisible:false,
    visible: false,//筛选
    // messagepopup:false,//提示
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    calendarShow: false,//日历显示隐藏
    agentPopup: false,//筛选2级弹框
    currentDateName: '',
    // cancelSucMes:'',
    popupTitle: '',
    scrollTop: -1,
    filterForm: {
      cisCode:'',
      terms: {
        documentNum: '',
        documentDateFrom: '',//开始日期
        documentDateTo: '',//结束日期
        gicOutWarehouse: '',
        gicInWarehouse: '',
        // invStatusId: '',
        productId:'',
        productName:'',
        // invStatusTypeId:'',
        status:'',
        timeFrame:''//日期选择，
      },
      page: {
        pageNo: 1,
        pageSize: 10,
      },
    },
    filterFormExtra: {
      invStatus: '',
      // stockStatusName:''
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    baseUrl: baseUrl,
    timeList: [
      { label: '全部日期', value: '' },
      { label: '最近一周', value: '7' },
      { label: '最近一个月', value: '1' },
      { label: '最近三个月', value: '3' },
      { label: '最近六个月', value: '6' },
    ],
    timeFrameCenter:'',
    postTrimParams:{
      terms: {
        documentNum: '',
        documentDateFrom: '',
        documentDateTo: '',
        warehouseId:'',
        transactionType: '',
        status: ''
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        sortName: '',
        sortOrder: ''
      },
      isImg:false,
      ImgArr:[]
    },
    headerTabList: [
      { name: '仓库', type: 'inventory', selectValue: '' },
      { name: '单据状态', type: 'billStatus', selectValue: '' },
      { name: '单据类型', type: 'billType', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };
  // 页面内交互写在methods里
  methods = {
     // 回单影像
     receiptEffect(item) {
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
      if (['billType', 'billStatus','inventory'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    //单据编号 点击事件
    onOrderNumChange(e){
      this.postTrimParams.terms.documentNum = e.detail;
    },

    //全部日期点击
    onToggleTimeFrame() {
      this.timeFrameCenter = this.filterForm.terms.timeFrame
      this.timeFrameVisible = !this.timeFrameVisible
    },
    // 全部日期选择确定
    onToggleTimeFrameTrue(){
      this.filterForm.terms.timeFrame = this.timeFrameCenter
      this.timeFrameVisible = !this.timeFrameVisible
    },
    // 日期选择item
    onSelectTimeFrame(timeFrame) {
      this.timeFrameCenter = timeFrame
      this.methods.timeForMat(timeFrame)
    },
    timeForMat:(count:any)=> {// 拼接时间
      if(count==7){
        count = 7
      }else if(count==1){
        count=30
      }
      else if(count==3){
        count=90
      }
      else if(count==6){
        count=180
      }
      let now = new Date();
      let year = now.getFullYear();
      let month = (now.getMonth()+1)<10?('0'+(now.getMonth()+1)):now.getMonth()+1;
      let date = now.getDate()<10?('0'+now.getDate()):now.getDate()
      let hour= now.getHours()<10?('0'+now.getHours()):now.getHours();
      let minute= now.getMinutes()<10?('0'+now.getMinutes()):now.getMinutes();
      let second= now.getSeconds()<10?('0'+now.getSeconds()):now.getSeconds();
      // let nowDate = year+'-'+month+'-'+date+" "+hour+":"+minute+":"+second
      let nowDate = year+'-'+month+'-'+date
      this.postTrimParams.terms.documentDateTo = nowDate
      let before = new Date()
      before.setTime(before.getTime() - (24 * 60 * 60 * 1000 * (count-1)))
      let Y2 = before.getFullYear()
      let M2 = ((before.getMonth() + 1) < 10 ? '0' + (before.getMonth() + 1) : (before.getMonth() + 1))
      let D2 = (before.getDate() < 10 ? '0' + before.getDate() : before.getDate())
      // this.postTrimParams.terms.documentDateFrom = Y2+'-'+M2+'-'+D2+" "+hour+":"+minute+":"+second
      this.postTrimParams.terms.documentDateFrom = Y2+'-'+M2+'-'+D2
    },

    // 筛选条件显示/隐藏
    orderfiltering: () => {
      this.visible = !this.visible//筛选
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    // 单据类型筛选 点击事件
    onSelectOrderTypeCode(transactionType) {
      this.postTrimParams.terms = { ...this.postTrimParams.terms, transactionType }
      this.postTrimParams.page = { ...this.postTrimParams.page, pageNo: 1 }
      this.headerTabList[2].selectValue = transactionType
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },
    // 单据状态筛选 点击事件
    onSelectStatus(status) {
      this.postTrimParams.terms = { ...this.postTrimParams.terms, status }
      this.postTrimParams.page = { ...this.postTrimParams.page, pageNo: 1 }
      this.headerTabList[1].selectValue = status
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },
    // 库存点击事件
    onSelectChangeStore(warehouseId) {
      this.postTrimParams.terms = { ...this.postTrimParams.terms, warehouseId }
      this.postTrimParams.page = { ...this.postTrimParams.page, pageNo: 1 }
      this.headerTabList[0].selectValue = warehouseId
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },

    //重置按钮
    onResetFilterForm() {
      this.postTrimParams.terms = {
        ...this.postTrimParams.terms,
        documentNum: '',
        documentDateFrom: '',
        documentDateTo: '',
        // status:'',
        // productName:'',
        // productId:''
      }
      this.filterForm.terms.timeFrame=''
    },
    //筛选条件提交
    onSubmitFilterForm() {
      // let {documentNum,documentDateFrom,documentDateTo} = this.postTrimParams.terms
      // if(documentNum||(documentDateFrom&&documentDateTo)){
        this.postTrimParams.page = { ...this.postTrimParams.page, pageNo: 1 }
        this.myGetOrderList()
        this.methods.orderfiltering()
        this.methods.scrollToTop()
      // }else{
      //   Toast('请填写筛选条件');
      // }

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

    // 选择日期
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { documentDateFrom, documentDateTo } = this.postTrimParams.terms;
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
    closeCalendar() {//日历关闭
      this.calendarShow = false;
    },
    clearCalendar(name) {
      this.postTrimParams.terms = { ...this.postTrimParams.terms, [name]: '' }
    },
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      // let name = this.currentDateName
      // if(name=='documentDateFrom'){
      //   this.postTrimParams.terms.documentDateFrom = day
      // }else if(name=='documentDateTo'){
      //   this.postTrimParams.terms.documentDateTo = day
      // }
      this.postTrimParams.terms = { ...this.postTrimParams.terms, [this.currentDateName]: day }
      if(this.currentDateName=='documentDateFrom' || this.currentDateName=='documentDateTo' ){
        this.filterForm.terms = { ...this.filterForm.terms, timeFrame:'' }
      }
      this.calendarShow = false;
    },
    // 上拉刷新数据加载下一页
    onGetOrderListNext() {
      const { totalPage, totalCount } = this.inventoryTrimList.page
      if (totalPage > this.postTrimParams.page.pageNo) {
        this.postTrimParams.page = { ...this.postTrimParams.page, pageNo: this.postTrimParams.page.pageNo + 1 }
        this.myGetOrderList()
      }
    }
  };
  myGetOrderList() {
    this.postTrimParams.cisCode = wepy.$instance.globalData.cisCode;
    // this.methods.getAllotOrderList({ _loading: true, ...this.filterForm });
    this.methods.getInventoryList(this.postTrimParams)
  }
  onShow() {
    this.myGetOrderList()
    this.methods.getInvStatusList()
    this.methods.getInvStatusType()//补差类型
    this.methods.getStockTransBaseInfo()//调拨接口基础信息获取
    this.methods.getBaseInfo()
    this.methods.getStoreHouse({orgId:''})
  }
  onLoad() {

  }
}
