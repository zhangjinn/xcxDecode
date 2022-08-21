import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import wepy from 'wepy';
import { dmsRequest } from './dmsrequest';
import {
  GET_BASE_DATA_REPORT, GET_SALES_RANK_DISTRIBUTOR_REPORT,
  GET_SALES_CATEGORY_REPORT, GET_SALES_RANK_STORE_REPORT,
  GET_SALES_STATS_REPORT, GET_SALES_CURR_MONTH_REPORT,
  GET_MATERIAL_GROUP_REPORT
} from '../types/salesreport';

export interface item {
  cisCode: string;
  userAccount: string;
  terms: {
    documentType: string;
    startDate: string;
    endDate: string;
  }
}
export interface stats {
  cisCode: string;
  userAccount: string;
  terms: {
    orgCode: string;
    materialGroupCode: string;
    date: string;
  }
}
export interface basedata {
  cisCode: string;
  type: string;
  user: {
    code:string;
    isAdmin: string;
  }
}
export interface Vendor {
  cisCode: string;
  supplierCode: string
  orgId: string
}

// 销售分销商销量排名接口
export const getSalesRankDistributorReport = createAction(GET_SALES_RANK_DISTRIBUTOR_REPORT, async (data: stats) => {
  return dmsRequest({
    data,
    method: 'salesRankDistributorReport'
  })
})

// 销售门店销量排名接口
export const getSalesRankStoreReport = createAction(GET_SALES_RANK_STORE_REPORT, async (data: stats) => {
  return dmsRequest({
    data,
    method: 'salesRankStoreReport'
  })
})

// 当月每日销量报表接口
export const getSalesCurrMonthReport = createAction(GET_SALES_CURR_MONTH_REPORT, async (data: item) => {
  return dmsRequest({
    data,
    method: 'salesCurrMonthReport'
  })
})

// 根据供应商获取物料组
export const getMaterialGroupReport = createAction(GET_MATERIAL_GROUP_REPORT, async (Vendor: any) => {
  return dmsRequest({
    data: Vendor,
    method: 'findMaterialGroupBySupplier'
  })
})
// 基础信息
export const getBaseDataReport = createAction(GET_BASE_DATA_REPORT, async (basedata: any) => {
  const result = await dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      ...basedata
    },
    method: 'findBaseData'
  })
  return {
    ...result,
    type: basedata.type
  }
})

// 各品类销售额占比接口
export const getSalesCategoryScaleReport = createAction(GET_SALES_CATEGORY_REPORT, async (data: item) => {
  return dmsRequest({
    data,
    method: 'salesCategoryScaleReport'
  })
})
// 销售统计报表接口
export const getSalesStatsReport = createAction(GET_SALES_STATS_REPORT, async (data: stats) => {
  return dmsRequest({
    data,
    method: 'salesStatsReport'
  })
})
