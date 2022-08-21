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
var returnbefore_1 = require('./../types/returnbefore.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[returnbefore_1.GET_RETURN_CHANNEL_ORDER_INFO] = function (state, action) {
        var payload = action.payload;
        var list_channel = state.list_channel;
        var data = payload.data, totalPage = payload.page.totalPage;
        var newList = data;
        if (list_channel && list_channel.length > 0) {
            newList = ramda_1.concat(list_channel, newList);
        }
        return __assign({}, state, { list_channel: newList, totalPage_channel: totalPage });
    },
    _a[returnbefore_1.RESET_RETURN_CHANNEL_ORDER_INFO] = function (state, action) {
        return __assign({}, state, { list_channel: [] });
    },
    _a[returnbefore_1.GET_RETURN_ORDER_INFO] = function (state, action) {
        var payload = action.payload;
        var list = state.list;
        var data = payload.data, totalPage = payload.page.totalPage;
        var newList = data;
        if (list && list.length > 0) {
            newList = ramda_1.concat(list, newList);
        }
        return __assign({}, state, { list: newList, totalPage: totalPage });
    },
    _a[returnbefore_1.RESET_RETURN_ORDER_INFO] = function (state, action) {
        return __assign({}, state, { list: [] });
    },
    _a), {
    list: {},
    totalPage: Number,
    list_channel: {},
    totalPage_channel: Number
});
