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
var index_1 = require('./../components/inventory-trim-add/index.js');
var index_2 = require('./../../../components/dms-address/index.js');
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var inventoryTrim_1 = require('./../../../store/actions/inventoryTrim.js');
var dmsorder_2 = require('./../../../store/actions/dmsorder.js');
var channel_retail_order_1 = require('./../../../mixins/channel-retail-order.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var index_3 = require('./../../../utils/index.js');
var dmsorder_3 = require('./../../../store/types/dmsorder.js');
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var dmsrequest_1 = require('./../../../store/actions/dmsrequest.js');
var index_4 = require('./../../../components/popup-toast/index.js');
var ChannelOrder = /** @class */ (function (_super) {
    __extends(ChannelOrder, _super);
    function ChannelOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '库存调整',
            usingComponents: {
                "van-popup": "/components/vant/popup/index",
                "van-toast": "/components/vant/toast/index",
                "item": "/pages/goods/components/inventory-trim-add-item/index",
                "van-icon": "/components/vant/icon/index",
                "van-submit-bar": "/components/vant/submit-bar/index",
                "van-transition": "/components/vant/transition/index",
                "van-field": "/components/vant/field/index",
                "van-dialog": "/components/vant/dialog/index",
                "stores": "/components/stores-return/index"
            },
        };
        _this.mixins = [channel_retail_order_1.default];
        _this.saleTypes = [{
                id: 'retail',
                name: '零售'
            }, {
                id: 'engineering',
                name: '工程'
            }];
        _this.outInvs = [{
                id: '0',
                name: '否'
            }, {
                id: '1',
                name: '是'
            }];
        _this.data = {
            isDisabled: false,
            // array:[],
            postorgId: '',
            postStore: '',
            priceAhead: '',
            priceBehind: '',
            totalPrice: '12.12',
            tabIsShow: 'otherIn',
            showMore: false,
            store: {
                id: '',
                name: '请选择'
            },
            //jira:cis-4880
            outInv: {
                id: '1',
                name: '是'
            },
            sendInventoryInfo: {
                id: '',
                name: '请选择'
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
            receiverDetail: '',
            saleType: {
                id: 'retail',
                name: '零售'
            },
            addressTip: '',
            chooseProvinceInfo: {
                id: '',
                name: ''
            },
            chooseCityInfo: {
                id: '',
                name: ''
            },
            chooseRegionInfo: {
                id: '',
                name: ''
            },
            chooseTownInfo: {
                id: '',
                name: ''
            },
            storeMaterial: [],
            amount: '0.00',
            amountFirst: '0',
            amountLast: '00',
            volume: '0.00',
            popList: [],
            popTitle: '',
            popVisible: false,
            popFiledName: '',
            compareInfo: {},
            isNoticePopupShow: false,
            popFiBookVisible: false,
            sysDate: '',
            expressFee: wepy_1.default.$instance.globalData.expressFee,
            fiBook: {
                id: '',
                name: '请选择'
            },
            gicOutWrehouse: {
                id: '',
                name: '请选择'
            },
            gicInWrehouse: {
                id: '',
                name: '请选择'
            },
            getStoreHouse: {
                id: '',
                name: '请选择'
            },
            allotAddress: {
                id: '',
                name: '请选择',
                mobile: '',
                linkman: ''
            },
            fullAddress: '',
            customerName: '',
            customerPhone: '',
            note: '',
            form: {
                cisCode: '',
                stockTrans: {
                    gicOutWrehouse: '',
                    gicInWrehouse: '',
                    contact: '',
                    message: '',
                    phone: '',
                    addressId: '',
                    deliveryMode: '',
                    orgId: ''
                },
                staItem: [
                    {
                        productCode: '',
                        productName: '',
                        // model: '',
                        // colour: '',
                        bdemandQty: '',
                        invStatus: '',
                        invStatusType: '',
                        // usableMax: '',
                        price: ''
                    }
                ]
            },
            postFrom: {
                stockTrans: {
                    transactionType: 'otherIn',
                    orgId: '',
                    gicInWarehouse: '',
                    gicOutWarehouse: '',
                    message: '',
                    deliveryMode: '01' //配送方式
                },
                staItem: [
                    {
                        productCode: '',
                        productName: '',
                        invStatus: '',
                        invStatusType: '',
                        alertInvStatus: '',
                        alertInvStatusType: '',
                        price: '',
                        bdemandQty: '',
                    }
                ]
            },
            freeShippingTip: '' //免运费提示信息
        };
        _this.$repeat = {};
        _this.$props = { "order": { "xmlns:v-bind": "", "v-bind:out.sync": "sendInventoryInfo", "v-bind:outInv.sync": "outInv", "v-bind:type.sync": "tabIsShow", "v-bind:orgId.sync": "postorgId", "v-bind:store.sync": "postStore", "v-bind:isDisabled.sync": "isDisabled" } };
        _this.$events = {};
        _this.components = {
            order: index_1.default,
            address: index_2.default,
            popup: index_4.default,
        };
        /**
         * : 保存成功后删除客户信息，商品信息
         */
        _this.methods = {
            // changeTabChoose({currentTarget}:e){
            changeTabChoose: function (tab) {
                // 判断产品明细是否可修改
                if (tab == 'otherIn') {
                    this.isDisabled = false;
                }
                else {
                    this.isDisabled = true;
                }
                // const {dataset} = currentTarget
                this.$broadcast('relaunch');
                var store = wepy_redux_1.getStore();
                store.dispatch({
                    type: dmsorder_3.DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
                    payload: ''
                });
                this.note = '';
                this.customerName = '';
                this.customerPhone = '';
                this.postFrom = {
                    cisCode: '',
                    stockTrans: {
                        transactionType: '',
                        orgId: '',
                        gicInWarehouse: '',
                        gicOutWarehouse: '',
                        message: '',
                        deliveryMode: '01' //配送方式
                    },
                    staItem: [
                        {
                            productCode: '',
                            productName: '',
                            invStatus: '',
                            invStatusType: '',
                            alertInvStatus: '',
                            alertInvStatusType: '',
                            price: '',
                            bdemandQty: '',
                        }
                    ]
                };
                this.storeHouse = {
                    id: '',
                    name: '请选择'
                },
                    this.fiBook = {
                        id: '',
                        name: '请选择'
                    },
                    this.gicOutWrehouse = {
                        id: '',
                        name: '请选择'
                    },
                    this.gicInWrehouse = {
                        id: '',
                        name: '请选择'
                    },
                    this.allotAddress = {
                        id: '',
                        name: '请选择',
                        mobile: '',
                        linkman: ''
                    },
                    this.deliveryMethod = {
                        id: '',
                        name: '请选择'
                    },
                    this.amount = '0.00';
                this.amountFirst = '0';
                this.amountLast = '00';
                this.$apply();
                this.tabIsShow = tab;
                this.postStore = '';
                this.postorgId = '';
                this.postFrom.stockTrans.transactionType = tab;
            },
            //提示框
            noticePopupOpen: function () {
                _this.isNoticePopupShow = true;
            },
            noticePopupClose: function () {
                _this.isNoticePopupShow = false;
            },
            // 点击仓库选择 移入移出仓库数据渲染触发
            openChoose: function (propName, fieldName, titleName) {
                if (_this.postFrom.stockTrans.orgId) {
                    var list = _this[propName]; //将库存列表赋值给list
                    _this.popList = list; //将库存列表赋值给popList
                    _this.compareInfo = _this[fieldName];
                    _this.popFiledName = fieldName; //将请求参数赋值
                    _this.popTitle = titleName;
                    if (_this.popList.length == 0) {
                        toast_1.default('暂无仓库');
                    }
                    else {
                        _this.popVisible = true;
                    }
                }
                else {
                    toast_1.default('请选择销售组织');
                }
            },
            //仓库弹框关闭
            onClose: function () {
                _this.popVisible = false;
            },
            /*移入仓库/移出仓库点击事件*/
            onChoose: function (_a) {
                var currentTarget = _a.currentTarget;
                var dataset = currentTarget.dataset;
                var index = dataset.index; //当前选择仓库的index
                var key = dataset.key; //当前选择仓库的index
                var _b = _this.data, popFiledName = _b.popFiledName, popList = _b.popList;
                _this.postStore = key;
                _this[popFiledName] = popList[index];
                _this.sendInventoryInfo = popList[index];
                _this.popVisible = false; //关闭仓库弹框
                if (_this.tabIsShow == 'otherIn') { //入库
                    _this.postFrom.stockTrans.gicInWarehouse = key;
                    _this.sendInventoryInfo.id = key;
                }
                else if (_this.tabIsShow == 'otherOut') { //出库
                    _this.postFrom.stockTrans.gicOutWarehouse = key;
                }
                else if (_this.tabIsShow == 'invStatus') { //状态调整
                    _this.postFrom.stockTrans.gicInWarehouse = key;
                    _this.postFrom.stockTrans.gicOutWarehouse = key;
                }
                //移出仓库
                // if('gicOutWrehouse' == popFiledName){
                //     this.form.stockTrans.gicOutWrehouse = key;
                //     this.sendInventoryInfo.id =  key;
                // }
                //移入仓库
                // if('gicInWrehouse' == popFiledName){
                //   this.form.stockTrans.gicInWrehouse = this.gicInWrehouse.id;
                // }
                _this.$apply();
                //配送方式
                // if('deliveryMethod' == popFiledName){
                //   this.form.stockTrans.deliveryMode = this.deliveryMethod.id;
                // }
                //地址
                // if('allotAddress' == popFiledName){
                //   this.form.stockTrans.addressId = this.allotAddress.id;
                //   this.form.stockTrans.contact  = this.allotAddress.linkman;
                //   this.form.stockTrans.phone  = this.allotAddress.mobile;
                //   this.customerName  = this.allotAddress.linkman;
                //   this.customerPhone  = this.allotAddress.mobile;
                // }
            },
            // 开启销售组织弹框
            openChooseFiBook: function () {
                this.popFiBookVisible = true;
            },
            //关闭销售组织弹框
            onCloseFiBook: function () {
                this.popFiBookVisible = false;
            },
            //选择销售组织
            onChooseFiBook: function (_a) {
                var currentTarget = _a.currentTarget;
                var oldOrgId = this.postorgId;
                var dataset = currentTarget.dataset;
                this.fiBook = __assign({}, this.fiBook, { name: dataset.name, id: dataset.key });
                this.popFiBookVisible = false; //关闭销售组织弹框
                // this.methods.getRetailOrderInfo(dataset.key);
                // let list = this[propName]//将库存列表赋值给list
                // this.popList = this.storeHouse//将库存列表赋值给popList
                this.form.stockTrans.orgId = this.fiBook.id;
                this.postFrom.stockTrans.orgId = this.fiBook.id;
                this.postorgId = this.fiBook.id;
                this.$apply();
                // 销售组织改变
                this.methods.getStoreHouse({ orgId: this.fiBook.id });
                if (this.fiBook.id !== oldOrgId) {
                    this.postStore = '';
                    var popFiledName = this.data.popFiledName;
                    this[popFiledName] = { id: '', name: '请选择' };
                    this.sendInventoryInfo = {
                        id: '',
                        name: '请选择'
                    };
                    this.$apply();
                }
            },
            //收货联系人变更
            onCustomerNameChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.customerName = detail.trim();
                _this.form.stockTrans.contact = detail.trim();
                _this.$apply();
            }),
            //收货联系人变更
            onCustomerPhoneChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.customerPhone = detail.trim();
                _this.form.stockTrans.phone = detail.trim();
                _this.$apply();
            }),
            // 备注
            onNoteChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.note = detail;
                _this.postFrom.stockTrans.message = detail.trim();
                _this.$apply();
            }),
            // 确认提交
            submit: function () {
                _this.methods.submited('submitted');
            },
            // 无
            cache: function () {
                _this.methods.submited('draft');
            },
            // 确认提交
            submited: function (status) {
                if (_this.methods.checkParam()) {
                    var params = _this.$invoke('order', 'getParam');
                    // 校验产品是否重复
                    var paramObj = {};
                    for (var index in params) {
                        var param = params[index];
                        var key = param.itemInfo.model + "_" + param.itemInfo.colour;
                        // && paramObj[key] !== param.itemInfo.invStatus
                        if (paramObj[key]) {
                            toast_1.default("\u4EA7\u54C1\u578B\u53F7" + param.itemInfo.model + "\u91CD\u590D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u4EA7\u54C1!");
                            return;
                        }
                        else {
                            paramObj[key] = param.itemInfo.invStatus;
                        }
                    }
                    // 组装数据
                    var orderInfo_1 = {
                        cisCode: wepy_1.default.$instance.globalData.cisCode,
                        stockTrans: _this.postFrom.stockTrans,
                        staItem: params.map(function (param) {
                            var itemInfo = param.itemInfo;
                            return {
                                productCode: itemInfo.productCode,
                                productName: itemInfo.productName,
                                bdemandQty: param.quantity,
                                invStatus: param.inventory,
                                invStatusType: param.invState,
                                price: param.price,
                                alertInvStatus: param.backInventory,
                                alertInvStatusType: param.alertInvStatus,
                            };
                        })
                    };
                    dialog_1.default.confirm({
                        title: '提示',
                        message: "\u672C\u5355\u636E\u5171\u6709" + params.length + "\u4E2A\u4EA7\u54C1\uFF0C\u786E\u5B9A\u8981" + (status === 'submitted' ? '提交' : '暂存') + "\u5417?"
                    }).then(function () {
                        _this.methods.submitStoreList(__assign({}, orderInfo_1, { _ignoreToast: true, _popup: true })).then(function (res) {
                            var code = res.payload.code;
                            if (code === '0') {
                                // 保存成功
                                toast_1.default.success({
                                    message: (status === 'submitted' ? '提交' : '暂存') + "\u6210\u529F",
                                    onClose: function () {
                                        _this.$broadcast('relaunch');
                                        var store = wepy_redux_1.getStore();
                                        store.dispatch({
                                            type: dmsorder_3.DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
                                            payload: ''
                                        });
                                        _this.note = '';
                                        _this.customerName = '';
                                        _this.customerPhone = '';
                                        _this.postFrom = {
                                            cisCode: '',
                                            stockTrans: {
                                                transactionType: '',
                                                orgId: '',
                                                gicInWarehouse: '',
                                                gicOutWarehouse: '',
                                                message: '',
                                                deliveryMode: '01' //配送方式
                                            },
                                            staItem: [
                                                {
                                                    productCode: '',
                                                    productName: '',
                                                    invStatus: '',
                                                    invStatusType: '',
                                                    alertInvStatus: '',
                                                    alertInvStatusType: '',
                                                    price: '',
                                                    bdemandQty: '',
                                                }
                                            ]
                                            //   stockTrans: {
                                            //   gicOutWrehouse: '',
                                            //     gicInWrehouse: '',
                                            //     contact: '',
                                            //     message:'',
                                            //     phone: '',
                                            //     addressId:'',
                                            //     deliveryMode: '',
                                            //     orgId: ''
                                            // },
                                            // staItem: [
                                            //   {
                                            //     productCode: '',
                                            //     productName: '',
                                            //     bdemandQty: '',
                                            //     invStatus: '',
                                            //     invStatusType:'',
                                            //     price: ''
                                            //   }
                                            // ]
                                        };
                                        _this.storeHouse = {
                                            id: '',
                                            name: '请选择'
                                        };
                                        _this.fiBook = {
                                            id: '',
                                            name: '请选择'
                                        };
                                        _this.gicOutWrehouse = {
                                            id: '',
                                            name: '请选择'
                                        };
                                        _this.gicInWrehouse = {
                                            id: '',
                                            name: '请选择'
                                        };
                                        _this.allotAddress = {
                                            id: '',
                                            name: '请选择',
                                            mobile: '',
                                            linkman: ''
                                        };
                                        _this.deliveryMethod = {
                                            id: '',
                                            name: '请选择'
                                        };
                                        _this.amount = '0.00';
                                        _this.amountFirst = '0';
                                        _this.amountLast = '00';
                                        _this.postStore = '';
                                        _this.postOrgId = '';
                                        _this.$apply();
                                    }
                                });
                            }
                            else {
                                toast_1.default.fail("操作失败，" + res.payload.data.msg);
                            }
                        });
                    }).catch(function () {
                        // on cancel
                    });
                }
            },
            clearData: function () {
            },
            checkParam: function () {
                // 检查Head里面必填信息
                var postFrom = _this.data.postFrom;
                if (_this.tabIsShow == 'otherOut') {
                    if (postFrom.stockTrans.gicOutWarehouse === '') {
                        toast_1.default.fail('请选择仓库');
                        return false;
                    }
                }
                else if (_this.tabIsShow == 'invStatus') {
                    if (postFrom.stockTrans.gicInWarehouse === '') {
                        toast_1.default.fail('请选择仓库');
                        return false;
                    }
                    if (postFrom.stockTrans.gicOutWarehouse === '') {
                        toast_1.default.fail('请选择仓库');
                        return false;
                    }
                }
                if (postFrom.stockTrans.orgId === '') {
                    toast_1.default.fail('请选择销售组织');
                    return false;
                }
                var _a = _this.$invoke('order', 'checkParam'), errMsg = _a.errMsg, submitLines = _a.submitLines;
                if (errMsg !== '') {
                    toast_1.default.fail(errMsg);
                    return false;
                }
                else if (submitLines === 0) {
                    toast_1.default.fail('请先添加产品再保存');
                    return false;
                }
                return true;
            },
            // 根据门店获取物料组权限接口
            getStoreMaterial: function (code) {
                dmsrequest_1.dmsRequest({
                    data: {
                        storeCode: code,
                        _loading: true,
                    },
                    method: 'findMaterialByStore'
                }).then(function (res) {
                    _this.storeMaterial = res.materialGroup.map(function (item) {
                        return {
                            value: item,
                        };
                    });
                    _this.$apply();
                });
            }
        };
        _this.watch = {
            'billFrom': function (newValue) {
                if (newValue.length > 0) {
                    this.invoiceInfo = newValue[0];
                }
                else {
                    this.invoiceInfo = {
                        id: '',
                        name: '请选择'
                    };
                }
                this.$apply();
            },
            'seller': function (newValue) {
                if (newValue.length > 0) {
                    this.saler = newValue[0];
                }
                else {
                    this.saler = {
                        id: '',
                        name: '请选择'
                    };
                }
                this.$apply();
            },
            'stores': function (newValue) {
                if (newValue.length > 0) {
                    this.store = newValue[0];
                    this.methods.getStoreMaterial(this.store.id);
                    this.additionOrderDetailItem.shopCisCode = newValue[0].id;
                }
                else {
                    this.store = {
                        id: '',
                        name: '请选择'
                    };
                    this.additionOrderDetailItem.shopCisCode = '';
                }
                this.$apply();
            },
            'warehouse': function (newValue) {
                if (newValue.length > 0) {
                    this.sendInventoryInfo = newValue[0];
                }
                else {
                    this.sendInventoryInfo = {
                        id: '',
                        name: '请选择'
                    };
                }
                this.$apply();
            },
            'address': function (newValue) {
                var tip = '请选择';
                if (newValue.province.id) {
                    this.chooseProvinceInfo = newValue.province;
                    tip = this.chooseProvinceInfo.name;
                }
                if (newValue.city.id) {
                    this.chooseCityInfo = newValue.city;
                    tip += this.chooseCityInfo.name;
                }
                if (newValue.country.id) {
                    this.chooseRegionInfo = newValue.country;
                    tip += this.chooseRegionInfo.name;
                }
                if (newValue.town.id) {
                    this.chooseTownInfo = newValue.town;
                    tip += this.chooseTownInfo.name;
                }
                this.addressTip = tip;
                this.$apply();
            },
            'loading': function (newValue) {
                if (!newValue) {
                    toast_1.default.clear();
                }
            }
        };
        _this.events = {
            'amount-change': function (payload) {
                // let payAmount = Number(payload.amount);
                // this.amount = (payAmount).toFixed(2)
                _this.amount = "" + ((+_this.amount) + (+payload.amount)).toFixed(2);
                _this.amountFirst = _this.amount.split('.')[0];
                _this.amountLast = _this.amount.split('.')[1];
            },
            'volume-change': function (payload) {
                var payVolume = Number(payload.volume);
                _this.volume = (payVolume).toFixed(2);
            }
        };
        return _this;
    }
    ChannelOrder.prototype.onShow = function () {
        this.freeShippingTip = index_3.getAlertInfo('14187495683'); // 免运费提示信息
    };
    ChannelOrder.prototype.onLoad = function () {
        this.$broadcast('retail');
        //初始化时间
        this.sysDate = index_3.formatDate(Date.parse(new Date()), 'Y-M-D');
        // this.methods.getRetailOrderInfo();
        //获取配送方式
        this.methods.getDeliveryMethod();
        //获取销售组织
        this.methods.queryAppFiBook();
    };
    ChannelOrder = __decorate([
        wepy_redux_1.connect({
            storeHouse: function (_a) {
                var inventoryTrim = _a.inventoryTrim;
                return inventoryTrim.storeHouse;
            },
            warehousesInList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.warehousesIn;
            },
            warehousesOutList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.warehousesOut;
            },
            addressList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.addressList;
            },
            fibookList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.fibookList;
            },
            additionOrderDetailItem: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.chooseItemInfo;
            },
            deliveryMode: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.deliveryMode;
            },
        }, {
            // getStockTransBaseInfo,
            submitAllotList: dmsorder_2.submitAllotList,
            // getRetailOrderInfo,
            getDeliveryMethod: dmsorder_2.getDeliveryMethod,
            queryAppFiBook: dmsorder_1.queryAppFiBook,
            getStoreHouse: inventoryTrim_1.getStoreHouse,
            submitStoreList: dmsorder_2.submitStoreList,
        })
    ], ChannelOrder);
    return ChannelOrder;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(ChannelOrder , 'pages/goods/inventory-trim/index'));

