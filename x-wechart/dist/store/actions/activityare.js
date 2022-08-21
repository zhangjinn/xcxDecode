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
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var activityare_1 = require('./../types/activityare.js');
var request_1 = require('./../../utils/request.js');
exports.getActivityList = redux_actions_1.createAction(activityare_1.GET_ACTIVITY_LIST, function (data) { return request_1.request({ api: "marketActivity/queryList.nd", method: 'POST', data: data }); });
exports.getActivityStatus = redux_actions_1.createAction(activityare_1.GET_ACTIVITY_STATUS, function (data) { return request_1.request({ api: "marketActivity/queryStatus.nd", method: 'POST', data: data }); });
exports.pagingActivityResult = redux_actions_1.createAction(activityare_1.PAGING_ACTIVITY_RESULT, function (data) { return request_1.request({ api: "marketActivity/queryResultList.nd", method: 'GET', data: __assign({}, data, { _loading: true }) }); });
// 营销活动列表
exports.getMarketingActivityList = redux_actions_1.createAction(activityare_1.GET_MARKETING_ACTIVITY_LIST, function (data, callback) { return request_1.request({ api: "b2bMarketActivity/getActivityList.nd", method: 'POST', data: data, callback: callback }); });
// 营销活动筛选条件-促销方式列表
exports.getMarketingActivityFilter = redux_actions_1.createAction(activityare_1.GET_MARKETING_ACTIVITY_FILTER, function (data, callback) { return request_1.request({ api: "b2bMarketActivity/getPromotionMethods.nd", method: 'POST', data: data, callback: callback }); });
// 营销活动详情
exports.getMarketingActivityDetail = redux_actions_1.createAction(activityare_1.GET_MARKETING_ACTIVITY_DETAIL, function (data, callback) { return request_1.request({ api: "b2bMarketActivity/getB2bActivityById.nd", method: 'POST', data: data, callback: callback }); });
// 营销活动-获取当前代理商下的所有分销商
exports.getMarketingActivityDistributor = redux_actions_1.createAction(activityare_1.GET_MARKETING_ACTIVITY_DISTRIBUTOR, function (data, callback) { return request_1.request({ api: "b2bMarketActivity/getFxCust.nd", method: 'POST', data: data, callback: callback }); });
// 专卖店活动-分页查询
exports.getSpecialShopActivityList = redux_actions_1.createAction(activityare_1.GET_SPECIAL_SHOP_ACTIVITY_LIST, function (data, callback) { return request_1.request({ api: "specialShopActivity/getActivityList.nd", method: 'POST', data: data, callback: callback }); });
// 专卖店活动-根据字典类型获取字典
exports.getSpecialShopDictBytype = redux_actions_1.createAction(activityare_1.GET_SPECIAL_SHOP_DICTBYTYPE, function (data, callback) { return request_1.request({ api: "specialShopActivity/getDictBytype.nd", method: 'POST', data: data, callback: callback }); });
// 专卖店活动-模糊搜索专卖店
exports.getSpecialShop = redux_actions_1.createAction(activityare_1.GET_SPECIAL_SHOP, function (data, callback) { return request_1.request({ api: "specialShopActivity/getSpecialShop.nd", method: 'POST', data: data, callback: callback }); });
// 专卖店活动-根据门店带出门店明细中的物料组
exports.getMatklByShop = redux_actions_1.createAction(activityare_1.GET_MATKL_BY_SHOP, function (data, callback) { return request_1.request({ api: "specialShopActivity/getMatklByShop.nd", method: 'POST', data: data, callback: callback }); });
// 专卖店活动-保存-修改
exports.saveActivity = redux_actions_1.createAction(activityare_1.SAVE_ACTIVITY, function (data, callback) { return request_1.request({ api: "specialShopActivity/saveActivity.nd", method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 专卖店活动-保存-新增
exports.saveFlowStartActivity = redux_actions_1.createAction(activityare_1.SAVE_ACTIVITY, function (data, callback) { return request_1.request({ api: "specialShopActivity/flowStartActivity.nd", method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 专卖店活动-单条查询
exports.getActivityById = redux_actions_1.createAction(activityare_1.GET_ACTIVITY_BY_ID, function (data, callback) { return request_1.request({ api: "specialShopActivity/getActivityById.nd", method: 'POST', data: data, callback: callback }); });
// 专卖店活动-根据Id查询专卖店销量信息
exports.getActivitySaleInfo = redux_actions_1.createAction(activityare_1.GET_ACTIVITY_SALE_INFO, function (data, callback) { return request_1.request({ api: "specialShopActivity/getActivitySaleInfo.nd", method: 'POST', data: data, callback: callback }); });
// 代理商活动列表查询接口-分页查询
exports.getAgentActivityList = redux_actions_1.createAction(activityare_1.GET_AGENT_ACTIVITY_LIST, function (data, callback) { return request_1.request({ api: "custAgentActivity/getActivityList.nd", method: 'POST', data: data, callback: callback }); });
// 代理商活动筛选条件-营销中心列表
exports.getMarketCenter = redux_actions_1.createAction(activityare_1.GET_MARKET_CENTER, function (data, callback) { return request_1.request({ api: "custAgentActivity/getMarketCenter.nd", method: 'POST', data: data, callback: callback }); });
// 代理商活动筛选条件-审批状态列表
exports.getCheckStatus = redux_actions_1.createAction(activityare_1.GET_CHECK_STATUS, function (data, callback) { return request_1.request({ api: "custAgentActivity/getCheckStatus.nd", method: 'POST', data: data, callback: callback }); });
// 代理商活动筛选条件-办事处列表
exports.getOffice = redux_actions_1.createAction(activityare_1.GET_OFFICE, function (data, callback) { return request_1.request({ api: "custAgentActivity/getOffice.nd", method: 'POST', data: data, callback: callback }); });
// 代理商活动筛选条件-活动承接代理(运营)商
exports.getAgent = redux_actions_1.createAction(activityare_1.GET_AGENT, function (data, callback) { return request_1.request({ api: "custAgentActivity/getAgent.nd", method: 'POST', data: data, callback: callback }); });
// 代理商活动筛选条件-参与分销商
exports.getDistributor = redux_actions_1.createAction(activityare_1.GET_DISTRIBUTOR, function (data, callback) { return request_1.request({ api: "custAgentActivity/getDistributor.nd", method: 'POST', data: data, callback: callback }); });
// 代理商活动筛选条件-根据代理商id获取物料组
exports.getMatklByCust = redux_actions_1.createAction(activityare_1.GET_MATKL_BY_CUST, function (data, callback) { return request_1.request({ api: "custAgentActivity/getMatklByCust.nd", method: 'GET', data: data, callback: callback }); });
// 代理商活动筛选条件-办事处经理
exports.getUsers = redux_actions_1.createAction(activityare_1.GET_USERS, function (data, callback) { return request_1.request({ api: "custAgentActivity/getUsers.nd", method: 'POST', data: data, callback: callback }); });
// 代理商活动-活动申请接口
exports.saveFlowStart = redux_actions_1.createAction(activityare_1.SAVE_FLOW_START, function (data, callback) { return request_1.request({ api: "custAgentActivity/flowStart.nd", method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 代理商活动-单条活动查询接口
exports.getAgentActivityById = redux_actions_1.createAction(activityare_1.GET_AGENT_ACTIVITY_BY_ID, function (data, callback) { return request_1.request({ api: "custAgentActivity/getActivityById.nd", method: 'POST', data: data, callback: callback }); });
// 代理商活动-删除
exports.deleteActivityById = redux_actions_1.createAction(activityare_1.DELETE_ACTIVITY_BY_ID, function (data, callback) { return request_1.request({ api: "custAgentActivity/deleteActivityById.nd", method: 'POST', data: data, callback: callback }); });
// 代理商活动-上传结算凭证
exports.saveAgree = redux_actions_1.createAction(activityare_1.SAVE_AGREE, function (data, callback) { return request_1.request({ api: "custAgentActivity/agree.nd", method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 代理商活动-活动核销接口
exports.saveWriteFlowStart = redux_actions_1.createAction(activityare_1.SAVE_WRITE_FLOW_START, function (data, callback) { return request_1.request({ api: "custAgentActivity/writeFlowStart.nd", method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 代理商活动-作废
exports.terminalActivityById = redux_actions_1.createAction(activityare_1.TERMINAL_ACTIVITY_BY_ID, function (data, callback) { return request_1.request({ api: "custAgentActivity/terminalActivityById.nd", method: 'POST', data: data, callback: callback }); });
