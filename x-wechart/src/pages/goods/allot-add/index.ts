import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import OrderDetail from '@/pages/goods/components/dms-allot-add-detail/index';
import address from '@/components/dms-address/index';
// import {getStockTransBaseInfo} from '@/store/actions/dmsorder';


import {getStockTransBaseInfo, getRetailOrderInfo, getDeliveryMethod, queryAppFiBook, submitAllotList, getAllocationRatio } from '@/store/actions/dmsorder';
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
  store: ChooseInfo;   // 所属门店
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
  popAllocationRatioVisible:boolean,
  freeShippingTip:string,
  isDisabled: boolean;
}

@connect({
  warehousesInList({ dmsorder }) {
    return dmsorder.warehousesIn
  },
  warehousesOutList({ dmsorder }) {
    return dmsorder.warehousesOut
  },

  addressList({ dmsorder }) {
    return dmsorder.addressList
  },
  fibookList({ dmsorder }) {
    return dmsorder.fibookList
  },

  additionOrderDetailItem({ dmsorder }) {
    return dmsorder.chooseItemInfo
  },
  deliveryMode({ dmsorder }) {
    return dmsorder.deliveryMode
  },
  allocationRatioList({ dmsorder }) {
    return dmsorder.allocationRatioList
  },
}, {
  getStockTransBaseInfo,
  submitAllotList,
  getRetailOrderInfo,
  getDeliveryMethod,
  queryAppFiBook,
  getAllocationRatio
})
export default class ChannelOrder extends wepy.page {
  config = {
    navigationBarTitleText: '调拨录入',
    usingComponents: {
      "van-popup": "/components/vant/popup/index",
      "van-toast": "/components/vant/toast/index",
      "item": "/pages/goods/components/dms-allot-add-detail-item/index",
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
    isDisabled: true, // 如果传参isDisabled=true，组件goods/components/dms-allot-add-detail-item/index表单不可编辑（销售数量、销售价格除外）
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
    storeMaterial: [],


    amount: '0.00',
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
    fiBook:{
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
    allotAddress:{
      id:'',
      name:'请选择',
      mobile:'',
      linkman:'',
      areaStatus:''
    },
    fullAddress:'',
    customerName:'',
    customerPhone:'',
    note:'',
    form:{
      cisCode: '',
      stockTrans: {
        gicOutWarehouse: '',
        gicInWarehouse: '',
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
    popAllocationRatioVisible: false, // 调拨比例显示隐藏变量
  };

  components = {
    order: OrderDetail,
    address,
    popup: PopupToast,
  };

  /**
   * : 保存成功后删除客户信息，商品信息
   */
  methods = {
    //提示框
    noticePopupOpen:() => {
      this.isNoticePopupShow = true;
    },
    noticePopupClose:() => {
      this.isNoticePopupShow = false;
    },

    // 移入移出仓库数据渲染触发
    openChoose: (propName: string, fieldName: string, titleName: string) => {
      let list = this[propName]
      this.popList = list
      this.compareInfo = this[fieldName];
      this.popFiledName = fieldName
      this.popTitle = titleName
      this.popVisible = true
    },
    onClose: () => {
      this.popVisible = false
    },
    /*移入仓库/移出仓库点击事件*/
    onChoose: ({ currentTarget }: e) => {
      const { dataset } = currentTarget
      const { index } = dataset
      const { popFiledName, popList } = this.data
      if('allotAddress' == popFiledName){
        if(popList[index] && popList[index].areaStatus === 'D'){ // 判断行政区域地址库是否失效 A有效，D失效。失效的话禁止选择
          Toast.fail('由于行政区划调整，请您及时更新您的收获地址信息')
          return false
        }
      }

      this[popFiledName] = popList[index]
      this.popVisible = false
      //移出仓库
      if('gicOutWrehouse' == popFiledName){
          this.form.stockTrans.gicOutWarehouse = this.gicOutWrehouse.id;
          this.sendInventoryInfo.id =  this.gicOutWrehouse.id;
      }
      //移入仓库
      if('gicInWrehouse' == popFiledName){
        this.form.stockTrans.gicInWarehouse = this.gicInWrehouse.id;
      }
      //配送方式
      if('deliveryMethod' == popFiledName){
        this.form.stockTrans.deliveryMode = this.deliveryMethod.id;
      }
      //地址
      if('allotAddress' == popFiledName){
        this.form.stockTrans.addressId = this.allotAddress.id;
        this.form.stockTrans.contact  = this.allotAddress.linkman;
        this.form.stockTrans.phone  = this.allotAddress.mobile;
        this.customerName  = this.allotAddress.linkman;
        this.customerPhone  = this.allotAddress.mobile;
      }

    },
    // 开启销售组织
    openChooseFiBook() {
      this.popFiBookVisible = true;
    },

    onCloseFiBook() {
      this.popFiBookVisible = false;
    },

    //选择销售组织
    onChooseFiBook({ currentTarget }: e) {
      const { dataset } = currentTarget;
      this.fiBook = { ...this.fiBook, name:dataset.name, id: dataset.key};
      this.popFiBookVisible = false;
      this.methods.getRetailOrderInfo(dataset.key);
      this.form.stockTrans.orgId = this.fiBook.id;
      this.form.stockTrans.gicInWrehouse = '';
      this.form.stockTrans.gicOutWrehouse = '';
      this.gicOutWrehouse={
        id:'',
        name:'请选择'
      }
        this.gicInWrehouse={
          id:'',
          name:'请选择'
        }
      this.methods.getStockTransBaseInfo({
        orgId:this.form.stockTrans.orgId
      })
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

    onNoteChange: debounce(500, ({ detail } : any) => {
      this.note = detail
      this.form.stockTrans.message = detail.trim()
      this.$apply()
    }),

    submit: () => {
      this.methods.submited('submitted')
    },
    cache: () => {
      this.methods.submited('draft')
    },

    submited: (status: string) => {
      let that = this
      let products=[]
      for(const key in this.additionOrderDetailItem.itemInfo) {
        const item = this.additionOrderDetailItem.itemInfo[key]
        if (item.productLabel && item.productLabel.indexOf('15691143850') >= 0) {
          products.push(item)
        }
      }
      if(products.length>0){
        wx.showModal({
          title: '提示',
          content: '1、当天截单时间内，同批量订单达到起运量（电视3台，白电或全品类2方），则免配送费！\r\n2、当天截单时间内，同批量订单若包含至少1件单价超万元产品或激光，则免配送费！\r\n3、若不满足以上条件，将按照统仓统配合同不足起运量收费标准向您收取物流费用！\r\n⭐以上政策仅限开通统仓统配区域商家！！！',
          success: function (res) {
            if (res.confirm) {
              if (that.methods.checkParam()) {
                that.methods.sendRequest(status)
              }
            }
          },
        })
      }else{
        if (that.methods.checkParam()) {
          that.methods.sendRequest(status)
        }
      }

    },
    sendRequest: (status: string) =>{
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
        stockTrans: this.form.stockTrans,
        staItem: params.map((param: any) => {
          const itemInfo = param.itemInfo
          return {
            productCode: itemInfo.productCode,
            productName: itemInfo.productName,
            bdemandQty: param.quantity,
            invStatus: param.inventory,
            invStatusType:param.invState,   // 补差类型
            price:param.price   // 补差类型
          }
        })
      }

      Dialog.confirm({
        title: '提示',
        message: `本单据共有${params.length}个产品，确定要${ status === 'submitted' ? '提交' : '暂存'}吗?`
      }).then(() => {
        this.methods.submitAllotList({
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
                this.form = {
                  cisCode: '',
                  stockTrans: {
                    gicOutWarehouse: '',
                    gicInWarehouse: '',
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
                      bdemandQty: '',
                      invStatus: '',
                      invStatusType:'',
                      price: ''
                    }
                  ]
                }
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
                    linkman:'',
                    areaStatus:''
                  },
                  this.deliveryMethod={
                    id: '',
                    name: '请选择'
                  },

                  this.$apply()
              }
            })
          }else{
            console.log(res);
            Toast.fail("操作失败，"+res.payload.data.msg);
          }
        })
      }).catch(() => {
        // on cancel
      });
    },

    checkParam: () => {
      // 检查Head里面必填信息
      const { form  } = this.data
      //

      if (form.stockTrans.gicOutWarehouse === '') {
        Toast.fail('请选择移出仓库')
        return false
      }
      if (form.stockTrans.gicInWarehouse === '') {
        Toast.fail('请选择移入仓库')
        return false
      }
      if (form.stockTrans.orgId === '') {
        Toast.fail('请选择销售组织')
        return false
      }
      if (form.staItem.productCode === '') {
        Toast.fail('请选择产品')
        return false
      }
      if (form.staItem.bdemandQty === '') {
        Toast.fail('请填写调拨数量')
        return false
      }
      if (form.staItem.price === '') {
        Toast.fail('请填写价格')
        return false
      }
      const { errMsg, submitLines } = this.$invoke('order', 'checkParam')
      if (errMsg !== '') {
        // toast
        Toast.fail(errMsg)
        return false
      } else if (submitLines === 0) {
        Toast.fail('请先添加产品再保存')
        return false
      }
      return true
    },

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
    },

    // 调拨比例弹框显示
    handleCheckAllocationRatio(){
      this.popAllocationRatioVisible = true
    },

    // 调拨比例弹框隐藏
    onCloseAllocationRatio(){
      this.popAllocationRatioVisible = false
    }
  }

  // plsChoose = {
  //   id: '',
  //   name: '请选择'
  // }

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
      let payAmount = Number(payload.amount);
      this.amount = (payAmount).toFixed(2)
    },
    'volume-change': (payload: any) => {
      let payVolume = Number(payload.volume);
      this.volume = (payVolume).toFixed(2)
    }
  }

  onShow() {
    this.freeShippingTip = getAlertInfo('14187495683') // 免运费提示信息
  }

  onLoad() {
    this.$broadcast('retail');
    //初始化时间
    this.sysDate =formatDate(Date.parse(new Date()), 'Y-M-D');
    this.methods.getRetailOrderInfo();
    //获取配送方式
    this.methods.getDeliveryMethod();
    //获取销售组织
    this.methods.queryAppFiBook();
    //获取移入移出仓库
    this.methods.getStockTransBaseInfo()
    //获取调拨比例
    this.methods.getAllocationRatio()
  }
}
