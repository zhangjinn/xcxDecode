import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { trim, head } from 'ramda';
import { Weapp } from 'definitions/weapp';
import {setStorage, getCookie, formatMobile, removeStorage} from '@/utils/index';
import { request } from '@/utils/request';
import { checkPhone } from '@/utils/validators';
import Toast from '@/components/vant/toast/toast';
import CommonMixin from '@/mixins/common';
import { userLogin, userPermissions, getAlert } from '@/store/actions/user';

const { baseUrl } = wepy.$appConfig;

interface Data {
  passwordVisible: boolean;
  toggleAccount: any[];
  accounts: any[];
  account: any;
  confirmTel: string;
  confirmTelCode: string;
  mobile: string;
  password: string;
  code: string;
  codeSrc: string;
  isNeedImgCode: boolean;
  secondLogin: boolean;
  smscode: string
}

@connect({}, {
  userLogin,
  userPermissions,
  getAlert,
})
export default class AccountLogin extends wepy.page {
  config = {
    navigationBarTitleText: '登录',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-button': '../../../components/vant/button/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-collapse': '../../../components/vant/collapse/index',
      'van-collapse-item': '../../../components/vant/collapse-item/index',
      'van-dialog': '../../../components/vant/dialog/index',
      'van-field': '../../../components/vant/field/index',
      'van-toast': '../../../components/vant/toast/index',
    },
  };
  mixins = [CommonMixin];
  times = 0;
  data: Data = {
    passwordVisible: false,
    confirmTel: '',
    confirmTelCode: '',
    mobile: '',
    password: '',
    code: '',
    account: {},
    accounts: [],
    toggleAccount: ['account'],
    // codeSrc: `${baseUrl}/checkImg.nd`,
    codeSrc: '',
    isNeedImgCode: false,
    secondLogin: false,
    smscode: ''
  };
  methods = {
    togglePwd() {
      this.passwordVisible = !this.passwordVisible;
    },
    onConfirmTelChange(event: Weapp.Event) {
      this.confirmTelCode = trim(event.detail);
    },
    clearConfirmTel() {
      this.confirmTelCode = '';
    },
    onPhoneChange(event: Weapp.Event) {
      this.mobile = trim(event.detail);
    },
    clearMobile() {
      this.mobile = '';
    },
    onPasswordChange(event: Weapp.Event) {
      this.password = trim(event.detail);
    },
    clearPassword() {
      this.password = '';
    },
    onCodeChange(event: Weapp.Event) {
      this.code = trim(event.detail);
    },
    clearCode() {
      this.code = '';
    },
    getCodeImg(t: any) {
      // t.codeSrc = `${baseUrl}/checkImg.nd?_=${Date.now()}&JSESSIONID=${t.smscode}`;
      // t.codeSrc = `${baseUrl}/checkImg2.nd`;
      if (!t.$parent) {
        t = this
      }
      let jesssionid = 'JSESSIONID=' + t.$parent.globalData.sessionId
      request({
        // api: `checkImg2.nd?_=${Date.now()}&JSESSIONID=${t.$parent.globalData.sessionId}`,
        api: `checkImg2.nd`,
        header: {
          Cookie: jesssionid
        },
        callback: (res) => {
          t.codeSrc = `${res.data.img}`
          t.$apply()
        }
      })
    },
    forgetPassword() {
      wx.navigateTo({
        url: '/pages/auth/forget/index',
      });
    },
    // mobile 值改变时触发
    onMobileBlur(event: Weapp.Event) {
      const { value } = event.detail;
      const mobile = trim(value);
      if (mobile && checkPhone(mobile)) {
        request({
          api: 'queryAccountByPhone.nd',
          data: { phone: mobile },
          callback: (res) => {
            const { status, list } = res.data;
            if (status === 'true' && list.length > 0) {
              this.accounts = list;
              this.account = head(list);
            } else {
              this.accounts = [];
              this.account = {};
            }
            this.$apply();
          },
        });
      } else {
        this.accounts = [];
        this.account = {};
      }
    },
    // 选择账号 /checkImg.nd
    chooseAccount(item: any) {
      this.account = item;
    },
    onChange(event: Weapp.Event) {
      this.toggleAccount = event.detail
    },
    confirmTel() {
      if (this.confirmTelCode) {
        const { account } = this.account;
        const { unionid,openid } = this.$parent.globalData;
        const params = {
          userName: account || this.mobile,
          password: this.password,
          unionid,
          openid,
          msgType: 1,
          msgCode: this.confirmTelCode,
        };
        this.userLogin(params);
        this.secondLogin = false;
      } else {
        Toast('短信验证码不能为空');
      }
    },
    confirmTelCancel() {
      this.secondLogin = false;
    },
    // 登录
    submit() {
      const { account } = this.account;
      const { unionid, openid } = this.$parent.globalData;
      const params = {
        userName: account || this.mobile,
        password: this.password,
        unionid,
        openid,
      };
      if (this.isNeedImgCode) {
        params.imgCode = this.code;
      }
      this.userLogin(params);

    },
  };
  userLogin(params: any) {
    Toast.loading({ forbidClick: true, message: '登录中...', duration: 0 });
    this.methods.userLogin(params, (res: any) => {
      const { header } = res;
      const cookie = header['Set-Cookie'] || header['set-cookie'];
      const token = getCookie('JSESSIONID', cookie);
      this.$parent.globalData.modifySession = token;
      Toast.clear();
    }).then((result: any) => {
      const { sessionid, ssoLoginToken, msg, code, customer, account, fxPartInfo, zyPartInfo, basePartInfo } = result.payload;
      const { openid } = params
      if (sessionid) {
        this.smscode = sessionid
        // this.methods.getCodeImg(this);
      }
      switch (code) {
        case 0:
          this.loginSuccess(sessionid, ssoLoginToken, params.unionid, account.account, account, customer.cisCode, fxPartInfo, zyPartInfo, account.loginSystem, customer.customerCode, customer, openid, account.allFenXiao, account.marketModels, basePartInfo);
          break;
        case 1001:  // 需要完善用户信息
          this.$parent.globalData.sessionId = sessionid;
          wx.navigateTo({ url: '/pages/auth/protocol/index' });
          break;
        case 1002: // 二次认证
          this.secondLogin = true;
          this.confirmTel = formatMobile(account.mobile);
          this.$apply();
          break;
        case 1004:
          Toast.fail({
            forbidClick: true,
            duration: 2000,
            message: msg || '登录失败',
          });
          this.isNeedImgCode = true;
          this.smscode = sessionid
          this.$apply();
          if (sessionid) {
            this.$parent.globalData.modifySession = sessionid;
            this.checkCodeCount();
          }
          this.methods.getCodeImg(this);
          break;
        default:
          Toast.fail({
            forbidClick: true,
            duration: 2000,
            message: msg || '登录失败',
          });
          if (sessionid) {
            this.$parent.globalData.modifySession = sessionid;
            this.checkCodeCount();
          }
          break;
      }
    });
  }
  checkCodeCount() {
    request({
      api: 'checkAccount.nd',
    });
  }
  async handleUserToken({ sessionid = '', ssoLoginToken = '', unionid, account, accountInfo, cisCode,fxPartInfo,zyPartInfo,loginSystem,customerCode,customer,openid,allFenXiao,marketModels,basePartInfo}: any) {
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
    this.$parent.globalData.allFenXiao = allFenXiao;
    this.$parent.globalData.marketModels = marketModels
    this.$parent.globalData.basePartInfo = basePartInfo
    this.$parent.getDesignConfig();
    await removeStorage('b2b_token')
    await setStorage('b2b_token', JSON.stringify({ sessionid, ssoLoginToken, unionid, account, accountInfo, cisCode,fxPartInfo, zyPartInfo,loginSystem,customerCode, customer, openid,allFenXiao,marketModels,basePartInfo}));
    this.methods.userPermissions()
    this.methods.getAlert()
  }
  loginSuccess(sessionid: string, ssoLoginToken: string, unionid: string, account: string, accountInfo: any, cisCode: any, fxPartInfo: any,zyPartInfo: any, loginSystem: any,customerCode: any, customer: any, openid: string, allFenXiao: boolean, marketModels:any,basePartInfo: any ) {
    this.handleUserToken({
      sessionid,
      ssoLoginToken,
      unionid,
      account,
      accountInfo,
      cisCode,
      fxPartInfo,
      zyPartInfo,
      loginSystem,
      customerCode,
      customer,
      openid,
      allFenXiao,
      marketModels,
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
          delta: 2,
        });
      },
    });
  }
}
