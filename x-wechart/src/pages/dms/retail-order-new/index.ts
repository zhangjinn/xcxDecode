import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import OrderDetail from '@/components/dms-order-addition-detail/index';
import address from '@/components/dms-address/index';
import addressDetail from '@/pages/components/select-address-details/index';

import { getRetailOrderInfo, getWarehouseList, submitRetailOrderNew, getCisPrice, getCisDeliveryMethod, queryAppFiBook, getLsPrice, getZoneB2cServiceList, getOldMachCategoryList,getOldMachTreatWayList } from '@/store/actions/dmsorder';
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
  popTitle: string; note: string; zoneB2cService: any[]; zoneB2cServiceNames: any[]; deliveryMethod: { name: string; id: string }; saleType: { name: string; id: string };oldNew: { name: string; id: Number }; completeOld: { name: string; id: Number },oldMachCategoryList: any[];oldMachCategory: {id: string,name: string};oldMachTreatWayList: any[];oldMachTreatWay: {id: string,name: string};saler: { name: string; id: string }; deliveryAndInstall: ({ name: string; id: string } | { name: string; id: string })[]; expressFee: any; storeMaterial: any[]; chooseRegionInfo: { name: string; id: string }; customerPhone: string; isNoticePopupShow: boolean; outInv: { name: string; id: string }; compareInfo: {}; receiverDetail: string; invoiceInfo: { name: string; id: string }; amount: string; addressTip: string; store: { name: string; id: string }; customerName: string; volume: string; sendInventoryInfo: { name: string; id: string }; chooseTownInfo: { name: string; id: string }; popFiledName: string; showMore: boolean; chooseCityInfo: { name: string; id: string }; fiBook: { name: string }; popVisible: boolean; popFiBookVisible: boolean; popList: any[]; chooseProvinceInfo: { name: string; id: string }; warehouseList: any[]; serverPopVisible: boolean; fileList: any[]; fileIds: any[]; isSignTheAgreement: false; dynamicMessage: object; calendarShow: boolean; expectedDeliveryDate: string; currentDate: any;
  isDisabled: boolean; requiredParameters:any; ly:string
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
  submitRetailOrderNew,
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
    navigationBarTitleText: '零售录入(新)',
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

  data: Data = {
    ly: 'retailNew',
    isDisabled: true, // 如果传参isDisabled=true，组件components/dms-order-addition-detail-item/index表单不可编辑（销售数量、销售价格除外）
    showMore: false,
    store: {
      id: '',
      name: '请选择'
    },
    outInv: {
      id: '1',
      name: '是'
    },
    customerName: '个人',
    customerPhone: '',
    sendInventoryInfo: { // 发货仓库
      id: '',
      name: '请选择'
    },
    invoiceInfo: {
      id: '',
      name: '请选择'
    },
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
    },
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
    expressFee: wepy.$instance.globalData.expressFee,
    deliveryAndInstall: [
      { id: '1', name: '是' },
      { id: '0', name: '否' }
    ],
    fileList: [],
    fileIds: [],
    zoneB2cService: [],
    zoneB2cServiceNames: [],
    serverPopVisible: false,
    dynamicMessage: { // 动态获取提示信息汇总
      freeShippingTip: '', // 免运费提示信息
      signAgreementInfo: '', // 签订协议提示信息
      noSignAgreementInfo: '', // 未签订协议提示信息
      straightConstructionSite: '', // 直配到工地提示信息
      retailInfo: '', // 统仓并且为零售弹窗提示
      engineeringInfo: '', // 统仓并且为工程弹窗提示
    },
    calendarShow: false,
    expectedDeliveryDate: formatDate(new Date().getTime(), 'Y-M-D h:m'), // 期望到货日期
    currentDate: new Date().getTime(), // 期望到货日期弹框显示当前日期
    requiredParameters: { // 必填参数
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
      receiverDetail: '', // 详细地址
      customerName: '个人', // 客户名称
      customerPhone: '', // 客户联系电话
      deliveryMethod: { // 配送方式
        id: '',
        name: '请选择'
      },

    }
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
    async openTopAddress() {
      const params = this.$invoke('order', 'selectedProductList')
      if(params && params.length > 0){
        Toast.fail('请先清空商品，再重新选择地址!')
        return false
      }

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
        this.requiredParameters = {
          ...this.requiredParameters,
          chooseProvinceInfo: this.chooseProvinceInfo,
          chooseCityInfo: this.chooseCityInfo,
          chooseRegionInfo: this.chooseRegionInfo,
          chooseTownInfo: this.chooseTownInfo,
        }
        this.$apply()
      });
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
      const { dataset } = currentTarget
      const { index } = dataset
      const { popFiledName, popList } = this.data
      this[popFiledName] = popList[index]

      if(this.requiredParameters[popFiledName]){
        this.requiredParameters[popFiledName] = this[popFiledName]
      }

      this.popVisible = false

      //根据销售类型不同获取对应配送方式
      if (popFiledName == 'saleType') {
        this.methods.getCisDeliveryMethod({ type: this.saleType.id });
      }

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
    submited: async (status: string) => {
      let that = this
      if (await that.methods.checkParam()) {
        that.methods.sendRequest(status)
      }

    },
    sendRequest: (status: string) => {
      const { amount, volume, store, note, receiverDetail, customerName, customerPhone, invoiceInfo, saler, chooseProvinceInfo, chooseCityInfo, chooseRegionInfo, chooseTownInfo, saleType, oldNew, completeOld,deliveryMethod,oldMachCategory, oldMachTreatWay, fileIds, expectedDeliveryDate } = this.data
      const params = this.$invoke('order', 'getParam')

      // 组装数据
      const orderInfo = {
        status,
        salesOrder: {
          edt: expectedDeliveryDate, // 期望时间
          phone: customerPhone, // 电话
          deliveryMode: deliveryMethod.id, // 配送方式
          fullAddress: receiverDetail, // 地址详情
          storeCode: store.id, // 门店
          isGroup: 0, // 此参数无用，传上后端不报错，后端：刘传伟
          attachmentIds: fileIds.toString(), // 附件id，以逗号隔开
          isOldNew: oldNew.id, // 是否依旧换新
          isCompleteOld: completeOld.id,
          oldMachCategory: oldMachCategory.id,
          oldMachCategoryName: oldMachCategory.name,
          oldMachTreatWay: oldMachTreatWay.id,
          oldMachTreatWayName: oldMachTreatWay.name,
          retailType: saleType.id, // 销售类型
          provinceId: chooseProvinceInfo.id, // 省
          cityId: chooseCityInfo.id, // 市
          townId: chooseTownInfo.id, // 区
          countryId: chooseRegionInfo.id, // 县
          message: note, // 备注
          customerName, // 客户名
          billFromId: invoiceInfo.id, // 开票方
          sellerCode: saler.id, // 业务员
          salesOrderItem: params.map((param: any) => {
            const itemInfo = param.itemInfo
            let zoneB2cService = itemInfo.zoneB2cService ? itemInfo.zoneB2cService.join(',') : ''
            return {
              productCode: itemInfo.productCode,
              materialCode: itemInfo.materialCode, // 物料编码
              model: itemInfo.model,
              invStatus: param.inventory,
              invStatusType: param.invState, // 补差类型
              borderedQty: param.quantity,
              bprice: (+param.price).toFixed(2),
              amount: param.amount,
              gicWarehouse: itemInfo.gicWarehouse,
              orgCode: itemInfo.orgCode,
              zoneB2cService: zoneB2cService,
            }
          })
        }
      }

      Dialog.confirm({
        title: '提示',
        message: `本单据共有${params.length}个产品，确定要${status === 'submitted' ? '提交' : '暂存'}吗?`
      }).then(() => {
        this.methods.submitRetailOrderNew({
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
                // this.receiverDetail = ''
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
                this.requiredParameters = {
                  ...this.requiredParameters,
                  customerName: this.customerName,
                  customerPhone: this.customerPhone,
                  deliveryMethod: this.deliveryMethod,
                  // receiverDetail: this.receiverDetail,
                }
                //获取配送方式列表
                this.methods.getCisDeliveryMethod({ type: this.saleType.id });
                this.currentDate = new Date().getTime()
                this.expectedDeliveryDate = formatDate(this.currentDate, 'Y-M-D h:m')
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
      const { store, customerName, customerPhone, saler, saleType, receiverDetail, deliveryMethod } = this.data

      if (!store.id) {
        Toast.fail('请选择门店')
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
      if (receiverDetail === '') {
        Toast.fail('请填写详细地址')
        return false
      }
      if (!saler.id) {
        Toast.fail('请选择业务员')
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
      this.requiredParameters = {
        ...this.requiredParameters,
        customerPhone: this.customerPhone,
      }
      this.$apply()
    }),
    onCustomerNameChange: debounce(500, ({ detail }: any) => {
      this.customerName = detail.trim()
      this.requiredParameters = {
        ...this.requiredParameters,
        customerName: this.customerName,
      }
      this.$apply()
    }),
    onReceiverDetailChange: debounce(500, ({ detail }: any) => {
      this.receiverDetail = detail.trim()
      this.requiredParameters = {
        ...this.requiredParameters,
        receiverDetail: this.receiverDetail,
      }
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

  computed = {
    // 计算属性的 用于地址详情是否显示必填符号
    addressDetailRequired: function () {
      // return this.sendInventoryInfo.type=='20'
       // 仓库已经移动到产品行 需必填
      return true
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
      this.requiredParameters = {
        ...this.requiredParameters,
        chooseProvinceInfo: this.chooseProvinceInfo,
        chooseCityInfo: this.chooseCityInfo,
        chooseRegionInfo: this.chooseRegionInfo,
        chooseTownInfo: this.chooseTownInfo,
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
      this.requiredParameters = {
        ...this.requiredParameters,
        deliveryMethod: this.deliveryMethod,
      }
      this.$apply()
    },
  }

  events = {
    'amount-change': (payload: any) => {
      this.amount = `${((+this.amount) + (+payload.amount)).toFixed(2)}`
    },
    'volume-change': (payload: any) => {
      if (isNaN(+payload.volume)) {
        return
      }
      this.volume = `${((+this.volume) + (+payload.volume)).toFixed(2)}`
    },
    'chooseAddressDetail': (payload: any) => { // 地址详情子组件传参
      this.receiverDetail = payload.addressName
      this.requiredParameters = {
        ...this.requiredParameters,
        receiverDetail: this.receiverDetail,
      }
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

    this.$broadcast('retail');

    this.methods.getRetailOrderInfo();

    //获取销售组织
    this.methods.queryAppFiBook();

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
