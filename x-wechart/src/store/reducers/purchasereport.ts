import { handleActions } from 'redux-actions'
import {
  GET_REPORT_CUST_SALES, GET_REPORT_SUPPLY_LIST,
  GET_REPORT_MATERIAL_LIST,GET_CHANNEL_REPORT_LIST,
  GET_CHANNEL_WLZ_LIST,GET_SAN_LIU_LING_EXPERIENCE_LIST
 } from '@/store/types/purchasereport'
import { map, divide, forEachObjIndexed, reverse } from 'ramda';

export default handleActions({
  // 基础库
  [GET_CHANNEL_WLZ_LIST](state: any, action: { payload: any }) {
    const { payload } = action
    const ItemgroupList: any = []
    const { data } = payload
    const all = {
      name: '全部物料组',
      code: '',
    }
    ItemgroupList.push(all)
    forEachObjIndexed((value, key) => {
      forEachObjIndexed((value, key) => {
        let item = {
          name: value,
          code: key,
        }
        ItemgroupList.push(item)
      }, value)
    }, data)
    return {
      ...state,
      ItemgroupList
    }
  },
  // 渠道采购报表
  [GET_CHANNEL_REPORT_LIST](state: any, action: { payload: any }) {
    const { payload } = action
    const { report: { currentMonth, previousMonth} } = payload

    const newPreviousMonth = reverse(previousMonth)
    const DateStr = newPreviousMonth.map((item: any) => item.date.slice(2, 4) + '/' + item.date.slice(5, 7))
    const amount: any = map((res: any) => divide(res.amount, 10000).toFixed(2), newPreviousMonth)
    const qty: any = map((res: any) => res.qty, newPreviousMonth)
    const channelData = {
      DateStr,
      amount,
      qty,
      _data: new Date().getTime()
    }
    return {
      ...state,
      currentMonth,
      channelData,
    }
  },
  [GET_REPORT_SUPPLY_LIST](state: any, action: { payload: any }) {
    const { payload } = action
    const { orgList } = payload
    const item = {
      code: '',
      name: '全部供应商',
      desc: null
    }
    orgList.unshift(item)
    return {
      ...state,
      supplierList: orgList
    }
  },
  [GET_REPORT_MATERIAL_LIST](state: any, action: { payload: any }) {
    const { payload } = action
    const { matklList } = payload
    const item = {
      code: '',
      name: '全部物料组',
      desc: null
    }
    matklList.unshift(item)
    return {
      ...state,
      matklList
    }
  },
  // 采购报表
  [GET_REPORT_CUST_SALES](state: any, action: { payload: any }) {
    const { payload } = action
    const { nowData, lastData, tb, orderRate } = payload
    const List = payload.list
    let arr = [...List]
    let dates = arr.map(obj => { return obj.dateStr })
    let DateStr = dates.map(item => item.slice(2, 4) + '/' + item.slice(4, 6))
    const amount: any = map((res: any) => divide(res.realPrice, 10000).toFixed(4), List)
    const num: any = map((res: any) => res.realNum, List)
    const reportSale = {
      List,
      nowData,
      amount,
      num,
      lastData,
      DateStr,
      tb,
      orderRate,
      _data: new Date().getTime()
    }

    return {
      ...state,
      reportSale
    }
  },
  // 360体验报表列表
  [GET_SAN_LIU_LING_EXPERIENCE_LIST](state, action) {
    const { payload } = action
    let list = payload.data || {}
    let newList = {
      ...list,
      netIncrease: {},
      onlineSalesRate: {},
      onlineStoreOutput: {},
      salesStructure: {},
      machinesProportion: {},
      incrementalBusiness: {},
    }
    if(list.evaluationOfIndividualFunctions){
      list.evaluationOfIndividualFunctions.forEach((item)=>{
        item.weightNum = parseFloat(item.weight)
        let functionName = item.functionName.replace(/\s*/g,"");
        if(functionName === '分销网络净增'){
          newList.netIncrease = item
        }
        if(functionName === '分销网络动销率'){
          newList.onlineSalesRate = item
        }
        if(functionName === '分销网络单店产出'){
          newList.onlineStoreOutput = item
        }
        if(functionName === '销售结构'){
          newList.salesStructure = item
        }
        if(functionName === '专供机占比'){
          newList.machinesProportion = item
        }
        if(functionName === '增量业务(前置渠道)'){
          newList.incrementalBusiness = item
        }
      })
    }

    return {
      ...state,
      sanLiuLingExperienceList: newList
    }
  },
}, {
  reportSale: {},
  supplierList: {},
  matklList: {},
  ItemgroupList: {},
  currentMonth: {},
  channelData: {},
  sanLiuLingExperienceList:{}
})
