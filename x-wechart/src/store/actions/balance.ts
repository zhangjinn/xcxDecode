import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import {GET_BALANCE_INIT_DATA, GET_BALANCE_INFO, GET_WAIT_BALANCE_INFO_LIST,GET_ASSESSMENT_NOTICE_LIST,GET_ASSESSMENT_NOTICE_FILTER_LIST, ASSESSMENT_NOTICE_APPEAL_APPLICATION, ASSESSMENT_NOTICE_CONFIRM, UPLOAD_IMG} from '@/store/types/balance';

interface BalanceInitParam {
  orgId: string
}

// 我的余额 初始化数据
export const getBalanceInitData = createAction(GET_BALANCE_INIT_DATA, ({ orgId } : BalanceInitParam) => request({ api: `balance/balanceInit.nd?orgId=${orgId}` }));

interface BalanceParam {
  customerCode: string
  orgCode: number
  matklCode: number
}

// 查询余额
export const getBalance = createAction(GET_BALANCE_INFO, ({ customerCode, orgCode, matklCode }: BalanceParam) => request({ api: `balance/getMoney.nd?customerCode=${customerCode}&orgCode=${orgCode}&matklCode=${matklCode}` }));

// 查询预占用额度明细
export const getWaitBalanceInfoList = createAction(GET_WAIT_BALANCE_INFO_LIST, ({ orgCode, matklCode }: BalanceParam) => request({ api: `balance/queryWaitBalanceInfoList.nd?orgCode=${orgCode}&matklCode=${matklCode}` }));

// 考核通知单列表
export const getAssessmentNoticeList = createAction(GET_ASSESSMENT_NOTICE_LIST, (data: any, callback: any) => request({ api: `fast/cust/custAssessNotice/page.nd`, method: 'POST', data, callback}));

// 查询考核通知单筛选条件列表
export const getAssessmentNoticeFilterList = createAction(GET_ASSESSMENT_NOTICE_FILTER_LIST, (data: any, callback: any) => request({ api: `comm/systemConfigFormItem.nd?formCode=custAssessNotice`, method: 'POST', data, callback}));

// 查询考核通知单商家申诉申请
export const assessmentNoticeAppealApplication = createAction(ASSESSMENT_NOTICE_APPEAL_APPLICATION, (data: any, callback: any) => request({ api: `custAssessNotice/appealSum.nd`, method: 'POST', type: 'application/json', data, callback}));

// 商家确认考核通知单
export const assessmentNoticeConfirm = createAction(ASSESSMENT_NOTICE_CONFIRM, (id: any, callback: any) => request({ api: `custAssessNotice/confirm/${id}.nd`, method: 'GET', callback}));

// 考核通知单申诉上传照片
export const uploadImg = createAction(UPLOAD_IMG, (data: any, callback: any) => request({ api: `comm/uploadFileNew.nd`, method: 'POST', data, callback}));
