"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var request_1 = require('./../../utils/request.js');
var IntentionMerchants_1 = require('./../types/IntentionMerchants.js');
// export const submitApplications  = createAction(SET_INTENTION_APPLY,(data:any,callback:any)=>{
//     request({
//         api:'IntentionCust/saveIntentionCustApply.nd',
//         method:'POST',
//         data,
//         callback
//     })
// })
exports.submitApplications = redux_actions_1.createAction(IntentionMerchants_1.SET_INTENTION_APPLY, function (data, callback) { return request_1.request({ api: 'IntentionCust/saveIntentionCustApply.nd', method: 'POST', data: data, callback: callback }); });
exports.getMateriel = redux_actions_1.createAction(IntentionMerchants_1.SET_MATERIEL_APPLY, function (data, callback) { return request_1.request({ api: 'IntentionCust/apply.htm?source=b2b&loginType=CS', method: 'GET', data: data, callback: callback }); });
exports.getCityList = redux_actions_1.createAction(IntentionMerchants_1.SET_INTENTION_GETCITY, function (data, callback) { return request_1.request({ api: 'IntentionCust/getCity.nd?', method: 'POST', data: data, callback: callback }); });
exports.getAreaList = redux_actions_1.createAction(IntentionMerchants_1.SET_INTENTION_GETAREA, function (data, callback) { return request_1.request({ api: 'IntentionCust/getDistrict.nd', method: 'POST', data: data, callback: callback }); });
exports.getTownList = redux_actions_1.createAction(IntentionMerchants_1.SET_INTENTION_GETTOWN, function (data, callback) { return request_1.request({ api: 'IntentionCust/getTown.nd', method: 'POST', data: data, callback: callback }); });
exports.getFuzzySearch = redux_actions_1.createAction(IntentionMerchants_1.SET_INTENTION_SEARCH, function (data, callback) { return request_1.request({ api: '/IntentionCust/callTYC.nd', method: 'GET', data: data, callback: callback }); });
exports.RepeatCompany = redux_actions_1.createAction(IntentionMerchants_1.SET_INTENTION_ISRESPONSE, function (data, callback) { return request_1.request({ api: '/IntentionCust/isRepeatData.nd', method: 'POST', data: data, callback: callback }); });
exports.sendSecurityCode = redux_actions_1.createAction(IntentionMerchants_1.SET_INTENTION_SENDSECURTYCODE, function (data, callback) { return request_1.request({ api: '/IntentionCust/sendSecurityCode.nd', method: 'POST', data: data, callback: callback }); });
