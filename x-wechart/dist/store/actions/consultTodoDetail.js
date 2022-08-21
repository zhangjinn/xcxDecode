"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var consultTodoDetail_1 = require('./../types/consultTodoDetail.js');
var request_1 = require('./../../utils/request.js');
// 订单详情
exports.getSalesOrderConsult = redux_actions_1.createAction(consultTodoDetail_1.GET_SALES_ORDER_CONSULT, function (data) { return request_1.request({ api: "order/getSalesOrderConsult.htm", method: 'GET', data: data }); });
// 审批提交
exports.submit = redux_actions_1.createAction(consultTodoDetail_1.SUBMIT, function (data) { return request_1.request({ api: "order/updateConsultLog.nd", method: 'POST', data: data }); });
