"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description:
 * @Version: 2.0
 * @Autor: sqk
 * @Date: 2020-08-14 08:54:20
 * @LastEditors: sqk
 * @LastEditTime: 2020-08-17 12:55:38
 */
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var order_detail_1 = require('./../types/order-detail.js');
var request_1 = require('./../../utils/request.js');
// 订单详情
exports.getOrderDetail = redux_actions_1.createAction(order_detail_1.GET_ORDER_DETAIL, function (data) { return request_1.request({ api: "order/orderLine.nd", method: 'GET', data: data }); });
//取消原因列表
exports.getCancelReasonList = redux_actions_1.createAction(order_detail_1.GET_CANCEL_LIST, function (data) { return request_1.request({ api: "comm/dict.nd?pid=14963960650", method: 'GET', data: data }); });
//取消原因列表
//export const queryCisOrderStatusInfoMobile = createAction(GET_QUERY_CIS_ORDER_STATUS_INFO_MOBILE, (data: orderCode) => request({ api: `http://cistest.hisense.com/b2b-rest/queryCisOrderStatusInfoMobile`, method: 'GET', data}))
//export const queryCisOrderStatusInfoMobile = createAction(GET_QUERY_CIS_ORDER_STATUS_INFO_MOBILE, (data: orderCode) => request({ api: `https://xtw.hisense.com/front/order/queryCisOrderStatusInfoMobile.nd`, method: 'GET', data}))
exports.queryCisOrderStatusInfoMobile = redux_actions_1.createAction(order_detail_1.GET_QUERY_CIS_ORDER_STATUS_INFO_MOBILE, function (data) { return request_1.request({ api: "order/queryCisOrderStatusInfoMobile.nd", method: 'GET', data: data }); });
