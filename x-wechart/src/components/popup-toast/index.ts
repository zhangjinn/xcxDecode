import wepy from 'wepy';
import { connect } from 'wepy-redux';


@connect({
  loading({ loading }) {
    return loading;
  },
})
export default class PopupToast extends wepy.component {
  props = {
    title: String
  };

  methods = {
    errorBeSure: () =>  {
      this.loading.popup.show = false
    },
  }

  onUnload() {
    this.loading.popup.show = false
  }
}
