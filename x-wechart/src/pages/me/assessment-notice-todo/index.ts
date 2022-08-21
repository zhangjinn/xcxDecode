import wepy from 'wepy';
import { connect } from 'wepy-redux';
import CommonMixin from '@/mixins/common';
import $Toast from '@/components/vant/toast/toast';
import {
  getConsultTodoAllItems
} from '@/store/actions/consultTodo';
import {
  cancelAccount,
} from '@/store/actions/user';
import Toast from "@/components/vant/toast/toast";
import emptyDataType from "@/components/empty-data-type/index";

@connect({
  assessmentNoticeItems({ consultTodo }) {
    return consultTodo.assessmentNoticeItems;
  },
}, {
  getConsultTodoAllItems,
  cancelAccount,
})
export default class consultTodo extends wepy.page {
  config = {
    navigationBarTitleText: '',
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
  mixins = [ CommonMixin ];
  components = {
    emptyDataType,
  };
  isView = false;
  data = {
    active: 'first',
    key: '',
    // 加载数据中
    loading: false,
    // 是否全部加载完毕
    complete: false,
    params: {
      pageSize: 10,
      pageNo: 1,
      status: 0,
      typeValue: '',
    },
    isCanJump: false, // 是否可以跳转页面 ture可跳转,默认false不可跳转
  };

  // 页面内交互写在methods里
  methods = {
    // 过滤数据
    search: (params: any) => {
      $Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });
      this.methods.getConsultTodoAllItems(params, (res: any) => {
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
    view: (item: any, type: string) => {
      this.isView = true;
      this.checkUrl(item, type)
    },
    handle: (item: any, type: string) => {
      this.isView = false;
      this.checkUrl(item, type)
    },

    // 账户注销
    handleAccountCancellation: (id: number, type: string) => {
      let that = this
      let tip1 = '确定驳回？'
      let tip2= '已驳回'
      if(type === 'agree'){ // 通过
        tip1 = '确定通过？'
        tip2 = '已通过'
      }
      wx.showModal({
        title: '提示',
        content: tip1,
        success: async function (res) {
          if (res.confirm) {
            let param = {
              taskId: id, // 待办id
              type: type, // agree 同意; disagree 驳回
            }
            that.methods.cancelAccount(param).then((res)=>{
              const { code, msg } = res.payload
              if(code == '0'){
                Toast.success({
                  forbidClick: true,
                  duration: 1000,
                  message: tip2,
                  onClose: () => {
                    wx.navigateBack({
                      delta: 1,
                    });
                  },
                });
              }else {
                Toast.fail({
                  forbidClick: true,
                  message: msg,
                })
              }
            })
          }
        },
      })
    },

  };
  checkUrl(item: any, type: string){
    let id = item.sourceId
    let url = ''
    let typeValue = this.params.typeValue
    if(typeValue === '14182987654'){
      debugger
      // 待办：sourceUrl ：SINGLE 老的单挑的，SUM 新页面，合计的
      if(item.sourceUrl === 'SINGLE'){
        url = `/pages/finance/assessment-notice/detail/index?id=${id}` // 跳转至考核通知单详情
      }
      if(item.sourceUrl === 'SUM'){
        url = `/pages/finance/assessment-notice/detail-new/index?id=${id}` // 跳转至考核通知单详情(新)
      }
    }else if(typeValue === '14182972401'){
      url = `/pages/terminal/threeProductsReportDetail/index?id=${id}&type=${type}`
    }else if(typeValue === '14182972402'){
      url = `/pages/terminal/sanpinReceiptDetail/index?id=${id}&type=${type}`
    }else if(typeValue === '14187583090'){
      url = `/pages/terminal/addStore/index?id=${id}`
    }else if(typeValue === '14187583089'){ //跳转至代理商活动列表页
      url = `/pages/activity/agency-activity/list/index`
    }else if(typeValue === '14187583091'){ //跳转展台需求提报列表页
      url = `/pages/terminal/booth-report/list/index`
    }
    if(url){
      wx.navigateTo({
        url: url
      })
    }
  }
  onPullDownRefresh() {
    this.params = { ...this.params, pageNo: 1 };
    if (this.params.searchTerm) {
      delete this.params.searchTerm;
    }
    this.methods.search({...this.params});
  }
  // 判断该待办是否可跳转
  checkCanJump(type){
    switch(type) {
      case '14182987654': // 考核通知单
      case '14182972401': // 终包采购计划提报
      case '14182972402': // 终包收货提报
      case '14187583090': // 新增门店待办
      case '14187583089': // 代理商市场活动待办
      case '14187583091': // 非专卖店展台需求提报待办
        return true;
      default:
        return false;
    }
  }
  onShow() {
    this.params = { pageSize: 10, pageNo: 1, status: this.params.status, typeValue: this.params.typeValue };
    this.methods.search({...this.params});
  }
  onLoad(param) {
    let { status, typeValue, typeName } = param
    if(status){
      this.params.status = status
    }
    if(typeValue){
      this.params.typeValue = typeValue
      this.isCanJump = this.checkCanJump(typeValue)
    }
    if(typeName){
      wx.setNavigationBarTitle({
        title: typeName,
      });
    }
    this.$apply()
  }
  onUnload() {
    let route = getCurrentPages()
    if (route.length > 3) {
      wx.navigateBack({delta: 2})
    }
  }
}
