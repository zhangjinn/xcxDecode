import { handleActions } from 'redux-actions'
import {
  GET_RETURN_ORDER_INFO, RESET_RETURN_ORDER_INFO,
  GET_RETURN_CHANNEL_ORDER_INFO,RESET_RETURN_CHANNEL_ORDER_INFO
} from '../types/returnbefore'
import { concat } from 'ramda'
export default handleActions({
  [GET_RETURN_CHANNEL_ORDER_INFO] (state, action) {
    const { payload } = action
    const { list_channel } = state
    const { data, page: { totalPage } } = payload
    let newList = data
    if (list_channel && list_channel.length > 0) {
      newList = concat(list_channel, newList);
    }
    return {
      ...state,
      list_channel: newList,
      totalPage_channel: totalPage
    }
  },
  [RESET_RETURN_CHANNEL_ORDER_INFO] (state, action) {
    return {
      ...state,
      list_channel: []
    }
  },
  [GET_RETURN_ORDER_INFO] (state, action) {
    const { payload } = action
    const { list } = state
    const { data, page: { totalPage } } = payload
    let newList = data
    if (list && list.length > 0) {
      newList = concat(list, newList);
    }
    return {
      ...state,
      list: newList,
      totalPage
    }
  },
  [RESET_RETURN_ORDER_INFO] (state, action) {
    return {
      ...state,
      list: []
    }
  },
}, {
  list: {},
  totalPage: Number,
  list_channel: {},
  totalPage_channel: Number
})
