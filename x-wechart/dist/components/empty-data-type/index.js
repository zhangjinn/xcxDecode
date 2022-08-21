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
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
            description: {
                type: String,
                default: '',
            },
        };
        _this.externalClasses = ['custom-class']; // 外部传入class类
        _this.data = {
            imgObj: {
                emptyActivity: 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552691_234752c5bcf74f2c8293e1ab460b1c43.png',
            },
        };
        _this.computed = {
            descriptionText: function () {
                var desc = this.descriptionTextChange(this.description);
                return desc;
            },
        };
        return _this;
    }
    default_1.prototype.descriptionTextChange = function (description) {
        if (description) {
            if (description === '购物车') {
                return '您的购物车空空如也哦~';
            }
            return "\u6682\u65E0" + description + "\u54E6\uFF5E";
        }
        else {
            return '暂无数据哦~';
        }
    };
    return default_1;
}(wepy_1.default.component));
exports.default = default_1;
