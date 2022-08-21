import { createAction } from 'redux-actions';
import { request as requestForm } from '@/utils/request';
import { request } from '@/utils/requestJSON';
import {
    GET_STORE_LIST,
    GET_COM_REGION,
  FIND_RESULT_LIST,
  FIND_DETAIL_BY_ID,
  GET_CUSTOMER_ACCOUNT,
  GET_SHOP_LIST_BY_CUST_ID,
  GET_ORDER_FILTER,
  GET_MY_ADD_SHOP_LIST,
  GET_BOOTH_REPORT_LIST,
  GET_CUSTOMER_SHOP,
  GET_QUERY_ORG,
  GET_MATERIAL_GROUPS,
  GET_PROCESS_STATE,
  GET_PLAN_PROJECT_NAME_COMBO_BOX,
  GET_SHOP_DETAIL,
  GET_ORDER_TYPE_COMBO_BOX,
  GET_IS_SPECIAL_SHOP,
  GET_DICT,
  POST_FLOW_START,
  GET_SUPPLIER_COMBO_BOX,
  GET_OFFICE_MANAGER,
  GET_BOOTH_REPORT_DETAIL,
  POST_TMP_SAVE,
  GET_DISTRIBUTE_NETWORK_SCALE,
} from '@/store/types/store';
import { ctsRequest } from '@/utils/ctsrequest'

export interface orderparameters {
  pageNo: number;
  orderCode: string;
  zzprdmodel: string;
  orderTypeCode: string;
  sapOrderStatus: string;
  matklId: number;
  orgId: number;
  status: number;
  beginDate: string;
  endDate: string;
  timeFrame: number;
  sapBeginDate: string;
  sapEndDate: string;
  type: string;
  agentId: string;
  fxId: string;
}
export interface address {
  customerId: string;
  orgId: string;
  matklId: string;
}
export interface people {
  sendToId: string;
}
export interface method {
  type: string;
}

//获取门店列表
export const getStoreList = createAction(GET_STORE_LIST, (data: any, callback:() => void) => request({ api: 'custShop/queryShopListByCust.nd',method:'POST',data,callback }));

//获取省市区
export const getComRegion = createAction(GET_COM_REGION, (data: any, callback:() => void) => request({ api: 'comm/region.nd',method:'POST',data,callback }));
//获取当前账号信息
export const getCustomerAccount = createAction(GET_CUSTOMER_ACCOUNT, (data: any, callback:() => void) => request({ api: '/customer/customerAccount.nd',method:'GET',data,callback }));
//获取当前账号信息
export const getShopListByCustId = createAction(GET_SHOP_LIST_BY_CUST_ID, (data: any, callback) => requestForm({ api: '/custShop/getShopListByCustId.nd',method:'POST',data,callback }));
//巡店记录
export const findResultList = createAction(FIND_RESULT_LIST, (data: any, callback:() => void) => ctsRequest({ method: 'findResultList', data,callback }));
//巡店记录详情
export const findDetailById = createAction(FIND_DETAIL_BY_ID, (data: any, callback:() => void) => ctsRequest({ method: 'findDetailByInspectId', data,callback }));
// 订单筛选条件
export const getOrderFilter = createAction(GET_ORDER_FILTER, (data: any ) => request({ api: `order/orderList.nd`, method: 'POST',data }))

// 我新增的门店
export const getMyAddShopList = createAction(GET_MY_ADD_SHOP_LIST, (data: any, callback: any) => request({ api: 'custShop/myAddShopList.nd', method: 'POST', data, type: 'application/json', callback }));

// 展台需求提报-分页查询-【移动端】
export const getBoothReportList = createAction(GET_BOOTH_REPORT_LIST, (data: any, callback: any) => request({ api: 'distributeBoothReport/findPage.nd', method: 'POST', data, callback }));

// 展台需求提报-查询商家门店信息（目前是非专卖店）
export const getCustomerShop = createAction(GET_CUSTOMER_SHOP, (data: any, callback: any) => request({ api: 'distributeBoothReport/findCustomerShop.nd', method: 'GET', data, callback }));

// 展台需求提报-筛选条件-获取组织
export const getQueryOrg = createAction(GET_QUERY_ORG, (data: any, callback: any) => request({ api: 'comm/queryOrg.nd', method: 'GET', data, callback }));

// 展台需求提报-筛选条件-根据门店id查询物料组
export const getMaterialGroups = createAction(GET_MATERIAL_GROUPS, (data: any, callback: any) => request({ api: 'distributeBoothReport/findMaterialGroups.nd', method: 'GET', data, callback }));

// 展台需求提报-筛选条件-流程状态下拉查询
export const getProcessState = createAction(GET_PROCESS_STATE, (data: any, callback: any) => request({ api: 'distributeBoothReport/findProcessState.nd', method: 'GET', data, callback }));

// 展台需求提报-筛选条件-计划项目名称下拉框
export const getPlanProjectNameComboBox = createAction(GET_PLAN_PROJECT_NAME_COMBO_BOX, (data: any, callback: any) => request({ api: 'distributeBoothReport/findPlanProjectNameComboBox.nd', method: 'GET', data, callback }));

// 展台需求提报-查询门店所属办事处
export const getShopDetail = createAction(GET_SHOP_DETAIL, (data: any, callback: any) => request({ api: 'distributeBoothReport/findShopDetail.nd', method: 'GET', data, callback }));

// 展台需求提报-查询派单类型下拉框
export const getOrderTypeComboBox = createAction(GET_ORDER_TYPE_COMBO_BOX, (data: any, callback: any) => request({ api: 'distributeBoothReport/finOrderTypeComboBox.nd', method: 'GET', data, callback }));

// 展台需求提报-根据门店id查询是否为专卖店
export const getIsSpecialShop = createAction(GET_IS_SPECIAL_SHOP, (data: any, callback: any) => request({ api: 'distributeBoothReport/findIsSpecialShop.nd', method: 'GET', data, callback }));

// 展台需求提报-字典-查询接口类型
export const getDict = createAction(GET_DICT, (data: any, callback: any) => request({ api: 'comm/dict.nd', method: 'GET', data, callback }));

// 展台需求提报-根据关键字查询供应商下拉框
export const getSupplierComboBox = createAction(GET_SUPPLIER_COMBO_BOX, (data: any, callback: any) => request({ api: 'distributeBoothReport/findSupplierComboBox.nd', method: 'GET', data, callback }));

// 展台需求提报-提交（发起审批流）
export const postFlowStart = createAction(POST_FLOW_START, (data: any, callback: any) => request({ api: 'distributeBoothReport/flowStart.nd', method: 'POST', data, callback }));

// 展台需求提报-根据关键字查询海信办事处经理下拉框
export const getOfficeManager = createAction(GET_OFFICE_MANAGER, (data: any, callback: any) => request({ api: 'distributeBoothReport/findOfficeManager.nd', method: 'POST', data, callback }));

// 展台需求提报-详情
export const getBoothReportDetail = createAction(GET_BOOTH_REPORT_DETAIL, (data: any, callback: any) => request({ api: 'distributeBoothReport/findDetail.nd', method: 'GET', data, callback }));

// 展台需求提报-暂存
export const postTmpSave = createAction(POST_TMP_SAVE, (data: any, callback: any) => request({ api: 'distributeBoothReport/tmpSave.nd', method: 'POST', data, callback }));

// 展台需求提报-分销网络规模
export const getDistributeNetworkScale = createAction(GET_DISTRIBUTE_NETWORK_SCALE, (data: any, callback: any) => request({ api: 'distributeBoothReport/findCustomerShopAnnualSalesScale.nd', method: 'GET', data, callback }));
