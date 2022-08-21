import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { Weapp } from 'definitions/weapp';
import { forEach } from 'ramda';
import { takePreference } from '@/store/actions/order';
import Toast from '@/components/vant/toast/toast';
import { request } from '@/utils/request';
import utilsWxs from '../../../wxs/utils.wxs';

interface Data {
  all: boolean;
  list: any;
}

// 获取常用的 store
const stores = getStore();

@connect({
  isGetPrice({ order }) {
    return order.preferenceOrder.isGetPrice;
  },
  totalPrice({ order }) {
    return order.preferenceOrder.totalPrice;
  },
  itemsSelected({ order }) {
    return order.preferenceOrder.itemsSelected;
  },
  items({ order }) {
    return order.preferenceOrder.items;
  },
}, {
  takePreference,
})
export default class OrderPreferenceItems extends wepy.page {
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
      stores.dispatch({ type: 'CHANGE_PREFERENCE_ITEM_COUNT', payload: { id, quantity } });
    },
    cancelChoose(id: string) {
      stores.dispatch({ type: 'CHANGE_PREFERENCE_ITEM_COUNT', payload: { id, quantity: 0 } });
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

  // 获取提货标准价和直扣价格
  getAllPriceBuck(items: any) {
    const allPriceAsync: any = [];
    Toast.loading({
      forbidClick: true,
      message: '加载中',
      duration: 0,
    });
    forEach(({ id }) => {
      allPriceAsync.push(request({
        api: 'preferential/getPrice.htm',
        data: { detailId: id },
      }));
    }, items);
    Promise.all(allPriceAsync).then((payload: any) => {
      stores.dispatch({ type: 'CHANGE_PREFERENCE_ITEM_PRICE', payload });
      Toast.clear();
    }).catch(() => {
      Toast.fail('获取商品提货价失败');
    });
  }

  onLoad() {
    this.list = this.items;
    if (!this.isGetPrice) {
      this.getAllPriceBuck(this.items)
    }
  }
}
