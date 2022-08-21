import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import {
  GET_SALES_ORDER_LIST,
} from '@/store/types/sanpinReceipt';

export interface data {
    // status: string
    // deliveryDateBegin:  string,
    // deliveryDateEnd:  string,
    rows: number,
    page: number
}

export const getSalesOrderList = createAction(GET_SALES_ORDER_LIST, (data: any, callback: any) => request({ api: 'pms/pmsApi/omsShopDeliveryShopPageQuery.nd', method: 'POST', data, type: 'application/json', callback }));




