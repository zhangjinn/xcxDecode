import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import {
  GET_NOTICE_LIST, GET_MESSAGE_LIST, GET_NOTICE_DETAIL,
   GET_PROBLEM_LIST, GET_PROBLEM_DETAIL,GET_NEW_INFO_ITEMS,
    GET_PLATES,GET_MENU_NOTICE_LIST,MESSAGE_READ,GET_UPCOMING_LIST,GET_NOTICE_NEW_LIST,
  GET_AGENT_ACTIVITY_APPLY_NOTICE
  } from '@/store/types/notice';

export interface Items {
  pageNo: string;
  fwOrgId: string;
  type: string;
  status: string;
  beginDate: string;
  endDate: string;
  plate: string;
}

export const getNewInfoItems = createAction(GET_NEW_INFO_ITEMS, (callback: any) => request({ api: `msg/msgNum.nd`, method: 'GET', callback }))
// 获取公告列表
export const getNoticeList = createAction(GET_NOTICE_LIST, (pageNo: number, plate: string) => request({ api: `billboard/loginMessagenoticeListforplate.htm?pageNo=${pageNo}&plate=${plate}` }));

// 获取公告列表new
export const getNoticeListNew = createAction(GET_NOTICE_LIST, (data:any, callback: any) => request({ api: `billboard/loginMessagenoticeListforplate.htm`, method: 'GET', data, callback }));

// 获取待办列表new
export const getUpcomingList = createAction(GET_UPCOMING_LIST, (data:any, callback: any) => request({ api: `priceMessage/backlog/pageNew.nd`, method: 'POST', type: 'application/json', data, callback }));

// 获取通知列表new
export const getNoticeNewList = createAction(GET_NOTICE_NEW_LIST, (data:any, callback: any) => request({ api: `priceMessage/notice/page.nd`, method: 'POST', type: 'application/json', data, callback }));

// 获取未读公告列表
export const getMenuNoticeList = createAction(GET_MENU_NOTICE_LIST, (data: any, callback: any) => request({ api: `menu/notice.nd`, method: 'GET', data, callback }));

// 获取公告详情
export const getNoticeDetail = createAction(GET_NOTICE_DETAIL, (id: number) => request({ api: `billboard/messageDetail.nd?noticeCode=${id}&&id=${id}` }));

// 获取常见问题列表
export const getProblemList = createAction(GET_PROBLEM_LIST, (pageNo: number, beginDate: string, title: string) => request({ api: `/question/commonList.nd?page=${pageNo}&beginDate=${beginDate}&title=${title}` }));

// 获取常见问题详情
export const getProblemDetail = createAction(GET_PROBLEM_DETAIL, (id: number) => request({ api: `question/commonDetail.nd?id=${id}` }));

// 通知消息接口
export const getMessageList = createAction(GET_MESSAGE_LIST, (data: Items) => request({ api: `priceMessage/list.nd`, method: 'POST', data }))

// 消息已读
export const messageRead = createAction(MESSAGE_READ, (data: Items) => request({ api: `billboard/loginMessageDetail.htm`, method: 'get', data }))

// 获取板块
export const getPlates = createAction(GET_PLATES, () => request({ api: `billboard/loginMessagenoticeList.htm`}));

// 促销资源兑现列表
export const getAgentActivityApplyNotice = createAction(GET_AGENT_ACTIVITY_APPLY_NOTICE, (data: any) => request({ api: `fast/userReport/agentActivityApplyNotice.nd`, method: 'get', data }))
