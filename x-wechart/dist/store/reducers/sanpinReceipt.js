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
var sanpinReceipt_1 = require('./../types/sanpinReceipt.js');
exports.default = redux_actions_1.handleActions((_a = {},
    //  重置三品收货列表
    _a[sanpinReceipt_1.RESET_SALES_ORDER_LIST] = function (state, action) {
        return __assign({}, state, { orderList: [] });
    },
    //  重置三品收货列表
    _a[sanpinReceipt_1.GET_SALES_ORDER_LIST] = function (state, action) {
        var orderList = state.orderList;
        var payload = action.payload;
        var orderListNew = payload;
        if (orderListNew && orderListNew.data) {
            orderListNew.data = orderListNew.data.map(function (item) {
                // item.deliveryDate = item.deliveryDate ? formatDate(item.deliveryDate, 'Y-M-D') : ''
                return item;
            });
        }
        if (orderList && orderList.data && orderList.data.length > 0) {
            orderListNew = __assign({}, payload, { data: orderList.data.concat(payload.data) });
        }
        else {
            orderListNew = __assign({}, payload, { data: payload.data });
        }
        return __assign({}, state, { loading: false, orderList: orderListNew });
    },
    _a), {
    orderList: {},
});
