import wepy from 'wepy';
import {connect} from 'wepy-redux';
import { getMarketingActivityDetail } from '@/store/actions/activityare'
import emptyDataType from "@/components/empty-data-type/index";

interface Data {

}

@connect({
  marketingActivityDistributorList({ activityare }) {
    return activityare.marketingActivityDistributorList
  },
}, {
  getMarketingActivityDetail,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '参与分销商',
    usingComponents: {
      'van-toast': '../../../components/vant/toast/index',
    },
  };
  components = {
    emptyDataType,
  };
  data: Data = {

  };

  // 页面内交互写在methods里
  methods = {

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
