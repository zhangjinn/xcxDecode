"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
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
var user_1 = require('./../types/user.js');
var index_1 = require('./../../utils/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[user_1.USER_LOGIN_ACTION] = function (state, action) {
        var payload = action.payload;
        var accountConfirm = {};
        var sessionid = payload.sessionid, code = payload.code, account = payload.account, rest = __rest(payload, ["sessionid", "code", "account"]);
        var user = {
            organizationList: [],
            orgAndMatklList: [],
            basePartInfo: [],
            info: {},
            customer: {},
        };
        if (sessionid) {
            user = __assign({}, rest, { info: account });
        }
        if (code === 1001) {
            accountConfirm = account;
        }
        return __assign({}, state, user, { account: accountConfirm });
    },
    _a[user_1.USER_BIND_ACTION] = function (state) {
        return __assign({}, state);
    },
    _a[user_1.USER_LOGOUT_ACTION] = function (state) {
        return __assign({}, state, { organizationList: [], orgAndMatklList: [], basePartInfo: [], info: {}, customer: {}, 
            // 待确认信息的(首次登录需要)
            account: {} });
    },
    _a[user_1.USER_PERMISSIONS] = function (state, action) {
        var list = action.payload.list;
        index_1.removeStorage('b2b_permission_list');
        var storeObj = {}, subMenuList = [], subPurchaseMenuList = [], reportArea = [], specialArea = [], specialAreaNameList = [];
        // 所有权限列表
        storeObj.list = list;
        list.forEach(function (item) {
            if (item.sourceName.indexOf('首页') >= 0) {
                subMenuList = item.subMenuList;
            }
            if (item.sourceName === '采购中心') {
                subPurchaseMenuList = item.subMenuList;
            }
        });
        if (subMenuList.find(function (item) { return item.sourceName === '报表'; })) {
            reportArea = subMenuList.find(function (item) { return item.sourceName === '报表'; }).subMenuList;
        }
        if (subMenuList.find(function (item) { return item.sourceName === '专区'; })) {
            specialArea = subMenuList.find(function (item) { return item.sourceName === '专区'; }).subMenuList;
        }
        specialAreaNameList = specialArea.map(function (item) {
            return item.sourceName;
        });
        // 首页报表权限
        storeObj.reportArea = reportArea;
        // 首页专区权限(如果没权限，跳转到产品采购页面时显示无权限)
        storeObj.specialArea = specialAreaNameList;
        // 首页专区权限影响的产品采购权限(如果以下四个专区均无权限，点击产品采购tab时，产品采购页面显示未登陆状态下的产品列表)
        storeObj.productPurchaseAuthority = false;
        if (specialAreaNameList.includes('工程专区') || specialAreaNameList.includes('特惠专区') || specialAreaNameList.includes('套购专区') || specialAreaNameList.includes('定制专区')) {
            storeObj.productPurchaseAuthority = true;
        }
        // 购物车权限
        storeObj.shoppingCartPermissions = false;
        if (subPurchaseMenuList.find(function (item) { return item.sourceName === '购物车'; })) {
            storeObj.shoppingCartPermissions = true;
        }
        // 搜索权限
        storeObj.searchPermissions = false;
        if (subPurchaseMenuList.find(function (item) { return item.sourceName === '搜索框'; })) {
            storeObj.searchPermissions = true;
        }
        // 产品采购权限(如果没有产品采购权限菜单，点击产品采购tab时，海信采购列表、渠道采购列表显示无权限，其他专区列表显示根据各专区权限)
        storeObj.generalZonePermissions = false;
        if (list.find(function (item) { return item.sourceName === '产品采购'; })) {
            storeObj.generalZonePermissions = true;
        }
        index_1.setStorage('b2b_permission_list', JSON.stringify(storeObj));
        return __assign({}, state, { storePermissions: storeObj });
    },
    _a[user_1.USER_ALERT] = function (state, action) {
        var list = action.payload.list;
        index_1.removeStorage('b2b_alert');
        index_1.setStorage('b2b_alert', JSON.stringify(list));
        return __assign({}, state, { storeAlert: list });
    },
    _a), {
    organizationList: [],
    orgAndMatklList: [],
    basePartInfo: [],
    info: {},
    customer: {},
    // 待确认信息的(首次登录需要)
    account: {},
    storePermissions: {},
    storeAlert: {},
});
