import wepy from 'wepy';
import { connect } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import address from '@/components/dms-address/index';
import addressDetail from '@/pages/components/select-address-details/index';
import purchaseIntention from '@/components/user-operation/purchase-intention/index';
import {
  getShopPotentialProduct,
  saveShopPotentialProduct,
  updateShopPotentialProduct,
  getShopPotentialUserDetail,
} from '@/store/actions/order';
import { debounce } from 'throttle-debounce';

interface Data {
  imgObj: object;
  baseFormData: object;
  purchaseIntentionInfo: any[];
  defaultAddressName: string;
  pageType: string;
  detailId: any;
  currId: any;
}

@connect({
  address({ dmsorder }) {
    return dmsorder.retailOrderBaseInfo.address
  },

}, {
  getShopPotentialProduct, // 销售机会
  saveShopPotentialProduct, // 保存意向用户
  updateShopPotentialProduct, // 修改意向用户
  getShopPotentialUserDetail, // 用户详情
})
export default class IntendedUsersOrder extends wepy.page {
  config = {
    navigationBarTitleText: '',
    usingComponents: {
      "van-popup": "/components/vant/popup/index",
      "van-toast": "/components/vant/toast/index",
      "van-icon": "/components/vant/icon/index",
      "van-field": "/components/vant/field/index",
      "van-dialog": "/components/vant/dialog/index",
      'calendar': '/components/calendar/index',
    },
  };
  data: Data = {
    baseFormData: {
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
    purchaseIntentionInfo: [], // 意向购买列表
    imgObj: {
      'deliveryInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864758756_fd141c1df28d416c87a8f81b9231a354.png', // 收货信息@2x.png
      'productInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864759346_77a464c855c841938c5dfa1149dc2f30.png', // 产品信息@2x.png
    },
    defaultAddressName: '', // 默认详细地址
    pageType: 'salesOpportunity', // 购买意向组件传参需要
    detailId: '', // 列表页传入当前详情id
    currId: '', // 销售机会列表项id
  };

  components = {
    address,
    addressDetail,
    purchaseIntention,
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
      this.baseFormData[key] = detail.trim()
      this.$apply()
    }),

    // 提交
    submit: async () => {
      const { receiverDetail, chooseTownInfo } = this.data.baseFormData
      let that = this
      let purchaseIntention = this.$invoke('purchaseIntention', 'getParams')
      if (await that.methods.checkParam()) {
        let checkParams = this.$invoke('purchaseIntention', 'checkParams')
        if(checkParams){
          Toast.fail(checkParams)
          return false
        }
        let productList = []
        if(purchaseIntention.length){
          productList = purchaseIntention.map((item)=>{
            return {
              spartId: item.intendedCategory.id, // 品类id
              product: item.intendedProduct, // 产品型号
              budget: item.purchaseBudget.id, // 预算
              planBuyTimeStr: item.expectedDeliveryDate, // 预计购买时间
            }
          })
        }
        let param = {
          townCode: chooseTownInfo.id, // 所在地区
          address: receiverDetail, // 地址详情
          userId: this.detailId, // 商家id
          detailList: productList, // 购买意向,object []
        }
        if(!this.currId){ // 新增
          this.methods.saveShopPotentialProduct(param).then((res)=>{
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
        }else{ // 修改
          param.id = this.currId
          this.methods.updateShopPotentialProduct(param).then((res)=>{
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

  // 销售机会明细
  getShopPotentialProductInfo(){
    this.methods.getShopPotentialProduct({
      userId: this.detailId,
      id: this.currId
    }).then((res)=>{
      const { list } = res.payload
      this.details = list[0]
      this.baseFormData = {
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

      this.purchaseIntentionInfo = this.details.detailList || []
      this.$apply()
    })
  }

  onLoad({ id, itemId }) {
    this.detailId = id
    this.currId = itemId
    let title = ''
    if(this.currId){ // 有值为编辑，无值为新增
      title = '编辑销售机会'
      this.getShopPotentialProductInfo()
    }else{
      title = '新增销售机会'
      this.getShopPotentialUserDetailData()
    }
    wx.setNavigationBarTitle({ //动态修改页面标题
      title: title
    })
  }
}
