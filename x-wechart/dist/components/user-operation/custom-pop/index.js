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
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var PayConfirm = /** @class */ (function (_super) {
    __extends(PayConfirm, _super);
    function PayConfirm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
            cancelText: {
                type: String,
                default: '我再想想'
            },
            confirmText: {
                type: String,
                default: '确定'
            },
        };
        _this.data = {
            popShow: false,
        };
        _this.callback = '';
        _this.methods = {
            showPopup: function () {
                _this.popShow = true;
            },
            hidePopup: function () {
                _this.popShow = false;
            },
            // 取消
            onCancel: function () {
                this.methods.hidePopup();
            },
            // 确定
            onConfirm: function () {
                this.$emit('onConfirm');
            },
        };
        return _this;
    }
    return PayConfirm;
}(wepy_1.default.component));
exports.default = PayConfirm;
