import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { Weapp } from 'definitions/weapp';
import { request } from '@/utils/request';
import systemMixin from '@/mixins/system';
import Toast from '@/components/vant/toast/toast';
import { padZero } from '@/components/vant/count-down/utils';
import { RESET_GOODS_INFO } from '@/store/types/goods';
import { getGoodsInfo, getGoodsPrice, getGoodsPromotion,getGoodsDmsStock, getGoodsDmsPrice, getGoodsStock} from '@/store/actions/goods';
import { getCartCount } from '@/store/actions/cart';
import utilsWxs from '../../../wxs/utils.wxs';
import emptyDataType from "@/components/empty-data-type/index";
import { findIndex, forEach, isEmpty, join, map, propEq } from 'ramda'

interface Data {
  barrageList: [];
  isScroll: boolean;
  menuWidth: number;
  itemID: string;
  attrPopup: boolean;
  orgPopup: boolean;
  orgColumns: [];
  org: object;
  submitting: boolean;
  policyVisible: boolean;
  isStar: boolean;
  countDownTimer: {};
  cart: {};
  dmsPrice: string,
  invQty: string,
  gicInvQty: string,
  // stock: string,
  inventory: string,
  ownInv: string,
  sharedInv:string,
  isFenXiao: string,
  agentCisCode: string,
  type: string,
  loginStatus: true,
  isPermission: boolean,
}

const { width } = wx.getMenuButtonBoundingClientRect();

@connect({
  cartNum({ cart }) {
    return cart.num;
  },
  banners({ goods }) {
    return goods.banners;
  },
  promotion({ goods }) {
    return goods.promotion;
  },
  product({ goods }) {
    return goods.product;
  },
  price({ goods }) {
    return goods.price;
  },
  policies({ goods }) {
    return goods.policies;
  },
  infoList({ goods }) {
    return goods.infoList;
  },
  attrs({ goods }) {
    return goods.attrs;
  },
}, {
  getGoodsInfo,
  getGoodsPrice,
  getCartCount,
  getGoodsPromotion,
  getGoodsDmsStock,
  getGoodsDmsPrice,
  getGoodsStock,
  reset: RESET_GOODS_INFO,
})
export default class Home extends wepy.page {
  config = {
    navigationBarTitleText: '商品详情',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-dott': '../../../components/vant/dott/index',
      'van-button': '../../../components/vant/button/index',
      'van-stepper': '../../../components/vant/stepper/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-tab': '../../../components/vant/tab-item/index',
      'van-tabs': '../../../components/vant/tabs-item/index',
      'van-submit-bar': '../../../components/vant/submit-bar/index',
      'van-count-down': '../../../components/vant/count-down/index',
      'van-progress': '../../../components/vant/progress/index',
      'van-transition': '../../../components/vant/transition/index',
      'parser': '../../../lib/parser/index',
      'img': '../../../components/img/index',
      'no-permission': '../../../components/no-permission/index',
    },
  };
  components = {
    emptyDataType,
  };
  mixins = [systemMixin];
  params = {};
  promotionId = '';
  data: Data = {
    barrageList: [],
    isScroll: false,
    menuWidth: width,
    itemID: '',
    cart: {},
    countDownTimer: {},
    policyVisible: false,
    isStar: false,
    submitting: false,
    attrPopup: false,
    orgPopup: false,
    orgColumns:[],
    org: {},
    dmsPrice: '',
    invQty: '',
    gicInvQty: '',
    // stock: '',
    inventory: '',
    ownInv: '',
    sharedInv:'',
    isFenXiao: '',
    agentCisCode: '',
    type: 'booking',
    loginStatus: true,
    ly: '',  //来源 1：直播
    zbActivityId: '', //从直播页面传过来的活动ID
    isPermission: false,
  };
  wxs = {
    utils: utilsWxs,
  };
  methods = {
    // 设置分享
    onShareAppMessage: () => {
      // TODO: 测试
      const { code,orgId,orgCode,promotionId,type,isFenXiao} = this.params
      let shareItemInfo = 'http://3s-static.hisense.com/wechat/1/14722429883/1643097372976_061953fd860d42efa932dd721521a995.png'
      return {
        imageUrl: shareItemInfo,
        query: `code=${code}&isFenXiao=${isFenXiao}&orgId=${orgId}&orgCode=${orgCode}&promotionId=${promotionId}&type=${type}`
      }
    },
    // 倒计时
    onTimerChange(evt: any) {
      const { days, hours, minutes, seconds } = evt.detail;
      this.countDownTimer = { days, hours: padZero(hours), minutes: padZero(minutes), seconds: padZero(seconds) };
    },

    // 打开属性面板
    closeAttrPopup() {
      this.attrPopup = false;
    },
    openAttrPopup() {
      this.attrPopup = true;
    },
    // 打开组织面板
    closeOrgPopup() {
      this.orgPopup = false;
    },
    openOrgPopup() {
      this.orgPopup = true;

    },
    orgChange(event) {
      const { picker, value, index } = event.detail;
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onSelecteSale(e) {
      this.org = e
    },

    chooseItem(item: any) {
      if (item !== this.product.id) {
        this.getGoodsBasicInfo(item);
      }
    },
    // 政策选择
    openPolicy() {
      this.policyVisible = true;
    },
    closePolicy() {
      this.policyVisible = false;
    },
    goToTab(url: string) {
      wx.switchTab({ url });
    },
    // 添加购物车数量
    onCountChange(event: Weapp.Event) {
      const num = event.detail;
      this.cart[this.itemID] = num;
    },
    // 添加/取消收藏
    async toggleStar() {
      try {
        const { orgId }: any = this.params;
        const data = { orgId, id: this.itemID };
        const api = this.isStar ? 'oftenProduct/deleteOftenProduct.nd' : 'oftenProduct/addOftenProduct.nd';
        const res = await request({ api, method: 'POST', data });
        if (res && (res === 'Y' || res.status === 'true')) {
          Toast.success({
            message: this.isStar ? '取消收藏' : '收藏成功',
            duration: 1000,
          });
          this.isStar = !this.isStar;
          this.$apply();
        } else {
          Toast.fail(this.isStar ? '取消失败' : '收藏失败');
        }
      } catch (error) {
        Toast.fail(this.isStar ? '取消失败' : '收藏失败');
      }
    },
    // 添加到购物车
    async addCart() {
      const { getCartCount }: any = this.methods;
      const num = this.cart[this.itemID];
      const { orgId }: any = this.params;
      const data = { orgId, productId: this.itemID, num };
      this.submitting = true;
      try {
        const res = await request({ api: 'cart/addToCart.nd', data });
        if (res) {
          getCartCount();
          Toast.success({
            message: '添加成功',
            duration: 2000,
            onClose: () => {
              this.submitting = false;
              this.$apply();
            },
          });
        } else {
          this.submitting = false;
          this.$apply();
        }
      } catch (error) {
        Toast.fail('购物车添加失败');
        this.submitting = false;
      }
    },
    submitOrder:(data)=> {
      const orgDict = this.params.orgDict
      wx.navigateTo({
        url: `/pages/goods/market-activity-order/index?prdIds=${data.prdId}&buyNums=${data.buyNum}&orgDict=${orgDict}`
      })
    },
    //这是原来的认购逻辑，替换未上面的跳结算页
    bookingConfirm() {
      if (this.promotion.currentStatus === 'current' && this.type == 'booking') {
        const buyNum = this.cart[this.itemID];
        const data = {
          buyNum,
          prdId: this.promotionId,
        };
        this.methods.submitOrder(data)
        // Toast.loading({ forbidClick: true, message: '抢购中...', duration: 0 });
        // request({ api: 'marketActivity/save.nd', data, method: 'POST', callback: (res: any) => {
        //   Toast.clear();
        //   const { orderCode, msg } = res.data;
        //   if (orderCode) {
        //     wx.navigateTo({
        //       // 新增orderType 1: 普通下单接口 2: 营销活动抢购
        //       url: `/pages/goods/order-result/index?type=success&orderNum=${orderCode}&orderType=2`,
        //       complete: () => {
        //         this.methods.reloadPage();
        //       }
        //     });
        //   } else {
        //     Toast.fail(msg || '抢购失败');
        //   }
        //   this.attrPopup = false;
        //   this.$apply();
        // }});
      } else {
        const buyNums = this.cart[this.itemID];
        const prdId =  this.promotionId;
        const orgDict = this.params.orgDict;
        debugger
        wx.navigateTo({
          url: `/pages/goods/activity-order/index?prdIds=${prdId}&buyNums=${buyNums}&orgDict=${orgDict}`
        })
        this.attrPopup = false;
        this.$apply();
      }
    },
    bookingAttr() {
      if(this.promotion.canBuy=='Y'&&this.promotion.canBuyCount>0){
        if(this.promotion.activityId && this.promotion.canBuyCount<this.promotion.purchaseMinLimitQty){
          Toast.fail('最小购买数量大于可购买数量!');
          return
        }
        if (this.promotion.currentStatus === 'current') {
          this.attrPopup = !this.attrPopup;

          let orgList=JSON.parse(this.params.orgDict)
          let mId=this.promotion.matklId

          if(this.params.orgDict!=='null'){
            this.orgColumns=orgList[mId]
            this.org = this.orgColumns[0]
          }
        }
      }else{
        Toast.fail('抢购数量已达上限!');
      }
    },
    reloadPage: async() => {
      const { code, promotionId } = this.params;
      // 多 sku 4867218 907740235
      const { getCartCount }: any = this.methods;
      // 初始化购物车
      // this.cart[code] = 1;
      this.itemID = code;
      // 营销活动
      if (promotionId) {
        this.promotionId = promotionId;
        await this.getPromotion();
      }
      this.cart[this.itemID] = this.promotion.purchaseMinLimitQty || 1;
      this.getGoodsBasicInfo(code);
      // 获取购物车数量
      if(!this.promotion.activityId){
        getCartCount();
      }
    }
  };

  // 获取商品信息
  getGoodsBasicInfo(code: string) {
    const { orgId, orgCode }: any = this.params;
    const { getGoodsInfo, getGoodsPrice, getGoodsStock }: any = this.methods;
    // 切换颜色的时候 如果没有改变过数量 默认是 1
    if (!this.cart[code]) {
      this.cart[code] = 1;
    }
    this.itemID = code;
    Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });
    getGoodsInfo({ code, orgId,orderType:'activity' }, () => {
      Toast.clear();
    });
    // 如果是营销活动  因为对方接口太慢  就不请求了
    const { promotionId } = this.params;
    if(!promotionId) {
      getGoodsPrice({ code, orgId, orgCode, type: 'orderQty' });
      // getGoodsStock({
      //   code, orgId, orgCode, type: 'orderQty'
      // }).then((res) => {
      //   if(res && res.payload) {
      //     this.stock = res.payload.inventory;
      //   }
      //   this.$apply();
      // })
      getGoodsStock({
        code, orgId, queryType:this.isFenXiao != 'Y' ? 'purchase' : 'distribute'
      }).then((res) => {
        console.log(res)
        if(res && res.payload&&res.payload[0]) {
          this.inventory = res.payload[0].inventory;
          this.ownInv = res.payload[0].ownInv;
          this.sharedInv = res.payload[0].sharedInv;
        }
        this.$apply();
      })
    }
    this.$apply();
    this.getGoodsStarStatus(code);
  }

  // 获取商品是否收藏
  async getGoodsStarStatus(id: string) {
    const { orgId }: any = this.params;
    const data = { orgId, code: id };
    // const res = await request({ api: 'oftenProduct/findOftenProduct.nd', method: 'POST', data });
    // this.isStar = (res && res === 'Y');
    // this.$apply();
  }
  // 获取营销活动
  async getPromotion() {
    const { getGoodsPromotion }: any = this.methods;
    await getGoodsPromotion({ id: this.promotionId },(res: any) => {
      this.params.orgCode = res.data.detail.fwOrgCode
      this.params.orgId = res.data.detail.fwOrgId
    });
    const res: any = await request({ api: `marketActivity/queryMsg.nd?id=${this.promotionId}` });
    if (res && res.list) {
      this.barrageList = res.list;
      this.$apply();
    }
  }
  // 获取已登陆状态下是否有采购产品权限
  getPermissionList(){
    if(wx.getStorageSync('b2b_permission_list')){
      const { productPurchaseAuthority } = JSON.parse(wx.getStorageSync('b2b_permission_list'))
      this.isPermission = productPurchaseAuthority
    }
    this.$apply()
  }

  onUnload() {
    this.methods.reset();
  }
  async onShow() {
    await this.getPermissionList()
    // code=31211414&orgId=154&orgCode=2601&promotionId=15501742183
    //取登陆状态
    this.loginStatus = !isEmpty(this.$parent.globalData.sessionId);
    const options = this.params

    if (options.custom_params) {
      var custParamsStr = decodeURIComponent(decodeURIComponent(options.custom_params));
      var custParamsObj = JSON.parse(custParamsStr);

      if(custParamsObj.ly == 1){
        this.ly = '1';
        //产品ID=> options.promotionId;
        //活动ID=>  options.activityId;
        this.zbActivityId = options.activityId;
        const res: any = await request({ api: `marketActivity/queryProductList.nd?id=${options.promotionId}` });
        if (res.code==0&&res.list&&res.list.length>0) {
            if(res.list.length>1 || (res.tgFlag && res.tgFlag === '1')){
              wx.navigateTo({
                url: `/pages/activity/activity-area/index`,
              })
            }else{
              this.params.promotionId = res.list[0]
              let orgDict = JSON.stringify(res.orgDictMap)
              this.params.orgDict = orgDict;
            }
        }else{
          //无权限
          this.zbActivityId = null
        }
        //验证活动权限
        /*this.methods.getActivityList().then(res => {
          const flag = false;
          if (res.payload.list && res.payload.list.length > 0) {
            res.payload.list.forEach((item) => {
              item.productDtoList.forEach((product)=>{
                if(product.productInfoId == options.code){
                  flag = true;
                }
              })
            })
          }
          this.activityAuth = flag;
        })*/
      }
    }

    if (options && options.type) {
      this.type = options.type
    }
    // code=3451028&orgId=154&orgCode=2601&promotionId=14181700309
    this.isFenXiao = options.isFenXiao
    this.agentCisCode = options.agentCisCode
    await this.methods.reloadPage();
    if (options.isFenXiao == 'Y') {
      const item = []
      item.push(options.code)
      this.methods.getGoodsDmsStock({
        productCodes: item,
        supplierCode: options.agentCisCode,
      }).then((res) => {
        if(res && res.payload && res.payload.data) {
          this.invQty = res.payload.data[0].invQty
          this.gicInvQty = res.payload.data[0].gicInvQty
          this.$apply()
        }
      })
      this.methods.getGoodsDmsPrice({
        orgId: options.orgId,
        productId: options.code,
      }).then((res) => {
        if(res && res.payload && res.payload.list && res.payload.list.length > 0 ) {
          this.dmsPrice = res.payload.list[0].standardPrice
        } else {
          this.dmsPrice = 0
        }
        this.$apply()
      })
    }
  }
  onLoad(options: any) {
    // 保存参数
    this.params = options;
    this.$apply();
  }
}
