import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import { fillZero, formatDate, getDateDiff,getAlertInfo } from '@/utils/index';
import { baseUrl } from '@/utils/request';
import { getSalesOrderReviewList } from '@/store/actions/salesdistributors';
import { RESET_SALES_ORDER_REVIEW_LIST } from '@/store/types/salesdistributors';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
interface Data {
  visible: boolean;
  orderpopup: boolean;
  deletepopup: boolean;
  Statusextend: boolean;
  OrderTypeextend: boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  timeFrameVisible: boolean;
  calendarShow: boolean;
  filterForm: object;
  calendarConfig: object;
  currentDateName: string;
  baseUrl: string;
  scrollTop: number;
  freeShippingTip: string;
}

@connect({
  orderList({ salesdistributors }) {
    return salesdistributors.orderList
  },
}, {
  getSalesOrderReviewList
})
export default class distributorsFilter extends wepy.page {
  config = {
    navigationBarTitleText: '渠道订单审核',
    usingComponents: {
      'van-rate': '/components/vant/rate/index',
      'van-icon': '/components/vant/icon/index',
      'van-toast': '/components/vant/toast/index',
      'van-popup': '/components/vant/popup/index',
      'van-picker': '/components/vant/picker/index',
      'van-search': '/components/vant/search/index',
      'van-tab': '/components/vant/tab/index',
      'van-row': '/components/vant/row/index',
      'van-col': '/components/vant/col/index',
      'van-tabs': '/components/vant/tabs/index',
      'van-radio': '/components/vant/radio/index',
      'van-radio-group': '/components/vant/radio-group/index',
      'van-cell': '/components/vant/cell/index',
      'van-field': '/components/vant/field/index',
      'van-loading': '/components/vant/loading/index',
      'van-stepper': '/components/vant/stepper/index',
      'van-cell-group': '/components/vant/cell-group/index',
      'van-button': '/components/vant/button/index',
      'calendar': '/components/calendar/index',
      'img': '/components/img/index',
      'sales-distributors-item': '/components/sales-distributors-item/index'
    },
  };
  components = {
    emptyDataType,
    headerTab,
  };
  data: Data = {
    visible: false,
    orderpopup: false,
    deletepopup: false,
    Statusextend: false,
    OrderTypeextend: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    timeFrameVisible: false,
    calendarShow: false,
    currentDateName: '',
    scrollTop: -1,
    filterForm: {
      terms: {
        documentNum: '',
        purchaseNum: '',
        customerName: '',
        startDate: '',
        endDate: '',
        sellerName: '',
        packageCode:''
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
    freeShippingTip: '', // 免运费提示信息
  };
  // 页面内交互写在methods里
  methods = {
    onTgdocumentNumChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, packageCode: e.detail }
    },
    onTgzhudanhaoChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, packageMainNum: e.detail }
    },
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    ondocumentNumChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, documentNum: e.detail }
    },
    oncustomerNameChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, customerName: e.detail }
    },
    onsellerNameChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, sellerName: e.detail }
    },
    // 筛选确定
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
    onScroll: (event: Weapp.Event) => {
      if (this.scrollTop === 0) {
        this.scrollTop = event.detail.scrollTop
      }
    },
    // 筛选重置
    onResetFilterForm() {
      this.filterForm.terms = { ...this.filterForm.terms, documentNum: '', customerName: '', sellerName: '', startDate: '', endDate: '' }
    },
    // 选择日期
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
    // 接受子组件的操作
    distributorsOperation: () => {
      setTimeout(() => {
        getStore().dispatch({ type: RESET_SALES_ORDER_REVIEW_LIST, payload: [] })
        this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
        this.$apply();
        this.myGetOrderList();
      }, 2000);
    },
  };
  myGetOrderList() {
    this.methods.getSalesOrderReviewList({ _loading: true, ...this.filterForm });
  }
  onShow() {
    this.freeShippingTip = getAlertInfo('14187495683') // 免运费提示信息
    this.myGetOrderList()
  }
  onLoad() {
  }
}
