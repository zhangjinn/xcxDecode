import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import { GET_ADDRESS_LIST, DMS_ADDRESS_CASCADE } from '@/store/types/address';
import { dmsRequest } from './dmsrequest';

interface Params {
  page: number,
  orgId: number
}

// 获取地址列表
export const getAddressList = createAction(GET_ADDRESS_LIST, ({ page, orgId }: Params) => request({ api: `address/sendToAddressList.nd?page=${page}&orgId=${orgId}`, method: 'POST' }));

interface AddressCascade {
  provinceId: string;
  cityId: string;
  countyId: string;
  townId: string;
}

// dms 级联获取地址
export const getDmsAddressCascade = createAction(DMS_ADDRESS_CASCADE, (data: AddressCascade) => dmsRequest({ data, method: 'addressCascade' }))
