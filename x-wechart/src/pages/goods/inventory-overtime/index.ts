import wepy from 'wepy'
import { connect, getStore } from 'wepy-redux'
import { baseUrl } from '@/utils/request'
import { getBaseData } from '@/store/actions/purchaseshop'
import { RESET_INVENTORY_QUERIES_LIST } from '@/store/types/inventory'
import { request } from '@/utils/request'
import Toast from '@/components/vant/toast/toast'
import {fillZero} from "@/utils/index";
import $Toast from "@/components/vant/toast/toast";
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

@connect({
  ItemgroupList({ purchaseshop }) {
    return purchaseshop.ItemgroupList
  },
}, {
  getBaseData
})
export default class InventoryOverTime extends wepy.page {
  config = {
    navigationBarTitleText: '可共享库存',
    usingComponents: {
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-search': '../../../components/vant/search/index',
      'van-tab': '../../../components/vant/tab/index',
      'van-row': '../../../components/vant/row/index',
      'van-col': '../../../components/vant/col/index',
      'van-tabs': '../../../components/vant/tabs/index',
      'van-checkbox': '../../../components/vant/checkbox/index',
      'van-radio': '../../../components/vant/radio/index',
      'van-radio-group': '../../../components/vant/radio-group/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-stepper': '../../../components/vant/stepper/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-button': '../../../components/vant/button/index',
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index',
      'van-datetime-picker': '../../../components/vant/datetime-picker/index'
    }
  }
  components = {
    emptyDataType,
    headerTab,
  };
  data = {
    guideImg:`${wepy.$appConfig.baseUrl}/assets/weixin/index/check-guide-img.png`,
    inventoryList:[],
    orgList: [],
    matklList: [],
    qualityGradeList: [],
    stockList: [],
    inputvalue: '',
    inputvalue2: '',
    inputvalue3: '',
    Warehouserel: '',
    warehouseName: '仓库',
    orgName: '组织',
    warehouseTitle: '仓库类型',
    itemgroup: '物料组',
    isCheckAll: false,
    WarehouseListvisible: false,
    qualityGradeName: '选择',
    invStatusTypeName: '全部',
    visible: false,
    warehouseVisible: false,
    qualityGradeVisible: false,
    invStatusTypeVisible: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    calendarShow: false,
    currentDateName: '',
    lockName: '',
    dateSelVisable: false,
    // maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    // minDate: new Date(2000, 10, 1).getTime(),
    dateType: 'endTime',
    filterForm: {
      productName: '',   //型号
      matkl: '', // 物料组编码
      matnr: '',
      stockId: '',
      storageAge: '', //库龄
      storageAgeName: '库龄', //库龄
      pageSize: 1000,
      pageNo: 1,
      exceedDaysStart: '',
      exceedDaysEnd: '',
      storageAgeDaysStart:'', // 库龄天数开始日期
      storageAgeDaysEnd:'', // 库龄天数结束日期
      orgId: '',
      timeFrame:'', // 日期选择，
      documentDateFrom: '', // 入库开始日期
      documentDateTo: '', // 入库结束日期
      whetherToWarn:'', // 是否预警
      whetherToWarnName:'', // 是否预警名称
      sharedLogo:'', // 共享标识
      sharedLogoName:'', // 共享标识名称
      qualityGrade: '', //质量等级
      qualityGradeName: '', //质量等级名称
      inventoryStatus:'', // 库存状态
      inventoryStatusName:'', // 库存状态名称
    },
    showCheck: false,
    showCheckedOnly: false,
    showGuide: false,
    startTimeStr: '',
    endTimeStr: '',
    baseUrl: baseUrl,
    storageAgeList: [
      {'key': '0-30', 'value': '<30'},
      {'key': '30-60', 'value': '30~60'},
      {'key': '60-90', 'value': '60~90'},
      {'key': '90-', 'value': '>90'}
    ],
    shareFlagList: [
      {'key': '1', 'value': '是'},
      {'key': '0', 'value': '否'}
    ],
    whetherToWarnList: [
      {'key': 'Y', 'value': '是'},
      {'key': 'N', 'value': '否'}
    ],
    inventoryStatusList: [
      {'key': '110', 'value': '在库'},
    ],
    orgIds:[],
    stockIds:[],
    matklIds:[],
    qualityGradeIds:[],
    qualityGradeNames:[],
    productNameList:[],
    matnrNameList:[],
    productIds:[],
    productName:'',
    matnrName:'',
    productNameShowed:false,
    matnrNameShowed:false,
    matnrIds:[],
    timeFrameVisible:false,
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    timeList: [
      { label: '全部日期', value: '' },
      { label: '最近一周', value: '7' },
      { label: '最近一个月', value: '1' },
      { label: '最近三个月', value: '3' },
      { label: '最近六个月', value: '6' },
    ],
    timeFrameCenter:'',
    agentPopup: false,
    popupTitle: '',
    headerTabList: [
      { name: '组织', type: 'orgName', selectValue: '' },
      { name: '仓库', type: 'warehouseName', selectValue: '' },
      { name: '物料组', type: 'itemgroup', selectValue: '' },
      { name: '库龄', type: 'storageAge', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  }
  // 页面内交互写在methods里
  methods = {
    // 切换顶部快捷筛选
    touchOrderSFilter: (tabItem) => {
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
      if (!this.OrderSFilterVisible) {
        this.OrderSFilterVisible = true
        this.CurrentOrderSFilterName = name
        return
      }
      if (!name) {
        this.OrderSFilterVisible = false
        this.CurrentOrderSFilterName = ''
        return
      }
      if (this.CurrentOrderSFilterName === name) {
        this.OrderSFilterVisible = false
        this.CurrentOrderSFilterName = ''
        return
      }
      if (['orgName','warehouseName','itemgroup','storageAge'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    selectWarehouseStatus: (value: any, qualityGradeId: any) => {
      if(!qualityGradeId){
        this.qualityGradeIds = []
        this.qualityGradeNames = []
      }else{
        const index=this.qualityGradeIds.findIndex(it=>it==qualityGradeId)
        if(index>-1){
          this.qualityGradeIds.splice(index,1)
          this.qualityGradeNames.splice(index,1)
        }else{
          this.qualityGradeIds.push(qualityGradeId)
          this.qualityGradeNames.push(value)
        }
      }
      this.filterForm = { ...this.filterForm, qualityGrade: this.qualityGradeIds.join(',') }
      this.filterForm = { ...this.filterForm, qualityGradeName: this.qualityGradeNames.join(',') }
    },
    onSelectWarehouseList: (value: any, key: any) => {
      this.filterForm = { ...this.filterForm, stockId: key }
      this.warehouseName = value
      this.warehouseVisible = false
    },
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    //仓库选择
    onSelectWarehouseName(stockId, warehouseName) {
      if(!stockId){
        this.stockIds = []
      }else{
        const index=this.stockIds.findIndex(it=>it==stockId)
        if(index>-1){
          this.stockIds.splice(index,1)
        }else{
          this.stockIds.push(stockId)
        }
      }
      this.filterForm = { ...this.filterForm, stockId:this.stockIds.join(','), pageNo: 1 }
      this.headerTabList[1].selectValue = this.stockIds.join(',')
      this.methods.getOverTimeList()
    },
    //组织选择
    onSelectOrg(orgId, orgName) {
      if(!orgId){
        this.orgIds = []
      }else{
        const index=this.orgIds.findIndex(it=>it==orgId)
        if(index>-1){
          this.orgIds.splice(index,1)
        }else{
          this.orgIds.push(orgId)
        }
      }
      this.filterForm = { ...this.filterForm, orgId:this.orgIds.join(','), pageNo: 1 }
      this.headerTabList[0].selectValue = this.orgIds.join(',')
      this.methods.getStockList()
      this.methods.getMatklList()
      this.methods.getOverTimeList()
    },
    // 物料组下拉列表
    onSelectStatus(matklId: any, name: string) {
      if(!matklId){
        this.matklIds = []
      }else{
        const index=this.matklIds.findIndex(it=>it==matklId)
        if(index>-1){
          this.matklIds.splice(index,1)
        }else{
          this.matklIds.push(matklId)
        }
      }
      this.filterForm = { ...this.filterForm, matkl: this.matklIds.join(','), pageNo: 1 }
      this.headerTabList[2].selectValue = this.matklIds.join(',')
      this.methods.getOverTimeList()
    },

    // 库龄
    onStorageAgeType(code: any, name: string) {
      this.filterForm = { ...this.filterForm, storageAgeDaysStart: '', storageAgeDaysEnd: '' }
      if(code){
        let oStart=code.split("-")[0]
        let oEnd=code.split("-")[1]
        this.filterForm = { ...this.filterForm, storageAgeDaysStart: oStart, storageAgeDaysEnd: oEnd }
      }
      this.filterForm = { ...this.filterForm, storageAge: code, storageAgeName: name, pageNo: 1 }
      this.headerTabList[3].selectValue = code
      this.methods.touchOrderSFilter()
      this.methods.getOverTimeList()
    },

    onProductModelChange(productId,name) {
      if(!productId){
        this.productIds = []
      }else{
        const index=this.productIds.findIndex(it=>it==productId)
        if(index>-1){
          this.productIds.splice(index,1)
        }else{
          this.productIds.push(productId)
        }
      }
      this.filterForm = { ...this.filterForm, productName: this.productIds.join(','), pageNo: 1 }
    },
    onmatnrChange(matnrId,name) {
      if(!matnrId){
        this.matnrIds = []
      }else{
        const index=this.matnrIds.findIndex(it=>it==matnrId)
        if(index>-1){
          this.matnrIds.splice(index,1)
        }else{
          this.matnrIds.push(matnrId)
        }
      }
      this.filterForm = { ...this.filterForm, matnr: this.matnrIds.join(','), pageNo: 1 }
      // this.matnrNameShowed = false
    },
    closeMatnr(){
      this.matnrNameShowed = false
    },
    closeProd(){
      this.productNameShowed = false
    },

    // 共享超期天数改变
    onDateStartChange(e: { detail: any; }) {
      this.filterForm = { ...this.filterForm, exceedDaysStart: e.detail }
    },

    onDateEndChange(e: { detail: any; }) {
      this.filterForm = { ...this.filterForm, exceedDaysEnd: e.detail }
    },

    // 库龄天数改变
    onStorageAgeDateStartChange(e: { detail: any; }) {
      this.filterForm = { ...this.filterForm, storageAgeDaysStart: e.detail }
    },

    onStorageAgeDateEndChange(e: { detail: any; }) {
      this.filterForm = { ...this.filterForm, storageAgeDaysEnd: e.detail }
    },

    // 侧边筛选条件确认提交查询列表
    onSubmitFilterForm() {

      // 去掉字符串前面的所有0,并且转换成数字比较大小
      if(this.filterForm.storageAgeDaysStart){
        this.filterForm.storageAgeDaysStart = this.filterForm.storageAgeDaysStart.replace(/\b(0+)/gi,"")
      }
      if(this.filterForm.storageAgeDaysEnd){
        this.filterForm.storageAgeDaysEnd = this.filterForm.storageAgeDaysEnd.replace(/\b(0+)/gi,"")
      }
      if(this.filterForm.exceedDaysStart){
        this.filterForm.exceedDaysStart = this.filterForm.exceedDaysStart.replace(/\b(0+)/gi,"")
      }
      if(this.filterForm.exceedDaysEnd){
        this.filterForm.exceedDaysEnd = this.filterForm.exceedDaysEnd.replace(/\b(0+)/gi,"")
      }
      if(this.filterForm.storageAgeDaysStart && this.filterForm.storageAgeDaysEnd){
        if(Number(this.filterForm.storageAgeDaysStart)>Number(this.filterForm.storageAgeDaysEnd)){
          Toast('库龄起始天数需小于等于终止天数！')
          return
        }
      }
      if(this.filterForm.exceedDaysStart && this.filterForm.exceedDaysEnd){
        if(Number(this.filterForm.exceedDaysStart)>Number(this.filterForm.exceedDaysEnd)){
          Toast('共享超期起始天数需小于等于终止天数！')
          return
        }
      }

      getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST, payload: [] })
      this.filterForm = { ...this.filterForm, pageNo: 1 }
      this.methods.getOverTimeList()
      this.visible = !this.visible
      this.matnrNameShowed = false
      this.productNameShowed = false
    },
    // 重置侧边栏
    onSubmitFilterFormReset() {
      this.filterForm.productName = ''
      this.filterForm.matnr = ''
      this.filterForm.qualityGrade = ''
      this.filterForm.documentDateFrom = ''
      this.filterForm.documentDateTo = ''
      this.filterForm.exceedDaysStart = ''
      this.filterForm.exceedDaysEnd = ''
      this.filterForm.storageAgeDaysStart = ''
      this.filterForm.storageAgeDaysEnd = ''
      this.filterForm.whetherToWarn = ''
      this.filterForm.whetherToWarnName = ''
      this.filterForm.sharedLogo = ''
      this.filterForm.sharedLogoName = ''
      this.filterForm.qualityGrade = ''
      this.filterForm.qualityGradeName = ''
      this.filterForm.inventoryStatus = ''
      this.filterForm.inventoryStatusName = ''
      this.productName = ''
      this.matnrName = ''
      this.endTimeStr = ''
      this.matnrIds = []
      this.productIds = []
      this.startTimeStr = ''
      this.filterForm.pageNo = 1
      // this.warehouseName = '全部'
      this.qualityGradeName = '全部'
      this.invStatusTypeName = '全部'
      this.filterForm.invStatusType = ''
      this.stockIds=[]
      this.orgIds=[]
      this.matklIds=[]
      this.qualityGradeIds=[]
      this.qualityGradeNames=[]
      this.filterForm.orgId=''
      this.filterForm.stockId=''
      this.filterForm.matkl=''
      this.filterForm.storageAge=''
      this.filterForm.storageAgeName=''
      this.setData({
        inputvalue: ''
      })
    },
    getOrgList: () => {
      request({ api: `comm/queryOrg.nd?type=3` }).then(res => {
        this.orgList = res.orgList
        this.$apply()
      })
    },
    getStockList: () => {
      request(
        {
          api: `exceedStockList/getStockByOrgId.nd`, method: 'POST', data: {
            orgId:this.filterForm.orgId
          }}
      ).then(res => {
        if(res.code==400){
          this.stockList = []
          this.$apply()
        }else{
          const tempArr = []
          for(let key in res){
            tempArr.push({
              key,
              value:res[key]
            })
          }
          this.stockList = tempArr
          this.$apply()
        }
      })
    },
    productNameFocus:()=>{
      this.productNameShowed = true
      this.matnrNameShowed = false
    },
    matnrNameFocus:()=>{
      this.matnrNameShowed = true
      this.productNameShowed = false
    },
    getproductNameList: (e) => {
      this.productName = e.detail
      this.productNameList = []
      this.productIds = []
      this.filterForm.productName = ''
      if(!this.productName){
        return
      }
      request(
        {
          api: `exceedStockList/likeProductName.nd?productName=`+this.productName, method: 'GET', data: {
            // orgId:this.filterForm.orgId
          }}
      ).then(res => {
        if(res.code==400){
          this.productNameList = []
          this.$apply()
        }else{
          if(res.length>0){
            this.productNameShowed = true
          }
          this.productNameList = res
          this.$apply()
        }
      })
    },
    getmatnrNameList: (e) => {
      this.matnrName = e.detail
      this.matnrNameList = []
      this.matnrIds = []
      this.filterForm.matnr = ''
      if(!this.matnrName){
        return
      }
      request(
        {
          api: `exceedStockList/matnr.nd?matnrName=`+this.matnrName, method: 'GET', data: {
            // orgId:this.filterForm.orgId
          }}
      ).then(res => {
        if(res.code==400){
          this.matnrNameList = []
          this.$apply()
        }else{
          if(res.length>0){
            this.matnrNameShowed = true
          }
          this.matnrNameList = res
          this.$apply()
        }
      })
    },
    getMatklList: () => {
      request(
      {
        api: `exceedStockList/getMatklByOrgId.nd`, method: 'POST', data: {
        orgId:this.filterForm.orgId
      }}
      ).then(res => {
        if(res.code==400){
          this.matklList = []
          this.$apply()
        }else{
          const tempArr = []
          for(let key in res){
            tempArr.push({
              key,
              value:res[key]
            })
          }
          this.matklList = tempArr
          this.$apply()
        }
      })
    },
    getBatchList: () => {
      request({ api: `exceedStockList/getBatch.nd` }).then(res => {
        if(res.code==400){
          this.qualityGradeList = []
          this.$apply()
        }else{
          const tempArr = []
          for(let key in res){
            tempArr.push({
              key,
              value:res[key]+'-'+key
            })
          }
          this.qualityGradeList = tempArr
          this.$apply()
        }
      })
    },
    onGetOrderListNext() {
      if (this.totalPage > this.filterForm.pageNo) {
        this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1 }
        this.methods.getOverTimeList()
      }
    },
    onMore(uniqueFlag) {
      this.inventoryList.forEach(inv => {
        if (uniqueFlag == inv.uniqueFlag) {
          inv.moreSign = !inv.moreSign
        }
      })
    },
    //申请共享按钮时间，开启选择
    goApply: () => {
      wx.setNavigationBarTitle({
        title: '库存共享申请'
      })
      this.showCheck = true
      if(!wx.getStorageSync('hadShowGuide')){
        this.showGuide = true
        wx.setStorage({
          key:"hadShowGuide",
          data:"true"
        })
      }
    },
    //申请共享下一步
    nextStep: () => {
      const self =this
      const checkedInventoryList = this.inventoryList.filter(it => it.checked)
      if (checkedInventoryList.length < 1) {
        Toast('请先选择需要共享的品类！')
        return
      }
      wx.navigateTo({
        url: '/pages/goods/inventory-overtime/apply/index',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            data: JSON.parse(JSON.stringify(checkedInventoryList)),
            orgName:self.orgName,
            stockName:self.warehouseName
          })
        }
      })
    },
    //改变勾选
    changeCheck: (type, index) => {
      // if(type&&this.inventoryList[index].avbshareqty<1){
      //   Toast('本品类可共享数量为0！')
      //   return
      // }
      this.inventoryList[index].checked = type
      const checkedInventoryList = this.inventoryList.filter(it => it.checked)
      if (checkedInventoryList.length < 1) {
        this.showCheckedOnly = false
      }
      this.$apply()
    },
    //关闭引导框
    clickGuideOvery: (type, index) => {
      this.showGuide = false
    },
    // 勾选只显示已选
    onCheckedOnlyChange(event) {
      this.showCheckedOnly = event.detail
    },
    //获取orderList
    getOverTimeList: () => {

      const {pageNo, pageSize, productName, exceedDaysStart, exceedDaysEnd, orgId, matnr, stockId, qualityGrade, matkl, storageAgeDaysStart, storageAgeDaysEnd, inventoryStatus, whetherToWarn, sharedLogo, documentDateFrom, documentDateTo } = this.filterForm
      let invage=''
      let dateGroup=''
      let exceedDays=''
      if(storageAgeDaysStart || storageAgeDaysEnd){
        invage = `${storageAgeDaysStart}_${storageAgeDaysEnd}`
      }
      if(documentDateFrom || documentDateTo){
        dateGroup = `${documentDateFrom}_${documentDateTo}`
      }
      if(exceedDaysStart || exceedDaysEnd){
        exceedDays = `${exceedDaysStart}_${exceedDaysEnd}`
      }
      $Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });

      request({
        api: `exceedStockList/exceedStockList.htm`, method: 'POST', data: {
          orgId,
          stockId,
          shareFlag:sharedLogo //共享标识
          matkl,
          productName,
          matnr,
          qualityGrade,
          // dateStart,
          // dateEnd,
          exceedDaysStart,
          exceedDaysEnd,
          pageNo,
          pageSize,
          isWarning: whetherToWarn, // 是否预警
          invage: invage, // 库龄天数
          invstatus: inventoryStatus, // 库存状态
          dateGroup: dateGroup, // 入库日期
          exceedDays: exceedDays, // 共享超期天数
        }
      }).then(res => {
        $Toast.clear()
        if(res.list){
          res.list.forEach(it=>{
            if(it.ininvdate){
              it.ininvdate = new Date(it.ininvdate).Format('yyyy/MM/dd')
            }
          })
        }
        this.inventoryList = res.list
        this.$apply()
      })
    },

    // 选择日期
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { documentDateFrom, documentDateTo } = this.filterForm;
      const { name, type } = e.target.dataset
      this.currentDateName = name
      let begin, end;
      if (type === 'date') {
        begin = documentDateFrom
        end = documentDateTo
      }
      if (type === 'sapDate') {
        begin = documentDateFrom
        end = documentDateTo
      }
      if (name.indexOf('documentDateFrom') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if (name.indexOf('documentDateTo') > -1) {
        this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
      }
      this.calendarShow = true;
    },
    closeCalendar() {//日历关闭
      this.calendarShow = false;
    },
    clearCalendar(name) {
      this.filterForm = { ...this.filterForm, [name]: '' }
    },
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;

      this.filterForm = { ...this.filterForm, [this.currentDateName]: day }
      if(this.currentDateName=='documentDateFrom' || this.currentDateName=='documentDateTo' ){
        this.filterForm = { ...this.filterForm, timeFrame:'' }
      }
      this.calendarShow = false;
    },

    //全部日期点击
    onToggleTimeFrame() {
      this.timeFrameCenter = this.filterForm.timeFrame
      this.timeFrameVisible = !this.timeFrameVisible
    },

    // 全部日期选择确定
    onToggleTimeFrameTrue(){
      this.filterForm.timeFrame = this.timeFrameCenter
      this.timeFrameVisible = !this.timeFrameVisible
    },
    // 日期选择item
    onSelectTimeFrame(timeFrame) {
      this.timeFrameCenter = timeFrame
      this.methods.timeForMat(timeFrame)
    },
    timeForMat:(count:any)=> {// 拼接时间
      if(!count){
        this.filterForm.documentDateTo = ''
        this.filterForm.documentDateFrom = ''
        return
      }
      if(count==7){
        count = 7
      }else if(count==1){
        count=30
      }
      else if(count==3){
        count=90
      }
      else if(count==6){
        count=180
      }
      let now = new Date();
      let year = now.getFullYear();
      let month = (now.getMonth()+1)<10?('0'+(now.getMonth()+1)):now.getMonth()+1;
      let date = now.getDate()<10?('0'+now.getDate()):now.getDate()
      let nowDate = year+'-'+month+'-'+date
      this.filterForm.documentDateTo = nowDate
      let before = new Date()
      before.setTime(before.getTime() - (24 * 60 * 60 * 1000 * (count-1)))
      let Y2 = before.getFullYear()
      let M2 = ((before.getMonth() + 1) < 10 ? '0' + (before.getMonth() + 1) : (before.getMonth() + 1))
      let D2 = (before.getDate() < 10 ? '0' + before.getDate() : before.getDate())
      this.filterForm.documentDateFrom = Y2+'-'+M2+'-'+D2
    },

    // 右侧筛选弹框，弹框中各筛选列表显示切换
    selectagentPopup: (e) => {
      if (e == 'whetherToWarn') {
        this.popupTitle = '是否预警'
      } else if (e == 'sharedLogo') {
        this.popupTitle = '共享标识'
      } else if (e == 'qualityGrade') {
        this.popupTitle = '质量等级'
      } else if (e == 'inventoryStatus') {
        this.popupTitle = '库存状态'
      }
      this.agentPopup = !this.agentPopup
    },

    // 是否预警筛选条件列表选择
    selectWhetherToWarn: (value: any, key: any) => {
      this.filterForm = { ...this.filterForm, whetherToWarn: key }
      this.filterForm = { ...this.filterForm, whetherToWarnName: value }
      this.agentPopup = false
      this.$apply()
    },

    // 共享标识筛选条件列表选择
    selectSharedLogo: (value: any, key: any) => {
      this.filterForm = { ...this.filterForm, sharedLogo: key }
      this.filterForm = { ...this.filterForm, sharedLogoName: value }
      this.agentPopup = false
      this.$apply()
    },

    // 库存状态筛选条件列表选择
    selectInventoryStatus: (value: any, key: any) => {
      this.filterForm = { ...this.filterForm, inventoryStatus: key }
      this.filterForm = { ...this.filterForm, inventoryStatusName: value }
      this.agentPopup = false
      this.$apply()
    },
  }

  onLoad() {
    this.methods.getBaseData({
      cisCode: wepy.$instance.globalData.cisCode,
      'type': 'kczt',
      userAccount: wepy.$instance.globalData.account
    })
    this.methods.getOrgList()
    this.methods.getOverTimeList()
    this.methods.getBatchList()
  }
}
