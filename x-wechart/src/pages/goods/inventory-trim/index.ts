import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import inventoryDetail from '@/pages/goods/components/inventory-trim-add/index';
import address from '@/components/dms-address/index';
import {queryAppFiBook} from '@/store/actions/dmsorder';
import {getStoreHouse} from '@/store/actions/inventoryTrim';
import {getDeliveryMethod,submitAllotList,submitStoreList } from '@/store/actions/dmsorder';
import retailOrder from '@/mixins/channel-retail-order';
import { debounce } from 'throttle-debounce';
import { formatDate, checkTel, getAlertInfo } from '@/utils/index';
import { DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR} from '@/store/types/dmsorder';
import Dialog from '@/components/vant/dialog/dialog';
import { dmsRequest } from '@/store/actions/dmsrequest'
import PopupToast from '@/components/popup-toast/index';

interface ChooseInfo {
  id: number | string;
  name: string;
}

interface Data {
  showMore: boolean; // 是否显示更多
  outInv: ChooseInfo;  // 是否出库
  customerName: string; // 客户名称
  customerPhone: string;   // 联系电话
  sendInventoryInfo: ChooseInfo, // 发货仓库
  invoiceInfo: ChooseInfo; // 开票方
  deliveryMethod: ChooseInfo; // 配送方式
  saler: ChooseInfo; // 业务员
  // receiverInfo: ChooseInfo; // 收货地址信息
  receiverDetail: string; // 详细地址
  saleType: ChooseInfo; // 销售类型
  note: string; // 备注

  addressTip: string;
  chooseProvinceInfo: ChooseInfo;
  chooseCityInfo: ChooseInfo;
  chooseRegionInfo: ChooseInfo;
  chooseTownInfo: ChooseInfo;
  sysDate:string;
  storeMaterial: Array<String>;

  amount: string;
  volume: string;
  popVisible: boolean;
  popList: Array<any>;  // pop弹出框 列表
  popTitle: string;   // pop弹出框 标题
  compareInfo: Object;
  popFiledName: string;
  isNoticePopupShow:boolean,
  popFiBookVisible:boolean,
  fiBook:object,
  form:any,
  gicOutWrehouse:object,
  gicInWrehouse:object,
  tabIsShow:String;//tab显示
  totalPrice:any;
  priceAhead:any;
  priceBehind:any;
  postorgId:any;
  postStore:any;
  store:any;
  amountFirst:any;
  amountLast:any;
  freeShippingTip:string;
  // array:Array<any>;
  isDisabled: boolean;
}

@connect({
  storeHouse({ inventoryTrim }) {//仓库列表
    return inventoryTrim.storeHouse
  },
  warehousesInList({ dmsorder }) {
    return dmsorder.warehousesIn
  },
  warehousesOutList({ dmsorder }) {
    return dmsorder.warehousesOut
  },
  addressList({ dmsorder }) {
    return dmsorder.addressList
  },
  fibookList({ dmsorder }) {//销售组织
    return dmsorder.fibookList
  },
  additionOrderDetailItem({ dmsorder }) {
    return dmsorder.chooseItemInfo
  },
  deliveryMode({ dmsorder }) {
    return dmsorder.deliveryMode
  },
}, {
  // getStockTransBaseInfo,
  submitAllotList,
  // getRetailOrderInfo,
  getDeliveryMethod,
  queryAppFiBook,//销售组织
  getStoreHouse,//仓库列表
  submitStoreList,
  // getBaseInfo,
})
export default class ChannelOrder extends wepy.page {
  config = {
    navigationBarTitleText: '库存调整',
    usingComponents: {
      "van-popup": "/components/vant/popup/index",
      "van-toast": "/components/vant/toast/index",
      "item": "/pages/goods/components/inventory-trim-add-item/index",
      "van-icon": "/components/vant/icon/index",
      "van-submit-bar": "/components/vant/submit-bar/index",
      "van-transition": "/components/vant/transition/index",
      "van-field": "/components/vant/field/index",
      "van-dialog": "/components/vant/dialog/index",
      "stores": "/components/stores-return/index"
    },
  };

  mixins = [retailOrder];

  saleTypes = [{
    id: 'retail',
    name: '零售'
  }, {
    id: 'engineering',
    name: '工程'
  }];

  outInvs = [{
    id: '0',
    name: '否'
  }, {
    id: '1',
    name: '是'
  }]

  data: Data = {
    isDisabled: false, // 如果传参isDisabled=true，组件goods/components/inventory-trim-add-item/index表单不可编辑（销售数量、销售价格除外）

    // array:[],
    postorgId:'',
    postStore:'',
    priceAhead:'',
    priceBehind:'',
    totalPrice:'12.12',
    tabIsShow:'otherIn',
    showMore: false,
    store: {
      id: '',
      name: '请选择'
    },
    //jira:cis-4880
    outInv: {
      id: '1',
      name: '是'
    },

    sendInventoryInfo: {
      id: '',
      name: '请选择'
    },  // id name
    invoiceInfo: {
      id: '',
      name: '请选择'
    },  // id name
    saler: {
      id: '',
      name: '请选择'
    },
    deliveryMethod: {
      id: '',
      name: '请选择'
    },
    receiverDetail: '',
    saleType: {
      id: 'retail',
      name: '零售'
    }, // id name

    addressTip: '',
    chooseProvinceInfo: {
      id: '',
      name: ''
    },
    chooseCityInfo: {
      id: '',
      name: ''
    },
    chooseRegionInfo: {
      id: '',
      name: ''
    },
    chooseTownInfo: {
      id: '',
      name: ''
    },
    storeMaterial: [],//根据门店获取物料组


    amount: '0.00',
    amountFirst:'0',
    amountLast:'00',
    volume: '0.00',
    popList: [],
    popTitle: '',
    popVisible: false,
    popFiledName: '',
    compareInfo: {},
    isNoticePopupShow:false,
    popFiBookVisible:false,
    sysDate:'',
    expressFee: wepy.$instance.globalData.expressFee,
    fiBook:{//销售组织
      id:'',
      name:'请选择'
    },
    gicOutWrehouse:{
      id:'',
      name:'请选择'
    },
    gicInWrehouse:{
      id:'',
      name:'请选择'
    },
    getStoreHouse:{
      id:'',
      name:'请选择'
    },
    allotAddress:{
      id:'',
      name:'请选择',
      mobile:'',
      linkman:''
    },
    fullAddress:'',
    customerName:'',
    customerPhone:'',
    note:'',
    form:{
      cisCode: '',
      stockTrans: {
        gicOutWrehouse: '',
        gicInWrehouse: '',
        contact: '',
        message:'',
        phone: '',
        addressId:'',
        deliveryMode: '',
        orgId: ''
      },
      staItem: [
        {
          productCode: '',
          productName: '',
          // model: '',
          // colour: '',
          bdemandQty: '',
          invStatus: '',
          invStatusType:'',
          // usableMax: '',
          price: ''
        }
      ]
    },
    postFrom:{
      stockTrans:{
        transactionType:'otherIn',//事务类型1
        orgId:'',//销售组织id1
        gicInWarehouse:'',//入库仓库id
        gicOutWarehouse:'',//出库仓库id
        message:'',//备注
        deliveryMode:'01'//配送方式
      },
      staItem:[
        {
          productCode:'',//产品编码1
          productName:'',//产品名称1
          invStatus:'',//库存状态1
          invStatusType:'',//补差类型1
          alertInvStatus:'',//调整后库存状态
          alertInvStatusType:'',//调整后补差类型
          price:'',//价格1
          bdemandQty:'',//调拨数量1
        }
      ]
    },
    freeShippingTip: '' //免运费提示信息
  };

  components = {
    order: inventoryDetail,
    address,
    popup: PopupToast,
  };

  /**
   * : 保存成功后删除客户信息，商品信息
   */
  methods = {
    // changeTabChoose({currentTarget}:e){
      changeTabChoose(tab){
      // 判断产品明细是否可修改
      if(tab=='otherIn'){
        this.isDisabled = false
      }else{
        this.isDisabled = true
      }

      // const {dataset} = currentTarget
      this.$broadcast('relaunch')
      const store = getStore()
      store.dispatch({
        type: DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
        payload: ''
      })
      this.note = ''
      this.customerName = ''
      this.customerPhone = ''
      this.postFrom = {
        cisCode: '',
        stockTrans:{
          transactionType:'',//事务类型1
          orgId:'',//销售组织id1
          gicInWarehouse:'',//入库仓库id
          gicOutWarehouse:'',//出库仓库id
          message:'',//备注
          deliveryMode:'01'//配送方式
        },
        staItem:[
          {
            productCode:'',//产品编码1
            productName:'',//产品名称1
            invStatus:'',//库存状态1
            invStatusType:'',//补差类型1
            alertInvStatus:'',//调整后库存状态
            alertInvStatusType:'',//调整后补差类型
            price:'',//价格1
            bdemandQty:'',//调拨数量1
          }
        ]
      }
      this.storeHouse={
        id:'',
        name:'请选择'
      },
      this.fiBook={
        id:'',
        name:'请选择'
      },
      this.gicOutWrehouse={
        id:'',
        name:'请选择'
      },
      this.gicInWrehouse={
        id:'',
        name:'请选择'
      },
      this.allotAddress={
        id:'',
        name:'请选择',
        mobile:'',
        linkman:''
      },
      this.deliveryMethod={
        id: '',
        name: '请选择'
      },
      this.amount = '0.00'
      this.amountFirst='0'
      this.amountLast='00'
      this.$apply()
      this.tabIsShow = tab
      this.postStore=''
      this.postorgId = ''
      this.postFrom.stockTrans.transactionType = tab
    },
    //提示框
    noticePopupOpen:() => {
      this.isNoticePopupShow = true;
    },
    noticePopupClose:() => {
      this.isNoticePopupShow = false;
    },


    // 点击仓库选择 移入移出仓库数据渲染触发
    openChoose: (propName: string, fieldName: string, titleName: string) => {
      if(this.postFrom.stockTrans.orgId){
        let list = this[propName]//将库存列表赋值给list
        this.popList = list//将库存列表赋值给popList

        this.compareInfo = this[fieldName];
        this.popFiledName = fieldName//将请求参数赋值

        this.popTitle = titleName
        if(this.popList.length==0){
          Toast('暂无仓库')
        }else{
          this.popVisible = true
        }
      }else{
        Toast('请选择销售组织')
      }

    },
    //仓库弹框关闭
    onClose: () => {
      this.popVisible = false
    },
    /*移入仓库/移出仓库点击事件*/
    onChoose: ({ currentTarget }: e) => {
      const { dataset } = currentTarget
      const { index } = dataset//当前选择仓库的index
      const { key } = dataset//当前选择仓库的index
      const { popFiledName, popList } = this.data
      this.postStore = key

      this[popFiledName] = popList[index]
      this.sendInventoryInfo = popList[index]

      this.popVisible = false//关闭仓库弹框
      if(this.tabIsShow=='otherIn'){//入库
        this.postFrom.stockTrans.gicInWarehouse = key;
        this.sendInventoryInfo.id =  key;
      }else if(this.tabIsShow=='otherOut'){//出库
        this.postFrom.stockTrans.gicOutWarehouse = key;
      }else if(this.tabIsShow=='invStatus'){//状态调整
        this.postFrom.stockTrans.gicInWarehouse = key;
        this.postFrom.stockTrans.gicOutWarehouse = key;
      }
      //移出仓库
      // if('gicOutWrehouse' == popFiledName){
      //     this.form.stockTrans.gicOutWrehouse = key;
      //     this.sendInventoryInfo.id =  key;
      // }
      //移入仓库
      // if('gicInWrehouse' == popFiledName){
      //   this.form.stockTrans.gicInWrehouse = this.gicInWrehouse.id;
      // }
      this.$apply()
      //配送方式
      // if('deliveryMethod' == popFiledName){
      //   this.form.stockTrans.deliveryMode = this.deliveryMethod.id;
      // }
      //地址
      // if('allotAddress' == popFiledName){
      //   this.form.stockTrans.addressId = this.allotAddress.id;
      //   this.form.stockTrans.contact  = this.allotAddress.linkman;
      //   this.form.stockTrans.phone  = this.allotAddress.mobile;
      //   this.customerName  = this.allotAddress.linkman;
      //   this.customerPhone  = this.allotAddress.mobile;
      // }

    },
    // 开启销售组织弹框
    openChooseFiBook() {
      this.popFiBookVisible = true;
    },
    //关闭销售组织弹框
    onCloseFiBook() {
      this.popFiBookVisible = false;
    },

    //选择销售组织
    onChooseFiBook({ currentTarget }: e) {
      let oldOrgId = this.postorgId
      const { dataset } = currentTarget;
      this.fiBook = { ...this.fiBook, name:dataset.name, id: dataset.key};
      this.popFiBookVisible = false;//关闭销售组织弹框
      // this.methods.getRetailOrderInfo(dataset.key);
      // let list = this[propName]//将库存列表赋值给list
      // this.popList = this.storeHouse//将库存列表赋值给popList


      this.form.stockTrans.orgId = this.fiBook.id;
      this.postFrom.stockTrans.orgId = this.fiBook.id;
      this.postorgId = this.fiBook.id;
      this.$apply()
      // 销售组织改变
      this.methods.getStoreHouse({orgId:this.fiBook.id});
      if(this.fiBook.id!==oldOrgId){
        this.postStore=''
        const { popFiledName } = this.data
        this[popFiledName] = {id:'',name:'请选择'}
        this.sendInventoryInfo = {
          id: '',
          name: '请选择'
        }
        this.$apply()
      }
    },

    //收货联系人变更
    onCustomerNameChange: debounce(500, ({ detail } : any) => {
      this.customerName = detail.trim()
      this.form.stockTrans.contact = detail.trim()
      this.$apply()
    }),

    //收货联系人变更
    onCustomerPhoneChange: debounce(500, ({ detail } : any) => {
      this.customerPhone = detail.trim()
      this.form.stockTrans.phone = detail.trim()
      this.$apply()
    }),
    // 备注
    onNoteChange: debounce(500, ({ detail } : any) => {
      this.note = detail
      this.postFrom.stockTrans.message = detail.trim()
      this.$apply()
    }),
    // 确认提交
    submit: () => {
      this.methods.submited('submitted')
    },
    // 无
    cache: () => {
      this.methods.submited('draft')
    },
    // 确认提交
    submited: (status: string) => {
      if (this.methods.checkParam()) {
        const params = this.$invoke('order', 'getParam')
        // 校验产品是否重复
        const paramObj = {}
        for (const index in params) {
          const param = params[index]
          const key = `${param.itemInfo.model}_${param.itemInfo.colour}`
          // && paramObj[key] !== param.itemInfo.invStatus
          if (paramObj[key]) {
            Toast(`产品型号${param.itemInfo.model}重复，请重新选择产品!`)
            return
          } else {
            paramObj[key] = param.itemInfo.invStatus
          }
        }
        // 组装数据
        const orderInfo = {
          cisCode:wepy.$instance.globalData.cisCode,
          stockTrans: this.postFrom.stockTrans,
          staItem: params.map((param: any) => {
            const itemInfo = param.itemInfo
            return {
              productCode: itemInfo.productCode,
              productName: itemInfo.productName,
              bdemandQty: param.quantity,
              invStatus: param.inventory,//库存状态
              invStatusType:param.invState,   // 补差类型
              price:param.price ,  //价格
              alertInvStatus:param.backInventory,//调整后库存状态
              alertInvStatusType:param.alertInvStatus,//调整后补差类型
            }
          })
        }
        Dialog.confirm({
          title: '提示',
          message: `本单据共有${params.length}个产品，确定要${ status === 'submitted' ? '提交' : '暂存'}吗?`
        }).then(() => {
          this.methods.submitStoreList({
            ...orderInfo,
            _ignoreToast: true,
            _popup: true
          }).then((res: any) => {
            const { code } = res.payload
            if (code === '0') {
              // 保存成功
              Toast.success({
                message: `${ status === 'submitted' ? '提交' : '暂存'}成功`,
                onClose: () => {
                  this.$broadcast('relaunch')
                  const store = getStore()
                  store.dispatch({
                    type: DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
                    payload: ''
                  })
                  this.note = ''
                  this.customerName = ''
                  this.customerPhone = ''
                  this.postFrom = {
                    cisCode: '',
                    stockTrans:{
                      transactionType:'',//事务类型1
                      orgId:'',//销售组织id1
                      gicInWarehouse:'',//入库仓库id
                      gicOutWarehouse:'',//出库仓库id
                      message:'',//备注
                      deliveryMode:'01'//配送方式
                    },
                    staItem:[
                      {
                        productCode:'',//产品编码1
                        productName:'',//产品名称1
                        invStatus:'',//库存状态1
                        invStatusType:'',//补差类型1
                        alertInvStatus:'',//调整后库存状态
                        alertInvStatusType:'',//调整后补差类型
                        price:'',//价格1
                        bdemandQty:'',//调拨数量1
                      }
                    ]


                    //   stockTrans: {
                    //   gicOutWrehouse: '',
                    //     gicInWrehouse: '',
                    //     contact: '',
                    //     message:'',
                    //     phone: '',
                    //     addressId:'',
                    //     deliveryMode: '',
                    //     orgId: ''
                    // },
                    // staItem: [
                    //   {
                    //     productCode: '',
                    //     productName: '',
                    //     bdemandQty: '',
                    //     invStatus: '',
                    //     invStatusType:'',
                    //     price: ''
                    //   }
                    // ]
                  }
                  this.storeHouse={
                    id:'',
                    name:'请选择'
                  }
                  this.fiBook={
                    id:'',
                    name:'请选择'
                  }
                  this.gicOutWrehouse={
                    id:'',
                    name:'请选择'
                  }
                  this.gicInWrehouse={
                    id:'',
                    name:'请选择'
                  }
                  this.allotAddress={
                    id:'',
                    name:'请选择',
                    mobile:'',
                    linkman:''
                  }
                  this.deliveryMethod={
                    id: '',
                    name: '请选择'
                  }
                  this.amount = '0.00'
                  this.amountFirst = '0'
                  this.amountLast='00'
                  this.postStore=''
                  this.postOrgId = ''
                  this.$apply()
                }
              })
            }else{
              Toast.fail("操作失败，"+res.payload.data.msg);
            }
          })
        }).catch(() => {
          // on cancel
        });

      }
    },
    clearData(){


    },
    checkParam: () => {
      // 检查Head里面必填信息
      const { postFrom  } = this.data

      if(this.tabIsShow=='otherOut'){
        if (postFrom.stockTrans.gicOutWarehouse === '') {
          Toast.fail('请选择仓库')
          return false
        }
      }else if(this.tabIsShow=='invStatus'){
        if (postFrom.stockTrans.gicInWarehouse === '') {
          Toast.fail('请选择仓库')
          return false
        }
        if (postFrom.stockTrans.gicOutWarehouse === '') {
          Toast.fail('请选择仓库')
          return false
        }
      }


      if (postFrom.stockTrans.orgId === '') {
        Toast.fail('请选择销售组织')
        return false
      }

      const { errMsg, submitLines } = this.$invoke('order', 'checkParam')
      if (errMsg !== '') {
        Toast.fail(errMsg)
        return false
      } else if (submitLines === 0) {
        Toast.fail('请先添加产品再保存')
        return false
      }
      return true
    },


    // 根据门店获取物料组权限接口
    getStoreMaterial: (code: string) => {
      dmsRequest({
        data: {
          storeCode: code,
          _loading: true,
        },
        method: 'findMaterialByStore'
      }).then(res => {
        this.storeMaterial = res.materialGroup.map((item: string) => {
          return {
            value: item,
          }
        })
        this.$apply()
      })
    }
  }

  watch = {
    'billFrom': function(newValue: Array<ChooseInfo>) {
      if (newValue.length > 0) {
        this.invoiceInfo = newValue[0]
      } else {
        this.invoiceInfo = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    },
    'seller': function(newValue: Array<ChooseInfo>) {
      if (newValue.length > 0) {
        this.saler = newValue[0]
      } else {
        this.saler = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    },
    'stores': function(newValue: Array<ChooseInfo>) {
      if (newValue.length > 0) {
        this.store = newValue[0]
        this.methods.getStoreMaterial(this.store.id)
        this.additionOrderDetailItem.shopCisCode = newValue[0].id
      } else {
        this.store = {
          id: '',
          name: '请选择'
        }
        this.additionOrderDetailItem.shopCisCode = ''
      }
      this.$apply()
    },
    'warehouse': function(newValue: Array<ChooseInfo>) {
      if (newValue.length > 0) {
        this.sendInventoryInfo = newValue[0]
      } else {
        this.sendInventoryInfo = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    },
    'address': function(newValue: Object) {
      const tip = '请选择'
      if (newValue.province.id) {
        this.chooseProvinceInfo = newValue.province
        tip = this.chooseProvinceInfo.name
      }
      if (newValue.city.id) {
        this.chooseCityInfo = newValue.city
        tip += this.chooseCityInfo.name
      }
      if (newValue.country.id) {
        this.chooseRegionInfo = newValue.country
        tip += this.chooseRegionInfo.name
      }
      if (newValue.town.id) {
        this.chooseTownInfo = newValue.town
        tip += this.chooseTownInfo.name
      }

      this.addressTip = tip
      this.$apply()
    },
    'loading': function(newValue: Boolean) {
      if (!newValue) {
        Toast.clear()
      }
    }

  }

  events = {
    'amount-change': (payload: any) => {
      // let payAmount = Number(payload.amount);
      // this.amount = (payAmount).toFixed(2)
      this.amount = `${((+this.amount) + (+payload.amount)).toFixed(2)}`
      this.amountFirst = this.amount.split('.')[0]
      this.amountLast = this.amount.split('.')[1]
    },
    'volume-change': (payload: any) => {
      let payVolume = Number(payload.volume);
      this.volume = (payVolume).toFixed(2)
    }
  }
  onShow(){
    this.freeShippingTip = getAlertInfo('14187495683') // 免运费提示信息
  }
  onLoad() {
    this.$broadcast('retail');
    //初始化时间
    this.sysDate =formatDate(Date.parse(new Date()), 'Y-M-D');
    // this.methods.getRetailOrderInfo();
    //获取配送方式
    this.methods.getDeliveryMethod();
    //获取销售组织
    this.methods.queryAppFiBook();
  }
}
