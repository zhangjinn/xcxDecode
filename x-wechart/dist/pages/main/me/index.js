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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var common_1 = require('./../../../mixins/common.js');
var system_1 = require('./../../../mixins/system.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var user_1 = require('./../../../store/actions/user.js');
var index_1 = require('./../../../utils/index.js');
var home_1 = require('./../../../store/actions/home.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var fund_claim_1 = require('./../../../store/actions/fund-claim.js');
var request_1 = require('./../../../utils/request.js');
var store = wepy_redux_1.getStore();
var Take = /** @class */ (function (_super) {
    __extends(Take, _super);
    function Take() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mixins = [common_1.default, system_1.default];
        _this.config = {
            navigationBarTitleText: '',
            navigationStyle: 'custom',
            usingComponents: {
                'van-row': '../../../components/vant/row/index',
                'van-col': '../../../components/vant/col/index',
                'van-rate': '../../../components/vant/rate/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'no-permission': '../../../components/no-permission/index',
            },
        };
        _this.data = {
            imgObj: {
                myAvatar: 'http://3s-static.hisense.com/wechat/1/14722429883/1646011215983_37c22408ce4e47dea1e818d83cee31b3.png',
                myBg: 'http://3s-static.hisense.com/wechat/1/14722429883/1643096641792_77a391f88d3f4cd7ad6dd88674125bc8.png',
                myBgNew: 'http://3s-static.hisense.com/wechat/1/14722429883/1642582924572_a2f20f2c14f744e0854e66f5d835dddd.png',
            },
            deviceInfo: {},
            loginStatus: false,
            currentAccount: {},
            accountList: [],
            waitCheckNum: 0,
            cgrk: 0,
            ddsh: 0,
            xsck: 0,
            zjrl: 0,
            fundClaimListQuery: {
                method: "queryNoticeBills",
                params: {
                    pageno: 1,
                    pagesize: 5,
                    claimstatus: "0",
                    tradetimeS: "",
                    tradetimeE: "",
                    hifi_flowstatus: ''
                }
            },
            permissionList: [],
            notificationList: [
                { id: 1, name: '公告', icon: 'wodegonggao1', isShow: true, unReadNumber: 0, switchUrl: '/pages/message/announcement/list/index' },
                { id: 2, name: '待办', icon: 'daiban', isShow: true, unReadNumber: 0, switchUrl: '/pages/message/upcoming/list/index' },
                { id: 3, name: '通知', icon: 'tongzhi', isShow: true, unReadNumber: 0, switchUrl: '/pages/message/notice/list/index' },
            ]
        };
        _this.methods = {
            goPage: function (subItem) {
                var name = subItem && subItem.sourceName;
                var url = subItem && subItem.url;
                var id = subItem && subItem.id;
                if (name && url) {
                    try {
                        this.methods.writeLog(__assign({ menuName: name, routePath: url }, this.deviceInfo));
                    }
                    catch (e) { }
                }
                if (id) {
                    try {
                        // 客户访问菜单记录-新增
                        this.methods.addMenuRecord({
                            menuId: id,
                            clientPlatform: 'mip',
                        });
                    }
                    catch (e) { }
                }
                this.navigator({ link: { url: url } });
            },
            // 跳转意向商家页面
            goMIC: function (url, auth) {
                this.navigator({ link: { url: url }, auth: false });
            },
            // 跳转到切换账户
            goSwitchAccount: function () {
                if (this.accountList.length <= 1) {
                    return;
                }
                var url = '/pages/me/switch-account/index';
                this.navigator({ link: { url: url } });
            },
            onLogin: function () {
                wx.navigateTo({ url: '/pages/auth/wechat/index' });
            },
            navigateTo: function (url) {
                if (!this.loginStatus) {
                    toast_1.default.fail({
                        message: '请先登录',
                        onClose: function () {
                            wx.reLaunch({
                                url: '/pages/main/take/index',
                            });
                        }
                    });
                    return;
                }
                wx.navigateTo({ url: url });
            },
            // 跳转到公告、待办、通知对应页
            goMessageCenter: function (item) {
                if (item.switchUrl) {
                    var url = item.switchUrl;
                    wx.navigateTo({ url: url });
                }
            }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Take.prototype.getUnreadList = function () {
        var _this = this;
        var arr = [];
        var _a = this.mixinCurrentUser, loginSystem = _a.loginSystem, marketModels = _a.marketModels;
        if (loginSystem && loginSystem.indexOf('14168810879') > -1) {
            arr.push('cgrk');
        }
        if ((marketModels.indexOf('17453') > -1) && (loginSystem && loginSystem.indexOf('14168810879') > -1)) {
            arr.push('ddsh');
        }
        if (loginSystem && loginSystem.indexOf('14168810879') > -1) {
            arr.push('xsck');
        }
        if (arr && arr.length > 0) {
            this.methods.getUnreadDmsNumber(arr.join(',')).then(function (res) {
                if (res) {
                    var data = res.payload.data;
                    ramda_1.forEachObjIndexed(function (value, key) {
                        _this.setData(key, value);
                    }, data);
                }
            });
        }
        if ((marketModels.indexOf('17453') > -1) && ((loginSystem && loginSystem.indexOf('14168810879') > -1) || (loginSystem && loginSystem.indexOf('14168810880') > -1))) {
            this.methods.getUserUnreadCisAuditOrder().then(function (res) {
                var payload = res.payload;
                if (payload.code == 0) {
                    _this.waitCheckNum = payload.waitCheckNum;
                }
                else {
                    _this.waitCheckNum = 0;
                }
                _this.$apply();
            });
        }
    };
    Take.prototype.getFunClaimList = function () {
        var _this = this;
        fund_claim_1.getFundClaimCounts(this.fundClaimListQuery, function (res) {
            if (res.data.success) {
                _this.zjrl = res.data.data.count;
                _this.setData({
                    zjrl: res.data.data.count
                });
            }
        });
        this.$apply();
    };
    // 获取账号列表
    Take.prototype.getAccountList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request_1.request({ api: 'queryAccountUnionid.nd' })];
                    case 1:
                        result = _a.sent();
                        if (result && result.list) {
                            this.accountList = result.list;
                        }
                        this.$apply();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 获取未读公告数量、未处理待办数量、未读消息数量
    Take.prototype.getUnTreatNumList = function () {
        var _this = this;
        this.methods.getUnTreatNum().then(function (res) {
            var ggNum = 0;
            var msgNum = 0;
            var taskNum = 0;
            if (res && res.payload) {
                if (res.payload.GG && res.payload.GG.item) {
                    ggNum = res.payload.GG.item.unreadNum;
                }
                if (res.payload.MSG && res.payload.MSG.item && res.payload.MSG.item.length) {
                    res.payload.MSG.item.forEach(function (item) {
                        msgNum += item.unreadNum;
                    });
                }
                if (res.payload.TASK && res.payload.TASK.item && res.payload.TASK.item.length) {
                    res.payload.TASK.item.forEach(function (item) {
                        taskNum += item.unreadNum;
                    });
                }
            }
            _this.notificationList[0].unReadNumber = index_1.maximumLimit(ggNum); // 公告
            _this.notificationList[1].unReadNumber = index_1.maximumLimit(taskNum); // 代办
            _this.notificationList[2].unReadNumber = index_1.maximumLimit(msgNum); // 通知
            _this.$apply();
        });
    };
    // 获取菜单权限列表
    Take.prototype.getPermissionList = function () {
        if (wx.getStorageSync('b2b_permission_list')) {
            var list = JSON.parse(wx.getStorageSync('b2b_permission_list')).list;
            this.permissionList = list;
        }
        this.$apply();
    };
    Take.prototype.onShow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, account;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // 自定义底部导航栏-如需实现 tab 选中态，要在当前页面下，通过 getTabBar 接口获取组件实例，并调用 setData 更新选中态
                        if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
                            this.$wxpage.getTabBar().setData({
                                selected: 4
                            });
                        }
                        this.loginStatus = this.isLogin();
                        _a = this.mixinCurrentUser, userName = _a.userName, account = _a.account;
                        this.currentAccount = { text: userName, value: account };
                        if (!this.loginStatus) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.methods.userPermissions()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getPermissionList()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.methods.getAlert()];
                    case 3:
                        _b.sent();
                        this.getUnTreatNumList();
                        this.getAccountList();
                        //请求未读订单数量
                        this.getUnreadList();
                        this.getFunClaimList();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Take.prototype.onLoad = function () {
        var systemInfo = wx.getSystemInfoSync();
        this.deviceInfo = {
            system: systemInfo.system.replace(' ', '/'),
            brower: 'miniprogram/' + systemInfo.SDKVersion
        };
    };
    Take = __decorate([
        wepy_redux_1.connect({
            mixinCurrentUser: function (_a) {
                var user = _a.user;
                return user.info || {};
            }
        }, {
            userLogin: user_1.userLogin,
            getUserUnreadNumbers: home_1.getUserUnreadNumbers,
            getUnreadDmsNumber: home_1.getUnreadDmsNumber,
            getUserUnreadCisAuditOrder: home_1.getUserUnreadCisAuditOrder,
            writeLog: home_1.writeLog,
            userPermissions: user_1.userPermissions,
            getAlert: user_1.getAlert,
            getUnTreatNum: home_1.getUnTreatNum,
            addMenuRecord: user_1.addMenuRecord,
        })
    ], Take);
    return Take;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Take , 'pages/main/me/index'));

