import wepy from 'wepy';
import utilsWxs from '../../../../wxs/utils.wxs';
import { connect } from 'wepy-redux';
import {
  getGrossMarginDetail,
  getCollectionDeliveryDetail,
  getMarketCoverageDetail,
  getRunRateDetail,
  getDistributeNetworkIncrease,
  getDistributeNetworkRun,
  getDistributeNetworkOutput,
  getSalesStructure,
  getDedicatedMachine,
  getMidHigh,
  getFullChannel,
  getFrontChannel,
} from '@/store/actions/purchasereport';
import {
  grtFilterItemGroup
} from '@/store/actions/search';
import {previousDay} from '@/utils/index';

interface Data {
  purchaseVisable: boolean;
  CurrentFilterName: string;
  minStartDate: number;
  maxStartDate: number;
  // minEndDate: number;
  // maxEndDate: number;
  currentStartDate: number;
  // currentEndDate: number;
  filterForm: object;
  dataArr: any[];
  previousDayDate: string;
  tableData: object;
  reportType: string;
  isMaterialSelect: boolean;
  isRunTypeSelect: boolean;
  runTypeList: any[];
}
@connect({
  matklList({ search }) {
    return search.dmsmatklList2
  }
}, {
  grtFilterItemGroup, // 品类/物料组
  getGrossMarginDetail, // 毛利率
  getCollectionDeliveryDetail, // 回款提货额
  getMarketCoverageDetail, // 覆盖率
  getRunRateDetail, // 跑动率
  getDistributeNetworkIncrease, // 分销网络净增详情
  getDistributeNetworkRun, // 分销网络动销率详情
  getDistributeNetworkOutput, // 分销网络单店产出
  getSalesStructure, // 销售结构
  getDedicatedMachine, // 单击专供机占比
  getMidHigh, // 高中端占比
  getFullChannel, // 全渠道口径出货
  getFrontChannel, // 单击增量业务（前置渠道）
})
export default class extends wepy.page {
  config = {
    navigationBarTitleText: '',
    usingComponents: {
      'van-icon': '../../../../components/vant/icon/index',
      'van-popup': '../../../../../components/vant/popup/index',
      "van-datetime-picker": "../../../../../components/vant/datetime-picker/index",
      "van-datetime-picker-end": "../../../../../components/vant/datetime-picker/index"
    },
  };
  components = {
  };
  data: Data = {
    previousDayDate: '', // 前一天日期
    purchaseVisable: false,
    CurrentFilterName: '',
    minStartDate: new Date(2000, 10, 1).getTime(),
    maxStartDate: new Date(2100, 10, 1).getTime(),
    // minEndDate: new Date(2000, 10, 1).getTime(),
    // maxEndDate: new Date().getTime(),
    currentStartDate: new Date().getTime(),
    // currentEndDate: new Date().getTime(),
    filterForm: {
      startDate: (new Date()).Format('yyyy-MM'),
      // endDate: (new Date()).Format('yyyy-MM'),
      cisCode:'',
      runTypeCode:'1', // 跑动类型；默认分销商跑动
      // matklCode: [''], // 品类/物料组（多选）
      matklCode: '', // 品类/物料组
    },
    runTypeList: [
      { id: '1', code: '1', name: '分销商跑动'},
      { id: '2', code: '2', name: '下沉门店跑动明细'},
    ],
    dataArr:[],
    tableData: {
      column: [], // 表头
      content: [] // 内容
    },
    reportType: '', // 报表类型；不同报表共用此页面，以此作为区分
    isMaterialSelect: false, // 是否有品类下拉筛选; 默认没有
    isRunTypeSelect: false, // 是否有跑动类型下拉筛选; 默认没有
  };
  wxs = {
    utils: utilsWxs,
  };
  /**
   * 生命周期函数--监听页面加载
   */
  methods = {
    // 选择供应商
    touchFilter: (name) => {
      if (!this.purchaseVisable) {
        if(name === 'startDate'){
          let curr = this.filterForm.startDate.replace('-', '/') + '/01';
          // let max = this.filterForm.endDate.replace('-', '/') + '/01';
          // this.maxStartDate = new Date(max).getTime()
          this.currentStartDate = new Date(curr).getTime()
        }
        // if(name === 'endDate'){
        //   let curr = this.filterForm.endDate.replace('-', '/') + '/01';
        //   let min = this.filterForm.startDate.replace('-', '/') + '/01';
        //   this.minEndDate = new Date(min).getTime()
        //   this.currentEndDate = new Date(curr).getTime()
        // }
        this.purchaseVisable = true
        this.CurrentFilterName = name
        this.$apply()
        return
      }
      if (!name) {
        this.purchaseVisable = false
        this.CurrentFilterName = ''
        return
      }
      if (this.CurrentFilterName === name) {
        this.purchaseVisable = false
        this.CurrentFilterName = ''
        return
      }
      if (['startDate', 'endDate', 'material', 'runType'].indexOf(name) > -1) {
        this.CurrentFilterName = name
        return
      }
      this.purchaseVisable = false
      this.CurrentFilterName = ''
    },
    // 选择物料组
    onMaterial(e: any) {
      let id = e
      // 多选方法--暂时隐藏
      // let oIndex = this.filterForm.matklCode.indexOf(id)
      // if (oIndex > -1) {
      //   if(!id){
      //     this.filterForm.matklCode = ['']
      //   }else{
      //     this.filterForm.matklCode.splice(oIndex, 1)
      //     if(this.filterForm.matklCode.length == 0){
      //       this.filterForm.matklCode = ['']
      //     }
      //   }
      // } else {
      //   if(!id){
      //     this.filterForm.matklCode = ['']
      //   }else{
      //     this.filterForm.matklCode.push(id)
      //     this.filterForm.matklCode.forEach((item,index)=>{
      //       if(item == ''){
      //         this.filterForm.matklCode.splice(index,1)
      //       }
      //     })
      //   }
      // }

      this.filterForm.matklCode = id
      this.purchaseVisable = false
      this.getData()
      this.$apply()
    },
    // 选择跑动类型
    onRunType(e: any){
      let id = e
      this.filterForm.runTypeCode = id
      this.purchaseVisable = false
      this.getData()
      this.$apply()
    },
    // 选择开始时间
    onInput(e: { detail: any; }) {
      this.currentStartDate = e.detail
    },
    onConfirm(e: { detail: string; }) {
      this.purchaseVisable = false
      let date = new Date(parseInt(e.detail))
      let Y1 = date.getFullYear();
      let M1 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      const date1 = Y1 +'-'+ M1
      this.filterForm[this.CurrentFilterName] = date1
      this.getData()
    },

    // 选择结束时间
    onInputEnd(e: { detail: any; }) {
      this.currentEndDate = e.detail
    },
    onCancel() {
      this.purchaseVisable = false
    },
  }

  // 全渠道口径出货
  getFullChannel(){
    const {cisCode, startDate} = this.filterForm
    let param = {
      cisCode: cisCode,
      queryTime: startDate.replace(/-/g, ''),
    }
    this.methods.getFullChannel(param).then((res)=>{
      const { data } = res.payload
      if(data){
        this.tableData.content = data
      }
      this.$apply()
    })
  }

  // 单击增量业务（前置渠道）
  getFrontChannel(){
    const {cisCode, startDate} = this.filterForm
    let param = {
      cisCode: cisCode,
      queryTime: startDate.replace(/-/g, ''),
    }
    this.methods.getFrontChannel(param).then((res)=>{
      const { data } = res.payload
      if(data && data.frontChannel){
        this.tableData.content = [data.frontChannel]
      }
      this.$apply()
    })
  }

  // 专供机占比
  getDedicatedMachine(){
    const {cisCode, startDate} = this.filterForm
    let param = {
      cisCode: cisCode,
      queryTime: startDate.replace(/-/g, ''),
    }
    this.methods.getDedicatedMachine(param).then((res)=>{
      const { data } = res.payload
      if(data){
        this.tableData.content = data
      }
      this.$apply()
    })
  }

  // 高中端占比
  getMidHigh(){
    const {cisCode, startDate} = this.filterForm
    let param = {
      cisCode: cisCode,
      queryTime: startDate.replace(/-/g, ''),
    }
    this.methods.getMidHigh(param).then((res)=>{
      const { data } = res.payload
      if(data){
        this.tableData.content = data
      }
      this.$apply()
    })
  }

  // 销售结构
  getSalesStructure(){
    const {cisCode, startDate, endDate, matklCode} = this.filterForm
    let param = {
      cisCode: cisCode,
      queryTimeStart: startDate,
      queryTimeEnd: endDate,
      categoryCode: matklCode,
    }
    this.methods.getSalesStructure(param).then((res)=>{
      const { data } = res.payload
      this.tableData.content = data
      this.$apply()
    })
  }

  // 分销网络单店产出
  getDistributeNetworkOutput(){
    const {cisCode, startDate} = this.filterForm
    let param = {
      cisCode: cisCode,
      queryTime: startDate.replace(/-/g, ''),
    }
    this.methods.getDistributeNetworkOutput(param).then((res)=>{
      const { data } = res.payload
      if(data && data.distributeNetworkDevelopMaintain && data.distributeNetworkDevelopMaintain.singleOutput){
        this.tableData.content = [data.distributeNetworkDevelopMaintain.singleOutput]
      }
      this.$apply()
    })
  }

  // 分销网络动销率详情
  getDistributeNetworkRun(){
    const {cisCode, startDate} = this.filterForm
    let param = {
      cisCode: cisCode,
      queryTime: startDate.replace(/-/g, ''),
    }
    this.methods.getDistributeNetworkRun(param).then((res)=>{
      const { data } = res.payload
      if(data && data.distributeNetworkDevelopMaintain && data.distributeNetworkDevelopMaintain.dynamicSales){
        this.tableData.content = [data.distributeNetworkDevelopMaintain.dynamicSales]
      }
      this.$apply()
    })
  }

  // 分销网络净增
  getDistributeNetworkIncrease(){
    const {cisCode, startDate} = this.filterForm
    let param = {
      cisCode: cisCode,
      queryTime: startDate.replace(/-/g, ''),
    }
    this.methods.getDistributeNetworkIncrease(param).then((res)=>{
      const { data } = res.payload
      if(data && data.distributeNetworkDevelopMaintain && data.distributeNetworkDevelopMaintain.distributeNetwork){
        this.tableData.content = [data.distributeNetworkDevelopMaintain.distributeNetwork]
      }
      this.$apply()
    })
  }

  // 跑动率
  getRunRateDetail(){
    const {cisCode, startDate} = this.filterForm
    let param = {
      cisCode: cisCode,
      dataDate: startDate,
    }
    this.methods.getRunRateDetail(param).then((res)=>{
      const { list } = res.payload
      if(list){
        this.tableData.content = list
      }
      this.$apply()
    })
  }

  // 覆盖率
  getMarketCoverageDetail(){
    const {cisCode, startDate} = this.filterForm
    let param = {
      cisCode: cisCode,
      dataDate: startDate,
    }
    this.methods.getMarketCoverageDetail(param).then((res)=>{
      const { list } = res.payload
      if(list){
        this.tableData.content = list
      }
      this.$apply()
    })
  }

  // 回款提货额
  getCollectionDeliveryDetail(){
    const {cisCode, startDate} = this.filterForm
    let param = {
      cisCode: cisCode,
      dataDate: startDate,
    }
    this.methods.getCollectionDeliveryDetail(param).then((res)=>{
      const { list } = res.payload
      if(list){
        this.tableData.content = list
      }
      this.$apply()
    })
  }

  // 毛利率
  getGrossMarginDetail(){
    const {cisCode, startDate} = this.filterForm
    let param = {
      cisCode: cisCode,
      dataDate: startDate,
    }
    this.methods.getGrossMarginDetail(param).then((res)=>{
      const { list } = res.payload
      if(list){
        this.tableData.content = list
      }
      this.$apply()
    })
  }
  getData(){
    // 分销网络净增
    if(this.reportType == 'netIncrease'){
      this.getDistributeNetworkIncrease()
    }
    // 分销网络动销率
    if(this.reportType == 'onlineSalesRate'){
      this.getDistributeNetworkRun()
    }
    // 分销网络单店产出
    if(this.reportType == 'onlineStoreOutput'){
      this.getDistributeNetworkOutput()
    }
    // 销售结构
    if(this.reportType == 'salesStructure'){
      this.getSalesStructure()
    }
    // 高中端占比表
    if(this.reportType == 'middleHighProportion'){
      this.getMidHigh()
    }
    // 专供机占比
    if(this.reportType == 'machinesProportion'){
      this.getDedicatedMachine()
    }
    // 增量业务(前置渠道)
    if(this.reportType == 'incrementalBusiness'){
      this.getFrontChannel()
    }
    // 全渠道口径出货
    if(this.reportType == 'omniChannelCaliber'){
      this.getFullChannel()
    }
    // 回款提货额
    if(this.reportType == 'cashBackPickUp'){
      this.getCollectionDeliveryDetail()
    }
    // 跑动率
    if(this.reportType == 'runningRate'){
      this.getRunRateDetail()
    }
    // 毛利率
    if(this.reportType == 'grossProfitMargin'){
      this.getGrossMarginDetail()
    }
    // 覆盖率
    if(this.reportType == 'coverage'){
      this.getMarketCoverageDetail()
    }
  }
  tableInit(){
    this.filterForm.cisCode = wepy.$instance.globalData.cisCode

    // 分销网络净增
    if(this.reportType == 'netIncrease'){
      wx.setNavigationBarTitle({ title: '分销网络净增' })
      this.tableData.column =[
        {prop:'annualTarget', label:'年累目标'},
        {prop:'monthAccomplish', label:'当月完成'},
        {prop:'annualAccomplish', label:'年累完成'},
        ]
    }
    // 分销网络动销率
    if(this.reportType == 'onlineSalesRate'){
      wx.setNavigationBarTitle({ title: '分销网络动销率' })
      this.tableData.column =[
        {prop:'monthRate', label:'当月动销率'},
        {prop:'monthNum', label:'当月动销数量'},
        {prop:'monthRateTarget', label:'当月动销率目标'},
        {prop:'compareLastYear', label:'同比改善率'}]
    }
    // 分销网络单店产出
    if(this.reportType == 'onlineStoreOutput'){
      wx.setNavigationBarTitle({ title: '分销网络单店产出' })
      this.tableData.column =[
        {prop:'singleOutput', label:'当月完成(万元)'},
        {prop:'singleOutputTarget', label:'当月目标(万元)'},
        {prop:'monthSingleOutputCompletion', label:'完成率'},
        {prop:'compareLastYear', label:'同比增幅'}]
    }
    // 销售结构
    // if(this.reportType == 'salesStructure'){
    //   wx.setNavigationBarTitle({ title: '销售结构' })
    //   this.isMaterialSelect = true
    //   this.tableData.column =[
    //     {prop:'time', label:'时间'},
    //     {prop:'categoryName', label:'品类'},
    //     {prop:'midHighPlan', label:'高中端目标'},
    //     {prop:'midHighComplete', label:'当月完成'}]
    // }

    // 高中端占比表
    if(this.reportType == 'middleHighProportion'){
      wx.setNavigationBarTitle({ title: '高中端占比' })
      this.tableData.column =[
        {prop:'categoryName', label:'品类'},
        {prop:'target', label:'占比目标'},
        {prop:'accomplish', label:'当月完成'},
        {prop:'completion', label:'完成率'},
        {prop:'chain', label:'环比'},
        {prop:'year', label:'同比'},
      ]
    }
    // 专供机占比
    if(this.reportType == 'machinesProportion'){
      wx.setNavigationBarTitle({ title: '专供机占比' })
      this.tableData.column =[
        {prop:'categoryName', label:'品类'},
        {prop:'target', label:'占比目标'},
        {prop:'accomplish', label:'当月占比'},
        {prop:'completion', label:'完成率'},
        {prop:'chain', label:'环比'},
        {prop:'year', label:'同比'},
        ]
    }
    // 增量业务(前置渠道)
    if(this.reportType == 'incrementalBusiness'){
      wx.setNavigationBarTitle({ title: '增量业务(前置渠道)' })
      this.tableData.column =[
        {prop:'proportionTarget', label:'占比目标'},
        {prop:'currentMonthProportion', label:'当月占比'},
        {prop:'completion', label:'完成率'},
        {prop:'compareLastMonth', label:'环比'},
        {prop:'compareLastYear', label:'同比'},
      ]
    }
    // 全渠道口径出货
    if(this.reportType == 'omniChannelCaliber'){
      wx.setNavigationBarTitle({ title: '全渠道口径出货' })
      this.tableData.column =[
        {prop:'categoryName', label:'品类'},
        {prop:'target', label:'当月完成(万元)'},
        {prop:'accomplish', label:'当月目标(万元)'},
        {prop:'completion', label:'完成率'},
      ]
    }
    // 回款提货额
    if(this.reportType == 'cashBackPickUp'){
      wx.setNavigationBarTitle({ title: '回款提货额' })
      this.tableData.column =[
        {prop:'mgName', label:'品类'},
        {prop:'collectionTarget', label:'当月任务(万元)'},
        {prop:'collectionCurrent', label:'当月完成(万元)'},
        {prop:'collectionCompletionRate', label:'完成率'},
        {prop:'collectionYearOverYear', label:'同比'},
        {prop:'collectionMonthOverRate', label:'环比'},
      ]
    }
    // 跑动率
    if(this.reportType == 'runningRate'){
      wx.setNavigationBarTitle({ title: '跑动率' })
      this.tableData.column =[
        {prop:'type', label:'类型'},
        {prop:'ypdmds', label:'已跑动门店数'},
        {prop:'pdl', label:'跑动率'},]
    }
    // 毛利率
    if(this.reportType == 'grossProfitMargin'){
      wx.setNavigationBarTitle({ title: '毛利率' })
      // this.isMaterialSelect = true
      this.tableData.column =[
        {prop:'mgName', label:'品类'},
        {prop:'grossMargin', label:'毛利点位'},
        {prop:'basicOperationPoint', label:'基本运营点位'},
        {prop:'grossTotalAmount', label:'金额(万元)'},
        {prop:'hb', label:'环比'},
        {prop:'tb', label:'同比'}]
    }
    // 覆盖率
    if(this.reportType == 'coverage'){
      wx.setNavigationBarTitle({ title: '覆盖率' })
      this.tableData.column =[
        {prop:'yfgxzzs', label:'已覆盖乡镇总数'},
        {prop:'yingfgxzzs', label:'应覆盖乡镇总数'},
        {prop:'fgl', label:'当月市场覆盖率'},
        {prop:'fglhb', label:'当月环比'}]
    }

    if(this.isMaterialSelect){ // 如果有品类选项，需要调品类列表接口
      this.methods.grtFilterItemGroup()
    }
    this.getData()
    this.$apply()
  }
  onShow() {
    this.previousDayDate = previousDay()
    this.tableInit()
  }
  onLoad(e){
    const { type } = e
    this.reportType = type
  }
}
