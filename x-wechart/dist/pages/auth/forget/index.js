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
var ForgetPassword = /** @class */ (function (_super) {
    __extends(ForgetPassword, _super);
    function ForgetPassword() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '找回密码',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-button': '../../../components/vant/button/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'van-dialog': '../../../components/vant/dialog/index',
                'van-field': '../../../components/vant/field/index',
                'van-toast': '../../../components/vant/toast/index',
            },
        };
        _this.times = 0;
        _this.data = {
            canUse: 'YES',
            mobile: '',
            name: '',
            code: '',
            codeSrc: baseUrl + "/checkImg.nd",
            timer: 60,
            shopName: '',
            shopFull: '',
            shopContact: '',
        };
        _this.methods = {
            toggleType: function (type) {
                this.canUse = type;
            },
            onMobileChange: function (event) {
                this.mobile = ramda_1.trim(event.detail);
            },
            clearMobile: function () {
                this.mobile = '';
            },
            onNameChange: function (event) {
                this.name = ramda_1.trim(event.detail);
            },
            clearName: function () {
                this.name = '';
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
                if (this.timer === 60) {
                    if (!ramda_1.trim(this.name)) {
                        toast_1.default('请输入登录用户名');
                        return;
                    }
                    if (mobile && validators_1.checkPhone(mobile)) {
                        toast_1.default.loading({ forbidClick: true, message: '验证码发送中...', duration: 0 });
                        request_1.request({
                            api: 'getMsmByPhone.nd',
                            method: 'POST',
                            data: { account: this.name, phone: mobile, msgType: 4 },
                            callback: function (res) {
                                var _a = res.data, status = _a.status, msg = _a.msg;
                                if (status === 'true') {
                                    toast_1.default.success('短信发送成功');
                                    _this.startTimer();
                                }
                                else {
                                    toast_1.default.fail(msg || '短信发送失败');
                                }
                            },
                        });
                    }
                    else {
                        toast_1.default('请输入正确的手机号');
                    }
                }
            },
            // 原手机不可用
            onShopAccountChange: function (event) {
                this.shopName = ramda_1.trim(event.detail);
            },
            clearShopAccount: function () {
                this.shopName = '';
            },
            onShopFullChange: function (event) {
                this.shopFull = ramda_1.trim(event.detail);
            },
            clearShopFull: function () {
                this.shopFull = '';
            },
            onShopContactChange: function (event) {
                this.shopContact = ramda_1.trim(event.detail);
            },
            clearShopContact: function () {
                this.shopContact = '';
            },
            // 原手机可用
            submitTel: function () {
                var _this = this;
                if (!ramda_1.trim(this.name)) {
                    toast_1.default('请输入登录用户名');
                    return;
                }
                if (!validators_1.checkPhone(this.mobile)) {
                    toast_1.default('手机号不正确');
                    return;
                }
                if (!ramda_1.trim(this.code)) {
                    toast_1.default('请输入短信验证码');
                    return;
                }
                // 当前页面检验验证码
                var data = {
                    account: this.name,
                    msgCode: this.code
                };
                request_1.request({ api: 'checkMsgCode.nd', method: 'POST', data: data }).then(function (res) {
                    if (res && res.status == 'false' && res.code == 1) {
                        toast_1.default.fail({
                            message: res.msg,
                            duration: 1000,
                        });
                    }
                    else if (res && res.code == 0) {
                        wx.navigateTo({
                            url: "/pages/auth/reset/index?name=" + _this.name + "&mobile=" + _this.mobile + "&code=" + _this.code + "&type=mobile",
                        });
                    }
                });
            },
            submitAccount: function () {
                var _this = this;
                if (!ramda_1.trim(this.shopName)) {
                    toast_1.default('请输入商家登陆用户名');
                    return;
                }
                if (!ramda_1.trim(this.shopFull)) {
                    toast_1.default('请输入商家全称');
                    return;
                }
                if (!ramda_1.trim(this.shopContact)) {
                    toast_1.default('请输入商家法人姓名');
                    return;
                }
                toast_1.default.loading({ forbidClick: true, message: '校验商家信息中...', duration: 0 });
                request_1.request({
                    api: 'verifyQuestion.nd',
                    method: 'POST',
                    data: { custLoginName: this.shopName, custFullName: this.shopFull, custLegalPerson: this.shopContact },
                    callback: function (res) {
                        toast_1.default.clear();
                        var data = res.data;
                        if (data === 'Error') {
                            toast_1.default.fail('商家信息不可用');
                        }
                        else {
                            wx.navigateTo({
                                url: "/pages/auth/reset/index?account=" + _this.shopName + "&full=" + _this.shopFull + "&person=" + _this.shopContact + "&type=shop",
                            });
                        }
                    },
                });
            },
        };
        return _this;
    }
    ForgetPassword.prototype.userLogin = function (params) {
        var _this = this;
        toast_1.default.loading({ forbidClick: true, message: '登录中...', duration: 0 });
        this.methods.userLogin(params, function (res) {
            var header = res.header;
            var cookie = header['Set-Cookie'] || header['set-cookie'];
            var token = index_1.getCookie('JSESSIONID', cookie);
            _this.$parent.globalData.modifySession = token;
            toast_1.default.clear();
        }).then(function (result) {
            var _a = result.payload, sessionid = _a.sessionid, msg = _a.msg, code = _a.code, account = _a.account;
            switch (code) {
                case 0:
                    _this.loginSuccess(sessionid);
                    break;
                case 1001:
                    wx.navigateTo({ url: '/pages/auth/protocol/index' });
                    break;
                case 1002:
                    _this.secondLogin = true;
                    _this.confirmTel = account.mobile;
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
                    break;
            }
        });
    };
    ForgetPassword.prototype.loginSuccess = function (sessionid) {
        if (sessionid) {
            this.$parent.globalData.sessionId = sessionid;
            index_1.setStorage('b2b_token', sessionid);
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
        }
    };
    ForgetPassword.prototype.startTimer = function () {
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
    ForgetPassword.prototype.onUnload = function () {
        if (this.timerEl) {
            clearInterval(this.timerEl);
        }
    };
    ForgetPassword = __decorate([
        wepy_redux_1.connect({}, {
            userLogin: user_1.userLogin,
        })
    ], ForgetPassword);
    return ForgetPassword;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(ForgetPassword , 'pages/auth/forget/index'));

