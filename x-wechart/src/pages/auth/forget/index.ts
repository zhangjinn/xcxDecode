import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { trim, head, subtract } from 'ramda';
import { Weapp } from 'definitions/weapp';
import { setStorage, getCookie } from '@/utils/index';
import { request } from '@/utils/request';
import { checkPhone } from '@/utils/validators';
import Toast from '@/components/vant/toast/toast';

import { userLogin } from '@/store/actions/user';

const { baseUrl } = wepy.$appConfig;

interface Data {
  canUse: string;
  mobile: string;
  name: string;
  code: string;
  codeSrc: string;
  timer: number;
  shopName: string;
  shopFull: string;
  shopContact: string;
}

@connect({}, {
  userLogin,
})
export default class ForgetPassword extends wepy.page {
  config = {
    navigationBarTitleText: '找回密码',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-button': '../../../components/vant/button/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-dialog': '../../../components/vant/dialog/index',
      'van-field': '../../../components/vant/field/index',
      'van-toast': '../../../components/vant/toast/index',
    },
  };
  times = 0;
  data: Data = {
    canUse: 'YES',
    mobile: '',
    name: '',
    code: '',
    codeSrc: `${baseUrl}/checkImg.nd`,
    timer: 60,
    shopName: '',
    shopFull: '',
    shopContact: '',
  };
  methods = {
    toggleType(type) {
      this.canUse = type
    },
    onMobileChange(event: Weapp.Event) {
      this.mobile = trim(event.detail);
    },
    clearMobile() {
      this.mobile = '';
    },
    onNameChange(event: Weapp.Event) {
      this.name = trim(event.detail);
    },
    clearName() {
      this.name = '';
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
      if (this.timer === 60) {
        if (!trim(this.name)) {
          Toast('请输入登录用户名');
          return;
        }
        if (mobile && checkPhone(mobile)) {
          Toast.loading({ forbidClick: true, message: '验证码发送中...', duration: 0 });
          request({
            api: 'getMsmByPhone.nd',
            method: 'POST',
            data: { account: this.name, phone: mobile, msgType: 4 },
            callback: (res: any) => {
              const { data: { status, msg } } = res;
              if (status === 'true') {
                Toast.success('短信发送成功');
                this.startTimer();
              } else {
                Toast.fail(msg || '短信发送失败');
              }
            },
          });
        } else {
          Toast('请输入正确的手机号');
        }
      }
    },
    // 原手机不可用
    onShopAccountChange(event: Weapp.Event) {
      this.shopName = trim(event.detail);
    },
    clearShopAccount() {
      this.shopName = '';
    },
    onShopFullChange(event: Weapp.Event) {
      this.shopFull = trim(event.detail);
    },
    clearShopFull() {
      this.shopFull = '';
    },
    onShopContactChange(event: Weapp.Event) {
      this.shopContact = trim(event.detail);
    },
    clearShopContact() {
      this.shopContact = '';
    },

    // 原手机可用
    submitTel() {
      if (!trim(this.name)) {
        Toast('请输入登录用户名');
        return;
      }
      if (!checkPhone(this.mobile)) {
        Toast('手机号不正确');
        return;
      }
      if (!trim(this.code)) {
        Toast('请输入短信验证码');
        return;
      }

      // 当前页面检验验证码
      const data = {
        account: this.name,
        msgCode: this.code
      }
      request({ api: 'checkMsgCode.nd', method: 'POST', data }).then((res: any) => {
        if (res && res.status == 'false' && res.code == 1) {
          Toast.fail({
            message: res.msg,
            duration: 1000,
          });
        } else if (res && res.code == 0) {
          wx.navigateTo({
            url: `/pages/auth/reset/index?name=${this.name}&mobile=${this.mobile}&code=${this.code}&type=mobile`,
          });
        }
      })
    },
    submitAccount() {
      if (!trim(this.shopName)) {
        Toast('请输入商家登陆用户名');
        return;
      }
      if (!trim(this.shopFull)) {
        Toast('请输入商家全称');
        return;
      }
      if (!trim(this.shopContact)) {
        Toast('请输入商家法人姓名');
        return;
      }
      Toast.loading({ forbidClick: true, message: '校验商家信息中...', duration: 0 });
      request({
        api: 'verifyQuestion.nd',
        method: 'POST',
        data: { custLoginName: this.shopName, custFullName: this.shopFull, custLegalPerson: this.shopContact },
        callback: (res: any) => {
          Toast.clear();
          const { data } = res;
          if (data === 'Error') {
            Toast.fail('商家信息不可用');
          } else {
            wx.navigateTo({
              url: `/pages/auth/reset/index?account=${this.shopName}&full=${this.shopFull}&person=${this.shopContact}&type=shop`,
            });
          }
        },
      });
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
      const { sessionid, msg, code, account } = result.payload;
      switch (code) {
        case 0:
          this.loginSuccess(sessionid);
          break;
        case 1001:
          wx.navigateTo({ url: '/pages/auth/protocol/index' });
          break;
        case 1002:
          this.secondLogin = true;
          this.confirmTel = account.mobile;
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
          break;
      }
    });
  }
  loginSuccess(sessionid: string) {
    if (sessionid) {
      this.$parent.globalData.sessionId = sessionid;
      setStorage('b2b_token', sessionid);
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
