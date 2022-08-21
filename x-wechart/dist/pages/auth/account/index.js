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
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var index_1 = require('./../../../utils/index.js');
var request_1 = require('./../../../utils/request.js');
var validators_1 = require('./../../../utils/validators.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var common_1 = require('./../../../mixins/common.js');
var user_1 = require('./../../../store/actions/user.js');
var baseUrl = wepy_1.default.$appConfig.baseUrl;
var AccountLogin = /** @class */ (function (_super) {
    __extends(AccountLogin, _super);
    function AccountLogin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '登录',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-button': '../../../components/vant/button/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'van-collapse': '../../../components/vant/collapse/index',
                'van-collapse-item': '../../../components/vant/collapse-item/index',
                'van-dialog': '../../../components/vant/dialog/index',
                'van-field': '../../../components/vant/field/index',
                'van-toast': '../../../components/vant/toast/index',
            },
        };
        _this.mixins = [common_1.default];
        _this.times = 0;
        _this.data = {
            passwordVisible: false,
            confirmTel: '',
            confirmTelCode: '',
            mobile: '',
            password: '',
            code: '',
            account: {},
            accounts: [],
            toggleAccount: ['account'],
            // codeSrc: `${baseUrl}/checkImg.nd`,
            codeSrc: '',
            isNeedImgCode: false,
            secondLogin: false,
            smscode: ''
        };
        _this.methods = {
            togglePwd: function () {
                this.passwordVisible = !this.passwordVisible;
            },
            onConfirmTelChange: function (event) {
                this.confirmTelCode = ramda_1.trim(event.detail);
            },
            clearConfirmTel: function () {
                this.confirmTelCode = '';
            },
            onPhoneChange: function (event) {
                this.mobile = ramda_1.trim(event.detail);
            },
            clearMobile: function () {
                this.mobile = '';
            },
            onPasswordChange: function (event) {
                this.password = ramda_1.trim(event.detail);
            },
            clearPassword: function () {
                this.password = '';
            },
            onCodeChange: function (event) {
                this.code = ramda_1.trim(event.detail);
            },
            clearCode: function () {
                this.code = '';
            },
            getCodeImg: function (t) {
                // t.codeSrc = `${baseUrl}/checkImg.nd?_=${Date.now()}&JSESSIONID=${t.smscode}`;
                // t.codeSrc = `${baseUrl}/checkImg2.nd`;
                if (!t.$parent) {
                    t = this;
                }
                var jesssionid = 'JSESSIONID=' + t.$parent.globalData.sessionId;
                request_1.request({
                    // api: `checkImg2.nd?_=${Date.now()}&JSESSIONID=${t.$parent.globalData.sessionId}`,
                    api: "checkImg2.nd",
                    header: {
                        Cookie: jesssionid
                    },
                    callback: function (res) {
                        t.codeSrc = "" + res.data.img;
                        t.$apply();
                    }
                });
            },
            forgetPassword: function () {
                wx.navigateTo({
                    url: '/pages/auth/forget/index',
                });
            },
            // mobile 值改变时触发
            onMobileBlur: function (event) {
                var _this = this;
                var value = event.detail.value;
                var mobile = ramda_1.trim(value);
                if (mobile && validators_1.checkPhone(mobile)) {
                    request_1.request({
                        api: 'queryAccountByPhone.nd',
                        data: { phone: mobile },
                        callback: function (res) {
                            var _a = res.data, status = _a.status, list = _a.list;
                            if (status === 'true' && list.length > 0) {
                                _this.accounts = list;
                                _this.account = ramda_1.head(list);
                            }
                            else {
                                _this.accounts = [];
                                _this.account = {};
                            }
                            _this.$apply();
                        },
                    });
                }
                else {
                    this.accounts = [];
                    this.account = {};
                }
            },
            // 选择账号 /checkImg.nd
            chooseAccount: function (item) {
                this.account = item;
            },
            onChange: function (event) {
                this.toggleAccount = event.detail;
            },
            confirmTel: function () {
                if (this.confirmTelCode) {
                    var account = this.account.account;
                    var _a = this.$parent.globalData, unionid = _a.unionid, openid = _a.openid;
                    var params = {
                        userName: account || this.mobile,
                        password: this.password,
                        unionid: unionid,
                        openid: openid,
                        msgType: 1,
                        msgCode: this.confirmTelCode,
                    };
                    this.userLogin(params);
                    this.secondLogin = false;
                }
                else {
                    toast_1.default('短信验证码不能为空');
                }
            },
            confirmTelCancel: function () {
                this.secondLogin = false;
            },
            // 登录
            submit: function () {
                var account = this.account.account;
                var _a = this.$parent.globalData, unionid = _a.unionid, openid = _a.openid;
                var params = {
                    userName: account || this.mobile,
                    password: this.password,
                    unionid: unionid,
                    openid: openid,
                };
                if (this.isNeedImgCode) {
                    params.imgCode = this.code;
                }
                this.userLogin(params);
            },
        };
        return _this;
    }
    AccountLogin.prototype.userLogin = function (params) {
        var _this = this;
        toast_1.default.loading({ forbidClick: true, message: '登录中...', duration: 0 });
        this.methods.userLogin(params, function (res) {
            var header = res.header;
            var cookie = header['Set-Cookie'] || header['set-cookie'];
            var token = index_1.getCookie('JSESSIONID', cookie);
            _this.$parent.globalData.modifySession = token;
            toast_1.default.clear();
        }).then(function (result) {
            var _a = result.payload, sessionid = _a.sessionid, ssoLoginToken = _a.ssoLoginToken, msg = _a.msg, code = _a.code, customer = _a.customer, account = _a.account, fxPartInfo = _a.fxPartInfo, zyPartInfo = _a.zyPartInfo, basePartInfo = _a.basePartInfo;
            var openid = params.openid;
            if (sessionid) {
                _this.smscode = sessionid;
                // this.methods.getCodeImg(this);
            }
            switch (code) {
                case 0:
                    _this.loginSuccess(sessionid, ssoLoginToken, params.unionid, account.account, account, customer.cisCode, fxPartInfo, zyPartInfo, account.loginSystem, customer.customerCode, customer, openid, account.allFenXiao, account.marketModels, basePartInfo);
                    break;
                case 1001: // 需要完善用户信息
                    _this.$parent.globalData.sessionId = sessionid;
                    wx.navigateTo({ url: '/pages/auth/protocol/index' });
                    break;
                case 1002: // 二次认证
                    _this.secondLogin = true;
                    _this.confirmTel = index_1.formatMobile(account.mobile);
                    _this.$apply();
                    break;
                case 1004:
                    toast_1.default.fail({
                        forbidClick: true,
                        duration: 2000,
                        message: msg || '登录失败',
                    });
                    _this.isNeedImgCode = true;
                    _this.smscode = sessionid;
                    _this.$apply();
                    if (sessionid) {
                        _this.$parent.globalData.modifySession = sessionid;
                        _this.checkCodeCount();
                    }
                    _this.methods.getCodeImg(_this);
                    break;
                default:
                    toast_1.default.fail({
                        forbidClick: true,
                        duration: 2000,
                        message: msg || '登录失败',
                    });
                    if (sessionid) {
                        _this.$parent.globalData.modifySession = sessionid;
                        _this.checkCodeCount();
                    }
                    break;
            }
        });
    };
    AccountLogin.prototype.checkCodeCount = function () {
        request_1.request({
            api: 'checkAccount.nd',
        });
    };
    AccountLogin.prototype.handleUserToken = function (_a) {
        var _b = _a.sessionid, sessionid = _b === void 0 ? '' : _b, _c = _a.ssoLoginToken, ssoLoginToken = _c === void 0 ? '' : _c, unionid = _a.unionid, account = _a.account, accountInfo = _a.accountInfo, cisCode = _a.cisCode, fxPartInfo = _a.fxPartInfo, zyPartInfo = _a.zyPartInfo, loginSystem = _a.loginSystem, customerCode = _a.customerCode, customer = _a.customer, openid = _a.openid, allFenXiao = _a.allFenXiao, marketModels = _a.marketModels, basePartInfo = _a.basePartInfo;
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
                        this.$parent.globalData.allFenXiao = allFenXiao;
                        this.$parent.globalData.marketModels = marketModels;
                        this.$parent.globalData.basePartInfo = basePartInfo;
                        this.$parent.getDesignConfig();
                        return [4 /*yield*/, index_1.removeStorage('b2b_token')];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, index_1.setStorage('b2b_token', JSON.stringify({ sessionid: sessionid, ssoLoginToken: ssoLoginToken, unionid: unionid, account: account, accountInfo: accountInfo, cisCode: cisCode, fxPartInfo: fxPartInfo, zyPartInfo: zyPartInfo, loginSystem: loginSystem, customerCode: customerCode, customer: customer, openid: openid, allFenXiao: allFenXiao, marketModels: marketModels, basePartInfo: basePartInfo }))];
                    case 2:
                        _d.sent();
                        this.methods.userPermissions();
                        this.methods.getAlert();
                        return [2 /*return*/];
                }
            });
        });
    };
    AccountLogin.prototype.loginSuccess = function (sessionid, ssoLoginToken, unionid, account, accountInfo, cisCode, fxPartInfo, zyPartInfo, loginSystem, customerCode, customer, openid, allFenXiao, marketModels, basePartInfo) {
        this.handleUserToken({
            sessionid: sessionid,
            ssoLoginToken: ssoLoginToken,
            unionid: unionid,
            account: account,
            accountInfo: accountInfo,
            cisCode: cisCode,
            fxPartInfo: fxPartInfo,
            zyPartInfo: zyPartInfo,
            loginSystem: loginSystem,
            customerCode: customerCode,
            customer: customer,
            openid: openid,
            allFenXiao: allFenXiao,
            marketModels: marketModels,
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
                    delta: 2,
                });
            },
        });
    };
    AccountLogin = __decorate([
        wepy_redux_1.connect({}, {
            userLogin: user_1.userLogin,
            userPermissions: user_1.userPermissions,
            getAlert: user_1.getAlert,
        })
    ], AccountLogin);
    return AccountLogin;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(AccountLogin , 'pages/auth/account/index'));

