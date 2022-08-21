import { VantComponent } from '../vant/common/component'
import Toast from '../vant/toast/toast';

VantComponent({
  props: {
    item: Object, // 具体商品信息
    productItem:Object,
    itemIndex: String, // 明细下标
  },
  data: {
    itemId: '',
    backnowledgedPrice: '',
    backnowledgedQty: '',
    acknowledgedAmount: '',
    chooseInvShow: false, //库存选择
  },
  watch: {
    'item': function (item: { itemId: any; backnowledgedPrice: any; backnowledgedQty: any; acknowledgedAmount: any; }) {
      this.setData({
        itemId: item.itemId,
        backnowledgedPrice: item.backnowledgedPrice,
        backnowledgedQty: item.backnowledgedQty,
        acknowledgedAmount: item.acknowledgedAmount
      })
    }
  },
  methods: {
    // 公共方法 向父组件发送商品的最新状态
    trigger() {
      // TODO: 存放下单的必要信息 emit到父组件里面
      const { itemId, backnowledgedQty, acknowledgedAmount, backnowledgedPrice } = this.data
      const detail = {
        itemId,
        backnowledgedPrice,
        backnowledgedQty,
        acknowledgedAmount,
        selected: this.data.item.invStatus.selected
      }
      this.$emit('goodInfo', detail)
    },
    // 修改价格
    onChangeFieldPrice(e: { detail: any; }) {
      if (isNaN(+e.detail)) {
        let v = e.detail
        if (e.detail.startsWith('.')) {
          v = '0' + e.detail
        }
        e.detail = v.replace(/(\d+\.\d{0,2})(.*)/, "$1")
      }
        const { backnowledgedQty } = this.data
        let amount = (backnowledgedQty * e.detail).toFixed(2)
        this.setData({
          backnowledgedPrice: e.detail,
          acknowledgedAmount: amount
        })
        this.trigger()
    },
    // 修改数量
    onChangeFieldNumber(e: { detail: any; }) {
      const { detail } = e
      const isNumber = /^[0-9]*$/
      if (isNumber.test(detail)) {
        const { backnowledgedPrice } = this.data
        let amount = (e.detail * backnowledgedPrice).toFixed(2)
        this.setData({
          backnowledgedQty: e.detail,
          acknowledgedAmount: amount
        })
        this.trigger()
      } else {
        Toast('请输入正确的商品数量');
      }
    },
    onTapStock() {
      this.setData({chooseInvShow: !this.data.chooseInvShow})
    },
    onClose() {
      this.setData({chooseInvShow: false})
    },
    // 选择库存状态
    chooseInv({target: {dataset: {key}}}) {
      this.setData({
        item: {
          ...this.data.item,
          invStatus: {
            ...this.data.item.invStatus,
            selected: this.data.item.invStatus.options.filter(o => o.invStatusId === key)[0]
          }
        },
        chooseInvShow: false
      })
      this.trigger()
    },
    quickGratification({target: {dataset: {type}}}){
      this.$emit('quickGratification', {
        type,
        itemIndex: this.data.itemIndex
      })
    }
  },
})
