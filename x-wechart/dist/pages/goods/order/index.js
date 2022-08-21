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
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var order_1 = require('./../../../store/actions/order.js');
var request_1 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/order/index.js');
var index_2 = require('./../../../components/pay-confirm/index.js');
var OrderCommon = /** @class */ (function (_super) {
    __extends(OrderCommon, _super);
    function OrderCommon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '确认订单',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-button': '../../../components/vant/button/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-search': '../../../components/vant/search/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-field': '../../../components/vant/field/index',
                'van-checkbox': '../../../components/vant/checkbox/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'van-submit-bar': '../../../components/vant/submit-bar/index',
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
            },
        };
        _this.type = 'common';
        _this.components = {
            order: index_1.default,
            payconfrim: index_2.default,
        };
        _this.attrActionType = '';
        _this.data = {
            showPolicyMore: false,
            rebateCheckBox: true,
            weekShow: false,
            purchaseType: '',
            waitBalanceListShow: false,
            order: {},
            totalVolume: '0.00',
            isNoticePopupShow: false,
            expressFee: wepy_1.default.$instance.globalData.expressFee,
            inventoryPopupShow: false,
            inventoryPopupText: {
                desc: '',
                tip: ''
            },
        };
        _this.events = {
            'weekchange': function (payload) {
                console.log(payload);
                _this.order.balanceAccount = payload.balanceAccount;
                _this.order.waitMoney = payload.waitMoney;
                _this.order.canUseMoney = payload.canUseMoney;
            },
        };
        _this.methods = {
            //提示框
            noticePopupOpen: function () {
                _this.isNoticePopupShow = true;
            },
            noticePopupClose: function () {
                _this.isNoticePopupShow = false;
            },
            closeWaitBalancePop: function () {
                this.waitBalanceListShow = false;
            },
            togglePolicy: function () {
                this.showPolicyMore = !this.showPolicyMore;
            },
            onBateChange: function () {
                this.rebateCheckBox = !this.rebateCheckBox;
            },
            confirmSaveOrder: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, totalMoney, canUseMoney, rebate, balanceAccount, _b, purchaseType, isPujie, advancePayRate, isValidate, showtotalMoney, totalMoney_1;
                    var _this = this;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _a = this.order, totalMoney = _a.totalMoney, canUseMoney = _a.canUseMoney, rebate = _a.rebate, balanceAccount = _a.balanceAccount;
                                _b = this.orderCommon, purchaseType = _b.purchaseType, isPujie = _b.isPujie, advancePayRate = _b.advancePayRate;
                                if (!purchaseType) {
                                    toast_1.default('采购类型不能为空，请联系管理员');
                                    return [2 /*return*/];
                                }
                                //常规订单(非铺借商家)提交时，检查余额规则=账户可用余额-预交款＞＝0，才允许提交
                                if (purchaseType == 2 && !isPujie) {
                                    if (canUseMoney - totalMoney * advancePayRate / 100 < 0) {
                                        toast_1.default('账户余额不足');
                                        return [2 /*return*/];
                                    }
                                }
                                else {
                                    //应急订单或者常规订单（铺借商家）
                                    if (this.rebateCheckBox) {
                                        if (totalMoney > canUseMoney + rebate) {
                                            toast_1.default('账户余额不足');
                                            return [2 /*return*/];
                                        }
                                    }
                                    else {
                                        if (totalMoney > canUseMoney) {
                                            toast_1.default('账户余额不足');
                                            return [2 /*return*/];
                                        }
                                    }
                                }
                                return [4 /*yield*/, this.$invoke('order', 'checkParams')];
                            case 1:
                                isValidate = _c.sent();
                                if (isValidate) {
                                    showtotalMoney = 0;
                                    totalMoney_1 = this.order.totalMoney;
                                    showtotalMoney = totalMoney_1;
                                    // “常规订单”且商家类型不是“铺借商家”时，需要显示预交款
                                    if (purchaseType === '2' && isPujie == false) {
                                        showtotalMoney = totalMoney_1 * advancePayRate / 100;
                                    }
                                    this.$invoke('payconfrim', 'show', showtotalMoney, function () {
                                        _this.saveOrder();
                                    });
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            },
            /*查看预占用额度明细*/
            openWatiBalancePopup: function () {
                var _a = this.orderCommon, orgId = _a.orgId, matklId = _a.matklId, purchaseType = _a.purchaseType;
                var week = this.$invoke('order', 'getWeekName');
                //N+4(2020/08/24-2020/08/30)
                var name = week.name;
                //let weekName = name.split("/")[1]+''+name.split("/")[3];
                this.methods.getWaitBalanceInfoList({ orgId: orgId, matklId: matklId, weekName: name, purchaseType: purchaseType });
                this.waitBalanceListShow = true;
            },
            //删除政策
            delPolicy: function (item) {
                for (var key in this.order.items) {
                    if (item.specialPriceVcode === this.order.items[key].specialPriceVcode) {
                        this.order.items[key].policyName = '';
                        this.order.items[key].specialPriceVcode = '';
                        this.order.versions = '';
                    }
                }
            },
            // 关闭代理商 应急下单 关联库存周转对应流程调整提示弹框
            onInventoryConfirm: function () {
                this.inventoryPopupShow = false;
            }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    OrderCommon.prototype.saveOrder = function () {
        var _this = this;
        var data = this.$invoke('order', 'getParams');
        data.orderRebate = this.rebateCheckBox ? 'Y' : 'N';
        toast_1.default.loading({
            forbidClick: true,
            message: '订单处理中',
            duration: 0,
        });
        console.log(data);
        var api = 'cart/saveOrder.nd';
        if (this.type === 'again') {
            api = 'cart/saveAnotherOrder.nd';
            if (this.order.orderId) {
                data.orderId = this.order.orderId;
            }
            data.products = ramda_1.join(',', ramda_1.map(function (_a) {
                var productId = _a.productId;
                return productId;
            }, this.order.items));
            data.productNumbers = ramda_1.join(',', ramda_1.map(function (_a) {
                var quantity = _a.quantity;
                return quantity;
            }, this.order.items));
            data.versions = this.order.versions;
        }
        //订单类型
        data.purchaseType = this.purchaseType;
        request_1.request({
            api: api,
            method: 'POST',
            data: data,
            callback: function (res) {
                toast_1.default.clear();
                if (res.data && res.data.b2bOrderCode) {
                    wx.navigateTo({
                        url: "/pages/goods/order-result/index?type=success&orderNum=" + res.data.b2bOrderCode,
                    });
                }
                else {
                    if (res.data.frontMsg) {
                        if (res.data.frontMsg.msgDesc) {
                            _this.inventoryPopupText.desc = res.data.frontMsg.msgDesc.replace(/;/g, '\n').replace(/；/g, '\n');
                        }
                        if (res.data.frontMsg.tip) {
                            _this.inventoryPopupText.tip = res.data.frontMsg.tip;
                        }
                        _this.inventoryPopupShow = true;
                        _this.$apply();
                    }
                    else {
                        wx.navigateTo({
                            url: "/pages/goods/order-result/index?type=fail&errorMsg=" + (res.data.msg || res.data.error || '系统错误'),
                        });
                    }
                }
            },
        });
    };
    OrderCommon.prototype.onLoad = function (_a) {
        var type = _a.type, totalVolume = _a.totalVolume;
        // 订单列表: 普通单和再来一单
        if (type) {
            this.type = type;
        }
        this.totalVolume = totalVolume;
        var purchaseType = this.orderCommon.purchaseType;
        this.purchaseType = purchaseType;
    };
    OrderCommon = __decorate([
        wepy_redux_1.connect({
            order: function (_a) {
                var order = _a.order;
                return order.commonOrder;
            },
            orderCommon: function (_a) {
                var order = _a.order;
                return order.common;
            },
            waitBalanceList: function (_a) {
                var order = _a.order;
                return order.waitBalanceList;
            }
        }, {
            takeCommonOrder: order_1.takeCommonOrder,
            cartOrderWeek: order_1.cartOrderWeek,
            moneyByWeek: order_1.moneyByWeek,
            getWaitBalanceInfoList: order_1.getWaitBalanceInfoList
        })
    ], OrderCommon);
    return OrderCommon;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(OrderCommon , 'pages/goods/order/index'));

