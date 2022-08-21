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
var index_1 = require('./../components/dms-allot-add-detail/index.js');
var index_2 = require('./../../../components/dms-address/index.js');
// import {getStockTransBaseInfo} from '@/store/actions/dmsorder';
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var channel_retail_order_1 = require('./../../../mixins/channel-retail-order.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var index_3 = require('./../../../utils/index.js');
var dmsorder_2 = require('./../../../store/types/dmsorder.js');
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var dmsrequest_1 = require('./../../../store/actions/dmsrequest.js');
var index_4 = require('./../../../components/popup-toast/index.js');
var ChannelOrder = /** @class */ (function (_super) {
    __extends(ChannelOrder, _super);
    function ChannelOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '调拨录入',
            usingComponents: {
                "van-popup": "/components/vant/popup/index",
                "van-toast": "/components/vant/toast/index",
                "item": "/pages/goods/components/dms-allot-add-detail-item/index",
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
            isDisabled: true,
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
            allotAddress: {
                id: '',
                name: '请选择',
                mobile: '',
                linkman: '',
                areaStatus: ''
            },
            fullAddress: '',
            customerName: '',
            customerPhone: '',
            note: '',
            form: {
                cisCode: '',
                stockTrans: {
                    gicOutWarehouse: '',
                    gicInWarehouse: '',
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
            popAllocationRatioVisible: false,
        };
        _this.$repeat = {};
        _this.$props = { "order": { "xmlns:v-bind": "", "v-bind:out.sync": "sendInventoryInfo", "v-bind:outInv.sync": "outInv", "v-bind:orgId.sync": "fiBook", "v-bind:isDisabled.sync": "isDisabled" } };
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
            //提示框
            noticePopupOpen: function () {
                _this.isNoticePopupShow = true;
            },
            noticePopupClose: function () {
                _this.isNoticePopupShow = false;
            },
            // 移入移出仓库数据渲染触发
            openChoose: function (propName, fieldName, titleName) {
                var list = _this[propName];
                _this.popList = list;
                _this.compareInfo = _this[fieldName];
                _this.popFiledName = fieldName;
                _this.popTitle = titleName;
                _this.popVisible = true;
            },
            onClose: function () {
                _this.popVisible = false;
            },
            /*移入仓库/移出仓库点击事件*/
            onChoose: function (_a) {
                var currentTarget = _a.currentTarget;
                var dataset = currentTarget.dataset;
                var index = dataset.index;
                var _b = _this.data, popFiledName = _b.popFiledName, popList = _b.popList;
                if ('allotAddress' == popFiledName) {
                    if (popList[index] && popList[index].areaStatus === 'D') { // 判断行政区域地址库是否失效 A有效，D失效。失效的话禁止选择
                        toast_1.default.fail('由于行政区划调整，请您及时更新您的收获地址信息');
                        return false;
                    }
                }
                _this[popFiledName] = popList[index];
                _this.popVisible = false;
                //移出仓库
                if ('gicOutWrehouse' == popFiledName) {
                    _this.form.stockTrans.gicOutWarehouse = _this.gicOutWrehouse.id;
                    _this.sendInventoryInfo.id = _this.gicOutWrehouse.id;
                }
                //移入仓库
                if ('gicInWrehouse' == popFiledName) {
                    _this.form.stockTrans.gicInWarehouse = _this.gicInWrehouse.id;
                }
                //配送方式
                if ('deliveryMethod' == popFiledName) {
                    _this.form.stockTrans.deliveryMode = _this.deliveryMethod.id;
                }
                //地址
                if ('allotAddress' == popFiledName) {
                    _this.form.stockTrans.addressId = _this.allotAddress.id;
                    _this.form.stockTrans.contact = _this.allotAddress.linkman;
                    _this.form.stockTrans.phone = _this.allotAddress.mobile;
                    _this.customerName = _this.allotAddress.linkman;
                    _this.customerPhone = _this.allotAddress.mobile;
                }
            },
            // 开启销售组织
            openChooseFiBook: function () {
                this.popFiBookVisible = true;
            },
            onCloseFiBook: function () {
                this.popFiBookVisible = false;
            },
            //选择销售组织
            onChooseFiBook: function (_a) {
                var currentTarget = _a.currentTarget;
                var dataset = currentTarget.dataset;
                this.fiBook = __assign({}, this.fiBook, { name: dataset.name, id: dataset.key });
                this.popFiBookVisible = false;
                this.methods.getRetailOrderInfo(dataset.key);
                this.form.stockTrans.orgId = this.fiBook.id;
                this.form.stockTrans.gicInWrehouse = '';
                this.form.stockTrans.gicOutWrehouse = '';
                this.gicOutWrehouse = {
                    id: '',
                    name: '请选择'
                };
                this.gicInWrehouse = {
                    id: '',
                    name: '请选择'
                };
                this.methods.getStockTransBaseInfo({
                    orgId: this.form.stockTrans.orgId
                });
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
            onNoteChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.note = detail;
                _this.form.stockTrans.message = detail.trim();
                _this.$apply();
            }),
            submit: function () {
                _this.methods.submited('submitted');
            },
            cache: function () {
                _this.methods.submited('draft');
            },
            submited: function (status) {
                var that = _this;
                var products = [];
                for (var key in _this.additionOrderDetailItem.itemInfo) {
                    var item = _this.additionOrderDetailItem.itemInfo[key];
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
            },
            sendRequest: function (status) {
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
                var orderInfo = {
                    cisCode: wepy_1.default.$instance.globalData.cisCode,
                    stockTrans: _this.form.stockTrans,
                    staItem: params.map(function (param) {
                        var itemInfo = param.itemInfo;
                        return {
                            productCode: itemInfo.productCode,
                            productName: itemInfo.productName,
                            bdemandQty: param.quantity,
                            invStatus: param.inventory,
                            invStatusType: param.invState,
                            price: param.price // 补差类型
                        };
                    })
                };
                dialog_1.default.confirm({
                    title: '提示',
                    message: "\u672C\u5355\u636E\u5171\u6709" + params.length + "\u4E2A\u4EA7\u54C1\uFF0C\u786E\u5B9A\u8981" + (status === 'submitted' ? '提交' : '暂存') + "\u5417?"
                }).then(function () {
                    _this.methods.submitAllotList(__assign({}, orderInfo, { _ignoreToast: true, _popup: true })).then(function (res) {
                        var code = res.payload.code;
                        if (code === '0') {
                            // 保存成功
                            toast_1.default.success({
                                message: (status === 'submitted' ? '提交' : '暂存') + "\u6210\u529F",
                                onClose: function () {
                                    _this.$broadcast('relaunch');
                                    var store = wepy_redux_1.getStore();
                                    store.dispatch({
                                        type: dmsorder_2.DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
                                        payload: ''
                                    });
                                    _this.note = '';
                                    _this.customerName = '';
                                    _this.customerPhone = '';
                                    _this.form = {
                                        cisCode: '',
                                        stockTrans: {
                                            gicOutWarehouse: '',
                                            gicInWarehouse: '',
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
                                                bdemandQty: '',
                                                invStatus: '',
                                                invStatusType: '',
                                                price: ''
                                            }
                                        ]
                                    };
                                    _this.fiBook = {
                                        id: '',
                                        name: '请选择'
                                    },
                                        _this.gicOutWrehouse = {
                                            id: '',
                                            name: '请选择'
                                        },
                                        _this.gicInWrehouse = {
                                            id: '',
                                            name: '请选择'
                                        },
                                        _this.allotAddress = {
                                            id: '',
                                            name: '请选择',
                                            mobile: '',
                                            linkman: '',
                                            areaStatus: ''
                                        },
                                        _this.deliveryMethod = {
                                            id: '',
                                            name: '请选择'
                                        },
                                        _this.$apply();
                                }
                            });
                        }
                        else {
                            console.log(res);
                            toast_1.default.fail("操作失败，" + res.payload.data.msg);
                        }
                    });
                }).catch(function () {
                    // on cancel
                });
            },
            checkParam: function () {
                // 检查Head里面必填信息
                var form = _this.data.form;
                //
                if (form.stockTrans.gicOutWarehouse === '') {
                    toast_1.default.fail('请选择移出仓库');
                    return false;
                }
                if (form.stockTrans.gicInWarehouse === '') {
                    toast_1.default.fail('请选择移入仓库');
                    return false;
                }
                if (form.stockTrans.orgId === '') {
                    toast_1.default.fail('请选择销售组织');
                    return false;
                }
                if (form.staItem.productCode === '') {
                    toast_1.default.fail('请选择产品');
                    return false;
                }
                if (form.staItem.bdemandQty === '') {
                    toast_1.default.fail('请填写调拨数量');
                    return false;
                }
                if (form.staItem.price === '') {
                    toast_1.default.fail('请填写价格');
                    return false;
                }
                var _a = _this.$invoke('order', 'checkParam'), errMsg = _a.errMsg, submitLines = _a.submitLines;
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
            },
            // 调拨比例弹框显示
            handleCheckAllocationRatio: function () {
                this.popAllocationRatioVisible = true;
            },
            // 调拨比例弹框隐藏
            onCloseAllocationRatio: function () {
                this.popAllocationRatioVisible = false;
            }
        };
        // plsChoose = {
        //   id: '',
        //   name: '请选择'
        // }
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
                var payAmount = Number(payload.amount);
                _this.amount = (payAmount).toFixed(2);
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
        this.methods.getRetailOrderInfo();
        //获取配送方式
        this.methods.getDeliveryMethod();
        //获取销售组织
        this.methods.queryAppFiBook();
        //获取移入移出仓库
        this.methods.getStockTransBaseInfo();
        //获取调拨比例
        this.methods.getAllocationRatio();
    };
    ChannelOrder = __decorate([
        wepy_redux_1.connect({
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
            allocationRatioList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.allocationRatioList;
            },
        }, {
            getStockTransBaseInfo: dmsorder_1.getStockTransBaseInfo,
            submitAllotList: dmsorder_1.submitAllotList,
            getRetailOrderInfo: dmsorder_1.getRetailOrderInfo,
            getDeliveryMethod: dmsorder_1.getDeliveryMethod,
            queryAppFiBook: dmsorder_1.queryAppFiBook,
            getAllocationRatio: dmsorder_1.getAllocationRatio
        })
    ], ChannelOrder);
    return ChannelOrder;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(ChannelOrder , 'pages/goods/allot-add/index'));

