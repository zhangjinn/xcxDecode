
import { handleActions } from 'redux-actions';
import { map } from 'ramda';
import { GET_FINANCIAL_TODO_COUNTS, GET_FINANCIAL_TODO_ITEMS } from '@/store/types/financialtodo';
import { formatDate } from '@/utils/index';

export default handleActions({

  [GET_FINANCIAL_TODO_COUNTS](state, action) {
    const { payload: { count } } = action;
    return {
      ...state,
      count,
    };
  },

  [GET_FINANCIAL_TODO_ITEMS](state, action) {
    const { payload } = action;
    const { priceDelegateMessageList, pull, totalPages }: any = payload
    const items = { data: [], empty: true, total: totalPages };
    if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
      const list: any = map(({ id, title, content, orgName, endDate, status, taskStatus, secondTypeCode, doType, sourceUrl, sourceId, typeName, createDateStr }) => ({
        id, title, content, orgName, status, endDate: formatDate(endDate, 'Y-M-D h:m'), taskStatus, secondTypeCode, doType, sourceUrl, sourceId, typeName, createDateStr
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
