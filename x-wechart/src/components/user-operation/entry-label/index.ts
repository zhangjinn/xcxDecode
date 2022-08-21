/**
 * 零售录入、意向录入标签
* */
import { VantComponent } from '../../vant/common/component'
import Toast from "@/components/vant/toast/toast";

/*props->[{id:'1', name:'新居', active: false}],*/
VantComponent({
  props: {
    options: { // 页面标签列表
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
    tagPopShow: false,
    tagPopFormData: {
      tagName: '', // 标签名称
      tagDesc: '', // 标签说明
    },
    tagPopOptions: [], // 弹框标签列表
  },
  methods: {
    // 表单输入框修改并赋值
    onFieldNameChange(event){
      const { detail } = event
      const { key } = event.currentTarget.dataset
      this.data.tagPopFormData[key] = detail
    },

    // 选择用户标签
    onTagChange(event){
      const { option, index } = event.currentTarget.dataset
      let param = {
        option,
        index,
      }
      if(!option.active){
        let allActiveTags = this.data.options.filter(item => item.active)
        if(allActiveTags.length>=8){
          Toast.fail('用户选择标签不可超过8个')
          return false
        }
      }
      this.$emit('onTagChange', param)
    },

    // 选择弹框里用户标签
    onPopTagChange(event){
      const { option, index } = event.currentTarget.dataset
      let tagPopOptions = this.data.tagPopOptions
      if(!option.active){
        let allActiveTags = tagPopOptions.filter(item => item.active)
        if(allActiveTags.length>=8){
          Toast.fail('用户选择标签不可超过8个')
          return false
        }
      }
      tagPopOptions[index].active=!tagPopOptions[index].active
      this.setData({
        tagPopOptions: tagPopOptions,
      })
    },

    // 显示选择标签弹框
    showTagPop(){
      let tagPopOptions = JSON.parse(JSON.stringify(this.data.options))
      let tagPopFormData = {
        tagName: '', // 标签名称
        tagDesc: '', // 标签说明
      }
      this.setData({
        tagPopOptions: tagPopOptions,
        tagPopFormData: tagPopFormData,
        tagPopShow: true
      })
    },

    // 隐藏选择标签弹框
    hideTagPop(){
      this.setData({
        tagPopShow: false
      })
    },

    // 保存新增标签
    saveTagPop(){
      let param = this.data.tagPopFormData
      let allActiveTags = this.data.tagPopOptions.filter(item => item.active)
      if(param.tagName !== ''){
        if(allActiveTags.length>=8){
          Toast.fail('用户选择标签不可超过8个')
          return false
        }
      }
      param.popOptions = this.data.tagPopOptions
      this.$emit('saveTagPop', param)
      this.hideTagPop()
    },

  },
})
