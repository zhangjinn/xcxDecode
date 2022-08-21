import wepy from 'wepy'
import { connect } from 'wepy-redux'
import { Weapp } from 'definitions/weapp'
import { map, join, includes } from 'ramda'
import { takeActivityOrder, takeActivitySnapped, takeActivityOrderRengou } from '@/store/actions/order'
import { request } from '@/utils/request'
import Toast from '@/components/vant/toast/toast'
import OrderInfo from '@/pages/components/order/index-market'
import PayConfirm from '@/components/pay-confirm/index'
import PayCapacityConfirm from '@/components/pay-capacity-confirm/index'
import utilsWxs from '../../../wxs/utils.wxs'
import { checkCombinationPurchase } from '@/utils/index';

interface Data {
  showPolicyMore: boolean;
  rebateCheckBox: boolean;
  prdIds: string;
  buyNums: string;
  userActId: string;
  payName: string;
  payStatus: boolean;
  payMethods: string;
  surePopShow: boolean;
  agreeStatus: boolean;
  isFenXiao: string
  payAgain: boolean;
  itemId: string;
  packageNum: number;
  orderCodeAgain: string;
  orgDict: any;
  orgId: string;
  orgName: string;
  orgSelShow: boolean;
  orgList: any;
  isRePay: boolean;
  order: any[];
  imgObj: object;
}

@connect({
  order({ order }) {
    return order.commonOrder
  },
  mixinCurrentUser({ user }) {
    return user.info || {}
  }
}, {
  takeActivityOrder,
  takeActivitySnapped,
  takeActivityOrderRengou
})
export default class OrderCommon extends wepy.page {
  config = {
    navigationBarTitleText: '确认认购',
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
      'van-stepper': '../../../components/vant/stepper/index',
      'img': '../../../components/img/index'
    }
  }
  type = 'common'
  components = {
    order: OrderInfo,
    payconfrim: PayConfirm,
    payCapacityConfirm: PayCapacityConfirm
  }
  attrActionType = ''
  data: Data = {
    showPolicyMore: false,
    rebateCheckBox: true,
    prdIds: '',
    buyNums: '',
    userActId: '',
    payName: '提交订单',
    payStatus: true,
    payMethods: 'confirmWxPay',
    surePopShow: false,
    agreeStatus: false,
    isFenXiao: '', // 目前取切换供应商时的返回的分销字段
    payAgain: false,
    itemId: '',
    orderCodeAgain: '',
    packageNum:1,
    orgDict:{},
    orgList:[],
    orgSelShow:false,
    orgId:'',
    orgName:'',
    // discountTypeName:'',
    isRePay: false,
    order: [],
    imgObj: {
      'nopay': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552736_a9dab37524ab4797a22f7834dfdfe498.png',
    },
  }
  wxs = {
    utils: utilsWxs
  }
  methods = {
    closeOrgSel:()=>{
      this.orgSelShow = false
    },
    chooseOrg:(code)=>{
      this.orgId = code
      this.orgName=this.orgList.find((item)=>item.code===code).name
      this.isFenXiao=this.orgList.find((item)=>item.code===code).desc
      this.orgSelShow = false
    },
    openOrg:()=>{
      this.orgSelShow = true
    },
    onPackageNumChange:(evt)=>{
      const { detail } = evt
      this.packageNum = detail
      let totalMoney = 0
      let totalNum = 0
      for (const key in this.order.items) {
        let deposit = this.order.items[key].deposit
        let quantity = this.order.items[key].quantity
        totalMoney += deposit * detail*quantity
        totalNum+=detail*quantity
      }
      // totalDeposit
      // totalNum
      this.order.totalDeposit = totalMoney
      this.order.totalNum = totalNum

      this.$apply()
    },
    openSurePop:()=> {
      this.surePopShow = true
    },
    closeSurePop:()=> {
      this.surePopShow = false
    },
    togglePolicy() {
      this.showPolicyMore = !this.showPolicyMore
    },
    onBateChange() {
      this.rebateCheckBox = !this.rebateCheckBox
    },
    onChange: (event) => {
      this.agreeStatus = event.detail
      this.$apply()
    },
    disAgree: () => {
      this.agreeStatus = false
      this.methods.closeSurePop()
      this.$apply()
    },
    agree: () => {
      this.agreeStatus = true
      this.methods.closeSurePop()
      this.methods.confirmWxPay()
      this.$apply()
    },
    onPayChange() {
      this.payStatus = !this.payStatus
      this.payName = this.payStatus ? '提交订单' : '支付'
      this.payMethods = this.payStatus ? 'confirmSaveOrder' : 'confirmWxPay'
      this.$apply()
    },
    confirmSaveOrder() {
      if(!this.isRePay && !this.orgName){
        return
      }

      if(this.order.discountTypeName == '组合购'&&!this.order.isPurchaseStandard ){
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

      const data = this.$invoke('order', 'getParams')

      // 校验收货地址是否存在
      if (!data.address1) {
        Toast.fail('收货地址不能为空')
        return
      }
      if (data.maxEndDate == undefined || data.endDate == undefined) {
        Toast.fail('请选择有效日期')
        return
      }
      const isValidate = this.$invoke('order', 'checkParams')
      if (isValidate) {
        const { totalMoney } = this.order
        this.$invoke('payconfrim', 'show', totalMoney, () => {
          this.saveOrder()
        })
      }
    },
    confirmWxPay:()=> {
      if(!this.isRePay && !this.orgName){
        return
      }

      if(this.order.discountTypeName == '组合购'&&!this.order.isPurchaseStandard ){
        Toast('不符合组合购比例，请重新选择')
        return
      }

      const data = this.$invoke('order', 'getParams')
      if (!this.agreeStatus&&this.order.totalDeposit>0&&this.isFenXiao=="Y") {
        Toast.fail('请先同意《转款到此代理商》协议!')
        this.methods.openSurePop()
        return
      }
      // const discountTypeName = this.order.items[0].discountTypeName
      // if(!this.orgId&&this.orgList.length>0){
      //   this.orgSelShow = true
      //   return
      // }

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

    // 组合购步进器加减赋值
    onCombinationPurchaseNumChange(e){
      const {dataset: { seriesindex, itemindex }} = e.currentTarget

      this.order.items[seriesindex].child[itemindex].quantity = Number(e.detail)
      let totalMoney = 0 // 所有组定金总和
      let totalNum = 0 // 所有组购买总数之和
      let totleBuyNum = 0 // 每组购买总数

      this.order.items[seriesindex].child.forEach((item)=>{
        totleBuyNum += item.quantity
      })
      this.order.items[seriesindex].totleBuyNum = totleBuyNum

      this.order.items.forEach((item)=>{
        totalNum += item.totleBuyNum
        item.child.forEach((i)=>{
          totalMoney += i.deposit * i.quantity
        })
      })

      this.order.totalDeposit = totalMoney
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
    Toast.loading({ forbidClick: true,mask:true, message: '抢购中...', duration: 0 })

    let transferOrderId = '' // 用于移动端认购成功页面按钮调整（增加去转单按钮）
    //付款地址
    let api = ''
    //入参
    let data = {}
    //二次付款
    if(this.payAgain){
      api = 'marketActivity/payInfo.nd'
      data = {
        id: this.itemId,
        openId
      }
    }else{
      //首次付款
      api = 'marketActivity/save.nd'
      data = {
        buyNum: this.buyNums,
        prdId: this.prdIds,
        orgId:this.orgId,
        openId
      }
    }

    let buyNums = this.buyNums.split(',').map(it => it * this.packageNum).join(',')
    let prdIds = this.prdIds
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
    if(this.order.discountTypeName=='套购' || this.order.discountTypeName=='组合购'){
      if(this.isRePay){
        api = 'marketActivity/payInfo.nd'
        data = {
          id: this.itemId,
          openId
        }
      }else{
        api = 'marketActivity/saveMany.nd'
        data = {
          buyNums,
          prdIds,
          openId,
          orgId:this.orgId
        }
      }
    }

    request({api: api, data, method: 'POST', callback: (res: any) => {
        Toast.clear()
        if(res.data.code=='0'){
          let data = res.data
          if(res.data.data&&res.data.data.payInfo&&res.data.data.payInfo[0]){
            data = res.data.data.payInfo[0]
          }

          if(api=='marketActivity/save.nd'){
            transferOrderId = res.data.id
            if(res.data.data && res.data.data.id){
              transferOrderId = res.data.data.id
            }
          }else if(api=='marketActivity/saveMany.nd'){
            transferOrderId = res.data.packageMainInfoId
            if(res.data.data && res.data.data.packageMainInfoId){
              transferOrderId = res.data.data.packageMainInfoId
            }
          }

          if(data&&data.payInfo){
            const { payInfo: { timeStamp, nonceStr, paySign, signType } } = data
            wx.requestPayment({
              timeStamp: timeStamp.toString(),
              nonceStr: nonceStr,
              package: data.payInfo.package,
              signType: signType,
              paySign: paySign,
              success: () => {
                let orderCode = this.payAgain ? this.orderCodeAgain : data.orderCode
                if(res.data.data&&res.data.data.orderCode){
                  orderCode = res.data.data.orderCode
                }
                wx.navigateTo({
                  url: `/pages/goods/order-result/index?type=success&orderNum=${orderCode}&activity=market&orderType=2&transferOrderId=${transferOrderId}`
                })
              },
              fail: () => {
                const errMsg = '订单支付失败'
                wx.navigateTo({
                  url: `/pages/goods/order-result/index?&activity=order&type=fail&errorMsg=${errMsg || res.data.error || '系统错误'}`
                })
              }
            })
            this.attrPopup = false
            this.$apply()
          }else{
            let orderCode = this.payAgain ? this.orderCodeAgain : res.data.orderCode
            if(res.data.data&&res.data.data.orderCode){
              orderCode = res.data.data.orderCode
            }
            wx.navigateTo({
              url: `/pages/goods/order-result/index?type=success&orderNum=${orderCode}&activity=market&orderType=2&transferOrderId=${transferOrderId}`
            })
          }
        }else{
          Toast.fail(res.data.msg)
        }
      }
    }).catch(err=>{
      wx.showToast({
        title: '请求超时，请稍后重试！',
        duration: 3000, // 提示的延迟时间，单位毫秒，默认：1500
        icon: 'none',
        mask: false, // 是否显示透明蒙层，防止触摸穿透，默认：false
      });
    })

  }

  // 余额付款
  saveOrder() {
    const data = this.$invoke('order', 'getParams')
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
      item = {
        ...data,
        userActId: this.userActId, // 抢购单id
        actCode: this.order.actCode
      }
    } else {
      item = {
        ...data,
        prdIds: this.prdIds, // 活动id
        buyNums: this.buyNums,
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

  onLoad({ prdIds, buyNums, userActId, itemId, orderCodeAgain, payAgain, isRePay, orgDict, orgId}: any) {

    if(orgDict){
      try{
        this.orgDict = JSON.parse(orgDict)
        this.orgList = []
        for(let it in this.orgDict){
          this.orgList = this.orgDict[it]
        }
      }catch{
        this.orgDict = {}
      }
    }

    this.isRePay = isRePay;
    this.orgId=orgId

    if (prdIds && buyNums) {

      this.prdIds = prdIds
      this.buyNums = buyNums

      //抢单跳转支付

      //二次支付
      if(payAgain){
        this.payAgain = payAgain
        this.itemId = itemId
        this.orderCodeAgain = orderCodeAgain
      }
      this.$apply()
      this.methods.takeActivityOrderRengou({ // 活动列表》确认认购
        prdIds,
        buyNums,
        orgId:this.orgId || '',
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
        }else{
          if(this.isRePay && this.orgId){
            this.orgName=res.payload.agentName
            this.isFenXiao = res.payload.isFenXiao
          }else{
            if(this.orgList && this.orgList.length>0){
              this.orgId = this.orgList[0].code
              this.orgName=this.orgList[0].name
              this.isFenXiao=this.orgList[0].desc
            }
          }

          this.$apply()
        }
      })
    } else if (userActId) {
      this.userActId = userActId
      this.$apply()
      this.methods.takeActivitySnapped({ // 我的抢单》确认认购
        userActId,
        orgId:this.orgId || '',
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
        }else{
          if(this.isRePay && this.orgId){
            this.orgName=res.payload.agentName
            this.isFenXiao = res.payload.isFenXiao
          }else{
            if(this.orgList && this.orgList.length>0){
              this.orgId = this.orgList[0].code
              this.orgName=this.orgList[0].name
              this.isFenXiao=this.orgList[0].desc
            }
          }
        }
      })
    }

  }
}
