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
var wepy_1 = require('./../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../npm/wepy-redux/lib/index.js');
var dmsorder_1 = require('./../store/types/dmsorder.js');
// 离开时清空store选中的数据
var ChannelRetailMixin = /** @class */ (function (_super) {
    __extends(ChannelRetailMixin, _super);
    function ChannelRetailMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //
    ChannelRetailMixin.prototype.onUnload = function () {
        var store = wepy_redux_1.getStore();
        store.dispatch({
            type: dmsorder_1.DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
        });
    };
    return ChannelRetailMixin;
}(wepy_1.default.mixin));
exports.default = ChannelRetailMixin;
