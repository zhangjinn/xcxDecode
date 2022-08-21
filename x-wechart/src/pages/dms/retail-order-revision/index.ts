import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import address from '@/components/dms-address/index';
import addressDetail from '@/pages/components/select-address-details/index';

import {
  getRetailOrderInfo,
  getWarehouseList,
  submitRetailOrderNew,
  getCisPrice,
  getCisDeliveryMethod,
  getLsPrice,
  getZoneB2cServiceList,
  getOldMachCategoryList,
  getOldMachTreatWayList
} from '@/store/actions/dmsorder';
import {
  findLabelList,
  saveLabelInfo,
  findSourceList,
  saveSourceInfo,
} from '@/store/actions/order';
import retailOrder from '@/mixins/channel-retail-order';
import { debounce } from 'throttle-debounce';
import {formatDate, checkTel, getAlertInfo, mulNum, addNum} from '@/utils/index';
import {
  DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR, DMS_ORDER_CHOOSE_ITEM_INFO,
  DMS_RETAIL_ORDER_RESER_CHOOSE
} from '@/store/types/dmsorder';
import Dialog from '@/components/vant/dialog/dialog';
import { dmsRequest } from '@/store/actions/dmsrequest'
import PopupToast from '@/components/popup-toast/index';
import utilsWxs from '../../../wxs/utils.wxs';

interface ChooseInfo {
  id: number | string;
  name: string;
}

interface Data {
  popTitle: string;
  oldMachCategoryList: any[];
  oldMachTreatWayList: any[];
  deliveryAndInstall: ({ name: string; id: string } | { name: string; id: string })[];
  expressFee: any;
  storeMaterial: any[];
  isNoticePopupShow: boolean;
  outInv: { name: string; id: string };
  compareInfo: {};
  totalAmount: string;
  totalVolume: string;
  totalNum: string;
  popFiledName: string;
  showMore: boolean;
  popVisible: boolean;
  popFiBookVisible: boolean;
  popList: any[];
  warehouseList: any[];
  dynamicMessage: object;
  calendarShow: boolean;
  currentDate: any;
  isDisabled: boolean;
  ly:string;
  imgObj: object;
  saleTypes: any[];
  genderOption: any[];
  baseFormData: object;
  sourceOption:any[];
  tagOption:any[];
  tagShow: boolean;
  oldNews: any[];
  completeOlds: any[];
  productList: any[];
  custInfoId: any;
  defaultAddressName: string;
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
  deliveryMode({ dmsorder }) {
    return dmsorder.cisDeliveryMode
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
  getZoneB2cServiceList,
  findLabelList, // 获取意向标签列表
  saveLabelInfo, // 保存意向标签
  findSourceList, // 获取意向用户来源列表
  saveSourceInfo, // 保存意向用户来源
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
      "tile-radio": "/components/tile-radio/index",
      "entry-label": "/components/user-operation/entry-label/index",
      "entry-source": "/components/user-operation/entry-source/index",
      "van-uploader": "/components/vant/uploader/index",
      'calendar': '/components/calendar/index',
      'van-datetime-picker': '/components/vant/datetime-picker/index',
      'van-radio': '/components/vant/radio/index',
      'van-radio-group': '/components/vant/radio-group/index',
      'van-stepper': '/components/vant/stepper/index',
    },
  };
  wxs = {
    utils: utilsWxs,
  };
  mixins = [retailOrder];
  data: Data = {
    ly: 'retailNew',
    isDisabled: true, // 如果传参isDisabled=true，组件components/dms-order-addition-detail-item/index表单不可编辑（销售数量、销售价格除外）
    showMore: false,
    baseFormData: {
      store: {
        id: '',
        name: '请选择',
        isSpeclalShop: '' // 1为专卖店
      }, // 所属门店*
      customerName: '', // 用户姓名*
      customerPhone: '', // 手机号*
      gender: {
        id: '1',
        name: '男士'
      }, // 用户性别
      source: {
        id: '',
        name: ''
      }, // 用户来源
      tag: {
        id: [],
        name: []
      }, // 用户标签
      addressTip: '', // 所在地区
      chooseProvinceInfo: {
        id: '',
        name: ''
      }, // 省
      chooseCityInfo: {
        id: '',
        name: ''
      }, // 市
      chooseRegionInfo: {
        id: '',
        name: ''
      }, // 区/县
      chooseTownInfo: {
        id: '',
        name: ''
      }, // 乡镇
      receiverDetail: '', // 详细地址
      saleType: {
        id: 'retail',
        name: '零售'
      }, // 销售类型
      oldNew: {
        id: 0,
        name: '否'
      }, // 旧电回收
      completeOld: {
        id: 0,
        name: '否'
      }, // 完成收旧
      oldMachCategory: {
        id: '',
        name: ''
      }, // 旧机品类
      oldMachTreatWay: {
        id: '',
        name: ''
      }, // 旧机处理途径
      deliveryMethod: {
        id: '',
        name: '请选择'
      }, // 配送方式
      expectedDeliveryDate: formatDate(new Date().getTime(), 'Y-M-D h:m'), // 期望到货日期
      note: '', // 备注
      fileList: [], // 附件
      fileIds: [], // 附件ids
      saler: {
        id: '',
        name: '请选择'
      }, // 业务员；页面没有
      invoiceInfo: {
        id: '',
        name: '请选择'
      }, // 开票方；页面没有
    },
    defaultAddressName: '', // 默认详细地址
    outInv: {
      id: '1',
      name: '是'
    },
    oldMachCategoryList: [],
    oldMachTreatWayList: [],
    storeMaterial: [],
    totalAmount: '0.00',
    totalVolume: '0.00',
    totalNum: '0',
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
    dynamicMessage: { // 动态获取提示信息汇总
      freeShippingTip: '', // 免运费提示信息
      signAgreementInfo: '', // 签订协议提示信息
      noSignAgreementInfo: '', // 未签订协议提示信息
      straightConstructionSite: '', // 直配到工地提示信息
      retailInfo: '', // 统仓并且为零售弹窗提示
      engineeringInfo: '', // 统仓并且为工程弹窗提示
    },
    calendarShow: false,
    currentDate: new Date().getTime(), // 期望到货日期弹框显示当前日期
    imgObj: {
      'deliveryInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864758756_fd141c1df28d416c87a8f81b9231a354.png', // 收货信息@2x.png
      'oldInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864758772_144e8a3f0e2340e8a424fafa117fbc98.png', // 收旧信息@2x.png
      'productInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864759346_77a464c855c841938c5dfa1149dc2f30.png', // 产品信息@2x.png
    },
    saleTypes: [{
      id: 'retail',
      name: '零售'
    }, {
      id: 'engineering',
      name: '工程'
    }], // 销售类型选择列表
    genderOption: [
      {id:'1', name:'男士'},
      {id:'2', name:'女士'},
    ], // 性别选择列表
    sourceOption: [], // 用户来源选择列表
    tagOption: [], // 标签选择列表
    oldNews: [
      {
        id: 1,
        name: '是'
      },
      {
        id: 0,
        name: '否'
      }
    ], // 旧电回收选择列表
    completeOlds: [
      {
        id: 1,
        name: '是'
      },
      {
        id: 0,
        name: '否'
      }
    ], // 完成收旧选择列表
    productList: [], // 添加产品列表
    custInfoId: '', // 商家 id
  };

  components = {
    address,
    addressDetail,
    popup: PopupToast,
  };

  computed = {
    // 计算属性的 用于地址详情是否显示必填符号
    addressDetailRequired: function () {
      return true
    },
    // 计算属性的 用于地址详情区编码
    chooseRegionId: function () {
      return this.baseFormData.chooseRegionInfo.id
    }
  }

  watch = {
    'billFrom': function (newValue: Array<ChooseInfo>) {
      if (newValue.length > 0) {
        this.baseFormData.invoiceInfo = newValue[0]
      } else {
        this.baseFormData.invoiceInfo = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    },
    'seller': function (newValue: Array<ChooseInfo>) {
      if (newValue.length > 0) {
        this.baseFormData.saler = newValue[0]
      } else {
        this.baseFormData.saler = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    },
    'stores': function (newValue: Array<ChooseInfo>) {
      if (newValue.length > 0) {
        this.baseFormData.store = newValue[0]
        // 切换门店修改默认地址
        this.methods.getDefaultAddressName(newValue[0])
        this.methods.getStoreMaterial(this.baseFormData.store.id)
      } else {
        this.baseFormData.store = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    },
    'loading': function (newValue: Boolean) {
      if (!newValue) {
        Toast.clear()
      }
    },
    'deliveryMode': function (newValue: Array<ChooseInfo>) {
      if (newValue && newValue.length > 0) {
        this.baseFormData.deliveryMethod = newValue[0]
      } else {
        this.baseFormData.deliveryMethod = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    },
  }

  events = {
    'chooseAddressDetail': (payload: any) => { // 地址详情子组件传参
      this.baseFormData.receiverDetail = payload.addressName
    }
  }

  /**
   * TODO: 保存成功后删除客户信息，商品信息
   */
  methods = {
    // 上传图片
    beforeRead: () => {
      Toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 20 * 1000
      });
      this.$apply();
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
            self.baseFormData.fileList.push({
              url: data[0].fileMapperPath,
              name: data[0].fileRealName,
              deletable: true
            })
            self.baseFormData.fileIds.push(data[0].id)
          }
          self.$apply();
        }
      });
    },

    delImg: (event) => {
      this.baseFormData.fileIds.splice(event.detail.index, 1)
      this.baseFormData.fileList.splice(event.detail.index, 1)
    },
    //提示框
    noticePopupOpen: () => {
      this.isNoticePopupShow = true;
    },
    noticePopupClose: () => {
      this.isNoticePopupShow = false;
    },

    // 选择所在地区
    async openTopAddress() {
      const { chooseProvinceInfo, chooseCityInfo, chooseRegionInfo, chooseTownInfo } = this.data.baseFormData;
      this.$invoke('address', 'openAddressPopup', {
        province: chooseProvinceInfo.id,
        city: chooseCityInfo.id,
        area: chooseRegionInfo.id,
        town: chooseTownInfo.id
      }, (item: any, address: any) => {
        this.baseFormData.addressTip = item.name
        this.baseFormData.chooseProvinceInfo = {
          id: address.provinceId,
        }
        this.baseFormData.chooseCityInfo = {
          id: address.cityId,
        }
        this.baseFormData.chooseRegionInfo = {
          id: address.areaId,
        }
        this.baseFormData.chooseTownInfo = {
          id: address.townId,
        }

        this.$apply()
      });
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

      this.compareInfo = this.data.baseFormData[fieldName]

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
      this.baseFormData[popFiledName] = popList[index]
      this.popVisible = false

      if (popFiledName === 'store') {
        const storeId = popList[index].id
        if(popList[index].isSpeclalShop !== '1'){ // 选择店铺非专卖店清空选择标签、来源、性别
          this.baseFormData.tag = {
            id: [],
            name: []
          } // 用户标签
          this.tagOption = this.tagOption.map((item)=>{ // 标签列表设为无选中状态
            item.active = false
            return item
          })
          this.baseFormData.source.id = ''
          this.baseFormData.source.name = ''
          this.baseFormData.gender.id = '1'
          this.baseFormData.gender.name = '男士'
        }

        this.methods.getStoreMaterial(storeId)

        // 切换店铺重新更新建议价格
        for(let i=0; i<this.productList.length; i++){
          this.renewLsPrice(this.productList[i], i)
        }

        // 切换门店修改默认地址
        this.methods.getDefaultAddressName(popList[index])

      }
    },

    // 切换门店修改默认地址
    getDefaultAddressName: (item) => {
      this.baseFormData.chooseProvinceInfo = {
        id: item.provinceCode || '',
        name: item.provinceName || ''
      }
      this.baseFormData.chooseCityInfo = {
        id: item.cityCode || '',
        name: item.cityName || ''
      }
      this.baseFormData.chooseRegionInfo = {
        id: item.countyCode || '',
        name: item.countyName || ''
      }
      this.baseFormData.chooseTownInfo = {
        id: item.townCode || '',
        name: item.townName || ''
      }
      this.baseFormData.addressTip = this.baseFormData.chooseProvinceInfo.name + this.baseFormData.chooseCityInfo.name + this.baseFormData.chooseRegionInfo.name + this.baseFormData.chooseTownInfo.name
      this.baseFormData.receiverDetail = item.address
      this.defaultAddressName = item.address // 用来传参子组件默认地址
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
    submited: async (status: string) => {
      let that = this
      if (await that.methods.checkParam()) {
        that.methods.sendRequest(status)
      }
    },
    sendRequest: (status: string) => {
      const { store, customerName, customerPhone, gender, source, tag, chooseProvinceInfo, chooseCityInfo, chooseRegionInfo, chooseTownInfo, receiverDetail, saleType, oldNew, completeOld, oldMachCategory, oldMachTreatWay, deliveryMethod, expectedDeliveryDate, note, fileIds, saler, invoiceInfo } = this.data.baseFormData
      const params = this.productList

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
          gender: gender.id, // 性别
          customerLabels: tag.id.toString(), // 标签，多个用字符串隔开
          sourceId: source.id, // 来源
          salesOrderItem: params.map((param: any) => {
            const itemInfo = param
            let zoneB2cService = ''
            if(itemInfo.gicWarehouseType && itemInfo.gicWarehouseType=='20'){ // 服务方式 统仓传0，其他传空； 20为统仓
              zoneB2cService = '0'
            }
            return {
              productCode: itemInfo.productCode,
              materialCode: itemInfo.materialCode, // 物料编码
              model: itemInfo.model,
              invStatus: param.invStatusId, // 库存状态id
              invStatusType: param.invStatusType, // 补差类型
              borderedQty: param.quantity, // 销售数量
              bprice: (+param.sellingPrice).toFixed(2), // 销售价格
              amount: param.subtotalAmount, // 小计
              gicWarehouse: itemInfo.gicWarehouse, // 仓库id
              orgCode: itemInfo.orgCode, // 组织id
              zoneB2cService: zoneB2cService, // 服务方式
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
                const store = getStore()
                store.dispatch({
                  type: DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
                })
                this.$broadcast('relaunch')
                getStore().dispatch({
                  type: DMS_RETAIL_ORDER_RESER_CHOOSE,
                  payload: ''
                })
                this.methods.getRetailOrderInfo()
                this.methods.baseDataInit()

                wx.switchTab({
                  url: '/pages/main/me/index'
                })
                this.$apply()
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
      const { store, customerName, customerPhone, receiverDetail, saleType, deliveryMethod, oldNew, oldMachCategory, oldMachTreatWay, saler } = this.data.baseFormData

      if (!store.id) {
        Toast.fail('请选择门店')
        return false
      }
      if (!saleType.id) {
        Toast.fail('请选择销售类型')
        return false
      }

      if (customerName === '') {
        Toast.fail('请填写用户姓名')
        return false
      }
      if (customerPhone === '') {
        Toast.fail('请填写手机号')
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
      if(oldNew.id == 1) {
        if(!oldMachCategory.id) {
          Toast.fail('请选择旧机品类')
          return false
        }
        if(!oldMachTreatWay.id) {
          Toast.fail('请选择旧机处理途径')
          return false
        }
      }

      // 校验详细地址
      let checkAddressDetailResult = true
      await this.$invoke('addressDetail', 'checkAddressDetail', (item: any)=>{
        checkAddressDetailResult = item
      });
      if(!checkAddressDetailResult){
        Toast.fail('当前选择的省市区与详细地址不一致，请前往修改')
        return false
      }

      if(this.productList && this.productList.length>0){
        let tip = this.methods.isEmpty(this.productList)
        if(tip){
          Toast.fail(tip)
          return false
        }
      }else{
        Toast.fail('请先添加产品')
        return false
      }
      return true
    },
    isEmpty: (arr) => {
      for(let i=0;i<arr.length;i++){
        if (!arr[i].quantity) {
          return `第${i+1}个商品数量不能为0`
        }
        if (!arr[i].sellingPrice) {
          return `第${i+1}个商品价格不能为0`
        }
        if (arr[i].sellingPrice > 99999) {
          return `第${i+1}个商品价格不能大于99999`
        }
        if (arr[i].price && (( arr[i].sellingPrice < arr[i].price * 0.5 ) || ( arr[i].sellingPrice > arr[i].price * 1.75 ))){
          return `第${i + 1}个商品建议零售价L为${arr[i].price}元，可填范围在0.5 倍到1.75倍之间。`
        }
      }
      return false
    },

    // 提交完成重置基本信息
    baseDataInit: () => {
      this.baseFormData.customerName = '' // 用户姓名*
      this.baseFormData.customerPhone = '' // 手机号*
      this.baseFormData.gender.id = '1'
      this.baseFormData.gender.name = '男士' // 用户性别
      this.baseFormData.source.id = ''
      this.baseFormData.source.name = '' // // 用户来源
      this.baseFormData.tag.id = []
      this.baseFormData.tag.name = []  // 用户标签
      this.baseFormData.saleType.id = 'retail'
      this.baseFormData.saleType.name = '零售' // 销售类型
      this.baseFormData.oldNew.id = 0
      this.baseFormData.oldNew.name = '否'  // 旧电回收
      this.baseFormData.completeOld.id = 0
      this.baseFormData.completeOld.name = '否' // 完成收旧
      this.baseFormData.oldMachCategory.id = ''
      this.baseFormData.oldMachCategory.name = '' // 旧机品类
      this.baseFormData.oldMachTreatWay.id = ''
      this.baseFormData.oldMachTreatWay.name = '' // 旧机处理途径
      this.baseFormData.deliveryMethod.id = ''
      this.baseFormData.deliveryMethod.name = '' // 配送方式

      this.baseFormData.expectedDeliveryDate = formatDate(new Date().getTime(), 'Y-M-D h:m') // 期望到货日期
      this.baseFormData.note = '' // 备注
      this.baseFormData.fileList = '' // 附件
      this.baseFormData.fileIds = [] // 附件ids
      this.totalNum = 0
      this.totalAmount = 0
      this.totalVolume = 0

      this.tagOption = this.tagOption.map((item)=>{ // 标签列表设为无选中状态
        item.active = false
        return item
      })
      this.productList = [] // 产品列表删除
      //获取配送方式列表
      let saleTypeId = this.baseFormData.saleType.id
      this.methods.getCisDeliveryMethod({ type: saleTypeId });
      this.$apply()
    },
    onNoteChange: debounce(500, ({ detail }: any) => {
      this.baseFormData.note = detail
      this.$apply()
    }),
    onCustomerPhoneChange: debounce(500, ({ detail }: any) => {
      this.baseFormData.customerPhone = detail.trim()
      this.$apply()
    }),
    onCustomerNameChange: debounce(500, ({ detail }: any) => {
      this.baseFormData.customerName = detail.trim()
      this.$apply()
    }),
    onReceiverDetailChange: debounce(500, ({ detail }: any) => {
      this.baseFormData.receiverDetail = detail.trim()
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

    // 自定义单选改变
    onRadioChange(event){
      const { detail } = event
      const { key } = event.currentTarget.dataset
      this.baseFormData[key] = detail

      //根据销售类型不同获取对应配送方式
      if (key == 'saleType') {
        this.methods.getCisDeliveryMethod({ type: this.baseFormData.saleType.id });
      }
      this.$apply()
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
      this.baseFormData.expectedDeliveryDate = currDate
      this.calendarShow = false;
      this.$apply()
    },

    // 选择用户来源
    onSourceChange(param){
      const { option, index } = param.detail
      this.baseFormData.source = option
      this.$apply()
    },

    // 保存用户来源
    saveSourcePop(param){
      const { name, popActiveItem } = param.detail
      if(name === ''){
        this.baseFormData.source = popActiveItem
        return
      }
      this.methods.saveSourceInfo({
        custInfoId: this.custInfoId, // 商家id
        type: 2, // 类别 1系统，2自定义
        source: name, // 来源名
        remark: '', // 备注
      }).then((res)=>{
        const { code, data, msg } = res.payload
        if(code == 0) {
          let currSource = {
            id: data,
            name: name,
          }
          this.sourceOption.push(currSource)
          this.baseFormData.source = currSource
        }else{
          Toast.fail(msg)
        }
        this.$apply()
      })
    },

    // 选择用户标签
    onTagChange(param){
      const { option, index } = param.detail
      this.tagOption[index].active=!this.tagOption[index].active
      let ids = []
      let names = []
      this.tagOption.forEach((item)=>{
        if(item.active){
          ids.push(item.id)
          names.push(item.name)
        }
      })
      this.baseFormData.tag.id = ids
      this.baseFormData.tag.name = names
      this.$apply()
    },

    // 保存新增标签
    saveTagPop(param){
      const { tagName, tagDesc, popOptions } = param.detail
      this.tagOption = popOptions
      this.baseFormData.tag.id = []
      this.baseFormData.tag.name = []
      this.tagOption.forEach((item)=>{
        if(item.active){
          this.baseFormData.tag.id.push(item.id)
          this.baseFormData.tag.name.push(item.name)
        }
      })
      if(tagName === ''){
        return
      }
      this.methods.saveLabelInfo({
        custInfoId: this.custInfoId, // 商家id
        type: 2, // 类别 1系统，2自定义
        label: tagName, // 标签名
        remark: tagDesc, // 备注
      }).then((res)=>{
        const { code, data, msg } = res.payload
        if(code == 0) {
          this.tagOption.push({
            id: data,
            name: tagName,
            active: true,
          })
          this.baseFormData.tag.id.push(data)
          this.baseFormData.tag.name.push(tagName)
        }else{
          Toast.fail(msg)
        }
        this.$apply()
      })
    },

    // 添加修改产品
    jumpClick(evt){
      let outIndex = ''
      if(evt && evt.currentTarget && evt.currentTarget.dataset){
        outIndex = evt.currentTarget.dataset.outIndex
      }

      let requiredParameters = JSON.stringify(this.baseFormData)
      wx.navigateTo({
        url: '/pages/dms/order-item-choose-new/index?orgId='+''+'&warehouseId='+''+'&ly='+this.ly+'&requiredParameters='+requiredParameters+'&itemProIndexR='+outIndex
      })
    },

    // 删除产品
    onRemoveOutItem(evt){
      let { outIndex } = evt.currentTarget.dataset
      this.productList.splice(outIndex, 1)
      this.methods.calculateTotal()
      this.$apply()
    },

    // 销售数量改变
    onQuantityChange(event){
      let { detail } = event
      let { outIndex } = event.currentTarget.dataset
      this.productList[outIndex].quantity = detail
      let chooseItem = this.productList[outIndex]
      this.methods.onTabFilterFormChange(chooseItem)
      this.$apply()
    },

    // 销售价格改变
    onPriceChange(event){
      let { detail } = event
      let { outIndex } = event.currentTarget.dataset
      this.productList[outIndex].sellingPrice = detail
      let chooseItem = this.productList[outIndex]
      this.methods.onTabFilterFormChange(chooseItem)
      this.$apply()
    },

    // 小计
    onTabFilterFormChange: (chooseItem) => {
      // 小计 = 数量 * 单价
      let num = chooseItem.quantity
      let price = chooseItem.sellingPrice
      let volume = chooseItem.volume
      chooseItem.subtotalAmount = mulNum(num, price)
      chooseItem.subtotalVolume = mulNum(num, volume)
      this.methods.calculateTotal()

      this.$apply()
    },

    // 合计
    calculateTotal: () => {
      let totalNum = 0
      let totalVolume = 0
      let totalAmount = 0
      this.productList.forEach((item)=>{
        totalNum = addNum(totalNum, item.quantity)
        totalVolume = addNum(totalVolume, item.subtotalVolume)
        totalAmount = addNum(totalAmount, item.subtotalAmount)
      })
      // 合计数量 = 每一项数量相加
      this.totalNum = totalNum
      // 合计体积 = 每一项体积相加
      this.totalVolume = totalVolume
      // 合计金额 = 每一项金额相加
      this.totalAmount = totalAmount
      this.$apply()
    },
  }
  // 获取标签列表、用户来源列表
  findLabelListInfo(){
    let param = {
      custInfoId: this.custInfoId // 	商家id
    }
    this.methods.findLabelList(param).then((res)=>{
      if(res && res.payload && res.payload.data) {
        this.tagOption = res.payload.data.map(item => {
          return {
            ...item,
            id: item.id,
            name: item.label,
            active: false
          }
        })
      }
      this.$apply()
    })
    this.methods.findSourceList(param).then((res)=>{
      if(res && res.payload && res.payload.data) {
        this.sourceOption = res.payload.data.map(item => {
          return {
            ...item,
            id: item.id,
            name: item.source,
          }
        })
      }
      this.$apply()
    })
  }

  // 更新建议零售价(元)
  renewLsPrice(chooseItem, currIndex){
    // 如果有已选门店，才走以下if判断中内容
    if (this.baseFormData.store.id) {
      let shopCisCode = this.baseFormData.store.id
      this.methods.getLsPrice({
        type: shopCisCode != '' ? '3' : '2',
        orgId: '',
        cisCode: this.$parent.globalData.cisCode,
        shopCisCode: shopCisCode,
        productId: chooseItem.productCode,
        refreshPrice: true,
      }).then((res: any) => {
        const { price } = res.payload
        if(this.productList[currIndex].price != price){
          this.productList[currIndex].price =  price || ""
          if(price){
            this.productList[currIndex].sellingPrice =  price
            let chooseItem = this.productList[currIndex]
            this.methods.onTabFilterFormChange(chooseItem)
          }
        }
        this.$apply()
      });
    }
  }

  // 获取服务列表
  getServiceList(chooseItem, currIndex){
    const { chooseProvinceInfo, chooseCityInfo, chooseRegionInfo, chooseTownInfo, deliveryMethod} = this.baseFormData
    // 根据发货仓库+配送方式，服务方式字段变化显示
    // 如果仓库为统仓，配送方式选择“配送、自提、配送（加急）“，服务方式字段显示，可选择
    // 如果仓库为统仓，配送方式为“直配到工地“，服务方式字段隐藏，取值空
    // 如果仓库为原仓，服务方式字段隐藏，取值空
    // 省市区必须要有值不然会报错
    if(chooseItem.gicWarehouseType=='20' && deliveryMethod && deliveryMethod.id && deliveryMethod.id != '07' && chooseProvinceInfo.id && chooseCityInfo.id && chooseRegionInfo.id && chooseTownInfo.id){
      this.methods.getZoneB2cServiceList({
        orgCode: chooseItem.orgCode,
        warehouseCode: chooseItem.gicWarehouse,
        provinceCode: chooseProvinceInfo.id,
        cityCode: chooseCityInfo.id,
        countyCode: chooseRegionInfo.id,
        townCode: chooseTownInfo.id,
      }).then((res) => {
        const { payload } = res
        if( payload.data && payload.code == 0 && payload.data.length > 0){
          let serviceList = payload.data
          let zoneB2cService = []
          let zoneB2cServiceName = []
          serviceList.forEach(it => {
            if (it.isSupport === '1' && it.isDefault === '1') {
              zoneB2cService.push(it.serviceCode)
              zoneB2cServiceName.push(it.serviceName)
            }
          })
          this.productList[currIndex].serviceList =  serviceList
          this.productList[currIndex].zoneB2cService =  zoneB2cService
          this.productList[currIndex].zoneB2cServiceName =  zoneB2cServiceName
        }
        this.$apply();
      });
    }
  }

  // 添加或修改产品赋值
  productAssignment(chooseItem, itemProIndexR){
    let outItems = this.productList;
    let currIndex = itemProIndexR
    if(!Array.isArray(outItems)){
      outItems =[];
    }
    if(itemProIndexR!=='' && itemProIndexR !== 'undefined'){ // 如果itemProIndexR有值为编辑直接替换数据；否则为新增
      outItems[itemProIndexR] = chooseItem;
    }else{
      currIndex = this.productList.length
      outItems.push(chooseItem);
    }
    this.productList = outItems
    this.methods.onTabFilterFormChange(chooseItem)
    this.renewLsPrice(chooseItem, currIndex)
    this.getServiceList(chooseItem, currIndex)
    this.$apply()
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

    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if(currPage.data.chooseItem ) {
      const itemProIndexR  = currPage.data.itemProIndexR
      this.productAssignment(currPage.data.chooseItem, itemProIndexR)
      currPage.data.chooseItem = null
    }
    this.$apply()
  }

  onLoad() {
    const { customer }=JSON.parse(wx.getStorageSync('b2b_token'))
    this.custInfoId=customer && customer.id
    this.$broadcast('retail');

    this.methods.getRetailOrderInfo();

    //获取配送方式
    this.methods.getCisDeliveryMethod({ type: this.baseFormData.saleType.id });
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
    this.findLabelListInfo()
  }
}
