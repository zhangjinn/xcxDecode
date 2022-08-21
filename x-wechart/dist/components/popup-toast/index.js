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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../npm/wepy-redux/lib/index.js');
var PopupToast = /** @class */ (function (_super) {
    __extends(PopupToast, _super);
    function PopupToast() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
            title: String
        };
        _this.methods = {
            errorBeSure: function () {
                _this.loading.popup.show = false;
            },
        };
        return _this;
    }
    PopupToast.prototype.onUnload = function () {
        this.loading.popup.show = false;
    };
    PopupToast = __decorate([
        wepy_redux_1.connect({
            loading: function (_a) {
                var loading = _a.loading;
                return loading;
            },
        })
    ], PopupToast);
    return PopupToast;
}(wepy_1.default.component));
exports.default = PopupToast;
