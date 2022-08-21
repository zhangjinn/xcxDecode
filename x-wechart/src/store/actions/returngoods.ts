import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import { GET_RETURN_GOODS,GET_FITER_WAREHOUSE,GET_FITER_STATUS_LIST} from '@/store/types/returngoods';

// 获取统仓退货数据
// export const getReturnGoods = createAction(GET_RETURN_GOODS, () => request({ api: 'unifyWarehouseReturn/unifyWarehouseReturnList.htm', method: 'POST', data }));

export const getReturnGoods = createAction(GET_RETURN_GOODS, async (data: any, callback: any) => {
  const res: any = await request({ api: 'unifyWarehouseReturn/unifyWarehouseReturnList.nd', method: 'POST', data, callback })
  return { ...res, ...data };
})
 
//获取筛选条件
export const getFiterWarehouse = createAction(GET_FITER_WAREHOUSE, async (data: any, callback: any) => {
  const res: any = await request({ api: 'unifyWarehouseReturn/getWarehouseInfoHBySearchStr.nd', method: 'GET', data, callback })
  return { ...res, ...data };
})

// 获取状态筛选条件  unifyWarehouseReturn/unifyWarehouseReturnList.nd
export const getFiterStatusList = createAction(GET_FITER_STATUS_LIST, async (data: any, callback: any) => {
  const res: any = await request({ api: 'unifyWarehouseReturn/getSapOrderStatus.nd', method: 'GET', data, callback })
 
  return { ...res, ...data };
})