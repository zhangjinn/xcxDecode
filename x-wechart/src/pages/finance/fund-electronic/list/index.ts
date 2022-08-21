import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux'
import { fillZero, formatDate, getDateDiff } from '@/utils/index';
import { queryAppRsFtSheetList} from '@/store/actions/financefund';
import { queryAppProfit,queryAppFiBook } from '@/store/actions/financepolicy'
import { RS_FT_SHEET_LIST} from '@/store/types/financefund';
import Toast from '@/components/vant/toast/toast';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  visible: boolean;
  timeList: any[];
  recList: any[];
  pageNo: number;
  calendarShow: boolean;
  filterForm: object;
  calendarConfig: object;
  currentDateName: string;
  timeFrameVisible: boolean;
  fibookVisible: boolean;
  prfcVisible: boolean;
  staVisible:boolean;
  shortName: string;
  prfcName: string;
  staList:any[];
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
    queryType: '',
    fiBookCode: '',
    prfcCode: '',
  },
  tabType: '1',
  page: {
    pageNo: 10,
    pageSize: 1,
  },
}

@connect({
  fundList({ financefund }) {
    return financefund.fundList
  }
  profitList({ financepolicy }) {
    return financepolicy.profitList
  }
  fibookList({ financepolicy }) {
    return financepolicy.fibookList
  }
}, {
  queryAppRsFtSheetList,
  queryAppProfit,
  queryAppFiBook
})

export default class List extends wepy.page {

  config = {
    navigationBarTitleText: '资金电子账单',
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
    // 对账时间 对应rows 中 queryType
    timeList: [
      { label: '全部日期', value: '' },
      { label: '最近一个月', value: '1' },
      { label: '最近三个月', value: '2' },
      { label: '最近一年', value: '3' },
    ],
    // tab 状态 对应tabType
    staList: [
      { label: '待确认', value: '1' },
      { label: '已确认', value: '2' },
      { label: '对账完成', value: '3' },
      { label: '全部', value: '4' },
    ],
    // 状态 对应rows 中statusFlag
    recList: [
      { label: '请选择', value: ''},
      { label: '待确认', value: '2'},
      { label: '已确认', value: '3'},
      { label: '对账完成', value: 'A'},
      { label: '人工确认中', value: '4'},
    ],
    pageNo: 1,
    calendarShow: false,
    filterForm: {
      rows: {
        sheetNo: '',
        statusFlag: '',
        periodStartDate: '',
        periodEndDate: '',
        queryType: '',
        fiBookCode: '',
        prfcCode: '',
      },
      tabType: '1',
      page: {
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
    staVisible:false,
    shortName: '',
    prfcName: '',
    showArrowIcon: false,
    headerTabList: [
      { name: '待确认', type: '1', selectValue: '' },
      { name: '已确认', type: '2', selectValue: '' },
      { name: '对账完成', type: '3', selectValue: '' },
      { name: '全部', type: '4', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  }

  methods = {
    allIKnow: () => {
      this.IKnow = false
    },
    orderfiltering: () => {
      this.visible = !this.visible
    },
    gotodetail(sheetId: any) {
      wx.navigateTo({
        url: `/pages/finance/fund-electronic/detail/index?sheetId=${sheetId}`
      })
    },
    viewSignature(e: any, statusFlag: any,ssqBind: any) {
      if(ssqBind == 0) {
        this.IKnow = true
      } else {
        wx.navigateTo({
          url: `/pages/finance/fund-electronic/signature/index?id=${e}&statusFlag=${statusFlag}`
        })
      }
    },
    loadNextPage() {
      if (this.filterForm.page.pageSize >= this.fundList.totalPage) {
        //
      } else {
        this.filterForm.page = { ...this.filterForm.page, pageSize: this.filterForm.page.pageSize + 1 }
        this.postfundlist()
      }
    },
    touchStatusFilter: (tabItem) => {
      let statusFlag = ''
      if(tabItem){
        statusFlag = tabItem.type
      }
      getStore().dispatch({ type:RS_FT_SHEET_LIST, payload: [] })
      this.filterForm.tabType = statusFlag
      // this.filterForm.queryType = statusFlag
      this.filterForm.page = { ...this.filterForm.page, pageSize: 1 }
      this.postfundlist()
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
      if (name.indexOf('StartDate') > -1) {
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
    onToggleSta() {
      this.staVisible = !this.staVisible
    },
    // 状态
    onStaOrg(statusFlag){
      this.filterForm.rows = { ...this.filterForm.rows, statusFlag }
    },

    onToggleOrg() {
      this.fibookVisible = !this.fibookVisible
    },
    onSelectOrg(fiBookCode, shortName) {
      this.filterForm.rows = { ...this.filterForm.rows, fiBookCode }
      this.fibookVisible = !this.fibookVisible
      this.shortName = shortName;
    },
    onToggleType() {
      this.prfcVisible = !this.prfcVisible
    },
    onSelectType(prfcCode, prfcName) {
      this.filterForm.rows = { ...this.filterForm.rows, prfcCode }
      this.prfcVisible = !this.prfcVisible
      this.prfcName = prfcName;
    },
    onResetFilterForm() {
      this.filterForm = {
        ...defaultFilterForm,
        tabType: this.filterForm.tabType,
      }
      this.shortName = '';
      this.prfcName = '';
    },
    onSubmitFilterForm() {
      getStore().dispatch({ type: RS_FT_SHEET_LIST, payload: [] })
      this.visible = !this.visible
      this.filterForm.page = { ...this.filterForm.page, pageSize: 1 }
      this.postfundlist()
    },
    onsheetNoChange(e) {
      this.filterForm.rows = { ...this.filterForm.rows, sheetNo: e.detail }
    }

  }
  postfundlist() {
    this.methods.queryAppRsFtSheetList({ _loading: true, ...this.filterForm });
  }
  onLoad() {
    this.methods.queryAppProfit()
    this.methods.queryAppFiBook()
    this.filterForm.page = { ...this.filterForm.page, pageSize: 1 }
    this.postfundlist()
  }

  onUnload(){
    getStore().dispatch({ type: RS_FT_SHEET_LIST, payload: [] })
    this.filterForm.page = { ...this.filterForm.page, pageSize: 1}
  }
}
