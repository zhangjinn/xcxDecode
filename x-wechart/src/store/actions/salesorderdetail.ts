import { createAction } from 'redux-actions'
import { GET_SALES_ORDER_DETAIL,NORMAL_ORDER_EDIT,RETAIL_ORDER_EDIT,GET_PURCHASE_ORDER_DETAIL ,GET_PURCHASE_EXAM_INFO,GET_SALES_CIS_STOCKS,CANSEL_ORDER_OMS,ORDER_INVENTORY_FAST} from '@/store/types/salesorderdetail'
import { request } from '@/utils/request'
import { dmsRequest } from './dmsrequest';

export interface data {
  code: string;
  orgCode: string;
  orgId: string
}
export interface stock {
  id: number;
}
export const getSalesOrderDetail = createAction(GET_SALES_ORDER_DETAIL, async (data: any) => {
    return dmsRequest({
      data,
      method: 'findSalesOrderDetail'
    })
  })

interface SalesOrderParam {
  salesOrderId: string
}
export const toNormalOrderEdit = createAction(NORMAL_ORDER_EDIT, ({ salesOrderId }: SalesOrderParam) => {
  return dmsRequest({
    data: {
      salesOrderId,
    },
    method: 'toNormalOrderEdit'
  })
})

// 获取cis库存
export const getSalesCisStock = createAction(GET_SALES_CIS_STOCKS, (data: stock) => request({ api: 'product/getStocks.nd', method: 'POST', data }))

export const toRetailOrderEdit = createAction(RETAIL_ORDER_EDIT, ({ salesOrderId }: SalesOrderParam) => {
  return dmsRequest({
    data: {
      salesOrderId,
    },
    method: 'toRetailOrderEdit'
  })
})
export const getPurchaseOrderDetail = createAction(GET_PURCHASE_ORDER_DETAIL, async (data: any) => {
  return dmsRequest({
    data,
    method: 'findPurchaseOrderDetail'
  })
})
export const getPurchaseExamInfo = createAction(GET_PURCHASE_EXAM_INFO, async (data: any) => {
  return dmsRequest({
    data,
    method: 'getPurchaseExamInfo'
  })
})



// 取消物流
export const canselOms = createAction(CANSEL_ORDER_OMS, async (data: any) => {
  return dmsRequest({
    data,
    method: 'omsOrderCancle'
  })
})

// 订单审核快速满足
export const orderInventoryFast = createAction(ORDER_INVENTORY_FAST, async (data: any) => {
  return dmsRequest({
    data,
    method: 'salesOrderInventoryFast'
  })
})
