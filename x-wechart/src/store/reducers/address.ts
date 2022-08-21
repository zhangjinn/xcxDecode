import { handleActions } from 'redux-actions';
import { GET_ADDRESS_LIST, DMS_ADDRESS_CASCADE } from '@/store/types/address';
import { forEachObjIndexed } from 'ramda'

export default handleActions({
  [GET_ADDRESS_LIST](state, action) {
    const { payload } = action
    const { list } = state
    if (payload.currentPage === 1) {
      return {
        ...state,
        list: payload
      }
    } else {
      list.list = list.list.concat(payload.list)
      list.totalPages = payload.totalPages
      list.currentPage = payload.currentPage // 没啥用
      return {
        ...state,
        list
      }
    }
  },
  [DMS_ADDRESS_CASCADE](state, action) {
    const { payload } = action
    const { address } = payload
    const { dmsAddress } = state
    forEachObjIndexed( (value, field) => {
      dmsAddress[field] = []
      forEachObjIndexed((value, key) => {
        let item = {
          name: value,
          id: key,
        }
        dmsAddress[field].push(item)
      }, value)
    }, address)

    return {
      ...state,
      dmsAddress: {
        ...dmsAddress,
      }
    }
  }
}, {
  list: {
    totalPages: 0,
    list: []
  },
  dmsAddress: {
    province: [],
    city: [],
    country: [],
    town: []
  }
});
