import { handleActions } from 'redux-actions'
import {
  GET_NEW_RETURN_ORDER_INFO, RESET_NEW_RETURN_ORDER_INFO,
  GET_CONFIRMATION_INBOUND, GET_NEW_RETURN_ORDER_CHANNEL_INFO
} from '../types/returnentry'
import { forEach } from 'ramda'
export default handleActions({
  [GET_NEW_RETURN_ORDER_INFO](state, action) {
    const { payload } = action
    const { data } = payload
    const { salesOrderItem } = data
    forEach((res: any) => {
      res.relreturnQty = parseFloat(res.returnQty).toFixed(0),
      res.returnQty = parseFloat(res.returnQty).toFixed(0),
      //处理成数组  组件中需要添加
      res.stock = [{
        itemId: res.itemId,
        invStatusId: res.invStatusId,
        invStatusName: res.invStatusName,
        relreturnQty: parseFloat(res.returnQty).toFixed(0),
        returnQty: parseFloat(res.returnQty).toFixed(0),
        bprice: res.bprice,
        warehouse: '',
        warehouseId: '',
        batch: '请选择批次',
        batchId: '',
        amount: parseFloat(res.returnQty).toFixed(2) * res.bprice
      }]
    }, salesOrderItem)
    return {
      ...state,
      returnInfo: data
    }
  },
  [RESET_NEW_RETURN_ORDER_INFO](state, action) {
    return {
      ...state,
    }
  },
  // 确认退货入库
  [GET_CONFIRMATION_INBOUND](state, action) {
    const { payload } = action
    return {
      ...state,
    }
  },
  [GET_NEW_RETURN_ORDER_CHANNEL_INFO](state, action) {
    const { payload } = action
    const { data } = payload
    forEach((res: any) => {
      res.showPrice = '￥' + res.price
      res.showAmount = '￥' + res.amount
    }, data.items)
    return {
      ...state,
      channelReturnInfo: data
    }
  },
}, {
  returnInfo: {},
  channelReturnInfo: {}
})
