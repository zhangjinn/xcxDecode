import wepy from 'wepy';
import {connect} from "wepy-redux";
import {fillZero, nextDay} from '@/utils/index';
import Toast from "@/components/vant/toast/toast";
import {
  getSpecialShop,
  getSpecialShopDictBytype,
  getMatklByShop,
  saveActivity,
  saveFlowStartActivity,
  getActivityById,
  getActivitySaleInfo,
} from '@/store/actions/activityare'

import {
  uploadImg,
} from '@/store/actions/record'

interface Data {
  isPopShow: boolean;
  popTitle: string;
  formData: object;
  activityTypeOptions: any[];
  storeNameOptions: any[];
  isDisabled: boolean;
  pageType: any;
  currId: any;
  isClickable: boolean;
  calendarShow: boolean;
  calendarConfig: object;
  salesInfo: any[];
  materialGroupOptions: any[];
  salesIndex: any;
  activeDetail: any;
  modifyCount: any;
  dataSource: any;
  isCanModify: boolean;
  currentDateName: string;
}
@connect({
  regins({ record }) {
    return record.regins
  }
}, {
  uploadImg,
  getSpecialShop,
  getSpecialShopDictBytype,
  getMatklByShop,
  saveActivity,
  saveFlowStartActivity,
  getActivityById,
  getActivitySaleInfo,
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
    },
  };
  data: Data = {
    calendarConfig: { // 日历配置
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    calendarShow: false,
    isClickable: true, // 提交是防止多次点击
    isPopShow: false,
    popTitle: '',
    formData:{
      store: '', // 门店id
      storeName: '', // 门店名称
      activityTheme: '', // 活动主题
      activityType: '', // 活动类型id
      activityTypeName: '', // 活动类型名称
      startDate: '', // 活动开始时间
      endDate: '', // 活动结束时间
      publicity: [], // 认筹宣传附件
      activityProgramme: [], // 活动方案附件
      salesSite: [], // 销售现场附件
      experienceSharing: [], // 经验分享附件
    },
    activityTypeOptions: [], // 活动类型列表
    storeNameOptions: [],  // 门店名称列表
    salesInfo: [
      {
        materialGroup: { // 物料组
          id: '',
          name: ''
        },
        sales: 0, // 预计销售额
      }
    ], // 销售信息
    materialGroupOptions: [], // 物料组列表
    salesIndex: 0, // 销售信息下标
    isDisabled: false, // 页面是否可编辑,默认可编辑; false可编辑，true不可编辑
    pageType: '', // 页面当前状态
    currId: '', // 当前详情id; 值是空则为新增,非空为查看详情
    activeDetail: {}, // 活动详情
    modifyCount: 0, // 编辑次数
    dataSource: '', // 1->信天翁；0->cis
    isCanModify: true, // 编辑条件下不同状态是否可编辑；true可编辑，false不可编辑
    currentDateName: '',
  };

  // 页面内交互写在methods里
  methods = {
    onFilterFormChange(evt) {
      const { detail, currentTarget: { dataset: { name, index } } } = evt
      if(name == 'sales'){
        this.salesInfo[index].sales = detail
      }else{
        this.formData = {
          ...this.formData,
          [name]: detail,
        }
      }
    },

    onPopOpen(e){
      const {dataset: { name, index }} = e.currentTarget
      if(this.isDisabled || ( name==='门店名称' && this.pageType ==='edit') || !this.isCanModify){
        return
      }
      this.popTitle = name
      this.salesIndex = index

      this.isPopShow = true
    },

    onPopClose(){
      this.isPopShow = false
    },

    // 选择活动类型
    chooseSink(item){
      this.formData.activityType = item.id
      this.formData.activityTypeName = item.name
      this.isPopShow = false
    },

    // 选择门店
    chooseStore(item){
      this.formData.store = item.id
      this.formData.storeName = item.name
      this.getMatklByShopData('1')
      this.isPopShow = false
    },

    // 选择物料组
    chooseMaterialGroup(item){
      this.salesInfo[this.salesIndex].materialGroup.id = item.id
      this.salesInfo[this.salesIndex].materialGroup.name = item.name
      this.isPopShow = false
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

    // 删除销售信息
    delSales(event){
      // 详情状态、编辑状态下编辑次数大于2都不能编辑
      if(this.isDisabled || !this.isCanModify){
        return
      }
      let { index } = event.currentTarget.dataset
      this.salesInfo.splice(index, 1)
      this.$apply()
    },

    // 添加销售信息
    addSales(){
      this.salesInfo.push({
        materialGroup: { // 物料组
          id: '',
          name: ''
        },
        sales: 0, // 预计销售额
      })
      this.$apply()
    },

    // 提交
    toAddStore: () => {
      let type = this.data.pageType
      let checkResault = this.methods.checkParam()
      if(checkResault){
        const { store, activityTheme, activityType, startDate, endDate, publicity, activityProgramme, salesSite, experienceSharing } = this.data.formData
        const salesInfo = this.data.salesInfo
        let saleInfoList = []
        if(salesInfo && salesInfo.length > 0){
          saleInfoList = salesInfo.map((item)=>{
            return {
              matklId: item.materialGroup.id,//物料组ID
              matklName: item.materialGroup.name,//物料组名字
              planSaleMoney: item.sales,//预计销售额
              isEdited: true
            }
          })
        }

        let param = {
          shopInfoId: store, // 门店ID
          activityTheme: activityTheme, // 活动主题
          activityLabelId: activityType, // 活动类别id
          startTime: startDate, // 开始时间
          endTime: endDate, // 结束时间
          rcxcAttach: publicity && publicity.length>0 ? publicity[0].id : '', // 认筹宣传附件
          hdfaAttach: activityProgramme && activityProgramme.length>0 ? activityProgramme[0].id : '', // 活动方案附件
          xsxcAttach: salesSite && salesSite.length>0 ? salesSite[0].id : '', // 销售现场附件
          jyfxAttach: experienceSharing && experienceSharing.length>0 ? experienceSharing[0].id : '', // 经验分享附件
          saleInfoList: saleInfoList, //// 活动销量信息
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
        let Q = ''
        let msg = ''
        if(type == 'add'){ // 新增
          Q = this.methods.saveFlowStartActivity(param)
          msg = '新增成功'

        } else { // 修改
          param.id = this.currId
          Q = this.methods.saveActivity(param)
          msg = '修改成功'
        }
        Q.then((res)=>{
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
      const { store, activityTheme, activityType, startDate, endDate } = this.data.formData
      const salesInfo = this.data.salesInfo
      if (!store) {
        Toast.fail('请选择门店名称')
        return false
      }
      if (!activityTheme) {
        Toast.fail('请填写活动主题')
        return false
      }
      if (!activityType) {
        Toast.fail('请选择活动类型')
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

      // 可以没有物料；如果有物料，物料组必填且物料组不能重复，
      if(salesInfo && salesInfo.length>0){
        let isMatklEmpty = this.isEmpty(salesInfo)
        if(isMatklEmpty){
          Toast.fail('物料组必填')
          return false
        }
        let isMatklRepeat = this.isRepeat(salesInfo)
        if(isMatklRepeat){
          Toast.fail('物料组不能重复')
          return false
        }
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
      if(this.isDisabled || !this.isCanModify){
        return
      }
      const {dataset: { name }} = e.currentTarget
      const minDate = nextDay();
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
  isEmpty(arr){
    let hash = [] // 有物料组的物料组id数组
    for(let i=0;i<arr.length;i++){
      if (arr[i].materialGroup.id) {
        hash.push(arr[i].materialGroup.id)
      }
    }
    if(hash.length < arr.length){
      return true
    }else {
      return false
    }
  }
  isRepeat(arr){
    let hash = {}; // 去重之后的物料组对象
    for(let i=0;i<arr.length;i++){
      if (!hash[arr[i].materialGroup.id]) {
        hash[arr[i].materialGroup.id] = true;
      }
    }
    if(Object.keys(hash).length<arr.length){
      return true
    }else{
      return false
    }
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
    let photo = []
    if(file && file.attachPath && file.id){
      // let url = wepy.$appConfig.baseUrl + '/comm/showUpload.nd?pathInfo=' + file.attachPath + '&fileName=' + file.attachName
      let url = file.attachPath
      let photoObj = {
        id: file.id,
        name: file.attachShortName,
        url: url,
      }
      photo.push(photoObj)
    }
    return photo
  }

  // 获取筛选列表接口
  getDictBytype(type){
    let param = {
      categoryName: type
    }
    return this.methods.getSpecialShopDictBytype(param).then((res)=>{
      let categoryList = []
      if(res.payload && res.payload.data){
        categoryList = res.payload.data.map((item)=>{
          return {
            ...item,
            id: item.code,
            value: item.name
          }
        })
      }
      return categoryList
    })
  }

  // 获取筛选条件列表并赋值
  getAllDictBytype(){
    // 活动类别
    this.getDictBytype('specialActivityType').then(res=>{
      this.activityTypeOptions = res
      this.$apply()
    })
  }

  // 根据门店带出门店明细中的物料组
  getMatklByShopData(type){
    let shopId = this.formData.store
    let param = {
      shopId: shopId
    }
    this.methods.getMatklByShop(param).then((res)=>{
      let categoryList = []
      if(res.payload && res.payload.data){
        categoryList = res.payload.data.map((item)=>{
          return {
            ...item,
            id: item.matklId,
            name: item.matklName
          }
        })
      }
      this.materialGroupOptions = categoryList

      if(type && type === '1'){ // 选择门店时需要给salesInfo赋值，预计销售额默认0
        if(this.materialGroupOptions && this.materialGroupOptions.length > 0){
          this.salesInfo = this.materialGroupOptions.map((item)=>{
            return {
              materialGroup: { // 物料组
                id: item.id,
                name: item.name
              },
              sales: 0, // 预计销售额
            }
          })
        }
      }

      this.$apply()
    })
  }

  // 获取门店名称列表
  getSpecialShopData(){
    let param = {
      search: ''
    }
     this.methods.getSpecialShop(param).then((res)=>{
      let categoryList = []
      if(res.payload && res.payload.data){
        categoryList = res.payload.data.map((item)=>{
          return {
            ...item,
            id: item.code,
            value: item.name
          }
        })
      }
       this.storeNameOptions = categoryList
    })
  }

  // 根据Id查询专卖店销量信息
  getActivitySaleInfoData(){
    let param = {
      id: this.currId
    }
    this.methods.getActivitySaleInfo(param).then((res)=>{
      const { data } = res.payload
      if(data){
        this.salesInfo = data.map((item)=>{
          return {
            materialGroup:{
              id: item.matklId,
              name: item.matklName
            },
            sales: item.planSaleMoney
          }
        })
      }
      this.$apply()
    })
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
    this.methods.getActivityById(param).then((res)=>{
      Toast.clear()
      const { data } = res.payload
      if(data){
        let detail = data
        // this.activeDetail = edit 编辑状态下
        // 1、dataSource=1(信天翁) 修改次数<2,都可编辑(门店名称编辑状态都不可修改)
        // 2、dataSource=1(信天翁) 修改次数>=2,只能改附件
        // 2、dataSource=0(cis) 只能改附件里的认筹宣传、销售现场
        this.modifyCount = detail.modifyCount
        if(this.pageType === 'edit' && this.dataSource == 1 && this.modifyCount >= 2){
          this.isCanModify = false
          Toast.fail('因活动修改次数达到上限，目前只允许修改附件')
        }
        if(this.pageType === 'edit' && this.dataSource == 0){
          this.isCanModify = false
          Toast.fail('只允许修改附件认筹宣传、销售现场')
        }

        this.formData = {
          ...this.formData,
          store: detail.shopInfoId, // 门店id
          storeName: detail.shopInfoName, // 门店名称
          activityTheme: detail.activityTheme, // 活动主题
          activityType: detail.activityLabelId, // 活动类型id
          activityTypeName: detail.activityLabelName, // 活动类型名称
          startDate: detail.startTime, // 活动开始时间
          endDate:  detail.endTime, // 活动结束时间
          publicity: this.getPictureUrl(detail.rcxcFile), // 认筹宣传附件
          activityProgramme: this.getPictureUrl(detail.hdfaFile), // 活动方案附件
          salesSite: this.getPictureUrl(detail.xsxcFile), // 销售现场附件
          experienceSharing: this.getPictureUrl(detail.jyfxFile), // 经验分享附件
        }
        this.getMatklByShopData()
      }

      this.$apply()
    })
  }

  onLoad({ id, type, dataSource }) {
    this.currId = ''
    if(id){
      this.currId = id
    }

    // type='add'->新增；type='edit'->编辑；type='detail'->详情
    if(type){
      this.pageType = type
    }
    this.dataSource = ''
    if(type === 'edit'){
      this.dataSource = dataSource
    }

    this.getSpecialShopData()
    this.getAllDictBytype()

    if( this.pageType === 'add' ){
      wx.setNavigationBarTitle({
        title: '新增专卖店市场活动'
      })
      this.isDisabled = false
    }else if( this.pageType === 'edit' ){
      wx.setNavigationBarTitle({
        title: '编辑专卖店市场活动'
      })
      this.isDisabled = false
      this.getDetailsData()
      this.getActivitySaleInfoData()
    }else{
      wx.setNavigationBarTitle({
        title: '专卖店市场活动详情'
      })
      this.isDisabled = true
      this.getDetailsData()
      this.getActivitySaleInfoData()
    }

  }
}
