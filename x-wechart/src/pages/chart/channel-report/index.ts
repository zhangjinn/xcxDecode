import wepy from 'wepy';
import chart from '../../../components/echarts/index'
import utilsWxs from '../../../wxs/utils.wxs';
import { connect } from 'wepy-redux';
import { getChannelWlzList, getChannelReportList } from '@/store/actions/purchasereport';
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
  materialItem: Object,
  selectDate: string,
  filterForm: Object,
  reportFlag: boolean,
  dynamicMessage: object;
  previousDayDate: string;
  showRightBtn: boolean;
  headerTabList: any[];
}
@connect({
  currentMonth({ purchasereport }) {
    return purchasereport.currentMonth
  },
  channelData({ purchasereport }) {
    return purchasereport.channelData
  },
  matklList({ purchasereport }) {
    return purchasereport.matklList
  },
  ItemgroupList({ purchasereport }) {
    return purchasereport.ItemgroupList
  }
}, {
  getChannelReportList,
  getChannelWlzList
})
export default class extends wepy.page {
  config = {
    navigationBarTitleText: '渠道采购报表',
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
    headerTab,
  };
  data: Data = {
    previousDayDate: '', // 前一天日期
    dynamicMessage: { // 动态获取提示信息汇总
      pickUpAmount: '', // 提货额
      pickUpQuantity: '', // 提货量
      chainRatio: '', // 环比
    },
    option1: null,
    option2: null,
    ringChart: {},
    purchaseVisable: false,
    CurrentFilterName: '',
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    minDate: new Date(2000, 10, 1).getTime(),
    materialItem: {
      name: '全部物料组',
      code: ''
    },
    selectDate: (new Date()).Format('yyyy年MM月'),
    filterForm: {
      queryDate: (new Date()).Format('yyyy-MM'),
      orgId: '',
      matkl: '',
    },
    reportFlag: false,
    deliveryAmount: false,
    whichPopup: false,
    deliverySchedule: false,
    deliveryScale: false,
    showRightBtn: false,
    headerTabList: [ // 无供应商
      { name: '物料组', type: 'material', selectValue: '' },
      { name: (new Date()).Format('yyyy年MM月'), type: 'date', selectValue: (new Date()).Format('yyyy年MM月') },
    ], // 顶部搜索切换按钮列表
  };
  watch = {
    channelData: (e: any) => {
      this.option1 = {
        color: ["#5AD8A6"],
        legend: {
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

        }]
      };
      this.option2 = {
        color: ["#7585A2"],
        legend: {
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
          data: e.qty
        }
        ]
      };
      this.$apply()
    },
  }
  wxs = {
    utils: utilsWxs,
  };
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
    // 选择物料组
    onMaterial(e: any) {
      forEach((res: any) => {
        if(res.code == e) {
          this.materialItem = {
            name: res.name,
            code: res.code
          }
        }
      },this.ItemgroupList)
      this.purchaseVisable = false
      this.reportFlag = false
      this.filterForm = {...this.filterForm, matkl: this.materialItem.code}
      this.headerTabList[0].selectValue = this.materialItem.code
      this.$apply()
      this.getMyChannelList()
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
      this.headerTabList[1].name = this.selectDate
      let Y1 = date.getFullYear();
      let M1 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      const a = Y1.toString()
      const date2 = a + '-' + M1
      this.filterForm.queryDate = date2
      this.getMyChannelList()
    },
    onCancel() {
      this.reportFlag = false
      this.purchaseVisable = false
    },
  }
  getMyChannelList() {
    const account = wepy.$instance.globalData.account
    this.methods.getChannelReportList({
      userAccount: account,
      terms: {
        materialGroupCode: this.materialItem.code,
        date: this.filterForm.queryDate
      }
    })
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
    this.methods.getChannelWlzList()
    this.getMyChannelList()
    let date = new Date()
    let Y1 = date.getFullYear();
    let M1 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    const a = Y1.toString()
    const date2 = a + '-' + M1
    this.filterForm.queryDate = date2
    this.$apply();
  }
  onLoad() {
    this.previousDayDate = previousDay()
    this.getAlert()
  }
}
