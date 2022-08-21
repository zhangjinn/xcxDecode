import { VantComponent } from '../vant/common/component'
import Toast from '../vant/toast/toast'

VantComponent({
  props: {// 1 未开始 2 进行中 3 已结束
    goodsinfo: Object, // 具体商品信息
  },
  data: {
    // returnQty: '',
    // bprice: '',
    // goodId: '',
    // amount: '',
    // warehouse: '安信大库', //仓库
    // stockStatus: '正品', //库存状态
    // batch: '选择批次',
  },
  watch: {
    'goodsinfo': function (item: { itemId: any; bprice: any; returnQty: any; amount: any }) {
      // this.setData({
      //   goodId: item.itemId,
      //   bprice: item.bprice,
      //   returnQty: item.returnQty,
      //   amount: parseFloat(item.amount).toFixed(2)
      // })
    }
  },
  methods: {
    // 公共方法 向父组件发送商品的最新状态
    trigger(num, index, itemId) {
      // TODO: 存放下单的必要信息 emit到父组件里面
      // const { goodId, amount, returnQty, bprice } = this.data
      // const detail = {
      //   itemId: goodId,
      //   bprice,
      //   returnQty,
      //   amount,
      // }
      const detail = {
        num,
        index,
        itemId,
      }
      this.$emit('returnInfo', detail)
    },
    choose(type, index, itemId) {
      this.$emit('choose', {type, index, itemId})
    },
    // 修改数量
    onChangeFieldNumber(e) {
      const { detail, target: {dataset} } = e
      const isNumber = /^[0-9]*$/
      if (isNumber.test(detail)) {
        this.trigger(detail, dataset.index, dataset.itemid)
      } else {
        Toast('请输入正确的商品数量');
      }
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
      const { returnQty } = this.data
      let amount = (returnQty * e.detail).toFixed(2)
      this.setData({
        bprice: e.detail,
        amount: amount
      })
      this.trigger()
    },
    onToggleWarehouse(e) {
      const {currentTarget: {dataset: {index, itemid}}} = e
      this.choose('warehouse', index, itemid)
    },
    onToggleBatch(e) {
      const {currentTarget: {dataset: {index, itemid}}} = e
      this.choose('batch', index, itemid)
    },
    handle(type, itemId, index) {
      const detail = {type, itemId, index}
      this.$emit('handle', detail)
    }
    onAdd(e) {
      const { currentTarget: {dataset} } = e
      const itemId = dataset.itemid
      this.handle('add', itemId)
    }
    onDel(e) {
      const {currentTarget: {dataset}} = e
      const itemId = dataset.itemid
      const index = dataset.index
      this.handle('del', itemId, index)
    }
  }
})
