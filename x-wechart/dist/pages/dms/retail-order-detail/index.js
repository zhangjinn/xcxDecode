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
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var channel_retail_order_1 = require('./../../../mixins/channel-retail-order.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var index_3 = require('./../../../utils/index.js');
var dmsorder_2 = require('./../../../store/types/dmsorder.js');
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var salesorderdetail_1 = require('./../../../store/actions/salesorderdetail.js');
var dmsrequest_1 = require('./../../../store/actions/dmsrequest.js');
var dmsorder_3 = require('./../../../store/actions/dmsorder.js');
var index_4 = require('./../../../components/popup-toast/index.js');
var RetailOrderDetail = /** @class */ (function (_super) {
    __extends(RetailOrderDetail, _super);
    function RetailOrderDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '零售订单编辑',
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
        _this.distributionType = [{
                id: '02',
                name: '配送'
            }, {
                id: '01',
                name: '自提'
            }, {
                id: '03',
                name: '配送（加急）'
            }, {
                id: '07',
                name: '直配到工地'
            }];
        _this.data = {
            showMore: false,
            store: {
                id: '',
                name: '请选择'
            },
            storeMaterial: [],
            outInv: {
                id: '0',
                name: '否'
            },
            customerName: '个人',
            customerPhone: '',
            // 发货仓库
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
            //
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
            fiBook: {
                id: '',
                name: '请选择'
            },
            deliveryMethod: {
                id: '',
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
            note: '',
            amount: '0.00',
            popList: [],
            popTitle: '',
            popVisible: false,
            popFiledName: '',
            compareInfo: {},
            popFiBookVisible: false,
            zoneB2cService: [],
            zoneB2cServiceNames: [],
            serverPopVisible: false,
            warehouseList: [],
            fileList: [],
            fileIds: [],
            isSignTheAgreement: false,
        };
        _this.$repeat = {};
        _this.$props = { "order": { "xmlns:v-bind": "", "v-bind:out.sync": "sendInventoryInfo", "v-bind:outInv.sync": "outInv", "v-bind:orgId.sync": "fiBook" }, "popup": { "title": "编辑零售订单失败" } };
        _this.$events = {};
        _this.components = {
            order: index_1.default,
            address: index_2.default,
            popup: index_4.default,
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
                this.sendInventoryInfo.name = '请选择';
                // this.methods.getWarehouseList(dataset.key).then(res=>{
                //   const data = res.payload.data||[];
                //   this.warehouseList = data.map(it=>{
                //     return{
                //       name:it.name,
                //       id:it.cId,
                //       type:it.type//20统仓 70原仓
                //     }
                //   })
                //   this.$apply();
                // })
                this.getWarehouseData(dataset.key);
                this.methods.getServiceList();
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
                if (_this.sendInventoryInfo.type == 20 && _this.deliveryMethod.id != '07') {
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
                    for (var key in _this.additionOrderDetailItem.itemInfo) {
                        var item = _this.additionOrderDetailItem.itemInfo[key];
                        if (item.productCode) {
                            productIds.push(item.productCode);
                        }
                    }
                    if (productIds.length > 0) {
                        // 获取最新价格
                        _this.methods.getCisPrice({
                            type: '3',
                            refreshPrice: true,
                            shopCisCode: storeId,
                            productId: productIds.join(',')
                        });
                    }
                }
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
            submited: function (status) {
                if (_this.methods.checkParam()) {
                    var _a = _this.data, submited = _a.submited, isDeliveryAndInstall_1 = _a.isDeliveryAndInstall, amount = _a.amount, store = _a.store, note = _a.note, outInv = _a.outInv, sendInventoryInfo = _a.sendInventoryInfo, receiverDetail = _a.receiverDetail, customerName = _a.customerName, customerPhone = _a.customerPhone, invoiceInfo = _a.invoiceInfo, saler = _a.saler, chooseProvinceInfo = _a.chooseProvinceInfo, chooseCityInfo = _a.chooseCityInfo, chooseRegionInfo = _a.chooseRegionInfo, chooseTownInfo = _a.chooseTownInfo, saleType = _a.saleType, fiBook_1 = _a.fiBook, deliveryMethod_1 = _a.deliveryMethod, zoneB2cService_1 = _a.zoneB2cService;
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
                    var time = index_3.formatDate(Date.parse(new Date()), 'Y-M-D');
                    // 组装数据
                    var orderInfo_1 = {
                        status: status,
                        salesOrder: {
                            id: _this.currentOrderId,
                            documentDate: time,
                            edt: time,
                            orgId: fiBook_1.id,
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
                            payAmount: amount,
                            discountAmount: 0,
                            totalAmount: amount,
                            message: note,
                            deliveryMode: deliveryMethod_1.id,
                            zoneB2cService: zoneB2cService_1.join(','),
                            isDeliveryAndInstall: isDeliveryAndInstall_1.id,
                            salesOrderItem: params.map(function (param) {
                                var itemInfo = param.itemInfo;
                                return {
                                    zoneB2cService: zoneB2cService_1.join(','),
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
                                    invStatusType: param.invState,
                                    orgId: fiBook_1.id,
                                    deliveryMode: deliveryMethod_1.id,
                                    isDeliveryAndInstall: isDeliveryAndInstall_1.id
                                };
                            })
                        }
                    };
                    dialog_1.default.confirm({
                        title: '提示',
                        message: "\u672C\u5355\u636E\u5171\u6709" + params.length + "\u4E2A\u4EA7\u54C1\uFF0C\u786E\u5B9A\u8981" + (status === 'submitted' ? '提交' : '暂存') + "\u5417?"
                    }).then(function () {
                        _this.methods.submitRetailOrder(__assign({}, orderInfo_1, { _ignoreToast: true, _popup: true })).then(function (res) {
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
                var _a = _this.data, store = _a.store, outInv = _a.outInv, customerName = _a.customerName, customerPhone = _a.customerPhone, invoiceInfo = _a.invoiceInfo, saler = _a.saler, chooseProvinceInfo = _a.chooseProvinceInfo, saleType = _a.saleType, fiBook = _a.fiBook, deliveryMethod = _a.deliveryMethod, receiverDetail = _a.receiverDetail;
                if (!store.id) {
                    toast_1.default.fail('请选择门店');
                    return false;
                }
                if (!fiBook.id || fiBook.id == '') {
                    toast_1.default.fail('请选择销售组织');
                    return false;
                }
                if (!saleType.id) {
                    toast_1.default.fail('请选择销售类型');
                    return false;
                }
                // if (!outInv.id) {
                //   Toast.fail('请选择是否出库')
                //   return false
                // }
                if (customerName === '') {
                    toast_1.default.fail('请填写客户名称');
                    return false;
                }
                if (customerPhone === '') {
                    toast_1.default.fail('请填写联系电话');
                    return false;
                }
                if (!index_3.checkTel(customerPhone)) {
                    toast_1.default.fail('请填写正确手机号或座机');
                    return false;
                }
                if (_this.sendInventoryInfo.type == '20') {
                    if (receiverDetail === '') {
                        toast_1.default.fail('请填写详细地址');
                        return false;
                    }
                }
                if (!deliveryMethod.id || deliveryMethod == '') {
                    toast_1.default.fail('请选择配送方式');
                    return false;
                }
                // if (!invoiceInfo.id) {
                //   Toast.fail('请选择开票方')
                //   return false
                // }
                if (!saler.id) {
                    toast_1.default.fail('请选择业务员');
                    return false;
                }
                if (!_this.sendInventoryInfo.id) {
                    toast_1.default.fail('请选择发货仓库');
                    return false;
                }
                if (!deliveryMethod.id) {
                    toast_1.default.fail('请选择配送方式');
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
            })
        };
        // plsChoose = {
        //   id: '',
        //   name: '请选择'
        // }
        _this.watch = {
        // 'deliveryMode': function(newValue: Array<ChooseInfo>) {
        //   if (newValue && newValue.length > 0) {
        //     this.deliveryMethod = newValue[0]
        //   } else {
        //     this.deliveryMethod = {
        //       id: '',
        //       name: '请选择'
        //     }
        //   }
        //   this.$apply()
        // },
        // 'billFrom': function(newValue: Array<ChooseInfo>) {
        //   if (newValue.length > 0) {
        //     this.invoiceInfo = newValue[0]
        //   } else {
        //     this.invoiceInfo = {
        //       id: '',
        //       name: '请选择'
        //     }
        //   }
        //   this.$apply()
        // },
        // 'seller': function(newValue: Array<ChooseInfo>) {
        //   if (newValue.length > 0) {
        //     this.saler = newValue[0]
        //   } else {
        //     this.saler = {
        //       id: '',
        //       name: '请选择'
        //     }
        //   }
        //   this.$apply()
        // },
        // 'stores': function(newValue: Array<ChooseInfo>) {
        //   if (newValue.length > 0) {
        //     this.store = newValue[0]
        //     this.methods.getStoreMaterial(this.store.id)
        //   } else {
        //     this.store = {
        //       id: '',
        //       name: '请选择'
        //     }
        //   }
        //   this.$apply()
        // },
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
        // 'address': function(newValue: Object) {
        //   const tip = '请选择'
        //   if (newValue.province.id) {
        //     this.chooseProvinceInfo = newValue.province
        //     tip = this.chooseProvinceInfo.name
        //   }
        //   if (newValue.city.id) {
        //     this.chooseCityInfo = newValue.city
        //     tip += this.chooseCityInfo.name
        //   }
        //   if (newValue.country.id) {
        //     this.chooseRegionInfo = newValue.country
        //     tip += this.chooseRegionInfo.name
        //   }
        //   if (newValue.town.id) {
        //     this.chooseTownInfo = newValue.town
        //     tip += this.chooseTownInfo.name
        //   }
        //   this.addressTip = tip
        //   this.$apply()
        // }
        };
        _this.events = {
            'amount-change': function (payload) {
                _this.amount = "" + ((+_this.amount) + (+payload.amount)).toFixed(2);
            }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    RetailOrderDetail.prototype.getWarehouseData = function (id) {
        var _this = this;
        this.methods.getWarehouseList(id).then(function (res) {
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
    RetailOrderDetail.prototype.onShow = function () {
        if (this.loading) {
            toast_1.default.loading({
                message: '正在加载',
                duration: 0
            });
        }
    };
    RetailOrderDetail.prototype.onLoad = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = e.id;
                        this.currentOrderId = id;
                        this.$broadcast('retail');
                        this.methods.getRetailOrderInfo();
                        this.methods.queryAppFiBook(); // 获取销售组织
                        // this.methods.getCisDeliveryMethod(); // 获取配送方式
                        return [4 /*yield*/, this.methods.toRetailOrderEdit({ salesOrderId: this.currentOrderId }).then(function (_a) {
                                var payload = _a.payload;
                                var salesOrder = payload.salesOrder;
                                var isOutbound = salesOrder.isOutbound, // 是否出库,
                                billFromId = salesOrder.billFromId, // 开票方,
                                billFromName = salesOrder.billFromName, // 开票方
                                customerName = salesOrder.customerName, // 客户
                                phone = salesOrder.phone, // 电话
                                warehouseId = salesOrder.warehouseId, // 发货仓库
                                warehouseName = salesOrder.warehouseName, sellerCode = salesOrder.sellerCode, // 业务员
                                sellerName = salesOrder.sellerName, townId = salesOrder.townId, townName = salesOrder.town, cityId = salesOrder.cityId, cityName = salesOrder.city, countryId = salesOrder.countryId, countryName = salesOrder.country, provinceId = salesOrder.provinceId, provinceName = salesOrder.province, fullAddress = salesOrder.fullAddress, // 详细地址
                                retailType = salesOrder.retailType, // 销售类型
                                message = salesOrder.message, salesOrderItem = salesOrder.salesOrderItem, storeCode = salesOrder.storeCode, storeName = salesOrder.storeName, orgId = salesOrder.orgId, orgName = salesOrder.orgName, deliveryMode = salesOrder.deliveryMode, deliveryMethodName = salesOrder.deliveryMethodName, isDeliveryAndInstall = salesOrder.isDeliveryAndInstall;
                                _this.store = {
                                    id: storeCode,
                                    name: storeName
                                };
                                _this.methods.getStoreMaterial(storeCode);
                                _this.invoiceInfo = {
                                    id: billFromId,
                                    name: billFromName
                                };
                                var isOut = _this.outInvs.find(function (item) { return item.id === isOutbound; }) || _this.outInvs[0];
                                _this.outInv = isOut;
                                _this.customerName = customerName;
                                _this.customerPhone = phone;
                                _this.sendInventoryInfo = {
                                    id: warehouseId,
                                    name: warehouseName
                                };
                                var isfiBook = _this.fibookList.find(function (item) { return item.id === orgId; }) || '请选择';
                                _this.fiBook = {
                                    id: orgId,
                                    name: isfiBook.name
                                };
                                var isDelivery = _this.distributionType.find(function (item) { return item.id === deliveryMode; }) || '请选择';
                                _this.deliveryMethod = {
                                    id: deliveryMode,
                                    name: isDelivery.name
                                };
                                var deliveryAndInstallTemp = _this.deliveryAndInstall.find(function (item) { return item.id == isDeliveryAndInstall; }) || '';
                                if (deliveryAndInstallTemp) {
                                    _this.isDeliveryAndInstall = {
                                        id: deliveryAndInstallTemp.id,
                                        name: deliveryAndInstallTemp.name
                                    };
                                }
                                _this.saler = {
                                    id: sellerCode,
                                    name: sellerName
                                };
                                _this.addressTip = "" + provinceName + cityName + countryName + townName;
                                _this.chooseProvinceInfo = {
                                    id: provinceId,
                                    name: provinceName
                                };
                                _this.chooseCityInfo = {
                                    id: cityId,
                                    name: cityName
                                };
                                _this.chooseRegionInfo = {
                                    id: countryId,
                                    name: countryName
                                };
                                _this.chooseTownInfo = {
                                    id: townId,
                                    name: townName
                                };
                                _this.receiverDetail = fullAddress;
                                var saleType = _this.saleTypes.find(function (item) { return item.id === retailType; }) || _this.saleTypes[0];
                                _this.saleType = saleType;
                                _this.note = message;
                                var keys = [];
                                var items = {};
                                var productIds = [];
                                salesOrderItem.forEach(function (_a) {
                                    var invStatus = _a.invStatus, itemId = _a.itemId, bigUom = _a.bigUom, productCode = _a.productCode, productName = _a.productName, model = _a.model, colour = _a.colour, borderedQty = _a.borderedQty, bprice = _a.bprice, amount = _a.amount;
                                    var key = "_" + (new Date()).valueOf();
                                    keys.push(key);
                                    productIds.push(productCode);
                                    _this.methods.getItemInvStatus({
                                        productCode: productCode,
                                    });
                                    // 先调用建议零售价格接口--用于回显建议零售价格
                                    _this.methods.getLsPrice({
                                        type: '3',
                                        refreshPrice: true,
                                        shopCisCode: storeCode,
                                        productId: productCode
                                    }).then(function (item) {
                                        items[key] = {
                                            orgId: orgId,
                                            itemId: itemId,
                                            productCode: productCode,
                                            productName: productName,
                                            model: model,
                                            colour: colour,
                                            suggestPrice: item.payload.price,
                                            quantity: borderedQty,
                                            price: bprice,
                                            amount: (+amount).toFixed(2),
                                            invStatusId: invStatus,
                                            invStatus: [],
                                            uom: bigUom //单位
                                        };
                                    });
                                });
                                _this.methods.getCisPrice({
                                    type: '3',
                                    productId: productIds.join(','),
                                    shopCisCode: storeCode
                                });
                                // DMS_CHANNEL_ORDER_ADD_ITEMS
                                wepy_redux_1.getStore().dispatch({
                                    type: dmsorder_2.DMS_CHANNEL_ORDER_ADD_ITEMS,
                                    payload: items,
                                });
                                _this.$broadcast('details', keys.join(','));
                                _this.methods.getCisDeliveryMethod({ type: _this.saleType.id }); // 获取配送方式
                                _this.getWarehouseData(_this.fiBook.id);
                                _this.$apply();
                                wepy_redux_1.getStore().dispatch({
                                    type: dmsorder_2.DMS_CIS_CODE_INFO,
                                    payload: {
                                        shopCisCode: storeCode
                                    }
                                });
                            })];
                    case 1:
                        // this.methods.getCisDeliveryMethod(); // 获取配送方式
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RetailOrderDetail = __decorate([
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
            dmsAddress: function (_a) {
                var address = _a.address;
                return address.dmsAddress;
            },
            orderdetail: function (_a) {
                var salesorderdetail = _a.salesorderdetail;
                return salesorderdetail.retailorderdetail;
            },
            additionOrderDetailItem: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.chooseItemInfo;
            },
            fibookList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.fibookList;
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
            submitRetailOrder: dmsorder_1.submitRetailOrder,
            toRetailOrderEdit: salesorderdetail_1.toRetailOrderEdit,
            getItemInvStatus: dmsorder_3.getItemInvStatus,
            getCisPrice: dmsorder_1.getCisPrice,
            getCisDeliveryMethod: dmsorder_1.getCisDeliveryMethod,
            queryAppFiBook: dmsorder_1.queryAppFiBook,
            getWarehouseList: dmsorder_1.getWarehouseList,
            getZoneB2cServiceList: dmsorder_1.getZoneB2cServiceList,
            getLsPrice: dmsorder_1.getLsPrice
        })
    ], RetailOrderDetail);
    return RetailOrderDetail;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(RetailOrderDetail , 'pages/dms/retail-order-detail/index'));

