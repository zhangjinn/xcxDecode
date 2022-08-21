import { request } from '@/utils/request';
import wepy from 'wepy';

interface FinanceRequest {
  data?: any;
  callback?: (res:any) => void;
  method: string
}

export const financeRequest = ({ data, method, callback }: FinanceRequest) => {

  const ssoLoginToken = wepy.$instance.globalData.ssoLoginToken//正式环境
  const unionId=wepy.$instance.globalData.unionid//正式环境
  const customerCode=wepy.$instance.globalData.customerCode//正式环境

  // const ssoLoginToken = "dxxcclcllncx2233cccckklll"
  // const unionId='abc'
  // const customerCode= '2011461'
  return request({ api: `${method}`, method: 'POST', data: {
    ssoLoginToken,
    unionId,
    customerCode,
    ...data,
  }, header: {
      'content-type': 'application/json'
    }, callback }, "finance")
}
