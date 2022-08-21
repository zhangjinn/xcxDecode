
const styleBehavior = require('../behaviors/style')

Component({
  behaviors: [styleBehavior],
  properties: {
    content: Object,
    customStyle: Object
  },
  data: {
    items: [],
    moreImg: '',
    display: [],
    contentStyle: null
  },
  observers: {
    'content': function(value) {
      this.initContentData()
    }
  },
  lifetimes: {
    attached() {
      this.initContentData()
    },
    ready() {
      const contentStyle = this.getStyles(['margin'])
      this.setData({
        contentStyle
      })
    }
  },
  methods: {
    initContentData() {
      const { content: { data: { items, moreImg, display } } } = this.data
      const goodsArr = items.map((item) => {
        item.src = item.src
        return item
      })
      this.setData({
        moreImg,
        display,
        items: goodsArr
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
