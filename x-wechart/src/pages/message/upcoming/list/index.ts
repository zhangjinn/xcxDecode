import wepy from 'wepy';
import {connect} from 'wepy-redux';
import { getUpcomingList } from '@/store/actions/notice';
import filter from "../../../components/header-filter/index";
import noticeListItem from "../../components/notice-list-item/index";
import emptyDataType from "@/components/empty-data-type/index";
import { formatDate } from "@/utils/index";

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
  getUpcomingList,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '待办',
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
        name: '待处理',
        count: 0
      },
      {
        name: '已处理',
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
      let currId = item.backlogType
      let typeName = item.typeName
      let url = this.getTodoUrl(currId)
      if (currId && url) {
        url = `${url}?status=${this.tabActive}&typeValue=${currId}&typeName=${typeName}`
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

  getTodoUrl(id){
    if(id){
      id = id.toString()
    }
    switch(id){ // 需和首页待办跳转同步
      case "14170681475": // 1财务待办
        return '/pages/me/financial-todo/index';
      case "14170681476": // 2合同待办
        return '/pages/me/todo/index';
      case "14173612880": // 3巡店待办
        return '/pages/me/shop-todo/index';
      case "14173612881": // 4整改通知
        return '/pages/me/shopfix-todo/index';
      case "14173612879": // 5意见征询待办
        return '/pages/me/consult-todo/index';
      default:
        return '/pages/me/assessment-notice-todo/index';
    }
  }
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
    this.methods.getUpcomingList(data).then((res)=>{
      if ( res && res.payload ) {
        this.filterForm.page = { ...this.filterForm.page, totalPage: res.payload.totalPage }
        if(res.payload.content && res.payload.content.length){
          res.payload.content = res.payload.content.map((item)=>{
            return {
              ...item,
              createDateStr: item.backlogDto.createDateStr ? formatDate(item.backlogDto.createDateStr, "Y-M-D") : '',
              content: item.backlogDto.content,
              amount: terms.status == '0' ? item.backlogAmount : 0,
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
