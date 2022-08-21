import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { trim, head, subtract } from 'ramda';
import { Weapp } from 'definitions/weapp';
import { request } from '@/utils/request';
import { checkPhone, checkEmail, passwordValidate } from '@/utils/validators';
import Toast from '@/components/vant/toast/toast';

import { userLogin } from '@/store/actions/user';

interface Data {
  passwordVisible: boolean;
  repasswordVisible: boolean;
  password: string;
  rePassword: string;
  code: string;
  timer: number;
}

@connect({
  account({ user }) {
    return user.account;
  },
}, {
  userLogin,
})

export default class AccountConfirm extends wepy.page {
  config = {
    navigationBarTitleText: '登录',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-button': '../../../components/vant/button/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-collapse': '../../../components/vant/collapse/index',
      'van-collapse-item': '../../../components/vant/collapse-item/index',
      'van-radio': '../../../components/vant/radio/index',
      'van-radio-group': '../../../components/vant/radio-group/index',
      'van-field': '../../../components/vant/field/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
    },
  };
  timerEl = null;
  data: Data = {
    passwordVisible: false,
    repasswordVisible: false,
    password: '',
    rePassword: '',
    code: '',
    timer: 60,
  };
  methods = {
    togglePwd() {
      this.passwordVisible = !this.passwordVisible;
    },
    toggleRePwd() {
      this.repasswordVisible = !this.repasswordVisible;
    },
    // 用户名
    onNameChange(event: Weapp.Event) {
      this.account.userName = trim(event.detail);
    },
    clearName() {
      this.account.userName = '';
    },
    // 手机号
    onMobileChange(event: Weapp.Event) {
      this.account.mobile = trim(event.detail);
    },
    clearMobile() {
      this.mobile = '';
    },
    // 邮箱
    onEmailChange(event: Weapp.Event) {
      this.account.email = trim(event.detail);
    },
    clearEmail() {
      this.account.email = '';
    },
    // 验证码
    onCodeChange(event: Weapp.Event) {
      this.code = trim(event.detail);
    },
    clearCode() {
      this.code = '';
    },
    // 密码
    onPasswordChange(event: Weapp.Event) {
      this.password = trim(event.detail);
    },
    clearPassword() {
      this.password = '';
    },
    // 再次密码
    onRePasswordChange(event: Weapp.Event) {
      this.rePassword = trim(event.detail);
    },
    clearRePassword() {
      this.rePassword = '';
    },
    getSmsCode() {
      if(this.timerEl){
        return
      }
      const { account, mobile } = this.account;
      if (this.timer === 60) {
        if (mobile && checkPhone(mobile)) {
          Toast.loading({ forbidClick: true, message: '验证码发送中...', duration: 0 });
          request({
            api: 'getMsmByPhone.nd',
            method: 'POST',
            data: { account, phone: mobile, msgType: 3 },
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
    },
    // 选择账号 /checkImg.nd
    chooseAccount(item: any) {
      this.account = item;
    },
    onChange(event: Weapp.Event) {
      this.toggleAccount = event.detail
    },
    submit() {
      const { userName, email, mobile } = this.account;
      if (!userName) {
        Toast('联系人不能为空');
        return;
      }
      if (!mobile) {
        Toast('手机号不能为空');
        return;
      }
      if (!checkPhone(mobile)) {
        Toast('手机号不正确');
        return;
      }
      if (!this.code) {
        Toast('短信验证码不能为空');
        return;
      }
      if (!email) {
        Toast('邮箱不能为空');
        return;
      }
      if (!checkEmail(email)) {
        Toast('邮箱格式不正确');
        return;
      }
      if (!this.password) {
        Toast('密码不能为空');
        return;
      }
      const pwdMsg = passwordValidate(this.password);
      if (pwdMsg) {
        Toast(pwdMsg);
        return;
      }
      if (!this.rePassword) {
        Toast('确认密码不能为空');
        return;
      }
      const rePwdMsg = passwordValidate(this.rePassword);
      if (rePwdMsg) {
        Toast(rePwdMsg);
        return;
      }
      if (this.password !== this.rePassword) {
        Toast('两次密码不相等');
        return;
      }
      Toast.loading({ forbidClick: true, message: '修改中...', duration: 0 });
      request({
        api: 'activeEnterpriseUser/editEnterpriseUser.nd',
        method: 'POST',
        data: {
          name: userName,
          email,
          phone: mobile,
          validationCode: this.code,
          npassword: this.rePassword,
          password: this.password
        },
        callback: (res: any) => {
          const { data } = res;
          if (data && data === 'success') {
            Toast.success({
              message: '信息保存成功',
              duration: 2000,
              onClose: () => {
                wx.navigateBack({
                  delta: 2,
                });
              },
            });
          } else {
            Toast.fail(data || '信息修改失败');
          }
        },
      });
    },
    goBack() {
      wx.navigateBack({
        delta: 2,
      });
    },
  };
  startTimer() {
    this.timerEl = setInterval(() => {
      this.timer = subtract(this.timer, 1);
      if (this.timer === 0) {
        this.timer = 60;
        clearInterval(this.timerEl);
        this.timerEl = null
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
