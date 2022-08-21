/**
 * 处理装修数据返回的样式列表 paddingLeft -> padding-left, px -> rpx等
 */
module.exports = Behavior({
  data: {
    styles: []
  },
  attached() {
    const { customStyle } = this.data
    if (Array.isArray(customStyle) && customStyle.length > 0) {
      this.transformStyle(customStyle)
    }
  },
  methods: {
    // 通用跳转函数
    navigateAction({ type, pageType, page, query, value }) {
      if (!pageType) return
      if (pageType === '1' || pageType === '2' || pageType === '3' || pageType === '7') {
        const url = `${page}?${query}`
        switch (type) {
          case 'navigate':
            wx.navigateTo({ url })
            break
          case 'navigateTo':
            wx.navigateTo({ url })
            break
          case 'redirectTo':
            wx.redirectTo({ url })
            break
          case 'navigateBack':
            wx.navigateBack()
            break
          case 'switchTab':
            wx.switchTab({
              url: page
            })
            break
          default:
            break
        }
      } else {
        // 领劵 或者其他定义的事件则 callback 给父组件
        this.triggerEvent('callback', { pageType, page, query, value })
      }
    },
    getStyles(types = []) {
      const inlineStyles = []
      const { styles } = this.data
      if (Array.isArray(styles)) {
        types.forEach(style => {
          const inlineStyle = styles.find(item => item.key === style)
          if (inlineStyle && inlineStyle.key) {
            inlineStyles.push(inlineStyle.value)
          }
        })
      }
      return inlineStyles.join(';')
    },
    transformStyle(styles) {
      const transform = []
      for (let i = 0; i < styles.length; i++) {
        const { key, items = [] } = styles[i]
        const styleItems = items || []
        const styleArr = styleItems.map((item) => {
          const key = this.decamelize(item.key)
          let value = item.value
          const unit = item.value.replace(/[0-9]/ig, '')
          const numberValue = parseFloat(item.value, 10)
          if (Number.isInteger(numberValue)) {
            if (numberValue > 0) {
              switch (unit) {
                case 'px':
                  // 装修系统的尺寸是 375px
                  value = `${numberValue * 2}rpx`
                  break
                default:
                  break
              }
            } else {
              value = 0
            }
          }
          return `${key}:${value}`
        })
        transform.push({ key, value: styleArr.join(';') })
      }
      this.setData({ styles: transform })
    },
    decamelize(str, separator) {
      const separatorUnit = typeof separator === 'undefined' ? '-' : separator
      return str.replace(/([a-z\d])([A-Z])/g, `$1${separatorUnit}$2`).replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${separatorUnit}$2`).toLowerCase()
    }
  }
})
