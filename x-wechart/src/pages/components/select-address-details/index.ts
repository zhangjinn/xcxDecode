import wepy from 'wepy';
import { debounce } from 'throttle-debounce';
import {connect} from "wepy-redux";
import {getAMapV5Placeext} from "@/store/actions/order";

interface Data {
  addressOptions: any[];
  formData: object;
  popShow: boolean;
  blur: boolean;
  scrolling: boolean;
}
@connect({

}, {
  getAMapV5Placeext
})
export default class Header extends wepy.component {
  props = {
    chooseRegionId: { // 选择的区编码
      type: String || Number,
      default: '',
    },
    isRequired: { // 是否显示必填标志 ✳号
      type: Boolean,
      default: false
    },
    defaultAddressName: { // 默认
      type: String ,
      default: '',
    }

  };
  // 缓存触发
  callback = () => {};
  config = {
    usingComponents: {
      'van-field': '/components/vant/field/index',
    },
  };
  watch = {
    defaultAddressName: function (newVal){
      if(newVal){
        this.formData.addressName = newVal
        this.$apply()
      }
    }
  }
  data: Data = {
    popShow: false,
    blur: false,
    scrolling: false,
    addressOptions: [],
    formData: {
      addressId: '',
      addressName: ''
    },
  };

  methods = {
    onAddressChange: debounce(500, ({ detail }: any) => {
      this.formData = {
        ...this.formData,
        addressName: detail ? detail.trim() : '',
      }
      this.popShow = true
      this.getAddressList()
      this.toEmit()
      this.$apply()
    }),
    onAddressSelect(item: object) {
      this.formData = {
        ...this.formData,
        addressId: item.id,
        addressName: item.name,
      }
      this.popShow = false
      this.toEmit()
      this.$apply()
    },
    onFocus() {
      if(this.formData.addressName) {
        this.getAddressList()
      }
    },
    popHide() {
      this.popShow = false
    },
  };

  toEmit(){
    let { addressName } = this.formData
    let param = {
      addressName
    }
    this.$emit('chooseAddressDetail', param)
    this.$apply()
  }

  // 获取详细地址列表
  getAddressList(){
    let { addressName } = this.formData
    if(!addressName){
      this.addressOptions = []
      return
    }
    let param = {
      searchstr: addressName,
    }
    if(this.chooseRegionId){
      param.region = this.chooseRegionId
    }

    this.methods.getAMapV5Placeext(param).then((res)=>{
      if (res && res.payload && res.payload.data && res.payload.data.pois) {
        this.addressOptions = res.payload.data.pois.map((item)=>{
          return {
            id: item.id,
            name: item.name
          }
        })
        this.$apply()
      }

    });
  }

  // 校验详细地址,,父组件提交时调用
  async checkAddressDetail(callback: any){
    this.callback = callback;
    // 只传地址详情，提交时进行校验
    let { addressName } = this.formData
    if(!addressName){
      this.callback(true)
      return
    }
    let param = {
      searchstr: addressName,
    }
    await this.methods.getAMapV5Placeext(param).then((res)=>{
      //1、如果返回有列表，遍历列表有相同的区id则通过
      //2、如果返回有列表，遍历列表没有相同的区id则不通过
      //3、如果返回值为空，则通过
      if (res && res.payload && res.payload.data && res.payload.data.pois) {
        if(res.payload.data.pois.length>0){
          const mapList = []
          res.payload.data.pois.forEach((item)=>{
            if(item.adcode == this.chooseRegionId){
              mapList.push(item)
            }
          })
          if(mapList.length>0){
            this.callback(true)
            return
          }
          this.callback(false)
          return
        }
        this.callback(true)
        return
      }

      this.$apply()
    });

  }
}
