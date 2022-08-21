import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import {
  GET_SALES_ORDER_LIST_NEW
} from '@/store/types/threeProductsReport';

export interface data {
  status: string
  deliveryDateBegin:  string,
  deliveryDateEnd:  string,
  rows: number,
  page: number
}

// request({
//   api: `pms/pmsApi/pmsShopPlanShopPageQuery.nd`,
//   method: 'POST',
//   data: {},
//   type: 'application/json',
//   callback: (res: any) => {
//     // const { data } = res
//     console.log(res)
//   }
// })
export const getSalesOrderListNew = createAction(GET_SALES_ORDER_LIST_NEW, (data: any, callback: any) => request({ api: 'pms/pmsApi/pmsShopPlanShopPageQuery.nd', method: 'POST', data, type: 'application/json', callback }));





