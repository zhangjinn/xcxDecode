import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { Weapp } from 'definitions/weapp';
import Toast from '@/components/vant/toast/toast';
import utilsWxs from '../../../wxs/utils.wxs';

// 获取常用的 store
const stores = getStore();

@connect({
  totalPrice({ order }) {
    return order.buyOutOrder.totalPrice;
  },
  totalNum({ order }) {
    return order.buyOutOrder.totalNum;
  },
  items({ order }) {
    return order.buyOutOrder.items;
  },
})

export default class BuyOutItems extends wepy.page {
  config = {
    navigationBarTitleText: '商品列表',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-stepper': '../../../components/vant/stepper/index',
      'van-swipe-cell': '../../../components/vant/swipe-cell/index',
      'van-submit-bar': '../../../components/vant/submit-bar/index',
    },
  };
  attrActionType = '';
  wxs = {
    utils: utilsWxs,
  };
  methods = {
    onCountChange(evt: Weapp.Event) {
      const count = parseInt(evt.detail, 10);
      stores.dispatch({ type: 'CHANGE_BYU_OUT_PRICE', payload: { count } });
    },

    confirmChoose() {
      if (this.totalNum > 0) {
        wx.navigateBack({ delta: 1 });
      } else {
        Toast('请输入购物套数');
      }
    },
  };
}
