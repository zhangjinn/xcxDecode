import { handleActions } from 'redux-actions';
import { formatDate } from '@/utils/index'
import {
  GET_SALES_ORDER_LIST_NEW,
  RESET_SALES_ORDER_LIST_NEW,
} from '@/store/types/threeProductsReport';


export default handleActions({

  //  重置三品提报列表
  [RESET_SALES_ORDER_LIST_NEW](state, action) {
    return {
      ...state,
      orderList: []
    }
  },

  // 获取三品提报列表
  [GET_SALES_ORDER_LIST_NEW](state: any, action: { payload: any; }) {
    const { orderList } = state
    const { payload } = action
    let orderListNew = payload

    if(orderListNew && orderListNew.data){
      orderListNew.data = orderListNew.data.map((item)=>{
        // item.submitDate = item.submitDate ? formatDate(item.submitDate, 'Y-M-D') : ''
        // item.endDate = item.endDate ? formatDate(item.endDate, 'Y-M-D') : ''
        return item
      })
    }

    if (orderList && orderList.data && orderList.data.length > 0 ) {
      orderListNew = { ...payload, data: orderList.data.concat(payload.data) }
    } else {
      orderListNew = {...payload, data: payload.data}
    }

    return {
      ...state,
      loading: false,
      orderList: orderListNew
    }
  },

}, {
  orderList: {},
});
