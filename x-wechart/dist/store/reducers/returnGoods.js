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
var returnGoods_1 = require('./../types/returnGoods.js');
var index_1 = require('./../../utils/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[returnGoods_1.GET_RETURN_GOODS] = function (state, action) {
        var payload = action.payload;
        var orderList = state.orderList;
        // debugger
        var orderListNew = payload;
        if (payload.currentPage && payload.currentPage !== 1) {
            orderListNew = __assign({}, payload, { list: orderList.list.concat(payload.list) });
        }
        forEach(function (_a) {
            var items = _a.items;
            forEach(function (item) {
                if (item.img) {
                    var imgs = item.img.split('/');
                    item.img = index_1.formatImg({
                        format: imgs[2],
                        name: imgs[3],
                        materialId: imgs[0],
                        itemId: imgs[1]
                    });
                }
                if (item.defaultImg) {
                    var imgs = item.defaultImg.split('/');
                    item.errImg = index_1.formatImg({
                        name: imgs[imgs.length - 1]
                    });
                }
            }, items || []);
        }, orderListNew.list || []);
        return __assign({}, state, { loading: false, orderList: orderListNew });
    },
    _a), {
    orderList: {}
});
