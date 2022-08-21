import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import { dmsRequest } from './dmsrequest';
import {
  GET_SALES_ORDER_LIST,GET_SALES_ORDER_FILTER,
  CANCLE_SALES_ORDER,DELETE_SALES_ORDER,GET_PURCHASE_ORDER_LIST,
  RESET_PURCHASE_ORDER_LIST,SALES_ORDER_REJECTED,
  SALES_ORDER_APPROVAL,AGENT_CANCELE_ORDER,
  CANSEL_ORDER_EXAMIN
} from '@/store/types/salesorder';
import wepy from 'wepy';

export interface data {
  terms : {
    documentNum: string
    customerCode:  string,
    customerName: string,
    warehouseCode:string,
    warehouseName:string,
    startDate: string,
    endDate: string,
    sellerName: string,
    documentType:string,
  }
  page: {
    pageSize: number,
    pageNo: number
  }
}

export interface orderItemOperation {
  cisCode: string;
  userAccount: string;
  salesOrderId: string;
  purchaseOrderId: string;
}
// 销售订单订单同意
export const salesOrderApproval = createAction(SALES_ORDER_APPROVAL, async (data: orderItemOperation) => {
  return dmsRequest({
    data,
    method: 'examPurchaseOrder'
  })
})
// 销售订单订单驳回
export const salesOrderRejected = createAction(SALES_ORDER_REJECTED, async (data: orderItemOperation) => {
  return dmsRequest({
    data,
    method: 'rejectPurchaseOrder'
  })
})

// 销售订单订单列表以及筛选
export const getSalesOrderList = createAction(GET_SALES_ORDER_LIST, async (data: any) => {
  return dmsRequest({
    data,
    method: 'findSalesOrderList'
  })
})

// 基础信息
export const getSalesOrderFilter = createAction(GET_SALES_ORDER_FILTER, async (basedata: any) => {
  const result = await dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      ...basedata,
    },
    method: 'findBaseData'
  })
  return {
    ...result,
    type: basedata.type
  }
})
interface SalesOrderParam {
  salesOrderId: string
}
//取消订单
export const cancleSalesOrder = createAction(CANCLE_SALES_ORDER, ({ salesOrderId }: SalesOrderParam) => {
  return dmsRequest({
   data: {
    userAccount: wepy.$instance.globalData.account,
    salesOrderId,
   },
   method: 'cancelSalesOrder'
  })
})

//删除订单
export const deleteSalesOrder = createAction(DELETE_SALES_ORDER, ({ salesOrderId }: SalesOrderParam) => {
  return dmsRequest({
   data: {
    userAccount: wepy.$instance.globalData.account,
    salesOrderId,
   },
   method: 'deleteSalesOrder'
  })
})

// 渠道采购订单列表以及筛选
export const getPurchaseOrderList = createAction(GET_PURCHASE_ORDER_LIST, async (data: any) => {
  return dmsRequest({
    data,
    method: 'findDistributorPurchaseOrderList'
  })
})

//分销商取消订单
export const agentCancleSalesOrder = createAction(AGENT_CANCELE_ORDER, ({ purchaseOrderId }: SalesOrderParam) => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      purchaseOrderId,
    },
    method: 'cancelPurchaseOrderByDistributor'
  })
})

// 取消审核
export const canselOrder = createAction(CANSEL_ORDER_EXAMIN, async (data: any) => {
  return dmsRequest({
    data,
    method: 'deleteReserverBySoId'
  })
})
