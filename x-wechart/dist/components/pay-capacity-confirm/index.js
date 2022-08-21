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
var PayCapacityConfirm = /** @class */ (function (_super) {
    __extends(PayCapacityConfirm, _super);
    function PayCapacityConfirm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {
            show: false
        };
        _this.callback = '';
        _this.methods = {
            show: function (callback) {
                this.show = true;
                if (callback) {
                    this.callback = callback;
                }
            },
            close: function () {
                this.show = false;
            },
            onBind: function (str) {
                if (str === 'cancel') {
                    this.show = false;
                }
                else {
                    this.callback(str);
                }
            }
        };
        return _this;
    }
    return PayCapacityConfirm;
}(wepy_1.default.component));
exports.default = PayCapacityConfirm;
