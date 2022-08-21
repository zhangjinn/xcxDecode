
const styleBehavior = require('../behaviors/style')

Component({
  behaviors: [styleBehavior],
  properties: {
    content: Object,
    customStyle: Object
  },
  data: {
    src: '',
    coordinates: [],
    contentStyle: null
  },
  lifetimes: {
    attached() {
      this.initContentData()
    },
    ready() {
      const { content: { data } } = this.data
      const contentStyle = this.getStyles(['margin', 'img'])
      const contentHeight = data.height * 2 || 0
      this.setData({
        contentStyle: `${contentStyle};height:${contentHeight}rpx`
      })
    }
  },
  methods: {
    transformCoordinatesStyle(coordinates) {
      if (Array.isArray(coordinates) && coordinates.length) {
        return coordinates.map(({ id, url, width, height, x, y }) => {
          const styles = `width:${width * 2}rpx;height:${height * 2}rpx;left:${x * 2}rpx;top:${y * 2}rpx`
          return {
            id,
            url,
            styles
          }
        })
      }
    },
    initContentData() {
      const { content: { data } } = this.data
      const coordinates = this.transformCoordinatesStyle(data.coordinates) || []
      this.setData({
        src: data.src,
        coordinates
      })
    },
    onTap({ currentTarget }) {
      const { index } = currentTarget.dataset
      const { coordinates } = this.data
      const coordinate = coordinates[index]
      if (coordinate && coordinate.url) {
        this.navigateAction(coordinate.url)
      }
    }
  }
})
