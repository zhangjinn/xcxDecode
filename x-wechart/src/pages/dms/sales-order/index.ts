import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import {
  getSalesOrderList, getSalesOrderFilter,
  cancleSalesOrder, deleteSalesOrder,
  salesOrderApproval,salesOrderRejected,
  canselOrder
} from '@/store/actions/salesorder';
import Toast from '@/components/vant/toast/toast';
import { fillZero, formatDate, getDateDiff } from '@/utils/index';
import { baseUrl } from '@/utils/request';
import { RESET_SALES_ORDER_INQUIRY_LIST } from '@/store/types/salesorder';
import { getsaleFilterList } from "@/store/actions/dmsoutwarehouse"
import utilsWxs from '../../../wxs/utils.wxs';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  visible: boolean;
  orderpopup: boolean;
  messagepopup:boolean;
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
  beDismissed: boolean;
  beDismissedId: string;
  reviewConsent: boolean;
  reviewConsentId: string;
  cancelSucMes: string;
  isSpeclalShopFilter:any;
  headerTabList: any[];
}

@connect({
  orderList({ salesorder }) {
    console.log("orderLsit===>", salesorder.orderList)
    return salesorder.orderList
  },
  filter({ salesorder }) {
    return salesorder.documentTypeList
  },
  saleFilterList({ dmsoutwarehouse }) {
    return dmsoutwarehouse.saleFilterList
  },
}, {
  getSalesOrderList,
  getSalesOrderFilter,
  cancleSalesOrder,
  deleteSalesOrder,
  salesOrderApproval,
  salesOrderRejected,
  getsaleFilterList,
  canselOrder
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '销售订单查询',
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
    orderpopup: false,
    messagepopup:false;
    deletepopup: false,
    Statusextend: false,
    OrderTypeextend: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    timeFrameVisible: false,
    calendarShow: false,
    beDismissed: false,
    reviewConsent: false,
    reviewConsentId: '',
    beDismissedId: '',
    currentDateName: '',
    cancelSucMes:'',
    scrollTop: -1,
    filterForm: {
      terms: {
        salefitlerId:'',
        documentNum: '',
        purchaseNum: '',
        customerName: '',
        startDate: '',
        endDate: '',
        status: '',
        sellerCode: '',
        documentType: '',
        returnStatus: '',
        customerCode: '',
        warehouseCode: '',
        warehouseName: '',
        sellerName: '',
        isSpeclalShop: '',
        isCrossCategory:'' //是否跨品类
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
    showCanselExamle:false, // 取消审核弹窗
    ExamineId:'', // 取消审核单号id
    isSpeclalShopFilter:[
      {key:'T',value:'是'},
      {key:'F',value:'否'}
    ],
    headerTabList: [
      { name: '订单状态', type: 'orderStatus', selectValue: '' },
      { name: '订单类型', type: 'orderType', selectValue: '' },
      { name: '是否是专卖店', type: 'isSpeclalShop', selectValue: '' },
    ], // 顶部搜索切换按钮列表

  };
  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {
    crossCategory(e) {
      let type = e.target.dataset.type;
      if(type == this.filterForm.terms.isCrossCategory) {
        this.filterForm.terms.isCrossCategory = ''
      } else {
        this.filterForm.terms.isCrossCategory = type
      }
    },
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
      if (['orderType','isSpeclalShop', 'orderStatus', 'auditStatus'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    viewDetail: (e: any, status: any, type: any) => {
      if (e) {
        let url = `/pages/dms/sales-order-detail/index?id=${e}`
        if (status == '草稿') {
          if (type == 'normal') {
            url = `/pages/dms/channel-order-detail/index?id=${e}`
          } else if (type == 'retail') {
            url = `/pages/dms/retail-order-detail/index?id=${e}`
          }
        }
        wx.navigateTo({
          url: url
        })
      }
    },
    Status: () => {
      this.Statusextend = !this.Statusextend
    },
    OrderTypeCode: () => {
      this.OrderTypeextend = !this.OrderTypeextend
    },
    // showSucMessage () {
    //   this.messagepopup = !this.messagepopup
    // },
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    onSelectOrderTypeCode(documentType) {
      this.filterForm.terms = { ...this.filterForm.terms, documentType }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.headerTabList[1].selectValue = documentType
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },
    onSelectSpeclalShopCode(isSpeclalShop) {
      this.filterForm.terms = { ...this.filterForm.terms, isSpeclalShop }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.headerTabList[2].selectValue = isSpeclalShop
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },
    onSelectStatus(status) {

      this.filterForm.terms = { ...this.filterForm.terms, status }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.headerTabList[0].selectValue = status
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },

    onSelectFStatus(status) {
      this.filterForm.terms.status = status
    },
    onSelectOrderType(type) {
      this.filterForm.terms.documentType = type
    },

    ondocumentNumChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, documentNum: e.detail }
    },
    oncustomerNameChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, customerName: e.detail }
    },
    onActivityNameChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, activityName: e.detail }
    },
    onActivityCodeChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, userActivityCode: e.detail }
    },
    onsellerNameChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, sellerName: e.detail }
    },
    onwarehouseNameChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, warehouseName: e.detail }
    },
    onToggleTimeFrame() {
      this.timeFrameVisible = !this.timeFrameVisible
    },
    onSelectTimeFrame(timeFrame) {
      this.filterForm = { ...this.filterForm, timeFrame }
    },
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
    onResetFilterForm() {
      this.filterForm.status = '';
      this.filterForm.terms = { ...this.filterForm.terms, documentNum: '', customerName: '', sellerName: '', warehouseName: '', startDate: '', endDate: '', isCrossCategory: '' }
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
    start: (e) => {
      this.id = e
      this.orderpopup = !this.orderpopup
    },


    cancel: () => {
      this.orderpopup = !this.orderpopup
    },
    cancelDismissed: () => {
      // 驳回popup
      this.beDismissed = false
    },

    // 取消审核弹窗
    cancelExamine:() =>{
      this.showCanselExamle = false
    },
    // 打开审核弹框
    ordercanselExamine: (id: any) => {
      this.ExamineId = id
      this.showCanselExamle = true
      this.$apply()
    },
    // TODO:取消审核接口对接
    canselExamine: () => {
      this.showCanselExamle = false
      const id = this.ExamineId
      const account = wepy.$instance.globalData.account
      this.methods.canselOrder({
        _loading: true,
        userAccount:account,
        salesOrderId: id
      }).then((res) => {
        if(res && res.payload && res.payload.code == '0') {
          Toast.success('取消审核成功');
          setTimeout(() => {
            getStore().dispatch({ type: RESET_SALES_ORDER_INQUIRY_LIST, payload: [] })
            this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
            this.$apply();
            this.myGetOrderList();
          }, 2000);
        }
      })
    },


    // 订单驳回弹框
    orderDismissed: (id: any) => {
      this.beDismissedId = id
      this.beDismissed = true
      this.$apply()
    },
    // TODO:订单驳回
    beDismissed: () => {
      this.beDismissed = false
      const id = this.beDismissedId
      const account = wepy.$instance.globalData.account
      this.methods.salesOrderRejected({
        _loading: true,
        userAccount:account,
        salesOrderId: id
      }).then((res) => {
        if(res && res.payload && res.payload.code == '0') {
          Toast.success('审核驳回成功');
        }
        setTimeout(() => {
          getStore().dispatch({ type: RESET_SALES_ORDER_INQUIRY_LIST, payload: [] })
          this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
          this.$apply();
          this.myGetOrderList();
        }, 2000);
      })
    },
    orderConsent: (id: any) => {
      this.reviewConsent = true
      this.reviewConsentId = id
      this.$apply()
    },
    // TODO:审核同意
    beConsent: () => {
      this.reviewConsent = false
      const id = this.reviewConsentId
      const account = wepy.$instance.globalData.account
      this.methods.salesOrderApproval({
        _loading: true,
        userAccount:account,
        salesOrderId: id
      }).then((res) => {
        if(res && res.payload && res.payload.code == '0') {
          Toast.success('审核同意成功');
        }
        setTimeout(() => {
          getStore().dispatch({ type: RESET_SALES_ORDER_INQUIRY_LIST, payload: [] })
          this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
          this.$apply();
          this.myGetOrderList();
        }, 2000);
      })
    },
    cancelConsent: () => {
      this.reviewConsent = false
    },
    deletestart: (e) => {
      this.id = e
      this.deletepopup = !this.deletepopup
    },
    deletecancel: () => {
      this.deletepopup = !this.deletepopup
    },
    cancleSuc:()=>{
      this.messagepopup = false;
    }
    cancleOrder() {
      const id = this.id
      Toast.loading({
        message: '取消中....',
        duration: 0,
      });
      this.methods.cancleSalesOrder({
        salesOrderId: id
      }).then((res: { payload: { code: string; data: any; }; }) => {
        if (res.payload.code == "0") {
          Toast.clear()
          setTimeout(() => {
            getStore().dispatch({ type: RESET_SALES_ORDER_INQUIRY_LIST, payload: [] })
            this.orderpopup = !this.orderpopup
            this.$apply();
            this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
            this.myGetOrderList();
            //增加消息成功返回
            let list = res.payload.data;
            var sucm = '以下商品取消成功：';
            for (var i = 0; i < list.length; ++i) {
              sucm = sucm + list[i].model + "   ";
              sucm = sucm + list[i].borderedQty +  "台   ";
            }
            this.cancelSucMes = sucm;

            this.messagepopup = true;
          }, 2000);

        } else {
          Toast.fail(res.payload.msg || '取消失败');
        }
      })
    },
    deleteOrder() {
      const id = this.id
      Toast.loading({
        message: '删除中....',
        duration: 0,
      });
      this.methods.deleteSalesOrder({
        salesOrderId: id
      }).then((res: { payload: { code: string; }; }) => {
        if (res.payload.code == "0") {
          Toast.success('删除成功');
          setTimeout(() => {
            getStore().dispatch({ type: RESET_SALES_ORDER_INQUIRY_LIST, payload: [] })
            this.deletepopup = !this.deletepopup
            this.$apply();
            this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
            this.myGetOrderList();
          }, 2000);
        } else {
          Toast.fail(res.payload.msg || '取消失败');
        }
      })
    },
  };
  myGetOrderList() {
    this.methods.getSalesOrderList({ _loading: true, ...this.filterForm });
  }
  onShow() {
    this.myGetOrderList()
    this.methods.getsaleFilterList()
    // this.methods.getSalesOrderFilter();
  }
  onLoad() {
    this.methods.getSalesOrderFilter({
      "type": 'djlx',
    })
  }
}
