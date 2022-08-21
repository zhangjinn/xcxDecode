
const styleBehavior = require('../behaviors/style')

Component({
  behaviors: [styleBehavior],
  properties: {
    content: Object,
    customStyle: Object
  },
  data: {
    type: 'full',
    items: [],
    buyButton: true,
    contentStyle: null
  },
  observers: {
    'content': function (value) {
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
      const { content: { data: { type, buyButton, items } } } = this.data
      const goodsArr = items.map((item) => {
        return item
      })
      this.setData({
        type,
        buyButton,
        items: goodsArr
      })
    }
  }
})
