/*
 * @Description:
 * @Version: 2.0
 * @Autor: sqk
 * @Date: 2020-08-14 08:54:20
 * @LastEditors: sqk
 * @LastEditTime: 2020-08-17 12:55:38
 */
import { createAction } from 'redux-actions'
import { GET_ORDER_DETAIL, GET_CANCEL_LIST, GET_QUERY_CIS_ORDER_STATUS_INFO_MOBILE } from '@/store/types/order-detail'
import { request } from '@/utils/request'

export interface orderdetail {
  id: number;
}

export interface cancelReasonList {
  code: string;
  name: string;
  desc: string;
}

export interface orderCode {
  orderCode: string;
}

// 订单详情
export const getOrderDetail = createAction(GET_ORDER_DETAIL, (data: orderdetail) => request({ api: `order/orderLine.nd`, method: 'GET', data}))

//取消原因列表
export const getCancelReasonList = createAction(GET_CANCEL_LIST, (data: cancelReasonList) => request({ api: `comm/dict.nd?pid=14963960650`, method: 'GET', data}))

//取消原因列表
//export const queryCisOrderStatusInfoMobile = createAction(GET_QUERY_CIS_ORDER_STATUS_INFO_MOBILE, (data: orderCode) => request({ api: `http://cistest.hisense.com/b2b-rest/queryCisOrderStatusInfoMobile`, method: 'GET', data}))
//export const queryCisOrderStatusInfoMobile = createAction(GET_QUERY_CIS_ORDER_STATUS_INFO_MOBILE, (data: orderCode) => request({ api: `https://xtw.hisense.com/front/order/queryCisOrderStatusInfoMobile.nd`, method: 'GET', data}))
export const queryCisOrderStatusInfoMobile = createAction(GET_QUERY_CIS_ORDER_STATUS_INFO_MOBILE, (data: orderCode) => request({ api: `order/queryCisOrderStatusInfoMobile.nd`, method: 'GET', data}))
