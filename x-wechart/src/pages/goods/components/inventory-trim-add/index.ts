import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { DMS_ORDER_CHOOSE_ITEM } from '@/store/types/dmsorder';
import Toast from '@/components/vant/toast/toast';

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

  props = ['out','outInv','type','orgId','store','isDisabled'] // 传参有isDisabled并且为true，产品明细列表不可修改，false可修改

  watch = {
    'out': function(newValue: any, oldValue: any) {
      // console.log("======"+newValue);
      return newValue;
    },
    'orgId':function(newValue:any,oldValue:any){
      return newValue;
    },
    'store':function(newValue:any,oldValue:any){
      return newValue;
    }
  },

  data: Data = {
    details: [],
    from: ''
  },

  methods = {
    chooseItem({ detail }: any) {
      const { id } = detail
      const { type } = detail

      getStore().dispatch({
        type: DMS_ORDER_CHOOSE_ITEM,
        payload: id
      })
      if(this.orgId){
        if(type=='otherIn'){
          wx.navigateTo({
            url: '/pages/dms/inventory-trim-in-choose/index'
          })
        }else if(type!=='otherIn'){
          if(this.store){
            wx.navigateTo({
              url: '/pages/dms/inventory-trim-out-choose/index?orgId='+this.orgId+'&store='+this.store
            })
          }else{
            Toast('请选择仓库')
          }
        }
      }else{
        Toast('请选择销售组织')
      }


    },
    addItem: () => {
      const { additionOrderDetailItem } = this
      const { details } = this.data
      const key = `_${(new Date()).valueOf()}`

      additionOrderDetailItem.itemInfo[key] = {
        model: '',
        color: '',
        productCode: '',
        productName: '',
        invStatus: [],
        invStateTypes: [],
        inWarehouseList: []
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
    }
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
    }
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
        invStatus: []
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

  onLoad() {

    if (this.details.length === 0) {
      this.methods.addItem()
    }
  }
}
