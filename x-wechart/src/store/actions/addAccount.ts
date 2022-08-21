import { createAction } from 'redux-actions'
import { request } from '@/utils/request'
import {
  GET_POST_OPTION_LIST,
  GET_UPCOMING_OPTION_LIST,
  GET_NOTICE_OPTION_LIST,
  GET_CUST_BASE_PERMISSION,
  GET_MATKL_AND_SHOP_DATA,
  GET_ACCOUNT_DETAILS,
} from '@/store/types/addAccount'

// 获取岗位选项列表
export const getPostOptionList = createAction(GET_POST_OPTION_LIST, (data: any) => request({ api: 'comm/dict.nd?pid=14181287560', method: 'GET', data }))

// 获取待办选项列表
export const getUpcomingOptionList = createAction(GET_UPCOMING_OPTION_LIST, (data: any, callback: any) => request({ api: 'comm/dict.nd?pid=14170681474', method: 'GET', data, callback }))

// 获取通知选项列表
export const getNoticeOptionList = createAction(GET_NOTICE_OPTION_LIST, (data: any, callback: any) => request({ api: 'comm/dict.nd?pid=14170766619', method: 'GET', data, callback }))

// 获取角色、管理仓库、管辖门店组选项列表
export const getCustOptionList = createAction(GET_CUST_BASE_PERMISSION, (data: any) => request({ api: 'custbasePermission/getCustBaseRoleDataByCustId.nd', method: 'POST', data, type: 'stringfy' }))

// 获取物料组选项列表
export const getMatklOptionList = createAction(GET_MATKL_AND_SHOP_DATA, (data: any) => request({ api: 'customer/getMatklAndShopData.nd', method: 'GET', data }))

// 获取物料组选项列表
export const getAccountDetails = createAction(GET_ACCOUNT_DETAILS, (data: any) => request({ api: 'custbasePermission/getCustBasePermissionDataByCustId.nd', method: 'POST', data, type: 'stringfy' }))
