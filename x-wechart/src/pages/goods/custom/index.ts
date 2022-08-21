import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { Weapp } from 'definitions/weapp';
import { request } from '@/utils/request';
import systemMixin from '@/mixins/system';
import Toast from '@/components/vant/toast/toast';
import { padZero } from '@/components/vant/count-down/utils';
import { RESET_GOODS_INFO } from '@/store/types/goods';
import { getGoodsInfo, getGoodsPrice, getGoodsPromotion,getGoodsDmsStock, getGoodsDmsPrice, getGoodsStock,getModelGoodsInfo} from '@/store/actions/goods';
import { getCartCount } from '@/store/actions/cart';
import utilsWxs from '../../../wxs/utils.wxs';
import {isEmpty} from 'ramda';
import emptyDataType from "@/components/empty-data-type/index";
import { getSalesOrderInfo } from '@/store/actions/order';

interface Data {
  barrageList: [];
  isScroll: boolean;
  menuWidth: number;
  itemID: string;
  attrPopup: boolean;
  submitting: boolean;
  policyVisible: boolean;
  isStar: boolean;
  countDownTimer: {};
  cart: {};
  dmsPrice: string,
  dmsStock: string,
  stock: string,
  isFenXiao: string,
  agentCisCode: string,
  type: string,
  loginStatus: true,
  popVisible: boolean,
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
  modelInfo({ goods }) {
    return goods.modelInfo;
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
  getSalesOrderInfo,
  getModelGoodsInfo
})
export default class Custom extends wepy.page {
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
    dmsPrice: '',
    dmsStock: '',
    stock: '',
    isFenXiao: '',
    agentCisCode: '',
    type: 'booking',
    loginStatus: true,
    ly: '',  //来源 1：直播
    zbActivityId: '',  //从直播页面传过来的活动ID
    policyId: '',   //政策ID
    policySelName: '',  //政策名称
    popVisible: false,
    popList: [],
    popTitle: '',
    popFiledName: '',
    org: {
      id: '',
      name: '请选择',
      orgCode: ''
    }, // 供应商  id name
    compareInfo: null,
    attrSelected: [],
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

    /**
     * 逗号是否包含
     * @param all
     * @param item
     * @returns {boolean}
     */
    strContaits(all,item) {
      let allArray = all.split(",");
      var result = false;
      for(var key in allArray){
        if(all[key].value == item){
          result = true;
          return;
        }
      }
      return result;
    },


    //不重复添加数据
    pushDate(list:any, item:any){
      if(list!=null && list.length>0){
        for(var i=0; i<list.length; i++){
          if(list.indexOf(item) == -1){
            list.push(item);
          }
        }
      }else{
        list = list ? list : [];
        list.push(item);
      }
      return list;
    },

    jiaoji(arr1: any[], arr2: any[]){
      return arr2.every(val=>arr1.includes(val));
    },



    //属性选择
    chooseItem(key: any, item: any) {
      let group = this.modelInfo.productAttr.attrGroup[key];
      if(group.value !== item) {
        group.value = item;
        //添加已选择属性
        this.attrSelected = this.methods.pushDate(this.attrSelected, item);
      }

      console.log(this.attrSelected);

      /*let a = [1,3,5,7,9];
      let b = [3,7];
      console.log(this.methods.jiaoji(a,b));*/


      let oldProductId = this.product.id;
      let selectP = [];

      /*let attrProducts = this.modelInfo.productAttr.attrProduct;
      for(var key in attrProducts) {
        let isSelect = true;
        let groups = this.modelInfo.productAttr.attrGroup;
        for (var groupKey in groups) {
          if (attrProducts[key].indexOf(groups[groupKey].value) == -1) {
            isSelect = false;
            break;
          }
        }
        if (isSelect) {
          selectP.push({productId: key, attr: attrProducts[key]});
        }
      }*/
      //debugger;
      //两个数组
      let attrProducts = this.modelInfo.productAttr.attrProduct;
      for(var key in attrProducts) {
        let arry = attrProducts[key].split(',');
        let flag = this.methods.jiaoji(arry, this.attrSelected);
        if(flag){
          selectP.push({productId: key, attr: attrProducts[key]});
          break;
        }
      }
      if(selectP.length==0){
        for(var key in attrProducts) {
          let arry = attrProducts[key].split(',');
          let flag = this.methods.jiaoji(arry, [item]);
          if(flag){
            selectP.push({productId: key, attr: attrProducts[key]});
            break;
          }
        }
      }
      if(selectP.length>0 && oldProductId != selectP[0].productId){
        //获取产品信息
        this.getGoodsDetailInfo(selectP[0].productId);
        // debugger;
        //重置属性
        let arry = selectP[0].attr.split(',');
        arry = Array.from(new Set(arry))
        let groups = this.modelInfo.productAttr.attrGroup;
        for(var i=0;i<groups.length;i++){
          let group = groups[i];
          let values = group.values;
          for(var j=0;j<values.length;j++){
            if(arry[i]==values[j]){
              group.value = arry[i];
            }
          }
        }
      }

    },
    // 政策选择
    openPolicy() {
      this.policyVisible = true;
    },
    closePolicy() {
      this.policyVisible = false;
    },
    //选择政策
    selectPolicy(item: any) {
      this.policyId = item.id;
      this.policySelName = item.policyName + '[' + item.versionCode + ']';
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

    //常规下单
    async takeAgainOrder() {
      Toast.loading({
        message: '下单中....',
        duration: 0,
      });
      console.log(this.price);
      if(this.price.standardPrice<=0){
        Toast.fail('没有价格，下单失败！');
        return;
      }
      const {orgId, code}: any = this.params;
      const num = this.cart[this.itemID];
      const {materialGroupId} = this.product;
      const params = {orgId, modelId: code, matklId: materialGroupId, products: this.itemID, productNumbers: num, purchaseType: 2, versions: this.policyId};
      console.log(params);
      console.log(this.product);

      this.methods.getSalesOrderInfo(params , (res: any) => {
        const { data } = res;
        if (data && data.cartOrder) {
          Toast.clear();
          wx.navigateTo({
            url: '/pages/goods/order/index?type=again',
          });
        } else {
          Toast.fail(data.msg || '结算失败');
        }
      });

    },

    bookingAttr() {
      if (this.promotion.currentStatus === 'current') {
        this.attrPopup = !this.attrPopup;
      }
    },
    reloadPage: () => {
      console.log(this.params);
      const { code, orgId } = this.params;
      const { getCartCount }: any = this.methods;
      this.getGoodsBasicInfo(code, orgId);
      // 获取购物车数量
      getCartCount();
    },

    // 应该获取那个值给popList   应该对比那个字段为选中信息
    openChoose: (propName: string, fieldName: string, titleName: string) => {
      let list = this[propName]
      if (!list) {
        list = this.modelInfo.fwOrgs;
      }
      if (list.length === 0) {
        return
      }
      this.popList = list
      this.compareInfo = this.data[fieldName]
      this.popFiledName = fieldName
      this.popTitle = titleName
      this.popVisible = true
    },

    onClose: () => {
      this.popVisible = false
    },

    onChoose: ({ currentTarget }: e) => {
      // debugger;
      const { getModelGoodsInfo}: any = this.methods;
      const { dataset } = currentTarget
      const { index } = dataset
      const { popFiledName, popList } = this.data
      this[popFiledName] = popList[index]
      this.popVisible = false;

      //控制选择
      let attrProduct = this.modelInfo.productAttr.attrProduct;
      console.log(attrProduct);

      //供应商
      if(popFiledName==='org') {
        //const {code}: any = this.params;
        let orgId = this.org.id;
        let code = this.modelInfo.productId;
        getGoodsInfo({ code, orgId }, () => {
          Toast.clear();
        });
      }
    },

  };

  // 获取定制产品详情
  getGoodsBasicInfo(code: string, orgId: any, orgCode: any) {
    //debugger;
    //const { orgCode }: any = this.params;
    const { getModelGoodsInfo, getGoodsPrice, getGoodsStock }: any = this.methods;
    Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });
    getModelGoodsInfo({ code, orgId }, () => {
      Toast.clear();
    }).then((res) => {
      //console.log(res.payload);
      const { modelInfo } = res.payload;
      //console.log(modelInfo);
      const { orgName } = modelInfo;
      //设置默认组织
      this.setDefaultOrg(orgId,orgCode,orgName);
      //获取默认产品
      this.getGoodsDetailInfo(modelInfo.productId);
    });
    // 如果是营销活动  因为对方接口太慢  就不请求了
    const { promotionId } = this.params;
    if(!promotionId) {
      getGoodsPrice({ code, orgId, orgCode, type: 'orderQty' });
      getGoodsStock({
        code, orgId, orgCode, type: 'orderQty'
      }).then((res) => {
        if(res && res.payload) {
          this.stock = res.payload.inventory;
        }
        this.$apply();
      })
    }

    this.$apply();
    this.getGoodsStarStatus(code);
  };

  setDefaultOrg(orgId,orgCode,orgName){
    this.org.id = orgId;
    this.org.code = orgCode;
    this.org.name = orgName;

    this.compareInfo = {};
    this.compareInfo.id = orgId;
    this.compareInfo.code = orgCode;
    this.compareInfo.name = orgName;
  };

  // 获取产品详情信息
  getGoodsDetailInfo(code: string) {
    let orgId = null, orgCode = null;
    if(this.compareInfo && this.compareInfo.id){
      orgId = this.compareInfo.id;
      orgCode = this.compareInfo.code;
    }else{
      orgId = this.params.orgId;
      orgCode = this.params.orgCode;
    }

    const { getGoodsInfo, getGoodsPrice, getGoodsStock }: any = this.methods;
    // 切换颜色的时候 如果没有改变过数量 默认是 1
    if (!this.cart[code]) {
      this.cart[code] = 1;
    }
    this.itemID = code;
    Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });
    getGoodsInfo({ code, orgId }, () => {
      Toast.clear();
    });
    // 如果是营销活动  因为对方接口太慢  就不请求了
    const { promotionId } = this.params;
    if(!promotionId) {
      getGoodsPrice({ code, orgId, orgCode, type: 'orderQty' });
      getGoodsStock({
        code, orgId, orgCode, type: 'orderQty'
      }).then((res) => {
        if(res && res.payload) {
          this.stock = res.payload.inventory;
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
    const res = await request({ api: 'oftenProduct/findOftenProduct.nd', method: 'POST', data });
    this.isStar = (res && res === 'Y');
    this.$apply();
  }
  // 获取营销活动
  async getPromotion() {
    const { getGoodsPromotion }: any = this.methods;
    getGoodsPromotion({ id: this.promotionId });
    const res: any = await request({ api: `marketActivity/queryMsg.nd?id=${this.promotionId}` });
    if (res && res.list) {
      this.barrageList = res.list;
      this.$apply();
    }
  }

  onUnload() {
    this.methods.reset();
  }
  onShow() {
    //取登陆状态
    this.loginStatus = !isEmpty(this.$parent.globalData.sessionId);
    const options = this.params

    if (options && options.type) {
      this.type = options.type
    }
    this.isFenXiao = options.isFenXiao
    this.agentCisCode = options.agentCisCode
    this.methods.reloadPage();
    if (options.isFenXiao == 'Y') {
      const item = []
      item.push(options.code)
      this.methods.getGoodsDmsStock({
        productCodes: item,
        supplierCode: options.agentCisCode,
      }).then((res) => {
        if(res && res.payload && res.payload.data && res.payload.data.length > 0 ) {
          this.dmsStock = res.payload.data[0].invQty
        } else {
          this.dmsStock = 0
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
    this.$apply()
  }
}
