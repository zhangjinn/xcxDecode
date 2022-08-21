import wepy from 'wepy';
import { connect,getStore } from 'wepy-redux';
import {cancleSalesOrder, getPurchaseOrderList, getSalesOrderFilter,agentCancleSalesOrder} from '@/store/actions/salesorder';
import Toast from '@/components/vant/toast/toast';
import { fillZero, formatDate, getDateDiff } from '@/utils/index';
import { baseUrl, request } from '@/utils/request'
import {RESET_PURCHASE_ORDER_LIST, RESET_SALES_ORDER_INQUIRY_LIST,GET_PURCHASE_ORDER_LIST} from '@/store/types/salesorder';
import utilsWxs from '../../../../wxs/utils.wxs';
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
  cancelOrderPopup: boolean;
  cancelOrderId: string;
  isImg: boolean;
  headerTabList: any[];
}

@connect({
  orderList({ salesorder }) {
    return salesorder.purchaseorderList
  },
  filter({ salesorder }) {
    return salesorder.SuppliersList
  }
}, {
  getPurchaseOrderList,
  getSalesOrderFilter,
  cancleSalesOrder,
  agentCancleSalesOrder
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '渠道订单',
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
      _loading: true,
      terms:{
        documentNum: '',
        supplierCode: '',
        startDocumentDate: '',
        endDocumentDate: '',
        status:'',
      },
      page:{
        pageNo: 1,
        pageSize: 10,
        sortName: 'id',
        sortOrder: 'desc'
      },
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    baseUrl: baseUrl,
    cancelOrderPopup: false,
    cancelOrderId: '',
    cancelOrderItem: {},
    isImg: false,
    headerTabList: [
      { name: '单据状态', type: 'orderStatus', selectValue: '' },
      { name: '供应商', type: 'orderType', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };
  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {
    receiptEffect(item) {
      console.log('id',item);
      this.isImg = true
    },
    onClose(){
      this.isImg = false
    },
    viewmore: () => {
      this.viewmore = !this.viewmore
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
    viewDetail: (e: any,status:any,type:any) => {
      if (e) {
        let url=`/pages/dms/channel-purchase-order/detail/index?id=${e}`
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
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    onSelectSupplierCode(supplierCode) {
      getStore().dispatch({ type: RESET_PURCHASE_ORDER_LIST, payload: [] })
      this.filterForm.terms = { ...this.filterForm.terms, supplierCode }
      this.headerTabList[1].selectValue = supplierCode
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },
    onSelectStatus(status) {
      getStore().dispatch({ type: RESET_PURCHASE_ORDER_LIST, payload: [] })
      this.filterForm.terms = { ...this.filterForm.terms, status}
      this.headerTabList[0].selectValue = status
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },

    ondocumentNumChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, documentNum: e.detail }
    },
    onActivityNameChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, activityName: e.detail }
    },
    onActivityCodeChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, userActivityCode: e.detail }
    },
    onSubmitFilterForm() {
      getStore().dispatch({ type: RESET_PURCHASE_ORDER_LIST, payload: [] })
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
      this.filterForm.status='';
      this.filterForm.terms = { ...this.filterForm.terms, documentNum: '',startDocumentDate:'',endDocumentDate:''}
    },
    // 选择日期
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { startDocumentDate, endDocumentDate } = this.filterForm.terms;
      const { name, type } = e.target.dataset
      this.currentDateName = name
      let begin, end;
      if(type === 'date') {
        begin = startDocumentDate
        end = endDocumentDate
      }
      if(type === 'sapDate') {
        begin = startDocumentDate
        end = endDocumentDate
      }
      if(name.indexOf('startDocumentDate') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if(name.indexOf('endDocumentDate') > -1) {
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
      const { totalPage,totalCount } = this.orderList.page
      if(totalPage > this.filterForm.page.pageNo) {
        this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1}
        this.myGetOrderList()
      }
    },

    cancelOrderPopup: (item: any) => {
      this.cancelOrderItem = item
      this.cancelOrderId = item.id
      this.cancelOrderPopup = true
      this.$apply()
    },

    cancel: () => {
      this.cancelOrderPopup = false
      this.cancelOrderId = ''
    },

    //分销商取消订单
    cancleOrder: () => {
      Toast.loading({
        message: '取消中...',
        forbidClick: true,
        duration: 0,
        zIndex: 9999999
      });
      const id = this.cancelOrderId
      this.cancelOrderPopup = false
      this.cancelOrderId = ''
      //取消订单
      this.methods.agentCancleSalesOrder({
        purchaseOrderId: id
      }).then((res: { payload: { code: string; }; }) => {
        if (res.payload.code == "0") {
          Toast.success('取消成功');

          let data = {}
          let qtys = []
          let productIds = []
          this.cancelOrderItem.purchaseOrderItem.forEach((item)=>{
            qtys.push(-item.orderedQty)
            productIds.push(item.productCode)
          })

          data = {
            userActivityCode:this.cancelOrderItem.userActivityCode,
            dmsOrderCode:this.cancelOrderItem.documentNum,
            qtys:qtys.toString(),
            productIds:productIds.toString(),
          }

          request({
            api: `marketActivity/changeTransFlag.nd`,
            method:"POST",
            data: data,
            callback: (res1: any) => {
              setTimeout(() => {
                getStore().dispatch({type: RESET_PURCHASE_ORDER_LIST, payload: []})
                this.orderpopup = !this.orderpopup
                this.$apply();
                this.filterForm.page = {...this.filterForm.page, pageNo: 1}
                this.myGetOrderList();
              }, 2000);
            }
          });
        } else {
          Toast.fail(res.payload.msg || '取消失败');
        }
      })
    }

  };
  myGetOrderList() {
    this.methods.getPurchaseOrderList(this.filterForm);
  }
  onShow() {
    getStore().dispatch({ type: RESET_PURCHASE_ORDER_LIST, payload: [] })
    this.myGetOrderList()
  }
  onLoad() {
    this.methods.getSalesOrderFilter({
      type: 'gys',
    })
  }
}
