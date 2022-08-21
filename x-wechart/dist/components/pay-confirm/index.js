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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var request_1 = require('./../../utils/request.js');
var toast_1 = require('./../vant/toast/toast.js');
var PayConfirm = /** @class */ (function (_super) {
    __extends(PayConfirm, _super);
    function PayConfirm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {
            price: 0,
            show: false,
            password: '',
            passwordVisible: false,
            subStatus: true
        };
        _this.callback = '';
        _this.methods = {
            togglePwd: function () {
                this.passwordVisible = !this.passwordVisible;
            },
            show: function (price, callback) {
                this.price = parseFloat(price).toFixed(2);
                this.show = true;
                if (callback) {
                    this.callback = callback;
                }
            },
            close: function () {
                this.price = 0;
                this.show = false;
                this.password = '';
            },
            onChange: function (evt) {
                this.password = ramda_1.trim(evt.detail);
            },
            validatePwd: function () {
                var _this = this;
                if (!this.subStatus) {
                    toast_1.default.fail({
                        message: '不可重复提交',
                        zIndex: 9999999
                    });
                    return;
                }
                //按钮置为不可用
                this.subStatus = false;
                if (this.password) {
                    toast_1.default.loading({
                        message: '密码校验中...',
                        forbidClick: true,
                        duration: 0,
                        zIndex: 9999999
                    });
                    request_1.request({
                        api: 'checkPayPwd.nd',
                        method: 'POST',
                        data: { payPwd: this.password },
                        callback: function (res) {
                            toast_1.default.clear();
                            var _a = res.data, code = _a.code, msg = _a.msg;
                            if (code == 0) {
                                _this.price = 0;
                                _this.show = false;
                                _this.password = '';
                                _this.$apply();
                                _this.callback();
                            }
                            else {
                                toast_1.default.fail({
                                    message: msg || '密码错误',
                                    zIndex: 9999999
                                });
                            }
                            //按钮置为可用
                            _this.subStatus = true;
                        },
                    });
                }
                else {
                    toast_1.default('请输入密码');
                }
            },
        };
        return _this;
    }
    return PayConfirm;
}(wepy_1.default.component));
exports.default = PayConfirm;
