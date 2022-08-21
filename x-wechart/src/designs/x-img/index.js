
const styleBehavior = require('../behaviors/style')
Component({
  behaviors: [styleBehavior],
  properties: {
    content: Object,
    customStyle: Object
  },
  data: {
    src: '',
    contentStyle: null
  },
  lifetimes: {
    attached() {
      this.initContentData()
    },
    ready() {
      const { content: { data: { height } } } = this.data
      const contentStyle = this.getStyles(['margin', 'img'])
      this.setData({
        contentStyle: `${contentStyle};height:${height * 2}rpx`
      })
    }
  },

  methods: {
    initContentData() {
      const { content: { data } } = this.data
      this.setData({
        src: data.src
      })
    },
    onTap() {
      const { data } = this.data.content
      if (data.url) {
        this.navigateAction(data.url)
      }
    }
  }
})
