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
var dmsrequest_1 = require('./dmsrequest.js');
var returnbefore_1 = require('./../types/returnbefore.js');
// 退货入库
exports.getReturnOrderInfo = redux_actions_1.createAction(returnbefore_1.GET_RETURN_ORDER_INFO, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'findReturnOrderLike'
            })];
    });
}); });
// 渠道退货入库
exports.getReturnChannelOrderInfo = redux_actions_1.createAction(returnbefore_1.GET_RETURN_CHANNEL_ORDER_INFO, function (data_channel) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data_channel,
                method: 'findPurchaseReturnOrderLike'
            })];
    });
}); });
// 分销商采购单退货详情-退货发起
exports.getPurchaseOrderReturnDetail = redux_actions_1.createAction(returnbefore_1.GET_PURCHASE_ORDER_RETURN_DETAIL, function (data_channel) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data_channel,
                method: 'purchaseOrderReturnDetail'
            })];
    });
}); });
// 分销商发起退货提交
exports.createReturnOrderByPurchaseOrder = redux_actions_1.createAction(returnbefore_1.CREATE_RETURN_ORDER_BY_PURCHASE_ORDER, function (data_channel) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data_channel,
                method: 'createReturnOrderByPurchaseOrder'
            })];
    });
}); });
// 分销商退货详情-退货出库
exports.getDistributorReturnOrderDetail = redux_actions_1.createAction(returnbefore_1.GET_DISTRIBUTOR_RETURN_ORDER_DETAIL, function (data_channel) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data_channel,
                method: 'distributorReturnOrderDetail'
            })];
    });
}); });
// 分销商退货出库提交
exports.createDistributorReturnOrderOutbound = redux_actions_1.createAction(returnbefore_1.CREATE_DISTRIBUTOR_RETURN_ORDER_OUT_BOUND, function (data_channel) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data_channel,
                method: 'distributorReturnOrderOutbound'
            })];
    });
}); });
// 代理商销售单退货详情-退货发起
exports.getReturnShowSalesOrder = redux_actions_1.createAction(returnbefore_1.GET_RETURN_SHOW_SALES_ORDER, function (data_channel) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data_channel,
                method: 'returnShowSalesOrder'
            })];
    });
}); });
// 代理商发起退货提交
exports.createChannelCreationReturn = redux_actions_1.createAction(returnbefore_1.CREATE_CHANNEL_CREATION_RETURN, function (data_channel) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data_channel,
                method: 'channelCreationReturn'
            })];
    });
}); });
// 代理商销售单退货详情-退货入库
exports.getAgentReturnOrderDetail = redux_actions_1.createAction(returnbefore_1.GET_AGENT_RETURN_ORDER_DETAIL, function (data_channel) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data_channel,
                method: 'agentReturnOrderDetail'
            })];
    });
}); });
// 代理商退货入库提交
exports.createAgentReturnOrderInbound = redux_actions_1.createAction(returnbefore_1.CREATE_AGENT_RETURN_ORDER_INBOUND, function (data_channel) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data_channel,
                method: 'agentReturnOrderInbound'
            })];
    });
}); });
// 代理商退货入库取消退货
exports.cancelReturn = redux_actions_1.createAction(returnbefore_1.CANCEL_RETURN, function (data_channel) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data_channel,
                method: 'cancelReturn'
            })];
    });
}); });
