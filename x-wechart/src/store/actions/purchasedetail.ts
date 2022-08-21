// export const GET_PURCHASE_DETAIL = 'GET_PURCHASE_DETAIL'
import wepy from 'wepy';
import { createAction } from 'redux-actions';
import { dmsRequest } from './dmsrequest';
import { GET_PURCHASE_DETAIL, PURCHASE_ORDER_IN } from '@/store/types/purchasedetail'

export interface OrderDetail {
  cisCode: string
  PurchaseOrderId: string
}
export interface OrderIn {
  cisCode: string
  userAccount: string
  data: {
    isFinished: boolean
    purchaseOrderId: string
    purchaseOrderItem: {
      productCode: string
      model: string
      colour: string
      orderedQty: string
      price: string
      shippedBqty: string
      invStatusId: string
      warehouseId: string
      priceGroupName: string
    }
  }
}
export const getPurchaseOrderIn = createAction(PURCHASE_ORDER_IN, async (OrderDetail: any) => {
  return dmsRequest({
    data: OrderDetail,
    method: 'purchaseOrderIn'
  })
})
export const getPurchaseDetail = createAction(GET_PURCHASE_DETAIL, async (OrderIn: any) => {
  return dmsRequest({
    data: OrderIn,
    method: 'findPurchaseOrderDetail'
  })
})

