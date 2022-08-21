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
var index_1 = require('./../../../utils/index.js');
var request_1 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var user_1 = require('./../../../store/actions/user.js');
var common_1 = require('./../../../mixins/common.js');
var Protocol = /** @class */ (function (_super) {
    __extends(Protocol, _super);
    function Protocol() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '',
            usingComponents: {
                'van-button': '../../../components/vant/button/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
            },
        };
        _this.mixins = [common_1.default];
        _this.data = {
            canIUse: wx.canIUse('button.open-type.getUserInfo'),
            isAuth: false,
            sessionCode: '',
            openid: '',
        };
        _this.methods = {
            userAuth: function (evt) {
                var _a = evt.detail, errMsg = _a.errMsg, encryptedData = _a.encryptedData, iv = _a.iv;
                if (this.sessionCode) {
                    if (errMsg === 'getUserInfo:ok') {
                        this.userUnionIdLogin({ iv: iv, encryptedData: encryptedData, sessionKey: this.sessionCode, openid: this.openid, code: '123' });
                    }
                    else {
                        toast_1.default('请同意获取用户信息');
                    }
                }
            },
            chooseLoginType: function (type) {
                wx.navigateTo({
                    url: "/pages/auth/" + type + "/index",
                });
            },
        };
        return _this;
    }
    Protocol.prototype.handleUserToken = function (_a) {
        var _b = _a.sessionid, sessionid = _b === void 0 ? '' : _b, _c = _a.ssoLoginToken, ssoLoginToken = _c === void 0 ? '' : _c, unionid = _a.unionid, account = _a.account, accountInfo = _a.accountInfo, cisCode = _a.cisCode, fxPartInfo = _a.fxPartInfo, zyPartInfo = _a.zyPartInfo, loginSystem = _a.loginSystem, customerCode = _a.customerCode, customer = _a.customer, openid = _a.openid, basePartInfo = _a.basePartInfo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.$parent.globalData.sessionId = sessionid;
                        this.$parent.globalData.ssoLoginToken = ssoLoginToken;
                        this.$parent.globalData.unionid = unionid;
                        this.$parent.globalData.account = account;
                        this.$parent.globalData.accountInfo = accountInfo;
                        this.$parent.globalData.cisCode = cisCode;
                        this.$parent.globalData.fxPartInfo = fxPartInfo;
                        this.$parent.globalData.zyPartInfo = zyPartInfo;
                        this.$parent.globalData.loginSystem = loginSystem;
                        this.$parent.globalData.customerCode = customerCode;
                        this.$parent.globalData.customer = customer;
                        this.$parent.globalData.openid = openid;
                        this.$parent.globalData.basePartInfo = basePartInfo;
                        this.$parent.getDesignConfig();
                        return [4 /*yield*/, index_1.setStorage('b2b_token', JSON.stringify({ sessionid: sessionid, ssoLoginToken: ssoLoginToken, unionid: unionid, account: account, accountInfo: accountInfo, cisCode: cisCode, fxPartInfo: fxPartInfo, zyPartInfo: zyPartInfo, loginSystem: loginSystem, customerCode: customerCode, customer: customer, openid: openid, basePartInfo: basePartInfo }))];
                    case 1:
                        _d.sent();
                        // 获取用户菜单按钮权限
                        this.methods.userPermissions();
                        this.methods.getAlert();
                        return [2 /*return*/];
                }
            });
        });
    };
    Protocol.prototype.getSessionKey = function () {
        var _this = this;
        wx.login({
            success: function (wxRes) {
                if (wxRes.code) {
                    request_1.request({
                        api: "queryCodeInfo.nd?code=" + wxRes.code,
                        callback: function (res) {
                            if (res.data && res.data.session_key && res.data.openid) {
                                _this.sessionCode = res.data.session_key;
                                _this.$parent.globalData.unionid = res.data.unionid,
                                    _this.$parent.globalData.openid = res.data.openid,
                                    _this.openid = res.data.openid,
                                    _this.$apply();
                            }
                            else {
                                toast_1.default.fail('code 获取失败');
                            }
                        },
                    });
                }
                else {
                    toast_1.default.fail('微信授权失败, 请同意授权');
                }
            },
            fail: function () {
                toast_1.default.fail('微信授权失败, 请同意授权');
            },
        });
    };
    Protocol.prototype.userUnionIdLogin = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                toast_1.default.loading({ forbidClick: true, message: '授权中...', duration: 0 });
                this.methods.unionIdLogin(params, function (res) {
                    toast_1.default.clear();
                    var _a = res.data, code = _a.code, decryptResult = _a.decryptResult, wxUser = _a.wxUser, sessionid = _a.sessionid, ssoLoginToken = _a.ssoLoginToken, account = _a.account, customer = _a.customer, fxPartInfo = _a.fxPartInfo, zyPartInfo = _a.zyPartInfo, basePartInfo = _a.basePartInfo;
                    var openid = params.openid;
                    if (decryptResult === 'Y') {
                        _this.$parent.globalData.unionid = wxUser.unionId;
                        _this.$parent.globalData.openid = openid;
                    }
                    if (code == 0) {
                        _this.handleUserToken({
                            sessionid: sessionid,
                            ssoLoginToken: ssoLoginToken,
                            unionid: wxUser.unionId,
                            account: account.account,
                            accountInfo: account,
                            cisCode: customer.cisCode,
                            zyPartInfo: zyPartInfo,
                            fxPartInfo: fxPartInfo,
                            loginSystem: account.loginSystem,
                            customerCode: customer.customerCode,
                            customer: customer,
                            openid: openid,
                            basePartInfo: basePartInfo,
                        });
                        toast_1.default.success({
                            forbidClick: true,
                            duration: 2000,
                            message: '登录成功',
                            onClose: function () {
                                var surveyInfo = wx.getStorageSync('survey_info');
                                if (surveyInfo) { // 如果有值，要跳转至调研问卷作答页面
                                    wx.navigateTo({
                                        url: "/pages/me/webview/index"
                                    });
                                    return;
                                }
                                wx.navigateBack({
                                    delta: 1,
                                });
                            },
                        });
                    }
                    else {
                        _this.isAuth = true;
                        _this.$apply();
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    Protocol.prototype.onLoad = function () {
        this.getSessionKey();
    };
    Protocol = __decorate([
        wepy_redux_1.connect({}, {
            unionIdLogin: user_1.unionIdLogin,
            userPermissions: user_1.userPermissions,
            getAlert: user_1.getAlert,
        })
    ], Protocol);
    return Protocol;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Protocol , 'pages/auth/wechat/index'));

