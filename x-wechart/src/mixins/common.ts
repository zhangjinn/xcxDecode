/**
 * 通用处理逻辑
 * 路由跳转: 是否登录
 */

import wepy from 'wepy';
import { isEmpty } from 'ramda';
import { removeStorage } from '@/utils/index';
import { getStore } from 'wepy-redux';

export default class CommonMixin extends wepy.mixin {
  data = {
    loginStatus: false,
    mixin: 'This is common data.',
    customTabBarAllHeight: 52,
  };
  isLogin() {
    return !isEmpty(this.$parent.globalData.sessionId);
  }
  navigator({ link, auth = true }) {
    if (auth) {
      if (this.$parent.globalData.sessionId) {
        wx.navigateTo({ ...link });
      } else {
        wx.reLaunch({
          url: '/pages/main/take/index',
        });
      }
    } else {
      wx.navigateTo({ ...link });
    }
  }
  async clearLoginInfo() {
    this.$parent.globalData.sessionId = ''
    this.$parent.globalData.ssoLoginToken = ''
    this.$parent.globalData.unionid = ''
    await removeStorage('b2b_token')
    await removeStorage('b2b_permission_list')
    await removeStorage('b2b_alert')
    getStore().dispatch({ type: 'USER_LOGOUT_ACTION'})
  }
  getCustomTabBarAllHeight(){
    const systemInfo = wx.getSystemInfoSync()
    // 微信小程序配置tabBar之后会遮挡重要内容，而且不同机型如iPhoneX下面可能有一块空白，比较坑的是页面最底部空白也会显示页面，因此需要获取被遮挡的高度
    const { screenHeight, safeArea: { bottom } } = systemInfo
    let oHeight = 52
    if (screenHeight && bottom){
      let safeBottom = screenHeight - bottom
      oHeight = 52 + safeBottom // 其中52是我们自定义tab栏的高度
    }
    return oHeight
  }
  methods = {

  };
  async onShow() {
    this.loginStatus = this.isLogin();
    this.customTabBarAllHeight = this.getCustomTabBarAllHeight()
    this.$apply()
  }
}
