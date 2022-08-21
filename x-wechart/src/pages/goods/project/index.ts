import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { Weapp } from 'definitions/weapp';
import { map } from 'ramda';
import { takeProjectOrder,getStocks } from '@/store/actions/order';
import { request } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import PayConfirm from '@/components/pay-confirm/index';
import OrderInfo from '@/components/order/index';
import utilsWxs from '../../../wxs/utils.wxs';

interface Data {
  rebateCheckBox: boolean;
  extend: boolean;
  totalVolume:String;
  pageType: string;
}

@connect({
  order({ order }) {
    return order.projectOrder;
  },
  orderTotalVolume({ order }) {
    return order.loadVolume;
  },
}, {
  takeProjectOrder,
  getStocks
})
export default class OrderProject extends wepy.page {
  config = {
    navigationBarTitleText: '工程单确认',
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
  projectId = '';
  attrActionType = '';
  data: Data = {
    rebateCheckBox: true,
    extend: true,
    totalVolume:'0.00',
    pageType:'engineeringArea'
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
        wx.navigateTo({ url: '/pages/goods/project-items/index' });
      } else {
        Toast('当前工程单下暂无商品');
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
    const { profitParam, sapRebateAccountParam, projectApplyCodeParam, itemsSelected, items } = this.order;
    const { trans, billTo, address1, contact, mobile, orderCode, maxEndDate, endDate, address3, address4, address7, district, isAllowAdvancdeliver, salesShopInfoId, shopLists, serviceTypeCodes, officeId, salesTypeItem} = this.$invoke('order', 'getParams');

    // data.orderRebate = this.rebateCheckBox ? 'Y' : 'N';
    Toast.loading({
      forbidClick: true,
      message: '订单处理中',
      duration: 0,
    });
    // count:[{"id":"14170055645","count":"1"},{"id":"14170055646","count":"1"},{}]  //订单明细id和数
    // orderRebate:Y //是否使用返利
    // profit:0//返利比例
    // sapRebateAccount:0.0 // sapRebateAccount
    // id:14170055642
    // transValue:502001 //配送方式默认值
    // projectApplyCode:PR201908270000 //带出的
    // billToId:22565079 //开票户头
    // shipToId:23090839 //请选择收货地址
    // deliveryTypeId:502001 //配送方式
    // countyId:370202000000 //区县
    // address:
    // contact:张春义
    // contactPhone:13561830626
    // purchaseCode:1213
    // maxEndDate:2019-09-28
    // endDate:2019-09-28
    // 选择的商品
    const count = map(({ product_id, count }) => ({ id: product_id, count }), items);
    if (itemsSelected.length === 0) {
      Toast('请至少选择一个商品');
      return;
    }
    // 工程单参数
    const params: any = {
      id: this.projectId,
      count: JSON.stringify(count),
      profit: profitParam, // 返利比例
      sapRebateAccount: sapRebateAccountParam,
      projectApplyCode: projectApplyCodeParam,
      transValue: trans, // 默认配送方式
      billToId: billTo, // 开户票头
      shipToId: address1, // 收货地址
      deliveryTypeId: trans, // 配送方式
      contact,
      contactPhone: mobile,
      purchaseCode: orderCode,
      maxEndDate,
      endDate,
      orderRebate: this.rebateCheckBox ? 'Y' : 'N',
      salesShopInfoId:salesShopInfoId,
      serviceTypeCodes:serviceTypeCodes,
      officeId,
    };
    if (district) {
      params.countyId = district;
      params.address = address3;
    }
    if (trans == 502005 ) {
      params.fxShipToAddress = address4; // 分销商地址
      params.fxShipToId = address7;
    }
    if(isAllowAdvancdeliver) {
      params.isAllowAdvancdeliver = isAllowAdvancdeliver
    }
    if(shopLists){
      params.ifDistributionSales = shopLists.ifDistributorShop // 是否分销销售(工程订单直配到用户时选择的下拉地址是否是分销商门店 "1":是，"0":否)
      params.fxShipToId = shopLists.customerInfoId
    }
    // 直配到用户，销售类型传参
    if(trans === 502004){
      params.projectSalesTypeId = salesTypeItem.id;
    }
    request({
      api: 'engineering/saveEngineerOrder.nd',
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
            url: `/pages/goods/order-result/index?type=fail&errorMsg=${res.data.msg || res.data.error || '系统错误'}`,
          });
        }
      },
    });
  }
  onLoad({ id }: any) {
    this.projectId = id;
    Toast.loading({
      forbidClick: true,
      message: '加载中',
      duration: 0,
    });
    this.methods.takeProjectOrder({ id }, () => {
      Toast.clear();
    }).then((res)=>{
      console.log(res)
       //产品数量是否>0
      let productCodeArr = [];
      let orgIdArr = [];
      if(res.payload.epProjectInfo.epInfoDetail && res.payload.epProjectInfo.epInfoDetail.length > 0){
        for(const key in res.payload.epProjectInfo.epInfoDetail) {
          productCodeArr.push(res.payload.epProjectInfo.epInfoDetail[key].product_id)
          orgIdArr.push(res.payload.orgId)
        }
      }else{
        return
      }

      //请求库存
      let data = {
        orgId: orgIdArr.join(','),//组织id
        code: productCodeArr.join(','),//产品编码
        queryType: 'purchase'//库存查询类型 海信采购
      }

      // this.methods.getStocks(data).then(res => {
      //   console.log(res)
      //   let totalVolume = 0;
      //   if(res && res.length > 0){
      //     for(const key in res) {
      //       totalVolume += res[key].loadVolume
      //     }
      //   }
      //   this.totalVolume = totalVolume
      //   this.$apply()
      // })
    });
  }
}
