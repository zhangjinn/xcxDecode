import { handleActions } from 'redux-actions';
import {
  DMS_OUT_WAREHOUSE_ORDER_LIST,
  DMS_OUT_WAREHOUSE_LIST,
  DMS_OUT_WAREHOUSE_INV_STATUS_LIST,
  DMS_OUT_WAREHOUSE_CHG,
  DMS_CLEAR_OUT_WAREHOUSE,
  DMS_FIND_ALL_INVENTORY_LOG,
  DMS_GET_SUPPERLIER_LIST,
  DMS_GET_TRANSACTION_TYPE,
  DMS_SALE_FILTER_LIST,
  CANCEL_REVIEW
  // DMS_OUT_WAREHOUSE_ORDER_DETAIL,
} from '@/store/types/dmsoutwarehouse';
import {combineObjIntoAnArray, formatDmsImg} from '@/utils/index';

export default handleActions({
  [DMS_OUT_WAREHOUSE_ORDER_LIST](state, action) {
    const { payload: { code, data, page, allChecked } } = action
    if(code === '0') {
      const { currPage, totalPage } = page
      const { orderList } = state
      let newAllChecked = allChecked
      let newOrderList = data.map(order => {
        order.outChecked = false
        order.halfChecked = false
        order.salesOrderItem = order.salesOrderItem.map((item,idx) => {
          const { shippedBqty, backnowledgedQty, model, materialGroupCode } = item

          return {
            ...item,
            ...formatDmsImg({ model, material: materialGroupCode }),
            outChecked: false,
            outQty: backnowledgedQty - shippedBqty,
            disableCheck: backnowledgedQty - shippedBqty > 0 ? false : true
          }
        })
        order.disableCheck = !order.salesOrderItem.some(item => !item.disableCheck)

        if(order.salesOrderItem.length){
          if(order.discountTypeName == '组合购'){
            let combinationPurchaseList = []

            //组合购将数组里'productGroup'属性相同的对象合并成一个数组
            combinationPurchaseList = combineObjIntoAnArray(order.salesOrderItem)
            order.salesOrderItem = combinationPurchaseList
          }
        }

        return { ...order }
      })
      if(currPage !== 1) {
        newOrderList = orderList.concat(data)
        newAllChecked = false
      }

      return {
        ...state,
        orderList: newOrderList,
        page,
        allChecked: newAllChecked,
      }
    }
    return state
  },
  [DMS_OUT_WAREHOUSE_LIST](state, action) {
    const { payload: { code, data } } = action
    if(code === '0') {
      return {
        ...state,
        warehouseList: data.map(obj => {
          let id = Object.keys(obj)[0];
          let value = obj[id]
          return { id, value }
        }),
      }
    }
    return state
  },
  [DMS_OUT_WAREHOUSE_INV_STATUS_LIST](state, action) {
    const { payload: { code, data } } = action
    if(code === '0') {
      return {
        ...state,
        invStatusList: data.map(obj => {
          let id = Object.keys(obj)[0];
          let value = obj[id]
          return { id, value }
        }),
      }
    }
    return state
  },
  [DMS_GET_SUPPERLIER_LIST](state, action) {
    const { payload: { code, data } } = action
    if(code === '0') {
      return {
        ...state,
        supperlierList: data.map(obj => {
          let id = Object.keys(obj)[0];
          let value = obj[id]
          return { id, value }
        })
      }

    }

    return state
  },

  [DMS_OUT_WAREHOUSE_CHG](state, action) {
    const { payload } = action
    return {
      ...state,
      ...payload
    }
  },

  [DMS_CLEAR_OUT_WAREHOUSE] (state, action) {
    return {
      ...state,
      page: {
        currPage: 1,
        totalPage: 1,
        totalCount: 0,
      },
    }
  },
  [DMS_SALE_FILTER_LIST](state, action) {

    const { payload: { code, data } } = action

    if(code === '0') {
      return {
        ...state,
        saleFilterList: data.map(obj => {
          let id = Object.keys(obj)[0];
          let value = obj[id]
          return { id, value }
        }),
      }
    }
    return state
  },
  // [DMS_FIND_ALL_INVENTORY_LOG](state, action) {
  //   const { payload: { code, data, page } } = action
  //   if(code === '0') {
  //     return {
  //       ...state,
  //       inventoryLogList: data,
  //       logPage:page
  //     }
  //   }
  //   return state
  // },
  [DMS_FIND_ALL_INVENTORY_LOG](state, action) {
    const { payload } = action
    const { inventoryLogList } = state
    let listNew = payload
    //加入页数不为1 -> 数据相加
    if (payload.page.pageNo && payload.page.pageNo !== 1) {
      // listNew = { ...payload, headerList: inventoryLogList.headerList.concat(payload.data) }
      listNew = { ...payload, data: inventoryLogList.data.concat(payload.data) }
    }
    if(payload.code === '0') {
      return {
        ...state,
        inventoryLogList: listNew,
        logPage:payload.page
      }
    }
    return state
  },
  [DMS_GET_TRANSACTION_TYPE](state, action) {
    const { payload: { code, data } } = action
    if(code === '0') {
      return {
        ...state,
        transactionType: data.map(obj => {
          let id = Object.keys(obj)[0];
          let value = obj[id]
          return { id, value }
        })
      }
    }
    return state
  },
  [CANCEL_REVIEW](state, action) {
    const { payload } = action
    return {
      ...state,
      ...payload
    }
  },
  // [DMS_OUT_WAREHOUSE_ORDER_DETAIL](state, action) {
  //   const { payload: { code, data } } = action
  //   if(code === '0') {
  //     return {
  //       ...state,
  //       orderDetail: data,
  //     }
  //   }
  //   return state
  // },
}, {
  orderList: [],
  page: {
    currPage: 1,
    totalPage: 1,
    totalCount: 0,
  },
  allChecked: false,
  warehouseList: [],
  invStatusList: [],
  supperlierList:[],
  orderDetail: {},
  inventoryLogList:[],
  logPage:{},
  transactionType:[]
});
