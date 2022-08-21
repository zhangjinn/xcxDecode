import wepy, {Event} from 'wepy';
import {connect} from "wepy-redux";
import Toast from "@/components/vant/toast/toast";
import {addNum, fillZero, mulNum, nextDay} from '@/utils/index'
import popupCustomize from "../../../components/popup-customize/index";
import {
  getMarketCenter,
  getOffice,
  getAgent,
  getDistributor,
  getMatklByCust,
  getUsers,
  saveFlowStart,
  getAgentActivityById,
} from '@/store/actions/activityare'
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
  multiple: boolean;
  formData: object;
  marketCenterOptions: any[];
  officeOptions: any[];
  agentOptions: any[];
  distributorOptions: any[];
  materialGroupOptions: any[];
  officeManagerOptions: any[];
  pageType: any;
  currId: any;
  isClickable: boolean;
  materialIndex: any;
  activeDetail: any;
  formKey: string;
  tabActive: string;
  tabList: any[];
  tabInfoItem: object;
  deleteAttachs: any[];
  delDetails: any[];
  calendarConfig: object;
  calendarShow: boolean;
  currentDateName: string;
}
@connect({
  regins({ record }) {
    return record.regins
  }
}, {
  uploadImg,
  getMarketCenter,
  getOffice,
  getAgent,
  getDistributor,
  getMatklByCust,
  getUsers,
  saveFlowStart,
  getAgentActivityById,
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
      "van-datetime-picker": "../../../../components/vant/datetime-picker/index",
      'van-search': '../../../../components/vant/search/index',
      'van-tab': '../../../../components/vant/tab/index',
      'van-tabs': '../../../../components/vant/tabs/index',
      'van-stepper': '../../../../components/vant/stepper/index',
    },
  };
  data: Data = {
    yearsVisable: false, // 年月日期是否显示
    maxDate: new Date(2100, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    minDate: new Date(2000, 10, 1).getTime(),
    isClickable: true, // 提交是防止多次点击
    popTitle: '',
    currentOptions: [],
    popSelectedOption: {},
    isSearch: false,
    multiple: false,
    formData:{
      marketCenter: { // 营销中心
        id: '',
        name: ''
      },
      office: { // 办事处
        id: '',
        name: ''
      },
      timeStart: '', // 申请开始时间
      agent: { // 活动承接代理(运营)商
        id: '',
        name: ''
      },
      theme: '', // 活动主题
      place: '', // 活动地点
      target: '', // 活动目标(万元)
      startDate: '', // 活动开始时间
      endDate: '', // 活动结束时间
      distributor: { // 参与分销商
        id: [],
        name: []
      },
      totalInput: 0, // 各项投入合计(万元)
      adCompany: '', // 待制作广告公司
      officeManager: { // 办事处经理
        id: '',
        name: ''
      },
      reason: '', // 活动申请原因
      experienceSharing: [] // 附件
    },
    marketCenterOptions: [],  // 营销中心列表
    officeOptions: [], // 办事处列表
    agentOptions: [], // 活动承接代理(运营)商列表
    distributorOptions: [], // 参与分销商列表
    materialGroupOptions: [], // 物料组列表
    officeManagerOptions: [], // 办事处经理列表
    formKey: '',
    tabActive: 'category', // 默认显示参与品类
    tabList: [
      { title: '参与品类', key: 'category', },
      { title: '物料', key: 'materials', },
      { title: '媒体宣传', key: 'media', },
      { title: '临促', key: 'prompt', },
      { title: '赠品', key: 'giveaway', },
      { title: 'TO小B费用', key: 'bFee', },
      { title: '其他', key: 'other', },
    ],
    tabInfoItem: {
      category: { // 参与品类
        items:[]
      },
      materials: { // 物料
        totalNum: 0,
        totalAmount: 0,
        items:[]
      },
      media: { // 媒体宣传
        totalNum: 0,
        totalAmount: 0,
        items:[]
      },
      prompt: { // 临促
        totalNum: 0,
        totalAmount: 0,
        items:[]
      },
      giveaway: { // 赠品
        totalNum: 0,
        totalAmount: 0,
        items:[]
      },
      bFee: { // TO小B费用
        totalNum: 0,
        totalAmount: 0,
        items:[]
      },
      other: { // 其他
        totalNum: 0,
        totalAmount: 0,
        items:[]
      },
    },
    materialIndex: 0, // 物料组信息下标
    pageType: '', // 页面当前状态
    currId: '', // 当前详情id; 值是空则为新增,非空为查看详情或编辑
    activeDetail: {}, // 活动详情
    deleteAttachs: [], // 删除详情返回的图片id
    delDetails: [], // 删除详情返回的所有视图列表项id
    calendarConfig: { // 日历配置
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    calendarShow: false,
    currentDateName: '',
  };
  components = {
    popupCustomize,
  };
  // 页面内交互写在methods里
  methods = {
    // 切换视图
    tabChange(e){
      let { index } = e.detail
      this.tabActive = this.tabList[index].key
      this.$apply()
    },

    // 改变视图输入框触发事件并赋值
    onTabFilterFormChange(evt){
      const { detail, currentTarget: { dataset: { key, index } } } = evt
      // bug:  触发两次
      if (typeof detail === 'undefined') {
        return
      }
      this.tabInfoItem[this.tabActive].items[index][key] = detail
      if(this.tabActive != 'category'){
        if(key==='num' || key==='price'){
          // 小计 = 数量 * 单价
          let num = this.tabInfoItem[this.tabActive].items[index].num
          let price = this.tabInfoItem[this.tabActive].items[index].price
          this.tabInfoItem[this.tabActive].items[index].total = mulNum(num, price)
          this.methods.calculateTotal()
        }
      }

      this.$apply()
    },

    calculateTotal: () => {
      let totalNum = 0
      let totalAmount = 0
      this.tabInfoItem[this.tabActive].items.forEach((item)=>{
        totalNum += Number(item.num)
        totalAmount = addNum(totalAmount, item.total)
      })
      // 合计数量 = 每一项数量相加
      this.tabInfoItem[this.tabActive].totalNum = totalNum
      // 合计金额 = 每一项金额相加
      this.tabInfoItem[this.tabActive].totalAmount = totalAmount
      this.$apply()
    },

    // 改变表单输入框触发事件并赋值
    onFilterFormChange(evt) {
      const { detail, currentTarget: { dataset: { key, index } } } = evt
      this.formData = {
        ...this.formData,
        [key]: detail,
      }
    },

    // 弹出年月日历选择框
    onDatePopOpen(e){
      const {dataset: { key }} = e.currentTarget
      this.formKey = key
      this.yearsVisable = true
    },

    // 选择年月日历
    onInput(e: { detail: any; }) {
      this.currentDate = e.detail
    },

    // 年月日历确定
    onConfirm(e: { detail: string; }) {
      let date = new Date(parseInt(e.detail))
      let Y = date.getFullYear();
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      this.formData[this.formKey] = Y + '-' + M
      this.yearsVisable = false
    },

    // 年月日历取消
    onCancel() {
      this.yearsVisable = false
    },

    // 打开筛选列表弹框
    onPopOpen(e){
      const {dataset: { name, key, index }} = e.currentTarget

      this.isSearch = false // 选择弹框列表是否可搜索
      this.multiple = false // 选择弹框列表是否多选
      this.popTitle = name // 选择弹框标题
      this.formKey = key
      if(this.formKey === 'marketCenter'){ // 营销中心
        this.currentOptions = this.marketCenterOptions
        this.popSelectedOption = this.formData[this.formKey]
      }else if(this.formKey === 'office'){ // 办事处
        this.currentOptions = this.officeOptions
        this.popSelectedOption = this.formData[this.formKey]
      }else if(this.formKey === 'agent'){ // 活动承接代理(运营)商
        this.isSearch = true
        this.currentOptions = this.agentOptions
        this.popSelectedOption = this.formData[this.formKey]
      }else if(this.formKey === 'distributor'){ // 参与分销商
        this.multiple = true
        this.currentOptions = this.distributorOptions
        this.popSelectedOption = this.formData[this.formKey]
      }else if(this.formKey === 'officeManager'){ //办事处经理
        this.isSearch = true
        this.currentOptions = this.officeManagerOptions
        this.popSelectedOption = this.formData[this.formKey]
      }else if(this.formKey === 'materialGroup'){ // 物料组
        this.currentOptions = this.materialGroupOptions
        this.materialIndex = index
        this.popSelectedOption = this.tabInfoItem[this.tabActive].items[this.materialIndex].materialGroup
      }

      this.$invoke('popupCustomize', 'onShow');
      this.$apply()
    },

    // 选择对应列表项并赋值
    chooseOption(item){
      if( this.multiple ){
        let oIndex = this.formData[this.formKey].id.indexOf(item.id)
        if (oIndex > -1) {
          this.formData[this.formKey].id.splice(oIndex, 1)
          this.formData[this.formKey].name.splice(oIndex, 1)
        } else {
          this.formData[this.formKey].id.push(item.id)
          this.formData[this.formKey].name.push(item.name)
        }
      }else{
        if(this.formKey === 'materialGroup'){
          this.tabInfoItem[this.tabActive].items[this.materialIndex].materialGroup.id = item.id
          this.tabInfoItem[this.tabActive].items[this.materialIndex].materialGroup.name = item.name
        }else{
          this.formData[this.formKey].id = item.id
          this.formData[this.formKey].name = item.name
        }
        if(this.formKey==='marketCenter'){ // 营销中心
          this.getOfficeData(item.code)
        }
        if(this.formKey==='agent'){ // 活动承接代理(运营)商
          this.getDistributorData(item.code)
          this.getMatklByCustData(item.code)
        }
        this.$invoke('popupCustomize', 'onClose');
      }

      this.$apply()
    },

    // 筛选列表弹框搜索触发事件
    onSearchOption(searchValue){
      if(this.formKey==='agent'){ // 活动承接代理(运营)商
        this.getAgentData(searchValue)
      }
      if(this.formKey==='officeManager'){ // 办事处经理
        this.getUsersData(searchValue)
      }
    },

    // 删除图片
    deleteImg(event){
      let { key } = event.currentTarget.dataset
      let { index } = event.detail
      if(this.formData[key][index].viewType && this.formData[key][index].viewType === 'default'){
        this.deleteAttachs.push(this.formData[key][index].id)
      }
      this.formData[key].splice(index, 1)
      this.$apply()
    },

    //上传图片
    afterRead(event) {
      this.selImg(event.detail.file.path, event.currentTarget.dataset.key)
    },

    // 删除信息
    deleteItem(event){
      let { index } = event.currentTarget.dataset
      if(this.tabInfoItem[this.tabActive].items[index].viewType && this.tabInfoItem[this.tabActive].items[index].viewType === 'default'){
        this.delDetails.push(this.tabInfoItem[this.tabActive].items[index].id)
      }
      this.tabInfoItem[this.tabActive].items.splice(index, 1)
      this.methods.calculateTotal()
      this.$apply()
    },

    // 添加信息
    keepAdding(){
      let pushItem = {}
      if(this.tabActive==='category'){
        if(!this.formData.agent.id){
          Toast.fail('请先选择活动承接代理(运营)商')
          return false
        }
        pushItem = {
          materialGroup: { // 物料组
            id: '',
            name: ''
          },
          applyCost: 0 // 计划分摊金额
        }
      }else{
        pushItem = {
          num: 0, // 数量
          price: 0, // 单价
          remark: "", // 备注
          total: 0, // 小计
          type: "", // 种类
        }
      }
      this.tabInfoItem[this.tabActive].items.push(pushItem)
      this.$apply()
    },

    // 提交
    toAddStore: () => {
      let type = this.data.pageType
      let checkResault = this.methods.checkParam()
      if(checkResault){
        const { marketCenter, office, timeStart, agent, theme, place, target, startDate, endDate, distributor, totalInput, adCompany, officeManager, reason, experienceSharing } = this.data.formData
        const { category, materials, media, prompt, giveaway, bFee, other} = this.data.tabInfoItem

        let attachs = []
        attachs = experienceSharing.map(item => {
          return {
            id: item.id
          }
        })

        let productLineDtoList = []
        productLineDtoList = category.items.map(item => {
          return {
            ...item,
            matklId: item.materialGroup.id,
            matklName: item.materialGroup.name,
          }
        })

        let param = {
          id: 0, // 新增写死0，编辑传ID
          marketCenterId: marketCenter.id, // 营销中心ID
          orgId: office.id, // 办事处ID
          applyMonth: timeStart, // 活动申请时间
          custInfoId: agent.id, // 代理商ID
          activityTheme: theme, // 活动主题
          activityPlace: place, // 活动地点
          activityTarget: target, // 活动目标
          applyStartTime: startDate, // 活动开始时间
          applyEndTime: endDate, // 活动结束时间
          fxCust: distributor.id, // 分销商多选，List类型，传分销商ID
          totalMoney: totalInput, // 各项投入合计
          adCompany: adCompany, // 待制作广告公司
          bscManager: officeManager.id, // 办事处经理ID
          content: reason, // 申请理由
          attachs, // 附件
          productLineDtoList, // 参与品类视图
          matklDtoList: this.viewDataToParams(materials), // 物料视图
          mediaDtoList: this.viewDataToParams(media), // 媒体宣传视图
          tempDtoList: this.viewDataToParams(prompt), // 临促视图
          giftDtoList: this.viewDataToParams(giveaway), // 赠品视图
          tobDtoList: this.viewDataToParams(bFee), // TO小B费用视图
          otherDtoList: this.viewDataToParams(other), // 其他视图
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
          param.id = this.currId
          param.processInstId = this.activeDetail.processInstId
          param.deleteAttachs = this.deleteAttachs
          param.delDetails = this.delDetails
          msg = '修改成功'
        }
        this.methods.saveFlowStart(param).then((res)=>{
          const { payload } = res
          if(payload.data && payload.data == 'success'){
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

      }
    },
    checkParam: () => {
      let { marketCenter, office, timeStart, agent, theme, place, target, startDate, endDate, totalInput, adCompany, officeManager, reason } = this.data.formData

      if (!marketCenter.id) {
        Toast.fail('请选择营销中心')
        return false
      }
      if (!office.id) {
        Toast.fail('请选择办事处')
        return false
      }
      if (!timeStart) {
        Toast.fail('请选择申请活动时间')
        return false
      }
      if (!agent.id) {
        Toast.fail('请选择活动承接代理(运营)商')
        return false
      }
      if (!theme) {
        Toast.fail('请填写活动主题')
        return false
      }
      if (!place) {
        Toast.fail('请填写活动地点')
        return false
      }
      if (target === '') {
        Toast.fail('请填写活动目标(万元)')
        return false
      }
      if (!startDate) {
        Toast.fail('请选择活动开始时间')
        return false
      }
      if (!endDate) {
        Toast.fail('请选择活动结束时间')
        return false
      }
      if (totalInput === '') {
        Toast.fail('请填写各项投入合计(元)')
        return false
      }
      if (!adCompany) {
        Toast.fail('请填写待制作广告公司')
        return false
      }
      if (!officeManager.id) {
        Toast.fail('请选择办事处经理')
        return false
      }
      if (!reason) {
        Toast.fail('请填写活动申请原因')
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
      const {dataset: { name }} = e.currentTarget
      const minDate = '1970-01-01';
      const maxDate = '9999-12-31'
      const { startDate, endDate } = this.formData;
      this.currentDateName = name
      let begin, end;
      begin = startDate
      end = endDate

      if (name.indexOf('startDate') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if (name.indexOf('endDate') > -1) {
        this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
      }
      this.calendarShow = true;
    },

    // 关闭日历
    closeCalendar() {
      this.calendarShow = false;
    },

    // 清空已选日期
    clearCalendar(e) {
      const {dataset: { name }} = e.currentTarget
      this.formData = { ...this.formData, [name]: '' }
    },

    // 选择日期
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.formData = { ...this.formData, [this.currentDateName]: day }
      this.calendarShow = false;
    },
  };

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
    let photo = []
    if(file && file.length){
      photo = file.map((item)=>{
        return {
          ...item,
          id: item.id,
          name: item.attachName,
          url: item.attachPath,
          viewType: 'default',
        }
      })
    }
    return photo
  }

  // 获取办事处经理列表
  getUsersData(searchStr){
    let param = {
      searchStr: searchStr || ''
    }
    this.methods.getUsers(param).then((res)=>{
      let categoryList = []
      if(res.payload && res.payload.data){
        categoryList = res.payload.data.map((item)=>{
          return {
            ...item,
            id: item.code,
            name: item.name
          }
        })
      }
      this.officeManagerOptions = categoryList
      this.currentOptions = this.officeManagerOptions
      this.$apply()
    })
  }

  // 根据代理商id请求物料组列表
  getMatklByCustData(agentId){
    let param = {
      custId: agentId
    }
    this.methods.getMatklByCust(param).then((res)=>{
      let categoryList = []
      if(res.payload){
        categoryList = res.payload.map((item)=>{
          return {
            ...item,
            id: item.id,
            name: item.matklName
          }
        })
      }
      this.materialGroupOptions = categoryList
      this.$apply()
    })
  }

  // 根据代理商id请求分销商
  getDistributorData(agentId){
    let param = {
      agentId: agentId
    }
    this.methods.getDistributor(param).then((res)=>{
      let categoryList = []
      if(res.payload && res.payload.data){
        categoryList = res.payload.data.map((item)=>{
          return {
            ...item,
            id: item.code,
            name: item.name
          }
        })
      }
      this.distributorOptions = categoryList
      this.$apply()
    })
  }

  // 获取活动承接代理(运营)商列表
  getAgentData(searchStr){
    let param = {
      searchStr: searchStr || ''
    }
    this.methods.getAgent(param).then((res)=>{
      let categoryList = []
      if(res.payload && res.payload.data){
        categoryList = res.payload.data.map((item)=>{
          return {
            ...item,
            id: item.code,
            name: item.name
          }
        })
      }
      this.agentOptions = categoryList
      this.currentOptions = this.agentOptions
      this.$apply()
    })
  }

  // 根据营销中心code请求办事处列表
  getOfficeData(code){
    let param = {
      orgCode: code
    }
    this.methods.getOffice(param).then((res)=>{
      let categoryList = []
      if(res.payload && res.payload.data){
        categoryList = res.payload.data.map((item)=>{
          return {
            ...item,
            name: item.name
          }
        })
      }
      this.officeOptions = categoryList
      if(this.officeOptions.length > 0){
        this.formData.office.id = this.officeOptions[0].id
        this.formData.office.name = this.officeOptions[0].name
      }
      this.$apply()
    })
  }

  // 获取营销中心列表
  getMarketCenterData(){
     this.methods.getMarketCenter().then((res)=>{
      let categoryList = []
      if(res.payload && res.payload.data){
        categoryList = res.payload.data.map((item)=>{
          return {
            ...item,
            name: item.name
          }
        })
      }
       this.marketCenterOptions = categoryList
       this.$apply()
    })
  }

  // 视图列表传参字段转换
  viewDataToParams(list){
    let target = []
    if(list && list.items &&  list.items.length>0){
      target = list.items.map((item)=>{
        return {
          ...item,
          num: item.num || 0, // 数量
          price: item.price || 0, // 单价
          remark: item.remark, // 备注
          total: item.total || 0, // 小计
          type: item.type, // 种类
        }
      })
    }
    return target
  }

  // 获取详情视图列表渲染字段转换
  viewDataConversion(list, type){
    if(type && type === 'category'){
      let target = {
        items:[]
      }
      if(list && list.length>0){
        target.items = list.map((item)=>{
          return {
            ...item,
            materialGroup: {
              id: item.matklId,
              name: item.matklName,
            },
            viewType: 'default',
          }
        })
      }
      return target
    }else{
      let target = {
        totalNum: 0,
        totalAmount: 0,
        items:[]
      }
      if(list && list.length>0){
        target.items = list.map((item)=>{
          return {
            ...item,
            num: item.num || 0, // 数量
            price: item.price || 0, // 单价
            remark: item.remark, // 备注
            total: item.total || 0, // 小计
            type: item.type, // 种类
            viewType: 'default', // 视图类型，viewType=default为详情中返回的数据
          }
        })
        target.items.forEach((item)=>{
          target.totalNum += Number(item.num)
          target.totalAmount = addNum(target.totalAmount, item.total)
        })
      }
      return target
    }

  }

  // 获取订单详细信息
  getDetailsData(){
    Toast.loading({
      message: '正在加载',
      duration: 2000
    });
    let param = {
      id: this.currId
    }
    this.methods.getAgentActivityById(param).then((res)=>{
      Toast.clear()
      const { data } = res.payload
      if(data){
        let detail = data
        this.activeDetail = detail
        this.formData = {
          ...this.formData,
          marketCenter: { // 营销中心
            id: detail.marketCenterId,
            name: detail.marketCenterName
          },
          office: { // 办事处
            id: detail.orgId,
            name: detail.orgName
          },
          timeStart: detail.applyMonth, // 申请开始时间
          agent: { // 活动承接代理(运营)商
            id: detail.custInfoId,
            name: detail.custInfoName
          },
          theme: detail.activityTheme, // 活动主题
          place: detail.activityPlace, // 活动地点
          target: detail.activityTarget, // 活动目标(万元)
          startDate: detail.applyStartTime, // 活动开始时间
          endDate: detail.applyEndTime, // 活动结束时间
          distributor: { // 参与分销商
            id: detail.fxCust && detail.fxCust[0] ? detail.fxCust[0].split(',') : [],
            name: detail.fxCustName ? detail.fxCustName.split(',') : []
          },
          totalInput: detail.totalMoney, // 各项投入合计(万元)
          adCompany: detail.adCompany, // 待制作广告公司
          officeManager: { // 办事处经理
            id: '',
            name: ''
          },
          reason: detail.content, // 活动申请原因
          experienceSharing: this.getPictureUrl(detail.attachs) // 附件
        }

        this.tabInfoItem = {
          category: this.viewDataConversion(detail.productLineDtoList, 'category'), // 参与品类
          materials: this.viewDataConversion(detail.matklDtoList), // 物料
          media: this.viewDataConversion(detail.mediaDtoList), // 媒体宣传
          prompt: this.viewDataConversion(detail.tempDtoList), // 临促
          giveaway: this.viewDataConversion(detail.giftDtoList), // 赠品
          bFee: this.viewDataConversion(detail.tobDtoList), // TO小B费用
          other: this.viewDataConversion(detail.otherDtoList), // 其他
        }

        // 遍历营销中心列表ID查询对应code请求办事处列表
        if( this.marketCenterOptions.length > 0 ){
          let marketCenterCode = this.marketCenterOptions.find((item) => item.id == detail.marketCenterId)
          this.getOfficeData(marketCenterCode.code)
        }

        // 根据代理商id请求分销商列表、物料组列表
        this.getDistributorData(detail.custInfoId)
        this.getMatklByCustData(detail.custInfoId)

      }
      this.$apply()
    })
  }

  onLoad({ id, type }) {
    this.currId = ''
    if(id){
      this.currId = id
    }
    // type='add'->新增；type='edit'->编辑；
    if(type){
      this.pageType = type
    }

    this.getMarketCenterData()
    if( this.pageType === 'add' ){
      wx.setNavigationBarTitle({
        title: '新增代理商市场活动'
      })
    }else if( this.pageType === 'edit' ){
      wx.setNavigationBarTitle({
        title: '编辑代理商市场活动'
      })
      this.getDetailsData()
    }
  }
}
