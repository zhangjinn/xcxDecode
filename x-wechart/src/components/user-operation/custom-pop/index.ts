import wepy from 'wepy';

interface Data {
  popShow: boolean;
}

export default class PayConfirm extends wepy.component {
  props = {
    cancelText: {
      type: String,
      default: '我再想想'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
  }
  data: Data = {
    popShow: false,
  };
  callback = '';
  methods = {
    showPopup: () => {
      this.popShow = true
    },
    hidePopup: () => {
      this.popShow = false
    },
    // 取消
    onCancel(){
      this.methods.hidePopup()
    },
    // 确定
    onConfirm(){
      this.$emit('onConfirm')
    },
  };

}
