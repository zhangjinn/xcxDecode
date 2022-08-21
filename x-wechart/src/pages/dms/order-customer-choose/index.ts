import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { DMS_ORDER_CHOOSE_CUSTOMER_INFO } from '@/store/types/dmsorder';
import { getCustomer, getReturnCustomer, getNormalSalesOrderCustomerInfo } from '@/store/actions/dmsorder';
import { debounce } from 'throttle-debounce';

interface Data {
  productCode: string
}

@connect({
  customers({ dmsorder }) {
    return dmsorder.customers
  }
}, {
  getCustomer,
  getReturnCustomer,
  getNormalSalesOrderCustomerInfo
})
export default class OrderCustomerChoose extends wepy.page {
  config = {
    navigationBarTitleText: '查找客户',
    usingComponents: {
      "van-search": "/components/vant/search/index",
      "van-toast": "/components/vant/toast/index"
    },
  };

  data: Data = {
    filterStr: '',
    from: '',
    pageNo: 1
  };

  methods = {
    loadNextPage: () => {
      if (this.customers.over) {
        return
      }
      const { from, pageNo } = this.data
      this.pageNo = ++pageNo
      if (from == 'return-stock') {
        this.methods.getReturnCustomer({ filterStr: (this.data.filterStr || '').trim(), pageNo: this.pageNo })
      } else {
        this.methods.getCustomer({ filterStr: (this.data.filterStr || '').trim(), pageNo: this.pageNo })
      }
    },
    onChange: debounce(500, ({ detail }: wepy.Event) => {
      this.filterStr = detail
      this.$apply()
    }),
    onSearch: ({ detail }: wepy.Event) => {
      this.pageNo = 1
      if (this.data.from == 'return-stock') {
        this.methods.getReturnCustomer({ filterStr: (this.data.filterStr || '').trim() })
      } else {
        this.methods.getCustomer({ filterStr: (detail || '').trim() })
      }
    },
    chooseItem: (index: number) => {
      const chooseItem = this.customers.customers[index]
      getStore().dispatch({
        type: DMS_ORDER_CHOOSE_CUSTOMER_INFO,
        payload: chooseItem
      })
      if (!this.data.from) {
        this.methods.getNormalSalesOrderCustomerInfo({ customerCode: chooseItem.customerCode })
      }
      wx.navigateBack({
        delta: 1
      })
    }
  };

  onLoad({ from = '' }) {
    this.from = from
    this.$apply()
    if (from == 'return-stock') {
      this.methods.getReturnCustomer({ filterStr: (this.data.filterStr || '').trim() })
    } else {
      this.methods.getCustomer({ filterStr: (this.data.filterStr || '').trim() })
    }

  }
}
