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
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var Protocol = /** @class */ (function (_super) {
    __extends(Protocol, _super);
    function Protocol() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '协议授权',
        };
        _this.timerEl = 0;
        _this.data = {
            timer: 5,
        };
        _this.methods = {
            getNext: function () {
                if (this.timer === 0) {
                    wx.navigateTo({
                        url: '/pages/auth/confirm/index',
                    });
                }
            },
        };
        return _this;
    }
    Protocol.prototype.startTimer = function () {
        var _this = this;
        this.timerEl = setInterval(function () {
            _this.timer = ramda_1.subtract(_this.timer, 1);
            if (_this.timer === 0) {
                clearInterval(_this.timerEl);
            }
            _this.$apply();
        }, 1000);
    };
    Protocol.prototype.onUnload = function () {
        if (this.timerEl) {
            clearInterval(this.timerEl);
        }
    };
    Protocol.prototype.onLoad = function () {
        this.startTimer();
    };
    return Protocol;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Protocol , 'pages/auth/protocol/index'));

