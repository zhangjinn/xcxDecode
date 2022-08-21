import wepy from 'wepy';
import { map } from 'ramda';
import { dmsRequest } from '@/store/actions/dmsrequest';

export default class DmsAddress extends wepy.component {
  props = {
    type: {
      type: String,
      default: 'popup',
    },
    title: {
      type: String,
      default: '收货地址'
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
    // 接到
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
    openAddressPopup: ( { province, city, area, town }: any, callback: any) => {
      // const params: any = {
      //   provinceId: '',
      //   cityId: '',
      //   countryId: '',
      //   townId: ''
      // };
      // dmsRequest({ data: params, method: 'addressCascade' }).then(res => {
      //   const { address } = res
      //   const result = {
      //     province: [{
      //       id: '',
      //       code: '',
      //       level: 1,
      //       name: '请选择'
      //     }],
      //     city: [],
      //     country: [],
      //     town: []
      //   }
      //   Object.keys(address).forEach((field) => Object.keys(address[field]).forEach((code) => {
      //     const name = address[field][code]
      //     result[field].push({
      //       id: code,
      //       code,
      //       name,
      //       level: 1
      //     })
      //   }))
      //   this.addressVisible = true;
      //   this.province = {
      //     id: province,
      //     name: '请选择',
      //     items: result.province,
      //   };
      //   this.addressItems = this.province.items;
      //   this.$apply()
      // })
      this.province.id = province
      this.city.id = city;
      this.area.id = area;
      this.town.id = town;
      this.callback = callback;

      this.getAddressList(0);

    },
    closeAddressPopup: () => {
      // 判断是否正常选择地址
      this.addressVisible = false;
      this.resetAddress('');
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
        case 4 :
            this.areaCurrentTab = 'town';
            this.town.name = name;
            this.town.id = code;
            break;
        default:
          break;
      }


      if (!code || level === 4) {
        // code 为空表示选了 请选择，，选完了
        // 直接callback吧
        switch (level) {
          case 1:
            this.province.name = '请选择';
            this.province.id = '';
          case 2:
            this.city.name = '';
            this.city.id = '';
          case 3:
            this.area.name = '';
            this.area.id = '';
          case 4:
            if (!code) {
              this.town.name = '';
              this.town.id = '';
            }
        }

        const addressInfo = {
          id: code,
          name: `${this.province.name}${this.city.name}${this.area.name}${this.town.name}`,
        };
        const address: any = {
          provinceId: this.province.id,
          cityId: this.city.id,
          areaId: this.area.id,
          townId: this.town.id
        };
        level = 4
        this.callback(addressInfo, address);
      }

      //  添加级别控制，防止出现街道
      this.level = level;
      this.getAddressList(level);
    },
  };
  // 获取地址列表 TODO:
  getAddressList(level) {
    if (level < 4) {
      this.loading = true;
      const params: any = {
        provinceId: this.province.id,
        cityId: this.city.id,
        countryId: this.area.id,
        townId: this.town.id
      };

      switch (level) {
        case 1:
          params.cityId = ''
        case 2:
          params.countryId = ''
        case 3:
          params.townId = ''
      }
      dmsRequest({ data: params, method: 'addressCascade' }).then(res => {
        //  添加级别控制，防止出现街道
        const { address } = res
        const plsChoose = {
          id: '',
          code: '',
          name: '请选择'
        }
        const result = {
          province: [{
            ...plsChoose,
            level: 1
          }],
          city: [{
            ...plsChoose,
            level: 2
          }],
          country: [{
            ...plsChoose,
            level: 3
          }],
          town: [{
            ...plsChoose,
            level: 4
          }]
        }
        Object.keys(address).forEach((field) => Object.keys(address[field]).forEach((code) => {
          const name = address[field][code]
          result[field].push({
            id: code,
            code,
            name,
          })
        }))

        let items: any = [];
        if (level === 0) {
          items = map(({ id, code, name }) => ({ id, name, code, level: 1 }), result.province);
          this.province = {
            ...this.province,
            // id: code,
            items,
          };
          this.addressTempId = this.province.id;
          this.addressVisible = true;

          } else if (level === 1) {
            items = map(({ id, code, name }) => ({ id, name, code, level: 2 }), result.city);
            this.city = {
              ...this.city,
              // id: code,
              items,
            };
            this.addressTempId = this.city.id;

          } else if (level === 2) {
            items = map(({ id, code, name }) => ({ id, name, code, level: 3 }), result.country);
            this.area = {
              ...this.area,
              // id: code,
              items,
            };
            this.addressTempId = this.area.id;

          } else if (level === 3) {
            items = map(({ id, code, name }) => ({ id, name, code, level: 4 }), result.town);
            this.town = {
              ...this.town,
              // id: code,
              items,
            };
            this.addressTempId = this.town.id;

          }

          this.addressItems = items;

        this.loading = false;
        this.$apply();
      });
    } else {
      this.resetAddress(this.chooseAddressId);
    }
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
    // 街道
    this.town = {
      name: '请选择',
      id: '',
      items: [],
    };
  }
}
