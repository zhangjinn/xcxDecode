"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var purchasedetail_1 = require('./../types/purchasedetail.js');
exports.default = redux_actions_1.handleActions((_a = {},
    // 采购筛选列表
    _a[purchasedetail_1.GET_PURCHASE_DETAIL] = function (state, action) {
        var payload = action.payload;
        var data = payload.data;
        if (data && data.purchaseOrderItem) {
            data.purchaseOrderItem.forEach(function (element) {
                element.selectInfo = [];
            });
        }
        return {
            orderdetail: data
        };
    },
    _a), {
    orderdetail: {}
});
