import { createAction } from 'redux-actions'
import { GET_SEARCH_GOODS, GET_SEARCH_PRICE,
  GET_SEARCH_STOCK,GET_FILTER_ITEM_GROUP,GET_FX_DICT_CIS_CODE,
  GET_EXCLUSIVE_SHOP_BY_CIS_CODE,FX_DICT_CIS_CODE,
  GET_FILTER_DMS_GOODS_PRICE,GET_DMS_GOODS_INVENTORY } from '@/store/types/search'
import { request } from '@/utils/request'
// import { PriceOrStockParam } from './classification'
import { PriceOrStockParam, StockParam } from './classification'
import { dmsRequest } from './dmsrequest'

export interface itemParams {
  keyword: string;
  pageNum?: number;
  sortField?: string;
  sortType? : string;
  catalogId?: number;
  productId?: number;
  orgId?: number;
  havePrice: number;
}


export interface ThreePhase {
  catalogId: string, // 品类id
  type: '' //查询类型，1：只查分销商 2 ：只查直营代理 空:默认全查
}
export interface goodsItems {///cis
  orgId: string;
  productId: string;
}

export interface goodsItems {//dms
  orgId: string;
  productCodes: [];
  supplierCode: string;
}
// 获取dms商品价格
// export const getFilterDmsGoodsPrice = createAction(GET_FILTER_DMS_GOODS_PRICE, async (goodsItems: any) => {
//   return dmsRequest({
//     data: goodsItems,
//     method: 'findDealerProductPrice'
//   })
// })
export const getFilterDmsGoodsPrice = createAction(GET_FILTER_DMS_GOODS_PRICE, (data: goodsItems) => request({ api: `product/fxPrice.nd`, method: 'GET', data }))
// 三期物料组
export const grtFilterItemGroup = createAction(GET_FILTER_ITEM_GROUP, (data: ThreePhase) => request({ api: `comm/queryAgentOrg.nd`, method: 'GET', data }))
// 组织
export const getFxDictCisCode = createAction(GET_FX_DICT_CIS_CODE, (data: ThreePhase) => request({ api: `comm/fxDictCisCode.nd`, method: 'GET', data }))

// 获取搜索列表
export const getSearchList = createAction(GET_SEARCH_GOODS, async (data: itemParams) => {
  const res = await request({ api: `product/list.nd`, method: 'POST', data })
  return {
    ...res,
    pageNum: data.pageNum,
  }
})

// 获取分类价格
export const getSearchPrice = createAction(GET_SEARCH_PRICE, async (data: PriceOrStockParam) => request({ api: 'product/getPrices.nd', method: 'POST', data }))

//
// export const getSearchStock = createAction(GET_SEARCH_STOCK, (data: PriceOrStockParam) => request({ api: 'product/getStocks.nd', method: 'POST', data }))
export const getSearchStock = createAction(GET_SEARCH_STOCK, (data: StockParam, callback: () => void) => request({ api: 'product/getStocks.nd',method: 'POST', data, callback }));

// 获取dms商品库存
export const getDmsGoodsInventory = createAction(GET_DMS_GOODS_INVENTORY, async (goodsItems: any,callback: () => void) => {
  return dmsRequest({
    data: goodsItems,
    method: 'hasProductInventory',
    callback
  })
})

// export const getFxDictCisCode = createAction(FX_DICT_CIS_CODE, (data: StockParam, callback: () => void) => request({ api: 'comm/fxDictCisCode.nd',method: 'get', data, callback }));
export const getExclusiveShopByCisCode = createAction(GET_EXCLUSIVE_SHOP_BY_CIS_CODE, (data: StockParam, callback: () => void) => request({ api: 'report/getExclusiveShopByCisCode.nd',method: 'POST', data, callback }));
