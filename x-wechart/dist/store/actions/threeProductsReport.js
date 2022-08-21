"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var request_1 = require('./../../utils/request.js');
var threeProductsReport_1 = require('./../types/threeProductsReport.js');
// request({
//   api: `pms/pmsApi/pmsShopPlanShopPageQuery.nd`,
//   method: 'POST',
//   data: {},
//   type: 'application/json',
//   callback: (res: any) => {
//     // const { data } = res
//     console.log(res)
//   }
// })
exports.getSalesOrderListNew = redux_actions_1.createAction(threeProductsReport_1.GET_SALES_ORDER_LIST_NEW, function (data, callback) { return request_1.request({ api: 'pms/pmsApi/pmsShopPlanShopPageQuery.nd', method: 'POST', data: data, type: 'application/json', callback: callback }); });
