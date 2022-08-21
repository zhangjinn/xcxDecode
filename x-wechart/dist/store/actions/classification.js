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
var classification_1 = require('./../types/classification.js');
var request_1 = require('./../../utils/request.js');
var dmsrequest_1 = require('./dmsrequest.js');
// 获取dms商品库存
exports.getDmsGoodsInventory = redux_actions_1.createAction(classification_1.GET_DMS_GOODS_INVENTORY, function (goodsItems, callback) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: goodsItems,
                method: 'hasProductInventory',
                callback: callback
            })];
    });
}); });
// 获取dms商品价格 操蛋啊   重新写价格获取我日
// /product/fxPrice.nd
exports.getDmsGoodsPrice = redux_actions_1.createAction(classification_1.GET_DMS_GOODS_PRICE, function (data) { return request_1.request({ api: "product/fxPrice.nd", method: 'GET', data: data }); });
// export const getDmsGoodsPrice = createAction(GET_DMS_GOODS_PRICE, async (goodsItems: any) => {
//   return dmsRequest({
//     data: goodsItems,
//     method: 'findDealerProductPrice'
//   })
// })
// 三期物料组和供应商
exports.getThreeMaterialGroupAndSuppliers = redux_actions_1.createAction(classification_1.GET_THREE_PHASE_MATERIAL_GROUP_AND_SUPPLIERS, function (data) { return request_1.request({ api: "comm/queryAgentOrg.nd", method: 'GET', data: data }); });
// 工程单列表
exports.getEngineerList = redux_actions_1.createAction(classification_1.GET_ENGINEER_LIST, function (data) { return request_1.request({ api: "engineering/getEngineerOrder.nd", method: 'POST', data: data }); });
// 特惠单列表
exports.getPreferentialList = redux_actions_1.createAction(classification_1.GET_PREFERENTIAL_LIST, function (data) { return request_1.request({ api: "preferential/queryByProduction.nd", method: 'GET', data: data }); });
// 套购单列表
exports.getBuyoutList = redux_actions_1.createAction(classification_1.GET_BUYOUT_LIST, function (data) { return request_1.request({ api: "packageActivity/queryActivityList.nd", method: 'GET', data: data }); });
// 品类查询和展示
exports.getClassificationList = redux_actions_1.createAction(classification_1.GET_CLASSIFICATION_LIST, function (data) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: "product/list.nd", method: 'POST', data: data })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, __assign({}, result, { pageNo: data.pageNum || 1 })];
        }
    });
}); });
// 六大品类筛选条件获取
exports.getGoodsFilters = redux_actions_1.createAction(classification_1.GET_GOODS_FILTERS, function (data) { return request_1.request({ api: "product/product.nd", method: 'GET', data: data }); });
// 特惠单筛选条件
exports.getSpecialFilters = redux_actions_1.createAction(classification_1.GET_SPECIAL_FILTERS, function () { return request_1.request({ api: "comm/queryOrgAndMatkl.nd", method: 'GET' }); });
// 获取分类价格
exports.getClassificationPrice = redux_actions_1.createAction(classification_1.GET_CLASSIFICATION_PRICE, function (data) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, request_1.request({ api: 'product/getPrices.nd', method: 'POST', data: data })];
}); }); });
// 获取分类库存
exports.getClassificationStock = redux_actions_1.createAction(classification_1.GET_CLASSIFICATION_STOCK, function (data) { return request_1.request({ api: 'product/getStocks.nd', method: 'POST', data: data }); });
// 调拨订单列表保存
// export const getAuthority = createAction(GET_AUTHORITY, async (data: any) => {
//   return dmsRequest({
//     data,
//     method: 'getDealerInfo'
//   })
// })
exports.getAuthority = redux_actions_1.createAction(classification_1.GET_AUTHORITY, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'getDealerInfo'
            })];
    });
}); });
exports.getProduct = redux_actions_1.createAction(classification_1.GET_PRODUCT, function () { return request_1.request({ api: 'index.nd', method: 'get' }); });
