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
var dmsrequest_1 = require('./dmsrequest.js');
var inventory_1 = require('./../types/inventory.js');
exports.getInventoryQueriesList = redux_actions_1.createAction(inventory_1.GET_INVENTORY_QUERIES_LIST, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                //method: 'findInventoryList'
                method: 'findInventoryProductList'
            })];
    });
}); });
// 用于渠道订单审核、零售录入、分销录入、选择产品时获取产品列表; 和getInventoryQueriesList功能相同，传参返回参数相同
// 默认查询上架的产品，用于业务场景中搜索产品
exports.getInventoryQueriesListNew = redux_actions_1.createAction(inventory_1.GET_INVENTORY_QUERIES_LIST, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'findMaterialInventoryList'
            })];
    });
}); });
// 复制findMaterialInventoryList 改成新的接口 findMaterialInventoryPage，这个接口默认查询所有的产品，并添加上下架状态，用于当前库存页面显示用
exports.getMaterialInventoryPage = redux_actions_1.createAction(inventory_1.GET_INVENTORY_QUERIES_LIST, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'findMaterialInventoryPage'
            })];
    });
}); });
exports.getInventoryQueriesListIn = redux_actions_1.createAction(inventory_1.GET_INVENTORY_QUERIES_LIST_IN, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'findProductListLikeCode'
            })];
    });
}); });
// 获取补差类型
exports.getInvStatusType = redux_actions_1.createAction(inventory_1.DMS_INV_STATUS_TYPE, function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dmsrequest_1.dmsRequest({
                    data: {
                        _loading: true,
                    }, method: 'getInvStatusType'
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, __assign({}, result)];
        }
    });
}); });
exports.getDistributorInventoryInquiry = redux_actions_1.createAction(inventory_1.GET_DISTRIBUTOR_INVENTORY_INQUIRY, function (distributor) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: distributor,
                method: 'findInventoryHisenseList'
            })];
    });
}); });
exports.getDistributorType = redux_actions_1.createAction(inventory_1.GET_DISTRIBUTOR_TYPE, function (distributor) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: distributor,
                method: 'getConditionOptions'
            })];
    });
}); });
// 未结预留
exports.getOpenReservationList = redux_actions_1.createAction(inventory_1.GET_OPEN_RESERVATION, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'findNotReleasedReserveList'
            })];
    });
}); });
// 查询样机库存总数接口
exports.getfindTaojiInventoryTotal = redux_actions_1.createAction(inventory_1.GET_FINDTAOJI_INVENTORY_TOTAL, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'findTaojiInventoryTotal'
            })];
    });
}); });
// 只查询单机
exports.getSingerMaterialInventoryPage = redux_actions_1.createAction(inventory_1.GET_SING_INVENTORY_QUERIES_LIST, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'findSingleMaterialInvList'
            })];
    });
}); });
