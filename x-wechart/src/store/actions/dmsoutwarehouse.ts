import wepy from 'wepy';
import { dmsRequest } from './dmsrequest';
import {
  DMS_OUT_WAREHOUSE_ORDER_LIST,
  DMS_OUT_WAREHOUSE_LIST,
  DMS_OUT_WAREHOUSE_INV_STATUS_LIST,
  DMS_BE_SURE_OUT,
  CANCLE_OUT_WAREHOUSE_SALES_ORDER,
  DMS_FIND_ALL_INVENTORY_LOG,
  DMS_GET_SUPPERLIER_LIST,
  DMS_GET_TRANSACTION_TYPE,
  DMS_SALE_FILTER_LIST,
  DMS_SALE_ORDER_BATCH_OUT,
  CANCEL_REVIEW
  // DMS_OUT_WAREHOUSE_ORDER_DETAIL,
} from '../types/dmsoutwarehouse';
import { createAction } from 'redux-actions';

//取消订单
export const cancleOutWarehouseSalesOrder = createAction(CANCLE_OUT_WAREHOUSE_SALES_ORDER, async ({ salesOrderId }) => {
  return dmsRequest({
   data: {
    userAccount: wepy.$instance.globalData.account,
    salesOrderId,
   },
   method: 'cancelSalesOrder'
  })
})

// 取消审核
export const cancelReview = createAction(CANCEL_REVIEW, async (data: any) => {
  return dmsRequest({
    data,
    method: 'deleteReserverBySoId'
  })
})

export const getOutWarehouseOrderList = createAction(DMS_OUT_WAREHOUSE_ORDER_LIST, (filterForm, pageNo) => {
  return dmsRequest({
    data: {
      _loading: true,
      terms: filterForm,
      page: {
        pageNo: pageNo,
        pageSize: 20,
      },
    },
    method: 'findSalesOrderOutList',
  })
})

export const getOutWarehouseList = createAction(DMS_OUT_WAREHOUSE_LIST, (orgId = '', warehouseType='') => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      type: 'ckck',
      orgId:orgId,
      warehouseType:warehouseType,
    },
    method: 'findBaseData',
  })
})

export const getInvStatusList = createAction(DMS_OUT_WAREHOUSE_INV_STATUS_LIST, () => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      type: 'kczt',
    },
    method: 'findBaseData',
  })
})
// 获取供应商 add by yangchangwei 2020-09-14
export const getSupperlierList = createAction(DMS_GET_SUPPERLIER_LIST, () => {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      type: 'gys',
    },
    method: 'findBaseData',
  })
})

export const isScanDealer = () => {
  return dmsRequest({
    method: 'isScanDealer',
  })
}

export const submitBatchOut = (form) => {
  return dmsRequest({
    data: {
      ...form,
      userAccount: wepy.$instance.globalData.account,
      _loading:true,
    },
    method: 'salesOrderBatchOut',
  })
}

export const getOutWarehouseOrderDetail = (salesOrderId) => {
  return dmsRequest({
    data: {
      salesOrderId,
      _loading: true
    },
    method: 'findSalesOrderOutDetail',
  })
}

export const getInvStatus = (productCode) => {
  return dmsRequest({
    data: {
      productCode,
    },
    method: 'getInvStatus',
  })
}

export const getInvBatch = ({ productCode, warehouseId }) => {
  return dmsRequest({
    data: {
      productCode,
      warehouseId,
      _ignoreToast: true
    },
    method: 'getInvBatch',
  })
}
// export const getInvQty = ({ productCode, warehouseId,invBatchId,invStatusId }) => {
//   return dmsRequest({
//     data: {
//       productCode,
//       warehouseId,
//       invBatchId,
//       invStatusId,
//
//        _ignoreToast: true
//     },
//     method: 'getInvQty',
//   })
// }
export const getInvQty = ({ productCode, warehouseId,invBatchId,invStatusId,invStatusType }) => {

  return dmsRequest({

    data: {
      productCode,
      warehouseId,
      invBatchId,
      invStatusId,
      invStatusType,
      _ignoreToast: true
    },
    method: 'getInvQty',
  })

}


// export const salesOrderOut = (data) => {
//   return dmsRequest({
//     data: {
//       userAccount: wepy.$instance.globalData.account,
//       data,
//       _loading:true,
//       _ignoreToast: true
//     },
//     method: 'salesOrderOut',
//   })
// }
export const salesOrderOut = createAction(DMS_BE_SURE_OUT, async (from: any) => {
  return dmsRequest({
    data: from,
    method: 'salesOrderOut'
  })
})

export const salesOrderNeedScan = ({ orderIds }) => {
  return dmsRequest({
    data: {
      orderIds
    },
    method: 'salesOrderNeedScan',
  })
}

export const getModelByBarCode = ({ barCode }) => {
  return dmsRequest({
    data: {
      barCode,
    },
    method: 'getModelByBarCode',
  })
}

export const getSalesReturnPurchaseInfo = ({salesOrderId}) => {
  return dmsRequest({
    data: {
      salesOrderId,
    },
    method: 'getSalesReturnPurchaseInfo',
  })
}
// 获取出库台账 add by yangchangwei 2020-09-14
export const findAllInventoryLog = createAction(DMS_FIND_ALL_INVENTORY_LOG, (cisCode,filterForm, pageNo) => {
  return dmsRequest({
    data: {
      _loading: true,
      cisCode: cisCode,
      terms: filterForm,
      page: {
        pageNo: pageNo,
        pageSize: 20,
      },
    },
    method: 'findAllInventoryLog',
  })
})
// 获取库存流水（新）
export const findAllInventoryLogNew = createAction(DMS_FIND_ALL_INVENTORY_LOG, (cisCode,filterForm, pageNo) => {
  return dmsRequest({
    data: {
      _loading: true,
      cisCode: cisCode,
      terms: filterForm,
      page: {
        pageNo: pageNo,
        pageSize: 20,
      },
    },
    method: 'findGicAllInventoryLog',
  })
})

// 获取收发明细汇总
export const getGicInventoryLogSummary = createAction(DMS_FIND_ALL_INVENTORY_LOG, (cisCode,filterForm, pageNo) => {
  return dmsRequest({
    data: {
      _loading: true,
      cisCode: cisCode,
      terms: filterForm,
      page: {
        pageNo: pageNo,
        pageSize: 20,
      },
    },
    method: 'findGicInventoryLogSummary',
  })
})

export const getTransactionType = createAction(DMS_GET_TRANSACTION_TYPE, () => {
  return dmsRequest({
    method: 'getTransactionType',
  })
})

export const getsaleFilterList = createAction(DMS_SALE_FILTER_LIST, ()=> {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      type: 'xsddddzt',
    },
    method: 'findBaseData',
  })
})

export const salesOrderBatchOut = createAction(DMS_SALE_ORDER_BATCH_OUT, (ids)=> {
  return dmsRequest({
    data: {
      userAccount: wepy.$instance.globalData.account,
      salesOrderIds: ids,
    },
    method: 'salesOrderBatchOut',
  })
})

