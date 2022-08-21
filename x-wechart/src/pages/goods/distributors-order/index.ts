import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { map, forEach, multiply, trim } from 'ramda';
import PayConfirm from '@/components/pay-confirm/index';
import Toast from '@/components/vant/toast/toast';
import {
  checkCombinationPurchase,
  combinationPurchaseNumberSets,
  combineObjIntoAnArray,
  fillZero,
  formatDate
} from '@/utils/index';
import { getBaseData } from '@/store/actions/purchaseshop';
import { getDeliveryMethod } from '@/store/actions/dmsorder';
import { setDisrtibutorsOrder, setDisrtibutorsOrderNew, getCartDmsStock, getDmsShopAddress, getPeoplePhone,setCisDisrtibutorsOrder,getSysConfig } from '@/store/actions/distributorsorder';
import { RESET_DISTRIBUTOR_ORDERS_FILTER } from '@/store/types/purchaseshop';
import {removeCartItem } from '@/store/actions/cart';
import { GET_DMS_SHOP_ADDRESS } from '@/store/types/distributorsorder';
import { checkPhone } from '@/utils/validators';
import { request } from '@/utils/request'
import utilsWxs from '../../../wxs/utils.wxs'
import SelectContact from '@/pages/components/select-contact/index';
import SelectPhone from '@/pages/components/select-phone/index';

interface Data {
  listShow: boolean;
  time: any;
  filterForm: object;
  calendarConfig: object;
  calendarShow: boolean;
  wlz_visible: false;
  gys_visible: false;
  matklname: string;
  orgIdname: string;
  documentdata: string;
  popTitle: string;
  popVisible: boolean;
  popFiledName: string;
  dmsGoodsId: string;
  popList: any[];
  dmspopVisible: boolean;
  compareInfo: Object;
  isNoticePopupShow:boolean;
  custId:string;
  isAcrossMaterialGroup:boolean;
}


@connect({
  cartGoodInfo({ distributorsorder }) {
    return distributorsorder.cartGoodInfo
  },
  listId({ activityare }) {
    return activityare.listId
  },
  shippingAddress({ distributorsorder }) {
    return distributorsorder.shippingAddress
  },
  connect({ distributorsorder }) {
    return distributorsorder.connect
  },
  settlementUnits({ purchaseshop }) {
    return purchaseshop.settlementUnits
  },
  inWarehouseList({ purchaseshop }) {
    return purchaseshop.baseData
  },
  deliveryTypeList({ dmsorder }) {

    let list = dmsorder.deliveryMode
    list =list.map((item: Object) => {
      for (const key in item) {
        return {
          key: item.id,
          value: item.name
        }
      })
    return list
  },
  user({ user }) {
    return user
  },
  PurchaseEntrySalesman({ purchaseshop }) {
    return purchaseshop.PurchaseEntrySalesman
  },
  ywyList({ purchaseshop }) {
    return purchaseshop.ywyList
  },
}, {
  getBaseData,
  getCartDmsStock,
  setDisrtibutorsOrder,
  setDisrtibutorsOrderNew,
  setCisDisrtibutorsOrder,
  getSysConfig,
  removeCartItem,
  getDmsShopAddress,
  getDeliveryMethod,
  getPeoplePhone
})
export default class DistributorOrder extends wepy.page {
  config = {
    navigationBarTitleText: '下单确认',
    usingComponents: {
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-search': '../../../components/vant/search/index',
      'van-tab': '../../../components/vant/tab/index',
      'van-tabs': '../../../components/vant/tabs/index',
      'van-field': '../../../components/vant/field/index',
      'van-count-down': '../../../components/vant/count-down/index',
      'img': '../../../components/img/index',
      'van-button': '../../../components/vant/button/index',
      'distributors-order-items': '../../../components/distributors-order-items/index',
      'calendar': '../../../components/calendar/index',
      // 'activity-good-info': '../../activity/activity-good-info/index',
      'van-loading': '../../../components/vant/loading/index',
      'item': '../../../components/list-item/index',
      'activity-count-down': '../../../components/activity-count-down/index',
      'van-stepper': '../../../components/vant/stepper/index',
    },
  }
  components = {
    payconfrim: PayConfirm,
    selectContact: SelectContact, //选择联系人
    selectPhone: SelectPhone
  };

  watch = {
    connect() {
      if(this.connect && this.connect.phone && this.connect.contact) {
        this.filterForm = { ...this.filterForm, contact: this.connect.contact, contactInfo: this.connect.phone }
        this.$apply()
      }
    },
    // 默认收货地址
    shippingAddress() {
      if (this.shippingAddress && this.shippingAddress.length > 0) {
        this.filterForm = { ...this.filterForm, shippingAddress: this.shippingAddress[0] }
        this.$apply()
        this.methods.getPeoplePhone({
          sendToId: this.shippingAddress[0].key,
          _loading: true
        })
      }
    },
    // 默认结算单位
    settlementUnits() {
      if (this.settlementUnits && this.settlementUnits.length > 0) {
        this.filterForm = { ...this.filterForm, settlementUnits: this.settlementUnits[0] }
        this.$apply()
      }
    },
    // 配送方式
    // deliveryTypeList() {
    //   if (this.deliveryTypeList && this.deliveryTypeList.length > 0) {
    //     this.filterForm = { ...this.filterForm, deliveryTypeList: this.deliveryTypeList[0] }
    //     this.$apply()
    //   }
    // }
    // 默认仓库
    inWarehouseList() {
      if (this.inWarehouseList && this.inWarehouseList.length > 0) {
        this.filterForm = { ...this.filterForm, inWarehouseList: this.inWarehouseList[0] }
        this.$apply()
      }
    },
  };
  // 声明
  data: Data = {
    listShow: true,
    shareFlag:'', //入库仓库是否显示 Y不显示 N显示
    activityNum:'',
    activityName:'',
    userActivityCode:'',
    userActId:'',
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    calendarShow: false,
    dmsGoodsId: '',
    filterForm: {
      inWarehouseList: {
        key: '',
        value: '请选择'
      },
      deliveryTypeList: {
        key: '',
        value: '请选择'
      },
      settlementUnits: {
        key: '',
        value: '请选择'
      },
      shippingAddress: {
        key: '',
        value: '请选择'
      },
      dmsStockPopup: [],// 库存状态数组
      documentdata: formatDate(Date.parse(new Date()), 'Y-M-D'),
      expectDocumentdata: '请选择',
      number: '',
      account: '',
      message: '',
      contact: '',
      contactInfo:''
    },
    popList: [],
    popTitle: '',
    popVisible: false,
    dmspopVisible: false,
    popFiledName: '',
    compareInfo: {},
    isNoticePopupShow:false,
    expressFee: wepy.$instance.globalData.expressFee,
    custId:'',
    isAcrossMaterialGroup: false,
  }
  wxs = {
    utils: utilsWxs
  }
  events = {
    'chooseContact': (payload: any) => { // 选择联系人
      this.filterForm = { ...this.filterForm, contact: payload.contact.contact }
      this.filterForm = { ...this.filterForm, contactInfo: payload.contact.phone }
      this.$apply()
    },
    'choosePhone': (payload: any) => { // 选择电话
      this.filterForm = { ...this.filterForm, contact: payload.contact.contact }
      this.filterForm = { ...this.filterForm, contactInfo: payload.contact.phone }
      this.$apply()
    }
  }

  // 页面内交互写在methods里
  methods = {
    //提示框
    noticePopupOpen:() => {
      this.isNoticePopupShow = true;
    },
    noticePopupClose:() => {
      this.isNoticePopupShow = false;
    },
    selectStockStats: (evt) => {
      this.dmsGoodsId = evt.detail.id
      const dmsselect = []
      forEach((item) => {
        if (item.productCode == evt.detail.id) {
          this.dmsStockPopup = item.invStatus
          dmsselect = item.selectDms
        }
      }, this.cartGoodInfo.purchaseOrderItem)
      this.methods.dmsopenChoose('dmsStockPopup', 'dmsStockPopup', '库存状态', dmsselect)
    },
    onShippedBqtyChg: (evt) => {
      this.cartGoodInfo.number = evt.detail.number
      this.cartGoodInfo.totalVolume =evt.detail.totalVolume
      this.cartGoodInfo.account =evt.detail.account

    },
    //促销方式-》套购-》数量变化
    onStepTg(evt: Event) {
      const { detail } = evt
      let totalMoney = 0;
      let totalNum = 0;
      let totalVolume = 0;
      for (const key in this.cartGoodInfo.purchaseOrderItem) {
        let price = this.cartGoodInfo.purchaseOrderItem[key].price * this.cartGoodInfo.purchaseOrderItem[key].packageNum;
        //总金额
        totalMoney += price * detail;
        //总数量
        totalNum += detail * this.cartGoodInfo.purchaseOrderItem[key].packageNum;
        //总体积
        totalVolume += detail * this.cartGoodInfo.purchaseOrderItem[key].loadVolume
      }
      this.cartGoodInfo.purchaseOrderItem[0].defaultNum = detail//套数
      this.cartGoodInfo.account  = totalNum//总件数
      this.cartGoodInfo.number= totalMoney//总金额
      this.cartGoodInfo.totalVolume = totalVolume//总体积
      this.$apply()
    },
    dmsopenChoose: (propName: string, fieldName: string, titleName: string, dmsselect: any[]) => {
      let list = this[propName]
      if (!list) {
        list = this.customerInfos[propName]
      }
      if (list.length === 0) {
        return
      }
      this.popList = list
      this.compareInfo = dmsselect
      this.popFiledName = fieldName
      this.popTitle = titleName
      this.dmspopVisible = true
    },
    dmsonChoose: ({ currentTarget }: e) => {
      const { dataset } = currentTarget
      const { index } = dataset
      const { popList } = this.data
      forEach((item) => {
        if (item.productCode == this.dmsGoodsId) {
          item.selectDms = popList[index]
        }
      }, this.cartGoodInfo.purchaseOrderItem)
      this.dmspopVisible = false
    },
    // 应该获取那个值给popList   应该对比那个字段为选中信息
    openChoose: (propName: string, fieldName: string, titleName: string) => {
      let list = this[propName]

      if (!list) {
        list = this.customerInfos[propName]
      }
      if (list.length === 0) {
        return
      }
      this.popList = list
      this.compareInfo = this.data.filterForm[fieldName]
      this.popFiledName = fieldName
      this.popTitle = titleName
      this.popVisible = true
    },
    onChoose: ({ currentTarget }: e) => {
      const { dataset } = currentTarget
      const { index } = dataset
      const { popFiledName, popList } = this.data
      if('shippingAddress' == popFiledName){
        if(popList[index] && popList[index].regionStatus === 'D'){ // 判断行政区域地址库是否失效 A有效，D失效。失效的话禁止选择
          Toast.fail('由于行政区划调整，请您及时更新您的收获地址信息')
          return false
        }
      }

      this.data.filterForm[popFiledName] = popList[index]
      this.popVisible = false
      if(popFiledName == 'shippingAddress') {
        if(this.data.filterForm.shippingAddress.key && this.data.filterForm.shippingAddress.key!=0){
          this.methods.getPeoplePhone({
            sendToId: this.data.filterForm.shippingAddress.key,
            _loading: true
          })
        }else{
          this.data.filterForm.contact = '';
          this.data.filterForm.contactInfo = '';
        }
      }
    },
    // 构造数组
    mapPurchaseOrderItem: (list: any) => {
      //套购
      let isTg = false;
      if(this.cartGoodInfo.purchaseOrderItem[0].discountTypeId == '90603'){
        isTg = true;
      }

      let setsNumberNew = ''
      let listNew = []
      if(this.cartGoodInfo.purchaseOrderItem[0].discountTypeId == '90605'){
        listNew = combineObjIntoAnArray(list)
        const {setsNumber} = combinationPurchaseNumberSets(listNew)
        setsNumberNew = setsNumber  // 组合购认购套数
      }

       let list = map(({ id, productCode, productName, model, colour, orderedQty, price, priceId, selectDms, cartId,loadVolume, invStatusType,retainer,packageNum,rebateMoney,productGroupRemark,productGroup,discountTypeName, quantity, orgCode }) => {
        let packageNumNew = list[0].defaultNum || ""

         // 套购除外-如果是我的抢单进入orderedQtyNew取值this.cartGoodInfo.account 从活动列表进入取值orderedQty
        let orderedQtyNew = isTg ? packageNum*list[0].defaultNum : (this.userActId && !this.custId) ? this.cartGoodInfo.account : orderedQty
        if(discountTypeName == '组合购'){
          packageNumNew = setsNumberNew
          orderedQtyNew = quantity
        }
        let amountNew= multiply(orderedQtyNew, price)

          return {
            id,
            productCode,
            productName,
            model,
            colour,
            invStatusId: selectDms.key,
            orderedQty:orderedQtyNew,
            price,
            priceId,
            amount: amountNew,
            cartId,
            retainer,
            invStatusType:'', //补差类型-  1.主动发起的渠道订单录入、零售订单录入，是必填的 2.分销审核，分销发起的订单可以不选补差类型
            loadVolume,  //体积
            packageNum:packageNumNew,
            packageRateNum:packageNum || "",//套购比例数量 -> 每套多少个
            rebateMoney:rebateMoney || "",//返利金额
            productGroupRemark,
            productGroup,
            orgCode,
          }

      }, list || [])

      // 过滤购买数量为0的产品
      let listNew = []
      list.forEach(item =>{
        if(item.orderedQty>0){
          listNew.push(item)
        }
      })

      return listNew
    },
    // 检查参数
    checkParam: () => {
      const { inWarehouseList, settlementUnits, shippingAddress, contact,contactInfo,deliveryTypeList } = this.data.filterForm
      const { purchaseOrderItem } = this.cartGoodInfo
      // if (inWarehouseList.key == '' && this.shareFlag != 'Y') {
      //   Toast.fail('请选择入库仓库')
      //   return false
      // }

      //TODO：//结算单位去掉已经和后端确认

      // if (settlementUnits.key == '') {
      //   Toast.fail('请选择结算单位')
      //   return false
      // }
      /*if (contact == '') {
        Toast.fail('请输入联系人')
        return false
      }
      if (!checkPhone(trim(contactInfo))) {
        Toast('请输入正确的联系方式');
        return false;
      }
      if (!shippingAddress.key || shippingAddress.key == '') {
        Toast.fail('请选择收货地址')
        return false
      }*/
      if (!shippingAddress.key || shippingAddress.key == '') {
        Toast.fail('请选择收货地址')
        return false
      }
      if (purchaseOrderItem.length == 0) {
        Toast.fail('商品数量不能为空')
        return false
      }
      if(deliveryTypeList.key == '' && deliveryTypeList) {
        Toast.fail('请选择配送方式')
        return false;
      }
      let dms = true
      // forEach((item) => {
      //   if (item.selectDms.key == '' || item.selectDms.value == '请选择库存状态') {
      //     dms = false
      //     return
      //   }
      // }, purchaseOrderItem)
      if (!dms) {
        Toast.fail('请选择库存状态')
        return false
      }
      return true
    },
    // 拉起输入密码
    confirmSaveOrder() {

      if(this.cartGoodInfo.purchaseOrderItem.length == 0 || (this.cartGoodInfo.purchaseOrderItem[0].discountTypeId == '90603' && this.cartGoodInfo.purchaseOrderItem[0].defaultNum == 0) ){
        return;
      }

      if(this.cartGoodInfo.discountTypeName == '组合购' && !this.cartGoodInfo.isPurchaseStandard) {
        Toast('不符合组合购比例，请重新选择')
        return
      }
      if (this.methods.checkParam()) {
        const { number } = this.cartGoodInfo;
        this.$invoke('payconfrim', 'show', number, () => {
          this.methods.submitOrder()
        });
      }
    },
    // 提交订单
     submitOrder: async () => {
      const { inWarehouseList,deliveryTypeList, settlementUnits, shippingAddress, documentdata, expectDocumentdata, message,contact,contactInfo } = this.data.filterForm
      const { orgCode, supplierId, purchaseOrderItem, account, number,totalVolume,packageMainNum, discountTypeName } = this.cartGoodInfo

      // 组合购恢复成转换之前的数据格式
      if(discountTypeName == '组合购'){
        let purchaseOrderItemInit = []
        purchaseOrderItem.forEach((item)=>{
          item.child.forEach((val)=>{
            purchaseOrderItemInit.push(val)

          })
        })
        purchaseOrderItem = purchaseOrderItemInit
      }

      const item = {
        _loading: true,
        _ignoreToast: true,
        cisCode: wepy.$instance.globalData.cisCode,
        purchaseOrder: {
          documentDate: documentdata,
          edt: expectDocumentdata == '请选择' ? documentdata : expectDocumentdata,
          orgCode,
          provinceId: '',
          cityId: '',
          countryId: '',
          townId: '',
          contact,
          contactInfo,
          supplierCode: supplierId,
          cisAddressId: shippingAddress.key,
          address: shippingAddress.value == '请选择' ? '' : shippingAddress.value,
          // billtoId: settlementUnits.key,
          userId: this.PurchaseEntrySalesman[0].key || '',
          warehouseId: inWarehouseList.key,
          totalAmount: number,
          totalOrderedQty: account,
          message,
          deliveryMode: deliveryTypeList.key,
          //套购所需
          discountType:purchaseOrderItem[0].discountTypeId || "",//促销方式 id
          discountTypeName:purchaseOrderItem[0].discountTypeName || "",//促销方式名称
          packageCode:purchaseOrderItem[0].packageCode || "",//套购编码
          packageMainNum:packageMainNum,//套购组单号
          custTag:purchaseOrderItem[0].custTag || "",//商家标签

          purchaseOrderItem: this.methods.mapPurchaseOrderItem(purchaseOrderItem)
        }
      }

      // 活动列表代理商活动需要先请求此接口拿到userActivityCode字段
       if(this.custId){
         await this.submitSaveMany(item)
       }

       if(this.activityNum){
         item.purchaseOrder.activityNum = purchaseOrderItem[0].activityCode
         item.purchaseOrder.activityName = this.activityName
         item.purchaseOrder.userActivityCode = this.userActivityCode
       }

       // 分销商向代理商采购接口submitPurchaseOrder迁移到CIS的接口地址 /dmsPurchaseOrder/submit.nd
       try {
         // 根据系统参数判断是否迁移接口
         this.methods.getSysConfig({key:'QD_ORDER_SEND_CIS'}).then((res)=>{
           let sys = res.payload.data
           if(sys == 'Y'){
             this.methods.setCisDisrtibutorsOrder(item)
           }
         })
       } catch (e) {}

       let currQuery = null
       if(this.isAcrossMaterialGroup){ // 购物车下单 -> 同供应商跨物料组下单
         currQuery =  this.methods.setDisrtibutorsOrderNew(item)
       }else{
         currQuery = this.methods.setDisrtibutorsOrder(item)
       }
       currQuery.then((res: { payload: { data: { code: string; msg: any; error: any; }; code: string; msg: any; }; }) => {
        if (res && res.payload && res.payload.data && res.payload.data.code == '1') {

          if(this.custId){ // 只有代理商活动列表进入下单页调用回滚失败接口
            this.submitTransFlag('fail',item, res)
          }else{
            wx.redirectTo({
              url: `/pages/goods/order-result/index?type=fail&errorMsg=${res.payload.data.msg || res.payload.data.error || '系统错误'}`,
            });
          }

        } else if (res && res.payload && res.payload && res.payload.code == '0') {
          map(({cartId}) => {
            this.methods.removeCartItem({cartId})
          }, item.purchaseOrder.purchangeTransFlagchaseOrderItem || [])

          if(this.userActId){ // 代理商活动列表、我的抢单进入下单页调用回滚成功接口
            this.submitTransFlag('success',item, res)
          }else{
            wx.redirectTo({
              url: `/pages/goods/order-result/index?type=success&goWhere=Y&orderNum=${res.payload.msg}`,
            });
          }

        }else{

          if(this.custId){ // 只有代理商活动列表进入下单页调用回滚失败接口
            this.submitTransFlag('fail',item, res)
          }else{
            wx.redirectTo({
              url: `/pages/goods/order-result/index?type=success&goWhere=Y&orderNum=${res.payload.msg}`,
            });
          }

        }
      })
    },

    // 备注
    onDistributorsMessage: (e: { detail: any; }) => {
      this.filterForm = { ...this.filterForm, message: e.detail }
    },
    onDistributorscontact: (e: { detail: any; }) => {
      this.filterForm = { ...this.filterForm, contact: e.detail }
    },
    onDistributorscontactInfo: (e: { detail: any; }) => {
      this.filterForm = { ...this.filterForm, contactInfo: e.detail }
    },
    onClose: () => {
      this.popVisible = false
      this.dmspopVisible = false
    },
    // 列表收起或下拉
    onListShow: (value: any) => {
      this.listShow = value == 'up'
    },
    // 日期弹层
    openChooseDayPopup: () => {
      this.calendarShow = !this.calendarShow
    },
    // 选择日期
    closeCalendar() {
      this.calendarShow = false;
    },
    chooseDay(evt: { detail: { year: any; month: any; day: any; }; }) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.filterForm = { ...this.filterForm, expectDocumentdata: day }
      this.calendarShow = false;
    },

    // 组合购步进器加减赋值
    onCombinationPurchaseNumChange(e){
      const {dataset: { seriesindex, itemindex }} = e.currentTarget

      this.cartGoodInfo.purchaseOrderItem[seriesindex].child[itemindex].quantity = Number(e.detail)
      this.cartGoodInfo.purchaseOrderItem[seriesindex].child[itemindex].buyNum = Number(e.detail)
      let totalMoney = 0 // 所有组定金总和
      let totalNum = 0 // 所有组购买总数之和
      let totleBuyNum = 0 // 每组购买总数

      this.cartGoodInfo.purchaseOrderItem[seriesindex].child.forEach((item)=>{
        totleBuyNum += item.quantity
      })
      this.cartGoodInfo.purchaseOrderItem[seriesindex].totleBuyNum = totleBuyNum

      this.cartGoodInfo.purchaseOrderItem.forEach((item)=>{
        totalNum += item.totleBuyNum
        item.child.forEach((i)=>{
          totalMoney += i.price * i.quantity
        })
      })

      this.cartGoodInfo.account = totalNum
      this.cartGoodInfo.number = totalMoney
      this.cartGoodInfo.isPurchaseStandard = checkCombinationPurchase(this.cartGoodInfo.purchaseOrderItem)
    },

    // 组合购型号展开收起
    productFold(seriesindex){
      this.cartGoodInfo.purchaseOrderItem[seriesindex].isFold = !this.cartGoodInfo.purchaseOrderItem[seriesindex].isFold
    },

    // 组合购切换型号
    changeModel(e){
      const {dataset: { seriesindex, itemindex }} = e.currentTarget

      this.cartGoodInfo.purchaseOrderItem[seriesindex].child.map((item)=>{
        item.isActive = false
        return item
      })
      this.cartGoodInfo.purchaseOrderItem[seriesindex].child[itemindex].isActive = true
      this.cartGoodInfo.purchaseOrderItem[seriesindex] = {
        ...this.cartGoodInfo.purchaseOrderItem[seriesindex],
        ...this.cartGoodInfo.purchaseOrderItem[seriesindex].child[itemindex],
      }
    },
  }

  // dms提交前发送产品数据并拿到数量回滚接口所需要的接口参数
  async submitSaveMany(item){
    let data = {}
    let prdIds = [] // 组合购购买数量，多个逗号隔开
    let buyNums = [] // 产品id，逗号隔开和qtys一一对应，取字dms的productCode
    item.purchaseOrder.purchaseOrderItem.forEach((order)=>{
      if(order.orderedQty != 0){
        buyNums.push(order.orderedQty)
        prdIds.push(order.id)
      }
    })
    data =  {
      prdIds: prdIds.toString(),
      buyNums: buyNums.toString(),
      orgId: this.cartGoodInfo.orgCode
    }
    let sMany = await request({
      api: `marketActivity/saveMany.nd`,
      method: 'POST',
      data: data
    })

    if(sMany && sMany.activityList){
      this.userActivityCode = sMany.activityList[0].orderCode;
    }

  }


  // dms 下单成功、失败、数量回滚
  submitTransFlag(type, item, res){

    // 用于购买数量回滚参数
    let data = {}
    let qtys = [] // 组合购购买数量，多个逗号隔开
    let productIds = [] // 产品id，逗号隔开和qtys一一对应，取字dms的productCode
    item.purchaseOrder.purchaseOrderItem.forEach((order)=>{
      if(order.orderedQty != 0){
        qtys.push(order.orderedQty)
        productIds.push(order.productCode)
      }
    })

    if(type == 'success'){
      data = {
        dmsOrderCode: res.payload.msg,
        userActivityCodes: item.purchaseOrder.userActivityCode,
        qtys: qtys.toString(),
        productIds: productIds.toString(),
      }
    }else{
      data = {
        dmsOrderCode: res.payload.msg,
        userActivityCodes: item.purchaseOrder.userActivityCode,
        transFlag: 'ZF'
      }
    }

    request({
      api: `marketActivity/changeTransFlag.nd`,
      method:"POST",
      data: data,
      callback: (res1: any) => {
        if (res.payload.code == '0') {
          wx.redirectTo({
            url: `/pages/goods/order-result/index?type=success&goWhere=Y&orderNum=${res.payload.msg}`,
          });
        } else {
          wx.redirectTo({
            url: `/pages/goods/order-result/index?type=fail&errorMsg=${res.payload.data.msg || res.payload.data.error || '系统错误'}`,
          });
        }
      }
    });
  }


  onShow() {
    const { orgCode } = this.cartGoodInfo;
    // 重置默认选择
    getStore().dispatch({ type: RESET_DISTRIBUTOR_ORDERS_FILTER, payload: [] })
    // ...TODO:
    const cisCode = wepy.$instance.globalData.cisCode
    this.methods.getDmsShopAddress({
      cisCode,
      orgId: this.cartGoodInfo.orgCode,
      matklId: this.cartGoodInfo.matklId,
      //type:'SHOPCK'
    })
    this.methods.getCartDmsStock({
      productCodes: this.cartGoodInfo.productCodes
    })
    this.methods.getBaseData({
      type: 'cglrrkck', // 入库仓库
      orgId:orgCode
    })
    this.methods.getBaseData({
      type: 'cglrjsdw' // 结算单位
    })
    this.methods.getBaseData({
      type: 'cglrshdz' // 收货地址
    })
    this.methods.getBaseData({
      type: 'ywy' // 业务员
    })
    this.methods.getBaseData({
      type: 'cglrywy' // 采购录入业务员
    })
    this.methods.getDeliveryMethod().then((res) => {
      if (this.deliveryTypeList && this.deliveryTypeList.length > 0) {
        this.filterForm = { ...this.filterForm, deliveryTypeList: this.deliveryTypeList[0] }
        this.$apply()
      }
    })
  }
  onLoad({ shareFlag,activityNum,activityName,userActId,userActivityCode,custId,isAcrossMaterialGroup }: any) {
    //获取标记 -> 入库仓库是否显示
    this.shareFlag = shareFlag;
    this.activityNum = activityNum;
    this.activityName = activityName;
    this.userActivityCode = userActivityCode;
    this.userActId = userActId; // 活动列表、我的抢单跳转此页都有传值
    this.custId = custId; // 活动列表跳转此页传值
    if(isAcrossMaterialGroup && isAcrossMaterialGroup!=='undefined'){ // 购物车下单是否同供应商跨物料组
      this.isAcrossMaterialGroup = JSON.parse(isAcrossMaterialGroup)
    }

    // 套购
    if(this.cartGoodInfo.purchaseOrderItem[0].discountTypeId == '90603'){
      setTimeout(()=>{
        const detail_ = this.cartGoodInfo.purchaseOrderItem[0].defaultNum || 0
        let totalMoney = 0;
        let totalNum = 0;
        let totalVolume = 0;
        for (const key in this.cartGoodInfo.purchaseOrderItem) {
          let price = this.cartGoodInfo.purchaseOrderItem[key].price * this.cartGoodInfo.purchaseOrderItem[key].packageNum;
          //总金额
          totalMoney += price * detail_;
          //总数量
          totalNum += detail_ * this.cartGoodInfo.purchaseOrderItem[key].packageNum;
          //总体积
          totalVolume += detail_ * this.cartGoodInfo.purchaseOrderItem[key].loadVolume
        }
        this.cartGoodInfo.account  = totalNum//总件数
        this.cartGoodInfo.number= totalMoney//总金额
        this.cartGoodInfo.totalVolume = totalVolume.toFixed(3)//总体积
      },1000)
    }
    if(userActId){
      wx.setNavigationBarTitle({
        title: '去下单'
      })
    }
  }
  onUnload() {
    getStore().dispatch({ type: GET_DMS_SHOP_ADDRESS, payload: { list: [] }})
  }
}
