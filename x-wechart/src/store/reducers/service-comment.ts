import { handleActions } from 'redux-actions';
import {
  GET_TOBE_ANSWERED_QUESTION,
  GET_ANSWERED_QUESTION_LIST,
  RESET_ANSWERED_QUESTION,
} from '@/store/types/service-comment';


export default handleActions({

  //  重置问卷列表
  [RESET_ANSWERED_QUESTION](state, action) {
    return {
      ...state,
      orderList: []
    }
  },

  // 商家查询待答问卷列表
  [GET_TOBE_ANSWERED_QUESTION](state: any, action: { payload: any; }) {
    const { payload } = action
    let orderListNew = payload

    return {
      ...state,
      loading: false,
      orderList: orderListNew
    }
  },

  // 查询当前商家已答问卷列表
  [GET_ANSWERED_QUESTION_LIST](state: any, action: { payload: any; }) {
    const { payload } = action
    let orderListNew = payload

    return {
      ...state,
      loading: false,
      orderList: orderListNew
    }
  },

}, {
  orderList: [],
});
