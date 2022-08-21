"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var request_1 = require('./../../utils/request.js');
var addAccount_1 = require('./../types/addAccount.js');
// 获取岗位选项列表
exports.getPostOptionList = redux_actions_1.createAction(addAccount_1.GET_POST_OPTION_LIST, function (data) { return request_1.request({ api: 'comm/dict.nd?pid=14181287560', method: 'GET', data: data }); });
// 获取待办选项列表
exports.getUpcomingOptionList = redux_actions_1.createAction(addAccount_1.GET_UPCOMING_OPTION_LIST, function (data, callback) { return request_1.request({ api: 'comm/dict.nd?pid=14170681474', method: 'GET', data: data, callback: callback }); });
// 获取通知选项列表
exports.getNoticeOptionList = redux_actions_1.createAction(addAccount_1.GET_NOTICE_OPTION_LIST, function (data, callback) { return request_1.request({ api: 'comm/dict.nd?pid=14170766619', method: 'GET', data: data, callback: callback }); });
// 获取角色、管理仓库、管辖门店组选项列表
exports.getCustOptionList = redux_actions_1.createAction(addAccount_1.GET_CUST_BASE_PERMISSION, function (data) { return request_1.request({ api: 'custbasePermission/getCustBaseRoleDataByCustId.nd', method: 'POST', data: data, type: 'stringfy' }); });
// 获取物料组选项列表
exports.getMatklOptionList = redux_actions_1.createAction(addAccount_1.GET_MATKL_AND_SHOP_DATA, function (data) { return request_1.request({ api: 'customer/getMatklAndShopData.nd', method: 'GET', data: data }); });
// 获取物料组选项列表
exports.getAccountDetails = redux_actions_1.createAction(addAccount_1.GET_ACCOUNT_DETAILS, function (data) { return request_1.request({ api: 'custbasePermission/getCustBasePermissionDataByCustId.nd', method: 'POST', data: data, type: 'stringfy' }); });
