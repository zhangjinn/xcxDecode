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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var ramda_1 = require('./../../../../npm/ramda/src/index.js');
var index_1 = require('./../../../../utils/index.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var user_1 = require('./../../../../store/actions/user.js');
var MobileLogin = /** @class */ (function (_super) {
    __extends(MobileLogin, _super);
    function MobileLogin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '账户注销',
            usingComponents: {
                'van-icon': '../../../../components/vant/icon/index',
                'van-button': '../../../../components/vant/button/index',
                'van-dialog': '../../../../components/vant/dialog/index',
                'van-field': '../../../../components/vant/field/index',
                'van-toast': '../../../../components/vant/toast/index',
                'van-checkbox': '../../../../components/vant/checkbox/index',
                'van-radio': '../../../../components/vant/radio/index',
                'van-radio-group': '../../../../components/vant/radio-group/index',
            },
        };
        _this.data = {
            noticeChecked: false,
            stepStatus: '1',
            mobile: '',
            code: '',
            verifyCode: false,
            timer: 60,
            timerEl: '',
            reasonRadio: '',
            reasonRadioList: [],
            reasonText: '',
        };
        _this.methods = {
            // 查看注销须知
            cancellationNotice: function () {
                this.stepStatus = 'notice';
                this.$apply();
            },
            // 注销须知已阅读并同意
            readAndAgree: function () {
                this.stepStatus = '1';
                this.noticeChecked = true;
                this.$apply();
            },
            // 勾选同意注销须知
            onChange: function (event) {
                this.noticeChecked = event.detail;
                this.$apply();
            },
            // 切换至短信验证
            toSMSVerification: function () {
                this.stepStatus = '2';
                this.$apply();
            },
            // 修改验证码
            onCodeChange: function (event) {
                this.code = ramda_1.trim(event.detail);
                this.$apply();
            },
            // 清空验证码
            clearCode: function () {
                this.code = '';
                this.$apply();
            },
            // 发送验证码
            getSmsCode: function () {
                var _this = this;
                if (this.timer === 60) {
                    this.methods.sendMsg({
                        type: 'applyCancelAccount'
                    }).then(function (res) {
                        var _a = res.payload, code = _a.code, msg = _a.msg;
                        if (code == '0') {
                            _this.verifyCode = true;
                            var accountInfo = JSON.parse(wx.getStorageSync('b2b_token')).accountInfo;
                            _this.mobile = index_1.formatMobile(accountInfo.mobile);
                            _this.startTimer();
                        }
                        else {
                            _this.verifyCode = false;
                            toast_1.default.fail(msg);
                        }
                        _this.$apply();
                    });
                }
            },
            // 切换至注销原因
            toCancellationReason: function () {
                if (!_this.verifyCode) {
                    toast_1.default.fail('请先获取验证码！');
                    return;
                }
                var param = {
                    type: 'applyCancelAccount',
                    code: _this.code,
                };
                _this.methods.checkMsg(param).then(function (result) {
                    var code = result.payload.code;
                    if (code == 0) {
                        _this.stepStatus = '3';
                        _this.methods.getCancellationReason().then(function (res) {
                            var list = res.payload.list;
                            _this.reasonRadioList = list;
                            if (_this.reasonRadioList && _this.reasonRadioList.length > 0) {
                                _this.reasonRadio = _this.reasonRadioList[0].code;
                            }
                            _this.$apply();
                        });
                    }
                    else {
                        toast_1.default.fail('您输入的验证码有误！');
                    }
                });
            },
            // 修改单选选项注销原因
            onReasonRadioChange: function (event) {
                this.reasonRadio = event.detail;
                this.$apply();
            },
            // 修改输入框注销原因
            onReasonTextChange: function (event) {
                this.reasonText = event.detail;
                this.$apply();
            },
            // 提交注销原因，此步骤不做任何处理，直接切换至注销确认
            submitCancelReason: function () {
                this.stepStatus = '4';
                this.$apply();
            },
            // 注销确认
            submitConfirmation: function () {
                var _this = this;
                var reasonObj = this.reasonRadioList.find(function (item) { return item.code == _this.reasonRadio; });
                var reason = '';
                if (reasonObj.name && this.reasonText) {
                    reason = reasonObj.name + ',' + this.reasonText; // 选中的原因名称 逗号 手动输入的原因
                }
                else if (reasonObj.name && !this.reasonText) {
                    reason = reasonObj.name;
                }
                else if (!reasonObj.name && this.reasonText) {
                    reason = this.reasonText;
                }
                else {
                    reason = '';
                }
                var param = {
                    code: this.code,
                    reason: reason,
                };
                toast_1.default.loading({ forbidClick: true, message: '申请中...', duration: 0 });
                this.methods.applyCancelAccount(param).then(function (res) {
                    toast_1.default.clear();
                    var _a = res.payload, code = _a.code, msg = _a.msg;
                    if (code == '0') {
                        _this.stepStatus = '5';
                        _this.$apply();
                    }
                    else {
                        toast_1.default.fail(msg);
                    }
                });
            },
            // 返回首页
            goBackHome: function () {
                wx.reLaunch({
                    url: '/pages/main/home/index'
                });
            }
        };
        return _this;
    }
    MobileLogin.prototype.startTimer = function () {
        var _this = this;
        this.timerEl = setInterval(function () {
            _this.timer = ramda_1.subtract(_this.timer, 1);
            if (_this.timer === 0) {
                _this.timer = 60;
                _this.verifyCode = false;
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
            sendMsg: user_1.sendMsg,
            checkMsg: user_1.checkMsg,
            getCancellationReason: user_1.getCancellationReason,
            applyCancelAccount: user_1.applyCancelAccount,
        })
    ], MobileLogin);
    return MobileLogin;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(MobileLogin , 'pages/me/account-cancellation/cancellation-application/index'));

