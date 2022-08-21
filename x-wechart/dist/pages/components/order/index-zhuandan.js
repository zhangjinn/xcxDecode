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
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var index_1 = require('./../../../utils/index.js');
var order_1 = require('./../../../store/actions/order.js');
var store_1 = require('./../../../store/actions/store.js');
var validators_1 = require('./../../../utils/validators.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_2 = require('./../../../components/address/index.js');
var index_3 = require('./../../../components/search-address/index.js');
var index_4 = require('./../select-address-details/index.js');
var request_1 = require('./../../../utils/request.js');
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
            grouplist: {},
            index: {},
            pageType: {
                type: String,
                default: ''
            },
        };
        _this.formData = {
            address3: '',
            contact: '',
            mobile: '',
            orderCode: '',
        };
        _this.inputChanges = {
            contact: false,
            mobile: false,
            address3: false,
        };
        _this.toAddress = {};
        _this.data = {
            deliveryShow: false,
            salesTypeShow: false,
            billShow: false,
            day: '',
            calendarShow: false,
            calendarConfig: { theme: 'elegant', onlyShowCurrentMonth: false },
            marketReceiver: {},
            weekShow: false,
            weekList: [],
            week: {},
            serviceShow: false,
            serviceCheckedName: '',
            serviceList: [],
            salesTypeList: [],
            salesTypeItem: {
                id: '14934002581',
                name: '工程'
            },
            purchaseType: '',
            addressTitle: '收货地址',
            aheadSendShow: false,
            aheadSend: false,
            shopList: [],
            shopLists: {},
            salesShopInfoId: ''
        };
        _this.events = {
            'chooseAddressDetail': function (payload) {
                _this.formData['address3'] = ramda_1.trim(payload.addressName);
                _this.inputChanges['address3'] = true;
            }
        };
        _this.$repeat = {};
        _this.$props = { "search": { "title": "请选择" }, "customMarket": { "title": "分销商" }, "customMarketAddress": { "title": "分销商地址" } };
        _this.$events = {};
        _this.components = {
            address: index_2.default,
            search: index_3.default,
            customMarket: index_3.default,
            customMarketAddress: index_3.default,
            addressDetail: index_4.default,
        };
        _this.computed = {
            // 计算属性的 用于地址详情区编码
            chooseRegionId: function () {
                if (this.toAddress && this.toAddress.areaId) { // 选择省市区后会赋值给this.toAddress
                    return this.toAddress.areaId;
                }
                if (this.common && this.common.areaId) { // 进页面的时候的默认值
                    return this.common.areaId;
                }
                return '';
            }
        };
        _this.methods = {
            // 选择日期
            openCalendar: function () {
                var _a = this.common, deadMaxDate = _a.deadMaxDate, deadMinDate = _a.deadMinDate;
                if (deadMaxDate && deadMinDate) {
                    var now = index_1.formatDate('', 'Y-M-D');
                    var minDate = index_1.getDateDiff(now, deadMinDate) ? now : deadMinDate;
                    this.$wxpage.calendar.enableArea([minDate, deadMaxDate]);
                    if (!this.day) {
                        var dates = ramda_1.split('-', deadMaxDate);
                        this.$wxpage.calendar.jump(dates[0], parseInt(dates[1], 10), parseInt(dates[2], 10));
                    }
                }
                this.calendarShow = true;
            },
            closeCalendar: function () {
                this.calendarShow = false;
            },
            chooseDay: function (evt) {
                var _a = evt.detail, year = _a.year, month = _a.month, day = _a.day;
                this.day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.calendarShow = false;
            },
            // 选择配送类型
            openDelivery: function () {
                this.deliveryShow = true;
            },
            closeDelivery: function () {
                this.deliveryShow = false;
            },
            openSalesType: function () {
                this.salesTypeShow = true;
            },
            closeSalesType: function () {
                this.salesTypeShow = false;
            },
            chooseDelivery: function (item) {
                var _this = this;
                if (item.id !== this.common.delivery.id) {
                    this.common.delivery = item;
                    if (item.id === 502005) {
                        this.marketReceiver = {
                            contactPerson: this.common.custMarketAddress.contactPerson,
                            contactPersonTel: this.common.custMarketAddress.contactPersonTel
                        };
                        if (this.inputChanges.mobile) {
                            this.formData.mobile = this.common.custMarketAddress.contactPersonTel;
                        }
                        if (this.inputChanges.contact) {
                            this.formData.contact = this.common.custMarketAddress.contactPerson;
                        }
                        this.methods.getPeopleContacts({ sendToId: this.common.custMarketAddress.id }).then(function (res) {
                            _this.marketReceiver = {
                                contactPerson: res.payload.contact,
                                contactPersonTel: res.payload.phone
                            };
                            _this.$apply();
                        });
                    }
                    else if (item.id === 502004) {
                        var _a = this.common, orgId = _a.orgId, matklId = _a.matklId;
                        var data = {
                            orgId: orgId,
                            materialGroupId: matklId,
                            ifEngineering: '1',
                        };
                        if (this.pageType === 'engineeringArea') { //父级为工程专区
                            request_1.request({ api: 'comm/findCustomerShopInfoList.nd', method: 'POST', type: 'application/json', data: data }).then(function (res) {
                                _this.shopList = res.list.map(function (item) {
                                    return __assign({}, item, { code: item.customerShopId, name: item.customerShopName });
                                });
                                var salesShopInfoId = _this.common.salesShopInfoId;
                                if (salesShopInfoId) {
                                    _this.shopLists.code = salesShopInfoId;
                                    _this.shopList.forEach(function (item) {
                                        if (item.code == salesShopInfoId) {
                                            _this.shopLists = __assign({}, item);
                                        }
                                    });
                                }
                                else {
                                    _this.shopLists = __assign({}, _this.shopList[0]);
                                }
                                _this.salesShopInfoId = _this.shopLists.code;
                                _this.$apply();
                            });
                        }
                        else {
                            var data_1 = {
                                orgId: orgId,
                                matklId: matklId
                            };
                            request_1.request({ api: 'comm/querySalesShopInfoList.nd', method: 'POST', data: data_1 }).then(function (res) {
                                _this.shopList = res.list;
                                var salesShopInfoId = _this.common.salesShopInfoId;
                                if (salesShopInfoId) {
                                    _this.shopLists.code = salesShopInfoId;
                                    _this.shopList.forEach(function (item) {
                                        if (item.code == salesShopInfoId) {
                                            _this.shopLists.name = item.name;
                                        }
                                    });
                                }
                                else {
                                    _this.shopLists = {
                                        code: res.list[0].code,
                                        name: res.list[0].name
                                    };
                                }
                                _this.salesShopInfoId = _this.shopLists.code;
                                _this.$apply();
                            });
                        }
                    }
                    else {
                        // 配送方式不为直配到用户 销量所属门店的id清空
                        this.salesShopInfoId = '';
                        this.marketReceiver = {};
                        this.inputChanges = {};
                        this.formData = {};
                    }
                }
                this.deliveryShow = false;
            },
            chooseSalesType: function (item) {
                this.salesTypeItem = item;
                this.salesTypeShow = false;
                this.$apply();
            },
            //选择销量所属门店
            openSaleShop: function () {
                var _this = this;
                this.$invoke('search', 'openNormal', this.shopList, this.shopLists.code, 'saleShop', function (item) {
                    _this.formData.salesShopInfoId = item.code;
                    _this.salesShopInfoId = item.code;
                    _this.shopLists = item;
                    _this.$apply();
                });
            },
            //选择服务方式
            openService: function () {
                this.serviceShow = true;
            },
            closeService: function () {
                this.serviceShow = false;
            },
            chooseService: function (item) {
                var nameArr = [];
                var serviceListNew = ramda_1.clone(this.serviceList);
                serviceListNew.map(function (it) {
                    //改变是否选中属性
                    if (it.serviceTypeCode === item.serviceTypeCode) {
                        it.selected = !item.selected;
                    }
                    //赋值选中name
                    if (it.selected) {
                        nameArr.push(it.serviceTypeName);
                    }
                    return __assign({}, it);
                });
                this.serviceList = serviceListNew;
                this.serviceCheckedName = nameArr.join("，");
            },
            // 开户票头
            openBill: function () {
                this.billShow = true;
            },
            closeBill: function () {
                this.billShow = false;
            },
            chooseBill: function (item) {
                if (item.id !== this.common.bill.id) {
                    this.common.bill = item;
                }
                this.billShow = false;
            },
            // 选择分销商
            openCustMarket: function () {
                var _this = this;
                var _a = this.common, custMarkets = _a.custMarkets, custMarket = _a.custMarket, orgId = _a.orgId, matklId = _a.matklId;
                this.$invoke('customMarket', 'open', custMarkets, custMarket.id, orgId, matklId, 'fxs', function (item) {
                    _this.common.custMarket = item;
                    _this.marketReceiver = {
                        contactPerson: item.contact,
                        contactPersonTel: item.phone
                    };
                    if (item && item.address && item.address.length > 0) {
                        _this.common.custMarketsAddress = item.address;
                        _this.common.custMarketAddress = {
                            id: item.address[0].id,
                            name: item.address[0].name
                        };
                    }
                    else {
                        _this.common.custMarketsAddress = [];
                        _this.common.custMarketAddress = {
                            id: '',
                            name: '',
                        };
                    }
                    _this.$apply();
                });
            },
            // 选择分销商地址
            openCustMarketAddress: function () {
                var _this = this;
                var _a = this.common, custMarketsAddress = _a.custMarketsAddress, custMarketAddress = _a.custMarketAddress, orgId = _a.orgId, matklId = _a.matklId;
                this.$invoke('customMarketAddress', 'open', custMarketsAddress, custMarketAddress.id, orgId, matklId, 'fxsdz', function (item) {
                    _this.common.custMarketAddress = item;
                    _this.marketReceiver = {
                        contactPerson: item.contact,
                        contactPersonTel: item.phone
                    };
                    if (_this.inputChanges.mobile) {
                        _this.formData.mobile = item.contactPersonTel;
                        _this.inputChanges.mobile = false;
                    }
                    if (_this.inputChanges.contact) {
                        _this.formData.contact = item.contactPerson;
                        _this.inputChanges.contact = false;
                    }
                    _this.$apply();
                });
            },
            // 选择地址
            openAddress: function () {
                var _this = this;
                // search 统一数据格式 [{ id, name, ...rest }]
                var _a = this.common, addresses = _a.addresses, receiver = _a.receiver;
                this.$invoke('search', 'openNormal', addresses, receiver.id, 'common', function (item) {
                    if (item && item.regionStatus === 'D') { // 判断行政区域地址库是否失效 A有效，D失效。失效的话禁止选择
                        toast_1.default.fail('由于行政区划调整，请您及时更新您的收获地址信息');
                        return false;
                    }
                    _this.common.receiver = item;
                    if (_this.inputChanges.mobile) {
                        _this.formData.mobile = item.contactPersonTel;
                        _this.inputChanges.mobile = false;
                    }
                    if (_this.inputChanges.contact) {
                        _this.formData.contact = item.contactPerson;
                        _this.inputChanges.contact = false;
                    }
                    _this.$apply();
                });
            },
            // 直送地址
            openTopAddress: function () {
                var _this = this;
                // search 统一数据格式 [{ id, name, ...rest }]
                var _a = this.common, provinceArr = _a.provinceArr, provinceId = _a.provinceId, cityId = _a.cityId, areaId = _a.areaId;
                this.$invoke('address', 'openAddressPopup', provinceArr, { provinceId: provinceId, cityId: cityId, areaId: areaId }, function (item, address) {
                    _this.toAddress = address;
                    _this.common.toAddress = item;
                    _this.$apply();
                });
            },
            changeText: function (type, evt) {
                _this.formData[type] = ramda_1.trim(evt.detail);
                _this.inputChanges[type] = true;
            },
            checkParams: function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, trans, address1, address3, mobile, contact, billTo, shopLists;
                return __generator(this, function (_b) {
                    _a = this.getParams(), trans = _a.trans, address1 = _a.address1, address3 = _a.address3, mobile = _a.mobile, contact = _a.contact, billTo = _a.billTo, shopLists = _a.shopLists;
                    if (!billTo) {
                        toast_1.default('开票户头不能为空');
                        return [2 /*return*/, false];
                    }
                    // 新增收货地址校验  如果收货地址为空 不能提交订单
                    if (!address1) {
                        toast_1.default('收货地址不能为空');
                        return [2 /*return*/, false];
                    }
                    // 如果是直配到用户地址是必填的
                    // 活动校验
                    if (trans === 502004) {
                        if (!address3) {
                            toast_1.default('请输入地址详情');
                            return [2 /*return*/, false];
                        }
                        if (!shopLists.code) {
                            toast_1.default('请选择销量所属门店');
                            return [2 /*return*/, false];
                        }
                        // 校验详细地址
                        // let checkAddressDetailResult = true
                        // await this.$invoke('addressDetail', 'checkAddressDetail', (item: any)=>{
                        //   checkAddressDetailResult = item
                        // });
                        // if(!checkAddressDetailResult){
                        //   Toast.fail('当前选择的省市区与详细地址不一致，请前往修改')
                        //   return false
                        // }
                    }
                    // 联系人校验
                    if (this.inputChanges.contact) {
                        if (ramda_1.isEmpty(ramda_1.trim(this.formData.contact))) {
                            toast_1.default('请输入联系人');
                            return [2 /*return*/, false];
                        }
                    }
                    else {
                        if (!contact || ramda_1.isEmpty(ramda_1.trim(contact))) {
                            toast_1.default('请输入联系人');
                            return [2 /*return*/, false];
                        }
                    }
                    // 不一致校验
                    // 手机号码校验
                    // this.inputChanges.mobile
                    if (this.inputChanges.mobile) {
                        if (!validators_1.checkPhone(ramda_1.trim(this.formData.mobile))) {
                            toast_1.default('请输入正确的联系方式');
                            return [2 /*return*/, false];
                        }
                    }
                    else {
                        if (!mobile || ramda_1.isEmpty(ramda_1.trim(mobile))) {
                            toast_1.default('请输入正确的联系方式');
                            return [2 /*return*/, false];
                        }
                        // if (!checkPhone(trim(mobile))) {
                        //   Toast('请输入正确的联系方式');
                        //   return false;
                        // }
                    }
                    if ((!this.week.code || !this.week.name) && this.purchaseType) {
                        toast_1.default('请选择要求到货周次');
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                });
            }); },
            openWeek: function () {
                this.weekShow = true;
            },
            closeWeek: function () {
                this.weekShow = false;
            },
            chooseWeek: function (item) {
                var _this = this;
                if (item.code !== this.week.code) {
                    this.week = item;
                    this.day = item.code;
                }
                this.weekShow = false;
                var _a = this.common, orgId = _a.orgId, matklId = _a.matklId, purchaseType = _a.purchaseType, isPujie = _a.isPujie;
                //purchaseType = 2;
                //isPujie = true;
                //常规订单且为铺借商家取CIS余额 (1:应急 2:常规),其他取SAP余额
                if (purchaseType == 2 && isPujie) {
                    this.methods.moneyByWeek({
                        orgId: orgId,
                        matkl: matklId,
                        weekName: item.name,
                    }, function (res) {
                        var data = res.data;
                        _this.$emit('weekchange', {
                            waitMoney: data.balance.waitMoney,
                            canUseMoney: data.balance.balanceAccount - data.balance.waitMoney,
                            balanceAccount: data.balance.balanceAccount
                        });
                        //console.log(data)
                        //this.order.balanceAccount  = data.balance.balanceAccount;
                        //this.order.waitMoney = data.balance.waitMoney;
                        //this.order.canUseMoney = this.order.balanceAccount - this.order.waitMoney;
                    });
                }
            },
            //获取要求到货周
            getWeekName: function () {
                return this.week;
            },
            // 打开提前发货弹框
            openAheadSend: function () {
                this.aheadSendShow = true;
            },
            // 关闭提前发货弹框
            closeAheadSend: function () {
                this.aheadSendShow = false;
            },
            //选择是否提前发货
            chooseAheadSend: function (_a) {
                var detail = _a.detail;
                this.aheadSend = detail;
                this.common.isAllowAdvancdeliver = detail ? '1' : '0';
            },
            //选择办事处
            openOffice: function () {
                var _this = this;
                var _a = this.common, offices = _a.offices, office = _a.office;
                this.$invoke('search', 'openNormal', offices, office ? office.id : null, '', function (item) {
                    _this.formData.officeId = item.id;
                    _this.common.office = item;
                    _this.$apply();
                });
            },
        };
        return _this;
    }
    Order.prototype.onLoad = function () {
        var _this = this;
        var _a = this.order, items = _a.items, modelId = _a.modelId;
        var _b = this.common, orgId = _b.orgId, matklId = _b.matklId, purchaseType = _b.purchaseType, isPujie = _b.isPujie, shareFlag = _b.shareFlag, offices = _b.offices;
        this.purchaseType = purchaseType;
        //默认为配送
        if (this.purchaseType === '2') {
            this.common.delivery.id = 502001;
            this.common.delivery.propertyName = '配送';
        }
        //是否启用共享库存
        if (shareFlag === 'Y') {
            this.addressTitle = '统仓地址';
        }
        //是否提前发货  默认否
        this.common.isAllowAdvancdeliver = this.aheadSend;
        //查询要求到货周次
        if (purchaseType) {
            this.methods.cartOrderWeek({
                orgId: orgId,
                matklId: matklId,
                purchaseType: purchaseType,
                productId: modelId ? items[0].productId : '',
                modelId: modelId ? modelId : ''
            }, function (res) {
                var data = res.data;
                _this.weekList = data.list;
                if (_this.weekList && _this.weekList.length > 0) {
                    _this.week = _this.weekList[0];
                    _this.day = _this.week.code;
                    //常规订单且为铺借商家取CIS余额 (1:应急 2:常规),其他取SAP余额
                    if (purchaseType == 2 && isPujie) {
                        _this.methods.moneyByWeek({
                            orgId: orgId,
                            matkl: matklId,
                            weekName: _this.week.name,
                        }, function (res) {
                            var data = res.data;
                            _this.$emit('weekchange', {
                                waitMoney: data.balance.waitMoney,
                                canUseMoney: data.balance.balanceAccount - data.balance.waitMoney,
                                balanceAccount: data.balance.balanceAccount
                            });
                            //this.order.balanceAccount = data.balance.balanceAccount;
                            //this.order.waitMoney = data.balance.waitMoney;
                            //this.order.canUseMoney = data.balance.balanceAccount - data.balance.waitMoney;
                            //console.log(this.order.canUseMoney);
                            //this.$apply();
                        });
                        _this.$apply();
                    }
                    _this.$apply();
                }
            });
        }
        if (purchaseType) {
            this.methods.cartOrderWeek({
                orgId: orgId,
                matklId: matklId,
                purchaseType: purchaseType,
                productId: modelId ? items[0].productId : '',
                modelId: modelId ? modelId : ''
            }, function (res) {
                var data = res.data;
                _this.weekList = data.list;
                if (_this.weekList && _this.weekList.length > 0) {
                    _this.week = _this.weekList[0];
                    _this.day = _this.week.code;
                    //常规订单且为铺借商家取CIS余额 (1:应急 2:常规),其他取SAP余额
                    if (purchaseType == 2 && isPujie) {
                        _this.methods.moneyByWeek({
                            orgId: orgId,
                            matkl: matklId,
                            weekName: _this.week.name,
                        }, function (res) {
                            var data = res.data;
                            _this.$emit('weekchange', {
                                waitMoney: data.balance.waitMoney,
                                canUseMoney: data.balance.balanceAccount - data.balance.waitMoney,
                                balanceAccount: data.balance.balanceAccount
                            });
                            // this.order.balanceAccount = data.balance.balanceAccount;
                            // this.order.waitMoney = data.balance.waitMoney;
                            // this.order.canUseMoney = this.order.balanceAccount - this.order.waitMoney;
                            // this.$apply();
                        });
                    }
                    _this.$apply();
                }
            });
        }
        //服务方式
        this.methods.serviceList({}, function (res) {
            var serviceList_ = res.data;
            serviceList_.map(function (it) {
                it.selected = false;
                return __assign({}, it);
            });
            _this.serviceList = serviceList_;
            _this.$apply();
        });
        if (this.pageType && this.pageType == 'engineeringArea') {
            // 销售类型
            this.methods.getDict({
                pid: '14934002578'
            }).then(function (res) {
                var list = res.payload.list;
                if (list && list.length > 0) {
                    _this.salesTypeList = list.map(function (item) {
                        return {
                            id: item.code,
                            name: item.name,
                        };
                    });
                }
                _this.$apply();
            });
        }
    };
    ;
    Order.prototype.getParams = function () {
        var _a = this.common, orgAndGroup = _a.orgAndGroup, carts = _a.carts, versions = _a.versions, deadMaxDate = _a.deadMaxDate, delivery = _a.delivery, bill = _a.bill, receiver = _a.receiver, toAddress = _a.toAddress, custMarketAddress = _a.custMarketAddress, custMarket = _a.custMarket, provinceId = _a.provinceId, cityId = _a.cityId, areaId = _a.areaId, takeCode = _a.takeCode, office = _a.office;
        var _b = this.formData, address3 = _b.address3, contact = _b.contact, mobile = _b.mobile, orderCode = _b.orderCode;
        var date = this.day || deadMaxDate;
        // address3 详细地址
        var data = {
            orgAndGroup: orgAndGroup,
            orderCartIds: carts,
            versions: versions,
            maxEndDate: date,
            endDate: date,
            orderRebate: 'Y',
            trans: delivery.id,
            orderCode: orderCode || takeCode || '',
            billTo: bill.id,
            contact: contact || receiver.contactPerson,
            mobile: mobile || receiver.contactPersonTel,
            address1: receiver.id,
            weekName: this.week.name,
            officeId: office && office.id ? office.id : '',
            isAllowAdvancdeliver: this.aheadSend ? '1' : '0',
            salesShopInfoId: this.salesShopInfoId,
            serviceTypeCodes: this.serviceList.filter(function (m) { return m.selected; }).map(function (i) { return i.serviceTypeCode; }).join(",") //服务方式
        };
        // 直接送
        if (delivery.id === 502004) {
            data.district = this.toAddress.areaId || toAddress.id, // 直送地址街道
                data.address3 = address3;
            data.toAddress = this.toAddress && this.toAddress.areaId ? this.toAddress : {
                provinceId: provinceId,
                cityId: cityId,
                areaId: areaId,
            };
            if (this.toAddress.townId) {
                data.town = this.toAddress.townId;
            }
            data.shopLists = this.shopLists; // 当前所选销售所属门店所有信息
            data.salesTypeItem = this.salesTypeItem; // 销售类型
            // data.serviceTypeCodes = this.serviceList.filter(m => m.selected).map(i => i.serviceTypeCode).join(",")//服务方式
        }
        // 分销商
        if (delivery.id === 502005) {
            data.address4 = custMarketAddress.id; // 分销商地址
            data.address7 = custMarket.id;
            data.contact = contact || this.marketReceiver.contactPerson; // 联系人
            data.mobile = mobile || this.marketReceiver.contactPersonTel; // 联系方式
        }
        return data;
    };
    ;
    Order = __decorate([
        wepy_redux_1.connect({
            order: function (_a) {
                var order = _a.order;
                return order.commonOrder;
            },
            common: function (_a) {
                var order = _a.order;
                return order.common;
            },
        }, {
            getPeopleContacts: order_1.getPeopleContacts,
            cartOrderWeek: order_1.cartOrderWeek,
            moneyByWeek: order_1.moneyByWeek,
            serviceList: order_1.serviceList,
            getDict: store_1.getDict
        })
    ], Order);
    return Order;
}(wepy_1.default.component));
exports.default = Order;
