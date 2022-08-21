"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var returnentry_1 = require('./../types/returnentry.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[returnentry_1.GET_NEW_RETURN_ORDER_INFO] = function (state, action) {
        var payload = action.payload;
        var data = payload.data;
        var salesOrderItem = data.salesOrderItem;
        ramda_1.forEach(function (res) {
            res.relreturnQty = parseFloat(res.returnQty).toFixed(0),
                res.returnQty = parseFloat(res.returnQty).toFixed(0),
                //处理成数组  组件中需要添加
                res.stock = [{
                        itemId: res.itemId,
                        invStatusId: res.invStatusId,
                        invStatusName: res.invStatusName,
                        relreturnQty: parseFloat(res.returnQty).toFixed(0),
                        returnQty: parseFloat(res.returnQty).toFixed(0),
                        bprice: res.bprice,
                        warehouse: '',
                        warehouseId: '',
                        batch: '请选择批次',
                        batchId: '',
                        amount: parseFloat(res.returnQty).toFixed(2) * res.bprice
                    }];
        }, salesOrderItem);
        return __assign({}, state, { returnInfo: data });
    },
    _a[returnentry_1.RESET_NEW_RETURN_ORDER_INFO] = function (state, action) {
        return __assign({}, state);
    },
    // 确认退货入库
    _a[returnentry_1.GET_CONFIRMATION_INBOUND] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state);
    },
    _a[returnentry_1.GET_NEW_RETURN_ORDER_CHANNEL_INFO] = function (state, action) {
        var payload = action.payload;
        var data = payload.data;
        ramda_1.forEach(function (res) {
            res.showPrice = '￥' + res.price;
            res.showAmount = '￥' + res.amount;
        }, data.items);
        return __assign({}, state, { channelReturnInfo: data });
    },
    _a), {
    returnInfo: {},
    channelReturnInfo: {}
});
