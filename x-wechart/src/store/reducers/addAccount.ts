/*
 * @Auth: Turbo
 * @Email: 691209942@qq.com
 * @Date: 2019-09-27 14:06:04
 * @Description:
 */
import { handleActions } from 'redux-actions';
import {
  GET_POST_OPTION_LIST,
  GET_UPCOMING_OPTION_LIST,
  GET_NOTICE_OPTION_LIST,
  GET_CUST_BASE_PERMISSION,
  GET_MATKL_AND_SHOP_DATA,
  GET_ACCOUNT_DETAILS,
} from '@/store/types/addAccount'

export default handleActions({

  [GET_POST_OPTION_LIST](state, action) {
    const { payload: { list } }: any = action;
    return {
      ...state,
      postList: list
    };
  },
  [GET_UPCOMING_OPTION_LIST](state, action) {
    const { payload: { list } }: any = action;
    return {
      ...state,
      upcomingList: list
    };
  },
  [GET_NOTICE_OPTION_LIST](state, action) {
    const { payload: { list } }: any = action;
    return {
      ...state,
      noticeList: list
    };
  },
  [GET_CUST_BASE_PERMISSION](state, action) {
    const { payload: { roleList } }: any = action;
    return {
      ...state,
      custList: roleList
    };
  },
  [GET_MATKL_AND_SHOP_DATA](state, action) {
    const { payload: { data: { baseMatklList } } }: any = action;
    return {
      ...state,
      matklList: baseMatklList
    };
  },
  [GET_ACCOUNT_DETAILS](state, action) {
    const { payload: { data } }: any = action;
    return {
      ...state,
      data: data,
    };
  },
}, {
  postList:[],
  upcomingList:[],
  noticeList:[],
  custList:[],
  matklList:[],
});
