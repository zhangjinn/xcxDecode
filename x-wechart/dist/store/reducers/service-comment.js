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
var service_comment_1 = require('./../types/service-comment.js');
exports.default = redux_actions_1.handleActions((_a = {},
    //  重置问卷列表
    _a[service_comment_1.RESET_ANSWERED_QUESTION] = function (state, action) {
        return __assign({}, state, { orderList: [] });
    },
    // 商家查询待答问卷列表
    _a[service_comment_1.GET_TOBE_ANSWERED_QUESTION] = function (state, action) {
        var payload = action.payload;
        var orderListNew = payload;
        return __assign({}, state, { loading: false, orderList: orderListNew });
    },
    // 查询当前商家已答问卷列表
    _a[service_comment_1.GET_ANSWERED_QUESTION_LIST] = function (state, action) {
        var payload = action.payload;
        var orderListNew = payload;
        return __assign({}, state, { loading: false, orderList: orderListNew });
    },
    _a), {
    orderList: [],
});
