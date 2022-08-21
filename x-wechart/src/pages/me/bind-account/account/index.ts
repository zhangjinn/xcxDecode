import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { trim, head } from 'ramda';
import { Weapp } from 'definitions/weapp';
import { setStorage, getCookie, formatMobile } from '@/utils/index';
import { request } from '@/utils/request';
import { checkPhone } from '@/utils/validators';
import Toast from '@/components/vant/toast/toast';

import { bindAccount } from '@/store/actions/user';

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
}

@connect({}, {
  bindAccount,
})
export default class AccountLogin extends wepy.page {
  config = {
    navigationBarTitleText: '绑定账号',
    usingComponents: {
      'van-icon': '../../../../components/vant/icon/index',
      'van-button': '../../../../components/vant/button/index',
      'van-cell': '../../../../components/vant/cell/index',
      'van-cell-group': '../../../../components/vant/cell-group/index',
      'van-collapse': '../../../../components/vant/collapse/index',
      'van-collapse-item': '../../../../components/vant/collapse-item/index',
      'van-dialog': '../../../../components/vant/dialog/index',
      'van-field': '../../../../components/vant/field/index',
      'van-toast': '../../../../components/vant/toast/index',
    },
  };
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
    codeSrc: `${baseUrl}/checkImg.nd`,
    isNeedImgCode: false,
    secondLogin: false,
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
    getCodeImg() {
      this.codeSrc = `${baseUrl}/checkImg.nd?_=${Date.now()}`;
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
        const { unionid } = this.$parent.globalData;
        const params = {
          userName: account || this.mobile,
          password: this.password,
          unionid,
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
    // 绑定
    submit() {
      const { account } = this.account;
      const { unionid } = this.$parent.globalData;
      const params = {
        userName: account || this.mobile,
        password: this.password,
        unionid,
        onlyBund: true,
      };
      if (this.isNeedImgCode) {
        params.imgCode = this.code;
      }
      this.userLogin(params);

    },
  };
  async userLogin(params: any) {
    Toast.loading({ forbidClick: true, message: '绑定中...', duration: 0 });
    const result = await this.methods.bindAccount(params, (res: any) => {
      const { header } = res;
      const cookie = header['Set-Cookie'] || header['set-cookie'];
      const token = getCookie('JSESSIONID', cookie);
      this.$parent.globalData.modifySession = token;
      Toast.clear();
    })
    const { msg, code, account } = result.payload;
    switch (code) {
      case 0:
        Toast.success({
          forbidClick: true,
          duration: 2000,
          message: '绑定成功',
          onClose: () => {
            wx.navigateBack({
              delta: 2,
            });
          },
        });
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
          message: msg || '绑定失败',
        });
        this.isNeedImgCode = true;
        this.methods.getCodeImg();
        this.$apply();
        break;
      default:
        Toast.fail({
          forbidClick: true,
          duration: 2000,
          message: msg || '绑定失败',
        });
        break;
    }
  }
}
