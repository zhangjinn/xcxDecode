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
/*
 * @Auth: Turbo
 * @Email: 691209942@qq.com
 * @Date: 2019-09-25 22:22:06
 * @Description:
 */
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var request_1 = require('./../../../utils/request.js');
var validators_1 = require('./../../../utils/validators.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var AccountReset = /** @class */ (function (_super) {
    __extends(AccountReset, _super);
    function AccountReset() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '重置密码',
            usingComponents: {
                'van-button': '../../../components/vant/button/index',
                'van-field': '../../../components/vant/field/index',
                'van-toast': '../../../components/vant/toast/index',
            },
        };
        _this.times = 0;
        _this.data = {
            passwordVisible: false,
            repasswordVisible: false,
            password: '',
            rePassword: '',
        };
        _this.methods = {
            togglePwd: function () {
                this.passwordVisible = !this.passwordVisible;
            },
            toggleRePwd: function () {
                this.repasswordVisible = !this.repasswordVisible;
            },
            onPasswordChange: function (event) {
                this.password = ramda_1.trim(event.detail);
            },
            clearPassword: function () {
                this.password = '';
            },
            onRePasswordChange: function (event) {
                this.rePassword = ramda_1.trim(event.detail);
            },
            clearRePassword: function () {
                this.rePassword = '';
            },
            // 登录
            submit: function () {
                if (!ramda_1.trim(this.password)) {
                    toast_1.default('请输入新密码');
                    return;
                }
                var pwdMsg = validators_1.passwordValidate(ramda_1.trim(this.password));
                if (pwdMsg) {
                    toast_1.default(pwdMsg);
                    return;
                }
                if (!ramda_1.trim(this.rePassword)) {
                    toast_1.default('请确认新密码');
                    return;
                }
                var rePwdMsg = validators_1.passwordValidate(ramda_1.trim(this.rePassword));
                if (rePwdMsg) {
                    toast_1.default(rePwdMsg);
                    return;
                }
                if (ramda_1.trim(this.rePassword) !== ramda_1.trim(this.password)) {
                    toast_1.default('两次密码不一致');
                    return;
                }
                if (this.type === 'mobile') {
                    var _a = this.data, name = _a.name, code = _a.code;
                    this.restPwd('resetPwdByPhone.nd', {
                        msmCode: code,
                        account: name,
                        pwd: ramda_1.trim(this.password),
                    });
                }
                else {
                    var _b = this.data, account = _b.account, full = _b.full, person = _b.person;
                    this.restPwd('modifyByQuestion.nd', {
                        custLoginName: account,
                        custFullName: full,
                        custLegalPerson: person,
                        password: ramda_1.trim(this.password),
                    });
                }
            },
        };
        return _this;
    }
    AccountReset.prototype.restPwd = function (api, data) {
        toast_1.default.loading({ forbidClick: true, message: '处理中...', duration: 0 });
        request_1.request({
            api: api,
            data: data,
            method: 'POST',
            callback: function (res) {
                toast_1.default.clear();
                var _a = res.data, status = _a.status, msg = _a.msg;
                if (status === 'false') {
                    toast_1.default.fail(msg || '密码重置失败');
                }
                else {
                    toast_1.default.success({
                        forbidClick: true,
                        duration: 2000,
                        message: '密码重置成功！',
                        onClose: function () {
                            wx.navigateBack({
                                delta: 2,
                            });
                        },
                    });
                }
            },
        });
    };
    AccountReset.prototype.onLoad = function (options) {
        var type = options.type, rest = __rest(options, ["type"]);
        this.type = type;
        this.data = rest;
    };
    return AccountReset;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(AccountReset , 'pages/auth/reset/index'));

