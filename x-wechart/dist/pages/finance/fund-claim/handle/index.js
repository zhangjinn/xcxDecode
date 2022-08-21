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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var fund_claim_1 = require('./../../../../store/actions/fund-claim.js');
var fund_claim_2 = require('./../../../../store/actions/fund-claim.js');
var request_1 = require('./../../../../utils/request.js');
var ramda_1 = require('./../../../../npm/ramda/src/index.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var Fundrendetail = /** @class */ (function (_super) {
    __extends(Fundrendetail, _super);
    function Fundrendetail() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.config = {
            navigationBarTitleText: '认领处理',
            usingComponents: {
                'van-rate': '../../../../components/vant/rate/index',
                'van-icon': '../../../../components/vant/icon/index',
                'van-toast': '../../../../components/vant/toast/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-picker': '../../../../components/vant/picker/index',
                'van-tab': '../../../../components/vant/tab/index',
                'van-tabs': '../../../../components/vant/tabs/index',
                'van-field': '../../../../components/vant/field/index',
                'van-loading': '../../../../components/vant/loading/index',
                'van-stepper': '../../../../components/vant/stepper/index',
                'van-cell-group': '../../../../components/vant/cell-group/index',
                'van-button': '../../../../components/vant/button/index',
                'van-uploader': '../../../../components/vant/uploader/index',
                'img': '../../../../components/img/index'
            }
        };
        _this_1.data = {
            handle_show: false,
            interval: '',
            bussinessMan: {
                orgCode: '',
                maktlName: '',
                matklCode: ''
            },
            postData: {
                method: 'getNoticeBill',
                params: {
                    id: ''
                }
            },
            detailList: {},
            FundClaimHandleList: {
                method: 'genClaimBill',
                params: {
                    header: {
                        bizdate: '2020-10-09',
                        noticebillid: '',
                        hifi_registercom: '',
                        e_remark: ''
                    },
                    entrys: [{
                            hifi_agency: '',
                            hifi_e_product: '',
                            hifi_debeitrange: '',
                            e_receivableamt: '',
                            e_saleman: ''
                            // e_remark:"qw"
                        }]
                }
            },
            fileList: [],
            fileBlobList: [],
            handleId: '',
            info: [{ hifi_agency: '', hifi_e_product: '', hifi_debeitrange: '', e_receivableamt: '', e_saleman: '' }],
            infoPost: [{ hifi_agency: '', hifi_e_product: '', hifi_debeitrange: '', e_receivableamt: '', e_saleman: '' }],
            filter: {
                itemFxmap: [],
                suppliers: [],
                bussines: [],
                business_manager: []
            },
            filterIndex: 0,
            number: '',
            distributorsPopup: false,
            // distributorsPopupName: '全部',
            popupName: '',
            // deliveryPopupName: '全部',
            filterForm: {
                _loading: true,
                pageNo: 1,
                orgId: '',
                fxId: '',
                trans: '',
                managerId: ''
            },
            baseUrl: request_1.baseUrl,
            subflag: false,
        };
        // 页面内交互写在methods里
        _this_1.methods = {
            beforeRead: function () {
                console.log('beforeRead');
                toast_1.default.loading({
                    message: '上传中...',
                    forbidClick: true,
                    duration: 20 * 1000
                });
                self.$apply();
            },
            afterRead: function (event) {
                var self = _this_1;
                var fileName = '' + parseInt(Math.random() * 1000) + event.detail.name;
                if (fileName.indexOf('.') < 0) {
                    fileName = fileName + '.png';
                }
                var filePath = event.detail.file.path;
                console.log('afterRead', filePath);
                wx.getFileSystemManager().readFile({
                    filePath: filePath,
                    encoding: 'base64',
                    success: function (res) {
                        var base64 = 'data:image/png;base64,' + res.data;
                        self.fileBlobList.push({ name: fileName, content: base64 });
                        self.FundClaimHandleList.params.attachs = self.fileBlobList;
                        self.fileList.push({
                            url: filePath,
                            name: fileName,
                            deletable: true
                        });
                        console.log('jiekou:成功：', base64);
                        self.$apply();
                        toast_1.default.clear();
                        console.log();
                    },
                    fail: function (err) {
                        console.log(err);
                        console.log('jiekou:失败：');
                        self.$apply();
                        toast_1.default.clear();
                    }
                });
                //以下两行注释的是同步方法，不过我不太喜欢用。
                //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64')
                //console.log(base64)
                // wx.request({
                //   url: filePath,
                //   method: 'GET',
                //   responseType: 'arraybuffer',
                //   success: (res) => {
                //     console.log('jiekou:成功：',res)
                //     let base64 = wx.arrayBufferToBase64(res.data)
                //     self.fileBlobList.push({ name: fileName, url: base64 })
                //     this.FundClaimHandleList.params.attachs = self.fileBlobList
                //     self.fileList.push(
                //       {
                //         url: filePath,
                //         name: fileName,
                //         deletable: true
                //       })
                //     console.log('jiekou:成功：',base64)
                //     Toast.clear()
                //   },
                //   fail: function (err) {
                //     console.log(err)
                //     console.log('jiekou:失败：')
                //     Toast.clear()
                //   }
                // })
            },
            delImg: function (event) {
                _this_1.fileBlobList.splice(event.detail.index, 1);
                _this_1.fileList.splice(event.detail.index, 1);
                _this_1.FundClaimHandleList.params.attachs = _this_1.fileBlobList;
            },
            setInputValue: function (e) {
                var obj = e.detail;
                if (obj != '' && obj.substr(0, 1) == '.') {
                    obj = '';
                }
                obj = obj.replace(/\.{2,}/g, '.'); //只保留第一个. 清除多余的
                obj = obj.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
                obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
                if (obj.indexOf('.') < 0 && obj != '') { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    if (obj.substr(0, 1) == '0' && obj.length == 2) {
                        obj = obj.substr(1, obj.length);
                    }
                }
                var index = e.currentTarget.dataset.index; //数组下标
                var tag = e.currentTarget.dataset.tag; //字段名称
                var info = _this_1.info;
                var infoPost = _this_1.infoPost;
                // info[index][tag] = parseFloat(obj)  //赋值
                info[index][tag] = obj; //赋值
                // infoPost[index][tag] = parseFloat(obj)  //赋值
                infoPost[index][tag] = obj; //赋值
                _this_1.setData({
                    info: info,
                    infoPost: infoPost
                });
            },
            handleAdd: function () {
                var info = _this_1.info;
                var infoPost = _this_1.infoPost;
                var detail = { hifi_agency: '', hifi_e_product: '', hifi_debeitrange: '', e_receivableamt: '', e_saleman: '' };
                var detail2 = { hifi_agency: '', hifi_e_product: '', hifi_debeitrange: '', e_receivableamt: '', e_saleman: '' };
                info.push(detail);
                infoPost.push(detail2);
                _this_1.setData({
                    info: info,
                    infoPost: infoPost
                });
            },
            handleDel: function (e) {
                var that = _this_1;
                var index = e.currentTarget.dataset.index;
                var info = _this_1.info;
                var infoPost = _this_1.infoPost;
                var lengthA = 1;
                var arrayLength = info.length;
                if (arrayLength > lengthA) {
                    info = that.data.info.splice(index, 1);
                    infoPost = that.data.infoPost.splice(index, 1);
                    // that.setData({
                    //   details: info
                    // })
                }
                else {
                    wx.showToast({
                        icon: 'none',
                        title: '必须填写一项'
                    });
                }
            },
            goPage: function (url) {
                _this_1.navigator({ link: { url: url } });
            },
            //选择交易模式
            selectDelivery: function (key, e) {
                ramda_1.forEach(function (item) {
                    if (item.key == key) {
                        // this.deliveryPopupName = item.value
                        _this_1.filterForm = __assign({}, _this_1.filterForm, { trans: item.key });
                        var index = _this_1.filterIndex;
                        var tag = e.currentTarget.dataset.tag; //字段名称
                        var info = _this_1.info;
                        var infoPost = _this_1.infoPost;
                        info[index][tag] = item.value;
                        infoPost[index][tag] = item.key;
                        _this_1.setData({
                            info: info,
                            infoPost: infoPost
                        });
                    }
                }, _this_1.filter.bussines);
                _this_1.distributorsPopup = false;
            },
            // 选择业务员
            onSelectManager: function (key, e) {
                var _this_1 = this;
                ramda_1.forEach(function (item) {
                    if (item.key == key) {
                        // this.deliveryPopupName = item.value
                        _this_1.filterForm = __assign({}, _this_1.filterForm, { managerId: item.key });
                        var index = _this_1.filterIndex;
                        var tag = e.currentTarget.dataset.tag; //字段名称
                        var info = _this_1.info;
                        var infoPost = _this_1.infoPost;
                        info[index][tag] = item.value;
                        infoPost[index][tag] = item.key;
                        _this_1.setData({
                            info: info,
                            infoPost: infoPost
                        });
                    }
                }, this.filter.business_manager);
                this.distributorsPopup = false;
            },
            selectagentPopup: function () {
                _this_1.distributorsPopup = false;
            },
            //办事处选择
            onSelectDistributors: function (key, e) {
                ramda_1.forEach(function (item) {
                    if (item.key == key) {
                        _this_1.filterForm = __assign({}, _this_1.filterForm, { fxId: item.key });
                        var index = _this_1.filterIndex;
                        var tag = e.currentTarget.dataset.tag; //字段名称
                        var info = _this_1.info;
                        var infoPost = _this_1.infoPost;
                        info[index][tag] = item.value;
                        infoPost[index][tag] = item.key;
                        _this_1.setData({
                            info: info,
                            infoPost: infoPost
                        });
                    }
                }, _this_1.filter.itemFxmap);
                _this_1.distributorsPopup = false;
                _this_1.bussinessMan.orgCode = _this_1.filterForm.fxId;
            },
            //物料组选择
            onSelectOrg: function (key, e) {
                _this_1.filter.suppliers.forEach(function (item) {
                    if (item.key == key) {
                        _this_1.filterForm = __assign({}, _this_1.filterForm, { orgId: item.key });
                        var index = _this_1.filterIndex;
                        var tag = e.currentTarget.dataset.tag;
                        var info = _this_1.info;
                        var infoPost = _this_1.infoPost;
                        info[index][tag] = item.value;
                        infoPost[index][tag] = item.key;
                        _this_1.setData({
                            info: info,
                            infoPost: infoPost
                        });
                        _this_1.bussinessMan.maktlName = item.value;
                        _this_1.bussinessMan.matklCode = item.key;
                        _this_1.methods.getBussiness();
                    }
                });
                _this_1.distributorsPopup = false;
            },
            // 选择办事处、物料组、交易模式
            selectPopup: function (name, e) {
                var tag = e.currentTarget.dataset.tag;
                var index = _this_1.filterIndex = e.currentTarget.dataset.index;
                var key = -1;
                if (name == 'suppliers') {
                    _this_1.popupName = '办事处';
                    for (var _i = 0, _a = _this_1.filter.itemFxmap; _i < _a.length; _i++) {
                        var item1 = _a[_i];
                        if (item1.value == _this_1.info[index][tag]) {
                            key = item1.key;
                            break;
                        }
                    }
                    _this_1.filterForm.fxId = key;
                }
                else if (name == 'distributors') {
                    _this_1.popupName = '物料组';
                    for (var _b = 0, _c = _this_1.filter.suppliers; _b < _c.length; _b++) {
                        var item2 = _c[_b];
                        if (item2.value == _this_1.info[index][tag]) {
                            key = item2.key;
                            break;
                        }
                    }
                    _this_1.filterForm.orgId = key;
                }
                else if (name == 'delivery') {
                    _this_1.popupName = '信贷范围';
                    for (var _d = 0, _e = _this_1.filter.bussines; _d < _e.length; _d++) {
                        var item3 = _e[_d];
                        if (item3.value == _this_1.info[index][tag]) {
                            key = item3.key;
                            break;
                        }
                    }
                    _this_1.filterForm.trans = key;
                }
                else if (name == 'business_manager') {
                    _this_1.popupName = '业务员';
                    for (var _f = 0, _g = _this_1.filter.business_manager; _f < _g.length; _f++) {
                        var item4 = _g[_f];
                        if (item4.value == _this_1.info[index][tag]) {
                            key = item4.key;
                            break;
                        }
                    }
                    _this_1.filterForm.managerId = key;
                }
                _this_1.distributorsPopup = !_this_1.distributorsPopup;
                _this_1.$apply();
            },
            viewDetail: function (e) {
                if (e) {
                    wx.navigateTo({
                        url: "/pages/me/distribution-order-detail/index?id=" + e
                    });
                }
            },
            // 提交按钮
            postHandleData: function () {
                var obj = this.infoPost[0];
                var isSuccess = false;
                for (var item in obj) {
                    if (!obj[item]) {
                        wx.showToast({
                            icon: 'none',
                            title: '请完善数据'
                        });
                        return false;
                    }
                    else {
                        isSuccess = true;
                    }
                }
                if (isSuccess) {
                    this.FundClaimHandleList.params.entrys = this.infoPost;
                    // console.log(JSON.stringify(this.FundClaimHandleList));
                    this.methods.postHandle();
                }
            },
            // 发送数据方法
            postHandle: function () {
                var _this = _this_1;
                _this.subflag = true;
                fund_claim_1.postFundClaimHandle(_this_1.FundClaimHandleList, function (res) {
                    if (res.data.success) {
                        wx.showToast({
                            icon: 'none',
                            title: '提交成功',
                            duration: 1500,
                            success: function () {
                                _this.interval = setTimeout(function () {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                }, 1500);
                            }
                        });
                    }
                    else {
                        wx.showToast({
                            icon: 'none',
                            title: res.data.message,
                            duration: 3000
                        });
                    }
                    _this.subflag = false;
                });
            },
            getDetailMethod: function () {
                var _this = _this_1;
                var toast = toast_1.default.loading({
                    forbidClick: true,
                    message: '加载中'
                });
                fund_claim_1.getFundClaimDetail(_this_1.postData, function (res) {
                    if (res.data.success) {
                        _this.detailList = res.data.data;
                        _this.handle_show = true;
                        _this.$apply();
                        toast_1.default.clear();
                    }
                });
                _this_1.filter.itemFxmap = [];
                _this_1.filter.suppliers = [];
                _this_1.filter.bussines = [];
                fund_claim_2.getFundClaimAgency(_this_1.postData, _this_1.bussinessMan.orgCode, function (res) {
                    console.log('res', res);
                    // if(res.data.success){
                    var agency_data = JSON.parse(res.data.orgData);
                    for (var _i = 0, agency_data_1 = agency_data; _i < agency_data_1.length; _i++) {
                        var item = agency_data_1[_i];
                        var obj = {};
                        obj.key = item.orgCode;
                        obj.value = item.name;
                        _this.filter.itemFxmap.push(obj);
                    }
                    var maktl_data = JSON.parse(res.data.maktlData);
                    for (var _a = 0, maktl_data_1 = maktl_data; _a < maktl_data_1.length; _a++) {
                        var item = maktl_data_1[_a];
                        var obj = {};
                        obj.key = item.matklCode;
                        obj.value = item.matklName;
                        _this.filter.suppliers.push(obj);
                    }
                    var business_data = JSON.parse(res.data.baseData);
                    for (var _b = 0, business_data_1 = business_data; _b < business_data_1.length; _b++) {
                        var item = business_data_1[_b];
                        var obj = {};
                        obj.key = item.code;
                        obj.value = item.name;
                        _this.filter.bussines.push(obj);
                    }
                    _this.$apply();
                    // }
                });
            },
            getBussiness: function () {
                var _this = _this_1;
                fund_claim_2.getFundClaimBussiness(_this_1.bussinessMan, function (res) {
                    console.log(res);
                    var business_manager = res.data;
                    for (var _i = 0, business_manager_1 = business_manager; _i < business_manager_1.length; _i++) {
                        var item = business_manager_1[_i];
                        var obj = {};
                        obj.key = item.personCode;
                        obj.value = item.personName;
                        _this.filter.business_manager.push(obj);
                    }
                    _this.$apply();
                });
            }
        };
        return _this_1;
    }
    Fundrendetail.prototype.onLoad = function (e) {
        console.log(e);
        this.postData.params.id = e.id;
        this.FundClaimHandleList.params.header.noticebillid = e.id;
        this.FundClaimHandleList.params.header.hifi_registercom = e.salenum;
        this.bussinessMan.orgCode = e.salenum;
        this.FundClaimHandleList.params.header.e_remark = '收' + e.name + '贷款';
        this.$apply();
    };
    Fundrendetail.prototype.onShow = function () {
        clearTimeout(this.data.interval);
        this.methods.getDetailMethod();
    };
    return Fundrendetail;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Fundrendetail , 'pages/finance/fund-claim/handle/index'));

