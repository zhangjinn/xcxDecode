/*
 * @Auth: Turbo
 * @Email: 691209942@qq.com
 * @Date: 2019-09-25 22:22:06
 * @Description:
 */
import wepy from 'wepy';
import { trim } from 'ramda';
import { Weapp } from 'definitions/weapp';
import { request } from '@/utils/request';
import { passwordValidate } from '@/utils/validators';
import Toast from '@/components/vant/toast/toast';

interface Data {
  password: string;
  rePassword: string;
  passwordVisible: boolean;
  repasswordVisible: boolean;
}

export default class AccountReset extends wepy.page {
  config = {
    navigationBarTitleText: '重置密码',
    usingComponents: {
      'van-button': '../../../components/vant/button/index',
      'van-field': '../../../components/vant/field/index',
      'van-toast': '../../../components/vant/toast/index',
    },
  };
  times = 0;
  data: Data = {
    passwordVisible: false,
    repasswordVisible: false,
    password: '',
    rePassword: '',
  };
  methods = {
    togglePwd() {
      this.passwordVisible = !this.passwordVisible;
    },
    toggleRePwd() {
      this.repasswordVisible = !this.repasswordVisible;
    },
    onPasswordChange(event: Weapp.Event) {
      this.password = trim(event.detail);
    },
    clearPassword() {
      this.password = '';
    },
    onRePasswordChange(event: Weapp.Event) {
      this.rePassword = trim(event.detail);
    },
    clearRePassword() {
      this.rePassword = '';
    },
    // 登录
    submit() {
      if (!trim(this.password)) {
        Toast('请输入新密码');
        return;
      }
      const pwdMsg = passwordValidate(trim(this.password));
      if (pwdMsg) {
        Toast(pwdMsg);
        return;
      }
      if (!trim(this.rePassword)) {
        Toast('请确认新密码');
        return;
      }
      const rePwdMsg = passwordValidate(trim(this.rePassword));
      if (rePwdMsg) {
        Toast(rePwdMsg);
        return;
      }
      if (trim(this.rePassword) !== trim(this.password)) {
        Toast('两次密码不一致');
        return;
      }
      if (this.type === 'mobile') {
        const { name, code } = this.data;
        this.restPwd('resetPwdByPhone.nd', {
          msmCode: code,
          account: name,
          pwd: trim(this.password),
        });
      } else {
        const { account, full, person } = this.data;
        this.restPwd('modifyByQuestion.nd', {
          custLoginName: account,
          custFullName: full,
          custLegalPerson: person,
          password: trim(this.password),
        });
      }
    },
  };
  restPwd(api: string, data: any) {
    Toast.loading({ forbidClick: true, message: '处理中...', duration: 0 });
    request({
      api,
      data,
      method: 'POST',
      callback: (res) => {
        Toast.clear();
        const { status, msg } = res.data;
        if (status === 'false') {
          Toast.fail(msg || '密码重置失败');
        } else {
          Toast.success({
            forbidClick: true,
            duration: 2000,
            message: '密码重置成功！',
            onClose: () => {
              wx.navigateBack({
                delta: 2,
              });
            },
          });
        }
      },
    });
  }
  onLoad(options) {
    const { type, ...rest} = options;
    this.type = type;
    this.data = rest;
  }
}
