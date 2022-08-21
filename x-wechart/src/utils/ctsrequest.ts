import { request } from '@/utils/request';
import wepy from 'wepy';

interface CtsRequest {
  data?: any;
  callback?: (res:any) => void;
  method: string
}

export const ctsRequest = ({ data, method, callback,type }: CtsRequest) => {
  let jesssionid = 'JSESSIONID=' + wepy.$instance.globalData.sessionId
  return request({ api: `cts/ctsApi.nd`, method: "post", data: {
      serviceCode:method,
    ...data,
  }, header: {
      'content-type': 'application/json',
      Cookie: jesssionid
    }, callback })
}
