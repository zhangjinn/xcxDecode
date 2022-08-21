import wepy from 'wepy';
import { request } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';

interface Data {
  filterForm: object,
  returnedDetail: object,
  orderStatusList: any[],
}

export default class ReturnedDetail extends wepy.page {
  config = {
    navigationBarTitleText: '退换货明细',
    usingComponents: {
      "van-toast": "/components/vant/toast/index",
      'van-field': '../../../components/vant/field/index',
      'van-button': '../../../components/vant/button/index',
      'van-steps': '../../../components/vant/steps/index',
    },
  };
  data: Data = {
    filterForm: {
      serialCode: '',
      productName: '',
    },
    returnedDetail: {},
    orderStatusList: [],
  }


  // 页面内交互写在methods里
  methods = {
    onSubmitFilterForm(e) {
      this.filterForm = { ...this.filterForm, ...e.detail.value }
      this.getReturnedDetail()
    }
  }
  async getReturnedDetail() {
    Toast.loading({
      message: '正在加载',
      duration: 0
    })
    const result = await request({ api: '/defectiveProduct/defectiveStateInfo.nd', data: this.filterForm })
    const { dpModel, orderStatuslist } = result
    this.returnedDetail = { ...dpModel, createDate: dpModel.createDate ? new Date(dpModel.createDate).Format('yyyy-MM-dd hh:mm:ss') : '' }
    this.orderStatusList = orderStatuslist ? orderStatuslist.map(item => {
      return { text: `【${item.statusName}】 ${item.remark ? item.remark : ''} `, desc: item.statusDate}
    }) : []
    Toast.clear()
    this.$apply();
  }
  onLoad({ serialCode }) {
    this.filterForm = { ...this.filterForm, serialCode }
    this.getReturnedDetail()
  }
}
