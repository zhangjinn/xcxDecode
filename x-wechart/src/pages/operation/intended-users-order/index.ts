import wepy from 'wepy';
import { connect } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import address from '@/components/dms-address/index';
import addressDetail from '@/pages/components/select-address-details/index';
import purchaseIntention from '@/components/user-operation/purchase-intention/index';
import {
  getWarehouseList,
  getShopInfoPrototype,
} from '@/store/actions/dmsorder';
import {
  saveShopPotentialUser,
  findLabelList,
  saveLabelInfo,
  findSourceList,
  saveSourceInfo,
  commDict,
} from '@/store/actions/order';
import retailOrder from '@/mixins/channel-retail-order';
import { debounce } from 'throttle-debounce';
import { checkTel } from '@/utils/index';
import PopupToast from '@/components/popup-toast/index';
import utilsWxs from '../../../wxs/utils.wxs';

interface Data {
  popTitle: string;
  compareInfo: {};
  popFiledKey: string;
  popVisible: boolean;
  popFiBookVisible: boolean;
  popList: any[];
  popIndex: any;
  imgObj: object;
  genderOption: any[];
  addWeChatOption: any[];
  baseFormData: object;
  tagOption:any[];
  sourceOption:any[];
  stores:any[];
  custInfoId: any;
  defaultAddressName: string;
}

@connect({

}, {
  getWarehouseList,
  getShopInfoPrototype,
  saveShopPotentialUser, // 保存意向用户
  findLabelList, // 获取意向标签列表
  saveLabelInfo, // 保存意向标签
  findSourceList, // 获取意向用户来源列表
  saveSourceInfo, // 保存意向用户来源
  commDict, // 字典 买力:14927471376 用户类型:14927471377
})
export default class IntendedUsersOrder extends wepy.page {
  config = {
    navigationBarTitleText: '意向用户录入',
    usingComponents: {
      "van-popup": "/components/vant/popup/index",
      "van-toast": "/components/vant/toast/index",
      "van-icon": "/components/vant/icon/index",
      "van-submit-bar": "/components/vant/submit-bar/index",
      "van-field": "/components/vant/field/index",
      "van-dialog": "/components/vant/dialog/index",
      "stores": "/components/stores-return/index",
      'calendar': '/components/calendar/index',
      "tile-radio": "/components/tile-radio/index",
      "entry-label": "/components/user-operation/entry-label/index",
      "entry-source": "/components/user-operation/entry-source/index",
    },
  };
  wxs = {
    utils: utilsWxs,
  };
  mixins = [retailOrder];
  data: Data = {
    baseFormData: {
      store: {
        id: '',
        name: ''
      }, // 所属门店*
      customerName: '', // 用户姓名*
      customerPhone: '', // 手机号*
      gender: {
        id: '1',
        name: '男'
      }, // 用户性别
      addWeChat: {
        id: '0',
        name: '未加'
      }, // 是否添加微信
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
      remark: '', // 备注
    },
    popList: [],
    popIndex: '-1',
    popTitle: '',
    popVisible: false,
    popFiledKey: '',
    compareInfo: {},
    imgObj: {
      'deliveryInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864758756_fd141c1df28d416c87a8f81b9231a354.png', // 收货信息@2x.png
      'productInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864759346_77a464c855c841938c5dfa1149dc2f30.png', // 产品信息@2x.png
    },
    genderOption: [
      {id:'1', name:'男士'},
      {id:'2', name:'女士'},
    ], // 用户性别选择列表
    addWeChatOption: [
      {id:'0', name:'未加'},
      {id:'1', name:'已加'},
    ], // 是否添加微信选择列表
    tagOption: [], // 标签选择列表
    sourceOption: [], // 用户来源选择列表
    stores: [], // 所属门店选择列表
    custInfoId: '', // 商家id
    defaultAddressName: '' // 默认详细地址
  };
  components = {
    address,
    addressDetail,
    popup: PopupToast,
    purchaseIntention,
  };
  computed = {
    // 计算属性的 用于地址详情是否显示必填符号
    addressDetailRequired: function () {
      return false
    },
    // 计算属性的 用于地址详情区编码
    chooseRegionId: function () {
      return this.baseFormData.chooseRegionInfo.id
    }
  }

  events = {
    'chooseAddressDetail': (payload: any) => { // 地址详情子组件传参
      this.baseFormData.receiverDetail = payload.addressName
    }
  }
  methods = {
    async openTopAddress() {

      const { chooseProvinceInfo, chooseCityInfo, chooseRegionInfo, chooseTownInfo } = this.data.baseFormData;
      this.$invoke('address', 'openAddressPopup', {
        province: chooseProvinceInfo.id,
        city: chooseCityInfo.id,
        area: chooseRegionInfo.id,
        town: chooseTownInfo.id
      }, (item: any, address: any) => {
        if(!address.townId){
          return
        }
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
    openChoose: (event) => {
      const { title, index, key, options } = event.currentTarget.dataset
      let list = this[options]
      if (!list || list.length === 0) {
        return
      }
      this.popList = list
      this.popIndex = index
      this.popFiledKey = key
      this.popTitle = title
      this.compareInfo = this.baseFormData[this.popFiledKey]

      this.popVisible = true
    },
    onClose: () => {
      this.popVisible = false
    },
    onChoose: ({ currentTarget }: e) => {
      const { index } = currentTarget.dataset
      const { popFiledKey, popList } = this.data
      this.baseFormData[popFiledKey] = popList[index]
      this.popVisible = false
      if(popFiledKey === 'store'){
        this.baseFormData.chooseProvinceInfo = {
          id: popList[index].provinceCode || '',
          name: popList[index].provinceName || ''
        }
        this.baseFormData.chooseCityInfo = {
          id: popList[index].cityCode || '',
          name: popList[index].cityName || ''
        }
        this.baseFormData.chooseRegionInfo = {
          id: popList[index].districtCode || '',
          name: popList[index].districtName || ''
        }
        this.baseFormData.chooseTownInfo = {
          id: popList[index].townCode || '',
          name: popList[index].townName || ''
        }
        this.baseFormData.addressTip = this.baseFormData.chooseProvinceInfo.name + this.baseFormData.chooseCityInfo.name + this.baseFormData.chooseRegionInfo.name + this.baseFormData.chooseTownInfo.name
        this.baseFormData.receiverDetail = popList[index].address
        this.defaultAddressName = popList[index].address // 用来传参子组件默认地址
      }
      this.$apply()
    },

    // 基本信息表单输入框改变
    onBaseFieldChange: debounce(500, ({ detail, currentTarget }: any) => {
      const { key } = currentTarget.dataset
      this.baseFormData[key] = detail.trim()
      this.$apply()
    }),

    // 自定义单选改变
    onRadioChange(event){
      const { detail } = event
      const { key } = event.currentTarget.dataset
      this.baseFormData[key] = detail
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

    // 提交
    submit: async () => {
      const { store, customerName, customerPhone, gender, addWeChat, source, tag, chooseProvinceInfo, chooseCityInfo, chooseRegionInfo, chooseTownInfo, receiverDetail, remark } = this.data.baseFormData
      let that = this
      let purchaseIntention = this.$invoke('purchaseIntention', 'getParams')
      if (await that.methods.checkParam()) {
        let productList = []
        if(purchaseIntention.length){
          productList = purchaseIntention.map((item)=>{
            return {
              spartId: item.intendedCategory.id, // 品类id
              product: item.intendedProduct, // 产品型号
              budget: item.purchaseBudget.id, // 预算
              planBuyTime: item.expectedDeliveryDate, // 预计购买时间
            }
          })
        }
        let param = {
          shopInfoId: store.id, // 门店id
          custInfoId: this.custInfoId, // 商家id
          userName: customerName, // 意向用户名
          phone: customerPhone, // 电话
          wechat: addWeChat.id, // 微信
          gender: gender.id, // 性别
          provinceCode: chooseProvinceInfo.id, // 省
          cityCode: chooseCityInfo.id, // 市
          districtCode: chooseRegionInfo.id, // 区
          townCode: chooseTownInfo.id, // 县
          address: receiverDetail, // 详细地址
          headImg: '', // 头像
          sourceId: source.id, // 来源id
          remark: remark, // 备注
          labelList: tag.id, // 标签数组,number []
          userType: '', // 用户类型1海信,2商家
          productList: productList, // 购买意向,object []
          data_source: 'xcx',
        }
        this.methods.saveShopPotentialUser(param).then((res)=>{
          const { type, text, msg} = res.payload
          if(type === 'success'){
            Toast.success(text)
            wx.navigateBack({
              delta: 1,
            });
          }else{
            Toast.fail(msg)
          }
        })

      }
    },

    checkParam: async () => {
      const { store, customerName, customerPhone, chooseProvinceInfo } = this.data.baseFormData
      if (!store.id) {
        Toast.fail('请选择门店')
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
        Toast.fail('请填写正确手机号')
        return false
      }
      return true
    },

  }

  // 获取所属门店列表
  getShopInfoPrototypeInfo(){
    this.methods.getShopInfoPrototype({
      exclusiveShop: 1 // 1只查专卖店
    }).then((res)=>{
      const { list } = res.payload
      this.stores = list.map((item)=>{
        return {
          ...item,
          id: item.code,
          name: item.name,
        }
      })
      this.$apply()
    })
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

  onLoad() {
    const { customer }=JSON.parse(wx.getStorageSync('b2b_token'))
    this.custInfoId=customer && customer.id
    this.getShopInfoPrototypeInfo()
    this.findLabelListInfo()
  }
}
