import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { getOrderFilter,getOrderDeliveryMethod,getRoutineOrderList } from '@/store/actions/order';
import Toast from '@/components/vant/toast/toast';
import { fillZero, getLastMonthYesterday, getDateDiff } from '@/utils/index';
import { baseUrl, request } from '@/utils/request';
import utilsWxs from '../../../wxs/utils.wxs';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
import { againCommonOrder, agentCanceleOrder } from '@/store/actions/order';
import { forEach } from 'ramda';
import { RESET_ORDER_LIST } from '@/store/types/order';
interface Data {
  visible: boolean;
  Suppliersextend: boolean;
  Itemgroupextend: boolean;
  orderStatusextend: boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  timeFrameVisible: boolean;
  calendarShow: boolean;
  filterForm: object;
  filterFormExtra: object;
  calendarConfig: object;
  currentDateName: string;
  baseUrl: string;
  popupTitle: string;
  agentPopup: boolean;
  agentPopupName: string;
  deliveryPopupName: string;
  purchasePopupName: string;
  cancelOrderPopup: boolean;
  cancelOrderId: string;
  continuePayPopup: boolean;
  continuePayId: string;
  scrollTop: number;
  headerTabList: any[];
}

@connect({
  orderList({ order }) {
    return order.orderList
  },
  deliveryMethod({ order }) {
    return order.deliveryMethod
  },
  mixinCurrentUser({ user }) {
    return user.info || {}
  },
  filter({ order }) {
    return order.filter
  },

}, {
  getOrderFilter,
  againCommonOrder,
  getOrderDeliveryMethod,
  agentCanceleOrder,
  getRoutineOrderList
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '海信常规订单',
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
  wxs = {
    utils: utilsWxs,
  };
  data: Data = {
    visible: false,
    Suppliersextend: false,
    Itemgroupextend: false,
    orderStatusextend: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    timeFrameVisible: false,
    calendarShow: false,
    agentPopup: false,
    popupTitle: '',
    agentPopupName: '全部',
    deliveryPopupName: '全部',
    purchasePopupName: '全部',
    currentDateName: '',
    cancelOrderPopup: false,
    cancelOrderId: '',
    continuePayPopup: false,
    continuePayId: '',
    scrollTop: 0,
    filterForm: {
      _loading: true,
      agentCheckStart: '',
      agentCheckEnd: '',
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
      // sapBeginDate: '', 不用了
      // sapEndDate: '',
      agentId: '',
      trans: '',
      directBuy: '',
      purchaseTypeId: '',
      orderStatus: ''
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
    purchaseType: [
      {
        key: 1,
        value: '应急采购'
      },
      {
        key: 2,
        value: '常规采购'
      }
    ],
    headerTabList: [
      { name: '订单状态', type:'orderStatus', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };
  // 页面内交互写在methods里
  methods = {
    goMe:() => {
      wx.switchTab({
        url: '/pages/main/me/index'
      })
    },
    continueToPay: (id: any) => {
      this.continuePayId = id
      this.continuePayPopup = true
      this.$apply()
    },
    continuePay:() => {
      Toast.loading({
        message: '支付中...',
        forbidClick: true,
        duration: 0,
        zIndex: 9999999
      });
      const id = this.continuePayId
      this.continuePayPopup = false
      this.continuePayId = ''
      let openId = wepy.$instance.globalData.openid
      if (!openId) {
        wx.login({
          success: (wxRes: any) => {
            if (wxRes.code) {
              request({
                api: `queryCodeInfo.nd?code=${wxRes.code}`,
                callback: (res: any) => {
                  const { data: { openid } } = res
                  if(openid) {
                    openId = openid
                  } else {
                    Toast.fail('获取code失败');
                  }
                },
              });
            }
          },
          fail: () => {
            Toast.fail('获取code失败');
          },
        });
      }
      const item = {
        openId,
        orderCode: id
      }
      request({
        api: `order/payOrder.nd`,
        method: 'POST',
        data: item,
        callback: (res: any) => {
          Toast.clear();
          const { data } = res
          if (data && data.payInfo) {
            const { payInfo: { timeStamp,nonceStr ,paySign ,signType}} = data
            wx.requestPayment({
              timeStamp: timeStamp.toString(),
              nonceStr: nonceStr,
              package: data.payInfo.package,
              signType: signType,
              paySign: paySign,
              success: () => {
                Toast.success('订单支付成功')
                setTimeout(()=>{
                  this.filterForm = { ...this.filterForm, pageNo: 1 }
                  getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
                  this.scrollTop = 0
                  this.OrderSFilterVisible = false
                  this.CurrentOrderSFilterName = ''
                  this.myGetOrderList()
                }, 2000)
              },
              fail: () => {
                Toast.fail('订单支付失败');
              }
            })
          } else {
            Toast.fail('订单支付失败');
          }
        }})
    },
    onScroll: (event: Weapp.Event) => {
      if (event.detail.scrollTop >= 350) {
        if (this.scrollTop === 0) {
          this.scrollTop = event.detail.scrollTop
        }
      }
    },
    cancelOrderPopup: (id: any,code: any) => {
      /*this.cancelOrderId = id
      this.cancelOrderPopup = true
      this.$apply()*/
      //跳转到取消页面
      wx.navigateTo({
        url: `/pages/me/order-cancel/index?orderId=` + id + `&orderCode=` + code + `&ly=0`
      })
    },
    cancel: () => {
      this.cancelOrderPopup = false
      this.continuePayPopup = false
      this.cancelOrderId = ''
      this.continuePayId = ''
    },
    cancleOrder:() => {
      Toast.loading({
        message: '取消中...',
        forbidClick: true,
        duration: 0,
        zIndex: 9999999
      });
      const id = this.cancelOrderId
      this.cancelOrderPopup = false
      this.cancelOrderId = ''
      request({ api: `order/cancelOrder.nd?orderCode=${id}`, callback: (res: any) => {
          Toast.clear();
          if (res && res.data && res.data.code == '0') {
            Toast.success('取消订单成功')
            setTimeout(()=>{
              this.filterForm = { ...this.filterForm, pageNo: 1 }
              getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
              this.scrollTop = 0
              this.OrderSFilterVisible = false
              this.CurrentOrderSFilterName = ''
              this.myGetOrderList()
            }, 2000)
          } else {
            Toast.fail('取消订单失败');
          }
        }})
    },
    onCheckDirectOrders: () => {
      if(this.filterForm.directBuy == '') {
        this.filterForm.directBuy = 1
      } else {
        this.filterForm.directBuy = ''
      }
      this.$apply()
    },
    selectAgent: (key: any) => {
      forEach((item) => {
        if(item.key == key) {
          this.agentPopupName = item.value
          this.filterForm = { ...this.filterForm, agentId: item.key }
        }
      },this.filter.itemAgent)
      this.agentPopup = false
      this.$apply()
    },
    selectDelivery: (key: any) => {
      forEach((item: any) => {
        if(item.code == key) {
          this.deliveryPopupName = item.name
          this.filterForm = { ...this.filterForm, trans: item.code }
        }
      },this.deliveryMethod)
      this.agentPopup = false
      this.$apply()
    },
    selectPurchaseType: (key: any) => {
      forEach((item: any) => {
        if(item.key == key) {
          this.purchasePopupName = item.value
          this.filterForm = { ...this.filterForm, purchaseTypeId: item.key }
        }
      },this.purchaseType)
      this.agentPopup = false
      this.$apply()
    },
    selectagentPopup: (e) => {
      if(e == 'salesOrganization') {
        this.popupTitle = '销售组织'
      }
      this.agentPopup = !this.agentPopup
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
          url: `/pages/me/order-detail/index?id=${e}`
        })
      }
    },
    Suppliers: () => {
      this.Suppliersextend = !this.Suppliersextend
    },
    Itemgroup: () => {
      this.Itemgroupextend = !this.Itemgroupextend
    },
    OrderStatusGroup: ()=>{
      this.orderStatusextend = !this.orderStatusextend
    },
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    onSelectOrderTypeCode(orderTypeCode) {
      this.filterForm = { ...this.filterForm, orderTypeCode, pageNo: 1 }
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    onSelectStatus(orderStatus) {
      this.filterForm = { ...this.filterForm, orderStatus, pageNo: 1 }
      this.headerTabList[0].selectValue = orderStatus
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    onSelectSOStatus(sapOrderStatus) {
      this.filterForm = { ...this.filterForm, sapOrderStatus, pageNo: 1 }
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    onSelectOrg(org: any) {
      const { key, value } = org
      if(this.filterForm.orgId === key) {
        this.filterForm = { ...this.filterForm, orgId: '' }
        this.filterFormExtra = { ...this.filterFormExtra, orgName: '' }
        return
      }
      this.filterForm = { ...this.filterForm, orgId: key }
      this.filterFormExtra = { ...this.filterFormExtra, orgName: value }
      this.agentPopup = false
    },
    onSelectmatkl(matkl: any) {
      const { key, value } = matkl
      if(this.filterForm.matkl === key) {
        this.filterForm = { ...this.filterForm, matkl: '' }
        this.filterFormExtra = { ...this.filterFormExtra, matklName: '' }
        return
      }
      this.filterForm = { ...this.filterForm, matkl: key }
      this.filterFormExtra = { ...this.filterFormExtra, matklName: value }
    },
    onSelectOrderStatus(status: any) {
      if(this.filterForm.orderStatus === status) {
        this.filterForm = { ...this.filterForm, orderStatus: '' }
        return
      }
      this.filterForm = { ...this.filterForm, orderStatus: status }
    },
    onZzprdmodelChange(e) {
      this.filterForm = { ...this.filterForm, zzprdmodel: e.detail }
    },
    onOrderCodeChange(e) {
      this.filterForm = { ...this.filterForm, orderCode: e.detail }
    },
    onWeekChange(e) {
      this.filterForm = { ...this.filterForm, weekName: e.detail }
    },
    onToggleTimeFrame() {
      this.timeFrameVisible = !this.timeFrameVisible
    },
    onSelectTimeFrame(timeFrame) {
      this.filterForm = { ...this.filterForm, timeFrame }
    },
    onSubmitFilterForm() {
      this.filterForm = { ...this.filterForm, pageNo: 1 }
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.myGetOrderList()
      this.methods.orderfiltering()
    },
    // 选择日期
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { beginDate, endDate, sapBeginDate, sapEndDate, agentCheckStart, agentCheckEnd } = this.filterForm;
      const { name, type } = e.target.dataset
      this.currentDateName = name
      let begin, end;
      if(type === 'date') {
        begin = beginDate
        end = endDate
      }
      if(type === 'agent') {
        begin = agentCheckStart
        end = agentCheckEnd
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
      if(name.indexOf('agent') > -1) {
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
    takeAgainOrder(id: string) {
      Toast.loading({
        message: '下单中....',
        duration: 0,
      });
      this.methods.againCommonOrder({ id } , (res: any) => {
        const { data } = res;
        if (data && data.cartOrder) {
          Toast.clear();
          wx.navigateTo({
            url: '/pages/goods/order/index?type=again',
          });
        } else {
          Toast.fail(data.msg || '结算失败');
        }
      });
    },
    //代理商取消订单
    canceleOrder(id: string) {
      Toast.loading({
        message: '取消中....',
        duration: 0,
      });
      this.methods.agentCanceleOrder({ id } , (res: any) => {
        const { data } = res;
        if (data && data.code === '0') {
          Toast.clear();
          wx.navigateTo({
            url: '/pages/goods/order/index?type=again',
          });
        } else {
          Toast.fail(data.msg || '取消失败');
        }
      });

    }
  };
  myGetOrderList() {
    this.methods.getRoutineOrderList(this.filterForm);
  }
  onShow() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ?'0' + month :month
    let day = date.getDate();
    day = day < 10 ?'0' + day :day
    let lastDate = new Date(new Date().setMonth(new Date().getMonth() - 1))
    let lastYear = lastDate.getFullYear();
    let lastMonth = lastDate.getMonth() + 1;
    let lastDay = lastDate.getDate();
    lastMonth = lastMonth < 10 ?'0' + lastMonth :lastMonth
    lastDay = lastDay < 10 ?'0' + lastDay :lastDay
    this.methods.getOrderDeliveryMethod({type: ''})
    // const now = new Date()
    // const month = now.getMonth() + 1
    // const day = now.getDate()
    this.filterForm = {
      ...this.filterForm,
      // beginDate: `${now.getFullYear()}-01-01`,
      orderDateStart: lastYear + '-' + lastMonth + '-' + lastDay,  //getLastMonthYesterday(),
      orderDateEnd: year + '-' + month + '-' + day    //`${now.getFullYear()}-${ month > 9 ? month : `0${month}`}-${day > 9 ? day: `0${day}`}`
    }
    this.myGetOrderList()
    this.methods.getOrderFilter({ type: 1});

    console.log(this.orderList);
  }
}
