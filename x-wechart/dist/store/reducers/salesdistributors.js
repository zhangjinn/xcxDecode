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
var ramda_1 = require('./../../npm/ramda/src/index.js');
var index_1 = require('./../../utils/index.js');
var salesdistributors_1 = require('./../types/salesdistributors.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[salesdistributors_1.RESET_SALES_ORDER_REVIEW_LIST] = function (state) {
        return __assign({}, state, { orderList: [] });
    },
    _a[salesdistributors_1.GET_SALES_ORDER_REVIEW_LIST] = function (state, action) {
        var payload = action.payload;
        var orderList = state.orderList;
        var orderListNew = payload;
        if (payload.page && payload.page.currPage > 1 && orderList && orderList.data && orderList.data.length > 0) {
            orderListNew = __assign({}, payload, { data: orderList.data.concat(payload.data) });
        }
        else {
            orderListNew = __assign({}, payload, { data: payload.data });
        }
        ramda_1.forEach(function (items) {
            items.salesOrderItem.forEach(function (item, idx) {
                if (item.backnowledgedQty) {
                    item.backnowledgedQty = Number(item.backnowledgedQty);
                }
                if (item.shippedBqty) {
                    item.shippedBqty = Number(item.shippedBqty);
                }
                var _a = index_1.formatDmsImg({ model: item.model, material: item.materialGroupCode }), img = _a.img, err = _a.err;
                item.img = img;
                item.err = err;
                item._date = new Date().getTime();
            });
            if (items.salesOrderItem.length) {
                if (items.discountTypeName == '组合购') {
                    var combinationPurchaseList_1 = [];
                    //组合购将数组里'productGroup'属性相同的对象合并成一个数组
                    combinationPurchaseList_1 = index_1.combineObjIntoAnArray(items.salesOrderItem);
                    combinationPurchaseList_1.forEach(function (item, index) {
                        var totleBuyNum = 0;
                        item.child.forEach(function (val, i) {
                            totleBuyNum += val.quantity;
                        });
                        combinationPurchaseList_1[index].isFold = true;
                        combinationPurchaseList_1[index].totleBuyNum = totleBuyNum;
                    });
                    items.salesOrderItem = combinationPurchaseList_1;
                }
            }
        }, orderListNew.data || []);
        return __assign({}, state, { loading: false, orderList: orderListNew });
    },
    _a), {
    orderList: {},
});
