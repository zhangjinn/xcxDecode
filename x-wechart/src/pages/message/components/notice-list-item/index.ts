import wepy from 'wepy';

export default class extends wepy.component {
  props = {
    item: { // tab列表
      type: Object,
      default: function () {
        return {}
      },
    },
  }

  data = {};

  // 页面内交互写在methods里
  methods = {
    onSwitch: (item) => {
      this.$emit('onSwitch', item)
    },
  };
}
