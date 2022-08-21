import wepy from 'wepy';

import { connect } from 'wepy-redux'
import { findIndex, find, propEq } from 'ramda'
import { getBalanceInitData, getBalance, getWaitBalanceInfoList } from '@/store/actions/balance'
import { getStore } from 'wepy-redux'
import { RESET_BALANCE_DATA } from '@/store/types/balance'

interface Data {
  orgCode: string
  orgName: string
  matklCode: string
  matklName: string
  orgListShow: boolean
  matklListShow: boolean
  showDetail: boolean
}

const stores = getStore()

@connect({
  customer({ balance }) {
    return balance.initData.enterpriseUser
  },
  orgs({ balance }) {
    const orgs =  balance.initData.orgList
    if (this.orgCode === '' && orgs.length > 0) {
      this.orgCode = orgs[0].organizationCode
      this.orgName = orgs[0].organizationName
    }
    return orgs
  },
  matkls({ balance }) {
    const ms =  balance.initData.matkls
    if (ms.length > 0) {
      const index = findIndex(propEq('matklCode', this.matklCode), ms)
      if (index === -1) {
        // 替换成最新的第一个
        this.matklCode = ms[0].matklCode
        this.matklName = ms[0].matklName
      }
    }

    return ms
  },
  balance({ balance }) {
    return balance.balance
  },
  waitBalanceList({ balance }) {
    return balance.waitBalanceList;
  }
}, {
  getBalanceInitData,
  getBalance,
  getWaitBalanceInfoList
})
export default class Balance extends wepy.page {

  config = {
    navigationBarTitleText: '我的余额',
    usingComponents: {
      'van-popup': '../../../../components/vant/popup/index',
      'van-cell': "../../../../components/vant/cell/index",
      "van-cell-group": "../../../../components/vant/cell-group/index",
      "van-button": "../../../../components/vant/button/index",
      'van-icon': '../../../../components/vant/icon/index',
    }
  }

  data: Data = {
    orgCode: '',
    orgName: '',
    matklCode: '',
    matklName: '',
    orgListShow: false,
    matklListShow: false,
    showDetail: false
  }

  methods = {
    openOrgList() {
      this.orgListShow = true
    },
    onOrgClose() {
      this.orgListShow = false
    },
    chooseOrg(id) {
      this.orgListShow = false

      const chooseOrg = find(propEq('id', id), this.orgs)
      this.orgCode = chooseOrg.organizationCode
      this.orgName = chooseOrg.organizationName

      // 每次重新选择物料组和组织，都将下面的金额数据隐藏
      stores.dispatch({ type: RESET_BALANCE_DATA })
      this.methods.getBalanceInitData({ orgId: id })
    },
    openMatklList() {
      this.matklListShow = true
    },
    onMatklClose() {
      this.matklListShow = false
    },
    chooseMatkl(id) {
      this.matklListShow = false
      const chooseMatkl = find(propEq('id', id), this.matkls)
      this.matklCode = chooseMatkl.matklCode
      this.matklName = chooseMatkl.matklName

      stores.dispatch({ type: RESET_BALANCE_DATA })
    },

    submit() {
      this.methods.getBalance({ customerCode: this.customer.customerCode, orgCode: this.orgCode, matklCode: this.matklCode });
      this.methods.getWaitBalanceInfoList({ orgCode: this.orgCode, matklCode: this.matklCode });
    },
    showDetail: () => {
      this.showDetail = true
    },
    hiddenDetail: () => {
      this.showDetail = false
    },
  }

  onLoad() {
    this.methods.getBalanceInitData({ orgId: '' })
  }
}
