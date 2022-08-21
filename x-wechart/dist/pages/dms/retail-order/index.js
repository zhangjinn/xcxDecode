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
var index_2 = require('./../../../components/dms-address/index.js');
var index_3 = require('./../../components/select-address-details/index.js');
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var channel_retail_order_1 = require('./../../../mixins/channel-retail-order.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var index_4 = require('./../../../utils/index.js');
var dmsorder_2 = require('./../../../store/types/dmsorder.js');
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var dmsrequest_1 = require('./../../../store/actions/dmsrequest.js');
var index_5 = require('./../../../components/popup-toast/index.js');
var ChannelOrder = /** @class */ (function (_super) {
    __extends(ChannelOrder, _super);
    function ChannelOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '零售录入',
            usingComponents: {
                "van-popup": "/components/vant/popup/index",
                "van-toast": "/components/vant/toast/index",
                "item": "/components/dms-order-addition-detail-item/index",
                "van-icon": "/components/vant/icon/index",
                "van-submit-bar": "/components/vant/submit-bar/index",
                "van-transition": "/components/vant/transition/index",
                "van-field": "/components/vant/field/index",
                "van-dialog": "/components/vant/dialog/index",
                "stores": "/components/stores-return/index",
                "van-uploader": "/components/vant/uploader/index",
                'calendar': '/components/calendar/index',
                'van-datetime-picker': '/components/vant/datetime-picker/index',
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
        _this.oldNews = [{
                id: 0,
                name: '否'
            }, {
                id: 1,
                name: '是'
            }];
        _this.completeOlds = [{
                id: 0,
                name: '否'
            }, {
                id: 1,
                name: '是'
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
            customerName: '个人',
            customerPhone: '',
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
            oldNew: {
                id: 0,
                name: '否'
            },
            completeOld: {
                id: 0,
                name: '否'
            },
            oldMachCategoryList: [],
            oldMachCategory: {
                id: '',
                name: ''
            },
            oldMachTreatWayList: [],
            oldMachTreatWay: {
                id: '',
                name: ''
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
            note: '',
            amount: '0.00',
            volume: '0.00',
            popList: [],
            popTitle: '',
            popVisible: false,
            popFiledName: '',
            compareInfo: {},
            isNoticePopupShow: false,
            popFiBookVisible: false,
            expressFee: wepy_1.default.$instance.globalData.expressFee,
            fiBook: {
                name: '请选择'
            },
            isDeliveryAndInstall: {
                id: '0',
                name: '否'
            },
            deliveryAndInstall: [
                { id: '1', name: '是' },
                { id: '0', name: '否' }
            ],
            fileList: [],
            fileIds: [],
            zoneB2cService: [],
            zoneB2cServiceNames: [],
            serverPopVisible: false,
            warehouseList: [],
            isSignTheAgreement: false,
            dynamicMessage: {
                freeShippingTip: '',
                signAgreementInfo: '',
                noSignAgreementInfo: '',
                straightConstructionSite: '',
                retailInfo: '',
                engineeringInfo: '',
            },
            calendarShow: false,
            expectedDeliveryDate: '',
            currentDate: new Date().getTime(),
            ly: 'retail',
        };
        _this.$repeat = {};
        _this.$props = { "order": { "v-bind:out.sync": "sendInventoryInfo", "v-bind:outInv.sync": "outInv", "v-bind:orgId.sync": "fiBook", "v-bind:isDisabled.sync": "isDisabled", "v-bind:ly.sync": "ly" }, "addressDetail": { "xmlns:v-bind": "", "v-bind:chooseRegionId.sync": "chooseRegionId", "v-bind:isRequired.sync": "addressDetailRequired" }, "popup": { "title": "创建零售订单失败" } };
        _this.$events = {};
        _this.components = {
            order: index_1.default,
            address: index_2.default,
            addressDetail: index_3.default,
            popup: index_5.default,
        };
        /**
         * TODO: 保存成功后删除客户信息，商品信息
         */
        _this.methods = {
            // 上传图片
            beforeRead: function () {
                var self = _this;
                toast_1.default.loading({
                    message: '上传中...',
                    forbidClick: true,
                    duration: 20 * 1000
                });
                self.$apply();
            },
            //上传图片
            afterRead: function (event) {
                var self = this;
                var file = event.detail.file;
                var fileName = 'file';
                var filePath = file.path;
                var _a = this.$parent.globalData, sessionId = _a.sessionId, modifySession = _a.modifySession, account = _a.account, cisCode = _a.cisCode, ssoLoginToken = _a.ssoLoginToken;
                var Cookie;
                if (sessionId || modifySession) {
                    Cookie = "JSESSIONID=" + (sessionId || modifySession);
                }
                // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
                wx.uploadFile({
                    url: wepy_1.default.$appConfig.dmsBaseUrl + "/wechatEntrance/entrance.do?account=" + account + "&method=uploadAttachment&type=1",
                    filePath: file.path,
                    header: {
                        Cookie: Cookie,
                        ssoLoginToken: ssoLoginToken,
                        "Content-Type": "multipart/form-data",
                    },
                    name: fileName,
                    formData: {
                        businessType: 'retailOrder',
                        cisCode: cisCode,
                        file: [filePath],
                    },
                    success: function (res) {
                        var data = JSON.parse(res.data).data;
                        if (data.length > 0) {
                            self.fileList.push({
                                url: data[0].fileMapperPath,
                                name: data[0].fileRealName,
                                deletable: true
                            });
                            self.fileIds.push(data[0].id);
                        }
                        self.$apply();
                    }
                });
            },
            delImg: function (event) {
                _this.fileIds.splice(event.detail.index, 1);
                _this.fileList.splice(event.detail.index, 1);
            },
            //提示框
            noticePopupOpen: function () {
                _this.isNoticePopupShow = true;
            },
            noticePopupClose: function () {
                _this.isNoticePopupShow = false;
            },
            //
            openTopAddress: function () {
                var _this = this;
                var _a = this.data, chooseProvinceInfo = _a.chooseProvinceInfo, chooseCityInfo = _a.chooseCityInfo, chooseRegionInfo = _a.chooseRegionInfo, chooseTownInfo = _a.chooseTownInfo;
                this.$invoke('address', 'openAddressPopup', {
                    province: chooseProvinceInfo.id,
                    city: chooseCityInfo.id,
                    area: chooseRegionInfo.id,
                    town: chooseTownInfo.id
                }, function (item, address) {
                    _this.addressTip = item.name;
                    _this.chooseProvinceInfo = {
                        id: address.provinceId,
                    };
                    _this.chooseCityInfo = {
                        id: address.cityId,
                    };
                    _this.chooseRegionInfo = {
                        id: address.areaId,
                    };
                    _this.chooseTownInfo = {
                        id: address.townId,
                    };
                    _this.methods.getServiceList();
                    _this.$apply();
                });
            },
            //获取服务列表
            getServiceList: function () {
                if (!_this.fiBook.id) {
                    return;
                }
                if (!_this.sendInventoryInfo.id) {
                    return;
                }
                if (!_this.chooseProvinceInfo.id) {
                    return;
                }
                _this.zoneB2cService = [];
                _this.zoneB2cServiceNames = [];
                // 根据发货仓库+配送方式，服务方式字段变化显示
                // 如果仓库为统仓，配送方式选择“配送、自提、配送（加急）“，服务方式字段显示，可选择
                // 如果仓库为统仓，配送方式为“直配到工地“，服务方式字段隐藏，取值空
                // 如果仓库为原仓，服务方式字段隐藏，取值空
                if (_this.sendInventoryInfo.type == 20 && _this.deliveryMethod.id && _this.deliveryMethod.id != '07') {
                    _this.methods.getZoneB2cServiceList({
                        orgCode: _this.fiBook.id,
                        warehouseCode: _this.sendInventoryInfo.id,
                        provinceCode: _this.chooseProvinceInfo.id,
                        cityCode: _this.chooseCityInfo.id,
                        countyCode: _this.chooseRegionInfo.id,
                        townCode: _this.chooseTownInfo.id,
                    }).then(function (res) {
                        var payload = res.payload;
                        // 校验商家是否签订2C协议：
                        if (payload.code == 0 && payload.data && payload.data.length > 0) {
                            _this.isSignTheAgreement = true;
                        }
                        else {
                            _this.isSignTheAgreement = false;
                        }
                        _this.serviceList.forEach(function (it) {
                            if (it.isSupport === '1' && it.isDefault === '1') {
                                _this.zoneB2cService.push(it.serviceCode);
                                _this.zoneB2cServiceNames.push(it.serviceName);
                            }
                        });
                        _this.$apply();
                    });
                }
            },
            // 应该获取那个值给popList   应该对比那个字段为选中信息
            openChoose: function (propName, fieldName, titleName) {
                // 选择发货仓库前必须先选择销售组织
                if (propName == 'warehouse' && (!_this.data.fiBook.id || _this.data.fiBook == '')) {
                    toast_1.default('请先选择销售组织');
                    return false;
                }
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
            // 服务选择框
            openServerPopVisible: function () {
                _this.serverPopVisible = true;
            },
            closeServerPopVisible: function () {
                _this.serverPopVisible = false;
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
                //根据销售类型不同获取对应配送方式
                if (popFiledName == 'saleType') {
                    _this.methods.getCisDeliveryMethod({ type: _this.saleType.id });
                }
                _this.methods.getServiceList();
                if (popFiledName === 'store') {
                    var storeId = popList[index].id;
                    _this.methods.getStoreMaterial(storeId);
                    _this.additionOrderDetailItem.shopCisCode = storeId;
                    var productIds = [];
                    var shopCisCodes = [];
                    for (var key in _this.additionOrderDetailItem.itemInfo) {
                        var item = _this.additionOrderDetailItem.itemInfo[key];
                        if (item.productCode) {
                            shopCisCodes.push(storeId);
                            productIds.push(item.productCode);
                        }
                    }
                    if (productIds.length > 0) {
                        // 获取最新价格
                        _this.methods.getLsPrice({
                            type: '3',
                            refreshPrice: true,
                            shopCisCode: storeId,
                            productId: productIds.join(',')
                        });
                    }
                }
            },
            onChooseService: function (_a) {
                var currentTarget = _a.currentTarget;
                if (currentTarget.dataset.issupport == 0) {
                    return;
                }
                var key = currentTarget.dataset.key;
                var name = currentTarget.dataset.name;
                var ids = new Set(_this.zoneB2cService);
                if (ids.has(key)) {
                    ids.delete(key);
                }
                else {
                    ids.add(key);
                }
                _this.zoneB2cService = Array.from(ids);
                var names = new Set(_this.zoneB2cServiceNames);
                if (names.has(name)) {
                    names.delete(name);
                }
                else {
                    names.add(name);
                }
                _this.zoneB2cServiceNames = Array.from(names);
                _this.$apply();
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
                var _this = this;
                var currentTarget = _a.currentTarget;
                var dataset = currentTarget.dataset;
                this.fiBook = __assign({}, this.fiBook, { name: dataset.name, id: dataset.key });
                this.popFiBookVisible = false;
                this.methods.getRetailOrderInfo(dataset.key);
                // 获取仓库列表
                this.methods.getWarehouseList(dataset.key).then(function (res) {
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
                // 仓库类型 20统仓 70原仓
                // if (this.warehouseList.length>0){
                //   const fhckType = this.warehouseList[0].type;
                //   // 根据仓库的默认第一项判断获取服务列表 及是否展示
                //   if(fhckType == 20){
                //     this.methods.getServiceList();
                //   }
                // }
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
            "cisCode":"7111377",
            "userAccount":"7111377",
            "status":"draft",                             //draft 草稿，submitted提交
            "salesOrder":{
                "documentDate":"2019-09-09",           //下单时间
                "edt":"2019-09-09",                       //期望时间
                "isOutbound":”0”,                           //是否自动出库
                "customerName":"莱西孙受海信专卖店",      //客户名
                "phone":"18397989766",                   //电话
                "billFromId":"423432",                     //开票方
                "sellerCode":"1",                            //业务员
                "storeCode":"4123",                         //门店
                "warehouseId":"3424",                     //仓库
                "provinceId":"1231",                       //省
                "cityId":"512343",                         //市
                "countryId":"41324",                       //县
                "townId":"53424",                        //区
                "fullAddress":"海信大厦",                  //地址详情
                "retailType":"wholesale",                 //销售类型
                "payAmount":"2342",                     //收款金额
                "discountAmount":"2342",                //折让金额
                "totalAmount":"2342",                    //订单金额
                "message":"备注",                         //备注
                "salesOrderItem":[                        //订单明细
                    {
                        "productCode":"4234",               //产品编码
                        "productName":"电视",               //产品名称
                        "model":"KAJOFEI",                  //型号
                        "colour":"标准",                      //颜色
                        "borderedQty":"3",                   //销售数量
                        "bprice":"200",                       //销售价格
                        "amount":"600",                      //金额
                        "invStatus":"3242",                   //库存状态id
        "bigUom":"PC"                           //单位
                    },
                    {
                        "productCode":"4234",
                        "productName":"电视",
                        "model":"KAJOFEI",
                        "colour":"标准",
                        "borderedQty":"3",
                        "bprice":"200",
                        "amount":"600",
                        "invStatus":"3242",
        "bigUom":"PC"
                    }
                ]
            }
        }
             */
            submited: function (status) { return __awaiter(_this, void 0, void 0, function () {
                var that, popMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            that = this;
                            if (!(this.sendInventoryInfo.type == '20')) return [3 /*break*/, 1];
                            popMessage = '';
                            // 仓库为统仓-销售类别选择零售弹框提示
                            if (this.saleType.id == 'retail') {
                                popMessage = this.dynamicMessage.retailInfo;
                            }
                            // 仓库为统仓-销售类别选择工程弹框提示
                            if (this.saleType.id == 'engineering') {
                                popMessage = this.dynamicMessage.engineeringInfo;
                            }
                            wx.showModal({
                                title: '提示',
                                content: popMessage,
                                success: function (res) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!res.confirm) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, that.methods.checkParam()];
                                                case 1:
                                                    if (_a.sent()) {
                                                        that.methods.sendRequest(status);
                                                    }
                                                    _a.label = 2;
                                                case 2: return [2 /*return*/];
                                            }
                                        });
                                    });
                                },
                            });
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, that.methods.checkParam()];
                        case 2:
                            if (_a.sent()) {
                                that.methods.sendRequest(status);
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); },
            sendRequest: function (status) {
                var _a = _this.data, zoneB2cService = _a.zoneB2cService, amount = _a.amount, volume = _a.volume, store = _a.store, note = _a.note, outInv = _a.outInv, sendInventoryInfo = _a.sendInventoryInfo, receiverDetail = _a.receiverDetail, customerName = _a.customerName, customerPhone = _a.customerPhone, invoiceInfo = _a.invoiceInfo, saler = _a.saler, chooseProvinceInfo = _a.chooseProvinceInfo, chooseCityInfo = _a.chooseCityInfo, chooseRegionInfo = _a.chooseRegionInfo, chooseTownInfo = _a.chooseTownInfo, saleType = _a.saleType, oldNew = _a.oldNew, completeOld = _a.completeOld, deliveryMethod = _a.deliveryMethod, oldMachCategory = _a.oldMachCategory, oldMachTreatWay = _a.oldMachTreatWay, fiBook = _a.fiBook, fileIds = _a.fileIds, expectedDeliveryDate = _a.expectedDeliveryDate;
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
                var time = index_4.formatDate(Date.parse(new Date()), 'Y-M-D');
                // 组装数据
                var orderInfo = {
                    status: status,
                    salesOrder: {
                        isGroup: 0,
                        id: '',
                        documentDate: time,
                        orgId: fiBook.id,
                        edt: expectedDeliveryDate,
                        isOutbound: outInv.id,
                        customerName: customerName,
                        phone: customerPhone,
                        billFromId: invoiceInfo.id,
                        sellerCode: saler.id,
                        storeCode: store.id,
                        warehouseId: sendInventoryInfo.id,
                        provinceId: chooseProvinceInfo.id,
                        cityId: chooseCityInfo.id,
                        countryId: chooseRegionInfo.id,
                        townId: chooseTownInfo.id,
                        fullAddress: receiverDetail,
                        retailType: saleType.id,
                        isOldNew: oldNew.id,
                        isCompleteOld: completeOld.id,
                        oldMachCategory: oldMachCategory.id,
                        oldMachCategoryName: oldMachCategory.name,
                        oldMachTreatWay: oldMachTreatWay.id,
                        oldMachTreatWayName: oldMachTreatWay.name,
                        payAmount: amount,
                        volume: volume,
                        discountAmount: 0,
                        totalAmount: amount,
                        message: note,
                        attachmentIds: fileIds.toString(),
                        deliveryMode: deliveryMethod.id,
                        zoneB2cService: zoneB2cService.join(','),
                        //isDeliveryAndInstall: isDeliveryAndInstall.id,      //配送方式
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
                                zoneB2cService: zoneB2cService.join(','),
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
                    _this.methods.submitRetailOrder(__assign({}, orderInfo, { _ignoreToast: true, _popup: true })).then(function (res) {
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
                                    _this.note = '';
                                    _this.receiverDetail = '';
                                    _this.customerName = '个人';
                                    _this.customerPhone = '';
                                    _this.saleType = {
                                        id: 'retail',
                                        name: '零售'
                                    };
                                    _this.deliveryMethod = {
                                        id: '',
                                        name: '请选择'
                                    };
                                    //获取配送方式列表
                                    _this.methods.getCisDeliveryMethod({ type: _this.saleType.id });
                                    _this.currentDate = new Date().getTime();
                                    _this.expectedDeliveryDate = '';
                                    _this.storeMaterial = [];
                                    _this.fileIds = [];
                                    _this.fileList = [];
                                    _this.$apply();
                                    wepy_redux_1.getStore().dispatch({
                                        type: dmsorder_2.DMS_RETAIL_ORDER_RESER_CHOOSE,
                                        payload: ''
                                    });
                                    _this.methods.getRetailOrderInfo();
                                }
                            });
                        }
                    });
                }).catch(function () {
                    // on cancel
                });
            },
            checkParam: function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, store, outInv, customerName, customerPhone, invoiceInfo, saler, chooseProvinceInfo, saleType, fiBook, receiverDetail, deliveryMethod, _b, errMsg, submitLines;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.data, store = _a.store, outInv = _a.outInv, customerName = _a.customerName, customerPhone = _a.customerPhone, invoiceInfo = _a.invoiceInfo, saler = _a.saler, chooseProvinceInfo = _a.chooseProvinceInfo, saleType = _a.saleType, fiBook = _a.fiBook, receiverDetail = _a.receiverDetail, deliveryMethod = _a.deliveryMethod;
                            if (!store.id) {
                                toast_1.default.fail('请选择门店');
                                return [2 /*return*/, false];
                            }
                            if (!fiBook.id || fiBook.id == '') {
                                toast_1.default.fail('请选择销售组织');
                                return [2 /*return*/, false];
                            }
                            if (!saleType.id) {
                                toast_1.default.fail('请选择销售类型');
                                return [2 /*return*/, false];
                            }
                            if (this.oldNew.id == 1) {
                                if (!this.oldMachCategory.id) {
                                    toast_1.default.fail('请选择旧机品类');
                                    return [2 /*return*/, false];
                                }
                                if (!this.oldMachTreatWay.id) {
                                    toast_1.default.fail('请选择旧机处理途径');
                                    return [2 /*return*/, false];
                                }
                            }
                            // if (!outInv.id) {
                            //   Toast.fail('请选择是否出库')
                            //   return false
                            // }
                            if (customerName === '') {
                                toast_1.default.fail('请填写客户名称');
                                return [2 /*return*/, false];
                            }
                            if (customerPhone === '') {
                                toast_1.default.fail('请填写联系电话');
                                return [2 /*return*/, false];
                            }
                            if (!index_4.checkTel(customerPhone)) {
                                toast_1.default.fail('请填写正确手机号或座机');
                                return [2 /*return*/, false];
                            }
                            if (this.sendInventoryInfo.type == '20') {
                                if (receiverDetail === '') {
                                    toast_1.default.fail('请填写详细地址');
                                    return [2 /*return*/, false];
                                }
                            }
                            // if (!invoiceInfo.id) {
                            //   Toast.fail('请选择开票方')
                            //   return false
                            // }
                            if (!saler.id) {
                                toast_1.default.fail('请选择业务员');
                                return [2 /*return*/, false];
                            }
                            if (!this.sendInventoryInfo.id) {
                                toast_1.default.fail('请选择发货仓库');
                                return [2 /*return*/, false];
                            }
                            if (!deliveryMethod.id) {
                                toast_1.default.fail('请选择配送方式');
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, this.$invoke('order', 'checkParam')];
                        case 1:
                            _b = _c.sent(), errMsg = _b.errMsg, submitLines = _b.submitLines;
                            if (errMsg !== '') {
                                // toast
                                toast_1.default.fail(errMsg);
                                return [2 /*return*/, false];
                            }
                            else if (submitLines === 0) {
                                toast_1.default.fail('请先添加产品再保存');
                                return [2 /*return*/, false];
                            }
                            return [2 /*return*/, true];
                    }
                });
            }); },
            onNoteChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.note = detail;
                _this.$apply();
            }),
            onCustomerPhoneChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.customerPhone = detail.trim();
                _this.$apply();
            }),
            onCustomerNameChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.customerName = detail.trim();
                _this.$apply();
            }),
            onReceiverDetailChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.receiverDetail = detail.trim();
                _this.$apply();
            }),
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
            // 日期弹层
            openChooseDayPopup: function () {
                _this.calendarShow = !_this.calendarShow;
            },
            // 关闭日期弹框
            closeCalendar: function () {
                this.calendarShow = false;
            },
            // 选择日期
            chooseDay: function (evt) {
                var currDate = index_4.formatDate(evt.detail, 'Y-M-D h:m');
                this.expectedDeliveryDate = currDate;
                this.calendarShow = false;
                this.$apply();
            },
        };
        // plsChoose = {
        //   id: '',
        //   name: '请选择'
        // }
        _this.computed = {
            // 计算属性的 用于地址详情是否显示必填符号
            addressDetailRequired: function () {
                return this.sendInventoryInfo.type == '20';
            },
            // 计算属性的 用于地址详情区编码
            chooseRegionId: function () {
                return this.chooseRegionInfo.id;
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
            // 'warehouse': function(newValue: Array<ChooseInfo>) {
            //   if (newValue.length > 0) {
            //     this.sendInventoryInfo = newValue[0]
            //   } else {
            //     this.sendInventoryInfo = {
            //       id: '',
            //       name: '请选择'
            //     }
            //   }
            //   this.$apply()
            // },
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
            },
        };
        _this.events = {
            'amount-change': function (payload) {
                //let payAmount = Number(payload.amount);
                //this.amount = (payAmount).toFixed(2)
                _this.amount = "" + ((+_this.amount) + (+payload.amount)).toFixed(2);
            },
            'volume-change': function (payload) {
                // let payVolume = Number(payload.volume);
                // this.volume = (payVolume).toFixed(2)
                if (isNaN(+payload.volume)) {
                    return;
                }
                _this.volume = "" + ((+_this.volume) + (+payload.volume)).toFixed(2);
            },
            'chooseAddressDetail': function (payload) {
                _this.receiverDetail = payload.addressName;
            }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    ChannelOrder.prototype.onShow = function () {
        var freeShippingTip = index_4.getAlertInfo('14187495683'); // 免运费提示信息
        var signAgreementInfo = index_4.getAlertInfo('14187495772'); // 签订协议提示信息
        var noSignAgreementInfo = index_4.getAlertInfo('14187495767'); // 未签订协议提示信息
        var straightConstructionSite = index_4.getAlertInfo('14187495874'); // 直配到工地提示信息
        var retailInfo = index_4.getAlertInfo('14187496797'); // 统仓并且为零售弹窗提示
        var engineeringInfo = index_4.getAlertInfo('14187496805'); // 统仓并且为工程弹窗提示
        this.dynamicMessage.freeShippingTip = freeShippingTip;
        this.dynamicMessage.signAgreementInfo = signAgreementInfo;
        this.dynamicMessage.noSignAgreementInfo = noSignAgreementInfo;
        this.dynamicMessage.straightConstructionSite = straightConstructionSite;
        this.dynamicMessage.retailInfo = retailInfo;
        this.dynamicMessage.engineeringInfo = engineeringInfo;
        this.$apply();
    };
    ChannelOrder.prototype.onLoad = function () {
        var _this = this;
        // if (params.loadCustomerInfo) {
        //   this.methods.getNormalSalesOrderCustomerInfo({ customerCode: chooseCustomerInfo.customerCode })
        // }
        this.$broadcast('retail');
        this.methods.getRetailOrderInfo();
        //获取销售组织
        this.methods.queryAppFiBook();
        //获取入库仓库
        //this.methods.getRetailOrderInfo();
        //获取配送方式
        this.methods.getCisDeliveryMethod({ type: this.saleType.id });
        this.methods.getOldMachCategoryList().then(function (res) {
            var list = res.payload.data;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var item = list_1[_i];
                var obj = {};
                var key = Object.keys(item)[0];
                obj.id = key;
                obj.name = item[key];
                _this.oldMachCategoryList.push(obj);
            }
        });
        this.methods.getOldMachTreatWayList().then(function (res) {
            var list = res.payload.data;
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var item = list_2[_i];
                var obj = {};
                var key = Object.keys(item)[0];
                obj.id = key;
                obj.name = item[key];
                _this.oldMachTreatWayList.push(obj);
            }
        });
    };
    ChannelOrder = __decorate([
        wepy_redux_1.connect({
            loading: function (_a) {
                var loading = _a.loading;
                return loading.loading;
            },
            billFrom: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.retailOrderBaseInfo.billFrom;
            },
            seller: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.retailOrderBaseInfo.seller;
            },
            stores: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.retailOrderBaseInfo.store;
            },
            warehouse: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.retailOrderBaseInfo.warehouse;
            },
            address: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.retailOrderBaseInfo.address;
            },
            fibookList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.fibookList;
            },
            dmsAddress: function (_a) {
                var address = _a.address;
                return address.dmsAddress;
            },
            additionOrderDetailItem: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.chooseItemInfo;
            },
            deliveryMode: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.cisDeliveryMode;
            },
            serviceList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.serviceList;
            },
        }, {
            getRetailOrderInfo: dmsorder_1.getRetailOrderInfo,
            getWarehouseList: dmsorder_1.getWarehouseList,
            submitRetailOrder: dmsorder_1.submitRetailOrder,
            getCisPrice: dmsorder_1.getCisPrice,
            getLsPrice: dmsorder_1.getLsPrice,
            getCisDeliveryMethod: dmsorder_1.getCisDeliveryMethod,
            getOldMachCategoryList: dmsorder_1.getOldMachCategoryList,
            getOldMachTreatWayList: dmsorder_1.getOldMachTreatWayList,
            queryAppFiBook: dmsorder_1.queryAppFiBook,
            getZoneB2cServiceList: dmsorder_1.getZoneB2cServiceList
        })
    ], ChannelOrder);
    return ChannelOrder;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(ChannelOrder , 'pages/dms/retail-order/index'));

