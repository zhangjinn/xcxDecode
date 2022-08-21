import wepy from 'wepy';
import { map } from 'ramda';
import { request } from '@/utils/request';

export default class Address extends wepy.component {
  props = {
    type: {
      type: String,
      default: 'popup',
    },
    title: {
      type: String,
      default: '配送至',
    }
  };
  // 缓存触发
  callback = () => {};
  // 关闭回调
  onClose = () => {};
  data = {
    loading: false,
    addressVisible: false,
    areaCurrentTab: 'province',
    addressTempId: '',
    // 省
    province: {
      name: '请选择',
      id: '',
      items: [],
    },
    // 市
    city: {
      name: '请选择',
      id: '',
      items: [],
    },
    // 区
    area: {
      name: '请选择',
      id: '',
      items: [],
    },
    // 乡镇
    town: {
      name: '请选择',
      id: '',
      items: [],
    },
    addressItems: [],
    chooseAddressId: null, // 当前选中的id
    level: 1,
  };
  methods = {
    openAddressPopup: (provinces, { province, city, area }: any, callback: any) => {
      this.addressVisible = true;
      this.province = {
        id: province,
        name: '请选择',
        items: provinces,
      };
      this.city.id = city;
      this.area.id = area;
      this.addressTempId = province;
      this.addressItems = provinces;
      this.callback = callback;
    },
    closeAddressPopup: () => {
      // 判断是否正常选择地址
      this.addressVisible = false;
    },

    // 选择tab 切换
    chooseAddressTap(tab) {
      if (this[`${tab}`].items && this[`${tab}`].items.length) {
        this.areaCurrentTab = tab;
        this.addressItems = this[`${tab}`].items;
        this.addressTempId = this[`${tab}`].id;
      }
    },
    // 选择每项
    chooseAddress: ({ code, level, name }: any) => {
      switch (level) {
        case 1:
          this.areaCurrentTab = 'province';
          this.province.name = name;
          this.province.id = code;
          break;
        case 2:
          this.areaCurrentTab = 'city';
          this.city.name = name;
          this.city.id = code;
          break;
        case 3:
          this.areaCurrentTab = 'area';
          this.area.name = name;
          this.area.id = code;
          break;
        case 4:
          this.areaCurrentTab = 'town';
          this.town.name = name;
          this.town.id = code;
          const addressInfo = {
            id: code,
            name: `${this.province.name}${this.city.name}${this.area.name}${this.town.name}`,
          };
          const address: any = {
            provinceId: this.province.id,
            cityId: this.city.id,
            areaId: this.area.id,
            townId: this.town.id,
            provinceName: this.province.name,
            cityName: this.city.name,
            areaName: this.area.name,
            townName: this.town.name,
          };
          this.callback(addressInfo, address);
          break;
        default:
          break;
      }
      //  添加级别控制，防止出现街道
      this.level = level;
      this.getAddressList(code, level);
    },
  };
  // 获取地址列表 TODO:
  getAddressList(code, level) {
    this.loading = true;

    //const params = level === 1 ? { api: 'customer/getCity.nd', data: { proviceCode: code } } : { api: 'customer/getDistrict.nd', data: { cityCode: code } }
    let params = {};
    switch (level) {
      case 1:
        params = { api: 'customer/getCity.nd', data: { proviceCode: code } };
        break;
      case 2:
        params = { api: 'customer/getDistrict.nd', data: { cityCode: code } };
        break;
      default:
        params = { api: 'customer/getTown.nd', data: { districtCode: code } };
        break;
    };

    request({ ...params, method: 'POST' }).then(res => {
      //  添加级别控制，防止出现街道
      if (res && res.length > 0) {
        let items: any = [];
        if (level === 1) {
          items = map(({ id, cityCode, cityName }) => ({ id, name: cityName, code: cityCode, level: 2 }), res);
          this.city = {
            ...this.city,
            id: code,
            items,
          };
        }
        if (level === 2) {
          items = map(({ id, districtCode, districtName }) => ({ id, name: districtName, code: districtCode, level: 3 }), res);
          this.area = {
            ...this.area,
            id: code,
            items,
          };
        }
        //增加乡镇 CIS
        if (level === 3) {
          items = map(({ id, townCode, townName }) => ({ id, name: townName, code: townCode, level: 4 }), res);
          this.area = {
            ...this.area,
            id: code,
            items,
          };
        }
        this.addressItems = items;
        this.addressTempId = code;
      } else {
        this.resetAddress(this.chooseAddressId);
      }
      this.loading = false;
      this.$apply();
    });
  }
  // 重置地址选择
  resetAddress(id) {
    const { province, city, area, town } = this;
    // 关闭 popu
    this.addressVisible = false;
    this.addressTempId = '';
    this.addressItems = this.province.items;
    this.address = `${province.name}${city.name}${area.name}${town.name}`;
    this.addressId = id;
    this.level = 0;
    // 重置市  区 街道
    // 市
    this.province = {
      name: '请选择',
      id: '',
      items: [],
    };
    this.city = {
      name: '请选择',
      id: '',
      items: [],
    };
    // 区
    this.area = {
      name: '请选择',
      id: '',
      items: [],
    };
  }
}
