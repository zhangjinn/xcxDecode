"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var request_1 = require('./../../utils/request.js');
var audit_order_1 = require('./../types/audit-order.js');
// 获取订单列表
exports.getOrderList = redux_actions_1.createAction(audit_order_1.GET_AUDIT_ORDERS, function (data, callback) { return request_1.request({ api: 'order/list.nd', method: 'GET', data: data, callback: callback }); });
// 订单详情
exports.getOrderDetail = redux_actions_1.createAction(audit_order_1.GET_AUDIT_ORDER_DETAIL, function (data) { return request_1.request({ api: 'order/orderLine.nd', method: 'GET', data: data }); });
