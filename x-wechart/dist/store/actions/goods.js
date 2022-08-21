"use strict";
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
var goods_1 = require('./../types/goods.js');
var dmsrequest_1 = require('./dmsrequest.js');
// 获取dms商品库存
exports.getGoodsDmsStock = redux_actions_1.createAction(goods_1.GET_GOODS_DMS_STOCK, function (goodsItems) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: goodsItems,
                method: 'hasProductInventory'
            })];
    });
}); });
// product/fxPrice.nd
// 获取dms商品价格
exports.getGoodsDmsPrice = redux_actions_1.createAction(goods_1.GET_GOODS_DMS_PRICE, function (data) { return request_1.request({ api: "product/fxPrice.nd", method: 'GET', data: data }); });
// export const getGoodsDmsPrice = createAction(GET_GOODS_DMS_PRICE, async (goodsItems: any) => {
//   return dmsRequest({
//     data: goodsItems,
//     method: 'findDealerProductPrice'
//   })
// })
// 获取商品营销活动
exports.getGoodsPromotion = redux_actions_1.createAction(goods_1.GET_GOODS_PROMOTION, function (data, callback) { return request_1.request({ api: 'marketActivity/queryDetail.nd', data: data, callback: callback }); });
// 获取商品详情
exports.getGoodsInfo = redux_actions_1.createAction(goods_1.GET_GOODS_INFO, function (_a, callback) {
    var code = _a.code, orgId = _a.orgId, orderType = _a.orderType;
    return request_1.request({ api: "product/showProductInfo/" + code + "/" + orgId + ".nd", data: { orderType: orderType || '' }, callback: callback });
});
// 获取商品价格 { code, orgId, orgCode, type='orderQty' }
exports.getGoodsPrice = redux_actions_1.createAction(goods_1.GET_GOODS_PRICE, function (data) { return __awaiter(_this, void 0, void 0, function () {
    var priceRes, price, _a, standardPrice, fixedDiscount, channelQty, qty;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'product/getPrices.nd', method: 'POST', data: data })];
            case 1:
                priceRes = _b.sent();
                price = {};
                if (ramda_1.is(Array, priceRes) && ramda_1.length(priceRes) > 0) {
                    _a = ramda_1.head(priceRes), standardPrice = _a.standardPrice, fixedDiscount = _a.fixedDiscount, channelQty = _a.channelQty, qty = _a.qty;
                    price = { standardPrice: standardPrice, fixedDiscount: fixedDiscount, channelQty: channelQty, qty: qty };
                }
                return [2 /*return*/, price];
        }
    });
}); });
// 获取商品库存 { code, orgId, orgCode, type='orderQty' }
// export const getGoodsStock = createAction(GET_GOODS_STOCK, async (data: GoodsParams) => {
//   return request({api: 'product/getStocks.nd', method: 'POST', data});
// });
// 获取商品库存 { code, orgId, orgCode, type='orderQty' }
exports.getGoodsStock = redux_actions_1.createAction(goods_1.GET_GOODS_STOCK, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, request_1.request({ api: 'product/getStocks.nd', method: 'POST', data: data })];
    });
}); });
//获取模块化定制产品列表
exports.getGoodsModel = redux_actions_1.createAction(goods_1.GET_GOODS_MODEL, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, request_1.request({ api: 'product/queryModelList.nd', method: 'GET', data: data })];
    });
}); });
// 获取定制专区商品详情
exports.getModelGoodsInfo = redux_actions_1.createAction(goods_1.GET_MODEL_GOODS_INFO, function (_a, callback) {
    var code = _a.code;
    return request_1.request({ api: "product/showModelProductInfo.nd?modelId=" + code, callback: callback });
});
