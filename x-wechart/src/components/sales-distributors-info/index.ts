import { VantComponent } from '../vant/common/component'
import Toast from '../vant/toast/toast';

VantComponent({
  props: {
    goods: Object, // 具体商品信息
    item:Object
  },
  data: {
    itemId: '',
    backnowledgedPrice: '',
    backnowledgedQty: '',
    acknowledgedAmount: '',
    chooseInvShow: false, //库存选择
  },
  watch: {
    'goods': function (item: { itemId: any; backnowledgedPrice: any; backnowledgedQty: any; acknowledgedAmount: any; }) {
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
        selected: this.data.goods.invStatus.selected
      }
      this.$emit('goodInfo', detail)
    },
    // 修改价格
    onChangeFieldPrice(e: { detail: any; }) {
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
    // 查看详情
    viewDetail() {
      const { id,orgId } = this.data.item
      wx.navigateTo({
        url: `/pages/dms/sales-distributors-detail/index?id=${id}&orgId=${orgId}`
      })
    },
    // 库存选择
    onTapStock() {
      this.setData({chooseInvShow: !this.data.chooseInvShow})
    },
    // 点击关闭
    onClose() {
      this.setData({chooseInvShow: false})
    }
    // 选择库存状态
    chooseInv({target: {dataset: {key}}) {
      this.setData({
        goods: {
          ...this.data.goods,
          invStatus: {
            ...this.data.goods.invStatus,
            selected: this.data.goods.invStatus.options.filter(o => o.invStatusId === key)[0]
          }
        },
        chooseInvShow: false
      })
      this.trigger()
    }
  },
})
