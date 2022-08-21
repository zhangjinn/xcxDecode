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
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
            translateX: {
                type: String || Number,
                default: 0,
            },
            bgColorOut: {
                type: String,
                default: 'rgba(255, 255, 255, 0.35)',
            },
            bgColorInner: {
                type: String,
                default: 'rgba(204, 204, 204, 0.88)',
            },
            isAnimationDelay: {
                type: Boolean,
                default: true,
            }
        };
        return _this;
    }
    return Header;
}(wepy_1.default.component));
exports.default = Header;
