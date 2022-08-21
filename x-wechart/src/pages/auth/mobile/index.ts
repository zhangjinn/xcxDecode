import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { trim, head, subtract } from 'ramda';
import { Weapp } from 'definitions/weapp';
import { setStorage, getCookie, formatMobile } from '@/utils/index';
import { request } from '@/utils/request';
import { checkPhone } from '@/utils/validators';
import Toast from '@/components/vant/toast/toast';

import { userLogin, userPermissions, getAlert } from '@/store/actions/user';
const { baseUrl } = wepy.$appConfig;

interface Data {
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
  timer: number;
}

@connect({}, {
  userLogin,
  userPermissions,
  getAlert,
})
export default class MobileLogin extends wepy.page {
  config = {
    navigationBarTitleText: '登录',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-button': '../../../components/vant/button/index',
      'van-collapse': '../../../components/vant/collapse/index',
      'van-collapse-item': '../../../components/vant/collapse-item/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-dialog': '../../../components/vant/dialog/index',
      'van-field': '../../../components/vant/field/index',
      'van-toast': '../../../components/vant/toast/index',
    },
  };
  times = 0;
  data: Data = {
    confirmTel: '',
    confirmTelCode: '',
    mobile: '',
    password: '',
    code: '',
    account: {},
    accounts: [],
    toggleAccount: [],
    codeSrc: `${baseUrl}/checkImg.nd`,
    isNeedImgCode: false,
    secondLogin: false,
    timer: 60,
  };
  methods = {
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
    getCodeImg() {
      this.codeSrc = `${baseUrl}/checkImg.nd?_=${Date.now()}`;
    },
    getSmsCode() {
      const mobile = this.mobile;
      const { account } = this.account;
      if (account) {
        if (this.timer === 60) {
          if (mobile && checkPhone(mobile)) {
            Toast.loading({ forbidClick: true, message: '验证码发送中...', duration: 0 });
            request({
              api: 'getMsmByPhone.nd',
              method: 'POST',
              data: { account, phone: mobile, msgType: 2 },
              callback: (res: any) => {
                const { data: { status } } = res;
                if (status === 'true') {
                  Toast.success('短信发送成功');
                  this.startTimer();
                } else {
                  Toast.fail('短信发送失败');
                }
              },
            });
          } else {
            Toast('请输入正确的手机号');
          }
        }
      } else {
        Toast('请选择账号');
      }
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
        Toast('请输入正确的手机号码')
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
          msmType: 1,
          msmCode: this.confirmTelCode,
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
      const { unionid,openid } = this.$parent.globalData;
      const params = {
        userName: account,
        msgCode: this.code,
        msgType: 2,
        unionid,
        openid
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
      const { sessionid, ssoLoginToken, msg, code, customer, account,zyPartInfo,fxPartInfo,basePartInfo } = result.payload;
      const { openid } = params
      switch (code) {
        case 0:
          this.loginSuccess(sessionid, ssoLoginToken, params.unionid, account.account, account, customer.cisCode, fxPartInfo, zyPartInfo, account.loginSystem, customer.customerCode, customer,openid,basePartInfo);
          break;
        case 1001:
          wx.navigateTo({ url: '/pages/auth/protocol/index' });
          break;
        case 1002:
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
          this.methods.getCodeImg();
          this.$apply();
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
  handleUserToken({ sessionid = '', ssoLoginToken = '', unionid, account, accountInfo, cisCode,zyPartInfo,fxPartInfo,loginSystem,customerCode,customer,openid,basePartInfo }: any) {
    this.$parent.globalData.sessionId = sessionid;
    this.$parent.globalData.ssoLoginToken = ssoLoginToken;
    this.$parent.globalData.unionid = unionid;
    this.$parent.globalData.account = account;
    this.$parent.globalData.accountInfo = accountInfo;
    this.$parent.globalData.cisCode = cisCode;
    this.$parent.globalData.zyPartInfo = zyPartInfo;
    this.$parent.globalData.fxPartInfo = fxPartInfo;
    this.$parent.globalData.loginSystem = loginSystem;
    this.$parent.globalData.customerCode = customerCode;
    this.$parent.globalData.customer = customer;
    this.$parent.globalData.openid = openid;
    this.$parent.globalData.basePartInfo = basePartInfo;
    this.$parent.getDesignConfig();
    setStorage('b2b_token', JSON.stringify({ sessionid, ssoLoginToken, unionid,account,accountInfo,cisCode,zyPartInfo,fxPartInfo,loginSystem,customerCode,customer,openid,basePartInfo }));
    this.methods.userPermissions()
    this.methods.getAlert()
  }
  loginSuccess(sessionid: string, ssoLoginToken: string, unionid: string, account: string, accountInfo: any, cisCode: any,fxPartInfo:any, zyPartInfo: any,loginSystem: any, customerCode: any, customer:any, openid: string, basePartInfo:any) {
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
  startTimer() {
    this.timerEl = setInterval(() => {
      this.timer = subtract(this.timer, 1);
      if (this.timer === 0) {
        this.timer = 60;
        clearInterval(this.timerEl);
      }
      this.$apply();
    }, 1000);
  }

  onUnload() {
    if (this.timerEl) {
      clearInterval(this.timerEl);
    }
  }
}
