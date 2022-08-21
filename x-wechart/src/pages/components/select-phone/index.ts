import wepy from 'wepy';
import { debounce } from 'throttle-debounce';
import {connect} from "wepy-redux";
import {getAMapV5Placeext,getAddressContacts} from "@/store/actions/order";

interface Data {
  addressOptions: any[];
  formData: object;
  popShow: boolean;
  contacts: any[], //联系人列表
  phone: ''
}
@connect({

}, {
  getAMapV5Placeext,
  getAddressContacts
})
export default class Header extends wepy.component {
  props = {
    type: { 
      type: String,
      default: 'contact',
    },
    isRequired: { // 是否显示必填标志 ✳号
      type: Boolean,
      default: false
    },
    prop: { // 地址id
      type: Object,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false
    },
    val: {
      type: String,
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
  data: Data = {
    popShow: false,
    addressOptions: [],
    contacts: [],
    formData: {},
    phone: ''
  };
  watch={
    prop(v) {
      this.getContacts()
      this.phone = v.contactInfo;
      this.$apply()
    }
  };
  methods = {
    onChange: ({ detail }: any) => {
      this.formData = {
        contact: {phone: detail,contact: this.prop.contact}
      }
      this.phone = detail
      this.popShow = true
      
      this.toEmit()
      this.$apply()
    },
    onCancel() {
      this.popShow = false
      this.$apply()
    },

    onSelect(item: object) {
      this.formData = {
        contact: item
      }
      this.phone = item.phone
      this.popShow = false
      this.toEmit()
      this.$apply()
    },

  };

  toEmit(){
    let param = {
      contact: this.formData.contact
    }
    this.$emit('choosePhone', param)
    this.$apply()
  }

  // 获取联系人列表
  getContacts(){
    let param = {
      id: this.prop.shippingAddress.key,
      // id: 1
    }
    this.methods.getAddressContacts(param).then((res)=>{
      if (res && res.payload && res.payload.list) {
        this.contacts = res.payload.list
        this.$apply()
      }
    });
  }
}
