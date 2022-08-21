import { createAction } from 'redux-actions';
import { request } from '@/utils/request';

import {SET_INTENTION_APPLY,
  SET_MATERIEL_APPLY,
  SET_INTENTION_GETCITY,
  SET_INTENTION_GETTOWN,
  SET_INTENTION_GETAREA,
  SET_INTENTION_SEARCH,
  SET_INTENTION_ISRESPONSE,
  SET_INTENTION_SENDSECURTYCODE
} from '@/store/types/IntentionMerchants'

// export const submitApplications  = createAction(SET_INTENTION_APPLY,(data:any,callback:any)=>{
//     request({
//         api:'IntentionCust/saveIntentionCustApply.nd',
//         method:'POST',
//         data,
//         callback
//     })
// })


export const submitApplications = createAction(SET_INTENTION_APPLY, (data: any, callback: any) => request({ api: 'IntentionCust/saveIntentionCustApply.nd', method: 'POST', data, callback }));
export const getMateriel = createAction(SET_MATERIEL_APPLY, (data: any, callback: any) => request({ api: 'IntentionCust/apply.htm?source=b2b&loginType=CS', method: 'GET', data, callback }));
export const getCityList = createAction(SET_INTENTION_GETCITY, (data: any, callback: any) => request({ api: 'IntentionCust/getCity.nd?', method: 'POST', data, callback }));
export const getAreaList = createAction(SET_INTENTION_GETAREA, (data: any, callback: any) => request({ api: 'IntentionCust/getDistrict.nd', method: 'POST', data, callback }));
export const getTownList = createAction(SET_INTENTION_GETTOWN, (data: any, callback: any) => request({ api: 'IntentionCust/getTown.nd', method: 'POST', data, callback }));
export const getFuzzySearch = createAction(SET_INTENTION_SEARCH, (data: any, callback: any) => request({ api: '/IntentionCust/callTYC.nd', method: 'GET', data, callback }));
export const RepeatCompany = createAction(SET_INTENTION_ISRESPONSE, (data: any, callback: any) => request({ api: '/IntentionCust/isRepeatData.nd', method: 'POST', data, callback }));
export const sendSecurityCode = createAction(SET_INTENTION_SENDSECURTYCODE, (data: any, callback: any) => request({ api: '/IntentionCust/sendSecurityCode.nd', method: 'POST', data, callback }));




