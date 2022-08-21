import { createAction } from 'redux-actions'
import { GET_SALES_ORDER_CONSULT, SUBMIT} from '@/store/types/consultTodoDetail'
import { request } from '@/utils/request'

export interface orderdetail {
  id: number;
}

export interface submitStatus {
  id: number;
  status: string;
}

// 订单详情
export const getSalesOrderConsult = createAction(GET_SALES_ORDER_CONSULT, (data: orderdetail) => request({ api: `order/getSalesOrderConsult.htm`, method: 'GET', data}));
// 审批提交
export const submit = createAction(SUBMIT, (data: submitStatus) => request({ api: `order/updateConsultLog.nd`, method: 'POST', data}));
