import wepy from 'wepy';
import {connect, getStore} from 'wepy-redux';
import { request } from '@/utils/request';
import CommonMixin from '@/mixins/common';
import Toast from "@/components/vant/toast/toast";
import { USER_LOGIN_ACTION } from '@/store/types/user';
import { userLogin } from '@/store/actions/user';
import { setStorage } from '@/utils/index';

interface Data {
  imgObj: object;
  currentAccount: object,
  accountList: any[];
}
const store = getStore()
@connect({
  mixinCurrentUser({ user }) {
    return user.info || {}
  }
}, {
  userLogin,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-loading': '../../../components/vant/loading/index',
    },
  };
  data: Data = {
    imgObj: {
      'trainingClockLogo': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552864_7a568383337a4c8586df776a3fe48fcc.png',
    },
    currentAccount: {},
    accountList: [],
  };
  mixins = [ CommonMixin ];
  // 页面内交互写在methods里
  methods = {
    async changeAccount(accountOne) {
      if((this.currentAccount.account && this.currentAccount.account !== accountOne.account) || (!this.currentAccount.account && this.mixinCurrentUser.account !== accountOne.account)) {
        Toast.loading({ forbidClick: true, message: '切换账号中...', duration: 0 });
        const sessionKeyResult = await this.getSessionKey()
        if(!sessionKeyResult.flag) {
          Toast.fail(sessionKeyResult.message)
          return
        }
        const ivResult = await this.getUserInfo()
        if(!ivResult.flag) {
          Toast.fail(ivResult.message)
        }
        const result = await request({ api: 'ping.nd', method: 'POST', data: { ...sessionKeyResult.data, ...ivResult.data, userName: accountOne.account }})
        store.dispatch({ type: USER_LOGIN_ACTION, payload: result });
        const { sessionid, ssoLoginToken, msg, code, customer, account, zyPartInfo, fxPartInfo, basePartInfo} = result;
        const { openid } = sessionKeyResult.data
        Toast.clear()
        switch (code) {
          case 0:
            this.currentAccount = account
            this.loginSuccess({ sessionid, ssoLoginToken, account: account.account, accountInfo: account, cisCode: customer.cisCode,zyPartInfo,fxPartInfo,loginSystem:account.loginSystem,customerCode: customer.customerCode, customer, openid: openid, basePartInfo });
            break;
          case 1001:  // 需要完善用户信息
            wx.navigateTo({ url: '/pages/auth/protocol/index' });
            break;
          case 1002: // 二次认证
            // this.secondLogin = true;
            // this.confirmTel = formatMobile(account.mobile);
            // this.$apply();
            break;
          case 1004:
            Toast.fail({
              forbidClick: true,
              duration: 2000,
              message: msg || '切换失败',
            });
            // this.isNeedImgCode = true;
            // this.methods.getCodeImg();
            // this.$apply();
            break;
          default:
            Toast.fail({
              forbidClick: true,
              duration: 2000,
              message: msg || '切换失败',
            });
            break;
        }
        Toast.clear()
        this.$apply()
      }
    },
  };

  async loginSuccess({ sessionid = '', ssoLoginToken = '', account, accountInfo, cisCode,fxPartInfo,zyPartInfo,loginSystem, customerCode, customer, openid, basePartInfo }: any) {
    this.$parent.globalData.sessionId = sessionid;
    this.$parent.globalData.ssoLoginToken = ssoLoginToken;
    const unionid = this.$parent.globalData.unionid;
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
    await setStorage('b2b_token', JSON.stringify({ sessionid, ssoLoginToken, unionid, account, accountInfo, cisCode,zyPartInfo ,fxPartInfo,loginSystem,customerCode, customer, openid, basePartInfo}));
    Toast.success({
      message: `切换成功`,
      duration: 1000,
      onClose: () => {
        wx.navigateBack({
          delta: 1,
        });
      }
    })
  }

  getSessionKey() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (wxRes: any) => {
          if (wxRes.code) {
            request({
              api: `queryCodeInfo.nd?code=${wxRes.code}`,
              callback: (res: any) => {
                if (res.data && res.data.session_key && res.data.openid ) {
                  resolve({ flag: true, data: { sessionKey: res.data.session_key, openid: res.data.openid} })
                } else {
                  reject({ flag: false, message: 'code获取失败'})
                }
              },
            });
          } else {
            reject({ flag: false, message: '微信授权失败, 请同意授权'})
          }
        },
        fail: () => {
          reject({ flag: false, message: '微信授权失败, 请同意授权'})
        },
      });
    })
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: ({ iv, encryptedData, ...rest }) => {
          resolve({ flag: true, data: { iv, encryptedData } })
        },
        fail: () => {
          reject({ flag: false, message: '获取用户信息失败，请检查授权情况'})
        }
      })
    })
  }

  // 获取账号列表
  async getAccountList() {
    const result = await request({ api: 'queryAccountUnionid.nd'})
    if(result && result.list){
      this.accountList = result.list
    }
    this.$apply()
  }

  onShow() {
    if(this.loginStatus){
      const { userName, account } = this.mixinCurrentUser
      this.currentAccount = { name: userName, account: account, ...this.mixinCurrentUser }
      this.getAccountList()
    }
  }

}
