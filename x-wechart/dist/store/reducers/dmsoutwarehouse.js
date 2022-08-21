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
var dmsoutwarehouse_1 = require('./../types/dmsoutwarehouse.js');
var index_1 = require('./../../utils/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[dmsoutwarehouse_1.DMS_OUT_WAREHOUSE_ORDER_LIST] = function (state, action) {
        var _a = action.payload, code = _a.code, data = _a.data, page = _a.page, allChecked = _a.allChecked;
        if (code === '0') {
            var currPage = page.currPage, totalPage = page.totalPage;
            var orderList = state.orderList;
            var newAllChecked = allChecked;
            var newOrderList = data.map(function (order) {
                order.outChecked = false;
                order.halfChecked = false;
                order.salesOrderItem = order.salesOrderItem.map(function (item, idx) {
                    var shippedBqty = item.shippedBqty, backnowledgedQty = item.backnowledgedQty, model = item.model, materialGroupCode = item.materialGroupCode;
                    return __assign({}, item, index_1.formatDmsImg({ model: model, material: materialGroupCode }), { outChecked: false, outQty: backnowledgedQty - shippedBqty, disableCheck: backnowledgedQty - shippedBqty > 0 ? false : true });
                });
                order.disableCheck = !order.salesOrderItem.some(function (item) { return !item.disableCheck; });
                if (order.salesOrderItem.length) {
                    if (order.discountTypeName == '组合购') {
                        var combinationPurchaseList = [];
                        //组合购将数组里'productGroup'属性相同的对象合并成一个数组
                        combinationPurchaseList = index_1.combineObjIntoAnArray(order.salesOrderItem);
                        order.salesOrderItem = combinationPurchaseList;
                    }
                }
                return __assign({}, order);
            });
            if (currPage !== 1) {
                newOrderList = orderList.concat(data);
                newAllChecked = false;
            }
            return __assign({}, state, { orderList: newOrderList, page: page, allChecked: newAllChecked });
        }
        return state;
    },
    _a[dmsoutwarehouse_1.DMS_OUT_WAREHOUSE_LIST] = function (state, action) {
        var _a = action.payload, code = _a.code, data = _a.data;
        if (code === '0') {
            return __assign({}, state, { warehouseList: data.map(function (obj) {
                    var id = Object.keys(obj)[0];
                    var value = obj[id];
                    return { id: id, value: value };
                }) });
        }
        return state;
    },
    _a[dmsoutwarehouse_1.DMS_OUT_WAREHOUSE_INV_STATUS_LIST] = function (state, action) {
        var _a = action.payload, code = _a.code, data = _a.data;
        if (code === '0') {
            return __assign({}, state, { invStatusList: data.map(function (obj) {
                    var id = Object.keys(obj)[0];
                    var value = obj[id];
                    return { id: id, value: value };
                }) });
        }
        return state;
    },
    _a[dmsoutwarehouse_1.DMS_GET_SUPPERLIER_LIST] = function (state, action) {
        var _a = action.payload, code = _a.code, data = _a.data;
        if (code === '0') {
            return __assign({}, state, { supperlierList: data.map(function (obj) {
                    var id = Object.keys(obj)[0];
                    var value = obj[id];
                    return { id: id, value: value };
                }) });
        }
        return state;
    },
    _a[dmsoutwarehouse_1.DMS_OUT_WAREHOUSE_CHG] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, payload);
    },
    _a[dmsoutwarehouse_1.DMS_CLEAR_OUT_WAREHOUSE] = function (state, action) {
        return __assign({}, state, { page: {
                currPage: 1,
                totalPage: 1,
                totalCount: 0,
            } });
    },
    _a[dmsoutwarehouse_1.DMS_SALE_FILTER_LIST] = function (state, action) {
        var _a = action.payload, code = _a.code, data = _a.data;
        if (code === '0') {
            return __assign({}, state, { saleFilterList: data.map(function (obj) {
                    var id = Object.keys(obj)[0];
                    var value = obj[id];
                    return { id: id, value: value };
                }) });
        }
        return state;
    },
    // [DMS_FIND_ALL_INVENTORY_LOG](state, action) {
    //   const { payload: { code, data, page } } = action
    //   if(code === '0') {
    //     return {
    //       ...state,
    //       inventoryLogList: data,
    //       logPage:page
    //     }
    //   }
    //   return state
    // },
    _a[dmsoutwarehouse_1.DMS_FIND_ALL_INVENTORY_LOG] = function (state, action) {
        var payload = action.payload;
        var inventoryLogList = state.inventoryLogList;
        var listNew = payload;
        //加入页数不为1 -> 数据相加
        if (payload.page.pageNo && payload.page.pageNo !== 1) {
            // listNew = { ...payload, headerList: inventoryLogList.headerList.concat(payload.data) }
            listNew = __assign({}, payload, { data: inventoryLogList.data.concat(payload.data) });
        }
        if (payload.code === '0') {
            return __assign({}, state, { inventoryLogList: listNew, logPage: payload.page });
        }
        return state;
    },
    _a[dmsoutwarehouse_1.DMS_GET_TRANSACTION_TYPE] = function (state, action) {
        var _a = action.payload, code = _a.code, data = _a.data;
        if (code === '0') {
            return __assign({}, state, { transactionType: data.map(function (obj) {
                    var id = Object.keys(obj)[0];
                    var value = obj[id];
                    return { id: id, value: value };
                }) });
        }
        return state;
    },
    _a[dmsoutwarehouse_1.CANCEL_REVIEW] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, payload);
    },
    _a), {
    orderList: [],
    page: {
        currPage: 1,
        totalPage: 1,
        totalCount: 0,
    },
    allChecked: false,
    warehouseList: [],
    invStatusList: [],
    supperlierList: [],
    orderDetail: {},
    inventoryLogList: [],
    logPage: {},
    transactionType: []
});
