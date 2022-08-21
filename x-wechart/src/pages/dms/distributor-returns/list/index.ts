import wepy from 'wepy';
import {connect} from 'wepy-redux';
import emptyDataType from "../../../../components/empty-data-type/index";
import { getReturnChannelOrderInfo } from '@/store/actions/returnbefore';

interface Data {
  scrollTop: any;
  searchKey: string;
  filterForm: object;
  msgList: any[];
}

@connect({

}, {
  getReturnChannelOrderInfo
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '分销商退货',
    usingComponents: {
      'van-toast': '../../../../components/vant/toast/index',
      'van-loading': '../../../../components/vant/loading/index',
      'van-search': '../../../../components/vant/search/index',
    },
  };
  components = {
    emptyDataType
  };
  data: Data = {
    scrollTop: -1,
    searchKey: '',
    filterForm: {
      terms: {
        filterStr: '',
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        totalPage: 0,
      }
    },
    msgList: []
  };

  // 页面内交互写在methods里
  methods = {
    // 跳转至分销商出库页面
    returnInitiation: (e) => {
      const { item, type } = e.currentTarget.dataset
      let id = ''
      if(type==='initiate'){ // 退货发起
        id = item.purchaseOrderId
      }else if(type==='outStock'){ // 退货出库
        id = item.returnId
      }
      if(id){
        wx.navigateTo({
          url: `/pages/dms/distributor-returns/edit/index?id=${id}&type=${type}`
        })
      }
    },
    viewDetails: (e) => {
      const { item } = e.currentTarget.dataset
      let id = item.purchaseOrderId
      if(id){
        wx.navigateTo({
          url: `/pages/dms/channel-purchase-order/detail/index?id=${id}` // 渠道订单详情
        })
      }
    },
    // 输入框搜索
    onChange: (e: any) => {
      this.searchKey = e.detail;
      this.filterForm.terms = { ...this.filterForm.terms, filterStr: this.searchKey}
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.getMsgList()
      this.$apply()
    },
    onClick: () => {
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.getMsgList()
      this.$apply()
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
      let totalPage = this.filterForm.page.totalPage
      if (totalPage > this.filterForm.page.pageNo) {
        this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1 }
        this.getMsgList()
      }
    },
  };

  getMsgList() {
    let { terms, page } = this.filterForm
    this.methods.getReturnChannelOrderInfo({
      cisCode: wepy.$instance.globalData.cisCode,
      _loading: true,
      filterStr: terms.filterStr,
      page: {
        pageNo: page.pageNo,
        pageSize: page.pageSize
      }
    }).then((res)=>{
      const { data, page } = res.payload
      this.filterForm.page = { ...this.filterForm.page, totalPage: page.totalPage }

      if (this.filterForm.page.pageNo > 1) {
        this.msgList = this.msgList.concat(data)
      } else {
        this.msgList = data
      }
      this.$apply()
    })
  }
  onShow() {
    this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
    this.getMsgList()
  }

}
