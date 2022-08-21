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
var echarts = require('./../ec-canvas/echarts@4.9.0.js');
var chart;
var ecComponent;
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.config = {
            usingComponents: {
                'ec-canvas': '../ec-canvas/ec-canvas'
            }
        };
        _this_1.props = { option: Object, height: String, width: String, canvasId: String };
        _this_1.data = {
            ec: {
                lazyLoad: true
            }
        };
        _this_1.watch = {
            option: function (newVal, oldVal) {
                if (newVal) {
                    console.log('aaa' + this.canvasId);
                    ecComponent = this.$wxpage.selectComponent('#' + this.canvasId);
                    if (!ecComponent) {
                        return;
                    }
                    ecComponent.init(this.initChart(this));
                }
            }
        };
        _this_1.methods = {};
        return _this_1;
    }
    default_1.prototype.onLoad = function () { };
    default_1.prototype.initChart = function (_this) {
        return function (canvas, width, height) {
            var option = _this.option;
            width = parseFloat(_this.width) || wx.getSystemInfoSync().windowWidth - 20;
            height = parseFloat(_this.height) || wx.getSystemInfoSync().windowHeight / 2;
            chart = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            canvas.setChart(chart);
            chart.setOption(option);
            return chart;
        };
    };
    return default_1;
}(wepy_1.default.component));
exports.default = default_1;
