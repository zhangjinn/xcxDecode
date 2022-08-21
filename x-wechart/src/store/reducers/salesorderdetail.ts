import { handleActions } from 'redux-actions'
import { GET_SALES_ORDER_DETAIL,NORMAL_ORDER_EDIT,RETAIL_ORDER_EDIT,GET_PURCHASE_ORDER_DETAIL,GET_PURCHASE_EXAM_INFO,GET_SALES_CIS_STOCKS } from '@/store/types/salesorderdetail'
import { forEach,forEachObjIndexed } from 'ramda'
import { RESET_BALANCE_DATA } from '../types'
import { formatImg } from '@/utils/index';
import { formatDmsImg } from '@/utils/index';


export default handleActions({
  // 订单详情
  [GET_SALES_ORDER_DETAIL](state: any, action: { payload: any; }) {
    const { payload } = action
    let orderDetail = payload
    orderDetail.data.acknowledgedTotalAmount=Number(orderDetail.data.acknowledgedTotalAmount).toFixed(2)
    const loadingCode: any = []
    const loadingOrgId: any = []
    const loadingOrgCode: any = []
    const loadingNumber: any = []
    orderDetail.data.outBoundItem.forEach(it=>{
      it.omsOrderStatus = it.omsOrderStatus.filter(it=>it.orderStatusName||it.remark)
      it.omsOrderStatus.forEach(item=>{
        if(item.orderStatusName){
          item.text = `[${item.orderStatusName}] ${item.remark}`
          if(item.orderStatus=='CREATE_FAIL'){
            item.text = item.text + item.extendCode1
          }
        }else {
          item.text = item.remark
        }
        // item.desc = item.reserveTime
        // item.desc = item.reserveTime
      })
    })
    forEach((item: any) => {
      loadingCode.push(item.productCode)
      loadingNumber.push(item.backnowledgedQty)
      loadingOrgId.push(orderDetail.data.orgId)
      loadingOrgCode.push(orderDetail.data.orgCode)
      if(item.backnowledgedPrice){
        item.backnowledgedPrice=Number(item.backnowledgedPrice).toFixed(2)
      }
      if(item.backnowledgedQty){
        item.backnowledgedQty=Number(item.backnowledgedQty).toFixed(0)
      }
      const {img, err} = formatDmsImg({model: item.model, material: item.materialGroupCode})
      item.img = img
      item.err = err
    }, orderDetail.data.salesOrderItem || [])
    const loadingInfo = {
      code: loadingCode.join(','),
      orgCode: loadingOrgId.join(','),
      orgId: loadingOrgCode.join(','),
      productNumbers: loadingNumber.join(','),
      _data: new Date().getTime()
    }
    return {
      ...state,
      loading: false,
      orderdetail: orderDetail,
      loadingInfo
    }
  },
  // 库存回调
  [GET_SALES_CIS_STOCKS](state: any, action: { payload: any; }) {
    const { payload } = action
    const { orderdetail } = state
    const { data: { salesOrderItem }} = orderdetail
    if(payload && payload.length > 0 ) {
      forEach((item: any) => {
        forEach((res: any) => {
          if(item.productCode == res.productCode) {
            res.inventory = item.inventory
          }
        },salesOrderItem)
      },payload)
    }
    return {
      ...state,
      orderdetail: {...orderdetail}
    }
  },
  // 渠道订单详情
  [NORMAL_ORDER_EDIT](state: any, action: { payload: any; }) {
    const { payload } = action

    return {
      ...state,
      loading: false,
      normalorderdetail: payload
    }
  },
  // 零售订单详情
  [RETAIL_ORDER_EDIT](state: any, action: { payload: any; }) {
    const { payload } = action

    return {
      ...state,
      loading: false,
      retailorderdetail: payload
    }
  },
  // 渠道采购订单详情
  [GET_PURCHASE_ORDER_DETAIL](state: any, action: { payload: any; }) {
      //出库数据数组格式化
    const formatArray = (resData) =>{
        const dataInfo = {};
        resData.forEach((item, index) => {
        const { documentNum } = item;
        if (!dataInfo[documentNum]) {
            dataInfo[documentNum] = {
            documentNum,
            child: []
            }
        }
        item.isActive = false
            if(index == 0){
                item.isActive = true
            }
        dataInfo[documentNum].child.push(item);
        });
        let list = Object.values(dataInfo); // list 转换成功的数据
        // 设置默认显示的c单
        list = list.map((res, index)=>{
        res.child = res.child.map((child, idx)=>{
            return child
        })
        return {
            ...res,
            ...res.child[0],
        }
        })
        return list
    };
    const { payload } = action

    let orderDetail = payload
    orderDetail.data.totalAmount=Number(orderDetail.data.totalAmount).toFixed(2)
    orderDetail.data.totalOrderedQty=Number(orderDetail.data.totalOrderedQty).toFixed(0)
    forEach((item) => {
      if(item.price){
        item.price=Number(item.price).toFixed(2)
      }
      if(item.orderedQty){
        item.orderedQty=Number(item.orderedQty).toFixed(0)
      }
    }, orderDetail.data.purchaseOrderItem || [])
    orderDetail.data.outBoundItem.forEach(it=>{
      if(it.omsOrderStatus.length>0){
        it.omsOrderStatusName = it.omsOrderStatus[0].orderStatusName
        it.reserveTime = it.omsOrderStatus[0].reserveTime
      }
      it.omsOrderStatus = it.omsOrderStatus.filter(it=>it.orderStatusName||it.remark)
      it.omsOrderStatus.forEach(item=>{
        if(item.orderStatusName){
          item.text = `[${item.orderStatusName}] ${item.remark}`
        }else {
          item.text = item.remark
        }
        // item.desc = item.reserveTime
      })
    })
    if(orderDetail.data.outBoundItem && orderDetail.data.outBoundItem.length > 0){
        orderDetail.data.outBoundItem = formatArray(orderDetail.data.outBoundItem);
    }
    return {
      ...state,
      loading: false,
      purchaseorderdetail: orderDetail
    }
  },
  //审核信息
  [GET_PURCHASE_EXAM_INFO](state: any, action: { payload: any; }) {
    const { payload }: any = action;
    /*console.log(payload)
    payload.data.examBy = "王虎成"
    payload.data.examTime = "2020-03-07 12:00:00"
    payload.data.examOpinion = "在这里输入你要审核的内容，尝试这里的文字输入超长时间是否会有影响"*/
    return {
      ...state,
      purchaseExamInfo: payload
    };

  }
}, {
  orderdetail: {},
  normalorderdetail:{},
  retailorderdetail:{},
  purchaseorderdetail:{},
  loadingInfo: {},
  purchaseExamInfo:{}
})
