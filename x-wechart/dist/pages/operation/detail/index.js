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
var system_1 = require('./../../../mixins/system.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var index_2 = require('./../../../components/user-operation/custom-pop/index.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var order_1 = require('./../../../store/actions/order.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_3 = require('./../../../utils/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '',
            navigationStyle: 'custom',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-loading': '../../../components/vant/loading/index',
                'van-circle': '../../../components/vant/circle/index',
                'img': '../../../components/img/index',
                'van-steps': '../../../components/vant/steps/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "class": "empty-box" }, "customPop": { "xmlns:v-on": "" } };
        _this.$events = { "customPop": { "v-on:onConfirm": "onConfirm" } };
        _this.components = {
            emptyDataType: index_1.default,
            customPop: index_2.default,
        };
        _this.mixins = [system_1.default];
        _this.data = {
            scrollTop: -1,
            filterForm: {
                terms: {},
                page: {
                    pageNo: 1,
                    pageSize: 10,
                    totalPage: 0,
                },
            },
            imgObj: {
                'opeBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719489_9dc7d354266c43418f0a4e6b2dcb65e7.png',
                'girl': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719470_7a0b141e99a7428f926d6ab72dd9a6be.png',
                'boy': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719470_cb1353c22eea4c82b55614da60c6e5cf.png',
                'v1': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719547_5d96d88d4e7546c5bfcb264619138a6f.png',
                'v2': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719546_480a61ece00549dbabd496ba420774c4.png',
                'v3': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719547_03c839f9027748129c5bb8e6d4b00fd1.png',
                'v4': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719547_c56053fcc0cd4b7aa8eb2c887cbdd916.png',
                'v5': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719550_673d9f0af4b54c0db7198cc3e64da0b0.png',
                'more': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719470_84a1661d8f534418a3867bd0033bb1f6.png',
                'follow': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719470_ca174251190a4e86a395044306d9e78a.png',
                'houseType': 'http://3s-static.hisense.com/wechat/1/14722429883/1656488647900_21c6cb1cca7841fcb614a4870bd2ea4a.png',
                'texting': 'http://3s-static.hisense.com/wechat/1/14722429883/1657096257276_309df05e81b8495995b501ffbc38d6cd.png',
                'callUp': 'http://3s-static.hisense.com/wechat/1/14722429883/1657096257246_ab632670c45342f193f6f67eee4f823a.png',
            },
            tabBarActive: 'XSJH',
            tabBarList: [
                { id: 'XSJH', name: '销售机会' },
                { id: 'XXZL', name: '详细资料' },
                { id: 'GMJL', name: '购买记录' },
                { id: 'SHJL', name: '售后记录' },
            ],
            purchaseHistoryActive: 1,
            details: {
                baseInfo: {},
                customerDetails: [],
                salesOpportunity: [],
                purchaseHistory: [],
                afterSalesRecords: [],
            },
            detailId: '',
            customPopTip: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 返回上一级
            goback: function () {
                wx.navigateBack();
            },
            // 切换tab
            changeTab: function (item) {
                if (this.tabBarActive === item.id) {
                    return;
                }
                this.tabBarActive = item.id;
                this.filterForm.page.pageNo = 1;
                this.filterForm.page.totalPage = 0;
                this.methods.scrollToTop();
                this.loadCurrentTabList();
            },
            // 显示隐藏操作按钮
            showHandle: function (event) {
                var _a = event.currentTarget.dataset, index = _a.index, key = _a.key;
                if (key === 'baseInfo') {
                    var show = this.details.baseInfo.show;
                    this.details.baseInfo.show = !show;
                }
                else {
                    var show = this.details[key][index].show;
                    this.details[key][index].show = !show;
                    this.details[key] = this.details[key].map(function (item, idx) {
                        if (idx != index) {
                            item.show = false;
                        }
                        return item;
                    });
                }
            },
            // 编辑销售机会
            salesOpportunityEdit: function (event) {
                var _a = event.currentTarget.dataset, type = _a.type, id = _a.id;
                var itemId = id;
                var detailId = this.detailId;
                wx.navigateTo({
                    url: "/pages/operation/edit-sales-opportunity/index?id=" + detailId + "&itemId=" + itemId + "&type=" + type
                });
            },
            // 删除销售机会
            salesOpportunityDelete: function (index) {
                this.currIndex = index;
                this.customPopTip = '确认删除销售机会?';
                this.$invoke('customPop', 'showPopup');
            },
            // 确定删除
            onConfirm: function () {
                var _this = this;
                if (this.tabBarActive === 'XSJH') { // 销售机会
                    this.methods.delShopPotentialProduct({
                        id: this.details.salesOpportunity[this.currIndex].id
                    }).then(function (res) {
                        var _a = res.payload, code = _a.code, msg = _a.msg;
                        if (code == 0) {
                            toast_1.default.success('删除成功！');
                            _this.details.salesOpportunity.splice(_this.currIndex, 1);
                        }
                        else {
                            toast_1.default.fail(msg);
                        }
                        _this.$apply();
                    });
                }
                if (this.tabBarActive === 'XXZL') { // 详细资料
                    this.methods.delShopPotentialUserDetail({
                        id: this.details.customerDetails[this.currIndex].id
                    }).then(function (res) {
                        var _a = res.payload, code = _a.code, msg = _a.msg;
                        if (code == 0) {
                            toast_1.default.success('删除成功！');
                            _this.details.customerDetails.splice(_this.currIndex, 1);
                        }
                        else {
                            toast_1.default.fail(msg);
                        }
                        _this.$apply();
                    });
                }
                this.$invoke('customPop', 'hidePopup');
                this.$apply();
            },
            // 详细资料，编辑基本信息
            baseInfoEdit: function () {
                var id = this.detailId;
                wx.navigateTo({
                    url: "/pages/operation/edit-base-info/index?id=" + id
                });
            },
            // 详细资料，编辑全屋家电
            goEditHouseAppliances: function (event) {
                var item = event.currentTarget.dataset.item;
                var id = this.detailId;
                var itemId = item.id;
                wx.navigateTo({
                    url: "/pages/operation/edit-house-appliances/index?id=" + id + "&itemId=" + itemId
                });
            },
            // 详细资料，新增全屋家电
            goAddHouseAppliances: function () {
                var id = this.detailId;
                wx.navigateTo({
                    url: "/pages/operation/add-house-appliances/index?id=" + id
                });
            },
            // 删除全屋家电
            goDelHouseAppliances: function (event) {
                var _a = event.currentTarget.dataset, item = _a.item, index = _a.index;
                var name = item.community || item.address || '';
                this.currIndex = index;
                this.customPopTip = "\u786E\u8BA4\u5220\u9664" + name + "\u5168\u5C4B\u5BB6\u7535\u4FE1\u606F\uFF1F";
                this.$invoke('customPop', 'showPopup');
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
                    this.loadCurrentTabList();
                }
            },
            // 获取意向用户详情
            getShopPotentialUserDetailInfo: function () {
                _this.methods.getShopPotentialUserDetail({
                    userId: _this.detailId
                }).then(function (res) {
                    var data = res.payload.data;
                    _this.details.baseInfo = data;
                    if (_this.details.baseInfo && _this.details.baseInfo.phone) {
                        var reg = /(\d{3})\d{4}(\d{4})/;
                        _this.details.baseInfo.phoneZH = _this.details.baseInfo.phone.replace(reg, "$1****$2");
                    }
                    _this.$apply();
                });
            },
            // 打电话
            call: function (event) {
                var item = event.currentTarget.dataset.item;
                if (item && item.phone) {
                    wx.makePhoneCall({
                        phoneNumber: item.phone
                    });
                }
            }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // tab切换获取对应明细列表
    Filter.prototype.loadCurrentTabList = function () {
        if (this.tabBarActive === 'XSJH') { // 销售机会
            this.getShopPotentialProductInfo();
        }
        if (this.tabBarActive === 'XXZL') { // 详细资料
            this.getShopPotentialHourseInfo();
        }
        if (this.tabBarActive === 'GMJL') { // 购买记录
            this.getShopPotentialBuyRecordInfo();
        }
        if (this.tabBarActive === 'SHJL') { // 售后记录
            this.getShopPotentialAfterSalesInfo();
        }
    };
    // 售后记录
    Filter.prototype.getShopPotentialAfterSalesInfo = function () {
        var _this = this;
        this.methods.getShopPotentialAfterSales({
            userId: this.detailId
        }).then(function (res) {
            var _a = res.payload, list = _a.list, totalPages = _a.totalPages, currentPage = _a.currentPage;
            _this.filterForm.page.totalPage = totalPages;
            var activityList = list || [];
            if (currentPage > 1) {
                _this.details.afterSalesRecords = _this.details.afterSalesRecords.concat(activityList);
            }
            else {
                _this.details.afterSalesRecords = activityList;
            }
            _this.$apply();
        });
    };
    // 购买记录
    Filter.prototype.getShopPotentialBuyRecordInfo = function () {
        var _this = this;
        this.methods.getShopPotentialBuyRecord({
            userId: this.detailId
        }).then(function (res) {
            var _a = res.payload, list = _a.list, totalPages = _a.totalPages, currentPage = _a.currentPage;
            _this.filterForm.page.totalPage = totalPages;
            var activityList = list || [];
            if (currentPage > 1) {
                _this.details.purchaseHistory = _this.details.purchaseHistory.concat(activityList);
            }
            else {
                _this.details.purchaseHistory = activityList;
            }
            _this.$apply();
        });
    };
    // 销售机会
    Filter.prototype.getShopPotentialProductInfo = function () {
        var _this = this;
        this.methods.getShopPotentialProduct({
            userId: this.detailId,
            pageSize: this.filterForm.page.pageSize,
            pageNo: this.filterForm.page.pageNo,
        }).then(function (res) {
            var _a = res.payload, list = _a.list, totalPages = _a.totalPages, currentPage = _a.currentPage;
            list = list.map(function (item) {
                if (item.type === '套购' && item.detailList && item.detailList.length > 0) {
                    item.detailList = item.detailList.map(function (product) {
                        product.categoryPicture = index_3.getGreenCategoryPictures(product.spartId);
                        return product;
                    });
                }
                if (item.type !== '套购' && item.detailList && item.detailList.length > 0) {
                    item.detailList = item.detailList.map(function (product) {
                        product.categoryPicture = index_3.getBlueCategoryPictures(product.spartId);
                        return product;
                    });
                }
                return item;
            });
            _this.filterForm.page.totalPage = totalPages;
            var activityList = list || [];
            if (currentPage > 1) {
                _this.details.salesOpportunity = _this.details.salesOpportunity.concat(activityList);
            }
            else {
                _this.details.salesOpportunity = activityList;
            }
            _this.$apply();
        });
    };
    // 潜在客户明细
    Filter.prototype.getShopPotentialHourseInfo = function () {
        var _this = this;
        this.methods.getShopPotentialHourse({
            userId: this.detailId,
            pageSize: this.filterForm.page.pageSize,
            pageNo: this.filterForm.page.pageNo,
        }).then(function (res) {
            var _a = res.payload, list = _a.list, totalPages = _a.totalPages, currentPage = _a.currentPage;
            list = list.map(function (item) {
                item.show = false;
                if (item.hourseProductDtoList) {
                    item.hourseProductDtoList = item.hourseProductDtoList.map(function (product) {
                        product.categoryPicture = index_3.getBlueCategoryPictures(product.spartId);
                        return product;
                    });
                }
                return item;
            });
            _this.filterForm.page.totalPage = totalPages;
            var activityList = list || [];
            if (currentPage > 1) {
                _this.details.customerDetails = _this.details.customerDetails.concat(activityList);
            }
            else {
                _this.details.customerDetails = activityList;
            }
            _this.$apply();
        });
    };
    Filter.prototype.onShow = function () {
        this.filterForm.page.pageNo = 1;
        this.filterForm.page.totalPage = 0;
        this.methods.scrollToTop();
        this.loadCurrentTabList();
    };
    Filter.prototype.onLoad = function (_a) {
        var id = _a.id, tabBarActive = _a.tabBarActive;
        this.detailId = id;
        if (tabBarActive) {
            this.tabBarActive = tabBarActive;
        }
        this.methods.getShopPotentialUserDetailInfo();
    };
    Filter = __decorate([
        wepy_redux_1.connect({}, {
            getShopPotentialHourse: order_1.getShopPotentialHourse,
            getShopPotentialUserDetail: order_1.getShopPotentialUserDetail,
            getShopPotentialProduct: order_1.getShopPotentialProduct,
            getShopPotentialBuyRecord: order_1.getShopPotentialBuyRecord,
            getShopPotentialAfterSales: order_1.getShopPotentialAfterSales,
            delShopPotentialProduct: order_1.delShopPotentialProduct,
            delShopPotentialUserDetail: order_1.delShopPotentialUserDetail,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/operation/detail/index'));

