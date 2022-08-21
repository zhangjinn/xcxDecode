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
var addAccount_1 = require('./../types/addAccount.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[addAccount_1.GET_POST_OPTION_LIST] = function (state, action) {
        var list = action.payload.list;
        return __assign({}, state, { postList: list });
    },
    _a[addAccount_1.GET_UPCOMING_OPTION_LIST] = function (state, action) {
        var list = action.payload.list;
        return __assign({}, state, { upcomingList: list });
    },
    _a[addAccount_1.GET_NOTICE_OPTION_LIST] = function (state, action) {
        var list = action.payload.list;
        return __assign({}, state, { noticeList: list });
    },
    _a[addAccount_1.GET_CUST_BASE_PERMISSION] = function (state, action) {
        var roleList = action.payload.roleList;
        return __assign({}, state, { custList: roleList });
    },
    _a[addAccount_1.GET_MATKL_AND_SHOP_DATA] = function (state, action) {
        var baseMatklList = action.payload.data.baseMatklList;
        return __assign({}, state, { matklList: baseMatklList });
    },
    _a[addAccount_1.GET_ACCOUNT_DETAILS] = function (state, action) {
        var data = action.payload.data;
        return __assign({}, state, { data: data });
    },
    _a), {
    postList: [],
    upcomingList: [],
    noticeList: [],
    custList: [],
    matklList: [],
});
