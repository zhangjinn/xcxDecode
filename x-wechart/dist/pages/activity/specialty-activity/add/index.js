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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var index_1 = require('./../../../../utils/index.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var activityare_1 = require('./../../../../store/actions/activityare.js');
var record_1 = require('./../../../../store/actions/record.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '',
            usingComponents: {
                'van-toast': '../../../../components/vant/toast/index',
                "van-field": "../../../../components/vant/field/index",
                "van-cell": "../../../../components/vant/cell/index",
                'van-uploader': '../../../../components/vant/uploader/index',
                "van-icon": "../../../../components/vant/icon/index",
                'van-popup': '../../../../components/vant/popup/index',
                'van-dialog': '../../../../components/vant/dialog/index',
                'calendar': '../../../../components/calendar/index',
            },
        };
        _this.data = {
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            calendarShow: false,
            isClickable: true,
            isPopShow: false,
            popTitle: '',
            formData: {
                store: '',
                storeName: '',
                activityTheme: '',
                activityType: '',
                activityTypeName: '',
                startDate: '',
                endDate: '',
                publicity: [],
                activityProgramme: [],
                salesSite: [],
                experienceSharing: [],
            },
            activityTypeOptions: [],
            storeNameOptions: [],
            salesInfo: [
                {
                    materialGroup: {
                        id: '',
                        name: ''
                    },
                    sales: 0,
                }
            ],
            materialGroupOptions: [],
            salesIndex: 0,
            isDisabled: false,
            pageType: '',
            currId: '',
            activeDetail: {},
            modifyCount: 0,
            dataSource: '',
            isCanModify: true,
            currentDateName: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            onFilterFormChange: function (evt) {
                var _a;
                var detail = evt.detail, _b = evt.currentTarget.dataset, name = _b.name, index = _b.index;
                if (name == 'sales') {
                    this.salesInfo[index].sales = detail;
                }
                else {
                    this.formData = __assign({}, this.formData, (_a = {}, _a[name] = detail, _a));
                }
            },
            onPopOpen: function (e) {
                var _a = e.currentTarget.dataset, name = _a.name, index = _a.index;
                if (this.isDisabled || (name === '门店名称' && this.pageType === 'edit') || !this.isCanModify) {
                    return;
                }
                this.popTitle = name;
                this.salesIndex = index;
                this.isPopShow = true;
            },
            onPopClose: function () {
                this.isPopShow = false;
            },
            // 选择活动类型
            chooseSink: function (item) {
                this.formData.activityType = item.id;
                this.formData.activityTypeName = item.name;
                this.isPopShow = false;
            },
            // 选择门店
            chooseStore: function (item) {
                this.formData.store = item.id;
                this.formData.storeName = item.name;
                this.getMatklByShopData('1');
                this.isPopShow = false;
            },
            // 选择物料组
            chooseMaterialGroup: function (item) {
                this.salesInfo[this.salesIndex].materialGroup.id = item.id;
                this.salesInfo[this.salesIndex].materialGroup.name = item.name;
                this.isPopShow = false;
            },
            // 删除图片
            deleteImg: function (event) {
                var key = event.currentTarget.dataset.key;
                this.formData[key].splice(event.detail.index, 1);
                this.$apply();
            },
            //上传图片
            afterRead: function (event) {
                this.selImg(event.detail.file.path, event.currentTarget.dataset.key);
            },
            // 删除销售信息
            delSales: function (event) {
                // 详情状态、编辑状态下编辑次数大于2都不能编辑
                if (this.isDisabled || !this.isCanModify) {
                    return;
                }
                var index = event.currentTarget.dataset.index;
                this.salesInfo.splice(index, 1);
                this.$apply();
            },
            // 添加销售信息
            addSales: function () {
                this.salesInfo.push({
                    materialGroup: {
                        id: '',
                        name: ''
                    },
                    sales: 0,
                });
                this.$apply();
            },
            // 提交
            toAddStore: function () {
                var type = _this.data.pageType;
                var checkResault = _this.methods.checkParam();
                if (checkResault) {
                    var _a = _this.data.formData, store = _a.store, activityTheme = _a.activityTheme, activityType = _a.activityType, startDate = _a.startDate, endDate = _a.endDate, publicity = _a.publicity, activityProgramme = _a.activityProgramme, salesSite = _a.salesSite, experienceSharing = _a.experienceSharing;
                    var salesInfo = _this.data.salesInfo;
                    var saleInfoList = [];
                    if (salesInfo && salesInfo.length > 0) {
                        saleInfoList = salesInfo.map(function (item) {
                            return {
                                matklId: item.materialGroup.id,
                                matklName: item.materialGroup.name,
                                planSaleMoney: item.sales,
                                isEdited: true
                            };
                        });
                    }
                    var param = {
                        shopInfoId: store,
                        activityTheme: activityTheme,
                        activityLabelId: activityType,
                        startTime: startDate,
                        endTime: endDate,
                        rcxcAttach: publicity && publicity.length > 0 ? publicity[0].id : '',
                        hdfaAttach: activityProgramme && activityProgramme.length > 0 ? activityProgramme[0].id : '',
                        xsxcAttach: salesSite && salesSite.length > 0 ? salesSite[0].id : '',
                        jyfxAttach: experienceSharing && experienceSharing.length > 0 ? experienceSharing[0].id : '',
                        saleInfoList: saleInfoList,
                    };
                    if (!_this.isClickable) {
                        return;
                    }
                    _this.isClickable = false;
                    toast_1.default.loading({
                        forbidClick: true,
                        duration: 1000,
                        message: '加载中...',
                    });
                    var Q = '';
                    var msg_1 = '';
                    if (type == 'add') { // 新增
                        Q = _this.methods.saveFlowStartActivity(param);
                        msg_1 = '新增成功';
                    }
                    else { // 修改
                        param.id = _this.currId;
                        Q = _this.methods.saveActivity(param);
                        msg_1 = '修改成功';
                    }
                    Q.then(function (res) {
                        var payload = res.payload;
                        if (payload.data && payload.data == 'success') {
                            toast_1.default.success({
                                forbidClick: true,
                                duration: 1000,
                                message: msg_1,
                                onClose: function () {
                                    wx.navigateBack({
                                        delta: 1,
                                    });
                                },
                            });
                        }
                        else {
                            toast_1.default.fail({
                                forbidClick: true,
                                message: payload.msg,
                            });
                        }
                        _this.isClickable = true;
                        _this.$apply();
                    });
                }
            },
            checkParam: function () {
                var _a = _this.data.formData, store = _a.store, activityTheme = _a.activityTheme, activityType = _a.activityType, startDate = _a.startDate, endDate = _a.endDate;
                var salesInfo = _this.data.salesInfo;
                if (!store) {
                    toast_1.default.fail('请选择门店名称');
                    return false;
                }
                if (!activityTheme) {
                    toast_1.default.fail('请填写活动主题');
                    return false;
                }
                if (!activityType) {
                    toast_1.default.fail('请选择活动类型');
                    return false;
                }
                if (!startDate) {
                    toast_1.default.fail('请选择活动开始时间');
                    return false;
                }
                if (!endDate) {
                    toast_1.default.fail('请选择活动结束时间');
                    return false;
                }
                // 可以没有物料；如果有物料，物料组必填且物料组不能重复，
                if (salesInfo && salesInfo.length > 0) {
                    var isMatklEmpty = _this.isEmpty(salesInfo);
                    if (isMatklEmpty) {
                        toast_1.default.fail('物料组必填');
                        return false;
                    }
                    var isMatklRepeat = _this.isRepeat(salesInfo);
                    if (isMatklRepeat) {
                        toast_1.default.fail('物料组不能重复');
                        return false;
                    }
                }
                return true;
            },
            // 取消
            toRevoke: function () {
                wx.navigateBack({
                    delta: 1,
                });
            },
            // 打开日历
            openCalendar: function (e) {
                if (this.isDisabled || !this.isCanModify) {
                    return;
                }
                var name = e.currentTarget.dataset.name;
                var minDate = index_1.nextDay();
                var maxDate = '9999-12-31';
                var _a = this.formData, startDate = _a.startDate, endDate = _a.endDate;
                this.currentDateName = name;
                var begin, end;
                begin = startDate;
                end = endDate;
                if (name.indexOf('startDate') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('endDate') > -1) {
                    this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
                }
                this.calendarShow = true;
            },
            // 关闭日历
            closeCalendar: function () {
                this.calendarShow = false;
            },
            // 清空已选日期
            clearCalendar: function (e) {
                var _a;
                var name = e.currentTarget.dataset.name;
                this.formData = __assign({}, this.formData, (_a = {}, _a[name] = '', _a));
            },
            // 选择日期
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.formData = __assign({}, this.formData, (_a = {}, _a[this.currentDateName] = day, _a));
                this.calendarShow = false;
            },
        };
        return _this;
    }
    Filter.prototype.isEmpty = function (arr) {
        var hash = []; // 有物料组的物料组id数组
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].materialGroup.id) {
                hash.push(arr[i].materialGroup.id);
            }
        }
        if (hash.length < arr.length) {
            return true;
        }
        else {
            return false;
        }
    };
    Filter.prototype.isRepeat = function (arr) {
        var hash = {}; // 去重之后的物料组对象
        for (var i = 0; i < arr.length; i++) {
            if (!hash[arr[i].materialGroup.id]) {
                hash[arr[i].materialGroup.id] = true;
            }
        }
        if (Object.keys(hash).length < arr.length) {
            return true;
        }
        else {
            return false;
        }
    };
    //选择照片
    Filter.prototype.selImg = function (path, key) {
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
                    'fileType': 'custApply',
                    'file': 'image/jpeg;base64,' + res.data
                };
                that.methods.uploadImg(data).then(function (res2) {
                    obj.url = res2.payload.url;
                    obj.id = res2.payload.businessId;
                    obj.name = res2.payload.fileNameString;
                    that.formData[key].push(obj);
                    that.$apply();
                });
            }
        });
    };
    // 查询图片回显路径
    Filter.prototype.getPictureUrl = function (file) {
        var photo = [];
        if (file && file.attachPath && file.id) {
            // let url = wepy.$appConfig.baseUrl + '/comm/showUpload.nd?pathInfo=' + file.attachPath + '&fileName=' + file.attachName
            var url = file.attachPath;
            var photoObj = {
                id: file.id,
                name: file.attachShortName,
                url: url,
            };
            photo.push(photoObj);
        }
        return photo;
    };
    // 获取筛选列表接口
    Filter.prototype.getDictBytype = function (type) {
        var param = {
            categoryName: type
        };
        return this.methods.getSpecialShopDictBytype(param).then(function (res) {
            var categoryList = [];
            if (res.payload && res.payload.data) {
                categoryList = res.payload.data.map(function (item) {
                    return __assign({}, item, { id: item.code, value: item.name });
                });
            }
            return categoryList;
        });
    };
    // 获取筛选条件列表并赋值
    Filter.prototype.getAllDictBytype = function () {
        var _this = this;
        // 活动类别
        this.getDictBytype('specialActivityType').then(function (res) {
            _this.activityTypeOptions = res;
            _this.$apply();
        });
    };
    // 根据门店带出门店明细中的物料组
    Filter.prototype.getMatklByShopData = function (type) {
        var _this = this;
        var shopId = this.formData.store;
        var param = {
            shopId: shopId
        };
        this.methods.getMatklByShop(param).then(function (res) {
            var categoryList = [];
            if (res.payload && res.payload.data) {
                categoryList = res.payload.data.map(function (item) {
                    return __assign({}, item, { id: item.matklId, name: item.matklName });
                });
            }
            _this.materialGroupOptions = categoryList;
            if (type && type === '1') { // 选择门店时需要给salesInfo赋值，预计销售额默认0
                if (_this.materialGroupOptions && _this.materialGroupOptions.length > 0) {
                    _this.salesInfo = _this.materialGroupOptions.map(function (item) {
                        return {
                            materialGroup: {
                                id: item.id,
                                name: item.name
                            },
                            sales: 0,
                        };
                    });
                }
            }
            _this.$apply();
        });
    };
    // 获取门店名称列表
    Filter.prototype.getSpecialShopData = function () {
        var _this = this;
        var param = {
            search: ''
        };
        this.methods.getSpecialShop(param).then(function (res) {
            var categoryList = [];
            if (res.payload && res.payload.data) {
                categoryList = res.payload.data.map(function (item) {
                    return __assign({}, item, { id: item.code, value: item.name });
                });
            }
            _this.storeNameOptions = categoryList;
        });
    };
    // 根据Id查询专卖店销量信息
    Filter.prototype.getActivitySaleInfoData = function () {
        var _this = this;
        var param = {
            id: this.currId
        };
        this.methods.getActivitySaleInfo(param).then(function (res) {
            var data = res.payload.data;
            if (data) {
                _this.salesInfo = data.map(function (item) {
                    return {
                        materialGroup: {
                            id: item.matklId,
                            name: item.matklName
                        },
                        sales: item.planSaleMoney
                    };
                });
            }
            _this.$apply();
        });
    };
    // 获取订单详细信息
    Filter.prototype.getDetailsData = function () {
        var _this = this;
        toast_1.default.loading({
            message: '正在加载',
            duration: 2000
        });
        var param = {
            id: this.currId
        };
        this.methods.getActivityById(param).then(function (res) {
            toast_1.default.clear();
            var data = res.payload.data;
            if (data) {
                var detail = data;
                // this.activeDetail = edit 编辑状态下
                // 1、dataSource=1(信天翁) 修改次数<2,都可编辑(门店名称编辑状态都不可修改)
                // 2、dataSource=1(信天翁) 修改次数>=2,只能改附件
                // 2、dataSource=0(cis) 只能改附件里的认筹宣传、销售现场
                _this.modifyCount = detail.modifyCount;
                if (_this.pageType === 'edit' && _this.dataSource == 1 && _this.modifyCount >= 2) {
                    _this.isCanModify = false;
                    toast_1.default.fail('因活动修改次数达到上限，目前只允许修改附件');
                }
                if (_this.pageType === 'edit' && _this.dataSource == 0) {
                    _this.isCanModify = false;
                    toast_1.default.fail('只允许修改附件认筹宣传、销售现场');
                }
                _this.formData = __assign({}, _this.formData, { store: detail.shopInfoId, storeName: detail.shopInfoName, activityTheme: detail.activityTheme, activityType: detail.activityLabelId, activityTypeName: detail.activityLabelName, startDate: detail.startTime, endDate: detail.endTime, publicity: _this.getPictureUrl(detail.rcxcFile), activityProgramme: _this.getPictureUrl(detail.hdfaFile), salesSite: _this.getPictureUrl(detail.xsxcFile), experienceSharing: _this.getPictureUrl(detail.jyfxFile) });
                _this.getMatklByShopData();
            }
            _this.$apply();
        });
    };
    Filter.prototype.onLoad = function (_a) {
        var id = _a.id, type = _a.type, dataSource = _a.dataSource;
        this.currId = '';
        if (id) {
            this.currId = id;
        }
        // type='add'->新增；type='edit'->编辑；type='detail'->详情
        if (type) {
            this.pageType = type;
        }
        this.dataSource = '';
        if (type === 'edit') {
            this.dataSource = dataSource;
        }
        this.getSpecialShopData();
        this.getAllDictBytype();
        if (this.pageType === 'add') {
            wx.setNavigationBarTitle({
                title: '新增专卖店市场活动'
            });
            this.isDisabled = false;
        }
        else if (this.pageType === 'edit') {
            wx.setNavigationBarTitle({
                title: '编辑专卖店市场活动'
            });
            this.isDisabled = false;
            this.getDetailsData();
            this.getActivitySaleInfoData();
        }
        else {
            wx.setNavigationBarTitle({
                title: '专卖店市场活动详情'
            });
            this.isDisabled = true;
            this.getDetailsData();
            this.getActivitySaleInfoData();
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
            getSpecialShop: activityare_1.getSpecialShop,
            getSpecialShopDictBytype: activityare_1.getSpecialShopDictBytype,
            getMatklByShop: activityare_1.getMatklByShop,
            saveActivity: activityare_1.saveActivity,
            saveFlowStartActivity: activityare_1.saveFlowStartActivity,
            getActivityById: activityare_1.getActivityById,
            getActivitySaleInfo: activityare_1.getActivitySaleInfo,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/activity/specialty-activity/add/index'));

