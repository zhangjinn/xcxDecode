import { createAction } from 'redux-actions';
import { request } from '@/utils/request';

import { GET_SHOP_TODO_COUNTS, GET_SHOP_TODO_ITEMS } from '@/store/types/shopTodo';


// 获取巡店待办统计
export const getShopTodoCounts = createAction(GET_SHOP_TODO_COUNTS, () => request({ api: 'priceMessage/taskNum.nd?typeValue=14173612880'}));
// 获取巡店列表
export const getshopTodoItems = createAction(GET_SHOP_TODO_ITEMS, async (data: any, callback: any) => {
  const res: any = await request({ api: 'priceMessage/delegateList.nd?typeValue=14173612880', method: 'POST', data, callback })
  return { ...res, ...data };
});


