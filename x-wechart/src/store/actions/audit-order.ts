import { createAction } from 'redux-actions'
import { request } from '@/utils/request'
import { GET_AUDIT_ORDERS, GET_AUDIT_ORDER_DETAIL } from '@/store/types/audit-order'

// 获取订单列表
export const getOrderList = createAction(GET_AUDIT_ORDERS, (data: any, callback: any) => request({ api: 'order/list.nd', method: 'GET', data, callback }))

// 订单详情
export const getOrderDetail = createAction(GET_AUDIT_ORDER_DETAIL, (data: any) => request({ api: 'order/orderLine.nd', method: 'GET', data}))
