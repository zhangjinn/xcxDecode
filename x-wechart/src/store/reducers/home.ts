import { handleActions } from 'redux-actions'
import {
  GET_USER_HOME, GEt_HOME_PAGE_PURCHASE_REPORT,
  GEt_HOME_PAGE_SALES_REPORT, GEt_HOME_PAGE_INVENTORY_REPORT,
  GEt_INV_CHANGE_EVERYDAY_REPORT, GET_NEW_USER_LIST_INFO,
  GET_NEW_HOME_CHANNEL_REPORTS, RESET_NEW_USER_LIST_INFO,
  GET_OPERATE_PLAN_REACH, GET_RURNOVER_RATE, GET_MARKET_COVERAGE,
  GET_PRODUCT_SALES_STRUCTURE, GET_GROSS_PROFIT_RATE
} from '@/store/types/home'
import { forEach } from 'ramda'
import { formatNum } from '@/utils/index'
import { formatDate } from '@/utils/index'

export default handleActions({
  [GET_NEW_HOME_CHANNEL_REPORTS](state, action) {
    const { payload: {report } } = action
    return {
      ...state,
      channelReports: report
    }
  },
  [RESET_NEW_USER_LIST_INFO](state, action) {
    return {
      ...state,
      newInfoList: []
    }
  },
  [GET_NEW_USER_LIST_INFO](state, action) {
    const { payload } = action
    const { list } = payload
    return {
      ...state,
      newInfoList: list
    }
  },
  [GEt_HOME_PAGE_PURCHASE_REPORT](state, action) {
    const { payload } = action
    const { nowData, tb, orderRate } = payload
    const purchaseAmount = {
      count: nowData.realPrice,
      HB: tb.hbRealPrice,
      TB: tb.tbRealPrice,
    }
    const purchaseQuantity = {
      count: nowData.realNum,
      HB: tb.hbRealNum,
      TB: tb.tbRealNum,
    }
    const rate = {
      monthChRatio: orderRate.monthChRatio,
      yearChRatio: orderRate.yearChRatio,
      yearYjRatio: orderRate.yearYjRatio,
      monthYjRatio: orderRate.monthYjRatio,
    }
    const purchaseReport = {
      purchaseAmount,
      purchaseQuantity,
      rate
    }

    return {
      ...state,
      purchaseReport: purchaseReport
    }
  },
  [GEt_HOME_PAGE_SALES_REPORT](state, action) {
    const { payload } = action
    const { report } = payload
    return {
      ...state,
      salesReport: report
    }
  },
  [GEt_HOME_PAGE_INVENTORY_REPORT](state, action) {
    const { payload } = action
    const { report } = payload
    const { total, details } = report
    const series: any = []
    forEach((res: any) => {
      const item = {
        name: res.name,
        data: res.count,
        color: res.color,
        stroke: false,
      }
      series.push(item)
    }, details)
    const title = {
      name: total,
      color: '#262626',
      fontSize: 14,
    }
    const inventoryReport = {
      series,
      title
    }
    return {
      ...state,
      inventoryReport
    }
  },
  [GEt_INV_CHANGE_EVERYDAY_REPORT](state, action) {
    const { payload } = action
    return {
      ...state,
    }
  },
  [GET_USER_HOME](state, action) {
    const { payload } = action
    const baseurl = payload.galleryImageUrl
    payload.topPictureList.forEach((item: any) => {
      item.imgName = baseurl + item.imgName
    })
    return {
      ...state,
      loading: false,
      home: payload
    }
  },
  [GET_OPERATE_PLAN_REACH](state, action) {
    const { payload } = action
    const operateData = payload.result
    operateData.yearText = (Number(operateData.year.completionYear) / 100).toFixed(1);
    operateData.monthText = (Number(operateData.month.completion) / 100).toFixed(1);
    operateData.yearRotate = -85+180*operateData.yearText/100
    operateData.monthRotate = -85+180*operateData.monthText/100
    operateData.year.quotaYearShow = formatNum((Number(operateData.year.quotaYear)).toFixed(0))
    operateData.month.quotaMonthShow = formatNum((Number(operateData.month.quota)).toFixed(0))
    operateData.year.taskQuotaYearShow = formatNum((Number(operateData.year.taskQuotaYear) * 10000).toFixed(0))
    operateData.month.taskQuotamonthShow = formatNum((Number(operateData.month.taskQuota) * 10000).toFixed(0))
    operateData.yearQuotaYearShow=operateData.year ? formatNum((Number(operateData.year.taskQuota) * 10000).toFixed(2)) : "0.0"
    operateData.monthQuotaYearShow=operateData.month ? formatNum((Number(operateData.month.taskQuota) * 10000).toFixed(2)) : "0.0"
    operateData.quotaYearShow=operateData.year ? formatNum(Number(operateData.year.quotaYear).toFixed(2)) : "0.0"
    operateData.quotaShow=operateData.month ? formatNum(Number(operateData.month.quota).toFixed(2)) : "0.0"
    operateData.completionYear=(Number(operateData.year.completionYear) / 100).toFixed(1)+'%'
    operateData.completion=(Number(operateData.month.completion) / 100).toFixed(1)+'%'
    function formatPickUpVolume1(text){
      if (Number(text) > 0 && Number(text) < 100) {
        return (Number(text) / 10000).toFixed(4);
      }
      return (Number(text) / 10000).toFixed(2);
    }
    function formatPickUpVolume4(text){
      if (Number(text) > 0 && Number(text) < 100) {
        return (Number(text) / 10000).toFixed(4);
      }
      return (Number(text) / 10000).toFixed(2);
    }
    operateData.arr = [{
      category: "全品类",
      pickUpVolume: operateData.year.taskQuotaYear ? Number(operateData.year.taskQuotaYear).toFixed(0) : "0",
      pickUpVolume1: formatPickUpVolume1(operateData.year.quotaYear ? Number(operateData.year.quotaYear).toFixed(0) : 0),
      pickUpVolume2: (operateData.year.completionYear ? (Number(operateData.year.completionYear) / 100).toFixed(1) : "0.0")+'%',
      pickUpVolume3: operateData && operateData.month.taskQuota ? Number(operateData.month.taskQuota).toFixed(1) : "0.0",
      pickUpVolume4: formatPickUpVolume4(operateData && operateData.month.quota ? Number(operateData.month.quota).toFixed(1) : 0),
      pickUpVolume5: (operateData && operateData.month.completion ? (Number(operateData.month.completion) / 100).toFixed(1) : "0.0")+'%',
    }];
    operateData.mx2.map(i => {
      let obj = operateData.mx.find(j => j.productLine === i.productLine && j.operatorCode === i.operatorCode &&
        j.categoryName === i.categoryName && j.categoryCode === i.categoryCode && i.operatorName === j.operatorName);
      let com = 0;
      if (obj && Number(obj.taskQuota) !== 0) {
        com = obj.quota / obj.taskQuota / 100;
      }
      operateData.arr.push({
        category: i.categoryName,
        pickUpVolume: i.taskQuotaYear ? Number(i.taskQuotaYear).toFixed(0) : "0",
        pickUpVolume1: formatPickUpVolume1(i.quotaYear),
        pickUpVolume2: (i.completionYear ? (Number(i.completionYear) / 100).toFixed(1) : "0.0")+'%',
        pickUpVolume3: obj && obj.taskQuota ? Number(obj.taskQuota).toFixed(2) : "0",
        pickUpVolume4: formatPickUpVolume4(obj&&obj.quota),
        pickUpVolume5: (com.toFixed(1))+'%',
      });
    });
    const ranking = operateData.ranking||{}
    ranking.ranke=ranking.rankingNum +'/'+ranking.allNum
    ranking.trendChange=ranking.rankingNum <ranking.lastRankingNum?'up':'down'
    const rankingMonth = operateData.rankingMonth||{}
    rankingMonth.ranke=rankingMonth.rankingNum +'/'+rankingMonth.allNum
    rankingMonth.trendChange=rankingMonth.rankingNum <rankingMonth.lastRankingNum?'up':'down'
    return {
      ...state,
      operatePlanData: operateData
    }
  },
  [GET_RURNOVER_RATE](state, action) {
    const { payload } = action
    const turnoverRateData = payload.result
    const ranking = turnoverRateData.ranking||{}
    ranking.ranke=(ranking.rankingNum||'-') +'/'+(ranking.allNum||'-')
    ranking.trendChange=ranking.rankingNum <ranking.lastRankingNum?'up':'down'
    const arr = [
      {
        title: "全品类",
        a: (Number(turnoverRateData.month.turnoverRate) * 100).toFixed(1),
        b: (Number(turnoverRateData.month.chain) * 100).toFixed(1),
        c: (Number(turnoverRateData.month.turnoverRate3) * 100).toFixed(1),
        d: (Number(turnoverRateData.month.chain3) * 100).toFixed(1),
        e: Number(turnoverRateData.month.molecule)
      }
    ];
    turnoverRateData.mx.map(i => {
      arr.push({
        title: i.categoryName,
        a: (Number(i.turnoverRate) * 100).toFixed(1),
        b: (Number(i.chain) * 100).toFixed(1),
        c: (Number(i.turnoverRate3) * 100).toFixed(1),
        d: (Number(i.chain3) * 100).toFixed(1),
        e: Number(i.molecule)
      });
    });
    const arrZMD=[]
    if(turnoverRateData.monthZMD){
     arrZMD.push(
        {
          title: "全品类",
          a: (Number(turnoverRateData.monthZMD.turnoverRate) * 100).toFixed(1),
          b: (Number(turnoverRateData.monthZMD.chain) * 100).toFixed(1),
          c: (Number(turnoverRateData.monthZMD.turnoverRate3) * 100).toFixed(1),
          d: (Number(turnoverRateData.monthZMD.chain3) * 100).toFixed(1),
          e: Number(turnoverRateData.monthZMD.molecule)
        }
    );
      turnoverRateData.mxZMD.map(i => {
        arrZMD.push({
          title: i.categoryName,
          a: (Number(i.turnoverRate) * 100).toFixed(1),
          b: (Number(i.chain) * 100).toFixed(1),
          c: (Number(i.turnoverRate3) * 100).toFixed(1),
          d: (Number(i.chain3) * 100).toFixed(1),
          e: Number(i.molecule)
        });
      });
    }
    return {
      ...state,
      turnoverRateData: {
        ranking,
        arr,
        arr4:arr.slice(0,4),
        arrZMD
      }
    }
  },
  [GET_MARKET_COVERAGE](state, action) {
    const { payload } = action
    const coverageData = payload.result
    const currentMonth = coverageData[formatDate(new Date().getTime()+'','YM')];
    // const currentMonth = coverageData['202101'];
    let echartsData = [];
    for (let key in coverageData) {
      if (coverageData[key].month && coverageData[key].month.marketCM) {
        echartsData.push(Number(coverageData[key].month.marketCM).toFixed(1));
      } else {
        echartsData.push("0");
      }
    }
    coverageData.currentMonth = currentMonth
    coverageData.marketCM = (currentMonth && currentMonth.month ? (Number(currentMonth.month.marketCM) * 100).toFixed(1) : "0.0")
    coverageData.chain = (currentMonth && currentMonth.month && Number(currentMonth.month.chain) > 0 ? "+" : "")+(currentMonth && currentMonth.month ? (Number(currentMonth.month.chain) * 100).toFixed(1) : "0.0")
    if(currentMonth&&currentMonth.mx[0]){
      coverageData.mx0 = (Number(currentMonth.mx[0].marketCM) * 100).toFixed(1)
      coverageData.mx01 = (currentMonth.mx[0] && Number(currentMonth.mx[0].chain) > 0 ? "+" : "")+((Number(currentMonth.mx[0].chain) * 100).toFixed(1))
    }
    if(currentMonth&&currentMonth.mx[1]){
      coverageData.mx1 = (Number(currentMonth.mx[1].marketCM) * 100).toFixed(1)
      coverageData.mx11 = (currentMonth.mx[1] && Number(currentMonth.mx[1].chain) > 0 ? "+" : "")+((Number(currentMonth.mx[1].chain) * 100).toFixed(1))
    }
    coverageData.option ={
      xAxis: {
        type: "category",
        show: false
      },
      yAxis: {
        max: 1.2,
        min: -0.1,
        type: "value",
        // 分隔线
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed"
          }
        },
        // 坐标轴轴线
        axisLine: {
          show: false
        },
        // 坐标轴刻度
        axisTick: {
          show: false
        },
        // 刻度标签
        axisLabel: {
          show: false
        }
      },
      legend: {
        show: true
      },
      tooltip: {
        trigger: "none",
        axisPointer: {
          type: "none"
        }
      },
      series: [{
        label: {
          show: false
        },
        data: echartsData,
        type: "line",
        smooth: 0.6,
        symbol: "circle", //拐点样式
        symbolSize: 6, //拐点大小
        // 线条样式
        itemStyle: {
          color: "#3A84FF"
        },
        grid: {
          x: 3,
          y: 3,
          x2: 3,
          y2: 3
        },
        // 区域填充样式
        areaStyle: {
          color: {
            type: "linear",
            // x: 0,
            // y: 0,
            // x2: 0,
            // y2: 1,
            colorStops: [{
              offset: 0, color: "rgba(58,132,255, 0.5)" // 0% 处的颜色
            }, {
              offset: 1, color: "rgba(58,132,255, 0)" // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      }]
    }
    return {
      ...state,
      coverageData
    }
  },
  [GET_PRODUCT_SALES_STRUCTURE](state, action) {
    const { payload } = action
    const salesStructureData = payload.result
    let arr = [{
      title: "全品类",
      a: salesStructureData.month.thNum ? salesStructureData.month.thNum : "0",
      b: salesStructureData.month.ratio ? (Number(salesStructureData.month.ratio) * 100).toFixed(1) : "0.0",
      c: salesStructureData.month.chain ? (Number(salesStructureData.month.chain) * 100).toFixed(1) : "0.0"
    }];
    salesStructureData.mx.map(i => {
      arr.push({
        title: i.categoryName,
        a: i.thNum ? i.thNum : 0,
        b: i.ratio ? (Number(i.ratio) * 100).toFixed(1) : "0.0",
        c: i.chain ? (Number(i.chain) * 100).toFixed(1) : "0.0"
      });
    });
    return {
      ...state,
      salesStructureData:arr.slice(0,4)
    }
  },
  [GET_GROSS_PROFIT_RATE](state, action) {
    const { payload } = action
    const profitData = payload.result
    profitData.monthGrossProfit = profitData && profitData.month ? formatNum(Number(profitData.month.grossProfit).toFixed(2)) : "0.0"
    profitData.prossProfitRate  = profitData && profitData.month ? (Number(profitData.month.prossProfitRate) * 100).toFixed(1) : "0.0"
    profitData.prossProfitRateRotate = -85+180*profitData.prossProfitRate/100
    if(profitData&&profitData.mx[0]){
      profitData.mx0 = formatNum((Number(profitData.mx[0].grossProfit)).toFixed(2))
      profitData.mx01 = (Number(profitData.mx[0].prossProfitRate) * 100).toFixed(1)
    }
    if(profitData&&profitData.mx[1]){
      profitData.mx1 = formatNum((Number(profitData.mx[1].grossProfit)).toFixed(2))
      profitData.mx11 =((Number(profitData.mx[1].prossProfitRate) * 100).toFixed(1))
    }
    return {
      ...state,
      profitData
    }
  },
}, {
  home: [],
  inventoryReport: {},
  salesReport: [],
  purchaseReport: [],
  newInfoList: [],
  channelReports: [],
  operatePlanData:{},
  turnoverRateData: {
    arr:[],
    arr4:[],
    arrZMD:[]
  },
  coverageData:{
    option:null
  },
  salesStructureData:[],
  profitData:{}
})
