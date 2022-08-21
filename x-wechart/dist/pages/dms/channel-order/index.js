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
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/dms-order-addition-detail/index.js');
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var purchaseshop_1 = require('./../../../store/actions/purchaseshop.js');
var distributorsorder_1 = require('./../../../store/actions/distributorsorder.js');
var channel_retail_order_1 = require('./../../../mixins/channel-retail-order.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var index_2 = require('./../../../utils/index.js');
var dmsorder_2 = require('./../../../store/types/dmsorder.js');
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var index_3 = require('./../../../components/popup-toast/index.js');
var ChannelOrder = /** @class */ (function (_super) {
    __extends(ChannelOrder, _super);
    function ChannelOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '分销录入',
            usingComponents: {
                "van-popup": "/components/vant/popup/index",
                "van-toast": "/components/vant/toast/index",
                "item": "/components/dms-order-addition-detail-item/index",
                "van-icon": "/components/vant/icon/index",
                "van-submit-bar": "/components/vant/submit-bar/index",
                "van-transition": "/components/vant/transition/index",
                "van-field": "/components/vant/field/index",
                "van-dialog": "/components/vant/dialog/index",
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
            isDisabled: true,
            showMore: false,
            item: {
                customerCode: '',
                orgId: ''
            },
            org: {
                id: '',
                name: '请选择'
            },
            sendInventoryInfo: {
                id: '',
                name: '请选择',
                type: '',
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
            deliveryMethod: {
                id: '',
                name: '请选择'
            },
            note: '',
            amount: '0.00',
            volume: '0.00',
            popList: [],
            popTitle: '',
            popVisible: false,
            popFiledName: '',
            compareInfo: {},
            isNoticePopupShow: false,
            expressFee: wepy_1.default.$instance.globalData.expressFee,
            freeShippingTip: '',
            warehouseList: [],
            customerAddressAllList: [],
        };
        _this.$repeat = {};
        _this.$props = { "order": { "xmlns:v-bind": "", "v-bind:out.sync": "sendInventoryInfo", "v-bind:orgId.sync": "org", "ly": "channel", "v-bind:isDisabled.sync": "isDisabled" }, "popup": { "title": "创建渠道订单失败" } };
        _this.$events = {};
        _this.components = {
            order: index_1.default,
            popup: index_3.default
        };
        /**
         * TODO: 保存成功后删除客户信息，商品信息
         */
        _this.methods = {
            //提示框
            noticePopupOpen: function () {
                _this.isNoticePopupShow = true;
            },
            noticePopupClose: function () {
                _this.isNoticePopupShow = false;
            },
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
                if ('receiverInfo' == popFiledName) {
                    if (popList[index] && popList[index].regionStatus === 'D') { // 判断行政区域地址库是否失效 A有效，D失效。失效的话禁止选择
                        toast_1.default.fail('由于行政区划调整，请您及时更新您的收获地址信息');
                        return false;
                    }
                }
                _this[popFiledName] = popList[index];
                //
                // if(popFiledName == 'org'){
                //   this.getWarehouseListData()
                // }
                _this.popVisible = false;
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
            submited: function (status) { return __awaiter(_this, void 0, void 0, function () {
                var that, products, key, item;
                return __generator(this, function (_a) {
                    that = this;
                    products = [];
                    // 只要有一个产品包含免运费标识需要加提示
                    for (key in this.additionOrderDetailItem.itemInfo) {
                        item = this.additionOrderDetailItem.itemInfo[key];
                        if (item.productLabel && item.productLabel.indexOf('15691143850') >= 0) {
                            products.push(item);
                        }
                    }
                    if (products.length > 0) {
                        wx.showModal({
                            title: '提示',
                            content: '1、当天截单时间内，同批量订单达到起运量（电视3台，白电或全品类2方），则免配送费！\r\n2、当天截单时间内，同批量订单若包含至少1件单价超万元产品或激光，则免配送费！\r\n3、若不满足以上条件，将按照统仓统配合同不足起运量收费标准向您收取物流费用！\r\n⭐以上政策仅限开通统仓统配区域商家！！！',
                            success: function (res) {
                                if (res.confirm) {
                                    if (that.methods.checkParam()) {
                                        that.methods.sendRequest(status);
                                    }
                                }
                            },
                        });
                    }
                    else {
                        if (that.methods.checkParam()) {
                            that.methods.sendRequest(status);
                        }
                    }
                    return [2 /*return*/];
                });
            }); },
            sendRequest: function (status) { return __awaiter(_this, void 0, void 0, function () {
                var chooseCustomerInfo, _a, org, sendInventoryInfo, receiveUnitInfo, receiveInventoryInfo, receiverInfo, saleType, invoiceInfo, saler, note, deliveryMethod, params, paramObj, materialGroupCode, index, param, key, systemParametersObj, systemParameters, isOpenSharedWarehouseObj, isOpenSharedWarehouse, time, orderInfo;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            chooseCustomerInfo = this.chooseCustomerInfo;
                            _a = this.data, org = _a.org, sendInventoryInfo = _a.sendInventoryInfo, receiveUnitInfo = _a.receiveUnitInfo, receiveInventoryInfo = _a.receiveInventoryInfo, receiverInfo = _a.receiverInfo, saleType = _a.saleType, invoiceInfo = _a.invoiceInfo, saler = _a.saler, note = _a.note, deliveryMethod = _a.deliveryMethod;
                            params = this.$invoke('order', 'getParam');
                            paramObj = [];
                            materialGroupCode = '';
                            if (params && params[0]) {
                                materialGroupCode = params[0].itemInfo.materialGroupCode;
                            }
                            for (index in params) {
                                param = params[index];
                                key = param.itemInfo.model + "_" + param.itemInfo.colour;
                                if (paramObj.indexOf(key) > -1) {
                                    toast_1.default("\u4EA7\u54C1\u578B\u53F7" + param.itemInfo.model + "\u91CD\u590D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u4EA7\u54C1!");
                                    return [2 /*return*/];
                                }
                                else {
                                    paramObj.push(key);
                                }
                            }
                            return [4 /*yield*/, this.methods.getSystemParameters({ key: 'QD_ONLY_SHARE_STORE' })];
                        case 1:
                            systemParametersObj = _b.sent();
                            systemParameters = '';
                            if (systemParametersObj && systemParametersObj.payload && systemParametersObj.payload.data) {
                                systemParameters = systemParametersObj.payload.data;
                            }
                            if (!(systemParameters == 'Y')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.methods.getIsOpenSharedWarehouse({ orgId: this.org.id, matklId: materialGroupCode })];
                        case 2:
                            isOpenSharedWarehouseObj = _b.sent();
                            isOpenSharedWarehouse = '';
                            if (isOpenSharedWarehouseObj && isOpenSharedWarehouseObj.payload && isOpenSharedWarehouseObj.payload.data) {
                                isOpenSharedWarehouse = isOpenSharedWarehouseObj.payload.data;
                                if (isOpenSharedWarehouse == 'Y') {
                                    if (this.sendInventoryInfo.type == '70') {
                                        toast_1.default.fail('开通共享仓的商家只能从统仓发货');
                                        return [2 /*return*/, false];
                                    }
                                }
                            }
                            _b.label = 3;
                        case 3:
                            time = index_2.formatDate(Date.parse(new Date()), 'Y-M-D');
                            orderInfo = {
                                status: status,
                                salesOrder: {
                                    id: '',
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
                                    deliveryMode: deliveryMethod.id,
                                    salesOrderItem: params.map(function (param) {
                                        var itemInfo = param.itemInfo;
                                        return {
                                            itemId: '',
                                            bigUom: itemInfo.uom,
                                            productCode: itemInfo.productCode,
                                            productName: itemInfo.productName,
                                            model: itemInfo.model,
                                            colour: itemInfo.colour,
                                            borderedQty: param.quantity,
                                            bdemandQty: param.quantity,
                                            bprice: (+param.price).toFixed(2),
                                            amount: param.amount,
                                            volume: param.volume,
                                            invStatus: param.inventory,
                                            invStatusType: param.invState,
                                            materialCode: itemInfo.materialCode //物料编码
                                        };
                                    })
                                }
                            };
                            dialog_1.default.confirm({
                                title: '提示',
                                message: "\u672C\u5355\u636E\u5171\u6709" + params.length + "\u4E2A\u4EA7\u54C1\uFF0C\u786E\u5B9A\u8981" + (status === 'submitted' ? '提交' : '暂存') + "\u5417?"
                            }).then(function () {
                                _this.methods.submitChannelOrder(__assign({}, orderInfo, { _ignoreToast: true, _popup: true })).then(function (res) {
                                    var code = (res.payload || '-1').code;
                                    if (code === '0') {
                                        // 保存成功
                                        toast_1.default.success({
                                            message: (status === 'submitted' ? '提交' : '暂存') + "\u6210\u529F",
                                            onClose: function () {
                                                _this.amount = '0.00';
                                                var store = wepy_redux_1.getStore();
                                                store.dispatch({
                                                    type: dmsorder_2.DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
                                                });
                                                _this.$broadcast('relaunch');
                                                _this.initData();
                                            }
                                        });
                                        _this.note = '';
                                        _this.saleType = {
                                            id: 'wholesale',
                                            name: '批发'
                                        };
                                        _this.$apply();
                                    }
                                });
                            }).catch(function () {
                                // on cancel
                            });
                            return [2 /*return*/];
                    }
                });
            }); },
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
                //不校验入库仓库
                /*if (!receiveInventoryInfo.id) {
                  Toast.fail('请选择入库仓库')
                  return false
                }*/
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
            'loading': function (newValue) {
                if (!newValue) {
                    toast_1.default.clear();
                }
            },
            'chooseCustomerInfo': function () {
                if (_this.chooseCustomerInfo && _this.chooseCustomerInfo.customerCode && _this.chooseCustomerInfo.legalPerson !== '') {
                    _this.item.customerCode = _this.chooseCustomerInfo.customerCode;
                    _this.item.orgId = '';
                    _this.$apply();
                }
            },
            'org': function () {
                if (_this.org && _this.org.id) {
                    _this.additionOrderDetailItem.orgId = _this.org.id;
                    _this.additionOrderDetailItem.cisCode = _this.customerInfos.cisCode;
                    var productIds = [];
                    var orgIds = [];
                    for (var key in _this.additionOrderDetailItem.itemInfo) {
                        var item = _this.additionOrderDetailItem.itemInfo[key];
                        if (item.productCode) {
                            productIds.push(item.productCode);
                            orgIds.push(_this.org.id);
                        }
                    }
                    if (productIds.length > 0) {
                        // 获取最新价格
                        _this.methods.getCisPrice({
                            type: '2',
                            cisCode: _this.customerInfos.cisCode,
                            refreshPrice: true,
                            orgId: orgIds.join(','),
                            productId: productIds.join(',')
                        });
                    }
                    _this.getWarehouseListData();
                    _this.getDmsShopAddressData();
                }
                if (_this.org && _this.org.orgId && _this.chooseCustomerInfo && _this.chooseCustomerInfo.legalPerson !== '') {
                    _this.item.orgId = _this.org.orgId;
                    _this.$apply();
                }
            },
            'customerInfos': function (newValue) {
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
            // 'fhckList': (newValue: Array<Object>) => {
            //   if (newValue.length > 0) {
            //     const item = newValue[0]
            //     this.sendInventoryInfo = item
            //   } else {
            //     this.sendInventoryInfo = {
            //       id: '',
            //       name: '请选择'
            //     }
            //   }
            //   this.$apply()
            // },
            'warehouseList': function (newValue) {
                if (newValue.length > 0) {
                    var item = newValue[0];
                    _this.sendInventoryInfo = item;
                }
                else {
                    _this.sendInventoryInfo = {
                        id: '',
                        name: '请选择',
                        type: '',
                    };
                }
                _this.$apply();
            },
            'deliveryMode': function (newValue) {
                if (newValue && newValue.length > 0) {
                    this.deliveryMethod = newValue[0];
                }
                else {
                    this.deliveryMethod = {
                        id: '',
                        name: '请选择'
                    };
                }
                this.$apply();
            }
        };
        _this.events = {
            'amount-change': function (payload) {
                //let payAmount = Number(payload.amount);
                //this.amount = (payAmount).toFixed(2)
                _this.amount = "" + ((+_this.amount) + (+payload.amount)).toFixed(2);
            },
            'volume-change': function (payload) {
                //let payVolume = Number(payload.volume);
                //this.volume = (payVolume).toFixed(2)
                _this.volume = "" + ((+_this.volume) + (+payload.volume)).toFixed(2);
            }
        };
        return _this;
    }
    ChannelOrder.prototype.onShow = function () {
        this.freeShippingTip = index_2.getAlertInfo('14187495683'); // 免运费提示信息
    };
    ChannelOrder.prototype.initData = function () {
        this.methods.getBaseData({
            type: 'kpf'
        });
        this.methods.getBaseData({
            type: 'ywy'
        });
        this.warehouseList = [];
        // this.methods.getBaseData({
        //   type: 'fhck',
        //   warehouseType: 20
        // })
    };
    // 渠道订单录入中收货地址的获取改为CIS分销商地址的接口，与分销商渠道下单收货地址接口一致
    ChannelOrder.prototype.getDmsShopAddressData = function () {
        var _this = this;
        var cisCode = this.chooseCustomerInfo && this.chooseCustomerInfo.customerCisCode;
        this.methods.getDmsShopAddress({
            cisCode: cisCode,
            orgId: this.org.id,
        }).then(function (res) {
            if (res && res.payload && res.payload.list && res.payload.list.length > 0) {
                var addresslist_1 = [];
                res.payload.list.forEach(function (item) {
                    var add = {
                        name: item.address,
                        id: item.id,
                        regionStatus: item.regionStatus,
                    };
                    addresslist_1.push(add);
                });
                _this.customerAddressAllList = addresslist_1;
                // 收货地址
                if (_this.customerAddressAllList.length > 0 && _this.customerAddressAllList[0].regionStatus === 'A') {
                    var item = _this.customerAddressAllList[0];
                    _this.receiverInfo = item;
                }
                else {
                    _this.receiverInfo = {
                        id: '',
                        name: '请选择'
                    };
                }
            }
        });
    };
    //  获取仓库列表
    ChannelOrder.prototype.getWarehouseListData = function () {
        var _this = this;
        // 获取仓库列表
        this.methods.getWarehouseList(this.org.id).then(function (res) {
            var data = res.payload.data || [];
            _this.warehouseList = data.map(function (it) {
                return {
                    name: it.name,
                    id: it.cId,
                    type: it.type //20统仓 70原仓
                };
            });
            _this.$apply();
        });
    };
    ChannelOrder.prototype.onLoad = function () {
        // onLoad(params) {
        // if (params.loadCustomerInfo) {
        //   this.methods.getNormalSalesOrderCustomerInfo({ customerCode: chooseCustomerInfo.customerCode })
        // }
        this.initData();
        //获取配送方式
        this.methods.getDeliveryMethod();
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
            // fhckList({ purchaseshop }) {
            //   return purchaseshop.fhckList
            // },
            additionOrderDetailItem: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.chooseItemInfo;
            },
            deliveryMode: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.deliveryMode;
            },
        }, {
            getBaseData: purchaseshop_1.getBaseData,
            getNormalSalesOrderCustomerInfo: dmsorder_1.getNormalSalesOrderCustomerInfo,
            submitChannelOrder: dmsorder_1.submitChannelOrder,
            getCisPrice: dmsorder_1.getCisPrice,
            getDeliveryMethod: dmsorder_1.getDeliveryMethod,
            getSystemParameters: dmsorder_1.getSystemParameters,
            getIsOpenSharedWarehouse: dmsorder_1.getIsOpenSharedWarehouse,
            getWarehouseList: dmsorder_1.getWarehouseList,
            getDmsShopAddress: distributorsorder_1.getDmsShopAddress,
        })
    ], ChannelOrder);
    return ChannelOrder;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(ChannelOrder , 'pages/dms/channel-order/index'));

