import { handleActions } from 'redux-actions'
import { formatDate } from '@/utils/index';
import { map, forEach, forEachObjIndexed, reverse, mapObjIndexed, divide, clone } from 'ramda';
import {
  GET_SALES_CATEGORY_REPORT, GET_SALES_STATS_REPORT,
  GET_BASE_DATA_REPORT, GET_MATERIAL_GROUP_REPORT,
  GET_SALES_CURR_MONTH_REPORT, GET_SALES_RANK_DISTRIBUTOR_REPORT,
  GET_SALES_RANK_STORE_REPORT
} from '../types/salesreport';

export default handleActions({
  [GET_SALES_RANK_DISTRIBUTOR_REPORT](state, action) {
    const { payload } = action;
    const { report } = payload
    let itemReport = clone(report)
    if (itemReport.length < 10) {
      for (let i = itemReport.length;i < 5; i++ ) {
        const item = {
          dealerName: '',
          rank: '',
          salesAmount: '',
          salesQty: ''
        }
        itemReport.push(item)
      }
    }
    itemReport = reverse(itemReport)
    const ranging: any = (mapObjIndexed((_value, key, _obj) => `第${ parseInt(key) + 1 }名`, itemReport))
    const amount: any = map((res: any) => divide(res.salesAmount, 10000).toFixed(2), itemReport)
    const qty: any = map((res: any) => res.salesQty, itemReport)
    const TopFxs = {
      ranging,
      amount,
      qty,
      _data: new Date().getTime()
    }
    return {
      ...state,
      rankDistributor: report,
      TopFxs
    };
  },
  [GET_SALES_RANK_STORE_REPORT](state, action) {
    const { payload } = action;
    const { report } = payload
    let itemReport = clone(report)
    if (itemReport.length < 10) {
      for (let i = itemReport.length;i < 5; i++ ) {
        const item = {
          storeName: '',
          rank: '',
          salesAmount: '',
          salesQty: ''
        }
        itemReport.push(item)
      }
    }
    itemReport = reverse(itemReport)
    const ranging: any = (mapObjIndexed((_value, key, _obj) => (`第${ parseInt(key) + 1 }名`).toString(), itemReport))
    const amount: any = map((res: any) => divide(res.salesAmount, 10000).toFixed(2), itemReport)
    const qty: any = map((res: any) => res.salesQty, itemReport)
    const TopMd = {
      ranging,
      amount,
      qty,
      _data: new Date().getTime()
    }
    return {
      ...state,
      rankStore: report,
      TopMd
    };
  },
  [GET_SALES_CURR_MONTH_REPORT](state, action) {
    const { payload } = action;
    const { report } = payload
    const date: any = reverse(map((res) => formatDate(res.date, 'M.D'), report))
    const totalAmount: any = reverse(map((res) => divide(res.totalAmount, 10000).toFixed(2), report))
    const normalAmount: any = reverse(map((res) => divide(res.normalAmount, 10000).toFixed(2), report))
    const retailAmount: any = reverse(map((res) => divide(res.retailAmount, 10000).toFixed(2), report))
    const totalQty: any = reverse(map((res) => res.totalQty, report))
    const normalQty: any = reverse(map((res) => res.normalQty, report))
    const retailQty: any = reverse(map((res) => res.retailQty, report))
    const firstFigure = {
      date,
      totalAmount,
      normalAmount,
      retailAmount,
      _data: new Date().getTime()
    }
    const secondFigure = {
      date,
      totalQty,
      normalQty,
      retailQty,
      _data: new Date().getTime()
    }
    return {
      ...state,
      firstFigure,
      secondFigure
    };
  },
  [GET_BASE_DATA_REPORT](state: any, action: { payload: any; }) {
    const { payload } = action
    const { type } = payload
    switch (type) {
      case 'wlz':
        const ItemgroupList: any = []
        const { data } = payload
        const all = {
          value: '全部',
          key: '',
          isSelect: false,
        }
        ItemgroupList.push(all)
        forEachObjIndexed((value) => {
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
      case 'gys':
        let SuppliersList: any = []
        const { data } = payload
        forEachObjIndexed((value) => {
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
        const all = {
          value: '全部供应商',
          key: ''
        }
        SuppliersList.unshift(all)
        return {
          ...state,
          SuppliersList
        }
      default:
        return {
          ...state,
        }
    }
  },
  [GET_MATERIAL_GROUP_REPORT](state, action) {
    const { payload } = action;
    const { materialGroup } = payload
    const itemGroup: any = []
    forEachObjIndexed((value, key) => {
      const item = {
        value,
        key
      }
      itemGroup.push(item)
    }, materialGroup)
    const all = {
      value: '全部物料组',
      key: ''
    }
    itemGroup.unshift(all)
    return {
      ...state,
      itemGroup
    };
  },
  [GET_SALES_STATS_REPORT](state, action) {
    const { payload } = action;
    const { report } = payload
    return {
      ...state,
      salesReport: report
    };
  },
  [GET_SALES_CATEGORY_REPORT](state, action) {
    const { payload } = action;
    const { report } = payload
    const series: any = []
    forEach((res: any) => {
      const item = {
        name: res.categoryName,
        data: res.amount.toString().indexOf('-') !== -1 ? '0' : res.amount,
        color: res.color,
        scale: res.scale,
        stroke: false,
      }
      series.push(item)
    }, report)
    const inventoryReport = {
      series
    }
    return {
      ...state,
      inventoryReport
    };
  },
}, {
  inventoryReport: [],
  SuppliersList: {},
  ItemgroupList: {},
  itemGroup: {},
  salesReport: {},
  firstFigure: [],
  secondFigure: [],
  rankDistributor: {},
  rankStore: {},
  TopFxs: {},
  TopMd: {}
})
