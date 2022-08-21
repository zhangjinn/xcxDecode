"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var request_1 = require('./../../utils/request.js');
var cart_1 = require('./../types/cart.js');
var dmsrequest_1 = require('./dmsrequest.js');
// dms商品价格
exports.getCartDmsPrice = redux_actions_1.createAction(cart_1.GET_DMS_PRIDE_AND_ID, function (data) { return request_1.request({ api: 'product/fxPrice.nd', data: data }); });
// export const getCartDmsPrice = createAction(GET_DMS_PRIDE_AND_ID, async (dmsPriceAndStock: any) => {
//   return dmsRequest({
//     data: dmsPriceAndStock,
//     method: 'getPurchasePrice'
//   })
// })
// 获取dms商品库存
exports.getCartDmsStocks = redux_actions_1.createAction(cart_1.GET_CART_DMS_STOCK_LIST, function (dmsGoodsStock) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: dmsGoodsStock,
                method: 'hasProductInventory'
            })];
    });
}); });
// 获取三期供应商和物料组
exports.getCartSupplyAndItemGroup = redux_actions_1.createAction(cart_1.GET_CART_SUPPLY_AND_ITEM_GROUP, function (data, callback) { return request_1.request({ api: 'cart/cartParam.nd', data: data, callback: callback }); });
// 获取购物车的数量
exports.getCartCount = redux_actions_1.createAction(cart_1.GET_CART_COUNT, function () { return request_1.request({ api: 'cart/getCartNum.nd' }); });
// 获取商品列表
exports.getCartList = redux_actions_1.createAction(cart_1.GET_CART_LIST, function (_a) {
    var data = _a.data, callback = _a.callback;
    return request_1.request({ api: 'cart/showCartList.nd', data: data, callback: callback });
});
// 获取商品的库存
// export const getStocks = createAction(GET_CART_STOCK_LIST, async (data: PriceParams) => {
//   const stockRes: any = await request({ api: 'product/getStocks.nd', method: 'POST', data });
//   let stocks: any = [];
//   if (is(Array, stockRes) && length(stockRes) > 0) {
//     stocks = map(({ productCode, inventory }) => ({ productCode, stock: inventory }), stockRes);
//   }
//   return stocks;
// });
exports.getStocks = redux_actions_1.createAction(cart_1.GET_CART_STOCK_LIST, function (data) { return request_1.request({
    api: 'product/getStocks.nd', method: 'POST', data: data
}); });
// 获取商品的价格和库存
exports.getPrices = redux_actions_1.createAction(cart_1.GET_CART_PRICE_LIST, function (data) { return __awaiter(_this, void 0, void 0, function () {
    var priceRes, prices;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'product/getPrices.nd', method: 'POST', data: data })];
            case 1:
                priceRes = _a.sent();
                prices = [];
                if (ramda_1.is(Array, priceRes) && ramda_1.length(priceRes) > 0) {
                    prices = ramda_1.map(function (_a) {
                        var productCode = _a.productCode, fixedDiscount = _a.fixedDiscount, makeUpType = _a.makeUpType, price = _a.price, standardPrice = _a.standardPrice, pricingGroupName = _a.pricingGroupName;
                        return ({
                            productCode: productCode, fixedDiscount: fixedDiscount, makeUpType: makeUpType, price: price, standardPrice: standardPrice, pricingGroupName: pricingGroupName,
                        });
                    }, priceRes);
                }
                return [2 /*return*/, prices];
        }
    });
}); });
// 选择政策
exports.changePolicy = redux_actions_1.createAction(cart_1.GET_CART_POLICY_ITEM, function (data, policy) { return __awaiter(_this, void 0, void 0, function () {
    var res, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'cart/changePolicy.nd', method: 'POST', data: data })];
            case 1:
                res = _a.sent();
                payload = { productId: data.productId, policy: policy };
                if (res && res.fixedDiscount) {
                    payload = __assign({}, payload, res);
                }
                return [2 /*return*/, payload];
        }
    });
}); });
// 更新购物车数量
exports.updateItemQuantity = redux_actions_1.createAction(cart_1.UPDATE_CART_ITEM_COUNT, function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'cart/updateQuantity.nd', method: 'POST', data: data, callback: callback })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, __assign({}, data, { res: res })];
        }
    });
}); });
// 删除单个商品
exports.removeCartItem = redux_actions_1.createAction(cart_1.REMOVE_CART_ITEM, function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'cart/deleteProduct.nd', method: 'POST', data: data, callback: callback })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, __assign({}, data, { res: res })];
        }
    });
}); });
