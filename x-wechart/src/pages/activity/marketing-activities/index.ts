import wepy from 'wepy';
import {connect, getStore} from 'wepy-redux';
import {RESET_MARKETING_ACTIVITY_LIST} from "@/store/types/activityare";
import { getMarketingActivityList, getMarketingActivityFilter } from '@/store/actions/activityare'
import { fillZero } from '@/utils/index';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
import { baseUrl } from '@/utils/request';

interface Data {
  visible: boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  calendarShow: boolean;
  filterForm: object;
  filterFormExtra: object;
  calendarConfig: object;
  currentDateName: string;
  baseUrl: string;
  scrollTop: number;
  saleFilterList: object[];
  popupTitle: string;
  agentPopup: boolean;
  headerTabList: any[];
}

@connect({
  marketingActivityFilter({ activityare }) {
    return activityare.marketingActivityFilter
  },
  marketingActivityList({ activityare }) {
    return activityare.marketingActivityList
  },
  marketingActivityTotalPages({ activityare }) {
    return activityare.marketingActivityTotalPages
  },
}, {
  getMarketingActivityList,
  getMarketingActivityFilter,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '营销活动查询',
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
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    calendarShow: false,
    currentDateName: '',
    scrollTop: -1,
    filterForm: {
      terms: {
        status: '',
        code: '',
        name: '',
        // source: '',
        method: '',
        startDate: '',
        endDate: '',
      },
      page: {
        pageNo: 1,
        pageSize: 10,
      },
    },
    filterFormExtra: {
      // sourceName: '',
      methodName: '',
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    baseUrl: baseUrl,
    saleFilterList: [
      {id:'0',value:'草稿'},
      {id:'1',value:'已发布'},
      {id:'2',value:'已取消'},
    ],
    popupTitle: '',
    agentPopup: false,
    headerTabList: [
      { name: '活动状态', type: 'orderStatus', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };

  // 页面内交互写在methods里
  methods = {

    // 跳转到详情
    viewDetail: (id: any) => {
      if (id) {
        let url = `/pages/activity/marketing-activities-detail/index?id=${id}`
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
      if (['orderType', 'orderStatus'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 选择快捷筛选内容列表
    onSelectStatus(status) {
      getStore().dispatch({ type: RESET_MARKETING_ACTIVITY_LIST, payload: [] })
      this.filterForm.terms = { ...this.filterForm.terms, status }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.headerTabList[0].selectValue = status
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
      getStore().dispatch({ type: RESET_MARKETING_ACTIVITY_LIST, payload: [] })
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
      this.methods.scrollToTop()
    },

    // 筛选重置
    onResetFilterForm() {
      this.filterForm.terms = {
        ...this.filterForm.terms,
        code: '',
        name: '',
        // source: '',
        method: '',
        startDate: '',
        endDate: ''
      }
    this.filterFormExtra = {
        methodName: '',
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

    // 改变活动编码
    onCodeChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, code: e.detail }
    },

    // 改变活动编码
    onNameChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, name: e.detail }
    },

    // 改变活动来源
    // onSelectSourceChange(org: any) {
    //   const { key, value } = org
    //   if (this.filterForm.terms.source === key) {
    //     this.filterForm.terms = { ...this.filterForm.terms, source: '' }
    //     this.filterFormExtra = { ...this.filterFormExtra, sourceName: '' }
    //     return
    //   }
    //   this.filterForm.terms = { ...this.filterForm.terms, source: key }
    //   this.filterFormExtra = { ...this.filterFormExtra, sourceName: value }
    //   this.agentPopup = false
    // },

    // 改变促销方式
    onSelectMethodChange(org: any) {
      const { key, value } = org
      if (this.filterForm.terms.method === key) {
        this.filterForm.terms = { ...this.filterForm.terms, method: '' }
        this.filterFormExtra = { ...this.filterFormExtra, methodName: '' }
        return
      }
      this.filterForm.terms = { ...this.filterForm.terms, method: key }
      this.filterFormExtra = { ...this.filterFormExtra, methodName: value }
      this.agentPopup = false
    },


    // 修改筛选条件列表弹框标题，并显示对应列表内容
    selectagentPopup: (e) => {
      if (e == 'source') {
        this.popupTitle = '活动来源'
      } else if (e == 'method') {
        this.popupTitle = '促销方式'
      }
      this.agentPopup = !this.agentPopup
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

      if (this.marketingActivityTotalPages > this.filterForm.page.pageNo) {
        this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1 }
        this.myGetOrderList()
      }

    },

  };

  myGetOrderList() {

    let { terms, page } = this.filterForm
    let data = {
      status: terms.status,
      startDate: terms.startDate,
      endDate: terms.endDate,
      activityName: terms.name,
      activityCode: terms.code,
      discountTypeId: terms.method,
      pageNo: page.pageNo,
      pageSize: page.pageSize,
    }

    this.methods.getMarketingActivityList({ _loading: true, ...data })
    this.$apply()

  }
  onShow() {
    getStore().dispatch({ type: RESET_MARKETING_ACTIVITY_LIST, payload: [] })
    this.myGetOrderList()
    this.methods.getMarketingActivityFilter();
  }

}
