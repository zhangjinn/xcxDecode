import { handleActions } from 'redux-actions';
import { SET_RETURN_BASE_INFO } from '@/store/types/applyreturn';

export default handleActions({
  [SET_RETURN_BASE_INFO](state, action) {
    const { payload: { baseInfo } } = action;
    return {
      ...state,
      baseInfo,
    };
  },
}, {
  baseInfo: {},
})