import wepy from 'wepy';
import {connect, getStore} from 'wepy-redux';
import {
  getSalesOrderListNew,
} from '@/store/actions/threeProductsReport';
import { fillZero } from '@/utils/index';
import { baseUrl } from '@/utils/request';
import utilsWxs from '../../../wxs/utils.wxs';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
import { RESET_SALES_ORDER_LIST_NEW } from "@/store/types/threeProductsReport";

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
  saleFilterList: object[];
  headerTabList: any[];
}

@connect({
  orderList({threeProductsReport}) {
    return threeProductsReport.orderList
  },

}, {
  getSalesOrderListNew,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '终包采购计划',
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
  data: Data = {
    visible: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    calendarShow: false,
    currentDateName: '',
    scrollTop: -1,
    filterForm: {
      terms: {
        startDate: '',
        endDate: '',
        status: '',
        sellerName: '',
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
    saleFilterList:[
      {id:'1',value:'已提报'},
      {id:'0',value:'未提报'}
    ],
    headerTabList: [
      { name: '提报状态', type: 'orderStatus', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };
  components = {
    emptyDataType,
    headerTab,
  };
  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {

    // 跳转到详情
    viewDetail: (id: any, type: any) => {
      if (id) {
        let url = `/pages/terminal/threeProductsReportDetail/index?id=${id}&type=${type}`
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
      getStore().dispatch({ type: RESET_SALES_ORDER_LIST_NEW, payload: [] })

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
      getStore().dispatch({ type: RESET_SALES_ORDER_LIST_NEW, payload: [] })

      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
      this.methods.scrollToTop()
    },

    // 筛选重置
    onResetFilterForm() {
      this.filterForm.terms = {
        ...this.filterForm.terms,
        sellerName: '',
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

    // 改变提货人
    onsellerNameChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, sellerName: e.detail }
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
      const { count } = this.orderList
      let totalPage = Math.ceil(count/this.filterForm.page.pageSize)
      if (totalPage > this.filterForm.page.pageNo) {
        this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1 }
        this.myGetOrderList()
      }
    },

  };

  myGetOrderList() {
    let { terms, page } = this.filterForm
    let data = {
      status:terms.status,
      submitDateBegin:terms.startDate,
      endDateEnd:terms.endDate,
      page:page.pageNo,
      rows:page.pageSize,
    }

    this.methods.getSalesOrderListNew({ _loading: true, ...data })

  }
  onShow() {
    getStore().dispatch({ type: RESET_SALES_ORDER_LIST_NEW, payload: [] })
    this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
    this.myGetOrderList()
  }

}
