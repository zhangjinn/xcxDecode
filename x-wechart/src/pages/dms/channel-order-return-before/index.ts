import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import channelOrder from '@/mixins/channel-retail-order';
import { getReturnChannelOrderInfo } from '@/store/actions/returnbefore';
import { RESET_RETURN_CHANNEL_ORDER_INFO } from '@/store/types/returnbefore';
import Toast from '@/components/vant/toast/toast';
import emptyDataType from "@/components/empty-data-type/index";
interface Data {
  filter: Object;
  itemId: string;
  documentNum: string;
  returnNum: string;
  supplierName: string;
  returnBy: string;
}

@connect({
  list_channel({ returnbefore }) {
    return returnbefore.list_channel
  },
  totalPage_channel({ returnbefore }) {
    return returnbefore.totalPage_channel
  }
}, {
  getReturnChannelOrderInfo,
})
export default class ReturnStock extends wepy.page {
  config = {
    navigationBarTitleText: '渠道退货出库',
    usingComponents: {
      "van-popup": "../../../components/vant/popup/index",
      "van-toast": "../../../components/vant/toast/index",
      "item": "../../../components/dms-order-addition-detail-item/index",
      "van-icon": "../../../components/vant/icon/index",
      "van-submit-bar": "../../../components/vant/submit-bar/index",
      "van-transition": "../../../components/vant/transition/index",
      "van-field": "../../../components/vant/field/index",
      "van-dialog": "../../../components/vant/dialog/index",
      "van-search": "../../../components/vant/search-items/index",
      'stores': '../../../components/stores-return/index',
      'calendar': '../../../components/calendar/index',
      'distributor-material-group': '../../../components/distributor-material-group/'
    },
  };
  components = {
    emptyDataType,
  };
  mixins = [channelOrder];

  data: Data = {
    filter: {
      pageNo: 1,
      pageSize: 10,
      filterStr: ''
    },
    itemId: '',
    documentNum: '',
    returnNum: '',
    supplierName: '',
    returnBy: ''
  };

  methods = {
    goNext: () => {
      if(this.itemId !== '' ) {
        wx.navigateTo({
          url: `/pages/dms/channel-order-return/index?itemId=${this.itemId}&returnNum=${this.returnNum}&documentNum=${this.documentNum}&supplierName=${this.supplierName}&returnBy=${this.returnBy}`,
        })
      } else {
        Toast.fail('请选择退货信息!')
      }
    },
    selectItem: (id: any, documentNum: any, returnNum: any, supplierName: any, returnBy: any ) => {
      this.itemId = id
      this.documentNum = documentNum
      this.returnNum = returnNum
      this.supplierName = supplierName
      this.returnBy = returnBy
      this.$apply()
    },
    onClick: () => {
      getStore().dispatch({ type: RESET_RETURN_CHANNEL_ORDER_INFO, payload: [] })
      this.itemId = ''
      this.filter = { ...this.filter, pageNo: 1 }
      this.$apply()
      this.getMyList()
    },
    onChange: (e: any) => {
      this.filter = { ...this.filter, filterStr: e.detail }
      this.$apply()
    },
    loadNextPage: () => {
      if (this.filter.pageNo >= this.totalPage_channel) {
        //
      } else {
        this.filter = { ...this.filter, pageNo: this.filter.pageNo + 1 }
        this.getMyList()
      }
    },
  }
  getMyList() {
    const { pageNo, pageSize, filterStr } = this.filter
    this.methods.getReturnChannelOrderInfo({
      cisCode: wepy.$instance.globalData.cisCode,
      _loading: true,
      filterStr,
      page: {
        pageNo,
        pageSize
      }
    })
  }
  onShow() {
    getStore().dispatch({ type: RESET_RETURN_CHANNEL_ORDER_INFO, payload: [] })
    this.filter = { ...this.filter, pageNo: 1 }
    this.itemId = ''
    this.$apply()
    this.getMyList()
  }

  onLoad() {
  }
}
