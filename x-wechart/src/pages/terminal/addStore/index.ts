import wepy from 'wepy';
const qqmap = require('@/pages/terminal/utils/qqmap-wx-jssdk.min.js')
import Address from '@/components/address/index'
import {connect} from "wepy-redux";
import {checkTel} from '@/utils/index';
import Dialog from '@/components/vant/dialog/dialog';
import Toast from "@/components/vant/toast/toast";

import {
  uploadImg,
  getRegin,
  addStore,
  editStore,
  getApprovalComments,
} from '@/store/actions/record'
import {request} from "@/utils/request";

interface Data {
  isSinkShow: boolean;
  formData: object;
  latitude: any;
  longitude: any;
  qqmapsdk: any;
  scale: number;
  markers: any[];
  circle: any[];
  chooseAddressInfo: object;
  isSinkOptions: any[];
  steps: any[];
  active: string | number;
  approvalComments: string;
  isDisabled: boolean;
  pageType: any;
  currId: any;
  editId: any;
  isClickable: boolean
}
@connect({
  regins({ record }) {
    return record.regins
  }
}, {
  uploadImg,
  getRegin,
  addStore,
  editStore,
  getApprovalComments,
})
export default class Filter extends wepy.page {
  components = {
    address: Address
  }
  config = {
    navigationBarTitleText: '新增门店',
    usingComponents: {
      'van-toast': '/components/vant/toast/index',
      "van-field": "/components/vant/field/index",
      "van-cell": "/components/vant/cell/index",
      'van-uploader': '/components/vant/uploader/index',
      "van-icon": "/components/vant/icon/index",
      'van-popup': '/components/vant/popup/index',
      'van-dialog': '/components/vant/dialog/index',
    },
  };
  data: Data = {
    isClickable: true, // 提交是防止多次点击
    isSinkShow: false,
    formData:{
      storeName: '', // 门店名称
      storeAbbreviation: '', // 门店简称
      isSinkId: '0', // 是否下沉
      isSinkName: '否', // 是否下沉
      addressTip: '', // 所在地区
      address: '', // 详细地址
      managerName: '', // 门店经理姓名
      managerPhone: '', // 门店经理电话
      remark: '', // 备注
      doorHeadPhoto: [], // 门头照片
      businessLicensePhoto: [], // 营业执照照片
    },
    chooseAddressInfo: {
      provinceId: '', // 省
      provinceName: '',
      cityId: '', // 市
      cityName: '',
      areaId: '', // 区
      areaName: '',
      townId: '', // 乡｜镇
      townName: '',
    },
    latitude: 36.070476, // 默认纬度
    longitude: 120.371257, // 默认经度
    qqmapsdk: null,
    scale: 16,
    markers: [{
      id: '0',
      iconPath: 'http://3s-static.hisense.com/wechat/1/14722429883/1655865963285_a60bce54f9a147ba9e173f025974cf45.png', // weizhi.png
      longitude: 120.371257,
      latitude: 36.070476,
      width: 30,
      height: 30,
      anchor: {x: .5, y: .5}
    }],
    circle: [{
      id: '0',
      latitude: 120.371257,
      longitude: 36.070476,
      fillColor: '#B4F3F188',
      color: '#00B7B3',
      strokeWidth: '0.5',
      radius: 80
    }],
    isSinkOptions: [
      {id:'1', name: '是'},
      {id:'0', name: '否'},
    ],
    steps: [], // 流程图列表
    active: '0', // 流程图当前值
    approvalComments: '无', // 审批意见
    isDisabled: false, // 页面是否可编辑,默认可编辑; false可编辑，true不可编辑
    pageType: '', // 页面当前状态
    currId: '', // 当前详情id; 值是空则为新增,非空为查看详情
    editId: '', //修改门店时的传参id
  };

  // 页面内交互写在methods里
  methods = {
    onFilterFormChange(evt) {
      const { detail, currentTarget: { dataset: { name } } } = evt
      this.formData = {
        ...this.formData,
        [name]: detail,
      }
    },
    openSink(){
      if(this.isDisabled){
        return
      }
      this.isSinkShow = true
    },
    onSinkPopClose(){
      this.isSinkShow = false
    },
    chooseSink(item){
      this.formData.isSinkId = item.id
      this.formData.isSinkName = item.name
      this.isSinkShow = false
    },

    // 删除图片
    deleteImg(event){
      let { state } = event.currentTarget.dataset
      if (state == 1) { // 门店门头照片
        this.formData.doorHeadPhoto.splice(event.detail.index, 1)
      }
      if (state == 2) { // 门店营业执照
        this.formData.businessLicensePhoto.splice(event.detail.index, 1)
      }
      this.$apply()
    },

    //上传图片
    afterRead(event) {
      this.selImg(event.detail.file.path, event.currentTarget.dataset.state)
    },

    // 改变地图定位显示
    mapTap: (e) => {
      if(this.isDisabled){
        return
      }
      this.latitude = e.detail.latitude
      this.longitude = e.detail.longitude
      this.methods.mapChange()
    },
    mapChange: () => {
      const that = this
      let latitude = that.latitude
      let longitude = that.longitude
      const market = {
        id: Math.random(),
        latitude: latitude,
        longitude: longitude,
        iconPath: 'http://3s-static.hisense.com/wechat/1/14722429883/1655865963285_a60bce54f9a147ba9e173f025974cf45.png', // weizhi.png
        width: 30,
        height: 30,
        anchor: {x: .5, y: .5}
      }
      const circle = {
        id: Math.random(),
        latitude: latitude,
        longitude: longitude,
        fillColor: '#B4F3F188',
        color: '#00B7B3',
        strokeWidth: '0.5',
        radius: 80
      }
      this.markers = [market]
      this.circle = [circle]
      this.qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function(res) {
          that.formData.address = res.result.formatted_addresses && res.result.formatted_addresses.recommend
          that.$apply()
        },
        fail: function(res) {
          wx.showToast({
            title: '解析地址失败',
            icon: 'none'
          })
        }
      })
    },
    regionchange: ({ type }) => {
      if (type == 'end') {
        const market = this.markers[0]
        market.id = Math.random()
        const circle = this.circle[0]
        circle.id = Math.random()
        this.markers = [market]
        this.circle = [circle]
      }
    },

    // 获取省市区
    openAddress: () => {
      if(this.isDisabled){
        return
      }
      const provinceArr = this.regins
      this.$invoke('address', 'openAddressPopup', provinceArr, {
        'provinceId': this.chooseAddressInfo.provinceId,
        'cityId': this.chooseAddressInfo.cityId,
        'areaId': this.chooseAddressInfo.areaId
      }, (item: any, address: any) => {
        this.formData.addressTip = item.name
        this.chooseAddressInfo = { ...address }
        this.$apply()
      })
    },

    // 提交
    toAddStore: (type) => {
      if(!this.isClickable){
        return
      }
      this.isClickable = false
      let checkResault = this.methods.checkParam()
      if(checkResault){
        const { longitude, latitude } = this.data
        const { storeName, storeAbbreviation, isSinkId, address, managerName, managerPhone, remark, doorHeadPhoto, businessLicensePhoto } = this.data.formData
        const { provinceId, provinceName, cityId, cityName, areaId, areaName, townId, townName } = this.data.chooseAddressInfo
        const cisCode = wepy.$instance.globalData.cisCode

        let param = {
          cisCode: cisCode, // cis编码
          fullName: storeName, // 门店全称
          searchTerm: storeAbbreviation, // 门店简称
          isSinkShop: isSinkId, // 是否下沉门店1是0否
          longitude: longitude, // 经度
          latitude: latitude, // 纬度
          shAddress: address, // 详细地址
          provinceCode: provinceId, // 省编码
          provinceName: provinceName, // 省名字
          cityCode: cityId, // 市编码
          cityName: cityName, // 市名字
          countyCode: areaId, // 区县编码
          countyName: areaName, // 区县名字
          townCode: townId, // 乡镇编码
          townName: townName, // 乡镇名字
          managerName: managerName, // 门店经理名字
          managerTel: managerPhone, // 门店经理电话
          remark: remark, // 备注
          headFilesStr: doorHeadPhoto[0].id, // 门头照片附件ID
          bLFilesStr: businessLicensePhoto[0].id, // 营业执照附件ID
        }

        if(type == 'add'){ // 新增
          this.methods.addStore(param).then((res)=>{
            const { payload } = res
            if(payload.successful == '1'){ // 1成功0失败
              Toast.success({
                forbidClick: true,
                duration: 1000,
                message: '新增门店成功',
                onClose: () => {
                  this.isClickable = true
                  wx.navigateBack({
                    delta: 1,
                  });
                },
              });
            }else{
              Toast.fail({
                forbidClick: true,
                message: payload.message,
              })
              this.isClickable = true
            }

            this.$apply()
          })

        } else { // 修改
          param.id = this.editId
          this.methods.editStore(param).then((res)=>{
            const { payload } = res
            if(payload.successful == '1'){ // 1成功0失败
              Toast.success({
                forbidClick: true,
                duration: 1000,
                message: '修改门店成功',
                onClose: () => {
                  this.isClickable = true
                  wx.navigateBack({
                    delta: 1,
                  });
                },
              });
            }else{
              Toast.fail({
                forbidClick: true,
                message: payload.message,
              })
              this.isClickable = true
            }

            this.$apply()
          })
        }

      }else{
        this.isClickable = true
      }
    },
    checkParam: () => {
      const { storeName, storeAbbreviation, addressTip, address, managerName, managerPhone, remark, doorHeadPhoto, businessLicensePhoto } = this.data.formData
      if (!storeName) {
        Toast.fail('请填写门店名称')
        return false
      }
      if (!storeAbbreviation) {
        Toast.fail('请填写门店简称')
        return false
      }
      if (!addressTip) {
        Toast.fail('请选择所在地区')
        return false
      }
      if (!address) {
        Toast.fail('请填写详细地址')
        return false
      }
      if (!managerName) {
        Toast.fail('请填写门店经理姓名')
        return false
      }
      if (!managerPhone) {
        Toast.fail('请填写门店经理电话')
        return false
      }
      if (!checkTel(managerPhone)) {
        Toast.fail('请填写正确手机号或座机')
        return false
      }
      if (!remark) {
        Toast.fail('请填写备注')
        return false
      }
      if (!doorHeadPhoto.length) {
        Toast.fail('请上传门店门头照片')
        return false
      }
      if (!businessLicensePhoto.length) {
        Toast.fail('请上传门店营业执照')
        return false
      }
      return true
    },

    // 撤销
    toRevoke: () => {
      let that = this
      const { storeName } = this.data.formData

      Dialog.confirm({
        title: '撤销确认',
        message: `是否确认撤销新增${storeName}门店流程？`,
      })
        .then(() => {
          request({
            api: `custShop/cancelShopFlow.nd`,
            data: {
              processInstID: that.currId,
            },
            method: 'POST',
            type: 'application/json',
            callback: (res: any) => {
              const { data } = res
              if(data.message == 'success'){
                Toast.success({
                  forbidClick: true,
                  duration: 1000,
                  message: '撤销成功',
                  onClose: () => {
                    wx.navigateBack({
                      delta: 1,
                    });
                  },
                });
              }else{
                Toast.fail(data.message)
              }
              that.$apply()
            }
          })
        })
        .catch(() => {
          // on cancel
        });

    }

  };
  //选择照片
  selImg(path, state) {
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
          'fileType': 'addshop',
          'file': 'image/jpeg;base64,' + res.data
        }
        that.methods.uploadImg(data).then(res2 => {
          obj.url = res2.payload.url
          obj.id = res2.payload.businessId
          obj.name = res2.payload.fileNameString
          if (state == 1) { // 门店门头照片
            let doorHeadPhoto = that.formData.doorHeadPhoto
            doorHeadPhoto.push(obj)
            that.formData.doorHeadPhoto = doorHeadPhoto
          }
          if (state == 2) { // 门店营业执照
            let businessLicensePhoto = that.formData.businessLicensePhoto
            businessLicensePhoto.push(obj)
            that.formData.businessLicensePhoto = businessLicensePhoto
          }
          that.$apply()
        })
      }
    })
  }

  //获取当前位置
  getLocation() {
    let that = this
    wx.getLocation({ // 获取经纬度
      type: 'wgs84',
      success(res) {
        that.latitude = res.latitude
        that.longitude = res.longitude

        that.methods.mapChange()
        that.$apply()
      },
      fail(res) {
        console.log(res)
      }
    })
  }

  // 查询审批意见
  getApprovalCommentsData(){
    let param = {
      processInstID: this.currId,
      pageCond: {
        begin: 0,
        length: 10000,
        isCount: true
      }
    }
    this.methods.getApprovalComments(param).then((res)=>{
      const { payload } = res
      if(payload && payload.length>0){
        this.approvalComments = payload[payload.length-1].content
      }
      this.$apply()
    })
  }

  // 查询流程节点及状态
  getFlowChart(){
    request({
      api: `flow/queryProcessRoute.nd`,
      data: {
        processInstID: this.currId,
        processDefName: "com.hisense.bpm.flow.storeDataMaintain",
        condition: {
          "isFront": 1
        }
      },
      method: 'POST',
      type: 'application/json',
      callback: (res: any) => {
        const { data } = res
        let steps = []
        let active = 0
        if(data && data.length>0){
          data.forEach((item, index)=>{
            let obj = {}
            obj.text = item.activityName
            obj.type = item.activityType
            if(item.activityId == 'startActivity'){
              obj.icon = 'icon-process-begins'
              obj.isBorder = false
            }else if(item.activityId == 'finishActivity'){
              obj.icon = 'icon-process-end'
              obj.isBorder = false
            }else{
              obj.icon = 'icon-development-minister'
              obj.isBorder = true
            }
            if( item.isFinish && item.isFinish == '1'){
              active = index
            }
            steps.push(obj)
          })
        }
        this.steps = steps
        this.active = active
        this.$apply()
      }
    })
  }

  // 查询图片回显路径
  getPictureUrl(file){
    let photo = []
    if(file && file.attachPath && file.attachName && file.id){
      let url = wepy.$appConfig.baseUrl + '/comm/showUpload.nd?pathInfo=' + file.attachPath + '&fileName=' + file.attachName
      let photoObj = {
        id: file.id,
        name: file.attachShortName,
        url: url,
      }
      photo.push(photoObj)
    }
    return photo
  }

  // 获取订单详细信息
  getDetailsData(){
    Toast.loading({
      message: '正在加载',
      duration: 2000
    });
    request({
      api: `custShop/getMyShop.nd`,
      data: {
        processInstID: this.currId
      },
      method: 'POST',
      type: 'application/json',
      callback: (res: any) => {
        Toast.clear()
        const { data } = res
        if(data && data.data){
          this.orderDetail = data.data
          // 审批中，在自己这里--1 可提交、可撤回、可编辑
          // 审批中，不在自己这里--2 不可提交、可撤回、不可编辑
          // 详情--3 不可提交、不可撤回、不可编辑
          if(this.orderDetail.checkStatus == '发布' || this.orderDetail.checkStatus == '作废' ){
            this.pageType = '3'
            this.isDisabled = true
          }else if(this.orderDetail.checkStatus == '草稿'){
            this.pageType = '1'
            this.isDisabled = false
          }else{
            this.pageType = '2'
            this.isDisabled = true
          }

          let custAddShopReqDto = this.orderDetail.custAddShopReqDto
          this.editId = custAddShopReqDto.id

          this.latitude = custAddShopReqDto.latitude // 默认纬度
          this.longitude = custAddShopReqDto.longitude // 默认经度
          this.chooseAddressInfo = {
            ...this.chooseAddressInfo,
            provinceId: custAddShopReqDto.provinceCode,
            provinceName: custAddShopReqDto.provinceName,
            cityId: custAddShopReqDto.cityCode,
            cityName: custAddShopReqDto.cityName,
            areaId: custAddShopReqDto.countyCode,
            areaName: custAddShopReqDto.countyName,
            townId: custAddShopReqDto.townCode,
            townName: custAddShopReqDto.townName,
          }
          this.formData = {
            ...this.formData,
            storeName: custAddShopReqDto.fullName,
            storeAbbreviation: custAddShopReqDto.searchTerm,
            isSinkId: custAddShopReqDto.isSinkShop,
            isSinkName: custAddShopReqDto.isSinkShop == '0' ? '否' : '是',
            addressTip: `${this.chooseAddressInfo.provinceName}${this.chooseAddressInfo.cityName}${this.chooseAddressInfo.areaName}${this.chooseAddressInfo.townName}`,
            address: custAddShopReqDto.shAddress,
            managerName: custAddShopReqDto.managerName,
            managerPhone: custAddShopReqDto.managerTel,
            remark: custAddShopReqDto.remark,
            doorHeadPhoto: this.getPictureUrl(this.orderDetail.headFilesStr),
            businessLicensePhoto: this.getPictureUrl(this.orderDetail.blFilesStr),
          }

          this.methods.mapChange()
        }

        this.$apply()
      }
    })
  }

  onLoad({ id }) {
    this.currId = ''
    if(id){
      this.currId = id
    }

    this.methods.getRegin({ pCode: 0 })
    this.qqmapsdk = new qqmap({
      key: wepy.$appConfig.qqMapKey
    })
    if(this.currId){
      wx.setNavigationBarTitle({ //动态修改页面标题
        title: '新增门店详情'
      })
      this.getDetailsData()
      this.getFlowChart()
      this.getApprovalCommentsData()
    }else{
      wx.setNavigationBarTitle({ //动态修改页面标题
        title: '新增门店'
      })
      this.getLocation()
    }

  }
}
