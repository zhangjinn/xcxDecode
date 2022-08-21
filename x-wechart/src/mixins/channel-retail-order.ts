import wepy from 'wepy';
import { getStore } from 'wepy-redux';
import { DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR } from '../store/types/dmsorder';

// 离开时清空store选中的数据
export default class ChannelRetailMixin extends wepy.mixin {

  //
  onUnload() {
    const store = getStore()
    store.dispatch({
      type: DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
    })
  }
}
