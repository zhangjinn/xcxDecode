
import { VantComponent } from '../vant/common/component'

VantComponent({
  props: {
    addHead: Boolean
  },
  methods: {
    gotoLogin: () => {
      wx.navigateTo({
        url: '/pages/auth/wechat/index'
      })
    },
    gotoHome: () => {
      wx.reLaunch({
        url: '/pages/main/home/index'
      })
    },
    goPage: () => {
      wx.reLaunch({
        url: '/pages/dms/intentionMerchants/index'
      })
    },
  }
})
