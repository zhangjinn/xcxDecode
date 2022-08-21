const styleBehavior = require('../behaviors/style')

Component({
  externalClasses: ['i-class'],
  behaviors: [styleBehavior],
  properties: {
    content: Object,
    customStyle: Object
  },
  data: {
    title: '',
    url: '',
    moreSwitch: true,
    contentStyle: null
  },
  lifetimes: {
    attached() {
      this.initContentData()
    },
    ready() {
      const contentStyle = this.getStyles(['title', 'margin'])
      this.setData({
        contentStyle
      })
    }
  },
  methods: {
    initContentData() {
      const { content: { data } } = this.data
      const { title, url, moreSwitch = true } = data
      this.setData({
        title,
        url,
        moreSwitch
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
