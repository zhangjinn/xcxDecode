import wepy from 'wepy'
import { connect } from 'wepy-redux'
import { custSophDeletage, findNoPassList, getStoryPersons, saveStoreProComplaint } from '@/store/actions/record'

@connect({
  adminAccount({ record }) {
    return record.adminAccount
  }
}, {
  findNoPassList,
  saveStoreProComplaint,
  custSophDeletage,
  getStoryPersons
})
export default class WebViewPage extends wepy.page {

  config = {
    navigationBarTitleText: '问题转办',
    navigationBarBackgroundColor: '#00aaa7',
    navigationBarTextStyle: 'white',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-field': '../../../components/vant/field/index',
      'van-button': '../../../components/vant/button/index',
      'van-action-sheet': '../../../components/vant/action-sheet/index',
      'van-dialog': '../../../components/vant/dialog/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-uploader': '../../../components/vant/uploader/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-checkbox': '../../../components/vant/checkbox/index'
    }
  }
  data = {
    imgObj: {
      'pointPass': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993518758_3eacfdc1c5064a02b97d30ee91ceb680.png',
      'pointUnpass': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529826_e5716a140bad48a095da690b9b3709fd.png',
    },
    optionsTemp: {},
    showSing: false,
    name: '',
    detail: {},
    problemTypeListVisible: false,
    proType: '',
    proContent: '',
    problemTypeList: [
      { value: '人员', text: '人员' },
      { value: '货源', text: '货源' },
      { value: '产品', text: '产品' },
      { value: '资源', text: '资源' },
      { value: '渠道', text: '渠道' },
      { value: '促销推广', text: '促销推广' },
      { value: '其他', text: '其他' }
    ],
    duty: {
      dutyUserCode: '',
      dutyUserName: ''
    }
  }

  methods = {
    //跳转责任人
    gotoPeople: (index) => {
      wx.navigateTo({ url: '/pages/terminal/people/index?storeCode=' + this.detail.storeCode + '&selProblemIndex=-1' })
    },
    // 打开弹框
    openTypeList: () => {
      this.problemTypeListVisible = true
    },
    // 关闭弹框
    onCloseTypeList: (dateType) => {
      this.problemTypeListVisible = false
    },
    onDescriptionChange(event) {
      this.proContent = event.detail
    },
    //选择问题类型（确认）
    onSelProblemType: (item) => {
      this.proType = item.value
      this.methods.onCloseTypeList()
    },
    back:()=>{
      wx.navigateBack({
        delta: 2
      })
    },
    submit: () => {
      if (!this.proType) {
        wx.showToast({
          title: '请选择问题分类！',
          icon: 'none'
        })
        return
      }
      if (!this.duty.dutyUserName) {
        wx.showToast({
          title: '请选择责任人！',
          icon: 'none'
        })
        return
      }
      const data = {
        'resultId': this.optionsTemp.id,
        'proType': this.proType,
        'proContent': this.proContent,
        'dutyUserCode': this.duty.dutyUserCode||'none',
        'dutyUserName': this.duty.dutyUserName
      }
      wx.showLoading()
      this.methods.saveStoreProComplaint(data).then(res => {
        if (res.payload.returnCode == 100) {
          const data = {
            ctsId:this.optionsTemp.id,
            account:this.duty.dutyUserCode||'none',
            shopId:this.detail.storeCode,
          }
          // 发送通知
          this.methods.custSophDeletage(data).then(res=>{
            wx.showToast({
              title: '提交成功！',
              icon: 'none'
            })
            var pages = getCurrentPages()
            // var currPage = pages[pages.length - 1];   //当前页面
            var prevPage = pages[pages.length - 3]
            prevPage.data.optionsTemp.isCheck = true
            setTimeout(() => {
              wx.navigateBack({
                delta: 2
              })
            }, 1000)
            wx.hideLoading()
          })
        } else {
          wx.showToast({
            title: res.payload.returnMsg,
            icon: 'none'
          })
        }
      }).finally(() => {
        wx.hideLoading()
      })
    }
  }

  onLoad(options) {
    this.methods.getStoryPersons()//businessFlag:1,传1时为业务员
    this.optionsTemp = JSON.parse(JSON.stringify(options))
    this.methods.findNoPassList({ id: options.id }).then(res => {
      this.detail = res.payload.returnData
      this.detail.listStandard = this.detail.listStandard || []
      this.$apply()
    })
  }
}
