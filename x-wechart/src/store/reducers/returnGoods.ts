import { handleActions } from 'redux-actions';
import {
  GET_RETURN_GOODS,GET_FITER_WAREHOUSE
} from '@/store/types/returnGoods';
import { formatImg, } from '@/utils/index';
export default  handleActions ({
  [GET_RETURN_GOODS](state: any, action: { payload: any; }) {
    const { payload } = action
    const { orderList } = state
    // debugger
    let orderListNew = payload
    if (payload.currentPage && payload.currentPage !== 1) {
      orderListNew = { ...payload, list: orderList.list.concat(payload.list) }
    }
    forEach(({ items }) => {
      forEach((item) => {
        if (item.img) {
          const imgs = item.img.split('/')
          item.img = formatImg({
            format: imgs[2],
            name: imgs[3],
            materialId: imgs[0],
            itemId: imgs[1]
          }
        }
        if (item.defaultImg) {
          const imgs = item.defaultImg.split('/')
          item.errImg = formatImg({
            name: imgs[imgs.length - 1]
          })
        }
      }, items || [])
    }, orderListNew.list || [])
    return {
      ...state,
      loading: false,
      orderList: orderListNew
    }
  },
},
  {
    orderList:{}
  }
)
