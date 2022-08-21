import wepy from 'wepy';
import chart from '../../../components/echarts/index'
import { connect } from 'wepy-redux';
import {previousDay, fillZero, formatDate, getAlertInfo} from '@/utils/index';
import utilsWxs from '../../../wxs/utils.wxs';
import * as wxCharts from '../../../utils/wxcharts.js';
import {
  getSalesCategoryScaleReport, getSalesStatsReport,
  getBaseDataReport, getMaterialGroupReport,
  getSalesCurrMonthReport,getSalesRankDistributorReport,
  getSalesRankStoreReport
} from '@/store/actions/salesreport';
import { forEach, forEachObjIndexed, split } from 'ramda';
const app = getApp();

@connect({
  user({ user }) {
    return user
  },
  inventoryReport({ salesreport }) {
    return salesreport.inventoryReport
  },
  SuppliersList({ salesreport }) {
    return salesreport.SuppliersList
  },
  salesReport({ salesreport }) {
    return salesreport.salesReport
  },
  itemGroup({ salesreport }) {
    return salesreport.itemGroup
  },
  firstFigure({ salesreport }) {
    return salesreport.firstFigure
  },
  secondFigure({ salesreport }) {
    return salesreport.secondFigure
  },
  rankDistributor({ salesreport }) {
    return salesreport.rankDistributor
  },
  rankStore({ salesreport }) {
    return salesreport.rankStore
  },
  TopMd({ salesreport }) {
    return salesreport.TopMd
  },
  TopFxs({ salesreport }) {
    return salesreport.TopFxs
  },
}, {
  getSalesCategoryScaleReport,
  getSalesStatsReport,
  getBaseDataReport,
  getMaterialGroupReport,
  getSalesCurrMonthReport,
  getSalesRankDistributorReport,
  getSalesRankStoreReport
})
export default class SalesReport extends wepy.page {
  config = {
    navigationBarTitleText: '销售报表',
    usingComponents: {
      'ec-canvas': '/components/ec-canvas/ec-canvas',
      'van-datetime-picker': '../../../components/vant/datetime-picker/index',
      'van-popup': '../../../components/vant/popup/index',
      'calendar': '../../../components/calendar/index',
    },
  };
  components = {
    chart: chart,
    chart1: chart,
    chart2: chart,
    chart3: chart
  };
  data = {
    previousDayDate: '', // 前一天日期
    dynamicMessage: { // 动态获取提示信息汇总
      totalSales: '', // 销售总额
      channelSales: '', // 渠道销售额
      retailSales: '', // 零售额
      chainRatio: '', // 环比
      yearOnYearGrowthRate: '', // 同比增长率
      totalSalesQuantity: '', // 销售总量
      channelSalesQuantity: '', // 渠道销售量
      retailSalesQuantity: '', // 零售量
      sales: '', // 销售额
      salesQuantity: '', // 销量
    },
    show: false,
    showTwo: false,
    index: 1,
    indexTop: 2,
    option: null,
    option1: null,
    option2: null,
    option3: null,
    supplier: false,
    supplierItem: {
      value: '全部',
      key: ''
    },
    materialItem: {
      value: '全部',
      key: ''
    },
    material: false,
    terms: {
      documentType: '',
      startDate: '2019-09-01',
      endDate: '2019-12-01'
    },
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    minDate: new Date(2000, 10, 1).getTime(),
    reallyDate: (new Date()).Format('yyyy-MM'),
    Stats: {
      orgCode: '',
      materialGroupCode: '',
      date: ''
    },
    timePicker: false,
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    calendarShow: false, // 日历是否展示
    reportFlag: false,
    totalSales: false,
    channelSales: false,
    retailSales: false,
    onePopup: false,
    twoPopup: false,
    threePopup: false,
    fourPopup: false,
  };
  calendarConfig = {
    theme: 'elegant',
    onlyShowCurrentMonth: false,
  };
  openCalendarType = '';

  watch = {
    firstFigure: (e: any) => {
      // console.log('我是第一幅图')
      this.option1 = {
        color: ["#5B8FF9", "#5AD8A6", "#EB7E65"],
        legend: {
          data: ['销售总额', '渠道销售额', '零售额'],
          top: 6,
          left: 12,
          icon: 'square',
          // backgroundColor: 'red',
          z: 100,
          itemGap: 35,
          itemWidth: 8,
          itemHeight: 8
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100
          }
        ],
        grid: {
          // containLabel: true
          left: 56,
          right: 12,
          top: 60,
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            label: {
              padding: [0, 0, 9, 18],
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: 'rgba(65, 97, 128, 0.15)',
            }
          },
          axisLabel: {
            color: 'rgba(140, 140, 140, 1)'
          },
          type: 'category',
          boundaryGap: false,
          data: e.date,
          // show: false
        },
        yAxis: {
          // show:false,
          // data: ['0', '100', '200', '300', '400', '500'],
          axisLine: {
            show: false,

          },
          axisLabel: {
            color: 'rgba(140, 140, 140, 1)'
          },
          axisTick: {
            show: false
          },
          // x: 'center',
          // type: 'category',
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: 'rgba(65, 97, 128, 0.15)'
            }
          },


        },
        series: [{
          name: '销售总额',
          type: 'line',
          // smooth: true,
          // 是否为曲线
          areaStyle: {},
          data: e.totalAmount
        }, {
          name: '渠道销售额',
          type: 'line',
          // smooth: true,
          areaStyle: {},
          data: e.normalAmount
        }, {
          name: '零售额',
          type: 'line',
          // smooth: true,
          // 是否为曲线
          areaStyle: {},
          data: e.retailAmount
        }]
      };
    },
    secondFigure: (e: any) => {
      // console.log('我是第二幅图')
      this.option2 = {
        color: ["#5B8FF9", "#5AD8A6", "#EB7E65"],
        legend: {
          data: ['销售总量', '渠道销售量', '零售量'],
          top: 6,
          left: 12,
          icon: 'square',
          // backgroundColor: 'red',
          z: 100,
          itemGap: 35,
          itemWidth: 8,
          itemHeight: 8
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100
          }
        ],
        grid: {
          // containLabel: true
          left: 56,
          right: 12,
          top: 60,


        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            label: {
              padding: [0, 0, 9, 18]
            }
          }
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: 'rgba(65, 97, 128, 0.15)',
            }
          },
          axisLabel: {
            color: 'rgba(140, 140, 140, 1)'
          },


          type: 'category',
          boundaryGap: false,
          data: e.date,
          // show: false
        },
        yAxis: {
          // show:false,
          // data: ['0', '100', '200', '300', '400', '500'],
          axisLine: {
            show: false,

          },
          axisLabel: {
            color: 'rgba(140, 140, 140, 1)'
          },
          axisTick: {
            show: false
          },
          // x: 'center',
          // type: 'category',
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: 'rgba(65, 97, 128, 0.15)'
            }
          },
        },
        series: [{
          name: '销售总量',
          type: 'line',
          // smooth: true,
          // 是否为曲线
          areaStyle: {},
          data: e.totalQty
        }, {
          name: '渠道销售量',
          areaStyle: {},
          type: 'line',
          // smooth: true,
          data: e.normalQty
        }, {
          name: '零售量',
          areaStyle: {},
          type: 'line',
          // smooth: true,
          data: e.retailQty
        }]
      };
    },
    supplierItem: (e: any) => {
      this.methods.getMaterialGroupReport({
        supplierCode: e.key,
        orgId: e.key
      }).then((res) => {
        const { payload: { materialGroup } } = res
        const itemGroup: any = []
        forEachObjIndexed((value, key) => {
          const item = {
            value,
            key
          }
          itemGroup.push(item)
        }, materialGroup)
        this.materialItem = {
          value: '全部物料组',
          key: '',
        }
        this.$apply()
        this.getMySalesReport()
      })
    },
    TopMd: (e: any) => {
      // console.log('我是top图')
      this.show = false,
      this.showTwo = false,
      this.indexTop = 2
      var colors = ['#EB7E65','#73A0FA'];
      this.option3 = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '13%',
          left: 50,
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['销售金额', '销售量'],
          left: 20
        },
        yAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            // data: e.ranging
            data: ['第五名','第四名','第三名','第二名','第一名']
          }
        ],
        xAxis: [
          {
            type: 'value',
            name: '销售金额',
            // min: 0,
            // max: 250,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value}w'
            }
          },
          {
            type: 'value',
            name: '销售量',
            // min: 0,
            // max: 250,
            position: 'right',
            offset: -265,
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '销售金额',
            type: 'bar',
            data: e.amount
          },
          {
            name: '销售量',
            type: 'bar',
            xAxisIndex: 1,
            data: e.qty
          },
        ]
      };
    }
  }
  wxs = {
    utils: utilsWxs,
  };
  methods = {
    fourPopup:() => {
      this.fourPopup = !this.fourPopup
    }
    threePopup: () => {
      this.threePopup = !this.threePopup
    },
    twoPopup:() =>{
      this.twoPopup = !this.twoPopup
    },
    onePopup:() => {
      this.onePopup = !this.onePopup
    },
    whichPopup: (number: any) => {
      if(number == '1') {
        this.totalSales = !this.totalSales,
        this.channelSales = false,
        this.retailSales = false
      } else if (number == '2') {
        this.totalSales = false,
        this.channelSales = !this.channelSales,
        this.retailSales = false
      } else if (number == '3') {
        this.totalSales = false,
        this.channelSales = false,
        this.retailSales = !this.retailSales
      } else {
        this.totalSales = false,
        this.channelSales = false,
        this.retailSales = false
      }
    },
    selectTopBars: (number: any) => {
      this.indexTop = number
      const qty = number == 1 ? this.TopFxs.qty : this.TopMd.qty
      const amount = number == 1 ? this.TopFxs.amount : this.TopMd.amount
      var colors = ['#EB7E65','#73A0FA'];
      this.option3 = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '13%',
          left: 50,
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['销售金额', '销售量'],
          left: 20
        },
        yAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            // data: e.ranging
            data: ['第五名','第四名','第三名','第二名','第一名']
          }
        ],
        xAxis: [
          {
            type: 'value',
            name: '销售金额',
            // min: 0,
            // max: 250,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value}w'
            }
          },
          {
            type: 'value',
            name: '销售量',
            // min: 0,
            // max: 250,
            position: 'right',
            offset: -265,
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '销售金额',
            type: 'bar',
            data: amount
          },
          {
            name: '销售量',
            type: 'bar',
            xAxisIndex: 1,
            data: qty
          },
        ]
      };
      this.$apply()
    },
    onCancel: () => {
      this.timePicker = false
      this.reportFlag = false
    },
    onConfirm(e: { detail: string; }) {
      this.timePicker = false
      this.reportFlag = false;
      let date = new Date(parseInt(e.detail))
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      const date1 = Y + M
      this.reallyDate = date1
      this.$apply()
      this.getMySalesReport()
    },
    closeMaterial: () => {
      this.material = false
      this.reportFlag = false;
    },
    chooseMaterial: (key: any) => {
      const item: any = {}
      forEach((res: any) => {
        if (res.key == key) {
          item.value = res.value
          item.key = res.key
        }
      }, this.itemGroup)
      this.materialItem = { ...item }
      this.material = false
      this.reportFlag = false
      this.$apply()
      // TODO: 缺一个触发方法 统一的
      this.getMySalesReport()
    },
    chooseSupper: (key: any) => {
      const item: any = {}
      forEach((res: any) => {
        if (res.key == key) {
          item.value = res.value
          item.key = res.key
        }
      }, this.SuppliersList)
      this.supplierItem = { ...item }
      this.supplier = false
      this.reportFlag = false
      this.$apply()
    },
    closeSupplier: () => {
      this.supplier = false
      this.reportFlag = false
    },
    touchFilter: (name: any) => {
      if (name == 'supplier') {
        this.supplier = true
        this.reportFlag = true
      } else if (name == 'material') {
        this.material = true
        this.reportFlag = true
      } else {
        this.timePicker = true
        this.reportFlag = true
      }
      this.$apply()
    },
    choseTime: () => {
      this.calendarShow = !this.calendarShow
      this.reportFlag = false
    },
    onshow: () => {
      this.show = !this.show
    },
    showTwo: () => {
      this.showTwo = !this.showTwo
    },
    selectTabs: (number: any) => {
      this.index = number
      let documentType = ''
      if (number == 2) {
        documentType = 'normal'
      } else if (number == 3) {
        documentType = 'retail'
      }
      const now = new Date()
      const month = now.getMonth() + 1
      const day = now.getDate()
      const account = wepy.$instance.globalData.account
      this.terms = {
        ...this.terms,
        documentType: documentType,
        startDate: `${now.getFullYear()}-01-01`,
        endDate: `${now.getFullYear()}-${ month > 9 ? month : `0${month}`}-${day > 9 ? day: `0${day}`}`
      }
      this.$apply()
      // 触发饼状图渲染
      this.methods.getSalesCategoryScaleReport({
        userAccount: account,
        terms: this.terms
      }).then(() => {
        this.methods.onTapChange()
      })
    },
    onTapChange: () => {
      const popup = {
        animation: true,
        canvasId: 'ringCanvas',
        type: 'ring',
        extra: {
          ringWidth: 25,
          pie: {
            offsetAngle: -45
          }
        },
        subtitle: {
          name: '各品类占比',
          color: '#AAAAAA',
          fontSize: 12
        },
        disablePieStroke: true,
        width: 166,
        height: 166,
        dataLabel: false,
        legend: false,
        background: '#f5f5f5',
        padding: 0,
        ...this.inventoryReport,
        title: []
      }
      this.ringChart = new wxCharts(popup);
      this.ringChart.addEventListener('renderComplete', () => {
        // console.log('renderComplete');
      });
      setTimeout(() => {
        this.ringChart.stopAnimation();
      }, 500);
    },
    // 选择日期
    openCalendar(e: { target: { dataset: { name: any; }; }; }) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { startDate, endDate } = this.terms
      const { name } = e.target.dataset
      this.openCalendarType = name

      if (name === 'startDate') {
        const c = this.$wxpage.calendar
        c.enableArea([minDate, endDate ? endDate : maxDate]);
        if (startDate) {
          const dates = split('-', startDate);
          c.jump(dates[0], parseInt(dates[1], 10), parseInt(dates[2], 10));
        }
      }
      if (name === 'endDate') {
        const c = this.$wxpage.calendar
        c.enableArea([startDate ? startDate : minDate, maxDate]);
        if (endDate) {
          const dates = split('-', endDate);
          c.jump(dates[0], parseInt(dates[1], 10), parseInt(dates[2], 10));
        }
      }
      this.calendarShow = true;
      this.reportFlag = true;
    },
    closeCalendar() {
      this.reportFlag = false;
      this.calendarShow = false;
    },
    clearCalendar(name: any) {
      this.terms = { ...this.terms, [name]: '' }
    },
    chooseDay(evt: { detail: { year: any; month: any; day: any; }; }) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.terms = { ...this.terms, [this.openCalendarType]: day }
      this.calendarShow = false;
      this.reportFlag = false;
      const account = wepy.$instance.globalData.account
      this.methods.getSalesCategoryScaleReport({
        userAccount: account,
        terms: this.terms
      }).then(() => {
        this.methods.onTapChange()
      })
    },
  }
  getMySalesReport() {
    const account = wepy.$instance.globalData.account
    this.methods.getSalesStatsReport({
      userAccount: account,
      terms: {
        orgCode: this.supplierItem.key,
        materialGroupCode: this.materialItem.key,
        date: this.reallyDate
      }
    })
    this.methods.getSalesCurrMonthReport({
      userAccount: account,
      terms: {
        orgCode: this.supplierItem.key,
        materialGroupCode: this.materialItem.key,
        date: this.reallyDate
      }
    })
    this.methods.getSalesRankDistributorReport({
      userAccount: account,
      terms: {
        orgCode: this.supplierItem.key,
        materialGroupCode: this.materialItem.key,
        date: this.reallyDate
      }
    })
    this.methods.getSalesRankStoreReport({
      userAccount: account,
      terms: {
        orgCode: this.supplierItem.key,
        materialGroupCode: this.materialItem.key,
        date: this.reallyDate
      }
    })
  }
  // 动态获取提示信息
  getAlert(){
    let totalSales = getAlertInfo('14909546236')
    let channelSales = getAlertInfo('14909546450')
    let retailSales = getAlertInfo('14909546453')
    let chainRatio = getAlertInfo('14909548185')
    let yearOnYearGrowthRate = getAlertInfo('14909548188')
    let totalSalesQuantity = getAlertInfo('14909548572')
    let channelSalesQuantity = getAlertInfo('14909548576')
    let retailSalesQuantity = getAlertInfo('14909548590')
    let sales = getAlertInfo('14909548602')
    let salesQuantity = getAlertInfo('14909549716')
    this.dynamicMessage = { // 动态获取提示信息汇总
      ...this.dynamicMessage,
      totalSales, // 销售总额
      channelSales, // 渠道销售额
      retailSales, // 零售额
      chainRatio, // 环比
      yearOnYearGrowthRate, // 同比增长率
      totalSalesQuantity, // 销售总量
      channelSalesQuantity, // 渠道销售量
      retailSalesQuantity, // 零售量
      sales, // 销售额
      salesQuantity, // 销量
    }
  }
  onShow() {
    this.methods.getBaseDataReport({
      type: 'gys'
    }).then((res: any) => {
      const { payload: { data } } = res
      let SuppliersList: any = []
      forEachObjIndexed((value, key) => {
        forEachObjIndexed((value, key) => {
          let item = {
            value,
            key,
          }
          SuppliersList.push(item)
        }, value)
      }, data)
      this.supplierItem = {
        value: '全部供应商',
        key: '',
      }
      this.$apply()
    })
    const account = wepy.$instance.globalData.account
    this.methods.getSalesCategoryScaleReport({
      userAccount: account,
      terms: this.terms
    }).then(() => {
      this.methods.onTapChange()
    })
  }
  onLoad() {
    const now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDate()
    this.terms = {
      ...this.terms,
      startDate: `${now.getFullYear()}-01-01`,
      endDate: `${now.getFullYear()}-${ month > 9 ? month : `0${month}`}-${day > 9 ? day: `0${day}`}`
    }

    this.previousDayDate = previousDay() // 时效日期说明
    this.getAlert()
  }
}
