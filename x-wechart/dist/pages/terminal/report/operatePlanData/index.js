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
/* import utilsWxs from '../../../../wxs/utils.wxs' */
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var home_1 = require('./../../../../store/actions/home.js');
var search_1 = require('./../../../../store/actions/search.js');
var ramda_1 = require('./../../../../npm/ramda/src/index.js');
var index_1 = require('./../../../../utils/index.js');
var index_2 = require('./../../../components/header-tab/index.js');
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '运营计划达成情况表',
            usingComponents: {
                'van-icon': '../../../../components/vant/icon/index',
                'van-popup': '../../../../../components/vant/popup/index',
                'van-datetime-picker': '../../../../../components/vant/datetime-picker/index'
            }
        };
        _this.$repeat = {};
        _this.$props = { "headerTab": { "xmlns:v-bind": "", "v-bind:showRightBtn.once": "showRightBtn", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchFilter" } };
        _this.components = {
            headerTab: index_2.default
        };
        _this.data = {
            previousDayDate: '',
            supplierList: [],
            operateDataArr: [],
            deliveryAmount: false,
            whichPopup: false,
            deliverySchedule: false,
            deliveryScale: false,
            option1: null,
            option2: null,
            ringChart: {},
            purchaseVisable: false,
            CurrentFilterName: '',
            maxDate: new Date().getTime(),
            currentDate: new Date().getTime(),
            minDate: new Date(2000, 10, 1).getTime(),
            supplierItem: {
                name: '全部',
                code: ''
            },
            materialItem: {
                name: '全部品类',
                code: ''
            },
            selectDate: (new Date()).Format('yyyy年MM月'),
            filterForm: {
                month: (new Date()).Format('yyyyMM'),
                operatorCode: '',
                cisShopCode: '',
                matklCode: '',
                reSellCode: '',
                isShop: 0
            },
            reportFlag: false,
            showRightBtn: false,
            headerTabList: [
                { name: '供应商', type: 'supplier', selectValue: '' },
                { name: '物料组', type: 'material', selectValue: '' },
                { name: (new Date()).Format('yyyy年MM月'), type: 'date', selectValue: (new Date()).Format('yyyy年MM月') },
            ],
        };
        _this.watch = {
            supplierItem: function (e) {
                _this.methods.grtFilterItemGroup({
                    type: 2,
                    orgId: e.code
                }).then(function (res) {
                    var matklList = res.payload.matklList;
                    if (matklList && matklList.length > 0) {
                        _this.materialItem = {
                            name: '全部品类',
                            code: ''
                        };
                    }
                    _this.filterForm.matklCode = _this.materialItem.code;
                    _this.$apply();
                    _this.methods.getData();
                });
            }
        };
        /*  wxs =  */ /* {
           utils: utilsWxs
         } */
        /**
         * 生命周期函数--监听页面加载
         */
        _this.methods = {
            deliveryScale: function () {
                _this.deliveryScale = !_this.deliveryScale;
            },
            deliverySchedule: function () {
                _this.deliverySchedule = !_this.deliverySchedule;
            },
            openNotice: function (number) {
                if (number == '1') {
                    _this.deliveryAmount = !_this.deliveryAmount;
                    _this.whichPopup = false;
                }
                else if (number == '2') {
                    _this.whichPopup = !_this.whichPopup;
                    _this.deliveryAmount = false;
                }
            },
            // 选择供应商
            touchFilter: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                if (!_this.purchaseVisable) {
                    _this.purchaseVisable = true;
                    _this.reportFlag = true;
                    _this.CurrentFilterName = name;
                    return;
                }
                if (!name) {
                    _this.purchaseVisable = false;
                    _this.reportFlag = false;
                    _this.CurrentFilterName = '';
                    return;
                }
                if (_this.CurrentFilterName === name) {
                    _this.purchaseVisable = false;
                    _this.reportFlag = false;
                    _this.CurrentFilterName = '';
                    return;
                }
                if (['supplier', 'material'].indexOf(name) > -1) {
                    _this.CurrentFilterName = name;
                    return;
                }
                _this.purchaseVisable = false;
                _this.reportFlag = false;
                _this.CurrentFilterName = '';
            },
            onChooseMa: function (e) {
                var _this = this;
                this.reportFlag = false;
                ramda_1.forEach(function (res) {
                    if (res.code == e) {
                        if (res.isES) {
                            _this.supplierItem.reSellCode = '';
                            _this.supplierItem = {
                                name: res.name,
                                code: res.code,
                                reSellCode: ''
                            };
                        }
                        else {
                            _this.supplierItem = {
                                name: res.name,
                                code: '',
                                reSellCode: res.code
                            };
                        }
                    }
                }, this.supplierList);
                this.filterForm = __assign({}, this.filterForm, { cisShopCode: this.supplierItem.code, isShop: this.supplierItem.code ? 1 : 0, reSellCode: this.supplierItem.code ? '' : this.supplierItem.reSellCode });
                this.headerTabList[0].selectValue = this.supplierItem.reSellCode;
                this.purchaseVisable = false;
                this.$apply();
            },
            // 选择物料组
            onMaterial: function (e) {
                var _this = this;
                ramda_1.forEach(function (res) {
                    if (res.code == e) {
                        _this.materialItem = {
                            name: res.name,
                            code: res.code
                        };
                    }
                }, this.matklList);
                this.purchaseVisable = false;
                this.reportFlag = false;
                this.filterForm.matklCode = this.materialItem.code;
                this.headerTabList[1].selectValue = this.materialItem.code;
                this.$apply();
                this.methods.getData();
            },
            // 选择时间
            onInput: function (e) {
                this.currentDate = e.detail;
            },
            onConfirm: function (e) {
                this.reportFlag = false;
                this.purchaseVisable = false;
                var date = new Date(parseInt(e.detail));
                var Y = date.getFullYear() + '年';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
                var date1 = Y + M;
                this.selectDate = date1;
                this.headerTabList[2].name = this.selectDate;
                var Y1 = date.getFullYear();
                var M1 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                var a = Y1.toString();
                var date2 = a + M1;
                this.filterForm.month = date2;
                this.methods.getData();
            },
            onCancel: function () {
                this.reportFlag = false;
                this.purchaseVisable = false;
            },
            getData: function () {
                _this.methods.getOperatePlanReach(_this.filterForm).then(function (res) {
                    if (_this.filterForm.matklCode) {
                        _this.operateDataArr = _this.operatePlanData.arr.slice(1);
                    }
                    else {
                        _this.operateDataArr = _this.operatePlanData.arr;
                    }
                    _this.$apply();
                });
            }
        };
        return _this;
    }
    default_1.prototype.onShow = function () {
        var _this = this;
        this.previousDayDate = index_1.previousDay(); //前一天
        this.methods.getFxDictCisCode().then(function (res) {
            var data = { cisCode: wepy_1.default.$instance.globalData.cisCode };
            _this.methods.getExclusiveShopByCisCode(data).then(function (res2) {
                _this.supplierList = [];
                _this.supplierItem = {
                    name: '全部',
                    code: ''
                };
                (res.payload.list || []).map(function (i) {
                    _this.supplierList.push({
                        code: i.code,
                        name: i.name
                    });
                });
                (res2.payload || []).map(function (i) {
                    _this.supplierList.push({
                        code: i.cisCode,
                        name: i.searchTerm,
                        isES: true
                    });
                });
                _this.$apply();
            });
            // if(res && res.payload && res.payload.list && res.payload.list.length > 0) {
            //   this.supplierItem = {
            //     name: '全部',
            //     code: ''
            //   }
            // }
            // this.filterForm = {...this.filterForm,cisShopCode: ''}
            _this.$apply();
        });
        this.methods.grtFilterItemGroup({
            type: 2,
            orgId: ''
        }).then(function (res) {
            var matklList = res.payload.matklList;
            if (matklList && matklList.length > 0) {
                _this.materialItem = {
                    name: '全部品类',
                    code: ''
                };
            }
            _this.filterForm.matklCode = _this.materialItem.code;
            _this.$apply();
        });
        // {
        //   month: moment(month).format("YYYYMM"),
        //     operatorCode: cisCode,
        //   reSellCode: exclusiveShopCode ? "" : reSellCode,
        //   matklCode: matklCode,
        //   cisShopCode: exclusiveShopCode,
        //   isShop: exclusiveShopCode ? 1 : 0,
        // }
        this.filterForm.operatorCode = wepy_1.default.$instance.globalData.cisCode;
        this.methods.getData();
    };
    default_1 = __decorate([
        wepy_redux_1.connect({
            // supplierList({ search }) {
            //   return search.supplierList
            // },
            matklList: function (_a) {
                var search = _a.search;
                return search.dmsmatklList2;
            },
            operatePlanData: function (_a) {
                var home = _a.home;
                return home.operatePlanData;
            }
        }, {
            grtFilterItemGroup: search_1.grtFilterItemGroup,
            getOperatePlanReach: home_1.getOperatePlanReach,
            getFxDictCisCode: search_1.getFxDictCisCode,
            getExclusiveShopByCisCode: search_1.getExclusiveShopByCisCode
        })
    ], default_1);
    return default_1;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(default_1 , 'pages/terminal/report/operatePlanData/index'));

