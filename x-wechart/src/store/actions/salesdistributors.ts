import { dmsRequest } from './dmsrequest';
import { createAction } from 'redux-actions';
import { GET_SALES_ORDER_REVIEW_LIST } from '../types/salesdistributors';


export interface data {
  cisCode: string;
  terms : {
    documentNum: string,
    purchaseNum: string,
    customerName: string,
    startDate: string,
    endDate: string,
    sellerName: string,
  }
  page: {
    pageSize: number,
    pageNo: number
  }
}
// 销售订单订单列表以及筛选
export const getSalesOrderReviewList = createAction(GET_SALES_ORDER_REVIEW_LIST, async (data: any) => {
  return dmsRequest({
    data,
    method: 'findSalesOrderExamList'
  })
})
