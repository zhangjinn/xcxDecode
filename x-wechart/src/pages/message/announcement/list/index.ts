import wepy from 'wepy';
import {connect} from 'wepy-redux';
import {
  getNoticeListNew,
} from '@/store/actions/notice';
import filter from "../../../components/header-filter/index";
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
  scrollTop: any;
  tabList: any[];
  tabActive: any;
  searchKey: string;
  filterForm: object
}

@connect({
  msgList({ notice }) {
    return notice.list
  },
}, {
  getNoticeListNew,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '公告',
    usingComponents: {
      'van-toast': '../../../../components/vant/toast/index',
      'van-loading': '../../../../components/vant/loading/index',
      'van-search': '../../../../components/vant/search/index',
    },
  };
  components = {
    filter,
    emptyDataType,
  };
  data: Data = {
    scrollTop: -1,
    tabList: [
      {name: '未读'},
      {name: '已读'},
    ],
    tabActive: '0',
    searchKey: '',
    filterForm: {
      terms: {
        status: '0',
        noticeText: '',
      },
      page: {
        pageNo: 1,
        pageSize: 10,
      }
    }
  };

  // 页面内交互写在methods里
  methods = {
    // tab切换
    tabChange(param){
      this.tabActive = param.tabActive
      this.filterForm.terms = { ...this.filterForm.terms, status: this.tabActive }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.getMsgList()
      this.$apply()
    },

    // 输入框搜索
    searchChange(param){
      this.searchKey = param.searchKey
      this.filterForm.terms = { ...this.filterForm.terms, noticeText: this.searchKey}
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.getMsgList()
      this.$apply()
    },

    // 跳转到详情
    viewDetail: (id: any) => {
      if (id) {
        let url = `/pages/me/notice/detail/index?id=${id}` // 公告详情
        wx.navigateTo({
          url: url
        })
      }
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
      const { datasCount } = this.msgList
      let totalPage = Math.ceil(datasCount/this.filterForm.page.pageSize)
      if (totalPage > this.filterForm.page.pageNo) {
        this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1 }
        this.getMsgList()
      }
    },

  };
  getMsgList() {
    let { terms, page } = this.filterForm
    let data = {
      status:terms.status,
      noticeText:terms.noticeText,
      pageNo:page.pageNo,
      pageSize:page.pageSize,
      orderBy: 'desc',
      formCode: 'announcementList',
      _loading: true
    }
    this.methods.getNoticeListNew(data)
  }
  onShow() {
    this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
    this.getMsgList()
  }

}
