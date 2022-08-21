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
var request_1 = require('./../../../utils/request.js');
var validators_1 = require('./../../../utils/validators.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var user_1 = require('./../../../store/actions/user.js');
var AccountConfirm = /** @class */ (function (_super) {
    __extends(AccountConfirm, _super);
    function AccountConfirm() {
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
                'van-radio': '../../../components/vant/radio/index',
                'van-radio-group': '../../../components/vant/radio-group/index',
                'van-field': '../../../components/vant/field/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
            },
        };
        _this.timerEl = null;
        _this.data = {
            passwordVisible: false,
            repasswordVisible: false,
            password: '',
            rePassword: '',
            code: '',
            timer: 60,
        };
        _this.methods = {
            togglePwd: function () {
                this.passwordVisible = !this.passwordVisible;
            },
            toggleRePwd: function () {
                this.repasswordVisible = !this.repasswordVisible;
            },
            // 用户名
            onNameChange: function (event) {
                this.account.userName = ramda_1.trim(event.detail);
            },
            clearName: function () {
                this.account.userName = '';
            },
            // 手机号
            onMobileChange: function (event) {
                this.account.mobile = ramda_1.trim(event.detail);
            },
            clearMobile: function () {
                this.mobile = '';
            },
            // 邮箱
            onEmailChange: function (event) {
                this.account.email = ramda_1.trim(event.detail);
            },
            clearEmail: function () {
                this.account.email = '';
            },
            // 验证码
            onCodeChange: function (event) {
                this.code = ramda_1.trim(event.detail);
            },
            clearCode: function () {
                this.code = '';
            },
            // 密码
            onPasswordChange: function (event) {
                this.password = ramda_1.trim(event.detail);
            },
            clearPassword: function () {
                this.password = '';
            },
            // 再次密码
            onRePasswordChange: function (event) {
                this.rePassword = ramda_1.trim(event.detail);
            },
            clearRePassword: function () {
                this.rePassword = '';
            },
            getSmsCode: function () {
                var _this = this;
                if (this.timerEl) {
                    return;
                }
                var _a = this.account, account = _a.account, mobile = _a.mobile;
                if (this.timer === 60) {
                    if (mobile && validators_1.checkPhone(mobile)) {
                        toast_1.default.loading({ forbidClick: true, message: '验证码发送中...', duration: 0 });
                        request_1.request({
                            api: 'getMsmByPhone.nd',
                            method: 'POST',
                            data: { account: account, phone: mobile, msgType: 3 },
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
            },
            // 选择账号 /checkImg.nd
            chooseAccount: function (item) {
                this.account = item;
            },
            onChange: function (event) {
                this.toggleAccount = event.detail;
            },
            submit: function () {
                var _a = this.account, userName = _a.userName, email = _a.email, mobile = _a.mobile;
                if (!userName) {
                    toast_1.default('联系人不能为空');
                    return;
                }
                if (!mobile) {
                    toast_1.default('手机号不能为空');
                    return;
                }
                if (!validators_1.checkPhone(mobile)) {
                    toast_1.default('手机号不正确');
                    return;
                }
                if (!this.code) {
                    toast_1.default('短信验证码不能为空');
                    return;
                }
                if (!email) {
                    toast_1.default('邮箱不能为空');
                    return;
                }
                if (!validators_1.checkEmail(email)) {
                    toast_1.default('邮箱格式不正确');
                    return;
                }
                if (!this.password) {
                    toast_1.default('密码不能为空');
                    return;
                }
                var pwdMsg = validators_1.passwordValidate(this.password);
                if (pwdMsg) {
                    toast_1.default(pwdMsg);
                    return;
                }
                if (!this.rePassword) {
                    toast_1.default('确认密码不能为空');
                    return;
                }
                var rePwdMsg = validators_1.passwordValidate(this.rePassword);
                if (rePwdMsg) {
                    toast_1.default(rePwdMsg);
                    return;
                }
                if (this.password !== this.rePassword) {
                    toast_1.default('两次密码不相等');
                    return;
                }
                toast_1.default.loading({ forbidClick: true, message: '修改中...', duration: 0 });
                request_1.request({
                    api: 'activeEnterpriseUser/editEnterpriseUser.nd',
                    method: 'POST',
                    data: {
                        name: userName,
                        email: email,
                        phone: mobile,
                        validationCode: this.code,
                        npassword: this.rePassword,
                        password: this.password
                    },
                    callback: function (res) {
                        var data = res.data;
                        if (data && data === 'success') {
                            toast_1.default.success({
                                message: '信息保存成功',
                                duration: 2000,
                                onClose: function () {
                                    wx.navigateBack({
                                        delta: 2,
                                    });
                                },
                            });
                        }
                        else {
                            toast_1.default.fail(data || '信息修改失败');
                        }
                    },
                });
            },
            goBack: function () {
                wx.navigateBack({
                    delta: 2,
                });
            },
        };
        return _this;
    }
    AccountConfirm.prototype.startTimer = function () {
        var _this = this;
        this.timerEl = setInterval(function () {
            _this.timer = ramda_1.subtract(_this.timer, 1);
            if (_this.timer === 0) {
                _this.timer = 60;
                clearInterval(_this.timerEl);
                _this.timerEl = null;
            }
            _this.$apply();
        }, 1000);
    };
    AccountConfirm.prototype.onUnload = function () {
        if (this.timerEl) {
            clearInterval(this.timerEl);
        }
    };
    AccountConfirm = __decorate([
        wepy_redux_1.connect({
            account: function (_a) {
                var user = _a.user;
                return user.account;
            },
        }, {
            userLogin: user_1.userLogin,
        })
    ], AccountConfirm);
    return AccountConfirm;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(AccountConfirm , 'pages/auth/confirm/index'));

