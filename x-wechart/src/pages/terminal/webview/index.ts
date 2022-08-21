import wepy from 'wepy'

export default class Defaultaccount extends wepy.page {
  config = {
    navigationBarTitleText: ''
  }
  data = {
    url: ''
  }

  onLoad(options) {
    this.url = options.url
  }
}
