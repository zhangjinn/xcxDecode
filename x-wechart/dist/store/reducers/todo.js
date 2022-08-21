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
var todo_1 = require('./../types/todo.js');
var index_1 = require('./../../utils/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[todo_1.GET_TODO_COUNTS] = function (state, action) {
        var count = action.payload.count;
        return __assign({}, state, { count: count });
    },
    _a[todo_1.GET_TODO_ITEMS] = function (state, action) {
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
    _a), {
    count: 0,
    items: {
        data: [],
        empty: true,
        total: 0,
    },
});
