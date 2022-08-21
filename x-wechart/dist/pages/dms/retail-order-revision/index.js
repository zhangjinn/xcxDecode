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
var index_1 = require('./../../../components/dms-address/index.js');
var index_2 = require('./../../components/select-address-details/index.js');
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var order_1 = require('./../../../store/actions/order.js');
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
                "tile-radio": "/components/tile-radio/index",
                "entry-label": "/components/user-operation/entry-label/index",
                "entry-source": "/components/user-operation/entry-source/index",
                "van-uploader": "/components/vant/uploader/index",
                'calendar': '/components/calendar/index',
                'van-datetime-picker': '/components/vant/datetime-picker/index',
                'van-radio': '/components/vant/radio/index',
                'van-radio-group': '/components/vant/radio-group/index',
                'van-stepper': '/components/vant/stepper/index',
            },
        };
        _this.mixins = [channel_retail_order_1.default];
        _this.data = {
            ly: 'retailNew',
            isDisabled: true,
            showMore: false,
            baseFormData: {
                store: {
                    id: '',
                    name: '请选择',
                    isSpeclalShop: '' // 1为专卖店
                },
                customerName: '',
                customerPhone: '',
                gender: {
                    id: '1',
                    name: '男士'
                },
                source: {
                    id: '',
                    name: ''
                },
                tag: {
                    id: [],
                    name: []
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
                oldMachCategory: {
                    id: '',
                    name: ''
                },
                oldMachTreatWay: {
                    id: '',
                    name: ''
                },
                deliveryMethod: {
                    id: '',
                    name: '请选择'
                },
                expectedDeliveryDate: index_3.formatDate(new Date().getTime(), 'Y-M-D h:m'),
                note: '',
                fileList: [],
                fileIds: [],
                saler: {
                    id: '',
                    name: '请选择'
                },
                invoiceInfo: {
                    id: '',
                    name: '请选择'
                },
            },
            defaultAddressName: '',
            outInv: {
                id: '1',
                name: '是'
            },
            oldMachCategoryList: [],
            oldMachTreatWayList: [],
            storeMaterial: [],
            totalAmount: '0.00',
            totalVolume: '0.00',
            totalNum: '0',
            popList: [],
            popTitle: '',
            popVisible: false,
            popFiledName: '',
            compareInfo: {},
            isNoticePopupShow: false,
            expressFee: wepy_1.default.$instance.globalData.expressFee,
            deliveryAndInstall: [
                { id: '1', name: '是' },
                { id: '0', name: '否' }
            ],
            dynamicMessage: {
                freeShippingTip: '',
                signAgreementInfo: '',
                noSignAgreementInfo: '',
                straightConstructionSite: '',
                retailInfo: '',
                engineeringInfo: '',
            },
            calendarShow: false,
            currentDate: new Date().getTime(),
            imgObj: {
                'deliveryInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864758756_fd141c1df28d416c87a8f81b9231a354.png',
                'oldInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864758772_144e8a3f0e2340e8a424fafa117fbc98.png',
                'productInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864759346_77a464c855c841938c5dfa1149dc2f30.png',
            },
            saleTypes: [{
                    id: 'retail',
                    name: '零售'
                }, {
                    id: 'engineering',
                    name: '工程'
                }],
            genderOption: [
                { id: '1', name: '男士' },
                { id: '2', name: '女士' },
            ],
            sourceOption: [],
            tagOption: [],
            oldNews: [
                {
                    id: 1,
                    name: '是'
                },
                {
                    id: 0,
                    name: '否'
                }
            ],
            completeOlds: [
                {
                    id: 1,
                    name: '是'
                },
                {
                    id: 0,
                    name: '否'
                }
            ],
            productList: [],
            custInfoId: '',
        };
        _this.$repeat = {};
        _this.$props = { "addressDetail": { "xmlns:v-bind": "", "v-bind:chooseRegionId.sync": "chooseRegionId", "v-bind:isRequired.sync": "addressDetailRequired", "v-bind:defaultAddressName.sync": "defaultAddressName" }, "popup": { "title": "创建零售订单失败" } };
        _this.$events = {};
        _this.components = {
            address: index_1.default,
            addressDetail: index_2.default,
            popup: index_4.default,
        };
        _this.computed = {
            // 计算属性的 用于地址详情是否显示必填符号
            addressDetailRequired: function () {
                return true;
            },
            // 计算属性的 用于地址详情区编码
            chooseRegionId: function () {
                return this.baseFormData.chooseRegionInfo.id;
            }
        };
        _this.watch = {
            'billFrom': function (newValue) {
                if (newValue.length > 0) {
                    this.baseFormData.invoiceInfo = newValue[0];
                }
                else {
                    this.baseFormData.invoiceInfo = {
                        id: '',
                        name: '请选择'
                    };
                }
                this.$apply();
            },
            'seller': function (newValue) {
                if (newValue.length > 0) {
                    this.baseFormData.saler = newValue[0];
                }
                else {
                    this.baseFormData.saler = {
                        id: '',
                        name: '请选择'
                    };
                }
                this.$apply();
            },
            'stores': function (newValue) {
                if (newValue.length > 0) {
                    this.baseFormData.store = newValue[0];
                    // 切换门店修改默认地址
                    this.methods.getDefaultAddressName(newValue[0]);
                    this.methods.getStoreMaterial(this.baseFormData.store.id);
                }
                else {
                    this.baseFormData.store = {
                        id: '',
                        name: '请选择'
                    };
                }
                this.$apply();
            },
            'loading': function (newValue) {
                if (!newValue) {
                    toast_1.default.clear();
                }
            },
            'deliveryMode': function (newValue) {
                if (newValue && newValue.length > 0) {
                    this.baseFormData.deliveryMethod = newValue[0];
                }
                else {
                    this.baseFormData.deliveryMethod = {
                        id: '',
                        name: '请选择'
                    };
                }
                this.$apply();
            },
        };
        _this.events = {
            'chooseAddressDetail': function (payload) {
                _this.baseFormData.receiverDetail = payload.addressName;
            }
        };
        /**
         * TODO: 保存成功后删除客户信息，商品信息
         */
        _this.methods = {
            // 上传图片
            beforeRead: function () {
                toast_1.default.loading({
                    message: '上传中...',
                    forbidClick: true,
                    duration: 20 * 1000
                });
                _this.$apply();
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
                            self.baseFormData.fileList.push({
                                url: data[0].fileMapperPath,
                                name: data[0].fileRealName,
                                deletable: true
                            });
                            self.baseFormData.fileIds.push(data[0].id);
                        }
                        self.$apply();
                    }
                });
            },
            delImg: function (event) {
                _this.baseFormData.fileIds.splice(event.detail.index, 1);
                _this.baseFormData.fileList.splice(event.detail.index, 1);
            },
            //提示框
            noticePopupOpen: function () {
                _this.isNoticePopupShow = true;
            },
            noticePopupClose: function () {
                _this.isNoticePopupShow = false;
            },
            // 选择所在地区
            openTopAddress: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, chooseProvinceInfo, chooseCityInfo, chooseRegionInfo, chooseTownInfo;
                    var _this = this;
                    return __generator(this, function (_b) {
                        _a = this.data.baseFormData, chooseProvinceInfo = _a.chooseProvinceInfo, chooseCityInfo = _a.chooseCityInfo, chooseRegionInfo = _a.chooseRegionInfo, chooseTownInfo = _a.chooseTownInfo;
                        this.$invoke('address', 'openAddressPopup', {
                            province: chooseProvinceInfo.id,
                            city: chooseCityInfo.id,
                            area: chooseRegionInfo.id,
                            town: chooseTownInfo.id
                        }, function (item, address) {
                            _this.baseFormData.addressTip = item.name;
                            _this.baseFormData.chooseProvinceInfo = {
                                id: address.provinceId,
                            };
                            _this.baseFormData.chooseCityInfo = {
                                id: address.cityId,
                            };
                            _this.baseFormData.chooseRegionInfo = {
                                id: address.areaId,
                            };
                            _this.baseFormData.chooseTownInfo = {
                                id: address.townId,
                            };
                            _this.$apply();
                        });
                        return [2 /*return*/];
                    });
                });
            },
            // 应该获取那个值给popList   应该对比那个字段为选中信息
            openChoose: function (propName, fieldName, titleName) {
                var list = _this[propName];
                if (!list) {
                    list = _this.customerInfos[propName];
                }
                if (list.length === 0) {
                    return;
                }
                _this.popList = list;
                _this.compareInfo = _this.data.baseFormData[fieldName];
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
                _this.baseFormData[popFiledName] = popList[index];
                _this.popVisible = false;
                if (popFiledName === 'store') {
                    var storeId = popList[index].id;
                    if (popList[index].isSpeclalShop !== '1') { // 选择店铺非专卖店清空选择标签、来源、性别
                        _this.baseFormData.tag = {
                            id: [],
                            name: []
                        }; // 用户标签
                        _this.tagOption = _this.tagOption.map(function (item) {
                            item.active = false;
                            return item;
                        });
                        _this.baseFormData.source.id = '';
                        _this.baseFormData.source.name = '';
                        _this.baseFormData.gender.id = '1';
                        _this.baseFormData.gender.name = '男士';
                    }
                    _this.methods.getStoreMaterial(storeId);
                    // 切换店铺重新更新建议价格
                    for (var i = 0; i < _this.productList.length; i++) {
                        _this.renewLsPrice(_this.productList[i], i);
                    }
                    // 切换门店修改默认地址
                    _this.methods.getDefaultAddressName(popList[index]);
                }
            },
            // 切换门店修改默认地址
            getDefaultAddressName: function (item) {
                _this.baseFormData.chooseProvinceInfo = {
                    id: item.provinceCode || '',
                    name: item.provinceName || ''
                };
                _this.baseFormData.chooseCityInfo = {
                    id: item.cityCode || '',
                    name: item.cityName || ''
                };
                _this.baseFormData.chooseRegionInfo = {
                    id: item.countyCode || '',
                    name: item.countyName || ''
                };
                _this.baseFormData.chooseTownInfo = {
                    id: item.townCode || '',
                    name: item.townName || ''
                };
                _this.baseFormData.addressTip = _this.baseFormData.chooseProvinceInfo.name + _this.baseFormData.chooseCityInfo.name + _this.baseFormData.chooseRegionInfo.name + _this.baseFormData.chooseTownInfo.name;
                _this.baseFormData.receiverDetail = item.address;
                _this.defaultAddressName = item.address; // 用来传参子组件默认地址
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
            submited: function (status) { return __awaiter(_this, void 0, void 0, function () {
                var that;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            that = this;
                            return [4 /*yield*/, that.methods.checkParam()];
                        case 1:
                            if (_a.sent()) {
                                that.methods.sendRequest(status);
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
            sendRequest: function (status) {
                var _a = _this.data.baseFormData, store = _a.store, customerName = _a.customerName, customerPhone = _a.customerPhone, gender = _a.gender, source = _a.source, tag = _a.tag, chooseProvinceInfo = _a.chooseProvinceInfo, chooseCityInfo = _a.chooseCityInfo, chooseRegionInfo = _a.chooseRegionInfo, chooseTownInfo = _a.chooseTownInfo, receiverDetail = _a.receiverDetail, saleType = _a.saleType, oldNew = _a.oldNew, completeOld = _a.completeOld, oldMachCategory = _a.oldMachCategory, oldMachTreatWay = _a.oldMachTreatWay, deliveryMethod = _a.deliveryMethod, expectedDeliveryDate = _a.expectedDeliveryDate, note = _a.note, fileIds = _a.fileIds, saler = _a.saler, invoiceInfo = _a.invoiceInfo;
                var params = _this.productList;
                // 组装数据
                var orderInfo = {
                    status: status,
                    salesOrder: {
                        edt: expectedDeliveryDate,
                        phone: customerPhone,
                        deliveryMode: deliveryMethod.id,
                        fullAddress: receiverDetail,
                        storeCode: store.id,
                        isGroup: 0,
                        attachmentIds: fileIds.toString(),
                        isOldNew: oldNew.id,
                        isCompleteOld: completeOld.id,
                        oldMachCategory: oldMachCategory.id,
                        oldMachCategoryName: oldMachCategory.name,
                        oldMachTreatWay: oldMachTreatWay.id,
                        oldMachTreatWayName: oldMachTreatWay.name,
                        retailType: saleType.id,
                        provinceId: chooseProvinceInfo.id,
                        cityId: chooseCityInfo.id,
                        townId: chooseTownInfo.id,
                        countryId: chooseRegionInfo.id,
                        message: note,
                        customerName: customerName,
                        billFromId: invoiceInfo.id,
                        sellerCode: saler.id,
                        gender: gender.id,
                        customerLabels: tag.id.toString(),
                        sourceId: source.id,
                        salesOrderItem: params.map(function (param) {
                            var itemInfo = param;
                            var zoneB2cService = '';
                            if (itemInfo.gicWarehouseType && itemInfo.gicWarehouseType == '20') { // 服务方式 统仓传0，其他传空； 20为统仓
                                zoneB2cService = '0';
                            }
                            return {
                                productCode: itemInfo.productCode,
                                materialCode: itemInfo.materialCode,
                                model: itemInfo.model,
                                invStatus: param.invStatusId,
                                invStatusType: param.invStatusType,
                                borderedQty: param.quantity,
                                bprice: (+param.sellingPrice).toFixed(2),
                                amount: param.subtotalAmount,
                                gicWarehouse: itemInfo.gicWarehouse,
                                orgCode: itemInfo.orgCode,
                                zoneB2cService: zoneB2cService,
                            };
                        })
                    }
                };
                dialog_1.default.confirm({
                    title: '提示',
                    message: "\u672C\u5355\u636E\u5171\u6709" + params.length + "\u4E2A\u4EA7\u54C1\uFF0C\u786E\u5B9A\u8981" + (status === 'submitted' ? '提交' : '暂存') + "\u5417?"
                }).then(function () {
                    _this.methods.submitRetailOrderNew(__assign({}, orderInfo, { _ignoreToast: true, _popup: true })).then(function (res) {
                        var code = (res.payload || '-1').code;
                        if (code === '0') {
                            // 保存成功
                            toast_1.default.success({
                                message: (status === 'submitted' ? '提交' : '暂存') + "\u6210\u529F",
                                onClose: function () {
                                    var store = wepy_redux_1.getStore();
                                    store.dispatch({
                                        type: dmsorder_2.DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
                                    });
                                    _this.$broadcast('relaunch');
                                    wepy_redux_1.getStore().dispatch({
                                        type: dmsorder_2.DMS_RETAIL_ORDER_RESER_CHOOSE,
                                        payload: ''
                                    });
                                    _this.methods.getRetailOrderInfo();
                                    _this.methods.baseDataInit();
                                    wx.switchTab({
                                        url: '/pages/main/me/index'
                                    });
                                    _this.$apply();
                                }
                            });
                        }
                    });
                }).catch(function () {
                    // on cancel
                });
            },
            checkParam: function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, store, customerName, customerPhone, receiverDetail, saleType, deliveryMethod, oldNew, oldMachCategory, oldMachTreatWay, saler, checkAddressDetailResult, tip;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.data.baseFormData, store = _a.store, customerName = _a.customerName, customerPhone = _a.customerPhone, receiverDetail = _a.receiverDetail, saleType = _a.saleType, deliveryMethod = _a.deliveryMethod, oldNew = _a.oldNew, oldMachCategory = _a.oldMachCategory, oldMachTreatWay = _a.oldMachTreatWay, saler = _a.saler;
                            if (!store.id) {
                                toast_1.default.fail('请选择门店');
                                return [2 /*return*/, false];
                            }
                            if (!saleType.id) {
                                toast_1.default.fail('请选择销售类型');
                                return [2 /*return*/, false];
                            }
                            if (customerName === '') {
                                toast_1.default.fail('请填写用户姓名');
                                return [2 /*return*/, false];
                            }
                            if (customerPhone === '') {
                                toast_1.default.fail('请填写手机号');
                                return [2 /*return*/, false];
                            }
                            if (!index_3.checkTel(customerPhone)) {
                                toast_1.default.fail('请填写正确手机号或座机');
                                return [2 /*return*/, false];
                            }
                            if (receiverDetail === '') {
                                toast_1.default.fail('请填写详细地址');
                                return [2 /*return*/, false];
                            }
                            if (!saler.id) {
                                toast_1.default.fail('请选择业务员');
                                return [2 /*return*/, false];
                            }
                            if (!deliveryMethod.id) {
                                toast_1.default.fail('请选择配送方式');
                                return [2 /*return*/, false];
                            }
                            if (oldNew.id == 1) {
                                if (!oldMachCategory.id) {
                                    toast_1.default.fail('请选择旧机品类');
                                    return [2 /*return*/, false];
                                }
                                if (!oldMachTreatWay.id) {
                                    toast_1.default.fail('请选择旧机处理途径');
                                    return [2 /*return*/, false];
                                }
                            }
                            checkAddressDetailResult = true;
                            return [4 /*yield*/, this.$invoke('addressDetail', 'checkAddressDetail', function (item) {
                                    checkAddressDetailResult = item;
                                })];
                        case 1:
                            _b.sent();
                            if (!checkAddressDetailResult) {
                                toast_1.default.fail('当前选择的省市区与详细地址不一致，请前往修改');
                                return [2 /*return*/, false];
                            }
                            if (this.productList && this.productList.length > 0) {
                                tip = this.methods.isEmpty(this.productList);
                                if (tip) {
                                    toast_1.default.fail(tip);
                                    return [2 /*return*/, false];
                                }
                            }
                            else {
                                toast_1.default.fail('请先添加产品');
                                return [2 /*return*/, false];
                            }
                            return [2 /*return*/, true];
                    }
                });
            }); },
            isEmpty: function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    if (!arr[i].quantity) {
                        return "\u7B2C" + (i + 1) + "\u4E2A\u5546\u54C1\u6570\u91CF\u4E0D\u80FD\u4E3A0";
                    }
                    if (!arr[i].sellingPrice) {
                        return "\u7B2C" + (i + 1) + "\u4E2A\u5546\u54C1\u4EF7\u683C\u4E0D\u80FD\u4E3A0";
                    }
                    if (arr[i].sellingPrice > 99999) {
                        return "\u7B2C" + (i + 1) + "\u4E2A\u5546\u54C1\u4EF7\u683C\u4E0D\u80FD\u5927\u4E8E99999";
                    }
                    if (arr[i].price && ((arr[i].sellingPrice < arr[i].price * 0.5) || (arr[i].sellingPrice > arr[i].price * 1.75))) {
                        return "\u7B2C" + (i + 1) + "\u4E2A\u5546\u54C1\u5EFA\u8BAE\u96F6\u552E\u4EF7L\u4E3A" + arr[i].price + "\u5143\uFF0C\u53EF\u586B\u8303\u56F4\u57280.5 \u500D\u52301.75\u500D\u4E4B\u95F4\u3002";
                    }
                }
                return false;
            },
            // 提交完成重置基本信息
            baseDataInit: function () {
                _this.baseFormData.customerName = ''; // 用户姓名*
                _this.baseFormData.customerPhone = ''; // 手机号*
                _this.baseFormData.gender.id = '1';
                _this.baseFormData.gender.name = '男士'; // 用户性别
                _this.baseFormData.source.id = '';
                _this.baseFormData.source.name = ''; // // 用户来源
                _this.baseFormData.tag.id = [];
                _this.baseFormData.tag.name = []; // 用户标签
                _this.baseFormData.saleType.id = 'retail';
                _this.baseFormData.saleType.name = '零售'; // 销售类型
                _this.baseFormData.oldNew.id = 0;
                _this.baseFormData.oldNew.name = '否'; // 旧电回收
                _this.baseFormData.completeOld.id = 0;
                _this.baseFormData.completeOld.name = '否'; // 完成收旧
                _this.baseFormData.oldMachCategory.id = '';
                _this.baseFormData.oldMachCategory.name = ''; // 旧机品类
                _this.baseFormData.oldMachTreatWay.id = '';
                _this.baseFormData.oldMachTreatWay.name = ''; // 旧机处理途径
                _this.baseFormData.deliveryMethod.id = '';
                _this.baseFormData.deliveryMethod.name = ''; // 配送方式
                _this.baseFormData.expectedDeliveryDate = index_3.formatDate(new Date().getTime(), 'Y-M-D h:m'); // 期望到货日期
                _this.baseFormData.note = ''; // 备注
                _this.baseFormData.fileList = ''; // 附件
                _this.baseFormData.fileIds = []; // 附件ids
                _this.totalNum = 0;
                _this.totalAmount = 0;
                _this.totalVolume = 0;
                _this.tagOption = _this.tagOption.map(function (item) {
                    item.active = false;
                    return item;
                });
                _this.productList = []; // 产品列表删除
                //获取配送方式列表
                var saleTypeId = _this.baseFormData.saleType.id;
                _this.methods.getCisDeliveryMethod({ type: saleTypeId });
                _this.$apply();
            },
            onNoteChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.baseFormData.note = detail;
                _this.$apply();
            }),
            onCustomerPhoneChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.baseFormData.customerPhone = detail.trim();
                _this.$apply();
            }),
            onCustomerNameChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.baseFormData.customerName = detail.trim();
                _this.$apply();
            }),
            onReceiverDetailChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.baseFormData.receiverDetail = detail.trim();
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
            // 自定义单选改变
            onRadioChange: function (event) {
                var detail = event.detail;
                var key = event.currentTarget.dataset.key;
                this.baseFormData[key] = detail;
                //根据销售类型不同获取对应配送方式
                if (key == 'saleType') {
                    this.methods.getCisDeliveryMethod({ type: this.baseFormData.saleType.id });
                }
                this.$apply();
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
                var currDate = index_3.formatDate(evt.detail, 'Y-M-D h:m');
                this.baseFormData.expectedDeliveryDate = currDate;
                this.calendarShow = false;
                this.$apply();
            },
            // 选择用户来源
            onSourceChange: function (param) {
                var _a = param.detail, option = _a.option, index = _a.index;
                this.baseFormData.source = option;
                this.$apply();
            },
            // 保存用户来源
            saveSourcePop: function (param) {
                var _this = this;
                var _a = param.detail, name = _a.name, popActiveItem = _a.popActiveItem;
                if (name === '') {
                    this.baseFormData.source = popActiveItem;
                    return;
                }
                this.methods.saveSourceInfo({
                    custInfoId: this.custInfoId,
                    type: 2,
                    source: name,
                    remark: '',
                }).then(function (res) {
                    var _a = res.payload, code = _a.code, data = _a.data, msg = _a.msg;
                    if (code == 0) {
                        var currSource = {
                            id: data,
                            name: name,
                        };
                        _this.sourceOption.push(currSource);
                        _this.baseFormData.source = currSource;
                    }
                    else {
                        toast_1.default.fail(msg);
                    }
                    _this.$apply();
                });
            },
            // 选择用户标签
            onTagChange: function (param) {
                var _a = param.detail, option = _a.option, index = _a.index;
                this.tagOption[index].active = !this.tagOption[index].active;
                var ids = [];
                var names = [];
                this.tagOption.forEach(function (item) {
                    if (item.active) {
                        ids.push(item.id);
                        names.push(item.name);
                    }
                });
                this.baseFormData.tag.id = ids;
                this.baseFormData.tag.name = names;
                this.$apply();
            },
            // 保存新增标签
            saveTagPop: function (param) {
                var _this = this;
                var _a = param.detail, tagName = _a.tagName, tagDesc = _a.tagDesc, popOptions = _a.popOptions;
                this.tagOption = popOptions;
                this.baseFormData.tag.id = [];
                this.baseFormData.tag.name = [];
                this.tagOption.forEach(function (item) {
                    if (item.active) {
                        _this.baseFormData.tag.id.push(item.id);
                        _this.baseFormData.tag.name.push(item.name);
                    }
                });
                if (tagName === '') {
                    return;
                }
                this.methods.saveLabelInfo({
                    custInfoId: this.custInfoId,
                    type: 2,
                    label: tagName,
                    remark: tagDesc,
                }).then(function (res) {
                    var _a = res.payload, code = _a.code, data = _a.data, msg = _a.msg;
                    if (code == 0) {
                        _this.tagOption.push({
                            id: data,
                            name: tagName,
                            active: true,
                        });
                        _this.baseFormData.tag.id.push(data);
                        _this.baseFormData.tag.name.push(tagName);
                    }
                    else {
                        toast_1.default.fail(msg);
                    }
                    _this.$apply();
                });
            },
            // 添加修改产品
            jumpClick: function (evt) {
                var outIndex = '';
                if (evt && evt.currentTarget && evt.currentTarget.dataset) {
                    outIndex = evt.currentTarget.dataset.outIndex;
                }
                var requiredParameters = JSON.stringify(this.baseFormData);
                wx.navigateTo({
                    url: '/pages/dms/order-item-choose-new/index?orgId=' + '' + '&warehouseId=' + '' + '&ly=' + this.ly + '&requiredParameters=' + requiredParameters + '&itemProIndexR=' + outIndex
                });
            },
            // 删除产品
            onRemoveOutItem: function (evt) {
                var outIndex = evt.currentTarget.dataset.outIndex;
                this.productList.splice(outIndex, 1);
                this.methods.calculateTotal();
                this.$apply();
            },
            // 销售数量改变
            onQuantityChange: function (event) {
                var detail = event.detail;
                var outIndex = event.currentTarget.dataset.outIndex;
                this.productList[outIndex].quantity = detail;
                var chooseItem = this.productList[outIndex];
                this.methods.onTabFilterFormChange(chooseItem);
                this.$apply();
            },
            // 销售价格改变
            onPriceChange: function (event) {
                var detail = event.detail;
                var outIndex = event.currentTarget.dataset.outIndex;
                this.productList[outIndex].sellingPrice = detail;
                var chooseItem = this.productList[outIndex];
                this.methods.onTabFilterFormChange(chooseItem);
                this.$apply();
            },
            // 小计
            onTabFilterFormChange: function (chooseItem) {
                // 小计 = 数量 * 单价
                var num = chooseItem.quantity;
                var price = chooseItem.sellingPrice;
                var volume = chooseItem.volume;
                chooseItem.subtotalAmount = index_3.mulNum(num, price);
                chooseItem.subtotalVolume = index_3.mulNum(num, volume);
                _this.methods.calculateTotal();
                _this.$apply();
            },
            // 合计
            calculateTotal: function () {
                var totalNum = 0;
                var totalVolume = 0;
                var totalAmount = 0;
                _this.productList.forEach(function (item) {
                    totalNum = index_3.addNum(totalNum, item.quantity);
                    totalVolume = index_3.addNum(totalVolume, item.subtotalVolume);
                    totalAmount = index_3.addNum(totalAmount, item.subtotalAmount);
                });
                // 合计数量 = 每一项数量相加
                _this.totalNum = totalNum;
                // 合计体积 = 每一项体积相加
                _this.totalVolume = totalVolume;
                // 合计金额 = 每一项金额相加
                _this.totalAmount = totalAmount;
                _this.$apply();
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 获取标签列表、用户来源列表
    ChannelOrder.prototype.findLabelListInfo = function () {
        var _this = this;
        var param = {
            custInfoId: this.custInfoId // 	商家id
        };
        this.methods.findLabelList(param).then(function (res) {
            if (res && res.payload && res.payload.data) {
                _this.tagOption = res.payload.data.map(function (item) {
                    return __assign({}, item, { id: item.id, name: item.label, active: false });
                });
            }
            _this.$apply();
        });
        this.methods.findSourceList(param).then(function (res) {
            if (res && res.payload && res.payload.data) {
                _this.sourceOption = res.payload.data.map(function (item) {
                    return __assign({}, item, { id: item.id, name: item.source });
                });
            }
            _this.$apply();
        });
    };
    // 更新建议零售价(元)
    ChannelOrder.prototype.renewLsPrice = function (chooseItem, currIndex) {
        var _this = this;
        // 如果有已选门店，才走以下if判断中内容
        if (this.baseFormData.store.id) {
            var shopCisCode = this.baseFormData.store.id;
            this.methods.getLsPrice({
                type: shopCisCode != '' ? '3' : '2',
                orgId: '',
                cisCode: this.$parent.globalData.cisCode,
                shopCisCode: shopCisCode,
                productId: chooseItem.productCode,
                refreshPrice: true,
            }).then(function (res) {
                var price = res.payload.price;
                if (_this.productList[currIndex].price != price) {
                    _this.productList[currIndex].price = price || "";
                    if (price) {
                        _this.productList[currIndex].sellingPrice = price;
                        var chooseItem_1 = _this.productList[currIndex];
                        _this.methods.onTabFilterFormChange(chooseItem_1);
                    }
                }
                _this.$apply();
            });
        }
    };
    // 获取服务列表
    ChannelOrder.prototype.getServiceList = function (chooseItem, currIndex) {
        var _this = this;
        var _a = this.baseFormData, chooseProvinceInfo = _a.chooseProvinceInfo, chooseCityInfo = _a.chooseCityInfo, chooseRegionInfo = _a.chooseRegionInfo, chooseTownInfo = _a.chooseTownInfo, deliveryMethod = _a.deliveryMethod;
        // 根据发货仓库+配送方式，服务方式字段变化显示
        // 如果仓库为统仓，配送方式选择“配送、自提、配送（加急）“，服务方式字段显示，可选择
        // 如果仓库为统仓，配送方式为“直配到工地“，服务方式字段隐藏，取值空
        // 如果仓库为原仓，服务方式字段隐藏，取值空
        // 省市区必须要有值不然会报错
        if (chooseItem.gicWarehouseType == '20' && deliveryMethod && deliveryMethod.id && deliveryMethod.id != '07' && chooseProvinceInfo.id && chooseCityInfo.id && chooseRegionInfo.id && chooseTownInfo.id) {
            this.methods.getZoneB2cServiceList({
                orgCode: chooseItem.orgCode,
                warehouseCode: chooseItem.gicWarehouse,
                provinceCode: chooseProvinceInfo.id,
                cityCode: chooseCityInfo.id,
                countyCode: chooseRegionInfo.id,
                townCode: chooseTownInfo.id,
            }).then(function (res) {
                var payload = res.payload;
                if (payload.data && payload.code == 0 && payload.data.length > 0) {
                    var serviceList = payload.data;
                    var zoneB2cService_1 = [];
                    var zoneB2cServiceName_1 = [];
                    serviceList.forEach(function (it) {
                        if (it.isSupport === '1' && it.isDefault === '1') {
                            zoneB2cService_1.push(it.serviceCode);
                            zoneB2cServiceName_1.push(it.serviceName);
                        }
                    });
                    _this.productList[currIndex].serviceList = serviceList;
                    _this.productList[currIndex].zoneB2cService = zoneB2cService_1;
                    _this.productList[currIndex].zoneB2cServiceName = zoneB2cServiceName_1;
                }
                _this.$apply();
            });
        }
    };
    // 添加或修改产品赋值
    ChannelOrder.prototype.productAssignment = function (chooseItem, itemProIndexR) {
        var outItems = this.productList;
        var currIndex = itemProIndexR;
        if (!Array.isArray(outItems)) {
            outItems = [];
        }
        if (itemProIndexR !== '' && itemProIndexR !== 'undefined') { // 如果itemProIndexR有值为编辑直接替换数据；否则为新增
            outItems[itemProIndexR] = chooseItem;
        }
        else {
            currIndex = this.productList.length;
            outItems.push(chooseItem);
        }
        this.productList = outItems;
        this.methods.onTabFilterFormChange(chooseItem);
        this.renewLsPrice(chooseItem, currIndex);
        this.getServiceList(chooseItem, currIndex);
        this.$apply();
    };
    ChannelOrder.prototype.onShow = function () {
        var freeShippingTip = index_3.getAlertInfo('14187495683'); // 免运费提示信息
        var signAgreementInfo = index_3.getAlertInfo('14187495772'); // 签订协议提示信息
        var noSignAgreementInfo = index_3.getAlertInfo('14187495767'); // 未签订协议提示信息
        var straightConstructionSite = index_3.getAlertInfo('14187495874'); // 直配到工地提示信息
        var retailInfo = index_3.getAlertInfo('14187496797'); // 统仓并且为零售弹窗提示
        var engineeringInfo = index_3.getAlertInfo('14187496805'); // 统仓并且为工程弹窗提示
        this.dynamicMessage.freeShippingTip = freeShippingTip;
        this.dynamicMessage.signAgreementInfo = signAgreementInfo;
        this.dynamicMessage.noSignAgreementInfo = noSignAgreementInfo;
        this.dynamicMessage.straightConstructionSite = straightConstructionSite;
        this.dynamicMessage.retailInfo = retailInfo;
        this.dynamicMessage.engineeringInfo = engineeringInfo;
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        if (currPage.data.chooseItem) {
            var itemProIndexR = currPage.data.itemProIndexR;
            this.productAssignment(currPage.data.chooseItem, itemProIndexR);
            currPage.data.chooseItem = null;
        }
        this.$apply();
    };
    ChannelOrder.prototype.onLoad = function () {
        var _this = this;
        var customer = JSON.parse(wx.getStorageSync('b2b_token')).customer;
        this.custInfoId = customer && customer.id;
        this.$broadcast('retail');
        this.methods.getRetailOrderInfo();
        //获取配送方式
        this.methods.getCisDeliveryMethod({ type: this.baseFormData.saleType.id });
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
        this.findLabelListInfo();
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
            deliveryMode: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.cisDeliveryMode;
            },
        }, {
            getRetailOrderInfo: dmsorder_1.getRetailOrderInfo,
            getWarehouseList: dmsorder_1.getWarehouseList,
            submitRetailOrderNew: dmsorder_1.submitRetailOrderNew,
            getCisPrice: dmsorder_1.getCisPrice,
            getLsPrice: dmsorder_1.getLsPrice,
            getCisDeliveryMethod: dmsorder_1.getCisDeliveryMethod,
            getOldMachCategoryList: dmsorder_1.getOldMachCategoryList,
            getOldMachTreatWayList: dmsorder_1.getOldMachTreatWayList,
            getZoneB2cServiceList: dmsorder_1.getZoneB2cServiceList,
            findLabelList: order_1.findLabelList,
            saveLabelInfo: order_1.saveLabelInfo,
            findSourceList: order_1.findSourceList,
            saveSourceInfo: order_1.saveSourceInfo,
        })
    ], ChannelOrder);
    return ChannelOrder;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(ChannelOrder , 'pages/dms/retail-order-revision/index'));

