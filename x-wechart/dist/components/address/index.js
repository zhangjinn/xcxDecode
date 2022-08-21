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
var request_1 = require('./../../utils/request.js');
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    function Address() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
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
            // 乡镇
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
            openAddressPopup: function (provinces, _a, callback) {
                var province = _a.province, city = _a.city, area = _a.area;
                _this.addressVisible = true;
                _this.province = {
                    id: province,
                    name: '请选择',
                    items: provinces,
                };
                _this.city.id = city;
                _this.area.id = area;
                _this.addressTempId = province;
                _this.addressItems = provinces;
                _this.callback = callback;
            },
            closeAddressPopup: function () {
                // 判断是否正常选择地址
                _this.addressVisible = false;
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
                        var addressInfo = {
                            id: code,
                            name: "" + _this.province.name + _this.city.name + _this.area.name + _this.town.name,
                        };
                        var address = {
                            provinceId: _this.province.id,
                            cityId: _this.city.id,
                            areaId: _this.area.id,
                            townId: _this.town.id,
                            provinceName: _this.province.name,
                            cityName: _this.city.name,
                            areaName: _this.area.name,
                            townName: _this.town.name,
                        };
                        _this.callback(addressInfo, address);
                        break;
                    default:
                        break;
                }
                //  添加级别控制，防止出现街道
                _this.level = level;
                _this.getAddressList(code, level);
            },
        };
        return _this;
    }
    // 获取地址列表 TODO:
    Address.prototype.getAddressList = function (code, level) {
        var _this = this;
        this.loading = true;
        //const params = level === 1 ? { api: 'customer/getCity.nd', data: { proviceCode: code } } : { api: 'customer/getDistrict.nd', data: { cityCode: code } }
        var params = {};
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
        }
        ;
        request_1.request(__assign({}, params, { method: 'POST' })).then(function (res) {
            //  添加级别控制，防止出现街道
            if (res && res.length > 0) {
                var items = [];
                if (level === 1) {
                    items = ramda_1.map(function (_a) {
                        var id = _a.id, cityCode = _a.cityCode, cityName = _a.cityName;
                        return ({ id: id, name: cityName, code: cityCode, level: 2 });
                    }, res);
                    _this.city = __assign({}, _this.city, { id: code, items: items });
                }
                if (level === 2) {
                    items = ramda_1.map(function (_a) {
                        var id = _a.id, districtCode = _a.districtCode, districtName = _a.districtName;
                        return ({ id: id, name: districtName, code: districtCode, level: 3 });
                    }, res);
                    _this.area = __assign({}, _this.area, { id: code, items: items });
                }
                //增加乡镇 CIS
                if (level === 3) {
                    items = ramda_1.map(function (_a) {
                        var id = _a.id, townCode = _a.townCode, townName = _a.townName;
                        return ({ id: id, name: townName, code: townCode, level: 4 });
                    }, res);
                    _this.area = __assign({}, _this.area, { id: code, items: items });
                }
                _this.addressItems = items;
                _this.addressTempId = code;
            }
            else {
                _this.resetAddress(_this.chooseAddressId);
            }
            _this.loading = false;
            _this.$apply();
        });
    };
    // 重置地址选择
    Address.prototype.resetAddress = function (id) {
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
    };
    return Address;
}(wepy_1.default.component));
exports.default = Address;
