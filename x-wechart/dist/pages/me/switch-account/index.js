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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var request_1 = require('./../../../utils/request.js');
var common_1 = require('./../../../mixins/common.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var user_1 = require('./../../../store/types/user.js');
var user_2 = require('./../../../store/actions/user.js');
var index_1 = require('./../../../utils/index.js');
var store = wepy_redux_1.getStore();
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-loading': '../../../components/vant/loading/index',
            },
        };
        _this.data = {
            imgObj: {
                'trainingClockLogo': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552864_7a568383337a4c8586df776a3fe48fcc.png',
            },
            currentAccount: {},
            accountList: [],
        };
        _this.mixins = [common_1.default];
        // 页面内交互写在methods里
        _this.methods = {
            changeAccount: function (accountOne) {
                return __awaiter(this, void 0, void 0, function () {
                    var sessionKeyResult, ivResult, result, sessionid, ssoLoginToken, msg, code, customer, account, zyPartInfo, fxPartInfo, basePartInfo, openid;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!((this.currentAccount.account && this.currentAccount.account !== accountOne.account) || (!this.currentAccount.account && this.mixinCurrentUser.account !== accountOne.account))) return [3 /*break*/, 4];
                                toast_1.default.loading({ forbidClick: true, message: '切换账号中...', duration: 0 });
                                return [4 /*yield*/, this.getSessionKey()];
                            case 1:
                                sessionKeyResult = _a.sent();
                                if (!sessionKeyResult.flag) {
                                    toast_1.default.fail(sessionKeyResult.message);
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, this.getUserInfo()];
                            case 2:
                                ivResult = _a.sent();
                                if (!ivResult.flag) {
                                    toast_1.default.fail(ivResult.message);
                                }
                                return [4 /*yield*/, request_1.request({ api: 'ping.nd', method: 'POST', data: __assign({}, sessionKeyResult.data, ivResult.data, { userName: accountOne.account }) })];
                            case 3:
                                result = _a.sent();
                                store.dispatch({ type: user_1.USER_LOGIN_ACTION, payload: result });
                                sessionid = result.sessionid, ssoLoginToken = result.ssoLoginToken, msg = result.msg, code = result.code, customer = result.customer, account = result.account, zyPartInfo = result.zyPartInfo, fxPartInfo = result.fxPartInfo, basePartInfo = result.basePartInfo;
                                openid = sessionKeyResult.data.openid;
                                toast_1.default.clear();
                                switch (code) {
                                    case 0:
                                        this.currentAccount = account;
                                        this.loginSuccess({ sessionid: sessionid, ssoLoginToken: ssoLoginToken, account: account.account, accountInfo: account, cisCode: customer.cisCode, zyPartInfo: zyPartInfo, fxPartInfo: fxPartInfo, loginSystem: account.loginSystem, customerCode: customer.customerCode, customer: customer, openid: openid, basePartInfo: basePartInfo });
                                        break;
                                    case 1001: // 需要完善用户信息
                                        wx.navigateTo({ url: '/pages/auth/protocol/index' });
                                        break;
                                    case 1002: // 二次认证
                                        // this.secondLogin = true;
                                        // this.confirmTel = formatMobile(account.mobile);
                                        // this.$apply();
                                        break;
                                    case 1004:
                                        toast_1.default.fail({
                                            forbidClick: true,
                                            duration: 2000,
                                            message: msg || '切换失败',
                                        });
                                        // this.isNeedImgCode = true;
                                        // this.methods.getCodeImg();
                                        // this.$apply();
                                        break;
                                    default:
                                        toast_1.default.fail({
                                            forbidClick: true,
                                            duration: 2000,
                                            message: msg || '切换失败',
                                        });
                                        break;
                                }
                                toast_1.default.clear();
                                this.$apply();
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            },
        };
        return _this;
    }
    Filter.prototype.loginSuccess = function (_a) {
        var _b = _a.sessionid, sessionid = _b === void 0 ? '' : _b, _c = _a.ssoLoginToken, ssoLoginToken = _c === void 0 ? '' : _c, account = _a.account, accountInfo = _a.accountInfo, cisCode = _a.cisCode, fxPartInfo = _a.fxPartInfo, zyPartInfo = _a.zyPartInfo, loginSystem = _a.loginSystem, customerCode = _a.customerCode, customer = _a.customer, openid = _a.openid, basePartInfo = _a.basePartInfo;
        return __awaiter(this, void 0, void 0, function () {
            var unionid;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.$parent.globalData.sessionId = sessionid;
                        this.$parent.globalData.ssoLoginToken = ssoLoginToken;
                        unionid = this.$parent.globalData.unionid;
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
                        return [4 /*yield*/, index_1.setStorage('b2b_token', JSON.stringify({ sessionid: sessionid, ssoLoginToken: ssoLoginToken, unionid: unionid, account: account, accountInfo: accountInfo, cisCode: cisCode, zyPartInfo: zyPartInfo, fxPartInfo: fxPartInfo, loginSystem: loginSystem, customerCode: customerCode, customer: customer, openid: openid, basePartInfo: basePartInfo }))];
                    case 1:
                        _d.sent();
                        toast_1.default.success({
                            message: "\u5207\u6362\u6210\u529F",
                            duration: 1000,
                            onClose: function () {
                                wx.navigateBack({
                                    delta: 1,
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Filter.prototype.getSessionKey = function () {
        return new Promise(function (resolve, reject) {
            wx.login({
                success: function (wxRes) {
                    if (wxRes.code) {
                        request_1.request({
                            api: "queryCodeInfo.nd?code=" + wxRes.code,
                            callback: function (res) {
                                if (res.data && res.data.session_key && res.data.openid) {
                                    resolve({ flag: true, data: { sessionKey: res.data.session_key, openid: res.data.openid } });
                                }
                                else {
                                    reject({ flag: false, message: 'code获取失败' });
                                }
                            },
                        });
                    }
                    else {
                        reject({ flag: false, message: '微信授权失败, 请同意授权' });
                    }
                },
                fail: function () {
                    reject({ flag: false, message: '微信授权失败, 请同意授权' });
                },
            });
        });
    };
    Filter.prototype.getUserInfo = function () {
        return new Promise(function (resolve, reject) {
            wx.getUserInfo({
                success: function (_a) {
                    var iv = _a.iv, encryptedData = _a.encryptedData, rest = __rest(_a, ["iv", "encryptedData"]);
                    resolve({ flag: true, data: { iv: iv, encryptedData: encryptedData } });
                },
                fail: function () {
                    reject({ flag: false, message: '获取用户信息失败，请检查授权情况' });
                }
            });
        });
    };
    // 获取账号列表
    Filter.prototype.getAccountList = function () {
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
    Filter.prototype.onShow = function () {
        if (this.loginStatus) {
            var _a = this.mixinCurrentUser, userName = _a.userName, account = _a.account;
            this.currentAccount = __assign({ name: userName, account: account }, this.mixinCurrentUser);
            this.getAccountList();
        }
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            mixinCurrentUser: function (_a) {
                var user = _a.user;
                return user.info || {};
            }
        }, {
            userLogin: user_2.userLogin,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/me/switch-account/index'));

