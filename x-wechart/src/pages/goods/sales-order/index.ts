import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { getSalesOrderInfo } from '@/store/actions/order';
import { request } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import PayConfirm from '@/components/pay-confirm/index';
import utilsWxs from '../../../wxs/utils.wxs';
import { formatDate, getDateDiff, fillZero } from '@/utils/index';
import { split, findIndex,forEach } from 'ramda';
interface Data {
  showPolicyMore: boolean;
  rebateCheckBox: boolean;
  products: string;
  productNumbers: string;
  orgCode: string;
  matklCode: string;
  userActId: string;
  payName: string;
  payStatus: boolean;
  payMethods: string;
}

@connect({
  order({ order }) {
    return order.commonOrder;
  },
  common({ order }) {
    return order.common;
  },
}, {
  getSalesOrderInfo
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
    payconfrim: PayConfirm,
  };
  attrActionType = '';
  data: Data = {
    billShow: false,
    policyVisible: false,
    currentPolicyProductId: '',
    policyArr: [],
    versions: [],
    day: '',
    calendarShow: false,
    showPolicyMore: false,
    rebateCheckBox: true,
    contactInfo: '',
    address: '',
    contact: '',
    cisAddressId: '',
    customerName: '',
    products: '',
    productNumbers: '',
    orgCode: '',
    customerPurchase: '',
    matklCode: '',
    userActId: '',
    payName: '提交订单',
    payStatus: true,
    payMethods: 'confirmSaveOrder',
    calendarConfig: { theme: 'elegant', onlyShowCurrentMonth: false },
    activityNum:'',
    userActivityCode:''
  };
  wxs = {
    utils: utilsWxs,
  };

  findItem = (items: Array<any>, productId: any) => {
    return items.find(item => `${item.productId}` === `${productId}`)
  }

  findPolicy = (policies: Array<any>, id: any) => {
    return policies.find(item => `${item.id}` === `${id}`)
  }

  methods = {
    openChoosePolicy: (productId: any) => {
      this.currentPolicyProductId = productId
      const chooseItem = this.findItem(this.order.items, productId)
      const policyArr = this.common.policies[productId]
      policyArr.forEach((policy) => policy.disabled = chooseItem.quantity > policy.canQuantity)
      this.policyArr = policyArr
      this.policyVisible = true
    },
    closePolicy: () => {
      this.policyVisible = false
      this.policyArr = []
      this.currentPolicyProductId = ''
    },
    choosePolicy: ({ id }: any) => {
      const item = this.findItem(this.order.items, this.currentPolicyProductId)

      // 想选中的
      const choosePolicy = this.findPolicy(this.policyArr, id)

      // 以前选中的
      const preChoosePolicy = item.policy || { price: item.price }

      const index = this.products.split(',').findIndex(it => it === `${this.currentPolicyProductId}` || it === this.currentPolicyProductId)

      if (choosePolicy.checked) {
        delete item.policy
        this.versions[index] = ''
        choosePolicy.checked = false
        this.methods.updateTotalMoney(choosePolicy.price * item.quantity, item.price * item.quantity)
      } else {
        item.policy = choosePolicy
        preChoosePolicy.checked = false
        choosePolicy.checked = true
        this.versions[index] = id
        this.methods.updateTotalMoney(preChoosePolicy.price * item.quantity, choosePolicy.price * item.quantity)
      }
      this.policyVisible = false
    },
    updateTotalMoney: (oldPrice, newPrice: number) => {
      this.order.totalMoney = this.order.totalMoney - oldPrice + newPrice
    },
    // 选择日期
    openCalendar() {
      const { deadMaxDate, deadMinDate } = this.common;
      if (deadMaxDate && deadMinDate) {
        const now = formatDate('', 'Y-M-D');
        const minDate = getDateDiff(now, deadMinDate) ? now : deadMinDate;
        this.$wxpage.calendar.enableArea([minDate, deadMaxDate]);
        if (!this.day) {
          const dates = split('-', deadMaxDate);
          this.$wxpage.calendar.jump(dates[0], parseInt(dates[1], 10), parseInt(dates[2], 10));
        }
      }
      this.calendarShow = true;
    },
    closeCalendar() {
      this.calendarShow = false;
    },
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      this.day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.calendarShow = false;
    },
    // 开票户头
    openBill() {
      this.billShow = true;
    },
    closeBill() {
      this.billShow = false;
    },
    chooseBill(item: any) {
      if (item.id !== this.common.bill.id) {
        this.common.bill = item;
      }
      this.billShow = false;
    },
    togglePolicy() {
      this.showPolicyMore = !this.showPolicyMore;
    },
    onBateChange() {
      this.rebateCheckBox = !this.rebateCheckBox;
    },
    onPayChange() {
      this.payStatus = !this.payStatus
      this.payName = this.payStatus ? '提交订单': '支付'
      this.payMethods = this.payStatus ? 'confirmSaveOrder': 'confirmWxPay'
      this.$apply()
    },
    confirmSaveOrder() {
      const { totalMoney, canUseMoney, rebate, items } = this.order;
      const Item: any = []
      forEach((item: any)=> {
        if(item.price == null || item.price < 0) {
          Item.push(item.productName)
        }
      },items)
      if(Item && Item.length > 0) {
        const name = Item.join(',')
        Toast(`${name}未维护价格`)
        return
      }
      if (this.rebateCheckBox) { //选中
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

      if (this.day == '' && this.common.deadMaxDate == '' ) {
        Toast.fail('请选择有效日期')
        return
      }
      // const isValidate = this.$invoke('order', 'checkParams');
      if (true) {
        const { totalMoney } = this.order;
        this.$invoke('payconfrim', 'show', totalMoney, () => {
            this.saveOrder();
        });
      }
    },
    confirmWxPay() {
      const { items } = this.order;
      const Item: any = []
      forEach((item: any)=> {
        if(item.price == null || item.price < 0) {
          Item.push(item.productName)
        }
      },items)
      if(Item && Item.length > 0) {
        const name = Item.join(',')
        Toast(`${name}未维护价格`)
        return
      }
      if (this.day == '' && this.common.deadMaxDate == '' ) {
        Toast.fail('请选择有效日期')
        return
      }
      this.wxPay();
    },
  };
  // 微信支付
  wxPay() {
    let openId = wepy.$instance.globalData.openid
    if (!openId) {
      wx.login({
        success: (wxRes: any) => {
          if (wxRes.code) {
            request({
              api: `queryCodeInfo.nd?code=${wxRes.code}`,
              callback: (res: any) => {
                const { data: { openid } } = res
                if(openid) {
                  openId = openid
                } else {
                  Toast.fail('获取code失败');
                }
              },
            });
          }
        },
        fail: () => {
          Toast.fail('获取code失败');
        },
      });
    }
    let item = {
      orderType: 'ZG',
      address1: this.common.receiver.id,
      orderRebate: this.rebateCheckBox ? 'Y' : 'N',
      openId: openId,
      payType: 'WX',
      billTo: this.common.bill.id,
      products: this.products,
      productNumbers: this.productNumbers,
      versions: this.versions.join(','), // 政策
      address4: this.cisAddressId, // 分销商地址
      contact: this.contact,
      mobile: this.contactInfo,
      endDate: this.day == '' ? this.common.deadMaxDate : this.day,
      maxEndDate: this.common.deadMaxDate,
      orgAndGroup: this.common.orgAndGroup,
      orderCode: this.customerPurchase,
      trans: 502005,
    }
    Toast.loading({
      forbidClick: true,
      message: '订单处理中',
      duration: 0,
    });
    let api = 'cart/saveAnotherOrder.nd';
    request({
      api,
      method: 'POST',
      data: item,
      callback: (res: any) => {
        Toast.clear();
        const { data } = res
        const {payInfo } = data
        if (payInfo) {
          const { payInfo: { timeStamp,nonceStr ,paySign ,signType}} = data
          wx.requestPayment({
            timeStamp: timeStamp.toString(),
            nonceStr: nonceStr,
            package: data.payInfo.package,
            signType: signType,
            paySign: paySign,
            success: () => {
              wx.navigateTo({
                url: `/pages/goods/order-result/index?type=success&orderNum=${data.b2bOrderCode}&sales=salesOrder`,
              });
            },
            fail: () => {
              const errMsg = '订单支付失败'
              wx.navigateTo({
                url: `/pages/goods/order-result/index?&sales=salesOrder&type=fail&errorMsg=${ errMsg || res.data.error || '系统错误'}`,
              });
            }
          })
        } else {
          wx.navigateTo({
            url: `/pages/goods/order-result/index?&sales=salesOrder&type=fail&errorMsg=${data.msg || data.error || '系统错误'}`,
          });
        }
      },
    });
  }
  // 余额付款
  saveOrder() {
    // TODO:
    let openId = wepy.$instance.globalData.openid
    if (!openId) {
      wx.login({
        success: (wxRes: any) => {
          if (wxRes.code) {
            request({
              api: `queryCodeInfo.nd?code=${wxRes.code}`,
              callback: (res: any) => {
                const { data: { openid } } = res
                if(openid) {
                  openId = openid
                } else {
                  Toast.fail('获取code失败');
                }
              },
            });
          }
        },
        fail: () => {
          Toast.fail('获取code失败');
        },
      });
    }
    let item = {
      orderType: 'ZG',
      address1: this.common.receiver.id,
      orderRebate: this.rebateCheckBox ? 'Y' : 'N',
      openId: openId,
      payType: '',
      billTo: this.common.bill.id,
      products: this.products,
      productNumbers: this.productNumbers,
      versions: this.versions.join(','), // 政策
      address4: this.cisAddressId, // 分销商地址
      contact: this.contact,
      mobile: this.contactInfo,
      endDate: this.day == '' ? this.common.deadMaxDate : this.day,
      maxEndDate: this.common.deadMaxDate,
      orgAndGroup: this.common.orgAndGroup,
      orderCode: this.customerPurchase,
      trans: 502005,
      activityNum:this.activityNum,
      userActivityCode:this.userActivityCode
    }
    Toast.loading({
      forbidClick: true,
      message: '订单处理中',
      duration: 0,
    });
    let api = 'cart/saveAnotherOrder.nd';
    request({
      api,
      method: 'POST',
      data: item,
      callback: (res: any) => {
        Toast.clear();
        if (res.data && res.data.b2bOrderCode) {
          wx.navigateTo({
            url: `/pages/goods/order-result/index?type=success&orderNum=${res.data.b2bOrderCode}&sales=salesOrder`,
          });
        } else {
          wx.navigateTo({
            url: `/pages/goods/order-result/index?&sales=salesOrder&type=fail&errorMsg=${res.data.msg || res.data.error || '系统错误'}`,
          });
        }
      },
    });
  }
  onLoad({ products, productNumbers, orgCode, matklCode,contactInfo, address ,contact, cisAddressId, customerName,customerCode,customerPurchase,activityNum,userActivityCode }: any) {
    if (products && productNumbers && orgCode && matklCode) {
      this.products = products
      this.productNumbers = productNumbers
      this.orgId = orgCode
      this.matklCode = matklCode
      this.versions = new Array(this.products.split(',').length)
      // ....
      this.customerPurchase = customerPurchase
      this.contactInfo = contactInfo
      this.address = address
      this.contact = contact
      this.cisAddressId = cisAddressId
      this.customerName = customerName
      this.activityNum = activityNum
      this.userActivityCode = userActivityCode
      this.$apply()
      this.methods.getSalesOrderInfo({
        products,
        productNumbers,
        orgId: orgCode,
        fxCisCode: customerCode,
        cisAddressId,
        matklCode,
        _loading: true
      }).then((res) => {
        if (res && res.payload && res.payload.code === 1) {
          Toast.fail({
            message: res.payload.msg || '当前订单失效',
            duration: 3000,
            onClose: () => {
              wx.navigateBack();
            }
          })
        }
      })
    }
  }
}
