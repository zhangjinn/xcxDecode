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
/*
 * @Auth: Turbo
 * @Email: 691209942@qq.com
 * @Date: 2019-09-27 14:06:04
 * @Description:
 */
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var audit_order_1 = require('./../types/audit-order.js');
var index_1 = require('./../../utils/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[audit_order_1.GET_AUDIT_ORDERS] = function (state, action) {
        var orderHeaderList = action.payload.orderHeaderList;
        ramda_1.forEach(function (_a) {
            var items = _a.items;
            ramda_1.forEach(function (item) {
                if (item.img) {
                    var imgs = item.img.split('/');
                    item.img = index_1.formatImg({
                        format: imgs[2],
                        name: imgs[3],
                        materialId: imgs[0],
                        itemId: imgs[1],
                    });
                }
                if (item.defaultImg) {
                    var imgs = item.defaultImg.split('/');
                    item.errImg = index_1.formatImg({
                        name: imgs[imgs.length - 1],
                    });
                }
            }, items || []);
        }, orderHeaderList || []);
        return __assign({}, state, { items: orderHeaderList || [] });
    },
    _a[audit_order_1.GET_AUDIT_ORDER_DETAIL] = function (state, action) {
        var payload = action.payload;
        var totalPrice = 0;
        if (payload.orderLines && payload.orderLines.length > 0) {
            ramda_1.forEach(function (item) {
                totalPrice += item.billPrice * item.qty;
                if (item.img) {
                    var imgs = item.img.split('/');
                    item.img = index_1.formatImg({
                        format: imgs[2],
                        name: imgs[3],
                        materialId: imgs[0],
                        itemId: imgs[1],
                    });
                }
                if (item.defaultImg) {
                    var imgs = item.defaultImg.split('/');
                    item.errImg = index_1.formatImg({
                        name: imgs[imgs.length - 1],
                    });
                }
            }, payload.orderLines || []);
        }
        payload.totalPrice = index_1.convertCurrencyAmt(totalPrice) || 0.00;
        return __assign({}, state, { order: payload });
    },
    _a), {
    order: {
        orderHeader: {},
        orderLines: [],
    },
    items: [],
});
