import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import { GET_TODO_COUNTS, GET_TODO_ITEMS } from '@/store/types/todo';

// 获取统计数据
export const getTodoCounts = createAction(GET_TODO_COUNTS, () => request({ api: 'priceMessage/taskNum.nd?typeValue=14170681476' }));

// 获取待办列表
export const getTodoItems = createAction(GET_TODO_ITEMS, async (data: any, callback: any) => {
  const res: any = await request({ api: 'priceMessage/delegateList.nd?typeValue=14170681476', method: 'POST', data, callback })
  return { ...res, ...data };
})
