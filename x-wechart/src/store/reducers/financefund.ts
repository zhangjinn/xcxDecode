import { handleActions } from 'redux-actions';
import { FINANCE_POST_RS_FT_SHEET_LIST, RS_FT_SHEET_LIST} from '@/store/types/financefund';
import { FINANCE_POST_RS_FT_SHEET_DETAIL, FINANCE_POST_RS_FT_SHEET_THREE, FINANCE_POST_RS_FT_INVOICE_LIST, FINANCE_POST_RS_FT_NO_INVOICE_LIST, FINANCE_POST_RS_FT_INCOME_LIST, FINANCE_POST_RS_FT_NO_REFUND_LIST, RESET_RS_FT_LIST,RS_OC_FT_SHEET_BY_ROWID } from '@/store/types/financefund';

export default handleActions({
  /**
  * @param state
  * @param action
  */
  [FINANCE_POST_RS_FT_SHEET_LIST](state: any, action: { payload: any; }) {
    const { payload } = action
    const { fundList } = state
    let fundListNew = payload

    let NewList
    if (fundList.rows && fundList.rows.length > 0) {
      NewList = { ...payload, rows: fundList.rows.concat(payload.rows) }
    } else {
      NewList = fundListNew
    }

    return {
      ...state,
      loading: false,
      fundList: NewList
    }
  },
  [RS_FT_SHEET_LIST](state, action) {
    return {
      ...state,
      fundList: [],
    }
  },
  [FINANCE_POST_RS_FT_SHEET_DETAIL](state: any, action: { payload: any; }) {
    const { payload } = action
    // 数据处理
    let Amount=payload.rsFtSheet.arBalance+payload.rsFtSheet.sniAmt-payload.rsFtSheet.rnrAmt
    let Invoice=payload.rsFtSheet.invoiceDiffDebit-payload.rsFtSheet.invoiceDiffCredit
    let NotInvoice =payload.rsFtSheet.incomeDiffDebit-payload.rsFtSheet.incomeDiffCredit
    let Delivery =payload.rsFtSheet.sniDebit-payload.rsFtSheet.sniCredit
    let Returnvariance=payload.rsFtSheet.rnrDebit-payload.rsFtSheet.rnrCredit
    let arBalance=payload.rsFtSheet.arBalance
    let sniAmt=payload.rsFtSheet.sniAmt
    let rnrAmt=payload.rsFtSheet.rnrAmt
    let diffAmt=payload.rsFtSheet.diffAmt
    
     payload.rsFtSheet.amount=Amount.toFixed(2)
     payload.rsFtSheet.invoice=Invoice.toFixed(2)
     payload.rsFtSheet.notInvoice=NotInvoice.toFixed(2)
     payload.rsFtSheet.delivery=Delivery.toFixed(2)
     payload.rsFtSheet.returnvariance=Returnvariance.toFixed(2)
     payload.rsFtSheet.arBalance=arBalance.toFixed(2)
     payload.rsFtSheet.sniAmt=sniAmt.toFixed(2)
     payload.rsFtSheet.rnrAmt=rnrAmt.toFixed(2)
     payload.rsFtSheet.diffAmt=diffAmt.toFixed(2)
    return {
      ...state,
      loading: false,
      fundDetail: payload.rsFtSheet,
    
    }
  },
  [FINANCE_POST_RS_FT_SHEET_THREE](state: any, action: { payload: any; }) {
    const { payload } = action
    const { threecolumn } = state
    let ListNew = payload
    let NewList
    if (payload.page.pageSize !== 1 && threecolumn.rows && threecolumn.rows.length > 0) {
      NewList = { ...payload, rows: threecolumn.rows.concat(payload.rows) }
    } else {
      NewList = ListNew
    }

    return {
      ...state,
      loading: false,
      threecolumn: NewList
    }
  },
  [FINANCE_POST_RS_FT_INVOICE_LIST](state: any, action: { payload: any; }) {
    const { payload } = action

    const { list } = state
    let ListNew = payload

    let NewList
    if (list.rows && list.rows.length > 0) {
      NewList = { ...payload, rows: list.rows.concat(payload.rows) }
    } else {
      NewList = ListNew
    }

    return {
      ...state,
      loading: false,
      list: NewList
    }
  },
  [FINANCE_POST_RS_FT_NO_INVOICE_LIST](state: any, action: { payload: any; }) {
    const { payload } = action

    const { list } = state
    let ListNew = payload

    let NewList
    if (list.rows && list.rows.length > 0) {
      NewList = { ...payload, rows: list.rows.concat(payload.rows) }
    } else {
      NewList = ListNew
    }

    return {
      ...state,
      loading: false,
      list: NewList
    }
  },
  [FINANCE_POST_RS_FT_INCOME_LIST](state: any, action: { payload: any; }) {
    const { payload } = action

    const { list } = state
    let ListNew = payload

    let NewList
    if (list.rows && list.rows.length > 0) {
      NewList = { ...payload, rows: list.rows.concat(payload.rows) }
    } else {
      NewList = ListNew
    }

    return {
      ...state,
      loading: false,
      list: NewList
    }
  },
  [FINANCE_POST_RS_FT_NO_REFUND_LIST](state: any, action: { payload: any; }) {
    const { payload } = action

    const { list } = state
    let ListNew = payload

    let NewList
    if (list.rows && list.rows.length > 0) {
      NewList = { ...payload, rows: list.rows.concat(payload.rows) }
    } else {
      NewList = ListNew
    }

    return {
      ...state,
      loading: false,
      list: NewList
    }
  },
  [RESET_RS_FT_LIST](state: any, action: { payload: any; }) {
    const { payload } = action
    return {
      ...state,
      loading: false,
      list: payload
    }
  },
  [RS_OC_FT_SHEET_BY_ROWID](state,action){
    const { payload } = action
    //如果返回值为空时需要默认数据
    // if (payload.rows==''){
    //   payload.rows={arBalance:0.00,rnrAmt:0.00,sniAmt:0.00,diffAmt:0.00,invoiceDiffDebit:0.00,invoiceDiffCredit:0.00,sniDebit:0.00,sniCredit:0.00,adjustBalance:0.00}
    // }
    // 数据处理
    let Amount=payload.rows.arBalance-payload.rows.rnrAmt+payload.rows.sniAmt
    let NotInvoice =payload.rows.invoiceDiffDebit-payload.rows.invoiceDiffCredit
    let NotDelivery=payload.rows.sniDebit-payload.rows.sniCredit
    let diffAmt=payload.rows.diffAmt
    let adjustBalance=payload.rows.adjustBalance
    let arBalance=payload.rows.arBalance
    let sniAmt=payload.rows.sniAmt
    let rnrAmt=payload.rows.rnrAmt
    payload.rows.amount=Amount.toFixed(2)
    payload.rows.notInvoice=NotInvoice.toFixed(2)
    payload.rows.notDelivery=NotDelivery.toFixed(2)
    payload.rows.diffAmt=diffAmt.toFixed(2)
    payload.rows.adjustBalance=adjustBalance.toFixed(2)
    payload.rows.arBalance=arBalance.toFixed(2)
    payload.rows.sniAmt=sniAmt.toFixed(2)
    payload.rows.rnrAmt=rnrAmt.toFixed(2)
  
    return {
      ...state,
      loading: false,
    fundCustom: payload
    }
  }
}, {
  fundList: {},
 
  fundDetail: {},
  threecolumn: {},
  list: {},
  fundCustom:{}
},
);