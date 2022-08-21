"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var request_1 = require('./../../utils/request.js');
var fundclaim_1 = require('./../types/fundclaim.js');
// import { GET_FUND_CLAIM_AGENCY,GET_FUND_CLAIM_BUSSINESS } from '@/store/types/fundclaim'
// 获取统计数据
exports.getFundClaimCounts = redux_actions_1.createAction(fundclaim_1.GET_FFUND_CLAIM_COUNTS, function (data, callback) { return request_1.request({ api: 'finance/commonApi.nd', method: 'POST', data: data, type: 'json', callback: callback }); });
exports.getFundClaimDetail = redux_actions_1.createAction(fundclaim_1.GET_FFUND_CLAIM_DETAIL, function (data, callback) { return request_1.request({ api: 'finance/commonApi.nd', method: 'POST', data: data, type: 'json', callback: callback }); });
exports.postFundClaimHandle = redux_actions_1.createAction(fundclaim_1.POST_FUND_CLAIM_HANDLE, function (data, callback) { return request_1.request({ api: 'finance/commonApi.nd', method: 'POST', data: data, type: 'json', callback: callback }); });
exports.getFundClaimBussiness = redux_actions_1.createAction(fundclaim_1.GET_FUND_CLAIM_BUSSINESS, function (data, callback) { return request_1.request({ api: 'finance/getSellerInfo.nd', method: 'POST', data: data, type: 'json', callback: callback }); });
exports.getFundClaimAgency = redux_actions_1.createAction(fundclaim_1.GET_FUND_CLAIM_AGENCY, function (data, orgCode, callback) { return request_1.request({ api: 'finance/financeEditAndDetail.nd?orgCode=' + orgCode, method: 'GET', data: data, type: 'form', callback: callback }); });
// 资金流水查询条件
exports.getCapitalFlowQueryConditions = redux_actions_1.createAction(fundclaim_1.GET_CAPITAL_FLOW_QUERY_CONDITIONS, function (data, callback) { return request_1.request({ api: 'balance/flowBalanceParam.nd', method: 'GET', data: data, type: 'json', callback: callback }); });
// 资金流水信贷范围
exports.getCreditRange = redux_actions_1.createAction(fundclaim_1.GET_CREDIT_RANGE, function (data, callback) { return request_1.request({ api: 'balance/creditRange.nd', method: 'GET', data: data, type: 'json', callback: callback }); });
// 资金流水接口_copy
exports.getCapitalFlowList = redux_actions_1.createAction(fundclaim_1.GET_CAPITAL_FLOW_LIST, function (data, callback) { return request_1.request({ api: 'balance/flowBalance.nd', method: 'GET', data: data, type: 'json', callback: callback }); });
