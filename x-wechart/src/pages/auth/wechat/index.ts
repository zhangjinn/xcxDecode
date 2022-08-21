import wepy from 'wepy';
import { connect } from 'wepy-redux';
import {removeStorage, setStorage} from '@/utils/index';
import { request } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import { unionIdLogin, userPermissions, getAlert } from '@/store/actions/user';
import CommonMixin from '@/mixins/common';

interface Data {
  isAuth: boolean;
  canIUse: boolean;
  sessionCode: string;
  openid: string;
}

@connect({}, {
  unionIdLogin,
  userPermissions,
  getAlert,
})
export default class Protocol extends wepy.page {
  config = {
    navigationBarTitleText: '',
    usingComponents: {
      'van-button': '../../../components/vant/button/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
    },
  };
  mixins = [CommonMixin];
  data: Data = {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isAuth: false,
    sessionCode: '',
    openid: '',
  };
  async handleUserToken({ sessionid = '', ssoLoginToken = '', unionid, account, accountInfo, cisCode,fxPartInfo,zyPartInfo,loginSystem,customerCode,customer,openid,basePartInfo }: any) {
    this.$parent.globalData.sessionId = sessionid;
    this.$parent.globalData.ssoLoginToken = ssoLoginToken;
    this.$parent.globalData.unionid = unionid;
    this.$parent.globalData.account = account;
    this.$parent.globalData.accountInfo = accountInfo;
    this.$parent.globalData.cisCode = cisCode;
    this.$parent.globalData.fxPartInfo = fxPartInfo;
    this.$parent.globalData.zyPartInfo = zyPartInfo;
    this.$parent.globalData.loginSystem = loginSystem;
    this.$parent.globalData.customerCode = customerCode;
    this.$parent.globalData.customer = customer;
    this.$parent.globalData.openid = openid;
    this.$parent.globalData.basePartInfo = basePartInfo;
    this.$parent.getDesignConfig();
    await setStorage('b2b_token', JSON.stringify({ sessionid, ssoLoginToken, unionid, account, accountInfo, cisCode,fxPartInfo,zyPartInfo,loginSystem,customerCode, customer, openid, basePartInfo }));
    // 获取用户菜单按钮权限
    this.methods.userPermissions()
    this.methods.getAlert()
  }
  getSessionKey() {
    wx.login({
      success: (wxRes: any) => {
        if (wxRes.code) {
          request({
            api: `queryCodeInfo.nd?code=${wxRes.code}`,
            callback: (res: any) => {
              if (res.data && res.data.session_key && res.data.openid) {
                this.sessionCode = res.data.session_key;
                this.$parent.globalData.unionid = res.data.unionid,
                this.$parent.globalData.openid = res.data.openid,
                this.openid = res.data.openid,
                this.$apply();
              } else {
                Toast.fail('code 获取失败');
              }
            },
          });
        } else {
          Toast.fail('微信授权失败, 请同意授权');
        }
      },
      fail: () => {
        Toast.fail('微信授权失败, 请同意授权');
      },
    });
  }
  async userUnionIdLogin(params: any) {
    Toast.loading({ forbidClick: true, message: '授权中...', duration: 0 });
    this.methods.unionIdLogin(params, (res: any) => {
      Toast.clear();
      const { code, decryptResult, wxUser, sessionid, ssoLoginToken, account, customer,fxPartInfo,zyPartInfo, basePartInfo } = res.data;
      const { openid } =  params
      if (decryptResult === 'Y') {
        this.$parent.globalData.unionid = wxUser.unionId;
        this.$parent.globalData.openid = openid;
      }
      if (code == 0) {
        this.handleUserToken({
          sessionid,
          ssoLoginToken,
          unionid: wxUser.unionId,
          account: account.account,
          accountInfo: account,
          cisCode: customer.cisCode,
          zyPartInfo,
          fxPartInfo,
          loginSystem: account.loginSystem,
          customerCode: customer.customerCode,
          customer: customer,
          openid,
          basePartInfo,
        });
        Toast.success({
          forbidClick: true,
          duration: 2000,
          message: '登录成功',
          onClose: () => {
            let surveyInfo = wx.getStorageSync('survey_info')
            if(surveyInfo){ // 如果有值，要跳转至调研问卷作答页面
              wx.navigateTo({
                url: `/pages/me/webview/index`
              })
              return
            }
            wx.navigateBack({
              delta: 1,
            });
          },
        });

      } else {
        this.isAuth = true;
        this.$apply();
      }
    });
  }
  methods = {
    userAuth(evt: any) {
      const { errMsg, encryptedData, iv } = evt.detail;
      if (this.sessionCode) {
        if (errMsg === 'getUserInfo:ok') {
          this.userUnionIdLogin({ iv, encryptedData, sessionKey: this.sessionCode, openid: this.openid, code: '123' });
        } else {
          Toast('请同意获取用户信息');
        }
      }
    },
    chooseLoginType(type: string) {
      wx.navigateTo({
        url: `/pages/auth/${type}/index`,
      });
    },
  };
  onLoad() {
    this.getSessionKey();
  }
}
