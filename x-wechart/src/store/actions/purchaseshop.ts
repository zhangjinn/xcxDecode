import wepy from 'wepy';
import { createAction } from 'redux-actions';
import { dmsRequest } from './dmsrequest';

import { GET_PURCHASE_LIST, GET_BASE_DATA,GET_PURCHASE_LIST_IN, GET_MERCHANT_SUPPLIERS,GET_VENDOR_ITEM_GROUP } from '@/store/types/purchaseshop'

export interface data {
  dealerCode: string;
  terms : {
    documentNum: string;
    supplierCode: string;
    startDocumentDate:string;
    endDocumentDate: string;
    status: string
  }
  page: {
    pageSize: '10',
    pageNo: number
  }
}
export interface ListIn {
  cisCode: string
  userAccount: string
  warehouseId: string
  purchaseOrderIds: {}
}
export interface basedata {
  cisCode: string;
  type: string;
  user: {
    code:string;
    isAdmin: string;
  }
}

export interface suppliers {
  cisCode: string;
}

export interface Vendor {
  cisCode: string;
  supplierCode: string
  orgId: string
}

// 根据供应商获取物料组
export const getVendorItemGroupList = createAction(GET_VENDOR_ITEM_GROUP, async (Vendor: any) => {
  return dmsRequest({
    data: Vendor,
    method: 'findMaterialGroupBySupplier'
  })
})

// 根据商家获取供应商
export const getMerchantSuppliersList = createAction(GET_MERCHANT_SUPPLIERS, async (suppliers: any) => {
  return dmsRequest({
    data: suppliers,
    method: 'findSupplierByDealer'
  })
})


// 采购列表
export const getPurchaseList = createAction(GET_PURCHASE_LIST, async (data: any) => {
  return dmsRequest({
    data,
    method: 'findPurchaseOrderList'
  })
})
// 基础信息
export const getBaseData = createAction(GET_BASE_DATA, async (basedata: any) => {
  const result = await dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      ...basedata
    },
    method: 'findBaseData'
  })
  return {
    ...result,
    type: basedata.type
    orgId:basedata.orgId||''
  }
})
export const getPurchaseListIn = createAction(GET_PURCHASE_LIST_IN, async (ListIn: any) => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      ...ListIn
    },
    method: 'purchaseOrderBatchIn'
  })
})
