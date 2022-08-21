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
var account_1 = require('./../types/account.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[account_1.SET_ACCOUNT_EDIT_ONE] = function (state, action) {
        var account = action.payload.account;
        return __assign({}, state, { editAccount: account });
    },
    _a[account_1.SET_ACCOUNT_LOGIN_SYSTEM_AND_BASE_MATKL] = function (state, action) {
        var _a = action.payload, loginSystemList = _a.loginSystemList, baseMatklList = _a.baseMatklList, shopList = _a.shopList, custShopList = _a.custShopList;
        return __assign({}, state, { baseMatklList: baseMatklList,
            loginSystemList: loginSystemList,
            shopList: shopList,
            custShopList: custShopList });
    },
    _a), {
    editAccount: {},
    baseMatklList: [],
    loginSystemList: [],
    shopList: [],
    custShopList: []
});
