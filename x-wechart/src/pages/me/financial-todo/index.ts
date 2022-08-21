import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { trim } from 'ramda';
import { getFinancialTodoCounts, getFinancialTodoItems } from '@/store/actions/financialtodo';
import { request } from '@/utils/request';
import CommonMixin from '@/mixins/common';
import $Toast from '@/components/vant/toast/toast';
import utilsWxs from '../../../wxs/utils.wxs';
import emptyDataType from "@/components/empty-data-type/index";

@connect({
  count({ financialtodo }) {
    return financialtodo.count;
  },
  items({ financialtodo }) {
    return financialtodo.items;
  },
}, {
  getFinancialTodoCounts,
  getFinancialTodoItems,
})
export default class Todo extends wepy.page {
  config = {
    navigationBarTitleText: '财务待办',
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
  secondTypeCode: '';
  status: '';
  sourceId: '';
  doType: '';
  data = {
    IKnow: false,
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
      this.methods.getFinancialTodoItems(params, (res: any) => {
        // 接口返回 关闭对应状态
        this.loading = false;
        this.isView = false;
        wx.stopPullDownRefresh();
        $Toast.clear();
        if (res && res.data && res.data.priceDelegateMessageList) {
          const { priceDelegateMessageList, totalPages } = res.data;
          this.complete = priceDelegateMessageList.length === 0;
          this.totalPages = totalPages;
        }
      });
    },
    allIKnow: () => {
      this.IKnow = false
      // this.methods.goto(this.secondTypeCode, 0, this.sourceId, this.status, this.doType)
    },
    goSignAction: (secondTypeCode: string, id: number, sourceId: string, status: string, doType: string, view: string) => {
      this.secondTypeCode = secondTypeCode
      this.status = status
      this.sourceId = sourceId
      this.doType = doType
      if(doType == '0' &&  view !== 'view') {
        this.IKnow = true
        return
      }
      this.methods.goto(secondTypeCode, id, sourceId, status, doType)
    },
    goto: (secondTypeCode: string, id: number, sourceId: string, status: string, doType: string) => {
      if(secondTypeCode == '20' ) {
        // 资金电子账单
        wx.navigateTo({
          url: `/pages/finance/fund-electronic/signature/index?id=${sourceId}&statusFlag=${status}&from=todo&doType=${doType}`
        })
      } else if (secondTypeCode == '10'){
        // 政策核对单
        wx.navigateTo({
          url: `/pages/finance/policy-check/signature/index?id=${sourceId}&statusFlag=${status}&from=todo&doType=${doType}`
        })
      } else if (secondTypeCode === '30') {
        // 政策电子账单
        wx.navigateTo({
          url: `/pages/finance/policy-electronic/signature/index?id=${sourceId}&statusFlag=${status}&from=todo&doType=${doType}`
        })
      } else {
         console.log('todo sign doType: ', secondTypeCode)
      }
    },
    // 待用
    signAction: async (id: string, type: string) => {
      $Toast.loading({ forbidClick: true, message: '处理中...', duration: 0 });
      const res: any = await request({ api: 'task/link.nd', data: { id, type, returnUrl: '/pages/me/todo/index' }, callback: () => {
        $Toast.clear();
      }});
      if (res.code === '0') {
        const urlStr = encodeURIComponent(res.url);
        this.isView = type === 'docView';
        wx.navigateTo({ url: `/pages/me/webview/index?url=${urlStr}` });
      } else {
        this.isView = false;
        $Toast.fail(res.msg || '处理失败');
      }
    },
    // 待用
    downFile: (id: string) => {
      $Toast.loading({ forbidClick: true, message: '文件下载中...', duration: 0 });
      const { sessionId, modifySession } = this.$parent.globalData;
      wx.downloadFile({
        url: `${wepy.$appConfig.baseUrl}/task/downFile.nd?id=${id}&encodeByBase64=false`,
        header: {
          Cookie: `JSESSIONID=${sessionId || modifySession};`,
        },
        complete: () => {
          $Toast.clear();
        },
        success: (res) => {
          if (res.statusCode == 200) {
            wx.openDocument({
              filePath: res.tempFilePath,
              fileType: 'pdf',
              success: (res) => {
                this.isView = true;
                $Toast.success('文件下载成功');
              },
              fail: (res) => {
                this.isisViewView = false;
                $Toast.fail('文件打开失败');
              },
            })
          } else {
            $Toast.fail('文件下载失败, 请重试');
          }
        },
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
  };
  onPullDownRefresh() {
    this.params = { ...this.params, pageNo: 1 };
    if (this.params.searchTerm) {
      delete this.params.searchTerm;
    }
    this.methods.search({...this.params});
  }
  onShow() {
    this.methods.getFinancialTodoCounts();
    if (this.key) {
      this.params = { pageSize: 10, pageNo: 1, status: this.params.status, searchTerm: this.key };
    } else {
      this.params = { pageSize: 10, pageNo: 1, status: this.params.status };
    }
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
    this.key = ''
    if (route.length > 3) {
      wx.navigateBack({delta: 2})
    }
  }
}
