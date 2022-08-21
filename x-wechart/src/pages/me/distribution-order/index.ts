import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { getOrderList, getOrderFilter } from '@/store/actions/order';
import { againCommonOrder, getOrderDeliveryMethod } from '@/store/actions/order';
import { fillZero } from '@/utils/index';
import { baseUrl } from '@/utils/request';
import { forEach } from 'ramda';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  visible: boolean;
  Suppliersextend: boolean;
  Itemgroupextend: boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  timeFrameVisible: boolean;
  calendarShow: boolean;
  filterForm: object;
  filterFormExtra: object;
  calendarConfig: object;
  currentDateName: string;
  baseUrl: string;
  distributorsPopup: boolean;
  distributorsPopupName: string;
  popupName: string;
  deliveryPopupName: string;
  headerTabList: any[];
}

@connect({
  orderList({ order }) {
    return order.orderList
  },
  filter({ order }) {
    return order.filter
  },
  deliveryMethod({ order }) {
    return order.deliveryMethod
  },
}, {
  getOrderList,
  getOrderFilter,
  againCommonOrder,
  getOrderDeliveryMethod
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '分销直采',
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
    Suppliersextend: false,
    Itemgroupextend: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    timeFrameVisible: false,
    calendarShow: false,
    distributorsPopup: false,
    distributorsPopupName: '全部',
    currentDateName: '',
    popupName: '',
    deliveryPopupName: '全部',
    filterForm: {
      _loading: true,
      pageNo: 1,
      orderTypeCode: '',
      status: '',
      sapOrderStatus: '',
      orderCode: '',
      zzprdmodel: '',
      orgId: '',
      matklId: '',
      beginDate: '',
      endDate: '',
      timeFrame: '',
      sapBeginDate: '',
      sapEndDate: '',
      fxId: '',
      trans: '',
      type: 2
    },
    filterFormExtra: {
      orgName: '',
      matklName: '',
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    baseUrl: baseUrl,
    headerTabList: [
      { name: '订单类型', type: 'orderType', selectValue: '' },
      { name: '订单状态', type: 'orderStatus', selectValue: '' },
      { name: '审核单状态', type: 'auditStatus', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };
  // 页面内交互写在methods里
  methods = {
    selectDelivery: (key: any) => {
      forEach((item: any) => {
        if(item.code == key) {
          this.deliveryPopupName = item.name
          this.filterForm = { ...this.filterForm, trans: item.code }
        }
      },this.deliveryMethod)
      this.distributorsPopup = false
      this.$apply()
    },
    selectagentPopup:() => {
      this.distributorsPopup = false
    },
    onSelectDistributors:(key) => {
      forEach((item) => {
        if(item.key == key) {
          this.distributorsPopupName = item.value
          this.filterForm = { ...this.filterForm, fxId: item.key }
        }
      },this.filter.itemFxmap)
      this.distributorsPopup = false
      this.$apply()
    },
    selectPopup: (name) => {
      if(name == 'suppliers') {
        this.popupName = '供应商'
      } else if (name == 'distributors') {
        this.popupName = '分销商'
      } else if (name == 'delivery') {
        this.popupName = '配送方式'
      }
      this.distributorsPopup = !this.distributorsPopup
    },
    touchOrderSFilter: (tabItem) => {
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
    viewDetail: (e: any) => {
      if (e) {
        wx.navigateTo({
          url: `/pages/me/distribution-order-detail/index?id=${e}`
        })
      }
    },
    Suppliers: () => {
      this.Suppliersextend = !this.Suppliersextend
    },
    Itemgroup: () => {
      this.Itemgroupextend = !this.Itemgroupextend
    },
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    onSelectOrderTypeCode(orderTypeCode) {
      this.filterForm = { ...this.filterForm, orderTypeCode, pageNo: 1 }
      this.headerTabList[0].selectValue = orderTypeCode
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    onSelectStatus(status) {
      this.filterForm = { ...this.filterForm, status, pageNo: 1 }
      this.headerTabList[1].selectValue = status
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    onSelectSOStatus(sapOrderStatus) {
      this.filterForm = { ...this.filterForm, sapOrderStatus, pageNo: 1 }
      this.headerTabList[2].selectValue = sapOrderStatus
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    onSelectOrg(org) {
      const { key, value } = org
      if(this.filterForm.orgId === key) {
        this.filterForm = { ...this.filterForm, orgId: '' }
        this.filterFormExtra = { ...this.filterFormExtra, orgName: '' }
        return
      }
      this.distributorsPopup = false
      this.filterForm = { ...this.filterForm, orgId: key }
      this.filterFormExtra = { ...this.filterFormExtra, orgName: value }
    },
    onSelectmatkl(matkl) {
      const { key, value } = matkl
      if(this.filterForm.matklId === key) {
        this.filterForm = { ...this.filterForm, matklId: '' }
        this.filterFormExtra = { ...this.filterFormExtra, matklName: '' }
        return
      }
      this.filterForm = { ...this.filterForm, matklId: key }
      this.filterFormExtra = { ...this.filterFormExtra, matklName: value }
    },
    onZzprdmodelChange(e) {
      this.filterForm = { ...this.filterForm, zzprdmodel: e.detail }
    },
    onOrderCodeChange(e) {
      this.filterForm = { ...this.filterForm, orderCode: e.detail }
    },
    onToggleTimeFrame() {
      this.timeFrameVisible = !this.timeFrameVisible
    },
    onSelectTimeFrame(timeFrame) {
      this.filterForm = { ...this.filterForm, timeFrame }
    },
    onSubmitFilterForm() {
      this.filterForm = { ...this.filterForm, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
    },
    // 选择日期
    openCalendar(e) {
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
      if(type === 'sapDate') {
        begin = sapBeginDate
        end = sapEndDate
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
    onGetOrderListNext() {
      const { totalPages } = this.orderList
      if(totalPages > this.filterForm.pageNo) {
        this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1}
        this.myGetOrderList()
      }
    },
    // takeAgainOrder(id: string) {
    //   Toast.loading({
    //     message: '下单中....',
    //     duration: 0,
    //   });
    //   this.methods.againCommonOrder({ id } , (res: any) => {
    //     const { data } = res;
    //     if (data && data.cartOrder) {
    //       Toast.clear();
    //       wx.navigateTo({
    //         url: '/pages/goods/order/index?type=again',
    //       });
    //     } else {
    //       Toast.fail(data.msg || '结算失败');
    //     }
    //   });
    // },
  };
  myGetOrderList() {
    this.methods.getOrderList(this.filterForm);
  }
  onShow() {
    this.myGetOrderList()
    this.methods.getOrderDeliveryMethod({type: 2})
    this.methods.getOrderFilter({type: 2});
  }
}
