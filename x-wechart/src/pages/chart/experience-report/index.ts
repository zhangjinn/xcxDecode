import wepy from 'wepy';
import { connect } from 'wepy-redux';
import utilsWxs from '../../../wxs/utils.wxs';
import { getSanLiuLingExperienceList } from '@/store/actions/purchasereport';
import {previousDay, formatDate, getCurrentMonth} from '@/utils/index';
import {optionOverviewData} from "@/utils/customize-charts";
import chart from "@/components/echarts/index";
import {
  getComprehensive
} from '@/store/actions/home'
import Toast from "@/components/vant/toast/toast";
interface Data {
  purchaseVisable: boolean;
  CurrentFilterName: string;
  maxDate: number;
  currentDate: number;
  minDate: number;
  selectDate: string;
  filterForm: object;
  gradientColor: object;
  canvasImg: string;
  imgObj: object;
  isUnfold: boolean;
  isUnfoldMp: boolean;
  previousDayDate: string;
  optionOverview:object,
  reportData:object,
  salesStructure:object,
  netIncrease:object,
  onlineSalesRate:object,
  onlineStoreOutput:object,
  machinesProportion:object,
  incrementalBusiness:object,
  gaozhongduanZB:object,
  showCharts:boolean
}
@connect({
  experienceList({ purchasereport }) {
    return purchasereport.sanLiuLingExperienceList
  },
}, {
  getSanLiuLingExperienceList,
  getComprehensive
})
export default class extends wepy.page {
  config = {
    navigationBarTitleText: '综合评价',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-popup': '../../../components/vant/popup/index',
      "van-datetime-picker": "../../../components/vant/datetime-picker/index",
      'van-circle': '../../../components/vant/circle/index',
      'ec-canvas': '../../../components/ec-canvas/ec-canvas'
    },
  };
  components = {
    chartOverview: chart,
  };
  data: Data = {
    previousDayDate: '', // 前一天日期
    imgObj: {
      'coreFunctionEvaluationBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993518577_8fbf3867171e439994af0e34876119db.png',
    },
    purchaseVisable: false,
    CurrentFilterName: '',
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    minDate: new Date(2000, 10, 1).getTime(),
    selectDate: (new Date()).Format('yyyy.MM'),
    filterForm: {
      queryDate: (new Date()).Format('yyyy-MM'),
    },
    gradientColor: {
      '0%': '#8FE7E3',
      '100%': '#59CDC8',
    },
    canvasImg: '',
    isUnfold: false, // 销售结构->false,折叠状态； true,展开状态
    isUnfoldMp: false, // 专供机占比->false,折叠状态； true,展开状态
    salesStructure: {}, // 全渠道口径出货
    netIncrease: {}, // 分销网络净增
    onlineSalesRate: {}, // 分销网络动销率
    onlineStoreOutput: {}, // 分销网络单店产出
    machinesProportion: {}, // 专供机占比
    incrementalBusiness: {}, // 增量业务(前置渠道)
    gaozhongduanZB: {}, // 高中端占比
    optionOverview: {},
    reportData: {
      overview: {
        totalScore: "0",// 总分
        ranking: "0",// 排名
        customerNum: "0",// 商家总数
        summaryScoreList: [
          {
            name: "全渠道口径出货",// 指标名称
            fullScore: "0",// 满分
            score: "0",// 得分
            value: "0",// 得分-echarts传值需要
            icon: ''
          },
          {
            name: "分销网络拓展与维护",
            fullScore: "0",
            score: "0",
            value: "0",// 得分
            icon: 'distribution-network-icon'
          },
          {
            name: "增值业务(前置渠道)",
            fullScore: "0",
            score: "0",
            value: "0",
            icon: 'value-added-icon'
          },
          {
            name: "销售结构",
            fullScore: "0",
            score: "0",
            value: "0",
            icon: 'sales-structure-icon'
          },

        ]
      }, // 综合评价
    },
    showCharts: false
  };
  wxs = {
    utils: utilsWxs,
  };
  methods = {
    goToUrl(type){
      let url = '/pages/terminal/report/netIncrease/index?type=' + type
      if(url) {
        wx.navigateTo({
          url: url
        })
      }
    },
    expandCollapse(){
      this.isUnfold = !this.isUnfold
    },
    expandCollapseMp(){
      this.isUnfoldMp = !this.isUnfoldMp
    },
    touchFilter: (name: string) => {
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

    // 选择时间
    onInput(e: { detail: any; }) {
      this.currentDate = e.detail
      this.showCharts = true
    },
    onConfirm(e: { detail: string; }) {
      this.purchaseVisable = false
      let date = new Date(parseInt(e.detail))
      let Y = date.getFullYear();
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      this.selectDate = Y + '.' + M
      this.filterForm.queryDate = Y + '-' + M
      this.getOverviewData()
      this.getSanLiuLingExperienceData()
      this.showCharts = false
      this.$apply();
    },
    onCancel() {
      this.purchaseVisable = false
    },
    getValues(){

    },
    // 进度条子组件传值
    getCanvasImg(imgUrl){
      this.canvasImg = imgUrl.detail
    }
  }
  // 获取综合评价报表
  getOverviewData(){
    let param = {
      cisCode: wepy.$instance.globalData.cisCode, // cis编码
      queryTime:  this.filterForm.queryDate, // 查询时间
    }
    this.methods.getComprehensive(param).then((res)=>{
      const { data } = res.payload
      if(data && data.comprehensiveEvaluation){
        let chartData = data.comprehensiveEvaluation
        this.reportData.overview.totalScore = chartData.totalScore || 0
        this.reportData.overview.ranking = chartData.ranking || 0
        this.reportData.overview.customerNum = chartData.customerNum || 0

        if(chartData.summaryScoreList && chartData.summaryScoreList.length>0){
          chartData.summaryScoreList.forEach((item)=>{
            if(item.name === '全渠道口径出货'){
              this.reportData.overview.summaryScoreList[0].fullScore = item.fullScore || 0
              this.reportData.overview.summaryScoreList[0].score = item.score || 0
              this.reportData.overview.summaryScoreList[0].value = item.score || 0
            }
            if(item.name === '分销网络拓展与维护'){
              this.reportData.overview.summaryScoreList[1].fullScore = item.fullScore || 0
              this.reportData.overview.summaryScoreList[1].score = item.score || 0
              this.reportData.overview.summaryScoreList[1].value = item.score || 0
            }
            if(item.name === '增值业务(前置渠道)'){
              this.reportData.overview.summaryScoreList[2].fullScore = item.fullScore || 0
              this.reportData.overview.summaryScoreList[2].score = item.score || 0
              this.reportData.overview.summaryScoreList[2].value = item.score || 0
            }
            if(item.name === '销售结构'){
              this.reportData.overview.summaryScoreList[3].fullScore = item.fullScore || 0
              this.reportData.overview.summaryScoreList[3].score = item.score || 0
              this.reportData.overview.summaryScoreList[3].value = item.score || 0
            }

          })
        }
        this.optionOverview = optionOverviewData(this.reportData.overview.summaryScoreList, this.reportData.overview.totalScore)
        this.$apply()
      }else {
        this.optionOverview = optionOverviewData(this.reportData.overview.summaryScoreList, this.reportData.overview.totalScore)
        this.$apply()
      }
    })
    this.$apply()
  }
  getSanLiuLingExperienceData(){
    let param={
      queryTime: this.filterForm.queryDate,
      cisCode: wepy.$instance.globalData.cisCode,
    }
    this.methods.getSanLiuLingExperienceList(param).then(res=>{
      const { data } = res.payload
      if( data.individualEvaluations &&  data.individualEvaluations.length > 0){
        data.individualEvaluations.forEach((item)=>{
          item.weightNum = parseFloat(item.weight)
          let functionName = item.functionName.replace(/\s*/g,"");
          if(functionName === '全渠道口径出货'){
            this.salesStructure = item
            this.salesStructure.pm = item&&item.rankingShow?item.rankingShow.split('/')[0].trim():''
            this.salesStructure.zf = item&&item.rankingShow?item.rankingShow.split('/')[1]:''
          }
          if(functionName === '分销网络净增'){
            this.netIncrease = item
          }
          if(functionName === '分销网络动销率'){
            this.onlineSalesRate = item
          }
          if(functionName === '分销网络单店产出'){
            this.onlineStoreOutput = item
          }
          if(functionName === '专供机占比'){
            this.machinesProportion = item
          }
          if(functionName === '增量业务(前置渠道)'){
            this.incrementalBusiness = item
          }
          if(functionName === '高中端占比'){
            this.gaozhongduanZB = item
          }
        })
      } else {
        this.salesStructure = {}
        this.netIncrease = {}
        this.onlineSalesRate = {}
        this.onlineStoreOutput = {}
        this.machinesProportion = {}
        this.incrementalBusiness = {}
        this.gaozhongduanZB = {}



      }
      this.$apply()

    })
  }

  onShow() {
    let date = new Date()
    let Y = date.getFullYear();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    this.selectDate = Y + '.' + M
    this.filterForm.queryDate = Y + '-' + M
    this.previousDayDate = previousDay()
    this.getOverviewData()
    this.getSanLiuLingExperienceData()
    this.$apply();
  }
}
