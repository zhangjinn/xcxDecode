import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { getConsultTodoCounts, getConsultTodoItems } from '@/store/actions/consultTodo';
import CommonMixin from '@/mixins/common';
import $Toast from '@/components/vant/toast/toast';
import utilsWxs from '../../../wxs/utils.wxs';
import emptyDataType from "@/components/empty-data-type/index";

@connect({
  count({ consultTodo }) {
    return consultTodo.count;
  },
  items({ consultTodo }) {
    return consultTodo.items;
  },
}, {
  getConsultTodoCounts,
  getConsultTodoItems,
})
export default class consultTodo extends wepy.page {
  config = {
    navigationBarTitleText: '意见征询待办',
    usingComponents: {
      'van-button': '../../../components/vant/button/index',
      'van-tab': '../../../components/vant/tab-item/index',
      'van-tabs': '../../../components/vant/tabs-item/index',
      'van-search': '../../../components/vant/search/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
    },
    enablePullDownRefresh: true,
  };
  components = {
    emptyDataType,
  };
  mixins = [ CommonMixin ];
  wxs = {
    utils: utilsWxs,
  };
  params = {
    pageSize: 10,
    pageNo: 1,
    status: 0,
  };
  isView = false;
  data = {
    active: 'first',
    key: '',
    // 加载数据中
    loading: false,
    // 是否全部加载完毕
    complete: false,
  };

  // 页面内交互写在methods里
  methods = {
    // 过滤数据
    search: (params: any) => {
      $Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });
      this.methods.getConsultTodoItems(params, (res: any) => {
        // 接口返回 关闭对应状态
        this.loading = false;
        wx.stopPullDownRefresh();
        $Toast.clear();
        if (res && res.data && res.data.priceDelegateMessageList) {
          const { priceDelegateMessageList, totalPages } = res.data;
          this.complete = priceDelegateMessageList.length === 0;
          this.totalPages = totalPages;
        }
      });
    },
    onPullBottom() {
      const { pageNo } = this.params
      let index = pageNo + 1;
      if (!this.loading && !this.complete && pageNo < this.totalPages) {
        this.loading = true;
        this.params.pageNo = index;
        this.methods.search({ ...this.params, pull: true });
      }
    },
    view: (id: number, type: string) => {
      this.isView = true;
      if (id) {
        wx.navigateTo({
          url: `/pages/me/consult-todo-detail/index?id=${id}&type=${type}`
        })
      }
    },
    handle: (id: number, type: string) => {
      this.isView = false;
      if (id) {
        wx.navigateTo({
          url: `/pages/me/consult-todo-detail/index?id=${id}&type=${type}`
        })
      }
    },
  };
  onPullDownRefresh() {
    this.params = { ...this.params, pageNo: 1 };
    if (this.params.searchTerm) {
      delete this.params.searchTerm;
    }
    this.methods.search({...this.params});
  }
  onShow() {
    this.methods.getConsultTodoCounts();
    this.params = { pageSize: 10, pageNo: 1, status: this.params.status };
    this.methods.search({...this.params});
  }
  onLoad(param) {
    let { status } = param
    if(status){
      this.params.status = status
    }
  }
  onUnload() {
    let route = getCurrentPages()
    if (route.length > 3) {
      wx.navigateBack({delta: 2})
    }
  }
}
