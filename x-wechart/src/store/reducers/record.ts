import { handleActions } from 'redux-actions'
import {
  GET_CHECKIN_RECORD_BY_USERCODE, ADD_CHECK_IN_RECORD, GET_STORY_PERSONS, GET_REGIN,GET_SHOP_LIST_BY_CUST
} from '@/store/types/record'

export default handleActions({
  [GET_CHECKIN_RECORD_BY_USERCODE](state, action) {
    return {
      ...state,
      checkinRecord: action.payload.returnData ? (action.payload.returnData.storeCheckInRecordStore || []) : []
    }
  },
  [ADD_CHECK_IN_RECORD](state, action) {
    return {
      ...state
    }
  },
  [GET_STORY_PERSONS](state, action) {
    const storyPersons = action.payload.custAccountList || []
    const adminAccount = action.payload.adminAccount || {}
    return {
      ...state,
      storyPersons,
      adminAccount
    }
  },
  [GET_REGIN](state, action) {
    const regins = action.payload.list || []
    regins.forEach(it => {
      it.level = 1
    })
    return {
      ...state,
      regins
    }
  },
  [GET_SHOP_LIST_BY_CUST](state, action) {
    const shopList = action.payload.data.content || []
    return {
      ...state,
      shopList
    }
  }
}, {
  storyPersons: [],
  checkinRecord: [],
  regins: [],
  shopList:[],
  adminAccount:{}
})
