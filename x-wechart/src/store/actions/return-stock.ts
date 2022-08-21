import wepy from 'wepy';
import { createAction } from 'redux-actions';
import { dmsRequest } from './dmsrequest';
import { GET_RETURN_SUPPLIER,RETURN_ALL_IN } from '../types/return-stock';

export interface data {
  cisCode: string
}
export const getReturnSupplier = createAction(GET_RETURN_SUPPLIER, async (data: any) => {
  return dmsRequest({
    data,
    method: 'findSupplierByDealer'
  })
})

export interface form {
  cisCode: string
  userAccount: string
  data: {
    documentDate: string
    customerCode: string
    billFromId: string
    sellerCode: string
    storeCode: string
    inWarehouseId: string
    supplierCode: string
    orgId: string
    message: string
    orderItems: {
      productCode: String
      productName: String
      model:String
      colour: string
      borderedQty: string
      bprice: string
      amount: string
      invStatus: string
    }
  }
}
export const getReturnIn = createAction(RETURN_ALL_IN, async (from: any) => {
  return dmsRequest({
    data: from,
    method: 'returnAddAndIn'
  })
})
