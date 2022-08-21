"use strict";
// 在主页面引入van-toast !!!
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
// productCode 商品id
// orgId 组织id
// orgCode 组织编码
//
// 跳转至商品详情: /goods/item/index?code={{id}}&orgId={{orgId}}&orgCode={{orgCode}}
// img  主图
// errImg 备用图
// orgName 组织名称
// inventory 库存数量
// loadingInventory 是否需要loading库存信息
// autoLoadingInventory 是否自动loading库存
// b2bName 商品名称
// importInfo 副标题 空会自动设成''
// price 价格
// loadingPrice 是否loading价格
// autoLoadingPrice 是否自动loading价格
// collection boolean 是否已经收藏
var component_1 = require('./../vant/common/component.js');
var request_1 = require('./../../utils/request.js');
var toast_1 = require('./../vant/toast/toast.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
// 自定义图片样式，传入custom-class
// 图片返回错误以后，如果有默认的图片，则替换成默认图片，并emit一个事件，上层根据事件进行相应处理
// emit 时，会将flag和src传递上去
component_1.VantComponent({
    props: {
        item: Object,
        lazyLoad: Boolean,
        hiddenCollecion: Boolean
    },
    watch: {
        'item': function (item) {
            if (item.loadingPriceOver || item.loadingInventoryOver) {
                // 已经执行过loading
                return;
            }
            // const data = { code: item.id, orgId: item.orgId, orgCode: item.orgCode }
            //     const priceRes: any = await request({ api: 'product/getPrices.nd', method: 'POST', data });
            //     const stockRes: any = await request({ api: 'product/getStocks.nd', method: 'POST', data });
            //     let prices: any = [];
            //     let stocks: any = [];
            //     if (is(Array, priceRes) && length(priceRes) > 0) {
            //       prices = map(({ productCode, fixedDiscount, makeUpType, price, standardPrice, pricingGroupName }) => ({
            //         productCode, fixedDiscount, makeUpType, price, standardPrice, pricingGroupName,
            //       }), priceRes);
            //     }
            //     if (is(Array, stockRes) && length(stockRes) > 0) {
            //       stocks = map(({ productCode, inventory }) => ({ productCode, inventory }), stockRes);
            //     }
            //     item.prices = prices
            //     item.stocks = stocks
            var context = this;
            var data = { code: item.productCode, orgId: item.orgId, orgCode: item.orgCode };
            if (item.autoLoadingPrice) {
                if (item.loadingPrice) {
                    request_1.request({ api: 'product/getPrices.nd', method: 'POST', data: data }).then(function (res) {
                        if (ramda_1.is(Array, res) && ramda_1.length(res) > 0) {
                            var prices = ramda_1.map(function (_a) {
                                var productCode = _a.productCode, fixedDiscount = _a.fixedDiscount, makeUpType = _a.makeUpType, price = _a.price, standardPrice = _a.standardPrice, pricingGroupName = _a.pricingGroupName;
                                return ({
                                    productCode: productCode, fixedDiscount: fixedDiscount, makeUpType: makeUpType, price: price, standardPrice: standardPrice, pricingGroupName: pricingGroupName,
                                });
                            }, res);
                            item = __assign({}, item, { loadingPrice: false, loadingPriceOver: true, price: prices[0].price });
                            context.setData({
                                item: item
                            });
                        }
                    });
                }
            }
            if (item.autoLoadingInventory) {
                if (item.loadingInventory) {
                    request_1.request({ api: 'product/getStocks.nd', method: 'POST', data: data }).then(function (res) {
                        if (ramda_1.is(Array, res) && ramda_1.length(res) > 0) {
                            var stocks = ramda_1.map(function (_a) {
                                var productCode = _a.productCode, inventory = _a.inventory;
                                return ({ productCode: productCode, inventory: inventory });
                            }, res);
                            item = __assign({}, item, { loadingInventory: false, loadingInventoryOver: true, inventory: stocks[0].inventory });
                            context.setData({
                                item: item
                            });
                        }
                    });
                }
            }
        }
    },
    created: function () {
    },
    methods: {
        // 添加/取消收藏
        toggleCollection: function () {
            return __awaiter(this, void 0, void 0, function () {
                var item, data, res, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            item = this.data.item;
                            data = { orgId: item.orgId, id: item.productCode };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, request_1.request({ api: item.collection ? 'oftenProduct/deleteOftenProduct.nd' : 'oftenProduct/addOftenProduct.nd', method: 'POST', data: data })];
                        case 2:
                            res = _a.sent();
                            if (item.collection) {
                                if (res && res.status == "true") {
                                    toast_1.default.success({
                                        message: '取消收藏成功',
                                        duration: 1000,
                                    });
                                    this.setData({
                                        item: __assign({}, item, { collection: !item.collection })
                                    });
                                    this.$emit('toggle-collection', item);
                                }
                                else {
                                    toast_1.default.fail('取消失败');
                                }
                            }
                            else {
                                // addOftenProduct
                                if (res && res == 'Y') {
                                    toast_1.default.success({
                                        message: '收藏成功',
                                        duration: 1000,
                                    });
                                    this.setData({
                                        item: __assign({}, item, { collection: !item.collection })
                                    });
                                    this.$emit('toggle-collection', item);
                                }
                                else {
                                    toast_1.default.fail('收藏失败');
                                }
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            toast_1.default.fail(item.collection ? '取消失败' : '收藏失败');
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        goods: function () {
            var item = this.data.item;
            wx.navigateTo({
                url: "/pages/goods/item/index?code=" + item.productCode + "&orgId=" + item.orgId + "&orgCode=" + item.orgCode,
            });
        },
        addCart: function () {
            return __awaiter(this, void 0, void 0, function () {
                var item, data, res, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            item = this.data.item;
                            data = { orgId: item.orgId, productId: item.productCode, num: 1 };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, request_1.request({ api: 'cart/addToCart.nd', data: data })];
                        case 2:
                            res = _a.sent();
                            if (res) {
                                toast_1.default.success({
                                    message: '添加成功',
                                    duration: 2000
                                });
                            }
                            else {
                                toast_1.default.success({
                                    message: '添加失败',
                                    duration: 2000
                                });
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            toast_1.default.fail('购物车添加失败');
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        imgLose: function (_a) {
            var detail = _a.detail;
            this.$emit('img-lose', detail);
        }
    },
});
