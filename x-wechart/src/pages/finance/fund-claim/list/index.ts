import wepy from 'wepy';
import { getFundClaimCounts } from '@/store/actions/fund-claim';
import { fillZero } from '@/utils/index';//日期月份补0
import { baseUrl } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
import { connect } from 'wepy-redux';
// import { getOrderList, getOrderFilter } from '@/store/actions/order';
// import { againCommonOrder, getOrderDeliveryMethod } from '@/store/actions/order';
// import { forEach } from 'ramda';

interface Data {
  visible: boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  timeFrameVisible: boolean;
  calendarShow: boolean;
  filterForm: object;
  calendarConfig: object;//日历弹框
  currentDateName: string;
  baseUrl: string;
  distributorsPopup: boolean;
  distributorsPopupName: string;
  popupName: string;
  // deliveryPopupName: string;
  fundClaimListQuery:object;
  // checked:boolean;
  orderMove:boolean;
  checkBtn:boolean;
  fundClaimList:Array<any>;
  hundSaleOrg:any;
  totalPages:any;
  view_show:boolean;
  lineBottom:boolean;
  scrollTop:any;
  showRightBtn: boolean;
  headerTabList: any[];
}

// @connect({
//   orderList({ order }) {
//     return order.orderList
//   }
// })
export default class Fundren extends wepy.page {
  config = {
    navigationBarTitleText: '资金认领',
    usingComponents: {
      'van-rate': '../../../../components/vant/rate/index',
      'van-icon': '../../../../components/vant/icon/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-picker': '../../../../components/vant/picker/index',
      'van-search': '../../../../components/vant/search/index',
      'van-tab': '../../../../components/vant/tab/index',
      'van-row': '../../../../components/vant/row/index',
      'van-col': '../../../../components/vant/col/index',
      'van-tabs': '../../../../components/vant/tabs/index',
      'van-radio': '../../../../components/vant/radio/index',
      'van-radio-group': '../../../../components/vant/radio-group/index',
      'van-cell': '../../../../components/vant/cell/index',
      'van-field': '../../../../components/vant/field/index',
      'van-loading': '../../../../components/vant/loading/index',
      'van-stepper': '../../../../components/vant/stepper/index',
      'van-cell-group': '../../../../components/vant/cell-group/index',
      'van-button': '../../../../components/vant/button/index',
      'van-checkbox': '../../../../components/vant/checkbox/index',
      'van-checkbox-group': '../../../../components/vant/checkbox-group/index',
      'calendar': '../../../../components/calendar/index',
      'img': '../../../../components/img/index',
    },
  };
  components = {
    emptyDataType,
    headerTab,
  };
  data: Data = {
    lineBottom:false,
    view_show:false,
    hundSaleOrg:"",
    scrollTop:0,
    fundClaimListQuery:{
      method: "queryNoticeBills",
      params: {
        pageno: 1,
        pagesize:5,
        claimstatus:"",
        tradetimeS:"",
        tradetimeE:"",
        hifi_flowstatus:''
      }
    },
    totalPages:0,
    fundClaimList:[],
    // checked: true,
    orderMove:false,
    checkBtn:false,
    visible: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    timeFrameVisible: false,
    calendarShow: false,
    distributorsPopup: false,
    distributorsPopupName: '全部',
    currentDateName: '',
    popupName: '',
    // deliveryPopupName: '全部',
    filterForm: {
      zzprdmodel: '',
      orderCode: '',
      fundName: '',
      billtype:'',
      billnumber:'',
      billperson:'',
      billpersonname:'',
      acceptorname:'',
      sapOrderStatus: '',//认领状态样式判断
      status: '',
      orderTypeCode: '',
      timeFrame: '',
      beginDate: '',
      endDate: ''
    },
    calendarConfig: {//日历弹框
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    baseUrl: baseUrl,
    showRightBtn: false,
    headerTabList: [
      { name: '交易类型', type: 'orderType', selectValue: '' },
      { name: '交易日期', type: 'orderStatus', selectValue: '' },
      { name: '认领状态', type: 'auditStatus', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };
  // 页面内交互写在methods里
  methods = {
    goPage(url: any):void {
      this.navigator({ link: { url } });
    },
    onChange:(event:any)=>{//checked按钮
      this.checked = event.detail
      this.$apply()
    },
    selectPopup: (name:any) => {
      if(name == 'suppliers') {
        this.popupName = '供应商'
      } else if (name == 'distributors') {
        this.popupName = '分销商'
      } else if (name == 'delivery') {
        this.popupName = '配送方式'
      }
      this.distributorsPopup = !this.distributorsPopup
    },
    // 弹出/隐藏筛选列表
    touchOrderSFilter: (tabItem:any) => {
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
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
      if(['orderType', 'orderStatus', 'auditStatus'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    // 详情跳转
    viewDetail: (e: any,bill:any) => {
      if (e) {
        wx.navigateTo({
          url: `/pages/finance/fund-claim/detail/index?id=`+ e +`&bill=`+bill
        })
      }
    },
    //认领跳转
    viewhandle:(e:any,c:any,d:any)=>{
      if (e) {
        wx.navigateTo({
          url: `/pages/finance/fund-claim/handle/index?id=`+ e +`&salenum=` + c +`&name=` + d
        })
      }
    },
    orderfiltering: () => {//关闭筛选弹出框
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    onSelectOrderTypeCode:(orderTypeCode:any)=> {//交易类型筛选框收款、收票
      this.fundClaimListQuery.params.hifi_flowstatus = orderTypeCode
      this.fundClaimListQuery.params.pageno = 1
      this.filterForm = { ...this.filterForm, orderTypeCode}
      this.headerTabList[0].selectValue = orderTypeCode
      this.methods.touchOrderSFilter()
      // this.fundClaimListQuery = {...this.fundClaimListQuery,claimstatus:sapOrderStatus,pageno:1}
      this.$apply()
      this.methods.getFunClaimList(1)
    },
    onSelectStatus:(status:any)=> {//时间选择下拉框
      this.filterForm = { ...this.filterForm, status}
      this.headerTabList[1].selectValue = status
      this.methods.touchOrderSFilter()
      if(status=='UNPAYED'){
        this.methods.timeForMat(7)
        this.filterForm.timeFrame='7'
      }else if(status=='WAITPAYRESULT'){
        this.methods.timeForMat(30)
        this.filterForm.timeFrame='1'
      }else if(status=='AGENTUNCHKED'){
        this.methods.timeForMat(90)
        this.filterForm.timeFrame='3'
      }else if(status=='UNCHKED'){
        this.methods.timeForMat(180)
        this.filterForm.timeFrame='6'
      }else{
        this.fundClaimListQuery.params.tradetimeS = ''
        this.fundClaimListQuery.params.tradetimeE = ''
        this.filterForm.timeFrame=''
      }
      this.methods.getFunClaimList(1)
    },
    //选择认领状态
    onSelectSOStatus:(sapOrderStatus:any)=> {
      this.fundClaimListQuery.params.claimstatus = sapOrderStatus
      this.fundClaimListQuery.params.pageno = 1
      this.filterForm = { ...this.filterForm, sapOrderStatus}
      this.headerTabList[2].selectValue = sapOrderStatus
      this.methods.touchOrderSFilter()
      // this.fundClaimListQuery = {...this.fundClaimListQuery,claimstatus:sapOrderStatus,pageno:1}
      this.$apply()
      this.methods.getFunClaimList(1)
    },
    onZzprdmodelChange(e) {// 收款账户
      this.filterForm = { ...this.filterForm, zzprdmodel: e.detail }
    },
    onOrderCodeChange(e) {//打款账户
      this.filterForm = { ...this.filterForm, orderCode: e.detail }
    },
    onOrderNameChange(e) {//打款户名
      this.filterForm = { ...this.filterForm, fundName: e.detail }
    },
    onBillTypeChange(e) {//票据类型
      this.filterForm = { ...this.filterForm, billtype: e.detail }
    },
    onBillNumberChange(e) {//票据号
      this.filterForm = { ...this.filterForm, billnumber: e.detail }
    },
    onBillPersonChange(e) {//交票人
      this.filterForm = { ...this.filterForm, billperson: e.detail }
    },
    onBillPersonNameChange(e) {//出票人名称
      this.filterForm = { ...this.filterForm, billpersonname: e.detail }
    },
    onAcceptorNameChange(e) {//承兑人名称
      this.filterForm = { ...this.filterForm, acceptorname: e.detail }
    },
    getRandomNumber(start:any, end:any) {//生成随机数--交易类型1、2
      return Math.floor(Math.random() * (end - start) + start)
    },
    getFunClaimList:(type:any)=>{//获取后台列表数据
      const _this:any = this
      let array1
      const toast = Toast.loading({
        forbidClick: true,
        message: '加载中',
      });
      if(type==3){
        const params = JSON.parse(JSON.stringify(this.fundClaimListQuery.params))
        params.pagesize = params.pageno*5
        params.pageno = 1
        const scrollTopLast = _this.scrollTop
        getFundClaimCounts(params, res => {
          if(res.data.success){
            _this.totalPages = res.data.data.pagecount
            array1 = res.data.data.datas
            for(var index in array1){
              array1[index].billtype = _this.methods.getRandomNumber(0,2)
            }
              _this.fundClaimList = array1;
            Toast.clear()
            _this.view_show = true
            _this.lineBottom = false;
            _this.$apply()
            _this.scrollTop = scrollTopLast
          }else{
            console.log("error");
          }

        })
      }else{
        getFundClaimCounts(this.fundClaimListQuery, res => {
          if(res.data.success){
            _this.totalPages = res.data.data.pagecount
            array1 = res.data.data.datas
            for(var index in array1){
              array1[index].billtype = _this.methods.getRandomNumber(0,2)
            }
            if(type=="1"){
              _this.fundClaimList = array1;
            }else{
              _this.fundClaimList = _this.fundClaimList.concat(array1);
            }
            Toast.clear()
            _this.view_show = true
            _this.lineBottom = false;
            _this.$apply()
          }else{
            console.log("error");
          }

        })
      }
    },
    timeForMat:(count:any)=> {// 拼接时间
      let now = new Date();
      let year = now.getFullYear();
      let month = (now.getMonth()+1)<10?('0'+(now.getMonth()+1)):now.getMonth()+1;
      let date = now.getDate()<10?('0'+now.getDate()):now.getDate()
      let hour= now.getHours()<10?('0'+now.getHours()):now.getHours();
      let minute= now.getMinutes()<10?('0'+now.getMinutes()):now.getMinutes();
      let second= now.getSeconds()<10?('0'+now.getSeconds()):now.getSeconds();
      let nowDate = year+'-'+month+'-'+date+" "+hour+":"+minute+":"+second
      this.fundClaimListQuery.params.tradetimeE = nowDate
      let before = new Date()
      before.setTime(before.getTime() - (24 * 60 * 60 * 1000 * (count-1)))
      let Y2 = before.getFullYear()
      let M2 = ((before.getMonth() + 1) < 10 ? '0' + (before.getMonth() + 1) : (before.getMonth() + 1))
      let D2 = (before.getDate() < 10 ? '0' + before.getDate() : before.getDate())
      this.fundClaimListQuery.params.tradetimeS = Y2+'-'+M2+'-'+D2+" "+hour+":"+minute+":"+second
    },
    // trueClaim(){//确定

    // },
    // cancleClaim(){//取消
    //   this.orderMove = false;
    // },
    // mergeClaim(){//合并认领
    //   this.orderMove = true;
    // },

    onToggleTimeFrame() {//筛选弹出框日期
      this.timeFrameVisible = !this.timeFrameVisible
    },
    onSelectTimeFrame(timeFrame) {//筛选弹出框日期选项最近一周
      this.filterForm = { ...this.filterForm, timeFrame }
      if(timeFrame=='7'){
        this.methods.timeForMat(7)
      }else if(timeFrame=='1'){
        this.methods.timeForMat(30)
      }else if(timeFrame=='3'){
        this.methods.timeForMat(90)
      }else if(timeFrame=='6'){
        this.methods.timeForMat(180)
      }else{
        this.fundClaimListQuery.params.tradetimeS = ''
        this.fundClaimListQuery.params.tradetimeE = ''
      }
    },
    onClearFilterForm(){//筛选--重置筛选条件
      this.filterForm.zzprdmodel = '';
      this.filterForm.orderCode = '';
      this.filterForm.fundName = '';
      this.filterForm.billtype = '';
      this.filterForm.billnumber = '';
      this.filterForm.billperson = '';
      this.filterForm.billpersonname = '';
      this.filterForm.acceptorname = '';
      this.filterForm.beginDate = '';
      this.filterForm.endDate = '';
      this.filterForm.timeFrame = '';
      this.fundClaimListQuery.params.tradetimeS = '';
      this.fundClaimListQuery.params.tradetimeE = '';
    },
    onSubmitFilterForm() {//提交筛选条件
      if(this.filterForm.beginDate&&this.filterForm.endDate){
        this.fundClaimListQuery.params.tradetimeS = this.filterForm.beginDate+" 00:00:00"
        this.fundClaimListQuery.params.tradetimeE = this.filterForm.endDate+" 00:00:00"
      }else{
        this.fundClaimListQuery.params.tradetimeS = ""
        this.fundClaimListQuery.params.tradetimeE = ""
      }
      this.methods.getFunClaimList(1)
      this.methods.orderfiltering()
    },
    // 选择日期
    openCalendar(e) {//日期筛选
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { beginDate, endDate, sapBeginDate, sapEndDate } = this.filterForm;
      const { name, type } = e.target.dataset
      this.currentDateName = name
      let begin, end;
      if(type === 'date') {
        begin = beginDate
        end = endDate
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
      this.filterForm = { ...this.filterForm, [this.currentDateName]: day }
      this.calendarShow = false;
    },
    onGetOrderListNext() {//获取下一页
      // const { totalPages } = this.orderList
      if(this.totalPages > this.fundClaimListQuery.params.pageno) {
        this.fundClaimListQuery.params = { ...this.fundClaimListQuery.params, pageno: this.fundClaimListQuery.params.pageno + 1}
        this.methods.getFunClaimList(2)
      }else{
        this.lineBottom = true
      }
    },
    endScroll(e){
      this.scrollTop = e.detail.scrollTop
    }
  };
  onShow() {
    if(this.data.fundClaimList.length==0){
      this.methods.getFunClaimList(1)
    }else{
      this.methods.getFunClaimList(3)
    }
  }
}
