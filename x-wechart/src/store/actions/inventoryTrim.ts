import wepy from 'wepy';
import { createAction } from 'redux-actions';
import { dmsRequest } from './dmsrequest';
import {DMS_INV_STATUS_TYPE } from '@/store/types/inventory'
import { GET_INVENTORY_LIST,GET_BASE_INFO,GET_STORE_HOUSE } from '@/store/types/inventoryTrim'

export interface dataList {
  // cisCode: string
  terms: {
    documentNum: string
    documentDateFrom: string
    documentDateTo: string
    warehouseId: string
    transactionType: string
    status: string
  }
  page: {
    pageNo: string
    pageSize: string
    sortName: string
    sortOrder: string
  }
}

// 获取补差类型
export const getInvStatusType = createAction(DMS_INV_STATUS_TYPE, async () => {
  const result = await dmsRequest({
    data: {
      _loading: true,
    }, method: 'getInvStatusType' })
  return {
    ...result
  }
})

// 获取库存调整列表
export const getInventoryList = createAction(GET_INVENTORY_LIST, async (dataList: any) => {
  return dmsRequest({
    data:dataList,
    method: 'getOtherStockTransList'
  })
})
// 获取事务类型、单据状态列表信息
export const getBaseInfo = createAction(GET_BASE_INFO, async () => {
  const result = await dmsRequest({
    data: {
      _loading: true,
    }, method: 'getOtherStockTransBaseInfo' })
  return {
    ...result
  }
})
interface storeOrgId{
  orgId: string
}
// 仓库查询接口
export const getStoreHouse = createAction(GET_STORE_HOUSE, async ({orgId}:storeOrgId) => {
  const result = await dmsRequest({
    data: {
      _loading: true,
      orgId,
      warehouseType:70,
    }, method: 'getWarehouseList'})
  return {
    ...result
  }
})

