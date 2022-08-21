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
var salesorderdetail_1 = require('./../types/salesorderdetail.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var index_1 = require('./../../utils/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    // 订单详情
    _a[salesorderdetail_1.GET_SALES_ORDER_DETAIL] = function (state, action) {
        var payload = action.payload;
        var orderDetail = payload;
        orderDetail.data.acknowledgedTotalAmount = Number(orderDetail.data.acknowledgedTotalAmount).toFixed(2);
        var loadingCode = [];
        var loadingOrgId = [];
        var loadingOrgCode = [];
        var loadingNumber = [];
        orderDetail.data.outBoundItem.forEach(function (it) {
            it.omsOrderStatus = it.omsOrderStatus.filter(function (it) { return it.orderStatusName || it.remark; });
            it.omsOrderStatus.forEach(function (item) {
                if (item.orderStatusName) {
                    item.text = "[" + item.orderStatusName + "] " + item.remark;
                    if (item.orderStatus == 'CREATE_FAIL') {
                        item.text = item.text + item.extendCode1;
                    }
                }
                else {
                    item.text = item.remark;
                }
                // item.desc = item.reserveTime
                // item.desc = item.reserveTime
            });
        });
        ramda_1.forEach(function (item) {
            loadingCode.push(item.productCode);
            loadingNumber.push(item.backnowledgedQty);
            loadingOrgId.push(orderDetail.data.orgId);
            loadingOrgCode.push(orderDetail.data.orgCode);
            if (item.backnowledgedPrice) {
                item.backnowledgedPrice = Number(item.backnowledgedPrice).toFixed(2);
            }
            if (item.backnowledgedQty) {
                item.backnowledgedQty = Number(item.backnowledgedQty).toFixed(0);
            }
            var _a = index_1.formatDmsImg({ model: item.model, material: item.materialGroupCode }), img = _a.img, err = _a.err;
            item.img = img;
            item.err = err;
        }, orderDetail.data.salesOrderItem || []);
        var loadingInfo = {
            code: loadingCode.join(','),
            orgCode: loadingOrgId.join(','),
            orgId: loadingOrgCode.join(','),
            productNumbers: loadingNumber.join(','),
            _data: new Date().getTime()
        };
        return __assign({}, state, { loading: false, orderdetail: orderDetail, loadingInfo: loadingInfo });
    },
    // 库存回调
    _a[salesorderdetail_1.GET_SALES_CIS_STOCKS] = function (state, action) {
        var payload = action.payload;
        var orderdetail = state.orderdetail;
        var salesOrderItem = orderdetail.data.salesOrderItem;
        if (payload && payload.length > 0) {
            ramda_1.forEach(function (item) {
                ramda_1.forEach(function (res) {
                    if (item.productCode == res.productCode) {
                        res.inventory = item.inventory;
                    }
                }, salesOrderItem);
            }, payload);
        }
        return __assign({}, state, { orderdetail: __assign({}, orderdetail) });
    },
    // 渠道订单详情
    _a[salesorderdetail_1.NORMAL_ORDER_EDIT] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { loading: false, normalorderdetail: payload });
    },
    // 零售订单详情
    _a[salesorderdetail_1.RETAIL_ORDER_EDIT] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { loading: false, retailorderdetail: payload });
    },
    // 渠道采购订单详情
    _a[salesorderdetail_1.GET_PURCHASE_ORDER_DETAIL] = function (state, action) {
        //出库数据数组格式化
        var formatArray = function (resData) {
            var dataInfo = {};
            resData.forEach(function (item, index) {
                var documentNum = item.documentNum;
                if (!dataInfo[documentNum]) {
                    dataInfo[documentNum] = {
                        documentNum: documentNum,
                        child: []
                    };
                }
                item.isActive = false;
                if (index == 0) {
                    item.isActive = true;
                }
                dataInfo[documentNum].child.push(item);
            });
            var list = Object.values(dataInfo); // list 转换成功的数据
            // 设置默认显示的c单
            list = list.map(function (res, index) {
                res.child = res.child.map(function (child, idx) {
                    return child;
                });
                return __assign({}, res, res.child[0]);
            });
            return list;
        };
        var payload = action.payload;
        var orderDetail = payload;
        orderDetail.data.totalAmount = Number(orderDetail.data.totalAmount).toFixed(2);
        orderDetail.data.totalOrderedQty = Number(orderDetail.data.totalOrderedQty).toFixed(0);
        ramda_1.forEach(function (item) {
            if (item.price) {
                item.price = Number(item.price).toFixed(2);
            }
            if (item.orderedQty) {
                item.orderedQty = Number(item.orderedQty).toFixed(0);
            }
        }, orderDetail.data.purchaseOrderItem || []);
        orderDetail.data.outBoundItem.forEach(function (it) {
            if (it.omsOrderStatus.length > 0) {
                it.omsOrderStatusName = it.omsOrderStatus[0].orderStatusName;
                it.reserveTime = it.omsOrderStatus[0].reserveTime;
            }
            it.omsOrderStatus = it.omsOrderStatus.filter(function (it) { return it.orderStatusName || it.remark; });
            it.omsOrderStatus.forEach(function (item) {
                if (item.orderStatusName) {
                    item.text = "[" + item.orderStatusName + "] " + item.remark;
                }
                else {
                    item.text = item.remark;
                }
                // item.desc = item.reserveTime
            });
        });
        if (orderDetail.data.outBoundItem && orderDetail.data.outBoundItem.length > 0) {
            orderDetail.data.outBoundItem = formatArray(orderDetail.data.outBoundItem);
        }
        return __assign({}, state, { loading: false, purchaseorderdetail: orderDetail });
    },
    //审核信息
    _a[salesorderdetail_1.GET_PURCHASE_EXAM_INFO] = function (state, action) {
        var payload = action.payload;
        /*console.log(payload)
        payload.data.examBy = "王虎成"
        payload.data.examTime = "2020-03-07 12:00:00"
        payload.data.examOpinion = "在这里输入你要审核的内容，尝试这里的文字输入超长时间是否会有影响"*/
        return __assign({}, state, { purchaseExamInfo: payload });
    },
    _a), {
    orderdetail: {},
    normalorderdetail: {},
    retailorderdetail: {},
    purchaseorderdetail: {},
    loadingInfo: {},
    purchaseExamInfo: {}
});
