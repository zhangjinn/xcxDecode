import wepy from 'wepy';
import { fillZero, } from '@/utils/index';
import { request } from '@/utils/request'
import utilsWxs from '../../../../wxs/utils.wxs';
import { modifyUrl } from '@/utils/index'
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  visible: boolean;
  orderpopup: boolean;
  deletepopup: boolean;
  timeFrameVisible: boolean;
  calendarShow: boolean;
  filterForm: object;
  calendarConfig: object;
  currentDateName: string;
  scrollTop: number;
  cancelOrderId: string;
  orderList: object
}

export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '政策合同',
    usingComponents: {
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
    },
  };
  components = {
    emptyDataType,
    headerTab
  };
  data: Data = {
    orderList: [],
    visible: false,
    orderpopup: false,
    deletepopup: false,
    timeFrameVisible: false,
    calendarShow: false,
    currentDateName: '',
    scrollTop: -1,
    filterForm: {
      pageNo: 1,
      pageSize: 10,
      contractName: '', //合同名称
      contractNo: '', //合同编码
      contractType: '', //合同类型
      merchantName: '',//代理商
      createdDateS: '',
      createdDateE: '',
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
  };
  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {
    viewDetail: (e: any) => {
      let url = e.currentTarget.dataset.url
      if (url) {
        url = modifyUrl(url)
        const urlStr = encodeURIComponent(url);
        wx.navigateTo({ url: `/pages/me/webview/index?url=${urlStr}` });
      }
    },
    orderfiltering: () => {
      this.visible = !this.visible
    },
    // 合同类型
    contractTypeChange(e) {
      this.filterForm = { ...this.filterForm, contractType: e.detail }
    },
    // 合同编码
    contractNoChange(e) {
      this.filterForm = { ...this.filterForm, contractNo: e.detail }
    },
    // 合同名称
    ontractNameChange(e) {
      this.filterForm = { ...this.filterForm, contractName: e.detail }
    },
    // 代理商
    merchantNameChange(e) {
      this.filterForm = { ...this.filterForm, merchantName: e.detail }
    },
    onSubmitFilterForm() {
      this.filterForm.pageNo = 1
      this.myGetOrderList()
      this.visible = !this.visible
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
    onResetFilterForm() {
      this.filterForm = { ...this.filterForm, contractName: '', contractNo: '', contractType: '', merchantName: '', createdDateS: '', createdDateE: '' }
    },
    // 选择日期
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { createdDateS, createdDateE } = this.filterForm;
      const { name, type } = e.target.dataset
      this.currentDateName = name
      let begin, end;
      if (type === 'date') {
        begin = createdDateS
        end = createdDateE
      }
      if (type === 'sapDate') {
        begin = createdDateS
        end = createdDateE
      }
      if (name.indexOf('createdDateS') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if (name.indexOf('createdDateE') > -1) {
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
    onGetOrderListNext() {
      const totalPages = this.orderList.totalPages
      if (totalPages > this.filterForm.pageNo) {
        this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1 }
        this.myGetOrderList()
      }
    },
  };
  myGetOrderList() {
    request({
      api: `fast/cust/custPolicyInfoList/page.nd`,
      method: "GET",
      data: { ...this.filterForm },
      callback: (res: any) => {
        if (this.orderList.list && this.filterForm.pageNo != 1) {
          this.orderList.list = this.orderList.list.concat(res.data.list)
        } else {
          this.orderList = res.data
        }
        this.$apply()
      }
    });
  }
  onLoad() {
    this.myGetOrderList()
  }
}
