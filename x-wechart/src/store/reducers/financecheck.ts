import { handleActions } from 'redux-actions';
import { CF_RB_SHEET_LIST, RS_CF_RB_SHEET_LIST, RS_RB_DETAIL_BY_ROWID } from '@/store/types/financecheck';
export default handleActions({
    /**
      * @param state
      * @param action
      */
    // 政策核对单列表查询接口
    [CF_RB_SHEET_LIST](state: any, action: {
        payload: any;
    }) {
        const { payload } = action
        const { checkList } = state
        let checkListNew = payload

        let NewList
        if (checkList.rows && checkList.rows.length > 0) {
            NewList = { ...payload, rows: checkList.rows.concat(payload.rows) }
        } else {
            NewList = checkListNew
        }

        return {
            ...state,
            loading: false,
            checkList: NewList
        }
    },
    [RS_CF_RB_SHEET_LIST](state: any, action: {
        payload: any;
    }) {
        const { payload } = action
        return {
            ...state,

            checkList: []
        }
    },
    // 政策详情接口
    [RS_RB_DETAIL_BY_ROWID](state, action) {
        const { payload } = action
        return {
            ...state,
            loading: false,
            checkDetail: payload
        }
    }

}, {
    checkList: {},
    checkDetail: {}

})
