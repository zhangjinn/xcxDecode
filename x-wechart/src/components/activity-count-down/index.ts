import { VantComponent } from '../vant/common/component'

VantComponent({
  props: {
    time: Number
  },
  data: {
    timeData: {
      days: '',
      hours: '',
      minutes: '',
      seconds: ''
    }
  },
  methods: {
    onChange(e: { detail: any; }) {
      this.setData({
        timeData: e.detail
      })
    }
  }
})
