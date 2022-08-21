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
var activityare_1 = require('./../../../../store/actions/activityare.js');
var record_1 = require('./../../../../store/actions/record.js');
var index_1 = require('./../../../components/side-filter/index.js');
var index_2 = require('./../../../components/header-filter/index.js');
var index_3 = require('./../../../../components/empty-data-type/index.js');
var index_4 = require('./../../../components/header-tab/index.js');
/* import utilsWxs from '../../../../wxs/utils.wxs'; */
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var index_5 = require('./../../../../utils/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '市场活动',
            usingComponents: {
                'van-icon': '../../../../components/vant/icon/index',
                'van-toast': '../../../../components/vant/toast/index',
                'van-dialog': '../../../../components/vant/dialog/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-loading': '../../../../components/vant/loading/index',
                'calendar': '../../../../components/calendar/index',
                "van-datetime-picker": "../../../../components/vant/datetime-picker/index",
                'van-field': '../../../../components/vant/field/index',
                'van-uploader': '../../../../components/vant/uploader/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "sideFilter": { "xmlns:v-bind": "", "v-bind:drawerTopHeight.once": "drawerTopHeight", "v-bind:sideFilterForm.sync": "sideFilterForm", "xmlns:v-on": "" }, "headerFilter": { "v-bind:activeLineStyle.once": "activeLineStyle", "v-bind:tabList.sync": "tabList", "v-bind:tabActive.sync": "tabActive", "v-bind:showSearch.sync": "showSearch" }, "emptyDataType": {}, "headerTab": { "v-bind:tabList.sync": "headerTabList" } };
        _this.$events = { "sideFilter": { "v-on:handleConfirm": "handleConfirm" }, "headerFilter": { "v-on:tabChange": "tabChange" }, "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            sideFilter: index_1.default,
            headerFilter: index_2.default,
            emptyDataType: index_3.default,
            headerTab: index_4.default,
        };
        _this.data = {
            showSearch: false,
            tabList: [
                { name: '代理商市场活动' },
                { name: '专卖店市场活动' },
            ],
            tabActive: '0',
            activeLineStyle: {
                width: '56rpx',
                height: '4rpx'
            },
            drawerTopHeight: '154',
            visible: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            scrollTop: -1,
            filterForm: {
                terms: {
                    status: '',
                    marketCenter: '',
                    office: '',
                    agent: '',
                    timeStart: '',
                    theme: '',
                    place: '',
                    distributor: '',
                    adCompany: '',
                    checkStatus: '',
                    creator: '',
                    activityCode: '',
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                    totalPage: 0,
                },
            },
            activityList: [],
            statusOptions: [
                { id: '申请中', value: '申请中' },
                { id: '已申请', value: '已申请' },
                { id: '核销中', value: '核销中' },
                { id: '已核销', value: '已核销' },
                { id: '作废', value: '作废' },
            ],
            sideFilterForm: [
                {
                    key: 'marketCenter',
                    label: '营销中心',
                    value: '',
                    name: '',
                    placeholder: '请选择营销中心',
                    type: 'select',
                    multiple: false,
                    options: [],
                },
                {
                    key: 'office',
                    label: '办事处',
                    value: '',
                    placeholder: '请输入办事处',
                    type: 'field'
                },
                {
                    key: 'agent',
                    label: '活动承接代理商',
                    value: '',
                    placeholder: '请输入活动承接代理商',
                    type: 'field'
                },
                {
                    key: 'timeStart',
                    label: '活动开始时间',
                    value: '',
                    placeholder: '请选择活动开始时间',
                    type: 'yearMonth'
                },
                {
                    key: 'theme',
                    label: '活动主题',
                    value: '',
                    placeholder: '请输入活动主题',
                    type: 'field'
                },
                {
                    key: 'place',
                    label: '活动地点',
                    value: '',
                    placeholder: '请输入活动地点',
                    type: 'field'
                },
                {
                    key: 'distributor',
                    label: '参与分销商',
                    value: '',
                    placeholder: '请输入参与分销商',
                    type: 'field'
                },
                {
                    key: 'adCompany',
                    label: '待制作广告公司',
                    value: '',
                    placeholder: '请输入待制作广告公司',
                    type: 'field'
                },
                {
                    key: 'checkStatus',
                    label: '审批状态',
                    value: '',
                    name: '',
                    placeholder: '请选择审批状态',
                    type: 'select',
                    multiple: false,
                    options: [],
                },
                {
                    key: 'creator',
                    label: '提报人',
                    value: '',
                    placeholder: '请输入提报人',
                    type: 'field'
                },
                {
                    key: 'activityCode',
                    label: '活动编码',
                    value: '',
                    placeholder: '请输入活动编码',
                    type: 'field'
                },
            ],
            certificateShow: false,
            selectActivityItem: {},
            formData: {
                experienceSharing: []
            },
            headerTabList: [
                { name: '状态', type: 'status', selectValue: '' },
            ],
            currentDate: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 跳转至专卖店市场活动列表
            tabChange: function () {
                var url = "/pages/activity/specialty-activity/list/index";
                wx.redirectTo({
                    url: url
                });
            },
            // 跳转到新增、编辑、详情
            viewDetail: function (e) {
                var _a = e.currentTarget.dataset, type = _a.type, id = _a.id;
                var url = '';
                if (type === 'detail') { // 详情
                    url = "/pages/activity/agency-activity/detail/index?id=" + id + "&type=" + type;
                }
                else if (type === 'off') { // 核销
                    url = "/pages/activity/agency-activity/off/index?id=" + id + "&type=" + type;
                }
                else { // 编辑、新增
                    url = "/pages/activity/agency-activity/add/index?id=" + id + "&type=" + type;
                }
                wx.navigateTo({
                    url: url
                });
            },
            // 弹出凭证弹框
            uploadCertificate: function (e) {
                var item = e.currentTarget.dataset.item;
                _this.selectActivityItem = item;
                _this.certificateShow = true;
                _this.$apply();
            },
            // 确定上传结算凭证
            onCertificateConfirm: function () {
                var _this = this;
                var _a = this.data.selectActivityItem, activityInstId = _a.activityInstId, id = _a.id, processInstId = _a.processInstId;
                var experienceSharing = this.data.formData.experienceSharing;
                var voucherAttachs = [];
                if (experienceSharing && experienceSharing.length > 0) {
                    voucherAttachs = experienceSharing.map(function (item) {
                        return { id: item.id };
                    });
                }
                var param = {
                    activityInstId: activityInstId,
                    id: id,
                    processInstId: processInstId,
                    voucherAttachs: voucherAttachs,
                };
                this.methods.saveAgree(param).then(function (res) {
                    var _a = res.payload, code = _a.code, msg = _a.msg;
                    if (code == '0') {
                        toast_1.default.success({
                            forbidClick: true,
                            duration: 1000,
                            message: msg || '上传成功',
                            onClose: function () {
                                _this.filterForm.page = __assign({}, _this.filterForm.page, { pageNo: 1 });
                                _this.myGetOrderList();
                            },
                        });
                    }
                    else {
                        toast_1.default.fail(msg);
                    }
                    _this.formData.experienceSharing = [];
                });
            },
            // 只要关闭凭证弹框都会触发
            onCertificateClose: function () {
                this.certificateShow = false;
                this.$apply();
            },
            // 取消上产凭证
            onCertificateCancel: function () {
                this.formData.experienceSharing = [];
            },
            // 活动作废
            viewVoid: function (e) {
                var item = e.currentTarget.dataset.item;
                if (item.status !== '申请中' && item.status !== '核销中') {
                    toast_1.default.fail('只有申请中和核销中的活动才可以作废，请检查活动状态。');
                    return false;
                }
                var that = _this;
                wx.showModal({
                    title: '提示',
                    content: '您的操作将会作废该活动并且只能重新发起活动申请，请问您确认吗？点击确认按钮则继续后台操作。',
                    success: function (res) {
                        return __awaiter(this, void 0, void 0, function () {
                            var param;
                            return __generator(this, function (_a) {
                                if (res.confirm) {
                                    param = {
                                        id: item.id,
                                    };
                                    that.methods.terminalActivityById(param).then(function (res1) {
                                        var code = res1.payload.code;
                                        if (code == '0') {
                                            toast_1.default.success({
                                                forbidClick: true,
                                                duration: 1000,
                                                message: '已作废',
                                                onClose: function () {
                                                    that.filterForm.page = __assign({}, that.filterForm.page, { pageNo: 1 });
                                                    that.myGetOrderList();
                                                },
                                            });
                                        }
                                    });
                                }
                                return [2 /*return*/];
                            });
                        });
                    },
                });
            },
            // 活动删除
            viewDelete: function (e) {
                var id = e.currentTarget.dataset.id;
                var that = _this;
                wx.showModal({
                    title: '提示',
                    content: '确定删除',
                    success: function (res) {
                        return __awaiter(this, void 0, void 0, function () {
                            var param;
                            return __generator(this, function (_a) {
                                if (res.confirm) {
                                    param = {
                                        id: id,
                                    };
                                    that.methods.deleteActivityById(param).then(function (res1) {
                                        var code = res1.payload.code;
                                        if (code == '0') {
                                            toast_1.default.success({
                                                forbidClick: true,
                                                duration: 1000,
                                                message: '删除成功',
                                                onClose: function () {
                                                    that.filterForm.page = __assign({}, that.filterForm.page, { pageNo: 1 });
                                                    that.myGetOrderList();
                                                },
                                            });
                                        }
                                    });
                                }
                                return [2 /*return*/];
                            });
                        });
                    },
                });
            },
            // 切换顶部快捷筛选
            touchOrderSFilter: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                if (!_this.OrderSFilterVisible) {
                    _this.OrderSFilterVisible = true;
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                if (!name) {
                    _this.OrderSFilterVisible = false;
                    _this.CurrentOrderSFilterName = '';
                    return;
                }
                if (_this.CurrentOrderSFilterName === name) {
                    _this.OrderSFilterVisible = false;
                    _this.CurrentOrderSFilterName = '';
                    return;
                }
                if (['type', 'status'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 顶部状态快捷筛选
            onSelectStatus: function (e) {
                var _a = e.currentTarget.dataset, name = _a.name, id = _a.id;
                this.filterForm.terms[name] = id;
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.headerTabList[0].selectValue = id;
                this.myGetOrderList();
                this.methods.touchOrderSFilter();
                this.methods.scrollToTop();
            },
            // 点击普通筛选按钮-显示或隐藏左侧筛选框
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 回到顶部
            scrollToTop: function () {
                _this.scrollTop = 0;
            },
            // 滚动列表
            onScroll: function (event) {
                if (_this.scrollTop === 0) {
                    _this.scrollTop = event.detail.scrollTop;
                }
            },
            // 列表分页
            onGetOrderListNext: function () {
                var totalPage = this.filterForm.page.totalPage;
                if (totalPage > this.filterForm.page.pageNo) {
                    this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: this.filterForm.page.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
            // 筛选确定
            handleConfirm: function (e) {
                var _this = this;
                var filterForm = e.sideFilterForm;
                if (filterForm) {
                    filterForm.forEach(function (item) {
                        if (item.key === 'activityTime') {
                            _this.filterForm.terms.startDate = item.startDate;
                            _this.filterForm.terms.endDate = item.endDate;
                        }
                        else {
                            _this.filterForm.terms[item.key] = item.value;
                        }
                    });
                }
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
            },
            // 删除图片
            deleteImg: function (event) {
                var key = event.currentTarget.dataset.key;
                var index = event.detail.index;
                this.formData[key].splice(index, 1);
                this.$apply();
            },
            //上传图片
            afterRead: function (event) {
                this.selImg(event.detail.file.path, event.currentTarget.dataset.key);
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
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
    // 代理商活动筛选条件-营销中心列表
    Filter.prototype.getMarketCenterData = function () {
        var _this = this;
        this.methods.getMarketCenter().then(function (res) {
            var data = res.payload.data;
            data = data.map(function (item) {
                return __assign({}, item, { value: item.name });
            });
            _this.sideFilterForm = _this.sideFilterForm.map(function (item) {
                if (item.key === 'marketCenter') {
                    item.options = data;
                }
                return item;
            });
            _this.$apply();
        });
    };
    // 代理商活动筛选条件-审批状态列表
    Filter.prototype.getCheckStatusData = function () {
        var _this = this;
        this.methods.getCheckStatus().then(function (res) {
            var data = res.payload.data;
            data = data.map(function (item) {
                return {
                    id: item,
                    value: item,
                };
            });
            _this.sideFilterForm = _this.sideFilterForm.map(function (item) {
                if (item.key === 'checkStatus') {
                    item.options = data;
                }
                return item;
            });
            _this.$apply();
        });
    };
    Filter.prototype.myGetOrderList = function () {
        var _this = this;
        var _a = this.filterForm, terms = _a.terms, page = _a.page;
        var data = {
            marketCenter: terms.marketCenter,
            office: terms.office,
            agent: terms.agent,
            distributor: terms.distributor,
            timeStart: terms.timeStart,
            timeEnd: '',
            theme: terms.theme,
            place: terms.place,
            adCompany: terms.adCompany,
            checkStatus: terms.checkStatus,
            creator: terms.creator,
            status: terms.status,
            activityCode: terms.activityCode,
            pageNo: page.pageNo,
            pageSize: page.pageSize,
        };
        toast_1.default.loading({
            message: '正在加载',
            duration: 2000
        });
        this.methods.getAgentActivityList(__assign({}, data)).then(function (res) {
            toast_1.default.clear();
            var data = res.payload.data;
            _this.filterForm.page = __assign({}, _this.filterForm.page, { totalPage: data.totalPage });
            var activityList = data.content || [];
            if (data.page > 1) {
                _this.activityList = _this.activityList.concat(activityList);
            }
            else {
                _this.activityList = activityList;
            }
            _this.$apply();
        });
    };
    Filter.prototype.onShow = function () {
        this.currentDate = index_5.formatDate(new Date().getTime(), 'Y-M-D');
        this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
        this.myGetOrderList();
    };
    Filter.prototype.onLoad = function () {
        this.getMarketCenterData();
        this.getCheckStatusData();
    };
    Filter = __decorate([
        wepy_redux_1.connect({}, {
            uploadImg: record_1.uploadImg,
            getAgentActivityList: activityare_1.getAgentActivityList,
            getSpecialShopDictBytype: activityare_1.getSpecialShopDictBytype,
            getMarketCenter: activityare_1.getMarketCenter,
            getCheckStatus: activityare_1.getCheckStatus,
            deleteActivityById: activityare_1.deleteActivityById,
            saveAgree: activityare_1.saveAgree,
            terminalActivityById: activityare_1.terminalActivityById,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/activity/agency-activity/list/index'));

