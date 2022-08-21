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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var account_1 = require('./../../../../store/types/account.js');
var request_1 = require('./../../../../utils/request.js');
var common_1 = require('./../../../../mixins/common.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var stores = wepy_redux_1.getStore();
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '账号管理',
            usingComponents: {
                'van-button': '../../../../components/vant/button/index',
                'van-popup': '../../../../components/vant/popup/index',
                "van-toast": "../../../../components/vant/toast/index",
                'van-cell-group': '../../../../components/vant/cell-group/index',
                'van-field': '../../../../components/vant/field/index',
            },
        };
        _this.mixins = [common_1.default];
        _this.data = {
            scrollTop: -1,
            tipVisible: false,
            tipMessage: '',
            updatePasswordVisible: false,
            custAccountList: [],
            totalPages: 0,
            page: {
                pageNo: 1,
                pageSize: 10,
            },
        };
        // 页面内交互写在methods里
        _this.methods = {
            onToggleTipVisible: function () {
                this.toggleTipVisible();
            },
            onUpdateStatus: function (account) {
                return __awaiter(this, void 0, void 0, function () {
                    var id, status, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.tipMessage = '';
                                id = account.id, status = account.status;
                                return [4 /*yield*/, request_1.request({ api: '/customer/updateStatus.nd', method: 'POST', data: { id: id, status: status === 'active' ? 'inActive' : 'active' }, })];
                            case 1:
                                result = _a.sent();
                                this.toggleTipVisible();
                                this.page = __assign({}, this.page, { pageNo: 1 });
                                this.getAccountList();
                                return [2 /*return*/];
                        }
                    });
                });
            },
            onResetPassword: function (account) {
                return __awaiter(this, void 0, void 0, function () {
                    var id, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                id = account.id;
                                return [4 /*yield*/, request_1.request({ api: '/customer/resetPassword.nd', method: 'POST', data: { id: id }, })];
                            case 1:
                                result = _a.sent();
                                if (result === 'success_byEmail') {
                                    this.tipMessage = '操作成功，密码已经发送至该账号设置的邮箱中！';
                                }
                                else {
                                    this.tipMessage = 'result';
                                }
                                this.toggleTipVisible();
                                this.page = __assign({}, this.page, { pageNo: 1 });
                                this.getAccountList();
                                return [2 /*return*/];
                        }
                    });
                });
            },
            onEditPassword: function (account) {
                account.loginSystemMatklsMapJson = JSON.parse(account.loginSystemMatklsMap);
                stores.dispatch({ type: account_1.SET_ACCOUNT_EDIT_ONE, payload: { account: account } });
                wx.navigateTo({ url: '/pages/me/account/edit-password/index' });
            },
            onEditAccount: function (account) {
                account.loginSystemMatklsMapJson = JSON.parse(account.loginSystemMatklsMap);
                if (account.businessFlag == '1') {
                    wx.showModal({
                        title: '温馨提示',
                        content: '该账号岗位包含营销经理，涉及业务档案内容，请到PC端进行操作。',
                        confirmText: '我知道了',
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定');
                            }
                        }
                    });
                    return;
                }
                stores.dispatch({ type: account_1.SET_ACCOUNT_EDIT_ONE, payload: { account: account } });
                wx.navigateTo({ url: '/pages/me/account/edit-account/index' });
            },
            onAddAccount: function (item) {
                return __awaiter(this, void 0, void 0, function () {
                    var account;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request_1.request({ api: '/customer/getAccount.nd' })];
                            case 1:
                                account = (_a.sent()).account;
                                stores.dispatch({ type: account_1.SET_ACCOUNT_EDIT_ONE, payload: { account: { custAccountId: this.mixinCurrentUser.id, account: account } } });
                                wx.navigateTo({ url: '/pages/me/account/add-account/index' });
                                return [2 /*return*/];
                        }
                    });
                });
            },
            // 回到顶部
            scrollToTop: function () {
                _this.scrollTop = 0;
            },
            // 滚动列表
            onScroll: function (event) {
                if (_this.scrollTop === 0) {
                    _this.scrollTop = event.detail.scrollTop;
                }
            },
            // 列表分页
            onGetOrderListNext: function () {
                if (this.totalPages > this.page.pageNo) {
                    this.page = __assign({}, this.page, { pageNo: this.page.pageNo + 1 });
                    this.getAccountList();
                }
            },
        };
        return _this;
    }
    Filter.prototype.getAccountList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var customer, param, list, custAccountList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toast_1.default.loading({
                            message: '正在加载',
                            duration: 0
                        });
                        customer = JSON.parse(wx.getStorageSync('b2b_token')).customer;
                        param = {
                            custId: customer && customer.id,
                            orderBy: 't.type asc,t.account asc',
                            pageNo: this.page.pageNo,
                            pageSize: this.page.pageSize,
                        };
                        return [4 /*yield*/, request_1.request({ api: 'fast/user/accountList/page.nd', data: param })];
                    case 1:
                        list = _a.sent();
                        this.totalPages = list.totalPages;
                        custAccountList = list.list;
                        if (custAccountList && custAccountList.length) {
                            custAccountList.forEach(function (item) {
                                item.loginSystemList = item.loginSystem ? item.loginSystem.split(',') : [];
                                item.loginSystemNameList = item.loginSystem_name ? item.loginSystem_name.split(',') : [];
                            });
                        }
                        if (this.page.pageNo > 1) {
                            this.custAccountList = this.custAccountList.concat(custAccountList);
                        }
                        else {
                            this.custAccountList = custAccountList;
                        }
                        toast_1.default.clear();
                        this.$apply();
                        return [2 /*return*/];
                }
            });
        });
    };
    Filter.prototype.toggleTipVisible = function () {
        this.tipVisible = !this.tipVisible;
    };
    Filter.prototype.onShow = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.page = __assign({}, this.page, { pageNo: 1 });
                this.getAccountList();
                return [2 /*return*/];
            });
        });
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            mixinCurrentUser: function (_a) {
                var user = _a.user;
                return user.info || {};
            }
        }, {})
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/me/account/list/index'));

