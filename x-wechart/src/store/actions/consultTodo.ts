import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import { GET_CONSULT_TODO_ALL_ITEMS, GET_CONSULT_TODO_COUNTS, GET_CONSULT_TODO_ITEMS,GET_SHOP_FIX_TODO_ITEMS,GET_SHOP_FIX_TODO_COUNTS, GET_REPORT_ITEMS, GET_RECEIPT_ITEMS, GET_REPORT_COUNTS, GET_RECEIPT_COUNTS, GET_ASSESSMENT_NOTICE_COUNTS, GET_ASSESSMENT_NOTICE_ITEMS, GET_NEW_STORE_COUNTS, GET_NEW_STORE_ITEMS  } from '@/store/types/consultTodo';

export const getConsultTodoCounts = createAction(GET_CONSULT_TODO_COUNTS, () => request({ api: 'priceMessage/taskNum.nd?typeValue=14173612879' }));
export const getSHopFixTodoCounts  = createAction(GET_SHOP_FIX_TODO_COUNTS, () => request({ api: 'priceMessage/taskNum.nd?typeValue=14173612881' }));

// 获取自定义传参待办列表
export const getConsultTodoAllItems = createAction(GET_ASSESSMENT_NOTICE_ITEMS, async (data: any, callback: any) => {
  const res: any = await request({ api: 'priceMessage/delegateList.nd', method: 'POST', data, callback })
  return { ...res, ...data };
});

// 获取待办列表
export const getConsultTodoItems = createAction(GET_CONSULT_TODO_ITEMS, async (data: any, callback: any) => {
  const res: any = await request({ api: 'priceMessage/delegateList.nd?typeValue=14173612879', method: 'POST', data, callback })
  return { ...res, ...data };
});
// 获取待办列表
export const getSHopFixTodoItems = createAction(GET_SHOP_FIX_TODO_ITEMS, async (data: any, callback: any) => {
  const res: any = await request({ api: 'priceMessage/delegateList.nd?typeValue=14173612881', method: 'POST', data, callback })
  return { ...res, ...data };
});


// 终包采购计划提报
export const getReportCounts = createAction(GET_REPORT_COUNTS, () => request({ api: 'priceMessage/taskNum.nd?typeValue=14182972401'}));
export const getReportItems = createAction(GET_REPORT_ITEMS, async (data: any, callback: any) => {
  const res: any = await request({ api: 'priceMessage/delegateList.nd?typeValue=14182972401', method: 'POST', data, callback })
  return { ...res, ...data };
});

// 终包收货提报
export const getReceiptCounts = createAction(GET_RECEIPT_COUNTS, () => request({ api: 'priceMessage/taskNum.nd?typeValue=14182972402'}));
export const getReceiptItems = createAction(GET_RECEIPT_ITEMS, async (data: any, callback: any) => {
  const res: any = await request({ api: 'priceMessage/delegateList.nd?typeValue=14182972402', method: 'POST', data, callback })
  return { ...res, ...data };
});

// 考核通知单
// export const getAssessmentNoticeCounts = createAction(GET_ASSESSMENT_NOTICE_COUNTS, () => request({ api: 'priceMessage/taskNum.nd?typeValue=14182987654'}));
// export const getAssessmentNoticeItems = createAction(GET_ASSESSMENT_NOTICE_ITEMS, async (data: any, callback: any) => {
//   const res: any = await request({ api: 'priceMessage/delegateList.nd?typeValue=14182987654', method: 'POST', data, callback })
//   return { ...res, ...data };
// });

// 新增门店
export const getNewStoreCounts = createAction(GET_NEW_STORE_COUNTS, () => request({ api: 'priceMessage/taskNum.nd?typeValue=14187583090'}));
export const getNewStoreItems = createAction(GET_NEW_STORE_ITEMS, async (data: any, callback: any) => {
  const res: any = await request({ api: 'priceMessage/delegateList.nd?typeValue=14187583090', method: 'POST', data, callback })
  return { ...res, ...data };
});
