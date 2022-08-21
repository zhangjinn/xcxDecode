import wepy from 'wepy'
import { connect } from 'wepy-redux'
import {
  getCheckInRecordByUserCode, addCheckInRecord, upload2Img, addInspectionRecord2,
  getStoryPersons, getShopListByCustId, getShopListByCust
} from '@/store/actions/record'
import Dialog from '@/components/vant/dialog/dialog'
import { formatDate, removeStorage, setStorage, getDomain } from '@/utils/index'

import Toast from '@/components/vant/toast/toast'
import {request} from "@/utils/requestJSON";

const qqmap = require('@/pages/terminal/utils/qqmap-wx-jssdk.min.js')
@connect({
  storyPersons({ record }) {
    return record.storyPersons
  }
}, {
  getCheckInRecordByUserCode,
  addCheckInRecord,
  getStoryPersons,
  getShopListByCustId,
  getShopListByCust,
  addInspectionRecord2,
  upload2Img
})
export default class WebViewPage extends wepy.page {
  config = {
    navigationBarTitleText: '新增打卡',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-field': '../../../components/vant/field/index',
      'van-button': '../../../components/vant/button/index',
      'van-action-sheet': '../../../components/vant/action-sheet/index',
      'van-dialog': '../../../components/vant/dialog/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-uploader': '../../../components/vant/uploader/index',
      'van-datetime-picker': '../../../components/vant/datetime-picker/index',
      'van-popup': '../../../components/vant/popup/index'
    }
  }
  data = {
    imgObj: {
      'addClockInBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552601_2b1943ae8a594b0d8a654a1b68304833.png',
    },
    qqmapsdk: null,
    problemTypeList: [
      { value: '人员', text: '人员' },
      { value: '货源', text: '货源' },
      { value: '产品', text: '产品' },
      { value: '资源', text: '资源' },
      { value: '渠道', text: '渠道' },
      { value: '促销推广', text: '促销推广' },
      { value: '其他', text: '其他' }
    ],
    cancelBtn: false,
    value: '',
    actions: [
      {
        name: '拍照'
      }
    ],
    imgStatic: '',//上传的照片类型，1：门头状态，2：展台状态，3：样机状态，4：门店卫生，5：员工专题
    location: '山东省青岛市市南区镇江南路10号',
    currentTime: '08-14 17:17:04',
    latitude: '',//精度
    longitude: '',//维度
    userAccount: {},
    doorImgs: [],//门店照片
    sampleImgs: [],//样机照片
    staffImgs: [],//员工照片
    healthImgs: [],//门店卫生
    boothImgs: [],//展台照片
    trainingImgs: [],//培训照片
    storeName: '请选择门店',
    traineesNumber: '', // 培训人数
    trainingTopics: '', // 培训主题
    trainingTopicsId: '', // 培训主题id
    trainingTopicsObj: {}, // 切换选择时的培训主题对象
    trainingType: '', //培训类型-如果是人物列表进行打卡值为training，培训主题则禁止选择
    recoveryType: 0,//传1纠错
    gpsProvinceName: '',
    gpsProvinceCode: '',
    gpsCityName: '',
    gpsCityCode: '',
    gpsAreaName: '',
    gpsAreaCode: '',
    distance: 0.0,//距离
    shAddress: '',//地址
    provinceId: '',//省市区
    provinceName: '',//省市区
    cityId: '',//省市区
    cityName: '',//省市区
    countyId: '',//省市区
    countyName: '',//省市区
    townId: '',//省市区
    townName: '',//省市区
    dlatitude: '',//门店精度
    dlongitude: '',//门店维度
    show1: false,
    photoTis: '请上传照片',
    stibBean: [],//问题列表
    adInfo: '',
    shopId: '',
    shopCisCode: '',
    memo: '',
    isSpecialShop: '',
    isopenMap: '',
    camera: ['camera'],
    curTime: '',//当前时间
    checkinRecord: [],//签到记录
    curTimeInv: '',//当前时间定时器
    dateSelVisable: false,//时间选着弹框
    currentDate: new Date().getTime(),//时间选着弹框绑定的时间
    problemTypeListVisible: false,//类型选择弹框
    selProblemType: '',//当前问题的类型
    selProblemIndex: '',//当前问题的Index
    account: {},//当前用户
    isMyStore: false,
    optionsTemp: {},
    newAdress:{},//新地址
    markers: [],//店铺位置标记
    trainingTopicsVisable: false,//培训主题弹框显示隐藏
    trainingTopicsOption: [],//培训主题列表
  }
  methods = {
    //打卡
    punchClock() {
      const singRecord = this.checkinRecord[0]
      const singInTime = new Date(singRecord.beginTime.replace(/-/g, '/')).getTime()
      const now = Date.now()

      if (now - singInTime < 15 * 60 * 1000) {
        Dialog.alert({
          title: '签退失败',
          message: `打卡时间：${singRecord.beginTime},请在签到15分钟后进行打卡签退！`,
          confirmButtonText: '确定',
          className: 'has-record-dialog-wrap'
        }).then(() => {
          // on confirm
        })
        return
      }

      // a)在现有的新增打卡界面上添加“终端检查”按钮，当巡店用户为“业务员”且所巡门店为负责门店时，该项必填，其余场景下此项选填。
      const checked = this.optionsTemp.isCheck
      if (this.isMyStore && this.account.businessFlagName === '是' && !checked) {
        wx.showToast({
          title: '请完成终端检查！',
          icon: 'none'
        })
        return
      }
      for (let i = 0; i < this.stibBean.length; i++) {
        if (!this.stibBean[i].type) {
          wx.showToast({
            title: `请选择第${i + 1}个问题的类型！`,
            icon: 'none'
          })
          return
        }
        if (!this.stibBean[i].responsible) {
          wx.showToast({
            title: `请选择第${i + 1}个问题的责任人！`,
            icon: 'none'
          })
          return
        }
        if (!this.stibBean[i].expDate) {
          wx.showToast({
            title: `请选择第${i + 1}个问题的解决日期！`,
            icon: 'none'
          })
          return
        }

      }

      let that = this
      let doorImgs = ''
      let sampleImgs = ''
      let staffImgs = ''
      let healthImgs = ''
      let boothImgs = ''
      for (let i = 0; i < that.doorImgs.length; i++) {
        doorImgs = doorImgs + that.doorImgs[i].id + ','
      }
      for (let i = 0; i < that.sampleImgs.length; i++) {
        sampleImgs = sampleImgs + that.sampleImgs[i].id + ','
      }
      for (let i = 0; i < that.staffImgs.length; i++) {
        staffImgs = staffImgs + that.staffImgs[i].id + ','
      }
      for (let i = 0; i < that.healthImgs.length; i++) {
        healthImgs = healthImgs + that.healthImgs[i].id + ','
      }
      for (let i = 0; i < that.boothImgs.length; i++) {
        boothImgs = boothImgs + that.boothImgs[i].id + ','
      }
      doorImgs = doorImgs.substring(0, doorImgs.length - 1)
      sampleImgs = sampleImgs.substring(0, sampleImgs.length - 1)
      staffImgs = staffImgs.substring(0, staffImgs.length - 1)
      healthImgs = healthImgs.substring(0, healthImgs.length - 1)
      boothImgs = boothImgs.substring(0, boothImgs.length - 1)
      if (that.shAddress) {
        if(that.trainingTopics){

          if(!that.traineesNumber){
            wx.showToast({
              title: `请输入培训人数`,
              icon: 'none'
            })
            return
          }

          if(that.trainingImgs.length <= 0){
            this.photoTis = '请上传培训照片'
            that.show1 = true
            return;
          }

        }
        if (that.doorImgs.length > 0 && that.sampleImgs.length > 0 && that.boothImgs.length > 0) {
          wx.showLoading()
          let data = {
            'distance': that.distance,
            'inspectionRecordItemFormBean': {
              'doorImgs': doorImgs,
              'boothImgs': boothImgs,
              'healthImgs': healthImgs,
              'sampleImgs': sampleImgs,
              'staffImgs': staffImgs,
              'stibBean': this.stibBean,
            },
            'recoveryType': that.newAdress.recoveryType,
            'storyName': that.storeName,
            'recoveryStatus': '1',//是否默认
            'mem': that.memo,
            'gpsAddress': that.location,
            'latitude': that.newAdress.dlatitude ? that.newAdress.dlatitude : that.dlatitude,
            'longitude': that.newAdress.dlongitude ? that.newAdress.dlongitude : that.dlongitude,
            'userLatiTude': that.latitude,
            'gpsProvinceName': that.newAdress.recoveryType == 1 ? (that.newAdress.gpsProvinceName||that.provinceName) : that.provinceName,
            'gpsProvinceCode': that.newAdress.recoveryType == 1 ? (that.newAdress.gpsProvinceCode||that.provinceId) : that.provinceId,
            'gpsCityName': that.newAdress.recoveryType == 1 ? (that.newAdress.gpsCityName||that.cityName) : that.cityName,
            'gpsCityCode': that.newAdress.recoveryType == 1 ? (that.newAdress.gpsCityCode||that.cityId) : that.cityId,
            'gpsAreaName': that.newAdress.recoveryType == 1 ? (that.newAdress.countyName||that.countyName) : that.countyName,
            'gpsAreaCode': that.newAdress.recoveryType == 1 ? (that.newAdress.countyId||that.countyId) : that.countyId,
            'gpsCountyCode': that.newAdress.recoveryType == 1 ? (that.newAdress.townId||that.townId) : that.townId,
            'gpsCountyName': that.newAdress.recoveryType == 1 ? (that.newAdress.townName||that.townName) : that.townName,
            'storeType': that.isSpecialShop == '0' ? 'F' : 'T',
            'storyCode': that.shopCisCode,
            'submitAddress': that.location,
            'imeiNo': '',//串码，可为空
            'storeAddress': that.newAdress.recoveryType == 1?that.newAdress.shAddress:that.shAddress,
            'userLongiTude': that.longitude,
            'recoveryFlag': '1',
            'clientSource': 'XTW',
          }
          // 如果为培训打卡，打卡传参需添加如下字段
          if(that.trainingTopics){
            data.trainingRecordFormBean={
              "traningTaskID": that.trainingTopicsId, //---任务ID
              "trainingRecodId": "", //--培训记录ID，不传
              "title": that.trainingTopics, //--任务主题
              "submitAddress": that.location, //--当前地址
              "img1Id": that.trainingImgs[0] ? that.trainingImgs[0].id : '', //--图片ID
              "img2Id": that.trainingImgs[1] ? that.trainingImgs[1].id : '', //--图片id
              "img3Id": that.trainingImgs[2] ? that.trainingImgs[2].id : '', //--图片ID
              "mem": that.memo, //--备注
              "primaryOption": "", // --第一选项  信天翁不传值
              "secondaryOption": "", //--第二标签  信天翁不传值
              "peopleNum": that.traineesNumber  //--培训人数
            }
          }
          that.methods.addInspectionRecord2(data).then(res => {
            if (res.payload.returnMsg == 'add inspection record successful.') {
              that.show3 = true
              that.setData({
                show3: true
              })
            }else{
              wx.showToast({
                title: res.payload.returnMsg,
                icon: 'none'
              })
            }
            wx.hideLoading()
          }).finally(() => {
            wx.hideLoading()
          })
        } else {
          let photoTis
          if (that.sampleImgs.length <= 0) photoTis = '请上传样机照片'
          if (that.boothImgs.length <= 0) photoTis = '请上传展台照片'
          if (that.doorImgs.length <= 0) photoTis = '请上传门店照片'

          this.photoTis = photoTis
          that.show1 = true
        }
      } else {
        wx.showToast({
          title: '请选择门店',
          icon: 'none'
        })
      }
    },
    //签到
    checkIn() {
      const that = this
      if (!this.shopCisCode) {
        wx.showToast({
          title: '请选择门店',
          icon: 'none'
        })
        return
      }
      if (!this.latitude) {
        wx.showToast({
          title: '请先获取当前定位！',
          icon: 'none'
        })
        return
      }

      this.qqmapsdk.calculateDistance({
        mode: 'straight',
        to: [{
          latitude: this.latitude,
          longitude: this.longitude
        }],
        from: {
          latitude: this.newAdress.dlatitude? this.newAdress.dlatitude : this.dlatitude,
          longitude: this.newAdress.dlongitude ? this.newAdress.dlongitude : this.dlongitude
        },
        success: function(res) {
          const distance = res.result.elements[0].distance
          // if (distance > 2000) { //todo
          if (distance > 2000&&that.recoveryType != 1) {
            Dialog.alert({
              title: '签到失败',
              message: `当前位置距离门店位置过远,请您到达门店附近后进行签到`,
              confirmButtonText: '确定',
              className: 'has-record-dialog-wrap'
            }).then(() => {
              // on confirm
            })
            return
          } else {
            that.methods.submit()
          }
        },
        fail: function(res) {
          wx.showToast({
            title: '获取距离失败，请重新定位后重试',
            icon: 'none'
          })
        }
      })

    },
    submit: () => {
      const data = {
        storeCode: this.shopCisCode,
        storeName: this.storeName,
        beginAddress: this.location,
        beginLongitude: !this.dlongitude? this.longitude : this.dlongitude,
        beginLatitude: !this.dlatitude ? this.latitude : this.dlatitude
      }
      this.methods.addCheckInRecord(data).then(res => {
        const data = res.payload
        if (data.success) {
          this.checkinRecord = [res.payload.returnData]
          this.$apply()
          wx.showToast({
            title: '签到成功！',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.payload.returnMsg,
            icon: 'none'
          })
        }
      })
    },
    onChange(event) {
      this.memo = event.detail
    },
    onClose() {
      this.show1 = false
      this.setData({ show1: false })
    },
    onSelect(event) {
      let that = this
      if (event.detail.name == '拍照') {
        that.selImg()
      }
    },
    showTankuang(index) {
      this.setData({ show2: true })
    },
    //删除图片
    deleteImg(event) {
      let that = this
      if (event.currentTarget.dataset.state == 1) {//门店照片
        let doorImgs
        doorImgs = this.doorImgs.splice(event.detail.index, 1)
        this.setData({ doorImgs: doorImgs })
      }
      if (event.currentTarget.dataset.state == 2) {//展台照片
        let boothImgs
        boothImgs = this.boothImgs.splice(event.detail.index, 1)
        this.setData({ boothImgs: boothImgs })
      }
      if (event.currentTarget.dataset.state == 3) {//样机状态
        let sampleImgs
        sampleImgs = this.sampleImgs.splice(event.detail.index, 1)
        this.setData({ sampleImgs: sampleImgs })
      }
      if (event.currentTarget.dataset.state == 4) {//门店卫生
        let healthImgs
        healthImgs = this.healthImgs.splice(event.detail.index, 1)
        this.setData({ healthImgs: healthImgs })
      }
      if (event.currentTarget.dataset.state == 5) {//员工状态
        let staffImgs
        staffImgs = this.staffImgs.splice(event.detail.index, 1)
        this.setData({ staffImgs: staffImgs })
      }
      if (event.currentTarget.dataset.state == 6) {//培训状态
        let trainingImgs
        trainingImgs = this.trainingImgs.splice(event.detail.index, 1)
        this.setData({ trainingImgs: trainingImgs })
      }
    },
    //上传图片
    afterRead(event) {
      this.selImg(event.detail.file.path, event.currentTarget.dataset.state)
    },
    onClose2() {
      this.setData({ show2: false })
    },
    onClose3() {
      wx.navigateBack({ delta: 2 })
      this.show3 = false
      this.setData({ show3: false })
    },
    onClose4() {
      this.show4 = false
      this.setData({ show4: false })
    },
    //选择门店
    selStore() {
      wx.redirectTo({ url: '/pages/terminal/selectStore/index' })
    },
    //更新日期和时间
    updataDidian() {
      this.getLocation()
    },
    //打开地图
    openLocation() {
      let that = this
      if (this.isopenMap != '') {
        request({
          api: `cts/ctsApi.nd?`,
          data: {
            serviceCode:'getCtsSessionId'
          },
          method:'POST',
          callback: (res) => {
            const { data } = res

            let storeCode = this.shopCisCode
            let jsessionId = ''
            if(data && data.returnData){
              jsessionId = data.returnData
            }
            let baseUrl = getDomain(wepy.$appConfig.baseUrl)
            let url = `${baseUrl}/correctionError/#/correctionError?JSESSIONID=${jsessionId}&isApp=true&storeCode=${storeCode}`
            const urlStr = encodeURIComponent(url);
            let jumpUrl = `/pages/me/webview/index?url=${urlStr}`
            wx.navigateTo({
              url: jumpUrl
            })
            this.$apply()
          }
        })

      } else {
        wx.showToast({
          title: '请选择店铺',
          icon: 'none'
        })
      }

      // wx.openLocation({
      //   latitude:that.latitude,
      //   longitude:that.longitude,
      //   scale: 18,
      //   name:that.location
      // })
    },
    beforeUpload: file => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        file.thumbUrl = e.target.result
        this.setState(state => ({
          imageUrl: file.thumbUrl,
          fileList: [...state.fileList, file]
        }))
      }
      return false
    },
    gotoPoint() {
      if (!this.shopId) {
        wx.showToast({
          title: '请选择门店',
          icon: 'none'
        })
        return
      }
      wx.navigateTo({ url: '/pages/terminal/point/index?shopId=' + this.shopId + '&isSpecialShop=' + this.isSpecialShop+'&shopCisCode=' + this.shopCisCode + '&storeName=' + this.storeName })
    },

    // 改变培训人数
    onTraineesChange(event){
      this.traineesNumber =  event.detail
    },
    //添加问题
    addSiteBean: () => {
      if (!this.shopId) {
        wx.showToast({
          title: '请选择门店',
          icon: 'none'
        })
        return
      }
      this.stibBean.push({
        'id': new Date().getTime(),
        'type': '',// -- 问题类型
        'description': '',
        'affiliation': '',
        'solution': '',
        'expDate': '',// --解决日期
        'personLiableCode': '',// --责任人编码
        'responsible': ''//  -- 责任人
      })
    },
    onDescriptionChange(index, event) {
      this.stibBean[index].description = event.detail
    },
    onAffiliationChange(index, event) {
      this.stibBean[index].affiliation = event.detail
    },
    onSolutionChange(index, event) {
      this.stibBean[index].solution = event.detail
    },
    //移除问题
    removeSiteBean: (index) => {
      let stibBeanNew = JSON.parse(JSON.stringify(this.stibBean))
      stibBeanNew.splice(index,1);
      this.stibBean = JSON.parse(JSON.stringify(stibBeanNew))
      this.$apply()
    },
    // 打开弹框
    openDateSel: (index) => {
      if (this.stibBean[index].expDate) {
        this.currentDate = new Date(this.stibBean[index].expDate).getTime()
      } else {
        this.currentDate = new Date().getTime()
      }
      this.selProblemIndex = index
      this.dateSelVisable = true
      this.selProblemType = this.stibBean[index].type
    },
    //时间弹框关闭（确认）
    onConfirm: (e) => {
      this.dateSelVisable = false
      var date = new Date(parseInt(e.detail))
      var Y = date.getFullYear()
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      // var date1 = Y + '年' + M + '月' + D + '日'
      var date2 = Y + '-' + M + '-' + D
      this.stibBean[this.selProblemIndex].expDate = date2
    },
    //时间弹框关闭（取消）
    onCancel: () => {
      this.dateSelVisable = false
    },
    // 打开弹框
    openTypeList: (index) => {
      this.selProblemIndex = index
      this.selProblemType = this.stibBean[index].type
      this.problemTypeListVisible = true
    },
    // 关闭弹框
    onCloseTypeList: (dateType) => {
      this.problemTypeListVisible = false
    },
    //选择问题类型（确认）
    onSelProblemType: (item) => {
      this.selProblemType = item.value
      this.stibBean[this.selProblemIndex].type = item.value
      this.methods.onCloseTypeList()
    },
    //跳转责任人
    gotoPeople: (index) => {
      this.selProblemIndex = index
      if (!this.shopId) {
        wx.showToast({
          title: '请选择门店',
          icon: 'none'
        })
        return
      }
      wx.navigateTo({ url: '/pages/terminal/people/index?storeCode=' + this.shopCisCode + '&selProblemIndex=' + this.selProblemIndex })
    },
    getAccount: () => {
      this.methods.getStoryPersons().then(res => {
        const custAccountList = res.payload.custAccountList || []
        const thisAccount = wepy.$instance.globalData.account
        this.account = custAccountList.find(item => {
          return item.account === thisAccount
        })
        this.methods.getIsMyStore()
      })
    },
    getIsMyStore: () => {
      if (!this.account.id || !this.shopId) {
        return
      }
      this.methods.getShopListByCustId({
        custAccountId: this.account.id
      }).then(res1 => {
        this.isMyStore = res1.payload.idData.some(item => {
          return item == Number(this.shopId)
        })
      })
    },
    fillParamsToData:(options,type)=>{
      if(type==1){
        this.storeName = options.shopFullName
      }else{
        this.storeName = options.fullName
      }
      if (this.distance != 'null') {
        this.distance = parseFloat(options.distance).toFixed(1)
        this.isopenMap = true
      }
      this.shAddress = options.shAddress
      this.provinceId = options.provinceId!='undefined'?options.provinceId:''
      this.provinceName = options.provinceName!='undefined'?options.provinceName:''
      this.cityId = options.cityId!='undefined'?options.cityId:''
      this.cityName = options.cityName!='undefined'?options.cityName:''
      this.countyId = options.countyId!='undefined'?options.countyId:''
      this.countyName = options.countyName!='undefined'?options.countyName:''
      this.townName = options.townName!='undefined'?options.townName:''
      this.townId = options.townId!='undefined'?options.townId:''
      this.dlongitude = parseFloat(options.longitude)
      this.dlatitude = parseFloat(options.latitude)
      this.shopId = options.shopId
      this.shopCisCode = options.shopCisCode
      this.isSpecialShop = options.isSpecialShop
    },

    // 培训主题弹框显示
    handleTrainingPop(){
      if(this.trainingType){
        return
      }
      this.trainingTopicsObj = {
        id: this.trainingTopicsId,
        title: this.trainingTopics
      }
      this.trainingTopicsVisable = true
    },

    // 培训主题弹框取消
    handleCanclePop(){
      this.trainingTopicsVisable = false
    },

    handleClearPop(){
      this.trainingTopicsObj = {}
      this.trainingTopics = ''
      this.trainingTopicsId = ''
      this.trainingTopicsVisable = false
    },

    // 培训主题弹框确定
    handleConfirmPop(){
      if(this.trainingTopicsObj) {
        this.trainingTopics = this.trainingTopicsObj.title
        this.trainingTopicsId = this.trainingTopicsObj.id
      }
      this.trainingTopicsVisable = false
    },

    // 培训主题选择
    onTrainingTopicschange(obj){
      this.trainingTopicsObj = obj
    }
  }

  //选择照片
  selImg(path, state) {
    let that = this
    let FSM = wx.getFileSystemManager()
    let obj = {}
    FSM.readFile({
      filePath: path,
      encoding: 'base64',
      success: function(res) {
        const data = {
          'serviceCode': 'uploadXtw',
          'fileModuleName': 'publicPictures',
          'file': 'image/jpeg;base64,' + res.data
        }
        that.methods.upload2Img(data).then(res2 => {
          obj.url = res2.payload.returnData.fileMapperPath
          obj.id = res2.payload.returnData.id
          obj.name = res2.payload.returnData.id
          if (state == 1) {//门头照片
            let doorImgs = that.doorImgs
            doorImgs.push(obj)
            that.doorImgs = doorImgs
            that.setData({ doorImgs: doorImgs })
          }
          if (state == 2) {//展台照片
            let boothImgs = that.boothImgs
            boothImgs.push(obj)
            that.setData({ boothImgs: boothImgs })
          }
          if (state == 3) {//样机照片
            let sampleImgs = that.sampleImgs
            sampleImgs.push(obj)
            that.setData({ sampleImgs: sampleImgs })
          }
          if (state == 4) {//门店卫生
            let healthImgs = that.healthImgs
            healthImgs.push(obj)
            that.setData({ healthImgs: healthImgs })
          }
          if (state == 5) {//员工专题
            let staffImgs = that.staffImgs
            staffImgs.push(obj)
            that.setData({ staffImgs: staffImgs })
          }
          if (state == 6) {//培训专题
            let trainingImgs = that.trainingImgs
            trainingImgs.push(obj)
            that.setData({ trainingImgs: trainingImgs })
          }
          that.$apply()
        })
      }
    })
  }

  //获取当前位置
  getLocation() {
    let that = this
    // 初始化时间
    let day = new Date()
    that.currentTime = day.Format('MM-dd hh:mm:ss')
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.latitude = res.latitude
        that.longitude = res.longitude
        if (that.dlatitude == '') {
          that.dlatitude = res.latitude
          that.dlongitude = res.longitude
        }
        that.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {
            that.adInfo = res.result.ad_info
            that.setData({ location: res.result.address })
            that.location = res.result.address
          },
          fail: function(res) {
            wx.showToast({
              title: '解析地址失败',
              icon: 'none'
            })
          }
        })
      },
      fail(res) {
        that.show4 = true
        that.setData({ show4: true })
      }
    })
  }

  getRecordByUserCode() {
    const that = this
    if (!this.shopId) {
      return
    }
    const data = {
      'storeCode': this.shopCisCode
    }
    this.methods.getCheckInRecordByUserCode(data).then(res => {
      const data = res.payload
      const allCheckInRecord = data.returnData ? (data.returnData.allCheckInRecord || []) : []
      let storeCheckInRecordStore = data.returnData ? (data.returnData.storeCheckInRecordStore || []) : []
      // debugger
      //该门店是否签到
      // if(storeCheckInRecordStore.length==0){
      //   storeCheckInRecordStore = allCheckInRecord.filter(it=>{
      //     debugger
      //     return it.storeCode== this.shopCisCode
      //   })
      // }
      if (storeCheckInRecordStore && storeCheckInRecordStore.length > 0) {
        this.checkinRecord = storeCheckInRecordStore
        this.$apply()
        return
      } else if (allCheckInRecord && allCheckInRecord.length > 0) {
        Dialog.confirm({
          title: '提示',
          message: `您有一签到的门店正在进行巡店是否进入?`,
          confirmButtonText: '立即进入',
          cancelButtonText: '稍后再说',
          className: 'has-record-dialog-wrap'
        }).then(() => {
          // on confirm
          const record = allCheckInRecord[allCheckInRecord.length - 1]
          this.checkinRecord = [record]
          const data = {
            'cisCode': wepy.$instance.globalData.cisCode,
            'shopFullName': record.storeName,
            'distance': '',
            'longitude': that.longitude,
            'latitude': that.latitude,
            'matkls': [],
            'label': '',
            'marketModel': '',
            'shopLevel': '',
            'sortType': '1',
            'page': 1,
            'pageSize': 10,
            'queryParamList': []
          }
          this.methods.getShopListByCust(data).then(res => {
            const obj = res.payload.data.content[0]
            this.methods.fillParamsToData(obj,1)
            that.$apply()
          })
          this.$apply()
        })
          .catch(() => {
            // on cancel
            this.checkinRecord = []
            this.$apply()
          })
      } else {
        this.checkinRecord = []
        this.$apply()
      }
    })
  }

  // 获取培训列表
   myGetDataList() {
    let now = new Date();
    let currentYear = now.getFullYear();
    let month = now.getMonth() + 1;
    let currentMonth = month < 10 ? '0' + month : month;

    request({
      api: `cts/ctsApi.nd?`,
      data: {
        months: `${currentYear}-${currentMonth}`,
        serviceCode:'getTrainingTaskListV3'
      },
      method:'POST',
      callback: (res) => {
        const { data } = res
        this.trainingTopicsOption = data.returnData
        if(this.trainingTopicsOption){
          this.trainingTopicsOption = this.trainingTopicsOption.map( item => {
            return {
              id: item.id,
              title: item.title
            }
          })
        }
        this.$apply()
      }
    })
  }

  onLoad(options) {
    let that = this
    let obj
    this.optionsTemp = JSON.parse(JSON.stringify(options))
    this.myGetDataList()
    this.methods.getAccount()

    // 空对象则是从我的-新增打卡进入
    if(JSON.stringify(options) == "{}"){
      removeStorage("training_item")//用于清除保存的数据
    }

    // 从培训列表进入
    if(options.trainingType){
      setStorage("training_item", {
        trainingId: options.trainingId,
        trainingTitle: options.trainingTitle,
        trainingType: options.trainingType,
      });
    }
    let trainingItem = wx.getStorageSync("training_item")//在需要数据的页面取值
    if(trainingItem){
      trainingItem = JSON.parse(JSON.stringify(trainingItem))
      this.trainingType = trainingItem.trainingType
      this.trainingTopics = trainingItem.trainingTitle  // 培训主题
      this.trainingTopicsId = trainingItem.trainingId // 培训主题id
    }

    if (options.data) {
      obj = JSON.parse(options.data)
      this.methods.fillParamsToData(obj,1)
    }
    if (options.fullName) {
      this.methods.fillParamsToData(options,2)
    }
    this.markers = [
      {
        id: Math.random(),
        latitude: that.dlatitude,
        longitude: that.dlongitude,
        iconPath: 'http://3s-static.hisense.com/wechat/1/14722429883/1655865963285_a60bce54f9a147ba9e173f025974cf45.png', // weizhi.png
        width: 30,
        height: 30
      }
    ]
    this.qqmapsdk = new qqmap({
      key: wepy.$appConfig.qqMapKey
    })
    this.getLocation()
    wx.getStorage({
      key: 'b2b_token',
      success(res) {
        that.userAccount = JSON.parse(res.data)
      }
    })
    this.getRecordByUserCode()
    //当前时间获取
    that.curTimeInv = setInterval(() => {
      that.curTime = formatDate(Date.parse(new Date()), 'h:m')
    }, 10 * 1000)
    that.curTime = formatDate(Date.parse(new Date()), 'h:m')
    this.$apply()
  }

  onUnload() {
    clearInterval(this.curTimeInv)
  }
}
