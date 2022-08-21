import { VantComponent } from '../vant/common/component'

VantComponent({
  props: {
    options: {
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
  methods: {
    onRadioChange(event){
      const { option } = event.currentTarget.dataset
      this.$emit('onRadioChange', option)
    }
  }
})
