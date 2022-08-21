import wepy from 'wepy';
import { createAction } from 'redux-actions';
import { dmsRequest } from './dmsrequest';
import { GET_INVENTORY_QUERIES_LIST,GET_DISTRIBUTOR_INVENTORY_INQUIRY,DMS_INV_STATUS_TYPE,GET_INVENTORY_QUERIES_LIST_IN,GET_DISTRIBUTOR_TYPE,GET_OPEN_RESERVATION,GET_INVENTORY_QUERIES_LIST_NEW ,GET_FINDTAOJI_INVENTORY_TOTAL,GET_SING_INVENTORY_QUERIES_LIST} from '@/store/types/inventory'

export interface data {
  cisCode: string
  terms: {
    model: string
    colour: string
    warehouseId: string
    invStatusId: string
    isLock: string
    dealerMaterialGroupFlag: string
    materialGroupName: string
  }
  userAccount: string
  warehouseId: string
  purchaseOrderIds: {}
}
export interface distributor {
  cisCode: string
  terms: {
    model: string
    colour: string
    dealerName: string
  }
  page: {
    pageSize: number
    pageNo: number
  }
}

export const getInventoryQueriesList = createAction(GET_INVENTORY_QUERIES_LIST, async (data: any) => {
  return dmsRequest({
    data,
    //method: 'findInventoryList'
    method: 'findInventoryProductList'
  })
})

// 用于渠道订单审核、零售录入、分销录入、选择产品时获取产品列表; 和getInventoryQueriesList功能相同，传参返回参数相同
// 默认查询上架的产品，用于业务场景中搜索产品
export const getInventoryQueriesListNew = createAction(GET_INVENTORY_QUERIES_LIST, async (data: any) => {
  return dmsRequest({
    data,
    method: 'findMaterialInventoryList'
  })
})

// 复制findMaterialInventoryList 改成新的接口 findMaterialInventoryPage，这个接口默认查询所有的产品，并添加上下架状态，用于当前库存页面显示用
export const getMaterialInventoryPage = createAction(GET_INVENTORY_QUERIES_LIST, async (data: any) => {
  return dmsRequest({
    data,
    method: 'findMaterialInventoryPage'
  })
})
export const getInventoryQueriesListIn = createAction(GET_INVENTORY_QUERIES_LIST_IN, async (data: any) => {
  return dmsRequest({
    data,
    method: 'findProductListLikeCode'
  })
})
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

export const getDistributorInventoryInquiry = createAction(GET_DISTRIBUTOR_INVENTORY_INQUIRY, async (distributor: any) => {
  return dmsRequest({
    data: distributor,
    method: 'findInventoryHisenseList'
  })
})

export const getDistributorType = createAction(GET_DISTRIBUTOR_TYPE, async (distributor: any) => {
  return dmsRequest({
    data: distributor,
    method: 'getConditionOptions'
  })
})

// 未结预留
export const getOpenReservationList = createAction(GET_OPEN_RESERVATION, async (data: any) => {
  return dmsRequest({
    data,
    method: 'findNotReleasedReserveList'
  })
})

// 查询样机库存总数接口
export const getfindTaojiInventoryTotal = createAction(GET_FINDTAOJI_INVENTORY_TOTAL, async (data: any) => {
  return dmsRequest({
    data,
    method: 'findTaojiInventoryTotal'
  })
})
// 只查询单机
export const getSingerMaterialInventoryPage = createAction(GET_SING_INVENTORY_QUERIES_LIST, async (data: any) => {
  return dmsRequest({
    data,
    method: 'findSingleMaterialInvList'
  })
})
