import { handleActions } from 'redux-actions';
import {
  GET_ACTIVITY_LIST,
  RESET_ACTIVITY_LIST,
  GET_ACTIVITY_STATUS,
  PAGING_ACTIVITY_RESULT,
  RESET_ACTIVITY_IMG,
  GET_MARKETING_ACTIVITY_LIST,
  GET_MARKETING_ACTIVITY_FILTER,
  RESET_MARKETING_ACTIVITY_LIST,
  GET_MARKETING_ACTIVITY_DETAIL,
  GET_MARKETING_ACTIVITY_DISTRIBUTOR
} from '@/store/types/activityare';
import { MarketFormatImg, resetInfo, filterGetPriceOrStock, formatDate, combineObjIntoAnArray, combineObjIntoAnArrayTwo, combinationPurchaseNumberSets } from '@/utils/index';
import { forEachObjIndexed, concat, divide } from 'ramda'

export default handleActions({
  // 获取活动状态
  [GET_ACTIVITY_STATUS](state, action) {
    const { ActivityList } = state
    const { payload } = action
    ActivityList.forEach(element => {

      element.productDtoList.forEach((res) => {
        if (payload && payload.list && payload.list.length > 0) {
          payload.list.forEach((item) => {
            item.progress = (divide(parseInt(item.purchaseQty),parseInt(item.qty)) * 100).toFixed(2)
            if (item.progress < 10 && item.progress > 0 ) {
              item.unprogress = 10
            } else if (item.progress > 10 || item.progress == 10) {
              item.unprogress = item.progress
            } else {
              item.unprogress = 0.00
            }
            let nowMaxnumber = 0
            const remainingQuantity = parseInt(item.qty) - parseInt(item.purchaseQty)
            const merchantLimitPurchaseStake = parseInt(item.purchaseLimitQty) - parseInt(item.custPurchaseQty)
            if (remainingQuantity < merchantLimitPurchaseStake ) {
              nowMaxnumber = remainingQuantity
            } else {
              nowMaxnumber = merchantLimitPurchaseStake
            }
            item.nowMaxnumber = nowMaxnumber
            if (item.id == res.id) {
              res.activityStatus = item
            }
          })
        }
      })


      // 套购、组合购产品组根据'packageCode'字段分组
      let groups={};
      if(element.discountTypeId=='90603'||element.discountTypeId=='90604' || element.discountTypeId=='90605'){
        element.productDtoList.forEach((res) => {
          let value=res['packageCode'];
          groups[value]=groups[value]||[];
          groups[value].push(res);
        })
      }

      element.setPurchaseNumber=Object.keys(groups)

      if(element.discountTypeId=='90605'){
        element.setPurchaseNumber.forEach((item)=>{

          //组合购将数组里'productGroup'属性相同的对象合并成一个数组
          groups[item] = combineObjIntoAnArray(groups[item])

        })
      }
      element.setPurchaseList=groups
    });
    return {
      ...state,
      ActivityList: [...ActivityList],
    }
  },
  [RESET_ACTIVITY_IMG](state, action) {
    const { ActivityList } = state
    const { payload } = action
    ActivityList.forEach(element => {
      element.productDtoList.forEach((res) => {
        if (payload) {
          const { flag, src } = payload
          if (res.id == flag) {
            res.img = src
          }
        }
      })
    });
    return {
      ...state,
      ActivityList: [...ActivityList],
    }
  },
  [RESET_ACTIVITY_LIST](state, action) {
    return {
      ...state,
      listId: [],
      ActivityList: [],
    }
  },
  [GET_ACTIVITY_LIST](state, action) {
    const { payload } = action
    const { ActivityList } = state
    var timestamp = Date.parse(new Date());
    const { list, totalPages } = payload
    let listId = []

    list.forEach((element) => {
      let isShow = false
      let time
      let timestatus = 1  // 1 未开始 2 进行中 3 已结束
      if (element.productDtoList.length > 3) {
        isShow = true
      }
      element.isShow = isShow
      element.number = element.productDtoList.length

      element.productDtoList.forEach((res) => {
        if(res.img){
          res.img = MarketFormatImg({ img: res.img })
        }
        if(res.defaultImg){
          res.errImg = MarketFormatImg({ defaultImg: res.defaultImg })
        }
        listId.push(res.id)
      })

      // 套购、组合购产品组根据'packageCode'字段分组
      let groups={};
      if(element.discountTypeId=='90603'||element.discountTypeId=='90604' || element.discountTypeId=='90605'){
        element.productDtoList.forEach((res) => {
          let value=res['packageCode'];
          groups[value]=groups[value]||[];
          groups[value].push(res);
        })
      }

      element.setPurchaseNumber=Object.keys(groups)

      if(element.discountTypeId=='90605'){
        element.setPurchaseNumber.forEach((item)=>{

          //组合购将数组里'productGroup'属性相同的对象合并成一个数组
          groups[item] = combineObjIntoAnArray(groups[item])

        })
      }
      element.setPurchaseList=groups

      // 时间判断逻辑
      time = timestamp - element.startDate
      if (time > 0) {
        time = element.endDate - timestamp
        timestatus = 2
        if (time < 0) {
          let startDate = formatDate(element.startDate,"Y.M.D")
          let endDate = formatDate(element.endDate,"Y.M.D")
          time = startDate + '-' + endDate
          timestatus = 3
        }
      } else if (time < 0) {
        time = element.startDate - timestamp
      }
      const timeData = {
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
      }
      element.time = time
      element.timestatus = timestatus
      element.timeData = timeData
    });

    let NewList
    if (ActivityList && ActivityList.length > 0) {
      NewList = concat(ActivityList, list)
    } else {
      NewList = list
    }

    return {
      ...state,
      ActivityList: NewList,
      listId: listId.join(','),
      totalPages
    }
  },
  [PAGING_ACTIVITY_RESULT] (state, action) {
    const { payload } = action
    const { totalRows, list, currentPage } = payload;
    (list || []).forEach((item: { actPro: { img: string, defaultImg: string}}) => {
      item.actPro.img = MarketFormatImg({ img: item.actPro.img, defaultImg: item.actPro.defaultImg })
      item.actPro.defaultImg = MarketFormatImg({ img: '', defaultImg: item.actPro.defaultImg })
      if(item.slaveList) {
        (item.slaveList).forEach((ListItem: { actPro: { img: string, defaultImg: string}}) => {
          ListItem.actPro.img = MarketFormatImg({ img: ListItem.actPro.img, defaultImg: ListItem.actPro.defaultImg })
          ListItem.actPro.defaultImg = MarketFormatImg({ img: '', defaultImg: ListItem.actPro.defaultImg })
        })
      }
    });

    list.forEach((it, idx)=>{
      const date = new Date(it.transferExpireDateDesc).getTime()
      const now = new Date().getTime()
      // 已转单和部分转单状态下不显示已过期标志
      if(date<=now && (it.transFlag != '1' && it.transFlag != '11')){
        it.disabledSubmit = true
      }else{
        it.disabledSubmit = false
      }

      // 是否过期标志
      it.isExpired = false
      if(date<=now){
        it.isExpired = true
      }

      if(it.discountTypeName=='组合购'){
        it.slaveList = combineObjIntoAnArrayTwo(it.slaveList)

        const {setsNumber,orderNumber} = combinationPurchaseNumberSets(it.slaveList)
        it.setsNumber = setsNumber  // 组合购认购套数
        it.orderNumber = orderNumber// 组合购下单套数
      }

    })

    if (currentPage === 1) {
      return {
        ...state,
        pagingActivityResult: {
          total: totalRows,
          list: list || []
        }
      }
    } else {
      const { pagingActivityResult } = state
      const result = pagingActivityResult.list.concat(list || [])
      return {
        ...state,
        pagingActivityResult: {
          total: totalRows,
          list: result,
        }
      }
    }
  },

  // 重置营销活动列表
  [RESET_MARKETING_ACTIVITY_LIST](state, action) {
    return {
      ...state,
      marketingActivityList: [],
    }
  },

  // 获取营销活动列表
  [GET_MARKETING_ACTIVITY_LIST](state, action) {
    const { payload } = action
    const { marketingActivityList } = state

    const { data: {content, totalPage} } = payload
    let list = content

    list.forEach((element, index) => {

      element.productDtoList.forEach((res) => {
        if(res.img){
          res.img = MarketFormatImg({ img: res.img })
        }
        if(res.defaultImg){
          res.errImg = MarketFormatImg({ defaultImg: res.defaultImg })
        }
      })

      // 套购、组合购产品组根据'packageCode'字段分组
      let groups={};
      if(element.discountTypeId=='90603'||element.discountTypeId=='90604' || element.discountTypeId=='90605'){
        element.productDtoList.forEach((res) => {
          let value=res['packageCode'];
          groups[value]=groups[value]||[];
          groups[value].push(res);
        })
      }

      element.setPurchaseNumber=Object.keys(groups)

      if(element.discountTypeId=='90605'){
        element.setPurchaseNumber.forEach((item)=>{

          //组合购将数组里'productGroup'属性相同的对象合并成一个数组
          groups[item] = combineObjIntoAnArray(groups[item])

        })
      }

      element.setPurchaseList=groups

    });

    let NewList
    if (marketingActivityList && marketingActivityList.length > 0) {
      NewList = concat(marketingActivityList, list)
    } else {
      NewList = list
    }

    return {
      ...state,
      marketingActivityList: NewList,
      marketingActivityTotalPages: totalPage,
    }
  },

  // 获取营销活动筛选条件列表
  [GET_MARKETING_ACTIVITY_FILTER](state: any, action: { payload: any; }) {
    const { payload } = action

    let orderfilter = {
      methods: [],
    }
    let all = {
      value: '全部',
      key: '',
      stock: false
    }
    orderfilter.methods.push(all)
    payload.forEach((item)=>{
      orderfilter.methods.push({
        value: item.name,
        key: item.code,
        stock: false
      })
    })

    return {
      ...state,
      loading: false,
      marketingActivityFilter: orderfilter,
    }
  },

  // 获取营销活动详情
  [GET_MARKETING_ACTIVITY_DETAIL](state, action) {
    const { payload } = action

    let marketingActivityDistributorList = []
    if(payload.custDtoList && payload.custDtoList.length){
      marketingActivityDistributorList = payload.custDtoList
    }

    return {
      ...state,
      marketingActivityDetail: payload,
      marketingActivityDistributorList,
    }
  },

  // 获取当前代理商下的所有分销商（已废弃  用详情了的分销商字段）
  [GET_MARKETING_ACTIVITY_DISTRIBUTOR](state, action) {
    const { payload } = action

    return {
      ...state,
      marketingActivityDistributorList: payload,
    }
  }


}, {
  ActivityList: [],
  totalPages: '',
  listId: [],
  pagingActivityResult: {
    total: 0,
    list: []
  },
  marketingActivityList: [],
  marketingActivityFilter: [],
  marketingActivityTotalPages: '',
  marketingActivityDetail: {},
  marketingActivityDistributorList: []
});
