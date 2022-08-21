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
var financecheck_1 = require('./../types/financecheck.js');
exports.default = redux_actions_1.handleActions((_a = {},
    /**
      * @param state
      * @param action
      */
    // 政策核对单列表查询接口
    _a[financecheck_1.CF_RB_SHEET_LIST] = function (state, action) {
        var payload = action.payload;
        var checkList = state.checkList;
        var checkListNew = payload;
        var NewList;
        if (checkList.rows && checkList.rows.length > 0) {
            NewList = __assign({}, payload, { rows: checkList.rows.concat(payload.rows) });
        }
        else {
            NewList = checkListNew;
        }
        return __assign({}, state, { loading: false, checkList: NewList });
    },
    _a[financecheck_1.RS_CF_RB_SHEET_LIST] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { checkList: [] });
    },
    // 政策详情接口
    _a[financecheck_1.RS_RB_DETAIL_BY_ROWID] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { loading: false, checkDetail: payload });
    },
    _a), {
    checkList: {},
    checkDetail: {}
});
