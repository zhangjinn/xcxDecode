"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var request_1 = require('./../../utils/request.js');
var requestJSON_1 = require('./../../utils/requestJSON.js');
var store_1 = require('./../types/store.js');
var ctsrequest_1 = require('./../../utils/ctsrequest.js');
//获取门店列表
exports.getStoreList = redux_actions_1.createAction(store_1.GET_STORE_LIST, function (data, callback) { return requestJSON_1.request({ api: 'custShop/queryShopListByCust.nd', method: 'POST', data: data, callback: callback }); });
//获取省市区
exports.getComRegion = redux_actions_1.createAction(store_1.GET_COM_REGION, function (data, callback) { return requestJSON_1.request({ api: 'comm/region.nd', method: 'POST', data: data, callback: callback }); });
//获取当前账号信息
exports.getCustomerAccount = redux_actions_1.createAction(store_1.GET_CUSTOMER_ACCOUNT, function (data, callback) { return requestJSON_1.request({ api: '/customer/customerAccount.nd', method: 'GET', data: data, callback: callback }); });
//获取当前账号信息
exports.getShopListByCustId = redux_actions_1.createAction(store_1.GET_SHOP_LIST_BY_CUST_ID, function (data, callback) { return request_1.request({ api: '/custShop/getShopListByCustId.nd', method: 'POST', data: data, callback: callback }); });
//巡店记录
exports.findResultList = redux_actions_1.createAction(store_1.FIND_RESULT_LIST, function (data, callback) { return ctsrequest_1.ctsRequest({ method: 'findResultList', data: data, callback: callback }); });
//巡店记录详情
exports.findDetailById = redux_actions_1.createAction(store_1.FIND_DETAIL_BY_ID, function (data, callback) { return ctsrequest_1.ctsRequest({ method: 'findDetailByInspectId', data: data, callback: callback }); });
// 订单筛选条件
exports.getOrderFilter = redux_actions_1.createAction(store_1.GET_ORDER_FILTER, function (data) { return requestJSON_1.request({ api: "order/orderList.nd", method: 'POST', data: data }); });
// 我新增的门店
exports.getMyAddShopList = redux_actions_1.createAction(store_1.GET_MY_ADD_SHOP_LIST, function (data, callback) { return requestJSON_1.request({ api: 'custShop/myAddShopList.nd', method: 'POST', data: data, type: 'application/json', callback: callback }); });
// 展台需求提报-分页查询-【移动端】
exports.getBoothReportList = redux_actions_1.createAction(store_1.GET_BOOTH_REPORT_LIST, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/findPage.nd', method: 'POST', data: data, callback: callback }); });
// 展台需求提报-查询商家门店信息（目前是非专卖店）
exports.getCustomerShop = redux_actions_1.createAction(store_1.GET_CUSTOMER_SHOP, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/findCustomerShop.nd', method: 'GET', data: data, callback: callback }); });
// 展台需求提报-筛选条件-获取组织
exports.getQueryOrg = redux_actions_1.createAction(store_1.GET_QUERY_ORG, function (data, callback) { return requestJSON_1.request({ api: 'comm/queryOrg.nd', method: 'GET', data: data, callback: callback }); });
// 展台需求提报-筛选条件-根据门店id查询物料组
exports.getMaterialGroups = redux_actions_1.createAction(store_1.GET_MATERIAL_GROUPS, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/findMaterialGroups.nd', method: 'GET', data: data, callback: callback }); });
// 展台需求提报-筛选条件-流程状态下拉查询
exports.getProcessState = redux_actions_1.createAction(store_1.GET_PROCESS_STATE, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/findProcessState.nd', method: 'GET', data: data, callback: callback }); });
// 展台需求提报-筛选条件-计划项目名称下拉框
exports.getPlanProjectNameComboBox = redux_actions_1.createAction(store_1.GET_PLAN_PROJECT_NAME_COMBO_BOX, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/findPlanProjectNameComboBox.nd', method: 'GET', data: data, callback: callback }); });
// 展台需求提报-查询门店所属办事处
exports.getShopDetail = redux_actions_1.createAction(store_1.GET_SHOP_DETAIL, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/findShopDetail.nd', method: 'GET', data: data, callback: callback }); });
// 展台需求提报-查询派单类型下拉框
exports.getOrderTypeComboBox = redux_actions_1.createAction(store_1.GET_ORDER_TYPE_COMBO_BOX, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/finOrderTypeComboBox.nd', method: 'GET', data: data, callback: callback }); });
// 展台需求提报-根据门店id查询是否为专卖店
exports.getIsSpecialShop = redux_actions_1.createAction(store_1.GET_IS_SPECIAL_SHOP, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/findIsSpecialShop.nd', method: 'GET', data: data, callback: callback }); });
// 展台需求提报-字典-查询接口类型
exports.getDict = redux_actions_1.createAction(store_1.GET_DICT, function (data, callback) { return requestJSON_1.request({ api: 'comm/dict.nd', method: 'GET', data: data, callback: callback }); });
// 展台需求提报-根据关键字查询供应商下拉框
exports.getSupplierComboBox = redux_actions_1.createAction(store_1.GET_SUPPLIER_COMBO_BOX, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/findSupplierComboBox.nd', method: 'GET', data: data, callback: callback }); });
// 展台需求提报-提交（发起审批流）
exports.postFlowStart = redux_actions_1.createAction(store_1.POST_FLOW_START, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/flowStart.nd', method: 'POST', data: data, callback: callback }); });
// 展台需求提报-根据关键字查询海信办事处经理下拉框
exports.getOfficeManager = redux_actions_1.createAction(store_1.GET_OFFICE_MANAGER, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/findOfficeManager.nd', method: 'POST', data: data, callback: callback }); });
// 展台需求提报-详情
exports.getBoothReportDetail = redux_actions_1.createAction(store_1.GET_BOOTH_REPORT_DETAIL, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/findDetail.nd', method: 'GET', data: data, callback: callback }); });
// 展台需求提报-暂存
exports.postTmpSave = redux_actions_1.createAction(store_1.POST_TMP_SAVE, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/tmpSave.nd', method: 'POST', data: data, callback: callback }); });
// 展台需求提报-分销网络规模
exports.getDistributeNetworkScale = redux_actions_1.createAction(store_1.GET_DISTRIBUTE_NETWORK_SCALE, function (data, callback) { return requestJSON_1.request({ api: 'distributeBoothReport/findCustomerShopAnnualSalesScale.nd', method: 'GET', data: data, callback: callback }); });
