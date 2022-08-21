
import { createAction } from 'redux-actions';
import wepy from 'wepy';
import { request } from '@/utils/request';
import {
  GET_REPORT_CUST_SALES, GET_REPORT_SUPPLY_LIST,
  GET_REPORT_MATERIAL_LIST,GET_CHANNEL_REPORT_LIST,
  GET_CHANNEL_WLZ_LIST,GET_SAN_LIU_LING_EXPERIENCE_LIST,
  REPORT_DETAIL,
  GET_COLLECTION_DELIVERY,
  GET_RUN_RATE,
 } from '@/store/types/purchasereport'
import { dmsRequest } from './dmsrequest';

export interface data {
  queryDate: string
  orgId: string,
  matkl: string
}
export interface channel {
  cisCode: string;
  userAccount: string;
  terms: {
    materialGroupCode: string;
    date: string;
  }
}
export interface item {
  type: 2,
  orgId: string
}

export const getChannelWlzList = createAction(GET_CHANNEL_WLZ_LIST, () => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      type: 'wlz',
    },
    method: 'findBaseData',
  })
})
// 渠道报表
export const getChannelReportList = createAction(GET_CHANNEL_REPORT_LIST, async (data: channel) => {
  return dmsRequest({
    data,
    method: 'normalSalesReport'
  })
})

export const getreportcustSales = createAction(GET_REPORT_CUST_SALES, (data: data) => request({ api: `report/custSales.nd`, data }));
// 采购供应商
export const getReportSupplyList = createAction(GET_REPORT_SUPPLY_LIST, (data: data) => request({ api: `comm/queryOrg.nd?type=2`, data }));
// 采购物料组
export const getReportMaterialList = createAction(GET_REPORT_MATERIAL_LIST, (data: item) => request({ api: `comm/queryMatkl.nd`, data }));

// 360体验报表
export const getSanLiuLingExperienceList = createAction(GET_SAN_LIU_LING_EXPERIENCE_LIST, (data: any, callback: any) => request({ api: `evaluation/findComprehensiveEvaluation.nd`, method:'GET', type:'application/json', data,callback }));

// 首页-毛利率-详情
export const getGrossMarginDetail = createAction(REPORT_DETAIL, (data: any, callback: any) => request({ api: `fast/userReport/reportMaoLiLvDetail.nd`, method:'GET', type:'application/json', data,callback }));

// 首页-回款提货额
export const getCollectionDelivery = createAction(GET_COLLECTION_DELIVERY, (data: any, callback: any) => request({ api: `coreFunction/findCollectionDelivery.nd`, method:'GET', type:'application/json', data,callback }));

// 首页-回款提货额-详情
export const getCollectionDeliveryDetail = createAction(REPORT_DETAIL, (data: any, callback: any) => request({ api: `fast/userReport/reportHuiKuanDetail.nd`, method:'GET', type:'application/json', data,callback }));

// 首页-覆盖率-详情
export const getMarketCoverageDetail = createAction(REPORT_DETAIL, (data: any, callback: any) => request({ api: `fast/userReport/reportFuGaiLvDetail.nd`, method:'GET', type:'application/json', data,callback }));

// 首页-跑动率
export const getRunRate = createAction(GET_RUN_RATE, (data: any, callback: any) => request({ api: `coreFunction/findRunRate.nd`, method:'GET', type:'application/json', data,callback }));

// 首页-跑动率-详情
export const getRunRateDetail = createAction(REPORT_DETAIL, (data: any, callback: any) => request({ api: `fast/userReport/reportPaoDongLvDetail.nd`, method:'GET', type:'application/json', data,callback }));

// 核心职能评价-分销网络净增详情(新)
export const getDistributeNetworkIncrease = createAction(REPORT_DETAIL, (data: any, callback: any) => request({ api: `evaluation/comprehensive/findDistributeNetworkIncrease.nd`, method:'GET', type:'application/json', data,callback }));

// 核心职能评价-分销网络动销率详情(新)
export const getDistributeNetworkRun = createAction(REPORT_DETAIL, (data: any, callback: any) => request({ api: `evaluation/comprehensive/findDynamicSales.nd`, method:'GET', type:'application/json', data,callback }));

// 核心职能评价-分销网络单店产出(新)
export const getDistributeNetworkOutput = createAction(REPORT_DETAIL, (data: any, callback: any) => request({ api: `evaluation/comprehensive/findSingleOutput.nd`, method:'GET', type:'application/json', data,callback }));

// 核心职能评价-单击销售结构明细
export const getSalesStructure = createAction(REPORT_DETAIL, (data: any, callback: any) => request({ api: `coreFunction/findSalesStructure.nd`, method:'GET', type:'application/json', data,callback }));

// 核心职能评价-专供机占比(新)
export const getDedicatedMachine = createAction(REPORT_DETAIL, (data: any, callback: any) => request({ api: `evaluation/comprehensive/findDedicated.nd`, method:'GET', type:'application/json', data,callback }));

// 核心职能评价-增量业务（前置渠道）(新)
export const getFrontChannel = createAction(REPORT_DETAIL, (data: any, callback: any) => request({ api: `evaluation/comprehensive/findFrontChannel.nd`, method:'GET', type:'application/json', data,callback }));

// 核心职能评价-全渠道口径出货(新)
export const getFullChannel = createAction(REPORT_DETAIL, (data: any, callback: any) => request({ api: `evaluation/comprehensive/findFullChannel.nd`, method:'GET', type:'application/json', data,callback }));

// 核心职能评价-高中端占比(新)
export const getMidHigh = createAction(REPORT_DETAIL, (data: any, callback: any) => request({ api: `evaluation/comprehensive/findMidHigh.nd`, method:'GET', type:'application/json', data,callback }));

// 首页-库存明细周转天数-详情
export const getInventoryDetail = createAction(REPORT_DETAIL, (data: any, callback: any) => request({ api: `coreFunction/findInventoryDetail.nd`, method:'GET', type:'application/json', data,callback }));
