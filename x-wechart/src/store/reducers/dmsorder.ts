import { handleActions } from 'redux-actions';
import {
  DMS_ORDER_CHOOSE_ITEM, DMS_ORDER_CHOOSE_ITEM_INFO, DMS_CHANNEL_ORDER_ADD_ITEMS, DMS_ORDER_CHOOSE_CUSTOMER_INFO, DMS_ORDER_ITEM_INV_STATUS, DMS_GET_PRODUCT_LIST_LIKE_CODE, DMS_ORDER_GET_CUSTOMER, RETURN_ORDER_CHOOSE_CUSTOMER_INFO,
  DMS_ORDER_NORMAL_SALES_ORDER_CUSTOMER_INFO,QUERY_APP_FIBOOKDMS, DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR, DMS_ORDER_PRODUCT_LIKE_INFO_CLEAR, DMS_ORDER_RETAIL_ORDER_BASE_DATA, DMS_RETAIL_ORDER_RESER_CHOOSE, DMS_CIS_FX_PRICE, DMS_CIS_CODE_INFO,
  DMS_DELIVERY_METHOD, DMS_INV_STATUS_TYPE,DMS_ALLOT_ORDER_LIST,DMS_STOCK_WARAHOUSE_LIST,DMS_ALLOT_SUBMIT,SUBMIT_STORE_LIST,DMS_CIS_LS_PRICE,GET_ZONE_B_2_C_SERVICE_LIST,DMS_ALLOCATION_RATIO,CIS_DELIVERY_METHOD,,DMS_ORDER_PROTOTYPE_SHOP_DATA,DMS_ORDER_PROTOTYPE_METARIL_DATA
} from '@/store/types/dmsorder';
import {forEach, forEachObjIndexed} from 'ramda';
import { formatDmsImg } from '@/utils/index';

// 将上次选择的地址选择第一个并转化为对象
const mapLastAddressToObj = (param: any) => {
  const keys = Object.keys(param)
  if (keys.length > 0) {
    return {
      id: keys[0],
      name: param[keys[0]]
    }
  } else {
    return {
      id: '',
      name: ''
    }
  }
}

export default handleActions({
  [DMS_CIS_CODE_INFO] (state, action) {
    const { chooseItemInfo } = state
    const { payload } = action
    return {
      ...state,
      chooseItemInfo: {
        ...chooseItemInfo,
        ...payload
      }
    }
  },
  [DMS_ORDER_CHOOSE_ITEM](state, action) {
    const { chooseItemInfo } = state
    const { payload } = action
    chooseItemInfo.chooseItemId = payload
    return state
  },

  [DMS_ORDER_CHOOSE_ITEM_INFO](state, action) {
    const { chooseItemInfo } = state
    chooseItemInfo.itemInfo[chooseItemInfo.chooseItemId] = action.payload
    return {
      ...state,
      chooseItemInfo: {
        ...chooseItemInfo
      }
    }
  },
  [DMS_GET_PRODUCT_LIST_LIKE_CODE](state, action) {
    const { payload } = action
    // const { likePaging } = state
    return {
      ...state,
      likePaging: payload.products || []
    }
  },
  [RETURN_ORDER_CHOOSE_CUSTOMER_INFO](state, action) {
    const { payload } = action
    const { data, page } = payload
    const over = data.length < 20
    if (page.pageNo === 1) {
      return {
        ...state,
        customers: {
          customers: data || [],
          over,
        }
      }
    } else {
      const { customers } = state
      return {
        ...state,
        customers: {
          customers: customers.customers.concat(data || []) ,
          over
        }
      }
    }
  },
  [QUERY_APP_FIBOOKDMS](state, action) {
    const { payload } = action
    const fibookList = [];
    fibookList = payload.data.map(item => {
      for (const key in item) {
        return {
          name:item[key],
          id:key
        }
      }
    })
    return {
      ...state,
      fibookList,
    }
  },
  [DMS_ORDER_GET_CUSTOMER](state, action) {
    const { payload } = action
    const { data, page } = payload
    const over = data.length < 20
    if (page.pageNo === 1) {
      return {
        ...state,
        customers: {
          customers: data || [],
          over,
        }
      }
    } else {
      const { customers } = state
      return {
        ...state,
        customers: {
          customers: customers.customers.concat(data || []) ,
          over
        }
      }
    }
  },
  [DMS_ORDER_CHOOSE_CUSTOMER_INFO](state, action) {
    return {
      ...state,
      chooseCustomerInfo: action.payload
    }
  },
  [DMS_ORDER_ITEM_INV_STATUS](state, action) {
    const { payload } = action
    const { productCode, invStatus } = payload

    // 转换成对象
    const invStatuss = invStatus.map((inv) => {
      for (const key in inv) {
        const value = inv[key]
        return {
          key,
          value
        }
      }
    })
    const { chooseItemInfo } = state
    const { itemInfo } = chooseItemInfo
    for(const key in itemInfo){
      const value = itemInfo[key]
      if (value.productCode === productCode) {
        value.invStatus = invStatuss
      }
    }
    return {
      ...state,
      chooseItemInfo: {
        ...chooseItemInfo,
        // chooseItemId: '',
        // itemInfo: {
        //   ...itemInfo,
        // }
      }
    }
  },
  [DMS_ORDER_NORMAL_SALES_ORDER_CUSTOMER_INFO](state, action) {
    const { payload } = action
    const { customerInfo } = payload
    const { customerInfos } = state

    customerInfos.cisCode = customerInfo.cisCode
    for (const field in customerInfo) {
      if (field === 'cisCode') {
        continue
      }
      const list = customerInfo[field]
      customerInfos[field] = list.map((item: Object) => {
        for (const key in item) {
          return {
            id: key,
            name: item[key]
          }
        }
      })
      if(field === 'inWarehouseList'){
         // 入库仓库 添加取消选择项 -> 传空
        let nullWare = {
          id: "",
          name: "请选择"
        }
        customerInfos.inWarehouseList.unshift(nullWare)
      }
    }

    return {
      ...state,
      customerInfos: {
        ...customerInfos
      }
    }
  },
  [DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR] (state) {
    return {
      ...state,
      chooseItemInfo: {
        chooseItemId: '',
        orgId: '',
        cisCode: '',
        shopCisCode: '',
        itemInfo: {}
      },
      chooseCustomerInfo: {
        address: '',
        customerCode: '',
        customerName: '',
        legalPerson: ''
      },
      customerInfos: {
        cisCode: '',
        customerAddressAllList: [],  // 收货地址
        customerAllList: [], // 收货单位列表
        inWarehouseList: [], // 入库列表
        orgList: [] // 供应商(销售组织)列表
      },
      retailOrderBaseInfo: {
        billFrom: [],
        seller: [],
        store: [],
        warehouse: [],
        address: {
          province: {
            id: '',
            name: ''
          },
          city: {
            id: '',
            name: ''
          },
          country: {
            id: '',
            name: ''
          },
          town: {
            id: '',
            name: ''
          }
        }
      }
    }
  },
  [DMS_ORDER_PRODUCT_LIKE_INFO_CLEAR](state) {
    return {
      ...state,
      likePaging: []
    }
  },
  [DMS_ORDER_RETAIL_ORDER_BASE_DATA] (state, action) {
    const { payload } = action
    const { baseInfo } = payload
    const retailOrderBaseInfo = {
      billFrom: [],
      seller: [],
      store: [],
      storeInfo: [], // 之前用store, 现在用storeInfo
      warehouse: [],
    }
    forEachObjIndexed((value, field) => {
      if (field !== 'address' && field !== 'storeInfo') {
        forEachObjIndexed((value, key) => {
          let item = {
            name: value,
            id: key,
          }
          retailOrderBaseInfo[field].push(item)
        }, value)
      }
      if(field === 'storeInfo'){
        forEachObjIndexed((value, key) => {
          let item = {
            ...value,
            id: key,
          }
          retailOrderBaseInfo[field].push(item)
        }, value)
      }

    }, baseInfo)

    retailOrderBaseInfo.store = retailOrderBaseInfo.storeInfo
    // 处理地址信息
    const { address } = baseInfo
    const { province, city, country, town } = address
    retailOrderBaseInfo.address = {
      province: mapLastAddressToObj(province),
      city: mapLastAddressToObj(city),
      country: mapLastAddressToObj(country),
      town: mapLastAddressToObj(town)
    }

    return {
      ...state,
      retailOrderBaseInfo: {
        ...retailOrderBaseInfo
      }
    }
  },
  [GET_ZONE_B_2_C_SERVICE_LIST] (state, action) {
    const { payload } = action
    const serviceList = payload.data||[]
    return {
      ...state,
      serviceList
    }
  },
  [DMS_RETAIL_ORDER_RESER_CHOOSE](state, action) {
    const { retailOrderBaseInfo } = state
    return {
      ...state,
      retailOrderBaseInfo,
    }
  },
  [DMS_CHANNEL_ORDER_ADD_ITEMS] (state, action) {
    return {
      ...state,
      chooseItemInfo: {
        chooseItemId: '',
        itemInfo: action.payload,
      }
    }
  },
  [DMS_CIS_FX_PRICE](state, action) {
    const { chooseItemInfo } = state
    const { payload: { list, refreshPrice } } = action
    const tempInfo = {}
    for (const index in list) {
      const item = list[index]
      tempInfo[`_${item.productId}`] = item
    }
    const result = {
      ...chooseItemInfo
     }
    for (const key in result.itemInfo) {
      const info = result.itemInfo[key]
      const resultInfo = tempInfo[`_${info.productCode}`]
      if (resultInfo) {
        const orgId = chooseItemInfo.orgId
        const price = (orgId && orgId !== '' ? resultInfo.standardPrice === -1 ? '' : resultInfo.standardPrice : resultInfo.retailPrice === -1 ? '' : resultInfo.retailPrice) || ''

        result.itemInfo[key] = {
          ...info,
          price,
          refreshPrice: refreshPrice
          lock: resultInfo.lockFlag && (resultInfo.lockFlag === '1' || resultInfo.lockFlag === '2')
          time: new Date().getTime(),
        }
      }
    }
    return {
      ...state,
      chooseItemInfo: result
    }
  },

  [DMS_CIS_LS_PRICE](state, action) {
    const { chooseItemInfo } = state
    const { payload: { list, refreshPrice } } = action

    const tempInfo = {}
    for (const index in list) {
      const item = list[index]
      tempInfo[`_${item.productId}`] = item
    }
    const result = {
      ...chooseItemInfo
     }
    for (const key in result.itemInfo) {
      const info = result.itemInfo[key]
      const resultInfo = tempInfo[`_${info.productCode}`]
      if (resultInfo) {
        const orgId = chooseItemInfo.orgId
        const price = (orgId && orgId !== '' ? resultInfo.standardPrice === -1 ? '' : resultInfo.standardPrice : resultInfo.retailPrice === -1 ? '' : resultInfo.retailPrice) || ''

        result.itemInfo[key] = {
          ...info,
          price,
          refreshPrice: refreshPrice
          lock: resultInfo.lockFlag && (resultInfo.lockFlag === '1' || resultInfo.lockFlag === '2')
          time: new Date().getTime(),
        }
      }
    }
    return {
      ...state,
      chooseItemInfo: result
    }
  },


  [CIS_DELIVERY_METHOD](state, action) {
    let cisDeliveryMode: any = [];
    let list = action.payload.list;

    cisDeliveryMode = list.map((item: Object) => {
      return {
        id: item.code,
        name: item.name
      }
    })
    return {
      ...state,
      cisDeliveryMode
    }
  },
  [DMS_DELIVERY_METHOD](state, action) {
    let deliveryMode: any = [];
    let list = action.payload.data;
    deliveryMode = list.map((item: Object) => {
      for (const key in item) {
        return {
          id: key,
          name: item[key]
        }
      }
    })
    return {
      ...state,
      deliveryMode
    }
  },
  [DMS_INV_STATUS_TYPE](state, action) {
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

    let nullWare = {
      id: "",
      name: "请选择"
    }
    invStatusType.unshift(nullWare)
    return {
      ...state,
      invStatusType
    }
  },
  [DMS_STOCK_WARAHOUSE_LIST](state, action) {
    let warehousesOut: any = [];
    let warehousesIn: any = [];
    let addressList:any = [];
    let stockStatus:any = [];
    let outlist = action.payload.data.warehousesOut;
    let inlist = action.payload.data.warehousesIn;
    let addreList = action.payload.data.addressList;
    let stockTransStatus = action.payload.data.stockTransStatus;
    let flag = 0;
    for (const key in stockTransStatus) {
      let info = {
        id: key,
        name:stockTransStatus[key]
      }
      stockStatus[flag] = info;
      flag++;
    }
    warehousesOut = outlist.map((item: Object) => {
      for (const key in item) {
        return {
          id: item.cId,
          name: item.name
        }
      }
    })
    warehousesIn = inlist.map((item: Object) => {
      for (const key in item) {
        return {
          id: item.cId,
          name: item.name
        }
      }
    })
    addressList = addreList.map((item: Object) => {
      for (const key in item) {
        return {
          id: item.id,
          name: item.address,
          mobile: item.mobile,
          linkman: item.linkman,
          areaStatus: item.areaStatus, // 判断行政区域地址库是否失效 A有效，D失效
        }
      }
    })
    return {
      ...state,
      warehousesIn,
      warehousesOut,
      addressList,
      stockStatus
    }
  },
  [DMS_ALLOT_SUBMIT](state, action) {
    let subResult = action.payload.data;
    return {
      ...state,
      subResult
    }
  },
  [SUBMIT_STORE_LIST](state, action) {
    let subStoreList = action.payload.data;
    return {
      ...state,
      subStoreList
    }
  },
  [DMS_ALLOT_ORDER_LIST](state: any, action: { payload: any; }) {
    const { payload } = action
    const { orderList } = state
    let orderListNew = payload

    if (payload.page && payload.page.pageNo > 1 && orderList && orderList.data && orderList.data.length > 0 ) {
      orderListNew = { ...payload, data: orderList.data.concat(payload.data) }
    } else {
      orderListNew = {...payload, data: payload.data}
    }
    forEach((items) => {
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
      orderList: orderListNew
    }
  },
  [DMS_ALLOCATION_RATIO] (state, action) {
    const { payload } = action
    const allocationRatioList = payload.data||[]
    let newList = [
      {
      title:'当前月累(考核指标)',
      content:[]
      },
      {
        title:'近30天累计(计算规则)',
        content:[]
      }
    ]

    if(allocationRatioList && allocationRatioList.length>0){
      allocationRatioList.forEach(item => {
        newList[0].content.push({
          orgName: item.orgName, // 组织名称
          salesCount: item.monthlyStatsSalesCount, // 统计当月的销售出库数量
          transCount: item.monthlyStatsTransCount, // 统计当月的调拨数量
          total: item.monthlyStatsTotal, // 统计当月的总数量
          transRate: item.monthlyStatsTransRate, // 统计当月的调拨比例
          availableMaxTransRate: item.availableMaxTransRate, // 调拨比例限制
        })
        newList[1].content.push({
          orgName: item.orgName, // 组织名称
          salesCount: item.statsSalesCount, // 统计的销售出库数量
          transCount: item.statsTransCount, // 统计的调拨数量
          total: item.statsTotal, // 统计的总数量
          transRate: item.statsTransRate, // 统计的调拨比例
          availableMaxTransRate: item.availableMaxTransRate, // 调拨比例限制
        })
      })
    }


    allocationRatioList = newList
    console.log('allocationRatioList',allocationRatioList)
    return {
      ...state,
      allocationRatioList
    }
  },

  // 获取样机门店数据
  [DMS_ORDER_PROTOTYPE_SHOP_DATA] (state, action) {
    const { payload } = action
    const customerInfo = {}
    customerInfo.custmerCode = payload.custmerCode?payload.custmerCode:''
    customerInfo. custmerMdmCode = payload.custmerCode?payload.custmerMdmCode:''
    customerInfo.custmerName = payload.custmerCode?payload.custmerName:''
   // 商家信息
    const protoTypeInfor = {
      storeInfo: [], // 门店数据
    }
    protoTypeInfor.storeInfo = payload.list
    return {
      ...state,
      protoTypeInfor: {
        ...protoTypeInfor,
        customerInfo
      },
    }
  },
//   获取样机管理中物料组数据
  [DMS_ORDER_PROTOTYPE_METARIL_DATA] (state, action) {
    let materialGroupList: any = [];
    materialGroupList = action.payload.list;
    return {
      ...state,
      materialGroupList
    }
  },
}, {
  chooseItemInfo: {
    chooseItemId: '',
    cisCode: '',
    orgId: '', // 渠道订单选中的组织id,选中商品时需要根据orgId获取cis价格信息
    shopCisCode: '',
    itemInfo: {
      // '_0': {
      //   colour: '标准',
      //   productCode: '3451028',
      //   model: 'LED50K300U',
      //   productName: 'Z.彩电.LED50K300U.T.B0.中国C.',
      //   invStatus: [
      //     {
      //       key: 15393578,
      //       value: '正品'
      //     },
      //     {
      //       key: 15393580,
      //       value: '样机'
      //     },
      //     {
      //       key: 26414909442,
      //       value: '正品低补'
      //     },
      //     {
      //       key: 26414909490,
      //       value: '正品不补'
      //     },
      //     {
      //       key: 26414909556,
      //       value: '样机低补'
      //     },
      //     {
      //       key: 26414909609,
      //       value: '样机不补'
      //     }
      //   ]
      // }
    },
  },
  chooseCustomerInfo: {
    address: '',
    customerCode: '',
    customerName: '',
    legalPerson: ''
  },
  likePaging: [],
  customers: {
    customers: [],
    over: false
  },
  amount: '0.00',
  customerInfos: {
    cisCode: '',
    customerAddressAllList: [],  // 收货地址
    customerAllList: [], // 收货单位列表
    inWarehouseList: [], // 入库列表
    orgList: [] // 供应商(销售组织)列表
  },
  retailOrderBaseInfo: {
    billFrom: [],
    seller: [],
    store: [],
    warehouse: [],
    address: {
      province: {
        id: '',
        name: ''
      },
      city: {
        id: '',
        name: ''
      },
      country: {
        id: '',
        name: ''
      },
      town: {
        id: '',
        name: ''
      }
    }
  },
  deliveryMode: [],
  cisDeliveryMode: [],
  fibookList:[],
  orderList:[],
  warehousesIn:[],
  warehousesOut:[],
  subResult:{},
  addressList:[],
  stockStatus:[],
  subStoreList:[],
  serviceList:[],
  allocationRatioList:[],
  serviceList:[],
  protoTypeInfor:{}
});
// "productCode":"4234",                  //产品编码
        //        "productName":"电视",                  //产品名称
            //    "model":"KAJOFEI",                     //型号
        //        "colour":"标准",                          //颜色
