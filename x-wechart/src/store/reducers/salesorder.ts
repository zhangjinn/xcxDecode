import { handleActions } from 'redux-actions';
import { is, find, map, split, forEach, add, multiply, head, forEachObjIndexed, propEq, subtract, findIndex, update, filter } from 'ramda';
import {
  GET_SALES_ORDER_LIST, GET_SALES_ORDER_FILTER,
  CANCLE_SALES_ORDER, DELETE_SALES_ORDER, GET_PURCHASE_ORDER_LIST,
  RESET_PURCHASE_ORDER_LIST, RESET_SALES_ORDER_INQUIRY_LIST,AGENT_CANCELE_ORDER,
  CANSEL_ORDER_EXAMIN
} from '@/store/types/salesorder';
import { combineObjIntoAnArray, formatDmsImg} from '@/utils/index';


export default handleActions({
  [RESET_SALES_ORDER_INQUIRY_LIST](state, action) {
    return {
      ...state,
      orderList: [],
    }
  },
  [GET_SALES_ORDER_LIST](state: any, action: { payload: any; }) {
    const { payload } = action
    const { orderList } = state
    let orderListNew = payload

    if (payload.page && payload.page.currPage > 1 && orderList && orderList.data && orderList.data.length > 0 ) {
      orderListNew = { ...payload, data: orderList.data.concat(payload.data) }
    } else {
      orderListNew = {...payload, data: payload.data}
    }
    forEach((items) => {
      // console.log(items.salesOrderItem);
      forEach((item) => {
        if (item.backnowledgedQty) {
          item.backnowledgedQty = Number(item.backnowledgedQty)
        }
        if (item.shippedBqty) {
          item.shippedBqty = Number(item.shippedBqty)
        }
        const { img, err } = formatDmsImg({ model: item.model, material: item.materialGroupCode })
        item.img = img
        item.err = err
      }, items.salesOrderItem || [])
    }, orderListNew.data || [])

    return {
      ...state,
      loading: false,
      orderList: orderListNew
    }
  },
  // 获取基础藏库
  [GET_SALES_ORDER_FILTER](state: any, action: { payload: any; }) {
    const { payload } = action
    const { type } = payload
    switch (type) {
      case 'djlx':
        let documentTypeList = []
        const { data } = payload
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            let item = {
              value,
              key,
              isSelect: false,
            }
            documentTypeList.push(item)
          }, value)
        }, data)
        return {
          ...state,
          documentTypeList
        }
      case 'gys':
        let SuppliersList = []
        const { data } = payload
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            let item = {
              value,
              key,
              isSelect: false,
            }
            SuppliersList.push(item)
          }, value)
        }, data)
        if (SuppliersList.length > 0) {
          SuppliersList[0].isSelect = true
        }
        let Supplier = SuppliersList[0].value
        return {
          ...state,
          SuppliersList,
          Supplier
        }

    }
  },
  [CANCLE_SALES_ORDER](state, action) {
    const { payload }: any = action;
    let data = payload
    return {
      ...state,
      res: data
    };
  },
  [DELETE_SALES_ORDER](state, action) {
    const { payload }: any = action;
    let data = payload
    return {
      ...state,
      res: data
    };
  },
  [GET_PURCHASE_ORDER_LIST](state: any, action: { payload: any; }) {
    const { payload } = action
    const { purchaseorderList } = state
    let orderListNew = payload

    // if (payload.page && payload.page.currPage > 1) {
    //   orderListNew = { ...payload, data: purchaseorderList.data.concat(payload.data) }
    // }

    forEach((items) => {
      // 修改订单状态  如果shipmentStatusValue = 部分入库  则替换掉statusValue 中的状态
      if (items.shipmentStatusValue === "部分入库") {
        items.statusValue = items.shipmentStatusValue
      }
      forEach((item) => {
        if (item.price) {
          item.price = Number(item.price).toFixed(2)
        }
        if (item.orderedQty) {
          item.orderedQty = Number(item.orderedQty).toFixed(0)
        }
        const { materialGroupCode, model } = item
        const img = formatDmsImg({ model, material: materialGroupCode })
        item.img = img.img
        item.err = img.err
      }, items.purchaseOrderItem || [])

      if(items.discountType=='90605'){
        items.purchaseOrderItemChange = combineObjIntoAnArray(items.purchaseOrderItem)
      }

    }, orderListNew.data || [])

    let NewList
    if (purchaseorderList.data && purchaseorderList.data.length > 0) {
      // NewList = { ...payload, data: purchaseorderList.data.concat(payload.data) }
      NewList = { ...payload, data: purchaseorderList.data.concat(orderListNew.data) }
    } else {
      NewList = orderListNew
    }

    return {
      ...state,
      loading: false,
      purchaseorderList: NewList
    }
  },
  [RESET_PURCHASE_ORDER_LIST](state, action) {
    return {
      ...state,
      purchaseorderList: [],
    }
  },
  [AGENT_CANCELE_ORDER](state, action) {
    const { payload }: any = action;
    let data = payload
    return {
      ...state,
      res: data
    };
  },
  [CANSEL_ORDER_EXAMIN](state, action) {
    const { payload }: any = action;
    let data = payload
    return {
      ...state,
      res: data
    };
  },
}, {
  orderList: {},
  documentTypeList: {},
  purchaseorderList: {},
  SuppliersList: {},
});
