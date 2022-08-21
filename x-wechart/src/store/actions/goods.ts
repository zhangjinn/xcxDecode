import { createAction } from 'redux-actions';
import { head, length, is } from 'ramda';
import { request } from '@/utils/request';
import {
  GET_GOODS_INFO, GET_GOODS_PRICE,GET_GOODS_STOCK,
  GET_GOODS_PROMOTION, GET_GOODS_DMS_PRICE,
  GET_GOODS_DMS_STOCK, GET_GOODS_MODEL, GET_MODEL_GOODS_INFO
} from '@/store/types/goods';
import { dmsRequest } from './dmsrequest';

export interface GoodsParams2 {
  // cisCode: string;//商家编码
  orgId: string;//组织id
  code: string;//产品编码
  queryType: string;//库存查询类型
}

export interface GoodsParams {
  code: string;
  orgId?: string;
  orgCode?: string;
  type?: string;
}

export interface goodsItems {
  cisCode: string;
  productCodes: [];
}

export interface zx {
  orgId: string;
  productId: string;
}
// 获取dms商品库存
export const getGoodsDmsStock = createAction(GET_GOODS_DMS_STOCK, async (goodsItems: any) => {
  return dmsRequest({
    data: goodsItems,
    method: 'hasProductInventory'
  })
})
// product/fxPrice.nd
// 获取dms商品价格
export const getGoodsDmsPrice = createAction(GET_GOODS_DMS_PRICE, (data: zx) => request({ api: `product/fxPrice.nd`, method: 'GET', data }))
// export const getGoodsDmsPrice = createAction(GET_GOODS_DMS_PRICE, async (goodsItems: any) => {
//   return dmsRequest({
//     data: goodsItems,
//     method: 'findDealerProductPrice'
//   })
// })


// 获取商品营销活动
export const getGoodsPromotion = createAction(GET_GOODS_PROMOTION, (data: any, callback: any) => request({ api: 'marketActivity/queryDetail.nd', data, callback }));

// 获取商品详情
export const getGoodsInfo = createAction(GET_GOODS_INFO, ({ code, orgId,orderType }: GoodsParams, callback: any) => request({ api: `product/showProductInfo/${code}/${orgId}.nd`,data:{orderType:orderType||''} callback }));

// 获取商品价格 { code, orgId, orgCode, type='orderQty' }
export const getGoodsPrice = createAction(GET_GOODS_PRICE, async (data: GoodsParams) => {
  const priceRes: any = await request({ api: 'product/getPrices.nd', method: 'POST', data });
  let price: any = {};
  if (is(Array, priceRes) && length(priceRes) > 0) {
    const { standardPrice, fixedDiscount, channelQty, qty }: any = head(priceRes);
    price = { standardPrice, fixedDiscount, channelQty, qty };
  }
  return price;
});

// 获取商品库存 { code, orgId, orgCode, type='orderQty' }
// export const getGoodsStock = createAction(GET_GOODS_STOCK, async (data: GoodsParams) => {
//   return request({api: 'product/getStocks.nd', method: 'POST', data});
// });

// 获取商品库存 { code, orgId, orgCode, type='orderQty' }
export const getGoodsStock = createAction(GET_GOODS_STOCK, async (data: GoodsParams2) => {
  return request({api: 'product/getStocks.nd', method: 'POST', data});
});

//获取模块化定制产品列表
export const getGoodsModel = createAction(GET_GOODS_MODEL, async (data: GoodsParams) => {
  return request({api: 'product/queryModelList.nd', method: 'GET', data});
});

// 获取定制专区商品详情
export const getModelGoodsInfo = createAction(GET_MODEL_GOODS_INFO, ({ code }: GoodsParams, callback: any) => request({ api: `product/showModelProductInfo.nd?modelId=${code}`, callback }));

