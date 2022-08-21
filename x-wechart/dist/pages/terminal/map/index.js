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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var qqmap = require('./../utils/qqmap-wx-jssdk.min.js');
var index_1 = require('./../../../components/address/index.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var record_1 = require('./../../../store/actions/record.js');
var Defaultaccount = /** @class */ (function (_super) {
    __extends(Defaultaccount, _super);
    function Defaultaccount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.components = {
            address: index_1.default
        };
        _this.config = {
            navigationBarTitleText: '巡店',
            usingComponents: {
                'van-row': '../../../components/vant/row/index',
                'van-col': '../../../components/vant/col/index',
                'van-switch': '../../../components/vant/switch/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-field': '../../../components/vant/field/index'
            }
        };
        _this.data = {
            qqmapsdk: null,
            showMap: true,
            optionsTemp: null,
            mapCtx: null,
            shAddress: '',
            city: '',
            scale: 16,
            accountList: [],
            longitude: 120.371257,
            longitude2: 120.371257,
            latitude: 36.070476,
            latitude2: 36.070476,
            showCompass: 'true',
            markers: [{
                    id: '0',
                    iconPath: 'http://3s-static.hisense.com/wechat/1/14722429883/1655865963285_a60bce54f9a147ba9e173f025974cf45.png',
                    longitude: 120.371257,
                    latitude: 36.070476,
                    width: 30,
                    height: 30,
                    anchor: { x: .5, y: .5 }
                }],
            toAddress: null,
            circle: [{
                    latitude: 120.371257,
                    longitude: 36.070476,
                    fillColor: '#B4F3F188',
                    color: '#00B7B3',
                    strokeWidth: '0.5',
                    radius: 200
                }]
        };
        // 页面内交互写在methods里
        _this.methods = {
            onShAddressChange: function (e) {
                _this.shAddress = e.detail;
            },
            // 选择地址
            openAddress: function () {
                var provinceArr = _this.regins;
                _this.$invoke('address', 'openAddressPopup', provinceArr, {
                    'provinceId': _this.optionsTemp.provinceId,
                    'cityId': _this.optionsTemp.cityId,
                    'areaId': _this.optionsTemp.countryId
                }, function (item, address) {
                    _this.city = item.name;
                    _this.toAddress = address;
                    _this.$apply();
                });
            },
            recovery: function () {
                var pages = getCurrentPages();
                // var currPage = pages[pages.length - 1];   //当前页面
                var prevPage = pages[pages.length - 2];
                var newAdress = prevPage.data.newAdress;
                newAdress.recoveryType = '1';
                if (_this.toAddress && _this.toAddress.areaId) {
                    newAdress.dlatitude = _this.latitude;
                    newAdress.dlongitude = _this.longitude;
                    newAdress.gpsProvinceName = _this.toAddress.provinceName;
                    newAdress.gpsProvinceCode = _this.toAddress.provinceId;
                    newAdress.gpsCityName = _this.toAddress.cityName;
                    newAdress.gpsCityCode = _this.toAddress.cityId;
                    newAdress.countyName = _this.toAddress.areaName;
                    newAdress.countyId = _this.toAddress.areaId;
                    newAdress.townId = _this.toAddress.townId;
                    newAdress.townName = _this.toAddress.townName;
                    newAdress.shAddress = (newAdress.gpsProvinceName || '') + (newAdress.gpsCityName || '') + (newAdress.countyName || '') + _this.shAddress;
                    var data = {
                        longitude: newAdress.dlongitude,
                        latitude: newAdress.dlatitude,
                        province: newAdress.gpsProvinceName,
                        provinceId: newAdress.gpsProvinceCode,
                        city: newAdress.gpsCityName,
                        cityId: newAdress.gpsCityCode,
                        area: newAdress.countyName,
                        areaId: newAdress.countyId,
                        town: newAdress.townName,
                        townId: newAdress.townId,
                        storeAddress: newAdress.shAddress,
                        storeCode: _this.optionsTemp.shopCisCode,
                        storeName: _this.optionsTemp.storeName,
                        gpsAddress: newAdress.shAddress,
                        userLatiTude: _this.latitude,
                        userLongiTude: _this.longitude //用户当前经度
                    };
                    _this.methods.fixAddress(data).then(function (res) {
                        if (res.payload.success === true) {
                            wx.showToast({
                                title: '提交纠错成功！',
                                icon: 'none'
                            });
                            prevPage.data.markers[0] = {
                                id: Math.random(),
                                latitude: _this.latitude,
                                longitude: _this.longitude,
                                iconPath: 'http://3s-static.hisense.com/wechat/1/14722429883/1655865963285_a60bce54f9a147ba9e173f025974cf45.png',
                                width: 30,
                                height: 30,
                                anchor: { x: .5, y: .5 }
                            };
                            prevPage.setData({
                                recoveryType: 1
                            });
                            _this.qqmapsdk.calculateDistance({
                                mode: 'straight',
                                to: [{
                                        latitude: _this.latitude,
                                        longitude: _this.longitude
                                    }],
                                from: {
                                    latitude: _this.latitude2,
                                    longitude: _this.longitude2
                                },
                                success: function (res) {
                                    var distance = res.result.elements[0].distance;
                                    newAdress.distance = (distance || 1) / 1000;
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                },
                                fail: function (res) {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                }
                            });
                        }
                        else {
                            wx.showToast({
                                title: res.payload.returnMsg,
                                icon: 'none'
                            });
                        }
                    });
                }
                else {
                    wx.showToast({
                        title: '请重新选择所在地区！',
                        icon: 'none'
                    });
                    return;
                }
            },
            mapTap: function (e) {
                _this.latitude = e.detail.latitude;
                _this.longitude = e.detail.longitude;
                var that = _this;
                var market = {
                    id: Math.random(),
                    latitude: e.detail.latitude,
                    longitude: e.detail.longitude,
                    iconPath: 'http://3s-static.hisense.com/wechat/1/14722429883/1655865963285_a60bce54f9a147ba9e173f025974cf45.png',
                    width: 30,
                    height: 30,
                    anchor: { x: .5, y: .5 }
                };
                var circle = {
                    id: Math.random(),
                    latitude: e.detail.latitude,
                    longitude: e.detail.longitude,
                    fillColor: '#B4F3F188',
                    color: '#00B7B3',
                    strokeWidth: '0.5',
                    radius: 200
                };
                _this.markers = [market];
                _this.circle = [circle];
                _this.qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: e.detail.latitude,
                        longitude: e.detail.longitude
                    },
                    success: function (res) {
                        that.adInfo = res.result.ad_info;
                        that.setData({ location: res.result.address });
                        that.location = res.result.formatted_addresses && res.result.formatted_addresses.recommend;
                        that.shAddress = res.result.formatted_addresses && res.result.formatted_addresses.recommend;
                        // that.city=res.result.address
                        that.$apply();
                    },
                    fail: function (res) {
                        wx.showToast({
                            title: '解析地址失败',
                            icon: 'none'
                        });
                    }
                });
            },
            regionchange: function (_a) {
                var type = _a.type;
                if (type == 'end') {
                    var market = _this.markers[0];
                    market.id = Math.random();
                    var circle = _this.circle[0];
                    circle.id = Math.random();
                    _this.markers = [market];
                    _this.circle = [circle];
                }
            },
            scaleJia: function () {
                this.scale = this.scale + 1;
                this.setData({
                    scale: this.scale
                });
            },
            scaleJian: function () {
                this.scale = this.scale - 1;
                this.setData({
                    scale: this.scale
                });
            },
            location: function () {
                this.getLocation();
                this.city = '';
            },
            reset: function () {
                _this.methods.initMap();
                var pages = getCurrentPages();
                // var currPage = pages[pages.length - 1];   //当前页面
                var prevPage = pages[pages.length - 2];
                var newAdress = prevPage.data.newAdress;
                newAdress.recoveryType = '0';
                newAdress.distance = '';
                newAdress.dlatitude = '';
                newAdress.dlongitude = '';
                newAdress.gpsProvinceName = '';
                newAdress.gpsProvinceCode = '';
                newAdress.gpsCityName = '';
                newAdress.gpsCityCode = '';
                newAdress.countyName = '';
                newAdress.countyId = '';
                newAdress.townId = '';
                newAdress.townName = '';
                newAdress.shAddress = '';
            },
            initMap: function () {
                var options = _this.optionsTemp;
                _this.shAddress = options.shAddress;
                var latitude = parseFloat(options.dlatitude);
                var longitude = parseFloat(options.dlongitude);
                _this.city = (options.provinceName || '') + (options.cityName || '') + (options.countyName || '') + (options.townName || '');
                if (!longitude) {
                    return;
                }
                _this.longitude = longitude;
                _this.latitude = latitude;
                var market = {
                    id: Math.random(),
                    latitude: latitude,
                    longitude: longitude,
                    iconPath: 'http://3s-static.hisense.com/wechat/1/14722429883/1655865963285_a60bce54f9a147ba9e173f025974cf45.png',
                    width: 30,
                    height: 30,
                    anchor: { x: .5, y: .5 }
                };
                var circle = {
                    id: Math.random(),
                    latitude: latitude,
                    longitude: longitude,
                    fillColor: '#B4F3F188',
                    color: '#00B7B3',
                    strokeWidth: '0.5',
                    radius: 200
                };
                setTimeout(function () {
                    _this.markers = [market];
                    _this.circle = [circle];
                    _this.$apply();
                }, 300);
            }
        };
        return _this;
    }
    //获取当前位置
    Defaultaccount.prototype.getLocation = function () {
        var that = this;
        // 初始化时间
        var day = new Date();
        that.currentTime = day.Format('MM-dd hh:mm:ss');
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                that.latitude = res.latitude;
                that.latitude2 = res.latitude;
                that.longitude = res.longitude;
                that.longitude2 = res.longitude;
                that.$apply();
                that.qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success: function (res) {
                        that.adInfo = res.result.ad_info;
                        that.setData({ location: res.result.address });
                        that.location = res.result.formatted_addresses && res.result.formatted_addresses.recommend;
                        that.shAddress = res.result.formatted_addresses && res.result.formatted_addresses.recommend;
                        // that.city=res.result.address
                        that.$apply();
                    },
                    fail: function (res) {
                        wx.showToast({
                            title: '解析地址失败',
                            icon: 'none'
                        });
                    }
                });
            },
            fail: function (res) {
                that.show4 = true;
                that.setData({ show4: true });
            }
        });
    };
    Defaultaccount.prototype.onLoad = function (options) {
        this.optionsTemp = JSON.parse(JSON.stringify(options));
        this.methods.initMap();
        this.methods.getRegin({ pCode: 0 });
        this.qqmapsdk = new qqmap({
            key: wepy_1.default.$appConfig.qqMapKey
        });
    };
    Defaultaccount = __decorate([
        wepy_redux_1.connect({
            regins: function (_a) {
                var record = _a.record;
                return record.regins;
            }
        }, {
            getRegin: record_1.getRegin,
            fixAddress: record_1.fixAddress
        })
    ], Defaultaccount);
    return Defaultaccount;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Defaultaccount , 'pages/terminal/map/index'));

