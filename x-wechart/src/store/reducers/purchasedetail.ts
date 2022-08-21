// export const GET_PURCHASE_DETAIL = 'GET_PURCHASE_DETAIL'
import wepy from 'wepy';
import { handleActions } from 'redux-actions'
import { GET_PURCHASE_DETAIL } from '@/store/types/purchasedetail'
import { resetInfo } from '@/utils';

export default handleActions({
  // 采购筛选列表
  [GET_PURCHASE_DETAIL](state: any, action: { payload: any; }) {
    const { payload } = action
    const { data } = payload
    if (data && data.purchaseOrderItem) {
      data.purchaseOrderItem.forEach(element => {
        element.selectInfo = []
      });
    }
    return {
      orderdetail: data
    }
  },
}, {
  orderdetail: {}
});
