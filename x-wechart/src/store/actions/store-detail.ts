import { createAction } from 'redux-actions';
// import { request } from '@/utils/request';
import { request } from '@/utils/requestJSON';
import {
    QUERY_ALLSTORE_SALESDETAILXTW,
    QUERY_STORE_ALLINFO,
    QUERY_ALLMATKL,
    QUERY_ALLSTORE_SALESXTW,
    CUSTMODEL_SHOPINFO_RANK,
    GET_STOREDETAIL_BYMAT,
    GET_STORE_PERSON,
    GET_STORE_RECORDLIST,
    GET_MATERIALGROUP_TOXTW,
    STORE_EVALUATION_CHART,
    GET_STORE_INSPECTION,
    GET_COMPETITOR_LIST
} from '@/store/types/store-detail';

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

//获取门店销售明细
export const queryAllStoreSaleDetailxtw = createAction(QUERY_ALLSTORE_SALESDETAILXTW, (data: any, callback:() => void) => request({ api: 'cts/ctsApi.nd?',method:'POST',data,callback }));

//获取门店all信息
export const queryStoreAllInfo = createAction(QUERY_STORE_ALLINFO, (data: any, callback:() => void) => request({ api: 'cts/ctsApi.nd?',method:'POST',data,callback }));

//获取门店全部物料组
export const queryAllMatkl = createAction(QUERY_ALLMATKL, (data: any, callback:() => void) => request({ api: 'cts/ctsApi.nd?',method:'POST',data,callback }));

//获取门店销售数据
export const queryAllStoreSalesXtw = createAction(QUERY_ALLSTORE_SALESXTW, (data: any, callback:() => void) => request({ api: 'cts/ctsApi.nd?',method:'POST',data,callback }));

//竞争力排名
export const custModelShopInfoRank = createAction(CUSTMODEL_SHOPINFO_RANK, (data: any, callback:() => void) => request({ api: 'cts/ctsApi.nd?',method:'POST',data,callback }));

//根据门店和物料组获取门店信息
export const getStoreDetailByMat = createAction(GET_STOREDETAIL_BYMAT, (data: any, callback:() => void) => request({ api: 'cts/ctsApi.nd?',method:'POST',data,callback }));

//门店人员信息
export const getStoryPersons = createAction(GET_STORE_PERSON, (data: any, callback:() => void) => request({ api: 'cts/ctsApi.nd?',method:'POST',data,callback }));

//门店档案列表
export const storeRecordList = createAction(GET_STORE_RECORDLIST, (data: any, callback:() => void) => request({ api: 'cts/ctsApi.nd?',method:'POST',data,callback }));

//门店详情获取物料组
export const getMaterialGroupToXtw = createAction(CUSTMODEL_SHOPINFO_RANK, (data: any, callback:() => void) => request({  api: 'cts/ctsApi.nd?',method:'POST',data,callback }));

//门店综合评价趋势图  
export const storeEvaluationChart = createAction(STORE_EVALUATION_CHART, (data: any, callback:() => void) => request({ api: 'cts/ctsApi.nd?',method:'POST',data,callback}));

//门店巡店记录 
export const getStoreInspectionRecordListForStore = createAction(GET_STORE_INSPECTION, (data: any, callback:() => void) => request({ api: 'cts/ctsApi.nd?',method:'POST',data,callback }));

//获得竞品排名 
export const getCompetitorList = createAction(GET_COMPETITOR_LIST, (data: any, callback:() => void) => request({ api: 'cts/ctsApi.nd?',method:'POST',data,callback }));

