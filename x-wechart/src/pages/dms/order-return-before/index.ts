import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import channelOrder from '@/mixins/channel-retail-order';
import { getReturnOrderInfo } from '@/store/actions/returnbefore';
import { RESET_RETURN_ORDER_INFO } from '@/store/types/returnbefore';
import emptyDataType from "@/components/empty-data-type/index";
interface Data {
  filter: Object;
  itemId: string;
  customerTypeCode: string;
  returnNum: string;
}

@connect({
  list({ returnbefore }) {
    return returnbefore.list
  },
  totalPage({ returnbefore }) {
    return returnbefore.totalPage
  }
}, {
  getReturnOrderInfo,
})
export default class ReturnStock extends wepy.page {
  config = {
    navigationBarTitleText: '退货入库',
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
    customerTypeCode: '',
    returnNum: '',
  };

  methods = {
    goNext: () => {
      if(this.itemId !== '') {
        if (this.customerTypeCode === 'retail') {
          wx.navigateTo({
            url: `/pages/dms/order-return-entry/index?itemId=${this.itemId}`,
          })
        } else if (this.customerTypeCode === 'isHisense') {
          if (this.returnNum === '') {
            wx.navigateTo({
              url: `/pages/dms/order-return-choose/index?salesOrderId=${this.itemId}`,
            })
          } else {
            wx.navigateTo({
              url: `/pages/dms/order-return-entry/index?itemId=${this.itemId}`,
            })
          }
        }
      }
    },
    selectItem: (itemId, customerTypeCode, returnNum) => {
      this.itemId = itemId
      this.customerTypeCode = customerTypeCode
      this.returnNum = returnNum
      this.$apply()
    },
    onClick: () => {
      getStore().dispatch({ type: RESET_RETURN_ORDER_INFO, payload: [] })
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
      if (this.filter.pageNo >= this.totalPage) {
        //
      } else {
        this.filter = { ...this.filter, pageNo: this.filter.pageNo + 1 }
        this.getMyList()
      }
    },
  }
  getMyList() {
    const { pageNo, pageSize, filterStr } = this.filter
    this.methods.getReturnOrderInfo({
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
    getStore().dispatch({ type: RESET_RETURN_ORDER_INFO, payload: [] })
    this.filter = { ...this.filter, pageNo: 1 }
    this.itemId = ''
    this.$apply()
    this.getMyList()
  }

  onLoad() {
  }
}
