import { handleActions } from 'redux-actions';
import {
  GET_SALES_ORDER_LIST,
  RESET_SALES_ORDER_LIST,
} from '@/store/types/sanpinReceipt';
import { formatDate } from '@/utils/index'


export default handleActions({

  //  重置三品收货列表
  [RESET_SALES_ORDER_LIST](state, action) {
    return {
      ...state,
      orderList: []
    }
  },

  //  重置三品收货列表
  [GET_SALES_ORDER_LIST](state: any, action: { payload: any; }) {
    const { orderList } = state
    const { payload } = action
    let orderListNew = payload

    if(orderListNew && orderListNew.data){
      orderListNew.data = orderListNew.data.map((item)=>{
        // item.deliveryDate = item.deliveryDate ? formatDate(item.deliveryDate, 'Y-M-D') : ''
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
