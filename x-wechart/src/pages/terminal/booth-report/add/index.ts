import wepy from 'wepy';
import {connect} from "wepy-redux";
import {fillZero, isPicture, removeIllegalStr} from '@/utils/index';
import Toast from "@/components/vant/toast/toast";
import Dialog from "@/components/vant/dialog/dialog";
import popupCustomize from "../../../components/popup-customize/index";

import {
  getBoothReportDetail,
  getCustomerShop,
  getQueryOrg,
  getMaterialGroups,
  getPlanProjectNameComboBox,
  getShopDetail,
  getOrderTypeComboBox,
  getIsSpecialShop,
  getDict,
  getSupplierComboBox,
  postFlowStart,
  getOfficeManager,
  postTmpSave,
  getDistributeNetworkScale,
} from '@/store/actions/store'
import {
  uploadImg,
} from '@/store/actions/record'

interface Data {
  yearsVisable: boolean;
  maxDate: any;
  currentDate: any;
  minDate: any;
  popTitle: string;
  currentOptions: any[];
  popSelectedOption: object;
  isSearch: boolean;
  isDisabled: boolean;
  isClickable: boolean;
  formData: object;
  salesInfo: any[];
  salesIndex: any;
  formOptions: object;
  calendarShow: boolean;
  calendarConfig: object;
  activeDetail: any;
  pageType: any;
  currId: any;
  approveShow: boolean;
  officeMaskShow: boolean;
  discardDetailIdList: any[];
}
@connect({
  regins({ record }) {
    return record.regins
  }
}, {
  uploadImg,
  getBoothReportDetail,
  getQueryOrg,
  getPlanProjectNameComboBox,
  getCustomerShop,
  getMaterialGroups,
  getShopDetail,
  getOrderTypeComboBox,
  getIsSpecialShop,
  getDict,
  getSupplierComboBox,
  postFlowStart,
  getOfficeManager,
  postTmpSave,
  getDistributeNetworkScale,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '',
    usingComponents: {
      'van-toast': '../../../../components/vant/toast/index',
      "van-field": "../../../../components/vant/field/index",
      "van-cell": "../../../../components/vant/cell/index",
      'van-uploader': '../../../../components/vant/uploader/index',
      "van-icon": "../../../../components/vant/icon/index",
      'van-popup': '../../../../components/vant/popup/index',
      'van-dialog': '../../../../components/vant/dialog/index',
      'calendar': '../../../../components/calendar/index',
      'van-search': '../../../../components/vant/search/index',
      "van-datetime-picker": "../../../../components/vant/datetime-picker/index",
    },
  };
  data: Data = {
    yearsVisable: false, // 年月日期是否显示
    maxDate: new Date(new Date().getFullYear() + 10, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    popTitle: '',
    currentOptions: [],
    popSelectedOption: {},
    isSearch: false,
    calendarConfig: { // 日历配置
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    calendarShow: false,
    isClickable: true, // 提交是防止多次点击
    formData: {
      projectOrg: {
        id: '',
        name: ''
      }, // 立项组织
      requirementItem: '', // 需求项目名称
      planProject: {
        id: '',
        name: ''
      }, // 计划项目名称
      instruction: '', // 说明
      attachment: [], // 附件; 图片附件，可编辑
      document: [], // 附件; 文档附件，只是展示
      officeManager: {
        id: '',
        name: ''
      }, // 办事处经理
      reason: '', // 申请原因
    }, // 表单信息
    salesInfo: [], // 需求子单列表
    salesIndex: 0, // 需求子单列表下标
    formOptions: { // 选择列表集合
      projectOrg: [], // 立项组织列表
      planProject: [], // 计划项目名称列表
      store: [], // 门店列表
      requirementType: [], // 需求类型列表
      isBrandPark:[
        {id:'0', name: '否'},
        {id:'1', name: '是'},
      ], // 是否品牌园列表
      dispatchType: [], // 派单类型列表
      supplier: [], // 供应商列表
      officeManager: [], // 办事处经理列表
    },

    isDisabled: false, // 页面是否可编辑,默认可编辑; false可编辑，true不可编辑
    pageType: '', // 页面当前状态
    currId: '', // 当前详情id; 值是空则为新增,非空为查看详情
    activeDetail: {}, // 活动详情
    approveShow: false, // 办事处经理弹框显示
    officeMaskShow: false, // 办事处经理列表显示隐藏
    discardDetailIdList: [], // 遗弃的子单主键,,,如果删除详情里返回的子单，需要记录子弹主键，并在提交时提交
  };
  components = {
    popupCustomize,
  };
  // 页面内交互写在methods里
  methods = {
    // 改变表单输入框触发事件并赋值
    onFilterFormChange(evt) {
      if( this.isDisabled ){
        return
      }
      const { detail, currentTarget: { dataset: { key, index } } } = evt
      this.salesIndex = index
      this.formKey = key

      if(!this.salesIndex && this.salesIndex != 0){ // 表单输入框赋值
        this.formData[this.formKey] = detail
      }else{ // 子单列表中输入框赋值
        this.salesInfo[this.salesIndex][this.formKey] = detail
      }

    },

    // 打开筛选列表弹框
    onPopOpen(e){
      if( this.isDisabled ){
        return
      }
      const {dataset: { name, key, index }} = e.currentTarget

      this.salesIndex = index
      this.isSearch = false // 选择弹框列表是否可搜索
      this.multiple = false // 选择弹框列表是否多选
      this.popTitle = name // 选择弹框标题
      this.formKey = key
      this.currentOptions = this.formOptions[this.formKey]

      if(!this.salesIndex && this.salesIndex != 0){ // 表单列表中的当前选择项赋值
        this.popSelectedOption = this.formData[this.formKey]
      }else{ // 子单列表中的当前选择项赋值

        // 0：普通安装派单；1：总部统装派单； 2：连锁统装派单
        if(this.formKey==='supplier'){ // 需求子单 派单类型 未选择 连锁统装派单 时，不能填写供应商！
          if(this.salesInfo[this.salesIndex]['dispatchType'].id != '2'){
            return;
          }
        }

        if( this.formKey === 'materialGroup' ){
          this.currentOptions = this.salesInfo[this.salesIndex][this.formKey].options
        }
        this.popSelectedOption =  this.salesInfo[this.salesIndex][this.formKey]
        if( this.formKey === 'store' ){
          this.isSearch = true
        }
        if( this.formKey === 'supplier' ){
          this.isSearch = true
        }
      }

      this.$invoke('popupCustomize', 'onShow');
      this.$apply()
    },

    // 选择对应列表项并赋值
    chooseOption(item){

      if(this.formKey!=='dispatchType'){ // 派单类型单独赋值，其他同一用该方法
        if(!this.salesIndex && this.salesIndex != 0){ // 表单列表中的选择项赋值
          this.formData[this.formKey].id = item.id
          this.formData[this.formKey].name = item.name
        }else{ // 子单列表中的选择项赋值
          this.salesInfo[this.salesIndex][this.formKey].id = item.id
          this.salesInfo[this.salesIndex][this.formKey].name = item.name
        }
      }

      if(this.formKey==='store'){ // 门店
        this.salesInfo[this.salesIndex]['materialGroup'].id = ''
        this.salesInfo[this.salesIndex]['materialGroup'].name = ''
        this.salesInfo[this.salesIndex]['materialGroup'].options = []
        this.salesInfo[this.salesIndex]['office'].id = ''
        this.salesInfo[this.salesIndex]['office'].name = ''
        this.salesInfo[this.salesIndex]['office'].cisDetailId = ''
        this.salesInfo[this.salesIndex]['office'].options = []
        this.salesInfo[this.salesIndex]['disNetworkSize'] = ''
        this.getIsSpecialShopData()
        this.getMaterialGroupsData()
      }
      if(this.formKey==='materialGroup'){ // 物料组
        this.salesInfo[this.salesIndex]['office'].id = ''
        this.salesInfo[this.salesIndex]['office'].name = ''
        this.salesInfo[this.salesIndex]['office'].cisDetailId = ''
        this.salesInfo[this.salesIndex]['office'].options = []
        this.salesInfo[this.salesIndex]['disNetworkSize'] = ''
        this.getShopDetailData()
      }

      if(this.formKey==='projectOrg'){ // 立项组织，立项组织改变 所有的子单清空; 如果是接口返回的子单，删除时需要把子单id保存起来
        if(this.salesInfo.length>0){
          this.salesInfo.forEach((info)=>{
            if(info.viewType && info.viewType === 'default'){
              this.discardDetailIdList.push(info.id)
            }
          })
          this.formOptions.store = []
          this.salesInfo = []
        }
      }

      if(this.formKey==='dispatchType'){ // 派单类型
        // 0：普通安装派单；1：总部统装派单； 2：连锁统装派单
        if(item.id == '1'){
          Dialog.confirm({
            message: '仅限于总部重点门店建店使用，不会自动派单，将由总部建店负责人在NP-SRM直接派工至总部指定搭建方，请再次确认！',
          })
            .then(() => {
              this.salesInfo[this.salesIndex][this.formKey].id = item.id
              this.salesInfo[this.salesIndex][this.formKey].name = item.name
              this.salesInfo[this.salesIndex]['supplier'].id = '' // 需求子单 派单类型 未选择 连锁统装派单 时，不能填写供应商！
              this.salesInfo[this.salesIndex]['supplier'].name = ''
              this.$apply()
            })
            .catch(() => {
              // on cancel
            });
        }else if(item.id == '2'){
          Dialog.confirm({
            message: '仅针对连锁渠道指定商家（如：顶、地制作），请再次确认是否要进行连锁统装派单？如选择此项，后期将纳入审计重点核查门店！',
          })
            .then(() => {
              this.salesInfo[this.salesIndex][this.formKey].id = item.id
              this.salesInfo[this.salesIndex][this.formKey].name = item.name
              this.$apply()
            })
            .catch(() => {
              // on cancel
            });
        }else{
          this.salesInfo[this.salesIndex][this.formKey].id = item.id
          this.salesInfo[this.salesIndex][this.formKey].name = item.name
          this.salesInfo[this.salesIndex]['supplier'].id = '' // 需求子单 派单类型 未选择 连锁统装派单 时，不能填写供应商！
          this.salesInfo[this.salesIndex]['supplier'].name = ''
        }
      }

      this.$invoke('popupCustomize', 'onClose');
      this.$apply()
    },

    // 筛选列表弹框搜索触发事件
    onSearchOption(searchValue){
      if(this.formKey==='store'){ // 门店
        this.getCustomerShopData(searchValue)
      }
      if( this.formKey === 'supplier' ){
        this.getSupplierComboBoxData(searchValue)
      }
    },

    // 删除图片
    deleteImg(event){
      let { key } = event.currentTarget.dataset
      this.formData[key].splice(event.detail.index, 1)
      this.$apply()
    },

    //上传图片
    afterRead(event) {
      this.selImg(event.detail.file.path, event.currentTarget.dataset.key)
    },

    // 删除信息
    delSales(event){
      // 详情状态不能编辑
      if( this.isDisabled ){
        return
      }
      let { index } = event.currentTarget.dataset
      if(this.salesInfo[index].viewType && this.salesInfo[index].viewType === 'default'){
        this.discardDetailIdList.push(this.salesInfo[index].id)
      }
      this.salesInfo.splice(index, 1)
      this.$apply()
    },

    // 添加信息
    addSales(){
      const { projectOrg } = this.data.formData
      const { requirementType, dispatchType } = this.data.formOptions
      let rtItem = { id: '', name: ''}
      let dtItem = { id: '', name: ''}
      if(requirementType && requirementType.length>0){
        requirementType.forEach((item)=>{
          if(item.id == '14182400546'){ // 默认新店开业
            rtItem = item
          }
        })
      }
      if(dispatchType && dispatchType.length>0){
        dtItem = dispatchType[0]
      }

      if (!projectOrg.id) {
        Toast.fail('请先选择立项组织')
        return false
      }
      this.salesInfo.push({
        subOrderNumber: '', // 需求子单号
        store: {
          id: '',
          name: ''
        }, // 门店
        isSpecialtyStore: {
          id: '',
          name: ''
        }, // 是否专卖店
        materialGroup: {
          id: '',
          name: '',
          options: [] // 物料组列表，，，由于每个子单显示列表需要根据各自的门店id获取，列表不同需要区分
        }, // 物料组
        disNetworkSize: '', // 分销网络规模
        office: {
          id: '',
          name: '',
        }, // 所属办事处
        requirementType: {
          id: rtItem.id,
          name: rtItem.name
        }, // 需求类型
        isBrandPark: {
          id: '',
          name: ''
        }, // 是否品牌园
        dispatchType: {
          id: dtItem.id,
          name: dtItem.name
        }, // 派单类型
        supplier: {
          id: '',
          name: ''
        }, // 供应商
        costEstimate: 0, // 费用预估(元)
        completeTime: '', // 要求完成时间
        oneYearTargetSales: '', // 进场起一年内目标销量(台)
        oneYearTargetAmount: '', // 进场起一年内目标销售额(万元)
        usePeriod: {
          minDate:'',
          maxDate:''
        }, // 展台使用期限(年)
        instruction: '', // 说明
      })
      this.$apply()
    },

    // 暂存
    onStorage: () =>{
      const { projectOrg, requirementItem, planProject, instruction, attachment } = this.data.formData

      const salesInfo = this.data.salesInfo
      let saleInfoList = []
      if(salesInfo && salesInfo.length > 0){
        saleInfoList = salesInfo.map((item)=>{
          let boothServiceLife = ''
          if (item.usePeriod.minDate || item.usePeriod.maxDate){
            boothServiceLife = item.usePeriod.minDate + '-' + item.usePeriod.maxDate
          }
          return {
            id: item.id ? item.id : '', // 子单主键
            exhibitionStandReportId: this.activeDetail && this.activeDetail.id ? this.activeDetail.id : '0', // 主单主键 可不填
            materialGroupId: item.materialGroup.id, // 物料组id
            customerShopId: item.store.id, // 商家门店主键
            customerShopDetailId: item.office.cisDetailId ? item.office.cisDetailId : '', // 商家门店详情主键
            demandTypeId: item.requirementType.id, // 需求类型编码
            isBuildBrandPark: item.isBrandPark.id, // 是否品牌园编码
            sendOrderTypeCode: item.dispatchType.id, // 派单类型编码
            supplierCode: item.supplier.id, // 供应商编码
            supplierName: item.supplier.name, // 供应商名称
            estimatedCost: item.costEstimate, // 费用预估（元）
            scheduledFinishTime: item.completeTime, // 要求完成时间
            targetSalesValWithinOneYear: item.oneYearTargetSales, // 进场一年内目标销量（台）
            targetSalesMoneyWithinOneYear: item.oneYearTargetAmount, // 进场一年内目标销售额（元）
            remark: item.instruction, // 备注
            boothServiceLife: boothServiceLife, //展台使用年限
            annualSalesScale: item.disNetworkSize //分销商网络规模
          }
        })
      }

      let attachs = []
      attachs = attachment.map(item => {
        return {
          id: item.id
        }
      })

      let param = {
        exhibitionStandDemandReportId: this.activeDetail && this.activeDetail.id ? this.activeDetail.id : '0', // 展台需求提报主键，新增的时候填0，编辑则详情返回什么填什么
        exhibitionStandDemandReportCode: "", // 不用填
        orgId: projectOrg.id, // 立项组织id
        demandProjectName: requirementItem, // 需求项目名称
        planProjectId: planProject.id, // 计划项目id
        description: instruction, // 备注
        attachmentList: attachs, // 附件
        detailVOList: saleInfoList,
        discardDetailIdList: this.discardDetailIdList, // 遗弃的子单主键
      }
      if(!this.isClickable){
        return
      }
      this.isClickable = false
      Toast.loading({
        forbidClick: true,
        duration: 1000,
        message: '加载中...',
      });
      let msg = '暂存成功'
      this.methods.postTmpSave(param).then((res)=>{
        const { payload } = res
        if(payload.code == '0'){
          Toast.success({
            forbidClick: true,
            duration: 1000,
            message: msg,
            onClose: () => {
              wx.navigateBack({
                delta: 1,
              });
            },
          });
        }else{
          Toast.fail({
            forbidClick: true,
            message: payload.msg,
          })
        }
        this.isClickable = true
        this.$apply()
      })
    },

    // 提交
    toAddStore: () => {
      let checkResault = this.methods.checkParam()
      if(checkResault){
        this.approveShow = true
      }
    },

    // 提交前校验
    checkParam: () => {
      const { projectOrg, requirementItem, planProject } = this.data.formData
      const salesInfo = this.data.salesInfo
      if (!projectOrg.id) {
        Toast.fail('请选择立项组织')
        return false
      }
      if (!requirementItem) {
        Toast.fail('请填写需求项目名称')
        return false
      }
      if (!planProject.id) {
        Toast.fail('请选择计划项目名称')
        return false
      }

      // 可以没有物料；如果有物料，物料组必填且物料组不能重复，
      if(salesInfo && salesInfo.length>0){
        let tip = this.isEmpty(salesInfo)
        if(tip){
          Toast.fail(tip)
          return false
        }
      }else{
        Toast.fail('请先添加需求子单')
        return false
      }
      return true
    },

    // 取消
    toRevoke: () => {
      wx.navigateBack({
        delta: 1,
      });
    },

    // 打开日历
    openCalendar(e) {
      if( this.isDisabled ){
        return
      }
      const {dataset: { key, index }} = e.currentTarget
      this.salesIndex = index
      this.formKey = key
      // const minDate = nextDay();
      // const maxDate = '9999-12-31'
      // const { startDate, endDate } = this.formData;
      // // this.currentDateName = key
      // let begin, end;
      // begin = startDate
      // end = endDate
      //
      // if (key.indexOf('startDate') > -1) {
      //   this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      // }
      // if (key.indexOf('endDate') > -1) {
      //   this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
      // }
      this.calendarShow = true;
    },

    // 关闭日历
    closeCalendar() {
      this.calendarShow = false;
    },

    // 选择日期
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.salesInfo[this.salesIndex][this.formKey] = day
      this.calendarShow = false;
    },

    // 办事处经理弹框确定并提交
    onApproveConfirm() {
      const { projectOrg, requirementItem, planProject, instruction, attachment, officeManager, reason } = this.data.formData

      if (!officeManager.id) {
        Toast.fail('请选择办事处经理')
        return false
      }
      if (!reason) {
        Toast.fail('请填写申请原因')
        return false
      }

      let type = this.data.pageType
      const salesInfo = this.data.salesInfo
      let saleInfoList = []
      if(salesInfo && salesInfo.length > 0){
        saleInfoList = salesInfo.map((item)=>{
          return {
            id: item.id ? item.id : '', // 子单主键
            exhibitionStandReportId: this.activeDetail && this.activeDetail.id ? this.activeDetail.id : '0', // 主单主键 可不填
            materialGroupId: item.materialGroup.id, // 物料组id
            customerShopId: item.store.id, // 商家门店主键
            customerShopDetailId: item.office.cisDetailId ? item.office.cisDetailId : '', // 商家门店详情主键
            demandTypeId: item.requirementType.id, // 需求类型编码
            isBuildBrandPark: item.isBrandPark.id, // 是否品牌园编码
            sendOrderTypeCode: item.dispatchType.id, // 派单类型编码
            supplierCode: item.supplier.id, // 供应商编码
            supplierName: item.supplier.name, // 供应商名称
            estimatedCost: item.costEstimate, // 费用预估（元）
            scheduledFinishTime: item.completeTime, // 要求完成时间
            targetSalesValWithinOneYear: item.oneYearTargetSales, // 进场一年内目标销量（台）
            targetSalesMoneyWithinOneYear: item.oneYearTargetAmount, // 进场一年内目标销售额（元）
            remark: item.instruction, // 备注
            boothServiceLife: item.usePeriod.minDate + '-' + item.usePeriod.maxDate, //展台使用年限
            annualSalesScale: item.disNetworkSize //分销商网络规模
          }
        })
      }

      let attachs = []
      attachs = attachment.map(item => {
        return {
          id: item.id
        }
      })

      let param = {
        exhibitionStandDemandReportId: this.activeDetail && this.activeDetail.id ? this.activeDetail.id : '0', // 展台需求提报主键，新增的时候填0，编辑则详情返回什么填什么
        exhibitionStandDemandReportCode: "", // 不用填
        orgId: projectOrg.id, // 立项组织id
        demandProjectName: requirementItem, // 需求项目名称
        planProjectId: planProject.id, // 计划项目id
        description: instruction, // 备注
        attachmentList: attachs, // 附件
        detailVOList: saleInfoList,
        discardDetailIdList: this.discardDetailIdList, // 遗弃的子单主键
        officeManagerAccountId: officeManager.id, // 办事处经理账户id
        applyReason: reason // 申请原因
      }
      if(!this.isClickable){
        return
      }
      this.isClickable = false
      Toast.loading({
        forbidClick: true,
        duration: 1000,
        message: '加载中...',
      });
      let msg = ''
      if(type == 'add'){ // 新增
        msg = '新增成功'

      } else { // 修改
        msg = '修改成功'
      }
      this.methods.postFlowStart(param).then((res)=>{
        const { payload } = res
        if(payload.code == '0'){
          Toast.success({
            forbidClick: true,
            duration: 1000,
            message: msg,
            onClose: () => {
              wx.navigateBack({
                delta: 1,
              });
            },
          });
        }else{
          Toast.fail({
            forbidClick: true,
            message: payload.msg,
          })
        }
        this.isClickable = true
        this.$apply()
      })

    },

    // 只要关闭办事处经理弹框都会触发
    onApproveClose() {
      this.approveShow = false
      this.$apply()
    },

    // 办事处经理列表筛选并赋值
    onOfficeManagerChange(e){
      let detail = e.detail
      this.formData.officeManager.name =  detail ? detail.trim() : ''
      this.officeMaskShow = true
      this.getOfficeManagerData(this.formData.officeManager.name)
    },
    onOfficeManagerSelect(evt){
      const { currentTarget: { dataset: { item } } } = evt
      this.formData.officeManager.id =  item.id
      this.formData.officeManager.name =  item.name
      this.officeMaskShow = false
    },
    officeMaskHide(){
      this.formData.officeManager.id =  ''
      this.formData.officeManager.name =  ''
      this.officeMaskShow = false
    },

    // 弹出年份日历弹框
    onYearDateOpen(e){
      if( this.isDisabled ){
        return
      }
      const {dataset: { key, index }} = e.currentTarget
      this.salesIndex = index
      this.formKey = key

      let cDate = this.salesInfo[this.salesIndex]['usePeriod'][this.formKey]
      if(cDate){
        this.currentDate = new Date(cDate,1,1).getTime()
      }

      this.yearsVisable = true
    },
    // 选择年 日历
    onInput(e: { detail: any; }) {
      this.currentDate = e.detail
    },

    // 年 日历确定
    onConfirm(e: { detail: string; }) {
      let date = new Date(parseInt(e.detail))
      let Y = date.getFullYear();
      this.salesInfo[this.salesIndex]['usePeriod'][this.formKey] = Y
      this.yearsVisable = false
    },

    // 年 日历取消
    onCancel() {
      this.yearsVisable = false
    },
  };
  isEmpty(arr){
    for(let i=0;i<arr.length;i++){
      if (!arr[i].store.id) {
        return `第${i+1}条需求子单 门店 不能为空`
      }
      if (!arr[i].isSpecialtyStore.id) {
        return `第${i+1}条需求子单 是否专卖店 不能为空`
      }
      if (!arr[i].materialGroup.id) {
        return `第${i+1}条需求子单 物料组 不能为空`
      }
      if (!arr[i].office.id) {
        return `第${i+1}条需求子单 所属办事处 不能为空`
      }
      if (!arr[i].requirementType.id) {
        return `第${i+1}条需求子单 需求类型 不能为空`
      }
      if (!arr[i].isBrandPark.id) {
        return `第${i+1}条需求子单 是否品牌园 不能为空`
      }
      if (!arr[i].dispatchType.id) {
        return `第${i+1}条需求子单 派单类型 不能为空`
      }
      if (arr[i].costEstimate === '') {
        return `第${i+1}条需求子单 费用预估 不能为空`
      }
      if (!arr[i].completeTime) {
        return `第${i+1}条需求子单 要求完成时间 不能为空`
      }
      if (!arr[i].usePeriod.minDate || !arr[i].usePeriod.maxDate) {
        return `第${i+1}条需求子单 展台使用期限 不能为空`
      }
      if (arr[i].usePeriod.minDate > arr[i].usePeriod.maxDate) {
        return `第${i+1}条需求子单 展台使用期限结束时间需大于等于开始时间`
      }
      if (!arr[i].instruction) {
        return `第${i+1}条需求子单 说明 不能为空`
      }
    }
    return false
  }

  //选择照片
  selImg(path, key) {
    if(!path){
      return
    }
    let that = this
    let fileNameArr = path.split('/')
    let fileName = fileNameArr[fileNameArr.length-1]
    let obj = {}
    let FSM = wx.getFileSystemManager()
    FSM.readFile({
      filePath: path,
      encoding: 'base64',
      success: function(res) {
        const data = {
          'fileName': fileName,
          'fileType': 'custApply',
          'file': 'image/jpeg;base64,' + res.data
        }
        that.methods.uploadImg(data).then(res2 => {
          obj.url = res2.payload.url
          obj.id = res2.payload.businessId
          obj.name = res2.payload.fileNameString
          that.formData[key].push(obj)
          that.$apply()
        })
      }
    })
  }

  // 查询图片回显路径
  getPictureUrl(file){
    let attachs = {
      photo: [],
      documentation: [],
    }
    if(file && file.length){
      file.forEach((item)=>{
        let obj = {
          ...item,
          id: item.id,
          name: item.attachName,
          url: item.attachPath,
          viewType: 'default',
        }
        if(isPicture(item.attachFormat)){
          attachs.photo.push(obj)
        }else {
          attachs.documentation.push(obj)
        }
      })
    }
    return attachs
  }

  // 根据关键字查询海信办事处经理下拉框
  getOfficeManagerData(searchKeyWord){
    const { projectOrg } = this.data.formData
    const salesInfo = this.data.salesInfo
    let patam = salesInfo.map((item)=>{
      return {
        orgId: projectOrg.id, // 组织id
        officeId: item.office.id, // 办事处id
        materialGroupIds: item.materialGroup.id, // 物料组id
        searchKeyWords: searchKeyWord // 查询关键字
      }
    })
    this.methods.getOfficeManager(patam).then((res)=>{
      let { list } = res.payload
      if(list && list.length>0){
        list = list.map((item)=>{
          return {
            ...item,
            id: item.code,
            name: item.name
          }
        })
        this.formOptions.officeManager = list
      }

      this.$apply()
    })
  }

  // 获取供应商下拉框
  getSupplierComboBoxData(searchKeyWord){
    let patam = {
      searchKeyWord: searchKeyWord // 编码或名称关键字
    }
    this.methods.getSupplierComboBox(patam).then((res)=>{
      let { data } = res.payload
      if(data){
        data = data.map((item)=>{
          return {
            ...item,
            id: item.code,
            name: item.name
          }
        })
        this.formOptions.supplier = data
        this.currentOptions = this.formOptions.supplier
      }

      this.$apply()
    })
  }

  // 获取需求类型下拉框
  getDictData(){
    let patam = {
      pid: '14182400533'
    }
    this.methods.getDict(patam).then((res)=>{
      let { list } = res.payload
      if(list){
        list = list.map((item)=>{
          return {
            ...item,
            id: item.code,
            name: item.name
          }
        })
        this.formOptions.requirementType = list
      }

      this.$apply()
    })
  }

  // 获取派单类型下拉框
  getOrderTypeComboBoxData(){
    this.methods.getOrderTypeComboBox().then((res)=>{
      let { data } = res.payload
      if(data){
        data = data.map((item)=>{
          return {
            ...item,
            id: item.code,
            name: item.name
          }
        })
        this.formOptions.dispatchType = data
      }

      this.$apply()
    })
  }

  // 根据门店id、物料组id,1、查询门店所属办事处2、查询分销网络规模
  getShopDetailData(){
    let customerShopId = this.salesInfo[this.salesIndex]['store'].id
    let materialGroupId = this.salesInfo[this.salesIndex]['materialGroup'].id
    if(!customerShopId || !materialGroupId){
      return
    }
    let param = {
      customerShopId: customerShopId,
      materialGroupId: materialGroupId
    }
    // 根据门店id、物料组id,查询门店所属办事处；只返回一条对象不用选择直接赋值显示即可
    this.methods.getShopDetail(param).then((res)=>{
      let { data } = res.payload
      if(data){
        this.salesInfo[this.salesIndex]['office'] = {
          ...data,
          cisDetailId: data.cisDetailId,
          id: data.orgId,
          name: data.orgName
        }
      }
      this.$apply()
    })

    // 根据门店id、物料组id 查询分销网络规模
    this.methods.getDistributeNetworkScale(param).then((res)=>{
      let { data } = res.payload
      if(data){
        this.salesInfo[this.salesIndex]['disNetworkSize'] = removeIllegalStr(data.annualSalesScale)
      }
      this.$apply()
    })
  }

  // 根据立项组织id、门店id查询物料组
  getMaterialGroupsData(){
    let customerShopId = this.salesInfo[this.salesIndex]['store'].id
    let orgId = this.formData.projectOrg.id
    if(!customerShopId){
      return
    }
    let param = {
      customerShopId: customerShopId,
      orgId: orgId, // 立项组织id
    }
    this.methods.getMaterialGroups(param).then((res)=>{
      let { data } = res.payload
      if(data && data[0] && data[0].params){
        data[0].params =  data[0].params.map((item)=>{
          return {
            ...item,
            id: item.code,
            name: item.name
          }
        })
        this.salesInfo[this.salesIndex]['materialGroup'].options = data[0].params
      }
      this.$apply()
    })
  }

  // 根据门店id查询是否为专卖店，只返回一条对象不用选择直接赋值显示即可
  getIsSpecialShopData(){
    let customerShopId = this.salesInfo[this.salesIndex]['store'].id
    if(!customerShopId){
      return
    }
    let param = {
      customerShopId: customerShopId,
    }
    this.methods.getIsSpecialShop(param).then((res)=>{
      let { data } = res.payload
      if(data){
        this.salesInfo[this.salesIndex]['isSpecialtyStore'].id = data.isSpecialShop
        this.salesInfo[this.salesIndex]['isSpecialtyStore'].name = data.isSpecialShopText
      }

      this.$apply()
    })
  }

  // 根据立项组织id查询门店列表
  getCustomerShopData(searchKeyWords){
    let words = searchKeyWords || ''
    let orgId = this.formData.projectOrg.id
    let param = {
      isSpecialShop: '212400', // 表示非专卖店
      searchKeyWords: words, // 搜索关键字
      orgId: orgId, // 立项组织id
    }
    this.methods.getCustomerShop(param).then((res)=>{
      let { data } = res.payload
      if(data){
        data = data.map((item)=>{
          return {
            ...item,
            id: item.code,
            name: item.name
          }
        })
        this.formOptions.store = data
        this.currentOptions = this.formOptions.store
      }
      this.$apply()
    })
  }

  // 获取计划项目名称下拉框列表
  getPlanProjectNameComboBoxData(){
    this.methods.getPlanProjectNameComboBox().then((res)=>{
      let { data } = res.payload
      if(data && data.length>0){
        data = data.map((item)=>{
          return {
            ...item,
            id: item.code,
            name: item.name
          }
        })
        this.formOptions.planProject = data
        this.formData.planProject.name = this.formOptions.planProject[0].name
        this.formData.planProject.id = this.formOptions.planProject[0].id
      }

      this.$apply()
    })
  }

  // 获取立项组织列表
  getQueryOrgData(){
    let param = {
      type: ''  // 1:分销，2:直营和代理，3或者不填:全部
    }
    this.methods.getQueryOrg(param).then((res)=>{
      let { orgList } = res.payload
      if(orgList){
        orgList = orgList.map((item)=>{
          return {
            ...item,
            id: item.code,
            name: item.name
          }
        })
        this.formOptions.projectOrg = orgList
      }

      this.$apply()
    })
  }

  viewDataConversion(list){
    let salesInfo = []
    if(list && list.length >0){
      salesInfo = list.map((item)=>{
        return {
          ...item,
          subOrderNumber: item.supplyDetailCode, // 需求子单号
          store: {
            id: item.custShopInfoDto && item.custShopInfoDto.id,
            name: item.custShopInfoDto && item.custShopInfoDto.fullName
          }, // 门店
          isSpecialtyStore: {
            id: item.custShopInfoDto && item.custShopInfoDto.isSpecialShop, // 是否是专卖店 除了212400都是专卖店
            name: item.custShopInfoDto && item.custShopInfoDto.isSpecialShopText
          }, // 是否专卖店
          materialGroup: {
            id: item.custShopInfoDetailDto && item.custShopInfoDetailDto.baseMatklId,
            name: item.custShopInfoDetailDto && item.custShopInfoDetailDto.baseMatklName,
            options: [] // 物料组列表，，，由于每个子单显示列表需要根据各自的门店id获取，列表不同需要区分
          }, // 物料组
          disNetworkSize: removeIllegalStr(item.annualSalesScale), // 分销网络规模
          office: {
            ...item.custShopInfoDetailDto,
            cisDetailId: item.custShopInfoDetailDto && item.custShopInfoDetailDto.id,
            id: item.custShopInfoDetailDto && item.custShopInfoDetailDto.orgId,
            name: item.custShopInfoDetailDto && item.custShopInfoDetailDto.orgName,
          }, // 所属办事处
          requirementType: {
            id: item.supplyType && item.supplyType.id,
            name: item.supplyType && item.supplyType.propertyName
          }, // 需求类型
          isBrandPark: {
            id: removeIllegalStr(item.isBuildBrandPark),
            name: item.isBuildBrandPark == '1' ? '是' : item.isBuildBrandPark == '0' ? '否' : ''
          }, // 是否品牌园
          dispatchType: {
            id: item.isHeaderUnion,
            name: item.isHeaderUnionText
          }, // 派单类型
          supplier: {
            id: item.supplierCode,
            name: item.supplierName
          }, // 供应商
          costEstimate: item.estimatedCost, // 费用预估(元)
          completeTime: item.finishDate, // 要求完成时间
          oneYearTargetSales: item.targetNumber, // 进场起一年内目标销量(台)
          oneYearTargetAmount: item.targetMoney, // 进场起一年内目标销售额(万元)
          usePeriod: {
            minDate: (item.boothServiceLife && item.boothServiceLife.split('-')[0]) || '',
            maxDate: (item.boothServiceLife && item.boothServiceLife.split('-')[1]) || ''
          }, // 展台使用期限(年)
          instruction: item.remark, // 说明
          viewType: 'default',
        }
      })
    }
    return salesInfo
  }

  // 获取订单详细信息
  getDetailsData(){
    Toast.loading({
      message: '正在加载',
      duration: 2000
    });
    let param = {
      id: this.currId // 展台需求提报单号
    }
    this.methods.getBoothReportDetail(param).then((res)=>{
      Toast.clear()
      const { data } = res.payload
      if(data){
        let detail = data
        this.activeDetail = detail
        this.formData = {
          ...this.formData,
          projectOrg: {
            id: detail.orgDto && detail.orgDto.id,
            name: detail.orgDto && detail.orgDto.name
          }, // 立项组织
          requirementItem: detail.projectSupplyName, // 需求项目名称
          planProject: {
            id: detail.projectPlanId,
            name: detail.projectPlanText
          }, // 计划项目名称
          instruction: detail.remark, // 说明
          attachment: this.getPictureUrl(detail.attachs).photo, // 图片附件
          document: this.getPictureUrl(detail.attachs).documentation, // 文档附件
        }
        this.salesInfo = this.viewDataConversion(detail.supplyDetailList)

        if(this.pageType !== 'detail'){
          // 每条子单根据门店id获取对应物料组,,,详情页面不用
          for (let i = 0; i < this.salesInfo.length; i++) {
            let param = {
              customerShopId: this.salesInfo[i].store.id,
              orgId: this.formData.projectOrg.id, // 立项组织id
            }
            this.methods.getMaterialGroups(param).then((res)=>{
              let { data } = res.payload
              if(data && data[0] && data[0].params){
                data[0].params =  data[0].params.map((item)=>{
                  return {
                    ...item,
                    id: item.code,
                    name: item.name
                  }
                })
                this.salesInfo[i]['materialGroup'].options = data[0].params
              }
              this.$apply()
            })
          }
        }

      }

      this.$apply()
    })
  }

  onLoad({ id, type }) {
    this.currId = ''
    if(id){
      this.currId = id
    }

    // type='add'->新增；type='edit'->编辑；type='detail'->详情
    if(type){
      this.pageType = type
    }

    if( this.pageType === 'add' ){
      wx.setNavigationBarTitle({
        title: '展台需求提报新增'
      })
      this.isDisabled = false
      this.getQueryOrgData()
      this.getPlanProjectNameComboBoxData()
      this.getOrderTypeComboBoxData()
      this.getDictData()
    }else if( this.pageType === 'edit' ){
      wx.setNavigationBarTitle({
        title: '展台需求提报编辑'
      })
      this.isDisabled = false
      this.getQueryOrgData()
      this.getPlanProjectNameComboBoxData()
      this.getOrderTypeComboBoxData()
      this.getDictData()
      this.getDetailsData()
    }else{
      wx.setNavigationBarTitle({
        title: '展台需求提报详情'
      })
      this.isDisabled = true
      this.getDetailsData()
    }

  }
}
