import { createAction, handleAction, handleActions } from 'redux-actions';
import { request } from '@/utils/request';
import {
    QUERY_ALLSTORE_SALESDETAILXTW,
    QUERY_STORE_ALLINFO,
    QUERY_ALLMATKL,
    QUERY_ALLSTORE_SALESXTW,
    CUSTMODEL_SHOPINFO_RANK,
    GET_STOREDETAIL_BYMAT,
    GET_STORE_PERSON,
    GET_STORE_RECORDLIST,
    GET_MATERIALGROUP_TOXTW,
    STORE_EVALUATION_CHART,
} from '@/store/types/store-detail';

export default handleActions({
    [QUERY_ALLSTORE_SALESDETAILXTW](state, action) {
        const { payload:{ queryAllStoreSaleDetailxtw } } =action
        return {
            ...state,
            queryAllStoreSaleDetailxtw: { queryAllStoreSaleDetailxtw },
        }
    }
},{
    [QUERY_STORE_ALLINFO](state, action) {
        const { payload:{ queryStoreAllInfo } } =action
        return {
            ...state,
            queryStoreAllInfo: { queryStoreAllInfo },
        }
    }
},{
    [QUERY_ALLMATKL](state, action) {
        const { payload:{ queryAllMatkl } } =action
        return {
            ...state,
            queryAllMatkl: { queryAllMatkl },
        }
    }
},{
    [QUERY_ALLSTORE_SALESXTW](state, action) {
        const { payload:{ queryAllStoreSalesXtw } } =action
        return {
            ...state,
            queryAllStoreSalesXtw: { queryAllStoreSalesXtw },
        }
    }
},{
    [CUSTMODEL_SHOPINFO_RANK](state, action) {
        const { payload:{ custModelShopInfoRank } } =action
        return {
            ...state,
            custModelShopInfoRank: { custModelShopInfoRank },
        }
    }
},{
    [GET_STOREDETAIL_BYMAT](state, action) {
        const { payload:{ getStoreDetailByMat } } =action
        return {
            ...state,
            getStoreDetailByMat: { getStoreDetailByMat },
        }
    }
},{
    [GET_STORE_PERSON](state, action) {
        const { payload:{ getStoryPersons } } =action
        return {
            ...state,
            getStoryPersons: { getStoryPersons },
        }
    }
},{
    [GET_STORE_RECORDLIST](state, action) {
        const { payload:{ storeRecordList } } =action
        return {
            ...state,
            storeRecordList: { storeRecordList },
        }
    }
},{
    [CUSTMODEL_SHOPINFO_RANK](state, action) {
        const { payload:{ getMaterialGroupToXtw } } =action
        return {
            ...state,
            getMaterialGroupToXtw: { getMaterialGroupToXtw },
        }
    }
},{
    [STORE_EVALUATION_CHART](state, action) {
        const { payload:{ storeEvaluationChart } } =action
        return {
            ...state,
            storeEvaluationChart: { storeEvaluationChart },
        }
    }
},{
    queryAllStoreSaleDetailxtw:{},
    queryStoreAllInfo:{},
    queryAllMatkl:{},
    queryAllStoreSalesXtw:{},
    custModelShopInfoRank:{},
    getStoreDetailByMat:{},
    getStoryPersons:{},
    storeRecordList:{},
    getMaterialGroupToXtw:{},
    storeEvaluationChart:{},
})