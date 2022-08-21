import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { request } from '@/utils/request';
import { isEmpty } from '@/utils/validators';
import Toast from '@/components/vant/toast/toast';

interface Data {
  errorMessage: object,
  rowpasswordVisible: boolean,
  passwordVisible: boolean,
  npasswordVisible: boolean,
}

@connect({
  editAccount({ account }) {
    return account.editAccount
  },
  mixinCurrentUser({ user }) {
    return user.info || {}
  },
}, {

})
export default class UpdatePassword extends wepy.page {
  config = {
    navigationBarTitleText: '修改密码',
    usingComponents: {
      'van-button': '../../../../components/vant/button/index',
      'van-cell-group': '../../../../components/vant/cell-group/index',
      'van-field': '../../../../components/vant/field/index',
      'van-toast': '../../../../components/vant/toast/index',
    },
  };
  data: Data = {
    rowpasswordVisible: false,
    passwordVisible: false,
    npasswordVisible: false,
    errorMessage: {
      rowpassword: '',
      password: '',
      npassword: '',
    }
  }

  // 页面内交互写在methods里
  methods = {
    togglePwd(e) {
      const { name } = e.target.dataset
      const nameVisible = name + 'Visible'
      this[nameVisible] = !this[nameVisible]
    }
    async onSubmitForm(e) {
      const form = e.detail.value
      if(!this.checkForm(form)) {
        return
      }
      const isPassword = await request({ api: '/customer/isPassword.nd', method: 'POST', data: { rowpassword: form.rowpassword } })
      if(!isPassword) {
        this.errorMessage = { ...this.errorMessage, rowpassword: '原密码不正确' }
        this.$apply()
        return
      }
      form.custAccountId = this.editAccount.id
      form.zt = 2
      const result = await request({ api: '/customer/editEnterpriseUser.nd', method: 'POST', data: form });
      if(result === 'success_pwd') {
        Toast.success('修改密码成功');
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }else {
        Toast.fail(result);
      }

    }
    onClearError(column) {
      this.errorMessage = { ...this.errorMessage, [column]: '' }
    }
  }
  checkForm(form) {
    let status = true
    const { rowpassword, password, npassword } = form
    if(!rowpassword) {
      status = false
      this.errorMessage = { ...this.errorMessage, rowpassword: '请输入原密码' }
    }
    if(!password) {
      status = false
      this.errorMessage = { ...this.errorMessage, password: '请输入新密码' }
    }
    if(!npassword) {
      status = false
      this.errorMessage = { ...this.errorMessage, npassword: '请确认新密码' }
    }
    if(password && npassword && password !== npassword) {
      status = false
      this.errorMessage = { ...this.errorMessage, npassword: '两次密码不一致' }
    }
    if(!/^.{8,15}$/.test(password)) {
      status = false
      this.errorMessage = { ...this.errorMessage, password: '新密码至少8位,不能超过15位' }
    }
    if(!/^.*[0-9]+.*$/.test(password)) {
      status = false
      this.errorMessage = { ...this.errorMessage, password: '新密码至少包含一个数字' }
    }
    if(!/^.*[A-Za-z]+.*$/.test(password)) {
      status = false
      this.errorMessage = { ...this.errorMessage, password: '新密码至少包含一个字母' }
    }
    if(/^.*[<>')+\/&]+.*$/.test(password)) {
      status = false
      this.errorMessage = { ...this.errorMessage, password: '新密码不能包含以下特殊字符<>\')+/&' }
    }
    if(!/^.*[^<>')+\/&A-Za-z0-9]+.*$/.test(password)) {
      status = false
      this.errorMessage = { ...this.errorMessage, password: '新密码必须包含一个特殊字符' }
    }
    this.$apply()
    return status
  }
}
