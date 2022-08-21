import wepy from 'wepy';
import {connect} from 'wepy-redux';
import emptyDataType from "../../../../components/empty-data-type/index";
import { getReturnOrderInfo } from '@/store/actions/returnbefore';

interface Data {
  scrollTop: any;
  searchKey: string;
  filterForm: object;
  msgList: any[];
}

@connect({

}, {
  getReturnOrderInfo
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '销售退货',
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
    // 跳转至代理商退货录入
    returnInitiation: (e) => {
      const { item } = e.currentTarget.dataset
      let documentNum = item.documentNum
      if(documentNum){
        wx.navigateTo({
          url: `/pages/dms/agent-returns/initiate/index?documentNum=${documentNum}`
        })
      }
    },
    // 跳转至代理商退货入库
    returnWarehousing: (e) => {
      const { item } = e.currentTarget.dataset
      let returnOrderId = item.returnId
      let documentNum = item.documentNum
      if(returnOrderId && documentNum){
        wx.navigateTo({
          url: `/pages/dms/agent-returns/warehousing/index?returnOrderId=${returnOrderId}&documentNum=${documentNum}`
        })
      }
    },
    // 查看详情
    viewDetails: (e) => {
      const { item } = e.currentTarget.dataset
      let id = item.salesOrderId
      if(id){
        wx.navigateTo({
          url: `/pages/dms/sales-order-detail/index?id=${id}` // 销售订单详情
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
    this.methods.getReturnOrderInfo({
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
