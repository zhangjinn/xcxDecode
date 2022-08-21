import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import { GET_CONSULT_LIST, GET_CONSULT_DETAIL,CLOSE_CONSULT ,GET_COMMIT_QUESTION,GET_MATERIAL_CODE,POST_MINE_QUESTION,GO_ASK,UPLOAD_IMG} from '@/store/types/consultation';
import { Object, Number, String } from 'ts-toolbelt';


// 获取我的咨询列表
export const getConsultList = createAction(GET_CONSULT_LIST, (pageNo: number,title: string,beginDate: string,answerFlag: string) => request({ api: `question/mineList.nd?page=${pageNo}&title=${title}&beginDate=${beginDate}&answerFlag=${answerFlag}` }));

// 获取我的咨询详情
export const getConsultDetail = createAction(GET_CONSULT_DETAIL, (id: number) => request({ api: `question/mineDetail.nd?id=${id}` }));


// 关闭咨询
export const closeConsult = createAction(CLOSE_CONSULT, (data: any, callback: () => void) => request({ api: 'question/closeQuestion.nd',method: 'POST', data, callback }));

// 我要咨询初始化接口
export const getcommitQuestion=createAction(GET_COMMIT_QUESTION,(level: number)=>request({api:`question/commitQuestion.nd?level=${level}`}));

// 根据组织ID获取物料组
export const getMaterialCode=createAction(GET_MATERIAL_CODE,(orgId: Number)=>request({api:`question/setMaterialCode.nd?orgId=${orgId}`}));



//提交我要咨询的信息
export const postMineQuestion=createAction(POST_MINE_QUESTION,(data:any,callback:()=>void)=>request({api:`question/saveMineQuestion.nd`,method:'POST',data,callback}))


// 追问
export const goAsk = createAction(GO_ASK, (data: any, callback: () => void) => request({ api: '/question/goAsk.nd',method: 'POST', data, callback }));

// 上传照片
export const uploadImg = createAction(UPLOAD_IMG, (data: any, callback: any) => request({ api: `comm/uploadFileNew.nd`, method: 'POST', data, callback}));
