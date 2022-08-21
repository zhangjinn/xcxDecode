const styleBehavior = require('../behaviors/style')

Component({
  behaviors: [styleBehavior],
  properties: {
    content: Object,
    designIndex: Number, // 标记在装修页面的第多少个元素上
    customStyle: Object,
    needAutoCallback: Boolean // 自动选中第一个时，是否需要callback,预防一些手动触发
  },
  data: {
    border: false,
    items: [],
    tabItemStyle: null,
    tabItemActiveStyle: null,
    contentStyle: null,
    tabIndex: 0
  },
  lifetimes: {
    attached() {
      this.initContentData()
    },
    ready() {
      const { content } = this.data
      if (content && content.data) {
        const { border } = content.data
        const contentStyle = this.getStyles(['tabStyle', 'margin'])
        const tabItemStyle = this.getStyles(['tabItemStyle'])
        const tabItemActiveStyle = this.getStyles(border ? ['tabItemStyle', 'tabBorder', 'tabItemActiveStyle'] : ['tabItemStyle', 'tabItemActiveStyle'])
        this.setData({
          contentStyle,
          tabItemStyle,
          tabItemActiveStyle
        })
      }
    }
  },
  methods: {
    initContentData() {
      const { content, designIndex, needAutoCallback } = this.data
      if (content && content.data) {
        const { border, items } = content.data
        this.setData({
          items,
          border
        })
        if (needAutoCallback) {
          this.triggerEvent('callback', {
            id: items[0].id,
            designIndex
          })
        }
      }
    },
    onTap(evt) {
      const { id, index } = evt.currentTarget.dataset
      this.setData({
        tabIndex: index
      })
      this.triggerEvent('callback', {
        id,
        designIndex: this.data.designIndex
      })
    }
  }
})
