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
var search_1 = require('./../types/search.js');
var request_1 = require('./../../utils/request.js');
var dmsrequest_1 = require('./dmsrequest.js');
// 获取dms商品价格
// export const getFilterDmsGoodsPrice = createAction(GET_FILTER_DMS_GOODS_PRICE, async (goodsItems: any) => {
//   return dmsRequest({
//     data: goodsItems,
//     method: 'findDealerProductPrice'
//   })
// })
exports.getFilterDmsGoodsPrice = redux_actions_1.createAction(search_1.GET_FILTER_DMS_GOODS_PRICE, function (data) { return request_1.request({ api: "product/fxPrice.nd", method: 'GET', data: data }); });
// 三期物料组
exports.grtFilterItemGroup = redux_actions_1.createAction(search_1.GET_FILTER_ITEM_GROUP, function (data) { return request_1.request({ api: "comm/queryAgentOrg.nd", method: 'GET', data: data }); });
// 组织
exports.getFxDictCisCode = redux_actions_1.createAction(search_1.GET_FX_DICT_CIS_CODE, function (data) { return request_1.request({ api: "comm/fxDictCisCode.nd", method: 'GET', data: data }); });
// 获取搜索列表
exports.getSearchList = redux_actions_1.createAction(search_1.GET_SEARCH_GOODS, function (data) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: "product/list.nd", method: 'POST', data: data })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, __assign({}, res, { pageNum: data.pageNum })];
        }
    });
}); });
// 获取分类价格
exports.getSearchPrice = redux_actions_1.createAction(search_1.GET_SEARCH_PRICE, function (data) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, request_1.request({ api: 'product/getPrices.nd', method: 'POST', data: data })];
}); }); });
//
// export const getSearchStock = createAction(GET_SEARCH_STOCK, (data: PriceOrStockParam) => request({ api: 'product/getStocks.nd', method: 'POST', data }))
exports.getSearchStock = redux_actions_1.createAction(search_1.GET_SEARCH_STOCK, function (data, callback) { return request_1.request({ api: 'product/getStocks.nd', method: 'POST', data: data, callback: callback }); });
// 获取dms商品库存
exports.getDmsGoodsInventory = redux_actions_1.createAction(search_1.GET_DMS_GOODS_INVENTORY, function (goodsItems, callback) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: goodsItems,
                method: 'hasProductInventory',
                callback: callback
            })];
    });
}); });
// export const getFxDictCisCode = createAction(FX_DICT_CIS_CODE, (data: StockParam, callback: () => void) => request({ api: 'comm/fxDictCisCode.nd',method: 'get', data, callback }));
exports.getExclusiveShopByCisCode = redux_actions_1.createAction(search_1.GET_EXCLUSIVE_SHOP_BY_CIS_CODE, function (data, callback) { return request_1.request({ api: 'report/getExclusiveShopByCisCode.nd', method: 'POST', data: data, callback: callback }); });
