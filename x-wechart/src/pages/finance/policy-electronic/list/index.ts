import wepy from 'wepy';
import { connect,getStore } from 'wepy-redux'
import { fillZero, formatDate, getDateDiff } from '@/utils/index';
import { queryAppRsRbSheetList,queryAppProfit,queryAppFiBook} from '@/store/actions/financepolicy'
import { RESET_RSRB_SHEET_LIST } from '@/store/types/financepolicy';
import Toast from '@/components/vant/toast/toast';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
interface Data {
  visible: boolean;
  timeList: any[];
  calendarShow: boolean;
  filterForm:object;
  calendarConfig: object;
  currentDateName: string;
  timeFrameVisible: boolean;
  fibookVisible: boolean;
  prfcVisible: boolean;
  fibookName:string;
  prfcName:string;
  IKnow: boolean;
  showArrowIcon: boolean;
  headerTabList: any[];
}

const defaultFilterForm = {
  rows:{
    sheetNo:'',
    periodStartDate: '',
    periodEndDate: '',
    fiBookCode:'',
    prfcCode:'',
    queryType:'',
  },
  page:{
    pageNo: 10,
    pageSize: 1,
  },
}

@connect({
    policyeleList({ financepolicy }) {
      return financepolicy.policyeleList
    }
    profitList({ financepolicy }) {
      return financepolicy.profitList
    }
    fibookList({ financepolicy }) {
      return financepolicy.fibookList
    }
  }, {
    queryAppRsRbSheetList,
    queryAppProfit,
    queryAppFiBook
})

export default class List extends wepy.page {

  config = {
    navigationBarTitleText: '政策电子账单',
    usingComponents: {
      'van-popup': '../../../../components/vant/popup/index',
      'van-icon': '../../../../../components/vant/icon/index',
      'van-field': '../../../../components/vant/field/index',
      'calendar': '../../../../components/calendar/index',
      'van-button': '../../../../components/vant/button/index',
      'van-picker': '../../../../components/vant/picker/index',
      'img': '../../../../components/img/index',
      'van-toast': '../../../../components/vant/toast/index',
    },
  };
  components = {
    emptyDataType,
    headerTab,
  };
  data: Data = {
    visible: false,
    IKnow: false,
    timeList: [
      { label: '全部日期', value: '' },
      { label: '最近一个月', value: '1' },
      { label: '最近三个月', value: '2' },
      { label: '最近一年', value: '3' },
    ],
    calendarShow: false,
    filterForm: {
      rows:{
        sheetNo:'',
        statusFlag:'2',
        periodStartDate: '',
        periodEndDate: '',
        queryType:'',
        fiBookCode:'',
        prfcCode:'',
      },
      page:{
        pageNo: 10,
        pageSize: 1,
      },
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    currentDateName: '',
    timeFrameVisible: false,
    fibookVisible: false,
    prfcVisible: false,
    fibookName:'',
    prfcName:'',
    showArrowIcon: false,
    headerTabList: [
      { name: '待确认', type: '2', selectValue: '' },
      { name: '已确认', type: '3', selectValue: '' },
      { name: '对账完成', type: 'A', selectValue: '' },
      { name: '全部', type: '', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  }

  methods = {
    allIKnow: () => {
      this.IKnow = false
    },
    orderfiltering: () => {
      this.visible = !this.visible
    },
    //查看详情
    gotodetail(e: any){
      wx.navigateTo({
        url: `/pages/finance/policy-electronic/detail/index?id=${e}`
      })
    },
    //查看签章
    viewSignature(e:any, statusFlag: any,ssqBind: any){
      if(ssqBind == 0) {
        this.IKnow = true
      } else {
        wx.navigateTo({
          url: `/pages/finance/policy-electronic/signature/index?id=${e}&statusFlag=${statusFlag}`
        })
      }
    },
    //加载下一页
    loadNextPage(){
      if (this.filterForm.page.pageSize >= this.policyeleList.totalPage) {
        //
      } else {
        this.filterForm.page = { ...this.filterForm.page, pageSize: this.filterForm.page.pageSize + 1}
        this.getSheetList()
      }
    },
    touchStatusFilter:(tabItem)=>{
      let statusFlag = ''
      if(tabItem){
        statusFlag = tabItem.type
      }
      getStore().dispatch({ type: RESET_RSRB_SHEET_LIST, payload: [] })
      this.filterForm.rows.statusFlag=statusFlag
      this.filterForm.page = { ...this.filterForm.page, pageSize: 1}
      this.getSheetList()
    },
    // 选择日期
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { periodStartDate, periodEndDate } = this.filterForm.rows;
      const { name, type } = e.target.dataset
      this.currentDateName = name
      let begin, end;

      begin = periodStartDate
      end = periodEndDate
      if(name.indexOf('StartDate') > -1) {
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
      this.filterForm.rows = { ...this.filterForm.rows, [name]: '' }
    },
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.filterForm.rows= { ...this.filterForm.rows, [this.currentDateName]: day }
      this.calendarShow = false;
    },
    onToggleTimeFrame() {
      this.timeFrameVisible = !this.timeFrameVisible
    },
    //选择时间段
    onSelectTimeFrame(queryType) {
      this.filterForm.rows = { ...this.filterForm.rows, queryType }
    },
    onToggleOrg() {
      this.fibookVisible = !this.fibookVisible
    },
     //选择销售组织
    onSelectOrg(fiBookCode,fibookName) {
      this.filterForm.rows = { ...this.filterForm.rows, fiBookCode }
      this.fibookVisible = !this.fibookVisible
      this.fibookName=fibookName;
    },
    onTogglePrfc() {
      this.prfcVisible = !this.prfcVisible
    },
    //选择产品品类
    onSelectPrfc(prfcCode,prfcName) {
      this.filterForm.rows = { ...this.filterForm.rows, prfcCode }
      this.prfcVisible = !this.prfcVisible
      this.prfcName=prfcName;
    },
    //重置筛选条件
    onResetFilterForm(){
      this.filterForm = {
        ...defaultFilterForm
        rows: {
          ...defaultFilterForm.rows,
          statusFlag: this.filterForm.rows.statusFlag,
        }
      }
      this.fibookName='';
      this.prfcName='';
    },
    onSubmitFilterForm(){
      getStore().dispatch({ type: RESET_RSRB_SHEET_LIST, payload: [] })
      this.visible = !this.visible
      this.filterForm.page = { ...this.filterForm.page, pageSize: 1}
      this.getSheetList()
    },
    onsheetNoChange(e){
      this.filterForm.rows = { ...this.filterForm.rows, sheetNo: e.detail  }
    }
  }

  getSheetList() {
    this.methods.queryAppRsRbSheetList({_loading: true, ...this.filterForm});
  }

  onLoad() {
    this.methods.queryAppProfit()
    this.methods.queryAppFiBook()
    this.getSheetList()
  }

  onUnload(){
    getStore().dispatch({ type: RESET_RSRB_SHEET_LIST, payload: [] })
    this.filterForm.page = { ...this.filterForm.page, pageSize: 1}
  }
}
