import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux'
import { fillZero, formatDate, getDateDiff } from '@/utils/index';
import { queryAppCfRbSheetList } from '@/store/actions/financecheck';
import { queryAppProfit,queryAppFiBook } from '@/store/actions/financepolicy';
import { RS_CF_RB_SHEET_LIST } from '@/store/types/financecheck'
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
// import { getNoticeList } from '@/store/actions/notice'
import Toast from '@/components/vant/toast/toast';
import dissocPath from 'ramda/es/dissocPath';

interface Data {
  visible: boolean;
  timeList: any[];
  calendarShow: boolean;
  filterForm: object;
  calendarConfig: object;
  currentDateName: string;
  timeFrameVisible: boolean;
  orgVisible: boolean;
  prfcVisible:boolean;
  fibookVisible:boolean;
  typeVisible: boolean;
  orgName: string;
  typeName: string;
  fibookName:string;
  prfcName: string;
  IKnow: boolean;
  showArrowIcon: boolean;
  headerTabList: any[];
}

const defaultFilterForm = {
  rows: {
    sheetNo: '',
    statusFlag: '',
    periodStartDate: '',
    periodEndDate: '',
    timeFrame: '',
    fiBookCode: '',
    prfcCode: '',
    queryType:'',
  },
  page: {
    pageNo: 1,
    pageSize: 10,
  },
}

@connect({

  checkList({ financecheck }) {
    return financecheck.checkList
  }
  profitList({ financepolicy }) {
    return financepolicy.profitList
  }
  fibookList({ financepolicy}) {
    return financepolicy.fibookList
  }
}, {
  queryAppCfRbSheetList,
  queryAppProfit,
  queryAppFiBook
})

export default class List extends wepy.page {

  config = {
    navigationBarTitleText: '政策核对单',
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
        periodStartDate:'',
        periodEndDate:'',
        statusFlag:'2',
        fiBookCode:'',
        documentNum: '',
        appealflag:'',
        prfcCode:'',
        queryType:''
      },
      page: {
        pageSize: 1,
        pageNo: 10
      }

    },

    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    currentDateName: '',
    timeFrameVisible: false,
    orgVisible: false,
    typeVisible: false,
    prfcVisible:false,
    fibookVisible:false,
    fibookName: '',
    prfcName: '',
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
    gotodetail(e: any) {
      wx.navigateTo({
        url: `/pages/finance/policy-check/detail/index?id=${e}`
      })
    },
    viewSignature(e: any, statusFlag: any,ssqBind: any) {
      if(ssqBind == 0) {
        this.IKnow = true
      } else {
        wx.navigateTo({
          url: `/pages/finance/policy-check/signature/index?id=${e}&statusFlag=${statusFlag}`
        })
      }
    },
    loadNextPage() {
      if (this.filterForm.page.pageSize >= this.checkList.totalPage) {
        //
      } else {
        this.filterForm.page = { ...this.filterForm.page, pageSize: this.filterForm.page.pageSize + 1 }
        this.postCheckList()
      }

    },
    touchStatusFilter: (tabItem) => {
      let statusFlag = ''
      if(tabItem){
        statusFlag = tabItem.type
      }
      getStore().dispatch({ type: RS_CF_RB_SHEET_LIST, payload: [] })
      this.filterForm.rows.statusFlag = statusFlag
      this.filterForm.page = { ...this.filterForm.page, pageSize: 1 }
      this.postCheckList()
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
      if (name.indexOf('periodStartDate') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if (name.indexOf('ndDate') > -1) {
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
      this.filterForm.rows = { ...this.filterForm.rows, [this.currentDateName]: day }
      this.calendarShow = false;
    },
    onToggleTimeFrame() {
      this.timeFrameVisible = !this.timeFrameVisible
    },
    onSelectTimeFrame(queryType) {
      this.filterForm.rows = { ...this.filterForm.rows, queryType }

    },
    // 销售组织
    onToggleOrg() {
      this.fibookVisible = !this.fibookVisible
    },
    onSelectOrg(fiBookCode,fibookName) {
      this.filterForm.rows = { ...this.filterForm.rows,fiBookCode}
      this.fibookVisible = !this.fibookVisible
      this.fibookName=fibookName;
    },
    // 产品类型
    onToggleType() {
      // this.typeVisible = !this.typeVisible
      this.prfcVisible = !this.prfcVisible
    },
    onSelectType(prfcCode,prfcName) {
      this.filterForm.rows = { ...this.filterForm.rows, prfcCode }
      this.prfcVisible = !this.prfcVisible
      this.prfcName=prfcName;
    },

    setStartMoney(e) {
      const { detail } = e;
      this.filterForm.rows.rbAmt_st=detail;
    },
    setEndMoney(e) {
      const { detail } = e;
      this.filterForm.rows.rbAmt_ed=detail;
      // this.filterForm.endMoney = detail;
    },
    // 重置筛选
    onResetFilterForm() {
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
    onSubmitFilterForm() {
      getStore().dispatch({ type: RS_CF_RB_SHEET_LIST, payload: [] })
      this.visible = !this.visible
      this.filterForm.page = { ...this.filterForm.page, pageNo: 10,pageSize:1}
      this.postCheckList()
    }
    ondocumentNumChange(e){
      const { detail } = e;
      this.filterForm.rows.sheetNo=detail;
    }
  }
  postCheckList() {
    this.methods.queryAppCfRbSheetList({ _loading: true, ...this.filterForm })
  }
  onLoad() {
    getStore().dispatch({ type: RS_CF_RB_SHEET_LIST, payload: [] })
    this.methods.queryAppProfit()
    this.methods.queryAppFiBook()
    this.postCheckList()
  }
  onShow() {

  }
}
