const styleBehavior = require('../behaviors/style')

Component({
  behaviors: [styleBehavior],
  properties: {
    content: Object,
    customStyle: Object
  },
  data: {
    items: [],
    lateralSwitch: true
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
      const { items, lateralSwitch } = data
      this.setData({
        items,
        lateralSwitch
      })
    },
    onTap({ currentTarget }) {
      const { index } = currentTarget.dataset
      const { items } = this.data
      const { url } = items[index]
      if (url) {
        this.navigateAction(url)
      }
    }
  }
})
