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
var consultTodo_1 = require('./../types/consultTodo.js');
var shopTodo_1 = require('./../types/shopTodo.js');
var index_1 = require('./../../utils/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[consultTodo_1.GET_CONSULT_TODO_COUNTS] = function (state, action) {
        var count = action.payload.count;
        return __assign({}, state, { count: count });
    },
    _a[consultTodo_1.GET_SHOP_FIX_TODO_COUNTS] = function (state, action) {
        var count = action.payload.count;
        return __assign({}, state, { fixCount: count });
    },
    _a[shopTodo_1.GET_SHOP_TODO_COUNTS] = function (state, action) {
        var count = action.payload.count;
        return __assign({}, state, { shopCount: count });
    },
    _a[consultTodo_1.GET_REPORT_COUNTS] = function (state, action) {
        var count = action.payload.count;
        return __assign({}, state, { reportCount: count });
    },
    _a[consultTodo_1.GET_RECEIPT_COUNTS] = function (state, action) {
        var count = action.payload.count;
        return __assign({}, state, { receiptCount: count });
    },
    _a[consultTodo_1.GET_ASSESSMENT_NOTICE_COUNTS] = function (state, action) {
        var count = action.payload.count;
        return __assign({}, state, { assessmentNoticeCount: count });
    },
    _a[consultTodo_1.GET_NEW_STORE_COUNTS] = function (state, action) {
        var count = action.payload.count;
        return __assign({}, state, { newStoreCount: count });
    },
    _a[consultTodo_1.GET_CONSULT_TODO_ITEMS] = function (state, action) {
        var payload = action.payload;
        var priceDelegateMessageList = payload.priceDelegateMessageList, pull = payload.pull, totalPages = payload.totalPages;
        var items = { data: [], empty: true, total: totalPages };
        if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
            var list = ramda_1.map(function (_a) {
                var id = _a.id, title = _a.title, content = _a.content, orgName = _a.orgName, endDate = _a.endDate, status = _a.status, taskStatus = _a.taskStatus, createDateStr = _a.createDateStr;
                return ({
                    id: id, title: title, content: content, orgName: orgName, status: status, endDate: index_1.formatDate(endDate, 'Y-M-D h:m'), taskStatus: taskStatus, createDateStr: createDateStr
                });
            }, priceDelegateMessageList);
            items.data = list;
            if (pull) {
                // 下拉加载更多
                var preData = state.items.data;
                items.data = preData.concat(list);
            }
        }
        return __assign({}, state, { items: items });
    },
    _a[consultTodo_1.GET_SHOP_FIX_TODO_ITEMS] = function (state, action) {
        var payload = action.payload;
        var priceDelegateMessageList = payload.priceDelegateMessageList, pull = payload.pull, totalPages = payload.totalPages;
        var items = { data: [], empty: true, total: totalPages };
        if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
            var list = ramda_1.map(function (_a) {
                var sourceId = _a.sourceId, id = _a.id, title = _a.title, content = _a.content, orgName = _a.orgName, endDate = _a.endDate, status = _a.status, taskStatus = _a.taskStatus, createDateStr = _a.createDateStr;
                return ({
                    sourceId: sourceId, id: id, title: title, content: content, orgName: orgName, status: status, endDate: index_1.formatDate(endDate, 'Y-M-D h:m'), taskStatus: taskStatus, createDateStr: createDateStr
                });
            }, priceDelegateMessageList);
            items.data = list;
            if (pull) {
                // 下拉加载更多
                var preData = state.fixItems.data;
                items.data = preData.concat(list);
            }
        }
        return __assign({}, state, { fixItems: items });
    },
    _a[shopTodo_1.GET_SHOP_TODO_ITEMS] = function (state, action) {
        var payload = action.payload;
        var priceDelegateMessageList = payload.priceDelegateMessageList, pull = payload.pull, totalPages = payload.totalPages;
        var items = { data: [], empty: true, total: totalPages };
        if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
            var list = ramda_1.map(function (_a) {
                var id = _a.id, title = _a.title, content = _a.content, orgName = _a.orgName, endDate = _a.endDate, status = _a.status, taskStatus = _a.taskStatus, createDateStr = _a.createDateStr;
                return ({
                    id: id, title: title, content: content, orgName: orgName, status: status, endDate: index_1.formatDate(endDate, 'Y-M-D h:m'), taskStatus: taskStatus, createDateStr: createDateStr
                });
            }, priceDelegateMessageList);
            items.data = list;
            if (pull) {
                // 下拉加载更多
                var preData = state.shopItem.data;
                items.data = preData.concat(list);
            }
        }
        return __assign({}, state, { shopItem: items });
    },
    _a[consultTodo_1.GET_REPORT_ITEMS] = function (state, action) {
        var payload = action.payload;
        var priceDelegateMessageList = payload.priceDelegateMessageList, pull = payload.pull, totalPages = payload.totalPages;
        var items = { data: [], empty: true, total: totalPages };
        if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
            var list = ramda_1.map(function (_a) {
                var id = _a.id, title = _a.title, content = _a.content, orgName = _a.orgName, endDate = _a.endDate, status = _a.status, taskStatus = _a.taskStatus, createDateStr = _a.createDateStr, sourceId = _a.sourceId;
                return ({
                    id: id, title: title, content: content, orgName: orgName, status: status, endDate: index_1.formatDate(endDate, 'Y-M-D h:m'), taskStatus: taskStatus, createDateStr: createDateStr, sourceId: sourceId
                });
            }, priceDelegateMessageList);
            items.data = list;
            if (pull) {
                // 下拉加载更多
                var preData = state.reportItems.data;
                items.data = preData.concat(list);
            }
        }
        return __assign({}, state, { reportItems: items });
    },
    _a[consultTodo_1.GET_RECEIPT_ITEMS] = function (state, action) {
        var payload = action.payload;
        var priceDelegateMessageList = payload.priceDelegateMessageList, pull = payload.pull, totalPages = payload.totalPages;
        var items = { data: [], empty: true, total: totalPages };
        if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
            var list = ramda_1.map(function (_a) {
                var id = _a.id, title = _a.title, content = _a.content, orgName = _a.orgName, endDate = _a.endDate, status = _a.status, taskStatus = _a.taskStatus, createDateStr = _a.createDateStr, sourceId = _a.sourceId;
                return ({
                    id: id, title: title, content: content, orgName: orgName, status: status, endDate: index_1.formatDate(endDate, 'Y-M-D h:m'), taskStatus: taskStatus, createDateStr: createDateStr, sourceId: sourceId
                });
            }, priceDelegateMessageList);
            items.data = list;
            if (pull) {
                // 下拉加载更多
                var preData = state.receiptItems.data;
                items.data = preData.concat(list);
            }
        }
        return __assign({}, state, { receiptItems: items });
    },
    _a[consultTodo_1.GET_ASSESSMENT_NOTICE_ITEMS] = function (state, action) {
        var payload = action.payload;
        var priceDelegateMessageList = payload.priceDelegateMessageList, pull = payload.pull, totalPages = payload.totalPages;
        var items = { data: [], empty: true, total: totalPages };
        if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
            var list = ramda_1.map(function (_a) {
                var id = _a.id, title = _a.title, content = _a.content, orgName = _a.orgName, endDate = _a.endDate, status = _a.status, taskStatus = _a.taskStatus, createDateStr = _a.createDateStr, sourceId = _a.sourceId, sourceUrl = _a.sourceUrl;
                return ({
                    id: id, title: title, content: content, orgName: orgName, status: status, endDate: index_1.formatDate(endDate, 'Y-M-D h:m'), taskStatus: taskStatus, createDateStr: createDateStr, sourceId: sourceId, sourceUrl: sourceUrl
                });
            }, priceDelegateMessageList);
            items.data = list;
            if (pull) {
                // 下拉加载更多
                var preData = state.assessmentNoticeItems.data;
                items.data = preData.concat(list);
            }
        }
        return __assign({}, state, { assessmentNoticeItems: items });
    },
    _a[consultTodo_1.GET_NEW_STORE_ITEMS] = function (state, action) {
        var payload = action.payload;
        var priceDelegateMessageList = payload.priceDelegateMessageList, pull = payload.pull, totalPages = payload.totalPages;
        var items = { data: [], empty: true, total: totalPages };
        if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
            var list = ramda_1.map(function (_a) {
                var id = _a.id, title = _a.title, content = _a.content, orgName = _a.orgName, endDate = _a.endDate, status = _a.status, taskStatus = _a.taskStatus, createDateStr = _a.createDateStr, sourceId = _a.sourceId;
                return ({
                    id: id, title: title, content: content, orgName: orgName, status: status, endDate: index_1.formatDate(endDate, 'Y-M-D h:m'), taskStatus: taskStatus, createDateStr: createDateStr, sourceId: sourceId
                });
            }, priceDelegateMessageList);
            items.data = list;
            if (pull) {
                // 下拉加载更多
                var preData = state.newStoreItems.data;
                items.data = preData.concat(list);
            }
        }
        return __assign({}, state, { newStoreItems: items });
    },
    _a), {
    count: 0,
    fixCount: 0,
    shopCount: 0,
    reportCount: 0,
    receiptCount: 0,
    assessmentNoticeCount: 0,
    newStoreCount: 0,
    items: {
        data: [],
        empty: true,
        total: 0,
    },
    fixItems: {
        data: [],
        empty: true,
        total: 0,
    },
    shopItem: {
        data: [],
        empty: true,
        total: 0,
    },
    reportItems: {
        data: [],
        empty: true,
        total: 0,
    },
    receiptItems: {
        data: [],
        empty: true,
        total: 0,
    },
    assessmentNoticeItems: {
        data: [],
        empty: true,
        total: 0,
    },
    newStoreItems: {
        data: [],
        empty: true,
        total: 0,
    },
});
