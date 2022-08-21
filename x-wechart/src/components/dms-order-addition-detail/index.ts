import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { DMS_ORDER_CHOOSE_ITEM } from '@/store/types/dmsorder';

interface Data {
  details: Array<String>;
  from: string;
}

@connect({
  additionOrderDetailItem({ dmsorder }) {
    return dmsorder.chooseItemInfo
  }
}, {

})
export default class OrderDetail extends wepy.component {

  props = ['out','outInv','orgId','requiredParameters','ly','isDisabled'] // 1、传参有isDisabled并且为true，产品明细列表不可修改，false可修改 2、out:发货仓库对象 3、orgId：销售组织对象
  watch = {
    'out': function(newValue: any, oldValue: any) {
      return newValue;
    },
    'orgId': function(newValue: any, oldValue: any) {
      return newValue;
    },
    'requiredParameters': function(newValue: any, oldValue: any) {
      return newValue;
    }
  }

  data: Data = {
    details: [],
    from: ''
  }

  methods = {
    chooseItem({ detail }: any) {
      const { id } = detail
      getStore().dispatch({
        type: DMS_ORDER_CHOOSE_ITEM,
        payload: id
      })
      let orgId = this.orgId && this.orgId.id
      let warehouseId = this.out && this.out.id
      let requiredParameters = null
      let details = JSON.stringify(this.details)
      if(this.ly == 'retailNew'){ // 零售录入新版传参
        if(this.requiredParameters){
          requiredParameters = JSON.stringify(this.requiredParameters)
        }
      }

      wx.navigateTo({
        url: '/pages/dms/order-item-choose/index?orgId='+orgId+'&warehouseId='+warehouseId+'&ly='+this.ly+'&requiredParameters='+requiredParameters+'&details='+details
      })
    },
    addItem: () => {
      const { additionOrderDetailItem } = this
      const { details } = this.data
      const key = `_${(new Date()).valueOf()}`

      additionOrderDetailItem.itemInfo[key] = {
        model: '',
        color: '',
        orgId: this.orgId ? this.orgId.id : '',
        productCode: '',
        productName: '',
        invStatus: [],
        invStateTypes: [],
        inWarehouseList: [],
        serviceList: [], // 服务列表
      }
      this.details = details.concat([key])
      this.$apply()
    },
    delItem({ detail }: any) {

      const { additionOrderDetailItem } = this
      const { id, amount, volume } = detail
      const { details } = this.data
      const remaining = details.filter((itemId: any) => itemId !== id )
      delete additionOrderDetailItem.itemInfo[id]
      this.details = remaining
      this.methods.amountChange({
        detail: {
          amount: -amount,
        }
      })
      this.methods.volumeChange({
        detail: {
          volume: -volume,
        }
      })
    },
    checkParam() {
      let errMsg = ''
      const items = this.$wxpage.selectAllComponents("#item")
      let submitLines = 0
      for (const index in items) {
        const item = items[index]
        const result = item.checkParam()
        if (result.empty) {
          // 空没问题
        } else if (!result.finish) {
          // 不完整, 提示报错
          errMsg = result.errMsg
          break
        } else if (result.errMsg) {
          errMsg = result.errMsg
          break
        } else {
          submitLines++
        }
      }
      return {
        submitLines,
        errMsg
      }
    },
    getParam() {
      const items = this.$wxpage.selectAllComponents("#item")
      const params = []
      for (const index in items) {
        const item = items[index]
        const param = item.getParam()
        if (param.finish) {
          params.push(param)
        }
      }
      return params
    },

    // 已经选择的产品列表
    selectedProductList() {
      const items = this.$wxpage.selectAllComponents("#item")
      const params = []
      for (const index in items) {
        const item = items[index]
        const param = item.getParam()
        if(param && param.itemInfo && param.itemInfo.model){
          params.push(param)
        }
      }
      return params
    },
    amountChange: ({ detail }: any) => {
      const { amount } = detail
      this.$emit('amount-change', {
        amount,
      })
    },
    volumeChange: ({ detail }: any) => {
      const { volume } = detail
      this.$emit('volume-change', {
        volume,
      })
    },
    // 零售录入新版服务方式改变存值
    serviceChange: ({ detail }: any) => {
      const { zoneB2cService, zoneB2cServiceName, index } = detail
      const { additionOrderDetailItem } = this
      let key = this.details[index]
      additionOrderDetailItem.itemInfo[key].zoneB2cService = zoneB2cService
      additionOrderDetailItem.itemInfo[key].zoneB2cServiceName = zoneB2cServiceName
    },
    // 零售录入新版销售数量改变存值
    quantityChange: ({ detail }: any) => {
      const { quantity, index } = detail
      const { additionOrderDetailItem } = this
      let key = this.details[index]
      additionOrderDetailItem.itemInfo[key].quantity = quantity
    },
  };

  events = {
    'return-stock': function() {
      this.from = 'return-stock'
    },
    'retail': function() {
      this.from = 'retail'
    },
    'relaunch': function() {
      const { additionOrderDetailItem } = this
      const key = `_${(new Date()).valueOf()}`

      additionOrderDetailItem.itemInfo[key] = {
        model: '',
        color: '',
        productCode: '',
        productName: '',
        invStatus: [],
        serviceList: [], // 服务列表
      }
      this.details = [].concat([key])
      this.$apply()
    },
    'details': function(value) {
      const details = value.split(',')
      this.details = details
      this.$apply()
    }
  }
  onShow(){

  }
  onLoad() {
    if (this.details.length === 0) {
      this.methods.addItem()
    }
  }
}
