import wepy from 'wepy';
import {connect} from 'wepy-redux';
import { getNoticeNewList } from '@/store/actions/notice';
import filter from "../../../components/header-filter/index";
import noticeListItem from "../../components/notice-list-item/index";
import { formatDate } from "@/utils/index";
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
  scrollTop: any;
  tabList: any[];
  tabActive: any;
  searchKey: string;
  filterForm: object;
  msgList: any[];
}

@connect({

}, {
  getNoticeNewList,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '通知',
    usingComponents: {
      'van-toast': '../../../../components/vant/toast/index',
      'van-loading': '../../../../components/vant/loading/index',
      'van-search': '../../../../components/vant/search/index',
    },
  };
  components = {
    filter,
    noticeListItem,
    emptyDataType,
  };
  data: Data = {
    scrollTop: -1,
    tabList: [
      {
        name: '未读',
        count: 0
      },
      {
        name: '已读',
        count: 0
      },
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
        pageSize: 100,
        totalPage: 0,
      }
    },
    msgList: []
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

    // 跳转到待办处理列表页
    onSwitch: (item: any) => {
      let currId = item.noticeType
      let typeName = item.typeName
      if (currId) {
        let url = `/pages/me/message/detail/index?type=${currId}&typeName=${typeName}`
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
      let totalPage = this.filterForm.page.totalPage
      if (totalPage > this.filterForm.page.pageNo) {
        this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1 }
        this.getMsgList()
      }
    },
  };
  getMsgList() {
    let { terms, page } = this.filterForm
    let data = {
      status: terms.status,
      searchKeyWords: terms.noticeText,
      pageNo: page.pageNo,
      pageSize: page.pageSize,
      orderBy: 'desc',
      _loading: true
    }
    this.methods.getNoticeNewList(data).then((res)=>{
      if ( res && res.payload ) {
        this.filterForm.page = { ...this.filterForm.page, totalPage: res.payload.totalPage }
        if(res.payload.content && res.payload.content.length){
          res.payload.content = res.payload.content.map((item)=>{
            return {
              ...item,
              createDateStr: item.noticeDTO.createdDate ? formatDate(item.noticeDTO.createdDate, "Y-M-D") : '',
              content: item.noticeDTO.content,
              amount: terms.status == '0' ? item.noticeAmount : 0,
            }
          })
        }
        if (this.filterForm.page.pageNo > 1) {
          this.msgList = this.msgList.concat(res.payload.content)
        } else {
          this.msgList = res.payload.content
        }
      }

      // 获取全部未读消息数量
      let allUnreadMsg = 0
      if(this.msgList && this.msgList.length > 0){
        this.msgList.forEach((item)=>{
          allUnreadMsg += item.amount
        })
      }
      this.tabList[terms.status].count = allUnreadMsg

      this.$apply()
    })
  }
  onShow() {
    this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
    this.getMsgList()
  }

}
