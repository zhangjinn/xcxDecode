import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import {
  GET_USER_INFO,
  USER_LOGIN_ACTION,
  USER_BIND_ACTION,
  USER_PERMISSIONS,
  USER_ALERT,
  ADD_MENU_RECORD,
  GET_MENU_RECORD,
  GET_COMM_PAGE,
  SEND_MSG,
  GET_CANCELLATION_REASON,
  APPLY_CANCEL_ACCOUNT,
  CANCEL_ACCOUNT,
} from '@/store/types/user';

// 获取用户信息
export const getUserInfo = createAction(GET_USER_INFO, () => request({ api: 'api/user/captcha-resp-string' }));

// 用户登录
export const userLogin = createAction(USER_LOGIN_ACTION, (data: any, callback: any) => request({ api: 'login.nd', method: 'POST', data, callback }));

// unionId 登录
export const unionIdLogin = createAction(USER_LOGIN_ACTION, (data: any, callback: any) => request({ api: 'ping.nd', method: 'POST', data, callback }));

// 用户登录
export const bindAccount = createAction(USER_BIND_ACTION, (data: any, callback: any) => request({ api: 'bindAccount.nd', method: 'POST', data, callback }));

// 用户权限
export const userPermissions = createAction(USER_PERMISSIONS, (data: any, callback: any) => request({ api: 'menu/list.nd?loginPlant=XCX&pageNo=1&pageSize=500&t=' + new Date().getTime(), method: 'GET', data, callback }));

// 提示信息接口
export const getAlert = createAction(USER_ALERT, (data: any, callback: any) => request({ api: 'msg/getFrontMsg.nd?t=' + new Date().getTime(), method: 'GET', data, callback }));

// 客户访问菜单记录-新增
export const addMenuRecord = createAction(ADD_MENU_RECORD, (data: any, callback: any) => request({ api: 'custMenuVisit/addOrUpdate.nd', method: 'POST', type: 'application/json', data, callback }));

// 客户访问菜单记录-查询
export const getMenuRecord = createAction(GET_MENU_RECORD, (data: any, callback: any) => request({ api: 'custMenuVisit/page.nd?clientPlatform=mip', method: 'GET', data, callback }));

// 注销账户-注销协议提示
export const getCommPage = createAction(GET_COMM_PAGE, (data: any, callback: any) => request({ api: 'fast/report/commPage.nd?loginPlant=XCX', method: 'GET', data, callback }));

// 注销账户-注销账号发送短信
export const sendMsg = createAction(SEND_MSG, (data: any, callback: any) => request({ api: 'account/sendMsg.nd', method: 'POST', data, callback }));

// 注销账户-注销账号校验短信
export const checkMsg = createAction(SEND_MSG, (data: any, callback: any) => request({ api: 'account/checkMsg.nd', method: 'POST', data, callback }));

// 注销账户-注销账号原因
export const getCancellationReason = createAction(GET_CANCELLATION_REASON, (data: any, callback: any) => request({ api: 'comm/dict.nd?pid=90700', method: 'GET', data, callback }));

// 注销账户-注销账号申请
export const applyCancelAccount = createAction(APPLY_CANCEL_ACCOUNT, (data: any, callback: any) => request({ api: 'account/applyCancelAccount.nd', method: 'POST', data, callback }));

// 注销账户-注销账户提交-待办
export const cancelAccount = createAction(CANCEL_ACCOUNT, (data: any, callback: any) => request({ api: 'account/cancelAccount.nd', method: 'POST', data, callback }));
