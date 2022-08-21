import { handleActions } from 'redux-actions';
import { is, find, map, split, forEach, add, multiply, head, forEachObjIndexed, propEq, subtract, findIndex, update, filter, join } from 'ramda';
import {
  TAKE_ORDER_COMMON, GET_ORDER_LIST, GET_ORDER_FILTER, TAKE_ORDER_PROJECT, CHANGE_PREFERENCE_ITEM_PRICE, AGAIN_ORDER_COMMON,
  CHANGE_ORDER_PROJECT_ITEM, GET_BUY_OUT_ORDER, CHANGE_BYU_OUT_PRICE, TAKE_PREFERENCE_ORDER,GET_CART_STOCK_LIST, CHANGE_PREFERENCE_ITEM_COUNT,
  TAKE_ACTIVITY_COMMON, TAKE_ACTIVITY_SNAPPED, GET_ORDER_DELIVERY_METHOD, RESET_ORDER_LIST, GET_SALES_ORDER_INFO, CART_ORDER_WEEK,GET_ORDER_SERVICE, MONEY_BY_WEEK,
  GET_WAIT_BALANCE_INFO_LIST, GET_MY_ROUTINE_ORDER
} from '@/store/types/order';
import { formatImg, MarketFormatImg, combineObjIntoAnArray, checkCombinationPurchase } from '@/utils/index';

const getCommonInfo = (payload: any) => {
  let provinceArr: any = [];
  let provinceId: any = '';
  let cityId: any = '';
  let areaId: any = '';
  // 供应商和物料组
  let orgId = ''
  let matklId =  ''
  if (payload.orgAndGroup) {
    const orgOrmatCode = payload.orgAndGroup.trim().split("-")
    orgId = orgOrmatCode[0] ||  ''
    matklId = orgOrmatCode[1] ||  ''
  } else if (payload && payload.cartOrder) {
    orgId = payload.cartOrder.orgId || ''
    matklId = payload.cartOrder.matklId || ''
  }
  // 开票户头
  let bill: any = {};
  let bills: any = [];
  // 收货地址
  let addresses: any = [];
  // 默认地址收货地址
  let receiver: any = {
    address: '请选择',
  };
  // 配送方式: 只有 直配到用户-502004 才有选择地址 分销商-502005 有分销商选择和分销商地址选择
  let deliveries: any = [];
  // 默认配送方式
  let delivery: any = {};
  // 分销商
  let custMarkets: any = [];
  let custMarket: any = {};
  // 分销商地址
  let custMarketsAddress: any = [];
  let custMarketAddress: any = {};
  // 结算信息
  let deadMaxDate = '';
  let deadMinDate = '';
  // 结算方式
  let orderType: string = '01';
  // 直送地址
  let toAddress: any = {};
  // 采购单号
  let takeCode = '';
  // 提交订单其他参数
  const versions = (payload.cartOrder && payload.cartOrder.versions) || '';
  const carts = (payload.cartOrder && payload.cartOrder.carts) || '';
  const orgAndGroup = (payload.cartOrder && payload.cartOrder.orgAndGroup) || '';
  const { billToDTOs, custMarketModelDtos = [], marketAddress, customerAddressDTOs, deliveryList, maxDate, minDate, tradeType, defaultProvice, defaultCity, defaultDistrict, defaultContcat, defaultMobile, provices, citys, districts, purchaseCode, advancePayRate, purchaseType, isPujie } = payload.cartOrder;
  deadMaxDate = maxDate;
  deadMinDate = minDate;
  orderType = tradeType;
  // 默认地址
  provinceArr = map(({ id, provinceCode, provinceName }) => ({ id, name: provinceName, code: provinceCode, level: 1 }), provices);
  provinceId = defaultProvice;
  cityId = defaultCity;
  areaId = defaultDistrict;
  takeCode = purchaseCode;

  // 开票户头
  bills = map(({ id, drawerName, drawerCode }) => ({
    id, drawerName, drawerCode,
  }), billToDTOs);
  if (bills && bills.length > 0) {
    bill = head(bills);
  }
  // 收货地址
  addresses = map(({ id, provinceCode, cityCode, areaCode, address, contactPerson, contactPersonTel, defaultType, regionStatus }) => ({ id, provinceCode, cityCode, areaCode, name: address, contactPerson, contactPersonTel: contactPersonTel.replace('\u202d', '').replace('\u202c', ''), defaultType, regionStatus }), customerAddressDTOs);
  if (addresses && addresses.length > 0 && addresses[0].regionStatus === 'A') {
    receiver = head(addresses);
  }
  // 再来一单 重置上面的 receiver 默认联系人和联系方式 defaultContcat, defaultMobile
  if (defaultContcat) {
    receiver.contactPerson = defaultContcat;
  }
  if (defaultMobile) {
    receiver.contactPersonTel = defaultMobile.replace('\u202d', '').replace('\u202c', '');
  }
  // 配送方式
  deliveries = map(({ id, propertyName }) => ({ id, propertyName }), deliveryList);
  if (deliveries && deliveries.length > 0) {
    delivery = head(deliveries);
  }
  // 分销商
  if (is(Array, custMarketModelDtos)) {
    custMarkets = map(({ customerInfoId, customerInfoName }) => ({ id: customerInfoId, name: customerInfoName }), custMarketModelDtos);
    if (custMarkets && custMarkets.length > 0) {
      custMarket = head(custMarkets);
    }
  }
  if (is(Array, marketAddress)) {
    // 分销商地址
    custMarketsAddress = map(({ id, provinceCode, cityCode, areaCode, address, contactPerson, contactPersonTel }) => ({ id, provinceCode, cityCode, areaCode, name: address, contactPerson, contactPersonTel: contactPersonTel.replace('\u202d', '').replace('\u202c', '') }), marketAddress);
    if (custMarketsAddress && custMarketsAddress.length > 0) {
      custMarketAddress = head(custMarketsAddress);
    }
  }
  // 直送地址
  toAddress = {
    id: defaultDistrict,
    name: '',
  };
  const toProvince = find(propEq('provinceCode', defaultProvice), provices) || {};
  const toCity = find(propEq('cityCode', defaultCity), citys) || {};
  const toDistricts = find(propEq('districtCode', defaultDistrict), districts) || {};
  if (toProvince.id) {
    toAddress.name += toProvince.provinceName;
  }
  if (toCity.id) {
    toAddress.name += toCity.cityName;
  }
  if (toDistricts.id) {
    toAddress.name += toDistricts.districtName;
  }
  //是否启用共享
  let shareFlag: any =  payload.shareFlag;

  //办事处列表
  let offices: any = [];
  let office: any = {};
  //启用共享仓
  if(shareFlag === 'Y'){
    forEach((item) => {
      let office = {};
      office.id = item.code;
      office.name = item.name;
      offices.push(office);
    }, payload.office);
  }
  if(offices && offices.length>0){
    office = head(offices);
  }
  // 销售所属门店
  let salesShopInfoId = payload.salesShopInfoId
  return {
    bill,
    bills,
    orgId,
    matklId,
    custMarkets,
    custMarket,
    custMarketsAddress,
    custMarketAddress,
    toAddress,
    receiver,
    addresses,
    delivery,
    deliveries,
    deadMaxDate,
    deadMinDate,
    provinceArr,
    provinceId,
    cityId,
    areaId,
    orderType,
    versions,
    carts,
    orgAndGroup,
    takeCode,
    advancePayRate,
    purchaseType,
    isPujie,
    shareFlag,
    offices,
    office,
    salesShopInfoId
  };
};
const getActivityInfo = (payload: any) => {
  let provinceArr: any = [];
  let provinceId: any = '';
  let cityId: any = '';
  let areaId: any = '';
  // 供应商和物料组
  let orgId = ''
  let matklId = ''
  if (payload.orgAndGroup) {
    const orgOrmatCode = payload.orgAndGroup.trim().split("-")
    orgId = orgOrmatCode[0] ||  ''
    matklId = orgOrmatCode[1] ||  ''
  } else {
    orgId = payload.orgId || ''
    matklId = payload.matklId || ''
  }
  // 开票户头
  let bill: any = {};
  let bills: any = [];
  // 收货地址
  let addresses: any = [];
  // 默认地址收货地址
  let receiver: any = {
    address: '请选择',
  };
  // 配送方式: 只有 直配到用户-502004 才有选择地址 分销商-502005 有分销商选择和分销商地址选择
  let deliveries: any = [];
  // 默认配送方式
  let delivery: any = {};
  // 分销商
  let custMarkets: any = [];
  let custMarket: any = {};
  // 分销商地址
  let custMarketsAddress: any = [];
  let custMarketAddress: any = {};
  let custActivity: any = {};
  // 结算信息
  let deadMaxDate = '';
  let deadMinDate = '';
  // 结算方式
  let orderType: string = '01';
  // 直送地址
  let toAddress: any = {};
  // 采购单号
  let takeCode = '';
  // 提交订单其他参数
  const versions = (payload.cartOrder && payload.cartOrder.versions) || '';
  const carts = (payload.cartOrder && payload.cartOrder.carts) || '';
  const orgAndGroup = (payload.cartOrder && payload.cartOrder.orgAndGroup) || '';
  const { billToDTOs, custMarketModels = [], marketAddress,activityList, customerAddressDTOs, deliveryList, maxEndDate, minDate, tradeType, defaultProvice, defaultCity, defaultDistrict, defaultContcat, defaultMobile, provices, citys, districts, purchaseCode, shareFlag} = payload;
  deadMaxDate = maxEndDate;
  deadMinDate = minDate;
  orderType = tradeType;
  // 默认地址
  if(provices) {
    provinceArr = map(({id, provinceCode, provinceName}) => ({id, name: provinceName, code: provinceCode, level: 1}), provices);
  }
  provinceId = defaultProvice;
  cityId = defaultCity;
  areaId = defaultDistrict;
  takeCode = purchaseCode;
  // 开票户头
  if(billToDTOs){
    bills = map(({ id, drawerName, drawerCode }) => ({
      id, drawerName, drawerCode,
    }), billToDTOs);
  }
  if (bills && bills.length > 0) {
    bill = head(bills);
  }
  // 收货地址
  if(customerAddressDTOs){
    addresses = map(({ id, provinceCode, cityCode, areaCode, address, contactPerson, contactPersonTel, defaultType, regionStatus}) => ({ id, provinceCode, cityCode, areaCode, name: address, contactPerson, contactPersonTel: contactPersonTel.replace('\u202d', '').replace('\u202c', ''), defaultType, regionStatus }), customerAddressDTOs);
  }
  if (addresses && addresses.length > 0 && addresses[0].regionStatus === 'A') { // 判断行政区域地址库是否失效 A有效，D失效。有效才赋默认值
    receiver = head(addresses);
  }
  // 再来一单 重置上面的 receiver 默认联系人和联系方式 defaultContcat, defaultMobile
  if (defaultContcat) {
    receiver.contactPerson = defaultContcat;
  }
  if (defaultMobile) {
    receiver.contactPersonTel = defaultMobile.replace('\u202d', '').replace('\u202c', '');
  }
  // 配送方式
  if(deliveryList){
    deliveries = map(({ id, propertyName }) => ({ id, propertyName }), deliveryList);
  }
  if (deliveries && deliveries.length > 0) {
    delivery = head(deliveries);
  }
  // 分销商
  if (is(Array, custMarketModels)) {
    custMarkets = map(({ customerInfoId, customerInfoName }) => ({ id: customerInfoId, name: customerInfoName }), custMarketModels);
    if (custMarkets && custMarkets.length > 0) {
      custMarket = head(custMarkets);
    }
  }
  if (is(Array, marketAddress)) {
    // 分销商地址
    custMarketsAddress = map(({ id, provinceCode, cityCode, areaCode, address, contactPerson, contactPersonTel }) => ({ id, provinceCode, cityCode, areaCode, name: address, contactPerson, contactPersonTel: contactPersonTel.replace('\u202d', '').replace('\u202c', '') }), marketAddress);
    if (custMarketsAddress && custMarketsAddress.length > 0) {
      custMarketAddress = head(custMarketsAddress);
    }
  }
  if (is(Array, activityList)) {
    // 活动列表
    if (activityList && activityList.length > 0) {
      custActivity = head(activityList);
    }
  }
  // 直送地址
  toAddress = {
    id: defaultDistrict,
    name: '',
  };
  const toProvince = provices ? find(propEq('provinceCode', defaultProvice), provices) || {} : {};
  const toCity = citys ? find(propEq('cityCode', defaultCity), citys) || {} : {};
  const toDistricts = districts ? find(propEq('districtCode', defaultDistrict), districts) || {} : {};
  if (toProvince.id) {
    toAddress.name += toProvince.provinceName;
  }
  if (toCity.id) {
    toAddress.name += toCity.cityName;
  }
  if (toDistricts.id) {
    toAddress.name += toDistricts.districtName;
  }

  //办事处列表
  let offices: any = [];
  let office: any = {};
  //启用共享仓
  if(shareFlag === 'Y'){
    forEach((item) => {
      let office = {};
      office.id = item.code;
      office.name = item.name;
      offices.push(office);
    }, payload.office);
  }
  if(offices && offices.length>0){
    office = head(offices);
  }
  return {
    shareFlag,
    offices,
    office,
    bill,
    bills,
    orgId,
    matklId,
    custMarkets,
    custMarket,
    custMarketsAddress,
    custMarketAddress,
    toAddress,
    receiver,
    addresses,
    delivery,
    deliveries,
    deadMaxDate,
    deadMinDate,
    provinceArr,
    provinceId,
    cityId,
    areaId,
    orderType,
    custActivity,
    versions,
    carts,
    orgAndGroup,
    takeCode,
  };
};
export default handleActions({
  [RESET_ORDER_LIST](state, action) {
    return {
      ...state,
      orderList: []
    }
  },
  [GET_ORDER_DELIVERY_METHOD](state, action) {
    const { payload: { list } } = action
    const item = {
      code: '',
      name: '全部',
      desc: null
    }
    list.unshift(item)
    return {
      ...state,
      deliveryMethod: list
    }
  },
  [TAKE_ACTIVITY_COMMON](state, action) {
    const { payload }: any = action;
    let common: any = {};
    // 商品
    let items: any = [];
    // 商品数量
    let totalNum: number = 0;
    let totalDeposit: number = 0;
    let balance: any = {};
    let actCode: any = ''
    let isPackageOrder: any = ''
    let isFenXiao: any = ''
    let discountTypeName: any = ''
    let isPurchaseStandard: boolean = true; // 组合购购买产品数量是否符合标准（默认不符合标准）

    const agentArr = {
      agentName: '',
      agentCode: ''
    }
    // 基本订单信息
    if (payload && payload.code == 1) {
      common = payload
    } else {
      common = getActivityInfo(payload);
      forEach(({ id,deposit, color, img,rebateMoney, billPrice, defaultImg,discountTypeName, productInfoId, fwOrgId, fwOrgCode, fwOrgName, productName, specialPrice, standardPrice, priceGroupName, buyQty, makeUpTypeName, materialGroup, policyName, specialPriceVcode,isPackage,packageNum,discountTypeId,matklCode,productGroupRemark,productGroup,packageCode,productInfoZzprdmodel,purchaseLimitQty }) => {
        totalNum = add(totalNum, buyQty); // 组合购购买产品总数
        totalDeposit = add(totalDeposit, deposit*buyQty); // 组合购》认购》定金总和
        isPackageOrder = isPackage

        items.push({
          id,
          discountTypeName,
          discountTypeId,
          isPackage,
          rebateMoney,
          color,
          deposit,
          orgId: fwOrgId,
          orgCode: fwOrgCode,
          fwOrgName: fwOrgName,
          productId: productInfoId,
          productName,
          price: billPrice,
          specialPrice,
          standardPrice,
          priceGroupName,
          quantity: buyQty,
          // maxQty: buyQty,
          maxQty: purchaseLimitQty,
          makeUpTypeName,
          src: img ? MarketFormatImg({ img: img }) : img,
          errImg: defaultImg ? MarketFormatImg({ defaultImg: defaultImg }) : defaultImg,
          policyName,
          specialPriceVcode,
          packageNum,
          matklCode,
          productGroupRemark,
          productGroup,
          packageCode,
          productInfoZzprdmodel,
        });
      }, payload.activityList);
      balance = payload.balanceDTO
      actCode = payload.actCode || ''
      isFenXiao = payload.isFenXiao || ''
      if (isFenXiao == 'Y' && payload.agentName) {
        const arr = payload.agentName.trim().split("-")
        agentArr.agentCode = arr[0],
        agentArr.agentName = arr[1]
      }
    }

    let matklCodeArr=[]
    let MatklCodeAll=[]
    items.forEach((item, index)=>{
      matklCodeArr.push(item.matklCode)
    })
    function uniq(array){
      let temp = []; //一个新的临时数组
      for(let i = 0; i < array.length; i++){
        if(temp.indexOf(array[i]) == -1){
          temp.push(array[i]);
        }
      }
      return temp;
    }
    MatklCodeAll=uniq(matklCodeArr)

    if(items.length){
      discountTypeName = items[0].discountTypeName

      if(items[0].discountTypeName == '组合购'){
        let combinationPurchaseList = []

        //组合购将数组里'productGroup'属性相同的对象合并成一个数组
        combinationPurchaseList = combineObjIntoAnArray(items)
        combinationPurchaseList.forEach((item,index)=>{
          let totleBuyNum = 0
          item.child.forEach((val,i)=>{
            totleBuyNum += val.quantity
          })

          combinationPurchaseList[index].isFold = true
          combinationPurchaseList[index].totleBuyNum = totleBuyNum
        })
        items = combinationPurchaseList
        isPurchaseStandard = checkCombinationPurchase( items )
      }
    }

    return {
      ...state,
      common,
      commonOrder: {
        isPackage:isPackageOrder,
        items,
        discountTypeName,
        totalNum,
        totalDeposit,
        isPurchaseStandard,
        ...balance,
        actCode,
        isFenXiao,
        agentArr,
        MatklCodeAll
      },
    }
  },
  [TAKE_ACTIVITY_SNAPPED](state, action) {

    const { payload }: any = action;
    let common: any = {};
    // 商品
    let items: any = [];
    // 商品数量
    let totalNum: number = 0;
    let balance: any = {};
    let actCode: any = ''
    let isFenXiao: any = ''
    let totalPrice = 0;
    let discountTypeName: any = ''
    let isPurchaseStandard: boolean = true; // 组合购购买产品数量是否符合标准（默认不符合标准）

    const agentArr = {
      agentName: '',
      agentCode: ''
    }
    // 基本订单信息
    if (payload && payload.code == 1) {
      common = payload
    } else {
      common = getActivityInfo(payload);
      forEach(({ id, color, img, billPrice, defaultImg, productInfoId, fwOrgId, fwOrgCode, fwOrgName, productName, specialPrice, standardPrice, priceGroupName, buyQty, makeUpTypeName, materialGroup, policyName, specialPriceVcode,
        discountTypeId,
        discountTypeName,
        custTag,
        packageCode,
        packageNum,
        rebateMoney,
        productGroupRemark,
        productGroup,
        productInfoZzprdmodel}) => {
          //总数量 套购-》根据packageNum多少套计算
        // totalNum = add(totalNum, discountTypeId == '90603' ? buyQty * packageNum : buyQty);
        totalNum = add(totalNum, buyQty);
        totalPrice = add(totalPrice, billPrice * buyQty);

        items.push({
          id,//认购记录id
          color,
          orgId: fwOrgId,
          orgCode: fwOrgCode,
          fwOrgName: fwOrgName,
          productId: productInfoId,
          productName,
          price: billPrice,
          specialPrice,
          standardPrice,
          priceGroupName,
          quantity: buyQty,
          maxQty: buyQty,
          makeUpTypeName,
          src: img ? MarketFormatImg({ img: img }) : img,
          errImg: defaultImg ? MarketFormatImg({ defaultImg: defaultImg }) : defaultImg,
          policyName,
          specialPriceVcode,
          // discountTypeId:90603,//促销方式Id
          discountTypeId,
          discountTypeName,//促销方式名称
          custTag,//商家标签
          packageCode,//套购编码
          packageNum,
          // packageNum:1,//每套多少个
          rebateMoney,//本次返利金额

          // defaultNum:buyQty/1//packageNum -> 1 初始套数
          defaultNum:buyQty/packageNum,//packageNum -> 1 初始套数
          productGroupRemark,
          productGroup,
          productInfoZzprdmodel
        });
      }, payload.activityList);
      balance = payload.balanceDTO
      balance.totalMoney = totalPrice;
      actCode = payload.actCode || ''
      isFenXiao = payload.isFenXiao || ''
      if (isFenXiao == 'Y' && payload.agentName) {
        const arr = payload.agentName.trim().split("-")
        agentArr.agentCode = arr[0],
        agentArr.agentName = arr[1]
      }

    }

    if(items.length){
      discountTypeName = items[0].discountTypeName

      if(items[0].discountTypeName == '组合购'){
        let combinationPurchaseList = []

        //组合购将数组里'productGroup'属性相同的对象合并成一个数组
        combinationPurchaseList = combineObjIntoAnArray(items)
        combinationPurchaseList.forEach((item,index)=>{
          let totleBuyNum = 0
          item.child.forEach((val,i)=>{
            totleBuyNum += val.quantity
          })

          combinationPurchaseList[index].isFold = true
          combinationPurchaseList[index].totleBuyNum = totleBuyNum
        })
        items = combinationPurchaseList
        isPurchaseStandard = checkCombinationPurchase( items )
      }
    }

    return {
      ...state,
      common,
      commonOrder: {
        items,
        totalNum,
        discountTypeName,
        isPurchaseStandard,
        ...balance,
        actCode,
        isFenXiao,
        agentArr
      },
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
      orderfilter.itemgroup.push(item)
    }, payload.productGroupMap)
    return {
      ...state,
      loading: false,
      filter: orderfilter,
    }
  },
  [GET_ORDER_LIST](state: any, action: { payload: any; }) {
    const { payload } = action
    const { orderList } = state
    let orderListNew = payload
    if (payload.currentPage && payload.currentPage !== 1) {
      orderListNew = { ...payload, orderHeaderList: orderList.orderHeaderList.concat(payload.orderHeaderList) }
    }
    orderListNew.orderHeaderList.forEach((order, index) => {

      forEach((item) => {
        if (item.img) {
          const imgs = item.img.split('/')
          item.img = formatImg({
            format: imgs[2],
            name: imgs[3],
            materialId: imgs[0],
            itemId: imgs[1]
          })
        }
        if (item.defaultImg) {
          const imgs = item.defaultImg.split('/')
          item.errImg = formatImg({
            name: imgs[imgs.length - 1]
          })
        }

      }, order.items || [])

      if(order.items.length){
        if(order.productGroupFlag == 'Y'){
          let combinationPurchaseList = []

          //组合购将数组里'productGroup'属性相同的对象合并成一个数组
          combinationPurchaseList = combineObjIntoAnArray(order.items)
          orderListNew.orderHeaderList[index].itemsChange = combinationPurchaseList
        }
      }

    })

    return {
      ...state,
      loading: false,
      orderList: orderListNew
    }
  },
  [GET_SALES_ORDER_INFO](state, action) {
    const { payload }: any = action;
    // 基本订单信息
    let common: any = {};
    // 商品
    let items: any = [];
    // 商品数量
    let totalNum: number = 0;
    let balance: any = {};
      const { balanceDTO } = payload.cartOrder;
      let totalPrice = 0;
      let totalLoadVolume = 0;
      payload.cartOrder.orgAndGroup = payload.orgAndGroup;
      common = getCommonInfo(payload);
      const { policyMap } = payload
      const policies: any = {};
      forEachObjIndexed((value, key) => {
        // 如果当前选的这个
        policies[key] = map(({ id, versionCode, policyName, standardPrice, price, discount, reduce, total, remain, canQuantity }) => ({
          id, versionCode, policyName, standardPrice, price, discount, reduce, total, remain, canQuantity,
        }), value);
      }, policyMap);
      // 这是特有的
      const delivery = {
        id: 502005,
        propertyName: '直配到分销商'
      }
      common = {
        ...common,
        delivery: delivery,
        policies
      }
      // 商品列表
      forEach(({ id, color, productId, picture, orgId, loadVolume, orgCode, productName, price, specialPrice, standardPrice, priceGroupName, quantity, makeUpTypeName, materialGroup, policyName, specialPriceVcode }) => {
        totalNum = add(totalNum, quantity);
        totalPrice = add(totalPrice, price * quantity);
        totalLoadVolume = add(totalLoadVolume, loadVolume * quantity);
        items.push({
          id,
          color,
          orgId,
          orgCode,
          productId,
          productName,
          price,
          specialPrice,
          standardPrice,
          priceGroupName,
          quantity,
          makeUpTypeName,
          src: formatImg(picture ? {
            format: '180-180',
            name: picture,
            materialId: materialGroup,
            itemId: productId,
          } : {
              name: `${materialGroup}.jpg`,
            }),
          errImg: formatImg({
            name: `${materialGroup}.jpg`,
          }),
          policyName,
          specialPriceVcode,
        });
      }, payload.cartDTOs);
      // blance
      balance = balanceDTO;
      balance.totalMoney = totalPrice;
      balance.totalLoadVolume = totalLoadVolume;
      const pop = map(({ id }: any) => id, payload.defaultPolicMap)
      const ver = []
      forEachObjIndexed((value, key) => {
        const item = {
          value,
          key
        }
        ver.push(item)
      }, pop)
      const rel = []
      forEach((item) => {
        forEach((res) => {
          if (res.key == item.productId) {
            item.versions = res.value
          }
        }, ver)
        if(item.versions) {
          rel.push(item.versions)
        } else {
          rel.push('')
        }
      }, payload.cartDTOs)
      balance.versions = join(',', rel);
    return {
      ...state,
      common,
      commonOrder: {
        orderId: payload.orderId,
        items,
        totalNum,
        ...balance,
        modelId: payload.modelId
      },
    };
  },
  [AGAIN_ORDER_COMMON](state, action) {
    const { payload }: any = action;
    // 基本订单信息
    let common: any = {};
    // 商品
    let items: any = [];
    // 商品数量
    let totalNum: number = 0;
    let balance: any = {};
    if (payload.orderId) {
      const { balanceDTO } = payload.cartOrder;
      let totalPrice = 0;
      payload.cartOrder.orgAndGroup = payload.orgAndGroup;
      common = getCommonInfo(payload);
      // 商品列表
      forEach(({ id, color, productId, picture, orgId, orgCode, productName, price, specialPrice, standardPrice, priceGroupName, quantity, makeUpTypeName, materialGroup, policyName, specialPriceVcode, stockAgeNum }) => {
        totalNum = add(totalNum, quantity);
        totalPrice = add(totalPrice, price * quantity);
        items.push({
          id,
          color,
          orgId,
          orgCode,
          productId,
          productName,
          price,
          specialPrice,
          standardPrice,
          priceGroupName,
          quantity,
          makeUpTypeName,
          src: formatImg(picture ? {
            format: '180-180',
            name: picture,
            materialId: materialGroup,
            itemId: productId,
          } : {
              name: `${materialGroup}.jpg`,
            }),
          errImg: formatImg({
            name: `${materialGroup}.jpg`,
          }),
          policyName,
          specialPriceVcode,
          stockAgeNum,
        });
      }, payload.cartDTOs);
      // blance
      balance = balanceDTO;
      balance.totalMoney = totalPrice;
      const pop = map(({ id }: any) => id, payload.defaultPolicMap)
      const ver = []
      forEachObjIndexed((value, key) => {
        const item = {
          value,
          key
        }
        ver.push(item)
      }, pop)
      const rel = []
      forEach((item) => {
        forEach((res) => {
          if (res.key == item.productId) {
            item.versions = res.value
          }
        }, ver)
        if(item.versions) {
          rel.push(item.versions)
        } else {
          rel.push('')
        }
      }, payload.cartDTOs)
      balance.versions = join(',', rel);
    }
    return {
      ...state,
      common,
      commonOrder: {
        orderId: payload.orderId,
        items,
        totalNum,
        ...balance,
      },
    };
  },
  [TAKE_ORDER_COMMON](state, action) {
    const { payload }: any = action;
    // 基本订单信息
    let common: any = {};
    // 商品
    let items: any = [];
    // 商品数量
    let totalNum: number = 0;
    let balance: any = {};
    if (payload.cartOrder) {
      const { cartMap, balanceMap } = payload.cartOrder;
      common = getCommonInfo(payload);
      // 商品列表
      forEachObjIndexed((value) => {
        forEach(({ id, color, picture, productId, orgId, orgCode, productName, price, specialPrice, standardPrice, priceGroupName, quantity, makeUpTypeName, materialGroup, policyName, specialPriceVcode,stockAgeNum }) => {
          totalNum = add(totalNum, quantity);
          items.push({
            id,
            color,
            orgId,
            orgCode,
            productId,
            productName,
            price,
            specialPrice,
            standardPrice,
            priceGroupName,
            quantity,
            makeUpTypeName,
            src: formatImg(picture ? {
              format: '180-180',
              name: picture,
              materialId: materialGroup,
              itemId: productId,
            } : {
                name: `${materialGroup}.jpg`,
              }),
            errImg: formatImg({
              name: `${materialGroup}.jpg`,
            }),
            policyName,
            specialPriceVcode,
            stockAgeNum,
          });
        }, value);
      }, cartMap);
      // 结算信息
      forEachObjIndexed((value) => {
        // 看不懂他们 PC 逻辑 默认第一个
        balance = value;
      }, balanceMap);
    }
    return {
      ...state,
      common,
      commonOrder: {
        items,
        totalNum,
        ...balance,
      },
    };
  },
  [CART_ORDER_WEEK](state, action) {
    const { payload: { list } } = action
    return {
      ...state,
      weekList: { list },
    }
  },
  //服务方式
  [GET_ORDER_SERVICE](state, action) {
    const { payload: { list } } = action
    return {
      ...state,
      serviceList: { list },
    }
  },
  [MONEY_BY_WEEK](state, action) {
    const { payload: { balance } } = action
    return {
      ...state,
      balance: { balance },
    }
  },
  [GET_WAIT_BALANCE_INFO_LIST](state, action) {
    const { payload: { dataList } } = action;
    return {
      ...state,
      waitBalanceList: dataList,
    }
  },
  [TAKE_ORDER_PROJECT](state, action) {
    const { payload }: any = action;
    // 基本订单信息
    let common: any = {};
    // 商品
    let items: any = [];
    // 选择好的商品
    let itemsSelected: any = [];
    // 商品数量
    let totalNum: number = 0;
    let balance: any = {};
    // 基本信息
    let basic: any = {};
    // 提交必要参数
    let profitParam = 0;
    let sapRebateAccountParam = 0;
    let projectApplyCodeParam = '';

    if (payload.epProjectInfo) {
      const { profit, orgId, matklId, sapRebateAccount, billToDTOs, custMarketModels = [], marketAddress, customerAddressDTOs, deliveryList, tradeType, defaultProvice, defaultCity, defaultDistrict, provices, citys, districts, epProjectInfo, balanceDTO, epInfoDetail,shareFlag,office } = payload;
      const { projectApplyCode, orgId_name, projectCode, projectName, projectPurpose_name, customerName, contractOrg_name, customerAddr, agent, customerTel, beginDate, endDate } = epProjectInfo;
      basic = { orgId_name, projectCode, projectName, projectPurpose_name, customerName, contractOrg_name, customerAddr, agent, customerTel, beginDate, endDate };
      balance = balanceDTO;
      // 提交必要参数
      profitParam = profit;
      sapRebateAccountParam = sapRebateAccount;
      projectApplyCodeParam = projectApplyCode;
      // 处理商品
      items = map(({ id, zzprdmodel, productLabel, singlePrice,loadVolume, standardPrice, buckle, amount, finishOrder, diffentPrice }) => ({
        product_id: id,
        productName: zzprdmodel,
        productLabel: productLabel,
        singlePrice,
        loadVolume,
        standardPrice,
        buckle,
        amount,
        finishOrder,
        diffentPrice,
        count: 0,
        canBuy: subtract(amount, finishOrder),
      }), epInfoDetail);
      common = getCommonInfo({
        cartOrder: {
          maxDate: endDate,
          minDate: beginDate,
          billToDTOs, custMarketModelDtos: custMarketModels, marketAddress, customerAddressDTOs,
          deliveryList, tradeType, defaultProvice, defaultCity,
          defaultDistrict, provices, citys, districts,
          orgId,
          matklId
        },
        shareFlag,
        office
      });
    }
    return {
      ...state,
      common,
      projectOrder: {
        profitParam,
        sapRebateAccountParam,
        projectApplyCodeParam,
        basic,
        itemsSelected,
        items,
        totalNum,
        ...balance,
      },
    };
  },
  [CHANGE_ORDER_PROJECT_ITEM](state, action) {
    const { projectOrder }: any = state;
    const { id, quantity }: any = action.payload;
    let quantityList: any = projectOrder.items;
    const index = findIndex(propEq('product_id', id), projectOrder.items);
    if (index >= 0) {
      const item: any = projectOrder.items[index];
      item.count = quantity;
      quantityList = update(index, item, projectOrder.items);
    }
    const itemsSelected: any = filter(({ count }) => count > 0, quantityList);
    let totalNum = 0;
    let totalPrice = 0;
    let loadVolumeAll = 0; // 全部体积
    forEach(({ count, singlePrice,loadVolume }) => {
      totalNum = add(totalNum, count);
      totalPrice = add(totalPrice, count * singlePrice);
      loadVolumeAll = add(loadVolumeAll,count * loadVolume )
    }, itemsSelected);
    const totalRebate = totalPrice * 0.01 * projectOrder.profitParam;
    return {
      ...state,
      projectOrder: {
        ...projectOrder,
        items: quantityList,
        itemsSelected,
        totalRebate,
        totalNum,
        totalPrice,
        loadVolumeAll,
      },
    };
  },
  [GET_BUY_OUT_ORDER](state, action) {
    const { payload }: any = action;
    // 基本订单信息
    let common: any = {};
    // 商品
    let items: any = [];
    // 商品数量
    let totalNum: number = 0;
    // 总商品价格
    let totalItemPrice: number = 0;
    // 初始总体积
    let initloadVolumeAll:number = 0;
    let balance: any = {};
    let orderType = '01';
    // 提交必要参数
    if (payload.salesPackage) {
      const {
        billToDTOs, custMarketModels, marketAddress,
        customerAddressDTOs, deliveryList, tradeType, defaultProvice, defaultCity,
        defaultDistrict, provices, citys, districts, balanceDTO, packageProducts, maxDate, minDate,
        orgId,matklId,shareFlag,office,
      } = payload;
      orderType = tradeType;
      balance = balanceDTO;
      // 提交必要参数
      // 处理商品
      items = map(({ id, productName, productLabel, billPriceShow, price, deduct, qty,loadVolume, errorMessage }) => {
        totalItemPrice = add(totalItemPrice, multiply(qty, billPriceShow));
        initloadVolumeAll = add(initloadVolumeAll, multiply(qty, loadVolume));
        return {
          id,
          productName,
          productLabel,
          singlePrice: billPriceShow,
          standardPrice: price,
          deduct,
          amount: qty,
          errorMessage,
        };
      }, packageProducts || []);
      common = getCommonInfo({
        cartOrder: {
          maxDate,
          minDate,
          orgId,
          matklId,
          billToDTOs, custMarketModelDtos: custMarketModels, marketAddress, customerAddressDTOs,
          deliveryList, tradeType, defaultProvice, defaultCity,
          defaultDistrict, provices, citys, districts,
        },
        shareFlag,
        office
      });
    }
    return {
      ...state,
      common,
      buyOutOrder: {
        items,
        totalItemPrice,
        initloadVolumeAll,
        totalNum,
        totalPrice: 0,
        loadVolumeAll: 0,
        tradeType: orderType,
        ...balance,
      },
    };
  },
  [CHANGE_BYU_OUT_PRICE](state, action) {
    const { count } = action.payload;
    const { buyOutOrder } = state;
    const { totalItemPrice, rebate, rebateAccount,initloadVolumeAll } = buyOutOrder;
    const totalPrice = multiply(totalItemPrice, count);
    const loadVolumeAll = multiply(initloadVolumeAll, count);
    const totalRebate = multiply(rebate, count);
    return {
      ...state,
      buyOutOrder: {
        ...buyOutOrder,
        totalRebate: rebateAccount > totalRebate ? totalRebate : rebateAccount,
        totalPrice,
        loadVolumeAll,
        totalNum: count,
      },
    };
  },
  [CHANGE_PREFERENCE_ITEM_COUNT](state, action) {
    const { preferenceOrder }: any = state;
    const { id, quantity }: any = action.payload;
    let quantityList: any = preferenceOrder.items;
    const index = findIndex(propEq('id', id), preferenceOrder.items);
    if (index >= 0) {
      const item: any = preferenceOrder.items[index];
      item.num = quantity;
      quantityList = update(index, item, preferenceOrder.items);
    }
    const itemsSelected: any = filter(({ num }) => num > 0, quantityList);
    let totalNum = 0;
    let totalPrice = 0;
    let loadVolumeAll = 0; //总体积
    forEach(({ num, billPrice,loadVolume }) => {
      totalNum = add(totalNum, num);
      totalPrice = add(totalPrice, num * billPrice);
      loadVolumeAll = add(loadVolumeAll, num * loadVolume);
    }, itemsSelected);
    return {
      ...state,
      preferenceOrder: {
        ...preferenceOrder,
        items: quantityList,
        itemsSelected,
        totalNum,
        totalPrice,
        loadVolumeAll,
      },
    };
  },
  [CHANGE_PREFERENCE_ITEM_PRICE](state, action) {
    const { preferenceOrder } = state;
    let priceItems = preferenceOrder.items;
    if (is(Array, action.payload)) {
      priceItems = map((item) => {
        const priceItem = find(propEq('id', `${item.id}`), action.payload);
        if (priceItem && priceItem.id) {
          item.standardPrice = parseFloat(priceItem.standardPrice);
          item.straightBuckle = parseFloat(priceItem.straightBuckle);
        }
        return item;
      }, priceItems);
    }
    return {
      ...state,
      preferenceOrder: {
        ...preferenceOrder,
        isGetPrice: true,
        items: priceItems,
      },
    };
  },

  [TAKE_PREFERENCE_ORDER](state, action) {
    const { payload }: any = action;
    // 基本订单信息
    let common: any = {};
    // 商品
    let items: any = [];
    // 选择好的商品
    let itemsSelected: any = [];
    // 商品数量
    let totalNum: number = 0;
    let balance: any = {};
    // 价格和数量
    let totalPrice = 0;
    // 商品总体积
    let loadVolumeAll = 0;
    // 基本信息
    let basic: any = {};
    if (payload.detail) {
      const { counts, balanceDTO, billToDTOs, marketAddress, custMarketModels, customerAddressDTOs, deliveryList, defaultCity, defaultDistrict, defaultProvice, districts, provices, citys, detailList, shareFlag, office, ids } = payload;
      const { id, fwOrgId, orgMatkl, fwOrgName, preferCode, reportCode, status, startDate, endDate, createDate } = payload.detail;
      balance = balanceDTO;
      // 基础信息
      basic = {
        id,
        fwOrgId,
        orgMatkl,
        fwOrgName,
        preferCode,
        reportCode,
        status,
        startDate,
        endDate,
        createDate,
      };
      // 商品列表
      items = map(({
        productId, productName, matklName,
        productModel, batch, count, buyCount, billPrice,loadVolume, ...rest
      }) => ({
        id: rest.id, productId, productName, matklName,
        productModel, batch, count, buyCount,
        status: rest.status, billPrice,loadVolume, num: 0,
      }), detailList);
      // 商品维度下单
      if (counts) {
        const countArry = split(',', counts);
        const idArry = split(',', ids);
        itemsSelected = items.map((item: any, index: number) => {
          let i = 0;
          forEach((idItem) => {
            if(item.id == idItem){
              item.num = countArry[i];
              totalNum = add(totalNum, item.num);
              totalPrice = add(totalPrice, item.num * item.billPrice);
              loadVolumeAll = add(loadVolumeAll,item.num * item.loadVolume)
            }
            i++;
          }, idArry);
          return item;
        });
        /*
        itemsSelected = items.map((item: any, index: number) => {
          item.num = countArry[index];
          totalNum = add(totalNum, item.num);
          totalPrice = add(totalPrice, item.num * item.billPrice);
          loadVolumeAll = add(loadVolumeAll,item.num * item.loadVolume)
          return item;
        });
        */
      }
      // 通用单下单
      common = getCommonInfo({
        cartOrder: {
          maxDate: endDate,
          orgId: fwOrgId,
          matklId: detailList[0].matklId,
          minDate: startDate,
          tradeType: '01',
          billToDTOs, custMarketModelDtos: custMarketModels, marketAddress, customerAddressDTOs,
          deliveryList, defaultProvice, defaultCity,
          defaultDistrict, provices, citys, districts,
        },
        shareFlag,
        office
      });
    }
    return {
      ...state,
      common,
      preferenceOrder: {
        basic,
        itemsSelected,
        isGetPrice: false,
        items,
        totalNum,
        totalPrice,
        loadVolumeAll,
        ...balance,
      },
    };
  },

  [GET_MY_ROUTINE_ORDER](state: any, action: { payload: any; }) {
    const { payload } = action
    const { orderList } = state
    let orderListNew = payload
    if (payload.currentPage && payload.currentPage !== 1) {
      orderListNew = { ...payload, list: orderList.list.concat(payload.list) }
    }
    return {
      ...state,
      loading: false,
      orderList: orderListNew
    }
  },

}, {
  common: {},
  commonOrder: {},
  preferenceOrder: {},
  buyOutOrder: {},
  projectOrder: {},
  orderList: {},
  filter: {},
  deliveryMethod: {},
  weekList: {},
  balance: {},
  loadVolume:{},
});
