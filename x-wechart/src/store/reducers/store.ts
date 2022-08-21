import { handleActions } from 'redux-actions'
import {
  GET_STORE_LIST,
  GET_COM_REGION, FIND_RESULT_LIST,FIND_DETAIL_BY_ID,GET_ORDER_FILTER,GET_MY_ADD_SHOP_LIST,RESET_MY_ADD_SHOP_LIST
} from '@/store/types/store'
import {forEachObjIndexed} from "ramda";
const wlz = ['海信平板','激光电视','Vidda电视','海信空调','科龙空调','海信冰箱','容声冰箱','海信冷柜','容声冷柜','海信洗衣机','容声洗衣机']

export default handleActions({
  [GET_STORE_LIST](state, action) {
    const { payload: { storeList } } = action
    return {
      ...state,
      storeList: { storeList }
    }
  },
  [GET_COM_REGION](state, action) {
    const { payload: { getComRegion } } = action
    return {
      ...state,
      getComRegion: { getComRegion }
    }
  },
  [FIND_RESULT_LIST](state, action) {
    const returnData = action.payload.returnData
    if(returnData.list&&Array.isArray(returnData.list)){
      returnData.list.forEach(it=>{
        it.checkTime  = (new Date(it.checkTime)).Format('yyyy-MM-dd hh:mm:ss')
      })
    }
    return {
      ...state,
      resultList: returnData
    }
  },
  [FIND_DETAIL_BY_ID](state, action) {
    const returnData = action.payload.returnData||{}
    return {
      ...state,
      checkIndetail: returnData
    }
  },
  // 订单筛选列表
  [GET_ORDER_FILTER](state: any, action: { payload: any; }) {
    const { payload } = action
    const orderfilter = {
      itemgroup: [],
      suppliers: [],
      itemAgent: [],
      itemFxmap: [],
    }
    let all = {
      value: '全部',
      key: '',
      stock: false
    }
    orderfilter.itemAgent.push(all)
    forEachObjIndexed((value, key) => {
      let item = {
        value,
        key,
        stock: false
      }
      orderfilter.itemAgent.push(item)
    }, payload.agentMap)
    orderfilter.itemFxmap.push(all)
    forEachObjIndexed((value, key) => {
      let item = {
        value,
        key,
        stock: false
      }
      orderfilter.itemFxmap.push(item)
    }, payload.fxMap)
    forEachObjIndexed((value, key) => {
      let item = {
        value,
        key,
        stock: false
      }
      orderfilter.suppliers.push(item)
    }, payload.fwOrgsGroupMap)
    forEachObjIndexed((value, key) => {
      let item = {
        value,
        key
      }

      // 只过滤变量中有的物料组
      if(wlz.indexOf(item.value)>-1){
        orderfilter.itemgroup.push(item)
      }
    }, payload.productGroupMap)

    return {
      ...state,
      loading: false,
      filter: orderfilter,
    }
  },
  //  重置我新增的门店
  [RESET_MY_ADD_SHOP_LIST](state, action) {
    return {
      ...state,
      myAddShopList: []
    }
  },

  // 我新增的门店列表
  [GET_MY_ADD_SHOP_LIST](state: any, action: { payload: any; }) {
    const { payload } = action
    let orderListNew = payload

    orderListNew = payload.data
    if(orderListNew && orderListNew.length){
      orderListNew = orderListNew.map((item)=>{
        item.address = item.provinceName + item.cityName + item.countyName +item.shAddress
        return item
      })
    }

    return {
      ...state,
      loading: false,
      myAddShopList: orderListNew
    }
  },

}, {
  storeList: {},
  getComRegion: {},
  resultList: {  },
  filter: {},
  checkIndetail:{},
  myAddShopList: [],
})
