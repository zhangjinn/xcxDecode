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
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var index_1 = require('./../../../components/goodsHeader/index.js');
var index_2 = require('./../../../components/empty-data-type/index.js');
var system_1 = require('./../../../mixins/system.js');
var search_1 = require('./../../../store/actions/search.js');
var classification_1 = require('./../../../store/actions/classification.js');
var search_2 = require('./../../../store/types/search.js');
var search_3 = require('./../../../store/types/search.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '',
            navigationStyle: 'custom',
            usingComponents: {
                'van-rate': '../../../components/vant/rate/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-search': '../../../components/vant/search/index',
                'van-tab': '../../../components/vant/tab/index',
                'van-tabs': '../../../components/vant/tabs/index',
                'img': '../../../components/img/index',
                'van-loading': '../../../components/vant/loading/index',
                'item': '../../../components/list-item/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {} };
        _this.$events = {};
        _this.components = {
            header: index_1.default,
            emptyDataType: index_2.default,
        };
        _this.watch = {
            loadingInfo: function () {
                var _this = this;
                this.searchList.forEach(function (element, i) {
                    if (_this.searchList[i].isFenXiao != "Y") { //海信
                        var data = {
                            orgId: _this.searchList[i].orgId,
                            code: _this.searchList[i].productCode,
                            queryType: 'purchase',
                        };
                        search_1.getSearchStock(data, function (res) {
                            var _a = res.data[0], inventory = _a.inventory, sharedInv = _a.sharedInv;
                            if (_this.searchList[i]) {
                                _this.searchList[i]['inventory'] = inventory;
                                _this.searchList[i]['sharedInv'] = sharedInv;
                            }
                            _this.$apply();
                        });
                    }
                    else { //渠道
                        var productCodeArr = [];
                        productCodeArr.push(_this.searchList[i].productCode);
                        var data = {
                            orgId: _this.searchList[i].orgId,
                            productCodes: productCodeArr,
                            supplierCode: _this.searchList[i].agentCisCode,
                        };
                        search_1.getDmsGoodsInventory(data, function (res) {
                            var _a = res.data.data[0], invQty = _a.invQty, gicInvQty = _a.gicInvQty;
                            if (_this.searchList[i]) {
                                _this.searchList[i]['invQty'] = invQty;
                                _this.searchList[i]['gicInvQty'] = gicInvQty;
                            }
                            _this.$apply();
                        });
                    }
                });
                if (this.loadingInfo.price) {
                    this.methods.getSearchPrice(this.loadingInfo.price);
                }
                // TODO: 获取dms价格
                if (this.loadingInfo.loadingDms) {
                    this.methods.getFilterDmsGoodsPrice({ orgId: this.loadingInfo.loadingDms.orgId, productId: this.loadingInfo.loadingDms.productId });
                }
            }
        };
        // 声明
        _this.data = {
            key: '',
            visible: false,
            statusBarHeight: '',
            // 回到顶部
            visibelTop: false,
            scrollTop: -1,
            filterIndex: 0,
            filterSale: 0,
            sortField: '',
            sortType: '',
            onOpen: false,
            onOpenMatk: false,
            searchstatuspopup: '',
            dmssearchstatuspopup: '',
            pageNo: 1,
            type: '',
            checkMainPrice: false,
            purchaseTypeOptions: [
                {
                    key: 1,
                    value: '应急采购',
                    status: false
                },
                {
                    key: 2,
                    value: '常规采购',
                    status: false
                }
            ],
            purchaseTypePopup: ''
        };
        _this.mixins = [system_1.default];
        // 页面内交互写在methods里
        _this.methods = {
            isGetSearchStock: function (data) {
                search_1.getSearchStock(data, function (res) {
                    console.log(res);
                });
            },
            onScroll: function (event) {
                if (event.detail.scrollTop >= 350) {
                    _this.visibelTop = true;
                    if (_this.scrollTop === 0) {
                        _this.scrollTop = event.detail.scrollTop;
                    }
                }
                else {
                    _this.visibelTop = false;
                }
            },
            onPullBottom: function () {
                var index = _this.currentPage + 1;
                if (index < _this.totalPages || index == _this.totalPages) {
                    _this.pageNo = index;
                    _this.methods.getSearch(index);
                }
            },
            dmssearchSelect: function (key) {
                _this.dmsmatklList.forEach(function (element) {
                    if (element.key == key) {
                        element.searchstatus = !element.searchstatus;
                    }
                });
                var item = ramda_1.find(ramda_1.propEq('key', key))(_this.dmsmatklList);
                _this.methods.dmsselectedsearchSelect(item);
            },
            dmsselectedsearchSelect: function (arr) {
                if (arr.length <= 0) {
                    return;
                }
                var attrs = _this.dmsmatklList.filter(function (item) {
                    return item.searchstatus === true;
                });
                var searchstatuspopup = attrs.map(function (item) { return item.value; });
                _this.dmssearchstatuspopup = searchstatuspopup.join(',');
            },
            dmsOrgsearchSelect: function (key) {
                _this.dmsOrgList.forEach(function (element) {
                    if (element.key == key) {
                        element.searchstatus = !element.searchstatus;
                    }
                });
                var item = ramda_1.find(ramda_1.propEq('key', key))(_this.dmsOrgList);
                _this.methods.dmsOrgselectedsearchSelect(item);
            },
            dmsOrgselectedsearchSelect: function (arr) {
                if (arr.length <= 0) {
                    return;
                }
                var attrs = _this.dmsOrgList.filter(function (item) {
                    return item.searchstatus === true;
                });
                var searchstatuspopup = attrs.map(function (item) { return item.value; });
                _this.searchstatuspopup = searchstatuspopup.join(',');
            },
            searchSelect: function (key) {
                _this.specialfilters.fwOrgsGroupMap.forEach(function (element) {
                    if (element.key == key) {
                        element.searchstatus = !element.searchstatus;
                    }
                });
                var item = ramda_1.find(ramda_1.propEq('key', key))(_this.specialfilters.fwOrgsGroupMap);
                _this.methods.selectedsearchSelect(item);
            },
            selectedsearchSelect: function (arr) {
                if (arr.length <= 0) {
                    return;
                }
                var attrs = _this.specialfilters.fwOrgsGroupMap.filter(function (item) {
                    return item.searchstatus === true;
                });
                var searchstatuspopup = attrs.map(function (item) { return item.value; });
                _this.searchstatuspopup = searchstatuspopup.join(',');
            },
            // 筛选条件
            chageSort: function (e) {
                var id = e.currentTarget.dataset.id;
                if (id == '0') {
                    _this.filterIndex = 0;
                    _this.sortField = '';
                    _this.sortType = '';
                    _this.filterSale = 0;
                }
                else if (id == '1') {
                    _this.filterIndex = 1;
                    _this.sortField = 'onlineDate';
                    _this.sortType = '';
                    _this.filterSale = 0;
                }
                else if (id == '2') {
                    _this.filterIndex = 2;
                    _this.sortField = '';
                    if (_this.filterSale == 0) {
                        _this.filterSale = 1;
                        _this.sortField = 'sale';
                        _this.sortType = 'asc';
                    }
                    else if (_this.filterSale == 1) {
                        _this.filterSale = 2;
                        _this.sortField = 'sale';
                        _this.sortType = 'desc';
                    }
                    else if (_this.filterSale == 2) {
                        _this.filterSale = 1;
                        _this.sortField = 'sale';
                        _this.sortType = 'asc';
                    }
                }
                wepy_redux_1.getStore().dispatch({ type: search_2.RESET_SEARCH_LIST, payload: [] });
                _this.methods.getSearch();
            },
            resetSearch: function () {
                _this.searchstatuspopup = '',
                    _this.dmssearchstatuspopup = '';
                _this.checkMainPrice = false;
                if (_this.specialfilters.fwOrgsGroupMap) {
                    _this.specialfilters.fwOrgsGroupMap.map(function (res) {
                        if (res.searchstatus) {
                            res.searchstatus = false;
                        }
                    });
                }
                if (_this.dmsOrgList && _this.dmsOrgList.length > 0) {
                    _this.dmsOrgList.map(function (res) {
                        if (res.searchstatus) {
                            res.searchstatus = false;
                        }
                    });
                }
                if (_this.dmsmatklList && _this.dmsmatklList.length > 0) {
                    _this.dmsmatklList.map(function (res) {
                        if (res.searchstatus) {
                            res.searchstatus = false;
                        }
                    });
                }
            },
            confirmSearch: function () {
                _this.pageNo = 1;
                _this.visible = !_this.visible;
                _this.methods.scrollToTop();
                _this.methods.getSearch();
            },
            goNext: function (e) {
                var url = e.currentTarget.dataset.url;
                wx.navigateTo({
                    url: url
                });
            },
            // 运营商开关
            onOpen: function () {
                _this.onOpen = !_this.onOpen;
            },
            // 物料组开关
            onOpenMatk: function () {
                _this.onOpenMatk = !_this.onOpenMatk;
            },
            openDrawer: function () {
                if (_this.user && _this.user.organizationList) {
                    _this.user.organizationList.forEach(function (res) {
                        if (_this.specialfilters && _this.specialfilters.fwOrgsGroupMap) {
                            _this.specialfilters.fwOrgsGroupMap.forEach(function (s) {
                                if (res.organizationName == s.value) {
                                    s.relkey = res.organizationCode;
                                }
                            });
                        }
                    });
                }
                _this.visible = !_this.visible;
                if (_this.orgIds) {
                    _this.orgIds.forEach(function (res) {
                        if (_this.specialfilters && _this.specialfilters.fwOrgsGroupMap) {
                            _this.specialfilters.fwOrgsGroupMap.forEach(function (e) {
                                if (e.key == res) {
                                    e.filter = false;
                                }
                            });
                        }
                    });
                }
            },
            // 返回上一级
            goback: function () {
                var route = getCurrentPages();
                var url = route[0].route;
                wx.switchTab({
                    url: "../../../" + url
                });
            },
            // 回到顶部
            scrollToTop: function () {
                _this.visibelTop = false;
                _this.scrollTop = 0;
            },
            goCollection: function () {
                wx.navigateTo({
                    url: '/pages/goods/collection/index'
                });
            },
            // 添加/取消收藏
            getSearch: function (number) {
                if (!number) {
                    number = 1;
                }
                var orgId = '';
                var matklCodes = '';
                var purchaseType = '';
                if (_this.type == '2') {
                    if (_this.specialfilters.fwOrgsGroupMap) {
                        _this.specialfilters.fwOrgsGroupMap.map(function (res) {
                            if (res.searchstatus) {
                                orgId = res.relkey + ',' + orgId;
                            }
                        });
                    }
                }
                else {
                    if (_this.dmsOrgList) {
                        _this.dmsOrgList.map(function (res) {
                            if (res.searchstatus) {
                                orgId = res.key + ',' + orgId;
                            }
                        });
                    }
                }
                if (_this.dmsmatklList && _this.user && _this.user.fxPartInfo && _this.user.fxPartInfo.length > 0) {
                    _this.dmsmatklList.map(function (res) {
                        if (res.searchstatus) {
                            matklCodes = res.key + ',' + matklCodes;
                        }
                    });
                }
                _this.purchaseTypeOptions.map(function (res) {
                    if (res.status) {
                        purchaseType = res.key + ',' + purchaseType;
                    }
                });
                orgId = orgId.substring(0, orgId.length - 1);
                matklCodes = matklCodes.substring(0, matklCodes.length - 1);
                purchaseType = purchaseType.substring(0, purchaseType.length - 1);
                _this.methods.getSearchList({
                    _loading: true,
                    type: _this.type,
                    keyword: _this.key,
                    pageNum: number,
                    orgId: orgId,
                    matklCodes: matklCodes,
                    sortField: _this.sortField,
                    sortType: _this.sortType,
                    havePrice: _this.checkMainPrice ? 1 : 0,
                    // 1:应急 2:常规 3:应急+常规
                    purchaseType: purchaseType.indexOf(",") >= 0 ? '3' : purchaseType
                });
            },
            imgLose: function (_a) {
                var detail = _a.detail;
                wepy_redux_1.getStore().dispatch({ type: search_2.RESET_SEARCH_IMG, payload: detail });
            },
            toggleCollection: function (_a) {
                var detail = _a.detail;
                wepy_redux_1.getStore().dispatch({ type: search_3.TOGGLE_SEARCH_COLLECTION, payload: detail });
            },
            onCheckMainPrice: function () {
                _this.checkMainPrice = !_this.checkMainPrice;
            },
            // 采购类型选中
            selectedPurchaseType: function (key) {
                _this.purchaseTypeOptions.forEach(function (res) {
                    if (res.key == key) {
                        res.status = !res.status;
                    }
                });
                var item = ramda_1.find(ramda_1.propEq('key', key))(_this.purchaseTypeOptions);
                _this.methods.selectedPurchaseTypePopup(item);
            },
            selectedPurchaseTypePopup: function (arr) {
                if (arr.length <= 0) {
                    return;
                }
                var attrs = _this.purchaseTypeOptions.filter(function (item) {
                    return item.status === true;
                });
                _this.specialfilters.classificationpopup = attrs.map(function (item) { return item.value; });
                _this.purchaseTypePopup = _this.specialfilters.classificationpopup.join(',');
            }
        };
        return _this;
    }
    Filter.prototype.onShow = function () {
        this.methods.getSearch();
        this.methods.grtFilterItemGroup({ catalogId: '', type: this.type });
    };
    Filter.prototype.onLoad = function (key) {
        var q = key.q;
        if (q == "undefined") {
            q = '';
        }
        this.key = q;
        // this.methods.getSearch()
        this.methods.getSpecialFilters();
        var zyPartInfo = wepy_1.default.$instance.globalData.zyPartInfo;
        var fxPartInfo = wepy_1.default.$instance.globalData.fxPartInfo;
        if (zyPartInfo.length > 0 && fxPartInfo.length > 0) {
            this.type = '';
        }
        else if (zyPartInfo.length == 0 && fxPartInfo.length > 0) {
            this.type = '1';
        }
        else if (fxPartInfo.length == 0 && zyPartInfo.length > 0) {
            this.type = '2';
        }
        else {
            this.type = '';
        }
        this.$apply();
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            searchList: function (_a) {
                var search = _a.search;
                return search.search;
            },
            dmsmatklList: function (_a) {
                var search = _a.search;
                return search.dmsmatklList;
            },
            dmsOrgList: function (_a) {
                var search = _a.search;
                return search.dmsOrgList;
            },
            totalPages: function (_a) {
                var search = _a.search;
                return search.totalPages;
            },
            currentPage: function (_a) {
                var search = _a.search;
                return search.currentPage;
            },
            orgIds: function (_a) {
                var search = _a.search;
                return search.orgIds;
            },
            specialfilters: function (_a) {
                var classification = _a.classification;
                return classification.specialfilters;
            },
            loadingInfo: function (_a) {
                var search = _a.search;
                return search.loadingInfo;
            },
            user: function (_a) {
                var user = _a.user;
                return user;
            }
        }, {
            getSearchList: search_1.getSearchList,
            getSpecialFilters: classification_1.getSpecialFilters,
            getSearchStock: search_1.getSearchStock,
            getDmsGoodsInventory: search_1.getDmsGoodsInventory,
            getSearchPrice: search_1.getSearchPrice,
            grtFilterItemGroup: search_1.grtFilterItemGroup,
            getFilterDmsGoodsPrice: search_1.getFilterDmsGoodsPrice
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/goods/filter/index'));

