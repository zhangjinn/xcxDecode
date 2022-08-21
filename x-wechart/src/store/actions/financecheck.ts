import { createAction } from 'redux-actions';
import {CF_RB_SHEET_LIST,RS_RB_DETAIL_BY_ROWID, CF_RB_CREATE_AND_SIGN} from '../types/financecheck';
import { financeRequest } from './financerequest';

// 政策核对单列表查询接口
export const queryAppCfRbSheetList=createAction(CF_RB_SHEET_LIST,async(basedata:any)=>{
  return financeRequest({
      data:{
        ...basedata,
      },
      method:'rsRbAppSheet/queryAppCfRbSheetList'
  })
})
// 政策核对单详情接口
export const queryAppCfRbDetailByRowId=createAction(RS_RB_DETAIL_BY_ROWID,async(basedata:any)=>{
  return financeRequest({
    data:{
      ...basedata,
    },
    method:'rsRbAppSheet/queryAppCfRbDetailByRowId'
  })
})

// rsRbAppSheet/doAppCfRbCreateAndSign
// 政策对账单app签章
export const doAppCfRbCreateAndSign = createAction(CF_RB_CREATE_AND_SIGN, (data: any) => {
  return financeRequest({
    data: {
      ...data,
      method: 'doAppCfRbCreateAndSign'
    },
    method: 'rsRbAppSheet/doAppCfRbCreateAndSign'
  })
})
