import { request } from '@/utils/request';
import wepy from 'wepy';

interface DmsRequest {
  data?: any;
  callback?: (res:any) => void;
  method: string;
}

export const dmsRequest = ({ data, method, callback }: DmsRequest) => {
  const cisCode = wepy.$instance.globalData.cisCode
  const account = wepy.$instance.globalData.account

  return request({ api: `wechatEntrance/entrance.do?account=${account}&method=${method}`, method: 'POST', data: {
    cisCode,
    ...data,
  }, header: {
      'content-type': 'application/json'
    }, callback })
}

