import wepy from 'wepy';
import { getSalesReturnPurchaseInfo } from '@/store/actions/dmsoutwarehouse';
interface Data {
  outOrder: [];
  salesOrderId: string;
  purchaseId: string;
}

export default class ReturnStockChoose extends wepy.page {
  config = {
    navigationBarTitleText: '退货入库',
    usingComponents: {
      "van-checkbox": "/components/vant/checkbox/index",
    },
  };

  data: Data = {
    outOrder: [],
    salesOrderId: '',
    purchaseId: '',
  };

  methods = {
    checkOrder: (purchaseId) => {
      this.purchaseId = purchaseId
      this.data.outOrder.forEach(item => {
        item.checked = item.purchaseId === purchaseId
      })
    },
    goNext: () => {
      if (this.purchaseId) {
        wx.navigateTo({
          url: `/pages/dms/order-return-entry/index?itemId=${this.salesOrderId}&purchaseId=${this.purchaseId}`,
        })
      }
    },
  }
  
  async onShow() {
    const result = await getSalesReturnPurchaseInfo({salesOrderId: this.salesOrderId})
    this.outOrder = result.data.purchaseOrder
    this.$apply()
  }

  onLoad({salesOrderId}) {
    this.salesOrderId = salesOrderId
  }
}
