/**
 * 零售录入、意向录入来源
* */
import { VantComponent } from '../../vant/common/component'
import Toast from "@/components/vant/toast/toast";
/*options->[{id:'1', name:'来源111'}],*/
VantComponent({
  props: {
    options: { // 页面来源列表
      type: Array,
      default: function (){
        return []
      }
    },
    activeItem: {
      type: Object,
      default: function (){
        return {
          id: '',
          name: ''
        }
      }
    }
  },
  data: {
    sourcePopShow: false,
    sourcePopFormData: {
      name: '', // 自定义来源名称
    },
    popActiveItem: {
      id: '',
      name: ''
    }
  },
  methods: {
    // 表单输入框修改并赋值
    onFieldNameChange(event){
      const { detail } = event
      const { key } = event.currentTarget.dataset
      this.data.sourcePopFormData[key] = detail
    },

    // 选择用户来源
    onSourceChange(event){
      let { option, index } = event.currentTarget.dataset
      if(option.id == this.data.activeItem.id){
        option = {
          id: '',
          name: ''
        }
      }
      let param = {
        option,
        index,
      }
      this.$emit('onSourceChange', param)
    },

    // 选择弹框用户来源
    onPopSourceChange(event){
      let { option, index } = event.currentTarget.dataset
      if(option.id == this.data.popActiveItem.id){
        option = {
          id: '',
          name: ''
        }
      }
      this.setData({
        popActiveItem: option,
      })
    },

    // 显示选择来源弹框
    showSourcePop(){
      let popActiveItem = JSON.parse(JSON.stringify(this.data.activeItem))
      let sourcePopFormData = {
        name: '', // 自定义来源名称
      }
      this.setData({
        popActiveItem: popActiveItem,
        sourcePopFormData: sourcePopFormData,
        sourcePopShow: true
      })
    },

    // 隐藏选择来源弹框
    hideSourcePop(){
      this.setData({
        sourcePopShow: false
      })
    },

    // 保存新增来源
    saveSourcePop(){
      let param = this.data.sourcePopFormData
      param.popActiveItem = this.data.popActiveItem
      this.$emit('saveSourcePop', param)
      this.hideSourcePop()
    },

  }
})
