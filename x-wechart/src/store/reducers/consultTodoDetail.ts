/*
 * @Auth: Turbo
 * @Email: 691209942@qq.com
 * @Date: 2019-09-27 14:06:04
 * @Description:
 */
import { handleActions } from 'redux-actions';
import { GET_SALES_ORDER_CONSULT, SUBMIT } from '@/store/types/consultTodoDetail';
import {formatImg} from '@/utils/index';

export default handleActions({

  [GET_SALES_ORDER_CONSULT](state: any, action: { payload: any; }) {
    const { payload } = action;
    if(payload.orderLines[0]) {
      payload.orderLines[0].active = true
    }
    payload.orderLines.forEach(item => {
      if (item.img) {
        const imgs = item.img.split('/')
        item.img = formatImg({
          format: imgs[2],
          name: imgs[3],
          materialId: imgs[0],
          itemId: imgs[1]
        })
      }
      if (item.defaultImg) {
        const imgs = item.defaultImg.split('/')
        item.errImg = formatImg({
          name: imgs[imgs.length - 1]
        })
      }
    });

    return {
      ...state,
      loading: false,
      consultTodoDetail: payload
    }
  },[SUBMIT](state, action) {
    const { payload } = action;
    return {
      ...state,
      submitResponse: payload
    }
  },
}, {
  consultTodoDetail: {}
});
