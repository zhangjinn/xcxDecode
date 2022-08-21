import wepy from 'wepy';
import { connect } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import address from '@/components/dms-address/index';
import addressDetail from '@/pages/components/select-address-details/index';
import popupCustomize from "../../components/popup-customize/index";
import homeAppliances from "@/components/user-operation/home-appliances/index";
import {
  commDict,
  saveShopPotentialUserDetail,
  getShopPotentialUserDetail,
} from '@/store/actions/order';
import { debounce } from 'throttle-debounce';

interface Data {
  baseFormData: object;
  houseTypeOption: any[];
  detailId: any;
  addressDetailRequired: boolean;
  popTitle: string;
  formKey: string;
  currentOptions: any[];
  popSelectedOption: object;
  maskShow: boolean;
  defaultAddressName: string;
}

@connect({
  address({ dmsorder }) {
    return dmsorder.retailOrderBaseInfo.address
  },

}, {
  saveShopPotentialUserDetail, // 保存意向用户
  commDict,
  getShopPotentialUserDetail,
})
export default class IntendedUsersOrder extends wepy.page {
  config = {
    navigationBarTitleText: '新增全屋家电信息',
    usingComponents: {
      "van-popup": "/components/vant/popup/index",
      "van-toast": "/components/vant/toast/index",
      "van-icon": "/components/vant/icon/index",
      "van-submit-bar": "/components/vant/submit-bar/index",
      "van-field": "/components/vant/field/index",
      "van-dialog": "/components/vant/dialog/index",
    },
  };

  data: Data = {
    baseFormData: {
      communityName: '', // 小区名称
      houseType: '', // 户型
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
    },
    houseTypeOption: [], // 户型选择列表
    detailId: '', // 列表页传入当前详情id
    addressDetailRequired: true, //地址详情必填
    popTitle: '', // 弹框标题
    formKey: '',
    currentOptions: [],
    popSelectedOption: {},
    maskShow: false, // 房屋类型蒙板
    defaultAddressName: '', // 默认详细地址
  };

  components = {
    address,
    addressDetail,
    popupCustomize,
    homeAppliances,
  };

  computed = {
    // 计算属性的 用于地址详情区编码
    chooseRegionId: function () {
      return this.baseFormData.chooseRegionInfo.id
    }
  }

  watch = {
    'address': function (newValue: Object) {
      const tip = '请选择'
      if (newValue.province.id) {
        this.baseFormData.chooseProvinceInfo = newValue.province
        tip = this.baseFormData.chooseProvinceInfo.name
      }
      if (newValue.city.id) {
        this.baseFormData.chooseCityInfo = newValue.city
        tip += this.baseFormData.chooseCityInfo.name
      }
      if (newValue.country.id) {
        this.baseFormData.chooseRegionInfo = newValue.country
        tip += this.baseFormData.chooseRegionInfo.name
      }
      if (newValue.town.id) {
        this.baseFormData.chooseTownInfo = newValue.town
        tip += this.baseFormData.chooseTownInfo.name
      }

      this.baseFormData.addressTip = tip
      this.$apply()
    },
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

    // 基本信息表单输入框改变
    onBaseFieldChange: debounce(500, ({ detail, currentTarget }: any) => {
      const { key } = currentTarget.dataset
      this.formKey = key
      this.baseFormData[key] = detail.trim()
      if( key === 'houseType' ){
        this.maskShow = true
      }
      this.$apply()
    }),

    // 修改意向产品模糊搜索列表隐藏
    popHide: () => {
      this.maskShow = false
    },
    // 选择产品并赋值
    onProductSelect(item){
      const { name } = item
      this.baseFormData[this.formKey] = name
      this.methods.popHide()
    },

    // 打开筛选列表弹框
    onPopOpen(e){
      if( this.isDisabled ){
        return
      }
      const {dataset: { name, key, options }} = e.currentTarget
      this.isSearch = false // 选择弹框列表是否可搜索
      this.multiple = false // 选择弹框列表是否多选
      this.popTitle = name // 选择弹框标题
      this.formKey = key
      this.currentOptions = this[options]
      this.popSelectedOption = this.baseFormData[this.formKey]
      this.$invoke('popupCustomize', 'onShow');
      this.$apply()
    },

    // 选择对应列表项并赋值
    chooseOption(item){
      this.baseFormData[this.formKey].id = item.id
      this.baseFormData[this.formKey].name = item.name
      this.$invoke('popupCustomize', 'onClose');
      this.$apply()
    },

    // 提交
    submit: async () => {
      const { communityName, houseType, chooseTownInfo, receiverDetail} = this.data.baseFormData
      let that = this
      let purchaseIntention = this.$invoke('homeAppliances', 'getParams')
      if (await that.methods.checkParam()) {
        let checkParams = this.$invoke('homeAppliances', 'checkParams')
        if(checkParams){
          Toast.fail(checkParams)
          return false
        }
        let productList = []
        if(purchaseIntention.length){
          productList = purchaseIntention.map((item)=>{
            return {
              product: item.intendedProduct, // 产品
              spartId: item.intendedCategory.id, // 品类id
              brand: item.brand, // 品牌
              productAge: item.years, // 使用年限
              remark: item.remark, // 备注
            }
          })
        }
        let param = {
          townCode: chooseTownInfo.id, // 乡镇
          address: receiverDetail, // 详细地址
          community: communityName, // 小区
          userId: this.detailId, // 用户
          hourseTypeName: houseType, // 房屋类型
          hourseProductDtoList: productList,
        }
        this.methods.saveShopPotentialUserDetail(param).then((res)=>{
          const { code, msg} = res.payload
          if(code == '0'){
            Toast.success({
              forbidClick: true,
              duration: 1000,
              message: '新增成功',
              onClose: () => {
                wx.navigateBack({
                  delta: 1,
                });
              },
            });
          }else{
            Toast.fail(msg)
          }
        })
      }
    },

    checkParam: async () => {
      const { chooseProvinceInfo, receiverDetail } = this.data.baseFormData
      if (!chooseProvinceInfo.id) {
        Toast.fail('请选择所在地区')
        return false
      }
      if (receiverDetail === '') {
        Toast.fail('请填写详细地址')
        return false
      }
      return true
    },
  }

  // 获取用户详情
  getShopPotentialUserDetailData(){
    // 新增销售机会，房屋家电地址默认用户地址，如果没有用户地址择只取商家的所在地区（省市区），不取商家的详细地址
    this.methods.getShopPotentialUserDetail({
      userId: this.detailId
    }).then((res)=>{
      const { data } = res.payload

      if(data){
        let provinceCode = data.provinceCode
        let provinceName = data.provinceName
        let cityCode = data.cityCode
        let cityName = data.cityName
        let districtCode = data.districtCode
        let districtName = data.districtName
        let townCode = data.townCode
        let townName = data.townName
        let receiverDetail = data.address

        if(!provinceCode){
          const res: any = wx.getStorageSync('b2b_token');
          const { customer } = JSON.parse(res);
          provinceCode = customer.currentTradeCode
          provinceName = customer.currentTradeName
          cityCode = customer.currentCityCode
          cityName = customer.currentCityName
          districtCode = customer.currentAreaCode
          districtName = customer.currentAreaName
          townCode = customer.townCode
          townName = customer.townName
          receiverDetail = ''
        }

        this.baseFormData = {
          chooseProvinceInfo: {
            id: provinceCode || '',
            name: provinceName || ''
          }, // 省
          chooseCityInfo: {
            id: cityCode || '',
            name: cityName || ''
          }, // 市
          chooseRegionInfo: {
            id: districtCode || '',
            name: districtName || ''
          }, // 区/县
          chooseTownInfo: {
            id: townCode || '',
            name: townName || ''
          }, // 乡镇
          receiverDetail: receiverDetail, // 详细地址
        }
        this.baseFormData.addressTip =  this.baseFormData.chooseProvinceInfo.name + this.baseFormData.chooseCityInfo.name+ this.baseFormData.chooseRegionInfo.name+ this.baseFormData.chooseTownInfo.name // 所在地区
        this.defaultAddressName = receiverDetail
      }

      this.$apply()
    })
  }

  commDictInfo(){
    // 获取户型选择列表
    this.methods.commDict({
      pid: '90800'
    }).then((res)=>{
      const { list } = res.payload
      this.houseTypeOption = list.map((item)=>{
        return {
          ...item,
          id: item.code,
          name: item.name
        }
      })
    })
  }

  onLoad({ id }) {
    this.detailId = id
    this.commDictInfo()
    this.getShopPotentialUserDetailData()
  }
}
