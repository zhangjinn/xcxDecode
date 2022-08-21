"use strict";
/**
 * 通用处理逻辑
 * 获取系统通用信息
 */
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
var wepy_1 = require('./../npm/wepy/lib/wepy.js');
var index_1 = require('./../utils/index.js');
var SystemMixins = /** @class */ (function (_super) {
    __extends(SystemMixins, _super);
    function SystemMixins() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {
            sys: null,
        };
        return _this;
    }
    SystemMixins.prototype.onLoad = function () {
        var _this = this;
        index_1.getSystemInfo().then(function (res) {
            _this.sys = res;
            _this.$apply();
        });
    };
    return SystemMixins;
}(wepy_1.default.mixin));
exports.default = SystemMixins;
