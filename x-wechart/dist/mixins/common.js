"use strict";
/**
 * 通用处理逻辑
 * 路由跳转: 是否登录
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../npm/wepy/lib/wepy.js');
var ramda_1 = require('./../npm/ramda/src/index.js');
var index_1 = require('./../utils/index.js');
var wepy_redux_1 = require('./../npm/wepy-redux/lib/index.js');
var CommonMixin = /** @class */ (function (_super) {
    __extends(CommonMixin, _super);
    function CommonMixin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {
            loginStatus: false,
            mixin: 'This is common data.',
            customTabBarAllHeight: 52,
        };
        _this.methods = {};
        return _this;
    }
    CommonMixin.prototype.isLogin = function () {
        return !ramda_1.isEmpty(this.$parent.globalData.sessionId);
    };
    CommonMixin.prototype.navigator = function (_a) {
        var link = _a.link, _b = _a.auth, auth = _b === void 0 ? true : _b;
        if (auth) {
            if (this.$parent.globalData.sessionId) {
                wx.navigateTo(__assign({}, link));
            }
            else {
                wx.reLaunch({
                    url: '/pages/main/take/index',
                });
            }
        }
        else {
            wx.navigateTo(__assign({}, link));
        }
    };
    CommonMixin.prototype.clearLoginInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.$parent.globalData.sessionId = '';
                        this.$parent.globalData.ssoLoginToken = '';
                        this.$parent.globalData.unionid = '';
                        return [4 /*yield*/, index_1.removeStorage('b2b_token')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, index_1.removeStorage('b2b_permission_list')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, index_1.removeStorage('b2b_alert')];
                    case 3:
                        _a.sent();
                        wepy_redux_1.getStore().dispatch({ type: 'USER_LOGOUT_ACTION' });
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonMixin.prototype.getCustomTabBarAllHeight = function () {
        var systemInfo = wx.getSystemInfoSync();
        // 微信小程序配置tabBar之后会遮挡重要内容，而且不同机型如iPhoneX下面可能有一块空白，比较坑的是页面最底部空白也会显示页面，因此需要获取被遮挡的高度
        var screenHeight = systemInfo.screenHeight, bottom = systemInfo.safeArea.bottom;
        var oHeight = 52;
        if (screenHeight && bottom) {
            var safeBottom = screenHeight - bottom;
            oHeight = 52 + safeBottom; // 其中52是我们自定义tab栏的高度
        }
        return oHeight;
    };
    CommonMixin.prototype.onShow = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.loginStatus = this.isLogin();
                this.customTabBarAllHeight = this.getCustomTabBarAllHeight();
                this.$apply();
                return [2 /*return*/];
            });
        });
    };
    return CommonMixin;
}(wepy_1.default.mixin));
exports.default = CommonMixin;
