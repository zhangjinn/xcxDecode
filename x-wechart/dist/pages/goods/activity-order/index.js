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
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var order_1 = require('./../../../store/actions/order.js');
var request_1 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/order/index.js');
var index_zhuandan_1 = require('./../../components/order/index-zhuandan.js');
var index_hx_1 = require('./../../components/order/index-hx.js');
var index_2 = require('./../../../components/pay-confirm/index.js');
var index_3 = require('./../../../components/pay-capacity-confirm/index.js');
/* import utilsWxs from '../../../wxs/utils.wxs' */
var index_4 = require('./../../../utils/index.js');
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
                'van-stepper': '../../../components/vant/stepper/index'
            }
        };
        _this.type = 'common';
        _this.$repeat = {};
        _this.$props = { "order": { "orgName": "orgName" }, "order2": { "orgName": "orgName" }, "order3": { "orgName": "orgName" } };
        _this.$events = {};
        _this.components = {
            order: index_1.default,
            order2: index_hx_1.default,
            order3: index_zhuandan_1.default,
            payconfrim: index_2.default,
            payCapacityConfirm: index_3.default
        };
        _this.attrActionType = '';
        _this.data = {
            showPolicyMore: false,
            rebateCheckBox: true,
            prdIds: '',
            buyNums: '',
            userActId: '',
            payName: '提交订单',
            payStatus: true,
            payMethods: 'confirmSaveOrder',
            orderType: '',
            prdQty: null,
            tgQty: null,
            packageNum: 1,
            orgDict: {},
            orgList: [],
            orgId: '',
            orgName: '',
            orgSelShow: false,
        };
        /*  wxs =  */ /* {
           utils: utilsWxs
         } */
        _this.methods = {
            openSelShow: function () {
                _this.orgSelShow = true;
            },
            closeOrgSel: function () {
                _this.orgSelShow = false;
            },
            // 改变组织
            chooseOrg: function (code, orgName) {
                _this.orgId = code;
                _this.orgName = orgName;
                var buyNums = _this.buyNums.split(',').map(function (it) { return it * _this.packageNum; }).join(',');
                if (_this.order.discountTypeName == '组合购') {
                    buyNums = _this.buyNums.split(',').map(function () { return 0; }).join(',');
                }
                _this.methods.takeActivityOrder({
                    prdIds: _this.prdIds,
                    buyNums: buyNums,
                    orgId: _this.orgId,
                    _loading: true
                }).then(function (res) {
                    if (res && res.payload && res.payload.code === 1) {
                        toast_1.default.fail({
                            message: res.payload.msg || '当前订单失效',
                            duration: 3000,
                            onClose: function () {
                                wx.navigateBack();
                            }
                        });
                    }
                });
                _this.orgSelShow = false;
            },
            // // 直降、后返步进器改变时触发
            // onPackageNumChange: (evt) => {
            //   const { detail } = evt
            //   this.packageNum = detail
            //   let totalMoney = 0
            //   let totalNum = 0
            //   for (const key in this.order.items) {
            //     let deposit = this.order.items[key].price
            //     let quantity = this.order.items[key].quantity
            //     totalMoney += deposit * detail * quantity
            //     totalNum += detail * quantity
            //   }
            //   // totalMoney
            //   // totalNum
            //   this.order.totalMoney = totalMoney
            //   this.order.totalNum = totalNum
            //   this.$apply()
            // },
            invokeOrderGetParams: function () {
                if (_this.orderType == 'activity') {
                    return _this.$invoke('order3', 'getParams');
                }
                else if (_this.orderType == 'rengou') {
                    return _this.$invoke('order', 'getParams');
                }
                else {
                    return _this.$invoke('order2', 'getParams');
                }
            },
            invokeOrderCheckParams: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.orderType == 'activity')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.$invoke('order3', 'checkParams')];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            if (!(this.orderType == 'rengou')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.$invoke('order', 'checkParams')];
                        case 3: return [2 /*return*/, _a.sent()];
                        case 4: return [4 /*yield*/, this.$invoke('order2', 'checkParams')];
                        case 5: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            togglePolicy: function () {
                this.showPolicyMore = !this.showPolicyMore;
            },
            onBateChange: function () {
                this.rebateCheckBox = !this.rebateCheckBox;
            },
            onPayChange: function () {
                this.payStatus = !this.payStatus;
                this.payName = this.payStatus ? '提交订单' : '支付';
                this.payMethods = this.payStatus ? 'confirmSaveOrder' : 'confirmWxPay';
                this.$apply();
            },
            // 余额付款
            confirmSaveOrder: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, totalMoney, canUseMoney, rebate, data, isValidate, totalMoney_1;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (this.order.items[0].discountTypeId == '90605' && !this.order.isPurchaseStandard) {
                                    toast_1.default('不符合组合购比例，请重新选择');
                                    return [2 /*return*/];
                                }
                                _a = this.order, totalMoney = _a.totalMoney, canUseMoney = _a.canUseMoney, rebate = _a.rebate;
                                if (this.rebateCheckBox) { //选中
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
                                data = this.methods.invokeOrderGetParams();
                                // 校验收货地址是否存在
                                if (!data.address1) {
                                    toast_1.default.fail('收货地址不能为空');
                                    return [2 /*return*/];
                                }
                                if (data.maxEndDate == undefined || data.endDate == undefined) {
                                    toast_1.default.fail('请选择有效日期');
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, this.methods.invokeOrderCheckParams()];
                            case 1:
                                isValidate = _b.sent();
                                if (isValidate) {
                                    totalMoney_1 = this.order.totalMoney;
                                    this.$invoke('payconfrim', 'show', totalMoney_1, function () {
                                        _this.saveOrder();
                                    });
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            },
            // 微信付款
            confirmWxPay: function () {
                if (this.order.items[0].discountTypeId == '90605' && !this.order.isPurchaseStandard) {
                    toast_1.default('不符合组合购比例，请重新选择');
                    return;
                }
                var data = this.methods.invokeOrderGetParams();
                //校验收货地址是否存在
                if (!data.address1) {
                    toast_1.default.fail('收货地址不能为空');
                    return;
                }
                if (data.maxEndDate == undefined || data.endDate == undefined) {
                    toast_1.default.fail('请选择有效日期');
                    return;
                }
                // 判断分销商是否具有三证合一的执照 先不做
                // const {marketModels} = this.mixinCurrentUser
                // if (marketModels && marketModels.includes('17451')) {
                //   let capacity = true;
                //   // 判断是否有三证合一的资格
                //   if (capacity) {
                //     this.$invoke('payCapacityConfirm', 'show', (str: string) => {
                //       if (str === 'save') {
                //         //调用保存订单的接口
                //       }
                //     })
                //   }
                // }
                this.wxPay();
            },
            // 直降、后返步进器加减赋值
            onShippedBqtyChg: function (evt) {
                var detail = evt.detail;
                this.prdQty = detail;
                var totalMoney = 0;
                for (var key in this.order.items) {
                    var price = this.order.items[key].price;
                    totalMoney += price * this.prdQty;
                }
                this.order.items[0].quantity = detail;
                this.order.totalMoney = totalMoney;
                this.order.totalNum = this.prdQty;
                this.$apply();
            },
            //促销方式-》套购-》数量变化（套购步进器加减赋值）
            onStepTg: function (evt) {
                var detail = evt.detail;
                this.tgQty = detail;
                var totalMoney = 0;
                var totalNum = 0;
                for (var key in this.order.items) {
                    var price = this.order.items[key].price * this.order.items[key].packageNum;
                    //总金额
                    totalMoney += price * this.tgQty;
                    //总数量
                    totalNum += this.tgQty * this.order.items[key].packageNum;
                }
                this.order.items[0].defaultNum = detail;
                this.order.totalMoney = totalMoney;
                this.order.totalNum = totalNum;
                this.$apply();
            },
            // 组合购步进器加减赋值
            onCombinationPurchaseNumChange: function (e) {
                var _a = e.currentTarget.dataset, seriesindex = _a.seriesindex, itemindex = _a.itemindex;
                this.order.items[seriesindex].child[itemindex].quantity = Number(e.detail);
                var totalMoney = 0; // 所有组单价总和
                var totalNum = 0; // 所有组购买总数之和
                var totleBuyNum = 0; // 每组购买总数
                this.order.items[seriesindex].child.forEach(function (item) {
                    totleBuyNum += item.quantity;
                });
                this.order.items[seriesindex].totleBuyNum = totleBuyNum;
                this.order.items.forEach(function (item) {
                    totalNum += item.totleBuyNum;
                    item.child.forEach(function (i) {
                        totalMoney += i.price * i.quantity;
                    });
                });
                this.order.totalMoney = totalMoney;
                this.order.totalNum = totalNum;
                this.order.isPurchaseStandard = index_4.checkCombinationPurchase(this.order.items);
            },
            // 组合购型号展开收起
            productFold: function (seriesindex) {
                this.order.items[seriesindex].isFold = !this.order.items[seriesindex].isFold;
            },
            // 组合购切换型号
            changeModel: function (e) {
                var _a = e.currentTarget.dataset, seriesindex = _a.seriesindex, itemindex = _a.itemindex;
                this.order.items[seriesindex].child.map(function (item) {
                    item.isActive = false;
                    return item;
                });
                this.order.items[seriesindex].child[itemindex].isActive = true;
                this.order.items[seriesindex] = __assign({}, this.order.items[seriesindex], this.order.items[seriesindex].child[itemindex]);
            },
        };
        return _this;
    }
    // 下单时获取数量、认购id
    OrderCommon.prototype.getOrderParameters = function () {
        var qty;
        var userActId = this.userActId;
        if (this.order.items[0].discountTypeId == '90603') { //套购
            qty = [];
            for (var _i = 0, _a = this.order.items; _i < _a.length; _i++) {
                var item = _a[_i];
                qty.push(item.packageNum * this.order.items[0].defaultNum);
            }
            qty = qty.join(',');
        }
        else if (this.order.items[0].discountTypeId == '90605') { // 组合购
            qty = [];
            userActId = [];
            this.order.items.forEach(function (item) {
                item.child.forEach(function (i) {
                    qty.push(i.quantity);
                    userActId.push(i.id);
                });
            });
            qty = qty.join(',');
            userActId = userActId.join(',');
        }
        else {
            //非套购
            qty = this.prdQty ? this.prdQty : this.order.items[0].quantity;
        }
        return {
            qty: qty,
            userActId: userActId
        };
    };
    // 微信支付
    OrderCommon.prototype.wxPay = function () {
        var openId = wepy_1.default.$instance.globalData.openid;
        if (!openId) {
            wx.login({
                success: function (wxRes) {
                    if (wxRes.code) {
                        request_1.request({
                            api: "queryCodeInfo.nd?code=" + wxRes.code,
                            callback: function (res) {
                                var openid = res.data.openid;
                                if (openid) {
                                    openId = openid;
                                }
                                else {
                                    toast_1.default.fail('获取code失败');
                                }
                            }
                        });
                    }
                },
                fail: function () {
                    toast_1.default.fail('获取code失败');
                }
            });
        }
        var data = this.methods.invokeOrderGetParams();
        var item = {};
        data.orderRebate = this.rebateCheckBox ? 'Y' : 'N';
        toast_1.default.loading({
            forbidClick: true,
            message: '订单处理中',
            duration: 0
        });
        var api = 'marketActivity/saveOrder.nd';
        if (this.userActId != '') {
            api = 'marketActivity/actToOrder.nd';
            var qty = this.getOrderParameters().qty;
            var userActId = this.getOrderParameters().userActId;
            item = __assign({}, data, { userActId: userActId, actCode: this.order.actCode, payType: 'WX', orgId: this.orgId, openId: openId,
                qty: qty //下单数量
             });
        }
        else {
            var prdIds = this.prdIds;
            var buyNums = this.buyNums;
            if (this.order.discountTypeName == '组合购') {
                var oPrdIds_1 = [];
                var oBuyNums_1 = [];
                this.order.items.forEach(function (item) {
                    item.child.forEach(function (i) {
                        if (i.quantity > 0) {
                            oPrdIds_1.push(i.id);
                            oBuyNums_1.push(i.quantity);
                        }
                    });
                });
                prdIds = oPrdIds_1.toString();
                buyNums = oBuyNums_1.toString();
            }
            item = __assign({}, data, { prdIds: prdIds,
                buyNums: buyNums, actCode: this.order.actCode, payType: 'WX', orgId: this.orgId, openId: openId });
        }
        request_1.request({
            api: api,
            method: 'POST',
            data: item,
            callback: function (res) {
                toast_1.default.clear();
                var data = res.data;
                if (data && data.msg == 'success' && data.code == 0) {
                    var _a = data.payInfo, timeStamp = _a.timeStamp, nonceStr = _a.nonceStr, paySign = _a.paySign, signType = _a.signType;
                    wx.requestPayment({
                        timeStamp: timeStamp.toString(),
                        nonceStr: nonceStr,
                        package: data.payInfo.package,
                        signType: signType,
                        paySign: paySign,
                        success: function () {
                            wx.navigateTo({
                                url: "/pages/goods/order-result/index?type=success&orderNum=" + data.b2bOrderCode + "&activity=order"
                            });
                        },
                        fail: function () {
                            var errMsg = '订单支付失败';
                            wx.navigateTo({
                                url: "/pages/goods/order-result/index?&activity=order&type=fail&errorMsg=" + (errMsg || res.data.error || '系统错误')
                            });
                        }
                    });
                }
                else {
                    wx.navigateTo({
                        url: "/pages/goods/order-result/index?&activity=order&type=fail&errorMsg=" + (data.msg || data.error || '系统错误')
                    });
                }
            }
        });
    };
    // 余额付款
    OrderCommon.prototype.saveOrder = function () {
        var _this = this;
        var data = this.methods.invokeOrderGetParams();
        var item = {};
        data.orderRebate = this.rebateCheckBox ? 'Y' : 'N';
        toast_1.default.loading({
            forbidClick: true,
            message: '订单处理中',
            duration: 0
        });
        var api = 'marketActivity/saveOrder.nd';
        if (this.userActId != '') {
            api = 'marketActivity/actToOrder.nd';
            var qty = this.getOrderParameters().qty;
            var userActId = this.getOrderParameters().userActId;
            item = __assign({}, data, { userActId: userActId, actCode: this.order.actCode, qty: qty //下单数量
             });
        }
        else {
            var buyNums = this.buyNums.split(',').map(function (it) { return it * _this.packageNum; }).join(',');
            var prdIds = this.prdIds;
            if (this.order.items[0].discountTypeId == '90605') {
                var oPrdIds_2 = [];
                var oBuyNums_2 = [];
                this.order.items.forEach(function (item) {
                    item.child.forEach(function (i) {
                        if (i.quantity > 0) {
                            oPrdIds_2.push(i.id);
                            oBuyNums_2.push(i.quantity);
                        }
                    });
                });
                prdIds = oPrdIds_2.toString();
                buyNums = oBuyNums_2.toString();
            }
            if (this.order.items[0].discountTypeId == '90603') {
                var oPrdIds_3 = [];
                var oBuyNums_3 = [];
                this.order.items.forEach(function (item) {
                    oPrdIds_3.push(item.id);
                    oBuyNums_3.push(item.packageNum * _this.order.items[0].defaultNum);
                });
                prdIds = oPrdIds_3.toString();
                buyNums = oBuyNums_3.toString();
            }
            item = __assign({}, data, { prdIds: prdIds,
                buyNums: buyNums, orgId: this.orgId, actCode: this.order.actCode });
        }
        request_1.request({
            api: api,
            method: 'POST',
            data: item,
            callback: function (res) {
                toast_1.default.clear();
                if (res.data && res.data.b2bOrderCode) {
                    wx.navigateTo({
                        url: "/pages/goods/order-result/index?type=success&orderNum=" + res.data.b2bOrderCode + "&activity=order"
                    });
                }
                else {
                    wx.navigateTo({
                        url: "/pages/goods/order-result/index?&activity=order&type=fail&errorMsg=" + (res.data.msg || res.data.error || '系统错误')
                    });
                }
            }
        });
    };
    OrderCommon.prototype.onLoad = function (_a) {
        var _this = this;
        var prdIds = _a.prdIds, buyNums = _a.buyNums, userActId = _a.userActId, type = _a.type, orgDict = _a.orgDict;
        if (orgDict) {
            try {
                this.orgDict = JSON.parse(orgDict);
                this.orgList = [];
                for (var it in this.orgDict) {
                    this.orgList = this.orgDict[it];
                }
            }
            catch (_b) {
                this.orgDict = {};
                this.orgList = [];
            }
        }
        if (this.orgList[0]) {
            this.orgId = this.orgList[0].code;
            this.orgName = this.orgList[0].name;
        }
        if (prdIds && buyNums) {
            this.prdIds = prdIds;
            this.buyNums = buyNums;
            this.$apply();
            // 活动列表》抢购下单
            this.methods.takeActivityOrder({
                prdIds: prdIds,
                buyNums: buyNums,
                orgId: this.orgId,
                _loading: true
            }).then(function (res) {
                if (res && res.payload && res.payload.code === 1) {
                    toast_1.default.fail({
                        message: res.payload.msg || '当前订单失效',
                        duration: 3000,
                        onClose: function () {
                            wx.navigateBack();
                        }
                    });
                }
                _this.$apply();
            });
        }
        else if (userActId) {
            this.userActId = userActId;
            this.$apply();
            // 我的抢单》代理商下单
            this.methods.takeActivitySnapped({
                userActId: userActId,
                _loading: true
            }).then(function (res) {
                if (res && res.payload && res.payload.code === 1) {
                    toast_1.default.fail({
                        message: res.payload.msg || '当前订单失效',
                        duration: 3000,
                        onClose: function () {
                            wx.navigateBack();
                        }
                    });
                }
            });
        }
        if (type && type == 'rengou') {
            wx.setNavigationBarTitle({
                title: '确认认购'
            });
            this.orderType = 'rengou';
        }
        else if (type && type == 'activity') {
            wx.setNavigationBarTitle({
                title: '确认订单'
            });
            this.orderType = 'activity';
        }
        else {
            wx.setNavigationBarTitle({
                title: '海信采购去下单'
            });
            this.orderType = '';
        }
        this.$apply();
    };
    OrderCommon = __decorate([
        wepy_redux_1.connect({
            order: function (_a) {
                var order = _a.order;
                return order.commonOrder;
            },
            mixinCurrentUser: function (_a) {
                var user = _a.user;
                return user.info || {};
            }
        }, {
            takeActivityOrder: order_1.takeActivityOrder,
            takeActivitySnapped: order_1.takeActivitySnapped
        })
    ], OrderCommon);
    return OrderCommon;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(OrderCommon , 'pages/goods/activity-order/index'));

