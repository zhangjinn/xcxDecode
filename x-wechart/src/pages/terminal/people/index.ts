import wepy from 'wepy'
import { connect } from 'wepy-redux'
import { getStoryPersons } from '@/store/actions/record'

@connect({
  storyPersons({ record }) {
    return record.storyPersons
  }
}, {
  getStoryPersons
})
export default class WebViewPage extends wepy.page {

  config = {
    navigationBarTitleText: '责任人搜索',
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
    showSing: false,
    name: '',
    selName: '',
    selCode: '',
    notFoundCheck: '',
    selProblemIndex: '',
    storeCode:''
  }

  methods = {
    onDescriptionChange(event) {
      this.name = event.detail
    },
    selPeople: (item) => {
      this.selName = item.userName
      this.selCode = item.account
      this.name = item.userName
    },
    onChange: (event) => {
      this.notFoundCheck = event.detail
    },
    searchPeople: () => {
      this.methods.getStoryPersons({ cust: this.name })//todo businessFlag:1
    },
    submit: () => {
      let name = this.selName
      let selCode = this.selCode
      if (!name && this.notFoundCheck) {
        name = this.name
        selCode = ''
      }
      if (name) {
        var pages = getCurrentPages()
        var prevPage = pages[pages.length - 2]
        if (this.selProblemIndex > -1) {
          const stibBean = prevPage.data.stibBean
          stibBean[this.selProblemIndex].responsible = name
          prevPage.setData({
            stibBean
          })
        } else {
          const duty = prevPage.data.duty
          duty.dutyUserCode = selCode
          duty.dutyUserName = name
          prevPage.setData({
            duty
          })
        }
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: '请选择或输入责任人！',
          icon: 'none'
        })
      }
    }
  }

  onLoad(options) {
    this.storeCode = options.storeCode
    this.methods.getStoryPersons()//businessFlag:1,传1时为业务员
    this.selProblemIndex = options.selProblemIndex
  }
}
