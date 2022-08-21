import { createAction } from 'redux-actions'
import { GET_DMS_GOODS_INVENTORY, GET_DMS_GOODS_PRICE, GET_THREE_PHASE_MATERIAL_GROUP_AND_SUPPLIERS, GET_ENGINEER_LIST, GET_PREFERENTIAL_LIST, GET_BUYOUT_LIST, GET_CLASSIFICATION_LIST, GET_GOODS_FILTERS, GET_SPECIAL_FILTERS, GET_CLASSIFICATION_PRICE, GET_CLASSIFICATION_STOCK,GET_AUTHORITY,GET_PRODUCT } from '@/store/types/classification'
import { request } from '@/utils/request'
import { dmsRequest } from './dmsrequest'
export interface itemParams {
  pageNo: string;
  projectApplyCode: string; // 项目编码
  projectName: string; // 项目名称
  status: number; // 项目状态
}
export interface preferential {
  pageNo: number;
  reportCode: string; // 优惠编码
  productModel: string; // 产品型号
  batch: string; // 产品批次
  orgName: string; // 供应商名称
  status: number; // 项目状态
  matkl: string; // 物料组
}
export interface classification {
  // 品类查询参数
  pageNum: number;
  keyword: string;
  filter: string; // 逗号隔开
  sortField: string; // 空 综合排序 sale销量 onlineDate 商家时间排序
  sortType: string; // 排序 desc 从大到小 asc从小到大
  catalogId: number; // 产品组必填
  productId: number; // 产品id
  orgId: number; // 供应商id
  havePrice: string; // 是否过滤价格
}
export interface filters {
  // 品类查询参数
  catalogId: number;
  productId: number;
}
export interface buyout {
  page: string;
  packageCode: string;
  packageName: string;
  status: string;
}
export interface PriceOrStockParam {
  code: string,
  orgCode: string,
  orgId: string
}

export interface StockParam {
  // cisCode: string;//商家编码
  orgId: string;//组织id
  code: string;//产品编码
  queryType: string;//库存查询类型
}

export interface ThreePhase {
  catalogId: string, // 品类id
  type: '' //查询类型，1：只查分销商 2 ：只查直营代理 空:默认全查
}
export interface goodsItems {
  orgId: string;
  productCodes: [];
  supplierCode: string;
}
// 获取dms商品库存
export const getDmsGoodsInventory = createAction(GET_DMS_GOODS_INVENTORY, async (goodsItems: any,callback:() => void) => {
  return dmsRequest({
    data: goodsItems,
    method: 'hasProductInventory',
    callback
  })
})
// 获取dms商品价格 操蛋啊   重新写价格获取我日
// /product/fxPrice.nd
export const getDmsGoodsPrice = createAction(GET_DMS_GOODS_PRICE, (data: goodsItems) => request({ api: `product/fxPrice.nd`, method: 'GET', data }))

// export const getDmsGoodsPrice = createAction(GET_DMS_GOODS_PRICE, async (goodsItems: any) => {
//   return dmsRequest({
//     data: goodsItems,
//     method: 'findDealerProductPrice'
//   })
// })
// 三期物料组和供应商
export const getThreeMaterialGroupAndSuppliers = createAction(GET_THREE_PHASE_MATERIAL_GROUP_AND_SUPPLIERS, (data: ThreePhase) => request({ api: `comm/queryAgentOrg.nd`, method: 'GET', data }))

// 工程单列表
export const getEngineerList = createAction(GET_ENGINEER_LIST, (data: itemParams) => request({ api: `engineering/getEngineerOrder.nd`, method: 'POST', data }))

// 特惠单列表
export const getPreferentialList = createAction(GET_PREFERENTIAL_LIST, (data: preferential) => request({ api: `preferential/queryByProduction.nd`, method: 'GET', data }))

// 套购单列表
export const getBuyoutList = createAction(GET_BUYOUT_LIST, (data: buyout) => request({ api: `packageActivity/queryActivityList.nd`, method: 'GET', data }))

// 品类查询和展示
export const getClassificationList = createAction(GET_CLASSIFICATION_LIST, async (data: classification) => {
  const result = await request({ api: `product/list.nd`, method: 'POST', data })
  return {
    ...result,
    pageNo: data.pageNum || 1
  }
})

// 六大品类筛选条件获取
export const getGoodsFilters = createAction(GET_GOODS_FILTERS, (data: filters) => request({ api: `product/product.nd`, method: 'GET', data }))

// 特惠单筛选条件
export const getSpecialFilters = createAction(GET_SPECIAL_FILTERS, () => request({ api: `comm/queryOrgAndMatkl.nd`, method: 'GET' }))

// 获取分类价格
export const getClassificationPrice = createAction(GET_CLASSIFICATION_PRICE, async (data: PriceOrStockParam) => request({ api: 'product/getPrices.nd', method: 'POST', data }))

// 获取分类库存
export const getClassificationStock = createAction(GET_CLASSIFICATION_STOCK, (data: StockParam) => request({ api: 'product/getStocks.nd', method: 'POST', data }))


// 调拨订单列表保存
// export const getAuthority = createAction(GET_AUTHORITY, async (data: any) => {
//   return dmsRequest({
//     data,
//     method: 'getDealerInfo'
//   })
// })

export const getAuthority = createAction(GET_AUTHORITY, async (data: any) => {
  return dmsRequest({
        data,
        method: 'getDealerInfo'
      })
})
export const getProduct = createAction(GET_PRODUCT, () => request({ api: 'index.nd', method: 'get' }))
