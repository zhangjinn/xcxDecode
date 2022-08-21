import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import { GET_FFUND_CLAIM_COUNTS,GET_FFUND_CLAIM_DETAIL,POST_FUND_CLAIM_HANDLE,GET_FUND_CLAIM_AGENCY,GET_FUND_CLAIM_BUSSINESS,GET_CAPITAL_FLOW_QUERY_CONDITIONS,GET_CREDIT_RANGE,GET_CAPITAL_FLOW_LIST} from '@/store/types/fundclaim';
// import { GET_FUND_CLAIM_AGENCY,GET_FUND_CLAIM_BUSSINESS } from '@/store/types/fundclaim'
// 获取统计数据
export const getFundClaimCounts = createAction(GET_FFUND_CLAIM_COUNTS, (data:any,callback: (res:any) => void) => request({ api: 'finance/commonApi.nd',method:'POST', data, type:'json', callback}));
export const getFundClaimDetail = createAction(GET_FFUND_CLAIM_DETAIL, (data:any,callback: (res:any) => void) => request({ api: 'finance/commonApi.nd',method:'POST', data, type:'json', callback}));
export const postFundClaimHandle = createAction(POST_FUND_CLAIM_HANDLE, (data:any,callback: (res:any) => void) => request({ api: 'finance/commonApi.nd',method:'POST', data, type:'json', callback}));
export const getFundClaimBussiness = createAction(GET_FUND_CLAIM_BUSSINESS, (data:any,callback: (res:any) => void) => request({ api: 'finance/getSellerInfo.nd',method:'POST', data, type:'json', callback}));
export const getFundClaimAgency = createAction(GET_FUND_CLAIM_AGENCY, (data:any,orgCode:any,callback: (res:any) => void) => request({ api: 'finance/financeEditAndDetail.nd?orgCode='+orgCode,method:'GET', data, type:'form', callback}));

// 资金流水查询条件
export const getCapitalFlowQueryConditions = createAction(GET_CAPITAL_FLOW_QUERY_CONDITIONS, (data:any,callback: (res:any) => void) => request({ api: 'balance/flowBalanceParam.nd',method:'GET', data, type:'json', callback}));
// 资金流水信贷范围
export const getCreditRange = createAction(GET_CREDIT_RANGE, (data:any,callback: (res:any) => void) => request({ api: 'balance/creditRange.nd',method:'GET', data, type:'json', callback}));
// 资金流水接口_copy
export const getCapitalFlowList = createAction(GET_CAPITAL_FLOW_LIST, (data:any,callback: (res:any) => void) => request({ api: 'balance/flowBalance.nd',method:'GET', data, type:'json', callback}));
