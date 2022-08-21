import { VantComponent } from '@/components/vant/common/component'

VantComponent({
  props: {
    timestatus: String, // 1 未开始 2 进行中 3 已结束
    item: Object ,// 具体商品信息
    containerItem: Object, // 活动信息
    mark: String, // 当前产品组标记字段
  },
  data: {
    itemSelect: false,
    goodNumber: 1,
  },
  methods: {
    // 公共方法 向父组件发送商品的最新状态
    trigger() {
      // TODO: 存放下单的必要信息 emit到父组件里面
      const { item, itemSelect,goodNumber } = this.data
      const detail = {
        id: item.id,
        itemSelect: itemSelect,
        number: goodNumber
      }
      this.$emit('goodInfo', detail)
    },
    onChange (e: { detail: any; }) {
      this.setData({
        goodNumber: e.detail,
        itemSelect: true
      })
      this.trigger()
    },
    goodSelect() {
      this.setData({
        itemSelect: !this.data.itemSelect
      })
      this.trigger()
    },
    goNext(e: { currentTarget: { dataset: { url: any; }; }; }) {
      const { orgDict } = this.data.containerItem
      wx.navigateTo({
        url: e.currentTarget.dataset.url+'&orgDict='+JSON.stringify(orgDict)
      })
    },
    imgLose({ detail }: any) {
      this.$emit('imgLose', detail)
    },

    // 切换默认显示型号
    changeModel(e: { currentTarget: { dataset: {index: any; item: any; child: any;}; }; }){
      const { containerItem, mark } = this.data
      const detail = {
        activeId: containerItem.id, // 当前活动id
        product: e.currentTarget.dataset.item, // 当前产品组
        mark: mark,
        modelIndex: e.currentTarget.dataset.index // 当前型号下标
      }
      this.$emit('changeModel', detail)
    },

    // 展示更多型号弹框并传参
    showMoreModel(e: { currentTarget: { dataset: {index: any; item: any; child: any;}; }; }){
      const { containerItem, item, mark } = this.data

      item.child = item.child.map((child, idx)=>{
        child.isActive = false
        if(idx == 0){
          child.isActive = true
        }
        return child
      })
      let currItem = {
        ...item,
        ...item.child[0]
      }

      const detail = {
        containerItem: containerItem,
        item: currItem, // 当前产品组
        mark: mark,
      }
      this.$emit('showMoreModel', detail)
    }
  }
})
