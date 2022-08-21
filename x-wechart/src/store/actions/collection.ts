import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import { GET_COLLECTION_BY_GROUP_CATEGORY, GET_COLLECTION_FROM_CART, GET_COLLECTION_STOCK, GET_COLLECTION_PRICE, GET_COLLECTION_DMS_PRICE } from '@/store/types/collection';

export interface CollectionParams {
  catalogId?: string;
  groupId?: string;
  type: string;
}
export interface goodsItems {
  orgId: string;
  productId: [];
}
// 根据产品组和类目获取收藏列表
export const getCollectionByGroupAndCategory = createAction(GET_COLLECTION_BY_GROUP_CATEGORY, (data: CollectionParams) => request({ api: `oftenProduct/showOftenProductList.nd?_loading=true`, data,  method: 'POST' }));

// 购物车获取收藏列表
export const getCollectionFromCart = createAction(GET_COLLECTION_FROM_CART, (data: CollectionParams) => request({ api: 'oftenProduct/showCartOftenProductList.nd?_loading=true', data, method: 'POST' }))

// 获取分类价格
export const getCollectionPrice = createAction(GET_COLLECTION_PRICE, async (data: PriceOrStockParam) => request({ api: 'product/getPrices.nd', method: 'POST', data }))

//
export const getCollectionStock = createAction(GET_COLLECTION_STOCK, (data: PriceOrStockParam) => request({ api: 'product/getStocks.nd', method: 'POST', data }))

// 获取渠道价格
export const getCollectionDmsGoodsPrice = createAction(GET_COLLECTION_DMS_PRICE, (data: goodsItems) => request({ api: `product/fxPrice.nd`, method: 'GET', data }))
