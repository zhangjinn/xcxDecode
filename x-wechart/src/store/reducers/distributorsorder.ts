import { handleActions } from 'redux-actions';
import { GET_CART_GOODS_LIST_INFO, SET_DISTRIBUTORS_ORDER,GET_DMS_STOCK_ID, GET_DMS_SHOP_ADDRESS, GET_DMS_PEOPLE_PHONE, SET_CIS_DISTRIBUTORS_ORDER, GET_SYS_CONFIG } from '@/store/types/distributorsorder';
import {add, forEach, multiply} from 'ramda';
import {combineObjIntoAnArray, checkCombinationPurchase, combinationPurchaseNumberSets} from '@/utils/index';

export default handleActions({
  [GET_CART_GOODS_LIST_INFO](state, action) {
    const { payload } = action
    if (payload && payload.purchaseOrderItem.length > 0) {
      let goodsAccount = 0
      let goodsNumber = 0
      const productCodes = []
      let discountTypeName = ''
      let isPurchaseStandard = true; // 组合购购买产品数量是否符合标准（默认不符合标准）

      forEach((item) => {
        if(item.discountTypeName == '组合购'){
          goodsNumber= add(goodsNumber, item.buyQty); // 组合购购买产品总数
          goodsAccount = add(goodsAccount, item.price*item.buyQty); // 组合购》认购》定金总和
        }else{
          goodsAccount += multiply(item.price, item.orderedQty)
          goodsNumber += parseInt(item.orderedQty)
        }

        productCodes.push(item.productCode)
        const dms = {
          key: '',
          value: '请选择库存状态'
        }
        item.selectDms = dms
      }, payload.purchaseOrderItem)

      payload.number = goodsAccount.toFixed(2)
      payload.account = goodsNumber
      payload.productCodes = productCodes
      payload.productCodes._time = new Date()

      discountTypeName = payload.purchaseOrderItem[0].discountTypeName
      if(payload.purchaseOrderItem[0].discountTypeName == '组合购'){

        let combinationPurchaseList = []
        //
        //组合购将数组里'productGroup'属性相同的对象合并成一个数组
        combinationPurchaseList = combineObjIntoAnArray( payload.purchaseOrderItem )

        combinationPurchaseList.forEach((item,index)=>{
          let totleBuyNum = 0
          item.child.forEach((val,i)=>{
            totleBuyNum += val.quantity
            val.buyNum = val.quantity
           })

          combinationPurchaseList[index].isFold = true
          combinationPurchaseList[index].totleBuyNum = totleBuyNum
        })

        payload.purchaseOrderItem = combinationPurchaseList
        isPurchaseStandard = checkCombinationPurchase( payload.purchaseOrderItem )
      }

      payload.discountTypeName = discountTypeName
      payload.isPurchaseStandard = isPurchaseStandard
    }

    return {
      ...state,
      cartGoodInfo: payload
    };
  },
  // dms 库存状态
  [GET_DMS_STOCK_ID](state, action) {
    const { payload } = action
    const { invInfo } = payload
    const { cartGoodInfo } = state
    forEach((item)=>{
      forEach((res) => {
        if(res.productCode == item.productCode) {
          const DmsinvStatus = []
          forEach((stick)=> {
            const item = {
              key: stick.invStatusId,
              value: stick.invStatus
            }
            DmsinvStatus.push(item)
          },item.invStatus)
          res.invStatus = DmsinvStatus
        }
      },cartGoodInfo.purchaseOrderItem)
    },invInfo )
    return {
      ...state,
    };
  },
  [GET_DMS_SHOP_ADDRESS](state, action) {
    const { payload: { list } } = action
    const addressList: any = []

    //渠道采购-收货地址增加-取消选择项
    let nullWare = {
      value: "请选择",
      key: 0
    }
    addressList.push(nullWare)

    if(list && list.length > 0) {
      forEach((item) => {
        const add : any= {
          value: item.address,
          key: item.id,
          regionStatus: item.regionStatus,
        }
        addressList.push(add)
      }, list)
    }
    return {
      ...state,
      shippingAddress: addressList
    };
  },
  [GET_DMS_PEOPLE_PHONE](state, action) {
    const { payload } = action
    const { phone } = payload
    const p = phone.replace('\u202d', '').replace('\u202c', '')
    const item = {
      ...payload,
      _data: new Date().getTime(),
      phone: p
    }
    return {
      ...state,
      connect: item
    };
  },
  [SET_DISTRIBUTORS_ORDER](state, action) {

    return {
      ...state,
    };
  },
  [SET_CIS_DISTRIBUTORS_ORDER](state, action) {

    return {
      ...state,
    };
  },
  [GET_SYS_CONFIG](state, action) {

    return {
      ...state,
    };
  },
}, {
  cartGoodInfo: [],
  shippingAddress: [],
  connect: {}
})
