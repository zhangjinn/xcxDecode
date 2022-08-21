import { handleActions } from 'redux-actions';
import { GET_CONSULT_LIST,GET_CONSULT_DETAIL,CLOSE_CONSULT,GET_COMMIT_QUESTION,GET_MATERIAL_CODE,POST_MINE_QUESTION } from '@/store/types/consultation';
import { GET_CONSULT_LIST,GET_CONSULT_DETAIL,CLOSE_CONSULT,GET_COMMIT_QUESTION,GO_ASK ,RS_CONSULT_LIST} from '@/store/types/consultation';
import { formatDate } from '@/utils/index'
import { forEachObjIndexed, concat, forEach } from 'ramda'
import {baseUrl} from '@/utils/request';
import { isAssetTypeAnImage } from '@/utils/validators';

export default handleActions({
  /**
   * 只需要这6个字段。
   * @param state
   * @param action
   */
  [GET_CONSULT_LIST](state, action) {
    const { payload } = action
    const { consultlist } = state
    payload.list.forEach((it: any) => {
      it.pubAt = formatDate(`${it.pubDate}`, 'Y-M-D')
    })
    const result = {
      pageSize: payload.totalPages,
      consults: []
    }
    // 第一页，初始化数据
    if (1 === +payload.page) {
      result.consults = payload.list
    } else {
      result.consults = consultlist.consults.concat(payload.list)
    }
    return {
      ...state,
      consultlist: result,
    };
  },
  [GET_CONSULT_DETAIL](state, action) {
    const { payload } = action
    payload.pubAt = formatDate(`${payload.pubDate}`, 'Y-M-D')
    if(!payload.scope)payload.scope=5;
    switch(payload.scope){
      case 5:
          payload.ratetext='非常好'
        break
      case 4:
          payload.ratetext='好'
          break
      case 3:
          payload.ratetext='一般'
          break
      case 2:
          payload.ratetext='差'
          break
      case 1:
          payload.ratetext='非常差'
          break
    }
    if(payload.fileName){
      let files = payload.fileName.split(",");
      let attachments = new Array();
      for(var i=0;i<files.length;i++){
        let flag =  isAssetTypeAnImage(files[i]);
        if(flag){
          attachments.push(baseUrl + '/question/downFile.nd?pathInfo=' + files[i]);
        }
      }
      payload.attachments = attachments;
    }
    return {
      ...state,
      consultdetail: payload
    }
  },
  [CLOSE_CONSULT](state, action) {
    const { payload }: any = action;
    let data = payload
    return {
      ...state,
      res:data
    };
  },
  [GO_ASK](state, action) {
    const { payload }: any = action;
    let data = payload
    return {
      ...state,
      res:data
    };
  },
  [GET_COMMIT_QUESTION](state,action){
    const{payload}=action;
    return{
      ...state,
      commitQuestion:payload
    }
  },
  [GET_MATERIAL_CODE](state,action){
    const{payload}:any=action;
    const materialCodeList = []
    forEachObjIndexed((value, key) => {
        let item = {
          name:value,
          code:key,
        }
        materialCodeList.push(item)
    }, payload)
    return{
      ...state,

      materialCode:materialCodeList

    }
  },
  [POST_MINE_QUESTION](state,action){
    const{payload}:any=action;
    let data = payload
    return{
      ...state,
     res:data
    }
  },

  [RS_CONSULT_LIST](state, action) {
    return {
      ...state,
      materialCode:{}
    }
  },


}, {
    consultlist: {
        problems: [],
        pageSize: 0
    },
    consultdetail:{},
    commitQuestion:{},
    materialCode:{}

});

