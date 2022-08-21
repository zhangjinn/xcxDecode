import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { Weapp } from 'definitions/weapp';
import { map, split, head, last } from 'ramda';
import { takePreference,getStocks } from '@/store/actions/order';
import { request } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import OrderInfo from '@/components/order/index';
import PayConfirm from '@/components/pay-confirm/index';
import utilsWxs from '../../../wxs/utils.wxs';

interface Data {
  rebateCheckBox: boolean;
  extend: boolean;
  totalVolume:String;
}

@connect({
  order({ order }) {
    return order.preferenceOrder;
  },
}, {
  takePreference,
})
export default class Preference extends wepy.page {
  config = {
    navigationBarTitleText: '特惠单确认',
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
      'calendar': '../../../components/calendar/index',
      'van-submit-bar': '../../../components/vant/submit-bar/index',
    },
  };
  components = {
    order: OrderInfo,
    payconfrim: PayConfirm,
  };
  orderId = '';
  ids = '';
  attrActionType = '';
  data: Data = {
    rebateCheckBox: true,
    extend: true,
    totalVolume:'0.00'
  };
  wxs = {
    utils: utilsWxs,
  };
  methods = {
    toggleExtend() {
      this.extend = !this.extend;
    },
    onBateChange(event: Weapp.Event) {
      this.rebateCheckBox = event.detail;
    },
    chooseItems() {
      if (this.order.items.length > 0) {
        wx.navigateTo({ url: '/pages/goods/preference-items/index' });
      } else {
        Toast('当前特惠单下暂无商品');
      }
    },
    async confirmSaveOrder() {
      const isValidate = await this.$invoke('order', 'checkParams');
      const { totalPrice, canUseMoney } = this.order;
      if (totalPrice > canUseMoney) {
        Toast('账户余额不足');
        return;
      }
      if (isValidate) {
        const { totalPrice } = this.order;
        this.$invoke('payconfrim', 'show', totalPrice, () => {
          this.saveOrder();
        });
      }
    },

  };
  saveOrder() {
    const { basic, itemsSelected, items } = this.order;
    const { trans, billTo, address1, contact, mobile, orderCode, maxEndDate, endDate, address3, address4, address7, district, toAddress, isAllowAdvancdeliver,salesShopInfoId,serviceTypeCodes,officeId } = this.$invoke('order', 'getParams');
    Toast.loading({
      forbidClick: true,
      message: '订单处理中',
      duration: 0,
    });
    // 选择的商品
    const plList = map(({ id, num }) => ({ id, count: num }), items);
    if (itemsSelected.length === 0) {
      Toast('请至少选择一个商品');
      return;
    }
    // 工程单参数
    const params: any = {
      id: basic.id,
      plList,
      trans, // 配送方式
      billToId: billTo, // 开户票头
      address1, // 收货地址
      contacts: contact,
      contactMobile: mobile,
      purchaseCode: orderCode,
      maxEndDate,
      endDate,
      salesShopInfoId,
      serviceTypeCodes
    };
    // 直送地址
    if (district) {
      params.provice = toAddress.proviceId;
      params.city = toAddress.cityId;
      params.district = toAddress.areaId;
      params.address3 = address3;
    }
    // 直配到分销商
    if (address4) {
      params.address4 = address4;
      params.address7 = address7;
    }
    // 如果是商品维度
    if (this.ids) {
      params.orgMatkl = basic.orgMatkl;
    }
    if(isAllowAdvancdeliver) {
      params.isAllowAdvancdeliver = isAllowAdvancdeliver;
    }
    if(officeId){ // 海信办事处
      params.officeId = officeId
    }
    request({
      api: this.orderId ? 'preferential/savePreferential.nd' : 'preferential/saveProduct.nd',
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      data: params,
      callback: (res: any) => {
        Toast.clear();
        if (res.data && res.data.orderCode) {
          wx.navigateTo({
            url: `/pages/goods/order-result/index?type=success&orderNum=${res.data.orderCode}`,
          });
        } else {
          wx.navigateTo({
            url: `/pages/goods/order-result/index?type=fail&errorMsg=${res.data.msg || res.data.error || '系统错误'}`,
          });
        }
      },
    });
  }
  onLoad({ mainId, arr }: any) {
    this.orderId = mainId;
    this.ids = arr;
    // mainId=14170158568 ids=14170158583,14170158584,14170158585
    Toast.loading({
      forbidClick: true,
      message: '加载中',
      duration: 0,
    });
    if (mainId) {
      this.methods.takePreference({ mainId }, () => {
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
          return;
        }
        let productCodeArr = [];
          let orgIdArr = [];
          //产品数量是否>0
          if(this.order.itemsSelected && this.order.itemsSelected.length > 0){
            for(const key in this.order.itemsSelected) {
              let num = this.order.itemsSelected[key].num
              for (let i = 0; i < num; i++) {
                productCodeArr.push(this.order.itemsSelected[key].productId)
                orgIdArr.push(res.payload.detail.fwOrgId)

              }
            }
          }else{
            return
          }
          //请求库存
          // let data = {
          //   orgId: orgIdArr.join(','),//组织id
          //   code: [...productCodeArr].join(','),//产品编码
          //   queryType: 'purchase'//库存查询类型 海信采购
          // }
          // this.methods.getStocks(data).then(res => {
          //   let totalVolume = 0;
          //   if(res && res.length > 0){
          //     for(const key in res) {
          //       totalVolume += res[key].loadVolume
          //     }
          //   }
          //   this.totalVolume = Math.round(totalVolume * 100) / 100;
          //   this.$apply()
          // })
      });
    } else if (arr) {
      const itemsArr = split(':', arr);
      const id = head(itemsArr);
      const counts = last(itemsArr);
      this.methods.takePreference({ ids: id, counts }, () => {
        Toast.clear();
      }).then((res) => {
        console.log(this.order.itemsSelected)

        if (res && res.payload && res.payload.code === 400) {
          Toast.fail({
            message: res.payload.msg || '请联系分公司维护海信账户主数据后，获取下单权限！',
            duration: 3000,
            onClose: () => {
              wx.navigateBack();
            }
          })
          return
        }
          let productCodeArr = [];
          let orgIdArr = [];
          //产品数量是否>0
          if(this.order.itemsSelected && this.order.itemsSelected.length > 0){
            for(const key in this.order.itemsSelected) {
              let num = this.order.itemsSelected[key].num
              for (let i = 0; i < num; i++) {
                productCodeArr.push(this.order.itemsSelected[key].productId)
                orgIdArr.push(res.payload.detail.fwOrgId)

              }
            }
          }else{
            return
          }
          //请求库存

          // let data = {
          //   orgId: orgIdArr.join(','),//组织id
          //   code: productCodeArr.join(','),//产品编码
          //   queryType: 'purchase'//库存查询类型 海信采购
          // }

          // this.methods.getStocks(data).then(res => {
          //   console.log(res)
          //   let totalVolume = 0;
          //   if(res && res.length > 0){
          //     for(const key in res) {
          //       totalVolume += res[key].loadVolume
          //     }
          //   }
          //   this.totalVolume = Math.round(totalVolume * 100) / 100
          //   this.$apply()
          // })
      });
    }
  }
}
