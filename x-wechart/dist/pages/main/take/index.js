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
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var index_1 = require('./../../../components/goodsHeader/index.js');
var index_2 = require('./../../../components/empty-data-type/index.js');
var system_1 = require('./../../../mixins/system.js');
var common_1 = require('./../../../mixins/common.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var classification_1 = require('./../../../store/actions/classification.js');
var goods_1 = require('./../../../store/actions/goods.js');
var user_1 = require('./../../../store/actions/user.js');
var index_3 = require('./../../../utils/index.js');
var classification_2 = require('./../../../store/types/classification.js');
var classification_3 = require('./../../../store/types/classification.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var request_1 = require('./../../../utils/request.js');
var width = wx.getMenuButtonBoundingClientRect().width;
var Take = /** @class */ (function (_super) {
    __extends(Take, _super);
    function Take() {
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
                'van-row': '../../../components/vant/row/index',
                'van-col': '../../../components/vant/col/index',
                'van-tabs': '../../../components/vant/tabs/index',
                'van-radio': '../../../components/vant/radio/index',
                'van-radio-group': '../../../components/vant/radio-group/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-field': '../../../components/vant/field/index',
                'van-loading': '../../../components/vant/loading/index',
                'van-stepper': '../../../components/vant/stepper/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'img': '../../../components/img/index',
                'item': '../../../components/list-item/index',
                'container': '../../../components/container/index',
                'no-permission': '../../../components/no-permission/index',
            },
        };
        _this.data = {
            dmsmatklListPopup: '',
            dmscategoryIndex: 0,
            specialProcurement: false,
            projectstatus: 1,
            projectcode: '',
            projectname: '',
            // 供应商
            servicesVisible: true,
            statusBarHeight: '',
            menuWidth: width,
            visible: false,
            // 回到顶部
            visibelTop: false,
            scrollTop: -1,
            // 显隐开关
            category: false,
            engineeringZone: true,
            specialZone: true,
            buyoutZone: true,
            customZone: true,
            // popup控制
            index: 0,
            Suppliersextend: false,
            Itemgroupextend: false,
            categoryid: '1',
            dmscategoryId: '1',
            normalfiltering: '',
            totalPrice: 0,
            isCheckAll: false,
            onselectArr: [],
            // 普通分类物料组id
            classificationpopupid: '',
            classificationpopup: '',
            specialpopup: '',
            productGrouppopup: '',
            categoryIndex: 0,
            specialprojectstatus: 2,
            onspecialProjectcodeChange: '',
            onspecialProjectnameChange: '',
            onspecialProjectChange: '',
            buyoutstatus: 'begin',
            onBuyoutProjectcodeChange: '',
            onBuyoutProjectnameChange: '',
            pageNo: 1,
            fill: false,
            onNumber: 0,
            notLogin: false,
            selectItemNumber: 0,
            onPopupItemNomber: '',
            onPopupItemName: '专区采购',
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
            purchaseTypePopup: '',
            goodModelAll: [],
            goodModelMatkls: [],
            goodModelSelect: '',
            goodModelList: [],
            conditonShow: true,
            vans: [
                { label: '电视' },
                { label: '空调' },
                { label: '冰箱' },
                { label: '手机' },
                { label: '洗衣机' },
                { label: '冷柜' },
                { label: '厨卫' }
            ],
            showProduct: [],
            isPermission: false,
            isTab: false,
            zoneButtonShowArr: [],
            generalZonePermissions: false,
            freeShippingTip: '',
        };
        _this.mixins = [system_1.default, common_1.default];
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "产品" }, "emptyDataAuth": { "description": "权限" } };
        _this.$events = {};
        _this.components = {
            header: index_1.default,
            emptyDataType: index_2.default,
            emptyDataAuth: index_2.default,
        };
        _this.watch = {
            loadingInfo: function () {
                var _this = this;
                if (this.loadingInfo.inventory) {
                    /**
                 * queryType
                 * 1.海信采购 purchase
                 * 2.渠道分销 distribute
                 * 3.渠道订单审核 check
                 * 4.商家库存查询 stock
                 */
                    if (this.loadingInfo.inventory.queryType == 'purchase') {
                        this.methods.getClassificationStock(this.loadingInfo.inventory);
                    }
                    else if (this.loadingInfo.inventory.queryType == 'distribute')
                        this.classification.forEach(function (element, i) {
                            var arr = [];
                            arr.push(_this.classification[i].productCode);
                            classification_1.getDmsGoodsInventory({ cisCode: wepy_1.default.$instance.globalData.cisCode, productCodes: arr, supplierCode: _this.classification[i].agentCisCode }, function (res) {
                                var _a = res.data.data[0], invQty = _a.invQty, gicInvQty = _a.gicInvQty;
                                if (_this.classification[i]) {
                                    _this.classification[i]['invQty'] = invQty;
                                    _this.classification[i]['gicInvQty'] = gicInvQty;
                                }
                                _this.$apply();
                            });
                        });
                }
                if (this.loadingInfo.price) {
                    this.methods.getClassificationPrice(this.loadingInfo.price);
                }
                if (this.loadingInfo.loadingDms) {
                    this.methods.getDmsGoodsPrice({ orgId: this.loadingInfo.loadingDms.orgId, productId: this.loadingInfo.loadingDms.productId });
                }
                // if (this.loadingInfo.loadingDmsInventory && this.loadingInfo.loadingDmsInventory.length > 0) {
                //   // this.methods.getDmsGoodsInventory({ cisCode: wepy.$instance.globalData.cisCode, productCodes: this.loadingInfo.loadingDmsPrice })
                //   this.methods.getDmsGoodsInventory({ cisCode: wepy.$instance.globalData.cisCode, productCodes: this.loadingInfo.loadingDmsInventory,supplierCode:'7097639' })
                // }
            }
        };
        // 页面内交互写在methods里
        _this.methods = {
            onminiSelecte2: function (e) {
                if (e && e.detail) {
                    switch (e.detail.title) {
                        case '电视':
                            _this.showProduct = _this.products.hotProductDTOs;
                            break;
                        case '空调':
                            _this.showProduct = _this.products.hotProductDTOs1;
                            break;
                        case '冰箱':
                            _this.showProduct = _this.products.hotProductDTOs5;
                            break;
                        case '手机':
                            _this.showProduct = _this.products.hotProductDTOs3;
                            break;
                        case '洗衣机':
                            _this.showProduct = _this.products.hotProductDTOs2;
                            break;
                        case '冷柜':
                            _this.showProduct = _this.products.hotProductDTOs4;
                            break;
                        case '厨卫':
                            _this.showProduct = _this.products.hotProductDTOs6;
                            break;
                    }
                }
                else {
                    _this.showProduct = _this.products.hotProductDTOs;
                }
                _this.$apply();
            },
            // 套购确认
            confirmbuyout: function () {
                _this.pageNo = 1;
                _this.visible = !_this.visible;
                _this.methods.scrollToTop();
                _this.methods.getBuyoutList({ page: 1, status: _this.buyoutstatus, packageCode: _this.onBuyoutProjectcodeChange, packageName: _this.onBuyoutProjectnameChange });
            },
            buyoutselect: function (string) {
                _this.buyoutstatus = string;
            },
            onBuyoutProjectcodeChange: function (event) {
                _this.onBuyoutProjectcodeChange = event.detail;
            },
            onBuyoutProjectnameChange: function (event) {
                _this.onBuyoutProjectnameChange = event.detail;
            },
            specialselect: function (number) {
                _this.specialprojectstatus = number;
            },
            // 特惠编码
            onspecialProjectcodeChange: function (event) {
                _this.onspecialProjectcodeChange = event.detail;
            },
            // 特惠商品型号
            onspecialProjectnameChange: function (event) {
                _this.onspecialProjectnameChange = event.detail;
            },
            // 特惠商品批次
            onspecialProjectChange: function (event) {
                _this.onspecialProjectChange = event.detail;
            },
            // 特惠供应商选中
            specialpopup: function (key) {
                _this.specialfilters.fwOrgsGroupMap.forEach(function (res) {
                    if (res.key == key) {
                        res.specialstatus = !res.specialstatus;
                    }
                });
                var item = ramda_1.find(ramda_1.propEq('key', key))(_this.specialfilters.fwOrgsGroupMap);
                _this.methods.selectedspecialpopup(item);
            },
            selectedspecialpopup: function (arr) {
                if (arr.length <= 0) {
                    return;
                }
                var attrs = _this.specialfilters.fwOrgsGroupMap.filter(function (item) {
                    return item.specialstatus === true;
                });
                var specialpopup = attrs.map(function (item) { return item.value; });
                _this.specialpopup = specialpopup.join(',');
            },
            // 特惠物料组选中
            productGrouppopup: function (key) {
                _this.specialfilters.productGroupMap.forEach(function (res) {
                    if (res.key == key) {
                        res.specialstatus = !res.specialstatus;
                    }
                });
                var item = ramda_1.find(ramda_1.propEq('key', key))(_this.specialfilters.productGroupMap);
                _this.methods.selectedproductGrouppopup(item);
            },
            selectedproductGrouppopup: function (arr) {
                if (arr.length <= 0) {
                    return;
                }
                var attrs = _this.specialfilters.productGroupMap.filter(function (item) {
                    return item.specialstatus === true;
                });
                var productGrouppopup = attrs.map(function (item) { return item.value; });
                _this.productGrouppopup = productGrouppopup.join(',');
            },
            // 特惠搜索确认
            confirmSpecial: function (key, number) {
                if (key !== "false") {
                    _this.visible = !_this.visible;
                }
                if (!number) {
                    number = 1;
                }
                if (key == "changestatus") {
                    _this.pageNo = 1;
                }
                _this.methods.scrollToTop();
                var specialItemgroup = '';
                var specialSuppliers = '';
                if (_this.specialfilters.fwOrgsGroupMap) {
                    _this.specialfilters.fwOrgsGroupMap.map(function (res) {
                        if (res.specialstatus) {
                            specialSuppliers = res.key + ',' + specialSuppliers;
                        }
                    });
                }
                if (_this.specialfilters.productGroupMap) {
                    _this.specialfilters.productGroupMap.map(function (res) {
                        if (res.specialstatus) {
                            specialItemgroup = res.key + ',' + specialItemgroup;
                        }
                    });
                }
                specialItemgroup = specialItemgroup.substring(0, specialItemgroup.length - 1);
                specialSuppliers = specialSuppliers.substring(0, specialSuppliers.length - 1);
                _this.methods.getPreferentialList({ _loading: true, pageNo: number, productModel: _this.onspecialProjectnameChange, status: _this.specialprojectstatus, batch: _this.onspecialProjectChange, reportCode: _this.onspecialProjectcodeChange, orgId: specialSuppliers, matkl: specialItemgroup });
            },
            // 品类物料组选中
            dmsclassification: function (key) {
                _this.dmsOrgList.forEach(function (res) {
                    if (res.key == key) {
                        res.classificationstatus = !res.classificationstatus;
                    }
                });
                var item = ramda_1.find(ramda_1.propEq('key', key))(_this.dmsOrgList);
                _this.methods.dmsselectedclassificationpopup(item);
            },
            dmsselectedclassificationpopup: function (arr) {
                if (arr.length <= 0) {
                    return;
                }
                var attrs = _this.dmsOrgList.filter(function (item) {
                    return item.classificationstatus === true;
                });
                _this.specialfilters.classificationpopup = attrs.map(function (item) { return item.value; });
                _this.classificationpopup = _this.specialfilters.classificationpopup.join(',');
            },
            dmsmatkl: function (key) {
                _this.dmsmatklList.forEach(function (res) {
                    if (res.key == key) {
                        res.classificationstatus = !res.classificationstatus;
                    }
                });
                var item = ramda_1.find(ramda_1.propEq('key', key))(_this.dmsmatklList);
                _this.methods.dmselectedmsmatkl(item);
            },
            dmselectedmsmatkl: function (arr) {
                if (arr.length <= 0) {
                    return;
                }
                var attrs = _this.dmsmatklList.filter(function (item) {
                    return item.classificationstatus === true;
                });
                _this.specialfilters.classificationpopup = attrs.map(function (item) { return item.value; });
                _this.dmsmatklListPopup = _this.specialfilters.classificationpopup.join(',');
            },
            classificationpopup: function (key) {
                _this.specialfilters.fwOrgsGroupMap.forEach(function (res) {
                    if (res.key == key) {
                        res.classificationstatus = !res.classificationstatus;
                    }
                });
                var item = ramda_1.find(ramda_1.propEq('key', key))(_this.specialfilters.fwOrgsGroupMap);
                _this.methods.selectedclassificationpopup(item);
            },
            // 选中物料组获取商品信息
            selectedclassificationpopup: function (arr) {
                if (arr.length <= 0) {
                    return;
                }
                var attrs = _this.specialfilters.fwOrgsGroupMap.filter(function (item) {
                    return item.classificationstatus === true;
                });
                _this.specialfilters.classificationpopup = attrs.map(function (item) { return item.value; });
                _this.classificationpopup = _this.specialfilters.classificationpopup.join(',');
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
            },
            // 提交选择商品数量传至特惠单下单
            submitOrder: function () {
                var idString = '';
                var countString = '';
                var same = '';
                var matklId = '';
                var isgo = true;
                var isgomatklId = true;
                _this.preferential.forEach(function (res) {
                    if (res.select) {
                        idString = res.id + ',' + idString,
                            countString = res.iscount + ',' + countString,
                            same = res.fwOrgName,
                            matklId = res.matklId;
                    }
                });
                _this.preferential.forEach(function (res) {
                    if (res.select) {
                        if (same !== res.fwOrgName) {
                            toast_1.default.fail({
                                message: '请选择同一供应商',
                                duration: 1000,
                            });
                            isgo = false;
                            isgomatklId = false;
                            return;
                        }
                    }
                });
                if (isgomatklId) {
                    _this.preferential.forEach(function (res) {
                        if (res.select) {
                            if (matklId !== res.matklId) {
                                toast_1.default.fail({
                                    message: '请选择同一物料组',
                                    duration: 1000,
                                });
                                isgomatklId = false;
                                return;
                            }
                        }
                    });
                }
                idString = idString.substring(0, idString.length - 1);
                var arrString = idString + ':' + countString;
                if (arrString !== ':' && isgo && isgomatklId) {
                    wx.navigateTo({
                        url: "../../goods/preference/index?arr=" + arrString
                    });
                    _this.preferential.forEach(function (res) {
                        res.iscount = 0;
                    });
                }
            },
            // 查看所选择特惠商品
            checkAll: function () {
                _this.isCheckAll = !_this.isCheckAll;
                _this.preferential.forEach(function (res) {
                    if (res.select !== true) {
                        res.relSelect = !res.relSelect;
                    }
                });
            },
            // 特惠选择商品
            preferentialSelect: function (id, status) {
                _this.preferential.forEach(function (res) {
                    if (res.id == id) {
                        if (status == 'false') {
                            res.select = !res.select;
                            if (_this.isCheckAll == true) {
                                res.relSelect = true;
                                res.iscount = 0;
                            }
                        }
                        else if (status == "select") {
                            res.select = true;
                            if (_this.isCheckAll == true) {
                                if (res.iscount == 0) {
                                    res.relSelect = true;
                                }
                            }
                        }
                        if (res.iscount == 0) {
                            res.select = false;
                        }
                        res.price = (ramda_1.multiply(res.billPrice, res.iscount)).toFixed(2);
                    }
                });
                var itemprice = 0.00;
                _this.preferential.forEach(function (res) {
                    if (res.select) {
                        itemprice = ramda_1.add(itemprice, res.price);
                    }
                });
                _this.totalPrice = itemprice.toFixed(2);
            },
            // 获取商品选择数量
            onSelectNumber: function (id, event) {
                _this.preferential.forEach(function (res) {
                    if (res.id == id) {
                        res.iscount = event.detail;
                        _this.methods.preferentialSelect(id, 'select');
                    }
                });
            },
            // 选择供应商
            chooseSpecialServices: function (value, key) {
                _this.servicesVisible = !_this.servicesVisible;
                if (value == "全部" && key == '') {
                    _this.specialfilters.orgMatkl.forEach(function (element) {
                        if (element.key == key) {
                            element.active = true;
                        }
                        else {
                            element.active = false;
                        }
                    });
                    _this.specialfilters.fwOrgsGroupMap.forEach(function (res) {
                        res.specialstatus = false;
                    });
                    _this.specialfilters.productGroupMap.forEach(function (res) {
                        res.specialstatus = false;
                    });
                }
                else {
                    _this.specialfilters.orgMatkl.forEach(function (element) {
                        if (element.key == key) {
                            element.active = true;
                        }
                        else {
                            element.active = false;
                        }
                    });
                    var arr_1 = key.split('-');
                    _this.specialfilters.fwOrgsGroupMap.forEach(function (res) {
                        if (res.key == arr_1[0]) {
                            res.specialstatus = true;
                        }
                        else {
                            res.specialstatus = false;
                        }
                    });
                    _this.specialfilters.productGroupMap.forEach(function (res) {
                        if (res.key == arr_1[1]) {
                            res.specialstatus = true;
                        }
                        else {
                            res.specialstatus = false;
                        }
                    });
                }
                _this.specialfilters.firstorg = value;
                _this.methods.confirmSpecial('false');
                _this.$apply();
            },
            // 物料组
            Itemgroup: function () {
                _this.Itemgroupextend = !_this.Itemgroupextend;
            },
            // 供应商
            Suppliers: function () {
                _this.Suppliersextend = !_this.Suppliersextend;
            },
            // 确定搜索
            confirmSearch: function () {
                _this.pageNo = 1;
                _this.visible = !_this.visible;
                _this.methods.getClassification();
                _this.methods.scrollToTop();
            },
            // 重置选项
            resetSearch: function () {
                _this.normalfiltering = '';
                _this.classificationpopup = '';
                _this.dmsmatklListPopup = '';
                _this.checkMainPrice = false;
                if (_this.filters) {
                    _this.filters.map(function (res) {
                        if (res.value) {
                            res.value.map(function (item) {
                                if (item.active == true) {
                                    item.active = !item.active;
                                }
                            });
                        }
                        if (res.filter.length > 0) {
                            res.filter = [];
                        }
                    });
                }
                if (_this.specialfilters && _this.specialfilters.fwOrgsGroupMap) {
                    _this.specialfilters.fwOrgsGroupMap.forEach(function (res) {
                        if (res.classificationstatus == true) {
                            res.classificationstatus = false;
                        }
                    });
                }
                if (_this.dmsOrgList && _this.dmsOrgList.length > 0 && _this.selectItemNumber == 1) {
                    ramda_1.forEach(function (item) {
                        if (item.classificationstatus == true) {
                            item.classificationstatus = false;
                        }
                    }, _this.dmsOrgList);
                }
                if (_this.dmsmatklList && _this.dmsmatklList.length > 0 && _this.selectItemNumber == 1) {
                    ramda_1.forEach(function (item) {
                        if (item.classificationstatus == true) {
                            item.classificationstatus = false;
                        }
                    }, _this.dmsmatklList);
                }
            },
            // 选中
            selectedStr: function (arr) {
                if (arr.value.length <= 0) {
                    return;
                }
                var attrs = arr.value.filter(function (item) {
                    return item.active === true;
                });
                arr.filter = attrs.map(function (item) { return item.value; });
                return arr.filter.join(',');
            },
            // 抽屉选中
            chooseAttr: function (group, name) {
                var item = ramda_1.find(ramda_1.propEq('key', group))(_this.filters);
                if (item) {
                    var attr = ramda_1.find(ramda_1.propEq('value', name))(item.value);
                    if (attr) {
                        attr.active = !attr.active;
                    }
                }
                _this.methods.selectedStr(item);
            },
            // 抽屉显隐
            toggleExtend: function (group) {
                var item = ramda_1.find(ramda_1.propEq('key', group))(_this.filters);
                if (item) {
                    item.extend = !item.extend;
                }
            },
            onminiSelecte: function (event) {
                wepy_redux_1.getStore().dispatch({ type: classification_2.RESET_CLASSIFICATION_LIST, payload: [] });
                _this.methods.resetSearch();
                if (_this.user && _this.user.zyPartInfo && _this.user.zyPartInfo.length > 0) {
                    _this.categoryid = _this.user.zyPartInfo[event.detail.index].id;
                    _this.pageNo = 1;
                }
                _this.categoryIndex = event.detail.index;
                // 滚动到最上面
                _this.methods.getcollectionpopup();
                _this.methods.scrollToTop();
                _this.methods.getClassification();
                _this.methods.getThreeMaterialGroupAndSuppliers({ catalogId: _this.selectItemNumber == 0 ? _this.categoryid : _this.dmscategoryId, type: _this.selectItemNumber == 0 ? '2' : '1' });
                _this.methods.getGoodsFilters({ catalogId: _this.selectItemNumber == 0 ? _this.categoryid : _this.dmscategoryId });
            },
            onminiDmsSelecte: function (event) {
                wepy_redux_1.getStore().dispatch({ type: classification_2.RESET_CLASSIFICATION_LIST, payload: [] });
                _this.methods.resetSearch();
                if (_this.user && _this.user.fxPartInfo && _this.user.fxPartInfo.length > 0) {
                    _this.dmscategoryId = _this.user.fxPartInfo[event.detail.index].id;
                    _this.pageNo = 1;
                }
                _this.dmscategoryIndex = event.detail.index;
                // 滚动到最上面
                _this.methods.getcollectionpopup();
                _this.methods.scrollToTop();
                _this.methods.getClassification();
                _this.methods.getThreeMaterialGroupAndSuppliers({ catalogId: _this.selectItemNumber == 0 ? _this.categoryid : _this.dmscategoryId, type: _this.selectItemNumber == 0 ? '2' : '1' });
                _this.methods.getGoodsFilters({ catalogId: _this.selectItemNumber == 0 ? _this.categoryid : _this.dmscategoryId });
            },
            //定制专区物料组选择
            onModelSelecte: function (event) {
                wepy_redux_1.getStore().dispatch({ type: classification_2.RESET_CLASSIFICATION_LIST, payload: [] });
                _this.methods.resetSearch();
                if (_this.goodModelMatkls.length > 0) {
                    _this.goodModelSelect = _this.goodModelMatkls[event.detail.index];
                    _this.pageNo = 1;
                }
                _this.goodModelSelect = event.detail.index;
                // 滚动到最上面
                _this.methods.getcollectionpopup();
                _this.methods.scrollToTop();
                _this.methods.getClassification();
                _this.methods.getThreeMaterialGroupAndSuppliers({ catalogId: _this.selectItemNumber == 0 ? _this.categoryid : _this.dmscategoryId, type: _this.selectItemNumber == 0 ? '2' : '1' });
                //切换物料组
                _this.goodModelList = _this.goodModelAll[_this.goodModelMatkls[_this.goodModelSelect]];
                //查询价格/库存
                if (_this.goodModelList) {
                    for (var i = 0; i < _this.goodModelList.length; i++) {
                        _this.methods.getPrice(_this.goodModelList[i]);
                        _this.methods.getStock(_this.goodModelList[i]);
                    }
                }
            },
            // 工程单条件搜索
            confirmEngineer: function () {
                _this.pageNo = 1;
                _this.methods.scrollToTop();
                _this.methods.getEngineerList({ pageNo: 1, projectApplyCode: _this.projectcode, projectName: _this.projectname, status: _this.projectstatus });
                _this.visible = !_this.visible;
            },
            // 项目编码
            onProjectcodeChange: function (event) {
                _this.projectcode = event.detail;
            },
            // 项目名称
            onProjectnameChange: function (event) {
                _this.projectname = event.detail;
            },
            // 供应商
            toggleServicesVisible: function () {
                this.servicesVisible = !this.servicesVisible;
            },
            specialPopup: function () {
                this.specialProcurement = !this.specialProcurement;
            },
            select: function (e) {
                _this.projectstatus = e.currentTarget.dataset.name;
            },
            onPopupList: function (index) {
                _this.selectItemNumber = 2;
                _this.specialProcurement = false;
                _this.onPopupItemNomber = index;
                if (index == 1) {
                    _this.onPopupItemName = '工程专区';
                    _this.index = 1,
                        _this.category = true,
                        _this.engineeringZone = false,
                        _this.specialZone = true,
                        _this.buyoutZone = true;
                    _this.pageNo = 1,
                        _this.fill = false;
                    _this.conditonShow = true;
                    wepy_redux_1.getStore().dispatch({ type: classification_2.RESET_ENGINEER_LIST, payload: [] });
                    _this.methods.getEngineerList({ _loading: true, pageNo: 1, status: _this.projectstatus, projectApplyCode: _this.projectcode });
                }
                else if (index == 2) {
                    _this.index = 2,
                        _this.onPopupItemName = '特惠专区';
                    _this.category = true,
                        _this.engineeringZone = true,
                        _this.specialZone = false,
                        _this.buyoutZone = true;
                    _this.totalPrice = 0;
                    _this.isCheckAll = false;
                    _this.pageNo = 1,
                        _this.fill = false;
                    _this.conditonShow = true;
                    wepy_redux_1.getStore().dispatch({ type: classification_2.RESET_PREFERENTIAL_LIST, payload: [] });
                    _this.methods.confirmSpecial('false');
                }
                else if (index == 3) {
                    _this.index = 3,
                        _this.onPopupItemName = '套购专区';
                    _this.category = true,
                        _this.engineeringZone = true,
                        _this.specialZone = true,
                        _this.buyoutZone = false,
                        _this.pageNo = 1,
                        _this.fill = false;
                    _this.conditonShow = true;
                    wepy_redux_1.getStore().dispatch({ type: classification_2.RESET_BUYOUT_LIST, payload: [] });
                    _this.methods.getBuyoutList({ _loading: true, page: 1, status: _this.buyoutstatus, packageCode: _this.onBuyoutProjectcodeChange, packageName: _this.onBuyoutProjectnameChange });
                }
                else if (index == 4) {
                    //定制专区
                    _this.index = 4;
                    _this.onPopupItemName = '定制专区';
                    _this.category = true;
                    _this.engineeringZone = true;
                    _this.specialZone = true;
                    _this.buyoutZone = true;
                    //隐藏查询条件
                    _this.conditonShow = false;
                    _this.goodModelList = _this.goodModelAll[_this.goodModelMatkls[0]];
                    //查询价格/库存
                    if (_this.goodModelList) {
                        for (var i = 0; i < _this.goodModelList.length; i++) {
                            _this.methods.getPrice(_this.goodModelList[i]);
                            _this.methods.getStock(_this.goodModelList[i]);
                        }
                    }
                }
            },
            //查询价格
            getPrice: function (item) {
                var data = { code: item.productId, orgId: item.orgId, orgCode: item.orgCode };
                request_1.request({ api: 'product/getPrices.nd', method: 'POST', data: data }).then(function (res) {
                    if (ramda_1.is(Array, res) && ramda_1.length(res) > 0) {
                        var prices = ramda_1.map(function (_a) {
                            var productCode = _a.productCode, fixedDiscount = _a.fixedDiscount, makeUpType = _a.makeUpType, price = _a.price, standardPrice = _a.standardPrice, pricingGroupName = _a.pricingGroupName;
                            return ({
                                productCode: productCode, fixedDiscount: fixedDiscount, makeUpType: makeUpType, price: price, standardPrice: standardPrice, pricingGroupName: pricingGroupName,
                            });
                        }, res);
                        item.price = prices[0].price;
                        _this.$apply();
                    }
                });
            },
            //库存查询
            // getStock: (item: any) => {
            //   const data = { code: item.productId, orgId: item.orgId, orgCode: item.orgCode }
            //   this.methods.getGoodsStock(data).then((res) => {
            //     if(res && res.payload) {
            //       item.inventory = res.payload.inventory;
            //     }
            //     this.$apply();
            //   })
            // },
            //库存查询
            getStock: function (item) {
                /**
                 * queryType
                 * 1.海信采购 purchase
                 * 2.渠道分销 distribute
                 * 3.渠道订单审核 check
                 * 4.商家库存查询 stock
                 */
                var type = _this.loadingInfo.inventory ? _this.loadingInfo.inventory.queryType : 'purchase';
                var data = { code: item.productId, orgId: item.orgId, queryType: type };
                _this.methods.getGoodsStock(data).then(function (res) {
                    if (res && res.payload.length > 0) {
                        item.inventory = res.payload[0].inventory;
                        item.ownInv = res.payload[0].ownInv;
                        item.sharedInv = res.payload[0].sharedInv;
                    }
                    _this.$apply();
                });
            },
            // 页面选择交互
            onSelecte: function (index) {
                _this.onPopupItemName = index == 2 ? _this.onPopupItemName : '专区采购';
                _this.onPopupItemNomber = index == 2 ? _this.onPopupItemNomber : '';
                if (index == 0) {
                    _this.selectItemNumber = 0;
                    _this.index = 0,
                        _this.category = false,
                        _this.engineeringZone = true,
                        _this.specialZone = true,
                        _this.buyoutZone = true;
                    // 切换时，重新触发搜索
                    var mockTap = {
                        type: 'tap',
                        timeStamp: 1,
                        target: {
                            id: '',
                            tagName: '',
                            dataset: {}
                        },
                        currentTarget: {
                            id: '',
                            tagName: '',
                            dataset: {}
                        },
                        detail: {
                            index: _this.categoryIndex
                        }
                    };
                    _this.pageNo = 1,
                        _this.fill = false;
                    _this.specialProcurement = false;
                    _this.methods.onminiSelecte(mockTap);
                    wepy_redux_1.getStore().dispatch({ type: classification_2.RESET_CLASSIFICATION_LIST, payload: [] });
                }
                else if (index == 1) {
                    // TODO: 新的专区
                    _this.selectItemNumber = 1;
                    _this.category = false,
                        _this.index = 0,
                        _this.engineeringZone = true,
                        _this.specialZone = true,
                        _this.buyoutZone = true;
                    var mockTap = {
                        type: 'tap',
                        timeStamp: 1,
                        target: {
                            id: '',
                            tagName: '',
                            dataset: {}
                        },
                        currentTarget: {
                            id: '',
                            tagName: '',
                            dataset: {}
                        },
                        detail: {
                            index: _this.dmscategoryIndex
                        }
                    };
                    _this.pageNo = 1,
                        _this.fill = false;
                    _this.specialProcurement = false;
                    _this.methods.onminiDmsSelecte(mockTap);
                    wepy_redux_1.getStore().dispatch({ type: classification_2.RESET_CLASSIFICATION_LIST, payload: [] });
                }
                else if (index == 2) {
                    // TODO: 应该还有些什么我还没想到
                    _this.specialProcurement = true;
                }
            },
            // 滑动监听
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
            // 跳转统一方法
            goNext: function (e) {
                var url = e.currentTarget.dataset.url;
                wx.navigateTo({
                    url: url
                });
            },
            // 回到顶部
            scrollToTop: function () {
                _this.visibelTop = false;
                _this.scrollTop = 0;
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
                _this.visible = true;
                if (_this.orgIds) {
                    _this.orgIds.forEach(function (res) {
                        if (_this.specialfilters && _this.specialfilters.fwOrgsGroupMap) {
                            _this.specialfilters.fwOrgsGroupMap.forEach(function (element) {
                                if (element.key == res) {
                                    element.classificationOnsee = false;
                                }
                            });
                        }
                    });
                }
            },
            onClose: function () {
                _this.visible = false;
            },
            // 应该有个统一的滚动方法
            onPullBottom: function () {
                if (_this.pageNo < _this.totalPages) {
                    if (!_this.category) {
                        var index = _this.currentPage + 1;
                        _this.pageNo = index;
                        _this.methods.getClassification(index);
                    }
                    if (!_this.engineeringZone) {
                        var index = _this.pageNo + 1;
                        _this.pageNo = index;
                        _this.methods.getEngineerList({ _loading: true, pageNo: index, status: _this.projectstatus });
                    }
                    if (!_this.specialZone) {
                        var index = _this.pageNo + 1;
                        _this.pageNo = index;
                        if (!_this.isCheckAll) {
                            _this.methods.confirmSpecial('false', index);
                        }
                    }
                    if (!_this.buyoutZone) {
                        var index = _this.pageNo + 1;
                        _this.pageNo = index;
                        _this.methods.getBuyoutList({ _loading: true, page: index, status: _this.buyoutstatus, packageCode: _this.onBuyoutProjectcodeChange, packageName: _this.onBuyoutProjectnameChange });
                    }
                }
                else {
                    if (!_this.specialZone) {
                        _this.fill = true;
                    }
                }
            },
            // 普通分类页筛选条件
            getClassification: function (key) {
                if (!key) {
                    key = 1;
                }
                var normalfiltering = '';
                var classificationpopupid = '';
                var dmsitempopup = '';
                var purchaseType = '';
                if (_this.filters.length > 0) {
                    _this.filters.map(function (res) {
                        if (res.filter.length > 0) {
                            res.filter.map(function (item) {
                                normalfiltering = res.categoryid + ':' + item + ',' + normalfiltering;
                            });
                        }
                    });
                }
                if (_this.specialfilters.fwOrgsGroupMap && _this.selectItemNumber == 0) {
                    _this.specialfilters.fwOrgsGroupMap.map(function (res) {
                        if (res.classificationstatus) {
                            classificationpopupid = res.relkey + ',' + classificationpopupid;
                        }
                    });
                }
                else {
                    _this.dmsOrgList.map(function (res) {
                        if (res.classificationstatus) {
                            classificationpopupid = res.key + ',' + classificationpopupid;
                        }
                    });
                }
                if (_this.dmsmatklList && _this.dmsmatklList.length > 0 && _this.selectItemNumber == 1) {
                    _this.dmsmatklList.map(function (res) {
                        if (res.classificationstatus) {
                            dmsitempopup = res.key + ',' + dmsitempopup;
                        }
                    });
                }
                if (_this.selectItemNumber == 0) {
                    _this.purchaseTypeOptions.map(function (res) {
                        if (res.status) {
                            purchaseType = res.key + ',' + purchaseType;
                        }
                    });
                }
                dmsitempopup = dmsitempopup.substring(0, dmsitempopup.length - 1);
                normalfiltering = normalfiltering.substring(0, normalfiltering.length - 1);
                classificationpopupid = classificationpopupid.substring(0, classificationpopupid.length - 1);
                purchaseType = purchaseType.substring(0, purchaseType.length - 1);
                _this.methods.getClassificationList({
                    type: _this.selectItemNumber == 0 ? '2' : '1',
                    _loading: true,
                    pageNum: key,
                    keyword: '',
                    productId: '',
                    filter: normalfiltering,
                    sortField: '',
                    catalogId: _this.selectItemNumber == 0 ? _this.categoryid : _this.dmscategoryId,
                    orgId: classificationpopupid,
                    matklCodes: dmsitempopup,
                    havePrice: _this.checkMainPrice ? 1 : 0,
                    purchaseType: purchaseType.indexOf(",") >= 0 ? '3' : purchaseType
                }).then(function () {
                });
                _this.normalfiltering = '';
            },
            // 跳转到收藏
            show: function () {
                // type 1 为分销 2 是海信  3 为全部
                var id = this.selectItemNumber == 0 ? this.categoryid : this.dmscategoryId;
                var type = this.selectItemNumber == 0 ? '2' : '1';
                wx.navigateTo({
                    url: "/pages/goods/collection/index?catalogId=" + id + "&type=" + type
                });
            },
            //举报
            tipOff: function () {
                wx.navigateTo({
                    url: "/pages/me/my-complaints/index"
                });
            },
            // 图片优化
            imgLose: function (_a) {
                var detail = _a.detail;
                wepy_redux_1.getStore().dispatch({ type: classification_2.RESET_PRODUCT_IMG, payload: detail });
            },
            toggleCollection: function (_a) {
                var detail = _a.detail;
                wepy_redux_1.getStore().dispatch({ type: classification_3.TOGGLE_CLASSIFICATION_COLLECTION, payload: detail });
            },
            // 获取筛选条件
            getcollectionpopup: function () {
                _this.methods.getSpecialFilters().then(function (res) {
                    var specialfilters = [];
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            value: value,
                            key: key,
                        };
                        specialfilters.push(item);
                    }, res.payload.orgMatkl);
                    // let arr = specialfilters[0].key.split('-')
                    // this.specialfilters.fwOrgsGroupMap.forEach((res: { key: any; specialstatus: boolean; }) => {
                    //   if (res.key == arr[0]) {
                    //     res.specialstatus = true
                    //   } else {
                    //     res.specialstatus = false
                    //   }
                    // })
                    // this.specialfilters.productGroupMap.forEach((res: { key: any; specialstatus: boolean; }) => {
                    //   if (res.key == arr[1]) {
                    //     res.specialstatus = true
                    //   } else {
                    //     res.specialstatus = false
                    //   }
                    // })
                });
            },
            // 选中已维护价格的商品
            onCheckMainPrice: function () {
                _this.checkMainPrice = !_this.checkMainPrice;
            },
            // 定制产品详情
            goods: function (item) {
                wx.navigateTo({
                    url: "/pages/goods/custom/index?code=" + item.id + "&orgId=" + item.orgId + "&orgCode=" + item.orgCode + "&agentCisCode=" + item.agentCisCode,
                });
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 当前是 tab 页时，点击 tab 时触发； 使用自定义菜单custom-tab-bar该功能失效；保留兼容低版本
    Take.prototype.onTabItemTap = function () {
        if (!this.notLogin && wx.getStorageSync('b2b_permission_list')) {
            var productPurchaseAuthority = JSON.parse(wx.getStorageSync('b2b_permission_list')).productPurchaseAuthority;
            this.isTab = true;
            this.isPermission = productPurchaseAuthority;
        }
    };
    Take.prototype.onShow = function () {
        var _this = this;
        // 自定义底部导航栏-如需实现 tab 选中态，要在当前页面下，通过 getTabBar 接口获取组件实例，并调用 setData 更新选中态
        if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
            this.$wxpage.getTabBar().setData({
                selected: 1
            });
        }
        this.notLogin = !this.isLogin();
        if (this.notLogin) {
            return;
        }
        if (wx.getStorageSync('b2b_permission_list')) {
            var _a = JSON.parse(wx.getStorageSync('b2b_permission_list')), specialArea = _a.specialArea, generalZonePermissions = _a.generalZonePermissions;
            this.zoneButtonShowArr = specialArea;
            this.generalZonePermissions = generalZonePermissions;
        }
        var globalData = wepy_1.default.$instance.globalData;
        // <!-- 17451 分销 17452 直营 17453 代理-->
        if (this.isLogin() == true && globalData.marketModels && globalData.marketModels.indexOf("17451") !== -1) {
            this.methods.getAuthority().then(function (res) {
                if (res.payload.data.isOpen == 'false') {
                    wx.showToast({
                        title: '您暂无权限访问该功能，请联系上级代理在DMS主数据管理中为您激活账号',
                        icon: 'none',
                        duration: 3000 //持续的时间
                    });
                }
            });
        }
        this.notLogin = !this.isLogin();
        // 判断身份账号身份
        var zyPartInfo = wepy_1.default.$instance.globalData.zyPartInfo;
        var fxPartInfo = wepy_1.default.$instance.globalData.fxPartInfo;
        var loginSystem = wepy_1.default.$instance.globalData.loginSystem;
        this.isTab = globalData.isTab;
        this.isPermission = globalData.isPermission;
        if (zyPartInfo.length > 0 && ramda_1.includes('14168810880', loginSystem)) {
            this.categoryid = zyPartInfo[0].id || '';
            if (this.selectItemNumber == 1) {
                this.selectItemNumber = 0;
            }
            this.category = false;
            this.engineeringZone = true;
            this.specialZone = true;
            this.buyoutZone = true;
        }
        else if (zyPartInfo.length == 0 && fxPartInfo.length > 0 && ramda_1.includes('14168810879', loginSystem)) {
            if (this.selectItemNumber == 0) {
                this.selectItemNumber = 1;
            }
            this.category = false;
            this.engineeringZone = true;
            this.specialZone = true;
            this.buyoutZone = true;
            this.specialProcurement = false;
            this.dmscategoryId = fxPartInfo[0].id || '';
        }
        else {
            this.category = true;
            this.engineeringZone = true;
            this.specialZone = true;
            this.buyoutZone = true;
            this.categoryid = '';
        }
        this.$apply();
        // else if (zyPartInfo.length == 0 && fxPartInfo.length == 0 && (includes('14168810879',loginSystem) || includes('14168810880',loginSystem) )) {
        //   this.selectItemNumber = 2
        //   // 默认特惠专区
        //   this.methods.onPopupList(2)
        // }
        // 重置step数据
        this.setData({
            onNumber: 0
        });
        if (this.isLogin()) {
            // 获取筛选条件对应的供应商
            // this.methods.getcollectionpopup()
            // 模拟vant进行参数传递
            this.methods.getSpecialFilters();
            var mockTap = {
                type: 'tap',
                timeStamp: 1,
                target: {
                    id: '',
                    tagName: '',
                    dataset: {}
                },
                currentTarget: {
                    id: '',
                    tagName: '',
                    dataset: {}
                },
                detail: {
                    index: this.index
                }
            };
            // 拼凑数据
            var mockTapCategory = __assign({}, mockTap, { detail: {
                    index: 0
                    // index: this.selectItemNumber == 0 ? this.categoryIndex : this.dmscategoryIndex
                } });
            var from = this.$parent.globalData.zone;
            var categoryIndex = this.$parent.globalData.zoneIndex;
            var _b = this.$parent.globalData, _c = _b.projectApplyCode, projectApplyCode = _c === void 0 ? '' : _c, _d = _b.reportCode, reportCode = _d === void 0 ? '' : _d, _e = _b.packageCode, packageCode = _e === void 0 ? '' : _e;
            if (projectApplyCode) {
                this.projectcode = projectApplyCode;
            }
            if (reportCode) {
                this.onspecialProjectcodeChange = reportCode;
            }
            if (packageCode) {
                this.onBuyoutProjectcodeChange = packageCode;
            }
            this.$apply();
            if (from) {
                this.$parent.globalData.zone = '';
                this.$parent.globalData.zoneIndex = '';
                if (from === 'engineeringZone') {
                    mockTap.detail.index = 1;
                }
                else if (from === 'specialZone') {
                    mockTap.detail.index = 2;
                }
                else if (from === 'buyoutZone') {
                    mockTap.detail.index = 3;
                }
                else if (from === 'customZone') {
                    mockTap.detail.index = 4;
                }
                else if (from === 'category') {
                    mockTap.detail.index = 0;
                    this.categoryIndex = +categoryIndex;
                }
                if (from !== 'category') {
                    this.methods.onPopupList(mockTap.detail.index);
                }
                else {
                    if (this.selectItemNumber !== 2) {
                        this.methods.onSelecte(mockTap.detail.index);
                    }
                    else {
                        if (categoryIndex) {
                            this.methods.onSelecte(mockTap.detail.index);
                        }
                        else {
                            this.methods.onPopupList(this.onPopupItemNomber || 0);
                        }
                    }
                }
            }
            else {
                // 直接触发需要的搜索
                if (this.index !== 0) {
                    if (this.selectItemNumber !== 2) {
                        this.methods.onSelecte(mockTap.detail.index);
                    }
                    else {
                        this.methods.onPopupList(this.onPopupItemNomber || 0);
                    }
                }
                else {
                    if (zyPartInfo.length > 0) {
                        this.methods.onminiSelecte(mockTapCategory);
                    }
                    else if (zyPartInfo.length == 0 && fxPartInfo.length > 0) {
                        this.methods.onminiDmsSelecte(mockTapCategory);
                    }
                }
            }
        }
        //显示上一次的结果
        if (this.goodModelAll) {
            this.goodModelList = this.goodModelAll[this.goodModelMatkls[this.goodModelSelect]];
        }
        //查询定制专区产品
        this.methods.getGoodsModel().then(function (res) {
            if (res) {
                if (res.error == true) {
                    return;
                }
                _this.goodModelMatkls = [];
                var modelList = res.payload.modelList;
                for (var key in modelList) {
                    _this.goodModelMatkls.push(key);
                }
                _this.goodModelAll = modelList;
                //切换物料组
                _this.goodModelList = _this.goodModelAll[_this.goodModelMatkls[0]];
                //查询价格/库存
                if (_this.goodModelList) {
                    for (var i = 0; i < _this.goodModelList.length; i++) {
                        _this.methods.getPrice(_this.goodModelList[i]);
                        _this.methods.getStock(_this.goodModelList[i]);
                    }
                }
                _this.goodModelSelect = _this.goodModelMatkls[0];
            }
        });
        this.freeShippingTip = index_3.getAlertInfo('14187495683'); // 免运费提示信息
    };
    Take.prototype.onLoad = function () {
        var _this = this;
        this.methods.getProduct().then(function () {
            _this.methods.onminiSelecte2();
        });
    };
    Take.prototype.onUnload = function () {
        this.pageNo = 1;
    };
    Take = __decorate([
        wepy_redux_1.connect({
            user: function (_a) {
                var user = _a.user;
                return user;
            },
            mixinCurrentUser: function (_a) {
                var user = _a.user;
                return user.info || {};
            },
            engineerList: function (_a) {
                var classification = _a.classification;
                return classification.categories;
            },
            dmsmatklList: function (_a) {
                var classification = _a.classification;
                return classification.dmsmatklList;
            },
            dmsOrgList: function (_a) {
                var classification = _a.classification;
                return classification.dmsOrgList;
            },
            preferential: function (_a) {
                var classification = _a.classification;
                return classification.preferential;
            },
            buyoutList: function (_a) {
                var classification = _a.classification;
                return classification.buyout;
            },
            classification: function (_a) {
                var classification = _a.classification;
                return classification.classification;
            },
            orgIds: function (_a) {
                var classification = _a.classification;
                return classification.orgIds;
            },
            loadingInfo: function (_a) {
                var classification = _a.classification;
                return classification.loadingInfo;
            },
            filters: function (_a) {
                var classification = _a.classification;
                return classification.filters;
            },
            specialfilters: function (_a) {
                var classification = _a.classification;
                return classification.specialfilters;
            },
            totalPages: function (_a) {
                var classification = _a.classification;
                return classification.totalPages;
            },
            currentPage: function (_a) {
                var classification = _a.classification;
                return classification.currentPage;
            },
            products: function (_a) {
                var classification = _a.classification;
                return classification.products;
            }
        }, {
            getEngineerList: classification_1.getEngineerList,
            getPreferentialList: classification_1.getPreferentialList,
            getBuyoutList: classification_1.getBuyoutList,
            getClassificationList: classification_1.getClassificationList,
            getGoodsFilters: classification_1.getGoodsFilters,
            getSpecialFilters: classification_1.getSpecialFilters,
            userLogin: user_1.userLogin,
            getClassificationPrice: classification_1.getClassificationPrice,
            getClassificationStock: classification_1.getClassificationStock,
            getDmsGoodsPrice: classification_1.getDmsGoodsPrice,
            getDmsGoodsInventory: classification_1.getDmsGoodsInventory,
            getThreeMaterialGroupAndSuppliers: classification_1.getThreeMaterialGroupAndSuppliers,
            getGoodsModel: goods_1.getGoodsModel,
            getGoodsStock: goods_1.getGoodsStock,
            getAuthority: classification_1.getAuthority,
            getProduct: classification_1.getProduct
        })
    ], Take);
    return Take;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Take , 'pages/main/take/index'));

