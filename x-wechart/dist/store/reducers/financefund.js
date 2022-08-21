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
var financefund_1 = require('./../types/financefund.js');
var financefund_2 = require('./../types/financefund.js');
exports.default = redux_actions_1.handleActions((_a = {},
    /**
    * @param state
    * @param action
    */
    _a[financefund_1.FINANCE_POST_RS_FT_SHEET_LIST] = function (state, action) {
        var payload = action.payload;
        var fundList = state.fundList;
        var fundListNew = payload;
        var NewList;
        if (fundList.rows && fundList.rows.length > 0) {
            NewList = __assign({}, payload, { rows: fundList.rows.concat(payload.rows) });
        }
        else {
            NewList = fundListNew;
        }
        return __assign({}, state, { loading: false, fundList: NewList });
    },
    _a[financefund_1.RS_FT_SHEET_LIST] = function (state, action) {
        return __assign({}, state, { fundList: [] });
    },
    _a[financefund_2.FINANCE_POST_RS_FT_SHEET_DETAIL] = function (state, action) {
        var payload = action.payload;
        // 数据处理
        var Amount = payload.rsFtSheet.arBalance + payload.rsFtSheet.sniAmt - payload.rsFtSheet.rnrAmt;
        var Invoice = payload.rsFtSheet.invoiceDiffDebit - payload.rsFtSheet.invoiceDiffCredit;
        var NotInvoice = payload.rsFtSheet.incomeDiffDebit - payload.rsFtSheet.incomeDiffCredit;
        var Delivery = payload.rsFtSheet.sniDebit - payload.rsFtSheet.sniCredit;
        var Returnvariance = payload.rsFtSheet.rnrDebit - payload.rsFtSheet.rnrCredit;
        var arBalance = payload.rsFtSheet.arBalance;
        var sniAmt = payload.rsFtSheet.sniAmt;
        var rnrAmt = payload.rsFtSheet.rnrAmt;
        var diffAmt = payload.rsFtSheet.diffAmt;
        payload.rsFtSheet.amount = Amount.toFixed(2);
        payload.rsFtSheet.invoice = Invoice.toFixed(2);
        payload.rsFtSheet.notInvoice = NotInvoice.toFixed(2);
        payload.rsFtSheet.delivery = Delivery.toFixed(2);
        payload.rsFtSheet.returnvariance = Returnvariance.toFixed(2);
        payload.rsFtSheet.arBalance = arBalance.toFixed(2);
        payload.rsFtSheet.sniAmt = sniAmt.toFixed(2);
        payload.rsFtSheet.rnrAmt = rnrAmt.toFixed(2);
        payload.rsFtSheet.diffAmt = diffAmt.toFixed(2);
        return __assign({}, state, { loading: false, fundDetail: payload.rsFtSheet });
    },
    _a[financefund_2.FINANCE_POST_RS_FT_SHEET_THREE] = function (state, action) {
        var payload = action.payload;
        var threecolumn = state.threecolumn;
        var ListNew = payload;
        var NewList;
        if (payload.page.pageSize !== 1 && threecolumn.rows && threecolumn.rows.length > 0) {
            NewList = __assign({}, payload, { rows: threecolumn.rows.concat(payload.rows) });
        }
        else {
            NewList = ListNew;
        }
        return __assign({}, state, { loading: false, threecolumn: NewList });
    },
    _a[financefund_2.FINANCE_POST_RS_FT_INVOICE_LIST] = function (state, action) {
        var payload = action.payload;
        var list = state.list;
        var ListNew = payload;
        var NewList;
        if (list.rows && list.rows.length > 0) {
            NewList = __assign({}, payload, { rows: list.rows.concat(payload.rows) });
        }
        else {
            NewList = ListNew;
        }
        return __assign({}, state, { loading: false, list: NewList });
    },
    _a[financefund_2.FINANCE_POST_RS_FT_NO_INVOICE_LIST] = function (state, action) {
        var payload = action.payload;
        var list = state.list;
        var ListNew = payload;
        var NewList;
        if (list.rows && list.rows.length > 0) {
            NewList = __assign({}, payload, { rows: list.rows.concat(payload.rows) });
        }
        else {
            NewList = ListNew;
        }
        return __assign({}, state, { loading: false, list: NewList });
    },
    _a[financefund_2.FINANCE_POST_RS_FT_INCOME_LIST] = function (state, action) {
        var payload = action.payload;
        var list = state.list;
        var ListNew = payload;
        var NewList;
        if (list.rows && list.rows.length > 0) {
            NewList = __assign({}, payload, { rows: list.rows.concat(payload.rows) });
        }
        else {
            NewList = ListNew;
        }
        return __assign({}, state, { loading: false, list: NewList });
    },
    _a[financefund_2.FINANCE_POST_RS_FT_NO_REFUND_LIST] = function (state, action) {
        var payload = action.payload;
        var list = state.list;
        var ListNew = payload;
        var NewList;
        if (list.rows && list.rows.length > 0) {
            NewList = __assign({}, payload, { rows: list.rows.concat(payload.rows) });
        }
        else {
            NewList = ListNew;
        }
        return __assign({}, state, { loading: false, list: NewList });
    },
    _a[financefund_2.RESET_RS_FT_LIST] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { loading: false, list: payload });
    },
    _a[financefund_2.RS_OC_FT_SHEET_BY_ROWID] = function (state, action) {
        var payload = action.payload;
        //如果返回值为空时需要默认数据
        // if (payload.rows==''){
        //   payload.rows={arBalance:0.00,rnrAmt:0.00,sniAmt:0.00,diffAmt:0.00,invoiceDiffDebit:0.00,invoiceDiffCredit:0.00,sniDebit:0.00,sniCredit:0.00,adjustBalance:0.00}
        // }
        // 数据处理
        var Amount = payload.rows.arBalance - payload.rows.rnrAmt + payload.rows.sniAmt;
        var NotInvoice = payload.rows.invoiceDiffDebit - payload.rows.invoiceDiffCredit;
        var NotDelivery = payload.rows.sniDebit - payload.rows.sniCredit;
        var diffAmt = payload.rows.diffAmt;
        var adjustBalance = payload.rows.adjustBalance;
        var arBalance = payload.rows.arBalance;
        var sniAmt = payload.rows.sniAmt;
        var rnrAmt = payload.rows.rnrAmt;
        payload.rows.amount = Amount.toFixed(2);
        payload.rows.notInvoice = NotInvoice.toFixed(2);
        payload.rows.notDelivery = NotDelivery.toFixed(2);
        payload.rows.diffAmt = diffAmt.toFixed(2);
        payload.rows.adjustBalance = adjustBalance.toFixed(2);
        payload.rows.arBalance = arBalance.toFixed(2);
        payload.rows.sniAmt = sniAmt.toFixed(2);
        payload.rows.rnrAmt = rnrAmt.toFixed(2);
        return __assign({}, state, { loading: false, fundCustom: payload });
    },
    _a), {
    fundList: {},
    fundDetail: {},
    threecolumn: {},
    list: {},
    fundCustom: {}
});
