import { createAction } from 'redux-actions';
import { dmsRequest } from './dmsrequest';
import {
  GET_RETURN_ORDER_INFO,
  GET_RETURN_CHANNEL_ORDER_INFO,
  GET_PURCHASE_ORDER_RETURN_DETAIL,
  CREATE_RETURN_ORDER_BY_PURCHASE_ORDER,
  GET_DISTRIBUTOR_RETURN_ORDER_DETAIL,
  CREATE_DISTRIBUTOR_RETURN_ORDER_OUT_BOUND,
  GET_RETURN_SHOW_SALES_ORDER,
  CREATE_CHANNEL_CREATION_RETURN,
  GET_AGENT_RETURN_ORDER_DETAIL,
  CREATE_AGENT_RETURN_ORDER_INBOUND,
  CANCEL_RETURN,
} from '../types/returnbefore';

export interface data {
  cisCode: string,
  filterStr: string,
  page: {
    pageSize: 10,
    pageNo: number
  }
}
export interface data_channel {
  cisCode: string,
  filterStr: string,
  page: {
    pageSize: 10,
    pageNo: number
  }
}
// 退货入库
export const getReturnOrderInfo = createAction(GET_RETURN_ORDER_INFO, async (data: any) => {
  return dmsRequest({
    data,
    method: 'findReturnOrderLike'
  })
})
// 渠道退货入库
export const getReturnChannelOrderInfo = createAction(GET_RETURN_CHANNEL_ORDER_INFO, async (data_channel: any) => {
  return dmsRequest({
    data: data_channel,
    method: 'findPurchaseReturnOrderLike'
  })
})
// 分销商采购单退货详情-退货发起
export const getPurchaseOrderReturnDetail = createAction(GET_PURCHASE_ORDER_RETURN_DETAIL, async (data_channel: any) => {
  return dmsRequest({
    data: data_channel,
    method: 'purchaseOrderReturnDetail'
  })
})

// 分销商发起退货提交
export const createReturnOrderByPurchaseOrder = createAction(CREATE_RETURN_ORDER_BY_PURCHASE_ORDER, async (data_channel: any) => {
  return dmsRequest({
    data: data_channel,
    method: 'createReturnOrderByPurchaseOrder'
  })
})

// 分销商退货详情-退货出库
export const getDistributorReturnOrderDetail = createAction(GET_DISTRIBUTOR_RETURN_ORDER_DETAIL, async (data_channel: any) => {
  return dmsRequest({
    data: data_channel,
    method: 'distributorReturnOrderDetail'
  })
})

// 分销商退货出库提交
export const createDistributorReturnOrderOutbound = createAction(CREATE_DISTRIBUTOR_RETURN_ORDER_OUT_BOUND, async (data_channel: any) => {
  return dmsRequest({
    data: data_channel,
    method: 'distributorReturnOrderOutbound'
  })
})

// 代理商销售单退货详情-退货发起
export const getReturnShowSalesOrder = createAction(GET_RETURN_SHOW_SALES_ORDER, async (data_channel: any) => {
  return dmsRequest({
    data: data_channel,
    method: 'returnShowSalesOrder'
  })
})

// 代理商发起退货提交
export const createChannelCreationReturn = createAction(CREATE_CHANNEL_CREATION_RETURN, async (data_channel: any) => {
  return dmsRequest({
    data: data_channel,
    method: 'channelCreationReturn'
  })
})

// 代理商销售单退货详情-退货入库
export const getAgentReturnOrderDetail= createAction(GET_AGENT_RETURN_ORDER_DETAIL, async (data_channel: any) => {
  return dmsRequest({
    data: data_channel,
    method: 'agentReturnOrderDetail'
  })
})

// 代理商退货入库提交
export const createAgentReturnOrderInbound = createAction(CREATE_AGENT_RETURN_ORDER_INBOUND, async (data_channel: any) => {
  return dmsRequest({
    data: data_channel,
    method: 'agentReturnOrderInbound'
  })
})

// 代理商退货入库取消退货
export const cancelReturn = createAction(CANCEL_RETURN, async (data_channel: any) => {
  return dmsRequest({
    data: data_channel,
    method: 'cancelReturn'
  })
})
