import wepy from 'wepy';
import { connect } from 'wepy-redux';
import chart from '../../../components/echarts/index';
import { head } from 'ramda';
import { getBaseData } from '@/store/actions/purchaseshop';
import { getInventoryDetail } from '@/store/actions/purchasereport';
import {fillZero, getAlertInfo, previousDay} from '@/utils/index';
import { dmsRequest } from '@/store/actions/dmsrequest';
import Toast from '@/components/vant/toast/toast';
import headerTab from "@/pages/components/header-tab/index";
import utilsWxs from '../../../wxs/utils.wxs';
interface Data {
  option: object,
  warehouseVisible: boolean,
  gicWarehouseType: string,
  warehouseTitle: string,
  materialVisible: boolean,
  timeVisible: boolean,
  material: string,
  materialKey: string,
  warehouseList: object,
  materialList: object,
  currentMonthList: object,
  calendarConfig: object,
  calendarShow: boolean,
  currentTime: string,
  currentStr: string,
  reportFlag: boolean,
  onePopup: boolean,
  twoPopup: boolean,
  dynamicMessage: object,
  previousDayDate: string;
  showRightBtn: boolean;
  headerTabList: any[];
  legendData: any[];
}

@connect({
}, {
  getBaseData,
  getInventoryDetail, // 库存周转天数
})

export default class StockChart extends wepy.page {
  config = {
    navigationBarTitleText: '库存报表',
    usingComponents: {
      'ec-canvas': '/components/ec-canvas/ec-canvas',
      'van-popup': '../../../components/vant/popup/index',
      'calendar': '../../../components/calendar/index',
      'van-toast': '../../../components/vant/toast/index',
    },
  };
  components = {
    chart: chart,
    headerTab,
  };
  wxs = {
    utils: utilsWxs,
  };
  /**
   * 页面的初始数据
   */
  data: Data = {
    previousDayDate: '', // 前一天日期
    dynamicMessage: { // 动态获取提示信息汇总
      inventory: '', // 库存提示信息
      inventoryQuantity: '', // 库存量提示信息
    },
    option: {},
    // supplierVisible: false,
    warehouseVisible: false,
    warehouseTitle: '仓库选择',
    materialVisible: false,
    timeVisible: false,
    // chooseSupplier: {}, //已选择的供应商
    material: '',
    materialKey: '',
    // supplierList: [],
    gicWarehouseType:'',//仓库类型
    warehouseList: [
      {
        id:'',
        value:'全部',
        selected:false,
      },
      {
        id:'005',
        value:'自有仓',
        selected:false,
      },
      {
        id:'003',
        value:'共享仓',
        selected:false,
      }
    ],
    materialList: [],
    currentMonthList: [], //库存列表
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    calendarShow: false,
    currentTime: '',
    currentStr: '',
    reportFlag: false,
    onePopup: false,
    twoPopup: false,
    showRightBtn: false,
    headerTabList: [
      { name: '仓库', type: 'warehouseType', selectValue: '' },
      { name: '物料组', type: 'material', selectValue: '' },
      { name: '日期', type: 'time', selectValue: 'time' },
    ], // 顶部搜索切换按钮列表
    legendData: [
      {iconColor: '#73A0FA', text: '入库数量'},
      {iconColor: '#7585A2', text: '出库数量'},
      {iconColor: '#EB7E65', text: '库存净数量'},
      // {iconColor: '#00AAA6', text: '周转天数'},
    ]
  };
  methods = {
    // 点击筛选条件
    twoPopup:() => {
      this.twoPopup = !this.twoPopup
    },
    onePopup:() => {
      this.onePopup = !this.onePopup
    },
    touchStockFilter: (tabItem: any) => {
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
      this.reportFlag = true
      switch name {
        case 'warehouseType':
          this.warehouseVisible = !this.warehouseVisible;
          this.materialVisible = false;
          break;
        case 'material':
          this.warehouseVisible = false;
          ['materialVisible', 'timeVisible'].forEach((v) => {
            if (v.includes(name)) {
              this[v] = !this[v]
              return
            }
            this[v] = false;
          })
          break;
        case 'time':
          this.materialVisible = false
          this.warehouseVisible = false
          this.calendarShow = true
          break;
        default:
      }
    },
    initFilter: async () => {
      // 初始化物料组
      await this.methods.getBaseData({
        cisCode: wepy.$instance.globalData.cisCode, "type": 'wlz', userAccount: wepy.$instance.globalData.account
      }).then((res: { payload: { data: any[]; }; }) => {
        if (res && res.payload && res.payload.data && res.payload.data.length > 0) {
          this.materialList = res.payload.data.map((value) => {
            let key = head(Object.keys(value))
            return {
              key,
              value: value[key],
            }
          })
        }
      })
      this.methods.selectMaterial(0, '0')
      // 初始化时间
      let day = new Date()
      this.currentTime = day.Format('yyyy-MM-dd')
      this.methods.transform(this.currentTime)
      this.$apply()
    },
    selectMaterial: (idx, init) => {
      this.reportFlag = false
      this.materialList.forEach((value, index) => {
        value.selected = idx === index
        if (value.selected) {
          this.material = value.value
          this.materialKey = value.key
        }
      })
      this.headerTabList[1].selectValue = this.material
      if ('1' === init) {
        this.methods.getStock()
      }
      this.methods.onClose()
    },
    selectWarehouse: (id) => {
      this.reportFlag = false
      if(id == '003'){
        this.warehouseTitle = '共享仓'
      }else if(id == '005'){
        this.warehouseTitle = '自有仓'
      }else{
        this.warehouseTitle = '全部'
      }
      this.gicWarehouseType = id
      this.headerTabList[0].selectValue = id
      this.methods.getStock()
      this.methods.onClose()
    },
    onClose: () => {
      this.reportFlag = false
      this.materialVisible = false
      this.warehouseVisible = false
      this.calendarShow = false
    },
    chooseDay(evt) {
      this.reportFlag = false
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.calendarShow = false;
      this.currentTime = day;
      this.methods.transform(this.currentTime)
      this.methods.getStock()
    },
    transform: (time) => { // 转换2019-10-20 为年月日
      this.currentStr = `${time.substr(0, 4)}年${time.substr(5,2)}月${time.substr(8,2)}日`
      this.headerTabList[2].name = this.currentStr
    },
    getDayStock: () => { // 获取最近7天库存变化
      dmsRequest({
        data: {
          userAccount: wepy.$instance.globalData.account,
          terms: {
            gicWarehouseType: this.gicWarehouseType,
            materialGroupCode: this.materialKey,
            date: this.currentTime,
          },
        },
        method: 'invChangeEverydayReport'
      }).then((res) => {
        if(res && res.code == '0' ) {
          let tData = []
          let inData = []
          let outData = []
          let netData = []
          res.report.forEach((v) => {
            tData.unshift(v.date)
            inData.unshift(v.in)
            outData.unshift(v.out)
            netData.unshift(v.net)
          })
          this.methods.fillOption(tData, inData, outData, netData)
          this.$apply()
        } else {
          Toast.fail(res.msg || '请求失败');
        }
      })
    },
    getMonthStock: () => { // 获取当前月库存变化
      dmsRequest({
        data: {
          userAccount: wepy.$instance.globalData.account,
          terms: {
            gicWarehouseType: this.gicWarehouseType,
            materialGroupCode: this.materialKey,
            date: this.currentTime,
          },
        },
        method: 'invCurrMonthReport'
      }).then((res) => {
        if(res && res.code == '0' ) {
          this.currentMonthList = res.report
          this.currentMonthList = this.currentMonthList.map((item)=>{
            item.day = '-'
            return item
          })
          this.methods.getInventoryDetailData()
          Toast.clear();
          this.$apply()
        }else {
          Toast.fail(res.msg || '请求失败');
        }
      })
    },
    // 获取库存周转天数
    getInventoryDetailData: () => {
      this.methods.getInventoryDetail({
        cisCode: wepy.$instance.globalData.cisCode,
        materialGroupCode: this.materialKey,
        queryTime: this.currentTime,
      }).then((res)=>{
        const { data, code, msg } = res.payload
        if(code == 0 ) {
          this.currentMonthList = this.currentMonthList.map((item)=>{
            const arr = data.chart.filter(itm => {
              let currItm = itm.date.replace(/-/g, '')
              return currItm == item.date
            })
            if(arr && arr.length){
              item.day = arr[0].turnover
            }
            return item
          })
          this.$apply()
        }else {
          Toast.fail(msg || '请求失败');
        }
      })
    },
    fillOption: (tData: [], inData: [], outData: [], netData: []) => {
      this.option = {
        // title: {
        //   show: true,
        //   text: '库存(单位:台)',
        //   textStyle: {
        //     fontSize: 15,
        //     color: '#262626'
        //   },
        //   left: 12
        // },
        disableTouch: true, //解决ios系统，echarts长按不能滑动的问题
        legend: {
          itemWidth: 6,
          itemHeight: 6,
          left: 12,
          top: 6,
          icon: 'rect',
          data:['库存净数量', '入库数量', '出库数量', '周转天数'],
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '10%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'value'
            }
        ],
        yAxis : [
            {
                type : 'category',
                axisTick : {show: false},
                data : tData
            }
        ],
        series : [
            {
                name:'库存净数量',
                type:'bar',
                itemStyle: {
                  color: '#EB7E65'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: netData
            },
            {
                name:'入库数量',
                type:'bar',
                stack: '库存净数量',
                itemStyle: {
                  color: '#73A0FA'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: inData
            },
            {
                name:'出库数量',
                type:'bar',
                stack: '库存净数量',
                itemStyle: {
                  color: '#7585A2'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'left'
                    }
                },
                data: outData
            },
            // {
            //   name:'周转天数',
            //   type:'bar',
            //   itemStyle: {
            //     color: '#00AAA6'
            //   },
            //   label: {
            //     normal: {
            //       show: true,
            //       position: 'left'
            //     }
            //   },
            //   data: [-150, -232, -201, -154, -190, -330, -410]
            // }
        ]
      };
    },
    getStock: () => {
      Toast.loading({
        duration: 0,
      });
      this.methods.getMonthStock()
      this.methods.getDayStock()
    }
  };

  // 动态获取提示信息
  getAlert(){
    let inventory = getAlertInfo('14909545633') // 库存提示信息
    let inventoryQuantity = getAlertInfo('14909546200') // 库存提示信息
    this.dynamicMessage.inventory = inventory
    this.dynamicMessage.inventoryQuantity = inventoryQuantity
  }

  async onShow() {
    await this.methods.initFilter()
    this.methods.getStock()
  };

  onLoad() {
    this.previousDayDate = previousDay()
    this.getAlert()
  };
}
