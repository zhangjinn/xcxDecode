/*
 * @Auth: Turbo
 * @Email: 691209942@qq.com
 * @Date: 2019-09-27 14:06:04
 * @Description:
 */
import { handleActions } from 'redux-actions';
import { map } from 'ramda';
import { GET_TODO_COUNTS, GET_TODO_ITEMS } from '@/store/types/todo';
import { formatDate } from '@/utils/index';

export default handleActions({

  [GET_TODO_COUNTS](state, action) {
    const { payload: { count } } = action;
    return {
      ...state,
      count,
    };
  },

  [GET_TODO_ITEMS](state, action) {
    const { payload } = action;
    const { priceDelegateMessageList, pull, totalPages }: any = payload
    const items = { data: [], empty: true, total: totalPages };
    if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
      const list: any = map(({ id, title, content, orgName, endDate, status, taskStatus, createDateStr  }) => ({
        id, title, content, orgName, status, endDate: formatDate(endDate, 'Y-M-D h:m'), taskStatus, createDateStr
      }), priceDelegateMessageList);
      items.data = list;
      if (pull) {
        // 下拉加载更多
        const preData = state.items.data;
        items.data = preData.concat(list);
      }
    }

    return {
      ...state,
      items,
    };
  },
}, {
  count: 0,
  items: {
    data: [],
    empty: true,
    total: 0,
  },
});
