import { handleActions } from 'redux-actions'
import {forEach} from 'ramda';
import { formatDmsImg } from '@/utils/index';
import { GET_INVENTORY_LIST,GET_BASE_INFO,GET_STORE_HOUSE } from '@/store/types/inventoryTrim'
// import { concat } from 'ramda'


export default handleActions({
  // 库存调整列表
  [GET_INVENTORY_LIST](state: any, action: { payload: any; }) {
    const { payload } = action
    const { inventoryTrimList } = state
    let orderListNew = payload

    if (payload.page && payload.page.pageNo > 1 && inventoryTrimList && inventoryTrimList.data && inventoryTrimList.data.length > 0 ) {
      orderListNew = { ...payload, data: inventoryTrimList.data.concat(payload.data) }
    } else {
      orderListNew = {...payload, data: payload.data}
    }
    forEach((items) => {
      if(items.documentDate){
        items.documentDate = items.documentDate.split(' ')[0]
      }
      forEach((item) => {
        if (item.bdemandQty) {
          item.bdemandQty = Number(item.bdemandQty)
        }
        const { img, err } = formatDmsImg({ model: item.model, material: item.materialGroupCode})
        item.img = img
        item.err = err
      }, items.staItems || [])
    }, orderListNew.data || [])

    return {
      ...state,
      loading: false,
      inventoryTrimList: orderListNew
    }
  },
  //获取事务类型、单据状态
  [GET_BASE_INFO](state, action) {
    let transactionType: any = [];
    let staStatus: any = [];
    let outlist = action.payload.data.transactionType;
    let inlist = action.payload.data.staStatus;

    for(var key in outlist){
      transactionType.push({id:key,name:outlist[key]})
    }
    for(var key in inlist){
      staStatus.push({id:key,name:inlist[key]})
    }
    return {
      ...state,
      staStatus,
      transactionType,
    }
  },
  //仓库列表
  [GET_STORE_HOUSE](state, action) {
    let storeHouse: any = [];
    let storeList = action.payload.data;

    storeHouse = storeList.map((item: Object) => {
      return {
        id: item.cId,
        type:item.type,
        name: item.name
      }
    })
    return {
      ...state,
      storeHouse,
    }
  },
}, {
  inventoryTrimList: [],
  staStatus:[],
  transactionType:[],
  storeHouse:[]
  })