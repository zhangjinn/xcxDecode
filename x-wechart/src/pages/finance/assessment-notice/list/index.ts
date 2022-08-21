import wepy from 'wepy';
import {connect, getStore} from 'wepy-redux';
import {
  getAssessmentNoticeList,
  getAssessmentNoticeFilterList,
} from '@/store/actions/balance';
import { fillZero } from '@/utils/index';
import { baseUrl } from '@/utils/request';
import { RESET_ASSESSMENT_NOTICE_LIST } from "@/store/types/balance";
import utilsWxs from '../../../../wxs/utils.wxs';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  visible: boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  calendarShow: boolean;
  filterForm: object;
  calendarConfig: object;
  currentDateName: string;
  baseUrl: string;
  scrollTop: number;
  headerTabList: any[];
}

@connect({
  assessmentNoticeList({balance}) {
    return balance.assessmentNoticeList
  },
  assessmentNoticeFilterList({balance}) {
    return balance.assessmentNoticeFilterList
  },
}, {
  getAssessmentNoticeList,
  getAssessmentNoticeFilterList,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '考核通知单',
    usingComponents: {
      'van-icon': '../../../../components/vant/icon/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-loading': '../../../../components/vant/loading/index',
      'calendar': '../../../../components/calendar/index',
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
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    calendarShow: false,
    currentDateName: '',
    scrollTop: -1,
    filterForm: {
      terms: {
        startDate: '', // 开始时间
        endDate: '', // 结束时间
        status: '', // 通知单状态
        type: '', // 通知单类型
      },
      page: {
        pageNo: 1,
        pageSize: 10,
      },
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    baseUrl: baseUrl,
    headerTabList: [
      { name: '类型', type: 'type', selectValue: '' },
      { name: '状态', type: 'status', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };

  // 页面内交互写在methods里
  methods = {

    // 跳转到详情
    viewDetail: (id: any, type: any) => {
      if (id) {
        let url = `/pages/finance/assessment-notice/detail-new/index?id=${id}`
        if(type == 'ZDGF'){
          url = `/pages/finance/assessment-notice/detail/index?id=${id}`
        }
        wx.navigateTo({
          url: url
        })
      }
    },

    // 切换顶部快捷筛选
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
      if (['type', 'status'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 顶部类型快捷筛选
    onSelectType(type) {
      getStore().dispatch({ type: RESET_ASSESSMENT_NOTICE_LIST, payload: [] })

      this.filterForm.terms = { ...this.filterForm.terms, type }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.headerTabList[0].selectValue = type
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },

    // 顶部状态快捷筛选
    onSelectStatus(status) {
      getStore().dispatch({ type: RESET_ASSESSMENT_NOTICE_LIST, payload: [] })

      this.filterForm.terms = { ...this.filterForm.terms, status }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.headerTabList[1].selectValue = status
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },

    // 点击普通筛选按钮-显示或隐藏左侧筛选框
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 筛选确定
    onSubmitFilterForm() {
      getStore().dispatch({ type: RESET_ASSESSMENT_NOTICE_LIST, payload: [] })

      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
      this.methods.scrollToTop()
    },

    // 筛选重置
    onResetFilterForm() {
      this.filterForm.terms = {
        ...this.filterForm.terms,
        startDate: '',
        endDate: ''
      }
    },

    // 打开日历
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { startDate, endDate } = this.filterForm.terms;
      const { name, type } = e.target.dataset
      this.currentDateName = name
      let begin, end;
      if (type === 'date') {
        begin = startDate
        end = endDate
      }
      if (type === 'sapDate') {
        begin = startDate
        end = endDate
      }
      if (name.indexOf('startDate') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if (name.indexOf('ndDate') > -1) {
        this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
      }
      this.calendarShow = true;
    },

    // 关闭日历
    closeCalendar() {
      this.calendarShow = false;
    },

    // 清空已选日期
    clearCalendar(name) {
      this.filterForm.terms = { ...this.filterForm.terms, [name]: '' }
    },

    // 选择日期
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.filterForm.terms = { ...this.filterForm.terms, [this.currentDateName]: day }
      this.calendarShow = false;
    },

    // 回到顶部
    scrollToTop: () => {
      this.scrollTop = 0
    },

    // 滚动列表
    onScroll: (event: Weapp.Event) => {
      if (this.scrollTop === 0) {
        this.scrollTop = event.detail.scrollTop
      }
    },

    // 列表分页
    onGetOrderListNext() {
      const { totalPage } = this.assessmentNoticeList
      if (totalPage > this.filterForm.page.pageNo) {
        this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1 }
        this.myGetOrderList()
      }
    },

  };

  myGetOrderList() {
    let { terms, page } = this.filterForm
    let data = {
      noticeType: terms.type, // 通知单类型
      noticeStatus: terms.status, // 通知单状态
      createdDateStart: terms.startDate, // 开始时间
      createdDateEnd: terms.endDate, // 结束时间
      pageNo: page.pageNo,
      pageSize: page.pageSize,
    }

    this.methods.getAssessmentNoticeList({ _loading: true, ...data })

  }
  onShow() {
    // 清空通知单列表
    getStore().dispatch({ type: RESET_ASSESSMENT_NOTICE_LIST, payload: [] })
    // 获取筛选列表
    this.methods.getAssessmentNoticeFilterList()
    // 获取通知单列表
    this.myGetOrderList()
  }

}
