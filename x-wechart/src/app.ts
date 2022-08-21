/*
 * @Auth: Turbo
 * @Email: 691209942@qq.com
 * @Date: 2019-09-28 15:32:01
 * @Description:
 */
import wepy from 'wepy';
import 'wepy-async-function';

import { setStore, getStore } from 'wepy-redux';
import { getStorage, removeStorage, setStorage, getCookie } from '@/utils/index';
import { request } from '@/utils/request';
import { configStore } from './store/index';

const store: any = configStore();
setStore(store);

//日期格式化
Date.prototype.Format = function(fmt)
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

export default class extends wepy.app {
  config = {
    pages: [
      'pages/main/home/index',
      'pages/main/take/index',
      'pages/main/activity/index',
      'pages/main/cart/index',
      'pages/main/me/index',
    ],
    subPackages: [
      {
        root: 'pages/auth',
        name: 'auth',
        pages: [
          'wechat/index',
          'account/index',
          'mobile/index',
          'protocol/index',
          'confirm/index',
          'forget/index',
          'reset/index',
        ],
      },
      {
        root: 'pages/activity',
        name: 'activity',
        pages: [
          'activity-area/index', // 活动专区
          'marketing-activities/index', // 营销活动
          'marketing-activities-detail/index',
          'marketing-activities-distributor/index',
          'specialty-activity/list/index', // 专卖店市场活动列表
          'specialty-activity/add/index', // 新增、编辑、查看专卖店市场活动
          'agency-activity/list/index', // 代理商市场活动列表
          'agency-activity/add/index', // 新增、编辑代理商市场活动
          'agency-activity/detail/index', // 查看代理商市场活动详情
          'agency-activity/off/index', // 代理商市场活动核销
       ],
      },
      {
        root: 'pages/terminal',
        name: 'terminal',
        pages: [
          'addrecord/index',
          'selectStore/index',
          'punchList/index',
          'punchdetails/index',
          'punchMsg/index',
          'overallMerit/index',
          'dataDetails/index',
          'map/index',
          'point/index',
          'people/index',
          'problemTrans/index',
          'fixNotify/index',
          'report/operatePlanData/index',
          'report/turnoverRateData/index',
          'report/coverageData/index',
          'report/salesStructureData/index',
          'report/profitData/index',
          'report/o2oData/index',
          'webview/index',
          'threeProductsReport/index', // 三品提报
          'threeProductsReportDetail/index', // 三品提报详情
          'sanpinReceipt/index', // 三品收货
          'sanpinReceiptDetail/index', // 三品收货详情
          'trainingClock/index', // 培训打卡
          'trainingRecord/index', // 培训记录
          'trainingDetails/index', // 培训记录
          'addStore/index', // 新增门店
          'myNewStore/index', // 我新增的门店
          'booth-report/list/index', // 展台需求提报列表
          'booth-report/add/index', // 展台需求提报新增、编辑、查看
          'report/netIncrease/index', // 分销网络净增
        ],
      },
      {
        root: 'pages/goods',
        name: 'goods',
        pages: [
          'item/index',
          'order/index',
          'filter/index',
          'search/index',
          'collection/index',
          'project/index',
          'project-items/index',
          'buy-out/index',
          'buy-out-items/index',
          'preference/index',
          'preference-items/index',
          'order-result/index',
          'purchase-shop/index',
          'inventory-queries/index',
          'inventory-overtime/index', // 代理商超期库存查询
          'inventory-age/index', // 分销商库存库龄查询
          'inventory-share-record/index',
          'inventory-share-record/detail/index',
          'inventory-overtime/apply/index',
          'inventory-process/index',//库存流水
          'inventory-process-new/index',//收发明细（库存流水）
          'inventory-process-summary/index',//收发汇总
          'allot-add/index',    //调拨录入（统仓移到自有仓）
          'allot-list/index',  //调拨查询
          'inventory-trim/index',  //库存调整
          'inventory-trim-query/index',  //库存调整查询
          'allot-list/detail/index',  //调拨详情
          'distributor-inventory-inquiry/index',
          'distributors-order/index', // 三阶段下单确认
          'activity-order/index', // 活动下单确认
          'market-activity-order/index', // 抢购下单确认
          'sales-order/index', // 审核单下单
          'custom/index',  //定制专区详情
          'warehouse-returnGoods/index', //统仓退货
          'open-reservation/index', //未结预留
          'prototypeManagement/list/index', // 我的样机列表
          'prototypeManagement/loadingWithdrawal/index' // 样机上样撤样

        ],
        "plugins": {
          "live-player-plugin": {
            "version": "1.3.0", // 填写该直播组件最新版本号，微信开发者工具调试时可获取最新版本号
            "provider": "wx2b03c6e691cd7370" // 必须填该直播组件appid，该示例值即为直播组件appid
          }
        }
      },
      {
        root: 'pages/me',
        name: 'me',
        pages: [
          'webview/index',
          // 设置
          'setting/index',
          'defaultaccount/index',
          'bind-account/account/index',
          'bind-account/mobile/index',
          // 订单列表
          'order/index',
          'order-detail/index',
          // 直销审核订单
          'audit-order/index',
          'audit-order-detail/index',
          // 我的待办
          'todo/index',
          // 我的评价
          'comment/index',
          // 服务评价
          'service-comment/index',
          // 服务评价详情
          'service-comment-detail/index',
          // 我的退货
          'returned/list/index',
          'returned/detail/index',
          // 我的账户
          'account/list/index',
          'account/edit-password/index',
          'account/edit-account/index',
          'account/add-account/index',
          // 我要退货
          'return/base/index',
          'return/add-product/index',
          // 公告
          'notice/list/index',
          'notice/detail/index',
          // 地址
          'account-center/address/index',
          // 余额
          'account-center/balance/index',
          'distributor-snapped/index', // 分销商抢购
          'my-snapped/index', // 我的抢购
          'message/detail/index', // 消息详情列表
          'common-problem/list/index', // 常见问题列表
          'common-problem/detail/index', // 常见问题详情
          'my-consultation/list/index', // 我的咨询列表
          'my-consultation/detail/index', // 我的咨询详情
          'my-pose/index', // 我要提问
          'distribution-order/index', // 分销商订单
          'distribution-order-detail/index', // 分销商订单详情
          'my-complaints/index', // 举报
          'financial-todo/index',
          'order-cancel/index', //订单取消
          'consult-todo/index', // 意见征询待办
          'consult-todo-detail/index', // 意见征询待办详情
          'routine-order/index', //我的常规订单
          'cts/store-list/index', //我的门店列表
          'cts/store-detail/index', //我的门店详情
          'cts/store-map/index', //我的门店详情
          'shopList/list/index', // 管辖门店
          'shopList/edit-account/index',
          'shop-todo/index', // 巡店任务待办
          'shopfix-todo/index', // 整改待办
          'shop-todo-detail/index', // 巡店待办详情
          'assessment-notice-todo/index', // 考核通知单待办
          'survey/index', // 新版调研问卷
          'switch-account/index', // 切换账户登录
          'questionnaireEditorPreview/index', //调研问卷预览
          'answerNoLogin/index', //不登录答题
          'policyContract/index/index', //政策合同列表
          'account-cancellation/cancellation-application/index', //账户注销
          'promotional-message-detail/index', //促销资源兑现通知详情
        ],
      },
      {
        root: 'pages/operation',
        name: 'operation',
        pages: [
          'intended-users-order/index', // 意向用户录入
          'list/index', // 用户运营
          'detail/index', // 用户运营详情
          'edit-sales-opportunity/index', // 用户运营-销售机会，新增、编辑销售机会
          'edit-base-info/index', // 用户运营-详细资料，编辑基本信息
          'edit-house-appliances/index', // 用户运营-详细资料，编辑全屋家电
          'add-house-appliances/index', // 用户运营-详细资料，新增全屋家电
        ],
      },
      {
        root: 'pages/dms',
        name: 'dms',
        pages: [
          'channel-order/index',  // 渠道订单
          'channel-order-new/index',  // 分销录入(新)
          'retail-order/index', // 零售订单
          'retail-order-new/index', // 零售录入(新)
          'retail-order-revision/index', // 零售录入(新改版)
          'order-item-choose/index', // 订单选择商品
          'order-item-choose-new/index', // 订单选择商品(新)
          'order-customer-choose/index', // 订单选择客户
          'purchase-detail/index', // 采购详情
          'order-return-stock/index',  // 退货入库
          'sales-order/index',  // 销售订单查询
          'sales-order-detail/index',  // 销售订单详情
          'channel-order-detail/index',  // 渠道订单编辑
          'retail-order-detail/index',  // 零售订单编辑
          'channel-purchase-order/index/index',  // 渠道采购订单
          'channel-purchase-order/detail/index',  // 渠道采购订单详情
          'out-warehouse/list/index', // 销售出库
          'out-warehouse/detail/index', // 销售出库详情
          'sales-distributors/index', // 分销商订单查询
          'sales-distributors-detail/index',
          'order-return-before/index', //退货录入客户选择
          'order-return-choose/index', //退货录入采购单选择
          'order-return-entry/index', // 退货录入
          'order-direct-into/index', // 直采入库
          'channel-order-return-before/index', // 渠道退货入库
          'channel-order-return/index', // 渠道退货入库详情
          'intentionMerchants/index' ,//意向商家 后期可能是需要修改  mayu
          'intentionh5/index',// h5 页面
          'inventory-trim-in-choose/index',//库存调整入库产品信息选择
          'inventory-trim-out-choose/index',//库存调整出库产品信息选择
          'distributor-returns/list/index',//分销商退货列表
          'distributor-returns/edit/index',//分销商退货
          'agent-returns/list/index',//代理商退货列表
          'agent-returns/initiate/index',//代理商退货录入
          'agent-returns/warehousing/index',//代理商退货入库
        ],
      },
      {
        root: 'pages/finance',
        name: 'finance',
        pages: [
          'policy-check/list/index',  // 政策核对单列表
          'policy-check/detail/index',  // 政策核对单详情
          'policy-check/signature/index',  // 政策核对单签章
          'invoice/index',         //发票
          'policy-electronic/list/index',  // 政策电子账单列表
          'policy-electronic/signature/index',// 政策电子账单签章
          'policy-electronic/detail/index',  // 政策电子账单详情
          'fund-electronic/list/index',  // 资金电子账单列表
          'fund-electronic/detail/index',  // 资金电子账单详情
          'fund-electronic/signature/index',  // 资金电子账单列表
          'fund-claim/list/index',  // 资金认领
          'fund-claim/detail/index',  // 资金认领明细
          'fund-claim/handle/index',  // 认领处理
          'assessment-notice/list/index',  // 考核通知单
          'assessment-notice/detail/index',  // 考核通知单详情
          'assessment-notice/detail-new/index',  // 考核通知单详情(新)
          'capital-flow/index',  // 资金流水
        ],
      },
      {
        root: 'pages/chart',
        name: 'chart',
        pages: [
          'purchase/index', // 采购报表
          'sales-report/index', // 销售报表
          'stock/index', //库存报表
          'channel-report/index', // 渠道报表
          'experience-report/index' // 360°体验
        ],
      },
      {
        root: 'pages/message',
        name: 'message',
        pages: [
          'announcement/list/index', // 公告
          'upcoming/list/index', // 待办
          'notice/list/index', // 通知
        ],
      },
    ],
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序地址信息查看"
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      custom: true,
      color: '#AAAAAA',
      selectedColor: '#00AAA6',
      backgroundColor: '#ffffff',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/main/home/index',
          text: '首页',
          iconPath: 'images/tab/home.png',
          selectedIconPath: 'images/tab/homed.png',
        },
        {
          pagePath: 'pages/main/take/index',
          text: '产品采购',
          iconPath: 'images/tab/take.png',
          selectedIconPath: 'images/tab/taked.png',
        },
        {
          pagePath: 'pages/main/activity/index',
          text: '活动中心',
          iconPath: 'images/tab/logo.png',
          selectedIconPath: 'images/tab/logo.png',
        },
        {
          pagePath: 'pages/main/cart/index',
          text: '购物车',
          iconPath: 'images/tab/cart.png',
          selectedIconPath: 'images/tab/carted.png',
        },
        {
          pagePath: 'pages/main/me/index',
          text: '我的',
          iconPath: 'images/tab/me.png',
          selectedIconPath: 'images/tab/med.png',
        },
      ],
    },
    usingComponents: {},
  };
  timer = 0;
  preventNavigate = false;
  globalData = {
    account: '',
    accountInfo: {},
    cisCode: '',
    ssoLoginToken: '',
    unionid: '',
    sessionId: '',
    modifySession: '',
    userInfo: null,
    zyPartInfo: [],
    fxPartInfo: [],
    loginSystem: '',
    customerCode: '',
    customer: {},
    openid:'',
    expressFee: '起运量标准：单电视商家5台，白电及全品类商家3立方米',
    basePartInfo: [],
  };

  constructor() {
    super();
    this.use('requestfix');
    // 拦截request请求
    this.intercept('request', {
      // 发出请求时的回调函数
      config(params: any) {
        const { sessionId, ssoLoginToken, unionid, modifySession, cisCode } = this.globalData;
        if (sessionId || modifySession) {
          params.header['Cookie'] = `JSESSIONID=${sessionId || modifySession}`
          //光伟后台增加了一个session判断，区分于tomcat的sessionid
          + `;SESSION=${sessionId || modifySession}`;
        }
        if (ssoLoginToken && unionid) {
          params.header['ssologintoken'] = ssoLoginToken;
          params.header['unionid'] = unionid;
          //登陆的方式，固定值mip 用来区分小程序/app
          params.header['loginplant'] = 'mip';
        }
        if(cisCode){
          params.header['account'] = cisCode;
        }
        //accountInfo.miniProgram.version 线上版本号，也就是说发布之后上线才有，开发阶段没有值
        // let accountInfoSync = wx.getAccountInfoSync()
        // if(accountInfoSync && accountInfoSync.miniProgram && accountInfoSync.miniProgram.version){
        //   params.header['appversion'] = accountInfoSync.miniProgram.version;
        // }
        //TODO://测试数据提交代码需删除
        params.header['appversion'] = '1.1.0';

        if (params.data) {
          params.data['loginType'] = 'CS';
        } else {
          params.data = { loginType: 'CS' };
        }
        return params;
      },
      // 请求失败后的回调函数
      fail: (error: any) => {
        const { errMsg } = error;
        switch (errMsg) {
          case 'request:fail':
            wx.showToast({
              title: '网络不可用',
              duration: 2000,
            });
            break;
          default:
            break;
        }
        // 必须返回响应数据对象，否则后续无法对响应数据进行处理
        return error;
      },
      complete: (res: any) => {
        const { data } = res;
        if (data && data.code === 400 && (data.msg === '请登录！' || data.msg === '账号已在其他地方登陆') ) {
          if (!this.preventNavigate) {
            this.preventNavigate = true;
            this.globalData.sessionId = '';
            this.globalData.ssoLoginToken = '';
            this.globalData.unionid = '';
            this.globalData.account = '';
            this.globalData.accountInfo = {};
            this.globalData.cisCode = '';
            this.globalData.zyPartInfo = [];
            this.globalData.fxPartInfo = [];
            this.globalData.loginSystem = ''
            this.globalData.customerCode = ''
            this.globalData.customer = {}
            this.globalData.openid = ''
            this.globalData.basePartInfo = [];
            removeStorage('b2b_token');
            removeStorage('b2b_permission_list');
            removeStorage('b2b_alert');
            // wx.reLaunch({
            //   url: '/pages/main/take/index',
            // });
            this.timer = setTimeout(() => {
              this.preventNavigate = false;
            }, 1000);
          }
        }

        return res;
      },
    });
  }
  getBasicInfo() {
    request({
      api: 'getUserInfo.nd',
      callback: (res: any) => {
        if (res.data && res.data.code == 0) {
          getStore().dispatch({ type: 'USER_LOGIN_ACTION', payload: res.data });
        }
      },
    });
  }

  // 提前获取装修配置
  getDesignConfig() {
    console.log('获取全局配置')
    request({ api: 'wechat/designComponent/getCurrCustDesignComponent.nd', callback: (res: any) => {
      if (res && res.data && res.data.list) {
        getStore().dispatch({ type: 'GET_ACTIVITY_DESIGN_DATA', payload: res.data });
      }
    }});
  }

  async restoreSession() {
    const res: any = await getStorage('b2b_token');
    try {
      if (res) {
        const { sessionid, ssoLoginToken, unionid, account, accountInfo, cisCode,zyPartInfo,fxPartInfo,loginSystem,customerCode,customer,openid, basePartInfo } = JSON.parse(res);
        this.globalData.sessionId = sessionid;
        this.globalData.ssoLoginToken = ssoLoginToken;
        this.globalData.unionid = unionid;
        this.globalData.account = account;
        this.globalData.accountInfo = accountInfo;
        this.globalData.cisCode = cisCode;
        this.globalData.zyPartInfo = zyPartInfo;
        this.globalData.fxPartInfo = fxPartInfo;
        this.globalData.loginSystem = loginSystem;
        this.globalData.customerCode = customerCode;
        this.globalData.customer = JSON.parse(JSON.stringify(customer));
        this.globalData.openid = openid;
        this.globalData.basePartInfo = basePartInfo;
        this.getDesignConfig();
        this.getBasicInfo();
      }
    } catch (error) {
      console.log(error);
      console.error('解析错误')
    }
  }
  onLaunch() {
    this.restoreSession();

    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
  }

}
