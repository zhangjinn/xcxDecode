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
var consultTodoDetail_1 = require('./../types/consultTodoDetail.js');
var index_1 = require('./../../utils/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[consultTodoDetail_1.GET_SALES_ORDER_CONSULT] = function (state, action) {
        var payload = action.payload;
        if (payload.orderLines[0]) {
            payload.orderLines[0].active = true;
        }
        payload.orderLines.forEach(function (item) {
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
        });
        return __assign({}, state, { loading: false, consultTodoDetail: payload });
    },
    _a[consultTodoDetail_1.SUBMIT] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { submitResponse: payload });
    },
    _a), {
    consultTodoDetail: {}
});
