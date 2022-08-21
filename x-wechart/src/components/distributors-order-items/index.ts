import { VantComponent } from '../vant/common/component'
import { Event } from 'wepy'

VantComponent({
  props: {
    timestatus: String, // 1 未开始 2 进行中 3 已结束
    item: Object, // 具体商品信息
    userActId: String, // 具体商品信息
    custId: String // 是否是从活动列表代理商下发活动下的单（有值 是，没值 不是）
  },
  data: {
    orderedQty: 0
  },
  watch: {
    'item': function(newValue, oldValue) {

      // this.$emit('onShippedBqtyChg', {
      //   account: detail,
      //   totalVolume:new Number(this.properties.item.loadVolume*detail).toFixed(3),
      //   number: this.properties.item.price*detail
      // })
    }
  },
  mounted(){
    const detail =this.properties.item.orderedQty
    this.set({orderedQty:detail})
    if(this.properties.userActId && !this.properties.custId){
      this.$emit('onShippedBqtyChg', {
        account: detail,
        totalVolume:new Number(this.properties.item.loadVolume*detail).toFixed(3),
        number: this.properties.item.price*detail
      })
    }
  },
  methods: {
    selectStockStats() {
      this.$emit('selectStockStats', {
        id: this.data.item.productCode
      })
    },
    onShippedBqtyChg(evt: Event) {
      const { detail } = evt
      this.set({orderedQty:detail})

      // this.properties.item.orderedQty = detail
      this.$emit('onShippedBqtyChg', {
        account: detail,
        totalVolume:new Number(this.properties.item.loadVolume*detail).toFixed(3),
        number: this.properties.item.price*detail
      })
    },
    onerror() {
      if (this.data.errSrc) {
        this.setData({
          ...this.data,
          src: this.data.errSrc,
          errSrc: ''
        });
      }
      // 替换以后的src
      this.$emit('lose', {
        src: this.data.src,
        flag: this.data.flag
      })
    }
    imgLose({ detail }: any) {
      this.$emit('imgLose', detail)
    }
  }
})
