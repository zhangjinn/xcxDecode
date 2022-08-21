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
var system_1 = require('./../../mixins/system.js');
var width = wx.getMenuButtonBoundingClientRect().width;
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {
            type: 'info',
            menuWidth: width,
        };
        _this.mixins = [system_1.default];
        _this.events = {
            'index-broadcast': function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var $event = args[args.length - 1];
            }
        };
        _this.methods = {
            tap: function () {
                // this.num = this.num + 1
            },
            add: function () {
                var len = this.list.length;
                this.list.push({ id: len + 1, title: 'title_' + len });
            },
        };
        return _this;
    }
    return Header;
}(wepy_1.default.component));
exports.default = Header;
