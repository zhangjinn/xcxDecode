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
var return_stock_1 = require('./../types/return-stock.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[return_stock_1.GET_RETURN_SUPPLIER] = function (state, action) {
        var payload = action.payload;
        payload.supplier.map(function (res) {
            res.value = res.fullName;
            res.key = res.supplierCode;
        });
        return __assign({}, state, { orgList: payload.supplier });
    },
    _a[return_stock_1.ORDER_RETURN_STOCK] = function (state, action) {
        var payload = action.payload;
        var key = payload.key, stock = payload.stock;
        var returnOrderList = state.returnOrderList;
        var newItem = {
            all_price: "",
            return_number: "",
            return_price: "",
            good_name: "",
            stock_type: stock,
        };
        returnOrderList[+key] = newItem;
        return __assign({}, state, { returnOrderList: __assign({}, returnOrderList) });
    },
    _a), {
    loading: false,
    returnOrderList: [{}]
});
