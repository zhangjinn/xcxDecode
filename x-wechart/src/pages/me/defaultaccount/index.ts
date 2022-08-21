import wepy from 'wepy';
import { clone } from 'ramda';
import { request } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import { getStorage } from '@/utils';

interface Data {
  accountList: any[];
}

export default class Defaultaccount extends wepy.page {
  config = {
    navigationBarTitleText: '默认账号设置',
    usingComponents: {
      'van-row': '../../../components/vant/row/index',
      'van-col': '../../../components/vant/col/index',
      'van-switch': '../../../components/vant/switch/index',
      'van-toast': '../../../components/vant/toast/index',
    },
  };
  data = {
    accountList: []
  };

  // 页面内交互写在methods里
  methods = {
    async onChangeToDefault(event) {
      const { account } = event.target.dataset
      const { unionid } = this.$parent.globalData
      const result = await request({ api: '/changeUnionidAccount.nd', method: 'POST', data: { unionid, account }})
      if(result.code !== 0) {
        Toast.fail(result.msg)
        return
      }
      const accountListNew = clone(this.accountList)
      accountListNew.forEach(item => {
        item.uDefault = '1'
        if(item.account === account) {
          item.uDefault = '0'
        }
      })
      this.accountList = accountListNew
      Toast.success('切换默认账号成功')
      this.$apply()
    },
  }
  async getAccountList() {
    const result = await request({ api: 'queryAccountUnionid.nd'})
    let accountList = result.list.map(item => {
      return { ...item, text: item.name, value: item.account }
    })
    this.accountList = accountList
    this.$apply()
  }
  async onLoad() {
    this.getAccountList()
  }
}
