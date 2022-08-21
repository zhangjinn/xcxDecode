import { handleActions } from 'redux-actions';
import { FINANCE_GET_RSRB_SHEET_LIST,RESET_RSRB_SHEET_LIST,QUERY_APP_PROFIT,QUERY_APP_FIBOOK,FINANCE_POST_RSRB_DETAIL_BY_ROWID,FINANCE_POST_CUR_CONFIRMED_BY_ROWID,FINANCE_POST_RSRB_CASHED_BY_ROWID,RS_OC_RB_SHEET_BY_ROWID} from '@/store/types/financepolicy';


export default handleActions({
    /**
     * @param state
     * @param action
     */
    [FINANCE_GET_RSRB_SHEET_LIST](state: any, action: { payload: any; }) {
      const { payload } = action
      const { policyeleList } = state
      let policyeleListNew = payload

      let NewList
      if (policyeleList.rows && policyeleList.rows.length > 0) {
        NewList={ ...payload, rows: policyeleList.rows.concat(payload.rows)}
      } else {
        NewList = policyeleListNew
      }

      return {
        ...state,
        loading: false,
        policyeleList: NewList
      }
    },
    [RESET_RSRB_SHEET_LIST](state, action) {
      return {
        ...state,
        policyeleList: [],
      }
    },
    [QUERY_APP_PROFIT](state, action) {
      const { payload } = action
      return {
        ...state,
        loading: false,
        profitList: payload.rows
      }
    },
    [QUERY_APP_FIBOOK](state, action) {
      const { payload } = action
      return {
        ...state,
        loading: false,
        fibookList: payload.rows
      }
    },
    [FINANCE_POST_RSRB_DETAIL_BY_ROWID](state,action){
      const{payload}=action
      if(!payload.rsRbSheet.curConfirmedSum){
        payload.rsRbSheet.curConfirmedSum=0
      }
      if(!payload.rsRbSheet.curConfirmedSum){
        payload.rsRbSheet.curConfirmedSum=0
      }
      if(!payload.rsRbSheet.cashedSum){
        payload.rsRbSheet.cashedSum=0
      }
      if(!payload.rsRbSheet.otherCashedSum){
        payload.rsRbSheet.otherCashedSum=0
      }

      payload.rsRbSheet.curConfirmedSum=Number(payload.rsRbSheet.curConfirmedSum).toFixed(2)
      payload.rsRbSheet.cashedSum=Number(payload.rsRbSheet.cashedSum).toFixed(2)
      payload.rsRbSheet.otherCashedSum=Number(payload.rsRbSheet.otherCashedSum).toFixed(2)
      return{
        ...state,
        loading:false,
        policyDetail:payload.rsRbSheet
      }
    },
    [FINANCE_POST_CUR_CONFIRMED_BY_ROWID](state,action){
      const{payload}=action
      return{
        ...state,
        loading:false,
        curConfirmed:payload.rows
      }
    },
    [FINANCE_POST_RSRB_CASHED_BY_ROWID](state,action){
      const{payload}=action
      return{
        ...state,
        loading:false,
        cashed:payload.rows
      }
    },
    [RS_OC_RB_SHEET_BY_ROWID](state,action){
      const{payload}=action
      return{
        ...state,
        loading:false,
        policyCurtom:payload
    }

  },
  {
    policyeleList: {},
    profitList:{},
    fibookList:{},
    policyDetail:{},
    curConfirmed:{},
    cashed:{},
    policyCurtom:{}
});
