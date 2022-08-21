import { createAction } from 'redux-actions'
import { GET_EXAMINFO,SUBMIT_EXAMINFO, GET_TOBE_ANSWERED_QUESTION, GET_ANSWERED_QUESTION_LIST } from '@/store/types/service-comment'
import { request } from '@/utils/request'

// 调查结果列表
export const getExamInfo = createAction(GET_EXAMINFO,(data:any,callback:any) => request({api:'serviceEstimate/list.nd',method:'GET',data,callback}));
// 提交调查结果
export const getExamSubmit = createAction(SUBMIT_EXAMINFO,(data:any,callback:any) => request({api:'serviceEstimate/submit.nd',method:'POST',data,type:'json',callback}));
// 商家查询待答问卷列表new
export const getToBeAnsweredQuestion = createAction(GET_TOBE_ANSWERED_QUESTION,(data:any,callback:any) => request({api:'baseSurveyQuestion/getToBeAnsweredQuestion.nd',method:'POST',data,callback}));
// 查询当前商家已答问卷列表new
export const getAnsweredQuestionList = createAction(GET_ANSWERED_QUESTION_LIST,(data:any,callback:any) => request({api:'baseSurveyQuestion/getAnsweredQuestionList.nd',method:'POST',data,callback}));
