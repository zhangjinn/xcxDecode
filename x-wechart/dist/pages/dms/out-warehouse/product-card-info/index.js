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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
            orderItem: {
                type: Object,
                default: function () {
                    return {};
                },
            },
        };
        _this.data = {};
        // 页面内交互写在methods里
        _this.methods = {
        // onSwitch: (item) => {
        //   this.$emit('onSwitch', item)
        // },
        };
        return _this;
    }
    return default_1;
}(wepy_1.default.component));
exports.default = default_1;
