import { handleActions } from 'redux-actions'
import {
  GET_SEARCH_GOODS, GET_SEARCH_PRICE, GET_SEARCH_STOCK, RESET_SEARCH_IMG,
  TOGGLE_SEARCH_COLLECTION, RESET_SEARCH_LIST, GET_FILTER_ITEM_GROUP,
  GET_FILTER_DMS_GOODS_PRICE, GET_DMS_GOODS_INVENTORY, GET_FX_DICT_CIS_CODE
} from '@/store/types/search'
import { formatImg, resetInfo, filterGetPriceOrStock } from '@/utils/index'
import { map, concat, filter, forEach } from 'ramda'

const tranfor = (list: any) => {
  return map(({
                id,
                agentCisCode,
                agentName,
                orgId,
                orgCode,
                productCode,
                productLabel,
                isFenXiao,
                orgName,
                materialGroup,
                picture,
                b2bName,
                importInfo,
                often,
                purchaseType,
                agentShareFlag,
                retailPriceL
              }) => {
    return {
      id,
      agentName: agentName || '',
      agentCisCode: agentCisCode || '',
      orgId,
      orgCode,
      orgName,
      b2bName,
      importInfo,
      collection: often === 'Y',
      loadingPrice: true,
      loadingInventory: true,
      productCode,
      productLabel,
      isFenXiao,
      purchaseType,
      agentShareFlag,
      retailPriceL,
      img: formatImg(picture ? {
        format: '180-180',
        name: picture,
        materialId: materialGroup,
        itemId: productCode
      } : {
        name: `${materialGroup}.jpg`
      }),
      errImg: formatImg({
        name: `${materialGroup}.jpg`
      })
    }
  }, list || [])
}

export default handleActions({
  // TODO: 返回dms商品价格和库存
  [GET_FILTER_DMS_GOODS_PRICE](state: any, action: { payload: any; }) {
    const { search } = state
    const { payload } = action
    forEach((item: { productId: string, standardPrice: string }) => {
      forEach((res: { productCode: string, loadingPrice: boolean, price: string }) => {
        if (res.productCode == item.productId && res.orgId == item.orgId) {
          res.loadingPrice = false
          res.price = item.standardPrice
        }
      }, search)
    }, payload.list)
    return {
      ...state,
      search: [...search]
    }
  },
  // 物料组和供应商
  [GET_FILTER_ITEM_GROUP](state, action) {
    const { payload } = action
    const dmsOrgList = []
    forEach((item) => {
      let items = {
        value: item.name,
        key: item.code,
        classificationstatus: false,
        specialstatus: false,
        searchstatus: false,
        specialpopup: [],
        classificationOnsee: true,
        filter: true
      }
      dmsOrgList.push(items)
    }, payload.orgList)
    const dmsmatklList = []
    forEach((item) => {
      let items = {
        value: item.name,
        key: item.code,
        name: item.name,
        code: item.code,
        classificationstatus: false,
        specialstatus: false,
        searchstatus: false,
        specialpopup: [],
        classificationOnsee: true,
        filter: true
      }
      dmsmatklList.push(items)
    }, payload.matklList)
    const dmsmatklList2 = [{
      code: '',
      name: '全部',
      desc: null
    }]
    forEach((item) => {
      dmsmatklList2.push({
        name: item.name,
        code: item.code
      })
    }, payload.matklList)
    return {
      ...state,
      dmsmatklList,
      dmsOrgList,
      dmsmatklList2
    }
  },
  // 供应商
  [GET_FX_DICT_CIS_CODE](state, action) {
    const { payload } = action
    const { list } = payload
    const item = {
      code: '',
      name: '全部供应商',
      desc: null
    }
    list.unshift(item)
    return {
      ...state,
      supplierList: list
    }
  },
  // 搜索列表
  [GET_SEARCH_GOODS](state, action) {
    // debugger
    const { search } = state
    const { payload } = action
    const { currentPage, totalPages, pageNum } = payload
    let result = tranfor(payload.list)
    const loadingInfo = filterGetPriceOrStock(result)
    loadingInfo._time = new Date()
    const orgIds = payload.orgIds
    if (pageNum > 1) {
      result = concat(search, result)
    }
    return {
      ...state,
      orgIds,
      loading: false,
      search: result,
      loadingInfo,
      totalPages,
      currentPage
    }
  },

  [GET_SEARCH_PRICE](state: any, action: { payload: any; }) {
    const { search } = state
    const { payload } = action

    resetInfo(search, payload, (item, price) => {
      item.loadingPrice = false
      item.price = price.price
    })
    return {
      ...state,
      search: [...search]
    }
  },
  // [GET_SEARCH_STOCK](state: any, action: { payload: any; }) {
  //   const { search } = state
  //   const { payload } = action
  //   resetInfo(search, payload, (item, stock) => {
  //     item.loadingInventory = false
  //     item.inventory = stock.inventory
  //   })
  //   return {
  //     ...state,
  //     search: [...search]
  //   }
  // },

  //cis 库存
  // [GET_SEARCH_STOCK](state: any, action: { payload: any; }) {
  //   const { search } = state
  //   const { payload } = action
  //   resetInfo(search, payload, (item, stock) => {
  //     item.loadingInventory = false
  //     item.inventory = stock.inventory;
  //     item.ownInv = stock.ownInv
  //     item.sharedInv = stock.sharedInv
  //   })
  //   return {
  //     ...state,
  //     search: [...search]
  //   }
  // },
  [GET_SEARCH_STOCK](state: any, action: { payload: any; }) {
    const { search } = state
    const { payload } = action
    let i = 0
    search.filter((item: any) => {
      if (payload.data) {
        if (item.productCode === payload.data[0].productCode) {
          item.inventory = payload.data[0].inventory
          item.ownInv = payload.data[0].ownInv
          item.sharedInv = payload.data[0].sharedInv
        }
      } else {
        if (item.productCode === payload[0].productCode) {
          item.inventory = payload[0].inventory
          item.ownInv = payload[0].ownInv
          item.sharedInv = payload[0].sharedInv
        }
      }
      console.log(item.inventory)
      console.log(i += 1)
    })
    return {
      ...state,
      search: [...search]
    }
  },
  //DMS 库存
  [GET_DMS_GOODS_INVENTORY](state: any, action: { payload: any; }) {
    const { search } = state
    const { payload } = action
    search.filter((item: any) => {
      if (item.productCode === payload.data[0].productCode) {
        item.invQty = payload.data[0].invQty
        item.gicInvQty = payload.data[0].gicInvQty
      }
    })
    return {
      ...state,
      search: [...search]
    }
  },
  [RESET_SEARCH_IMG](state: any, action: { payload: any; }) {
    const { search } = state
    const { payload } = action
    const products = filter(({ productCode }) => payload.flag === productCode, search)
    if (products.length > 0) {
      products[0].img = payload.src
    }
    return {
      ...state
    }
  },
  [RESET_SEARCH_LIST](state, action) {
    return {
      ...state,
      search: []
    }
  },
  [TOGGLE_SEARCH_COLLECTION](state: any, action: { payload: any; }) {
    const { search } = state
    const { payload } = action
    search.filter((item: any) => {
      if (item.id === payload.id) {
        item.collection = !item.collection
      }
    })
    return {
      ...state
    }
  }
}, {
  search: [],
  totalPages: '', // 总页数
  loadingInfo: {},
  dmsmatklList: [], // 物料组
  dmsOrgList: [], // 供应商
  supplierList: [],
  dmsmatklList2: []
})
