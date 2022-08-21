import { createAction } from 'redux-actions';
import { ctsRequest } from '@/utils/ctsrequest';
import { request } from '@/utils/request';

import {
  GET_CHECKIN_RECORD_BY_USERCODE,ADD_CHECK_IN_RECORD,GET_STORY_PERSONS,
  GET_REGIN, GET_SHOP_LIST_BY_CUST,FIND_SHOW_LIST,SAVE_STORE_CHECK_RESULT,
  UPLOAD_2,SAVE_STORE_PRO_PLAN,FIND_NO_PASS_LIST,SAVE_STORE_PRO_COMPLAINT,
  CUST_SOPH_DELETAGE,GET_SHOP_LIST_BY_CUST_ID,UPDATE_DELEGATE,ADD_INSPECTION_RECORD_2,
  FIX_ADDRESS,ADD_STORE,UPLOAD_IMG,EDIT_STORE,GET_APPROVAL_COMMENTS
} from '@/store/types/record';

// 获取门店签到
export const getCheckInRecordByUserCode = createAction(GET_CHECKIN_RECORD_BY_USERCODE, (data: any, callback:() => void) => ctsRequest({ method: 'getCheckInRecordByUserCode', data,callback }));
//新增打卡
export const addCheckInRecord = createAction(ADD_CHECK_IN_RECORD, (data: any, callback:() => void) => ctsRequest({ method: 'addCheckInRecord', data,callback }));
// 门店人员列表
export const getStoryPersons = createAction(GET_STORY_PERSONS, (data: any, callback:() => void) => request({ api: 'customer/customerAccount.nd',method:'get',data,callback }));
//获取店铺列表
export const getShopListByCust = createAction(GET_SHOP_LIST_BY_CUST, (data: any, callback:() => void) => request({ api: '/custShop/getShopListByCust.nd',method:'post',type:'json',data,callback }));
// 获取门店检查标准
export const findShowList = createAction(FIND_SHOW_LIST, (data: any, callback:() => void) => ctsRequest({ method: 'findShowList', data,callback }));
//上传点检项目
export const saveStoreCheckResult = createAction(SAVE_STORE_CHECK_RESULT, (data: any, callback:() => void) => ctsRequest({ method: 'saveStoreCheckResult', data,callback }));
//获取省市区信息
export const getRegin = createAction(GET_REGIN, (data: any, callback:() => void) => request({ api: 'customer/getRegin.nd',method:'get',data,callback }));
// 上传图片
export const upload2Img = createAction(UPLOAD_2, (data: any, callback:() => void) => ctsRequest({ method: 'uploadXtw', data,callback }));
// 查询未通过选项
export const findNoPassList = createAction(FIND_NO_PASS_LIST, (data: any, callback:() => void) => ctsRequest({ method: 'findNoPassList', data,callback }));
// 创建问题转办
export const saveStoreProComplaint = createAction(SAVE_STORE_PRO_COMPLAINT, (data: any, callback:() => void) => ctsRequest({ method: 'saveStoreProComplaint', data,callback }));
// 创建问题解决方案
export const saveStoreProPlan = createAction(SAVE_STORE_PRO_PLAN, (data: any, callback:() => void) => ctsRequest({ method: 'saveStoreProPlan', data,callback }));
// 打卡接口
export const addInspectionRecord2 = createAction(ADD_INSPECTION_RECORD_2, (data: any, callback:() => void) => ctsRequest({ method: 'addInspectionRecord2', data,callback }));
//发送代办通知
export const custSophDeletage = createAction(CUST_SOPH_DELETAGE, (data: any, callback:() => void) => request({ api: 'custShop/addDelegate.nd',method:'post',data,callback }));
//更新代办
export const updateDelegate = createAction(UPDATE_DELEGATE, (data: any, callback:() => void) => request({ api: '/custShop/updateDelegate.nd',method:'post',data,callback }));
//获取当前用户的点店铺
export const getShopListByCustId = createAction(GET_SHOP_LIST_BY_CUST_ID, (data: any, callback:() => void) => request({ api: 'custShop/getShopListByCustId.nd',method:'post',data,callback }));
//纠错接口
export const fixAddress = createAction(FIX_ADDRESS, (data: any, callback:() => void) => ctsRequest({ method: 'applyStoreRecovery', data,callback }));
// cis-新增门店上传照片
export const uploadImg = createAction(UPLOAD_IMG, (data: any, callback: any) => request({ api: `comm/uploadFileNew.nd`, method: 'POST', data, callback}));
// 新增门店
export const addStore = createAction(ADD_STORE, (data: any, callback:() => void) => request({ api: 'custShop/addShop.nd', method: 'POST', type: 'application/json', data, callback }));
// 修改门店
export const editStore = createAction(EDIT_STORE, (data: any, callback:() => void) => request({ api: 'custShop/editShop.nd', method: 'POST', type: 'application/json', data, callback }));
// 根据传入的流程ID查询操作日志（查询新增门店审批意见）
export const getApprovalComments = createAction(GET_APPROVAL_COMMENTS, (data: any, callback:() => void) => request({ api: 'flow/queryOptMsgsByProcessInstID.nd', method: 'POST', type: 'application/json', data, callback }));
