import wepy from 'wepy';
import chart from '../../../components/echarts/index'
import * as wxCharts from '../../../utils/wxcharts.js';
import utilsWxs from '../../../wxs/utils.wxs';
import { connect } from 'wepy-redux';
import { getreportcustSales, getReportSupplyList, getReportMaterialList } from '@/store/actions/purchasereport';
import { forEach } from 'ramda';
import {previousDay, formatDate, getAlertInfo} from '@/utils/index';
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  option1: null,
  option2: null,
  ringChart: Object,
  purchaseVisable: boolean,
  CurrentFilterName: string,
  maxDate: number;
  currentDate: number,
  minDate: number,
  supplierItem: Object,
  materialItem: Object,
  selectDate: string,
  filterForm: Object,
  reportFlag: boolean,
  deliveryAmount: boolean;
  whichPopup: boolean;
  deliverySchedule: boolean;
  deliveryScale: boolean;
  dynamicMessage: object;
  previousDayDate: string;
  showRightBtn: boolean;
  headerTabList: any[];
}
@connect({
  reportSale({ purchasereport }) {
    return purchasereport.reportSale
  },
  supplierList({ purchasereport }) {
    return purchasereport.supplierList
  },
  matklList({ purchasereport }) {
    return purchasereport.matklList
  }
}, {
  getreportcustSales,
  getReportMaterialList,
  getReportSupplyList
})
export default class extends wepy.page {
  config = {
    navigationBarTitleText: '海信采购报表',
    usingComponents: {
      'ec-canvas': '/components/ec-canvas/ec-canvas',
      'van-icon': '../../../components/vant/icon/index',
      'van-popup': '../../../../components/vant/popup/index',
      "van-datetime-picker": "../../../../components/vant/datetime-picker/index"
    },
  };
  components = {
    chart: chart,
    chart1: chart,
    chart2: chart,
    headerTab
  };
  data: Data = {
    previousDayDate: '', // 前一天日期
    dynamicMessage: { // 动态获取提示信息汇总
      pickUpAmount: '', // 提货额
      pickUpQuantity: '', // 提货量
      chainRatio: '', // 环比
    },
    deliveryAmount: false,
    whichPopup: false,
    deliverySchedule: false,
    deliveryScale: false,
    option1: null,
    option2: null,
    ringChart: {},
    purchaseVisable: false,
    CurrentFilterName: '',
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    minDate: new Date(2000, 10, 1).getTime(),
    supplierItem: {
      name: '全部',
      code: ''
    },
    materialItem: {
      name: '全部',
      code: ''
    },
    selectDate: (new Date()).Format('yyyy年MM月'),
    filterForm: {
      queryDate: (new Date()).Format('yyyyMM'),
      orgId: '',
      matkl: '',
    },
    reportFlag: false,
    showRightBtn: false,
    headerTabList: [
      { name: '供应商', type: 'supplier', selectValue: '' },
      { name: '物料组', type: 'material', selectValue: '' },
      { name: (new Date()).Format('yyyy年MM月'), type: 'date', selectValue: (new Date()).Format('yyyy年MM月') },
    ], // 顶部搜索切换按钮列表
  };
  watch = {
    supplierItem: (e: any) => {
      this.methods.getReportMaterialList({
        type: 2,
        orgId: e.code
      }).then((res) => {
        const { payload: { matklList } } = res
        if (matklList && matklList.length > 0) {
          this.materialItem = {
            name: '全部物料组',
            code: ''
          }
        }
        this.$apply()
        this.filterForm = {...this.filterForm, matkl: this.materialItem.code}
        this.methods.getreportcustSales(this.filterForm)
      })
    },
    reportSale: (e: any) => {
      this.option1 = {
        // todo 后期有任务额数据再打开
        // color: ["#5AD8A6", "#5B8FF9"],
        color: ["#5AD8A6"],
        legend: {
          // todo 后期有任务额数据再打开
          // data: ['提货额', '任务额'],
          data: ['提货额'],
          top: 6,
          left: 12,
          icon: 'square',
          itemGap: 35,
          itemWidth: 8,
          itemHeight: 8,
          z: 100
        },
        grid: {
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
          data: e.DateStr,
        },
        yAxis: {
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
          name: '提货额',
          type: 'line',
          data: e.amount

        },

          // todo 后期有任务额数据再打开
          // {
          //   name: '任务额',
          //   type: 'line',
          //   // smooth: true,
          //   data: [1000, 4000, 4000, 50000, 300, 400, 330]
          // }
        ]
      };
      this.option2 = {
        // todo 后期有任务量数据再打开
        // color: ["#7585A2", "#EB7E65"],
        color: ["#7585A2"],
        legend: {
          // todo 后期有任务量数据再打开
          // data: ['提货量', '任务量'],
          data: ['提货量'],
          top: 6,
          left: 12,
          icon: 'square',
          itemGap: 35,
          itemWidth: 8,
          itemHeight: 8,
          z: 100
        },
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
          data: e.DateStr
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: 'rgba(140, 140, 140, 1)'
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: 'rgba(65, 97, 128, 0.15)'
            }
          },
        },
        series: [{
          name: '提货量',
          type: 'line',
          // smooth: true,
          // 是否为曲线
          // data: [100, 200, 400, 200, 300, 400, 330]
          data: e.num
        }
          // todo 后期有任务量数据再打开
          //   , {
          //     name: '任务量',
          //     type: 'line',
          //     // smooth: true,
          //     data: [1000, 4000, 4000, 50000, 300, 400, 330]
          //   }
        ]
      };
      this.$apply()
    },
  }
  wxs = {
    utils: utilsWxs,
  };
  /**
   * 生命周期函数--监听页面加载
   */
  methods = {
    deliveryScale:() => {
      this.deliveryScale = !this.deliveryScale
    },
    deliverySchedule:() => {
      this.deliverySchedule = !this.deliverySchedule
    },
    openNotice:(number: any) => {
      if(number == '1') {
        this.deliveryAmount = !this.deliveryAmount
        this.whichPopup = false
      } else if (number == '2') {
        this.whichPopup = !this.whichPopup
        this.deliveryAmount = false
      }
    },
    // 选择供应商
    touchFilter: (tabItem) => {
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
      if (!this.purchaseVisable) {
        this.purchaseVisable = true
        this.reportFlag = true
        this.CurrentFilterName = name
        return
      }
      if (!name) {
        this.purchaseVisable = false
        this.reportFlag = false
        this.CurrentFilterName = ''
        return
      }
      if (this.CurrentFilterName === name) {
        this.purchaseVisable = false
        this.reportFlag = false
        this.CurrentFilterName = ''
        return
      }
      if (['supplier', 'material'].indexOf(name) > -1) {
        this.CurrentFilterName = name
        return
      }
      this.purchaseVisable = false
      this.reportFlag = false
      this.CurrentFilterName = ''
    },

    onChooseMa( e: any ) {
      this.reportFlag = false
      forEach((res: any) => {
        if(res.code == e) {
          this.supplierItem = {
            name: res.name,
            code: res.code
          }
        }
      },this.supplierList)
      this.filterForm = {...this.filterForm,orgId: this.supplierItem.code}
      this.headerTabList[0].selectValue = this.supplierItem.code
      this.purchaseVisable = false
      this.$apply()
    },
    // 选择物料组
    onMaterial(e: any) {
      forEach((res: any) => {
        if(res.code == e) {
          this.materialItem = {
            name: res.name,
            code: res.code
          }
        }
      },this.matklList)
      this.purchaseVisable = false
      this.reportFlag = false
      this.filterForm = {...this.filterForm, matkl: this.materialItem.code}
      this.headerTabList[1].selectValue = this.materialItem.code
      this.$apply()
      this.methods.getreportcustSales(this.filterForm)
    },
    // 选择时间
    onInput(e: { detail: any; }) {
      this.currentDate = e.detail
    },
    onConfirm(e: { detail: string; }) {
      this.reportFlag = false
      this.purchaseVisable = false
      let date = new Date(parseInt(e.detail))
      let Y = date.getFullYear() + '年';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
      const date1 = Y + M
      this.selectDate = date1
      this.headerTabList[2].name = this.selectDate
      let Y1 = date.getFullYear();
      let M1 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      const a = Y1.toString()
      const date2 = a + M1
      this.filterForm.queryDate = date2
      this.methods.getreportcustSales(this.filterForm)
    },
    onCancel() {
      this.reportFlag = false
      this.purchaseVisable = false
    },
  }
  // 动态获取提示信息
  getAlert(){
    let pickUpAmount = getAlertInfo('14922074279')
    let pickUpQuantity = getAlertInfo('14922074281')
    let chainRatio = getAlertInfo('14922076562')
    this.dynamicMessage = { // 动态获取提示信息汇总
      ...this.dynamicMessage,
      pickUpAmount, // 提货额
      pickUpQuantity, // 提货量
      chainRatio, // 环比
    }
  }
  onShow() {
    let date = new Date()
    let Y1 = date.getFullYear();
    let M1 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    const a = Y1.toString()
    const date2 = a + M1
    this.filterForm.queryDate = date2
    // 额度图
    this.ringChart = new wxCharts({
      animation: true,
      canvasId: 'foreheadCanvas',
      type: 'ring',
      extra: {
        ringWidth: 10,
        pie: {
          offsetAngle: 185
        }
      },
      title: {
        name: '75%',
        color: '#777777',
        fontSize: 14,
        fontWeight: 500
      },
      subtitle: {
        name: '达成率',
        color: '#AAAAAA',
        fontSize: 10
      },
      series: [{
        name: '未达成率',
        data: 25,
        stroke: false,
        color: '#E3E8EC',
      }, {
        name: '达成率',
        data: 75,
        stroke: false,
        color: '#FF6847'
      }],
      disablePieStroke: true,
      width: 140,
      height: 140,
      dataLabel: false,
      legend: false,
      background: '#ffffff',
      padding: 0
    });
    this.ringChart.addEventListener('renderComplete', () => {
      // console.log('renderComplete');
    });
    setTimeout(() => {
      this.ringChart.stopAnimation();
    }, 500);
    this.ringChart.updateData({
      title: {
        name: '75%'
      },
      subtitle: {
        color: '#AAAAAA'
      }
    });
    // 量度图
    this.amountChart = new wxCharts({
      animation: true,
      canvasId: 'amountCanvas',
      type: 'ring',
      extra: {
        ringWidth: 10,
        pie: {
          offsetAngle: 185
        }
      },
      title: {
        name: '75%',
        color: '#777777',
        fontSize: 14,
        fontWeight: 500
      },
      subtitle: {
        name: '达成率',
        color: '#AAAAAA',
        fontSize: 10
      },
      series: [{
        name: '未达成率',
        data: 25,
        stroke: false,
        color: '#E3E8EC',
      }, {
        name: '达成率',
        data: 75,
        stroke: false,
        color: '#4769FF'
      }],
      disablePieStroke: true,
      width: 140,
      height: 140,
      dataLabel: false,
      legend: false,
      background: '#ffffff',
      padding: 0
    });
    this.amountChart.addEventListener('renderComplete', () => {
      // console.log('renderComplete');
    });
    setTimeout(() => {
      this.ringChart.stopAnimation();
    }, 500);
    this.amountChart.updateData({
      title: {
        name: '75%'
      },
      subtitle: {
        color: '#AAAAAA'
      }
    });
    this.methods.getReportSupplyList().then((res) => {
      if(res && res.payload && res.payload.orgList && res.payload.orgList.length > 0) {
        this.supplierItem = {
          name: '全部供应商',
          code: ''
        }
      }
      this.filterForm = {...this.filterForm,orgId: ''}
      this.$apply()
    })
    this.$apply();
  }
  onLoad() {
    this.previousDayDate = previousDay()
    this.getAlert()
  }
}
