import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import { GET_FINANCIAL_TODO_COUNTS, GET_FINANCIAL_TODO_ITEMS } from '@/store/types/financialtodo';

// 获取统计数据
export const getFinancialTodoCounts = createAction(GET_FINANCIAL_TODO_COUNTS, () => request({ api: 'priceMessage/taskNum.nd?typeValue=14170681475'}));

// 获取待办列表
export const getFinancialTodoItems = createAction(GET_FINANCIAL_TODO_ITEMS, async (data: any, callback: any) => {
  const res: any = await request({ api: 'priceMessage/delegateList.nd?typeValue=14170681475', method: 'POST', data, callback })
  return { ...res, ...data };
})
