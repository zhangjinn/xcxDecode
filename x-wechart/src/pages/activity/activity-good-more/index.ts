import { VantComponent } from '@/components/vant/common/component'

VantComponent({
  props: {
    // timestatus: String, // 1 未开始 2 进行中 3 已结束
    item: Object ,// 具体商品信息
    containerItem: Object, // 活动信息
    mark: String, // 对应的产品组标记字段
  },
  data: {},
  methods: {

    // 切换默认显示型号
    changePopModel(e: { currentTarget: { dataset: { index: any; child: any;}; }; }){

      const { containerItem, mark, item } = this.data

      item.child = item.child.map((child, idx)=>{
        child.isActive = false
        if(idx == e.currentTarget.dataset.index){
          child.isActive = true
        }
        return child
      })
      let currItem = {
        ...item,
        ...e.currentTarget.dataset.child
      }

      const detail = {
        containerItem: containerItem,
        item: currItem,
        mark: mark
      }
      this.$emit('changePopModel', detail)
    }
  },

})
