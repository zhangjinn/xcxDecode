import { financeRequest } from './financerequest';
import { FINANCE_GET_RSRB_SHEET_LIST, QUERY_APP_PROFIT, QUERY_APP_FIBOOK, FINANCE_POST_RSRB_DETAIL_BY_ROWID ,FINANCE_POST_CUR_CONFIRMED_BY_ROWID,FINANCE_POST_RSRB_CASHED_BY_ROWID,RS_OC_RB_SHEET_BY_ROWID, GET_APP_SIGNATURE_VIEW_SSQ, DO_APP_RE_RB_CREATE_AND_SIGN} from '../types/financepolicy';
import { createAction } from 'redux-actions';
import wepy from 'wepy';
import { baseUrl } from '@/utils/request';


// 本期已开票兑现明细
export const queryAppRsRbCashedByRowId=createAction(FINANCE_POST_RSRB_CASHED_BY_ROWID,async(basedata:any)=>{
  return financeRequest({
    data: {
      ...basedata,
    },
    method: 'rsRbAppSheet/queryAppRsRbCashedByRowId'
  })
})
// 本期新确认账单
export const queryAppCurConfirmedByRowId=createAction(FINANCE_POST_CUR_CONFIRMED_BY_ROWID,async(basedata:any)=>{
  return financeRequest({
    data: {
      ...basedata,
    },
    method: 'rsRbAppSheet/queryAppCurConfirmedByRowId'
  })
})
// 政策对账账单
export const queryAppRsRbDetailByRowId = createAction(FINANCE_POST_RSRB_DETAIL_BY_ROWID, async (basedata: any) => {
  return financeRequest({
    data: {
      ...basedata,
    },
    method: 'rsRbAppSheet/queryAppRsRbDetailByRowId'
  })
})
// 政策电子账单列表以及筛选
export const queryAppRsRbSheetList = createAction(FINANCE_GET_RSRB_SHEET_LIST, async (basedata: any) => {
  return financeRequest({
    data: {
      ...basedata,
    },
    method: 'rsRbAppSheet/queryAppRsRbSheetList'
  })
})

// 获取产品品类
export const queryAppProfit = createAction(QUERY_APP_PROFIT, async (basedata: any) => {
  return financeRequest({
    data: {
      ...basedata,
    },
    method: 'rsRbAppSheet/queryAppProfit'
  })
})

// 获取销售组织
export const queryAppFiBook = createAction(QUERY_APP_FIBOOK, async (basedata: any) => {
  return financeRequest({
    data: {
      ...basedata,
    },
    method: 'rsRbAppSheet/queryAppFiBookCode'
  })
})
// 政策签章客户接口
export const queryAppRsOcRbSheetByRowId =createAction(RS_OC_RB_SHEET_BY_ROWID,async(basedata:any)=>{
  return financeRequest({
    data: {
      ...basedata,
    },
    method: 'rsRbAppSheet/queryAppRsOcRbSheetByRowId'
  })
})

// 签章查看接口
export const getAppSignatureViewSsq = createAction(GET_APP_SIGNATURE_VIEW_SSQ, (data: any) => {
  return financeRequest({
    data: {
      ...data,
      method: 'getAppSignatureViewSsq'
    },
    method: 'rsRbAppSheet/getAppSignatureViewSsq'
  })
})

// 政策对账单app签章
export const doAppRsRbCreateAndSign = createAction(DO_APP_RE_RB_CREATE_AND_SIGN, (data: any) => {
  return financeRequest({
    data: {
      ...data,
      method: 'doAppRsRbCreateAndSign'
    },
    method: 'rsRbAppSheet/doAppRsRbCreateAndSign'
  })
})
