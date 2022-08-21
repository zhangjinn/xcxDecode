import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import OrderDetail from '@/components/dms-order-addition-detail/index';
import address from '@/components/dms-address/index';
import addressDetail from '@/pages/components/select-address-details/index';

import { getRetailOrderInfo, getWarehouseList, submitRetailOrder, getCisPrice, getCisDeliveryMethod, queryAppFiBook, getLsPrice, getZoneB2cServiceList, getOldMachCategoryList,getOldMachTreatWayList } from '@/store/actions/dmsorder';
import retailOrder from '@/mixins/channel-retail-order';
import { debounce } from 'throttle-debounce';
import { formatDate, checkTel, getAlertInfo } from '@/utils/index';
import { DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR, DMS_RETAIL_ORDER_RESER_CHOOSE } from '@/store/types/dmsorder';
import Dialog from '@/components/vant/dialog/dialog';
import { dmsRequest } from '@/store/actions/dmsrequest'
import PopupToast from '@/components/popup-toast/index';
import utilsWxs from '../../../wxs/utils.wxs';
interface ChooseInfo {
  id: number | string;
  name: string;
}

interface Data {
  popTitle: string; note: string; zoneB2cService: any[]; zoneB2cServiceNames: any[]; deliveryMethod: { name: string; id: string }; saleType: { name: string; id: string };oldNew: { name: string; id: Number }; completeOld: { name: string; id: Number },oldMachCategoryList: any[];oldMachCategory: {id: string,name: string};oldMachTreatWayList: any[];oldMachTreatWay: {id: string,name: string};saler: { name: string; id: string }; deliveryAndInstall: ({ name: string; id: string } | { name: string; id: string })[]; expressFee: any; storeMaterial: any[]; chooseRegionInfo: { name: string; id: string }; customerPhone: string; isNoticePopupShow: boolean; outInv: { name: string; id: string }; compareInfo: {}; receiverDetail: string; invoiceInfo: { name: string; id: string }; amount: string; isDeliveryAndInstall: { name: string; id: string }; addressTip: string; store: { name: string; id: string }; customerName: string; volume: string; sendInventoryInfo: { name: string; id: string }; chooseTownInfo: { name: string; id: string }; popFiledName: string; showMore: boolean; chooseCityInfo: { name: string; id: string }; fiBook: { name: string }; popVisible: boolean; popFiBookVisible: boolean; popList: any[]; chooseProvinceInfo: { name: string; id: string }; warehouseList: any[]; serverPopVisible: boolean; fileList: any[]; fileIds: any[]; isSignTheAgreement: false; dynamicMessage: object; calendarShow: boolean; expectedDeliveryDate: string; currentDate: any;
  isDisabled: boolean;
  ly: string;
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
  fibookList({ dmsorder }) {
    return dmsorder.fibookList
  },
  dmsAddress({ address }) {
    return address.dmsAddress
  },
  additionOrderDetailItem({ dmsorder }) {
    return dmsorder.chooseItemInfo
  },
  deliveryMode({ dmsorder }) {
    return dmsorder.cisDeliveryMode
  },
  serviceList({ dmsorder }) {
    return dmsorder.serviceList
  },

}, {
  getRetailOrderInfo,
  getWarehouseList,
  submitRetailOrder,
  getCisPrice,
  getLsPrice,
  getCisDeliveryMethod,
  getOldMachCategoryList,
  getOldMachTreatWayList,
  queryAppFiBook,
  getZoneB2cServiceList
})
export default class ChannelOrder extends wepy.page {
  config = {
    navigationBarTitleText: '零售录入',
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
      'calendar': '/components/calendar/index',
      'van-datetime-picker': '/components/vant/datetime-picker/index',
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
  oldNews = [{
    id: 0,
    name: '否'
  }, {
    id: 1,
    name: '是'
  }];
  completeOlds = [{
    id: 0,
    name: '否'
  }, {
    id: 1,
    name: '是'
  }];

  outInvs = [{
    id: '0',
    name: '否'
  }, {
    id: '1',
    name: '是'
  }]

  data: Data = {
    isDisabled: true, // 如果传参isDisabled=true，组件components/dms-order-addition-detail-item/index表单不可编辑（销售数量、销售价格除外）
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
    customerName: '个人',
    customerPhone: '',
    sendInventoryInfo: { // 发货仓库
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
    oldNew: {
      id: 0,
      name: '否'
    },
    completeOld: {
      id: 0,
      name: '否'
    },
    oldMachCategoryList: [],
    oldMachCategory: {
      id: '',
      name: ''
    },
    oldMachTreatWayList: [],
    oldMachTreatWay: {
      id: '',
      name: ''
    },
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

    note: '',
    amount: '0.00',
    volume: '0.00',
    popList: [],
    popTitle: '',
    popVisible: false,
    popFiledName: '',
    compareInfo: {},
    isNoticePopupShow: false,
    popFiBookVisible: false,
    expressFee: wepy.$instance.globalData.expressFee,
    fiBook: {
      name: '请选择'
    },
    isDeliveryAndInstall: {
      id: '0',
      name: '否'
    },
    deliveryAndInstall: [
      { id: '1', name: '是' },
      { id: '0', name: '否' }
    ],
    fileList: [],
    fileIds: [],
    zoneB2cService: [],
    zoneB2cServiceNames: [],
    serverPopVisible: false,
    warehouseList: [],
    isSignTheAgreement: false, // 商家是否签订协议
    dynamicMessage: { // 动态获取提示信息汇总
      freeShippingTip: '', // 免运费提示信息
      signAgreementInfo: '', // 签订协议提示信息
      noSignAgreementInfo: '', // 未签订协议提示信息
      straightConstructionSite: '', // 直配到工地提示信息
      retailInfo: '', // 统仓并且为零售弹窗提示
      engineeringInfo: '', // 统仓并且为工程弹窗提示
    },
    calendarShow: false,
    expectedDeliveryDate: '', // 期望到货日期
    currentDate: new Date().getTime(), // 期望到货日期弹框显示当前日期
    ly: 'retail',
  };

  components = {
    order: OrderDetail,
    address,
    addressDetail,
    popup: PopupToast,
  };

  /**
   * TODO: 保存成功后删除客户信息，商品信息
   */
  methods = {
    // 上传图片
    beforeRead: () => {
      let self = this
      Toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 20 * 1000
      });
      self.$apply();
    },
    //上传图片
    afterRead(event) {
      const self = this
      let { file } = event.detail
      let fileName = 'file'
      let filePath = file.path

      const { sessionId, modifySession, account, cisCode, ssoLoginToken } = this.$parent.globalData;
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
          if (data.length > 0) {
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
      this.fileIds.splice(event.detail.index, 1)
      this.fileList.splice(event.detail.index, 1)
    },
    //提示框
    noticePopupOpen: () => {
      this.isNoticePopupShow = true;
    },
    noticePopupClose: () => {
      this.isNoticePopupShow = false;
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
    //获取服务列表
    getServiceList: () => {
      if (!this.fiBook.id) {
        return
      }
      if (!this.sendInventoryInfo.id) {
        return
      }
      if (!this.chooseProvinceInfo.id) {
        return
      }

      this.zoneB2cService = []
      this.zoneB2cServiceNames = []

      // 根据发货仓库+配送方式，服务方式字段变化显示
      // 如果仓库为统仓，配送方式选择“配送、自提、配送（加急）“，服务方式字段显示，可选择
      // 如果仓库为统仓，配送方式为“直配到工地“，服务方式字段隐藏，取值空
      // 如果仓库为原仓，服务方式字段隐藏，取值空
      if (this.sendInventoryInfo.type == 20 && this.deliveryMethod.id && this.deliveryMethod.id != '07') {
        this.methods.getZoneB2cServiceList({
          orgCode: this.fiBook.id,
          warehouseCode: this.sendInventoryInfo.id,
          provinceCode: this.chooseProvinceInfo.id,
          cityCode: this.chooseCityInfo.id,
          countyCode: this.chooseRegionInfo.id,
          townCode: this.chooseTownInfo.id,
        }).then((res) => {
          const { payload } = res

          // 校验商家是否签订2C协议：
          if (payload.code == 0 && payload.data && payload.data.length > 0) {
            this.isSignTheAgreement = true
          } else {
            this.isSignTheAgreement = false
          }
          this.serviceList.forEach(it => {
            if (it.isSupport === '1' && it.isDefault === '1') {
              this.zoneB2cService.push(it.serviceCode)
              this.zoneB2cServiceNames.push(it.serviceName)
            }
          })
          this.$apply();
        });
      }

    },
    // 应该获取那个值给popList   应该对比那个字段为选中信息
    openChoose: (propName: string, fieldName: string, titleName: string) => {
      // 选择发货仓库前必须先选择销售组织
      if (propName == 'warehouse' && (!this.data.fiBook.id || this.data.fiBook == '')) {
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
      if (popFiledName == 'saleType') {
        this.methods.getCisDeliveryMethod({ type: this.saleType.id });
      }
      this.methods.getServiceList();

      if (popFiledName === 'store') {
        const storeId = popList[index].id
        this.methods.getStoreMaterial(storeId)

        this.additionOrderDetailItem.shopCisCode = storeId
        let productIds = []
        const shopCisCodes = []
        for (const key in this.additionOrderDetailItem.itemInfo) {
          const item = this.additionOrderDetailItem.itemInfo[key]
          if (item.productCode) {
            shopCisCodes.push(storeId)
            productIds.push(item.productCode)
          }
        }
        if (productIds.length > 0) {
          // 获取最新价格
          this.methods.getLsPrice({
            type: '3',
            refreshPrice: true,
            shopCisCode: storeId,
            productId: productIds.join(',')
          })
        }
      }
    },

    onChooseService: ({ currentTarget }: e) => {
      if (currentTarget.dataset.issupport == 0) {
        return
      }
      const key = currentTarget.dataset.key
      const name = currentTarget.dataset.name
      const ids = new Set(this.zoneB2cService)
      if (ids.has(key)) {
        ids.delete(key)
      } else {
        ids.add(key)
      }
      this.zoneB2cService = Array.from(ids)
      const names = new Set(this.zoneB2cServiceNames)
      if (names.has(name)) {
        names.delete(name)
      } else {
        names.add(name)
      }
      this.zoneB2cServiceNames = Array.from(names)
      this.$apply();
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
      this.fiBook = { ...this.fiBook, name: dataset.name, id: dataset.key };
      this.popFiBookVisible = false;
      this.methods.getRetailOrderInfo(dataset.key);

      // 获取仓库列表
      this.methods.getWarehouseList(dataset.key).then(res => {
        const data = res.payload.data || [];
        this.warehouseList = data.map(it => {
          return {
            name: it.name,
            id: it.cId,
            type: it.type//20统仓 70原仓
          }
        })
        this.$apply();
      })
      // 仓库类型 20统仓 70原仓
      // if (this.warehouseList.length>0){
      //   const fhckType = this.warehouseList[0].type;
      //   // 根据仓库的默认第一项判断获取服务列表 及是否展示
      //   if(fhckType == 20){
      //     this.methods.getServiceList();
      //   }
      // }
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
    /**
     * {
    "cisCode":"7111377",
    "userAccount":"7111377",
    "status":"draft",                             //draft 草稿，submitted提交
    "salesOrder":{
        "documentDate":"2019-09-09",           //下单时间
        "edt":"2019-09-09",                       //期望时间
        "isOutbound":”0”,                           //是否自动出库
        "customerName":"莱西孙受海信专卖店",      //客户名
        "phone":"18397989766",                   //电话
        "billFromId":"423432",                     //开票方
        "sellerCode":"1",                            //业务员
        "storeCode":"4123",                         //门店
        "warehouseId":"3424",                     //仓库
        "provinceId":"1231",                       //省
        "cityId":"512343",                         //市
        "countryId":"41324",                       //县
        "townId":"53424",                        //区
        "fullAddress":"海信大厦",                  //地址详情
        "retailType":"wholesale",                 //销售类型
        "payAmount":"2342",                     //收款金额
        "discountAmount":"2342",                //折让金额
        "totalAmount":"2342",                    //订单金额
        "message":"备注",                         //备注
        "salesOrderItem":[                        //订单明细
            {
                "productCode":"4234",               //产品编码
                "productName":"电视",               //产品名称
                "model":"KAJOFEI",                  //型号
                "colour":"标准",                      //颜色
                "borderedQty":"3",                   //销售数量
                "bprice":"200",                       //销售价格
                "amount":"600",                      //金额
                "invStatus":"3242",                   //库存状态id
"bigUom":"PC"                           //单位
            },
            {
                "productCode":"4234",
                "productName":"电视",
                "model":"KAJOFEI",
                "colour":"标准",
                "borderedQty":"3",
                "bprice":"200",
                "amount":"600",
                "invStatus":"3242",
"bigUom":"PC"
            }
        ]
    }
}
     */
    submited: async (status: string) => {

      let that = this
      // 仓库为统仓需要有提示、为原仓无提示
      if (this.sendInventoryInfo.type == '20') {
        let popMessage = ''
        // 仓库为统仓-销售类别选择零售弹框提示
        if (this.saleType.id == 'retail') {
          popMessage = this.dynamicMessage.retailInfo
        }
        // 仓库为统仓-销售类别选择工程弹框提示
        if (this.saleType.id == 'engineering') {
          popMessage = this.dynamicMessage.engineeringInfo
        }
        wx.showModal({
          title: '提示',
          content: popMessage,
          success: async function (res) {
            if (res.confirm) {
              if (await that.methods.checkParam()) {
                that.methods.sendRequest(status)
              }
            }
          },
        })
      } else {
        if (await that.methods.checkParam()) {
          that.methods.sendRequest(status)
        }
      }

    },
    sendRequest: (status: string) => {
      const { zoneB2cService, amount, volume, store, note, outInv, sendInventoryInfo, receiverDetail, customerName, customerPhone, invoiceInfo, saler, chooseProvinceInfo, chooseCityInfo, chooseRegionInfo, chooseTownInfo, saleType, oldNew, completeOld,deliveryMethod,oldMachCategory, oldMachTreatWay,fiBook, fileIds, expectedDeliveryDate } = this.data
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

      const time = formatDate(Date.parse(new Date()), 'Y-M-D')
      // 组装数据
      const orderInfo = {
        status,
        salesOrder: {
          isGroup: 0,//此参数无用，传上后端不报错，后端：刘传伟
          id: '',
          documentDate: time,           //下单时间
          orgId: fiBook.id,              //销售组织
          edt: expectedDeliveryDate,                       //期望时间
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
          isOldNew: oldNew.id,                  //是否依旧换新
          isCompleteOld: completeOld.id,
          oldMachCategory: oldMachCategory.id,
          oldMachCategoryName: oldMachCategory.name,
          oldMachTreatWay: oldMachTreatWay.id,
          oldMachTreatWayName: oldMachTreatWay.name,
          payAmount: amount,                     //收款金额
          volume: volume,
          discountAmount: 0,                //折让金额
          totalAmount: amount,                    //订单金额
          message: note,                         //备注
          attachmentIds: fileIds.toString(),                         //附件id，以逗号隔开
          deliveryMode: deliveryMethod.id,      //配送方式
          zoneB2cService: zoneB2cService.join(','),      //b2c区域服务
          //isDeliveryAndInstall: isDeliveryAndInstall.id,      //配送方式
          salesOrderItem: params.map((param: any) => {
            const itemInfo = param.itemInfo
            return {
              itemId: '',
              bigUom: itemInfo.uom,
              productCode: itemInfo.productCode,
              productName: itemInfo.productName,
              model: itemInfo.model,
              colour: itemInfo.colour,
              borderedQty: param.quantity,
              bdemandQty: param.quantity,
              bprice: (+param.price).toFixed(2),
              amount: param.amount,
              volume: param.volume,
              invStatus: param.inventory,
              zoneB2cService: zoneB2cService.join(','),
              invStatusType: param.invState,   // 补差类型
              materialCode: itemInfo.materialCode //物料编码
            }
          })
        }
      }

      Dialog.confirm({
        title: '提示',
        message: `本单据共有${params.length}个产品，确定要${status === 'submitted' ? '提交' : '暂存'}吗?`
      }).then(() => {
        this.methods.submitRetailOrder({
          ...orderInfo,
          _ignoreToast: true,
          _popup: true
        }).then((res: any) => {
          const { code } = res.payload || '-1'
          if (code === '0') {
            // 保存成功
            Toast.success({
              message: `${status === 'submitted' ? '提交' : '暂存'}成功`,
              onClose: () => {
                this.amount = '0.00'
                const store = getStore()
                store.dispatch({
                  type: DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
                })
                this.$broadcast('relaunch')
                this.note = ''
                this.receiverDetail = ''
                this.customerName = '个人'
                this.customerPhone = ''
                this.saleType = {
                  id: 'retail',
                  name: '零售'
                }
                this.deliveryMethod = {
                  id: '',
                  name: '请选择'
                }
                //获取配送方式列表
                this.methods.getCisDeliveryMethod({ type: this.saleType.id });
                this.currentDate = new Date().getTime()
                this.expectedDeliveryDate = ''
                this.storeMaterial = []
                this.fileIds = []
                this.fileList = []
                this.$apply()
                getStore().dispatch({
                  type: DMS_RETAIL_ORDER_RESER_CHOOSE,
                  payload: ''
                })
                this.methods.getRetailOrderInfo()
              }
            })
          }
        })
      }).catch(() => {
        // on cancel
      });
    },
    checkParam: async () => {
      // 检查Head里面必填信息
      // 除发货仓库，其他均是必选
      const { store, outInv, customerName, customerPhone, invoiceInfo, saler, chooseProvinceInfo, saleType, fiBook, receiverDetail, deliveryMethod } = this.data

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
      if(this.oldNew.id == 1) {
        if(!this.oldMachCategory.id) {
          Toast.fail('请选择旧机品类')
          return false
        }
        if(!this.oldMachTreatWay.id) {
          Toast.fail('请选择旧机处理途径')
          return false
        }
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

      if (this.sendInventoryInfo.type == '20') {
        if (receiverDetail === '') {
          Toast.fail('请填写详细地址')
          return false
        }
      }

      // if (!invoiceInfo.id) {
      //   Toast.fail('请选择开票方')
      //   return false
      // }
      if (!saler.id) {
        Toast.fail('请选择业务员')
        return false
      }
      if (!this.sendInventoryInfo.id) {
        Toast.fail('请选择发货仓库')
        return false
      }
      if (!deliveryMethod.id) {
        Toast.fail('请选择配送方式')
        return false
      }

      // 校验详细地址
      // let checkAddressDetailResult = true
      // await this.$invoke('addressDetail', 'checkAddressDetail', (item: any)=>{
      //   checkAddressDetailResult = item
      // });
      // if(!checkAddressDetailResult){
      //   Toast.fail('当前选择的省市区与详细地址不一致，请前往修改')
      //   return false
      // }

      const { errMsg, submitLines } = await this.$invoke('order', 'checkParam')
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
    onNoteChange: debounce(500, ({ detail }: any) => {
      this.note = detail
      this.$apply()
    }),
    onCustomerPhoneChange: debounce(500, ({ detail }: any) => {
      this.customerPhone = detail.trim()
      this.$apply()
    }),
    onCustomerNameChange: debounce(500, ({ detail }: any) => {
      this.customerName = detail.trim()
      this.$apply()
    }),
    onReceiverDetailChange: debounce(500, ({ detail }: any) => {
      this.receiverDetail = detail.trim()
      this.$apply()
    }),
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

    // 日期弹层
    openChooseDayPopup: () => {
      this.calendarShow = !this.calendarShow
    },
    // 关闭日期弹框
    closeCalendar() {
      this.calendarShow = false;
    },
    // 选择日期
    chooseDay(evt: { detail }) {
      let currDate = formatDate(evt.detail, 'Y-M-D h:m')
      this.expectedDeliveryDate = currDate
      this.calendarShow = false;
      this.$apply()
    },

  }

  // plsChoose = {
  //   id: '',
  //   name: '请选择'
  // }
  computed = {
    // 计算属性的 用于地址详情是否显示必填符号
    addressDetailRequired: function () {
      return this.sendInventoryInfo.type=='20'
    },
    // 计算属性的 用于地址详情区编码
    chooseRegionId: function () {
      return this.chooseRegionInfo.id
    }
  }
  watch = {
    'billFrom': function (newValue: Array<ChooseInfo>) {
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
    'seller': function (newValue: Array<ChooseInfo>) {
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
    'stores': function (newValue: Array<ChooseInfo>) {
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
    'address': function (newValue: Object) {
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
    'loading': function (newValue: Boolean) {
      if (!newValue) {
        Toast.clear()
      }
    },
    'deliveryMode': function (newValue: Array<ChooseInfo>) {
      if (newValue && newValue.length > 0) {
        this.deliveryMethod = newValue[0]
      } else {
        this.deliveryMethod = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    },
  }

  events = {
    'amount-change': (payload: any) => {
      //let payAmount = Number(payload.amount);
      //this.amount = (payAmount).toFixed(2)
      this.amount = `${((+this.amount) + (+payload.amount)).toFixed(2)}`
    },
    'volume-change': (payload: any) => {
      // let payVolume = Number(payload.volume);
      // this.volume = (payVolume).toFixed(2)
      if (isNaN(+payload.volume)) {
        return
      }
      this.volume = `${((+this.volume) + (+payload.volume)).toFixed(2)}`
    },
    'chooseAddressDetail': (payload: any) => { // 地址详情子组件传参
      this.receiverDetail = payload.addressName
    }
  }

  onShow() {
    let freeShippingTip = getAlertInfo('14187495683') // 免运费提示信息
    let signAgreementInfo = getAlertInfo('14187495772') // 签订协议提示信息
    let noSignAgreementInfo = getAlertInfo('14187495767') // 未签订协议提示信息
    let straightConstructionSite = getAlertInfo('14187495874') // 直配到工地提示信息
    let retailInfo = getAlertInfo('14187496797') // 统仓并且为零售弹窗提示
    let engineeringInfo = getAlertInfo('14187496805') // 统仓并且为工程弹窗提示

    this.dynamicMessage.freeShippingTip = freeShippingTip
    this.dynamicMessage.signAgreementInfo = signAgreementInfo
    this.dynamicMessage.noSignAgreementInfo = noSignAgreementInfo
    this.dynamicMessage.straightConstructionSite = straightConstructionSite
    this.dynamicMessage.retailInfo = retailInfo
    this.dynamicMessage.engineeringInfo = engineeringInfo

    this.$apply()

  }

  onLoad() {


    // if (params.loadCustomerInfo) {
    //   this.methods.getNormalSalesOrderCustomerInfo({ customerCode: chooseCustomerInfo.customerCode })
    // }
    this.$broadcast('retail');

    this.methods.getRetailOrderInfo();

    //获取销售组织
    this.methods.queryAppFiBook();
    //获取入库仓库
    //this.methods.getRetailOrderInfo();

    //获取配送方式
    this.methods.getCisDeliveryMethod({ type: this.saleType.id });
    this.methods.getOldMachCategoryList().then(res => {
      let list = res.payload.data;
      for(let item of list) {
        let obj = {};
        let key = Object.keys(item)[0];
        obj.id = key;
        obj.name = item[key];
        this.oldMachCategoryList.push(obj)
      }
    });
    this.methods.getOldMachTreatWayList().then(res => {
      let list = res.payload.data;
      for(let item of list) {
        let obj = {};
        let key = Object.keys(item)[0];
        obj.id = key;
        obj.name = item[key];
        this.oldMachTreatWayList.push(obj)
      }
    })
  }
}
