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
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var record_1 = require('./../../../store/actions/record.js');
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var index_1 = require('./../../../utils/index.js');
var requestJSON_1 = require('./../../../utils/requestJSON.js');
var qqmap = require('./../utils/qqmap-wx-jssdk.min.js');
var WebViewPage = /** @class */ (function (_super) {
    __extends(WebViewPage, _super);
    function WebViewPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '新增打卡',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'van-field': '../../../components/vant/field/index',
                'van-button': '../../../components/vant/button/index',
                'van-action-sheet': '../../../components/vant/action-sheet/index',
                'van-dialog': '../../../components/vant/dialog/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-uploader': '../../../components/vant/uploader/index',
                'van-datetime-picker': '../../../components/vant/datetime-picker/index',
                'van-popup': '../../../components/vant/popup/index'
            }
        };
        _this.data = {
            imgObj: {
                'addClockInBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552601_2b1943ae8a594b0d8a654a1b68304833.png',
            },
            qqmapsdk: null,
            problemTypeList: [
                { value: '人员', text: '人员' },
                { value: '货源', text: '货源' },
                { value: '产品', text: '产品' },
                { value: '资源', text: '资源' },
                { value: '渠道', text: '渠道' },
                { value: '促销推广', text: '促销推广' },
                { value: '其他', text: '其他' }
            ],
            cancelBtn: false,
            value: '',
            actions: [
                {
                    name: '拍照'
                }
            ],
            imgStatic: '',
            location: '山东省青岛市市南区镇江南路10号',
            currentTime: '08-14 17:17:04',
            latitude: '',
            longitude: '',
            userAccount: {},
            doorImgs: [],
            sampleImgs: [],
            staffImgs: [],
            healthImgs: [],
            boothImgs: [],
            trainingImgs: [],
            storeName: '请选择门店',
            traineesNumber: '',
            trainingTopics: '',
            trainingTopicsId: '',
            trainingTopicsObj: {},
            trainingType: '',
            recoveryType: 0,
            gpsProvinceName: '',
            gpsProvinceCode: '',
            gpsCityName: '',
            gpsCityCode: '',
            gpsAreaName: '',
            gpsAreaCode: '',
            distance: 0.0,
            shAddress: '',
            provinceId: '',
            provinceName: '',
            cityId: '',
            cityName: '',
            countyId: '',
            countyName: '',
            townId: '',
            townName: '',
            dlatitude: '',
            dlongitude: '',
            show1: false,
            photoTis: '请上传照片',
            stibBean: [],
            adInfo: '',
            shopId: '',
            shopCisCode: '',
            memo: '',
            isSpecialShop: '',
            isopenMap: '',
            camera: ['camera'],
            curTime: '',
            checkinRecord: [],
            curTimeInv: '',
            dateSelVisable: false,
            currentDate: new Date().getTime(),
            problemTypeListVisible: false,
            selProblemType: '',
            selProblemIndex: '',
            account: {},
            isMyStore: false,
            optionsTemp: {},
            newAdress: {},
            markers: [],
            trainingTopicsVisable: false,
            trainingTopicsOption: [],
        };
        _this.methods = {
            //打卡
            punchClock: function () {
                var singRecord = this.checkinRecord[0];
                var singInTime = new Date(singRecord.beginTime.replace(/-/g, '/')).getTime();
                var now = Date.now();
                if (now - singInTime < 15 * 60 * 1000) {
                    dialog_1.default.alert({
                        title: '签退失败',
                        message: "\u6253\u5361\u65F6\u95F4\uFF1A" + singRecord.beginTime + ",\u8BF7\u5728\u7B7E\u523015\u5206\u949F\u540E\u8FDB\u884C\u6253\u5361\u7B7E\u9000\uFF01",
                        confirmButtonText: '确定',
                        className: 'has-record-dialog-wrap'
                    }).then(function () {
                        // on confirm
                    });
                    return;
                }
                // a)在现有的新增打卡界面上添加“终端检查”按钮，当巡店用户为“业务员”且所巡门店为负责门店时，该项必填，其余场景下此项选填。
                var checked = this.optionsTemp.isCheck;
                if (this.isMyStore && this.account.businessFlagName === '是' && !checked) {
                    wx.showToast({
                        title: '请完成终端检查！',
                        icon: 'none'
                    });
                    return;
                }
                for (var i = 0; i < this.stibBean.length; i++) {
                    if (!this.stibBean[i].type) {
                        wx.showToast({
                            title: "\u8BF7\u9009\u62E9\u7B2C" + (i + 1) + "\u4E2A\u95EE\u9898\u7684\u7C7B\u578B\uFF01",
                            icon: 'none'
                        });
                        return;
                    }
                    if (!this.stibBean[i].responsible) {
                        wx.showToast({
                            title: "\u8BF7\u9009\u62E9\u7B2C" + (i + 1) + "\u4E2A\u95EE\u9898\u7684\u8D23\u4EFB\u4EBA\uFF01",
                            icon: 'none'
                        });
                        return;
                    }
                    if (!this.stibBean[i].expDate) {
                        wx.showToast({
                            title: "\u8BF7\u9009\u62E9\u7B2C" + (i + 1) + "\u4E2A\u95EE\u9898\u7684\u89E3\u51B3\u65E5\u671F\uFF01",
                            icon: 'none'
                        });
                        return;
                    }
                }
                var that = this;
                var doorImgs = '';
                var sampleImgs = '';
                var staffImgs = '';
                var healthImgs = '';
                var boothImgs = '';
                for (var i = 0; i < that.doorImgs.length; i++) {
                    doorImgs = doorImgs + that.doorImgs[i].id + ',';
                }
                for (var i = 0; i < that.sampleImgs.length; i++) {
                    sampleImgs = sampleImgs + that.sampleImgs[i].id + ',';
                }
                for (var i = 0; i < that.staffImgs.length; i++) {
                    staffImgs = staffImgs + that.staffImgs[i].id + ',';
                }
                for (var i = 0; i < that.healthImgs.length; i++) {
                    healthImgs = healthImgs + that.healthImgs[i].id + ',';
                }
                for (var i = 0; i < that.boothImgs.length; i++) {
                    boothImgs = boothImgs + that.boothImgs[i].id + ',';
                }
                doorImgs = doorImgs.substring(0, doorImgs.length - 1);
                sampleImgs = sampleImgs.substring(0, sampleImgs.length - 1);
                staffImgs = staffImgs.substring(0, staffImgs.length - 1);
                healthImgs = healthImgs.substring(0, healthImgs.length - 1);
                boothImgs = boothImgs.substring(0, boothImgs.length - 1);
                if (that.shAddress) {
                    if (that.trainingTopics) {
                        if (!that.traineesNumber) {
                            wx.showToast({
                                title: "\u8BF7\u8F93\u5165\u57F9\u8BAD\u4EBA\u6570",
                                icon: 'none'
                            });
                            return;
                        }
                        if (that.trainingImgs.length <= 0) {
                            this.photoTis = '请上传培训照片';
                            that.show1 = true;
                            return;
                        }
                    }
                    if (that.doorImgs.length > 0 && that.sampleImgs.length > 0 && that.boothImgs.length > 0) {
                        wx.showLoading();
                        var data = {
                            'distance': that.distance,
                            'inspectionRecordItemFormBean': {
                                'doorImgs': doorImgs,
                                'boothImgs': boothImgs,
                                'healthImgs': healthImgs,
                                'sampleImgs': sampleImgs,
                                'staffImgs': staffImgs,
                                'stibBean': this.stibBean,
                            },
                            'recoveryType': that.newAdress.recoveryType,
                            'storyName': that.storeName,
                            'recoveryStatus': '1',
                            'mem': that.memo,
                            'gpsAddress': that.location,
                            'latitude': that.newAdress.dlatitude ? that.newAdress.dlatitude : that.dlatitude,
                            'longitude': that.newAdress.dlongitude ? that.newAdress.dlongitude : that.dlongitude,
                            'userLatiTude': that.latitude,
                            'gpsProvinceName': that.newAdress.recoveryType == 1 ? (that.newAdress.gpsProvinceName || that.provinceName) : that.provinceName,
                            'gpsProvinceCode': that.newAdress.recoveryType == 1 ? (that.newAdress.gpsProvinceCode || that.provinceId) : that.provinceId,
                            'gpsCityName': that.newAdress.recoveryType == 1 ? (that.newAdress.gpsCityName || that.cityName) : that.cityName,
                            'gpsCityCode': that.newAdress.recoveryType == 1 ? (that.newAdress.gpsCityCode || that.cityId) : that.cityId,
                            'gpsAreaName': that.newAdress.recoveryType == 1 ? (that.newAdress.countyName || that.countyName) : that.countyName,
                            'gpsAreaCode': that.newAdress.recoveryType == 1 ? (that.newAdress.countyId || that.countyId) : that.countyId,
                            'gpsCountyCode': that.newAdress.recoveryType == 1 ? (that.newAdress.townId || that.townId) : that.townId,
                            'gpsCountyName': that.newAdress.recoveryType == 1 ? (that.newAdress.townName || that.townName) : that.townName,
                            'storeType': that.isSpecialShop == '0' ? 'F' : 'T',
                            'storyCode': that.shopCisCode,
                            'submitAddress': that.location,
                            'imeiNo': '',
                            'storeAddress': that.newAdress.recoveryType == 1 ? that.newAdress.shAddress : that.shAddress,
                            'userLongiTude': that.longitude,
                            'recoveryFlag': '1',
                            'clientSource': 'XTW',
                        };
                        // 如果为培训打卡，打卡传参需添加如下字段
                        if (that.trainingTopics) {
                            data.trainingRecordFormBean = {
                                "traningTaskID": that.trainingTopicsId,
                                "trainingRecodId": "",
                                "title": that.trainingTopics,
                                "submitAddress": that.location,
                                "img1Id": that.trainingImgs[0] ? that.trainingImgs[0].id : '',
                                "img2Id": that.trainingImgs[1] ? that.trainingImgs[1].id : '',
                                "img3Id": that.trainingImgs[2] ? that.trainingImgs[2].id : '',
                                "mem": that.memo,
                                "primaryOption": "",
                                "secondaryOption": "",
                                "peopleNum": that.traineesNumber //--培训人数
                            };
                        }
                        that.methods.addInspectionRecord2(data).then(function (res) {
                            if (res.payload.returnMsg == 'add inspection record successful.') {
                                that.show3 = true;
                                that.setData({
                                    show3: true
                                });
                            }
                            else {
                                wx.showToast({
                                    title: res.payload.returnMsg,
                                    icon: 'none'
                                });
                            }
                            wx.hideLoading();
                        }).finally(function () {
                            wx.hideLoading();
                        });
                    }
                    else {
                        var photoTis = void 0;
                        if (that.sampleImgs.length <= 0)
                            photoTis = '请上传样机照片';
                        if (that.boothImgs.length <= 0)
                            photoTis = '请上传展台照片';
                        if (that.doorImgs.length <= 0)
                            photoTis = '请上传门店照片';
                        this.photoTis = photoTis;
                        that.show1 = true;
                    }
                }
                else {
                    wx.showToast({
                        title: '请选择门店',
                        icon: 'none'
                    });
                }
            },
            //签到
            checkIn: function () {
                var that = this;
                if (!this.shopCisCode) {
                    wx.showToast({
                        title: '请选择门店',
                        icon: 'none'
                    });
                    return;
                }
                if (!this.latitude) {
                    wx.showToast({
                        title: '请先获取当前定位！',
                        icon: 'none'
                    });
                    return;
                }
                this.qqmapsdk.calculateDistance({
                    mode: 'straight',
                    to: [{
                            latitude: this.latitude,
                            longitude: this.longitude
                        }],
                    from: {
                        latitude: this.newAdress.dlatitude ? this.newAdress.dlatitude : this.dlatitude,
                        longitude: this.newAdress.dlongitude ? this.newAdress.dlongitude : this.dlongitude
                    },
                    success: function (res) {
                        var distance = res.result.elements[0].distance;
                        // if (distance > 2000) { //todo
                        if (distance > 2000 && that.recoveryType != 1) {
                            dialog_1.default.alert({
                                title: '签到失败',
                                message: "\u5F53\u524D\u4F4D\u7F6E\u8DDD\u79BB\u95E8\u5E97\u4F4D\u7F6E\u8FC7\u8FDC,\u8BF7\u60A8\u5230\u8FBE\u95E8\u5E97\u9644\u8FD1\u540E\u8FDB\u884C\u7B7E\u5230",
                                confirmButtonText: '确定',
                                className: 'has-record-dialog-wrap'
                            }).then(function () {
                                // on confirm
                            });
                            return;
                        }
                        else {
                            that.methods.submit();
                        }
                    },
                    fail: function (res) {
                        wx.showToast({
                            title: '获取距离失败，请重新定位后重试',
                            icon: 'none'
                        });
                    }
                });
            },
            submit: function () {
                var data = {
                    storeCode: _this.shopCisCode,
                    storeName: _this.storeName,
                    beginAddress: _this.location,
                    beginLongitude: !_this.dlongitude ? _this.longitude : _this.dlongitude,
                    beginLatitude: !_this.dlatitude ? _this.latitude : _this.dlatitude
                };
                _this.methods.addCheckInRecord(data).then(function (res) {
                    var data = res.payload;
                    if (data.success) {
                        _this.checkinRecord = [res.payload.returnData];
                        _this.$apply();
                        wx.showToast({
                            title: '签到成功！',
                            icon: 'none'
                        });
                    }
                    else {
                        wx.showToast({
                            title: res.payload.returnMsg,
                            icon: 'none'
                        });
                    }
                });
            },
            onChange: function (event) {
                this.memo = event.detail;
            },
            onClose: function () {
                this.show1 = false;
                this.setData({ show1: false });
            },
            onSelect: function (event) {
                var that = this;
                if (event.detail.name == '拍照') {
                    that.selImg();
                }
            },
            showTankuang: function (index) {
                this.setData({ show2: true });
            },
            //删除图片
            deleteImg: function (event) {
                var that = this;
                if (event.currentTarget.dataset.state == 1) { //门店照片
                    var doorImgs = void 0;
                    doorImgs = this.doorImgs.splice(event.detail.index, 1);
                    this.setData({ doorImgs: doorImgs });
                }
                if (event.currentTarget.dataset.state == 2) { //展台照片
                    var boothImgs = void 0;
                    boothImgs = this.boothImgs.splice(event.detail.index, 1);
                    this.setData({ boothImgs: boothImgs });
                }
                if (event.currentTarget.dataset.state == 3) { //样机状态
                    var sampleImgs = void 0;
                    sampleImgs = this.sampleImgs.splice(event.detail.index, 1);
                    this.setData({ sampleImgs: sampleImgs });
                }
                if (event.currentTarget.dataset.state == 4) { //门店卫生
                    var healthImgs = void 0;
                    healthImgs = this.healthImgs.splice(event.detail.index, 1);
                    this.setData({ healthImgs: healthImgs });
                }
                if (event.currentTarget.dataset.state == 5) { //员工状态
                    var staffImgs = void 0;
                    staffImgs = this.staffImgs.splice(event.detail.index, 1);
                    this.setData({ staffImgs: staffImgs });
                }
                if (event.currentTarget.dataset.state == 6) { //培训状态
                    var trainingImgs = void 0;
                    trainingImgs = this.trainingImgs.splice(event.detail.index, 1);
                    this.setData({ trainingImgs: trainingImgs });
                }
            },
            //上传图片
            afterRead: function (event) {
                this.selImg(event.detail.file.path, event.currentTarget.dataset.state);
            },
            onClose2: function () {
                this.setData({ show2: false });
            },
            onClose3: function () {
                wx.navigateBack({ delta: 2 });
                this.show3 = false;
                this.setData({ show3: false });
            },
            onClose4: function () {
                this.show4 = false;
                this.setData({ show4: false });
            },
            //选择门店
            selStore: function () {
                wx.redirectTo({ url: '/pages/terminal/selectStore/index' });
            },
            //更新日期和时间
            updataDidian: function () {
                this.getLocation();
            },
            //打开地图
            openLocation: function () {
                var _this = this;
                var that = this;
                if (this.isopenMap != '') {
                    requestJSON_1.request({
                        api: "cts/ctsApi.nd?",
                        data: {
                            serviceCode: 'getCtsSessionId'
                        },
                        method: 'POST',
                        callback: function (res) {
                            var data = res.data;
                            var storeCode = _this.shopCisCode;
                            var jsessionId = '';
                            if (data && data.returnData) {
                                jsessionId = data.returnData;
                            }
                            var baseUrl = index_1.getDomain(wepy_1.default.$appConfig.baseUrl);
                            var url = baseUrl + "/correctionError/#/correctionError?JSESSIONID=" + jsessionId + "&isApp=true&storeCode=" + storeCode;
                            var urlStr = encodeURIComponent(url);
                            var jumpUrl = "/pages/me/webview/index?url=" + urlStr;
                            wx.navigateTo({
                                url: jumpUrl
                            });
                            _this.$apply();
                        }
                    });
                }
                else {
                    wx.showToast({
                        title: '请选择店铺',
                        icon: 'none'
                    });
                }
                // wx.openLocation({
                //   latitude:that.latitude,
                //   longitude:that.longitude,
                //   scale: 18,
                //   name:that.location
                // })
            },
            beforeUpload: function (file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    file.thumbUrl = e.target.result;
                    _this.setState(function (state) { return ({
                        imageUrl: file.thumbUrl,
                        fileList: state.fileList.concat([file])
                    }); });
                };
                return false;
            },
            gotoPoint: function () {
                if (!this.shopId) {
                    wx.showToast({
                        title: '请选择门店',
                        icon: 'none'
                    });
                    return;
                }
                wx.navigateTo({ url: '/pages/terminal/point/index?shopId=' + this.shopId + '&isSpecialShop=' + this.isSpecialShop + '&shopCisCode=' + this.shopCisCode + '&storeName=' + this.storeName });
            },
            // 改变培训人数
            onTraineesChange: function (event) {
                this.traineesNumber = event.detail;
            },
            //添加问题
            addSiteBean: function () {
                if (!_this.shopId) {
                    wx.showToast({
                        title: '请选择门店',
                        icon: 'none'
                    });
                    return;
                }
                _this.stibBean.push({
                    'id': new Date().getTime(),
                    'type': '',
                    'description': '',
                    'affiliation': '',
                    'solution': '',
                    'expDate': '',
                    'personLiableCode': '',
                    'responsible': '' //  -- 责任人
                });
            },
            onDescriptionChange: function (index, event) {
                this.stibBean[index].description = event.detail;
            },
            onAffiliationChange: function (index, event) {
                this.stibBean[index].affiliation = event.detail;
            },
            onSolutionChange: function (index, event) {
                this.stibBean[index].solution = event.detail;
            },
            //移除问题
            removeSiteBean: function (index) {
                var stibBeanNew = JSON.parse(JSON.stringify(_this.stibBean));
                stibBeanNew.splice(index, 1);
                _this.stibBean = JSON.parse(JSON.stringify(stibBeanNew));
                _this.$apply();
            },
            // 打开弹框
            openDateSel: function (index) {
                if (_this.stibBean[index].expDate) {
                    _this.currentDate = new Date(_this.stibBean[index].expDate).getTime();
                }
                else {
                    _this.currentDate = new Date().getTime();
                }
                _this.selProblemIndex = index;
                _this.dateSelVisable = true;
                _this.selProblemType = _this.stibBean[index].type;
            },
            //时间弹框关闭（确认）
            onConfirm: function (e) {
                _this.dateSelVisable = false;
                var date = new Date(parseInt(e.detail));
                var Y = date.getFullYear();
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                // var date1 = Y + '年' + M + '月' + D + '日'
                var date2 = Y + '-' + M + '-' + D;
                _this.stibBean[_this.selProblemIndex].expDate = date2;
            },
            //时间弹框关闭（取消）
            onCancel: function () {
                _this.dateSelVisable = false;
            },
            // 打开弹框
            openTypeList: function (index) {
                _this.selProblemIndex = index;
                _this.selProblemType = _this.stibBean[index].type;
                _this.problemTypeListVisible = true;
            },
            // 关闭弹框
            onCloseTypeList: function (dateType) {
                _this.problemTypeListVisible = false;
            },
            //选择问题类型（确认）
            onSelProblemType: function (item) {
                _this.selProblemType = item.value;
                _this.stibBean[_this.selProblemIndex].type = item.value;
                _this.methods.onCloseTypeList();
            },
            //跳转责任人
            gotoPeople: function (index) {
                _this.selProblemIndex = index;
                if (!_this.shopId) {
                    wx.showToast({
                        title: '请选择门店',
                        icon: 'none'
                    });
                    return;
                }
                wx.navigateTo({ url: '/pages/terminal/people/index?storeCode=' + _this.shopCisCode + '&selProblemIndex=' + _this.selProblemIndex });
            },
            getAccount: function () {
                _this.methods.getStoryPersons().then(function (res) {
                    var custAccountList = res.payload.custAccountList || [];
                    var thisAccount = wepy_1.default.$instance.globalData.account;
                    _this.account = custAccountList.find(function (item) {
                        return item.account === thisAccount;
                    });
                    _this.methods.getIsMyStore();
                });
            },
            getIsMyStore: function () {
                if (!_this.account.id || !_this.shopId) {
                    return;
                }
                _this.methods.getShopListByCustId({
                    custAccountId: _this.account.id
                }).then(function (res1) {
                    _this.isMyStore = res1.payload.idData.some(function (item) {
                        return item == Number(_this.shopId);
                    });
                });
            },
            fillParamsToData: function (options, type) {
                if (type == 1) {
                    _this.storeName = options.shopFullName;
                }
                else {
                    _this.storeName = options.fullName;
                }
                if (_this.distance != 'null') {
                    _this.distance = parseFloat(options.distance).toFixed(1);
                    _this.isopenMap = true;
                }
                _this.shAddress = options.shAddress;
                _this.provinceId = options.provinceId != 'undefined' ? options.provinceId : '';
                _this.provinceName = options.provinceName != 'undefined' ? options.provinceName : '';
                _this.cityId = options.cityId != 'undefined' ? options.cityId : '';
                _this.cityName = options.cityName != 'undefined' ? options.cityName : '';
                _this.countyId = options.countyId != 'undefined' ? options.countyId : '';
                _this.countyName = options.countyName != 'undefined' ? options.countyName : '';
                _this.townName = options.townName != 'undefined' ? options.townName : '';
                _this.townId = options.townId != 'undefined' ? options.townId : '';
                _this.dlongitude = parseFloat(options.longitude);
                _this.dlatitude = parseFloat(options.latitude);
                _this.shopId = options.shopId;
                _this.shopCisCode = options.shopCisCode;
                _this.isSpecialShop = options.isSpecialShop;
            },
            // 培训主题弹框显示
            handleTrainingPop: function () {
                if (this.trainingType) {
                    return;
                }
                this.trainingTopicsObj = {
                    id: this.trainingTopicsId,
                    title: this.trainingTopics
                };
                this.trainingTopicsVisable = true;
            },
            // 培训主题弹框取消
            handleCanclePop: function () {
                this.trainingTopicsVisable = false;
            },
            handleClearPop: function () {
                this.trainingTopicsObj = {};
                this.trainingTopics = '';
                this.trainingTopicsId = '';
                this.trainingTopicsVisable = false;
            },
            // 培训主题弹框确定
            handleConfirmPop: function () {
                if (this.trainingTopicsObj) {
                    this.trainingTopics = this.trainingTopicsObj.title;
                    this.trainingTopicsId = this.trainingTopicsObj.id;
                }
                this.trainingTopicsVisable = false;
            },
            // 培训主题选择
            onTrainingTopicschange: function (obj) {
                this.trainingTopicsObj = obj;
            }
        };
        return _this;
    }
    //选择照片
    WebViewPage.prototype.selImg = function (path, state) {
        var that = this;
        var FSM = wx.getFileSystemManager();
        var obj = {};
        FSM.readFile({
            filePath: path,
            encoding: 'base64',
            success: function (res) {
                var data = {
                    'serviceCode': 'uploadXtw',
                    'fileModuleName': 'publicPictures',
                    'file': 'image/jpeg;base64,' + res.data
                };
                that.methods.upload2Img(data).then(function (res2) {
                    obj.url = res2.payload.returnData.fileMapperPath;
                    obj.id = res2.payload.returnData.id;
                    obj.name = res2.payload.returnData.id;
                    if (state == 1) { //门头照片
                        var doorImgs = that.doorImgs;
                        doorImgs.push(obj);
                        that.doorImgs = doorImgs;
                        that.setData({ doorImgs: doorImgs });
                    }
                    if (state == 2) { //展台照片
                        var boothImgs = that.boothImgs;
                        boothImgs.push(obj);
                        that.setData({ boothImgs: boothImgs });
                    }
                    if (state == 3) { //样机照片
                        var sampleImgs = that.sampleImgs;
                        sampleImgs.push(obj);
                        that.setData({ sampleImgs: sampleImgs });
                    }
                    if (state == 4) { //门店卫生
                        var healthImgs = that.healthImgs;
                        healthImgs.push(obj);
                        that.setData({ healthImgs: healthImgs });
                    }
                    if (state == 5) { //员工专题
                        var staffImgs = that.staffImgs;
                        staffImgs.push(obj);
                        that.setData({ staffImgs: staffImgs });
                    }
                    if (state == 6) { //培训专题
                        var trainingImgs = that.trainingImgs;
                        trainingImgs.push(obj);
                        that.setData({ trainingImgs: trainingImgs });
                    }
                    that.$apply();
                });
            }
        });
    };
    //获取当前位置
    WebViewPage.prototype.getLocation = function () {
        var that = this;
        // 初始化时间
        var day = new Date();
        that.currentTime = day.Format('MM-dd hh:mm:ss');
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                that.latitude = res.latitude;
                that.longitude = res.longitude;
                if (that.dlatitude == '') {
                    that.dlatitude = res.latitude;
                    that.dlongitude = res.longitude;
                }
                that.qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success: function (res) {
                        that.adInfo = res.result.ad_info;
                        that.setData({ location: res.result.address });
                        that.location = res.result.address;
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
    WebViewPage.prototype.getRecordByUserCode = function () {
        var _this = this;
        var that = this;
        if (!this.shopId) {
            return;
        }
        var data = {
            'storeCode': this.shopCisCode
        };
        this.methods.getCheckInRecordByUserCode(data).then(function (res) {
            var data = res.payload;
            var allCheckInRecord = data.returnData ? (data.returnData.allCheckInRecord || []) : [];
            var storeCheckInRecordStore = data.returnData ? (data.returnData.storeCheckInRecordStore || []) : [];
            // debugger
            //该门店是否签到
            // if(storeCheckInRecordStore.length==0){
            //   storeCheckInRecordStore = allCheckInRecord.filter(it=>{
            //     debugger
            //     return it.storeCode== this.shopCisCode
            //   })
            // }
            if (storeCheckInRecordStore && storeCheckInRecordStore.length > 0) {
                _this.checkinRecord = storeCheckInRecordStore;
                _this.$apply();
                return;
            }
            else if (allCheckInRecord && allCheckInRecord.length > 0) {
                dialog_1.default.confirm({
                    title: '提示',
                    message: "\u60A8\u6709\u4E00\u7B7E\u5230\u7684\u95E8\u5E97\u6B63\u5728\u8FDB\u884C\u5DE1\u5E97\u662F\u5426\u8FDB\u5165?",
                    confirmButtonText: '立即进入',
                    cancelButtonText: '稍后再说',
                    className: 'has-record-dialog-wrap'
                }).then(function () {
                    // on confirm
                    var record = allCheckInRecord[allCheckInRecord.length - 1];
                    _this.checkinRecord = [record];
                    var data = {
                        'cisCode': wepy_1.default.$instance.globalData.cisCode,
                        'shopFullName': record.storeName,
                        'distance': '',
                        'longitude': that.longitude,
                        'latitude': that.latitude,
                        'matkls': [],
                        'label': '',
                        'marketModel': '',
                        'shopLevel': '',
                        'sortType': '1',
                        'page': 1,
                        'pageSize': 10,
                        'queryParamList': []
                    };
                    _this.methods.getShopListByCust(data).then(function (res) {
                        var obj = res.payload.data.content[0];
                        _this.methods.fillParamsToData(obj, 1);
                        that.$apply();
                    });
                    _this.$apply();
                })
                    .catch(function () {
                    // on cancel
                    _this.checkinRecord = [];
                    _this.$apply();
                });
            }
            else {
                _this.checkinRecord = [];
                _this.$apply();
            }
        });
    };
    // 获取培训列表
    WebViewPage.prototype.myGetDataList = function () {
        var _this = this;
        var now = new Date();
        var currentYear = now.getFullYear();
        var month = now.getMonth() + 1;
        var currentMonth = month < 10 ? '0' + month : month;
        requestJSON_1.request({
            api: "cts/ctsApi.nd?",
            data: {
                months: currentYear + "-" + currentMonth,
                serviceCode: 'getTrainingTaskListV3'
            },
            method: 'POST',
            callback: function (res) {
                var data = res.data;
                _this.trainingTopicsOption = data.returnData;
                if (_this.trainingTopicsOption) {
                    _this.trainingTopicsOption = _this.trainingTopicsOption.map(function (item) {
                        return {
                            id: item.id,
                            title: item.title
                        };
                    });
                }
                _this.$apply();
            }
        });
    };
    WebViewPage.prototype.onLoad = function (options) {
        var that = this;
        var obj;
        this.optionsTemp = JSON.parse(JSON.stringify(options));
        this.myGetDataList();
        this.methods.getAccount();
        // 空对象则是从我的-新增打卡进入
        if (JSON.stringify(options) == "{}") {
            index_1.removeStorage("training_item"); //用于清除保存的数据
        }
        // 从培训列表进入
        if (options.trainingType) {
            index_1.setStorage("training_item", {
                trainingId: options.trainingId,
                trainingTitle: options.trainingTitle,
                trainingType: options.trainingType,
            });
        }
        var trainingItem = wx.getStorageSync("training_item"); //在需要数据的页面取值
        if (trainingItem) {
            trainingItem = JSON.parse(JSON.stringify(trainingItem));
            this.trainingType = trainingItem.trainingType;
            this.trainingTopics = trainingItem.trainingTitle; // 培训主题
            this.trainingTopicsId = trainingItem.trainingId; // 培训主题id
        }
        if (options.data) {
            obj = JSON.parse(options.data);
            this.methods.fillParamsToData(obj, 1);
        }
        if (options.fullName) {
            this.methods.fillParamsToData(options, 2);
        }
        this.markers = [
            {
                id: Math.random(),
                latitude: that.dlatitude,
                longitude: that.dlongitude,
                iconPath: 'http://3s-static.hisense.com/wechat/1/14722429883/1655865963285_a60bce54f9a147ba9e173f025974cf45.png',
                width: 30,
                height: 30
            }
        ];
        this.qqmapsdk = new qqmap({
            key: wepy_1.default.$appConfig.qqMapKey
        });
        this.getLocation();
        wx.getStorage({
            key: 'b2b_token',
            success: function (res) {
                that.userAccount = JSON.parse(res.data);
            }
        });
        this.getRecordByUserCode();
        //当前时间获取
        that.curTimeInv = setInterval(function () {
            that.curTime = index_1.formatDate(Date.parse(new Date()), 'h:m');
        }, 10 * 1000);
        that.curTime = index_1.formatDate(Date.parse(new Date()), 'h:m');
        this.$apply();
    };
    WebViewPage.prototype.onUnload = function () {
        clearInterval(this.curTimeInv);
    };
    WebViewPage = __decorate([
        wepy_redux_1.connect({
            storyPersons: function (_a) {
                var record = _a.record;
                return record.storyPersons;
            }
        }, {
            getCheckInRecordByUserCode: record_1.getCheckInRecordByUserCode,
            addCheckInRecord: record_1.addCheckInRecord,
            getStoryPersons: record_1.getStoryPersons,
            getShopListByCustId: record_1.getShopListByCustId,
            getShopListByCust: record_1.getShopListByCust,
            addInspectionRecord2: record_1.addInspectionRecord2,
            upload2Img: record_1.upload2Img
        })
    ], WebViewPage);
    return WebViewPage;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(WebViewPage , 'pages/terminal/addrecord/index'));

