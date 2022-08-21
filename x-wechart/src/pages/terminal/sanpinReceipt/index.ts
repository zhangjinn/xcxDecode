import wepy from 'wepy';
import {connect, getStore} from 'wepy-redux';
import {
  getSalesOrderList,
} from '@/store/actions/sanpinReceipt';
import { baseUrl } from '@/utils/request';
import utilsWxs from '../../../wxs/utils.wxs';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
import { RESET_SALES_ORDER_LIST } from '@/store/types/sanpinReceipt';

interface Data {
  visible: boolean;
  filterVisible: boolean;
  currentFilterName: string;
  filterForm: object;
  baseUrl: string;
  scrollTop: number;
  statusFilterList: object[];
  supplierFilterList: object[];
  showRightBtn: boolean;
  headerTabList: any[];
}

@connect({
  orderList({ sanpinReceipt }) {
    return sanpinReceipt.orderList
  },
}, {
  getSalesOrderList,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '终包收货',
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
    filterVisible: false,
    currentFilterName: '',
    scrollTop: -1,
    filterForm: {
      terms: {
        status: '',
        supplier: '',
        receiverName: '',
      },
      page: {
        pageNo: 1,
        pageSize: 10,
      },
    },
    baseUrl: baseUrl,
    statusFilterList: [
      {id:'1',value:'已收货'},
      {id:'0',value:'未收货'}
    ],
    supplierFilterList: [
      {id:'1',value:'供应商1'},
      {id:'2',value:'供应商2'}
    ],
    showRightBtn: false,
    headerTabList: [
      { name: '收货状态', type: 'status', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };
  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {

    // 跳转到详情
    viewDetail: (id: any, type: any) => {
      if (id) {
        let url = `/pages/terminal/sanpinReceiptDetail/index?id=${id}&type=${type}`
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
      if (!this.filterVisible) {
        this.filterVisible = true
        this.currentFilterName = name
        return
      }
      if (!name) {
        this.filterVisible = false
        this.currentFilterName = ''
        return
      }
      if (this.currentFilterName === name) {
        this.filterVisible = false
        this.currentFilterName = ''
        return
      }
      if (['status', 'supplier'].indexOf(name) > -1) {
        this.currentFilterName = name
        return
      }
      this.filterVisible = false
      this.currentFilterName = ''
    },

    // 选择快捷筛选收货状态内容列表
    onSelectStatus(status) {
      getStore().dispatch({ type: RESET_SALES_ORDER_LIST, payload: [] })

      this.filterForm.terms = { ...this.filterForm.terms, status }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.headerTabList[0].selectValue = status
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },

    // 选择快捷筛选供应商内容列表
    onSelectSupplier(supplier) {
      this.filterForm.terms = { ...this.filterForm.terms, supplier }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },

    // 点击普通筛选按钮-显示或隐藏左侧筛选框
    orderfiltering: () => {
      this.visible = !this.visible
      this.filterVisible = false
      this.currentFilterName = ''
    },

    // 筛选确定
    onSubmitFilterForm() {
      getStore().dispatch({ type: RESET_SALES_ORDER_LIST, payload: [] })

      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
      this.methods.scrollToTop()
    },

    // 筛选重置
    onResetFilterForm() {

      this.filterForm.terms = {
        ...this.filterForm.terms,
        receiverName: '',
      }
    },

    // 改变收货人
    onReceiverNameChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, receiverName: e.detail }
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
      // supplierName:terms.supplier,
      // shop:terms.receiverName,
      page:page.pageNo,
      rows:page.pageSize,
    }

    this.methods.getSalesOrderList({ _loading: true, ...data })

  }
  onShow() {
    getStore().dispatch({ type: RESET_SALES_ORDER_LIST, payload: [] })
    this.myGetOrderList()
  }

}
