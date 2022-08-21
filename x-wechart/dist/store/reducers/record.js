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
var record_1 = require('./../types/record.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[record_1.GET_CHECKIN_RECORD_BY_USERCODE] = function (state, action) {
        return __assign({}, state, { checkinRecord: action.payload.returnData ? (action.payload.returnData.storeCheckInRecordStore || []) : [] });
    },
    _a[record_1.ADD_CHECK_IN_RECORD] = function (state, action) {
        return __assign({}, state);
    },
    _a[record_1.GET_STORY_PERSONS] = function (state, action) {
        var storyPersons = action.payload.custAccountList || [];
        var adminAccount = action.payload.adminAccount || {};
        return __assign({}, state, { storyPersons: storyPersons,
            adminAccount: adminAccount });
    },
    _a[record_1.GET_REGIN] = function (state, action) {
        var regins = action.payload.list || [];
        regins.forEach(function (it) {
            it.level = 1;
        });
        return __assign({}, state, { regins: regins });
    },
    _a[record_1.GET_SHOP_LIST_BY_CUST] = function (state, action) {
        var shopList = action.payload.data.content || [];
        return __assign({}, state, { shopList: shopList });
    },
    _a), {
    storyPersons: [],
    checkinRecord: [],
    regins: [],
    shopList: [],
    adminAccount: {}
});
