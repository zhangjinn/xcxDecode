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
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var index_1 = require('./../../../../utils/index.js');
var index_2 = require('./../../../components/popup-customize/index.js');
var activityare_1 = require('./../../../../store/actions/activityare.js');
var record_1 = require('./../../../../store/actions/record.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '代理商市场活动核销',
            usingComponents: {
                'van-toast': '../../../../components/vant/toast/index',
                "van-field": "../../../../components/vant/field/index",
                "van-cell": "../../../../components/vant/cell/index",
                'van-uploader': '../../../../components/vant/uploader/index',
                "van-icon": "../../../../components/vant/icon/index",
                'van-popup': '../../../../components/vant/popup/index',
                'van-dialog': '../../../../components/vant/dialog/index',
                'calendar': '../../../../components/calendar/index',
                "van-datetime-picker": "../../../../components/vant/datetime-picker/index",
                'van-search': '../../../../components/vant/search/index',
                'van-tab': '../../../../components/vant/tab/index',
                'van-tabs': '../../../../components/vant/tabs/index',
                'van-stepper': '../../../../components/vant/stepper/index',
            },
        };
        _this.data = {
            yearsVisable: false,
            maxDate: new Date(2100, 10, 1).getTime(),
            currentDate: new Date().getTime(),
            minDate: new Date(2000, 10, 1).getTime(),
            isClickable: true,
            popTitle: '',
            currentOptions: [],
            popSelectedOption: {},
            isSearch: false,
            multiple: false,
            formData: {
                marketCenter: {
                    id: '',
                    name: ''
                },
                office: {
                    id: '',
                    name: ''
                },
                timeStart: '',
                agent: {
                    id: '',
                    name: ''
                },
                theme: '',
                place: '',
                target: '',
                startDate: '',
                endDate: '',
                distributor: {
                    id: [],
                    name: []
                },
                totalInput: '',
                // activityReal: 0, // 活动实际销售额(万元)
                activityChannelReal: '',
                activityShopReal: '',
                realTotalMoney: 0,
                adCompany: '',
                officeManager: {
                    id: '',
                    name: ''
                },
                reason: '',
                experienceSharing: [] // 附件
            },
            marketCenterOptions: [],
            officeOptions: [],
            agentOptions: [],
            distributorOptions: [],
            materialGroupOptions: [],
            officeManagerOptions: [],
            formKey: '',
            tabActive: 'category',
            tabList: [
                { title: '参与品类', key: 'category', },
                { title: '物料', key: 'materials', },
                { title: '媒体宣传', key: 'media', },
                { title: '临促', key: 'prompt', },
                { title: '赠品', key: 'giveaway', },
                { title: 'TO小B费用', key: 'bFee', },
                { title: '其他', key: 'other', },
            ],
            tabInfoItem: {
                category: {
                    items: []
                },
                materials: {
                    totalNum: 0,
                    totalAmount: 0,
                    items: []
                },
                media: {
                    totalNum: 0,
                    totalAmount: 0,
                    items: []
                },
                prompt: {
                    totalNum: 0,
                    totalAmount: 0,
                    items: []
                },
                giveaway: {
                    totalNum: 0,
                    totalAmount: 0,
                    items: []
                },
                bFee: {
                    totalNum: 0,
                    totalAmount: 0,
                    items: []
                },
                other: {
                    totalNum: 0,
                    totalAmount: 0,
                    items: []
                },
            },
            materialIndex: 0,
            currId: '',
            activeDetail: {},
            deleteAttachs: [],
            delDetails: [],
        };
        _this.$repeat = {};
        _this.$props = { "popupCustomize": { "xmlns:v-bind": "", "v-bind:options.sync": "currentOptions", "v-bind:selectedOption.sync": "popSelectedOption", "v-bind:title.sync": "popTitle", "v-bind:multiple.sync": "multiple", "v-bind:isSearch.sync": "isSearch", "xmlns:v-on": "" } };
        _this.$events = { "popupCustomize": { "v-on:onSelect": "chooseOption", "v-on:onSearch": "onSearchOption" } };
        _this.components = {
            popupCustomize: index_2.default,
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 切换视图
            tabChange: function (e) {
                var index = e.detail.index;
                this.tabActive = this.tabList[index].key;
                this.$apply();
            },
            // 改变视图输入框触发事件并赋值
            onTabFilterFormChange: function (evt) {
                var detail = evt.detail, _a = evt.currentTarget.dataset, key = _a.key, index = _a.index;
                // bug:  触发两次
                if (typeof detail === 'undefined') {
                    return;
                }
                this.tabInfoItem[this.tabActive].items[index][key] = detail;
                // 参与品类价格计算
                if (key === 'writeOffAmount') {
                    var writeOffTotalAmount_1 = 0;
                    this.tabInfoItem[this.tabActive].items.forEach(function (item) {
                        writeOffTotalAmount_1 = index_1.addNum(writeOffTotalAmount_1, item.writeOffAmount);
                    });
                    // 合计金额 = 每一项小计相加
                    this.tabInfoItem[this.tabActive].totalAmount = writeOffTotalAmount_1;
                    return;
                }
                // 参与品类除外价格计算
                if (key === 'num' || key === 'price') {
                    // 小计 = 数量 * 单价
                    var num = this.tabInfoItem[this.tabActive].items[index].num;
                    var price = this.tabInfoItem[this.tabActive].items[index].price;
                    this.tabInfoItem[this.tabActive].items[index].total = index_1.mulNum(num, price);
                    var totalNum_1 = 0;
                    var totalAmount_1 = 0;
                    this.tabInfoItem[this.tabActive].items.forEach(function (item) {
                        totalNum_1 += Number(item.num);
                        totalAmount_1 = index_1.addNum(totalAmount_1, item.total);
                    });
                    // 合计数量 = 每一项数量相加
                    this.tabInfoItem[this.tabActive].totalNum = totalNum_1;
                    // 合计金额 = 每一项小计相加
                    this.tabInfoItem[this.tabActive].totalAmount = totalAmount_1;
                }
                if (key === 'realNum' || key === 'realPrice') {
                    // 实际小计 = 实际数量 * 实际单价
                    var realNum = this.tabInfoItem[this.tabActive].items[index].realNum;
                    var realPrice = this.tabInfoItem[this.tabActive].items[index].realPrice;
                    this.tabInfoItem[this.tabActive].items[index].realTotal = index_1.mulNum(realNum, realPrice);
                    var realTotalNum_1 = 0;
                    var realTotalAmount_1 = 0;
                    this.tabInfoItem[this.tabActive].items.forEach(function (item) {
                        realTotalNum_1 += Number(item.realNum);
                        realTotalAmount_1 = index_1.addNum(realTotalAmount_1, item.realTotal);
                    });
                    // 实际合计数量 = 每一项实际数量相加
                    this.tabInfoItem[this.tabActive].realTotalNum = realTotalNum_1;
                    // 实际合计金额 = 每一项实际小计相加
                    this.tabInfoItem[this.tabActive].realTotalAmount = realTotalAmount_1;
                }
                this.$apply();
            },
            // 改变表单输入框触发事件并赋值
            onFilterFormChange: function (evt) {
                var _a;
                var detail = evt.detail, _b = evt.currentTarget.dataset, key = _b.key, index = _b.index;
                this.formData = __assign({}, this.formData, (_a = {}, _a[key] = detail, _a));
            },
            // 弹出年月日历选择框
            onDatePopOpen: function (e) {
                var key = e.currentTarget.dataset.key;
                this.formKey = key;
                this.yearsVisable = true;
            },
            // 选择年月日历
            onInput: function (e) {
                this.currentDate = e.detail;
            },
            // 年月日历确定
            onConfirm: function (e) {
                var date = new Date(parseInt(e.detail));
                var Y = date.getFullYear();
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                this.formData[this.formKey] = Y + '-' + M;
                this.yearsVisable = false;
            },
            // 年月日历取消
            onCancel: function () {
                this.yearsVisable = false;
            },
            // 打开筛选列表弹框
            onPopOpen: function (e) {
                var _a = e.currentTarget.dataset, name = _a.name, key = _a.key, index = _a.index;
                this.isSearch = false; // 选择弹框列表是否可搜索
                this.multiple = false; // 选择弹框列表是否多选
                this.popTitle = name; // 选择弹框标题
                this.formKey = key;
                if (this.formKey === 'marketCenter') { // 营销中心
                    this.currentOptions = this.marketCenterOptions;
                    this.popSelectedOption = this.formData[this.formKey];
                }
                else if (this.formKey === 'office') { // 办事处
                    this.currentOptions = this.officeOptions;
                    this.popSelectedOption = this.formData[this.formKey];
                }
                else if (this.formKey === 'agent') { // 活动承接代理(运营)商
                    this.isSearch = true;
                    this.currentOptions = this.agentOptions;
                    this.popSelectedOption = this.formData[this.formKey];
                }
                else if (this.formKey === 'distributor') { // 参与分销商
                    this.multiple = true;
                    this.currentOptions = this.distributorOptions;
                    this.popSelectedOption = this.formData[this.formKey];
                }
                else if (this.formKey === 'officeManager') { //办事处经理
                    this.isSearch = true;
                    this.currentOptions = this.officeManagerOptions;
                    this.popSelectedOption = this.formData[this.formKey];
                }
                else if (this.formKey === 'materialGroup') { // 物料组
                    this.currentOptions = this.materialGroupOptions;
                    this.materialIndex = index;
                    this.popSelectedOption = this.tabInfoItem[this.tabActive].items[this.materialIndex].materialGroup;
                }
                this.$invoke('popupCustomize', 'onShow');
                this.$apply();
            },
            // 选择对应列表项并赋值
            chooseOption: function (item) {
                if (this.multiple) {
                    var oIndex = this.formData[this.formKey].id.indexOf(item.id);
                    if (oIndex > -1) {
                        this.formData[this.formKey].id.splice(oIndex, 1);
                        this.formData[this.formKey].name.splice(oIndex, 1);
                    }
                    else {
                        this.formData[this.formKey].id.push(item.id);
                        this.formData[this.formKey].name.push(item.name);
                    }
                }
                else {
                    if (this.formKey === 'materialGroup') {
                        this.tabInfoItem[this.tabActive].items[this.materialIndex].materialGroup.id = item.id;
                        this.tabInfoItem[this.tabActive].items[this.materialIndex].materialGroup.name = item.name;
                    }
                    else {
                        this.formData[this.formKey].id = item.id;
                        this.formData[this.formKey].name = item.name;
                    }
                    this.$invoke('popupCustomize', 'onClose');
                }
                this.$apply();
            },
            // 筛选列表弹框搜索触发事件
            onSearchOption: function (searchValue) {
                if (this.formKey === 'officeManager') { // 办事处经理
                    this.getUsersData(searchValue);
                }
            },
            // 删除图片
            deleteImg: function (event) {
                var key = event.currentTarget.dataset.key;
                var index = event.detail.index;
                if (this.formData[key][index].viewType && this.formData[key][index].viewType === 'default') {
                    this.deleteAttachs.push(this.formData[key][index].id);
                }
                this.formData[key].splice(index, 1);
                this.$apply();
            },
            //上传图片
            afterRead: function (event) {
                this.selImg(event.detail.file.path, event.currentTarget.dataset.key);
            },
            // 删除信息
            deleteItem: function (event) {
                var index = event.currentTarget.dataset.index;
                if (this.tabInfoItem[this.tabActive].items[index].viewType && this.tabInfoItem[this.tabActive].items[index].viewType === 'default') {
                    this.delDetails.push(this.tabInfoItem[this.tabActive].items[index].id);
                }
                this.tabInfoItem[this.tabActive].items.splice(index, 1);
                this.$apply();
            },
            // 添加信息
            keepAdding: function () {
                var pushItem = {};
                if (this.tabActive === 'category') {
                    if (!this.formData.agent.id) {
                        toast_1.default.fail('请先选择活动承接代理(运营)商');
                        return false;
                    }
                    pushItem = {
                        materialGroup: {
                            id: '',
                            name: ''
                        },
                    };
                }
                else {
                    pushItem = {
                        num: 0,
                        price: 0,
                        remark: "",
                        total: 0,
                        type: "",
                    };
                }
                this.tabInfoItem[this.tabActive].items.push(pushItem);
                this.$apply();
            },
            // 提交
            toAddStore: function () {
                var checkResault = _this.methods.checkParam();
                if (checkResault) {
                    var _a = _this.data.formData, marketCenter = _a.marketCenter, office = _a.office, timeStart = _a.timeStart, agent = _a.agent, theme = _a.theme, place = _a.place, target = _a.target, distributor = _a.distributor, totalInput = _a.totalInput, adCompany = _a.adCompany, officeManager = _a.officeManager, reason = _a.reason, experienceSharing = _a.experienceSharing, realTotalMoney = _a.realTotalMoney, activityReal = _a.activityReal, startDate = _a.startDate, endDate = _a.endDate, activityChannelReal = _a.activityChannelReal, activityShopReal = _a.activityShopReal;
                    var _b = _this.data.tabInfoItem, category = _b.category, materials = _b.materials, media = _b.media, prompt = _b.prompt, giveaway = _b.giveaway, bFee = _b.bFee, other = _b.other;
                    var attachs = [];
                    attachs = experienceSharing.map(function (item) {
                        return {
                            id: item.id
                        };
                    });
                    var productLineDtoList = [];
                    productLineDtoList = category.items.map(function (item) {
                        return __assign({}, item, { matklId: item.materialGroup.id, matklName: item.materialGroup.name, writeOffAmount: item.writeOffAmount });
                    });
                    var param = {
                        id: _this.currId,
                        marketCenterId: marketCenter.id,
                        orgId: office.id,
                        applyMonth: timeStart,
                        custInfoId: agent.id,
                        activityTheme: theme,
                        activityPlace: place,
                        activityTarget: target,
                        fxCust: distributor.id,
                        totalMoney: totalInput,
                        realTotalMoney: realTotalMoney,
                        // activityReal: activityReal,//活动实际销售额（万元）（可编辑）
                        applyStartTime: startDate,
                        applyEndTime: endDate,
                        activityChannelReal: activityChannelReal,
                        activityShopReal: activityShopReal,
                        adCompany: adCompany,
                        bscManager: officeManager.id,
                        content: reason,
                        attachs: attachs,
                        productLineDtoList: productLineDtoList,
                        matklDtoList: _this.viewDataToParams(materials),
                        mediaDtoList: _this.viewDataToParams(media),
                        tempDtoList: _this.viewDataToParams(prompt),
                        giftDtoList: _this.viewDataToParams(giveaway),
                        tobDtoList: _this.viewDataToParams(bFee),
                        otherDtoList: _this.viewDataToParams(other),
                        deleteAttachs: _this.deleteAttachs,
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
                    _this.methods.saveWriteFlowStart(param).then(function (res) {
                        var payload = res.payload;
                        if (payload.data && payload.data == 'success') {
                            toast_1.default.success({
                                forbidClick: true,
                                duration: 1000,
                                message: '核销成功',
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
                var _a = _this.data.formData, marketCenter = _a.marketCenter, office = _a.office, timeStart = _a.timeStart, agent = _a.agent, theme = _a.theme, place = _a.place, target = _a.target, totalInput = _a.totalInput, adCompany = _a.adCompany, officeManager = _a.officeManager, reason = _a.reason, realTotalMoney = _a.realTotalMoney, activityReal = _a.activityReal;
                if (!marketCenter.id) {
                    toast_1.default.fail('请选择营销中心');
                    return false;
                }
                if (!office.id) {
                    toast_1.default.fail('请选择办事处');
                    return false;
                }
                if (!timeStart) {
                    toast_1.default.fail('请选择申请活动时间');
                    return false;
                }
                if (!agent.id) {
                    toast_1.default.fail('请选择活动承接代理(运营)商');
                    return false;
                }
                if (!theme) {
                    toast_1.default.fail('请填写活动主题');
                    return false;
                }
                if (!place) {
                    toast_1.default.fail('请填写活动地点');
                    return false;
                }
                if (target === '') {
                    toast_1.default.fail('请填写活动目标(万元)');
                    return false;
                }
                // if (activityReal === '') {
                //   Toast.fail('请填写活动实际销售额(万元)')
                //   return false
                // }
                if (totalInput === '') {
                    toast_1.default.fail('请填写各项投入合计(元)');
                    return false;
                }
                if (realTotalMoney === '') {
                    toast_1.default.fail('请填写实际投入金额(元)');
                    return false;
                }
                if (!adCompany) {
                    toast_1.default.fail('请填写待制作广告公司');
                    return false;
                }
                if (!officeManager.id) {
                    toast_1.default.fail('请选择办事处经理');
                    return false;
                }
                if (!reason) {
                    toast_1.default.fail('请填写活动申请原因');
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
        };
        return _this;
    }
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
        if (file && file.length) {
            photo = file.map(function (item) {
                return __assign({}, item, { id: item.id, name: item.attachName, url: item.attachPath, viewType: 'default' });
            });
        }
        return photo;
    };
    // 获取办事处经理列表
    Filter.prototype.getUsersData = function (searchStr) {
        var _this = this;
        var param = {
            searchStr: searchStr || ''
        };
        this.methods.getUsers(param).then(function (res) {
            var categoryList = [];
            if (res.payload && res.payload.data) {
                categoryList = res.payload.data.map(function (item) {
                    return __assign({}, item, { id: item.code, name: item.name });
                });
            }
            _this.officeManagerOptions = categoryList;
            _this.currentOptions = _this.officeManagerOptions;
            _this.$apply();
        });
    };
    // 视图列表传参字段转换
    Filter.prototype.viewDataToParams = function (list) {
        var target = [];
        if (list && list.items && list.items.length > 0) {
            target = list.items.map(function (item) {
                return __assign({}, item, { num: item.num || 0, price: item.price || 0, remark: item.remark, total: item.total || 0, type: item.type, realNum: item.realNum, realPrice: item.realPrice, realTotal: item.realTotal });
            });
        }
        return target;
    };
    // 获取详情视图列表渲染字段转换
    Filter.prototype.viewDataConversion = function (list, type) {
        if (type && type === 'category') {
            var target_1 = {
                totalNum: 0,
                totalAmount: 0,
                items: []
            };
            if (list && list.length > 0) {
                target_1.items = list.map(function (item) {
                    return __assign({}, item, { materialGroup: {
                            id: item.matklId,
                            name: item.matklName,
                        }, writeOffAmount: item.writeOffAmount || 0, viewType: 'default' });
                });
                target_1.items.forEach(function (item) {
                    target_1.totalAmount = index_1.addNum(target_1.totalAmount, item.writeOffAmount);
                });
                target_1.totalNum = target_1.items.length;
            }
            return target_1;
        }
        else {
            var target_2 = {
                totalNum: 0,
                totalAmount: 0,
                realTotalNum: 0,
                realTotalAmount: 0,
                items: []
            };
            if (list && list.length > 0) {
                target_2.items = list.map(function (item) {
                    return __assign({}, item, { num: item.num || 0, price: item.price || 0, remark: item.remark, total: item.total || 0, realNum: item.realNum || 0, realPrice: item.realPrice || 0, realTotal: item.realTotal || 0, type: item.type, viewType: 'default' });
                });
                target_2.items.forEach(function (item) {
                    target_2.totalNum += Number(item.num);
                    target_2.totalAmount = index_1.addNum(target_2.totalAmount, item.total);
                    target_2.realTotalNum += Number(item.realNum);
                    target_2.realTotalAmount = index_1.addNum(target_2.realTotalAmount, item.realTotal);
                });
            }
            return target_2;
        }
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
        this.methods.getAgentActivityById(param).then(function (res) {
            toast_1.default.clear();
            var data = res.payload.data;
            if (data) {
                var detail = data;
                _this.activeDetail = detail;
                _this.formData = __assign({}, _this.formData, { marketCenter: {
                        id: detail.marketCenterId,
                        name: detail.marketCenterName
                    }, office: {
                        id: detail.orgId,
                        name: detail.orgName
                    }, timeStart: detail.applyMonth, agent: {
                        id: detail.custInfoId,
                        name: detail.custInfoName
                    }, theme: detail.activityTheme, place: detail.activityPlace, target: detail.activityTarget, startDate: detail.applyStartTime, endDate: detail.applyEndTime, activityChannelReal: detail.activityChannelReal, activityShopReal: detail.activityShopReal, distributor: {
                        id: detail.fxCust && detail.fxCust[0] ? detail.fxCust[0].split(',') : [],
                        name: detail.fxCustName ? detail.fxCustName.split(',') : []
                    }, totalInput: detail.totalMoney, adCompany: detail.adCompany, officeManager: {
                        id: '',
                        name: ''
                    }, reason: detail.content, experienceSharing: _this.getPictureUrl(detail.attachs) // 附件
                 });
                _this.tabInfoItem = {
                    category: _this.viewDataConversion(detail.productLineDtoList, 'category'),
                    materials: _this.viewDataConversion(detail.matklDtoList),
                    media: _this.viewDataConversion(detail.mediaDtoList),
                    prompt: _this.viewDataConversion(detail.tempDtoList),
                    giveaway: _this.viewDataConversion(detail.giftDtoList),
                    bFee: _this.viewDataConversion(detail.tobDtoList),
                    other: _this.viewDataConversion(detail.otherDtoList),
                };
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
        this.getDetailsData();
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            regins: function (_a) {
                var record = _a.record;
                return record.regins;
            }
        }, {
            uploadImg: record_1.uploadImg,
            getUsers: activityare_1.getUsers,
            saveWriteFlowStart: activityare_1.saveWriteFlowStart,
            getAgentActivityById: activityare_1.getAgentActivityById,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/activity/agency-activity/off/index'));

