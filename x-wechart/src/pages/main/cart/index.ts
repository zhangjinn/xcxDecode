import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import {
  map,
  join,
  includes,
  indexOf,
  remove,
  filter,
  forEach,
  find,
  propEq,
  add,
  repeat,
  findIndex,
  update
} from 'ramda';
import { request } from '@/utils/request';
import { Weapp } from 'definitions/weapp';
import Toast from '@/components/vant/toast/toast';
import Dialog from '@/components/vant/dialog/dialog';
import {getCartDmsPrice,getCartSupplyAndItemGroup, getCartList, getPrices, getStocks, changePolicy, updateItemQuantity, removeCartItem,getCartDmsStocks } from '@/store/actions/cart';
import { takeCommonOrder } from '@/store/actions/order';
import utilsWxs from '../../../wxs/utils.wxs';
import commonMixin from '@/mixins/common';
import { getAlertInfo } from '@/utils/index';
import emptyDataType from "@/components/empty-data-type/index";
import { RESET_CART_ITEM_QUANTITY } from '@/store/types/cart';
import { GET_CART_GOODS_LIST_INFO } from '@/store/types/distributorsorder';

interface Data {
  isCheckAll: boolean;
  policyArr: any[];
  servicesVisible: boolean;
  policyVisible: boolean;
  selectees: any;
  totalPrice: any;
  totalVolume: any;
  login: boolean;
  whichPopupShow: string;
  MerchantAbbreviation: any[];
  MerchantAbbreviationChild: any[];
  MerchantAbbreviationkey: any[];
  MerchantAbbreviationChildFirstName: string;
  MerchantAbbreviationChildFirstKey: string;
  gowhere: string;
  dmsTotalPrice: number;
  defaultNumber: number;
  editStatus: boolean;
  isNoticePopupShow: boolean;
  shoppingCartPermissions: boolean;
  freeShippingTip: string;
  newGroupList: any[]; // 新的分组列表
  newGroupPolicies: object; // 新的政策对象
  groupIndex: any; // 定义当前组的下标，选择政策时用到
}
const getDiscount = (fixedDiscount: string) => {
  const discountStr: any = (100 - parseFloat(fixedDiscount)) / 100;
  const discount = parseFloat(discountStr);
  return discount;
};
// 获取常用的 store
const stores = getStore();

@connect({
  user({ user }) {
    return user.info;
  },
  list({ cart }) {
    return cart.list;
  },
  orgAndGroupId({ cart }) {
    return cart.orgAndGroupId;
  },
  orgAndGroups({ cart }) {
    return cart.orgAndGroups;
  },
  orgName({ cart }) {
    return cart.orgName;
  },
  orgList({ cart }) {
    return cart.orgList;
  },
  policies({ cart }) {
    return cart.policies;
  },
}, {
  getStocks,
  getCartDmsStocks,
  getPrices,
  getCartList,
  changePolicy,
  getCartDmsPrice,
  removeCartItem,
  takeCommonOrder,
  updateItemQuantity,
  getCartSupplyAndItemGroup
})

export default class ShopCart extends wepy.page {
  config = {
    navigationBarTitleText: '购物车',
    usingComponents: {
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-dialog': '../../../components/vant/dialog/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-row': '../../../components/vant/row/index',
      'van-col': '../../../components/vant/col/index',
      'van-stepper': '../../../components/vant/stepper/index',
      'van-swipe-cell': '../../../components/vant/swipe-cell/index',
      'img': '../../../components/img/index',
      'no-permission': '../../../components/no-permission/index',
    },
    enablePullDownRefresh: true,
  };
  components = {
    emptyDataType: emptyDataType,
    emptyDataAuth: emptyDataType,
  };
  data: Data = {
    isCheckAll: false,
    servicesVisible: false,
    policyVisible: false,
    policyArr: [],
    selectees: [],
    totalPrice: 0.0,
    totalVolume: 0.000,
    login: true,
    whichPopupShow: '',
    MerchantAbbreviation: [], // 默认供应商
    MerchantAbbreviationChild: [], // 默认供应商下的物料组数组
    MerchantAbbreviationkey: [], // 默认供应商的key值
    MerchantAbbreviationChildFirstName: '', // 因为不同物料组不能下单需要默认到物料组 物料组name
    MerchantAbbreviationChildFirstKey: '', // 物料组键值
    gowhere: '', // 去哪里结算
    dmsTotalPrice: 0.00,
    defaultNumber: 1,
    editStatus: true,
    isNoticePopupShow:false,
    expressFee: wepy.$instance.globalData.expressFee,
    shoppingCartPermissions: false,
    freeShippingTip: '',
    newGroupList: [],
    newGroupPolicies: {},
    groupIndex: 0,
  };
  canSelect = [];
  watch = {
    newGroupList() {
      if(this.gowhere == 'C'){
        this.countTotalPrice();
      }else{
        this.countDmsTotalPrice()
      }
    },
    selectees() {
      this.isCheckAll = this.selectees.length === this.canSelect.length;
    },
  };
  mixins = [commonMixin];

  policyItem: any = null;
  wxs = {
    utils: utilsWxs,
  };
  methods = {
    //提示框
    noticePopupOpen:() => {
      this.isNoticePopupShow = true;
    },
    noticePopupClose:() => {
      this.isNoticePopupShow = false;
    },
    // 供应商和物料组
    toggleServicesVisible(key) {
      this.whichPopupShow = key
      this.servicesVisible = !this.servicesVisible;
      this.$apply()
    },
    // 增加勾选删除
    allEdit: () => {
      this.servicesVisible = false;
      this.editStatus = !this.editStatus;
      // 清空已选择的数据
      this.selectees = []
      this.dmsTotalPrice = 0
    },
    chooseItemgroup: (code, name) => {
      this.MerchantAbbreviationChildFirstName = name
      this.MerchantAbbreviationChildFirstKey = code
      this.servicesVisible = false;
      this.$apply()
      this.getShopList(code);
    },

    // 选择供应商和物料组
    chooseServices(id: string) {
      let that = this
      if(!id){
        this.MerchantAbbreviation = []
        this.MerchantAbbreviationkey = []

      }else{
        forEach((item) => {
          if (item.key == id) {
            const index=that.MerchantAbbreviationkey.findIndex(it=>it==id)
            if(index>-1){
              that.MerchantAbbreviationkey.splice(index,1)
              that.MerchantAbbreviation.splice(index,1)
            }else{
              that.MerchantAbbreviationkey.push(item.key)
              that.MerchantAbbreviation.push(item.value)
            }
          }
        }, this.orgList)
      }

      this.$apply()
    },

    // 顶部筛选点击确定获取数据
    filterSure(){
      this.servicesVisible = false
      this.getShopList();
      this.$apply()
    },
    // 政策选择
    openPolicy(item: any, groupIndex: any) {
      const { productId, policy, quantity } = item;
      // const policyArr = this.policies[productId] || [];
      const policyArr = this.newGroupPolicies[productId] || [];
      // 如果数量超过政策最大数量，增加字段disabled=true
      policyArr.forEach((p) => {
        p.disabled = quantity > p.canQuantity
      })
      this.updatePolicy(policyArr, policy && policy.id);
      this.policyVisible = true;
      this.policyItem = item;
      this.groupIndex = groupIndex
    },
    closePolicy() {
      this.policyVisible = false;
    },
    // 选择政策
    choosePolicy(item: any) {
      this.policyVisible = false;
      const { id } = item;
      const { productCode, orgId, orgCode } = this.policyItem;
      if (!item.checked) {
        Toast.loading('加载中');
        this.methods.changePolicy({
          versionId: id,
          productId: productCode,
          orgCode,
          orgId,
        }, item).then((res) => {
          Toast.clear();

          let { payload} = res;
          // 如果选中政策，向对应列表中添加policy字段并更新页面，对应价格随之改变
          if (payload.pricingGroupName) {
            const { productId, fixedDiscount, policy, pricingGroupName, makeUpType } = payload;
            let list = this.newGroupList[this.groupIndex].cartDTOs
            const index = findIndex(propEq('productCode', `${productId}`), list);
            if (index >= 0) {
              const item: any = list[index];
              const { price } = policy;
              const discount = getDiscount(fixedDiscount);
              policy.makeUpType = makeUpType;
              item.policy = {
                ...policy,
                fixedDiscount,
                pricingGroupName,
                policyDiscount: discount, // 计算出来的折扣
                policyPrice: (price * discount).toFixed(2), // 计算完的单价
                policyTotalPrice: ((price * item.quantity) * discount).toFixed(2), // 当前商品的总价
              };
              this.newGroupList[this.groupIndex].cartDTOs = update(index, item, list);
            }
          }

          this.updatePolicy(this.policyArr, id);
          this.$apply()
        }).catch(() => {
          Toast.clear();
        });
      } else {
        // 取消选择
        stores.dispatch({ type: 'RESET_CART_ITEM_POLICY', payload: { productCode } });
      }

    },
    // 取消/选择商品
    toggleCart: (cartId: string, isSell: boolean, groupIndex: string) => {
      if (this.editStatus && !isSell) {
        return
      }
      let list = this.newGroupList[groupIndex] // 当前产品组对象

      if (!this.editStatus) {
        list.canSelect = list.cartDTOs
      } else if (isSell) {
        list.canSelect = filter(({ isSell }: any) => isSell, list.cartDTOs) || [];
      }

      if (includes(cartId, list.selectees)) {
        const index = indexOf(cartId, list.selectees);
        list.selectees = remove(index, 1, list.selectees);
      } else {
        list.selectees.push(cartId);
      }

      list.isCheckAll = list.selectees.length === list.canSelect.length;
      this.methods.groupCheckChangeCheckAll()
      this.$apply()
    },
    // 当前组全选/全取消产品
    currGroupCheckAll(groupIndex: string) {
      let list = this.newGroupList[groupIndex] // 当前产品组对象

      if (!this.editStatus) {
        list.canSelect = list.cartDTOs
      } else {
        if(this.gowhere == 'C'){
          list.canSelect = filter(({ isSell }: any) => isSell, list.cartDTOs) || [];
        }else{
          list.canSelect = filter(({ dmsIsSell }: any) => dmsIsSell, list.cartDTOs) || [];
        }
      }
      if (list.canSelect.length > 0) {
        if (list.selectees.length === list.canSelect.length) {
          list.selectees = [];
        } else {
          list.selectees = map(({ id }: any) => id, list.canSelect);
        }
      }

      list.isCheckAll = list.selectees.length === list.canSelect.length;
      this.methods.groupCheckChangeCheckAll()
      this.$apply()
    },

    // 选中产品和当前组全选的时候 ，判断所有产品是否全选
    groupCheckChangeCheckAll: () =>{
      let list = []
      let selectees = []
      this.newGroupList.forEach((groupList)=>{
        groupList.cartDTOs.forEach((item)=>{
          list.push(item)
        })
        groupList.selectees.forEach((sel)=>{
          selectees.push(sel)
        })
      })
      if (!this.editStatus) {
        this.canSelect = list
      } else {
        if(this.gowhere == 'C'){
          this.canSelect = filter(({ isSell }: any) => isSell, list) || [];
        }else{
          this.canSelect = filter(({ dmsIsSell }: any) => dmsIsSell, list) || [];
        }
      }
      this.selectees = selectees
      this.isCheckAll = this.selectees.length === this.canSelect.length;
    },
    // 分销商下单选中
    // editStatus 为false 表示可以在编辑状态下被选中 可进行删除操作
    // 为true 表示进行的是下单操作
    dmstoggleCart(cartId: string, dmsIsSell: boolean, groupIndex: string) {
      if (this.editStatus && !dmsIsSell) {
        return
      }
      let list = this.newGroupList[groupIndex] // 当前产品组对象

      if (!this.editStatus) {
        list.canSelect = list.cartDTOs
      } else if (dmsIsSell) {
        list.canSelect = filter(({ dmsIsSell }: any) => dmsIsSell, list.cartDTOs) || [];
      }

      if (includes(cartId, list.selectees)) {
        const index = indexOf(cartId, list.selectees);
        list.selectees = remove(index, 1, list.selectees);
      } else {
        list.selectees.push(cartId);
      }

      list.isCheckAll = list.selectees.length === list.canSelect.length;
      this.methods.groupCheckChangeCheckAll()
      this.$apply()
    },
    onCountPlus(cartId: string, productId: string, groupIndex: number, itemIndex: number) {
      let list = this.unfoldGroupList()
      const cartItem = filter(({ id }: any) => id === cartId, list)
      this.methods.onCountBlur(cartId, productId, groupIndex, itemIndex, {
        detail: {
          value: `${cartItem[0].quantity + 1}`
        }
      }, this)
    },
    onCountMinus(cartId: string, productId: string, groupIndex: number, itemIndex: number) {
      let list = this.unfoldGroupList()
      const cartItem = filter(({ id }: any) => id === cartId, list)
      this.methods.onCountBlur(cartId, productId, groupIndex, itemIndex, {
        detail: {
          value: `${cartItem[0].quantity - 1}`
        }
      }, this)
    },

    // 数量改变
    onCountBlur(cartId: string, productId: string, groupIndex: any, itemIndex: any, evt: Weapp.Event, context: any) {
      if (!context) {
        context = this
      }
      const quantity = parseInt(evt.detail.value, 10);
      let listObj = context.newGroupList[groupIndex]
      // 查看是否选择政策
      // 如果选了政策，大于政策数量，重置数量
      const policyArr = listObj.cartDTOs[itemIndex].policy;
      if (policyArr) {
        if (quantity > policyArr.canQuantity) {
          Toast.fail(`最大数量不能超过${policyArr.canQuantity}`)
          stores.dispatch({
            type: RESET_CART_ITEM_QUANTITY,
            payload: cartId
          })
          return
        }
      }

      Toast.loading({
        forbidClick: true,
        loadingType: 'spinner',
      });
      context.methods.updateItemQuantity({ cartId, quantity }, () => {
        Toast.clear();

        if (!includes(cartId, listObj.selectees)) {
          listObj.selectees.push(cartId);
        }
        if(context.gowhere == 'C'){
          listObj.canSelect = filter(({ isSell }: any) => isSell, listObj.cartDTOs) || [];
        }else{
          listObj.canSelect = filter(({ dmsIsSell }: any) => dmsIsSell, listObj.cartDTOs) || [];
        }
        listObj.cartDTOs[itemIndex].quantity = quantity

        listObj.isCheckAll = listObj.selectees.length === listObj.canSelect.length;
        context.methods.groupCheckChangeCheckAll()
        context.$apply();

      });
    },
    // 删除单个商品 removeCartItem
    itemRemove(cartId: string) {
      Dialog.confirm({
        title: '确认删除?',
        message: '删除后不可恢复',
      }).then(() => {
        Toast.loading('删除中...');
        this.methods.removeCartItem({ cartId }, (res: any) => {
          const { data } = res;
          if (data && data === 'Y') {
            Toast.success('删除成功');
            const index = indexOf(cartId, this.selectees);
            if(index>=0){
              this.selectees = remove(index, 1, this.selectees); // 所有选择产品中移除
            }

            this.getCartSupplyAndItemGroupData()
            this.$apply();
          } else {
            Toast.fail('删除失败');
          }
        });
      });
    },
    // 全部删除
    allDelete() {
      if (this.selectees.length < 1) {
        return;
      }
      Dialog.confirm({
        title: '确认删除?',
        message: '删除后不可恢复',
      }).then(() => {
        Toast.loading('删除中...');
        this.methods.removeCartItem({ cartIds: this.selectees.toString() }, (res: any) => {
          const { data } = res;
          if (data && data === 'Y') {
            Toast.success('删除成功');
            this.selectees = []; // 所选产品全部删除
            this.getCartSupplyAndItemGroupData()
            this.$apply();
          } else {
            Toast.fail('删除失败');
          }
        });
      });
    },
    // 全选
    checkAll(){
      let list = []
      this.newGroupList.forEach((groupList)=>{
        groupList.cartDTOs.forEach((item)=>{
          list.push(item)
        })
      })
      if (!this.editStatus) {
        this.canSelect = list
      } else {
        if(this.gowhere == 'C'){
          this.canSelect = filter(({ isSell }: any) => isSell, list) || [];
        }else{
          this.canSelect = filter(({ dmsIsSell }: any) => dmsIsSell, list) || [];
        }

      }
      if (this.canSelect.length > 0) {
        if (this.selectees.length === this.canSelect.length) {
          this.selectees = [];
        } else {
          this.selectees = map(({ id }: any) => id, this.canSelect);
        }
      }
      this.isCheckAll = this.selectees.length === this.canSelect.length;

      // 判断产品列表里的选项是否选中
      let that = this
      this.newGroupList.forEach((list)=>{
        if (!that.editStatus) {
          list.canSelect = list.cartDTOs
        } else {
          if(this.gowhere == 'C'){
            list.canSelect = filter(({ isSell }: any) => isSell, list.cartDTOs) || [];
          }else{
            list.canSelect = filter(({ dmsIsSell }: any) => dmsIsSell, list.cartDTOs) || [];
          }
        }
        if(that.isCheckAll){
          list.selectees = map(({ id }: any) => id, list.canSelect);
        }else{
          list.selectees = [];
        }
        list.isCheckAll = list.selectees.length === list.canSelect.length;
      })
    },

    async itemStar(productId: string, orgId: string) {
      try {
        const api = 'oftenProduct/addOftenProduct.nd';
        const res = await request({ api, method: 'POST', data: { orgId, id: productId } });
        if (res && res === 'Y') {
          Toast.success({
            message: '收藏成功',
            duration: 1000,
          });
        } else {
          Toast.fail('商品已存在');
        }
      } catch (error) {
        Toast.fail('收藏失败');
      }
    },
    // 下单
    submitOrder(type: number) {
      //下单确认页 -> 是否显示入库仓库 Y不显示 N显示
      var shareFlag = this.canSelect[0].shareFlag;
      let list = this.unfoldGroupList()
      if (this.selectees.length > 0) {
        // --------下单类型判断开始------
        let isCanSubmit = true;
        let msg = '';
        let selecteesConventionalName=[]
        let selecteesEmergencyName=[]
        let orgAndmaterialGroup = [] // 跨供应商-物料组数据；如果数据大于一条，说明选中产品跨供应商-物料组不能下单
        let supplierId = [] // 代理id
        let supplierName = [] // 代理供应商名称
        forEach((id: string) => {
          const item = find(propEq('id', id), list);
          if (item && item.id) {
            const index=orgAndmaterialGroup.findIndex(it=>it==(item.orgId+'-'+item.materialGroupId))
            if(index<=-1){
              orgAndmaterialGroup.push(item.orgId+'-'+item.materialGroupId)
              if(supplierId.findIndex(it=>it==(item.agentCode))<=-1){
                supplierId.push(item.agentCode)
                supplierName.push(item.agentName)
                // supplierName.push(item.agentName+'-'+item.orgName)
              }
            }

            const { purchaseType } = item;
            //1应急订单 2常规订单
            if(type==1 && !(purchaseType == type || purchaseType == 3)){
              isCanSubmit = false;
              selecteesConventionalName.push(item.name)
              msg = `选择的【${selecteesConventionalName.toString()}】产品不支持应急采购！`;
            }
            if(type==2 && !(purchaseType == type || purchaseType == 3)){
              isCanSubmit = false;
              selecteesEmergencyName.push(item.name)
              msg = `选择的【${selecteesEmergencyName.toString()}】产品不支持常规下单！`;
            }
          }
        }, this.selectees);


        let isAcrossMaterialGroup = false
        if(orgAndmaterialGroup.length>1){
          if(this.gowhere == 'C'){
            isCanSubmit = false;
            msg = `目前不支持跨供应商-物料组下单，请重新选择！`;
          }else{ // 渠道下单支持同供应商跨物料组下单，不支持跨供应商下单
            isAcrossMaterialGroup = true
            if(supplierId.length>1){
              isCanSubmit = false;
              msg = `目前不支持跨供应商下单，请重新选择！`;
            }
          }
        }

        if(!isCanSubmit){
          Toast.fail(msg);
          return;
        }

        // -------下单类型判断结束-----------

        if (this.gowhere == 'C') { // 海信下单
          const carts: any = [];
          const versions: any = [];
          let versionStr: string = '';
          forEach((id: string) => {
            const item = find(propEq('id', id), list);
            if (item && item.id) {
              const { policy } = item;
              carts.push(id);
              if (policy && policy.id) {
                versions.push(policy.id);
              } else {
                versions.push('');
              }
            }
          }, this.selectees);

          if (versions.length === 0) {
            const versionItem = repeat(',', carts.length - 1);
            versionStr = join('', versionItem);
          } else {
            versionStr = join(',', versions);
          }

          Toast.loading({
            forbidClick: true,
            message: '结算中...',
          });
          this.methods.takeCommonOrder({
            orgAndGroup: orgAndmaterialGroup[0],
            carts: join(',', carts),
            versions: versionStr,
            purchaseType: type
          }, (res: any) => {
            const { data } = res;
            if (data && data.cartOrder) {
              Toast.clear();
              wx.navigateTo({
                url: `/pages/goods/order/index?type=common&totalVolume=${this.totalVolume}` + '&shareFlag=' + shareFlag,
              });
            } else {
              Toast.fail(data.msg || '结算失败');
            }
          });
        } else { // 渠道下单

          Toast.loading({
            forbidClick: true,
            message: '结算中...',
          });
          const dmsGoods = []
          forEach((id: string) => {
            const item = find(propEq('id', id), list);
            const dmsitem = {
              productCode: item.productId,
              productName: item.fullName,
              errImg: item.errImg,
              img: item.img,
              model: item.name,
              colour: item.color,
              invStatusId: '', // 库存状态id
              priceId: '', // 价格id
              price: item.standardPrice, // 价格
              orderedQty: item.quantity || 1,
              cartId: id,
              loadVolume: item.loadVolume,  //产品体积
              orgIg:item.orgId,   //组织id
              orgCode:item.orgId,   //组织id
            }
            dmsGoods.push(dmsitem)
          }, this.selectees);

          const orgCodeAndmatklId = orgAndmaterialGroup[0].trim().split("-")
          // 模拟数据
          const item = {
            orgCode: orgCodeAndmatklId[0] || '',
            matklId: orgCodeAndmatklId[1] || '',
            supplierId: supplierId[0] || '',
            supplierIdName: supplierName[0] || '',
            purchaseOrderItem: dmsGoods,
            totalVolume: this.totalVolume,
          }
          getStore().dispatch({ type: GET_CART_GOODS_LIST_INFO, payload: item })
          Toast.clear();
          wx.navigateTo({
            url: `../../goods/distributors-order/index` + '?shareFlag=' + shareFlag + '&isAcrossMaterialGroup=' + isAcrossMaterialGroup
          })
        }
      }
    },
  };

  // 平铺重组的数据列表
  unfoldGroupList(){
    let list = []
    this.newGroupList.forEach((groupList)=>{
      groupList.cartDTOs.forEach((item)=>{
        list.push(item)
      })
    })
    return list
  }

  // 计算商品价格
  countTotalPrice() {
      let list = this.unfoldGroupList()
      let totalPrice = 0.00;
      let totalVolume = 0.00;
      forEach((id: string) => {
        const item = find(propEq('id', id), list);
        if (item && item.id) {
          const { quantity, discount, price, policy, loadVolume } = item;
          let itemPrice: any = 0;
          let itemLoadVolume: any = 0;
          if (policy && policy.id) {
            const { policyDiscount } = policy;
            itemPrice = ((policy.price * quantity) * policyDiscount).toFixed(2);
          } else {
            itemPrice = ((price * quantity) * discount).toFixed(2);
          }
          itemLoadVolume = loadVolume ? (loadVolume * quantity).toFixed(3) : '0.000';
          totalPrice = add(totalPrice, itemPrice);
          totalVolume = add(totalVolume, itemLoadVolume);
        }
      }, this.selectees);
      if (isNaN(totalPrice)) {
        totalPrice = 0.00;
      }
      if (isNaN(totalVolume)) {
        totalVolume = 0.000;
      }
      this.totalPrice = totalPrice.toFixed(2);
      this.totalVolume = totalVolume.toFixed(3);
      this.$apply();
  }
  // 计算分销商商品价格
  countDmsTotalPrice(){
    let list = this.unfoldGroupList()
    let totalPrice = 0.00
    let totalVolume = 0.000;
    //只计算已选择的价格
    forEach((item) => {
      if (includes(item.id, this.selectees) ) {
        item.itemtotalprice = ((item.standardPrice) * (item.quantity || 1).toFixed(2))
        if (item.itemtotalprice) {
          totalPrice = add(totalPrice,item.itemtotalprice)
        }
        let itemLoadVolume = item.loadVolume ? (item.loadVolume * item.quantity).toFixed(3) : '0.000';
        totalVolume = add(totalVolume, itemLoadVolume);
      }
    }, list)

    this.dmsTotalPrice = totalPrice.toFixed(2)
    this.totalVolume = totalVolume.toFixed(3);
    this.$apply();
  }
  // 更新 policy 列表
  updatePolicy(list: [any], id: string) {
    this.policyArr = map((item) => ({ ...item, checked: item.id === id }), list);
  }
  // 获取购物车列表
  async getShopList() {
    this.newGroupList = []
    this.newGroupPolicies = {}
    Toast.loading({
      forbidClick: true,
      message: '加载中',
    });
    if(this.MerchantAbbreviationkey.length<=0){
      for(let item of this.orgList){
        await this.queryCartDataList(item.key)
      }
    }else{
      for(let item of this.MerchantAbbreviationkey){
        await this.queryCartDataList(item)
      }
    }

  }
  async queryCartDataList(orgAndGroup?: string){
    const { getCartDmsPrice,getCartDmsStocks,getCartList, getPrices, getStocks } = this.methods;

    const data = orgAndGroup ? { orgAndGroup } : null;
    // const data = {
    //   orgAndGroup: '937-20160119018'
    // }
    let result = await getCartList({data})
    if (result && result.payload && result.payload.cartDTOs) {
      const products = map(({ orgId, orgCode, productId, agentCisCode }) => ({ orgId, orgCode, productId, agentCisCode }), result.payload.cartDTOs);
      const codes = map(({ productId }) => productId, products);
      const orgCodes = map(({ orgCode }) => orgCode, products);
      const orgIds = map(({ orgId }) => orgId, products);
      const agentCisCodes = map(({ agentCisCode }) => agentCisCode, products);

      // C：海信采购 P：渠道采购
      if (this.gowhere == 'C') {

         await getPrices({
          code: join(',', codes),
          orgId: join(',', orgIds),
          orgCode: join(',', orgCodes),
        });

        let res = await getStocks({
          code: join(',', codes),
          orgId: join(',', orgIds),
          queryType: 'purchase',
        })
        for (const key in this.list) {
          if(res.payload[key] && res.payload[key].productCode){
            let oIndex = this.list.map(item => item.productId).indexOf(Number(res.payload[key].productCode))
            this.list[oIndex].inventory = res.payload[key].inventory;
            this.list[oIndex].ownInv = res.payload[key].ownInv;
            this.list[oIndex].sharedInv = res.payload[key].sharedInv;
            this.list[oIndex].isFenXiao = result.payload.cartDTOs[key].isFenXiao;
          }

        }

      } else {

        await getCartDmsPrice({
          orgId: join(',', orgIds),
          productId: join(',', codes),
        })

        let res = await getCartDmsStocks({
          orgId: orgIds[0],
          productCodes: codes,
          supplierCode: agentCisCodes[0],
        })
        for (const key in this.list) {
          if(res.payload.data[key] && res.payload.data[key].productCode){
            let oIndex = this.list.map(item => item.productId).indexOf(Number(res.payload.data[key].productCode))
            this.list[oIndex].invQty = res.payload.data[key].invQty;
            this.list[oIndex].gicInvQty = res.payload.data[key].gicInvQty;
            this.list[oIndex].isFenXiao = result.payload.cartDTOs[key].isFenXiao;
          }
        }

      }
      this.selectees = [];
      this.$apply();
    }
    if(this.list && this.list.length){
      this.newGroupPolicies = { ...this.newGroupPolicies, ...this.policies } // 重组的政策列表
      let groupObj={
        agentId: this.list[0].agentId,
        agentName: this.list[0].agentName || '',
        orgId: this.list[0].orgId,
        orgName: this.list[0].orgName,
        materialGroupId: this.list[0].materialGroupId,
        materialGroupName: this.list[0].materialGroupName,
        isCheckAll: false, // 是否全选当前组
        canSelect: [], // 当前组能购买的数据
        selectees: [], // 当前组选中的数据
        cartDTOs: this.list // 当前组数据列表
      }
      this.newGroupList.push(groupObj)

      this.$apply();
    }
  }

  // 获取三期供应商和物料组
  getCartSupplyAndItemGroupData(){
    this.newGroupList = []
    this.MerchantAbbreviationkey = []
    this.MerchantAbbreviation = []
    this.methods.getCartSupplyAndItemGroup({queryType:'list'}).then((res: { payload: { list: { code: any; }[]; }; }) => {
      if (res && res.payload && res.payload.list && res.payload.list.length > 0 ) {
        this.gowhere = res.payload.list[0].type || ''

        // 默认取第一个供应商-物料组
        this.MerchantAbbreviationkey.push(this.orgList[0].key)
        this.MerchantAbbreviation.push(this.orgList[0].value)
        //this.gowhere == 'P' 分销商-渠道采购；；；this.gowhere == 'C' 代理商-海信采购
        if(this.gowhere == 'P'){
          this.dmsTotalPrice = 0.00
        }
        this.getShopList()
      }
      this.$apply()
    })
  }
  getPermissionList(){
    if(wx.getStorageSync('b2b_permission_list')){
      const { shoppingCartPermissions }=JSON.parse(wx.getStorageSync('b2b_permission_list'))
      this.shoppingCartPermissions = shoppingCartPermissions
    }
    this.$apply()
  }
  onPullDownRefresh() {
    this.getShopList();
  }
  onShow() {
    // 自定义底部导航栏-如需实现 tab 选中态，要在当前页面下，通过 getTabBar 接口获取组件实例，并调用 setData 更新选中态
    if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
      this.$wxpage.getTabBar().setData({
        selected: 3
      })
    }
    const isTab = wepy.$instance.globalData.isTab
    if (!this.isLogin()) {
      this.login = false
    } else {
      this.freeShippingTip = getAlertInfo('14187495683') // 免运费提示信息
      this.getPermissionList()
      this.login = true
      this.editStatus = true
      if(isTab){
        this.getCartSupplyAndItemGroupData()
        wepy.$instance.globalData.isTab = false
      }
    }
  }
}
