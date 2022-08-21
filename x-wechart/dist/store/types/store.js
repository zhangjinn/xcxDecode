"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 获取门店列表
exports.GET_STORE_LIST = "GET_STORE_LIST";
// 获取省市区
exports.GET_COM_REGION = "GET_COM_REGION";
//获取巡店记录
exports.FIND_RESULT_LIST = "FIND_RESULT_LIST";
//获取巡店记录详情
exports.FIND_DETAIL_BY_ID = "FIND_DETAIL_BY_ID";
// 获取当前扥登录账号信息
exports.GET_CUSTOMER_ACCOUNT = "GET_CUSTOMER_ACCOUNT";
// 获取我的门店
exports.GET_SHOP_LIST_BY_CUST_ID = "GET_SHOP_LIST_BY_CUST_ID";
// 我新增的门店
exports.GET_MY_ADD_SHOP_LIST = "GET_MY_ADD_SHOP_LIST";
// 重置我新增的门店
exports.RESET_MY_ADD_SHOP_LIST = "RESET_MY_ADD_SHOP_LIST";
// 我的门店筛选
exports.GET_ORDER_FILTER = "GET_ORDER_FILTER";
// 展台需求提报-分页查询-【移动端】
exports.GET_BOOTH_REPORT_LIST = "GET_BOOTH_REPORT_LIST";
// 展台需求提报-查询商家门店信息（目前是非专卖店）
exports.GET_CUSTOMER_SHOP = "GET_CUSTOMER_SHOP";
// 展台需求提报-筛选条件-获取组织
exports.GET_QUERY_ORG = "GET_QUERY_ORG";
// 展台需求提报-筛选条件-根据门店id查询物料组
exports.GET_MATERIAL_GROUPS = "GET_MATERIAL_GROUPS";
// 展台需求提报-筛选条件-流程状态下拉查询
exports.GET_PROCESS_STATE = "GET_PROCESS_STATE";
// 展台需求提报-筛选条件-计划项目名称下拉框
exports.GET_PLAN_PROJECT_NAME_COMBO_BOX = "GET_PLAN_PROJECT_NAME_COMBO_BOX";
// 展台需求提报-查询门店所属办事处
exports.GET_SHOP_DETAIL = "GET_SHOP_DETAIL";
// 展台需求提报-查询派单类型下拉框
exports.GET_ORDER_TYPE_COMBO_BOX = "GET_ORDER_TYPE_COMBO_BOX";
// 展台需求提报-根据门店id查询是否为专卖店
exports.GET_IS_SPECIAL_SHOP = "GET_IS_SPECIAL_SHOP";
// 展台需求提报-字典-查询接口类型
exports.GET_DICT = "GET_DICT";
// 展台需求提报-根据关键字查询供应商下拉框
exports.GET_SUPPLIER_COMBO_BOX = "GET_SUPPLIER_COMBO_BOX";
// 展台需求提报-提交（发起审批流）
exports.POST_FLOW_START = "POST_FLOW_START";
// 展台需求提报-根据关键字查询海信办事处经理下拉框
exports.GET_OFFICE_MANAGER = "GET_OFFICE_MANAGER";
// 展台需求提报-详情
exports.GET_BOOTH_REPORT_DETAIL = "GET_BOOTH_REPORT_DETAIL";
// 展台需求提报-暂存
exports.POST_TMP_SAVE = "POST_TMP_SAVE";
// 展台需求提报-分销网络规模
exports.GET_DISTRIBUTE_NETWORK_SCALE = "GET_DISTRIBUTE_NETWORK_SCALE";
