import { handleActions } from 'redux-actions';
import {
  GET_COLLECTION_BY_GROUP_CATEGORY, GET_COLLECTION_FROM_CART,
  RESET_COLLECTION_EMPTY, GET_COLLECTION_PRICE,
  GET_COLLECTION_STOCK, RESET_COLLECTION_IMG,
  GET_COLLECTION_DMS_PRICE,RESET_COLLECTION_LOAD
} from '@/store/types/collection';
import { formatImg, resetInfo, filterGetPriceOrStock } from '@/utils/index';
import { map, filter, forEach } from 'ramda';
const tranfor = (list: any) => {
  return map(({ id, orgId, agentCisCode, agentName, orgCode, productCode, productLabel, isFenXiao, orgName, materialGroup, picture, b2bName, importInfo, status }) => {
    return {
      id,
      orgId,
      orgCode,
      agentName: agentName || '',
      agentCisCode: agentCisCode || '',
      orgName,
      isFenXiao,
      b2bName,
      importInfo,
      collection: status === 'Y',
      loadingPrice: true,
      loadingInventory: true,
      productCode,
      productLabel,
      img: formatImg(picture ? {
        format: '180-180',
        name: picture,
        materialId: materialGroup,
        itemId: productCode,
      } : {
          name: `${materialGroup}.jpg`,
        }),
      errImg: formatImg({
        name: `${materialGroup}.jpg`,
      })
    }
  }, list || [])
}
export default handleActions({
  [RESET_COLLECTION_LOAD](state, action) {
    return {
      ...state,
      loadingInfo: []
    }
  },
  [GET_COLLECTION_DMS_PRICE](state, action) {
    const { list } = state
    const { payload } = action
    forEach((res: any) => {
      forEach((item: any) => {
        if(res.productCode ==item.productId) {
          res.loadingPrice = false
          res.price = item.standardPrice
        }
      },payload.list || [])
    },list || [])
    return {
      ...state,
      list: [...list]
    }
  },
  [GET_COLLECTION_BY_GROUP_CATEGORY](state, action) {
    const { payload } = action
    const result = tranfor(payload.oftenProductList)
    const loadingInfo = filterGetPriceOrStock(result)
    return {
      ...state,
      list: result,
      loadingInfo,
    }
  },
  [GET_COLLECTION_FROM_CART](state, action) {
    const { payload } = action
    const result = tranfor(payload.oftenProductList)
    const loadingInfo = filterGetPriceOrStock(result)
    return {
      ...state,
      list: result,
      loadingInfo,
    }
  },
  [RESET_COLLECTION_EMPTY](state, action) {
    return {
      ...state,
      list: []
    }
  },
  [RESET_COLLECTION_IMG](state, action) {
    const { list } = state
    const { payload } = action
    const products = filter(({ productCode }) => payload.flag === productCode, list)

    if (products.length > 0) {
      products[0].img = payload.src
    }
    return {
      ...state,
    }
  },
  [GET_COLLECTION_PRICE](state: any, action: { payload: any; }) {
    const { list } = state
    const { payload } = action
    resetInfo(list, payload, (item, price) => {
      item.loadingPrice = false
      item.price = price.price
    })
    return {
      ...state,
      list: [...list]
    }
  },
  [GET_COLLECTION_STOCK](state: any, action: { payload: any; }) {
    const { list } = state
    const { payload } = action
    resetInfo(list, payload, (item, stock) => {
      item.loadingInventory = false
      item.inventory = stock.inventory
    })
    return {
      ...state,
      list: [...list]
    }
  },
}, {
  list: [],
  loadingInfo: {}
})
