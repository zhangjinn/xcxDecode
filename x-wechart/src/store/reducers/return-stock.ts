import { handleActions } from 'redux-actions'
import { ORDER_RETURN_STOCK,GET_RETURN_SUPPLIER } from '@/store/types/return-stock'


export default handleActions({
  [GET_RETURN_SUPPLIER] (state, action) {
    const { payload } = action
    payload.supplier.map((res) => {
      res.value = res.fullName
      res.key = res.supplierCode
    })
    return {
      ...state,
      orgList: payload.supplier
    }
  },
  [ORDER_RETURN_STOCK] (state, action) {
    const { payload } = action
    const { key, stock} = payload
    const { returnOrderList } =  state
    const newItem = {
      all_price: "",
      return_number: "",
      return_price: "",
      good_name: "",
      stock_type: stock,
    }
    returnOrderList[+key] = newItem
    return {
      ...state,
      returnOrderList: {
        ...returnOrderList
      }
    }
  },
}, {
  loading: false,
  returnOrderList: [{
  }]
})
