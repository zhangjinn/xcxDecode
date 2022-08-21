import wepy from 'wepy'
import {
  submitApplications ,
  getMateriel,
  getCityList,
  getAreaList,
  getTownList,
  getFuzzySearch,
  RepeatCompany,
  sendSecurityCode
} from "@/store/actions/IntentionMerchants"
import Toast from '@/components/vant/toast/toast'
import { Weapp } from 'definitions/weapp'
import { trim } from 'ramda'
import { request } from '@/utils/request'
const QRCode= require ('@/utils/weapp-qrcode')

// import QRCode from "../../../utils/weapp-qrcode.js"
import Dialog from '@/components/vant/dialog/dialog';
import { getDistributorAddress } from '@/store/actions/order'
import { base64src } from '../../../utils/base64.js'
const { baseUrl } = wepy.$appConfig;
export default class Business extends wepy.page {
  config = {
    navigationBarTitleText: '意向商家登记表',
    usingComponents: {
      "van-dialog": "../../../components/vant/dialog/index",
      "van-overlay": "../../../components/vant/overlay/index",
      'van-card': '../../../components/vant/card/index',
      'van-button': '../../../components/vant/button/index',
      "van-toast": "../../../components/vant/toast/index",
      'van-popup': '../../../components/vant/popup/index',
      'van-rate': '../../../components/vant/rate/index',
      'van-field': '../../../components/vant/field/index',
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index',
      'van-steps':'../../../components/vant/steps/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-radio': '../../../components/vant/radio/index',
      'van-radio-group': '../../../components/vant/radio-group/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      "item": "../../../components/dms-order-addition-detail-item/index",
      "van-icon": "../../../components/vant/icon/index",
      "van-submit-bar": "../../../components/vant/submit-bar/index",
      "van-transition": "../../../components/vant/transition/index",
      "stores": "../../../components/stores-return/index",
      'van-area': '../../../components/vant/area/index',
      'van-tab': '../../../components/vant/tab/index',
      'van-tabs': '../../../components/vant/tabs/index',
      'van-tree-select': '../../../components/vant/tree-select/index'
    }
  };
  data: Data = {
    myQrcode:'myQrcode',
    newconctat:'',//扫码后数据
    showshow: true,
    companyName:'',// 公司全称
    taxNumber:'', // 税号
    companyType:'', // 公司类型
    workAdress:'',// 办公地址
    detailAdress:'',// 详细地址
    workerNumber:'',// 员工个数
    container:'',// 联系人姓名
    phoneNumber:'',// 联系人手机号
    show:false,     // 控制弹出层是否弹出的值
    jigouShow:false, // 点击机构控制出的弹出框
    usableMoney:'', // 可用资金
    radio:1, // 纳税人区别
    radio1:2,// 是否有销售网络  0是否 1是
    active:0,// 步骤条激活标识
    saleNum: '',// 销售额
    currentSelectTripType:'17452', // 合作类型标识
    currentSelectTripTypeName:'直营',
    selectBuzhou:1,
    selectTitle:1,
    selectBuzhou1:1,
    custId:null,
    showNext:true,
    selectTitle1:1,
    list: [],// 添加合作机构数据
    production:'',// 产品id
    productionName:'',// 产品名称
    merchandiseIndex: null,
    merchandiseList: [],
    qrcodePath:'',
    // 省市区镇
    multiIndex: [0, 0, 0, 0],
    showChooseAdressWindow:false,
    tabActive: 0,
    showAdressInput:false,
    conctatBefor:'',
    companyList:[],// 获取公司
    tableShow:false,//table默认是不显示
    viewShowed: false, //显示结果view的状态
    inputVal: "", // 搜索框值
    catList: [], //搜索渲染推荐数据
    provinces: [],
    provinceId:'',
    cities: [],
    cityId: '',
    districts: [],
    districtId: '',
    towns: [],
    townId: '',
    areaText: '',
    areaItems: [
      {
        values: [],
        className: 'provinceColumn',
        defaultIndex: 0
      },
      {
        values: [],
        className: 'cityColumn',
        defaultIndex: 2
      },
      {
        values: [],
        className: 'districtColumn',
        defaultIndex: 0
      },
      {
        values: [],
        className: 'townColumn',
        defaultIndex: 0
      }
    ],
    showCompanyName: '',
    companyInputFlag: true,
    sendTime: '发送验证码',
    // sendColor: '#363636',
    phoneCodeButton:'vertificate',
    secend: 60,
    isSend: false,
    text: '获取验证码', //按钮文字
    currentTime: 60, //倒计时
    disabled: false, //按钮是否禁用
    phone: '' //获取到的手机栏中的值
    phoneCode:'',
  }


  methods = {
    // bindButtonTap:()=> {
    //   var that = this;
    //   var phoneNumber = that.phoneNumber;
    //   var currentTime = that.currentTime
    //   if (phoneNumber == '') {
    //     wx.showModal({
    //       title: '提示',
    //       content: "号码不能为空"
    //     })
    //   } else if (phoneNumber.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phoneNumber)) {
    //     wx.showModal({
    //       title: '提示',
    //       content: "手机号格式不正确"
    //     })
    //   } else {
    //     //当手机号正确的时候提示用户短信验证码已经发送 并禁止按钮点击导致定时器多次触发的bug
    //     that.setData({
    //       disabled: true, 
    //       phoneCodeButton: 'inactiveClass'
    //     })
    //     that.disabled = true
    //     that.phoneCodeButton = 'inactiveClass'
    //     that.$apply();
      
    //     let data = {
    //       contactPhone: that.phoneNumber
    //     }
    //     sendSecurityCode(data，res=>{
    //       console.log('验证码',res)
    //       if(res.statusCode === 200){
    //         Toast.success('短信验证码已发送');
    //       }else {
    //         Toast.fail('发送失败，请重新发送')
    //         that.text = '重新发送'
    //         that.currentTime = 60
    //         that.disabled = false
    //         that.phoneCodeButton = 'vertificate'
    //         that.$apply()
    //       }
    //     })
    //     //设置一分钟的倒计时
    //     var interval = setInterval(function () {
    //       currentTime--; //每执行一次让倒计时秒数减一
    //       // that.setData({
    //       //   text: currentTime + 's'+'后重新发送', //按钮文字变成倒计时对应秒数
    //       //   phoneCodeButton: 'inactiveClass',
    //       // })
    //       that.text = currentTime + 's'+'后重新发送'
    //       that.phoneCodeButton = 'inactiveClass'
    //       that.$apply()
    //       //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获         取验证码的按钮恢复到初始化状态只改变按钮文字
   
    //       if (currentTime <= 0) {
    //         clearInterval(interval)
    //         // that.setData({
    //         //   text: '重新发送',
    //         //   currentTime: 60,
    //         //   disabled: false,
    //         //   phoneCodeButton: 'vertificate'
    //         // })
    //         that.text = '重新发送'
    //         that.currentTime = 60
    //         that.disabled = false
    //         that.phoneCodeButton = 'vertificate'
    //         that.$apply()
    //       }
    //     }, 1000);
    //   };
    // },
  // 发送验证码
  sendCode: function() {
    var that = this
    var secend = that.secend
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;;
    var phoneNumber = that.phoneNumber
    //验证手机号码
    if (!myreg.test(phoneNumber)) {
      wx.showToast({
        title: '手机号输入错误',
        icon: 'none'
      })
      // that.setData({
      //   phoneNumber: ""
      // })
      that.phoneNumber = '',
      that.$apply()
      return
    }
    let data = {
      contactPhone: that.phoneNumber
    }
    sendSecurityCode(data，res=>{
      console.log('验证码',res)
      if(res.statusCode === 200){
        Toast.success('短信验证码已发送');
      }else {
        Toast.fail('发送失败，请重新发送')
        that.secend = 60
        that.isSend = false
        that.$apply()
      }
    })
    this.isSend = true
    that.$apply()
    // that.setData({
    //   phoneNumber: "",
    //   isSend:true
    // })
    var interVal = setInterval(function() {
      secend--
      // that.setData({
      //   secend: secend
      // })
      that.secend = secend
      that.$apply()
      if (secend == 0) {
        clearInterval(interVal);
        // that.setData({
        //   secend: 60,
        //   isSend: false
        // })
        that.secend = 60
        that.isSend = false
        that.$apply()
      }
    }, 1000) 
    that.setData({
      isSend: true
    })
  },

    // 键盘抬起
    inputTyping: function(e) {
      let that = this;
      that.inputVal = e.detail.value
      that.data.inputVal = e.detail
      this.setData({
        inputVal: that.inputVal
      })
      if (that.inputVal == '') {
        this.companyList = []
        this.viewShowed = false
        that.setData({
          viewShowed: false,
          companyList: this.companyList
        })
      } else {
      //“这里需要特别注意，不然在选中下拉框值的时候，下拉框又出现”
        if (e.detail.cursor) { //e.detail.cursor表示input值当前焦点所在的位置
        let that = this
        let data = { word : that.inputVal}
        getFuzzySearch(data, res => {
          if (res.data.result && res.data.result.items && res.data.result.items.length > 0) {
            this.companyList = []
            that.companyList.push(...res.data.result.items)
            that.viewShowed = true
            that.setData({ companyList: that.companyList, viewShowed: that.viewShowed })
          } else {
            this.companyList = []
            that.viewShowed = false
            that.setData({ companyList: that.companyList, viewShowed: that.viewShowed })
          }
        })
        }
      }
    },
    // 获取选中推荐列表中的值
    name: function(res) {
      this.companyInputFlag = false
      this.setData({ companyInputFlag: false })
      this.inputVal = res.currentTarget.dataset.index
      this.showCompanyName = this.inputVal
      this.viewShowed = false
      this.setData({ inputVal: this.inputVal, showCompanyName: this.showCompanyName, viewShowed: false })
    },
    inputCompanyName: () => {
      this.companyInputFlag = true
      this.setData({ companyInputFlag: true })
    },
     // 输入公司名称修改data中数据
    onChangeCompany(event: Weapp.Event) {
      this.companyName = trim(event.detail)
    },
    showChooseAdress:() => {
      const this_ = this
      if (this_.data.areaItems[0].values && this_.data.areaItems[0].values.length > 0
        && this_.data.areaItems[1].values && this_.data.areaItems[1].values.length > 0
        && this_.data.areaItems[2].values && this_.data.areaItems[2].values.length > 0
        && this_.data.areaItems[3].values && this_.data.areaItems[3].values.length > 0) {
        this_.showChooseAdressWindow = true
        return
      }
      this_.data.areaItems[0].values = []
      this_.data.areaItems[1].values = []
      this_.data.areaItems[2].values = []
      this_.data.areaItems[3].values = []
      getMateriel({}, res => {
        res.data.provicesList.forEach(province => {
          this_.data.areaItems[0].values.push({ id: province.id, name: province.provinceName })
        })
        if (this_.data.areaItems[0].values && this_.data.areaItems[0].values.length > 0) {
          this_.data.provinceId = this_.data.areaItems[0].values[0].id
          this_.data.provinceName = this_.data.areaItems[0].values[0].name
          this_.setData({ areaItems: this_.data.areaItems })
          getCityList({ proviceId: this_.data.areaItems[0].values[0].id }, res => {
            res.data.forEach(city => {
              this_.data.areaItems[1].values.push({ id: city.id, name: city.cityName })
            })
            if (this_.data.areaItems[1].values && this_.data.areaItems[1].values.length > 0) {
              this_.setData({ areaItems: this_.data.areaItems })
              this_.data.cityId = this_.data.areaItems[1].values[0].id
              this_.data.cityName = this_.data.areaItems[1].values[0].name
              getAreaList({ cityId: this_.data.areaItems[1].values[0].id }, res => {
                res.data.forEach(district => {
                  this_.data.areaItems[2].values.push({ id: district.id, name: district.districtName })
                })
                if (this_.data.areaItems[2].values && this_.data.areaItems[2].values.length > 0) {
                  this_.setData({ areaItems: this_.data.areaItems })
                  this_.data.districtId = this_.data.areaItems[2].values[0].id
                  this_.data.districtName = this_.data.areaItems[2].values[0].name
                  getTownList({ districtId: this_.data.areaItems[2].values[0].id }, res => {
                    res.data.forEach(town => {
                      this_.data.areaItems[3].values.push({ id: town.id, name: town.townName })
                    })
                    if (this_.data.areaItems[3].values && this_.data.areaItems[3].values.length > 0) {
                      this_.setData({ areaItems: this_.data.areaItems })
                      this_.data.townId = this_.data.areaItems[3].values[0].id
                      this_.data.townName = this_.data.areaItems[3].values[0].name
                    }
                  })
                }
              })
            }
          })
        }
      })
      this.showChooseAdressWindow = true
    },
    areaPickerCancel:(event) => {
      const this_ = this
      this_.data.areaItems[0].values = []
      this_.data.areaItems[1].values = []
      this_.data.areaItems[2].values = []
      this_.data.areaItems[3].values = []
      this_.provinceId = ''
      this_.cityId = ''
      this_.districtId = ''
      this_.townId = ''
      this_.showChooseAdressWindow = false
      this_.setData({ showChooseAdressWindow: false })
    },
    areaPickerConfirm:(event) => {
      const { value } = event.detail;
      const this_ = this
      this_.areaText = value[0].name + value[1].name + value[2].name + value[3].name
      this_.provinceId = value[0].id
      this_.cityId = value[1].id
      this_.districtId = value[2].id
      this_.townId = value[3].id
      this_.showChooseAdressWindow = false
      this_.showAdressInput = true
      this_.setData({ showChooseAdressWindow: false, showAdressInput: true, areaText: this_.areaText })
    },
    areaPopuopClose:(event) => {
      const this_ = this
      this_.showChooseAdressWindow = false
      this_.setData({ showChooseAdressWindow: false })
    },
    areaPickerChange:(event: { detail: { picker: any; value: any; index: any; }; }) => {
      const this_ = this
      const { picker, value, index } = event.detail;
      switch (index) {
        // 省列发生变化
        case 0:
          this_.methods.provinceChange(value, picker)
          break
        // 市列发生变化
        case 1:
          this_.methods.cityChange(value, picker)
          break
        // 县/区列发生变化
        case 2:
          this_.methods.districtChange(value, picker)
          break
        // 镇列发生变化
        case 3:
          this_.methods.townChange(value)
          break
      }
    },
    provinceChange:(value, picker) => {
      const this_ = this
      this_.data.provinceId = value[0].id
      this_.data.provinceName = value[0].name
      getCityList({ proviceId: this_.data.provinceId }, res => {
        this_.data.areaItems[1].values = []
        this_.data.areaItems[1].defaultIndex = 0
        res.data.forEach(city => {
          this_.data.areaItems[1].values.push({ id: city.id, name: city.cityName })
        })
        picker.setColumnValues(1, this_.data.areaItems[1].values)
        if(this_.data.areaItems[1].values && this_.data.areaItems[1].values.length > 0) {
          this_.data.cityId = this_.data.areaItems[1].values[0].id
          this_.data.cityName = this_.data.areaItems[1].values[0].name
          getAreaList({ cityId: this_.data.cityId }, res => {
            this_.data.areaItems[2].values = []
            this_.data.areaItems[2].defaultIndex = 0
            res.data.forEach(district => {
              this_.data.areaItems[2].values.push({ id: district.id, name: district.districtName })
            })
            picker.setColumnValues(2, this_.data.areaItems[2].values)
            if (this_.data.areaItems[2].values && this_.data.areaItems[2].values.length > 0) {
              this_.data.districtId = this_.data.areaItems[2].values[0].id
              this_.data.districtName = this_.data.areaItems[2].values[0].name
              getTownList({ districtId: this_.data.districtId }, res => {
                this_.data.areaItems[3].values = []
                this_.data.areaItems[3].defaultIndex = 0
                res.data.forEach(town => {
                  this_.data.areaItems[3].values.push({ id: town.id, name: town.townName })
                })
                picker.setColumnValues(3, this_.data.areaItems[3].values)
                if (this_.data.areaItems[3].values && this_.data.areaItems[3].values.length > 0 ) {
                  this_.data.townId = this_.data.areaItems[3].values[0].id
                  this_.data.townName = this_.data.areaItems[3].values[0].name
                }
              })
            }
          })
        }
      })
    },
    cityChange: (value, picker) => {
      const this_ = this
      this_.data.cityId = value[1].id
      this_.data.cityName = value[1].name
      getAreaList({ cityId: this_.data.cityId }, res => {
        this_.data.areaItems[2].values = []
        this_.data.areaItems[2].defaultIndex = 0
        res.data.forEach(district => {
          this_.data.areaItems[2].values.push({ id: district.id, name: district.districtName })
        })
        picker.setColumnValues(2, this_.data.areaItems[2].values)
        if (this_.data.areaItems[2].values && this_.data.areaItems[2].values.length > 0) {
          this_.data.districtId = this_.data.areaItems[2].values[0].id
          this_.data.districtName = this_.data.areaItems[2].values[0].name
          getTownList({ districtId: this_.data.districtId }, res => {
            this_.data.areaItems[3].values = []
            this_.data.areaItems[3].defaultIndex = 0
            res.data.forEach(town => {
              this_.data.areaItems[3].values.push({ id: town.id, name: town.townName })
            })
            picker.setColumnValues(3, this_.data.areaItems[3].values)
            if (this_.data.areaItems[3].values && this_.data.areaItems[3].values.length > 0 ) {
              this_.data.townId = this_.data.areaItems[3].values[0].id
              this_.data.townName = this_.data.areaItems[3].values[0].name
            }
          })
        }
      })
    },
    districtChange:(value, picker) => {
      const this_ = this
      this_.data.districtId = value[2].id
      this_.data.districtName = value[2].name
      getTownList({ districtId: this_.data.districtId }, res => {
        this_.data.areaItems[3].values = []
        this_.data.areaItems[3].defaultIndex = 0
        res.data.forEach(town => {
          this_.data.areaItems[3].values.push({ id: town.id, name: town.townName })
        })
        picker.setColumnValues(3, this_.data.areaItems[3].values)
        if (this_.data.areaItems[3].values && this_.data.areaItems[3].values.length > 0 ) {
          this_.data.townId = this_.data.areaItems[3].values[0].id
          this_.data.townName = this_.data.areaItems[3].values[0].name
        }
      })
    },
    townChange:(value) => {
      const this_ = this
      this_.data.townId = value[3].id
      this_.data.townName = value[3].name
    },
    //选择合作商按钮进行激活状态改变
    selectedPinche: function (e) {
        this.currentSelectTripType = e.target.dataset.id
        this.currentSelectTripTypeName = e.target.dataset.name
    },
    // 选择合作商按钮进行激活状态改变
    selectedBaoche: function(e) {
      this.currentSelectTripType= e.target.dataset.id,
      this.currentSelectTripTypeName = e.target.dataset.name
    },
    // 修改公司输入框内容
    onChange(event){
        // event.detail 为当前输入的值
      this.companyName = event.detail
    },
    // 点击类型弹出
    openType(){
       this.show = true
    },
    closeType(){
       this.show = false
    },
    //点击机构弹出
    openjigouType(e){
      this.merchandiseIndex = e.currentTarget.dataset.index
      this.merchandiseList[this.merchandiseIndex].buttonStatus = 1
      let flag = false
      if(this.data.list && this.data.list.length > 0) {
        for(let i = 0; i < this.data.list.length; i++) {
          if(this.data.list[i].merchandiseIndex === this.merchandiseIndex) {
            this.production = this.data.list[i].production
            this.productionName = this.data.list[i].productionName
            this.currentSelectTripType = this.data.list[i].currentSelectTripTypeId
            this.currentSelectTripTypeName = this.data.list[i].currentSelectTripTypeName
            this.saleNum = this.data.list[i].saleNum
            flag = true
            break
          }
        }
      }
      if(!flag) {
        this.production = e.currentTarget.dataset.id
        this.productionName = e.currentTarget.dataset.name
      }
      this.jigouShow = true
    },
    // 机构弹窗点击确定往数组里添加数据
    addHezuo(){
      if (!this.currentSelectTripTypeName) {
        Toast.fail('请先选择经销商类型！')
        return
      }
      if (!this.saleNum) {
        Toast.fail('请先填写销售额！')
        return
      }
      const obj = {
        production: this.production,
        productionName: this.productionName,
        currentSelectTripTypeId: this.currentSelectTripType,
        currentSelectTripTypeName: this.currentSelectTripTypeName,
        saleNum: this.saleNum,
        merchandiseIndex: this.merchandiseIndex
      }
      // 先判断数组中是否已经存在
      let listIndex = null
      for(let index = 0; index < this.data.list.length; index++) {
          if(this.data.list[index].merchandiseIndex === this.merchandiseIndex) {
            listIndex = index
            break
          }
      }
      if(listIndex || listIndex === 0) {
          this.data.list[listIndex] = obj
      } else {
        this.data.list.push(obj)
        this.setData({
          list: this.data.list
        })
      }
      this.merchandiseList[this.merchandiseIndex].buttonStatus = 2
      this.jigouShow = false
      this.production = ''
      this.productionName = ''
      this.currentSelectTripType = ''
      this.currentSelectTripTypeName = ''
      this.saleNum = ''
      this.tableShow = true
    },
    // 关闭机构弹窗关闭
     closejigouType(){
      this.production = ''
      this.productionName = ''
      this.currentSelectTripType = ''
      this.currentSelectTripTypeName = ''
      this.saleNum = ''
      this.jigouShow = false
    },
    // 选中公司类型
    confirm(event){
      this.show = false
    },
    // 点击公司类型
    onClick(event) {
      this.radio =  event.target.dataset.id
      this.companyType= event.target.dataset.name
    },
    //是否有网络销售
    onClick2(event) {
      this.radio1 =  event.detail
    },
    onChange1(event) {
      this.radio1 = event.target.dataset.id
    },
    // 清除公司信息
    clearComapnyName() {
      this.companyName = ''
    },
    // 输入税号修改data中数据
    onChangeTFN(event: Weapp.Event) {
      let that = this;
      that.taxNumber = trim(event.detail.value)
        that.setData({
          taxNumber: event.detail.value
        })
    },
     // 修改详细地址出发
     onChangeDetailAdress(event: Weapp.Event){
      let that = this;
      that.detailAdress = trim(event.detail.value)
      that.setData({
        detailAdress:event.detail.value
      })
    },
    // 修改员工个数
    onChangeWorkerNumber(event: Weapp.Event){
      let that = this;
      that.workerNumber = trim(event.detail.value)
      that.setData({
        workerNumber:event.detail.value
      })
    },

    // 修改联系人姓名
    onChangeContainer(event: Weapp.Event){
      let that = this;
      that.container = trim(event.detail.value)
      that.setData({
        container:event.detail.value
      })
    },
    // 修改联系人电话触发
    onChangePhoneNumber(event: Weapp.Event){
      let that = this;
      that.phoneNumber = trim(event.detail.value)
      that.setData({
        phoneNumber:event.detail.value
      })
    },

    changeCode(event: Weapp.Event){
      let that = this;
      that.phoneCode = trim(event.detail.value)
      that.setData({
        phoneCode:event.detail.value
      })
    },

     // 修改可用金额触发
    onChangeUsableMoney(event: Weapp.Event){
      let that = this;
      that.usableMoney = trim(event.detail.value)
      that.setData({
        usableMoney:event.detail.value
      })
    },
    // 修改营销金额
    onChangeSaleNum(event: Weapp.Event){
      let that = this;
      that.saleNum = trim(event.detail.value)
      that.setData({
        saleNum:event.detail.value
      })
    },
    // 删除动态添加的合作商数据
    del(e){
        var index = e.target.dataset.index
        var list= this.data.list
        let nowInfo = list[index]
        list.splice(index,1)
        this.setData({
          list: list,
        })
        this.merchandiseList[nowInfo.merchandiseIndex].buttonStatus = 0
    },


    next:()=> {
      let activeValue = this.active + 1
      if(activeValue == 1) {
        const data = {}
        if (!this.inputVal) {
          Toast.fail('请输入公司名称')
          return
        }
        if (!this.phoneCode) {
          Toast.fail('请输入手机验证码')
          return
        }
        if (!this.taxNumber) {
          Toast.fail('请输入税号')
          return
        }
        if (!this.radio) {
          Toast.fail('请选择公司类型')
          return
        }
        if (!this.workerNumber) {
          Toast.fail('请填写员工数量')
          return
        } 
        if(!(/^[0-9]*[1-9][0-9]*$/.test(this.workerNumber))){
          Toast.fail('员工数量,请填写数字格式')
          return
        }
        if (!this.container) {
          Toast.fail('请填写联系人')
          return
        } 
        if (!this.phoneNumber) {
          Toast.fail('请填写联系电话')
          return
        }
        if(!(/^1[34578]\d{9}$/.test(this.phoneNumber))){
          Toast.fail('请填写正确格式联系电话')
          return
        }

        let requestData = {
          companyFullName: this.inputVal
          taxCode: this.taxNumber
          contactPhone: this.phoneNumber
          securityCode:this.phoneCode
        }
        RepeatCompany(requestData,res=>{
          if (res.data == 1){
            Dialog.confirm({
              title: '提示',
              message: '该联系方式已经发起过请求，确认再次发起请求?',
            })
              .then(() => {
                this.active = activeValue
                this.setData({
                  active:activeValue
                })
                this.selectBuzhou = this.active + 1
                this.selectTitle = this.selectBuzhou
                let data = {}
                getMateriel(data, res => {
                  let that = this
                  if(res.statusCode === 200) {
                    that.merchandiseList = res.data.baseMatklList
                    that.merchandiseList.forEach((item) => { item.buttonStatus = 0})
                    this.setData({
                      merchandiseList: this.merchandiseList
                    })
                  }
                })
              })
              .catch(() => {
                // on cancel
              });
          }else if (res.data == -1 ) {
            Dialog.alert({
              title: '提示',
              message: '该商家已有申请被受理，不能发起此次申请',
            }).then(() => {
              // on close
            });
          }else if (res.data == 'errorSecurityCode' ) {
            Dialog.alert({
              title: '提示',
              message: '验证码错误',
            }).then(() => {
              // on close
            });
          } else {
              let data = {}
              getMateriel(data, res => {
                let that = this
                if(res.statusCode === 200) {
                  that.merchandiseList = res.data.baseMatklList
                  that.merchandiseList.forEach((item) => { item.buttonStatus = 0})
                  this.setData({
                    merchandiseList: this.merchandiseList
                  })
                }
              })
              this.active = activeValue
              this.selectBuzhou = this.active + 1
              this.selectTitle = this.selectBuzhou
              this.setData({
                active: this.active,
                selectBuzhou:this.selectBuzhou,
                selectTitle:this.selectTitle
              })
          }
        })
      } else if(activeValue == 2) {
        if (this.list.length ===0) {
          Toast.fail('请添加合作机构')
          return
        } 
        if (!this.usableMoney) {
          Toast.fail('请输入可用资金')
          return
        }
        if (!this.radio1) {
          Toast.fail('请选择是否有网络')
          return
        }

        let filterList = ''
        this.list.forEach(item=>{
          filterList += (item.productionName + '-' + item.production  + '-' +  item.currentSelectTripTypeId + '-' +  item.saleNum + ',')
        })
        let data = {
          r_companyFullName: this.inputVal, //公司名称
          r_taxCode: this.taxNumber, //税号
          r_companyType: this.radio, // 公司类型
          r_staffNumber: this.workerNumber, // 员工数量
          r_contactName: this.container, //联系人姓名
          r_province:this.provinceId ,
          r_city: this.cityId,
          r_county: this.districtId,
          r_towns:this.townId,
          r_detailedAddress: this.detailAdress, //详细地址
          r_availableCapital: this.usableMoney, //可用资金
          r_haveSellingNetwork: this.radio1, //是否有网络
          r_custinfoDetails: filterList, //营销模式 金额 合作产品
          r_contactPhone: this.phoneNumber //联系人电话
        }
        submitApplications(data, res => {
          if(res.data.code == 'success') {
            let conctatBefor = res.data.data.contact
            // Toast.success(res.data.msg)
            this.active = activeValue
            this.selectBuzhou1 = this.active + 1
            this.selectTitle1 = this.selectBuzhou
            this.conctatBefor = conctatBefor
            this.setData({
              active : activeValue,
              conctatBefor:conctatBefor
            })
            this.$apply()
            const custId = res.data.data.custId
            this. custId = res.data.data.custId
            this.methods.getCode(custId)
          } else {
              Toast.fail(res.data.msg)
              setTimeout(function (){
                wx.navigateTo({
                  url: '/pages/dms/intentionMerchants/index'　　// 页面 A
                })
              }, 2000);
          }
        })
      } else {
        this.active = activeValue
        this.selectBuzhou1 = this.active + 1
        this.selectTitle1 = this.selectBuzhou
      }
    },
    closeNow(){
      this.showNext=false
      this.showshow = false
      this.active = 1
      this.selectBuzhou = this.active + 1
      this.selectTitle = this.selectBuzhou
      let data = {}
      getMateriel(data, res => {
        let that = this
        if(res.statusCode === 200) {
          that.merchandiseList = res.data.baseMatklList
          that.merchandiseList.forEach((item) => { item.buttonStatus = 0})
          this.setData({
            merchandiseList: this.merchandiseList
          })
        }
      })

      this.setData({
        showshow:false
      })
    },
    // 绘制图片
  drawCanvasImg(){
    var that = this
    var myCanvasWidth = 200  //为了让图片满铺页面
    var myCanvasHeight = 200
    let context = wx.createCanvasContext('myQrcode');
    wx.getSystemInfo({
      success: function (res) {
        base64src(that.qrcodePath, res => {
          context.drawImage(res, 0, 0, 200, 200); //画布绘制图片
          context.draw();
        });
      },
    })
  },
  save: ()=> { //保存图片
    wx.showLoading({
      title: '保存中...',
    });
    wx.canvasToTempFilePath({
      canvasId: 'myQrcode',
      fileType: 'png',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.hideLoading();
            wx.showToast({
              title: '保存成功',
            });
          },
          fail(err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied"
              || err.errMsg === "saveImageToPhotosAlbum:fail auth deny"
              || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success: (res) {
                  wx.openSetting({
                    success(settingdata) {
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        // console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                      }else {
                        // console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                      }
                    },
                    fail: (res) => {
                      // console.log('openSetting_res', res);
                    }
                  })
                }
              })
            }
            wx.hideLoading()
          },
        })
      }
    })
  },

  // 二维码
   getCode(Qcode){
    let qrcode = new QRCode('myQrcode', {
        text: `${baseUrl}/IntentionCust/interestedMerchants.nd?id=${Qcode} `,
        width:this.createRpx2px (200),
        height: this.createRpx2px (200),
        padding:12,
        colorDark: "#000000",
        colorLight: "#ffffff",
        // correctLevel: QRCode.CorrectLevel.H,
      })
      this.qrcodePath = qrcode._htOption.tetx
      this. drawCanvasImg ()
   },


    createRpx2px(rpx) {
      return wx.getSystemInfoSync().windowWidth / 750 * rpx
    },

      gotoH5(){
      var id = this.custId
      var conctatBefor = this.conctatBefor
      wx.navigateTo({
          url: './../intentionh5/index?id='+id,
      })

    }
  }

}
