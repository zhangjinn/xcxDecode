import { financeRequest } from './financerequest';
import { FINANCE_POST_RS_FT_SHEET_LIST ,FINANCE_POST_RS_FT_SHEET_DETAIL,FINANCE_POST_RS_FT_SHEET_THREE,FINANCE_POST_RS_FT_INVOICE_LIST,FINANCE_POST_RS_FT_NO_INVOICE_LIST,FINANCE_POST_RS_FT_INCOME_LIST,FINANCE_POST_RS_FT_NO_REFUND_LIST,RS_OC_FT_SHEET_BY_ROWID, RS_FT_CREATE_AND_SIGN} from '../types/financefund';
import { createAction } from 'redux-actions';

import wepy from 'wepy';
import { baseUrl } from '@/utils/request';


// 资金对账账单列表接口
export const queryAppRsFtSheetList = createAction(FINANCE_POST_RS_FT_SHEET_LIST, async (basedata: any) => {
  return financeRequest({
    data: {
      ...basedata,
    },
    method: 'rsFtAppSheet/doListJson'
  })
})


// 资金对账账单详情接口
export const  queryAppRsFtSheetByRowId =createAction(FINANCE_POST_RS_FT_SHEET_DETAIL,async(basedata:any)=>{
  return financeRequest({
      data: {
        ...basedata,
      },
      method: 'rsFtAppSheet/queryAppRsFtSheetByRowId'
    })
})

// 发票三栏账列表查询接口
export const  doAppRsFtThreecolumnListJson =createAction(FINANCE_POST_RS_FT_SHEET_THREE,async(basedata:any)=>{
  const result = await financeRequest({
      data: {
        ...basedata,
      },
      method: 'rsFtAppSheet/doAppRsFtThreecolumnListJson'
    })
    return {
      page: basedata.page,
      ...result
    }
})

// 本期开票明细查询接口
export const  doAppRsFtInvoiceListJson =createAction(FINANCE_POST_RS_FT_INVOICE_LIST,async(basedata:any)=>{
  return financeRequest({
      data: {
        ...basedata,
      },
      method: 'rsFtAppSheet/doAppRsFtInvoiceListJson'
    })
})

// 海信方已发货未开票查询接口
export const  doAppRsFtShipNoInvoiceListJson =createAction(FINANCE_POST_RS_FT_NO_INVOICE_LIST,async(basedata:any)=>{
  return financeRequest({
      data: {
        ...basedata,
      },
      method: 'rsFtAppSheet/doAppRsFtShipNoInvoiceListJson'
    })
})

// 本期回款明细查询接口
export const  doAppRsFtIncomeListJson =createAction(FINANCE_POST_RS_FT_INCOME_LIST,async(basedata:any)=>{
  return financeRequest({
      data: {
        ...basedata,
      },
      method: 'rsFtAppSheet/doAppRsFtIncomeListJson'
    })
})


// 已退货未退税明细查询接口
export const  doAppRsFtReturnNoRefundListJson =createAction(FINANCE_POST_RS_FT_NO_REFUND_LIST,async(basedata:any)=>{
  return financeRequest({
      data: {
        ...basedata,
      },
      method: 'rsFtAppSheet/doAppRsFtReturnNoRefundListJson'
    })
})
//资金签章客户接口
export const queryAppRsOcFtSheetByRowId =createAction(RS_OC_FT_SHEET_BY_ROWID,async(basedata:any)=>{
  return financeRequest({
    data: {
      ...basedata,
    },
    method: 'rsFtAppSheet/queryAppRsOcFtSheetByRowId'
  })
})


// rsFtAppSheet/doAppRsFtCreateAndSign
// 资金对账单app签章
export const doAppRsFtCreateAndSign = createAction(RS_FT_CREATE_AND_SIGN, (data: any) => {
  return financeRequest({
    data: {
      ...data,
      method: 'doAppRsFtCreateAndSign'
    },
    method: 'rsFtAppSheet/doAppRsFtCreateAndSign'
  })
})
