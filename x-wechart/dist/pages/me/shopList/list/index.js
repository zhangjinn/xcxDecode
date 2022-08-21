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
            navigationBarTitleText: '管辖门店',
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
            tipVisible: false,
            tipMessage: '',
            updatePasswordVisible: false,
            adminAccount: {},
            custAccountList: [],
            loginSystemList: [],
            baseMatklList: [],
            accountNames: [],
            shopList: [],
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
                                this.getAccountList();
                                return [2 /*return*/];
                        }
                    });
                });
            },
            onEditPassword: function (account) {
                account.loginSystemMatklsMapJson = JSON.parse(account.loginSystemMatklsMap);
                stores.dispatch({ type: account_1.SET_ACCOUNT_EDIT_ONE, payload: { account: account } });
                wx.navigateTo({ url: '/pages/me/shopList/edit-password/index' });
            },
            onEditAccount: function (account) {
                account.loginSystemMatklsMapJson = JSON.parse(account.loginSystemMatklsMap);
                stores.dispatch({ type: account_1.SET_ACCOUNT_EDIT_ONE, payload: { account: account } });
                wx.navigateTo({ url: '/pages/me/shopList/edit-account/index' });
            },
            onAddAccount: function () {
                var accountArray = this.accountNames.sort();
                var account = accountArray[accountArray.length - 1];
                if (account.length == 7) {
                    account = Number(account + "01");
                }
                else {
                    account = Number(account) + 1;
                }
                stores.dispatch({ type: account_1.SET_ACCOUNT_EDIT_ONE, payload: { account: { custAccountId: this.mixinCurrentUser.id, account: account } } });
                wx.navigateTo({ url: '/pages/me/shopList/add-account/index' });
            }
        };
        return _this;
    }
    Filter.prototype.getAccountList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, adminAccount, custAccountList, loginSystemList, baseMatklList, accountNames, shopList, custShopInfoList, custShopList;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        toast_1.default.loading({
                            message: '正在加载',
                            duration: 0
                        });
                        data = {
                            businessFlag: 1
                        };
                        return [4 /*yield*/, request_1.request({ api: '/customer/customerAccount.nd', data: data })];
                    case 1:
                        _a = _b.sent(), adminAccount = _a.adminAccount, custAccountList = _a.custAccountList, loginSystemList = _a.loginSystemList, baseMatklList = _a.baseMatklList, accountNames = _a.accountNames, shopList = _a.shopList, custShopInfoList = _a.custShopInfoList;
                        if (adminAccount && adminAccount.loginSystem) {
                            adminAccount.loginSystemList = adminAccount.loginSystem ? adminAccount.loginSystem.split(',') : [];
                            adminAccount.loginSystemNameList = adminAccount.loginSystem_name ? adminAccount.loginSystem_name.split(',') : [];
                        }
                        if (custAccountList && custAccountList.length) {
                            custAccountList.forEach(function (item) {
                                item.loginSystemList = item.loginSystem ? item.loginSystem.split(',') : [];
                                item.loginSystemNameList = item.loginSystem_name ? item.loginSystem_name.split(',') : [];
                            });
                        }
                        this.adminAccount = adminAccount;
                        this.custAccountList = custAccountList;
                        this.loginSystemList = loginSystemList;
                        this.baseMatklList = baseMatklList;
                        this.shopList = shopList;
                        custShopList = custShopInfoList.map(function (item) {
                            return { code: item.id, name: item.fullName };
                        });
                        this.accountNames = accountNames.split(',').filter(function (item) { return item && item !== 'null' && item !== 'undefined'; }) || [0];
                        stores.dispatch({ type: 'SET_ACCOUNT_LOGIN_SYSTEM_AND_BASE_MATKL', payload: { loginSystemList: loginSystemList, baseMatklList: baseMatklList, shopList: shopList, custShopList: custShopList } });
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

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/me/shopList/list/index'));

