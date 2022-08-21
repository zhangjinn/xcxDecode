import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { Weapp } from 'definitions/weapp';
import { buyOutOrder } from '@/store/actions/order';
import { request } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import PayConfirm from '@/components/pay-confirm/index';
import OrderInfo from '@/components/order/index';
import utilsWxs from '../../../wxs/utils.wxs';

interface Data {
  rebateCheckBox: boolean;
  extend: boolean;
}

@connect({
  order({ order }) {
    return order.buyOutOrder;
  },
}, {
  buyOutOrder,
})

export default class OrderBuyOut extends wepy.page {
  config = {
    navigationBarTitleText: '套购单确认',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-button': '../../../components/vant/button/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-search': '../../../components/vant/search/index',
      'van-dialog': '../../../components/vant/dialog/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      'van-checkbox': '../../../components/vant/checkbox/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-submit-bar': '../../../components/vant/submit-bar/index',
      'calendar': '../../../components/calendar/index',
    },
  };
  components = {
    order: OrderInfo,
    payconfrim: PayConfirm,
  };
  buyoutId = '';
  attrActionType = '';
  data: Data = {
    rebateCheckBox: true,
    extend: true,
  };
  wxs = {
    utils: utilsWxs,
  };
  methods = {
    toggleExtend() {
      this.extend = !this.extend;
    },
    onBateChange() {
      this.rebateCheckBox = !this.rebateCheckBox;
    },
    chooseItems() {
      if (this.order.items.length > 0) {
        wx.navigateTo({ url: '/pages/goods/buy-out-items/index' });
      } else {
        Toast('当前套购单下暂无商品');
      }
    },
    async confirmSaveOrder() {
      const { totalPrice, canUseMoney, totalRebate, rebate } = this.order;
      if (this.rebateCheckBox) {
        let balance = totalRebate || rebate
        if (totalPrice > canUseMoney + balance) {
          Toast('账户余额不足');
          return;
        }
      } else {
        if (totalPrice > canUseMoney) {
          Toast('账户余额不足');
          return;
        }
      }

      const isValidate = await this.$invoke('order', 'checkParams');
      if (isValidate) {
        const { totalPrice } = this.order;
        this.$invoke('payconfrim', 'show', totalPrice, () => {
          this.saveOrder();
        });
      }
    },

  };
  saveOrder() {
    const { rebate, rebateAccount, totalNum } = this.order;
    const { trans, billTo, address1, contact, mobile, orderCode, maxEndDate, endDate, address3, address4, address7, district, isAllowAdvancdeliver, salesShopInfoId, serviceTypeCodes, officeId } = this.$invoke('order', 'getParams');
    Toast.loading({
      forbidClick: true,
      message: '订单处理中',
      duration: 0,
    });

    if (totalNum === 0) {
      Toast('请输入选购套数');
      return;
    }
    // 套购单参数
    const params: any = {
      id: this.buyoutId,
      num: totalNum,  // 总套数
      trans, // 配送方式
      billTo, // 开户票头
      address1, // 收货地址
      contact,
      mobile,
      orderCode,
      maxEndDate,
      endDate,
      rebateAccount,
      rebateValue: rebate,
      orderRebate: this.rebateCheckBox ? 'Y' : 'N',
      salesShopInfoId,
      serviceTypeCodes,
      officeId,
    };
    // 直配到用户
    if (district) {
      params.district = district;
      params.address3 = address3;
    }
    // 直配到分销商
    if (address4) {
      params.address4 = address4;
      params.address7 = address7;
    }
    if(isAllowAdvancdeliver) {
      params.isAllowAdvancdeliver = isAllowAdvancdeliver;
    }
    // POST /packageActivity/saveOrder.nd
    request({
      api: 'packageActivity/saveOrder.nd',
      method: 'POST',
      data: params,
      callback: (res: any) => {
        Toast.clear();
        if (res.data && res.data.b2bOrderCode) {
          wx.navigateTo({
            url: `/pages/goods/order-result/index?type=success&orderNum=${res.data.b2bOrderCode}`,
          });
        } else {
          wx.navigateTo({
            url: `/pages/goods/order-result/index?type=fail&errorMsg=${res.data.msg || res.data.error}`,
          });
        }
      },
    });
  }
  onLoad({ id }: any) {
    this.buyoutId = id;
    Toast.loading({
      forbidClick: true,
      message: '加载中',
      duration: 0,
    });
    this.methods.buyOutOrder({ id }, () => {
      Toast.clear();
    }).then((res) => {
      if (res && res.payload && res.payload.code === 400) {
        Toast.fail({
          message: res.payload.msg || '请联系分公司维护海信账户主数据后，获取下单权限！',
          duration: 3000,
          onClose: () => {
            wx.navigateBack();
          }
        })
      }
    });
  }
}
