"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var dmsrequest_1 = require('./../../store/actions/dmsrequest.js');
var DmsAddress = /** @class */ (function (_super) {
    __extends(DmsAddress, _super);
    function DmsAddress() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
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
        _this.callback = function () { };
        // 关闭回调
        _this.onClose = function () { };
        _this.data = {
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
            chooseAddressId: null,
            level: 1,
        };
        _this.methods = {
            openAddressPopup: function (_a, callback) {
                var province = _a.province, city = _a.city, area = _a.area, town = _a.town;
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
                _this.province.id = province;
                _this.city.id = city;
                _this.area.id = area;
                _this.town.id = town;
                _this.callback = callback;
                _this.getAddressList(0);
            },
            closeAddressPopup: function () {
                // 判断是否正常选择地址
                _this.addressVisible = false;
                _this.resetAddress('');
            },
            // 选择tab 切换
            chooseAddressTap: function (tab) {
                if (this["" + tab].items && this["" + tab].items.length) {
                    this.areaCurrentTab = tab;
                    this.addressItems = this["" + tab].items;
                    this.addressTempId = this["" + tab].id;
                }
            },
            // 选择每项
            chooseAddress: function (_a) {
                var code = _a.code, level = _a.level, name = _a.name;
                switch (level) {
                    case 1:
                        _this.areaCurrentTab = 'province';
                        _this.province.name = name;
                        _this.province.id = code;
                        break;
                    case 2:
                        _this.areaCurrentTab = 'city';
                        _this.city.name = name;
                        _this.city.id = code;
                        break;
                    case 3:
                        _this.areaCurrentTab = 'area';
                        _this.area.name = name;
                        _this.area.id = code;
                        break;
                    case 4:
                        _this.areaCurrentTab = 'town';
                        _this.town.name = name;
                        _this.town.id = code;
                        break;
                    default:
                        break;
                }
                if (!code || level === 4) {
                    // code 为空表示选了 请选择，，选完了
                    // 直接callback吧
                    switch (level) {
                        case 1:
                            _this.province.name = '请选择';
                            _this.province.id = '';
                        case 2:
                            _this.city.name = '';
                            _this.city.id = '';
                        case 3:
                            _this.area.name = '';
                            _this.area.id = '';
                        case 4:
                            if (!code) {
                                _this.town.name = '';
                                _this.town.id = '';
                            }
                    }
                    var addressInfo = {
                        id: code,
                        name: "" + _this.province.name + _this.city.name + _this.area.name + _this.town.name,
                    };
                    var address = {
                        provinceId: _this.province.id,
                        cityId: _this.city.id,
                        areaId: _this.area.id,
                        townId: _this.town.id
                    };
                    level = 4;
                    _this.callback(addressInfo, address);
                }
                //  添加级别控制，防止出现街道
                _this.level = level;
                _this.getAddressList(level);
            },
        };
        return _this;
    }
    // 获取地址列表 TODO:
    DmsAddress.prototype.getAddressList = function (level) {
        var _this = this;
        if (level < 4) {
            this.loading = true;
            var params = {
                provinceId: this.province.id,
                cityId: this.city.id,
                countryId: this.area.id,
                townId: this.town.id
            };
            switch (level) {
                case 1:
                    params.cityId = '';
                case 2:
                    params.countryId = '';
                case 3:
                    params.townId = '';
            }
            dmsrequest_1.dmsRequest({ data: params, method: 'addressCascade' }).then(function (res) {
                //  添加级别控制，防止出现街道
                var address = res.address;
                var plsChoose = {
                    id: '',
                    code: '',
                    name: '请选择'
                };
                var result = {
                    province: [__assign({}, plsChoose, { level: 1 })],
                    city: [__assign({}, plsChoose, { level: 2 })],
                    country: [__assign({}, plsChoose, { level: 3 })],
                    town: [__assign({}, plsChoose, { level: 4 })]
                };
                Object.keys(address).forEach(function (field) { return Object.keys(address[field]).forEach(function (code) {
                    var name = address[field][code];
                    result[field].push({
                        id: code,
                        code: code,
                        name: name,
                    });
                }); });
                var items = [];
                if (level === 0) {
                    items = ramda_1.map(function (_a) {
                        var id = _a.id, code = _a.code, name = _a.name;
                        return ({ id: id, name: name, code: code, level: 1 });
                    }, result.province);
                    _this.province = __assign({}, _this.province, { 
                        // id: code,
                        items: items });
                    _this.addressTempId = _this.province.id;
                    _this.addressVisible = true;
                }
                else if (level === 1) {
                    items = ramda_1.map(function (_a) {
                        var id = _a.id, code = _a.code, name = _a.name;
                        return ({ id: id, name: name, code: code, level: 2 });
                    }, result.city);
                    _this.city = __assign({}, _this.city, { 
                        // id: code,
                        items: items });
                    _this.addressTempId = _this.city.id;
                }
                else if (level === 2) {
                    items = ramda_1.map(function (_a) {
                        var id = _a.id, code = _a.code, name = _a.name;
                        return ({ id: id, name: name, code: code, level: 3 });
                    }, result.country);
                    _this.area = __assign({}, _this.area, { 
                        // id: code,
                        items: items });
                    _this.addressTempId = _this.area.id;
                }
                else if (level === 3) {
                    items = ramda_1.map(function (_a) {
                        var id = _a.id, code = _a.code, name = _a.name;
                        return ({ id: id, name: name, code: code, level: 4 });
                    }, result.town);
                    _this.town = __assign({}, _this.town, { 
                        // id: code,
                        items: items });
                    _this.addressTempId = _this.town.id;
                }
                _this.addressItems = items;
                _this.loading = false;
                _this.$apply();
            });
        }
        else {
            this.resetAddress(this.chooseAddressId);
        }
    };
    // 重置地址选择
    DmsAddress.prototype.resetAddress = function (id) {
        var _a = this, province = _a.province, city = _a.city, area = _a.area, town = _a.town;
        // 关闭 popu
        this.addressVisible = false;
        this.addressTempId = '';
        this.addressItems = this.province.items;
        this.address = "" + province.name + city.name + area.name + town.name;
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
    };
    return DmsAddress;
}(wepy_1.default.component));
exports.default = DmsAddress;
