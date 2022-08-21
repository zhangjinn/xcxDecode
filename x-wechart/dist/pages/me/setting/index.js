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
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var request_1 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var common_1 = require('./../../../mixins/common.js');
var index_1 = require('./../../../utils/index.js');
var stores = wepy_redux_1.getStore();
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '设置',
            usingComponents: {
                'van-cell': '../../../components/vant/cell/index',
                'van-button': '../../../components/vant/button/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
            },
        };
        _this.mixins = [common_1.default];
        _this.data = {
            bindAccountVisible: false,
        };
        // 页面内交互写在methods里
        _this.methods = {
            onUnbind: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request_1.request({ api: '/unBind.nd', method: 'POST' })];
                            case 1:
                                result = _a.sent();
                                if (!(result.code === 0)) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.clearLoginInfo()];
                            case 2:
                                _a.sent();
                                toast_1.default.success({
                                    message: '解绑账号成功',
                                    onClose: function () {
                                        wx.switchTab({ url: '/pages/main/me/index' });
                                    },
                                });
                                return [2 /*return*/];
                            case 3:
                                toast_1.default.fail(result.msg);
                                return [2 /*return*/];
                        }
                    });
                });
            },
            logout: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request_1.request({ api: '/logout.nd', method: 'POST' })];
                            case 1:
                                result = _a.sent();
                                if (!(result.code === 0)) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.clearLoginInfo()];
                            case 2:
                                _a.sent();
                                toast_1.default.success({
                                    message: '退出登录成功',
                                    onClose: function () {
                                        wx.switchTab({ url: '/pages/main/me/index' });
                                    },
                                });
                                return [2 /*return*/];
                            case 3:
                                toast_1.default.fail(result.msg);
                                return [2 /*return*/];
                        }
                    });
                });
            },
            toggleBindAccount: function () {
                this.bindAccountVisible = !this.bindAccountVisible;
            },
            chooseLoginType: function (type) {
                wx.navigateTo({
                    url: "/pages/me/bind-account/" + type + "/index",
                });
            },
            // 跳转到隐私政策
            goPrivacyPolicy: function () {
                var url = wepy_1.default.$appConfig.baseUrl + "/privacy";
                url = index_1.modifyUrl(url);
                var urlStr = encodeURIComponent(url);
                wx.navigateTo({ url: "/pages/me/webview/index?url=" + urlStr });
            },
            // 账户注销
            accountCancellation: function () {
                wx.navigateTo({
                    url: "/pages/me/account-cancellation/cancellation-application/index",
                });
            }
        };
        return _this;
    }
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/me/setting/index'));

