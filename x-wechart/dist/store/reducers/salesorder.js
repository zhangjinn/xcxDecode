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
var salesorder_1 = require('./../types/salesorder.js');
var index_1 = require('./../../utils/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[salesorder_1.RESET_SALES_ORDER_INQUIRY_LIST] = function (state, action) {
        return __assign({}, state, { orderList: [] });
    },
    _a[salesorder_1.GET_SALES_ORDER_LIST] = function (state, action) {
        var payload = action.payload;
        var orderList = state.orderList;
        var orderListNew = payload;
        if (payload.page && payload.page.currPage > 1 && orderList && orderList.data && orderList.data.length > 0) {
            orderListNew = __assign({}, payload, { data: orderList.data.concat(payload.data) });
        }
        else {
            orderListNew = __assign({}, payload, { data: payload.data });
        }
        ramda_1.forEach(function (items) {
            // console.log(items.salesOrderItem);
            ramda_1.forEach(function (item) {
                if (item.backnowledgedQty) {
                    item.backnowledgedQty = Number(item.backnowledgedQty);
                }
                if (item.shippedBqty) {
                    item.shippedBqty = Number(item.shippedBqty);
                }
                var _a = index_1.formatDmsImg({ model: item.model, material: item.materialGroupCode }), img = _a.img, err = _a.err;
                item.img = img;
                item.err = err;
            }, items.salesOrderItem || []);
        }, orderListNew.data || []);
        return __assign({}, state, { loading: false, orderList: orderListNew });
    },
    // 获取基础藏库
    _a[salesorder_1.GET_SALES_ORDER_FILTER] = function (state, action) {
        var payload = action.payload;
        var type = payload.type;
        switch (type) {
            case 'djlx':
                var documentTypeList_1 = [];
                var data = payload.data;
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            value: value,
                            key: key,
                            isSelect: false,
                        };
                        documentTypeList_1.push(item);
                    }, value);
                }, data);
                return __assign({}, state, { documentTypeList: documentTypeList_1 });
            case 'gys':
                var SuppliersList_1 = [];
                var data = payload.data;
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            value: value,
                            key: key,
                            isSelect: false,
                        };
                        SuppliersList_1.push(item);
                    }, value);
                }, data);
                if (SuppliersList_1.length > 0) {
                    SuppliersList_1[0].isSelect = true;
                }
                var Supplier = SuppliersList_1[0].value;
                return __assign({}, state, { SuppliersList: SuppliersList_1,
                    Supplier: Supplier });
        }
    },
    _a[salesorder_1.CANCLE_SALES_ORDER] = function (state, action) {
        var payload = action.payload;
        var data = payload;
        return __assign({}, state, { res: data });
    },
    _a[salesorder_1.DELETE_SALES_ORDER] = function (state, action) {
        var payload = action.payload;
        var data = payload;
        return __assign({}, state, { res: data });
    },
    _a[salesorder_1.GET_PURCHASE_ORDER_LIST] = function (state, action) {
        var payload = action.payload;
        var purchaseorderList = state.purchaseorderList;
        var orderListNew = payload;
        // if (payload.page && payload.page.currPage > 1) {
        //   orderListNew = { ...payload, data: purchaseorderList.data.concat(payload.data) }
        // }
        ramda_1.forEach(function (items) {
            // 修改订单状态  如果shipmentStatusValue = 部分入库  则替换掉statusValue 中的状态
            if (items.shipmentStatusValue === "部分入库") {
                items.statusValue = items.shipmentStatusValue;
            }
            ramda_1.forEach(function (item) {
                if (item.price) {
                    item.price = Number(item.price).toFixed(2);
                }
                if (item.orderedQty) {
                    item.orderedQty = Number(item.orderedQty).toFixed(0);
                }
                var materialGroupCode = item.materialGroupCode, model = item.model;
                var img = index_1.formatDmsImg({ model: model, material: materialGroupCode });
                item.img = img.img;
                item.err = img.err;
            }, items.purchaseOrderItem || []);
            if (items.discountType == '90605') {
                items.purchaseOrderItemChange = index_1.combineObjIntoAnArray(items.purchaseOrderItem);
            }
        }, orderListNew.data || []);
        var NewList;
        if (purchaseorderList.data && purchaseorderList.data.length > 0) {
            // NewList = { ...payload, data: purchaseorderList.data.concat(payload.data) }
            NewList = __assign({}, payload, { data: purchaseorderList.data.concat(orderListNew.data) });
        }
        else {
            NewList = orderListNew;
        }
        return __assign({}, state, { loading: false, purchaseorderList: NewList });
    },
    _a[salesorder_1.RESET_PURCHASE_ORDER_LIST] = function (state, action) {
        return __assign({}, state, { purchaseorderList: [] });
    },
    _a[salesorder_1.AGENT_CANCELE_ORDER] = function (state, action) {
        var payload = action.payload;
        var data = payload;
        return __assign({}, state, { res: data });
    },
    _a[salesorder_1.CANSEL_ORDER_EXAMIN] = function (state, action) {
        var payload = action.payload;
        var data = payload;
        return __assign({}, state, { res: data });
    },
    _a), {
    orderList: {},
    documentTypeList: {},
    purchaseorderList: {},
    SuppliersList: {},
});
