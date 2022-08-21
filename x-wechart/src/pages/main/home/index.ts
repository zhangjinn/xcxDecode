import wepy from 'wepy'
import { connect, getStore } from 'wepy-redux'
import { formatDate,numFormat,getRpx,modifyUrl,getCurrentMonth,removeIllegalStr } from '@/utils/index'
import {
  getUserHome, getUserUnreadNumbers,
  getHomePagePurchaseReport, getHomePageSalesReport,
  getHomePageInventoryReport, getInvChangeEverydayReport,
  getNewHomeChannelReports,
  getOperatePlanReach, getRurnoverRate, getMarketCoverage,
  getProductSalesStructure,getGrossProfitRate,
  getSettleStatistic,getO2oShopList,writeLog,getNavigationMenuRecord,
  getUnTreatNum,getUnreadDmsNumber,
  getComprehensive,getPickUpGoods,getFrontChannel,getGrossProfitMargin,
  getDistributeNetwork,getInventoryTurnover
} from '@/store/actions/home'
import { getMenuNoticeList, messageRead, getMessageList } from '@/store/actions/notice'
import CommonMixin from '@/mixins/common'
import Toast from '@/components/vant/toast/toast'
import chart from '../../../components/echarts/index'
import scrollBar from '../../components/scrollBar/index'
const { baseUrl,imgUrl } = wepy.$appConfig
import {
  progress,
  optionOverviewData,
  optionInventoryData,
  optionSalesAmountData,
  optionDistributionRunData
} from '@/utils/customize-charts'
import utilsWxs from '../../../wxs/utils.wxs'
import * as wxCharts from '../../../utils/wxcharts.js'
import { RESET_NEW_USER_LIST_INFO } from '@/store/types/home'
import { SET_MENU_NOTICE_LIST } from '@/store/types/notice'
import { userPermissions, getAlert, getMenuRecord } from '@/store/actions/user';
import {
  getSanLiuLingExperienceList,
  getCollectionDelivery,
  getRunRate,
} from '@/store/actions/purchasereport';
import { getSysConfig } from '@/store/actions/distributorsorder';
import { getConsultTodoAllItems } from '@/store/actions/consultTodo';
import { request } from '@/utils/request';
interface Data {
  option: object;
  key: string;
  searchHistory: Array<10>;
  gicWarehouseType: string;
  loginStatus: boolean,
  current: number,
  ringChart: object,
  active: number,
  activeName: string,
  hiddenName: string,
  permission: object,
  gradientColor: object,
  canvasImg: string,
  sanLiuLingExperienceList: object,
  masterSwitch: string,
  imgObj: object;
  swiperCurrentPosition: number;
  scrollCurrentPosition: number;
  isAnimationDelay: boolean;
  specialAreaList: any[];
  recentlyUsedList: any[];
  pendingList: any[];
  noticeTreat: object;
  noticeActive: string;
  noticeTimer: any;
  cardSwiperHeight: any;
  html: any;
  showAgreementMask: boolean;
  version: any;
  statisticsList: object;
  canvasInfo: object;
  runningRate: object;
  showSalesSummaryTip: boolean;
  optionOverview: object;
  optionInventory: object;
  optionSalesAmount: object;
  optionSalesQuantity: object;
  optionDistributionRun: object;
  optionSinkRunNum: object;
  reportData: object;
  pickupSummary: object;
  salesSummary: object;
  grossMargin: object;
  distributeNetwork: object;
}

@connect({
  home({ home }) {
    return home.home
  },
  user({ user }) {
    return user
  },
  purchaseReport({ home }) {
    return home.purchaseReport
  },
  newInfoList({ home }) {
    return home.newInfoList
  },
  salesReport({ home }) {
    return home.salesReport
  },
  channelReports({ home }) {
    return home.channelReports
  },
  inventoryReport({ home }) {
    return home.inventoryReport
  },
  noticeList({ notice }) {
    return notice.menuNoticeList
  },
  operatePlanData({ home }) {
    return home.operatePlanData
  },
  turnoverRateData({ home }) {
    return home.turnoverRateData
  },
  coverageData({ home }) {
    return home.coverageData
  },
  salesStructureData({ home }) {
    return home.salesStructureData
  },
  profitData({ home }) {
    return home.profitData
  },
}, {
  getUserHome,
  getUserUnreadNumbers, // 获取首页消息未读数字
  getHomePagePurchaseReport, // 1、sourceName==='采购'
  getHomePageSalesReport, // 3、sourceName==='销售'
  getHomePageInventoryReport, // 5、sourceName==='库存'
  getInvChangeEverydayReport,
  getNewHomeChannelReports, // 2、sourceName==='渠道采购'
  getMenuNoticeList, // 获取消息中心公告轮播列表
  messageRead, // 获取广告弹框列表
  getOperatePlanReach, // 7、 sourceName==='运营'
  getRurnoverRate, // 8、 sourceName==='动销率'
  getMarketCoverage, // 9、 sourceName==='覆盖率'
  getProductSalesStructure, // 10、 sourceName==='销售结构'
  getGrossProfitRate, // 11、 sourceName==='毛利率'
  getO2oShopList,
  getSettleStatistic,
  writeLog,
  userPermissions,
  getSanLiuLingExperienceList, // 12、 sourceName==='核心职能评价'
  getAlert,
  getSysConfig, // 获取系统参数即获取总开关，查看是否调用部分接口
  getMenuRecord, // 客户访问菜单记录-查询
  getUnTreatNum, // 获取待处理中公告、待办、通知数量
  getNavigationMenuRecord, // 首页导航图标查询-list
  getMessageList, // 获取消息中心通知轮播列表
  getConsultTodoAllItems, // 获取消息中心待办轮播列表
  getUnreadDmsNumber, // 待处理dms未读消息数量
  getCollectionDelivery, // 13、回款提货额
  getRunRate, // 14、跑动率
  getComprehensive, // 运营中心-综合评价
  getPickUpGoods, // 运营中心-提货
  getFrontChannel, // 运营中心-销售
  getGrossProfitMargin, // 运营中心-毛利率
  getDistributeNetwork, // 运营中心-分销网络拓展与维护
  getInventoryTurnover, // 运营中心-库存周转
})

export default class Filter extends wepy.page {
  mixins = [CommonMixin]

  config = {
    navigationBarTitleText: 'Hisense信天翁',
    // navigationStyle: 'custom',
    usingComponents: {
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-search': '../../../components/vant/search/index',
      'van-tab': '../../../components/vant/tab-items/index',
      'van-tabs': '../../../components/vant/tabs-items/index',
      'van-circle': '../../../components/vant/circle/index',
      'van-transition': '../../../components/vant/transition/index',
      'ec-canvas': '/components/ec-canvas/ec-canvas',
      'van-progress': '../../../components/vant/progress/index',

    },
    enablePullDownRefresh: true
  }
  components = {
    chart: chart,
    chart1: chart,
    chart2: chart,
    chart3: chart,
    chartOverview: chart,
    chartInventory: chart,
    chartSalesAmount: chart,
    chartSalesQuantity: chart,
    chartDistributionRun: chart,
    chartSinkingStore: chart,
    scrollBar: scrollBar,
    scrollBar1: scrollBar,
  }
  data: Data = {
    swiperCurrentPosition: 0,
    scrollCurrentPosition: 0,
    isAnimationDelay: false,
    deviceInfo:{},
    option: {},
    active: 0,
    activeName: '',
    key: '',
    current: 0,
    coverageDataOption:null,
    searchHistory: [],
    gicWarehouseType: '',//仓库类型
    warehouseList: [
      {
        id: '',
        value: '全部'
      },
      {
        id: '005',
        value: '自有仓'
      },
      {
        id: '003',
        value: '共享仓'
      }
    ],
    loginStatus: false,
    ringChart: {},
    hiddenName: 'hidden',
    showPop: false,//展示通知
    selNotice: {},//当前展示的公告
    incomeData:{}, // 6、sourceName==='O2O收入'
    showCoverageDataOption:false,
    permission: {
      // reportArea: [], // 报表模块
      specialArea: [], // 活动专区
      pendingArea: [], // 待处理模块
    },
    gradientColor: { // 360体验，进度条渐变色设置
      '0%': '#8FE7E3',
      '100%': '#59CDC8',
    },
    canvasImg: '', // 360体验，canvas转换成的图片
    sanLiuLingExperienceList: {},
    masterSwitch: 'Y', // 首页增加开关，可在直播时关闭加载部分功能, Y开启首页报表查询，N不查询
    imgObj: {
      'activityAreaBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1641779156553_8851e3702a5649c3b1c3a29a882b4f0b.png',
      'engineeringZone': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529662_eb2b2000f837465488637af3eb3cd4cd.png',
      'specialZone': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529822_ff0fa19d00b24ecf92a3ba33c67faa31.png',
      'setPurchaseArea': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529819_9d314a33b8db4cc08a8289dbb345dcf0.png',
      'customizedArea': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529611_1051fbe5494345328cecb7a99f903940.png',
      'notLoggedInLogo': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993518748_ffe9f08ba6f745b1af65fdb0601c39a7.png',
      'noticeHead': 'http://3s-static.hisense.com/wechat/1/14722429883/1649727222892_00461b7f6378430a9a37df76b4481a2e.png',
      'informationCenter': 'http://3s-static.hisense.com/wechat/1/14722429883/1641778790131_03ddfd3e88fe4597b78dbcdb302fe0f7.png',
      'tvArea': 'http://3s-static.hisense.com/wechat/1/14722429883/1641778790489_7c863ac58a59492f9e67e0e5869a86ea.png',
      'refrigeratorArea': 'http://3s-static.hisense.com/wechat/1/14722429883/1641778790301_cc3f56dc636a4b07b3f411b28d5a09e4.png',
      'airConditioningArea': 'http://3s-static.hisense.com/wechat/1/14722429883/1641778702322_c37b95744cf5486ab2affa25ef231cfa.png',
      'xx': 'http://3s-static.hisense.com/wechat/1/14722429883/1658395805561_653da7f0ace143daa4ee5652a0ac8c05.png', // 首页报表-xx@2x.png
      'rise': 'http://3s-static.hisense.com/wechat/1/14722429883/1658395805278_e0c539124c264060a5be770ca5994ca9.png', // 首页报表-上升@2x.png
      'decline': 'http://3s-static.hisense.com/wechat/1/14722429883/1658395805303_9d41fd066868439bb08b337d6569e501.png', // 首页报表-下降@2x.png
    },
    specialAreaList: [], // 导航图标列表
    recentlyUsedList: [], // 最近使用列表
    pendingList: [ // 待处理列表
      { name: '待审核', num: '0', switchUrl: '/pages/dms/sales-distributors/index', isShow: false },
      { name: '待出库', num: '0', switchUrl: '/pages/dms/out-warehouse/list/index', isShow: false },
      { name: '待入库', num: '0', switchUrl: '/pages/goods/purchase-shop/index', isShow: false },
      { name: '退货待出库', num: '0', switchUrl: '/pages/dms/distributor-returns/list/index', isShow: false },
      { name: '退货待入库', num: '0', switchUrl: '/pages/dms/agent-returns/list/index', isShow: false },
      { name: '问卷', num: '0', switchUrl: '/pages/me/survey/index', isShow: false },
      { name: '公告', num: '0', switchUrl: '/pages/message/announcement/list/index', isShow: true },
      { name: '待办', num: '0', switchUrl: '/pages/message/upcoming/list/index', isShow: true },
      { name: '通知', num: '0', switchUrl: '/pages/message/notice/list/index', isShow: true },
    ],
    noticeTreat: {
      GG: [], // 公告列表
      TASK: [], // 待办列表
      MSG: [], // 通知列表
    },
    noticeActive: 'GG',
    noticeTimer: null, // 消息中心tab切换定时器
    cardSwiperHeight: 0, // 最近使用卡片高度
    html: '',
    showAgreementMask: false, //是否显示用户协议
    version: '', //系统版本
    canvasInfo:{ // 回款提货canvas数据
      width: 170,
      height: 90,
      lineWidth: 12,
      lineColorBig: '#E1E1E1',
      lineColorSmall: '#1890FF',
    },
    statisticsList:{ // 回款提货数据
      checkIn: '0', // 已完成
      shouldCheckIn: '0', // 月度目标
      ratio: '0%', // 占比
    },
    runningRate: { // 跑动率数据
      distributor: '',
      sinkingStore: '',
      distributorNum: '0',
      sinkingStoreNum: '0',
    },
    showSalesSummaryTip: false, // 销售汇总弹框提示
    optionOverview: {}, // 综合评价
    optionInventory: {}, // 库存
    optionSalesAmount: {}, // 销售汇总-销售金额饼图配置
    optionSalesQuantity: {}, // 销售汇总-销售数量饼图配置
    optionDistributionRun: {}, // 分销网络拓展与维护-分销跑动仪表盘配置
    optionSinkRunNum: {}, // 分销网络拓展与维护-下沉门店仪表盘配置
    reportData: {
      overview: {
        totalScore: "",// 总分
        ranking: "",// 排名
        customerNum: "",// 商家总数
        summaryScoreList: [
          {
            name: "全渠道口径出货",// 指标名称
            fullScore: "",// 满分
            score: "",// 得分
            value: "0",// 得分-echarts传值需要
            icon: ''
          },
          {
            name: "分销网络拓展与维护",
            fullScore: "",
            score: "",
            value: "0",// 得分
            icon: 'distribution-network-icon'
          },
          {
            name: "增值业务(前置渠道)",
            fullScore: "",
            score: "",
            value: "0",
            icon: 'value-added-icon'
          },
          {
            name: "销售结构",
            fullScore: "",
            score: "",
            value: "0",
            icon: 'sales-structure-icon'
          },
        ]
      }, // 综合评价
    },
    pickupSummary: {
      collectionDelivery: {}, // 提货
      midHigProportion: {}, // 高终端占比
      dedicatedMachine: {}, // 专供机
    }, // 提货汇总
    salesSummary: {
      salesAmount: {
        total: '',
        compareLastMonth: '', // 较上月
        compareLastYear: '', // 较上年
        arrowMonth: '', // 较上月升降标志
        arrowYear: '', // 较去年升降标志
        proportion:[
          { value: '0', name: '零售' },
          { value: '0', name: '分销' },
        ]
      },
      salesQuantity:{
        total: '',
        compareLastMonth: '', // 较上月
        compareLastYear: '', // 较上年
        arrowMonth: '', // 较上月升降标志
        arrowYear: '', // 较去年升降标志
        proportion:[
          { value: '0', name: '零售' },
          { value: '0', name: '分销' },
        ]
      },
      frontChannel: {}
    }, // 销售汇总
    grossMargin: {}, // 毛利率
    inventorySummary: {
      turnoverDays: '', // 周转天数
      compareLastMonth: '', // 同比（较上月）
      arrowMonth: '', // 同比正负 1：正， 0：负
      total: '',
      details: [],
      chartData: [ 0, 0, 0 ] // 图表传值，按details的顺序
    },// 库存
    developMaintain: {
      distributeNetwork: {}, // 分销网点要素
      dynamicSales: {}, // 动销率
      singleOutput: {}, // 单店产出要素
      marketCoverage: {}, // 市场覆盖要素
      monthRun: {}, // 月跑动要素
    }, // 分销网络拓展与维护
  }
  wxs = {
    utils: utilsWxs
  }
  watch = {
    noticeActive: (newValue: any) =>{
      this.methods.noticeActiveListChange()
    },
  }
  // 页面内交互写在methods里
  methods = {
    // 进入登录页面
    onLogin() {
      wx.navigateTo({ url: '/pages/auth/wechat/index' });
    },
    // 系统公告弹框内容跳转到系统公告详情页
    goNoticeDetails(id) {
      if(id){
        wx.navigateTo({
          url: '/pages/me/notice/detail/index?id=' + id
        });
      }
    },

    warehouseChangeFun: (e) => {
      const id = e.target.dataset.id
      this.gicWarehouseType = id
      let month = this.getLastDay()
      this.methods.getHomePageInventoryReport({
        month: month,
        operatorCode: wepy.$instance.globalData.cisCode,
      }).then((res) => {
        this.methods.stockChangeFun()
        this.$apply()
      })
      this.$apply()
    },
    stockChangeFun: () => {
      this.hiddenName = (this.loginStatus && this.user.info.loginSystem.indexOf('14168810879') != -1) ? '' : 'hidden'
      if(this.inventoryReport.series && this.inventoryReport.series.length == 0){
        this.inventoryReport.series = [{ name: '全部', data: 0, color:'#00AAA6', stroke: false }]
      }

      const popup = {
        animation: true,
        canvasId: 'ringCanvas',
        type: 'ring',
        extra: {
          ringWidth: 20,
          pie: {
            offsetAngle: -45
          }
        },
        subtitle: {
          name: '库存总数',
          color: '#AAAAAA',
          fontSize: 10
        },
        disablePieStroke: true,
        width: 150,
        height: 150,
        dataLabel: false,
        legend: false,
        background: '#f5f5f5',
        padding: 20,
        ...this.inventoryReport
      }
      this.ringChart = new wxCharts(popup)
      this.ringChart.addEventListener('renderComplete', () => {
      })
      setTimeout(() => {
        this.ringChart.stopAnimation()
      }, 500)
    },

    // 信息中心获取待办跳转路径
    getTaskUrl: (id) => {
      if(id){
        id = id.toString()
      }
      switch(id){
        case "14170681475": // 1财务待办
          return '/pages/me/financial-todo/index';
        case "14170681476": // 2合同待办
          return '/pages/me/todo/index';
        case "14173612880": // 3巡店待办
          return '/pages/me/shop-todo/index';
        case "14173612881": // 4整改通知
          return '/pages/me/shopfix-todo/index';
        case "14173612879": // 5意见征询待办
          return '/pages/me/consult-todo/index';
        case "14182972401": // 6终包采购计划提报
        case "14182972402": // 7终包收货提报
        case "14182987654": // 8考核通知
        case "14187583090": // 9新增门店待办
        case "14182972398": // 10终端管理待办
        case "14182051644": // 11退货待办
        case "14182987653": // 12考核申诉
        case "14187583089": // 13代理商活动待办
          return '/pages/me/assessment-notice-todo/index';
        default:
          return '';
      }
    },
    goDetail: (e: any) => {
      const { currentTarget: { dataset: { detailtype, msgcode } } } = e
      let url = ''
      if(this.noticeActive === 'GG'){ // 公告
        url = `/pages/me/notice/detail/index?id=${msgcode}` // 跳转至公告详情
      }else if(this.noticeActive === 'TASK'){ // 待办
        let oUrl = this.methods.getTaskUrl(detailtype)
        if (detailtype && oUrl) {
          url = `${oUrl}?status=0&typeValue=${detailtype}` // 跳转至未处理待办列表
        }
      }else if(this.noticeActive === 'MSG'){ // 通知
        if (detailtype) {
           url = `/pages/me/message/detail/index?type=${detailtype}` // 跳转至通知列表
        }
      }
      if(url){
        wx.navigateTo({
          url: url
        })
      }
    },
    updateData: () => {
      this.ringChart.updateData({
        title: {
          name: '80%'
        },
        subtitle: {
          color: '#ff0000'
        }
      })
      this.$apply
    },
    onFocus: () => {
      // 这里获取焦点的时候应该跳到搜索页面
      // 暂时条状还有点问题
      wx.redirectTo({
        url: '/pages/goods/search/index'
      })
    },
    goNext: (e: { currentTarget: { dataset: { url: any; }; }; }) => {
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    },
    gotoNoticeList: () => {
      this.navigator({
        link: {
          url: '/pages/me/notice/list/index'
        }
      })
    },
    gotoZone: (zone: String, category: String, categoryName: String) => {
      this.$parent.globalData.zone = zone
      this.$parent.globalData.zoneIndex = category
      this.$parent.globalData.isTab = false
      this.$parent.globalData.isPermission = this.permission.specialArea.includes(categoryName)
      wx.switchTab({
        url: '../take/index'
      })
    },
    goPage(url: any) {
      this.navigator({ link: { url } })
    },
    // 固定导航菜单跳转对应页面
    goNavigationArea(item: any){
      if(!item){
        return
      }
      let { sourceName, url} = item
      if(!url){
        return
      }
      let queryParams = this.getQueryVariable(url)
      let currUrl = this.getQueryUrl(url)

      // 判断菜单权限，权限是根据名称判断
      this.$parent.globalData.isPermission = this.permission.specialArea.includes(sourceName)

      if(currUrl == '/pages/main/take/index'){
        if(sourceName == '产品采购'){
          const { productPurchaseAuthority }=JSON.parse(wx.getStorageSync('b2b_permission_list'))
          this.$parent.globalData.isPermission = productPurchaseAuthority
          this.$parent.globalData.isTab = true
        }else{
          // 根据路径参数，跳转到产品采购列表页的时候显示对应专区页面
          if(queryParams && queryParams.type){
            this.$parent.globalData.zone = queryParams.type
          }
          if(queryParams && queryParams.zoneIndex){
            this.$parent.globalData.zoneIndex = queryParams.zoneIndex
          }
          // 非底部tab切换进入产品采购列表页
          this.$parent.globalData.isTab = false
        }
        wx.switchTab({ url: currUrl })
      }else if(currUrl == '/pages/main/home/index' || currUrl == '/pages/main/cart/index' || currUrl == '/pages/main/me/index' ){
        wx.switchTab({ url: currUrl });
      }else {
        this.navigator({ link: { url: currUrl } })
      }

    },
    // 跳转至活动专区
    goActivityArea(url: any, categoryName: String){
      this.$parent.globalData.isPermission = this.permission.specialArea.includes(categoryName)
      this.navigator({ link: { url } })
    },
    goPageByEvent(e) {
      if(e.currentTarget.dataset.url){
        this.navigator({ link: { url:e.currentTarget.dataset.url } })
      }
    },
    // 跳转意向商家
    goMIC(url: any, auth: boolean) {
      this.navigator({ link: { url }, auth: false })
    },
    // 点击轮播图跳转对应页面
    goUrl: (e: any) => {
      const { currentTarget: { dataset: { url } } } = e
      if (url) {
        // 跳详情
        if(url.indexOf('http://')===0||url.indexOf('https://')===0){ // 跳转至外部链接
          const { accountInfo }=JSON.parse(wx.getStorageSync('b2b_token'))
          let accountId = accountInfo.id
          let currUrl = ''
          if(url.indexOf("?")!=-1){ // 有参数
            currUrl = `${url}&accountId=${accountId}`
          }else{ // 没参数
            currUrl = `${url}?accountId=${accountId}`
          }
          const urlStr = encodeURIComponent(currUrl);
          wx.navigateTo({
            url: `/pages/me/webview/index?url=${urlStr}`
          })
        }else{
          wx.navigateTo({
            url: url
          })
        }
      }
    },
    getMenuNotice: () => {
      let params = {
        pageNo: 1,
        pageSize: 20,
        status: 0, // 0 -> 未读
      }
      this.methods.getMenuNoticeList(params).then(res => {  //获取消息中心公告轮播列表
        this.data.noticeTreat.GG = []
        if(res.payload && res.payload.list && res.payload.list.length > 0){
          this.data.noticeTreat.GG = res.payload.list.slice(0, 10).map((msg)=>{
            msg.createdDate = formatDate(msg.createdDate || msg.createdate, "Y-M-D") || '';
            return msg
          })
        }
        this.methods.noticeActiveListChange()
        this.$apply()

        // this.noticeList就是调用该接口取得值
        if (this.noticeList.length > 0) {
         this.methods.getNoticeDetail(this.noticeList[0].id);
        }
      })
    },
    getNoticeDetail:(id)=>{
      this.methods.messageRead({ id }).then(res => {
        this.selNotice = res.payload
        if(this.selNotice.billboardMessage && this.selNotice.billboardMessage.popupWindowContent){
          this.selNotice.billboardMessage.popupWindowContent = this.goodsContentConv(this.selNotice.billboardMessage.popupWindowContent)
          if(this.selNotice.billboardMessage.popAttachList && this.selNotice.billboardMessage.popAttachList.length > 0){
            this.selNotice.billboardMessage.popAttachList.forEach(item=>{
              // 重新组合图片地址 动态获取
              item.filePath = imgUrl+'/notice/'+item.filePath
            })
          }
        }
        this.showPop = true
        this.hiddenName = 'hidden' // 广告弹窗显示，canvas设置成隐藏
        this.noticeList.splice(0, 1)
        getStore().dispatch({ type: SET_MENU_NOTICE_LIST, payload: this.noticeList })
        this.$apply()
      })
    },
    //关闭通知
    clickGuideOvery: () => {
      if (this.noticeList.length > 0) {
        this.methods.getNoticeDetail(this.noticeList[0].id);
      }else{
        this.hiddenName = ''
      }
      this.showPop = false
      this.$apply()
    },
    // 进度条子组件传值
    getCanvasImg(imgUrl){
      this.canvasImg = imgUrl.detail
      this.$apply()
    },

    // swiper轮播图计算滚动条移动距离
    swiperChange(e){
      let swiperCurrent = e.detail.current
      let oLeft = 0
      if(this.home.topPictureList.length>1){
        // 52:scrollbar可滑动的长度 = 外部滑动条长度-内部互动条的长度 （单位rpx）
        oLeft = (52/(this.home.topPictureList.length-1))*swiperCurrent // 移动距离 = scrollbar可滑动的长度/(图片列表总数量-1)*当前列表下标
      }
      this.swiperCurrentPosition = oLeft
      this.$apply()
    },

    //scroll-view专区计算滚动条移动距离
    getleft(e){
      let scrollLeft = e.detail.scrollLeft
      let windowWidth = wx.getSystemInfoSync().windowWidth
      // 数字单位为rpx
      // 列表可滑动总长度 = 列表总长度 - 列表容器长度
      let totalSlidingLength = (142*(this.specialAreaList.length-1) + 100) - (getRpx(windowWidth) - 40)
      let oLeft = 0
      if(totalSlidingLength>0){
        oLeft = (52/(totalSlidingLength))*(getRpx(scrollLeft)) // 移动距离 = scrollbar可滑动的长度/列表可滑动总长度*列表当前滑动长度
      }
      if(oLeft > 52){
        oLeft = 52
      }
      this.scrollCurrentPosition = oLeft
      this.$apply()
    },

    // 最近使用菜单跳转对应页面
    goRecentlyUsedPage(subItem:any){
      let url = subItem && subItem.customerAccountSourceUrl
      if(!url){
        return
      }
      this.navigator({ link: { url } });
    },

    // 消息中心切换tab事件
    changeNotice(type){
      this.clearTimer()
      this.noticeActive = type
      this.current = 0
    },

    // 消息中心列表滚动事件
    noticeSwiperChange(e){
      if(e.detail.current>0){
        this.current = e.detail.current
      }
      this.methods.noticeActiveListChange()
    },

    // 消息中心列表展示完成自动切换tab
    noticeActiveListChange: () => {
      let oActive = this.noticeActive
      let oList = this.noticeTreat[this.noticeActive]
      let that = this
      if((this.current == 0 && oList.length <= 3) || (this.current >= oList.length-3 && oList.length > 3)){
        let noticeTimer = setTimeout(() => {
          if(oActive == 'GG'){
            that.noticeActive = 'TASK'
          }
          if(oActive == 'TASK'){
            that.noticeActive = 'MSG'
          }
          if(oActive == 'MSG'){
            that.noticeActive = 'GG'
          }
          that.current = 0
          that.$apply()
          clearTimeout(noticeTimer)
        },5000)
        this.noticeTimer = noticeTimer
      }
    },

    navigateToMsg() {
      this.accoutPopupShow = false
      let url = ''
      if( this.noticeActive === 'GG' ){
        url = '/pages/message/announcement/list/index'
      }else if( this.noticeActive === 'TASK' ){
        url = '/pages/message/upcoming/list/index'
      }else if( this.noticeActive === 'MSG' ){
        url = '/pages/message/notice/list/index'
      }
      if(url){
        wx.navigateTo({ url })
      }
    },

    // 跳转至待处理页
    toPending(item){
      if(item.switchUrl){
        let url = item.switchUrl
        wx.navigateTo({url})
      }
    },
    //隐私协议
    toPrivacy() {
      let url = `${wepy.$appConfig.baseUrl}/privacy`
      url = modifyUrl(url)
      const urlStr = encodeURIComponent(url);
      wx.navigateTo({ url: `/pages/me/answerNoLogin/index?type=toPrivacy&url=${urlStr}` });
    },
    // 同意用户协议
    agree() {
      this.showAgreementMask = false;
      wx.setStorageSync('isAgree',true)
      wx.setStorageSync('version',this.version)
      if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
        this.$wxpage.getTabBar().setData({
          isShowTabBar:true,
        })
      }
    },

    // 销售汇总弹框提示是否显示
    onShowSalesSummaryTip(){
      this.showSalesSummaryTip = !this.showSalesSummaryTip
    },
  }

  // 获取用户协议
  async getAgreement () {
    const res = await request({ api: '/fast/report/privacyPolicy.nd', method: 'GET',data:{loginPlant: 'XCX'} })
    if (this.loginStatus) return;
      if(res.code == 0 && res.list && res.list[0]) {
        this.html = res.list[0].pageContent
        this.version = res.list[0].pageKey
        let isAgree = wx.getStorageSync('isAgree');
        if(!isAgree) {
          this.showAgreementMask = true
          if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
            this.$wxpage.getTabBar().setData({
              isShowTabBar:false,
            })
          }
        } else {
          if(wx.getStorageSync('version') != res.list[0].pageKey) {
            this.showAgreementMask = true
            if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
              this.$wxpage.getTabBar().setData({
                isShowTabBar:false,
              })
            }
          }
        }
      }
  }
  // 固定导航菜单获取url参数，格式为/take/index?filter=type=engineeringZone&name=工程专区
  getQueryUrl(url){
    let newUrl = url
    if(url.indexOf('?')>-1){
      newUrl = url.split('?')[0]
    }
    return newUrl
  }
  // 固定导航菜单获取url参数，格式为/take/index?filter=type=engineeringZone&name=工程专区
  getQueryVariable(url) {
    let params = {}
    if (url) {
      let queryArray = url.split('filter=')
      if (queryArray.length > 1) {
        let query = queryArray[1]
        let array = query.split('&')
        array.map((value) => {
          let valueArray = value.split('=')
          if (valueArray.length > 1) {
            // 还需要对value进行解码（可能涉及到在value为中文字符）
            Object.assign(params, { [valueArray[0]]: decodeURI(valueArray[1]) })
          }
        })
      }
    }
    return params
  }

  // rich-text富文本中有图片时需要自适应
  goodsContentConv(content){
    // 去掉img标签里的style、width、height属性
    let newContent= content.replace(/<img[^>]*>/gi,function(match){
       match = match.replace(/style=\"(.*)\"/gi, '').replace(/style=\'(.*)\'/gi, '');
         match = match.replace(/width=\"(.*)\"/gi, '').replace(/width=\'(.*)\'/gi, '');
         match = match.replace(/height=\"(.*)\"/gi, '').replace(/height=\'(.*)\'/gi, '');
         return match;
     });

    // 去掉<br/>标签
    // newContent = newContent.replace(/<br[^>]*\/>/gi, '').replace(/(\s+)?<br(\s+)?\/?>(\s+)?/gi,'');

    // img标签添加style属性：max-width:100%;height:auto
    newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:0;"');
    return newContent;
  }

  onPullDownRefresh() {
    this.methods.getUserHome(() => {
      wx.stopPullDownRefresh()
    })
  }
  getPermissionList(){
    if(wx.getStorageSync('b2b_permission_list')){
      const { specialArea, list }=JSON.parse(wx.getStorageSync('b2b_permission_list'))
      this.permission.specialArea=specialArea
      let listNew = []
      if(list && list.length > 0){
        list.forEach((mObj)=>{
          if(mObj.subMenuList && mObj.subMenuList.length > 0){
            mObj.subMenuList.forEach((sObj)=>{
              if(sObj){
                listNew.push(sObj)
              }
            })
          }
        })
      }
      this.permission.pendingArea=listNew
    }
    this.$apply()
  }
  // js获取前一天日期
  getLastDay(){
    let day = -1 // day代表天数，-1代表前一天
    let dd = new Date();
    dd.setDate(dd.getDate() + day);
    let y = dd.getFullYear();
    let m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
    let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    let lastDay = y +''+ m +''+ d
    return lastDay;
  }

  // 获取360体验列表
  getSanLiuLingExperienceData(){
    let date = new Date()
    let Y = date.getFullYear();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let queryDate = Y + '-' + M
    let param={
      queryTime: queryDate,
      cisCode: wepy.$instance.globalData.cisCode,
    }
    this.methods.getSanLiuLingExperienceList(param).then((res)=>{
      if(res.payload && res.payload.data){
        this.sanLiuLingExperienceList = res.payload.data
      }
      this.$apply()
    })
  }

  // 首页导航图标查询
  getNavigationMenuRecordData(){
    this.methods.getNavigationMenuRecord().then((res)=>{
      if(res && res.payload && res.payload.list && res.payload.list.length>0){
        this.specialAreaList = res.payload.list
        this.$apply()
      }
    })
  }

  // 客户访问菜单记录查询
  getMenuRecordData(){
    this.methods.getMenuRecord().then((res)=>{
      if(res && res.payload && res.payload.list && res.payload.list.length>0){
        // 最近使用前端开发，如果没有数据不显示，不超过4个，显示1行，超过4个显示2行，最多显示8个
        this.recentlyUsedList = res.payload.list.slice(0,8)
        this.$apply()
      }
    })
  }

  // 待处理
  getUnTreatNumData(){
    this.methods.getUnTreatNum().then((res)=>{
      const data = res.payload
      this.pendingList.forEach((item)=>{
        if(item.name === '问卷'){
          item.num = data.questionNum
          item.isShow = this.pendingPermissions(item.switchUrl)
        }
        if(item.name === '公告'){
          item.num = data.noticeNum
        }
        if(item.name === '待办'){
          item.num = data.taskNum
        }
        if(item.name === '通知'){
          item.num = data.msgNum
        }
      })
      this.$apply()
    })

    let module = 'cgrk,ddsh,xsck,return_wait_outbound,return_wait_inbound' // 以逗号分隔，cgrk 采购入库; ddsh 订单审核; xsck 销售出库; return_wait_outbound 退货待出库; return_wait_inbound 退货待入库
    this.methods.getUnreadDmsNumber(module).then((res)=>{
      const { data } = res.payload
      this.pendingList.forEach((item)=>{
        if(item.name === '待审核'){
          item.num = data.ddsh
          item.isShow = this.pendingPermissions(item.switchUrl)
        }
        if(item.name === '待出库'){
          item.num = data.xsck
          item.isShow = this.pendingPermissions(item.switchUrl)
        }
        if(item.name === '待入库'){
          item.num = data.cgrk
          item.isShow = this.pendingPermissions(item.switchUrl)
        }
        if(item.name === '退货待出库'){
          item.num = data.return_wait_outbound
          item.isShow = this.pendingPermissions(item.switchUrl)
        }
        if(item.name === '退货待入库'){
          item.num = data.return_wait_inbound
          item.isShow = this.pendingPermissions(item.switchUrl)
        }
      })
      this.$apply()
    })
  }

  // 判断待处理菜单是否有权限
  pendingPermissions(url){
    const { accountInfo }=JSON.parse(wx.getStorageSync('b2b_token'))
    let type = accountInfo.type // 是否是主张户，如果是主张户都显示不判断，如果是子账户有权限的才显示
    if(type && type == 'main'){
      return true
    }else{
      let list = this.permission.pendingArea
      if(list && list.length > 0){
        for(let i=0; i<list.length; i++){
          if(list[i].url && (list[i].url == url)){
            return true
          }
        }
      }
      return false
    }
  }

  // 获取消息中心待办轮播列表
  getTaskList(){
    let params = {
      pageNo: 1,
      pageSize: 20,
      status: 0, // 0 -> 未读
    }
    this.methods.getConsultTodoAllItems(params).then((res)=>{
      this.noticeTreat.TASK = []
      if(res.payload && res.payload.priceDelegateMessageList && res.payload.priceDelegateMessageList.length > 0){
        this.noticeTreat.TASK = res.payload.priceDelegateMessageList.slice(0, 10).map((msg)=>{
          msg.createdDate = formatDate(msg.createdDate || msg.createdate, "Y-M-D") || '';
          return msg
        })
      }
      this.$apply()
    })
  }

  // 获取消息中心通知轮播列表
  getMsgData(){
    let params = {
      pageNo: 1,
      pageSize: 20,
      status: 0, // 0 -> 未读
    }
    this.methods.getMessageList(params).then((res)=>{
      this.noticeTreat.MSG = []
      if(res.payload && res.payload.priceMessageList && res.payload.priceMessageList.length > 0){
        this.noticeTreat.MSG = res.payload.priceMessageList.slice(0, 10).map((msg)=>{
          msg.createdDate = formatDate(msg.createdDate || msg.createdate, "Y-M-D") || '';
          return msg
        })
      }
      this.$apply()
    })
  }
  clearTimer(){
    if(this.noticeTimer){
      clearTimeout(this.noticeTimer)
    }
  }

  // 获取分销网络拓展与维护报表
  getDistributionRunData(){
    this.methods.getDistributeNetwork({
      cisCode: wepy.$instance.globalData.cisCode, // cis编码
      queryTime: getCurrentMonth(), // 查询时间
    }).then((res)=>{
      const { data } = res.payload
      if(data && data.distributeNetworkDevelopMaintain){
        this.developMaintain.distributeNetwork = data.distributeNetworkDevelopMaintain.distributeNetwork || {}
        this.developMaintain.distributeNetwork.networkIncreaseCompletion = parseFloat(this.developMaintain.distributeNetwork.networkIncreaseCompletion)

        this.developMaintain.dynamicSales = data.distributeNetworkDevelopMaintain.dynamicSales || {}
        this.developMaintain.dynamicSales.monthRateCompletion = parseFloat(this.developMaintain.dynamicSales.monthRateCompletion)

        this.developMaintain.singleOutput = data.distributeNetworkDevelopMaintain.singleOutput || {}
        this.developMaintain.singleOutput.monthSingleOutputCompletion=parseFloat(this.developMaintain.singleOutput.monthSingleOutputCompletion)

        this.developMaintain.marketCoverage = data.distributeNetworkDevelopMaintain.marketCoverage || {}
        this.developMaintain.marketCoverage.rate = parseFloat( this.developMaintain.marketCoverage.rate)

        this.developMaintain.monthRun = data.distributeNetworkDevelopMaintain.monthRun || {}

        let disTotal = removeIllegalStr(this.developMaintain.monthRun.distributeRunNum) || '--'
        let disSchedule = parseFloat(this.developMaintain.monthRun.distributeRunRate) || 0
        let sinkTotal = removeIllegalStr(this.developMaintain.monthRun.sinkRunNum) || '--'
        let sinkSchedule = parseFloat(this.developMaintain.monthRun.sinkRunRate) || 0
        this.optionDistributionRun = optionDistributionRunData({
          total: disTotal,
          color: [[disSchedule/100 , '#18D1BC'], [1, 'rgba(151,151,151,0.2200)']]
        })
        this.optionSinkRunNum = optionDistributionRunData({
          total: sinkTotal,
          color: [[sinkSchedule/100 , '#18D1BC'], [1, 'rgba(151,151,151,0.2200)']]
        })
      }
    })

    this.optionDistributionRun = optionDistributionRunData({
      total: '--',
      color: [[0, '#18D1BC'], [1, 'rgba(151,151,151,0.2200)']]
    })
    this.optionSinkRunNum = optionDistributionRunData({
      total: '--',
      color: [[0, '#1890FF'], [1, 'rgba(151,151,151,0.2200)']]
    })
  }

  // 获取库存报表
  getInventoryData(){
    let month = this.getLastDay()
    this.methods.getHomePageInventoryReport({
      month: month,
      operatorCode: wepy.$instance.globalData.cisCode,
    }).then((res) => {
      const { report } = res.payload
      if(report){
        this.inventorySummary.total = report.total
        if(report.details && report.details.length>0){
          this.inventorySummary.details =report.details.slice(0,3)
          this.inventorySummary.details.forEach((item, index)=>{
            this.inventorySummary.chartData[index] = item.count
          })
        }

        this.optionInventory = optionInventoryData(this.inventorySummary.chartData.reverse(), this.inventorySummary.total)
      }
      this.$apply()
    })
    this.optionInventory = optionInventoryData(this.inventorySummary.chartData.reverse(), this.inventorySummary.total)

    this.methods.getInventoryTurnover({
      cisCode: wepy.$instance.globalData.cisCode, // cis编码
      queryTime: getCurrentMonth(), // 查询时间
    }).then((res)=>{
      const { data } = res.payload
      if(data && data.inventoryTurnover){
        this.inventorySummary.turnoverDays = data.inventoryTurnover.turnoverDays // 周转天数
        this.inventorySummary.compareLastMonth = data.inventoryTurnover.compareLastMonth // 同比（较上月）
        this.inventorySummary.arrowMonth = data.inventoryTurnover.arrowMonth // 同比正负 1：正， 0：负
      }
      this.$apply()
    })
  }

  // 获取毛利报表
  getGrossProfitData(){
    this.methods.getGrossProfitMargin({
      cisCode: wepy.$instance.globalData.cisCode, // cis编码
      queryTime: getCurrentMonth(), // 查询时间
    }).then((res)=>{
      const { data } = res.payload
      if(data && data.grossMargin){
        this.grossMargin = data.grossMargin
        this.grossMargin.grossMarginRate = parseFloat(this.grossMargin.grossMarginRate)
        progress({
          id: 'grossProfitCanvas',
          val: this.grossMargin.grossMarginRate || 0,
          config: {
            lineBarBg: '#FF8A8A'
          }
        })
      }
    })
    progress({
      id: 'grossProfitCanvas',
      val: this.grossMargin.grossMarginRate || 0,
      config: {
        lineBarBg: '#FF8A8A'
      }
    })
  }

  // 获取销售汇总报表
  getSalesAmountData(){
    this.methods.getHomePageSalesReport({
      userAccount: wepy.$instance.globalData.account
    }).then((res)=>{
      const { report } = res.payload
      if(report){
        if(report.salesTotalAmount){
          let total = report.salesTotalAmount.count
          if(total){
            total = (total/10000).toFixed(1)
          }
          this.salesSummary.salesAmount.total = total
          if(report.salesTotalAmount.HB){
            let compareLastMonth = ''
            if(report.salesTotalAmount.HB.indexOf("-")!=-1){
              compareLastMonth = report.salesTotalAmount.HB.replace(/\-/g,'');
              this.salesSummary.salesAmount.arrowMonth = 0
            }else{
              compareLastMonth = report.salesTotalAmount.HB.replace(/\+/g,'');
              this.salesSummary.salesAmount.arrowMonth = 1
            }
            this.salesSummary.salesAmount.compareLastMonth = compareLastMonth
          }
          if(report.salesTotalAmount.TB){
            let compareLastYear = ''
            if(report.salesTotalAmount.TB.indexOf("-")!=-1){
              compareLastYear = report.salesTotalAmount.TB.replace(/\-/g,'');
              this.salesSummary.salesAmount.arrowYear = 0
            }else{
              compareLastYear = report.salesTotalAmount.TB.replace(/\+/g,'');
              this.salesSummary.salesAmount.arrowYear = 1
            }
            this.salesSummary.salesAmount.compareLastYear = compareLastYear
          }
        }
        if(report.salesRetailAmount){
          let amount =  report.salesRetailAmount.count
          if(amount){
            amount = (amount/10000).toFixed(1)
          }
          this.salesSummary.salesAmount.proportion[0].value = amount
        }
        if(report.salesNormalAmount){
          let amount =  report.salesNormalAmount.count
          if(amount){
            amount = (amount/10000).toFixed(1)
          }
          this.salesSummary.salesAmount.proportion[1].value = amount
        }

        if(report.salesTotalQuantity){
          this.salesSummary.salesQuantity.total = report.salesTotalQuantity.count
          if(report.salesTotalQuantity.HB){
            let compareLastMonth = ''
            if(report.salesTotalQuantity.HB.indexOf("-")!=-1){
              compareLastMonth = report.salesTotalQuantity.HB.replace(/\-/g,'');
              this.salesSummary.salesQuantity.arrowMonth = 0
            }else{
              compareLastMonth = report.salesTotalQuantity.HB.replace(/\+/g,'');
              this.salesSummary.salesQuantity.arrowMonth = 1
            }
            this.salesSummary.salesQuantity.compareLastMonth = compareLastMonth
          }
          if(report.salesTotalQuantity.TB){
            let compareLastYear = ''
            if(report.salesTotalQuantity.TB.indexOf("-")!=-1){
              compareLastYear = report.salesTotalQuantity.TB.replace(/\-/g,'');
              this.salesSummary.salesQuantity.arrowYear = 0
            }else{
              compareLastYear = report.salesTotalQuantity.TB.replace(/\+/g,'');
              this.salesSummary.salesQuantity.arrowYear = 1
            }
            this.salesSummary.salesQuantity.compareLastYear = compareLastYear
          }
        }
        if(report.salesRetailQuantity){
          this.salesSummary.salesQuantity.proportion[0].value = report.salesRetailQuantity.count
        }
        if(report.salesNormalQuantity){
          this.salesSummary.salesQuantity.proportion[1].value = report.salesNormalQuantity.count
        }
      }
    })

    this.optionSalesAmount = optionSalesAmountData(this.salesSummary.salesAmount.proportion)
    this.optionSalesQuantity = optionSalesAmountData(this.salesSummary.salesQuantity.proportion)

    this.methods.getFrontChannel({
      cisCode: wepy.$instance.globalData.cisCode, // cis编码
      queryTime: getCurrentMonth(), // 查询时间
    }).then((res)=>{
      const { data } = res.payload
      if(data && data.frontChannel){
        this.salesSummary.frontChannel = data.frontChannel
        this.salesSummary.frontChannel.completion = parseFloat(this.salesSummary.frontChannel.completion)
      }
    })
  }

  // 获取提货汇总报表
  getPickupSummaryData(){
    this.methods.getPickUpGoods({
      cisCode: wepy.$instance.globalData.cisCode, // cis编码
      queryTime: getCurrentMonth(), // 查询时间
    }).then((res)=>{
      const { data } = res.payload
      if(data){
        if(data.collectionDelivery){
          this.pickupSummary.collectionDelivery = data.collectionDelivery
          this.pickupSummary.collectionDelivery.completion = parseFloat(this.pickupSummary.collectionDelivery.completion)
        }
        if(data.midHigProportion){
          this.pickupSummary.midHigProportion = data.midHigProportion
          this.pickupSummary.midHigProportion.completion = parseFloat(this.pickupSummary.midHigProportion.completion)
        }
        if(data.dedicatedMachine){
          this.pickupSummary.dedicatedMachine = data.dedicatedMachine
          this.pickupSummary.dedicatedMachine.completion = parseFloat(this.pickupSummary.dedicatedMachine.completion)
        }

        progress({
          id: 'myPickCanvas',
          val: this.pickupSummary.collectionDelivery.completion || 0,
        })
      }
    })
    progress({
      id: 'myPickCanvas',
      val: this.pickupSummary.collectionDelivery.completion || 0,
    })
  }

  // 获取综合评价报表
  getOverviewData(){
    this.methods.getComprehensive({
      cisCode: wepy.$instance.globalData.cisCode, // cis编码
      queryTime: getCurrentMonth(), // 查询时间
    }).then((res)=>{
      const { data } = res.payload
      if(data && data.comprehensiveEvaluation){
        let chartData = data.comprehensiveEvaluation
        this.reportData.overview.totalScore = chartData.totalScore
        this.reportData.overview.ranking = chartData.ranking
        this.reportData.overview.customerNum = chartData.customerNum

        if(chartData.summaryScoreList && chartData.summaryScoreList.length>0){
          chartData.summaryScoreList.forEach((item)=>{
            if(item.name === '全渠道口径出货'){
              this.reportData.overview.summaryScoreList[0].fullScore = item.fullScore
              this.reportData.overview.summaryScoreList[0].score = item.score
              this.reportData.overview.summaryScoreList[0].value = item.score || 0
            }
            if(item.name === '分销网络拓展与维护'){
              this.reportData.overview.summaryScoreList[1].fullScore = item.fullScore
              this.reportData.overview.summaryScoreList[1].score = item.score
              this.reportData.overview.summaryScoreList[1].value = item.score || 0
            }
            if(item.name === '增值业务(前置渠道)'){
              this.reportData.overview.summaryScoreList[2].fullScore = item.fullScore
              this.reportData.overview.summaryScoreList[2].score = item.score
              this.reportData.overview.summaryScoreList[2].value = item.score || 0
            }
            if(item.name === '销售结构'){
              this.reportData.overview.summaryScoreList[3].fullScore = item.fullScore
              this.reportData.overview.summaryScoreList[3].score = item.score
              this.reportData.overview.summaryScoreList[3].value = item.score || 0
            }
          })
        }

        this.optionOverview = optionOverviewData(this.reportData.overview.summaryScoreList, this.reportData.overview.totalScore || '--')
      }
    })
    this.optionOverview = optionOverviewData(this.reportData.overview.summaryScoreList, this.reportData.overview.totalScore || '--')
  }

  getSysConfigData(){
    try {
      // 根据系统参数判断是否迁移接口
      this.methods.getSysConfig({key:'QD_INDEX_REPORT'}).then((res)=>{
        let sys = res.payload.data
        this.masterSwitch = sys
      })
    } catch (e) {}
  }


  onHide(){
    this.clearTimer()
  }
  async onShow() {
    // 自定义底部导航栏-如需实现 tab 选中态，要在当前页面下，通过 getTabBar 接口获取组件实例，并调用 setData 更新选中态
    if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
      this.$wxpage.getTabBar().setData({
        selected: 0
      })
    }
    this.clearTimer()
    this.setData({
      showCoverageDataOption:false
    })

    // 获取登录状态
    this.loginStatus = this.isLogin()
    this.methods.getUserHome()
    if (this.loginStatus) {
      // 获取直播时否加载部分接口总开关
      await this.getSysConfigData()
      // 获取权限列表并存储本地
      await this.methods.userPermissions()
      // 从本地存储获取权限列表
      await this.getPermissionList()
      // 获取信息提示列表
      await this.methods.getAlert()
      // 动态导航菜单
      this.getNavigationMenuRecordData()

      // this.masterSwitch=Y为开启状态加载以下接口
      if(this.masterSwitch == 'Y'){
        // 获取公告列表 -- 通过总开关控制加不加载
        this.methods.getMenuNotice()
        // 获取待办列表 -- 通过总开关控制加不加载
        this.getTaskList()
        // 获取通知列表 -- 通过总开关控制加不加载
        this.getMsgData()
        // 待处理 -- 通过总开关控制加不加载
        this.getUnTreatNumData()
        // 最近使用菜单 -- 通过总开关控制加不加载
        this.getMenuRecordData()

        // 所有报表（新） -- 通过总开关控制加不加载
        this.getOverviewData()
        this.getPickupSummaryData()
        this.getGrossProfitData()
        this.getSalesAmountData()
        this.getInventoryData()
        this.getDistributionRunData()
      }

    } else {
      getStore().dispatch({ type: RESET_NEW_USER_LIST_INFO, payload: [] })
    }

    this.hiddenName = 'hidden'
  }
  async onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    this.deviceInfo = {
      system:systemInfo.system.replace(' ','/'),
      brower:'miniprogram/'+systemInfo.SDKVersion
    }
    this.getAgreement();

  }
}
