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
var financepolicy_1 = require('./../types/financepolicy.js');
exports.default = redux_actions_1.handleActions((_a = {},
    /**
     * @param state
     * @param action
     */
    _a[financepolicy_1.FINANCE_GET_RSRB_SHEET_LIST] = function (state, action) {
        var payload = action.payload;
        var policyeleList = state.policyeleList;
        var policyeleListNew = payload;
        var NewList;
        if (policyeleList.rows && policyeleList.rows.length > 0) {
            NewList = __assign({}, payload, { rows: policyeleList.rows.concat(payload.rows) });
        }
        else {
            NewList = policyeleListNew;
        }
        return __assign({}, state, { loading: false, policyeleList: NewList });
    },
    _a[financepolicy_1.RESET_RSRB_SHEET_LIST] = function (state, action) {
        return __assign({}, state, { policyeleList: [] });
    },
    _a[financepolicy_1.QUERY_APP_PROFIT] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { loading: false, profitList: payload.rows });
    },
    _a[financepolicy_1.QUERY_APP_FIBOOK] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { loading: false, fibookList: payload.rows });
    },
    _a[financepolicy_1.FINANCE_POST_RSRB_DETAIL_BY_ROWID] = function (state, action) {
        var payload = action.payload;
        if (!payload.rsRbSheet.curConfirmedSum) {
            payload.rsRbSheet.curConfirmedSum = 0;
        }
        if (!payload.rsRbSheet.curConfirmedSum) {
            payload.rsRbSheet.curConfirmedSum = 0;
        }
        if (!payload.rsRbSheet.cashedSum) {
            payload.rsRbSheet.cashedSum = 0;
        }
        if (!payload.rsRbSheet.otherCashedSum) {
            payload.rsRbSheet.otherCashedSum = 0;
        }
        payload.rsRbSheet.curConfirmedSum = Number(payload.rsRbSheet.curConfirmedSum).toFixed(2);
        payload.rsRbSheet.cashedSum = Number(payload.rsRbSheet.cashedSum).toFixed(2);
        payload.rsRbSheet.otherCashedSum = Number(payload.rsRbSheet.otherCashedSum).toFixed(2);
        return __assign({}, state, { loading: false, policyDetail: payload.rsRbSheet });
    },
    _a[financepolicy_1.FINANCE_POST_CUR_CONFIRMED_BY_ROWID] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { loading: false, curConfirmed: payload.rows });
    },
    _a[financepolicy_1.FINANCE_POST_RSRB_CASHED_BY_ROWID] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { loading: false, cashed: payload.rows });
    },
    _a[financepolicy_1.RS_OC_RB_SHEET_BY_ROWID] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { loading: false, policyCurtom: payload });
    },
    _a), {
    policyeleList: {},
    profitList: {},
    fibookList: {},
    policyDetail: {},
    curConfirmed: {},
    cashed: {},
    policyCurtom: {}
});
