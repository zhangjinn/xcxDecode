import { dmsRequest } from './dmsrequest'
import { request } from '../../utils/request'
var toast_1 = require("../../components/vant/toast/toast");
import {
  DMS_GET_PRODUCT_LIST_LIKE_CODE, QUERY_APP_FIBOOKDMS, DMS_ORDER_GET_CUSTOMER, DMS_ORDER_ITEM_INV_STATUS,
  DMS_ORDER_NORMAL_SALES_ORDER_CUSTOMER_INFO, DMS_ORDER_SUBMIT_CHANNEL_ORDER, DMS_ORDER_SUBMIT_RETAIL_ORDER,
  DMS_ORDER_RETAIL_ORDER_BASE_DATA, RETURN_ORDER_CHOOSE_CUSTOMER_INFO, DMS_CIS_FX_PRICE,DMS_CIS_LS_PRICE,DMS_DELIVERY_METHOD,
  DMS_INV_STATUS_TYPE,DMS_ALLOT_ORDER_LIST,DMS_STOCK_WARAHOUSE_LIST,DMS_ALLOT_SUBMIT,SUBMIT_STORE_LIST,
  GET_ZONE_B_2_C_SERVICE_LIST,GET_WAREHOUSE_LIST,CIS_DELIVERY_METHOD,DMS_OLD_MACH_CATEGORY_LIST,DMS_OLD_MACH_TREA_WAY_LIST,
  GET_SYSTEM_PARAMETERS,GET_IS_OPEN_SHARED_WAREHOUSE, DMS_ORDER_PROTOTYPE_SHOP_DATA,DMS_ORDER_PROTOTYPE_METARIL_DATA,DMS_ALLOCATION_RATIO,SAVE_SHOP_POTENTIAL_USER
} from '../types/dmsorder';
import { createAction } from 'redux-actions';
import wepy from 'wepy';
import {GET_CART_LIST, GET_POST_OPTION_LIST} from "@/store/types";
import {GET_SHOP_TODO_ITEMS} from "@/store/types/shopTodo";

interface ProductListLikeCode {
  productCode: string
  pageNo: number
}

// 模糊查询商品
export const getProductListLikeCode = createAction(DMS_GET_PRODUCT_LIST_LIKE_CODE, ({ productCode, pageNo }: ProductListLikeCode) => {

  // TODO::  删除7097638,,测试数据
  return dmsRequest({
    data: {
      productCode,
      warehouseId: '',
      page: {
        pageSize: 20,
        pageNo: pageNo || 1
      }
    },
    method: 'findProductListLikeCode'
  })
})

interface CustomerParam {
  filterStr: string
  pageNo: number
}

// 获取销售组织
export const queryAppFiBook = createAction(QUERY_APP_FIBOOKDMS, async (basedata: any) => {
  return dmsRequest({
    method: 'getDealerList'
  })
})

// 查询退货客户信息
export const getReturnCustomer = createAction(RETURN_ORDER_CHOOSE_CUSTOMER_INFO, ({ filterStr, pageNo }: CustomerParam) => dmsRequest({
  data: {
    _loading: true,
    page: {
      pageSize: 20,
      pageNo: pageNo || 1
    },
    filterStr
  }, method: 'findReturnCustomer'
}))

// 查询客户信息
export const getCustomer = createAction(DMS_ORDER_GET_CUSTOMER, ({ filterStr, pageNo }: CustomerParam) => dmsRequest({
  data: {
    _loading: true,
    page: {
      pageSize: 20,
      pageNo: pageNo || 1
    },
    filterStr
  }, method: 'findNormalSalesOrderCustomer'
}))

interface ItemInvStatusParam {
  productCode: string
}

// 获取库存状态
export const getItemInvStatus = createAction(DMS_ORDER_ITEM_INV_STATUS, async ({ productCode }: ItemInvStatusParam) => {
  const result = await dmsRequest({
    data: {
      productCode,
      _loading: true
    }, method: 'getInvStatus'
  })
  return {
    ...result,
    productCode
  }
})

interface CustomerInfoParam {
  customerCode: string
}

// 渠道订单客户信息接口
export const getNormalSalesOrderCustomerInfo = createAction(DMS_ORDER_NORMAL_SALES_ORDER_CUSTOMER_INFO, ({ customerCode }: CustomerInfoParam) => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      customerCode,
      _loading: true
    },
    method: 'normalSalesOrderCustomerInfo'
  })
})

// 提交订单
export const submitChannelOrder = createAction(DMS_ORDER_SUBMIT_CHANNEL_ORDER, (param: any) => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      _loading: true,
      ...param
    },
    method: 'createNormalSalesOrder'
  })
})

// 提交渠道订单(新)
export const submitChannelOrderNew = createAction(DMS_ORDER_SUBMIT_CHANNEL_ORDER, (param: any) => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      _loading: true,
      ...param
    },
    method: 'createBatchNormalSalesOrder'
  })
})

// 提交零售订单
export const submitRetailOrder = createAction(DMS_ORDER_SUBMIT_RETAIL_ORDER, (param: any) => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      _loading: true,
      ...param
    },
    method: 'createRetailSalesOrder'
  })
})

// 提交零售订单(新版)
export const submitRetailOrderNew = createAction(DMS_ORDER_SUBMIT_RETAIL_ORDER, (param: any) => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      _loading: true,
      ...param
    },
    method: 'createBatchRetailOrder' //createBatchRetailOrder
  })
})

// 获取零售订单基础信息
export const getRetailOrderInfo = createAction(DMS_ORDER_RETAIL_ORDER_BASE_DATA, (orgId: any) => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      orgId: orgId || '',
      _loading: true
    },
    method: 'getRetailOrderBaseInfo'
  })
})
// 根据组织获取仓库
export const getWarehouseList = createAction(GET_WAREHOUSE_LIST, (orgId: any) => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      orgId: orgId || ''
    },
    method: 'getWarehouseList'
  })
})
// 获取服务列表
export const getZoneB2cServiceList = createAction(GET_ZONE_B_2_C_SERVICE_LIST, (data: any) => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
     ...data
    },
    method: 'getZoneB2cServiceList'
  })
})

interface CisFxPriceParam {
  shopCisCode: string
  cisCode: string
  orgId: string
  productId: string
  refreshPrice: boolean
  type: string
}


export const getCisPrice = createAction(DMS_CIS_FX_PRICE, async (c: CisFxPriceParam) => {
  const result = await request({
    data: {
      shopCisCode: c.shopCisCode || '',
      cisCode: c.cisCode || '',
      orgId: c.orgId || '',
      productId: c.productId,
      refreshPrice: c.refreshPrice || false,
      type: c.type || ''
    },
    api: 'product/fxPrice.nd'
  })
  return {
    ...result,
    refreshPrice: c.refreshPrice
  }
})

export const getLsPrice = createAction(DMS_CIS_LS_PRICE, async (c: CisFxPriceParam) => {
  const result = await request({
    data: {
      shopCisCode: c.shopCisCode || '',
      cisCode: c.cisCode || '',
      orgId: c.orgId || '',
      productId: c.productId,
      refreshPrice: c.refreshPrice || false,
      type: c.type || ''
    },
    api: 'product/retailPrice.nd'
  })
  return {
    ...result,
    refreshPrice: c.refreshPrice
  }
})


// 获取cis配送方式
export const getCisDeliveryMethod = createAction(CIS_DELIVERY_METHOD, async (data: any) => {
  const result = await request({
    data: data,
    api: 'comm/retailDeliveryType.nd'
  })
  return {
    ...result,
  }
})

// 获取配送方式
export const getDeliveryMethod = createAction(DMS_DELIVERY_METHOD, async () => {
  const result = await dmsRequest({
    data: {
      _loading: true
    }, method: 'getDeliveryMode'
  })
  return {
    ...result
  }
})

// 获取补差类型
export const getInvStatusType = createAction(DMS_INV_STATUS_TYPE, async () => {
  const result = await dmsRequest({
    data: {
      _loading: true
    }, method: 'getInvStatusType'
  })
  return {
    ...result
  }
})

// 调拨接口基础信息获取
export const getStockTransBaseInfo = createAction(DMS_STOCK_WARAHOUSE_LIST, async (data) => {
  let par = { loading: true }
  if (data) {
    par = {
      _loading: true,
      ...data
    }
  }
  wx.showLoading({
    title: '加载中',
    mask:true
  })

  const result = await dmsRequest({
    data: {
      _loading: true,
      ...par
    }, method: 'getGicStockTransBaseInfo'
  })
  wx.hideLoading()
  return {
    ...result
  }
})

// 获取调拨订单列表
export const getAllotOrderList = createAction(DMS_ALLOT_ORDER_LIST, async (data: any) => {
  return dmsRequest({
    data,
    method: 'gicStockTransDetailList'
  })
})

// 调拨订单列表保存
export const submitAllotList = createAction(DMS_ALLOT_SUBMIT, async (data: any) => {
  return dmsRequest({
    data,
    method: 'gicStockTransSave'
  })
})

// 库存调整列表保存
export const submitStoreList = createAction(SUBMIT_STORE_LIST, async (data: any) => {
  return dmsRequest({
    data,
    method: 'saveOtherStockTrans'
  })
})

// 获取调拨比例
export const getAllocationRatio = createAction(DMS_ALLOCATION_RATIO, async () => {
  const result = await dmsRequest({
    data: {
      _loading: true
    }, method: 'getDealerStockTransStatsInfo'
  })
  return {
    ...result
  }
})
// 获取旧机品类
export const getOldMachCategoryList = createAction(DMS_OLD_MACH_CATEGORY_LIST, () => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      type: 'xsddjjpl',
    },
    method: 'findBaseData',
  })
})
// 获取旧机处理途径
export const getOldMachTreatWayList = createAction(DMS_OLD_MACH_TREA_WAY_LIST, () => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      type: 'xsddjjcltj',
    },
    method: 'findBaseData',
  })
})

// 获取系统参数
export const getSystemParameters = createAction(GET_SYSTEM_PARAMETERS, async (data: any) => {
  const result = await request({
    data: data,
    api: 'comm/sysconfig.nd'
  })
  return {
    ...result,
  }
})

// 查询是否开启共享仓
export const getIsOpenSharedWarehouse = createAction(GET_IS_OPEN_SHARED_WAREHOUSE, async (data: any) => {
  const result = await request({
    data: data,
    api: 'customer/queryShareFlag.nd'
  })
  return {
    ...result,
  }
})

// 样机查询门店接口
export const getShopInfoPrototype = createAction(DMS_ORDER_PROTOTYPE_SHOP_DATA, async (data: any, callback: any) => {
  const res: any = await request({ api: 'comm/querySalesShopInfoList.nd', method: 'POST', data, callback })
  return { ...res, ...data };
});
// 样机查询物料组
export const getSMterialInfoPrototype = createAction(DMS_ORDER_PROTOTYPE_METARIL_DATA, async (data: any, callback: any) => {
  const res: any = await request({ api: 'comm/queryShopMatkl.nd', method: 'POST', data, callback })
  return { ...res, ...data };
});


// 保存意向用户
export const saveShopPotentialUser = createAction(SAVE_SHOP_POTENTIAL_USER, async (data: any, callback: any) => {
  const res: any = await request({ api: 'shopPotentialUser/saveShopPotentialUser.nd', method: 'POST', type:'application/json', data, callback })
  return { ...res, ...data };
});
