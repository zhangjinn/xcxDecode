import { createAction } from 'redux-actions';
import { dmsRequest } from './dmsrequest';
import {
  GET_NEW_RETURN_ORDER_INFO, GET_CONFIRMATION_INBOUND,
  GET_NEW_RETURN_ORDER_CHANNEL_INFO, GET_CONFIRMATION_CHANNEL_INBOUND
} from '../types/returnentry';

export interface data {
  cisCode: string,
  salesOrderId: string,
}
export interface newData {
  cisCode: string,
  userAccount: string,
  orderItems: Object
}

export interface data_channel {
  cisCode: string,
  id: string,
  documentNum: string, // 采购单编码
  returnNum: string, // 退货单编码
  supplierName: string,
  returnBy: string
}
export interface data_channel_return {
  cisCode: string,
  userAccount: string,
  data: Array<1>
}
export const getNewReturnOrderInfo = createAction(GET_NEW_RETURN_ORDER_INFO, async (data: any) => {
  return dmsRequest({
    data,
    method: 'getReturnOrderInfo'
  })
})
export const getNewConfirmationInbound = createAction(GET_CONFIRMATION_INBOUND, async (newData: any) => {
  return dmsRequest({
    data: newData,
    method: 'returnAddAndIn'
  })
})
// 分界线----------------------
export const getNewReturnOrderChannelInfo = createAction(GET_NEW_RETURN_ORDER_CHANNEL_INFO, async (data_channel: any) => {
  return dmsRequest({
    data: data_channel,
    method: 'toPurchaseReturnDetail'
  })
})
export const returnAddAndOut = createAction(GET_CONFIRMATION_CHANNEL_INBOUND, async (data_channel_return: any) => {
  return dmsRequest({
    data: data_channel_return,
    method: 'returnAddAndOut'
  })
})
