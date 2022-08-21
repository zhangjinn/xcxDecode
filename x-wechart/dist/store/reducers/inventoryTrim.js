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
var ramda_1 = require('./../../npm/ramda/src/index.js');
var index_1 = require('./../../utils/index.js');
var inventoryTrim_1 = require('./../types/inventoryTrim.js');
// import { concat } from 'ramda'
exports.default = redux_actions_1.handleActions((_a = {},
    // 库存调整列表
    _a[inventoryTrim_1.GET_INVENTORY_LIST] = function (state, action) {
        var payload = action.payload;
        var inventoryTrimList = state.inventoryTrimList;
        var orderListNew = payload;
        if (payload.page && payload.page.pageNo > 1 && inventoryTrimList && inventoryTrimList.data && inventoryTrimList.data.length > 0) {
            orderListNew = __assign({}, payload, { data: inventoryTrimList.data.concat(payload.data) });
        }
        else {
            orderListNew = __assign({}, payload, { data: payload.data });
        }
        ramda_1.forEach(function (items) {
            if (items.documentDate) {
                items.documentDate = items.documentDate.split(' ')[0];
            }
            ramda_1.forEach(function (item) {
                if (item.bdemandQty) {
                    item.bdemandQty = Number(item.bdemandQty);
                }
                var _a = index_1.formatDmsImg({ model: item.model, material: item.materialGroupCode }), img = _a.img, err = _a.err;
                item.img = img;
                item.err = err;
            }, items.staItems || []);
        }, orderListNew.data || []);
        return __assign({}, state, { loading: false, inventoryTrimList: orderListNew });
    },
    //获取事务类型、单据状态
    _a[inventoryTrim_1.GET_BASE_INFO] = function (state, action) {
        var transactionType = [];
        var staStatus = [];
        var outlist = action.payload.data.transactionType;
        var inlist = action.payload.data.staStatus;
        for (var key in outlist) {
            transactionType.push({ id: key, name: outlist[key] });
        }
        for (var key in inlist) {
            staStatus.push({ id: key, name: inlist[key] });
        }
        return __assign({}, state, { staStatus: staStatus,
            transactionType: transactionType });
    },
    //仓库列表
    _a[inventoryTrim_1.GET_STORE_HOUSE] = function (state, action) {
        var storeHouse = [];
        var storeList = action.payload.data;
        storeHouse = storeList.map(function (item) {
            return {
                id: item.cId,
                type: item.type,
                name: item.name
            };
        });
        return __assign({}, state, { storeHouse: storeHouse });
    },
    _a), {
    inventoryTrimList: [],
    staStatus: [],
    transactionType: [],
    storeHouse: []
});
