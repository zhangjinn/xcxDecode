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
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/dms-order-addition-detail/index.js');
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var purchaseshop_1 = require('./../../../store/actions/purchaseshop.js');
var channel_retail_order_1 = require('./../../../mixins/channel-retail-order.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var index_2 = require('./../../../utils/index.js');
var return_stock_1 = require('./../../../store/actions/return-stock.js');
var dmsrequest_1 = require('./../../../store/actions/dmsrequest.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var ReturnStock = /** @class */ (function (_super) {
    __extends(ReturnStock, _super);
    function ReturnStock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '退货入库',
            usingComponents: {
                "van-popup": "/components/vant/popup/index",
                "van-toast": "/components/vant/toast/index",
                "item": "/components/dms-order-addition-detail-item/index",
                "van-icon": "/components/vant/icon/index",
                "van-submit-bar": "/components/vant/submit-bar/index",
                "van-transition": "/components/vant/transition/index",
                "van-field": "/components/vant/field/index",
                "van-dialog": "/components/vant/dialog/index",
                'stores': '../../../components/stores-return/index',
                'calendar': '../../../components/calendar/index',
                'distributor-material-group': '../../../components/distributor-material-group/'
            },
        };
        _this.mixins = [channel_retail_order_1.default];
        _this.saleTypes = [{
                id: 'wholesale',
                name: '批发'
            }, {
                id: 'engineering',
                name: '工程'
            }];
        _this.data = {
            item: {
                customerCode: '',
                orgId: ''
            },
            personalsupply: [],
            calendarShow: false,
            currentDateName: '',
            documentDate: '',
            showMore: false,
            org: {
                key: '',
                value: '请选择'
            },
            ssmdInfo: {
                value: '请选择',
                key: '',
                isSelect: ''
            },
            sendInventoryInfo: {
                id: '',
                name: '请选择'
            },
            receiveInventoryInfo: {
                key: '',
                value: '请选择'
            },
            receiveUnitInfo: {
                id: '',
                name: ''
            },
            receiverInfo: {
                id: '',
                name: '请选择'
            },
            saleType: {
                id: 'wholesale',
                name: '批发'
            },
            invoiceInfo: {
                id: '',
                name: '请选择'
            },
            saler: {
                id: '',
                name: '请选择'
            },
            note: '',
            amount: '0.00',
            popList: [],
            popTitle: '',
            popVisible: false,
            popFiledName: '',
            compareInfo: {},
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
        };
        _this.components = {
            order: index_1.default,
        };
        _this.methods = {
            checkParam: function () {
                // 检查Head里面必填信息
                // 除发货仓库，其他均是必选
                var chooseCustomerInfo = _this.chooseCustomerInfo;
                // receiverInfo, saleType, invoiceInfo, saler
                var _a = _this.data, org = _a.org, receiveInventoryInfo = _a.receiveInventoryInfo;
                if (!chooseCustomerInfo.customerCode) {
                    toast_1.default.fail('请选择客户信息');
                    return false;
                }
                if (!receiveInventoryInfo.key) {
                    toast_1.default.fail('请选择入库仓库');
                    return false;
                }
                if (!org.key) {
                    toast_1.default.fail('请选择供应商');
                    return false;
                }
                if (!_this.documentDate) {
                    toast_1.default.fail('请选择单据日期');
                    return false;
                }
                var errMsg = _this.$invoke('order', 'checkParam').errMsg;
                if (errMsg !== '') {
                    toast_1.default.fail(errMsg);
                    return false;
                }
                return true;
            },
            // 入库
            OnseleWarehouse: function () {
                if (_this.methods.checkParam()) {
                    var chooseCustomerInfo = _this.chooseCustomerInfo;
                    var _a = _this.data, org = _a.org, ssmdInfo = _a.ssmdInfo, receiveInventoryInfo = _a.receiveInventoryInfo, note = _a.note;
                    var params = _this.$invoke('order', 'getParam');
                    var paramObj = [];
                    for (var index in params) {
                        var param = params[index];
                        var key = param.itemInfo.model + "_" + param.itemInfo.colour;
                        if (paramObj.indexOf(key) > -1) {
                            toast_1.default("\u4EA7\u54C1\u578B\u53F7" + param.itemInfo.model + "\u91CD\u590D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u4EA7\u54C1!");
                            return;
                        }
                        else {
                            paramObj.push(key);
                        }
                    }
                    var orderinfo = {
                        _loading: true,
                        userAccount: wepy_1.default.$instance.globalData.account,
                        data: {
                            documentDate: _this.documentDate,
                            customerCode: chooseCustomerInfo.customerCode,
                            billFromId: _this.kpfList[0].id,
                            sellerCode: _this.ywyList[0].id,
                            storeCode: ssmdInfo.key,
                            inWarehouseId: receiveInventoryInfo.key,
                            supplierCode: org.supplierCode,
                            orgId: org.orgId,
                            message: note,
                            orderItems: params.map(function (param) {
                                var itemInfo = param.itemInfo;
                                return {
                                    productCode: itemInfo.productCode,
                                    productName: itemInfo.productName,
                                    model: itemInfo.model,
                                    colour: itemInfo.colour,
                                    borderedQty: param.quantity,
                                    bprice: (+param.price).toFixed(2),
                                    amount: param.amount,
                                    invStatusId: param.inventory,
                                };
                            })
                        }
                    };
                    _this.methods.getReturnIn(orderinfo).then(function (res) {
                        if (res && res.payload && res.payload.code && res.payload.code == "0") {
                            toast_1.default.success({
                                message: '商品入库成功',
                                duration: 1000,
                            });
                            _this.$broadcast('relaunch');
                            _this.chooseCustomerInfo.address = '';
                            _this.chooseCustomerInfo.customerCode = '';
                            _this.chooseCustomerInfo.customerTypeName = '';
                            _this.chooseCustomerInfo.customerName = '';
                            _this.chooseCustomerInfo.legalPerson = '';
                            _this.org = {
                                key: '',
                                value: '请选择',
                                orgId: '',
                            };
                            _this.receiveInventoryInfo = {
                                key: '',
                                value: '请选择'
                            };
                            _this.documentDate = '';
                            _this.note = '';
                            _this.amount = 0.00;
                            _this.$apply();
                        }
                    });
                }
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var documentDate = this.documentDate;
                var name = e.target.dataset.name;
                this.currentDateName = name;
                var begin;
                begin = documentDate;
                this.$wxpage.calendar.enableArea([minDate, maxDate]);
                this.calendarShow = true;
            },
            chooseDay: function (evt) {
                var _a = evt.detail, year = _a.year, month = _a.month, day = _a.day;
                var day = year + "-" + index_2.fillZero("" + month) + "-" + index_2.fillZero("" + day);
                this.documentDate = day;
                this.calendarShow = false;
            },
            closeCalendar: function () {
                this.calendarShow = false;
            },
            // 选择下拉列表
            openChoose: function (propName, fieldName, titleName) {
                var list = _this[propName];
                if (!list) {
                    list = _this.customerInfos[propName];
                }
                if (list.length === 0) {
                    return;
                }
                _this.popList = list;
                _this.compareInfo = _this.data[fieldName];
                _this.popFiledName = fieldName;
                _this.popTitle = titleName;
                _this.popVisible = true;
            },
            onClose: function () {
                _this.popVisible = false;
            },
            onChoose: function (_a) {
                var currentTarget = _a.currentTarget;
                var dataset = currentTarget.dataset;
                var index = dataset.index;
                var _b = _this.data, popFiledName = _b.popFiledName, popList = _b.popList;
                _this[popFiledName] = popList[index];
                var Status = {
                    cisCode: wepy_1.default.$instance.globalData.cisCode,
                    storeCode: _this.ssmdInfo.key
                };
                if (_this.popFiledName == 'ssmdInfo') {
                    dmsrequest_1.dmsRequest({
                        data: Status,
                        method: 'findMaterialByStore'
                    }).then(function (res) {
                        var Item = [];
                        ramda_1.forEachObjIndexed(function (value, key) {
                            var item = {
                                value: value,
                                key: key,
                            };
                            Item.push(item);
                        }, res.materialGroup);
                        _this.personalsupply = Item;
                        _this.$apply();
                    });
                }
                _this.popVisible = false;
            },
            showMore: function () {
                _this.showMore = true;
            },
            hiddenMore: function () {
                _this.showMore = false;
            },
            submit: function (status) {
                _this.methods.submited('submitted');
            },
            cache: function () {
                _this.methods.submited('draft');
            },
            onNoteChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.note = detail;
            })
        };
        _this.watch = {
            'chooseCustomerInfo': function () {
                _this.org = {
                    key: '',
                    value: '请选择',
                    orgId: '',
                };
                if (_this.chooseCustomerInfo && _this.chooseCustomerInfo.customerCode && _this.chooseCustomerInfo.legalPerson !== '') {
                    _this.item.customerCode = _this.chooseCustomerInfo.customerCode;
                    _this.item.orgId = '';
                    _this.$apply();
                }
                else {
                    _this.item.customerCode = '',
                        _this.item.orgId = '';
                }
            },
            'org': function () {
                if (_this.org && _this.org.orgId && _this.chooseCustomerInfo && _this.chooseCustomerInfo.legalPerson !== '') {
                    _this.item.orgId = _this.org.orgId;
                    _this.$apply();
                }
            },
            'customerInfos': function (newValue) {
                // 收货地址
                if (newValue.customerAddressAllList.length > 0) {
                    var item = newValue.customerAddressAllList[0];
                    _this.receiverInfo = item;
                }
                else {
                    _this.receiverInfo = {
                        id: '',
                        name: '请选择'
                    };
                }
                if (newValue.customerAllList.length > 0) {
                    var item = newValue.customerAllList[0];
                    _this.receiveUnitInfo = item;
                }
                else {
                    _this.receiveUnitInfo = {
                        id: '',
                        name: '请选择'
                    };
                }
                // 入库仓库
                // receiveInventoryInfo
                if (newValue.inWarehouseList.length > 0) {
                    _this.receiveInventoryInfo = newValue.inWarehouseList[0];
                }
                else {
                    _this.receiveInventoryInfo = {
                        id: '',
                        name: '请选择'
                    };
                }
                //
                // 供应商
                if (newValue.orgList.length > 0) {
                    var item = newValue.orgList[0];
                    _this.org = item;
                }
                else {
                    _this.org = {
                        id: '',
                        name: '请选择'
                    };
                }
                _this.$apply();
            },
            'kpfList': function (newValue) {
                if (newValue.length > 0) {
                    var item = newValue[0];
                    _this.invoiceInfo = item;
                }
                else {
                    _this.invoiceInfo = {
                        id: '',
                        name: '请选择'
                    };
                }
                _this.$apply();
            },
            'ywyList': function (newValue) {
                if (newValue.length > 0) {
                    var item = newValue[0];
                    _this.saler = item;
                }
                else {
                    _this.saler = {
                        id: '',
                        name: '请选择'
                    };
                }
                _this.$apply();
            },
            'fhckList': function (newValue) {
                if (newValue.length > 0) {
                    var item = newValue[0];
                    _this.sendInventoryInfo = item;
                }
                else {
                    _this.sendInventoryInfo = {
                        id: '',
                        name: '请选择'
                    };
                }
                _this.$apply();
            },
        };
        _this.events = {
            'amount-change': function (payload) {
                _this.amount = "" + ((+_this.amount) + (+payload.amount)).toFixed(2);
            }
        };
        return _this;
    }
    ReturnStock.prototype.onShow = function () {
        if (this.loading) {
            toast_1.default.loading({
                message: '正在加载',
                duration: 0
            });
        }
    };
    ReturnStock.prototype.onLoad = function () {
        this.$broadcast('return-stock');
        this.methods.getReturnSupplier({
            _loading: true,
            cisCode: wepy_1.default.$instance.globalData.cisCode
        });
        // 获取基本信息
        this.methods.getBaseData({
            type: 'cglrrkck' // 入库仓库
        });
        this.methods.getBaseData({
            type: 'ssmd' // 所属门店
        });
        this.methods.getBaseData({
            type: 'ywy' // 业务员
        });
        this.methods.getBaseData({
            type: 'kpf' // 开票方
        });
        this.methods.getBaseData({
            type: 'gys' // 供应商
        });
    };
    ReturnStock = __decorate([
        wepy_redux_1.connect({
            returnOrderList: function (_a) {
                var returnstock = _a.returnstock;
                return returnstock.returnOrderList;
            },
            chooseCustomerInfo: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.chooseCustomerInfo;
            },
            customerInfos: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.customerInfos;
            },
            orgList: function (_a) {
                var returnstock = _a.returnstock;
                return returnstock.orgList;
            },
            inWarehouseList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.baseData;
            },
            loading: function (_a) {
                var loading = _a.loading;
                return loading.loading;
            },
            kpfList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.kpfList;
            },
            StoresList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.StoresList;
            },
            ywyList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.ywyList;
            },
            fhckList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.fhckList;
            }
        }, {
            getBaseData: purchaseshop_1.getBaseData,
            getNormalSalesOrderCustomerInfo: dmsorder_1.getNormalSalesOrderCustomerInfo,
            submitChannelOrder: dmsorder_1.submitChannelOrder,
            getReturnSupplier: return_stock_1.getReturnSupplier,
            getReturnIn: return_stock_1.getReturnIn
        })
    ], ReturnStock);
    return ReturnStock;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(ReturnStock , 'pages/dms/order-return-stock/index'));

