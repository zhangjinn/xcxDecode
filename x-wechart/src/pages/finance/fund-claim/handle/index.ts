import wepy from 'wepy'
import { connect } from 'wepy-redux'
import { postFundClaimHandle, getFundClaimDetail } from '@/store/actions/fund-claim'
import { getFundClaimAgency, getFundClaimBussiness } from '@/store/actions/fund-claim'
import { baseUrl } from '@/utils/request'
import { forEach } from 'ramda'
import Toast from '@/components/vant/toast/toast'

interface Data {
  interval: any;
  postData: object;
  filterForm: object;
  baseUrl: string;
  distributorsPopup: boolean;
  // distributorsPopupName: string;
  popupName: string;
  // deliveryPopupName: string;
  info: Array<any>;
  filterIndex: Number;
  handleId: any;
  filter: object;
  number: any;
  FundClaimHandleList: object;
  detailList: object;
  infoPost: Array<any>;
  bussinessMan: object;
  handle_show: boolean;
}

export default class Fundrendetail extends wepy.page {
  config = {
    navigationBarTitleText: '认领处理',
    usingComponents: {
      'van-rate': '../../../../components/vant/rate/index',
      'van-icon': '../../../../components/vant/icon/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-picker': '../../../../components/vant/picker/index',
      'van-tab': '../../../../components/vant/tab/index',
      'van-tabs': '../../../../components/vant/tabs/index',
      'van-field': '../../../../components/vant/field/index',
      'van-loading': '../../../../components/vant/loading/index',
      'van-stepper': '../../../../components/vant/stepper/index',
      'van-cell-group': '../../../../components/vant/cell-group/index',
      'van-button': '../../../../components/vant/button/index',
      'van-uploader': '../../../../components/vant/uploader/index',
      'img': '../../../../components/img/index'
    }
  }
  data: Data = {
    handle_show: false,
    interval: '',
    bussinessMan: {
      orgCode: '',
      maktlName: '',
      matklCode: ''
    },
    postData: {
      method: 'getNoticeBill',
      params: {
        id: ''
      }
    },
    detailList: {},
    FundClaimHandleList: {
      method: 'genClaimBill',
      params: {
        header: {
          bizdate: '2020-10-09',
          noticebillid: '',
          hifi_registercom: '',
          e_remark: ''
        },
        entrys: [{
          hifi_agency: '',
          hifi_e_product: '',
          hifi_debeitrange: '',
          e_receivableamt: '',
          e_saleman: ''
          // e_remark:"qw"
        }]
      }
    },
    fileList: [],
    fileBlobList: [],
    handleId: '',
    info: [{ hifi_agency: '', hifi_e_product: '', hifi_debeitrange: '', e_receivableamt: '', e_saleman: '' }],
    infoPost: [{ hifi_agency: '', hifi_e_product: '', hifi_debeitrange: '', e_receivableamt: '', e_saleman: '' }],
    filter: {
      itemFxmap: [],
      suppliers: [],
      bussines: [],
      business_manager: []
    },
    filterIndex: 0,
    number: '',
    distributorsPopup: false,
    // distributorsPopupName: '全部',
    popupName: '',//物料弹出框名字
    // deliveryPopupName: '全部',
    filterForm: {
      _loading: true,
      pageNo: 1,
      orgId: '',
      fxId: '',
      trans: '',
      managerId: ''
    },
    baseUrl: baseUrl,
    subflag: false,
  }
  // 页面内交互写在methods里
  methods = {
    beforeRead:()=>{
      console.log('beforeRead')
      Toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration:20*1000
      });
      self.$apply();
    },
    afterRead: (event) => {
      const self = this
      var fileName = ''+parseInt(Math.random()*1000)+event.detail.name
      if(fileName.indexOf('.')<0){
        fileName = fileName+'.png'
      }
      var filePath = event.detail.file.path
      console.log('afterRead',filePath)
      wx.getFileSystemManager().readFile({
        filePath: filePath, //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success: res => { //成功的回调
          let base64 ='data:image/png;base64,' + res.data
          self.fileBlobList.push({ name: fileName, content: base64 })
          self.FundClaimHandleList.params.attachs = self.fileBlobList
          self.fileList.push(
            {
              url: filePath,
              name: fileName,
              deletable: true
            })
          console.log('jiekou:成功：',base64)
          self.$apply();
          Toast.clear()
          console.log()
        },
        fail: function (err) {
          console.log(err)
          console.log('jiekou:失败：')
          self.$apply();
          Toast.clear()
        }
      })

      //以下两行注释的是同步方法，不过我不太喜欢用。
      //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64')
      //console.log(base64)
      // wx.request({
      //   url: filePath,
      //   method: 'GET',
      //   responseType: 'arraybuffer',
      //   success: (res) => {
      //     console.log('jiekou:成功：',res)
      //     let base64 = wx.arrayBufferToBase64(res.data)
      //     self.fileBlobList.push({ name: fileName, url: base64 })
      //     this.FundClaimHandleList.params.attachs = self.fileBlobList
      //     self.fileList.push(
      //       {
      //         url: filePath,
      //         name: fileName,
      //         deletable: true
      //       })
      //     console.log('jiekou:成功：',base64)
      //     Toast.clear()
      //   },
      //   fail: function (err) {
      //     console.log(err)
      //     console.log('jiekou:失败：')
      //     Toast.clear()
      //   }
      // })
    },
    delImg: (event) => {
      this.fileBlobList.splice(event.detail.index,1)
      this.fileList.splice(event.detail.index,1)
      this.FundClaimHandleList.params.attachs = this.fileBlobList
    },
    setInputValue: (e: any) => {//金额赋值
      let obj = e.detail
      if (obj != '' && obj.substr(0, 1) == '.') {
        obj = ''
      }
      obj = obj.replace(/\.{2,}/g, '.') //只保留第一个. 清除多余的
      obj = obj.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')//只能输入两个小数
      if (obj.indexOf('.') < 0 && obj != '') {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        if (obj.substr(0, 1) == '0' && obj.length == 2) {
          obj = obj.substr(1, obj.length)
        }
      }
      let index = e.currentTarget.dataset.index //数组下标
      let tag = e.currentTarget.dataset.tag  //字段名称
      let info = this.info
      let infoPost = this.infoPost

      // info[index][tag] = parseFloat(obj)  //赋值
      info[index][tag] = obj //赋值
      // infoPost[index][tag] = parseFloat(obj)  //赋值
      infoPost[index][tag] = obj //赋值
      this.setData({
        info: info,
        infoPost: infoPost
      })
    },
    handleAdd: () => {//添加
      let info = this.info
      let infoPost = this.infoPost
      let detail = { hifi_agency: '', hifi_e_product: '', hifi_debeitrange: '', e_receivableamt: '', e_saleman: '' }
      let detail2 = { hifi_agency: '', hifi_e_product: '', hifi_debeitrange: '', e_receivableamt: '', e_saleman: '' }
      info.push(detail)
      infoPost.push(detail2)
      this.setData({
        info: info,
        infoPost: infoPost
      })
    },
    handleDel: (e: any) => {//删除
      let that = this
      let index = e.currentTarget.dataset.index
      let info = this.info
      let infoPost = this.infoPost
      let lengthA = 1

      let arrayLength = info.length
      if (arrayLength > lengthA) {
        info = that.data.info.splice(index, 1)
        infoPost = that.data.infoPost.splice(index, 1)
        // that.setData({
        //   details: info
        // })
      } else {
        wx.showToast({
          icon: 'none',
          title: '必须填写一项'
        })
      }
    },
    goPage: (url: any) => {
      this.navigator({ link: { url } })
    },
    //选择交易模式
    selectDelivery: (key: any, e: any) => {
      forEach((item: any) => {
        if (item.key == key) {
          // this.deliveryPopupName = item.value
          this.filterForm = { ...this.filterForm, trans: item.key }
          let index = this.filterIndex
          let tag = e.currentTarget.dataset.tag  //字段名称
          let info = this.info
          let infoPost = this.infoPost
          info[index][tag] = item.value
          infoPost[index][tag] = item.key
          this.setData({
            info: info,
            infoPost: infoPost
          })
        }
      }, this.filter.bussines)
      this.distributorsPopup = false
    },
    // 选择业务员
    onSelectManager(key: any, e: any) {
      forEach((item: any) => {
        if (item.key == key) {
          // this.deliveryPopupName = item.value
          this.filterForm = { ...this.filterForm, managerId: item.key }
          let index = this.filterIndex
          let tag = e.currentTarget.dataset.tag  //字段名称
          let info = this.info
          let infoPost = this.infoPost
          info[index][tag] = item.value
          infoPost[index][tag] = item.key
          this.setData({
            info: info,
            infoPost: infoPost
          })
        }
      }, this.filter.business_manager)
      this.distributorsPopup = false
    },
    selectagentPopup: () => {//隐藏物料弹出框
      this.distributorsPopup = false
    },
    //办事处选择
    onSelectDistributors: (key: any, e: any) => {

      forEach((item) => {
        if (item.key == key) {
          this.filterForm = { ...this.filterForm, fxId: item.key }
          let index = this.filterIndex
          let tag = e.currentTarget.dataset.tag  //字段名称
          let info = this.info
          let infoPost = this.infoPost
          info[index][tag] = item.value
          infoPost[index][tag] = item.key
          this.setData({
            info: info,
            infoPost: infoPost
          })
        }
      }, this.filter.itemFxmap)

      this.distributorsPopup = false
      this.bussinessMan.orgCode = this.filterForm.fxId
    },
    //物料组选择
    onSelectOrg: (key: any, e: any) => {
      this.filter.suppliers.forEach((item) => {
        if (item.key == key) {
          this.filterForm = { ...this.filterForm, orgId: item.key }
          let index = this.filterIndex
          let tag = e.currentTarget.dataset.tag
          let info = this.info
          let infoPost = this.infoPost
          info[index][tag] = item.value
          infoPost[index][tag] = item.key
          this.setData({
            info: info,
            infoPost: infoPost
          })
          this.bussinessMan.maktlName = item.value
          this.bussinessMan.matklCode = item.key
          this.methods.getBussiness()
        }
      })
      this.distributorsPopup = false
    },
    // 选择办事处、物料组、交易模式
    selectPopup: (name: any, e: any) => {
      let tag = e.currentTarget.dataset.tag
      let index = this.filterIndex = e.currentTarget.dataset.index
      let key = -1
      if (name == 'suppliers') {
        this.popupName = '办事处'
        for (let item1 of this.filter.itemFxmap) {
          if (item1.value == this.info[index][tag]) {
            key = item1.key
            break
          }
        }
        this.filterForm.fxId = key
      } else if (name == 'distributors') {
        this.popupName = '物料组'
        for (let item2 of this.filter.suppliers) {
          if (item2.value == this.info[index][tag]) {
            key = item2.key
            break
          }
        }
        this.filterForm.orgId = key
      } else if (name == 'delivery') {
        this.popupName = '信贷范围'
        for (let item3 of this.filter.bussines) {
          if (item3.value == this.info[index][tag]) {
            key = item3.key
            break
          }
        }
        this.filterForm.trans = key
      } else if (name == 'business_manager') {
        this.popupName = '业务员'
        for (let item4 of this.filter.business_manager) {
          if (item4.value == this.info[index][tag]) {
            key = item4.key
            break
          }
        }
        this.filterForm.managerId = key
      }
      this.distributorsPopup = !this.distributorsPopup
      this.$apply()
    },
    viewDetail: (e: any) => {//待定
      if (e) {
        wx.navigateTo({
          url: `/pages/me/distribution-order-detail/index?id=${e}`
        })
      }
    },
    // 提交按钮
    postHandleData() {
      let obj = this.infoPost[0]
      var isSuccess = false
      for (let item in obj) {
        if (!obj[item]) {
          wx.showToast({
            icon: 'none',
            title: '请完善数据'
          })
          return false
        } else {
          isSuccess = true
        }
      }
      if (isSuccess) {
        this.FundClaimHandleList.params.entrys = this.infoPost
        // console.log(JSON.stringify(this.FundClaimHandleList));
        this.methods.postHandle()
      }

    },
    // 发送数据方法
    postHandle: () => {
      let _this = this
      _this.subflag = true
      postFundClaimHandle(this.FundClaimHandleList, res => {
        if (res.data.success) {
          wx.showToast({
            icon: 'none',
            title: '提交成功',
            duration: 1500,
            success: function() {
              _this.interval = setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
            duration: 3000
          })
        }
        _this.subflag = false
      })
    },
    getDetailMethod: () => {
      const _this = this
      const toast = Toast.loading({
        forbidClick: true,
        message: '加载中'
      })
      getFundClaimDetail(this.postData, res => {
        if (res.data.success) {
          _this.detailList = res.data.data
          _this.handle_show = true
          _this.$apply()
          Toast.clear()
        }
      })
      this.filter.itemFxmap = []
      this.filter.suppliers = []
      this.filter.bussines = []
      getFundClaimAgency(this.postData, this.bussinessMan.orgCode, res => {
        console.log('res', res)
        // if(res.data.success){
        let agency_data = JSON.parse(res.data.orgData)
        for (let item of agency_data) {
          let obj = {}
          obj.key = item.orgCode
          obj.value = item.name
          _this.filter.itemFxmap.push(obj)
        }

        let maktl_data = JSON.parse(res.data.maktlData)
        for (let item of maktl_data) {
          let obj = {}
          obj.key = item.matklCode
          obj.value = item.matklName
          _this.filter.suppliers.push(obj)
        }
        let business_data = JSON.parse(res.data.baseData)
        for (let item of business_data) {
          let obj = {}
          obj.key = item.code
          obj.value = item.name
          _this.filter.bussines.push(obj)
        }
        _this.$apply()
        // }

      })
    },
    getBussiness: () => {
      const _this = this
      getFundClaimBussiness(this.bussinessMan, res => {
        console.log(res)
        let business_manager = res.data
        for (let item of business_manager) {
          let obj = {}
          obj.key = item.personCode
          obj.value = item.personName
          _this.filter.business_manager.push(obj)
        }
        _this.$apply()
      })
    }
  }

  onLoad(e: any) {
    console.log(e)
    this.postData.params.id = e.id
    this.FundClaimHandleList.params.header.noticebillid = e.id
    this.FundClaimHandleList.params.header.hifi_registercom = e.salenum
    this.bussinessMan.orgCode = e.salenum
    this.FundClaimHandleList.params.header.e_remark = '收' + e.name + '贷款'
    this.$apply()
  }

  onShow() {
    clearTimeout(this.data.interval)
    this.methods.getDetailMethod()
  }
}
