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
var applyreturn_1 = require('./../types/applyreturn.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[applyreturn_1.SET_RETURN_BASE_INFO] = function (state, action) {
        var baseInfo = action.payload.baseInfo;
        return __assign({}, state, { baseInfo: baseInfo });
    },
    _a), {
    baseInfo: {},
});
