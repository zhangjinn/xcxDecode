import { handleActions } from 'redux-actions';
import { SET_ACCOUNT_EDIT_ONE, SET_ACCOUNT_LOGIN_SYSTEM_AND_BASE_MATKL } from '@/store/types/account';

export default handleActions({
  [SET_ACCOUNT_EDIT_ONE](state, action) {
    const { payload: { account } } = action;

    return {
      ...state,
      editAccount: account,
    };
  },
  [SET_ACCOUNT_LOGIN_SYSTEM_AND_BASE_MATKL](state, action) {
    const { payload: { loginSystemList, baseMatklList,shopList,custShopList } } = action;

    return {
      ...state,
      baseMatklList,
      loginSystemList,
      shopList,
      custShopList
    };
  },
}, {
  editAccount: {},
  baseMatklList: [],
  loginSystemList: [],
  shopList:[],
  custShopList:[]

})
