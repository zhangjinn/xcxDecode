import { createAction } from 'redux-actions'
import {
  GET_ACTIVITY_LIST,
  GET_ACTIVITY_STATUS,
  PAGING_ACTIVITY_RESULT,
  GET_MARKETING_ACTIVITY_LIST,
  GET_MARKETING_ACTIVITY_FILTER,
  GET_MARKETING_ACTIVITY_DETAIL,
  GET_MARKETING_ACTIVITY_DISTRIBUTOR,
  GET_SPECIAL_SHOP_ACTIVITY_LIST,
  GET_SPECIAL_SHOP_DICTBYTYPE,
  GET_SPECIAL_SHOP,
  GET_MATKL_BY_SHOP,
  SAVE_ACTIVITY,
  GET_ACTIVITY_BY_ID,
  GET_ACTIVITY_SALE_INFO,
  GET_AGENT_ACTIVITY_LIST,
  GET_MARKET_CENTER,
  GET_CHECK_STATUS,
  GET_OFFICE,
  GET_AGENT,
  GET_DISTRIBUTOR,
  GET_MATKL_BY_CUST,
  GET_USERS,
  SAVE_FLOW_START,
  GET_AGENT_ACTIVITY_BY_ID,
  DELETE_ACTIVITY_BY_ID,
  SAVE_AGREE,
  SAVE_WRITE_FLOW_START,
  TERMINAL_ACTIVITY_BY_ID,
} from '@/store/types/activityare'
import { request } from '@/utils/request'


export interface itemParams {
  pageNo: string;
  orgId: string;
  matkl: string;
  status: number;
  activityName: string;
  startDate: string;
  endDate: string;
}
export const getActivityList = createAction(GET_ACTIVITY_LIST, (data: itemParams) => request({ api: `marketActivity/queryList.nd`, method: 'POST', data }))

export interface statusParams {
  ids: any
}

export const getActivityStatus = createAction(GET_ACTIVITY_STATUS, (data: statusParams) => request({ api: `marketActivity/queryStatus.nd`, method: 'POST', data }))


export interface PagingActivityResultParams {
  type: 'FX' | '';  // 为FX时，查询分销商，为空则查询本商家
  status: 0 | 1 | ''; // 0是有效，1是无效
  startDate: string; // 下单开始时间
  endDate: string; // 下单结束时间
  activityName: string; // 活动名称/编码
  productModel: string; // 产品型号
  matkl: string; // 物料组id
  orgId: string; // 供应商id
  custName: string; // 老板/公司/cis编码,
  pageNo: number;
  pageSize: number;
}

export const pagingActivityResult = createAction(PAGING_ACTIVITY_RESULT, (data: PagingActivityResultParams) => request({ api: `marketActivity/queryResultList.nd`, method: 'GET', data: {
  ...data,
  _loading: true
} }))

// 营销活动列表
export const getMarketingActivityList = createAction(GET_MARKETING_ACTIVITY_LIST, (data: any, callback: any) => request({ api: `b2bMarketActivity/getActivityList.nd`, method: 'POST', data, callback }))

// 营销活动筛选条件-促销方式列表
export const getMarketingActivityFilter = createAction(GET_MARKETING_ACTIVITY_FILTER, (data: any, callback: any) => request({ api: `b2bMarketActivity/getPromotionMethods.nd`, method: 'POST', data, callback }))

// 营销活动详情
export const getMarketingActivityDetail = createAction(GET_MARKETING_ACTIVITY_DETAIL, (data: any, callback: any) => request({ api: `b2bMarketActivity/getB2bActivityById.nd`, method: 'POST', data, callback }))

// 营销活动-获取当前代理商下的所有分销商
export const getMarketingActivityDistributor = createAction(GET_MARKETING_ACTIVITY_DISTRIBUTOR, (data: any, callback: any) => request({ api: `b2bMarketActivity/getFxCust.nd`, method: 'POST', data, callback }))

// 专卖店活动-分页查询
export const getSpecialShopActivityList = createAction(GET_SPECIAL_SHOP_ACTIVITY_LIST, (data: any, callback: any) => request({ api: `specialShopActivity/getActivityList.nd`, method: 'POST', data, callback }))

// 专卖店活动-根据字典类型获取字典
export const getSpecialShopDictBytype = createAction(GET_SPECIAL_SHOP_DICTBYTYPE, (data: any, callback: any) => request({ api: `specialShopActivity/getDictBytype.nd`, method: 'POST', data, callback }))

// 专卖店活动-模糊搜索专卖店
export const getSpecialShop = createAction(GET_SPECIAL_SHOP, (data: any, callback: any) => request({ api: `specialShopActivity/getSpecialShop.nd`, method: 'POST', data, callback }))

// 专卖店活动-根据门店带出门店明细中的物料组
export const getMatklByShop = createAction(GET_MATKL_BY_SHOP, (data: any, callback: any) => request({ api: `specialShopActivity/getMatklByShop.nd`, method: 'POST', data, callback }))

// 专卖店活动-保存-修改
export const saveActivity = createAction(SAVE_ACTIVITY, (data: any, callback: any) => request({ api: `specialShopActivity/saveActivity.nd`, method: 'POST', type: 'application/json', data, callback }))

// 专卖店活动-保存-新增
export const saveFlowStartActivity = createAction(SAVE_ACTIVITY, (data: any, callback: any) => request({ api: `specialShopActivity/flowStartActivity.nd`, method: 'POST', type: 'application/json', data, callback }))

// 专卖店活动-单条查询
export const getActivityById = createAction(GET_ACTIVITY_BY_ID, (data: any, callback: any) => request({ api: `specialShopActivity/getActivityById.nd`, method: 'POST', data, callback }))

// 专卖店活动-根据Id查询专卖店销量信息
export const getActivitySaleInfo = createAction(GET_ACTIVITY_SALE_INFO, (data: any, callback: any) => request({ api: `specialShopActivity/getActivitySaleInfo.nd`, method: 'POST', data, callback }))

// 代理商活动列表查询接口-分页查询
export const getAgentActivityList = createAction(GET_AGENT_ACTIVITY_LIST, (data: any, callback: any) => request({ api: `custAgentActivity/getActivityList.nd`, method: 'POST', data, callback }))

// 代理商活动筛选条件-营销中心列表
export const getMarketCenter = createAction(GET_MARKET_CENTER, (data: any, callback: any) => request({ api: `custAgentActivity/getMarketCenter.nd`, method: 'POST', data, callback }))

// 代理商活动筛选条件-审批状态列表
export const getCheckStatus = createAction(GET_CHECK_STATUS, (data: any, callback: any) => request({ api: `custAgentActivity/getCheckStatus.nd`, method: 'POST', data, callback }))

// 代理商活动筛选条件-办事处列表
export const getOffice = createAction(GET_OFFICE, (data: any, callback: any) => request({ api: `custAgentActivity/getOffice.nd`, method: 'POST', data, callback }))

// 代理商活动筛选条件-活动承接代理(运营)商
export const getAgent = createAction(GET_AGENT, (data: any, callback: any) => request({ api: `custAgentActivity/getAgent.nd`, method: 'POST', data, callback }))

// 代理商活动筛选条件-参与分销商
export const getDistributor = createAction(GET_DISTRIBUTOR, (data: any, callback: any) => request({ api: `custAgentActivity/getDistributor.nd`, method: 'POST', data, callback }))

// 代理商活动筛选条件-根据代理商id获取物料组
export const getMatklByCust = createAction(GET_MATKL_BY_CUST, (data: any, callback: any) => request({ api: `custAgentActivity/getMatklByCust.nd`, method: 'GET', data, callback }))

// 代理商活动筛选条件-办事处经理
export const getUsers = createAction(GET_USERS, (data: any, callback: any) => request({ api: `custAgentActivity/getUsers.nd`, method: 'POST', data, callback }))

// 代理商活动-活动申请接口
export const saveFlowStart = createAction(SAVE_FLOW_START, (data: any, callback: any) => request({ api: `custAgentActivity/flowStart.nd`, method: 'POST', type: 'application/json', data, callback }))

// 代理商活动-单条活动查询接口
export const getAgentActivityById = createAction(GET_AGENT_ACTIVITY_BY_ID, (data: any, callback: any) => request({ api: `custAgentActivity/getActivityById.nd`, method: 'POST', data, callback }))

// 代理商活动-删除
export const deleteActivityById = createAction(DELETE_ACTIVITY_BY_ID, (data: any, callback: any) => request({ api: `custAgentActivity/deleteActivityById.nd`, method: 'POST', data, callback }))

// 代理商活动-上传结算凭证
export const saveAgree = createAction(SAVE_AGREE, (data: any, callback: any) => request({ api: `custAgentActivity/agree.nd`, method: 'POST', type: 'application/json', data, callback }))

// 代理商活动-活动核销接口
export const saveWriteFlowStart = createAction(SAVE_WRITE_FLOW_START, (data: any, callback: any) => request({ api: `custAgentActivity/writeFlowStart.nd`, method: 'POST', type: 'application/json', data, callback }))

// 代理商活动-作废
export const terminalActivityById = createAction(TERMINAL_ACTIVITY_BY_ID, (data: any, callback: any) => request({ api: `custAgentActivity/terminalActivityById.nd`, method: 'POST', data, callback }))
