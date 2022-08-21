import { handleActions } from 'redux-actions'
import {
  GET_THREE_PHASE_MATERIAL_GROUP_AND_SUPPLIERS,
  RESET_CLASSIFICATION_LIST, RESET_ENGINEER_LIST,
  RESET_PREFERENTIAL_LIST, RESET_BUYOUT_LIST,
  GET_ENGINEER_LIST, GET_PREFERENTIAL_LIST,
  GET_BUYOUT_LIST, GET_CLASSIFICATION_LIST,
  GET_GOODS_FILTERS, GET_SPECIAL_FILTERS,
  GET_CLASSIFICATION_PRICE, GET_CLASSIFICATION_STOCK, GET_DMS_GOODS_PRICE,
  GET_DMS_GOODS_INVENTORY, RESET_PRODUCT_IMG,
  TOGGLE_CLASSIFICATION_COLLECTION, GET_PRODUCT
} from '@/store/types/classification'
import { request } from '@/utils/request'
import { formatImg, resetInfo, filterGetPriceOrStock } from '@/utils/index'
import { forEachObjIndexed, forEach, map, concat, filter, subtract } from 'ramda'

export interface PriceParams {
  code: string;
  orgId: string;
  orgCode: string;
}

const tranfor = (list: any) => {
  return map(({
                agentCisCode,
                agentName,
                id,
                orgId,
                orgCode,
                productCode,
                productLabel,
                orgName,
                materialGroup,
                picture,
                b2bName,
                importInfo,
                often,
                isFenXiao,
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
      // autoLoadingPrice: true,
      // autoLoadingInventory: true,
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
  // TODO:
  // 三期物料组和供应商
  [GET_THREE_PHASE_MATERIAL_GROUP_AND_SUPPLIERS](state, action) {
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
        classificationstatus: false,
        specialstatus: false,
        searchstatus: false,
        specialpopup: [],
        classificationOnsee: true,
        filter: true
      }
      dmsmatklList.push(items)
    }, payload.matklList)
    return {
      ...state,
      dmsmatklList,
      dmsOrgList
    }
  },
  // 重置list
  [RESET_CLASSIFICATION_LIST](state, action) {
    return {
      ...state,
      classification: []
    }
  },
  [RESET_ENGINEER_LIST](state, action) {
    return {
      ...state,
      categories: []
    }
  },
  [RESET_PREFERENTIAL_LIST](state, action) {
    return {
      ...state,
      preferential: []
    }
  },
  [RESET_BUYOUT_LIST](state, action) {
    return {
      ...state,
      buyout: []
    }
  },
  // 特惠单筛选返回
  [GET_SPECIAL_FILTERS](state: any, action: { payload: any; }) {
    const { payload } = action
    let specialfilters = {
      fwOrgsGroupMap: [],
      orgMatkl: [],
      productGroupMap: [],
      firstorg: '',
      classificationpopup: [],
      searchpopu: []
    }
    let all = {
      value: '全部',
      key: '',
      active: false
    }
    specialfilters.orgMatkl.push(all)
    forEachObjIndexed((value, key) => {
      let item = {
        value,
        key,
        classificationstatus: false,
        specialstatus: false,
        searchstatus: false,
        specialpopup: [],
        classificationOnsee: true,
        filter: true
      }
      specialfilters.fwOrgsGroupMap.push(item)
    }, payload.fwOrgsGroupMap)
    forEachObjIndexed((value, key) => {
      let item = {
        value,
        key,
        active: false
      }
      specialfilters.orgMatkl.push(item)
    }, payload.orgMatkl)
    forEachObjIndexed((value, key) => {
      let item = {
        value,
        key,
        specialstatus: false
      }
      specialfilters.productGroupMap.push(item)
    }, payload.productGroupMap)
    // 供应商默认选中第一个
    specialfilters.orgMatkl[0].active = true
    specialfilters.firstorg = specialfilters.orgMatkl[0].value
    return {
      ...state,
      loading: false,
      specialfilters: specialfilters
    }
  },
  // 工程单列表
  [GET_ENGINEER_LIST](state: any, action: { payload: any; }) {
    const { categories } = state
    const { payload } = action
    const { currentPage, totalPages } = payload
    let newList = payload.engineeringOrders
    if (currentPage !== 1 && currentPage) {
      if (categories) {
        newList = concat(categories, newList)
      }
    }
    console.log('工程单列表',newList)
    return {
      ...state,
      loading: false,
      categories: newList,
      totalPages
    }
  },
  // 特惠列表
  [GET_PREFERENTIAL_LIST](state: any, action: { payload: any; }) {
    const { payload } = action
    const { preferential } = state
    const { currentPage, totalPages } = payload
    if (payload.preperList && payload.preperList.length > 0) {
      payload.preperList.forEach((res) => {
        res.select = false
        res.iscount = 0
        res.price = 0
        res.relSelect = false
        res.relcount = subtract(res.count, res.buyCount)
      })
    }
    let newList = payload.preperList
    if (currentPage !== 1) {
      if (preferential && preferential.length > 0) {
        newList = concat(preferential, newList)
      }
    }
    console.log('特惠列表',newList)
    return {
      ...state,
      loading: false,
      preferential: newList,
      totalPages
    }
  },
  // 套购列表
  [GET_BUYOUT_LIST](state: any, action: { payload: any; }) {
    const { payload } = action
    const { buyout } = state
    const { currentPage, totalPages } = payload
    if (payload.list) {
      payload.list.map((res: { status: string; statusnumber: number; }) => {
        if (res.status = '已下发') {
          res.statusnumber = 1
          res.status = '进行中'
        } else if (res.status = '未开始') {
          res.statusnumber = 0
        } else if (res.status = '已结束') {
          res.statusnumber = 2
        }

        // 格式化时间
        res.startDate = res.startDate.split(' ')[0]
        res.endDate = res.endDate.split(' ')[0]
      })
    }
    let newList = payload.list
    if (currentPage !== '1') {
      if (buyout && buyout.length > 0) {
        newList = concat(buyout, newList)
      }
    }
    console.log('工程单列表',newList)
    return {
      ...state,
      loading: false,
      buyout: newList,
      totalPages
    }
  },
  // 分类列表
  [GET_CLASSIFICATION_LIST](state: any, action: { payload: any; }) {

    const { payload } = action
    const { currentPage, totalPages, pageNo } = payload
    const { classification }: any = state
    // if (currentPage > totalRows || (currentPage == 0 && totalRows == 0) ) return
    let orgIds = payload.orgIds
    let result: any[] = tranfor(payload.list)

    const loadingInfo = filterGetPriceOrStock(result)
    loadingInfo._time = new Date()
    if (result && result.length > 0) {
      if (pageNo > 1) {
        result = concat(classification, result)
      } else {
        if (pageNo == 1) {
          result = result
        }
      }
    } else {
      if (classification.length > 0) {
        if (pageNo > 1) {
          result = classification
        } else if (pageNo == 0) {
          // TODO:还是缺少一种逻辑 没货了怎么办 都是currentPage = 0
          result = []
        } else {
          result = []
        }
      } else {
        result = []
      }

    }

    return {
      ...state,
      orgIds,
      loading: false,
      classification: result,
      loadingInfo,
      totalPages,
      currentPage
    }
  },
  // 筛选条件列表
  [GET_GOODS_FILTERS](state: any, action: { payload: any; }) {
    const { payload } = action
    const filters: never[] | { key: string | number | symbol; value: any; extend: boolean; filter: {}; }[] = []
    forEachObjIndexed((namevalue, namekey) => {
      forEachObjIndexed((value, key) => {
        if (namekey == key) {
          const categoryid = namevalue
          value.map((res: { active: boolean; }) => {
            res.active = false
          })
          let item = {
            key,
            value,
            extend: false,
            categoryid,
            filter: {}
          }
          filters.push(item)
        }
      }, payload.map)
    }, payload.nameMap)
    return {
      ...state,
      loading: false,
      filters: filters
    }
  },
  // TODO: 返回dms商品价格和库存
  [GET_DMS_GOODS_PRICE](state: any, action: { payload: any; }) {
    const { classification } = state
    const { payload } = action
    forEach((item: { productId: string, standardPrice: string }) => {
      forEach((res: { productCode: string, loadingPrice: boolean, price: string }) => {
        if (res.productCode == item.productId) {
          res.loadingPrice = false
          res.price = item.standardPrice
        }
      }, classification)
    }, payload.list)
    return {
      ...state,
      classification: [...classification]
    }
  },
  [GET_CLASSIFICATION_PRICE](state: any, action: { payload: any; }) {
    const { classification } = state
    const { payload } = action
    resetInfo(classification, payload, (item: { loadingPrice: boolean; price: any; }, price: { price: any; }) => {
      item.loadingPrice = false
      item.price = price.price
    })
    return {
      ...state,
      classification: [...classification]
    }
  },
  // 海信库存
  [GET_CLASSIFICATION_STOCK](state: any, action: { payload: any; }) {
    const { classification } = state
    const { payload } = action
    resetInfo(classification, payload, (item: { loadingInventory: boolean; inventory: any; ownInv: any; }, stock: { inventory: any; ownInv: any; }) => {
      item.loadingInventory = false
      item.inventory = stock.inventory
      item.ownInv = stock.ownInv
      item.sharedInv = stock.sharedInv
    })
    return {
      ...state,
      classification: [...classification]
    }
  },
  //DMS 库存
  [GET_DMS_GOODS_INVENTORY](state: any, action: { payload: any; }) {
    const { classification } = state
    const { payload } = action
    classification.filter((item: any) => {
      if (item.productCode === payload.data[0].productCode) {
        item.invQty = payload.data[0].invQty
        item.gicInvQty = payload.data[0].gicInvQty
      }
    })
    return {
      ...state,
      classification: [...classification]
    }
  },
  [RESET_PRODUCT_IMG](state: any, action: { payload: any; }) {
    const { classification } = state
    const { payload } = action
    const products = filter(({ productCode }) => payload.flag === productCode, classification)
    if (products.length > 0) {
      products[0].img = payload.src
    }
    return {
      ...state
    }
  },
  [GET_PRODUCT](state: any, action: { payload: any; }) {
    const { payload } = action
    formatPicture(payload.hotProductDTOs)
    formatPicture(payload.hotProductDTOs1)
    formatPicture(payload.hotProductDTOs2)
    formatPicture(payload.hotProductDTOs3)
    formatPicture(payload.hotProductDTOs4)
    formatPicture(payload.hotProductDTOs5)
    formatPicture(payload.hotProductDTOs6)
    formatPicture(payload.hotProductDTOs7)
    return {
      ...state,
      products:payload
    }
  },
  [TOGGLE_CLASSIFICATION_COLLECTION](state: any, action: { payload: any; }) {
    const { classification } = state
    const { payload } = action
    classification.filter((item: any) => {
      if (item.id === payload.id) {
        item.collection = !item.collection
      }
    })
    return {
      ...state
    }
  }
}, {
  categories: [],
  preferential: [],
  buyout: [],
  classification: [],
  loadingInfo: {},
  filters: [],
  specialfilters: [],
  dmsmatklList: [], // dms 物料组
  dmsOrgList: [], // dms 供应商
  products: {
    hotProductDTOs: [],
    hotProductDTOs1: [],
    hotProductDTOs2: [],
    hotProductDTOs3: [],
    hotProductDTOs4: [],
    hotProductDTOs5: [],
    hotProductDTOs6: [],
    hotProductDTOs7: []
  }
})
function formatPicture(pros){
  pros.forEach(it=>{
    it.img = formatImg(it.picture ? {
      format: '180-180',
      name: it.picture,
      materialId: it.materialGroup,
      itemId: it.productId
    } : {
      name: `${it.materialGroup}.jpg`
    })
    it.errImg= formatImg({
      name: `${it.materialGroup}.jpg`
    })
  })
}
