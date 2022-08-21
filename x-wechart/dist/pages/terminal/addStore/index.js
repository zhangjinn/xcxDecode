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
var index_2 = require('./../../../utils/index.js');
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var record_1 = require('./../../../store/actions/record.js');
var request_1 = require('./../../../utils/request.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$repeat = {};
        _this.$props = { "address": { "title": "所在地区" } };
        _this.$events = {};
        _this.components = {
            address: index_1.default
        };
        _this.config = {
            navigationBarTitleText: '新增门店',
            usingComponents: {
                'van-toast': '/components/vant/toast/index',
                "van-field": "/components/vant/field/index",
                "van-cell": "/components/vant/cell/index",
                'van-uploader': '/components/vant/uploader/index',
                "van-icon": "/components/vant/icon/index",
                'van-popup': '/components/vant/popup/index',
                'van-dialog': '/components/vant/dialog/index',
            },
        };
        _this.data = {
            isClickable: true,
            isSinkShow: false,
            formData: {
                storeName: '',
                storeAbbreviation: '',
                isSinkId: '0',
                isSinkName: '否',
                addressTip: '',
                address: '',
                managerName: '',
                managerPhone: '',
                remark: '',
                doorHeadPhoto: [],
                businessLicensePhoto: [],
            },
            chooseAddressInfo: {
                provinceId: '',
                provinceName: '',
                cityId: '',
                cityName: '',
                areaId: '',
                areaName: '',
                townId: '',
                townName: '',
            },
            latitude: 36.070476,
            longitude: 120.371257,
            qqmapsdk: null,
            scale: 16,
            markers: [{
                    id: '0',
                    iconPath: 'http://3s-static.hisense.com/wechat/1/14722429883/1655865963285_a60bce54f9a147ba9e173f025974cf45.png',
                    longitude: 120.371257,
                    latitude: 36.070476,
                    width: 30,
                    height: 30,
                    anchor: { x: .5, y: .5 }
                }],
            circle: [{
                    id: '0',
                    latitude: 120.371257,
                    longitude: 36.070476,
                    fillColor: '#B4F3F188',
                    color: '#00B7B3',
                    strokeWidth: '0.5',
                    radius: 80
                }],
            isSinkOptions: [
                { id: '1', name: '是' },
                { id: '0', name: '否' },
            ],
            steps: [],
            active: '0',
            approvalComments: '无',
            isDisabled: false,
            pageType: '',
            currId: '',
            editId: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            onFilterFormChange: function (evt) {
                var _a;
                var detail = evt.detail, name = evt.currentTarget.dataset.name;
                this.formData = __assign({}, this.formData, (_a = {}, _a[name] = detail, _a));
            },
            openSink: function () {
                if (this.isDisabled) {
                    return;
                }
                this.isSinkShow = true;
            },
            onSinkPopClose: function () {
                this.isSinkShow = false;
            },
            chooseSink: function (item) {
                this.formData.isSinkId = item.id;
                this.formData.isSinkName = item.name;
                this.isSinkShow = false;
            },
            // 删除图片
            deleteImg: function (event) {
                var state = event.currentTarget.dataset.state;
                if (state == 1) { // 门店门头照片
                    this.formData.doorHeadPhoto.splice(event.detail.index, 1);
                }
                if (state == 2) { // 门店营业执照
                    this.formData.businessLicensePhoto.splice(event.detail.index, 1);
                }
                this.$apply();
            },
            //上传图片
            afterRead: function (event) {
                this.selImg(event.detail.file.path, event.currentTarget.dataset.state);
            },
            // 改变地图定位显示
            mapTap: function (e) {
                if (_this.isDisabled) {
                    return;
                }
                _this.latitude = e.detail.latitude;
                _this.longitude = e.detail.longitude;
                _this.methods.mapChange();
            },
            mapChange: function () {
                var that = _this;
                var latitude = that.latitude;
                var longitude = that.longitude;
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
                    radius: 80
                };
                _this.markers = [market];
                _this.circle = [circle];
                _this.qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: latitude,
                        longitude: longitude
                    },
                    success: function (res) {
                        that.formData.address = res.result.formatted_addresses && res.result.formatted_addresses.recommend;
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
            // 获取省市区
            openAddress: function () {
                if (_this.isDisabled) {
                    return;
                }
                var provinceArr = _this.regins;
                _this.$invoke('address', 'openAddressPopup', provinceArr, {
                    'provinceId': _this.chooseAddressInfo.provinceId,
                    'cityId': _this.chooseAddressInfo.cityId,
                    'areaId': _this.chooseAddressInfo.areaId
                }, function (item, address) {
                    _this.formData.addressTip = item.name;
                    _this.chooseAddressInfo = __assign({}, address);
                    _this.$apply();
                });
            },
            // 提交
            toAddStore: function (type) {
                if (!_this.isClickable) {
                    return;
                }
                _this.isClickable = false;
                var checkResault = _this.methods.checkParam();
                if (checkResault) {
                    var _a = _this.data, longitude = _a.longitude, latitude = _a.latitude;
                    var _b = _this.data.formData, storeName = _b.storeName, storeAbbreviation = _b.storeAbbreviation, isSinkId = _b.isSinkId, address = _b.address, managerName = _b.managerName, managerPhone = _b.managerPhone, remark = _b.remark, doorHeadPhoto = _b.doorHeadPhoto, businessLicensePhoto = _b.businessLicensePhoto;
                    var _c = _this.data.chooseAddressInfo, provinceId = _c.provinceId, provinceName = _c.provinceName, cityId = _c.cityId, cityName = _c.cityName, areaId = _c.areaId, areaName = _c.areaName, townId = _c.townId, townName = _c.townName;
                    var cisCode = wepy_1.default.$instance.globalData.cisCode;
                    var param = {
                        cisCode: cisCode,
                        fullName: storeName,
                        searchTerm: storeAbbreviation,
                        isSinkShop: isSinkId,
                        longitude: longitude,
                        latitude: latitude,
                        shAddress: address,
                        provinceCode: provinceId,
                        provinceName: provinceName,
                        cityCode: cityId,
                        cityName: cityName,
                        countyCode: areaId,
                        countyName: areaName,
                        townCode: townId,
                        townName: townName,
                        managerName: managerName,
                        managerTel: managerPhone,
                        remark: remark,
                        headFilesStr: doorHeadPhoto[0].id,
                        bLFilesStr: businessLicensePhoto[0].id,
                    };
                    if (type == 'add') { // 新增
                        _this.methods.addStore(param).then(function (res) {
                            var payload = res.payload;
                            if (payload.successful == '1') { // 1成功0失败
                                toast_1.default.success({
                                    forbidClick: true,
                                    duration: 1000,
                                    message: '新增门店成功',
                                    onClose: function () {
                                        _this.isClickable = true;
                                        wx.navigateBack({
                                            delta: 1,
                                        });
                                    },
                                });
                            }
                            else {
                                toast_1.default.fail({
                                    forbidClick: true,
                                    message: payload.message,
                                });
                                _this.isClickable = true;
                            }
                            _this.$apply();
                        });
                    }
                    else { // 修改
                        param.id = _this.editId;
                        _this.methods.editStore(param).then(function (res) {
                            var payload = res.payload;
                            if (payload.successful == '1') { // 1成功0失败
                                toast_1.default.success({
                                    forbidClick: true,
                                    duration: 1000,
                                    message: '修改门店成功',
                                    onClose: function () {
                                        _this.isClickable = true;
                                        wx.navigateBack({
                                            delta: 1,
                                        });
                                    },
                                });
                            }
                            else {
                                toast_1.default.fail({
                                    forbidClick: true,
                                    message: payload.message,
                                });
                                _this.isClickable = true;
                            }
                            _this.$apply();
                        });
                    }
                }
                else {
                    _this.isClickable = true;
                }
            },
            checkParam: function () {
                var _a = _this.data.formData, storeName = _a.storeName, storeAbbreviation = _a.storeAbbreviation, addressTip = _a.addressTip, address = _a.address, managerName = _a.managerName, managerPhone = _a.managerPhone, remark = _a.remark, doorHeadPhoto = _a.doorHeadPhoto, businessLicensePhoto = _a.businessLicensePhoto;
                if (!storeName) {
                    toast_1.default.fail('请填写门店名称');
                    return false;
                }
                if (!storeAbbreviation) {
                    toast_1.default.fail('请填写门店简称');
                    return false;
                }
                if (!addressTip) {
                    toast_1.default.fail('请选择所在地区');
                    return false;
                }
                if (!address) {
                    toast_1.default.fail('请填写详细地址');
                    return false;
                }
                if (!managerName) {
                    toast_1.default.fail('请填写门店经理姓名');
                    return false;
                }
                if (!managerPhone) {
                    toast_1.default.fail('请填写门店经理电话');
                    return false;
                }
                if (!index_2.checkTel(managerPhone)) {
                    toast_1.default.fail('请填写正确手机号或座机');
                    return false;
                }
                if (!remark) {
                    toast_1.default.fail('请填写备注');
                    return false;
                }
                if (!doorHeadPhoto.length) {
                    toast_1.default.fail('请上传门店门头照片');
                    return false;
                }
                if (!businessLicensePhoto.length) {
                    toast_1.default.fail('请上传门店营业执照');
                    return false;
                }
                return true;
            },
            // 撤销
            toRevoke: function () {
                var that = _this;
                var storeName = _this.data.formData.storeName;
                dialog_1.default.confirm({
                    title: '撤销确认',
                    message: "\u662F\u5426\u786E\u8BA4\u64A4\u9500\u65B0\u589E" + storeName + "\u95E8\u5E97\u6D41\u7A0B\uFF1F",
                })
                    .then(function () {
                    request_1.request({
                        api: "custShop/cancelShopFlow.nd",
                        data: {
                            processInstID: that.currId,
                        },
                        method: 'POST',
                        type: 'application/json',
                        callback: function (res) {
                            var data = res.data;
                            if (data.message == 'success') {
                                toast_1.default.success({
                                    forbidClick: true,
                                    duration: 1000,
                                    message: '撤销成功',
                                    onClose: function () {
                                        wx.navigateBack({
                                            delta: 1,
                                        });
                                    },
                                });
                            }
                            else {
                                toast_1.default.fail(data.message);
                            }
                            that.$apply();
                        }
                    });
                })
                    .catch(function () {
                    // on cancel
                });
            }
        };
        return _this;
    }
    //选择照片
    Filter.prototype.selImg = function (path, state) {
        if (!path) {
            return;
        }
        var that = this;
        var fileNameArr = path.split('/');
        var fileName = fileNameArr[fileNameArr.length - 1];
        var obj = {};
        var FSM = wx.getFileSystemManager();
        FSM.readFile({
            filePath: path,
            encoding: 'base64',
            success: function (res) {
                var data = {
                    'fileName': fileName,
                    'fileType': 'addshop',
                    'file': 'image/jpeg;base64,' + res.data
                };
                that.methods.uploadImg(data).then(function (res2) {
                    obj.url = res2.payload.url;
                    obj.id = res2.payload.businessId;
                    obj.name = res2.payload.fileNameString;
                    if (state == 1) { // 门店门头照片
                        var doorHeadPhoto = that.formData.doorHeadPhoto;
                        doorHeadPhoto.push(obj);
                        that.formData.doorHeadPhoto = doorHeadPhoto;
                    }
                    if (state == 2) { // 门店营业执照
                        var businessLicensePhoto = that.formData.businessLicensePhoto;
                        businessLicensePhoto.push(obj);
                        that.formData.businessLicensePhoto = businessLicensePhoto;
                    }
                    that.$apply();
                });
            }
        });
    };
    //获取当前位置
    Filter.prototype.getLocation = function () {
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                that.latitude = res.latitude;
                that.longitude = res.longitude;
                that.methods.mapChange();
                that.$apply();
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    // 查询审批意见
    Filter.prototype.getApprovalCommentsData = function () {
        var _this = this;
        var param = {
            processInstID: this.currId,
            pageCond: {
                begin: 0,
                length: 10000,
                isCount: true
            }
        };
        this.methods.getApprovalComments(param).then(function (res) {
            var payload = res.payload;
            if (payload && payload.length > 0) {
                _this.approvalComments = payload[payload.length - 1].content;
            }
            _this.$apply();
        });
    };
    // 查询流程节点及状态
    Filter.prototype.getFlowChart = function () {
        var _this = this;
        request_1.request({
            api: "flow/queryProcessRoute.nd",
            data: {
                processInstID: this.currId,
                processDefName: "com.hisense.bpm.flow.storeDataMaintain",
                condition: {
                    "isFront": 1
                }
            },
            method: 'POST',
            type: 'application/json',
            callback: function (res) {
                var data = res.data;
                var steps = [];
                var active = 0;
                if (data && data.length > 0) {
                    data.forEach(function (item, index) {
                        var obj = {};
                        obj.text = item.activityName;
                        obj.type = item.activityType;
                        if (item.activityId == 'startActivity') {
                            obj.icon = 'icon-process-begins';
                            obj.isBorder = false;
                        }
                        else if (item.activityId == 'finishActivity') {
                            obj.icon = 'icon-process-end';
                            obj.isBorder = false;
                        }
                        else {
                            obj.icon = 'icon-development-minister';
                            obj.isBorder = true;
                        }
                        if (item.isFinish && item.isFinish == '1') {
                            active = index;
                        }
                        steps.push(obj);
                    });
                }
                _this.steps = steps;
                _this.active = active;
                _this.$apply();
            }
        });
    };
    // 查询图片回显路径
    Filter.prototype.getPictureUrl = function (file) {
        var photo = [];
        if (file && file.attachPath && file.attachName && file.id) {
            var url = wepy_1.default.$appConfig.baseUrl + '/comm/showUpload.nd?pathInfo=' + file.attachPath + '&fileName=' + file.attachName;
            var photoObj = {
                id: file.id,
                name: file.attachShortName,
                url: url,
            };
            photo.push(photoObj);
        }
        return photo;
    };
    // 获取订单详细信息
    Filter.prototype.getDetailsData = function () {
        var _this = this;
        toast_1.default.loading({
            message: '正在加载',
            duration: 2000
        });
        request_1.request({
            api: "custShop/getMyShop.nd",
            data: {
                processInstID: this.currId
            },
            method: 'POST',
            type: 'application/json',
            callback: function (res) {
                toast_1.default.clear();
                var data = res.data;
                if (data && data.data) {
                    _this.orderDetail = data.data;
                    // 审批中，在自己这里--1 可提交、可撤回、可编辑
                    // 审批中，不在自己这里--2 不可提交、可撤回、不可编辑
                    // 详情--3 不可提交、不可撤回、不可编辑
                    if (_this.orderDetail.checkStatus == '发布' || _this.orderDetail.checkStatus == '作废') {
                        _this.pageType = '3';
                        _this.isDisabled = true;
                    }
                    else if (_this.orderDetail.checkStatus == '草稿') {
                        _this.pageType = '1';
                        _this.isDisabled = false;
                    }
                    else {
                        _this.pageType = '2';
                        _this.isDisabled = true;
                    }
                    var custAddShopReqDto = _this.orderDetail.custAddShopReqDto;
                    _this.editId = custAddShopReqDto.id;
                    _this.latitude = custAddShopReqDto.latitude; // 默认纬度
                    _this.longitude = custAddShopReqDto.longitude; // 默认经度
                    _this.chooseAddressInfo = __assign({}, _this.chooseAddressInfo, { provinceId: custAddShopReqDto.provinceCode, provinceName: custAddShopReqDto.provinceName, cityId: custAddShopReqDto.cityCode, cityName: custAddShopReqDto.cityName, areaId: custAddShopReqDto.countyCode, areaName: custAddShopReqDto.countyName, townId: custAddShopReqDto.townCode, townName: custAddShopReqDto.townName });
                    _this.formData = __assign({}, _this.formData, { storeName: custAddShopReqDto.fullName, storeAbbreviation: custAddShopReqDto.searchTerm, isSinkId: custAddShopReqDto.isSinkShop, isSinkName: custAddShopReqDto.isSinkShop == '0' ? '否' : '是', addressTip: "" + _this.chooseAddressInfo.provinceName + _this.chooseAddressInfo.cityName + _this.chooseAddressInfo.areaName + _this.chooseAddressInfo.townName, address: custAddShopReqDto.shAddress, managerName: custAddShopReqDto.managerName, managerPhone: custAddShopReqDto.managerTel, remark: custAddShopReqDto.remark, doorHeadPhoto: _this.getPictureUrl(_this.orderDetail.headFilesStr), businessLicensePhoto: _this.getPictureUrl(_this.orderDetail.blFilesStr) });
                    _this.methods.mapChange();
                }
                _this.$apply();
            }
        });
    };
    Filter.prototype.onLoad = function (_a) {
        var id = _a.id;
        this.currId = '';
        if (id) {
            this.currId = id;
        }
        this.methods.getRegin({ pCode: 0 });
        this.qqmapsdk = new qqmap({
            key: wepy_1.default.$appConfig.qqMapKey
        });
        if (this.currId) {
            wx.setNavigationBarTitle({
                title: '新增门店详情'
            });
            this.getDetailsData();
            this.getFlowChart();
            this.getApprovalCommentsData();
        }
        else {
            wx.setNavigationBarTitle({
                title: '新增门店'
            });
            this.getLocation();
        }
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            regins: function (_a) {
                var record = _a.record;
                return record.regins;
            }
        }, {
            uploadImg: record_1.uploadImg,
            getRegin: record_1.getRegin,
            addStore: record_1.addStore,
            editStore: record_1.editStore,
            getApprovalComments: record_1.getApprovalComments,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/terminal/addStore/index'));

