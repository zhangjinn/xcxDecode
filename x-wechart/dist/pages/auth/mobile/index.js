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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var index_1 = require('./../../../utils/index.js');
var request_1 = require('./../../../utils/request.js');
var validators_1 = require('./../../../utils/validators.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var user_1 = require('./../../../store/actions/user.js');
var baseUrl = wepy_1.default.$appConfig.baseUrl;
var MobileLogin = /** @class */ (function (_super) {
    __extends(MobileLogin, _super);
    function MobileLogin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '登录',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-button': '../../../components/vant/button/index',
                'van-collapse': '../../../components/vant/collapse/index',
                'van-collapse-item': '../../../components/vant/collapse-item/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'van-dialog': '../../../components/vant/dialog/index',
                'van-field': '../../../components/vant/field/index',
                'van-toast': '../../../components/vant/toast/index',
            },
        };
        _this.times = 0;
        _this.data = {
            confirmTel: '',
            confirmTelCode: '',
            mobile: '',
            password: '',
            code: '',
            account: {},
            accounts: [],
            toggleAccount: [],
            codeSrc: baseUrl + "/checkImg.nd",
            isNeedImgCode: false,
            secondLogin: false,
            timer: 60,
        };
        _this.methods = {
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
            getCodeImg: function () {
                this.codeSrc = baseUrl + "/checkImg.nd?_=" + Date.now();
            },
            getSmsCode: function () {
                var _this = this;
                var mobile = this.mobile;
                var account = this.account.account;
                if (account) {
                    if (this.timer === 60) {
                        if (mobile && validators_1.checkPhone(mobile)) {
                            toast_1.default.loading({ forbidClick: true, message: '验证码发送中...', duration: 0 });
                            request_1.request({
                                api: 'getMsmByPhone.nd',
                                method: 'POST',
                                data: { account: account, phone: mobile, msgType: 2 },
                                callback: function (res) {
                                    var status = res.data.status;
                                    if (status === 'true') {
                                        toast_1.default.success('短信发送成功');
                                        _this.startTimer();
                                    }
                                    else {
                                        toast_1.default.fail('短信发送失败');
                                    }
                                },
                            });
                        }
                        else {
                            toast_1.default('请输入正确的手机号');
                        }
                    }
                }
                else {
                    toast_1.default('请选择账号');
                }
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
                    toast_1.default('请输入正确的手机号码');
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
                        msmType: 1,
                        msmCode: this.confirmTelCode,
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
                    userName: account,
                    msgCode: this.code,
                    msgType: 2,
                    unionid: unionid,
                    openid: openid
                };
                if (this.isNeedImgCode) {
                    params.imgCode = this.code;
                }
                this.userLogin(params);
            },
        };
        return _this;
    }
    MobileLogin.prototype.userLogin = function (params) {
        var _this = this;
        toast_1.default.loading({ forbidClick: true, message: '登录中...', duration: 0 });
        this.methods.userLogin(params, function (res) {
            var header = res.header;
            var cookie = header['Set-Cookie'] || header['set-cookie'];
            var token = index_1.getCookie('JSESSIONID', cookie);
            _this.$parent.globalData.modifySession = token;
            toast_1.default.clear();
        }).then(function (result) {
            var _a = result.payload, sessionid = _a.sessionid, ssoLoginToken = _a.ssoLoginToken, msg = _a.msg, code = _a.code, customer = _a.customer, account = _a.account, zyPartInfo = _a.zyPartInfo, fxPartInfo = _a.fxPartInfo, basePartInfo = _a.basePartInfo;
            var openid = params.openid;
            switch (code) {
                case 0:
                    _this.loginSuccess(sessionid, ssoLoginToken, params.unionid, account.account, account, customer.cisCode, fxPartInfo, zyPartInfo, account.loginSystem, customer.customerCode, customer, openid, basePartInfo);
                    break;
                case 1001:
                    wx.navigateTo({ url: '/pages/auth/protocol/index' });
                    break;
                case 1002:
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
                    _this.methods.getCodeImg();
                    _this.$apply();
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
    MobileLogin.prototype.checkCodeCount = function () {
        request_1.request({
            api: 'checkAccount.nd',
        });
    };
    MobileLogin.prototype.handleUserToken = function (_a) {
        var _b = _a.sessionid, sessionid = _b === void 0 ? '' : _b, _c = _a.ssoLoginToken, ssoLoginToken = _c === void 0 ? '' : _c, unionid = _a.unionid, account = _a.account, accountInfo = _a.accountInfo, cisCode = _a.cisCode, zyPartInfo = _a.zyPartInfo, fxPartInfo = _a.fxPartInfo, loginSystem = _a.loginSystem, customerCode = _a.customerCode, customer = _a.customer, openid = _a.openid, basePartInfo = _a.basePartInfo;
        this.$parent.globalData.sessionId = sessionid;
        this.$parent.globalData.ssoLoginToken = ssoLoginToken;
        this.$parent.globalData.unionid = unionid;
        this.$parent.globalData.account = account;
        this.$parent.globalData.accountInfo = accountInfo;
        this.$parent.globalData.cisCode = cisCode;
        this.$parent.globalData.zyPartInfo = zyPartInfo;
        this.$parent.globalData.fxPartInfo = fxPartInfo;
        this.$parent.globalData.loginSystem = loginSystem;
        this.$parent.globalData.customerCode = customerCode;
        this.$parent.globalData.customer = customer;
        this.$parent.globalData.openid = openid;
        this.$parent.globalData.basePartInfo = basePartInfo;
        this.$parent.getDesignConfig();
        index_1.setStorage('b2b_token', JSON.stringify({ sessionid: sessionid, ssoLoginToken: ssoLoginToken, unionid: unionid, account: account, accountInfo: accountInfo, cisCode: cisCode, zyPartInfo: zyPartInfo, fxPartInfo: fxPartInfo, loginSystem: loginSystem, customerCode: customerCode, customer: customer, openid: openid, basePartInfo: basePartInfo }));
        this.methods.userPermissions();
        this.methods.getAlert();
    };
    MobileLogin.prototype.loginSuccess = function (sessionid, ssoLoginToken, unionid, account, accountInfo, cisCode, fxPartInfo, zyPartInfo, loginSystem, customerCode, customer, openid, basePartInfo) {
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
    MobileLogin.prototype.startTimer = function () {
        var _this = this;
        this.timerEl = setInterval(function () {
            _this.timer = ramda_1.subtract(_this.timer, 1);
            if (_this.timer === 0) {
                _this.timer = 60;
                clearInterval(_this.timerEl);
            }
            _this.$apply();
        }, 1000);
    };
    MobileLogin.prototype.onUnload = function () {
        if (this.timerEl) {
            clearInterval(this.timerEl);
        }
    };
    MobileLogin = __decorate([
        wepy_redux_1.connect({}, {
            userLogin: user_1.userLogin,
            userPermissions: user_1.userPermissions,
            getAlert: user_1.getAlert,
        })
    ], MobileLogin);
    return MobileLogin;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(MobileLogin , 'pages/auth/mobile/index'));

