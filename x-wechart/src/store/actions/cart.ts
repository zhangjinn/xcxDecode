import { createAction } from 'redux-actions';
import { is, length, map, find, propEq } from 'ramda';
import { request } from '@/utils/request';
import {
  GET_CART_COUNT, GET_CART_LIST,
  GET_CART_POLICY_ITEM, UPDATE_CART_ITEM_COUNT,
  REMOVE_CART_ITEM, GET_CART_PRICE_LIST, GET_CART_STOCK_LIST,
  GET_CART_SUPPLY_AND_ITEM_GROUP,
  GET_DMS_PRIDE_AND_ID,GET_CART_DMS_STOCK_LIST,
} from '@/store/types/cart';
import { dmsRequest } from './dmsrequest';
interface CartParams {
  data: any;
  callback?: () => void;
}
export interface PriceParams {
  code: string;
  orgId: string;
  orgCode: string;
}

export interface StockParam {
  orgId: string;//组织id
  code: string;//产品编码
  queryType: string;//库存查询类型
}

export interface PolicyParams {
  versionId: string;
  orgCode: string;
  orgId: string;
  productId: string;
}
export interface dmsPriceAndStock {
  orgId: string;
  productId: any [];
}

export interface dmsGoodsStock{
  orgId: string;
  productCodes: [];
  supplierCode: string;
}
// dms商品价格
export const getCartDmsPrice = createAction(GET_DMS_PRIDE_AND_ID, ( data : dmsPriceAndStock) => request({ api: 'product/fxPrice.nd', data }));
// export const getCartDmsPrice = createAction(GET_DMS_PRIDE_AND_ID, async (dmsPriceAndStock: any) => {
//   return dmsRequest({
//     data: dmsPriceAndStock,
//     method: 'getPurchasePrice'
//   })
// })

// 获取dms商品库存
export const getCartDmsStocks = createAction(GET_CART_DMS_STOCK_LIST, async (dmsGoodsStock: any) => {
  return dmsRequest({
    data: dmsGoodsStock,
    method: 'hasProductInventory'
  })
})

// 获取三期供应商和物料组
export const getCartSupplyAndItemGroup = createAction(GET_CART_SUPPLY_AND_ITEM_GROUP, (data: any, callback: any) => request({ api: 'cart/cartParam.nd', data, callback }));

// 获取购物车的数量
export const getCartCount = createAction(GET_CART_COUNT, () => request({ api: 'cart/getCartNum.nd' }));

// 获取商品列表
export const getCartList = createAction(GET_CART_LIST, ({ data, callback }: CartParams) => request({ api: 'cart/showCartList.nd', data, callback }));

// 获取商品的库存
// export const getStocks = createAction(GET_CART_STOCK_LIST, async (data: PriceParams) => {
//   const stockRes: any = await request({ api: 'product/getStocks.nd', method: 'POST', data });
//   let stocks: any = [];

//   if (is(Array, stockRes) && length(stockRes) > 0) {
//     stocks = map(({ productCode, inventory }) => ({ productCode, stock: inventory }), stockRes);
//   }
//   return stocks;
// });

export const getStocks = createAction(GET_CART_STOCK_LIST, (data: StockParam) => request({
  api: 'product/getStocks.nd', method: 'POST', data
 }))

// 获取商品的价格和库存
export const getPrices = createAction(GET_CART_PRICE_LIST, async (data: PriceParams) => {
  const priceRes: any = await request({ api: 'product/getPrices.nd', method: 'POST', data });
  let prices: any = [];
  if (is(Array, priceRes) && length(priceRes) > 0) {
    prices = map(({ productCode, fixedDiscount, makeUpType, price, standardPrice, pricingGroupName }) => ({
      productCode, fixedDiscount, makeUpType, price, standardPrice, pricingGroupName,
    }), priceRes);
  }
  return prices;
});

// 选择政策
export const changePolicy = createAction(GET_CART_POLICY_ITEM, async (data: PolicyParams, policy: any) => {
  const res: any = await request({ api: 'cart/changePolicy.nd', method: 'POST', data });
  let payload = { productId: data.productId, policy };
  if (res && res.fixedDiscount) {
    payload = { ...payload, ...res };
  }
  return payload;
});

// 更新购物车数量
export const updateItemQuantity = createAction(UPDATE_CART_ITEM_COUNT, async (data: any, callback: () => void) => {
  const res: any = await request({ api: 'cart/updateQuantity.nd', method: 'POST', data, callback });
  return { ...data, res };
});

// 删除单个商品
export const removeCartItem = createAction(REMOVE_CART_ITEM, async (data: any, callback: () => void) => {
  const res: any = await request({ api: 'cart/deleteProduct.nd', method: 'POST', data, callback });
  return { ...data, res };
});
