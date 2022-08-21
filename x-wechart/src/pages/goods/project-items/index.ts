import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { Weapp } from 'definitions/weapp';
import { takeProjectOrder } from '@/store/actions/order';
import Toast from '@/components/vant/toast/toast';
import utilsWxs from '../../../wxs/utils.wxs';

interface Data {
  all: boolean;
  list: any;
}

// 获取常用的 store
const stores = getStore();

@connect({
  totalPrice({ order }) {
    return order.projectOrder.totalPrice;
  },
  itemsSelected({ order }) {
    return order.projectOrder.itemsSelected;
  },
  items({ order }) {
    return order.projectOrder.items;
  },
}, {
  takeProjectOrder,
})
export default class OrderProjectItems extends wepy.page {
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
  data: Data = {
    all: false,
    list: [],
  };
  wxs = {
    utils: utilsWxs,
  };
  methods = {
    onCountChange(id: string, evt: Weapp.Event) {
      const quantity = parseInt(evt.detail, 10);
      stores.dispatch({ type: 'CHANGE_ORDER_PROJECT_ITEM', payload: { id, quantity } });
    },
    cancelChoose(id: string) {
      stores.dispatch({ type: 'CHANGE_ORDER_PROJECT_ITEM', payload: { id, quantity: 0 } });
    },
    viewChecked() {
      this.all = !this.all;
      this.list = this.all ? this.itemsSelected : this.items;
    },
    confirmChoose() {
      if (this.itemsSelected.length > 0) {
        wx.navigateBack({ delta: 1 });
      } else {
        Toast('请至少选择一个商品');
      }
    },
  };

  onLoad() {
    this.list = this.items;
  }
}
