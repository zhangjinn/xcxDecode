/*
 * @Description:
 * @Version: 2.0
 * @Autor: sqk
 * @Date: 2020-08-14 08:54:20
 * @LastEditors: sqk
 * @LastEditTime: 2020-08-14 16:39:53
 */
import { handleActions } from 'redux-actions'
import { GET_ORDER_DETAIL,RESET_ORDER_DETAIL, GET_CANCEL_LIST, GET_QUERY_CIS_ORDER_STATUS_INFO_MOBILE } from '@/store/types/order-detail'
import { forEachObjIndexed } from 'ramda'
import { RESET_BALANCE_DATA } from '../types'
import {checkCombinationPurchase, combineObjIntoAnArray, formatImg} from '@/utils/index';


export default handleActions({
  // 重置订单详情
  [RESET_ORDER_DETAIL](state: any, action: { payload: any; }) {
    return {
      ...state,
      orderdetail: []
    }
  },
  // 订单详情
  [GET_ORDER_DETAIL](state: any, action: { payload: any; }) {
    const { payload } = action
    let isPurchaseStandard: boolean = true; // 组合购购买产品数量是否符合标准（默认不符合标准）
    if(payload && payload.erpList && payload.erpList.length) {
      payload.erpList.forEach(erpOrder => {
        let logisticsStatus = payload.logisticsStatus[erpOrder.id]
        if(logisticsStatus && logisticsStatus.length) {
          erpOrder.logisticsStatus = logisticsStatus.map(log => {
            return {
              text: '['+ log.statusName + ']' + ' ' + (log.remark ? log.remark : ''),
              desc: log.statusDate,
            }
          })
        }
      })
    }
    if(payload.erpList[0]) {
      payload.erpList[0].active = true
    }
    payload.nowgoods = payload.erpList[0]
    payload.nowLogisticsStatus = payload.nowgoods && payload.nowgoods.length ? payload.logisticsStatus[payload.nowgoods.id] : null

    payload.orderLines.forEach(item => {
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

      if(payload.orderHeader.productGroupFlag == 'Y'){ // 组合购-组合购标识，Y组合购，N不是
        item.isChecked = false
        item.textQty = item.qty // 原始产品数量
        item.qty = item.qty-item.cancelQty // 可取消产品数量
        item.maxQty = item.qty // 本次最大可取消产品数量
      }
    })


    if(payload.orderLines.length){
      if(payload.orderHeader.productGroupFlag == 'Y'){
        let combinationPurchaseList = []

        //组合购将数组里'productGroup'属性相同的对象合并成一个数组
        combinationPurchaseList = combineObjIntoAnArray(payload.orderLines)

        combinationPurchaseList.forEach((item,index)=>{
          let totleBuyNum = 0
          item.child.forEach((val,i)=>{
            totleBuyNum += val.qty
          })
          combinationPurchaseList[index].totleBuyNum = totleBuyNum

        })
        payload.orderLines = combinationPurchaseList
        payload.isPurchaseStandard = false
      }
    }
    return {
      ...state,
      loading: false,
      orderdetail: payload
    }
  },

  // 取消原因
  [GET_CANCEL_LIST](state, action) {
    const { payload } = action;
    return {
      ...state,
      cancelReasonList: payload,
    };
  },

  // 获取订单流程状态
  [GET_QUERY_CIS_ORDER_STATUS_INFO_MOBILE](state, action) {
    const { payload } = action;
    return {
      ...state,
      cisOrderStatusInfoMobile: payload,
    };
  },



}, {
  orderdetail: {},
  cancelReasonList:[],
  cisOrderStatusInfoMobile:{},
})
