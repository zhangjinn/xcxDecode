import { createAction } from 'redux-actions'
import { SET_DISTRIBUTORS_ORDER,GET_DMS_STOCK_ID, GET_DMS_SHOP_ADDRESS, GET_DMS_PEOPLE_PHONE, SET_CIS_DISTRIBUTORS_ORDER, GET_SYS_CONFIG } from '@/store/types/distributorsorder'
import { dmsRequest } from './dmsrequest'
import { request } from '@/utils/request'

interface ItemDistributorsParam {
  cisCode: string
  purchaseOrder: {
    documentDate: string
    edt: string
    orgCode: string
    supplierId: string
    addressId: string
    billtoId: string
    userId: string
    warehouseId: string
    totalAmount: string
    totalOrderedQty: string
    message: string
    purchaseOrderItem: [{
      productCode: string
      productName: string
      model: string
      colour: string
      invStatusId: string
      orderedQty: string
      price: string
      priceId: string
      amount: string
    }]
  }
}
export interface dmsPriceAndStock {
  cisCode: string;
  productCodes: any [];
}
export interface dmsAddress {
  cisCode: string;
  orgId: string;
  matklId: string
}
export interface people {
  sendToId: string;
}
// 分销商订单
export const setDisrtibutorsOrder = createAction(SET_DISTRIBUTORS_ORDER, async (data: ItemDistributorsParam) => {
  return dmsRequest({
    data,
    method: 'submitPurchaseOrder'
  })
})
// 分销商订单同供应商跨物料组
export const setDisrtibutorsOrderNew = createAction(SET_DISTRIBUTORS_ORDER, async (data: ItemDistributorsParam) => {
  return dmsRequest({
    data,
    method: 'submitBatchPurchaseOrder'
  })
})

// cis分销商下单
export const setCisDisrtibutorsOrder = createAction(SET_CIS_DISTRIBUTORS_ORDER, (data: ItemDistributorsParam) => request({ api: `dmsPurchaseOrder/submit.nd`, method: 'POST', data, type:'application/json' }))

// 获取系统参数
export const getSysConfig = createAction(GET_SYS_CONFIG, (data: any) => request({ api: `comm/sysconfig.nd`, method: 'GET', data, type:'application/json' }))


// 获取手机和电话
export const getPeoplePhone= createAction(GET_DMS_PEOPLE_PHONE, (data: people, callback: () => void) => request({ api: 'address/changeCustomerAddress.nd',method: 'POST', data, callback }));
// dms商品库存
export const getCartDmsStock = createAction(GET_DMS_STOCK_ID, async (dmsPriceAndStock: any) => {
  return dmsRequest({
    data: dmsPriceAndStock,
    method: 'getInvStatusBatch'
  })
})

export const getDmsShopAddress = createAction(GET_DMS_SHOP_ADDRESS, (data: dmsAddress) => request({ api: `address/changeDistributionAddressByCode.nd`, method: 'POST', data }))
