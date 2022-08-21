import { VantComponent } from '../vant/common/component'

// 自定义图片样式，传入custom-class
// 图片返回错误以后，如果有默认的图片，则替换成默认图片，并emit一个事件，上层根据事件进行相应处理
// emit 时，会将flag和src传递上去
VantComponent({
  props: {
    flag: String,
    src: String,
    errSrc: String,
    lazyLoad: Boolean,
    mode: {
      type: String,
      default: 'scaleToFill'
    }
  },
  methods: {
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
        flag: this.data.flag || this.data.src
      })
    }
  }
})
