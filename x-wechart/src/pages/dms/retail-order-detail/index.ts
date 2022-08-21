import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import OrderDetail from '@/components/dms-order-addition-detail/index';
import address from '@/components/dms-address/index';

import {
  getRetailOrderInfo,
  getWarehouseList,
  getZoneB2cServiceList,
  submitRetailOrder,
  getCisPrice,
  queryAppFiBook,
  getCisDeliveryMethod,
  getLsPrice,
} from '@/store/actions/dmsorder';
import retailOrder from '@/mixins/channel-retail-order';
import { debounce } from 'throttle-debounce';
import { formatDate, checkTel } from '@/utils/index';
import { DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR, DMS_CHANNEL_ORDER_ADD_ITEMS, DMS_CIS_CODE_INFO } from '@/store/types/dmsorder';
import Dialog from '@/components/vant/dialog/dialog';
import { toRetailOrderEdit } from '@/store/actions/salesorderdetail';
import { dmsRequest } from '@/store/actions/dmsrequest'
import { getItemInvStatus } from '@/store/actions/dmsorder';
import PopupToast from '@/components/popup-toast/index';
import utilsWxs from '../../../wxs/utils.wxs';

interface ChooseInfo {
  id: number | string;
  name: string;
}

interface Data {
  popTitle: string; note: string; zoneB2cService: any[]; deliveryMethod: { name: string; id: string }; saleType: { name: string; id: string }; saler: { name: string; id: string }; deliveryAndInstall: ({ name: string; id: string } | { name: string; id: string })[]; storeMaterial: any[]; chooseRegionInfo: { name: string; id: string }; customerPhone: string; outInv: { name: string; id: string }; compareInfo: {}; receiverDetail: string; serverPopVisible: boolean; invoiceInfo: { name: string; id: string }; amount: string; isDeliveryAndInstall: { name: string; id: string }; warehouseList: any[]; addressTip: string; store: { name: string; id: string }; customerName: string; zoneB2cServiceNames: any[]; sendInventoryInfo: { name: string; id: string }; chooseTownInfo: { name: string; id: string }; popFiledName: string; showMore: boolean; chooseCityInfo: { name: string; id: string }; fiBook: { name: string; id: string }; popVisible: boolean; popFiBookVisible: boolean; popList: any[]; chooseProvinceInfo: { name: string; id: string }; fileList: any[]; fileIds:any[]; isSignTheAgreement:boolean
}

@connect({
  loading({ loading }) {
    return loading.loading
  },
  billFrom({ dmsorder }) {
    return dmsorder.retailOrderBaseInfo.billFrom
  },
  seller({ dmsorder }) {
    return dmsorder.retailOrderBaseInfo.seller
  },
  stores({ dmsorder }) {
    return dmsorder.retailOrderBaseInfo.store
  },
  warehouse({ dmsorder }) {
    return dmsorder.retailOrderBaseInfo.warehouse
  },
  address({ dmsorder }) {
    return dmsorder.retailOrderBaseInfo.address
  },
  dmsAddress({ address }) {
    return address.dmsAddress
  },
  orderdetail({ salesorderdetail }) {
    return salesorderdetail.retailorderdetail
  },
  additionOrderDetailItem({ dmsorder }) {
    return dmsorder.chooseItemInfo
  },
  fibookList({ dmsorder }) {
    return dmsorder.fibookList
  },
  deliveryMode({ dmsorder }) {
    return dmsorder.cisDeliveryMode
  },
  serviceList({ dmsorder }) {
    return dmsorder.serviceList
  },
}, {
  getRetailOrderInfo,
  submitRetailOrder,
  toRetailOrderEdit,
  getItemInvStatus,
  getCisPrice,
  getCisDeliveryMethod,
  queryAppFiBook,
  getWarehouseList,
  getZoneB2cServiceList,
  getLsPrice
})
export default class RetailOrderDetail extends wepy.page {
  config = {
    navigationBarTitleText: '零售订单编辑',
    usingComponents: {
      "van-popup": "/components/vant/popup/index",
      "van-toast": "/components/vant/toast/index",
      "item": "/components/dms-order-addition-detail-item/index",
      "van-icon": "/components/vant/icon/index",
      "van-submit-bar": "/components/vant/submit-bar/index",
      "van-transition": "/components/vant/transition/index",
      "van-field": "/components/vant/field/index",
      "van-dialog": "/components/vant/dialog/index",
      "stores": "/components/stores-return/index",
      "van-uploader": "/components/vant/uploader/index",

    },
  };
  wxs = {
    utils: utilsWxs,
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
  }];
  distributionType = [{
    id: '02',
    name: '配送'
  }, {
    id: '01',
    name: '自提'
  }, {
      id: '03',
      name: '配送（加急）'
    }, {
    id: '07',
    name: '直配到工地'
  }]

  data: Data = {
    showMore: false,
    store: {
      id: '',
      name: '请选择'
    },
    storeMaterial: [],

    outInv: {
      id: '0',
      name: '否'
    },
    customerName: '个人',
    customerPhone: '',
    // 发货仓库
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
    },   // id name
    //
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
    fiBook: {
      id:'',
      name:'请选择'
    },
    deliveryMethod :{
      id:'',
      name:'请选择'
    },
    isDeliveryAndInstall :{
      id:'0',
      name:'否'
    },
    deliveryAndInstall:[
      {id:'1',name:'是'},
      {id:'0',name:'否'}
    ],
    note: '',
    amount: '0.00',
    popList: [],
    popTitle: '',
    popVisible: false,
    popFiledName: '',
    compareInfo: {},
    popFiBookVisible:false,
    zoneB2cService:[],
    zoneB2cServiceNames:[],
    serverPopVisible:false,
    warehouseList:[],
    fileList: [],
    fileIds: [],
    isSignTheAgreement: false, // 商家是否签订协议
  };

  components = {
    order: OrderDetail,
    address,
    popup: PopupToast,
  };

  /**
   * TODO: 保存成功后删除客户信息，商品信息
   */
  methods = {
    // 上传图片
    beforeRead:()=>{
      let self = this
      Toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration:20*1000
      });
      self.$apply();
    },
    //上传图片
    afterRead(event) {
      const self =  this
      let { file } = event.detail
      let fileName = 'file'
      let filePath = file.path

      const { sessionId, modifySession, account, cisCode, ssoLoginToken} = this.$parent.globalData;
      let Cookie;
      if (sessionId || modifySession) {
        Cookie = `JSESSIONID=${sessionId || modifySession}`;
      }
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.uploadFile({
        url: `${wepy.$appConfig.dmsBaseUrl}/wechatEntrance/entrance.do?account=${account}&method=uploadAttachment&type=1`,
        filePath: file.path,
        header: {
          Cookie,
          ssoLoginToken,
          "Content-Type": "multipart/form-data",
        },
        name: fileName,
        formData: {
          businessType: 'retailOrder',
          cisCode,
          file: [filePath],
        },
        success(res) {
          const { data } = JSON.parse(res.data)
          if(data.length>0){
            self.fileList.push({
              url: data[0].fileMapperPath,
              name: data[0].fileRealName,
              deletable: true
            })
            self.fileIds.push(data[0].id)
          }
          self.$apply();
        }
      });
    },

    delImg: (event) => {
      this.fileIds.splice(event.detail.index,1)
      this.fileList.splice(event.detail.index,1)
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
        this.sendInventoryInfo.name = '请选择'
        // this.methods.getWarehouseList(dataset.key).then(res=>{
        //   const data = res.payload.data||[];
        //   this.warehouseList = data.map(it=>{
        //     return{
        //       name:it.name,
        //       id:it.cId,
        //       type:it.type//20统仓 70原仓
        //     }
        //   })
        //   this.$apply();
        // })
        this.getWarehouseData(dataset.key)
        this.methods.getServiceList();
      },
    onChooseService: ({ currentTarget }: e) => {
      if(currentTarget.dataset.issupport==0){
        return
      }
      const key = currentTarget.dataset.key
      const name = currentTarget.dataset.name
      const ids = new Set(this.zoneB2cService)
      if(ids.has(key)){
        ids.delete(key)
      }else{
        ids.add(key)
      }
      this.zoneB2cService=Array.from(ids)
      const names = new Set(this.zoneB2cServiceNames)
      if(names.has(name)){
        names.delete(name)
      }else{
        names.add(name)
      }
      this.zoneB2cServiceNames=Array.from(names)
      this.$apply();
    },
    //获取服务列表
    getServiceList:()=>{
      if(!this.fiBook.id){
        return
      }
      if(!this.sendInventoryInfo.id){
        return
      }
      if(!this.chooseProvinceInfo.id){
        return
      }

      this.zoneB2cService = []
      this.zoneB2cServiceNames = []

      // 根据发货仓库+配送方式，服务方式字段变化显示
      // 如果仓库为统仓，配送方式选择“配送、自提、配送（加急）“，服务方式字段显示，可选择
      // 如果仓库为统仓，配送方式为“直配到工地“，服务方式字段隐藏，取值空
      // 如果仓库为原仓，服务方式字段隐藏，取值空
      if(this.sendInventoryInfo.type == 20 && this.deliveryMethod.id!='07'){
        this.methods.getZoneB2cServiceList({
          orgCode:this.fiBook.id,
          warehouseCode:this.sendInventoryInfo.id,
          provinceCode:this.chooseProvinceInfo.id,
          cityCode:this.chooseCityInfo.id,
          countyCode:this.chooseRegionInfo.id,
          townCode:this.chooseTownInfo.id,
        }).then((res)=>{
          const { payload } = res

          // 校验商家是否签订2C协议：
          if(payload.code == 0 && payload.data && payload.data.length>0){
            this.isSignTheAgreement = true
          }else{
            this.isSignTheAgreement = false
          }
          this.serviceList.forEach(it=>{
            if(it.isSupport==='1'&&it.isDefault==='1'){
              this.zoneB2cService.push(it.serviceCode)
              this.zoneB2cServiceNames.push(it.serviceName)
            }
          })
          this.$apply();
        });
      }

    },
    //
    openTopAddress() {
      const { chooseProvinceInfo, chooseCityInfo, chooseRegionInfo, chooseTownInfo } = this.data;
      this.$invoke('address', 'openAddressPopup', {
        province: chooseProvinceInfo.id,
        city: chooseCityInfo.id,
        area: chooseRegionInfo.id,
        town: chooseTownInfo.id
      }, (item: any, address: any) => {
        this.addressTip = item.name
        this.chooseProvinceInfo = {
          id: address.provinceId,
        }
        this.chooseCityInfo = {
          id: address.cityId,
        }
        this.chooseRegionInfo = {
          id: address.areaId,
        }
        this.chooseTownInfo = {
          id: address.townId,
        }
        this.methods.getServiceList();
        this.$apply()
      });
    },
    // 应该获取那个值给popList   应该对比那个字段为选中信息
    openChoose: (propName: string, fieldName: string, titleName: string) => {
       // 选择发货仓库前必须先选择销售组织
      if(propName == 'warehouse' && (!this.data.fiBook.id || this.data.fiBook =='')) {
        Toast('请先选择销售组织');
        return false;
      }
      let list = this[propName]
      if (!list) {
        list = this.customerInfos[propName]
      }
      if (list.length === 0) {
        // Toast(`暂无${titleName}`)
        return
      }
      this.popList = list

      this.compareInfo = this.data[fieldName]
      this.popFiledName = fieldName
      this.popTitle = titleName
      this.popVisible = true
    },
    // 服务选择框
    openServerPopVisible: () => {
      this.serverPopVisible = true
    },
    closeServerPopVisible: () => {
      this.serverPopVisible = false
    },
    onClose: () => {
      this.popVisible = false
    },
    onChoose: ({ currentTarget }: e) => {
      const { dataset } = currentTarget
      const { index } = dataset
      const { popFiledName, popList } = this.data
      this[popFiledName] = popList[index]
      this.popVisible = false

      //根据销售类型不同获取对应配送方式
      if(popFiledName == 'saleType'){
        this.methods.getCisDeliveryMethod({type:this.saleType.id});
      }
      this.methods.getServiceList();

      if (popFiledName === 'store') {
        const storeId = popList[index].id
        this.methods.getStoreMaterial(storeId)

        this.additionOrderDetailItem.shopCisCode = storeId
        let productIds = []
        for(const key in this.additionOrderDetailItem.itemInfo) {
          const item = this.additionOrderDetailItem.itemInfo[key]
          if (item.productCode) {
            productIds.push(item.productCode)
          }
        }
        if(productIds.length > 0) {
          // 获取最新价格
          this.methods.getCisPrice({
            type: '3',
            refreshPrice: true,
            shopCisCode: storeId,
            productId: productIds.join(',')
          })
        }

      }
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

    showMore: () => {
      this.showMore = true
    },
    hiddenMore: () => {
      this.showMore = false
    },
    submit: () => {
      this.methods.submited('submitted')
    },
    cache: () => {
      this.methods.submited('draft')
    },
    // ”draft”为保存，”submitted”为提交
    submited: (status: string) => {
      if (this.methods.checkParam()) {
        const { submited,isDeliveryAndInstall,amount, store, note, outInv, sendInventoryInfo, receiverDetail, customerName, customerPhone, invoiceInfo, saler, chooseProvinceInfo, chooseCityInfo, chooseRegionInfo, chooseTownInfo, saleType, fiBook , deliveryMethod, zoneB2cService  } = this.data
        const params = this.$invoke('order', 'getParam')

        // 校验产品是否重复
        const paramObj : string[] = []
        for (const index in params) {
          const param = params[index]
          const key = `${param.itemInfo.model}_${param.itemInfo.colour}`
          if (paramObj.indexOf(key) > -1) {
            Toast(`产品型号${param.itemInfo.model}重复，请重新选择产品!`)
            return
          } else {
            paramObj.push(key)
          }
        }

        const time = formatDate(Date.parse(new Date()), 'Y-M-D')
        // 组装数据
        const orderInfo = {
          status,
          salesOrder: {
            id: this.currentOrderId,
            documentDate: time,           //下单时间
            edt: time,
            orgId: fiBook.id,              //销售组织                     //期望时间
            isOutbound: outInv.id,                           //是否自动出库
            customerName,      //客户名
            phone: customerPhone,                   //电话
            billFromId: invoiceInfo.id,                     //开票方
            sellerCode: saler.id,                            //业务员
            storeCode: store.id,                         //门店
            warehouseId: sendInventoryInfo.id,                     //仓库
            provinceId: chooseProvinceInfo.id,                       //省
            cityId: chooseCityInfo.id,                         //市
            countryId: chooseRegionInfo.id,                       //县
            townId: chooseTownInfo.id,                        //区
            fullAddress: receiverDetail,                  //地址详情
            retailType: saleType.id,                 //销售类型
            payAmount: amount,                     //收款金额
            discountAmount: 0,                //折让金额
            totalAmount: amount,                    //订单金额
            message: note,                         //备注
            deliveryMode: deliveryMethod.id,      //配送方式
            zoneB2cService: zoneB2cService.join(','),
            isDeliveryAndInstall: isDeliveryAndInstall.id,      //配送方式
            salesOrderItem: params.map((param: any) => {
              const itemInfo = param.itemInfo
              return {
                zoneB2cService: zoneB2cService.join(','),
                itemId: itemInfo.itemId || '',
                bigUom: itemInfo.uom,
                productCode: itemInfo.productCode,
                productName: itemInfo.productName,
                model: itemInfo.model,
                colour: itemInfo.colour,
                borderedQty: param.quantity,
                bdemandQty: param.quantity,
                bprice: (+param.price).toFixed(2),
                amount: param.amount,
                invStatus: param.inventory,
                invStatusType:param.invState,  // 补差类型
                orgId:fiBook.id,
                deliveryMode:deliveryMethod.id,
                isDeliveryAndInstall:isDeliveryAndInstall.id
              }
            })
            }
        }

        Dialog.confirm({
          title: '提示',
          message: `本单据共有${params.length}个产品，确定要${ status === 'submitted' ? '提交' : '暂存'}吗?`
        }).then(() => {
          this.methods.submitRetailOrder({
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
                  wx.navigateBack({
                    delta: 1,
                  });
                }
              })
            }
          })
        }).catch(() => {
          // on cancel
        });

      }
    },
    checkParam: () => {
      // 检查Head里面必填信息
      // 除发货仓库，其他均是必选
      const { store, outInv, customerName, customerPhone, invoiceInfo, saler, chooseProvinceInfo, saleType,fiBook,deliveryMethod,receiverDetail  } = this.data

      if (!store.id) {
        Toast.fail('请选择门店')
        return false
      }
      if (!fiBook.id || fiBook.id == '') {
        Toast.fail('请选择销售组织')
        return false
      }
      if (!saleType.id) {
        Toast.fail('请选择销售类型')
        return false
      }
      // if (!outInv.id) {
      //   Toast.fail('请选择是否出库')
      //   return false
      // }
      if (customerName === '') {
        Toast.fail('请填写客户名称')
        return false
      }
      if (customerPhone === '') {
        Toast.fail('请填写联系电话')
        return false
      }
      if (!checkTel(customerPhone)) {
        Toast.fail('请填写正确手机号或座机')
        return false
      }
      if(this.sendInventoryInfo.type=='20'){
        if (receiverDetail === '') {
          Toast.fail('请填写详细地址')
          return false
        }
      }
      if (!deliveryMethod.id || deliveryMethod == '') {
        Toast.fail('请选择配送方式')
        return false
      }

      // if (!invoiceInfo.id) {
      //   Toast.fail('请选择开票方')
      //   return false
      // }
      if (!saler.id) {
        Toast.fail('请选择业务员')
        return false
      }

      if(!this.sendInventoryInfo.id){
        Toast.fail('请选择发货仓库')
        return false
      }
      if(!deliveryMethod.id){
        Toast.fail('请选择配送方式')
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
    onNoteChange: debounce(500, ({ detail } : any) => {
      this.note = detail
      this.$apply()
    }),
    onCustomerPhoneChange: debounce(500, ({ detail } : any) => {
      this.customerPhone = detail.trim()
      this.$apply()
    }),
    onCustomerNameChange: debounce(500, ({ detail } : any) => {
      this.customerName = detail.trim()
      this.$apply()
    }),
    onReceiverDetailChange: debounce(500, ({ detail } : any) => {
      this.receiverDetail = detail.trim()
      this.$apply()
    })
  }

  // plsChoose = {
  //   id: '',
  //   name: '请选择'
  // }

  watch = {
    // 'deliveryMode': function(newValue: Array<ChooseInfo>) {
    //   if (newValue && newValue.length > 0) {
    //     this.deliveryMethod = newValue[0]
    //   } else {
    //     this.deliveryMethod = {
    //       id: '',
    //       name: '请选择'
    //     }
    //   }
    //   this.$apply()
    // },

    // 'billFrom': function(newValue: Array<ChooseInfo>) {
    //   if (newValue.length > 0) {
    //     this.invoiceInfo = newValue[0]
    //   } else {
    //     this.invoiceInfo = {
    //       id: '',
    //       name: '请选择'
    //     }
    //   }
    //   this.$apply()
    // },
    // 'seller': function(newValue: Array<ChooseInfo>) {
    //   if (newValue.length > 0) {
    //     this.saler = newValue[0]
    //   } else {
    //     this.saler = {
    //       id: '',
    //       name: '请选择'
    //     }
    //   }
    //   this.$apply()
    // },
    // 'stores': function(newValue: Array<ChooseInfo>) {
    //   if (newValue.length > 0) {
    //     this.store = newValue[0]
    //     this.methods.getStoreMaterial(this.store.id)
    //   } else {
    //     this.store = {
    //       id: '',
    //       name: '请选择'
    //     }
    //   }
    //   this.$apply()
    // },
    // 'warehouse': function(newValue: Array<ChooseInfo>) {
    //   if (newValue.length > 0) {
    //     this.sendInventoryInfo = newValue[0]
    //   } else {
    //     this.sendInventoryInfo = {
    //       id: '',
    //       name: '请选择'
    //     }
    //   }
    //   this.$apply()
    // },
    // 'address': function(newValue: Object) {
    //   const tip = '请选择'
    //   if (newValue.province.id) {
    //     this.chooseProvinceInfo = newValue.province
    //     tip = this.chooseProvinceInfo.name
    //   }
    //   if (newValue.city.id) {
    //     this.chooseCityInfo = newValue.city
    //     tip += this.chooseCityInfo.name
    //   }
    //   if (newValue.country.id) {
    //     this.chooseRegionInfo = newValue.country
    //     tip += this.chooseRegionInfo.name
    //   }
    //   if (newValue.town.id) {
    //     this.chooseTownInfo = newValue.town
    //     tip += this.chooseTownInfo.name
    //   }

    //   this.addressTip = tip

    //   this.$apply()
    // }
  }

  events = {
    'amount-change': (payload: any) => {
      this.amount = `${((+this.amount) + (+payload.amount)).toFixed(2)}`
    }
  }
  getWarehouseData(id){
    this.methods.getWarehouseList(id).then(res=>{
      const data = res.payload.data||[];
      this.warehouseList = data.map(it=>{
        return{
          name:it.name,
          id:it.cId,
          type:it.type//20统仓 70原仓
        }
      })
      this.$apply();
    })
  }
  onShow() {
    if (this.loading) {
      Toast.loading({
        message: '正在加载',
        duration: 0
      })
    }
  }

  async onLoad(e: { id: any; }) {
  // onLoad(params) {
    // if (params.loadCustomerInfo) {
    //   this.methods.getNormalSalesOrderCustomerInfo({ customerCode: chooseCustomerInfo.customerCode })
    // }

    const { id } = e
    this.currentOrderId = id
    this.$broadcast('retail')
    this.methods.getRetailOrderInfo()
    this.methods.queryAppFiBook(); // 获取销售组织
    // this.methods.getCisDeliveryMethod(); // 获取配送方式
    await this.methods.toRetailOrderEdit({ salesOrderId: this.currentOrderId }).then(({ payload }: any) => {
      const { salesOrder } = payload
      const {
        isOutbound, // 是否出库,
        billFromId, // 开票方,
        billFromName, // 开票方
        customerName, // 客户
        phone, // 电话
        warehouseId,  // 发货仓库
        warehouseName,
        sellerCode,  // 业务员
        sellerName,
        townId,
        town: townName,
        cityId,
        city: cityName,
        countryId,
        country: countryName,
        provinceId,
        province: provinceName,
        fullAddress, // 详细地址
        retailType, // 销售类型
        message,
        salesOrderItem,
        storeCode,
        storeName,
        orgId,
        orgName,
        deliveryMode,
        deliveryMethodName,
        isDeliveryAndInstall
      } = salesOrder

      this.store = {
        id: storeCode,
        name: storeName
      }

      this.methods.getStoreMaterial(storeCode)

      this.invoiceInfo = {
        id: billFromId,
        name: billFromName
      }

      const isOut = this.outInvs.find((item) => item.id === isOutbound) || this.outInvs[0]
      this.outInv = isOut

      this.customerName = customerName
      this.customerPhone = phone


      this.sendInventoryInfo = {
        id: warehouseId,
        name: warehouseName
      }

      const isfiBook= this.fibookList.find((item) => item.id === orgId) || '请选择'
      this.fiBook = {
        id: orgId,
        name: isfiBook.name
      }
      const isDelivery = this.distributionType.find((item) => item.id === deliveryMode) || '请选择'
      this.deliveryMethod = {
        id:deliveryMode,
        name:isDelivery.name
      }
      const deliveryAndInstallTemp = this.deliveryAndInstall.find((item) => item.id == isDeliveryAndInstall) || ''

      if(deliveryAndInstallTemp){
        this.isDeliveryAndInstall = {
          id:deliveryAndInstallTemp.id,
          name:deliveryAndInstallTemp.name
        }
      }


      this.saler = {
        id: sellerCode,
        name: sellerName
      }

      this.addressTip = `${provinceName}${cityName}${countryName}${townName}`
      this.chooseProvinceInfo = {
        id: provinceId,
        name: provinceName
      }
      this.chooseCityInfo = {
        id: cityId,
        name: cityName
      }
      this.chooseRegionInfo = {
        id: countryId,
        name: countryName
      }
      this.chooseTownInfo = {
        id: townId,
        name: townName
      }

      this.receiverDetail = fullAddress

      const saleType = this.saleTypes.find((item) => item.id === retailType) || this.saleTypes[0]
      this.saleType = saleType

      this.note = message

      const keys: Array<String> = []
      const items = {}

      const productIds = []

       salesOrderItem.forEach(({ invStatus, itemId, bigUom, productCode, productName, model, colour, borderedQty, bprice, amount } : any) => {
        const key = `_${(new Date()).valueOf()}`
        keys.push(key)
        productIds.push(productCode)

        this.methods.getItemInvStatus({
          productCode,
        })

         // 先调用建议零售价格接口--用于回显建议零售价格
        this.methods.getLsPrice({
          type: '3',
          refreshPrice: true,
          shopCisCode: storeCode,
          productId: productCode
        }).then((item)=>{
          items[key] = {
            orgId,
            itemId,
            productCode,               //产品编码
            productName,               //产品名称
            model,                  //型号
            colour,                      //颜色
            suggestPrice:item.payload.price,                      //零售订单建议价格
            quantity: borderedQty,                   //销售数量
            price: bprice,                       //销售价格
            amount: (+amount).toFixed(2),                      //金额
            invStatusId:invStatus,                   //库存状态id
            invStatus: [],  // 发送获取库存接口
            uom: bigUom                           //单位
          }
        })

      })
      this.methods.getCisPrice({
        type: '3',
        productId: productIds.join(','),
        shopCisCode: storeCode
      })

      // DMS_CHANNEL_ORDER_ADD_ITEMS
      getStore().dispatch({
        type: DMS_CHANNEL_ORDER_ADD_ITEMS,
        payload: items,
      })
      this.$broadcast('details',keys.join(','))
      this.methods.getCisDeliveryMethod({type:this.saleType.id}); // 获取配送方式
      this.getWarehouseData( this.fiBook.id )
      this.$apply()
      getStore().dispatch({
        type: DMS_CIS_CODE_INFO,
        payload: {
          shopCisCode: storeCode
        }
      })
    })
  }
}
