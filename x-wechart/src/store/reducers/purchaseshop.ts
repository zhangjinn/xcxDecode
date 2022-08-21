import { handleActions } from 'redux-actions'
import {
  GET_PURCHASE_LIST, GET_BASE_DATA,
  GET_PURCHASE_LIST_IN, RESET_PURCHASE_LIST, GET_VENDOR_ITEM_GROUP,
  GET_MERCHANT_SUPPLIERS, RESET_VENDOR_ITEM_GROUP, RESET_PURCHASE_IMG,
  RESET_DISTRIBUTOR_ORDERS_FILTER
} from '@/store/types/purchaseshop'
import { forEachObjIndexed, concat, forEach } from 'ramda'
import { DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR } from '@/store/types/dmsorder'
import { formatDmsImg } from '@/utils/index';

export default handleActions({
  // 分销商下单专用重置
  [RESET_DISTRIBUTOR_ORDERS_FILTER](state: any, action: { payload: any; }) {
    return {
      ...state,
      shippingAddress: [],
      settlementUnits: [],
      baseData: []
    }
  },
  // 替换错误图片
  [RESET_PURCHASE_IMG](state: any, action: { payload: any; }) {
    const { payload } = action
    const { purchaseList } = state
    const { flag, src } = payload
    forEach((item) => {
      forEach((res) => {
        // console.log(res)
        if (res.img == flag) {
          res.img = src
        }
      }, item.purchaseOrderItem)
    }, purchaseList)
    return {
      ...state,
      purchaseList: [...purchaseList]
    }
  },
  // 根据商家获取供应商
  [GET_MERCHANT_SUPPLIERS](state: any, action: { payload: any; }) {
    const { payload } = action
    const { supplier } = payload
    forEach((item) => {
      item.isSelect = false
    }, supplier)
    const all = {
      fullName: '全部',
      orgName: '全部',
      supplierName: '全部',
      supplierCode: '',
      orgId: '',
    }
    supplier.unshift(all)
    return {
      ...state,
      purchaseSupplier: supplier
    }
  },
  // 重置采购物料组
  [RESET_VENDOR_ITEM_GROUP](state: any, action: { payload: any; }) {
    return {
      ...state,
      purchaseMaterialGroup: []
    }
  },
  // 根据供应商获取物料组
  [GET_VENDOR_ITEM_GROUP](state: any, action: { payload: any; }) {
    const { payload } = action
    const { materialGroup } = payload
    let purchaseMaterialGroup = []
    const all = {
      key: '',
      value: '全部',
      isSelect: false
    }
    purchaseMaterialGroup.push(all)
    forEachObjIndexed((value, key) => {
      let item = {
        key,
        value,
        isSelect: false
      }
      purchaseMaterialGroup.push(item)
    }, materialGroup)
    return {
      ...state,
      purchaseMaterialGroup
    }
  },
  [GET_PURCHASE_LIST_IN](state: any, action: { payload: any; }) {
    const { payload } = action
    const { data } = payload
    return {
      ...state,
      // loading: false,
      // baseData: []
    }
  },
  [RESET_PURCHASE_LIST](state: any, action: { payload: any; }) {
    return {
      ...state,
      purchaseList: []
    }
  },
  // 采购筛选列表
  [GET_PURCHASE_LIST](state: any, action: { payload: any; }) {
    const { payload } = action
    const { data, page } = payload
    const { totalPage } = page
    const { purchaseList } = state
    data.forEach((element) => {
      element.isSelect = false
      forEach((item) => {
        const { img, err } = formatDmsImg({ model: item.model, material: item.materialGroupCode })
        item.img = img
        item.errImg = err
      }, element.purchaseOrderItem)
    });
    let newList
    if (purchaseList.length > 0 && data.length > 0) {
      newList = concat(purchaseList, data)
    } else {
      newList = data
    }
    return {
      ...state,
      loading: false,
      purchaseList: newList,
      totalPage: totalPage
    }
  },
  // 获取基础藏库
  [GET_BASE_DATA](state: any, action: { payload: any; }) {
    const { payload } = action
    const { type } = payload
    switch (type) {
      case 'cglrywy':
        const PurchaseEntrySalesman = []
        const { data } = payload
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            let item = {
              value,
              key,
              isSelect: false,
            }
            PurchaseEntrySalesman.push(item)
          }, value)
        }, data)
        if (PurchaseEntrySalesman.length > 0) {
          PurchaseEntrySalesman[0].isSelect = true
        }
        return {
          ...state,
          PurchaseEntrySalesman,
        }
      case 'cglrrkck':
        const WarehouseList = []
        const { data } = payload
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            let item = {
              value,
              key,
              isSelect: false,
            }
            WarehouseList.push(item)
          }, value)
        }, data)

        // 入库仓库 添加取消选择项 -> 传空
        let nullWare = {
          isSelect: false,
          value: "请选择",
          key: ""
        }
        WarehouseList.unshift(nullWare)

        if (WarehouseList.length > 0) {
          WarehouseList[0].isSelect = true
        }
        return {
          ...state,
          baseData: WarehouseList
        }
      case 'cgrkrkck':
        const WarehouseList2 = []
        const { data } = payload
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            let item = {
              value,
              key,
              isSelect: false,
            }
            WarehouseList2.push(item)
          }, value)
        }, data)

        // 入库仓库 添加取消选择项 -> 传空
        let nullWare = {
          isSelect: false,
          value: "请选择",
          key: ""
        }
        WarehouseList2.unshift(nullWare)

        if (WarehouseList2.length > 0) {
          WarehouseList2[0].isSelect = true
        }
        return {
          ...state,
          baseData: WarehouseList2
        }
      case 'cglrshdz': // 收货地址
        const shippingAddress = []
        const { data } = payload
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            let item = {
              value,
              key,
            }
            shippingAddress.push(item)
          }, value)
        }, data)
        return {
          ...state,
          shippingAddress
        }
      case 'cglrjsdw': // 结算单位
        const settlementUnits = []
        const { data } = payload
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            let item = {
              value,
              key,
            }
            settlementUnits.push(item)
          }, value)
        }, data)
        return {
          ...state,
          settlementUnits: settlementUnits
        }
      case 'wlz':
        let ItemgroupList = []
        const { data } = payload
        const all = {
          value: '全部',
          key: '',
          isSelect: false,
        }
        ItemgroupList.push(all)
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            let item = {
              value,
              key,
              isSelect: false,
            }
            ItemgroupList.push(item)
          }, value)
        }, data)
        return {
          ...state,
          ItemgroupList
        }
      case 'kczt':
        let WarehouseStatusList = []
        const { data } = payload
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            let item = {
              value,
              key,
              isSelect: false,
            }
            WarehouseStatusList.push(item)
          }, value)
        }, data)
        return {
          ...state,
          WarehouseStatusList
        }
      case 'ssmd':
        let StoresList = []
        const { data } = payload
        const all = {
          value: '全部',
          key: '',
          isSelect: false,
        }
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            let item = {
              value,
              key,
              isSelect: false,
            }
            StoresList.push(item)
          }, value)
        }, data)
        return {
          ...state,
          StoresList
        }
      case 'gys':
        let SuppliersList = []
        const { data } = payload
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            let item = {
              value,
              key,
              isSelect: false,
            }
            SuppliersList.push(item)
          }, value)
        }, data)
        if (SuppliersList.length > 0) {
          SuppliersList[0].isSelect = true
        }
        let Supplier = SuppliersList[0].value
        return {
          ...state,
          SuppliersList,
          Supplier
        }
      case 'kpf': // 开票方
        const kpfList = []
        const { data } = payload
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            const item = {
              name: value,
              id: key,
            }
            kpfList.push(item)
          }, value)
        }, data)
        return {
          ...state,
          kpfList
        }
      case 'ywy': // 业务员
        const ywyList = []
        const { data } = payload
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            const item = {
              name: value,
              id: key,
            }
            ywyList.push(item)
          }, value)
        }, data)
        return {
          ...state,
          ywyList
        }
      case 'fhck':
        const fhckList = []
        const { data } = payload
        forEachObjIndexed((value, key) => {
          forEachObjIndexed((value, key) => {
            const item = {
              name: value,
              id: key,
            }
            fhckList.push(item)
          }, value)
        }, data)
        return {
          ...state,
          fhckList
        }
      default:
        return {
          ...state,
        }
    }
  },
  [DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR](state, action) {
    return {
      ...state,
      kpfList: [],
      ywyList: [],
      fhckList: []
    }
  }
}, {
  purchaseList: {},
  baseData: {},
  totalPage: {},
  SuppliersList: {},
  ItemgroupList: {},
  WarehouseStatusList: {},
  Supplier: '',
  kpfList: [],
  ywyList: [],
  fhckList: [],// 渠道订单发货仓库
  purchaseSupplier: [], // 采购入库供应商列表
  purchaseMaterialGroup: [], //采购入库物料组列表
  settlementUnits: [], // 结算单位
  shippingAddress: [], // 收货地址
  PurchaseEntrySalesman: []
});
