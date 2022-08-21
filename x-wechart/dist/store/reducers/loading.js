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
var loading_1 = require('./../types/loading.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[loading_1.LOADING_MSG] = function (state, action) {
        var loading = state.loading;
        var payload = action.payload;
        return __assign({}, state, { loading: payload || !loading });
    },
    _a[loading_1.SHOW_POPUP_TOAST] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { popup: payload });
    },
    _a), {
    loading: false,
    popup: {
        show: false,
        info: ''
    }
});
