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
var inventory_1 = require('./../types/inventory.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    // 分销商库存列表
    _a[inventory_1.GET_DISTRIBUTOR_INVENTORY_INQUIRY] = function (state, action) {
        var payload = action.payload;
        var data = payload.data, page = payload.page;
        var totalPage = page.totalPage;
        var distributorInventoryList = state.distributorInventoryList;
        var newList;
        if (distributorInventoryList && distributorInventoryList.length > 0 && data.length > 0) {
            newList = ramda_1.concat(distributorInventoryList, data);
        }
        else {
            newList = data;
        }
        return __assign({}, state, { distributorInventoryList: newList, distributorTotalPage: totalPage });
    },
    // 重置分销商库存列表
    _a[inventory_1.RESET_DISTRIBUTOR_INVENTORY_INQUIRY] = function (state, action) {
        return __assign({}, state, { distributorInventoryList: [] });
    },
    _a[inventory_1.RESET_INVENTORY_QUERIES_LIST] = function (state, action) {
        return __assign({}, state, { inventoryList: [] });
    },
    _a[inventory_1.RESET_INVENTORY_QUERIES_LIST_IN] = function (state, action) {
        return __assign({}, state, { inventoryListIn: [] });
    },
    //补差类型
    _a[inventory_1.DMS_INV_STATUS_TYPE] = function (state, action) {
        var invStatusType = [];
        var list = action.payload.data;
        invStatusType = list.map(function (item) {
            for (var key in item) {
                return {
                    id: key,
                    name: item[key]
                };
            }
        });
        return __assign({}, state, { invStatus: invStatusType });
    },
    // 库存列表
    _a[inventory_1.GET_INVENTORY_QUERIES_LIST] = function (state, action) {
        var payload = action.payload;
        var data = payload.data, page = payload.page;
        var totalPage = page.totalPage;
        var inventoryList = state.inventoryList;
        data.forEach(function (d) {
            d.moreSign = true;
            d.checked = true;
        });
        var newList;
        if (inventoryList && inventoryList.length > 0 && data.length > 0) {
            newList = ramda_1.concat(inventoryList, data);
        }
        else {
            newList = data;
        }
        return __assign({}, state, { inventoryList: newList, totalPage: totalPage });
    },
    // 库存列表
    _a[inventory_1.GET_INVENTORY_QUERIES_LIST_IN] = function (state, action) {
        var payload = action.payload;
        var products = payload.products, page = payload.page;
        var totalPage = page.totalPage;
        var inventoryListIn = state.inventoryListIn;
        products.forEach(function (d) {
            d.moreSign = true;
            d.checked = true;
        });
        var newList;
        if (inventoryListIn && inventoryListIn.length > 0 && products.length > 0) {
            newList = ramda_1.concat(inventoryListIn, products);
        }
        else {
            newList = products;
        }
        return __assign({}, state, { inventoryListIn: newList, totalPage: totalPage });
    },
    _a[inventory_1.GET_DISTRIBUTOR_TYPE] = function (state, action) {
        return __assign({}, state);
    },
    // 未结预留列表
    _a[inventory_1.GET_OPEN_RESERVATION] = function (state, action) {
        var payload = action.payload;
        var data = payload.data, page = payload.page;
        var totalPage = page.totalPage;
        var openReservationList = state.openReservationList;
        var newList;
        if (openReservationList && openReservationList.length > 0 && data.length > 0) {
            newList = ramda_1.concat(openReservationList, data);
        }
        else {
            newList = data;
        }
        return __assign({}, state, { openReservationList: newList, openReservationTotalPage: totalPage });
    },
    // 重置分销商库存列表
    _a[inventory_1.RESET_OPEN_RESERVATION] = function (state, action) {
        return __assign({}, state, { openReservationList: [] });
    },
    // 库存列表
    _a[inventory_1.GET_SING_INVENTORY_QUERIES_LIST] = function (state, action) {
        var payload = action.payload;
        var data = payload.data, page = payload.page;
        var totalPage = page.totalPage;
        var inventoryList = state.inventoryList;
        data.forEach(function (d) {
            d.moreSign = true;
            d.checked = true;
        });
        var newList;
        if (inventoryList && inventoryList.length > 0 && data.length > 0) {
            newList = ramda_1.concat(inventoryList, data);
        }
        else {
            newList = data;
        }
        return __assign({}, state, { inventoryList: newList, totalPage: totalPage });
    },
    _a), {
    inventoryList: [],
    inventoryListIn: [],
    totalPage: '',
    distributorInventoryList: [],
    distributorTotalPage: '',
    invStatus: [],
    openReservationList: [],
    openReservationTotalPage: [],
});
