"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var request_1 = require('./../../utils/request.js');
var sanpinReceipt_1 = require('./../types/sanpinReceipt.js');
exports.getSalesOrderList = redux_actions_1.createAction(sanpinReceipt_1.GET_SALES_ORDER_LIST, function (data, callback) { return request_1.request({ api: 'pms/pmsApi/omsShopDeliveryShopPageQuery.nd', method: 'POST', data: data, type: 'application/json', callback: callback }); });
