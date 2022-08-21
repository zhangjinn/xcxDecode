import wepy, { Event } from 'wepy'
import { connect } from 'wepy-redux'
import { Weapp } from 'definitions/weapp'
import { map, join, includes, clone } from 'ramda'
import { takeActivityOrder, takeActivitySnapped } from '@/store/actions/order'
import { request } from '@/utils/request'
import Toast from '@/components/vant/toast/toast'
import OrderInfo from '@/components/order/index'
import OrderInfoZhuandan from '@/pages/components/order/index-zhuandan'
import OrderInfoHx from '@/pages/components/order/index-hx'
import PayConfirm from '@/components/pay-confirm/index'
import PayCapacityConfirm from '@/components/pay-capacity-confirm/index'
import utilsWxs from '../../../wxs/utils.wxs'
import { checkCombinationPurchase } from '@/utils/index';

@connect({
  order({ order }) {
    return order.commonOrder
  },
  mixinCurrentUser({ user }) {
    return user.info || {}
  }
}, {
  takeActivityOrder,
  takeActivitySnapped
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
      'van-stepper': '../../../components/vant/stepper/index'
    }
  }
  type = 'common'
  components = {
    order: OrderInfo,
    order2: OrderInfoHx,
    order3: OrderInfoZhuandan,
    payconfrim: PayConfirm,
    payCapacityConfirm: PayCapacityConfirm
  }
  attrActionType = ''
  data: { payMethods: string; orderType: string; orgName: string; prdIds: string; prdQty: null; tgQty: null; orgList: any[]; buyNums: string; userActId: string; orgId: string; orgSelShow: boolean; orgDict: {}; showPolicyMore: boolean; rebateCheckBox: boolean; payName: string; payStatus: boolean; packageNum: number; } = {
    showPolicyMore: false,
    rebateCheckBox: true,
    prdIds: '',
    buyNums: '',
    userActId: '',
    payName: '提交订单',
    payStatus: true,
    payMethods: 'confirmSaveOrder',
    orderType: '',
    prdQty: null,
    tgQty: null, //套数
    packageNum: 1,
    orgDict: {},
    orgList: [],
    orgId: '',
    orgName: '',
    orgSelShow: false,
  }
  wxs = {
    utils: utilsWxs
  }
  methods = {
    openSelShow: () => {
      this.orgSelShow = true
    },
    closeOrgSel: () => {
      this.orgSelShow = false
    },

    // 改变组织
    chooseOrg: (code, orgName) => {
      this.orgId = code
      this.orgName = orgName
      const buyNums = this.buyNums.split(',').map(it => it * this.packageNum).join(',')
      if(this.order.discountTypeName=='组合购'){
        buyNums = this.buyNums.split(',').map(() => 0 ).join(',')
      }
      this.methods.takeActivityOrder({
        prdIds: this.prdIds,
        buyNums,
        orgId: this.orgId,
        _loading: true
      }).then((res) => {
        if (res && res.payload && res.payload.code === 1) {
          Toast.fail({
            message: res.payload.msg || '当前订单失效',
            duration: 3000,
            onClose: () => {
              wx.navigateBack()
            }
          })
        }
      })
      this.orgSelShow = false
    },

    // // 直降、后返步进器改变时触发
    // onPackageNumChange: (evt) => {
    //   const { detail } = evt
    //   this.packageNum = detail
    //   let totalMoney = 0
    //   let totalNum = 0
    //   for (const key in this.order.items) {
    //     let deposit = this.order.items[key].price
    //     let quantity = this.order.items[key].quantity
    //     totalMoney += deposit * detail * quantity
    //     totalNum += detail * quantity
    //   }
    //   // totalMoney
    //   // totalNum
    //   this.order.totalMoney = totalMoney
    //   this.order.totalNum = totalNum
    //   this.$apply()
    // },
    invokeOrderGetParams: () => {
      if (this.orderType == 'activity') {
        return this.$invoke('order3', 'getParams')
      } else if (this.orderType == 'rengou') {
        return this.$invoke('order', 'getParams')
      } else {
        return this.$invoke('order2', 'getParams')
      }
    },
    invokeOrderCheckParams: async () => {
      if (this.orderType == 'activity') {
        return await this.$invoke('order3', 'checkParams')
      } else if (this.orderType == 'rengou') {
        return await this.$invoke('order', 'checkParams')
      } else {
        return await this.$invoke('order2', 'checkParams')
      }
    },
    togglePolicy() {
      this.showPolicyMore = !this.showPolicyMore
    },
    onBateChange() {
      this.rebateCheckBox = !this.rebateCheckBox
    },
    onPayChange() {
      this.payStatus = !this.payStatus
      this.payName = this.payStatus ? '提交订单' : '支付'
      this.payMethods = this.payStatus ? 'confirmSaveOrder' : 'confirmWxPay'
      this.$apply()
    },

    // 余额付款
    async confirmSaveOrder() {
      if(this.order.items[0].discountTypeId == '90605'&&!this.order.isPurchaseStandard){
        Toast('不符合组合购比例，请重新选择')
        return
      }

      const { totalMoney, canUseMoney, rebate } = this.order
      if (this.rebateCheckBox) { //选中
        if (totalMoney > canUseMoney + rebate) {
          Toast('账户余额不足')
          return
        }
      } else {
        if (totalMoney > canUseMoney) {
          Toast('账户余额不足')
          return
        }
      }

      const data = this.methods.invokeOrderGetParams()

      // 校验收货地址是否存在
      if (!data.address1) {
        Toast.fail('收货地址不能为空')
        return
      }
      if (data.maxEndDate == undefined || data.endDate == undefined) {
        Toast.fail('请选择有效日期')
        return
      }
      const isValidate = await this.methods.invokeOrderCheckParams()
      if (isValidate) {
        const { totalMoney } = this.order
        this.$invoke('payconfrim', 'show', totalMoney, () => {
          this.saveOrder()
        })
      }
    },

    // 微信付款
    confirmWxPay() {
      if(this.order.items[0].discountTypeId == '90605'&&!this.order.isPurchaseStandard){
        Toast('不符合组合购比例，请重新选择')
        return
      }

      const data = this.methods.invokeOrderGetParams()
      //校验收货地址是否存在
      if (!data.address1) {
        Toast.fail('收货地址不能为空')
        return
      }
      if (data.maxEndDate == undefined || data.endDate == undefined) {
        Toast.fail('请选择有效日期')
        return
      }
      // 判断分销商是否具有三证合一的执照 先不做
      // const {marketModels} = this.mixinCurrentUser
      // if (marketModels && marketModels.includes('17451')) {
      //   let capacity = true;
      //   // 判断是否有三证合一的资格
      //   if (capacity) {
      //     this.$invoke('payCapacityConfirm', 'show', (str: string) => {
      //       if (str === 'save') {
      //         //调用保存订单的接口
      //       }
      //     })
      //   }
      // }
      this.wxPay()
    },

    // 直降、后返步进器加减赋值
    onShippedBqtyChg(evt: Event) {
      const { detail } = evt
      this.prdQty = detail
      let totalMoney = 0
      for (const key in this.order.items) {
        let price = this.order.items[key].price
        totalMoney += price * this.prdQty
      }
      this.order.items[0].quantity = detail
      this.order.totalMoney = totalMoney
      this.order.totalNum = this.prdQty
      this.$apply()
    },

    //促销方式-》套购-》数量变化（套购步进器加减赋值）
    onStepTg(evt: Event) {
      const { detail } = evt
      this.tgQty = detail
      let totalMoney = 0;
      let totalNum = 0;
      for (const key in this.order.items) {
        let price = this.order.items[key].price * this.order.items[key].packageNum;
        //总金额
        totalMoney += price * this.tgQty;
        //总数量
        totalNum += this.tgQty * this.order.items[key].packageNum;
      }
      this.order.items[0].defaultNum = detail
      this.order.totalMoney = totalMoney
      this.order.totalNum = totalNum
      this.$apply()
    },

    // 组合购步进器加减赋值
    onCombinationPurchaseNumChange(e){

      const {dataset: { seriesindex, itemindex }} = e.currentTarget

      this.order.items[seriesindex].child[itemindex].quantity = Number(e.detail)

      let totalMoney = 0 // 所有组单价总和
      let totalNum = 0 // 所有组购买总数之和
      let totleBuyNum = 0 // 每组购买总数

      this.order.items[seriesindex].child.forEach((item)=>{
        totleBuyNum += item.quantity
      })
      this.order.items[seriesindex].totleBuyNum = totleBuyNum

      this.order.items.forEach((item)=>{
        totalNum += item.totleBuyNum
        item.child.forEach((i)=>{
          totalMoney += i.price * i.quantity
        })
      })

      this.order.totalMoney = totalMoney
      this.order.totalNum = totalNum
      this.order.isPurchaseStandard = checkCombinationPurchase(this.order.items)
    },

    // 组合购型号展开收起
    productFold(seriesindex){
      this.order.items[seriesindex].isFold = !this.order.items[seriesindex].isFold
    },

    // 组合购切换型号
    changeModel(e){
      const {dataset: { seriesindex, itemindex }} = e.currentTarget

      this.order.items[seriesindex].child.map((item)=>{
        item.isActive = false
        return item
      })
      this.order.items[seriesindex].child[itemindex].isActive = true
      this.order.items[seriesindex] = {
        ...this.order.items[seriesindex],
        ...this.order.items[seriesindex].child[itemindex],
      }
    },
  }

  // 下单时获取数量、认购id
  getOrderParameters(){
    let qty;
    let userActId = this.userActId;
    if(this.order.items[0].discountTypeId == '90603'){ //套购
      qty = [];
      for (const item of this.order.items) {
        qty.push(item.packageNum * this.order.items[0].defaultNum);
      }
      qty = qty.join(',')
    }else if(this.order.items[0].discountTypeId == '90605'){ // 组合购
      qty = [];
      userActId = [];
      this.order.items.forEach((item)=>{
        item.child.forEach((i)=>{
          qty.push(i.quantity)
          userActId.push(i.id)
        })
      })
      qty = qty.join(',')
      userActId = userActId.join(',')
    }else{
      //非套购
      qty = this.prdQty ? this.prdQty : this.order.items[0].quantity
    }
    return {
      qty,
      userActId
    }
  }

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
                if (openid) {
                  openId = openid
                } else {
                  Toast.fail('获取code失败')
                }
              }
            })
          }
        },
        fail: () => {
          Toast.fail('获取code失败')
        }
      })
    }
    const data = this.methods.invokeOrderGetParams()
    let item = {}
    data.orderRebate = this.rebateCheckBox ? 'Y' : 'N'
    Toast.loading({
      forbidClick: true,
      message: '订单处理中',
      duration: 0
    })
    let api = 'marketActivity/saveOrder.nd'
    if (this.userActId != '') {
      api = 'marketActivity/actToOrder.nd'

      let qty = this.getOrderParameters().qty;
      let userActId = this.getOrderParameters().userActId;

      item = {
        ...data,
        userActId: userActId, // 抢购单id
        actCode: this.order.actCode,
        payType: 'WX',
        orgId: this.orgId,
        openId,
        qty   //下单数量
      }
    } else {
      let prdIds = this.prdIds
      let buyNums = this.buyNums
      if(this.order.discountTypeName == '组合购'){
        let oPrdIds = []
        let oBuyNums = []
        this.order.items.forEach((item)=>{
          item.child.forEach((i)=>{
            if(i.quantity > 0){
              oPrdIds.push(i.id)
              oBuyNums.push(i.quantity)
            }
          })
        })
        prdIds = oPrdIds.toString()
        buyNums = oBuyNums.toString()
      }
      item = {
        ...data,
        prdIds, // 活动id
        buyNums,
        actCode: this.order.actCode,
        payType: 'WX',
        orgId: this.orgId,
        openId
      }
    }
    request({
      api,
      method: 'POST',
      data: item,
      callback: (res: any) => {
        Toast.clear()
        const { data } = res
        if (data && data.msg == 'success' && data.code == 0) {
          const { payInfo: { timeStamp, nonceStr, paySign, signType } } = data
          wx.requestPayment({
            timeStamp: timeStamp.toString(),
            nonceStr: nonceStr,
            package: data.payInfo.package,
            signType: signType,
            paySign: paySign,
            success: () => {
              wx.navigateTo({
                url: `/pages/goods/order-result/index?type=success&orderNum=${data.b2bOrderCode}&activity=order`
              })
            },
            fail: () => {
              const errMsg = '订单支付失败'
              wx.navigateTo({
                url: `/pages/goods/order-result/index?&activity=order&type=fail&errorMsg=${errMsg || res.data.error || '系统错误'}`
              })
            }
          })
        } else {
          wx.navigateTo({
            url: `/pages/goods/order-result/index?&activity=order&type=fail&errorMsg=${data.msg || data.error || '系统错误'}`
          })
        }
      }
    })
  }

  // 余额付款
  saveOrder() {
    const data = this.methods.invokeOrderGetParams()
    let item = {}
    data.orderRebate = this.rebateCheckBox ? 'Y' : 'N'
    Toast.loading({
      forbidClick: true,
      message: '订单处理中',
      duration: 0
    })
    let api = 'marketActivity/saveOrder.nd'


    if (this.userActId != '') {
      api = 'marketActivity/actToOrder.nd'

      let qty = this.getOrderParameters().qty;
      let userActId = this.getOrderParameters().userActId;

      item = {
        ...data,
        userActId, // 抢购单id
        actCode: this.order.actCode,
        qty   //下单数量
      }
    } else {
      let buyNums = this.buyNums.split(',').map(it => it * this.packageNum).join(',')
      let prdIds = this.prdIds

      if(this.order.items[0].discountTypeId == '90605'){
        let oPrdIds = []
        let oBuyNums = []
        this.order.items.forEach((item)=>{
          item.child.forEach((i)=>{
            if(i.quantity > 0){
              oPrdIds.push(i.id)
              oBuyNums.push(i.quantity)
            }
          })
        })
        prdIds = oPrdIds.toString()
        buyNums = oBuyNums.toString()
      }
      if(this.order.items[0].discountTypeId == '90603'){
        let oPrdIds = []
        let oBuyNums = []
        this.order.items.forEach((item)=>{
          oPrdIds.push(item.id)
          oBuyNums.push(item.packageNum * this.order.items[0].defaultNum)
        })
        prdIds = oPrdIds.toString()
        buyNums = oBuyNums.toString()
      }


      item = {
        ...data,
        prdIds, // 活动id
        buyNums,
        orgId: this.orgId,
        actCode: this.order.actCode
      }
    }
    request({
      api,
      method: 'POST',
      data: item,
      callback: (res: any) => {
        Toast.clear()
        if (res.data && res.data.b2bOrderCode) {
          wx.navigateTo({
            url: `/pages/goods/order-result/index?type=success&orderNum=${res.data.b2bOrderCode}&activity=order`
          })
        } else {
          wx.navigateTo({
            url: `/pages/goods/order-result/index?&activity=order&type=fail&errorMsg=${res.data.msg || res.data.error || '系统错误'}`
          })
        }
      }
    })
  }

  onLoad({ prdIds, buyNums, userActId, type, orgDict }: any) {
    if (orgDict) {
      try {
        this.orgDict = JSON.parse(orgDict)
        this.orgList = []
        for (let it in this.orgDict) {
          this.orgList = this.orgDict[it]
        }
      } catch {
        this.orgDict = {}
        this.orgList = []
      }
    }
    if (this.orgList[0]) {
      this.orgId = this.orgList[0].code
      this.orgName = this.orgList[0].name
    }
    if (prdIds && buyNums) {
      this.prdIds = prdIds
      this.buyNums = buyNums
      this.$apply()

      // 活动列表》抢购下单
      this.methods.takeActivityOrder({
        prdIds,
        buyNums,
        orgId: this.orgId,
        _loading: true
      }).then((res) => {
        if (res && res.payload && res.payload.code === 1) {
          Toast.fail({
            message: res.payload.msg || '当前订单失效',
            duration: 3000,
            onClose: () => {
              wx.navigateBack()
            }
          })
        }
        this.$apply()
      })
    } else if (userActId) {
      this.userActId = userActId
      this.$apply()

      // 我的抢单》代理商下单
      this.methods.takeActivitySnapped({
        userActId,
        _loading: true
      }).then((res) => {
        if (res && res.payload && res.payload.code === 1) {
          Toast.fail({
            message: res.payload.msg || '当前订单失效',
            duration: 3000,
            onClose: () => {
              wx.navigateBack()
            }
          })
        }
      })
    }
    if (type && type == 'rengou') {
      wx.setNavigationBarTitle({
        title: '确认认购'
      })
      this.orderType = 'rengou'
    } else if (type && type == 'activity') {
      wx.setNavigationBarTitle({
        title: '确认订单'
      })
      this.orderType = 'activity'
    } else {
      wx.setNavigationBarTitle({
        title: '海信采购去下单'
      })
      this.orderType = ''
    }
    this.$apply()
  }
}
