import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { Weapp } from 'definitions/weapp';
import { map, join } from 'ramda';
import { takeCommonOrder,cartOrderWeek,moneyByWeek,getWaitBalanceInfoList } from '@/store/actions/order';
import { request } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import OrderInfo from '@/components/order/index';
import PayConfirm from '@/components/pay-confirm/index';
import utilsWxs from '../../../wxs/utils.wxs';

interface Data {
  showPolicyMore: boolean;
  rebateCheckBox: boolean;
  waitBalanceListShow: false;
  order:object;
  isNoticePopupShow:boolean,
  inventoryPopupShow:boolean,
  inventoryPopupText:object,
}

@connect({
  order({ order }) {
    return order.commonOrder;
  },
  orderCommon({ order }) {
    return order.common;
  },
  waitBalanceList({order}) {
    return order.waitBalanceList;
  }
}, {
  takeCommonOrder,
  cartOrderWeek,
  moneyByWeek,
  getWaitBalanceInfoList
})
export default class OrderCommon extends wepy.page {
  config = {
    navigationBarTitleText: '确认订单',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-button': '../../../components/vant/button/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-search': '../../../components/vant/search/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      'van-checkbox': '../../../components/vant/checkbox/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-submit-bar': '../../../components/vant/submit-bar/index',
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index',
    },
  };
  type = 'common';
  components = {
    order: OrderInfo,
    payconfrim: PayConfirm,
  };
  attrActionType = '';
  data: Data = {
    showPolicyMore: false,
    rebateCheckBox: true,
    weekShow: false,
    purchaseType: '',
    waitBalanceListShow: false,
    order:{},
    totalVolume:'0.00',
    isNoticePopupShow:false,
    expressFee: wepy.$instance.globalData.expressFee,
    inventoryPopupShow: false,
    inventoryPopupText: {
      desc:'',
      tip:''
    },
  };
  wxs = {
    utils: utilsWxs,
  };

  events = {
    'weekchange': (payload: any) => {
      console.log(payload)
      this.order.balanceAccount = payload.balanceAccount;
      this.order.waitMoney = payload.waitMoney;
      this.order.canUseMoney = payload.canUseMoney;
    },

  }

  methods = {
    //提示框
    noticePopupOpen:() => {
      this.isNoticePopupShow = true;
    },
    noticePopupClose:() => {
      this.isNoticePopupShow = false;
    },
    closeWaitBalancePop(){
      this.waitBalanceListShow = false;
    },
    togglePolicy() {
      this.showPolicyMore = !this.showPolicyMore;
    },
    onBateChange() {
      this.rebateCheckBox = !this.rebateCheckBox;
    },
    async confirmSaveOrder() {
      const { totalMoney, canUseMoney, rebate, balanceAccount } = this.order;
      const { purchaseType, isPujie, advancePayRate } = this.orderCommon;
      if(!purchaseType){
        Toast('采购类型不能为空，请联系管理员');
        return;
      }
      //常规订单(非铺借商家)提交时，检查余额规则=账户可用余额-预交款＞＝0，才允许提交
      if( purchaseType==2 && !isPujie ) {
        if (canUseMoney - totalMoney * advancePayRate / 100 < 0) {
          Toast('账户余额不足');
          return;
        }
      }else{
        //应急订单或者常规订单（铺借商家）
        if (this.rebateCheckBox) {
          if (totalMoney > canUseMoney + rebate) {
            Toast('账户余额不足');
            return;
          }
        } else {
          if (totalMoney > canUseMoney) {
            Toast('账户余额不足');
            return;
          }
        }
      }

      const isValidate = await this.$invoke('order', 'checkParams');
      if (isValidate) {
        let showtotalMoney = 0;
        const { totalMoney } = this.order;
        showtotalMoney = totalMoney;
        // “常规订单”且商家类型不是“铺借商家”时，需要显示预交款
        if(purchaseType==='2' && isPujie == false){
          showtotalMoney = totalMoney*advancePayRate/100;
        }
        this.$invoke('payconfrim', 'show', showtotalMoney, () => {
          this.saveOrder();
        });
      }
    },

    /*查看预占用额度明细*/
    openWatiBalancePopup() {
      const { orgId, matklId, purchaseType } = this.orderCommon;
      const week = this.$invoke('order', 'getWeekName');
      //N+4(2020/08/24-2020/08/30)
      let name = week.name;
      //let weekName = name.split("/")[1]+''+name.split("/")[3];
      this.methods.getWaitBalanceInfoList({ orgId: orgId, matklId: matklId, weekName: name, purchaseType });
      this.waitBalanceListShow = true;
    },

    //删除政策
    delPolicy(item: any){
      for(var key in this.order.items){
        if(item.specialPriceVcode === this.order.items[key].specialPriceVcode){
          this.order.items[key].policyName = '';
          this.order.items[key].specialPriceVcode = '';
          this.order.versions = '';
        }
      }
    },

    // 关闭代理商 应急下单 关联库存周转对应流程调整提示弹框
    onInventoryConfirm(){
      this.inventoryPopupShow = false
    }
  };
  saveOrder() {
    const data = this.$invoke('order', 'getParams');
    data.orderRebate = this.rebateCheckBox ? 'Y' : 'N';
    Toast.loading({
      forbidClick: true,
      message: '订单处理中',
      duration: 0,
    });
    console.log(data);
    let api = 'cart/saveOrder.nd';
    if (this.type === 'again') {
      api = 'cart/saveAnotherOrder.nd';
      if(this.order.orderId) {
        data.orderId = this.order.orderId;
      }
      data.products = join(',', map(({ productId }: any) => productId, this.order.items));
      data.productNumbers = join(',', map(({ quantity }: any) => quantity, this.order.items));
      data.versions = this.order.versions
    }
    //订单类型
    data.purchaseType = this.purchaseType;

    request({
      api,
      method: 'POST',
      data,
      callback: (res: any) => {
        Toast.clear();
        if (res.data && res.data.b2bOrderCode) {
          wx.navigateTo({
            url: `/pages/goods/order-result/index?type=success&orderNum=${res.data.b2bOrderCode}`,
          });
        } else {
          if(res.data.frontMsg){
            if(res.data.frontMsg.msgDesc){
              this.inventoryPopupText.desc= res.data.frontMsg.msgDesc.replace(/;/g, '\n').replace(/；/g, '\n')
            }
            if(res.data.frontMsg.tip){
              this.inventoryPopupText.tip= res.data.frontMsg.tip
            }
            this.inventoryPopupShow = true
            this.$apply()
          }else{
            wx.navigateTo({
              url: `/pages/goods/order-result/index?type=fail&errorMsg=${res.data.msg || res.data.error || '系统错误'}`,
            });
          }
        }
      },
    });
  }
  onLoad({ type,totalVolume }: any) {
    // 订单列表: 普通单和再来一单
    if (type) {
      this.type = type;
    }
    this.totalVolume = totalVolume;
    const { purchaseType } = this.orderCommon;
    this.purchaseType = purchaseType;
  }
}
