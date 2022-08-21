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
var dialog_1 = require('./../../../../components/vant/dialog/dialog.js');
var index_2 = require('./../../../components/popup-customize/index.js');
var store_1 = require('./../../../../store/actions/store.js');
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
                'van-search': '../../../../components/vant/search/index',
                "van-datetime-picker": "../../../../components/vant/datetime-picker/index",
            },
        };
        _this.data = {
            yearsVisable: false,
            maxDate: new Date(new Date().getFullYear() + 10, 10, 1).getTime(),
            currentDate: new Date().getTime(),
            minDate: new Date().getTime(),
            popTitle: '',
            currentOptions: [],
            popSelectedOption: {},
            isSearch: false,
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            calendarShow: false,
            isClickable: true,
            formData: {
                projectOrg: {
                    id: '',
                    name: ''
                },
                requirementItem: '',
                planProject: {
                    id: '',
                    name: ''
                },
                instruction: '',
                attachment: [],
                document: [],
                officeManager: {
                    id: '',
                    name: ''
                },
                reason: '',
            },
            salesInfo: [],
            salesIndex: 0,
            formOptions: {
                projectOrg: [],
                planProject: [],
                store: [],
                requirementType: [],
                isBrandPark: [
                    { id: '0', name: '否' },
                    { id: '1', name: '是' },
                ],
                dispatchType: [],
                supplier: [],
                officeManager: [],
            },
            isDisabled: false,
            pageType: '',
            currId: '',
            activeDetail: {},
            approveShow: false,
            officeMaskShow: false,
            discardDetailIdList: [],
        };
        _this.$repeat = {};
        _this.$props = { "popupCustomize": { "xmlns:v-bind": "", "v-bind:options.sync": "currentOptions", "v-bind:selectedOption.sync": "popSelectedOption", "v-bind:title.sync": "popTitle", "v-bind:isSearch.sync": "isSearch", "xmlns:v-on": "" } };
        _this.$events = { "popupCustomize": { "v-on:onSelect": "chooseOption", "v-on:onSearch": "onSearchOption" } };
        _this.components = {
            popupCustomize: index_2.default,
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 改变表单输入框触发事件并赋值
            onFilterFormChange: function (evt) {
                if (this.isDisabled) {
                    return;
                }
                var detail = evt.detail, _a = evt.currentTarget.dataset, key = _a.key, index = _a.index;
                this.salesIndex = index;
                this.formKey = key;
                if (!this.salesIndex && this.salesIndex != 0) { // 表单输入框赋值
                    this.formData[this.formKey] = detail;
                }
                else { // 子单列表中输入框赋值
                    this.salesInfo[this.salesIndex][this.formKey] = detail;
                }
            },
            // 打开筛选列表弹框
            onPopOpen: function (e) {
                if (this.isDisabled) {
                    return;
                }
                var _a = e.currentTarget.dataset, name = _a.name, key = _a.key, index = _a.index;
                this.salesIndex = index;
                this.isSearch = false; // 选择弹框列表是否可搜索
                this.multiple = false; // 选择弹框列表是否多选
                this.popTitle = name; // 选择弹框标题
                this.formKey = key;
                this.currentOptions = this.formOptions[this.formKey];
                if (!this.salesIndex && this.salesIndex != 0) { // 表单列表中的当前选择项赋值
                    this.popSelectedOption = this.formData[this.formKey];
                }
                else { // 子单列表中的当前选择项赋值
                    // 0：普通安装派单；1：总部统装派单； 2：连锁统装派单
                    if (this.formKey === 'supplier') { // 需求子单 派单类型 未选择 连锁统装派单 时，不能填写供应商！
                        if (this.salesInfo[this.salesIndex]['dispatchType'].id != '2') {
                            return;
                        }
                    }
                    if (this.formKey === 'materialGroup') {
                        this.currentOptions = this.salesInfo[this.salesIndex][this.formKey].options;
                    }
                    this.popSelectedOption = this.salesInfo[this.salesIndex][this.formKey];
                    if (this.formKey === 'store') {
                        this.isSearch = true;
                    }
                    if (this.formKey === 'supplier') {
                        this.isSearch = true;
                    }
                }
                this.$invoke('popupCustomize', 'onShow');
                this.$apply();
            },
            // 选择对应列表项并赋值
            chooseOption: function (item) {
                var _this = this;
                if (this.formKey !== 'dispatchType') { // 派单类型单独赋值，其他同一用该方法
                    if (!this.salesIndex && this.salesIndex != 0) { // 表单列表中的选择项赋值
                        this.formData[this.formKey].id = item.id;
                        this.formData[this.formKey].name = item.name;
                    }
                    else { // 子单列表中的选择项赋值
                        this.salesInfo[this.salesIndex][this.formKey].id = item.id;
                        this.salesInfo[this.salesIndex][this.formKey].name = item.name;
                    }
                }
                if (this.formKey === 'store') { // 门店
                    this.salesInfo[this.salesIndex]['materialGroup'].id = '';
                    this.salesInfo[this.salesIndex]['materialGroup'].name = '';
                    this.salesInfo[this.salesIndex]['materialGroup'].options = [];
                    this.salesInfo[this.salesIndex]['office'].id = '';
                    this.salesInfo[this.salesIndex]['office'].name = '';
                    this.salesInfo[this.salesIndex]['office'].cisDetailId = '';
                    this.salesInfo[this.salesIndex]['office'].options = [];
                    this.salesInfo[this.salesIndex]['disNetworkSize'] = '';
                    this.getIsSpecialShopData();
                    this.getMaterialGroupsData();
                }
                if (this.formKey === 'materialGroup') { // 物料组
                    this.salesInfo[this.salesIndex]['office'].id = '';
                    this.salesInfo[this.salesIndex]['office'].name = '';
                    this.salesInfo[this.salesIndex]['office'].cisDetailId = '';
                    this.salesInfo[this.salesIndex]['office'].options = [];
                    this.salesInfo[this.salesIndex]['disNetworkSize'] = '';
                    this.getShopDetailData();
                }
                if (this.formKey === 'projectOrg') { // 立项组织，立项组织改变 所有的子单清空; 如果是接口返回的子单，删除时需要把子单id保存起来
                    if (this.salesInfo.length > 0) {
                        this.salesInfo.forEach(function (info) {
                            if (info.viewType && info.viewType === 'default') {
                                _this.discardDetailIdList.push(info.id);
                            }
                        });
                        this.formOptions.store = [];
                        this.salesInfo = [];
                    }
                }
                if (this.formKey === 'dispatchType') { // 派单类型
                    // 0：普通安装派单；1：总部统装派单； 2：连锁统装派单
                    if (item.id == '1') {
                        dialog_1.default.confirm({
                            message: '仅限于总部重点门店建店使用，不会自动派单，将由总部建店负责人在NP-SRM直接派工至总部指定搭建方，请再次确认！',
                        })
                            .then(function () {
                            _this.salesInfo[_this.salesIndex][_this.formKey].id = item.id;
                            _this.salesInfo[_this.salesIndex][_this.formKey].name = item.name;
                            _this.salesInfo[_this.salesIndex]['supplier'].id = ''; // 需求子单 派单类型 未选择 连锁统装派单 时，不能填写供应商！
                            _this.salesInfo[_this.salesIndex]['supplier'].name = '';
                            _this.$apply();
                        })
                            .catch(function () {
                            // on cancel
                        });
                    }
                    else if (item.id == '2') {
                        dialog_1.default.confirm({
                            message: '仅针对连锁渠道指定商家（如：顶、地制作），请再次确认是否要进行连锁统装派单？如选择此项，后期将纳入审计重点核查门店！',
                        })
                            .then(function () {
                            _this.salesInfo[_this.salesIndex][_this.formKey].id = item.id;
                            _this.salesInfo[_this.salesIndex][_this.formKey].name = item.name;
                            _this.$apply();
                        })
                            .catch(function () {
                            // on cancel
                        });
                    }
                    else {
                        this.salesInfo[this.salesIndex][this.formKey].id = item.id;
                        this.salesInfo[this.salesIndex][this.formKey].name = item.name;
                        this.salesInfo[this.salesIndex]['supplier'].id = ''; // 需求子单 派单类型 未选择 连锁统装派单 时，不能填写供应商！
                        this.salesInfo[this.salesIndex]['supplier'].name = '';
                    }
                }
                this.$invoke('popupCustomize', 'onClose');
                this.$apply();
            },
            // 筛选列表弹框搜索触发事件
            onSearchOption: function (searchValue) {
                if (this.formKey === 'store') { // 门店
                    this.getCustomerShopData(searchValue);
                }
                if (this.formKey === 'supplier') {
                    this.getSupplierComboBoxData(searchValue);
                }
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
            // 删除信息
            delSales: function (event) {
                // 详情状态不能编辑
                if (this.isDisabled) {
                    return;
                }
                var index = event.currentTarget.dataset.index;
                if (this.salesInfo[index].viewType && this.salesInfo[index].viewType === 'default') {
                    this.discardDetailIdList.push(this.salesInfo[index].id);
                }
                this.salesInfo.splice(index, 1);
                this.$apply();
            },
            // 添加信息
            addSales: function () {
                var projectOrg = this.data.formData.projectOrg;
                var _a = this.data.formOptions, requirementType = _a.requirementType, dispatchType = _a.dispatchType;
                var rtItem = { id: '', name: '' };
                var dtItem = { id: '', name: '' };
                if (requirementType && requirementType.length > 0) {
                    requirementType.forEach(function (item) {
                        if (item.id == '14182400546') { // 默认新店开业
                            rtItem = item;
                        }
                    });
                }
                if (dispatchType && dispatchType.length > 0) {
                    dtItem = dispatchType[0];
                }
                if (!projectOrg.id) {
                    toast_1.default.fail('请先选择立项组织');
                    return false;
                }
                this.salesInfo.push({
                    subOrderNumber: '',
                    store: {
                        id: '',
                        name: ''
                    },
                    isSpecialtyStore: {
                        id: '',
                        name: ''
                    },
                    materialGroup: {
                        id: '',
                        name: '',
                        options: [] // 物料组列表，，，由于每个子单显示列表需要根据各自的门店id获取，列表不同需要区分
                    },
                    disNetworkSize: '',
                    office: {
                        id: '',
                        name: '',
                    },
                    requirementType: {
                        id: rtItem.id,
                        name: rtItem.name
                    },
                    isBrandPark: {
                        id: '',
                        name: ''
                    },
                    dispatchType: {
                        id: dtItem.id,
                        name: dtItem.name
                    },
                    supplier: {
                        id: '',
                        name: ''
                    },
                    costEstimate: 0,
                    completeTime: '',
                    oneYearTargetSales: '',
                    oneYearTargetAmount: '',
                    usePeriod: {
                        minDate: '',
                        maxDate: ''
                    },
                    instruction: '',
                });
                this.$apply();
            },
            // 暂存
            onStorage: function () {
                var _a = _this.data.formData, projectOrg = _a.projectOrg, requirementItem = _a.requirementItem, planProject = _a.planProject, instruction = _a.instruction, attachment = _a.attachment;
                var salesInfo = _this.data.salesInfo;
                var saleInfoList = [];
                if (salesInfo && salesInfo.length > 0) {
                    saleInfoList = salesInfo.map(function (item) {
                        var boothServiceLife = '';
                        if (item.usePeriod.minDate || item.usePeriod.maxDate) {
                            boothServiceLife = item.usePeriod.minDate + '-' + item.usePeriod.maxDate;
                        }
                        return {
                            id: item.id ? item.id : '',
                            exhibitionStandReportId: _this.activeDetail && _this.activeDetail.id ? _this.activeDetail.id : '0',
                            materialGroupId: item.materialGroup.id,
                            customerShopId: item.store.id,
                            customerShopDetailId: item.office.cisDetailId ? item.office.cisDetailId : '',
                            demandTypeId: item.requirementType.id,
                            isBuildBrandPark: item.isBrandPark.id,
                            sendOrderTypeCode: item.dispatchType.id,
                            supplierCode: item.supplier.id,
                            supplierName: item.supplier.name,
                            estimatedCost: item.costEstimate,
                            scheduledFinishTime: item.completeTime,
                            targetSalesValWithinOneYear: item.oneYearTargetSales,
                            targetSalesMoneyWithinOneYear: item.oneYearTargetAmount,
                            remark: item.instruction,
                            boothServiceLife: boothServiceLife,
                            annualSalesScale: item.disNetworkSize //分销商网络规模
                        };
                    });
                }
                var attachs = [];
                attachs = attachment.map(function (item) {
                    return {
                        id: item.id
                    };
                });
                var param = {
                    exhibitionStandDemandReportId: _this.activeDetail && _this.activeDetail.id ? _this.activeDetail.id : '0',
                    exhibitionStandDemandReportCode: "",
                    orgId: projectOrg.id,
                    demandProjectName: requirementItem,
                    planProjectId: planProject.id,
                    description: instruction,
                    attachmentList: attachs,
                    detailVOList: saleInfoList,
                    discardDetailIdList: _this.discardDetailIdList,
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
                var msg = '暂存成功';
                _this.methods.postTmpSave(param).then(function (res) {
                    var payload = res.payload;
                    if (payload.code == '0') {
                        toast_1.default.success({
                            forbidClick: true,
                            duration: 1000,
                            message: msg,
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
            },
            // 提交
            toAddStore: function () {
                var checkResault = _this.methods.checkParam();
                if (checkResault) {
                    _this.approveShow = true;
                }
            },
            // 提交前校验
            checkParam: function () {
                var _a = _this.data.formData, projectOrg = _a.projectOrg, requirementItem = _a.requirementItem, planProject = _a.planProject;
                var salesInfo = _this.data.salesInfo;
                if (!projectOrg.id) {
                    toast_1.default.fail('请选择立项组织');
                    return false;
                }
                if (!requirementItem) {
                    toast_1.default.fail('请填写需求项目名称');
                    return false;
                }
                if (!planProject.id) {
                    toast_1.default.fail('请选择计划项目名称');
                    return false;
                }
                // 可以没有物料；如果有物料，物料组必填且物料组不能重复，
                if (salesInfo && salesInfo.length > 0) {
                    var tip = _this.isEmpty(salesInfo);
                    if (tip) {
                        toast_1.default.fail(tip);
                        return false;
                    }
                }
                else {
                    toast_1.default.fail('请先添加需求子单');
                    return false;
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
                if (this.isDisabled) {
                    return;
                }
                var _a = e.currentTarget.dataset, key = _a.key, index = _a.index;
                this.salesIndex = index;
                this.formKey = key;
                // const minDate = nextDay();
                // const maxDate = '9999-12-31'
                // const { startDate, endDate } = this.formData;
                // // this.currentDateName = key
                // let begin, end;
                // begin = startDate
                // end = endDate
                //
                // if (key.indexOf('startDate') > -1) {
                //   this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                // }
                // if (key.indexOf('endDate') > -1) {
                //   this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
                // }
                this.calendarShow = true;
            },
            // 关闭日历
            closeCalendar: function () {
                this.calendarShow = false;
            },
            // 选择日期
            chooseDay: function (evt) {
                var _a = evt.detail, year = _a.year, month = _a.month, day = _a.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.salesInfo[this.salesIndex][this.formKey] = day;
                this.calendarShow = false;
            },
            // 办事处经理弹框确定并提交
            onApproveConfirm: function () {
                var _this = this;
                var _a = this.data.formData, projectOrg = _a.projectOrg, requirementItem = _a.requirementItem, planProject = _a.planProject, instruction = _a.instruction, attachment = _a.attachment, officeManager = _a.officeManager, reason = _a.reason;
                if (!officeManager.id) {
                    toast_1.default.fail('请选择办事处经理');
                    return false;
                }
                if (!reason) {
                    toast_1.default.fail('请填写申请原因');
                    return false;
                }
                var type = this.data.pageType;
                var salesInfo = this.data.salesInfo;
                var saleInfoList = [];
                if (salesInfo && salesInfo.length > 0) {
                    saleInfoList = salesInfo.map(function (item) {
                        return {
                            id: item.id ? item.id : '',
                            exhibitionStandReportId: _this.activeDetail && _this.activeDetail.id ? _this.activeDetail.id : '0',
                            materialGroupId: item.materialGroup.id,
                            customerShopId: item.store.id,
                            customerShopDetailId: item.office.cisDetailId ? item.office.cisDetailId : '',
                            demandTypeId: item.requirementType.id,
                            isBuildBrandPark: item.isBrandPark.id,
                            sendOrderTypeCode: item.dispatchType.id,
                            supplierCode: item.supplier.id,
                            supplierName: item.supplier.name,
                            estimatedCost: item.costEstimate,
                            scheduledFinishTime: item.completeTime,
                            targetSalesValWithinOneYear: item.oneYearTargetSales,
                            targetSalesMoneyWithinOneYear: item.oneYearTargetAmount,
                            remark: item.instruction,
                            boothServiceLife: item.usePeriod.minDate + '-' + item.usePeriod.maxDate,
                            annualSalesScale: item.disNetworkSize //分销商网络规模
                        };
                    });
                }
                var attachs = [];
                attachs = attachment.map(function (item) {
                    return {
                        id: item.id
                    };
                });
                var param = {
                    exhibitionStandDemandReportId: this.activeDetail && this.activeDetail.id ? this.activeDetail.id : '0',
                    exhibitionStandDemandReportCode: "",
                    orgId: projectOrg.id,
                    demandProjectName: requirementItem,
                    planProjectId: planProject.id,
                    description: instruction,
                    attachmentList: attachs,
                    detailVOList: saleInfoList,
                    discardDetailIdList: this.discardDetailIdList,
                    officeManagerAccountId: officeManager.id,
                    applyReason: reason // 申请原因
                };
                if (!this.isClickable) {
                    return;
                }
                this.isClickable = false;
                toast_1.default.loading({
                    forbidClick: true,
                    duration: 1000,
                    message: '加载中...',
                });
                var msg = '';
                if (type == 'add') { // 新增
                    msg = '新增成功';
                }
                else { // 修改
                    msg = '修改成功';
                }
                this.methods.postFlowStart(param).then(function (res) {
                    var payload = res.payload;
                    if (payload.code == '0') {
                        toast_1.default.success({
                            forbidClick: true,
                            duration: 1000,
                            message: msg,
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
            },
            // 只要关闭办事处经理弹框都会触发
            onApproveClose: function () {
                this.approveShow = false;
                this.$apply();
            },
            // 办事处经理列表筛选并赋值
            onOfficeManagerChange: function (e) {
                var detail = e.detail;
                this.formData.officeManager.name = detail ? detail.trim() : '';
                this.officeMaskShow = true;
                this.getOfficeManagerData(this.formData.officeManager.name);
            },
            onOfficeManagerSelect: function (evt) {
                var item = evt.currentTarget.dataset.item;
                this.formData.officeManager.id = item.id;
                this.formData.officeManager.name = item.name;
                this.officeMaskShow = false;
            },
            officeMaskHide: function () {
                this.formData.officeManager.id = '';
                this.formData.officeManager.name = '';
                this.officeMaskShow = false;
            },
            // 弹出年份日历弹框
            onYearDateOpen: function (e) {
                if (this.isDisabled) {
                    return;
                }
                var _a = e.currentTarget.dataset, key = _a.key, index = _a.index;
                this.salesIndex = index;
                this.formKey = key;
                var cDate = this.salesInfo[this.salesIndex]['usePeriod'][this.formKey];
                if (cDate) {
                    this.currentDate = new Date(cDate, 1, 1).getTime();
                }
                this.yearsVisable = true;
            },
            // 选择年 日历
            onInput: function (e) {
                this.currentDate = e.detail;
            },
            // 年 日历确定
            onConfirm: function (e) {
                var date = new Date(parseInt(e.detail));
                var Y = date.getFullYear();
                this.salesInfo[this.salesIndex]['usePeriod'][this.formKey] = Y;
                this.yearsVisable = false;
            },
            // 年 日历取消
            onCancel: function () {
                this.yearsVisable = false;
            },
        };
        return _this;
    }
    Filter.prototype.isEmpty = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (!arr[i].store.id) {
                return "\u7B2C" + (i + 1) + "\u6761\u9700\u6C42\u5B50\u5355 \u95E8\u5E97 \u4E0D\u80FD\u4E3A\u7A7A";
            }
            if (!arr[i].isSpecialtyStore.id) {
                return "\u7B2C" + (i + 1) + "\u6761\u9700\u6C42\u5B50\u5355 \u662F\u5426\u4E13\u5356\u5E97 \u4E0D\u80FD\u4E3A\u7A7A";
            }
            if (!arr[i].materialGroup.id) {
                return "\u7B2C" + (i + 1) + "\u6761\u9700\u6C42\u5B50\u5355 \u7269\u6599\u7EC4 \u4E0D\u80FD\u4E3A\u7A7A";
            }
            if (!arr[i].office.id) {
                return "\u7B2C" + (i + 1) + "\u6761\u9700\u6C42\u5B50\u5355 \u6240\u5C5E\u529E\u4E8B\u5904 \u4E0D\u80FD\u4E3A\u7A7A";
            }
            if (!arr[i].requirementType.id) {
                return "\u7B2C" + (i + 1) + "\u6761\u9700\u6C42\u5B50\u5355 \u9700\u6C42\u7C7B\u578B \u4E0D\u80FD\u4E3A\u7A7A";
            }
            if (!arr[i].isBrandPark.id) {
                return "\u7B2C" + (i + 1) + "\u6761\u9700\u6C42\u5B50\u5355 \u662F\u5426\u54C1\u724C\u56ED \u4E0D\u80FD\u4E3A\u7A7A";
            }
            if (!arr[i].dispatchType.id) {
                return "\u7B2C" + (i + 1) + "\u6761\u9700\u6C42\u5B50\u5355 \u6D3E\u5355\u7C7B\u578B \u4E0D\u80FD\u4E3A\u7A7A";
            }
            if (arr[i].costEstimate === '') {
                return "\u7B2C" + (i + 1) + "\u6761\u9700\u6C42\u5B50\u5355 \u8D39\u7528\u9884\u4F30 \u4E0D\u80FD\u4E3A\u7A7A";
            }
            if (!arr[i].completeTime) {
                return "\u7B2C" + (i + 1) + "\u6761\u9700\u6C42\u5B50\u5355 \u8981\u6C42\u5B8C\u6210\u65F6\u95F4 \u4E0D\u80FD\u4E3A\u7A7A";
            }
            if (!arr[i].usePeriod.minDate || !arr[i].usePeriod.maxDate) {
                return "\u7B2C" + (i + 1) + "\u6761\u9700\u6C42\u5B50\u5355 \u5C55\u53F0\u4F7F\u7528\u671F\u9650 \u4E0D\u80FD\u4E3A\u7A7A";
            }
            if (arr[i].usePeriod.minDate > arr[i].usePeriod.maxDate) {
                return "\u7B2C" + (i + 1) + "\u6761\u9700\u6C42\u5B50\u5355 \u5C55\u53F0\u4F7F\u7528\u671F\u9650\u7ED3\u675F\u65F6\u95F4\u9700\u5927\u4E8E\u7B49\u4E8E\u5F00\u59CB\u65F6\u95F4";
            }
            if (!arr[i].instruction) {
                return "\u7B2C" + (i + 1) + "\u6761\u9700\u6C42\u5B50\u5355 \u8BF4\u660E \u4E0D\u80FD\u4E3A\u7A7A";
            }
        }
        return false;
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
        var attachs = {
            photo: [],
            documentation: [],
        };
        if (file && file.length) {
            file.forEach(function (item) {
                var obj = __assign({}, item, { id: item.id, name: item.attachName, url: item.attachPath, viewType: 'default' });
                if (index_1.isPicture(item.attachFormat)) {
                    attachs.photo.push(obj);
                }
                else {
                    attachs.documentation.push(obj);
                }
            });
        }
        return attachs;
    };
    // 根据关键字查询海信办事处经理下拉框
    Filter.prototype.getOfficeManagerData = function (searchKeyWord) {
        var _this = this;
        var projectOrg = this.data.formData.projectOrg;
        var salesInfo = this.data.salesInfo;
        var patam = salesInfo.map(function (item) {
            return {
                orgId: projectOrg.id,
                officeId: item.office.id,
                materialGroupIds: item.materialGroup.id,
                searchKeyWords: searchKeyWord // 查询关键字
            };
        });
        this.methods.getOfficeManager(patam).then(function (res) {
            var list = res.payload.list;
            if (list && list.length > 0) {
                list = list.map(function (item) {
                    return __assign({}, item, { id: item.code, name: item.name });
                });
                _this.formOptions.officeManager = list;
            }
            _this.$apply();
        });
    };
    // 获取供应商下拉框
    Filter.prototype.getSupplierComboBoxData = function (searchKeyWord) {
        var _this = this;
        var patam = {
            searchKeyWord: searchKeyWord // 编码或名称关键字
        };
        this.methods.getSupplierComboBox(patam).then(function (res) {
            var data = res.payload.data;
            if (data) {
                data = data.map(function (item) {
                    return __assign({}, item, { id: item.code, name: item.name });
                });
                _this.formOptions.supplier = data;
                _this.currentOptions = _this.formOptions.supplier;
            }
            _this.$apply();
        });
    };
    // 获取需求类型下拉框
    Filter.prototype.getDictData = function () {
        var _this = this;
        var patam = {
            pid: '14182400533'
        };
        this.methods.getDict(patam).then(function (res) {
            var list = res.payload.list;
            if (list) {
                list = list.map(function (item) {
                    return __assign({}, item, { id: item.code, name: item.name });
                });
                _this.formOptions.requirementType = list;
            }
            _this.$apply();
        });
    };
    // 获取派单类型下拉框
    Filter.prototype.getOrderTypeComboBoxData = function () {
        var _this = this;
        this.methods.getOrderTypeComboBox().then(function (res) {
            var data = res.payload.data;
            if (data) {
                data = data.map(function (item) {
                    return __assign({}, item, { id: item.code, name: item.name });
                });
                _this.formOptions.dispatchType = data;
            }
            _this.$apply();
        });
    };
    // 根据门店id、物料组id,1、查询门店所属办事处2、查询分销网络规模
    Filter.prototype.getShopDetailData = function () {
        var _this = this;
        var customerShopId = this.salesInfo[this.salesIndex]['store'].id;
        var materialGroupId = this.salesInfo[this.salesIndex]['materialGroup'].id;
        if (!customerShopId || !materialGroupId) {
            return;
        }
        var param = {
            customerShopId: customerShopId,
            materialGroupId: materialGroupId
        };
        // 根据门店id、物料组id,查询门店所属办事处；只返回一条对象不用选择直接赋值显示即可
        this.methods.getShopDetail(param).then(function (res) {
            var data = res.payload.data;
            if (data) {
                _this.salesInfo[_this.salesIndex]['office'] = __assign({}, data, { cisDetailId: data.cisDetailId, id: data.orgId, name: data.orgName });
            }
            _this.$apply();
        });
        // 根据门店id、物料组id 查询分销网络规模
        this.methods.getDistributeNetworkScale(param).then(function (res) {
            var data = res.payload.data;
            if (data) {
                _this.salesInfo[_this.salesIndex]['disNetworkSize'] = index_1.removeIllegalStr(data.annualSalesScale);
            }
            _this.$apply();
        });
    };
    // 根据立项组织id、门店id查询物料组
    Filter.prototype.getMaterialGroupsData = function () {
        var _this = this;
        var customerShopId = this.salesInfo[this.salesIndex]['store'].id;
        var orgId = this.formData.projectOrg.id;
        if (!customerShopId) {
            return;
        }
        var param = {
            customerShopId: customerShopId,
            orgId: orgId,
        };
        this.methods.getMaterialGroups(param).then(function (res) {
            var data = res.payload.data;
            if (data && data[0] && data[0].params) {
                data[0].params = data[0].params.map(function (item) {
                    return __assign({}, item, { id: item.code, name: item.name });
                });
                _this.salesInfo[_this.salesIndex]['materialGroup'].options = data[0].params;
            }
            _this.$apply();
        });
    };
    // 根据门店id查询是否为专卖店，只返回一条对象不用选择直接赋值显示即可
    Filter.prototype.getIsSpecialShopData = function () {
        var _this = this;
        var customerShopId = this.salesInfo[this.salesIndex]['store'].id;
        if (!customerShopId) {
            return;
        }
        var param = {
            customerShopId: customerShopId,
        };
        this.methods.getIsSpecialShop(param).then(function (res) {
            var data = res.payload.data;
            if (data) {
                _this.salesInfo[_this.salesIndex]['isSpecialtyStore'].id = data.isSpecialShop;
                _this.salesInfo[_this.salesIndex]['isSpecialtyStore'].name = data.isSpecialShopText;
            }
            _this.$apply();
        });
    };
    // 根据立项组织id查询门店列表
    Filter.prototype.getCustomerShopData = function (searchKeyWords) {
        var _this = this;
        var words = searchKeyWords || '';
        var orgId = this.formData.projectOrg.id;
        var param = {
            isSpecialShop: '212400',
            searchKeyWords: words,
            orgId: orgId,
        };
        this.methods.getCustomerShop(param).then(function (res) {
            var data = res.payload.data;
            if (data) {
                data = data.map(function (item) {
                    return __assign({}, item, { id: item.code, name: item.name });
                });
                _this.formOptions.store = data;
                _this.currentOptions = _this.formOptions.store;
            }
            _this.$apply();
        });
    };
    // 获取计划项目名称下拉框列表
    Filter.prototype.getPlanProjectNameComboBoxData = function () {
        var _this = this;
        this.methods.getPlanProjectNameComboBox().then(function (res) {
            var data = res.payload.data;
            if (data && data.length > 0) {
                data = data.map(function (item) {
                    return __assign({}, item, { id: item.code, name: item.name });
                });
                _this.formOptions.planProject = data;
                _this.formData.planProject.name = _this.formOptions.planProject[0].name;
                _this.formData.planProject.id = _this.formOptions.planProject[0].id;
            }
            _this.$apply();
        });
    };
    // 获取立项组织列表
    Filter.prototype.getQueryOrgData = function () {
        var _this = this;
        var param = {
            type: '' // 1:分销，2:直营和代理，3或者不填:全部
        };
        this.methods.getQueryOrg(param).then(function (res) {
            var orgList = res.payload.orgList;
            if (orgList) {
                orgList = orgList.map(function (item) {
                    return __assign({}, item, { id: item.code, name: item.name });
                });
                _this.formOptions.projectOrg = orgList;
            }
            _this.$apply();
        });
    };
    Filter.prototype.viewDataConversion = function (list) {
        var salesInfo = [];
        if (list && list.length > 0) {
            salesInfo = list.map(function (item) {
                return __assign({}, item, { subOrderNumber: item.supplyDetailCode, store: {
                        id: item.custShopInfoDto && item.custShopInfoDto.id,
                        name: item.custShopInfoDto && item.custShopInfoDto.fullName
                    }, isSpecialtyStore: {
                        id: item.custShopInfoDto && item.custShopInfoDto.isSpecialShop,
                        name: item.custShopInfoDto && item.custShopInfoDto.isSpecialShopText
                    }, materialGroup: {
                        id: item.custShopInfoDetailDto && item.custShopInfoDetailDto.baseMatklId,
                        name: item.custShopInfoDetailDto && item.custShopInfoDetailDto.baseMatklName,
                        options: [] // 物料组列表，，，由于每个子单显示列表需要根据各自的门店id获取，列表不同需要区分
                    }, disNetworkSize: index_1.removeIllegalStr(item.annualSalesScale), office: __assign({}, item.custShopInfoDetailDto, { cisDetailId: item.custShopInfoDetailDto && item.custShopInfoDetailDto.id, id: item.custShopInfoDetailDto && item.custShopInfoDetailDto.orgId, name: item.custShopInfoDetailDto && item.custShopInfoDetailDto.orgName }), requirementType: {
                        id: item.supplyType && item.supplyType.id,
                        name: item.supplyType && item.supplyType.propertyName
                    }, isBrandPark: {
                        id: index_1.removeIllegalStr(item.isBuildBrandPark),
                        name: item.isBuildBrandPark == '1' ? '是' : item.isBuildBrandPark == '0' ? '否' : ''
                    }, dispatchType: {
                        id: item.isHeaderUnion,
                        name: item.isHeaderUnionText
                    }, supplier: {
                        id: item.supplierCode,
                        name: item.supplierName
                    }, costEstimate: item.estimatedCost, completeTime: item.finishDate, oneYearTargetSales: item.targetNumber, oneYearTargetAmount: item.targetMoney, usePeriod: {
                        minDate: (item.boothServiceLife && item.boothServiceLife.split('-')[0]) || '',
                        maxDate: (item.boothServiceLife && item.boothServiceLife.split('-')[1]) || ''
                    }, instruction: item.remark, viewType: 'default' });
            });
        }
        return salesInfo;
    };
    // 获取订单详细信息
    Filter.prototype.getDetailsData = function () {
        var _this = this;
        toast_1.default.loading({
            message: '正在加载',
            duration: 2000
        });
        var param = {
            id: this.currId // 展台需求提报单号
        };
        this.methods.getBoothReportDetail(param).then(function (res) {
            toast_1.default.clear();
            var data = res.payload.data;
            if (data) {
                var detail = data;
                _this.activeDetail = detail;
                _this.formData = __assign({}, _this.formData, { projectOrg: {
                        id: detail.orgDto && detail.orgDto.id,
                        name: detail.orgDto && detail.orgDto.name
                    }, requirementItem: detail.projectSupplyName, planProject: {
                        id: detail.projectPlanId,
                        name: detail.projectPlanText
                    }, instruction: detail.remark, attachment: _this.getPictureUrl(detail.attachs).photo, document: _this.getPictureUrl(detail.attachs).documentation });
                _this.salesInfo = _this.viewDataConversion(detail.supplyDetailList);
                if (_this.pageType !== 'detail') {
                    var _loop_1 = function (i) {
                        var param_1 = {
                            customerShopId: _this.salesInfo[i].store.id,
                            orgId: _this.formData.projectOrg.id,
                        };
                        _this.methods.getMaterialGroups(param_1).then(function (res) {
                            var data = res.payload.data;
                            if (data && data[0] && data[0].params) {
                                data[0].params = data[0].params.map(function (item) {
                                    return __assign({}, item, { id: item.code, name: item.name });
                                });
                                _this.salesInfo[i]['materialGroup'].options = data[0].params;
                            }
                            _this.$apply();
                        });
                    };
                    // 每条子单根据门店id获取对应物料组,,,详情页面不用
                    for (var i = 0; i < _this.salesInfo.length; i++) {
                        _loop_1(i);
                    }
                }
            }
            _this.$apply();
        });
    };
    Filter.prototype.onLoad = function (_a) {
        var id = _a.id, type = _a.type;
        this.currId = '';
        if (id) {
            this.currId = id;
        }
        // type='add'->新增；type='edit'->编辑；type='detail'->详情
        if (type) {
            this.pageType = type;
        }
        if (this.pageType === 'add') {
            wx.setNavigationBarTitle({
                title: '展台需求提报新增'
            });
            this.isDisabled = false;
            this.getQueryOrgData();
            this.getPlanProjectNameComboBoxData();
            this.getOrderTypeComboBoxData();
            this.getDictData();
        }
        else if (this.pageType === 'edit') {
            wx.setNavigationBarTitle({
                title: '展台需求提报编辑'
            });
            this.isDisabled = false;
            this.getQueryOrgData();
            this.getPlanProjectNameComboBoxData();
            this.getOrderTypeComboBoxData();
            this.getDictData();
            this.getDetailsData();
        }
        else {
            wx.setNavigationBarTitle({
                title: '展台需求提报详情'
            });
            this.isDisabled = true;
            this.getDetailsData();
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
            getBoothReportDetail: store_1.getBoothReportDetail,
            getQueryOrg: store_1.getQueryOrg,
            getPlanProjectNameComboBox: store_1.getPlanProjectNameComboBox,
            getCustomerShop: store_1.getCustomerShop,
            getMaterialGroups: store_1.getMaterialGroups,
            getShopDetail: store_1.getShopDetail,
            getOrderTypeComboBox: store_1.getOrderTypeComboBox,
            getIsSpecialShop: store_1.getIsSpecialShop,
            getDict: store_1.getDict,
            getSupplierComboBox: store_1.getSupplierComboBox,
            postFlowStart: store_1.postFlowStart,
            getOfficeManager: store_1.getOfficeManager,
            postTmpSave: store_1.postTmpSave,
            getDistributeNetworkScale: store_1.getDistributeNetworkScale,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/terminal/booth-report/add/index'));

