import wepy from 'wepy';
import {connect, getStore} from 'wepy-redux';
import { getMyAddShopList } from '@/store/actions/store';
import { fillZero } from '@/utils/index';
import { baseUrl } from '@/utils/request';
import utilsWxs from '../../../wxs/utils.wxs';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
import { RESET_MY_ADD_SHOP_LIST } from "@/store/types/store";

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
  popupTitle: string;
  agentPopup: boolean;
  whetherToSinkList: any[];
  headerTabList: any[];
}

@connect({
  myAddShopList({store}) {
    return store.myAddShopList
  },

}, {
  getMyAddShopList,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '我新增的门店',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-field': '../../../components/vant/field/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-loading': '../../../components/vant/loading/index',
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
    popupTitle: '',
    agentPopup: false,
    whetherToSinkList:[{
      id:'1',
      name:'下沉门店'
    },{
      id:'0',
      name:'自有门店'
    }],
    filterForm: {
      terms: {
        status: '',
        storeName: '',
        storeAbbreviation: '',
        whetherToSinkId: '',
        whetherToSinkName: '',
        startDate: '',
        endDate: '',
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
      {id:'流程中',value:'审批中'},
      {id:'发布',value:'已添加'},
      {id:'作废',value:'已撤销'},
    ],
    headerTabList: [
      { name: '提报状态', type: 'orderStatus', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };
  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {
    // 跳转到详情
    viewDetail: (id: any) => {
      let url = ''
      if (id) { // 有id跳转到详情页面
        url = `/pages/terminal/addStore/index?id=${id}`
      }else{ // 无id跳转到新增页面，不用传值
        url = `/pages/terminal/addStore/index`
      }
      wx.navigateTo({
        url: url
      })
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
      if (['orderStatus'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 选择快捷筛选内容列表
    onSelectStatus(status) {
      getStore().dispatch({ type: RESET_MY_ADD_SHOP_LIST, payload: [] })

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
      getStore().dispatch({ type: RESET_MY_ADD_SHOP_LIST, payload: [] })

      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
      this.methods.scrollToTop()
    },

    // 筛选重置
    onResetFilterForm() {
      this.filterForm.terms = {
        ...this.filterForm.terms,
        storeName: '',
        storeAbbreviation: '',
        whetherToSinkId: '',
        whetherToSinkName: '',
        startDate: '',
        endDate: '',
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

    // 改变输入框
    onFieldChange(e) {
      let oName = e.currentTarget.dataset.key
      this.filterForm.terms = { ...this.filterForm.terms, [oName]: e.detail }
    },

    // 右侧筛选弹框，弹框中各筛选列表显示切换
    selectAgentPopup: (e) => {
      if (e == 'whetherToSink') {
        this.popupTitle = '是否下沉'
      }
      this.agentPopup = !this.agentPopup
    },

    selectStatus: (value: any, id: any) => {
      if(this.popupTitle == '是否下沉'){
        this.filterForm.terms = { ...this.filterForm.terms, whetherToSinkId: id, whetherToSinkName: value}
      }
      this.methods.selectAgentPopup()
    },

    // 回到顶部
    scrollToTop: () => {
      this.scrollTop = 0
    },

  };

  myGetOrderList() {
    let { terms } = this.filterForm
    let data = {
      custCisCode: wepy.$instance.globalData.cisCode,
      shopFullName: terms.storeName,
      shopSearchTerm: terms.storeAbbreviation,
      isSinkChannel: terms.whetherToSinkId,
      createdDateStart: terms.startDate,
      createdDateEnd: terms.endDate,
      checkStatus: terms.status
    }
    this.methods.getMyAddShopList({ _loading: true, ...data })
  }
  onShow() {
    getStore().dispatch({ type: RESET_MY_ADD_SHOP_LIST, payload: [] })
    this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
    this.myGetOrderList()
  }

}
