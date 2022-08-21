import wepy from 'wepy'

interface Data {
  show: boolean
}

export default class PayCapacityConfirm extends wepy.component {
  data: Data = {
    show: false
  }
  callback = ''
  methods = {
    show(callback: any) {
      this.show = true
      if (callback) {
        this.callback = callback
      }
    },
    close() {
      this.show = false
    },
    onBind(str: string) {
      if (str === 'cancel') {
        this.show = false
      } else {
        this.callback(str)
      }
    }
  }

}
