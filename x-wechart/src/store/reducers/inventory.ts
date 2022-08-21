import { handleActions } from 'redux-actions'
import {
  GET_INVENTORY_QUERIES_LIST,
  RESET_INVENTORY_QUERIES_LIST,
  DMS_INV_STATUS_TYPE,
  GET_DISTRIBUTOR_INVENTORY_INQUIRY,
  RESET_DISTRIBUTOR_INVENTORY_INQUIRY,
  GET_INVENTORY_QUERIES_LIST_IN,
  RESET_INVENTORY_QUERIES_LIST_IN,
  GET_DISTRIBUTOR_TYPE,
  GET_OPEN_RESERVATION,
  RESET_OPEN_RESERVATION,
  GET_SING_INVENTORY_QUERIES_LIST
} from '@/store/types/inventory'
import { concat } from 'ramda'

export default handleActions({
  // 分销商库存列表
  [GET_DISTRIBUTOR_INVENTORY_INQUIRY](state, action) {
    const { payload } = action
    const { data, page } = payload
    const { totalPage } = page
    const { distributorInventoryList } = state
    let newList
    if (distributorInventoryList && distributorInventoryList.length > 0 && data.length > 0) {
      newList = concat(distributorInventoryList, data)
    } else {
      newList = data
    }
    return {
      ...state,
      distributorInventoryList: newList,
      distributorTotalPage: totalPage
    }
  },
  // 重置分销商库存列表
  [RESET_DISTRIBUTOR_INVENTORY_INQUIRY](state, action) {
    return {
      ...state,
      distributorInventoryList: [],
      // totalPage
    }
  },
  [RESET_INVENTORY_QUERIES_LIST](state, action) {
    return {
      ...state,
      inventoryList: [],
      // totalPage
    }
  },
  [RESET_INVENTORY_QUERIES_LIST_IN](state, action) {
    return {
      ...state,
      inventoryListIn: [],
      // totalPage
    }
  },
  //补差类型
  [DMS_INV_STATUS_TYPE](state,action) {
    let invStatusType: any = [];
    let list = action.payload.data;
    invStatusType = list.map((item: Object) => {
      for (const key in item) {
        return {
          id: key,
          name: item[key]
        }
      }
    })
    return {
      ...state,
      invStatus:invStatusType,
    }
  },
  // 库存列表
  [GET_INVENTORY_QUERIES_LIST](state, action) {
    const { payload } = action
    const { data, page } = payload
    const { totalPage } = page
    const { inventoryList } = state

    data.forEach(d => {
      d.moreSign = true
      d.checked = true
    })

    let newList
    if (inventoryList && inventoryList.length > 0 && data.length > 0) {
      newList = concat(inventoryList, data)
    } else {
      newList = data
    }
    return {
      ...state,
      inventoryList: newList,
      totalPage: totalPage
    }
  },
  // 库存列表
  [GET_INVENTORY_QUERIES_LIST_IN](state, action) {
    const { payload } = action
    const { products, page } = payload
    const { totalPage } = page
    const { inventoryListIn } = state

    products.forEach(d => {
      d.moreSign = true
      d.checked = true
    })

    let newList
    if (inventoryListIn && inventoryListIn.length > 0 && products.length > 0) {
      newList = concat(inventoryListIn, products)
    } else {
      newList = products
    }
    return {
      ...state,
      inventoryListIn: newList,
      totalPage: totalPage
    }
  },
  [GET_DISTRIBUTOR_TYPE](state, action) {
    return {
      ...state,
    }
  },

  // 未结预留列表
  [GET_OPEN_RESERVATION](state, action) {
    const { payload } = action
    const { data, page } = payload
    const { totalPage } = page
    const { openReservationList } = state

    let newList
    if (openReservationList && openReservationList.length > 0 && data.length > 0) {
      newList = concat(openReservationList, data)
    } else {
      newList = data
    }
    return {
      ...state,
      openReservationList: newList,
      openReservationTotalPage: totalPage
    }
  },
// 重置分销商库存列表
  [RESET_OPEN_RESERVATION](state, action) {
    return {
      ...state,
      openReservationList: [],
    }
  },
  // 库存列表
  [GET_SING_INVENTORY_QUERIES_LIST](state, action) {
    const { payload } = action
    const { data, page } = payload
    const { totalPage } = page
    const { inventoryList } = state

    data.forEach(d => {
      d.moreSign = true
      d.checked = true
    })

    let newList
    if (inventoryList && inventoryList.length > 0 && data.length > 0) {
      newList = concat(inventoryList, data)
    } else {
      newList = data
    }
    return {
      ...state,
      inventoryList: newList,
      totalPage: totalPage
    }
  },
}, {
  inventoryList: [],
  inventoryListIn:[],
  totalPage: '',
  distributorInventoryList:[],
  distributorTotalPage: '',
  invStatus:[],
  openReservationList:[],
  openReservationTotalPage:[],
})
