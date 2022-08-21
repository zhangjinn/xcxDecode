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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var index_1 = require('./../../../components/header-filter/index.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var index_2 = require('./../../../components/popup-customize/index.js');
var dmsorder_1 = require('./../../../../store/actions/dmsorder.js');
var inventory_1 = require('./../../../../store/actions/inventory.js');
var record_1 = require('./../../../../store/actions/record.js');
var requestJSON_1 = require('./../../../../utils/requestJSON.js');
var toast_2 = require('./../../../../components/vant/toast/toast.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '样机管理',
            usingComponents: {
                'van-toast': '../../../../components/vant/toast/index',
                'van-loading': '../../../../components/vant/loading/index',
                'van-search': '../../../../components/vant/search/index',
                "van-field": "../../../../components/vant/field/index",
                "van-cell": "../../../../components/vant/cell/index",
                'van-uploader': '../../../../components/vant/uploader/index',
                "van-icon": "../../../../components/vant/icon/index",
                'van-popup': '../../../../components/vant/popup/index',
                'van-dialog': '../../../../components/vant/dialog/index'
            }
        };
        _this.$repeat = {};
        _this.$props = { "filter": { "xmlns:v-bind": "", "v-bind:tabList.sync": "tabList", "v-bind:tabActive.sync": "tabActive", "xmlns:v-on": "", "v-bind:showSearch.sync": "showSearch" }, "popupCustomize": { "v-bind:options.sync": "currentOptions", "v-bind:selectedOption.sync": "popSelectedOption", "v-bind:title.sync": "popTitle", "v-bind:multiple.sync": "multiple", "v-bind:isSearch.sync": "isSearch", "v-bind:search.once": "Searchvalue" } };
        _this.$events = { "filter": { "v-on:tabChange": "tabChange" }, "popupCustomize": { "v-on:onSelect": "chooseOption", "v-on:onSearch": "onSearchOption" } };
        _this.components = {
            filter: index_1.default,
            popupCustomize: index_2.default
        };
        _this.data = {
            customerInfo: {},
            currentOptions: [],
            currentOptionsC: [],
            isPopShowC: false,
            ishowM: false,
            showSearch: false,
            // tab循环
            tabList: [
                {
                    name: '上样',
                },
                {
                    name: '撤样',
                },
                {
                    name: '我的样机',
                },
            ],
            tabActive: '0',
            isPopShow: false,
            popTitle: '',
            // 上样
            formData: {
                store: '',
                storeName: '',
                storeType: '',
                storeTypeName: '',
                materialGroup: '',
                materialGroupName: '',
            },
            // 门店
            storeNameOptions: [],
            // 物料组
            materialGroupOptions: [],
            ProductInfo: [
            // {
            //   model: {
            //     id: '',
            //     name: '',
            //     qty: ''
            //   },
            //   fileList: []
            // }
            ],
            popSelectedOption: {},
            proIndex: 0,
            // 撤样
            SampleformData: {
                store: '',
                storeName: '',
                storeType: '',
                storeTypeName: '',
                type: '信天翁非铺借撤样',
                model: {
                    name: [],
                    id: []
                }
            },
            formKey: '',
            modelLiatc: [],
            isSearch: true,
            multiple: true,
            formOptions: {
                proList: []
            },
        };
        // 页面内交互写在methods里
        _this.methods = {
            // tab切换
            tabChange: function (param) {
                this.tabActive = param.tabActive;
                if (this.tabActive == 2) {
                    var url = "/pages/goods/prototypeManagement/list/index?tabActive=" + this.tabActive;
                    wx.redirectTo({
                        url: url
                    });
                }
                this.$apply();
            },
            // 删除产品信息
            delSales: function (event) {
                var index = event.currentTarget.dataset.index;
                this.ProductInfo.splice(index, 1);
                this.$apply();
            },
            // 添加销售信息
            addProInfo: function () {
                // 判断是否有物料组 有的话继续没有提示
                if (!this.formData.materialGroup) {
                    toast_2.default.fail('请先选择物料组');
                    return;
                }
                this.ProductInfo.push({
                    model: {
                        id: '',
                        name: ''
                    },
                    fileList: [],
                    modeList: []
                });
                this.$apply();
            },
            // 产品信息型号更改
            onFilterFormChange: function (evt) {
                var _a;
                var detail = evt.detail, _b = evt.currentTarget.dataset, name = _b.name, index = _b.index;
                if (name == 'model') {
                    this.ProductInfo[index].model = detail;
                }
                else {
                    this.formData = __assign({}, this.formData, (_a = {}, _a[name] = detail, _a));
                }
            },
            // 打开下拉选项
            onPopOpen: function (e) {
                var _a = e.currentTarget.dataset, name = _a.name, key = _a.key, index = _a.index;
                this.formKey = key;
                this.currentOptions = this.formOptions[this.formKey];
                // 撤样门店的
                if (name == '门店撤样') {
                    this.isPopShowC = true;
                    this.popTitle = '门店';
                    this.proIndex = index;
                    return;
                }
                if (key == 'cModel') {
                    this.currentOptions = this.modelLiatc;
                    this.popTitle = '型号';
                    this.proIndex = index;
                    this.popSelectedOption = this.SampleformData.model;
                    this.multiple = true;
                    this.$invoke('popupCustomize', 'onShow');
                    this.$apply();
                    return;
                }
                if (name === '型号') { // 型号弹窗展开
                    this.isSearch = true;
                    this.popTitle = name;
                    this.proIndex = index;
                    if (this.ProductInfo[this.proIndex].modeList && this.ProductInfo[this.proIndex].modeList.length <= 0) {
                        this.currentOptions = this.formOptions.proList;
                        this.popSelectedOption = this.ProductInfo[this.proIndex][this.formKey];
                    }
                    else {
                        this.currentOptions = this.ProductInfo[this.proIndex].modeList;
                        this.popSelectedOption = this.ProductInfo[this.proIndex][this.formKey];
                    }
                    this.$invoke('popupCustomize', 'onShow');
                    this.$apply();
                    return;
                }
                this.popTitle = name;
                this.proIndex = index;
                this.isPopShow = true;
            },
            // 筛选列表弹框搜索触发事件
            onSearchOption: function (searchValue) {
                return __awaiter(this, void 0, void 0, function () {
                    var words, param;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                words = searchValue || '';
                                param = {
                                    _loading: true,
                                    cisCode: wepy_1.default.$instance.globalData.cisCode,
                                    terms: {
                                        isFuzzy: true,
                                        zzprdmodel: words,
                                        model: words,
                                        colour: '',
                                        warehouseId: '',
                                        invStatusId: '',
                                        isLock: '',
                                        dealerMaterialGroupFlag: '',
                                        materialGroupCode: this.tabActive == 1 ? '' : this.formData.materialGroup,
                                        materialGroupName: '',
                                        gicWarehouseType: '',
                                        invStatusType: '',
                                        invType: '',
                                        bigQtyMin: 0,
                                        orgId: '',
                                        gicInvStatus: '110' //库存状态只查正品
                                    },
                                    page: {
                                        pageNo: 1,
                                        pageSize: 100
                                    }
                                };
                                return [4 /*yield*/, this.methods.getSingerMaterialInventoryPage(param).then(function (res) {
                                        _this.currentOptions = [];
                                        var data = res.payload.data;
                                        data = data.map(function (item) {
                                            return {
                                                id: item.uniqueFlag,
                                                name: item.zzprdmodel,
                                                qty: item.bigQty
                                            };
                                        });
                                        if (_this.formKey == 'cModel') {
                                            _this.modelLiatc = data;
                                            _this.currentOptions = _this.modelLiatc;
                                        }
                                        else {
                                            _this.ProductInfo[_this.proIndex].modeList = data;
                                            _this.formOptions.proList = data;
                                            _this.currentOptions = _this.ProductInfo[_this.proIndex].modeList;
                                        }
                                        _this.$apply();
                                    })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            },
            // 选择对应列表项并赋值
            chooseOption: function (item) {
                if (this.formKey == 'cModel') {
                    if (this.multiple) {
                        var oIndex = this.SampleformData['model'].id.indexOf(item.id);
                        if (oIndex > -1) {
                            this.SampleformData['model'].id.splice(oIndex, 1);
                            this.SampleformData['model'].name.splice(oIndex, 1);
                        }
                        else {
                            this.SampleformData['model'].id.push(item.id);
                            this.SampleformData['model'].name.push(item.name);
                        }
                        return;
                    }
                }
                if (this.formKey === 'model') { //
                    this.ProductInfo[this.proIndex]['model'].id = item.id;
                    this.ProductInfo[this.proIndex]['model'].name = item.name;
                    this.ProductInfo[this.proIndex]['model'].qty = item.qty;
                }
                this.$invoke('popupCustomize', 'onClose');
                this.$apply();
            },
            // 关闭下拉
            onPopClose: function (e) {
                this.isPopShow = false;
                this.isPopShowC = false;
            },
            // 选择门店
            chooseStore: function (item) {
                var _this = this;
                this.formData.store = item.code;
                this.formData.storeName = item.name;
                this.formData.materialGroup = '';
                this.formData.materialGroupName = '';
                this.materialGroupOptions = [];
                this.ProductInfo = [];
                // 根据门店id获取物料组数据
                var shopData = {
                    shopId: this.formData.store
                };
                this.methods.getSMterialInfoPrototype(shopData).then(function (res) {
                    if (res.payload.code == 0) {
                        _this.materialGroupOptions = res.payload.list;
                    }
                    else {
                        _this.materialGroupOptions = [];
                    }
                });
                // 门店类别通过门店带出
                if (item.isExclusiveShop == '1') {
                    this.formData.storeType = '专卖店';
                }
                else {
                    this.formData.storeType = '非专卖店';
                }
                this.isPopShow = false;
            },
            // 撤样的门店选择
            chooseStorec: function (item) {
                this.SampleformData.store = item.code;
                this.SampleformData.storeName = item.name;
                // 门店类别通过门店带出
                if (item.isExclusiveShop == '1') {
                    this.SampleformData.storeType = '专卖店';
                }
                else {
                    this.SampleformData.storeType = '非专卖店';
                }
                this.isPopShowC = false;
            },
            // 撤样型号修改
            chooseModelc: function (item) {
                this.SampleformData.modelId = item.id;
                this.SampleformData.storeName = item.name;
                this.multiple = false;
                this.isPopShowC = false;
            },
            // 选择物料组
            chooseMaterialGroup: function (item) {
                this.formData.materialGroup = item.code;
                this.formData.materialGroupName = item.name;
                this.ProductInfo = [];
                this.isPopShow = false;
            },
            // 上样提交
            toAddStore: function () {
                // 增加渠道类别上样控制 全国性连锁、电子商务不能操作
                if (wepy_1.default.$instance.globalData.customer.channelId == 5600 || wepy_1.default.$instance.globalData.customer.channelId == 5605) {
                    toast_2.default.fail('该商家的渠道类别属于全国性连锁、电子商务，不可发起上样流程，如有疑问请联系中国区客户发展部');
                    return;
                }
                // 获取当前时间戳new Date().getTime()
                var modeList1 = [];
                if (_this.ProductInfo && _this.ProductInfo.length > 0) {
                    _this.ProductInfo.forEach(function (item) {
                        modeList1.push({
                            modeName: item.model.name,
                            machineSn: '',
                            yjCheckStatus: '1',
                            yjCheckPicture: item.fileList && item.fileList[0] ? item.fileList[0].name : '',
                        });
                    });
                }
                var data = {
                    type: 23,
                    systemFlag: 'XTW',
                    requestNo: new Date().getTime(),
                    workName: '',
                    workLevel: '3',
                    applyContent: 1,
                    startDate: '',
                    deliveryTypeId: '',
                    storeCode: _this.formData.store,
                    storeName: _this.formData.storeName,
                    customerCode: _this.customerInfo.custmerCode,
                    customerMdmCode: _this.customerInfo.custmerMdmCode,
                    customerName: _this.customerInfo.custmerName,
                    contact: '',
                    contactPhone: '',
                    userAccount: 'merchant',
                    //wepy.$instance.globalData.account
                    userName: wepy_1.default.$instance.globalData.accountInfo.userName,
                    modeList: modeList1,
                    serviceCode: 'saveSmWork'
                };
                toast_1.default.loading({
                    forbidClick: true,
                    duration: 1000,
                    message: '加载中...'
                });
                requestJSON_1.request({
                    api: "cts/ctsApi.nd?",
                    data: data,
                    method: 'POST',
                    callback: function (res) {
                        toast_1.default.clear();
                        var data = res.data;
                        if (res.data.code == 200) {
                            toast_2.default.success('提交成功');
                            var url = "/pages/goods/prototypeManagement/list/index?tabActive=" + 2;
                            wx.redirectTo({
                                url: url
                            });
                        }
                        else {
                            toast_2.default.fail('提交失败：' + res.data.msg);
                        }
                        _this.$apply();
                    }
                });
            },
            // 撤样提交
            toAddStoreCY: function () {
                var modeList1 = [];
                if (_this.SampleformData.model && _this.SampleformData.model.name.length > 0) {
                    _this.SampleformData.model.name.forEach(function (item) {
                        modeList1.push({
                            modeName: item,
                            machineSn: '',
                            yjCheckStatus: '1',
                            yjCheckPicture: ''
                        });
                    });
                }
                var data = {
                    type: 24,
                    systemFlag: 'XTW',
                    requestNo: new Date().getTime(),
                    workName: '',
                    workLevel: '3',
                    applyContent: 2,
                    startDate: '',
                    deliveryTypeId: '',
                    storeCode: _this.SampleformData.store,
                    storeName: _this.SampleformData.storeName,
                    customerCode: _this.customerInfo.custmerCode,
                    customerMdmCode: _this.customerInfo.custmerMdmCode,
                    customerName: _this.customerInfo.custmerName,
                    contact: '',
                    contactPhone: '',
                    userAccount: 'merchant',
                    userName: wepy_1.default.$instance.globalData.accountInfo.userName,
                    modeList: modeList1,
                    serviceCode: 'saveSmWork'
                };
                toast_1.default.loading({
                    forbidClick: true,
                    duration: 1000,
                    message: '加载中...',
                });
                requestJSON_1.request({
                    api: "cts/ctsApi.nd?",
                    data: data,
                    method: 'POST',
                    callback: function (res) {
                        toast_1.default.clear();
                        var data = res.data;
                        if (res.data.code == 200) {
                            toast_2.default.success('提交成功');
                            var url = "/pages/goods/prototypeManagement/list/index?tabActive=" + 2;
                            wx.redirectTo({
                                url: url
                            });
                        }
                        else {
                            toast_2.default.fail('提交失败：' + res.data.msg);
                        }
                        _this.$apply();
                    }
                });
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
            }
            // 删除图片
            ,
            // 删除图片
            deleteImg: function (event) {
                var index = event.currentTarget.dataset.index;
                this.ProductInfo[index].fileList.splice(event.detail.index, 1);
                this.$apply();
            },
            // 上传图片
            afterRead: function (event) {
                this.selImg(event.detail.file.path, event.currentTarget.dataset.key, event.currentTarget.dataset.index);
            },
        };
        return _this;
    }
    Filter.prototype.onLoad = function (e) {
        if (e) {
            this.tabActive = e.tabActive;
        }
        var data = {
            orgId: '',
            matklId: '',
            searchStr: ''
        };
        this.methods.getShopInfoPrototype(data);
    };
    // 选择照片
    Filter.prototype.selImg = function (path, key, index) {
        if (!path) {
            return;
        }
        var that = this;
        var obj = {};
        var FSM = wx.getFileSystemManager();
        FSM.readFile({
            filePath: path,
            encoding: 'base64',
            success: function (res) {
                var data = {
                    'serviceCode': 'uploadSingleFileByXtw',
                    'file': 'data:image/jpeg;base64,' + res.data
                };
                that.methods.upload2Img(data).then(function (res2) {
                    if (res2.payload && res2.payload.code == 200) {
                        obj.url = res2.payload.data.url;
                        obj.name = res2.payload.data.fileName;
                        that.ProductInfo[index].fileList.push(obj);
                        that.$apply();
                    }
                    else {
                        toast_2.default.fail('上传失败' + res2.data.msg);
                    }
                });
            }
        });
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            storeNameOptions: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.protoTypeInfor.storeInfo;
            },
            customerInfo: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.protoTypeInfor.customerInfo;
            },
        }, {
            getShopInfoPrototype: dmsorder_1.getShopInfoPrototype,
            getInventoryQueriesListNew: inventory_1.getInventoryQueriesListNew,
            getSingerMaterialInventoryPage: inventory_1.getSingerMaterialInventoryPage,
            upload2Img: record_1.upload2Img,
            getSMterialInfoPrototype: dmsorder_1.getSMterialInfoPrototype
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/goods/prototypeManagement/loadingWithdrawal/index'));

