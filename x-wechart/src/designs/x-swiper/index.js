
const styleBehavior = require('../behaviors/style')

Component({
  behaviors: [styleBehavior],
  properties: {
    content: Object,
    customStyle: Object
  },
  data: {
    items: [],
    interval: 3000,
    contentStyle: null,
    swiperItemStyle: null
  },
  lifetimes: {
    attached() {
      this.initContentData()
    },
    ready() {
      const contentStyle = this.getStyles(['img', 'margin'])
      const swiperItemStyle = this.getStyles(['img'])
      this.setData({
        contentStyle,
        swiperItemStyle
      })
    }
  },
  methods: {
    initContentData() {
      const { content: { data } } = this.data
      const items = this.transformSwiperItems(data.items)
      this.setData({
        items,
        interval: data.interval
      })
    },
    transformSwiperItems(items) {
      if (Array.isArray(items) && items.length) {
        return items.map(({ key, src, url }) => {
          return {
            key,
            url,
            src
          }
        })
      }
    },
    onTap({ currentTarget }) {
      const { index } = currentTarget.dataset
      const { items } = this.data
      const item = items[index]
      if (item && item.url) {
        this.navigateAction(item.url)
      }
    }
  }
})
