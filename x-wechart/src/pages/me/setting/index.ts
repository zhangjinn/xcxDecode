import wepy from 'wepy';
import { getStore } from 'wepy-redux';
import { request } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import CommonMixin from '@/mixins/common';
import { modifyUrl } from '@/utils/index'

interface Data {
  bindAccountVisible: boolean;
}

const stores = getStore();

export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '设置',
    usingComponents: {
      'van-cell': '../../../components/vant/cell/index',
      'van-button': '../../../components/vant/button/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
    },
  };
  mixins = [ CommonMixin ];
  data = {
    bindAccountVisible: false,
  };

  // 页面内交互写在methods里
  methods = {
    async onUnbind() {
      const result = await request({ api: '/unBind.nd', method: 'POST' })
      if(result.code === 0) {
        await this.clearLoginInfo()
        Toast.success({
          message: '解绑账号成功',
          onClose: () => {
            wx.switchTab({ url: '/pages/main/me/index' })
          },
        })
        return
      }
      Toast.fail(result.msg)
    },
    async logout() {
      const result = await request({ api: '/logout.nd', method: 'POST' })
      if(result.code === 0) {
        await this.clearLoginInfo()
        Toast.success({
          message: '退出登录成功',
          onClose: ()=> {
            wx.switchTab({ url: '/pages/main/me/index' })
          },
        })
        return
      }
      Toast.fail(result.msg)
    },
    toggleBindAccount() {
      this.bindAccountVisible = !this.bindAccountVisible
    },
    chooseLoginType(type: string) {
      wx.navigateTo({
        url: `/pages/me/bind-account/${type}/index`,
      });
    },
    // 跳转到隐私政策
    goPrivacyPolicy(){
      let url = `${wepy.$appConfig.baseUrl}/privacy`
      url = modifyUrl(url)
      const urlStr = encodeURIComponent(url);
      wx.navigateTo({ url: `/pages/me/webview/index?url=${urlStr}` });
    },
    // 账户注销
    accountCancellation(){
      wx.navigateTo({
        url: `/pages/me/account-cancellation/cancellation-application/index`,
      });
    }
  };
}
