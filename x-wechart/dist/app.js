"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Auth: Turbo
 * @Email: 691209942@qq.com
 * @Date: 2019-09-28 15:32:01
 * @Description:
 */
var wepy_1 = require('./npm/wepy/lib/wepy.js');
require('./npm/wepy-async-function/index.js');
var wepy_redux_1 = require('./npm/wepy-redux/lib/index.js');
var index_1 = require('./utils/index.js');
var request_1 = require('./utils/request.js');
var index_2 = require('./store/index.js');
var store = index_2.configStore();
wepy_redux_1.setStore(store);
//日期格式化
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super.call(this) || this;
        _this.config = {
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
                        'activity-area/index',
                        'marketing-activities/index',
                        'marketing-activities-detail/index',
                        'marketing-activities-distributor/index',
                        'specialty-activity/list/index',
                        'specialty-activity/add/index',
                        'agency-activity/list/index',
                        'agency-activity/add/index',
                        'agency-activity/detail/index',
                        'agency-activity/off/index',
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
                        'threeProductsReport/index',
                        'threeProductsReportDetail/index',
                        'sanpinReceipt/index',
                        'sanpinReceiptDetail/index',
                        'trainingClock/index',
                        'trainingRecord/index',
                        'trainingDetails/index',
                        'addStore/index',
                        'myNewStore/index',
                        'booth-report/list/index',
                        'booth-report/add/index',
                        'report/netIncrease/index',
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
                        'inventory-overtime/index',
                        'inventory-age/index',
                        'inventory-share-record/index',
                        'inventory-share-record/detail/index',
                        'inventory-overtime/apply/index',
                        'inventory-process/index',
                        'inventory-process-new/index',
                        'inventory-process-summary/index',
                        'allot-add/index',
                        'allot-list/index',
                        'inventory-trim/index',
                        'inventory-trim-query/index',
                        'allot-list/detail/index',
                        'distributor-inventory-inquiry/index',
                        'distributors-order/index',
                        'activity-order/index',
                        'market-activity-order/index',
                        'sales-order/index',
                        'custom/index',
                        'warehouse-returnGoods/index',
                        'open-reservation/index',
                        'prototypeManagement/list/index',
                        'prototypeManagement/loadingWithdrawal/index' // 样机上样撤样
                    ],
                    "plugins": {
                        "live-player-plugin": {
                            "version": "1.3.0",
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
                        'distributor-snapped/index',
                        'my-snapped/index',
                        'message/detail/index',
                        'common-problem/list/index',
                        'common-problem/detail/index',
                        'my-consultation/list/index',
                        'my-consultation/detail/index',
                        'my-pose/index',
                        'distribution-order/index',
                        'distribution-order-detail/index',
                        'my-complaints/index',
                        'financial-todo/index',
                        'order-cancel/index',
                        'consult-todo/index',
                        'consult-todo-detail/index',
                        'routine-order/index',
                        'cts/store-list/index',
                        'cts/store-detail/index',
                        'cts/store-map/index',
                        'shopList/list/index',
                        'shopList/edit-account/index',
                        'shop-todo/index',
                        'shopfix-todo/index',
                        'shop-todo-detail/index',
                        'assessment-notice-todo/index',
                        'survey/index',
                        'switch-account/index',
                        'questionnaireEditorPreview/index',
                        'answerNoLogin/index',
                        'policyContract/index/index',
                        'account-cancellation/cancellation-application/index',
                        'promotional-message-detail/index',
                    ],
                },
                {
                    root: 'pages/operation',
                    name: 'operation',
                    pages: [
                        'intended-users-order/index',
                        'list/index',
                        'detail/index',
                        'edit-sales-opportunity/index',
                        'edit-base-info/index',
                        'edit-house-appliances/index',
                        'add-house-appliances/index',
                    ],
                },
                {
                    root: 'pages/dms',
                    name: 'dms',
                    pages: [
                        'channel-order/index',
                        'channel-order-new/index',
                        'retail-order/index',
                        'retail-order-new/index',
                        'retail-order-revision/index',
                        'order-item-choose/index',
                        'order-item-choose-new/index',
                        'order-customer-choose/index',
                        'purchase-detail/index',
                        'order-return-stock/index',
                        'sales-order/index',
                        'sales-order-detail/index',
                        'channel-order-detail/index',
                        'retail-order-detail/index',
                        'channel-purchase-order/index/index',
                        'channel-purchase-order/detail/index',
                        'out-warehouse/list/index',
                        'out-warehouse/detail/index',
                        'sales-distributors/index',
                        'sales-distributors-detail/index',
                        'order-return-before/index',
                        'order-return-choose/index',
                        'order-return-entry/index',
                        'order-direct-into/index',
                        'channel-order-return-before/index',
                        'channel-order-return/index',
                        'intentionMerchants/index',
                        'intentionh5/index',
                        'inventory-trim-in-choose/index',
                        'inventory-trim-out-choose/index',
                        'distributor-returns/list/index',
                        'distributor-returns/edit/index',
                        'agent-returns/list/index',
                        'agent-returns/initiate/index',
                        'agent-returns/warehousing/index',
                    ],
                },
                {
                    root: 'pages/finance',
                    name: 'finance',
                    pages: [
                        'policy-check/list/index',
                        'policy-check/detail/index',
                        'policy-check/signature/index',
                        'invoice/index',
                        'policy-electronic/list/index',
                        'policy-electronic/signature/index',
                        'policy-electronic/detail/index',
                        'fund-electronic/list/index',
                        'fund-electronic/detail/index',
                        'fund-electronic/signature/index',
                        'fund-claim/list/index',
                        'fund-claim/detail/index',
                        'fund-claim/handle/index',
                        'assessment-notice/list/index',
                        'assessment-notice/detail/index',
                        'assessment-notice/detail-new/index',
                        'capital-flow/index',
                    ],
                },
                {
                    root: 'pages/chart',
                    name: 'chart',
                    pages: [
                        'purchase/index',
                        'sales-report/index',
                        'stock/index',
                        'channel-report/index',
                        'experience-report/index' // 360°体验
                    ],
                },
                {
                    root: 'pages/message',
                    name: 'message',
                    pages: [
                        'announcement/list/index',
                        'upcoming/list/index',
                        'notice/list/index',
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
        _this.timer = 0;
        _this.preventNavigate = false;
        _this.globalData = {
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
            openid: '',
            expressFee: '起运量标准：单电视商家5台，白电及全品类商家3立方米',
            basePartInfo: [],
        };
        _this.use('requestfix');
        // 拦截request请求
        _this.intercept('request', {
            // 发出请求时的回调函数
            config: function (params) {
                var _a = this.globalData, sessionId = _a.sessionId, ssoLoginToken = _a.ssoLoginToken, unionid = _a.unionid, modifySession = _a.modifySession, cisCode = _a.cisCode;
                if (sessionId || modifySession) {
                    params.header['Cookie'] = "JSESSIONID=" + (sessionId || modifySession)
                        //光伟后台增加了一个session判断，区分于tomcat的sessionid
                        + (";SESSION=" + (sessionId || modifySession));
                }
                if (ssoLoginToken && unionid) {
                    params.header['ssologintoken'] = ssoLoginToken;
                    params.header['unionid'] = unionid;
                    //登陆的方式，固定值mip 用来区分小程序/app
                    params.header['loginplant'] = 'mip';
                }
                if (cisCode) {
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
                }
                else {
                    params.data = { loginType: 'CS' };
                }
                return params;
            },
            // 请求失败后的回调函数
            fail: function (error) {
                var errMsg = error.errMsg;
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
            complete: function (res) {
                var data = res.data;
                if (data && data.code === 400 && (data.msg === '请登录！' || data.msg === '账号已在其他地方登陆')) {
                    if (!_this.preventNavigate) {
                        _this.preventNavigate = true;
                        _this.globalData.sessionId = '';
                        _this.globalData.ssoLoginToken = '';
                        _this.globalData.unionid = '';
                        _this.globalData.account = '';
                        _this.globalData.accountInfo = {};
                        _this.globalData.cisCode = '';
                        _this.globalData.zyPartInfo = [];
                        _this.globalData.fxPartInfo = [];
                        _this.globalData.loginSystem = '';
                        _this.globalData.customerCode = '';
                        _this.globalData.customer = {};
                        _this.globalData.openid = '';
                        _this.globalData.basePartInfo = [];
                        index_1.removeStorage('b2b_token');
                        index_1.removeStorage('b2b_permission_list');
                        index_1.removeStorage('b2b_alert');
                        // wx.reLaunch({
                        //   url: '/pages/main/take/index',
                        // });
                        _this.timer = setTimeout(function () {
                            _this.preventNavigate = false;
                        }, 1000);
                    }
                }
                return res;
            },
        });
        return _this;
    }
    default_1.prototype.getBasicInfo = function () {
        request_1.request({
            api: 'getUserInfo.nd',
            callback: function (res) {
                if (res.data && res.data.code == 0) {
                    wepy_redux_1.getStore().dispatch({ type: 'USER_LOGIN_ACTION', payload: res.data });
                }
            },
        });
    };
    // 提前获取装修配置
    default_1.prototype.getDesignConfig = function () {
        console.log('获取全局配置');
        request_1.request({ api: 'wechat/designComponent/getCurrCustDesignComponent.nd', callback: function (res) {
                if (res && res.data && res.data.list) {
                    wepy_redux_1.getStore().dispatch({ type: 'GET_ACTIVITY_DESIGN_DATA', payload: res.data });
                }
            } });
    };
    default_1.prototype.restoreSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, sessionid, ssoLoginToken, unionid, account, accountInfo, cisCode, zyPartInfo, fxPartInfo, loginSystem, customerCode, customer, openid, basePartInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, index_1.getStorage('b2b_token')];
                    case 1:
                        res = _b.sent();
                        try {
                            if (res) {
                                _a = JSON.parse(res), sessionid = _a.sessionid, ssoLoginToken = _a.ssoLoginToken, unionid = _a.unionid, account = _a.account, accountInfo = _a.accountInfo, cisCode = _a.cisCode, zyPartInfo = _a.zyPartInfo, fxPartInfo = _a.fxPartInfo, loginSystem = _a.loginSystem, customerCode = _a.customerCode, customer = _a.customer, openid = _a.openid, basePartInfo = _a.basePartInfo;
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
                        }
                        catch (error) {
                            console.log(error);
                            console.error('解析错误');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    default_1.prototype.onLaunch = function () {
        this.restoreSession();
        if (wx.canIUse('getUpdateManager')) {
            var updateManager_1 = wx.getUpdateManager();
            updateManager_1.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                if (res.hasUpdate) {
                    updateManager_1.onUpdateReady(function () {
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function (res) {
                                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager_1.applyUpdate();
                                }
                            }
                        });
                    });
                    updateManager_1.onUpdateFailed(function () {
                        // 新的版本下载失败
                        wx.showModal({
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                        });
                    });
                }
            });
        }
    };
    return default_1;
}(wepy_1.default.app));

App(require('./npm/wepy/lib/wepy.js').default.$createApp(default_1, {"qqMapKey":"YPNBZ-SO535-OODI3-QDM5Y-LCGMT-PFFQ4","noPromiseAPI":["createSelectorQuery"],"baseUrl":"http://xtwtest.hisense.com/dev","dmsBaseUrl":"https://xtwtest.hisense.com/dms","imgUrl":"https://3s-static.hisense.com","financeBaseUrl":"http://hmptest.fssc.hisense.com/tspt","ctsBaseUrl":"http://b2b-front-cis.devapps.hisense.com"}));
require('./_wepylogs.js')

