import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { SET_ACCOUNT_EDIT_ONE } from '@/store/types/account'
import { request } from '@/utils/request';
import CommonMixin from '@/mixins/common';
import Toast from '@/components/vant/toast/toast';

interface Data {
  tipVisible: boolean,
  tipMessage: string,
  updatePasswordVisible: boolean,
  custAccountList: any[],
  scrollTop: number;
  totalPages: any;
  page: object;
}

const stores = getStore()

@connect({
  mixinCurrentUser({ user }) {
    return user.info || {}
  }
}, {

})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '账号管理',
    usingComponents: {
      'van-button': '../../../../components/vant/button/index',
      'van-popup': '../../../../components/vant/popup/index',
      "van-toast": "../../../../components/vant/toast/index",
      'van-cell-group': '../../../../components/vant/cell-group/index',
      'van-field': '../../../../components/vant/field/index',
    },
  };
  mixins = [ CommonMixin ];
  data: Data = {
    scrollTop: -1,
    tipVisible: false,
    tipMessage: '',
    updatePasswordVisible: false,
    custAccountList: [],
    totalPages: 0,
    page: {
      pageNo: 1,
      pageSize: 10,
    },
  }

  // 页面内交互写在methods里
  methods = {
    onToggleTipVisible() {
      this.toggleTipVisible()
    },
    async onUpdateStatus(account) {
      this.tipMessage = ''
      const { id, status } = account
      const result = await request({ api: '/customer/updateStatus.nd', method: 'POST', data: { id, status: status === 'active' ? 'inActive' : 'active' }, })
      this.toggleTipVisible()
      this.page = { ...this.page, pageNo: 1 }
      this.getAccountList()
    },
    async onResetPassword(account) {
      const { id } = account
      const result = await request({ api: '/customer/resetPassword.nd', method: 'POST', data: { id }, })
      if(result === 'success_byEmail') {
        this.tipMessage = '操作成功，密码已经发送至该账号设置的邮箱中！'
      } else {
        this.tipMessage = 'result'
      }
      this.toggleTipVisible()
      this.page = { ...this.page, pageNo: 1 }
      this.getAccountList()
    },
    onEditPassword(account) {
      account.loginSystemMatklsMapJson = JSON.parse(account.loginSystemMatklsMap)
      stores.dispatch({ type: SET_ACCOUNT_EDIT_ONE, payload: { account } })
      wx.navigateTo({ url: '/pages/me/account/edit-password/index'})
    },
    onEditAccount(account) {
      account.loginSystemMatklsMapJson = JSON.parse(account.loginSystemMatklsMap)
      if(account.businessFlag == '1'){
        wx.showModal({
          title: '温馨提示',
          content: '该账号岗位包含营销经理，涉及业务档案内容，请到PC端进行操作。',
          confirmText: '我知道了',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return
      }
      stores.dispatch({ type: SET_ACCOUNT_EDIT_ONE, payload: { account } })
      wx.navigateTo({ url: '/pages/me/account/edit-account/index'})
    },
    async onAddAccount(item) {
      const { account } = await request({ api: '/customer/getAccount.nd' })

      stores.dispatch({ type: SET_ACCOUNT_EDIT_ONE, payload: { account: { custAccountId: this.mixinCurrentUser.id, account: account} } })
      wx.navigateTo({ url: '/pages/me/account/add-account/index'})
    },
    // 回到顶部
    scrollToTop: () => {
      this.scrollTop = 0
    },
    // 滚动列表
    onScroll: (event: Weapp.Event) => {
      if (this.scrollTop === 0) {
        this.scrollTop = event.detail.scrollTop
      }
    },
    // 列表分页
    onGetOrderListNext() {
      if (this.totalPages > this.page.pageNo) {
        this.page = { ...this.page, pageNo: this.page.pageNo + 1 }
        this.getAccountList()
      }
    },

  }

  async getAccountList() {
    Toast.loading({
      message: '正在加载',
      duration: 0
    })
    const { customer }=JSON.parse(wx.getStorageSync('b2b_token'))
    let param={
      custId: customer && customer.id,
      orderBy: 't.type asc,t.account asc',
      pageNo: this.page.pageNo,
      pageSize: this.page.pageSize,
    }
    const list = await request({ api: 'fast/user/accountList/page.nd', data: param })
    this.totalPages = list.totalPages
    let custAccountList = list.list

    if(custAccountList && custAccountList.length) {
      custAccountList.forEach(item => {
        item.loginSystemList = item.loginSystem ? item.loginSystem.split(',') : []
        item.loginSystemNameList = item.loginSystem_name ? item.loginSystem_name.split(',') : []
      })
    }
    if ( this.page.pageNo > 1 ) {
      this.custAccountList = this.custAccountList.concat(custAccountList)
    } else {
      this.custAccountList = custAccountList
    }

    Toast.clear()
    this.$apply();
  }
  toggleTipVisible() {
    this.tipVisible = !this.tipVisible
  }
  async onShow() {
    this.page = { ...this.page, pageNo: 1 }
    this.getAccountList()
  }
}
