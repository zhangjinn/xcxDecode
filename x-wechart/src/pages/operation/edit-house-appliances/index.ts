import wepy from 'wepy';
import { connect } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import address from '@/components/dms-address/index';
import addressDetail from '@/pages/components/select-address-details/index';
import popupCustomize from "../../components/popup-customize/index";
import homeAppliances from "@/components/user-operation/edit-home-appliances/index";

import {
  getShopPotentialHourse,
  updateShopPotentialUserDetail,
  commDict,
} from '@/store/actions/order';
import { debounce } from 'throttle-debounce';
import { getBlueCategoryPictures } from "@/utils/index";

interface Data {
  imgObj: object;
  baseFormData: object;
  houseTypeOption: any[];
  detailId: any;
  currId: any;
  addressDetailRequired: boolean;
  popTitle: string;
  formKey: string;
  currentOptions: any[];
  popSelectedOption: object;
  details: any;
  defaultAddressName: string
  maskShow: boolean
}

@connect({
  address({ dmsorder }) {
    return dmsorder.retailOrderBaseInfo.address
  },

}, {
  getShopPotentialHourse, // 房屋及家电详情
  updateShopPotentialUserDetail, // 修改房屋及家电
  commDict,
})
export default class IntendedUsersOrder extends wepy.page {
  config = {
    navigationBarTitleText: '编辑全屋家电信息',
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
    currId: '', // 房屋家电详情id
    addressDetailRequired: true, //地址详情必填
    popTitle: '', // 弹框标题
    formKey: '',
    currentOptions: [],
    popSelectedOption: {},
    details: {},
    defaultAddressName: '', // 默认详细地址
    maskShow: false, // 房屋类型蒙板
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

    // 删除产品
    delProduct(event){
      const { index } = event.currentTarget.dataset
      this.details.hourseProductDtoList.splice(index, 1)
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
        if(this.details.hourseProductDtoList && this.details.hourseProductDtoList.length){
          this.details.hourseProductDtoList.forEach((item)=>{
            productList.push(item)
          })
        }
        if(purchaseIntention.length){
           purchaseIntention.forEach((item)=>{
            let obj = {
              product: item.intendedProduct, // 产品
              spartId: item.intendedCategory.id, // 品类id
              brand: item.brand, // 品牌
              productAge: item.years, // 使用年限
              remark: item.remark, // 备注
            }
             productList.push(obj)
          })
        }

        let param = {
          id: this.currId,
          townCode: chooseTownInfo.id, // 乡镇
          address: receiverDetail, // 详细地址
          community: communityName, // 小区
          userId: this.detailId, // 用户
          hourseTypeName: houseType, // 房屋类型
          hourseProductDtoList: productList,
        }

        this.methods.updateShopPotentialUserDetail(param).then((res)=>{
          const { code, msg} = res.payload
          if(code == '0'){
            Toast.success({
              forbidClick: true,
              duration: 1000,
              message: '修改成功',
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

  // 潜在客户明细
  getShopPotentialHourseInfo(){
    this.methods.getShopPotentialHourse({
      userId: this.detailId,
      id: this.currId
    }).then((res)=>{
      const { list } = res.payload
      this.details = list[0]
      if(this.details.hourseProductDtoList){
        this.details.hourseProductDtoList = this.details.hourseProductDtoList.map((product)=>{
          product.categoryPicture = getBlueCategoryPictures(product.spartId)
          return product
        })
      }

      this.baseFormData = {
        communityName: this.details.community, // 小区名称
        houseType: this.details.hourseTypeName, // 户型
        chooseProvinceInfo: {
          id: this.details.provinceCode,
          name: this.details.provinceName || ''
        }, // 省
        chooseCityInfo: {
          id: this.details.cityCode,
          name: this.details.cityName || ''
        }, // 市
        chooseRegionInfo: {
          id: this.details.districtCode,
          name: this.details.districtName || ''
        }, // 区/县
        chooseTownInfo: {
          id: this.details.townCode,
          name: this.details.townName || ''
        }, // 乡镇
        receiverDetail: this.details.address, // 详细地址
      }
      this.baseFormData.addressTip =  this.baseFormData.chooseProvinceInfo.name + this.baseFormData.chooseCityInfo.name+ this.baseFormData.chooseRegionInfo.name+ this.baseFormData.chooseTownInfo.name // 所在地区

      this.defaultAddressName = this.details.address
      this.$apply()
    })
  }

  onLoad({ id, itemId }) {
    this.detailId = id
    this.currId = itemId
    this.commDictInfo()
    this.getShopPotentialHourseInfo()
  }
}
