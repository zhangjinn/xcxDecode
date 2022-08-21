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
  adminAccount: object,
  custAccountList: any[],
  loginSystemList: any[],
  baseMatklList: any[],
  accountNames: any[],
  shopList:any[]
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
    navigationBarTitleText: '管辖门店',
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
    tipVisible: false,
    tipMessage: '',
    updatePasswordVisible: false,
    adminAccount: {},
    custAccountList: [],
    loginSystemList: [],
    baseMatklList: [],
    accountNames: [],
    shopList:[],// 门店数组
  }

  // 页面内交互写在methods里
  methods = {
    onToggleTipVisible() {
      this.toggleTipVisible()
    }
    async onUpdateStatus(account) {
      this.tipMessage = ''
      const { id, status } = account
      const result = await request({ api: '/customer/updateStatus.nd', method: 'POST', data: { id, status: status === 'active' ? 'inActive' : 'active' }, })
      this.toggleTipVisible()
      this.getAccountList()
    }
    async onResetPassword(account) {
      const { id } = account
      const result = await request({ api: '/customer/resetPassword.nd', method: 'POST', data: { id }, })
      if(result === 'success_byEmail') {
        this.tipMessage = '操作成功，密码已经发送至该账号设置的邮箱中！'
      } else {
        this.tipMessage = 'result'
      }
      this.toggleTipVisible()
      this.getAccountList()
    }
    onEditPassword(account) {
      account.loginSystemMatklsMapJson = JSON.parse(account.loginSystemMatklsMap)
      stores.dispatch({ type: SET_ACCOUNT_EDIT_ONE, payload: { account } })
      wx.navigateTo({ url: '/pages/me/shopList/edit-password/index'})
    }
    onEditAccount(account) {
      account.loginSystemMatklsMapJson = JSON.parse(account.loginSystemMatklsMap)
      stores.dispatch({ type: SET_ACCOUNT_EDIT_ONE, payload: { account } })
      wx.navigateTo({ url: '/pages/me/shopList/edit-account/index'})
    }
    onAddAccount() {
      const accountArray = this.accountNames.sort()
      let account = accountArray[accountArray.length -1]
      if (account.length == 7) {
         account = Number(account + "01")
      } else {
        account = Number(account) + 1
      }
      stores.dispatch({ type: SET_ACCOUNT_EDIT_ONE, payload: { account: { custAccountId: this.mixinCurrentUser.id, account: account } } })
      wx.navigateTo({ url: '/pages/me/shopList/add-account/index'})
    }

  }
  async getAccountList() {
    Toast.loading({
      message: '正在加载',
      duration: 0
    })
    // 筛选为业务员的账号数据
    let data = {
      businessFlag: 1
    }
    const { adminAccount, custAccountList, loginSystemList, baseMatklList, accountNames,shopList,custShopInfoList } = await request({ api: '/customer/customerAccount.nd',data })
    if(adminAccount && adminAccount.loginSystem) {
      adminAccount.loginSystemList = adminAccount.loginSystem ? adminAccount.loginSystem.split(',') : []
      adminAccount.loginSystemNameList = adminAccount.loginSystem_name ? adminAccount.loginSystem_name.split(',') : []
    }
    if(custAccountList && custAccountList.length) {
      custAccountList.forEach(item => {
        item.loginSystemList = item.loginSystem ? item.loginSystem.split(',') : []
        item.loginSystemNameList = item.loginSystem_name ? item.loginSystem_name.split(',') : []
      })
    }
    this.adminAccount = adminAccount
    this.custAccountList = custAccountList
    this.loginSystemList = loginSystemList
    this.baseMatklList = baseMatklList
    this.shopList = shopList
    // console.log('shopList',shopList);

    let custShopList = custShopInfoList.map(item=> {
      return {code: item.id, name: item.fullName}
    })

    this.accountNames = accountNames.split(',').filter(item => item && item !== 'null' && item !== 'undefined') || [0]
    stores.dispatch({ type: 'SET_ACCOUNT_LOGIN_SYSTEM_AND_BASE_MATKL', payload: { loginSystemList, baseMatklList,shopList,custShopList } })
    Toast.clear()
    this.$apply();
  }
  toggleTipVisible() {
    this.tipVisible = !this.tipVisible
  }
  async onShow() {
    this.getAccountList()
  }
}
