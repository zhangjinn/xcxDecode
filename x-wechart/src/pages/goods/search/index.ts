import wepy from 'wepy';
import { trim } from 'ramda';
import { Weapp } from 'definitions/weapp';
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
  key: string;
  searchHistory: any[];
  value: string;
  searchPermissions: boolean;
}

export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '搜索',
    usingComponents: {
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-search': '../../../components/vant/search/index',
    },
  };
  components = {
    emptyDataType,
  };
  SEARCH_HISTORY = 'searchHistory'
  data: Data = {
    key: '',
    searchHistory: [],
    value: '',
    searchPermissions: false
  }
  search() {
    // 搜索总接口
  }
  // 页面内交互写在methods里
  methods = {
    clickHistory: (e: any) => {
      if (e.currentTarget.dataset.url) {
        wx.navigateTo({
          url: e.currentTarget.dataset.url
        })
      }
    },
    onChange: (event: Weapp.Event) => {
      // 缺防抖
      const searchKey = trim(event.detail)
      this.key = searchKey
    },
    onSearch: () => {
      const key = this.key || this.preWord
      this.methods.saveSearchHistory({
        url: `/pages/goods/filter/index?q=${key}`,
        value: this.data.key,
      })
      wx.redirectTo({
        url: `/pages/goods/filter/index?q=${key}`
      })
    },
    // 将搜索保存进storage
    saveSearchHistory: (item: Weapp.Event) => {
      if (item.value == '') {
        return
      }
      if (this.searchHistory.findIndex(res => res.value == item.value) !== -1) {
        this.searchHistory.splice(this.searchHistory.findIndex(res => res.value == item.value), 1)
      }
      this.searchHistory.unshift(item)
      if (this.searchHistory.length > 10) {
        this.searchHistory = this.searchHistory.splice(0, 10)
      }
      wx.setStorage({
        key: this.SEARCH_HISTORY,
        data: this.searchHistory
      })
    },
    // 清楚搜索记录
    clearHistory: () => {
      const context = this
      wx.removeStorage({
        key: this.SEARCH_HISTORY,
        success() {
          context.searchHistory = []
          context.$apply()
        }
      })
    },
  }
  getPermissionList(){
    if(wx.getStorageSync('b2b_permission_list')){
      const { searchPermissions }=JSON.parse(wx.getStorageSync('b2b_permission_list'))
      this.searchPermissions = searchPermissions
    }
    this.$apply()
  }
  onShow(){
    this.getPermissionList()
  }
  onLoad() {
    // 加载最近搜索
    const context = this
    wx.getStorage({
      key: this.SEARCH_HISTORY,
      success(res: { data: never[]; }) {
        context.searchHistory = res.data || []
        context.$apply()
      }
    })
  }
}
