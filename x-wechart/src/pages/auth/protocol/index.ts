import wepy from 'wepy';
import { subtract } from 'ramda';

interface Data {
  timer: number;
}

export default class Protocol extends wepy.page {
  config = {
    navigationBarTitleText: '协议授权',
  };
  timerEl: number = 0;
  data: Data = {
    timer: 5,
  };

  methods = {
    getNext() {
      if (this.timer === 0) {
        wx.navigateTo({
          url: '/pages/auth/confirm/index',
        });
      }
    },
  };
  startTimer() {
    this.timerEl = setInterval(() => {
      this.timer = subtract(this.timer, 1);
      if (this.timer === 0) {
        clearInterval(this.timerEl);
      }
      this.$apply();
    }, 1000);
  }
  onUnload() {
    if (this.timerEl) {
      clearInterval(this.timerEl);
    }
  }
  onLoad() {
    this.startTimer();
  }
}
