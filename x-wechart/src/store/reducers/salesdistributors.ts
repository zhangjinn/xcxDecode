import { handleActions } from 'redux-actions';
import { forEach } from 'ramda';
import {
  checkCombinationPurchase,
  combinationPurchaseNumberSets,
  combineObjIntoAnArray,
  formatDmsImg
} from '@/utils/index';
import { GET_SALES_ORDER_REVIEW_LIST, RESET_SALES_ORDER_REVIEW_LIST } from '../types/salesdistributors';

export default handleActions({
  [RESET_SALES_ORDER_REVIEW_LIST](state) {
    return {
      ...state,
      orderList: [],
    }
  },
  [GET_SALES_ORDER_REVIEW_LIST](state: any, action: { payload: any; }) {
    const { payload } = action
    const { orderList } = state
    let orderListNew = payload
    if (payload.page && payload.page.currPage > 1 && orderList && orderList.data && orderList.data.length > 0 ) {
      orderListNew = { ...payload, data: orderList.data.concat(payload.data) }
    } else {
      orderListNew = {...payload, data: payload.data}
    }
    forEach((items: any) => {
      items.salesOrderItem.forEach((item, idx) => {
        if (item.backnowledgedQty) {
          item.backnowledgedQty = Number(item.backnowledgedQty)
        }
        if (item.shippedBqty) {
          item.shippedBqty = Number(item.shippedBqty)
        }
        const { img, err } = formatDmsImg({ model: item.model, material: item.materialGroupCode })
        item.img = img
        item.err = err
        item._date = new Date().getTime()
      })

      if(items.salesOrderItem.length){

        if(items.discountTypeName == '组合购'){
          let combinationPurchaseList = []

          //组合购将数组里'productGroup'属性相同的对象合并成一个数组
          combinationPurchaseList = combineObjIntoAnArray(items.salesOrderItem)


          combinationPurchaseList.forEach((item,index)=>{
            let totleBuyNum = 0
            item.child.forEach((val,i)=>{
              totleBuyNum += val.quantity
            })

            combinationPurchaseList[index].isFold = true
            combinationPurchaseList[index].totleBuyNum = totleBuyNum
          })
          items.salesOrderItem = combinationPurchaseList
        }

      }

    }, orderListNew.data || [])

    return {
      ...state,
      loading: false,
      orderList: orderListNew
    }
  },
}, {
  orderList: {},
});
