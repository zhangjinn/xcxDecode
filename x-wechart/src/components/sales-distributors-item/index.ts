import { VantComponent } from '../vant/common/component'
import { map, propEq, findIndex, all } from 'ramda';
import Toast from '../vant/toast/toast';
import { dmsRequest } from '@/store/actions/dmsrequest';
import wepy from 'wepy';

VantComponent({
  props: {
    item: Object // 具体商品信息
  },
  data: {
    showPopup: '',
    id: '',
    beDismissed: false,
    reviewConsent: false,
  },

  methods: {
    tranfor(list: any) {
      return map(({ itemId, acknowledgedAmount, backnowledgedPrice, backnowledgedQty, invStatus: {selected: {invStatusId}} }) => {
        return {
          itemId: itemId,
          acknowledgedAmount,
          backnowledgedPrice,
          backnowledgedQty,
          invStatusId
        }
      }, list || [])
    },
    tryNumber(e: { backnowledgedPrice: any; }) {
      const { backnowledgedPrice } = e
      const isNumber = /^[0-9]\d*\,\d*|[0-9]\d*$/
      return isNumber.test(backnowledgedPrice)
    },
    // 子组件修改信息
    goodInfo(e: { detail: any; }) {
      const { detail } = e
      const { salesOrderItem } = this.data.item
      const { itemId, acknowledgedAmount, backnowledgedPrice, backnowledgedQty, selected } = detail
      const newItem = findIndex(propEq('itemId', itemId), salesOrderItem)
      if (newItem !== -1) {
        salesOrderItem[newItem] = {
          ...salesOrderItem[newItem],
          itemId,
          acknowledgedAmount,
          backnowledgedPrice,
          backnowledgedQty,
          invStatus: {
            ...salesOrderItem[newItem].invStatus,
            selected: selected
          }
        }
      }
    },
    // 审核同意popup同意
    beConsent() {
      this.setData({
        reviewConsent: false
      })
      const { salesOrderItem, id } = this.data.item
      const account = wepy.$instance.globalData.account
      const item = this.tranfor(salesOrderItem)
      if (all(propEq('backnowledgedQty', 0), item)) {
        Toast.fail('商品数量不能全为零')
      } else if (findIndex(propEq('backnowledgedPrice', '0'), item) !== -1) {
        Toast.fail('商品价格不能为零')
      } else if (findIndex(propEq('backnowledgedPrice', ''), item) !== -1) {
        Toast.fail('商品价格不能为空')
      } else if (!all(this.tryNumber, item)) {
        Toast.fail('请输入正确的商品价格')
      } else {
        dmsRequest({
          data: {
            _loading: true,
            userAccount: account,
            salesOrderId: id,
            changes: item
          },
          method: 'examPurchaseOrder'
        }).then((res: any) => {
          if (res && res.code == '0') {
            Toast.success('审核同意成功');
          }
          this.$emit('distributorsOperation', '')
        })
      }
    },
    // 审核同意popup取消
    cancelConsent() {
      this.setData({
        reviewConsent: false
      })
    },
    // 审核同意弹框
    orderConsent() {
      this.setData({
        reviewConsent: true
      })
    },
    // 审核驳回
    orderDismissed() {
      this.setData({
        beDismissed: true
      })
    },
    // 审核驳回弹框取消
    cancelDismissed() {
      this.setData({
        beDismissed: false
      })
    },
    // 审核驳回弹框同意
    beDismissed() {
      this.setData({
        beDismissed: false
      })
      const { id } = this.data.item
      const account = wepy.$instance.globalData.account
      dmsRequest({
        data: {
          _loading: true,
          userAccount: account,
          salesOrderId: id,
        },
        method: 'rejectPurchaseOrder'
      }).then((res: any) => {
        if (res && res.code == '0') {
          Toast.success('审核驳回成功');
          this.$emit('distributorsOperation', '')
        }
      })
    },
    // 查看详情
    viewDetail() {
      const { id,orgId } = this.data.item
      wx.navigateTo({
        url: `/pages/dms/sales-distributors-detail/index?id=${id}&orgId=${orgId}`
      })
    }
  }
})
