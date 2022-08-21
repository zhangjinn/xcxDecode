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
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/dms-order-addition-detail/index.js');
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var purchaseshop_1 = require('./../../../store/actions/purchaseshop.js');
var channel_retail_order_1 = require('./../../../mixins/channel-retail-order.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var index_2 = require('./../../../utils/index.js');
var dmsorder_2 = require('./../../../store/types/dmsorder.js');
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var dmsorder_3 = require('./../../../store/types/dmsorder.js');
var salesorderdetail_1 = require('./../../../store/actions/salesorderdetail.js');
var dmsorder_4 = require('./../../../store/actions/dmsorder.js');
var index_3 = require('./../../../components/popup-toast/index.js');
var ChannelOrder = /** @class */ (function (_super) {
    __extends(ChannelOrder, _super);
    function ChannelOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '渠道订单编辑',
            usingComponents: {
                "van-popup": "/components/vant/popup/index",
                "van-toast": "/components/vant/toast/index",
                "item": "/components/dms-order-addition-detail-item/index",
                "van-icon": "/components/vant/icon/index",
                "van-submit-bar": "/components/vant/submit-bar/index",
                "van-transition": "/components/vant/transition/index",
                "van-field": "/components/vant/field/index",
                "van-dialog": "/components/vant/dialog/index"
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
            refreshPrice: false,
            showMore: false,
            org: {
                id: '',
                name: '请选择'
            },
            sendInventoryInfo: {
                id: '',
                name: '请选择'
            },
            receiveInventoryInfo: {
                id: '',
                name: '请选择'
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
            compareInfo: {}
        };
        _this.$repeat = {};
        _this.$props = { "popup": { "title": "编辑渠道订单失败" } };
        _this.$events = {};
        _this.components = {
            order: index_1.default,
            popup: index_3.default
        };
        /**
         * TODO: 保存成功后删除客户信息，商品信息
         */
        _this.methods = {
            // 应该获取那个值给popList   应该对比那个字段为选中信息
            openChoose: function (propName, fieldName, titleName) {
                var list = _this[propName];
                if (!list) {
                    list = _this.customerInfos[propName];
                }
                if (list.length === 0) {
                    // Toast(`暂无${titleName}`)
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
                _this.popVisible = false;
                if (popFiledName === 'store') {
                    var orgId = popList[index];
                    _this.additionOrderDetailItem.orgId = orgId;
                    _this.additionOrderDetailItem.cisCode = _this.customerInfos.cisCode;
                    var productIds = [];
                    var orgIds = [];
                    for (var key in _this.additionOrderDetailItem.itemInfo) {
                        var item = _this.additionOrderDetailItem.itemInfo[key];
                        if (item.productCode) {
                            productIds.push(item.productCode);
                            orgIds.push(orgId);
                        }
                    }
                    if (productIds.length > 0) {
                        // 获取最新价格
                        _this.methods.getCisPrice({
                            type: '2',
                            cisCode: _this.customerInfos.cisCode,
                            orgId: orgIds.join(','),
                            productId: productIds.join(',')
                        });
                    }
                }
            },
            showMore: function () {
                _this.showMore = true;
            },
            hiddenMore: function () {
                _this.showMore = false;
            },
            submit: function () {
                _this.methods.submited('submitted');
            },
            cache: function () {
                _this.methods.submited('draft');
            },
            // ”draft”为保存，”submitted”为提交
            /**
             * {
            "cisCode":"7111377",                    //cis编码
        "userAccount":"7111377",
           "status":"draft",                              //”draft”为保存，”submitted”为提交
            "salesOrder":{
                "documentDate":"2019-09-09",             //下单时间
                "edt":"2019-09-09",                         //期望时间
                "customerCode":"7111377",                 //客户编码
                "customerName":"莱西孙受海信专卖店",       //客户名称
                "orgId":"1231",                             //组织编码
                "billFromId":"423432",                      //开票方id
                "addressId":"134234",                      //收货地址id
                "inWarehouseId":"3424",                      //入库仓库id
                "retailType":"wholesale",                    //销售类型
                "sellerCode":"1",                            //业务员编码
                "sellerName":"小明",                        //业务员名
                "message":"备注",                           //备注
                "salesOrderItem":[                          //渠道订单明细
                    {
                        "productCode":"4234",                  //产品编码
                        "productName":"电视",                  //产品名称
                        "model":"KAJOFEI",                     //型号
                        "colour":"标准",                          //颜色
                        "borderedQty":"3",                      //销售数量
                        "bdemandQty":"3",                     //需求数量
                        "bprice":"200",                         //销售价格
                        "amount":"600",                        //金额小计
                        "invStatus":"3242"                     //库存状态id
                    },
                    {
                        "productCode":"4234",
                        "productName":"电视",
                        "model":"KAJOFEI",
                        "colour":"标准",
                        "borderedQty":"3",
                        "bdemandQty":"3",
                        "bprice":"200",
                        "amount":"600",
                        "invStatus":"3242"
                    }
                ]
            }
        }
             */
            submited: function (status) {
                if (_this.methods.checkParam()) {
                    var chooseCustomerInfo = _this.chooseCustomerInfo;
                    var _a = _this.data, org = _a.org, sendInventoryInfo = _a.sendInventoryInfo, receiveUnitInfo = _a.receiveUnitInfo, receiveInventoryInfo = _a.receiveInventoryInfo, receiverInfo = _a.receiverInfo, saleType = _a.saleType, invoiceInfo = _a.invoiceInfo, saler = _a.saler, note = _a.note;
                    var params = _this.$invoke('order', 'getParam');
                    // 校验产品是否重复
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
                    var time = index_2.formatDate(Date.parse(new Date()), 'Y-M-D');
                    // 组装数据
                    var orderInfo_1 = {
                        status: status,
                        salesOrder: {
                            id: _this.currentOrderId,
                            documentDate: time,
                            edt: time,
                            customerCode: chooseCustomerInfo.customerCode,
                            customerName: chooseCustomerInfo.customerName,
                            orgId: org.id,
                            billFromId: invoiceInfo.id,
                            billToId: receiveUnitInfo.id,
                            addressId: receiverInfo.id,
                            warehouseId: sendInventoryInfo.id,
                            inWarehouseId: receiveInventoryInfo.id,
                            retailType: saleType.id,
                            sellerCode: saler.id,
                            sellerName: saler.name,
                            message: note,
                            salesOrderItem: params.map(function (param) {
                                var itemInfo = param.itemInfo;
                                return {
                                    itemId: itemInfo.itemId || '',
                                    bigUom: itemInfo.uom,
                                    productCode: itemInfo.productCode,
                                    productName: itemInfo.productName,
                                    model: itemInfo.model,
                                    colour: itemInfo.colour,
                                    borderedQty: param.quantity,
                                    bdemandQty: param.quantity,
                                    bprice: (+param.price).toFixed(2),
                                    amount: param.amount,
                                    invStatus: param.inventory,
                                };
                            })
                        }
                    };
                    dialog_1.default.confirm({
                        title: '提示',
                        message: "\u672C\u5355\u636E\u5171\u6709" + params.length + "\u4E2A\u4EA7\u54C1\uFF0C\u786E\u5B9A\u8981" + (status === 'submitted' ? '提交' : '暂存') + "\u5417?"
                    }).then(function () {
                        _this.methods.submitChannelOrder(__assign({}, orderInfo_1, { _ignoreToast: true, _popup: true })).then(function (res) {
                            var code = res.payload.code;
                            if (code === '0') {
                                // 保存成功
                                toast_1.default.success({
                                    message: (status === 'submitted' ? '提交' : '暂存') + "\u6210\u529F",
                                    onClose: function () {
                                        wx.navigateBack({
                                            delta: 1,
                                        });
                                    }
                                });
                            }
                        });
                    }).catch(function () {
                        // on cancel
                    });
                }
            },
            checkParam: function () {
                // 检查Head里面必填信息
                // 除发货仓库，其他均是必选
                var chooseCustomerInfo = _this.chooseCustomerInfo;
                var _a = _this.data, org = _a.org, receiveInventoryInfo = _a.receiveInventoryInfo, receiverInfo = _a.receiverInfo, saleType = _a.saleType, invoiceInfo = _a.invoiceInfo, saler = _a.saler;
                if (!chooseCustomerInfo.customerCode) {
                    toast_1.default.fail('请选择客户信息');
                    return false;
                }
                if (!org.id) {
                    toast_1.default.fail('请选择供应商');
                    return false;
                }
                if (!receiveInventoryInfo.id) {
                    toast_1.default.fail('请选择入库仓库');
                    return false;
                }
                if (!receiverInfo.id) {
                    toast_1.default.fail('请选择收货地址');
                    return false;
                }
                if (!saleType.id) {
                    toast_1.default.fail('请选择销售类型');
                    return false;
                }
                if (!invoiceInfo.id) {
                    toast_1.default.fail('请选择开票方');
                    return false;
                }
                if (!saler.id) {
                    toast_1.default.fail('请选择业务员');
                    return false;
                }
                var _b = _this.$invoke('order', 'checkParam'), errMsg = _b.errMsg, submitLines = _b.submitLines;
                if (errMsg !== '') {
                    // toast
                    toast_1.default.fail(errMsg);
                    return false;
                }
                else if (submitLines === 0) {
                    toast_1.default.fail('请先添加产品再保存');
                    return false;
                }
                return true;
            },
            onNoteChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.note = detail;
                _this.$apply();
            })
        };
        // plsChoose = {
        //   id: '',
        //   name: '请选择'
        // }
        _this.watch = {
            'org': function (newValue, oldValue) {
                if (newValue.id) {
                    _this.additionOrderDetailItem.orgId = newValue.id;
                    _this.additionOrderDetailItem.cisCode = _this.customerInfos.cisCode;
                    var productIds = [];
                    var orgIds = [];
                    for (var key in _this.additionOrderDetailItem.itemInfo) {
                        var item = _this.additionOrderDetailItem.itemInfo[key];
                        if (item.productCode) {
                            orgIds.push(newValue.id);
                            productIds.push(item.productCode);
                        }
                    }
                    if (productIds.length > 0) {
                        // 获取最新价格
                        _this.methods.getCisPrice({
                            type: '2',
                            cisCode: _this.customerInfos.cisCode,
                            refreshPrice: _this.refreshPrice,
                            orgId: orgIds.join(','),
                            productId: productIds.join(',')
                        });
                    }
                }
                _this.refreshPrice = true;
            },
            'customerInfos': function (newValue) {
                var _a = _this.chooseCustomerInfo, orgId = _a.orgId, inWarehouseId = _a.inWarehouseId, billToId = _a.billToId, addressId = _a.addressId;
                // 收货地址
                if (newValue.customerAddressAllList.length > 0) {
                    var chooseItem = newValue.customerAddressAllList.find(function (item) { return item.id === addressId; });
                    if (chooseItem) {
                        _this.receiverInfo = chooseItem;
                    }
                    else {
                        var item = newValue.customerAddressAllList[0];
                        _this.receiverInfo = item;
                    }
                }
                else {
                    _this.receiverInfo = {
                        id: '',
                        name: '请选择'
                    };
                }
                if (newValue.customerAllList.length > 0) {
                    // billToId
                    var chooseItem = newValue.customerAllList.find(function (item) { return item.id === billToId; });
                    if (chooseItem) {
                        _this.receiveUnitInfo = chooseItem;
                    }
                    else {
                        var item = newValue.customerAllList[0];
                        _this.receiveUnitInfo = item;
                    }
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
                    var chooseItem = newValue.inWarehouseList.find(function (item) { return item.id === inWarehouseId; });
                    if (chooseItem) {
                        _this.receiveInventoryInfo = chooseItem;
                    }
                    else {
                        _this.receiveInventoryInfo = newValue.inWarehouseList[0];
                    }
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
                    var chooseItem = newValue.orgList.find(function (item) { return item.id === orgId; });
                    if (chooseItem) {
                        _this.org = chooseItem;
                    }
                    else {
                        var item = newValue.orgList[0];
                        _this.org = item;
                    }
                }
                else {
                    _this.org = {
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
    ChannelOrder.prototype.onShow = function () {
        if (this.loading) {
            toast_1.default.loading({
                message: '正在加载',
                duration: 0
            });
        }
    };
    ChannelOrder.prototype.onLoad = function (e) {
        var _this = this;
        // onLoad(params) {
        // if (params.loadCustomerInfo) {
        //   this.methods.getNormalSalesOrderCustomerInfo({ customerCode: chooseCustomerInfo.customerCode })
        // }
        this.methods.getBaseData({
            type: 'kpf'
        });
        this.methods.getBaseData({
            type: 'ywy'
        });
        this.methods.getBaseData({
            type: 'fhck'
        });
        var id = e.id;
        this.currentOrderId = id;
        this.methods.toNormalOrderEdit({ salesOrderId: this.currentOrderId }).then(function (res) {
            var salesOrder = res.payload.salesOrder;
            var orgId = salesOrder.orgId;
            var retailType = salesOrder.retailType;
            _this.note = salesOrder.message;
            _this.sendInventoryInfo = {
                id: salesOrder.warehouseId,
                name: "" + (salesOrder.warehouseName ? salesOrder.warehouseName : '请选择')
            };
            _this.saler = {
                id: salesOrder.sellerCode,
                name: salesOrder.sellerName
            };
            _this.invoiceInfo = {
                id: salesOrder.billFromId,
                name: salesOrder.billFromName
            };
            var saleType = _this.saleTypes.find(function (item) { return item.id === retailType; }) || _this.saleTypes[0];
            _this.saleType = saleType;
            wepy_redux_1.getStore().dispatch({
                type: dmsorder_3.DMS_ORDER_CHOOSE_CUSTOMER_INFO,
                payload: res.payload.salesOrder
            });
            var keys = [];
            var items = {};
            var productIds = [];
            var orgIds = [];
            res.payload.salesOrder.salesOrderItem.forEach(function (_a) {
                var invStatus = _a.invStatus, itemId = _a.itemId, bigUom = _a.bigUom, productCode = _a.productCode, productName = _a.productName, model = _a.model, colour = _a.colour, borderedQty = _a.borderedQty, bprice = _a.bprice, amount = _a.amount;
                var key = "_" + (new Date()).valueOf();
                keys.push(key);
                productIds.push(productCode);
                orgIds.push(orgId);
                _this.methods.getItemInvStatus({
                    productCode: productCode,
                });
                items[key] = {
                    itemId: itemId,
                    productCode: productCode,
                    productName: productName,
                    model: model,
                    colour: colour,
                    quantity: borderedQty,
                    price: bprice,
                    amount: (+amount).toFixed(2),
                    invStatusId: invStatus,
                    invStatus: [],
                    uom: bigUom //单位
                };
            });
            // this.methods.getCisPrice({
            //   type: '2',
            //   cisCode: this.customerInfos.cisCode,
            //   productId: productIds.join(','),
            //   orgId: orgIds.join(',')
            // })
            // DMS_CHANNEL_ORDER_ADD_ITEMS
            wepy_redux_1.getStore().dispatch({
                type: dmsorder_2.DMS_CHANNEL_ORDER_ADD_ITEMS,
                payload: items,
            });
            _this.$broadcast('details', keys.join(','));
            _this.methods.getNormalSalesOrderCustomerInfo({ customerCode: res.payload.salesOrder.customerCode });
            _this.$apply();
            // getStore().dispatch({
            //   type: DMS_CIS_CODE_INFO,
            //   payload: {
            //     cisCode: this.customerInfos.cisCode,
            //     orgId,
            //   }
            // })
        });
    };
    ChannelOrder = __decorate([
        wepy_redux_1.connect({
            chooseCustomerInfo: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.chooseCustomerInfo;
            },
            customerInfos: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.customerInfos;
            },
            loading: function (_a) {
                var loading = _a.loading;
                return loading.loading;
            },
            kpfList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.kpfList;
            },
            ywyList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.ywyList;
            },
            fhckList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.fhckList;
            },
            orderdetail: function (_a) {
                var salesorderdetail = _a.salesorderdetail;
                return salesorderdetail.normalorderdetail;
            },
            additionOrderDetailItem: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.chooseItemInfo;
            }
        }, {
            getBaseData: purchaseshop_1.getBaseData,
            getNormalSalesOrderCustomerInfo: dmsorder_1.getNormalSalesOrderCustomerInfo,
            submitChannelOrder: dmsorder_1.submitChannelOrder,
            toNormalOrderEdit: salesorderdetail_1.toNormalOrderEdit,
            getItemInvStatus: dmsorder_4.getItemInvStatus,
            getCisPrice: dmsorder_1.getCisPrice
        })
    ], ChannelOrder);
    return ChannelOrder;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(ChannelOrder , 'pages/dms/channel-order-detail/index'));

