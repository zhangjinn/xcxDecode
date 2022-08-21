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
var balance_1 = require('./../types/balance.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[balance_1.GET_BALANCE_INIT_DATA] = function (state, action) {
        return __assign({}, state, { initData: action.payload });
    },
    _a[balance_1.RESET_BALANCE_DATA] = function (state, action) {
        return __assign({}, state, { balance: {
                show: false
            } });
    },
    _a[balance_1.GET_BALANCE_INFO] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { balance: __assign({}, payload, { show: true }) });
    },
    _a[balance_1.GET_WAIT_BALANCE_INFO_LIST] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { waitBalanceList: payload });
    },
    //  重置考核通知单列表
    _a[balance_1.RESET_ASSESSMENT_NOTICE_LIST] = function (state, action) {
        return __assign({}, state, { assessmentNoticeList: [] });
    },
    // 获取考核通知单列表
    _a[balance_1.GET_ASSESSMENT_NOTICE_LIST] = function (state, action) {
        var orderList = state.orderList;
        var payload = action.payload;
        var orderListNew = payload;
        if (orderListNew && orderListNew.list) {
            orderListNew.list = orderListNew.list.map(function (item) {
                // item.noticeTime = item.noticeTime ? formatDate(item.noticeTime, 'Y-M-D h:m:s') : ''
                return item;
            });
        }
        if (orderList && orderList.list && orderList.list.length > 0) {
            orderListNew = __assign({}, payload, { list: orderList.list.concat(payload.data) });
        }
        else {
            orderListNew = __assign({}, payload, { list: payload.list });
        }
        return __assign({}, state, { loading: false, assessmentNoticeList: orderListNew });
    },
    // 查询考核通知单筛选列表
    _a[balance_1.GET_ASSESSMENT_NOTICE_FILTER_LIST] = function (state, action) {
        var payload = action.payload;
        var filterList = payload.systemConfigForm.paramList;
        var assessmentNoticeFilterList = {};
        var typeList = []; // 考核通知单筛选类型列表
        var statusList = []; // 考核通知单筛选状态列表
        filterList.forEach(function (item) {
            if (item.field == 'noticeStatus') {
                statusList = item.dictList.map(function (val) {
                    return { id: val.code, value: val.name };
                });
            }
            if (item.field == 'noticeType') {
                typeList = item.dictList.map(function (val) {
                    return { id: val.code, value: val.name };
                });
            }
        });
        assessmentNoticeFilterList.statusList = statusList;
        assessmentNoticeFilterList.typeList = typeList;
        return __assign({}, state, { assessmentNoticeFilterList: assessmentNoticeFilterList });
    },
    _a[balance_1.ASSESSMENT_NOTICE_APPEAL_APPLICATION] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { appealApplication: payload });
    },
    _a[balance_1.ASSESSMENT_NOTICE_CONFIRM] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { appealApplicationConfirm: payload });
    },
    _a), {
    initData: {
        enterpriseUser: {},
        orgList: [],
        matkls: []
    },
    balance: {
        show: false
    },
    assessmentNoticeList: [],
    assessmentNoticeFilterList: [],
    appealApplication: {},
    appealApplicationConfirm: {},
});
