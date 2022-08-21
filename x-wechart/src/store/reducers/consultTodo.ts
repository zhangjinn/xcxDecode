/*
 * @Auth: Turbo
 * @Email: 691209942@qq.com
 * @Date: 2019-09-27 14:06:04
 * @Description:
 */
import { handleActions } from 'redux-actions';
import { map } from 'ramda';
import { GET_CONSULT_TODO_COUNTS, GET_CONSULT_TODO_ITEMS,GET_SHOP_FIX_TODO_COUNTS,GET_SHOP_FIX_TODO_ITEMS, GET_REPORT_COUNTS, GET_REPORT_ITEMS, GET_RECEIPT_COUNTS, GET_RECEIPT_ITEMS, GET_ASSESSMENT_NOTICE_COUNTS, GET_ASSESSMENT_NOTICE_ITEMS, GET_NEW_STORE_COUNTS, GET_NEW_STORE_ITEMS} from '@/store/types/consultTodo';

import { GET_SHOP_TODO_COUNTS ,GET_SHOP_TODO_ITEMS} from '@/store/types/shopTodo';

import { formatDate } from '@/utils/index';

export default handleActions({

  [GET_CONSULT_TODO_COUNTS](state, action) {
    const { payload: { count } } = action;
    return {
      ...state,
      count,
    };
  },
  [GET_SHOP_FIX_TODO_COUNTS](state, action) {
    const { payload: { count } } = action;
    return {
      ...state,
      fixCount:count,
    };
  },
  [GET_SHOP_TODO_COUNTS](state, action) {
    const { payload: { count } } = action;
    return {
      ...state,
      shopCount: count
    };
  },
  [GET_REPORT_COUNTS](state, action) {
    const { payload: { count } } = action;
    return {
      ...state,
      reportCount: count,
    };
  },
  [GET_RECEIPT_COUNTS](state, action) {
    const { payload: { count } } = action;
    return {
      ...state,
      receiptCount: count,
    };
  },
  [GET_ASSESSMENT_NOTICE_COUNTS](state, action) {
    const { payload: { count } } = action;
    return {
      ...state,
      assessmentNoticeCount: count,
    };
  },
  [GET_NEW_STORE_COUNTS](state, action) {
    const { payload: { count } } = action;
    return {
      ...state,
      newStoreCount: count,
    };
  },

  [GET_CONSULT_TODO_ITEMS](state, action) {
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
  [GET_SHOP_FIX_TODO_ITEMS](state, action) {
    const { payload } = action;
    const { priceDelegateMessageList, pull, totalPages }: any = payload
    const items = { data: [], empty: true, total: totalPages };
    if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
      const list: any = map(({ sourceId,id, title, content, orgName, endDate, status, taskStatus, createDateStr  }) => ({
        sourceId, id, title, content, orgName, status, endDate: formatDate(endDate, 'Y-M-D h:m'), taskStatus, createDateStr
      }), priceDelegateMessageList);
      items.data = list;
      if (pull) {
        // 下拉加载更多
        const preData = state.fixItems.data;
        items.data = preData.concat(list);
      }
    }

    return {
      ...state,
      fixItems:items,
    };
  },
  [GET_SHOP_TODO_ITEMS](state, action) {
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
        const preData = state.shopItem.data;
        items.data = preData.concat(list);
      }
    }

    return {
      ...state,
      shopItem:items,
    };
  },
  [GET_REPORT_ITEMS](state, action) {
    const { payload } = action;
    const { priceDelegateMessageList, pull, totalPages }: any = payload
    const items = { data: [], empty: true, total: totalPages };

    if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
      const list: any = map(({ id, title, content, orgName, endDate, status, taskStatus, createDateStr, sourceId  }) => ({
        id, title, content, orgName, status, endDate: formatDate(endDate, 'Y-M-D h:m'), taskStatus, createDateStr, sourceId
      }), priceDelegateMessageList);
      items.data = list;
      if (pull) {
        // 下拉加载更多
        const preData = state.reportItems.data;
        items.data = preData.concat(list);
      }
    }

    return {
      ...state,
      reportItems: items,
    };
  },
  [GET_RECEIPT_ITEMS](state, action) {
    const { payload } = action;
    const { priceDelegateMessageList, pull, totalPages }: any = payload
    const items = { data: [], empty: true, total: totalPages };

    if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
      const list: any = map(({ id, title, content, orgName, endDate, status, taskStatus, createDateStr, sourceId  }) => ({
        id, title, content, orgName, status, endDate: formatDate(endDate, 'Y-M-D h:m'), taskStatus, createDateStr, sourceId
      }), priceDelegateMessageList);
      items.data = list;
      if (pull) {
        // 下拉加载更多
        const preData = state.receiptItems.data;
        items.data = preData.concat(list);
      }
    }

    return {
      ...state,
      receiptItems: items,
    };
  },

  [GET_ASSESSMENT_NOTICE_ITEMS](state, action) {
    const { payload } = action;
    const { priceDelegateMessageList, pull, totalPages }: any = payload
    const items = { data: [], empty: true, total: totalPages };

    if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
      const list: any = map(({ id, title, content, orgName, endDate, status, taskStatus, createDateStr, sourceId, sourceUrl  }) => ({
        id, title, content, orgName, status, endDate: formatDate(endDate, 'Y-M-D h:m'), taskStatus, createDateStr, sourceId, sourceUrl
      }), priceDelegateMessageList);
      items.data = list;
      if (pull) {
        // 下拉加载更多
        const preData = state.assessmentNoticeItems.data;
        items.data = preData.concat(list);
      }
    }

    return {
      ...state,
      assessmentNoticeItems: items,
    };
  },

  [GET_NEW_STORE_ITEMS](state, action) {
    const { payload } = action;
    const { priceDelegateMessageList, pull, totalPages }: any = payload
    const items = { data: [], empty: true, total: totalPages };

    if (priceDelegateMessageList && priceDelegateMessageList.length > 0) {
      const list: any = map(({ id, title, content, orgName, endDate, status, taskStatus, createDateStr, sourceId  }) => ({
        id, title, content, orgName, status, endDate: formatDate(endDate, 'Y-M-D h:m'), taskStatus, createDateStr, sourceId
      }), priceDelegateMessageList);
      items.data = list;
      if (pull) {
        // 下拉加载更多
        const preData = state.newStoreItems.data;
        items.data = preData.concat(list);
      }
    }

    return {
      ...state,
      newStoreItems: items,
    };
  },
}, {
  count: 0,
  fixCount: 0,
  shopCount:0,
  reportCount:0,
  receiptCount:0,
  assessmentNoticeCount:0,
  newStoreCount:0,
  items: {
    data: [],
    empty: true,
    total: 0,
  },
  fixItems: {
    data: [],
    empty: true,
    total: 0,
  },
  shopItem: {
    data: [],
    empty: true,
    total: 0,
  },
  reportItems: {
    data: [],
    empty: true,
    total: 0,
  },
  receiptItems: {
    data: [],
    empty: true,
    total: 0,
  },
  assessmentNoticeItems: {
    data: [],
    empty: true,
    total: 0,
  },
  newStoreItems: {
    data: [],
    empty: true,
    total: 0,
  },
});
