import wepy from 'wepy';
import {connect} from 'wepy-redux';

import { getMarketingActivityDetail } from '@/store/actions/activityare'

interface Data {
  id: string
}

@connect({
  marketingActivityDetail({ activityare }) {
    return activityare.marketingActivityDetail
  },
}, {
  getMarketingActivityDetail,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '营销活动详情',
    usingComponents: {
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-search': '../../../components/vant/search/index',
      'van-tab': '../../../components/vant/tab/index',
      'van-row': '../../../components/vant/row/index',
      'van-col': '../../../components/vant/col/index',
      'van-tabs': '../../../components/vant/tabs/index',
      'van-radio': '../../../components/vant/radio/index',
      'van-radio-group': '../../../components/vant/radio-group/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-stepper': '../../../components/vant/stepper/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-button': '../../../components/vant/button/index',
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index',
    },
  };
  data: Data = {
     id:'',
  };

  // 页面内交互写在methods里
  methods = {
    // 跳转到分销商
    viewDistributor: () => {
      let url = `/pages/activity/marketing-activities-distributor/index?id=${this.id}`
      wx.navigateTo({
        url: url
      })
    },

  };

  onLoad({ id }) {
    this.id = id
    let data = {
      id:id,
    }

    this.methods.getMarketingActivityDetail({ _loading: true, ...data })
    this.$apply()

  }

}
