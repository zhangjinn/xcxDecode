"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
// import { request } from '@/utils/request';
var requestJSON_1 = require('./../../utils/requestJSON.js');
var store_detail_1 = require('./../types/store-detail.js');
//获取门店销售明细
exports.queryAllStoreSaleDetailxtw = redux_actions_1.createAction(store_detail_1.QUERY_ALLSTORE_SALESDETAILXTW, function (data, callback) { return requestJSON_1.request({ api: 'cts/ctsApi.nd?', method: 'POST', data: data, callback: callback }); });
//获取门店all信息
exports.queryStoreAllInfo = redux_actions_1.createAction(store_detail_1.QUERY_STORE_ALLINFO, function (data, callback) { return requestJSON_1.request({ api: 'cts/ctsApi.nd?', method: 'POST', data: data, callback: callback }); });
//获取门店全部物料组
exports.queryAllMatkl = redux_actions_1.createAction(store_detail_1.QUERY_ALLMATKL, function (data, callback) { return requestJSON_1.request({ api: 'cts/ctsApi.nd?', method: 'POST', data: data, callback: callback }); });
//获取门店销售数据
exports.queryAllStoreSalesXtw = redux_actions_1.createAction(store_detail_1.QUERY_ALLSTORE_SALESXTW, function (data, callback) { return requestJSON_1.request({ api: 'cts/ctsApi.nd?', method: 'POST', data: data, callback: callback }); });
//竞争力排名
exports.custModelShopInfoRank = redux_actions_1.createAction(store_detail_1.CUSTMODEL_SHOPINFO_RANK, function (data, callback) { return requestJSON_1.request({ api: 'cts/ctsApi.nd?', method: 'POST', data: data, callback: callback }); });
//根据门店和物料组获取门店信息
exports.getStoreDetailByMat = redux_actions_1.createAction(store_detail_1.GET_STOREDETAIL_BYMAT, function (data, callback) { return requestJSON_1.request({ api: 'cts/ctsApi.nd?', method: 'POST', data: data, callback: callback }); });
//门店人员信息
exports.getStoryPersons = redux_actions_1.createAction(store_detail_1.GET_STORE_PERSON, function (data, callback) { return requestJSON_1.request({ api: 'cts/ctsApi.nd?', method: 'POST', data: data, callback: callback }); });
//门店档案列表
exports.storeRecordList = redux_actions_1.createAction(store_detail_1.GET_STORE_RECORDLIST, function (data, callback) { return requestJSON_1.request({ api: 'cts/ctsApi.nd?', method: 'POST', data: data, callback: callback }); });
//门店详情获取物料组
exports.getMaterialGroupToXtw = redux_actions_1.createAction(store_detail_1.CUSTMODEL_SHOPINFO_RANK, function (data, callback) { return requestJSON_1.request({ api: 'cts/ctsApi.nd?', method: 'POST', data: data, callback: callback }); });
//门店综合评价趋势图  
exports.storeEvaluationChart = redux_actions_1.createAction(store_detail_1.STORE_EVALUATION_CHART, function (data, callback) { return requestJSON_1.request({ api: 'cts/ctsApi.nd?', method: 'POST', data: data, callback: callback }); });
//门店巡店记录 
exports.getStoreInspectionRecordListForStore = redux_actions_1.createAction(store_detail_1.GET_STORE_INSPECTION, function (data, callback) { return requestJSON_1.request({ api: 'cts/ctsApi.nd?', method: 'POST', data: data, callback: callback }); });
//获得竞品排名 
exports.getCompetitorList = redux_actions_1.createAction(store_detail_1.GET_COMPETITOR_LIST, function (data, callback) { return requestJSON_1.request({ api: 'cts/ctsApi.nd?', method: 'POST', data: data, callback: callback }); });
