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
var request_1 = require('./../../../utils/request.js');
var system_1 = require('./../../../mixins/system.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var utils_1 = require('./../../../components/vant/count-down/utils.js');
var goods_1 = require('./../../../store/types/goods.js');
var goods_2 = require('./../../../store/actions/goods.js');
var cart_1 = require('./../../../store/actions/cart.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var order_1 = require('./../../../store/actions/order.js');
var width = wx.getMenuButtonBoundingClientRect().width;
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    function Custom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '商品详情',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-dott': '../../../components/vant/dott/index',
                'van-button': '../../../components/vant/button/index',
                'van-stepper': '../../../components/vant/stepper/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'van-tab': '../../../components/vant/tab-item/index',
                'van-tabs': '../../../components/vant/tabs-item/index',
                'van-submit-bar': '../../../components/vant/submit-bar/index',
                'van-count-down': '../../../components/vant/count-down/index',
                'van-progress': '../../../components/vant/progress/index',
                'van-transition': '../../../components/vant/transition/index',
                'parser': '../../../lib/parser/index',
                'img': '../../../components/img/index',
                'no-permission': '../../../components/no-permission/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "权限" } };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.mixins = [system_1.default];
        _this.params = {};
        _this.promotionId = '';
        _this.data = {
            barrageList: [],
            isScroll: false,
            menuWidth: width,
            itemID: '',
            cart: {},
            countDownTimer: {},
            policyVisible: false,
            isStar: false,
            submitting: false,
            attrPopup: false,
            dmsPrice: '',
            dmsStock: '',
            stock: '',
            isFenXiao: '',
            agentCisCode: '',
            type: 'booking',
            loginStatus: true,
            ly: '',
            zbActivityId: '',
            policyId: '',
            policySelName: '',
            popVisible: false,
            popList: [],
            popTitle: '',
            popFiledName: '',
            org: {
                id: '',
                name: '请选择',
                orgCode: ''
            },
            compareInfo: null,
            attrSelected: [],
        };
        _this.methods = {
            // 设置分享
            onShareAppMessage: function () {
                // TODO: 测试
                var _a = _this.params, code = _a.code, orgId = _a.orgId, orgCode = _a.orgCode, promotionId = _a.promotionId, type = _a.type, isFenXiao = _a.isFenXiao;
                var shareItemInfo = 'http://3s-static.hisense.com/wechat/1/14722429883/1643097372976_061953fd860d42efa932dd721521a995.png';
                return {
                    imageUrl: shareItemInfo,
                    query: "code=" + code + "&isFenXiao=" + isFenXiao + "&orgId=" + orgId + "&orgCode=" + orgCode + "&promotionId=" + promotionId + "&type=" + type
                };
            },
            // 倒计时
            onTimerChange: function (evt) {
                var _a = evt.detail, days = _a.days, hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
                this.countDownTimer = { days: days, hours: utils_1.padZero(hours), minutes: utils_1.padZero(minutes), seconds: utils_1.padZero(seconds) };
            },
            // 打开属性面板
            closeAttrPopup: function () {
                this.attrPopup = false;
            },
            openAttrPopup: function () {
                this.attrPopup = true;
            },
            /**
             * 逗号是否包含
             * @param all
             * @param item
             * @returns {boolean}
             */
            strContaits: function (all, item) {
                var allArray = all.split(",");
                var result = false;
                for (var key in allArray) {
                    if (all[key].value == item) {
                        result = true;
                        return;
                    }
                }
                return result;
            },
            //不重复添加数据
            pushDate: function (list, item) {
                if (list != null && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        if (list.indexOf(item) == -1) {
                            list.push(item);
                        }
                    }
                }
                else {
                    list = list ? list : [];
                    list.push(item);
                }
                return list;
            },
            jiaoji: function (arr1, arr2) {
                return arr2.every(function (val) { return arr1.includes(val); });
            },
            //属性选择
            chooseItem: function (key, item) {
                var group = this.modelInfo.productAttr.attrGroup[key];
                if (group.value !== item) {
                    group.value = item;
                    //添加已选择属性
                    this.attrSelected = this.methods.pushDate(this.attrSelected, item);
                }
                console.log(this.attrSelected);
                /*let a = [1,3,5,7,9];
                let b = [3,7];
                console.log(this.methods.jiaoji(a,b));*/
                var oldProductId = this.product.id;
                var selectP = [];
                /*let attrProducts = this.modelInfo.productAttr.attrProduct;
                for(var key in attrProducts) {
                  let isSelect = true;
                  let groups = this.modelInfo.productAttr.attrGroup;
                  for (var groupKey in groups) {
                    if (attrProducts[key].indexOf(groups[groupKey].value) == -1) {
                      isSelect = false;
                      break;
                    }
                  }
                  if (isSelect) {
                    selectP.push({productId: key, attr: attrProducts[key]});
                  }
                }*/
                //debugger;
                //两个数组
                var attrProducts = this.modelInfo.productAttr.attrProduct;
                for (var key in attrProducts) {
                    var arry = attrProducts[key].split(',');
                    var flag = this.methods.jiaoji(arry, this.attrSelected);
                    if (flag) {
                        selectP.push({ productId: key, attr: attrProducts[key] });
                        break;
                    }
                }
                if (selectP.length == 0) {
                    for (var key in attrProducts) {
                        var arry = attrProducts[key].split(',');
                        var flag = this.methods.jiaoji(arry, [item]);
                        if (flag) {
                            selectP.push({ productId: key, attr: attrProducts[key] });
                            break;
                        }
                    }
                }
                if (selectP.length > 0 && oldProductId != selectP[0].productId) {
                    //获取产品信息
                    this.getGoodsDetailInfo(selectP[0].productId);
                    // debugger;
                    //重置属性
                    var arry = selectP[0].attr.split(',');
                    arry = Array.from(new Set(arry));
                    var groups = this.modelInfo.productAttr.attrGroup;
                    for (var i = 0; i < groups.length; i++) {
                        var group_1 = groups[i];
                        var values = group_1.values;
                        for (var j = 0; j < values.length; j++) {
                            if (arry[i] == values[j]) {
                                group_1.value = arry[i];
                            }
                        }
                    }
                }
            },
            // 政策选择
            openPolicy: function () {
                this.policyVisible = true;
            },
            closePolicy: function () {
                this.policyVisible = false;
            },
            //选择政策
            selectPolicy: function (item) {
                this.policyId = item.id;
                this.policySelName = item.policyName + '[' + item.versionCode + ']';
                this.policyVisible = false;
            },
            goToTab: function (url) {
                wx.switchTab({ url: url });
            },
            // 添加购物车数量
            onCountChange: function (event) {
                var num = event.detail;
                this.cart[this.itemID] = num;
            },
            // 添加/取消收藏
            toggleStar: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var orgId, data, api, res, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                orgId = this.params.orgId;
                                data = { orgId: orgId, id: this.itemID };
                                api = this.isStar ? 'oftenProduct/deleteOftenProduct.nd' : 'oftenProduct/addOftenProduct.nd';
                                return [4 /*yield*/, request_1.request({ api: api, method: 'POST', data: data })];
                            case 1:
                                res = _a.sent();
                                if (res && (res === 'Y' || res.status === 'true')) {
                                    toast_1.default.success({
                                        message: this.isStar ? '取消收藏' : '收藏成功',
                                        duration: 1000,
                                    });
                                    this.isStar = !this.isStar;
                                    this.$apply();
                                }
                                else {
                                    toast_1.default.fail(this.isStar ? '取消失败' : '收藏失败');
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                toast_1.default.fail(this.isStar ? '取消失败' : '收藏失败');
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
            //常规下单
            takeAgainOrder: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, orgId, code, num, materialGroupId, params;
                    return __generator(this, function (_b) {
                        toast_1.default.loading({
                            message: '下单中....',
                            duration: 0,
                        });
                        console.log(this.price);
                        if (this.price.standardPrice <= 0) {
                            toast_1.default.fail('没有价格，下单失败！');
                            return [2 /*return*/];
                        }
                        _a = this.params, orgId = _a.orgId, code = _a.code;
                        num = this.cart[this.itemID];
                        materialGroupId = this.product.materialGroupId;
                        params = { orgId: orgId, modelId: code, matklId: materialGroupId, products: this.itemID, productNumbers: num, purchaseType: 2, versions: this.policyId };
                        console.log(params);
                        console.log(this.product);
                        this.methods.getSalesOrderInfo(params, function (res) {
                            var data = res.data;
                            if (data && data.cartOrder) {
                                toast_1.default.clear();
                                wx.navigateTo({
                                    url: '/pages/goods/order/index?type=again',
                                });
                            }
                            else {
                                toast_1.default.fail(data.msg || '结算失败');
                            }
                        });
                        return [2 /*return*/];
                    });
                });
            },
            bookingAttr: function () {
                if (this.promotion.currentStatus === 'current') {
                    this.attrPopup = !this.attrPopup;
                }
            },
            reloadPage: function () {
                console.log(_this.params);
                var _a = _this.params, code = _a.code, orgId = _a.orgId;
                var getCartCount = _this.methods.getCartCount;
                _this.getGoodsBasicInfo(code, orgId);
                // 获取购物车数量
                getCartCount();
            },
            // 应该获取那个值给popList   应该对比那个字段为选中信息
            openChoose: function (propName, fieldName, titleName) {
                var list = _this[propName];
                if (!list) {
                    list = _this.modelInfo.fwOrgs;
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
                // debugger;
                var getModelGoodsInfo = _this.methods.getModelGoodsInfo;
                var dataset = currentTarget.dataset;
                var index = dataset.index;
                var _b = _this.data, popFiledName = _b.popFiledName, popList = _b.popList;
                _this[popFiledName] = popList[index];
                _this.popVisible = false;
                //控制选择
                var attrProduct = _this.modelInfo.productAttr.attrProduct;
                console.log(attrProduct);
                //供应商
                if (popFiledName === 'org') {
                    //const {code}: any = this.params;
                    var orgId = _this.org.id;
                    var code = _this.modelInfo.productId;
                    goods_2.getGoodsInfo({ code: code, orgId: orgId }, function () {
                        toast_1.default.clear();
                    });
                }
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 获取定制产品详情
    Custom.prototype.getGoodsBasicInfo = function (code, orgId, orgCode) {
        var _this = this;
        //debugger;
        //const { orgCode }: any = this.params;
        var _a = this.methods, getModelGoodsInfo = _a.getModelGoodsInfo, getGoodsPrice = _a.getGoodsPrice, getGoodsStock = _a.getGoodsStock;
        toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
        getModelGoodsInfo({ code: code, orgId: orgId }, function () {
            toast_1.default.clear();
        }).then(function (res) {
            //console.log(res.payload);
            var modelInfo = res.payload.modelInfo;
            //console.log(modelInfo);
            var orgName = modelInfo.orgName;
            //设置默认组织
            _this.setDefaultOrg(orgId, orgCode, orgName);
            //获取默认产品
            _this.getGoodsDetailInfo(modelInfo.productId);
        });
        // 如果是营销活动  因为对方接口太慢  就不请求了
        var promotionId = this.params.promotionId;
        if (!promotionId) {
            getGoodsPrice({ code: code, orgId: orgId, orgCode: orgCode, type: 'orderQty' });
            getGoodsStock({
                code: code, orgId: orgId, orgCode: orgCode, type: 'orderQty'
            }).then(function (res) {
                if (res && res.payload) {
                    _this.stock = res.payload.inventory;
                }
                _this.$apply();
            });
        }
        this.$apply();
        this.getGoodsStarStatus(code);
    };
    ;
    Custom.prototype.setDefaultOrg = function (orgId, orgCode, orgName) {
        this.org.id = orgId;
        this.org.code = orgCode;
        this.org.name = orgName;
        this.compareInfo = {};
        this.compareInfo.id = orgId;
        this.compareInfo.code = orgCode;
        this.compareInfo.name = orgName;
    };
    ;
    // 获取产品详情信息
    Custom.prototype.getGoodsDetailInfo = function (code) {
        var _this = this;
        var orgId = null, orgCode = null;
        if (this.compareInfo && this.compareInfo.id) {
            orgId = this.compareInfo.id;
            orgCode = this.compareInfo.code;
        }
        else {
            orgId = this.params.orgId;
            orgCode = this.params.orgCode;
        }
        var _a = this.methods, getGoodsInfo = _a.getGoodsInfo, getGoodsPrice = _a.getGoodsPrice, getGoodsStock = _a.getGoodsStock;
        // 切换颜色的时候 如果没有改变过数量 默认是 1
        if (!this.cart[code]) {
            this.cart[code] = 1;
        }
        this.itemID = code;
        toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
        getGoodsInfo({ code: code, orgId: orgId }, function () {
            toast_1.default.clear();
        });
        // 如果是营销活动  因为对方接口太慢  就不请求了
        var promotionId = this.params.promotionId;
        if (!promotionId) {
            getGoodsPrice({ code: code, orgId: orgId, orgCode: orgCode, type: 'orderQty' });
            getGoodsStock({
                code: code, orgId: orgId, orgCode: orgCode, type: 'orderQty'
            }).then(function (res) {
                if (res && res.payload) {
                    _this.stock = res.payload.inventory;
                }
                _this.$apply();
            });
        }
        this.$apply();
        this.getGoodsStarStatus(code);
    };
    // 获取商品是否收藏
    Custom.prototype.getGoodsStarStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var orgId, data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orgId = this.params.orgId;
                        data = { orgId: orgId, code: id };
                        return [4 /*yield*/, request_1.request({ api: 'oftenProduct/findOftenProduct.nd', method: 'POST', data: data })];
                    case 1:
                        res = _a.sent();
                        this.isStar = (res && res === 'Y');
                        this.$apply();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 获取营销活动
    Custom.prototype.getPromotion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getGoodsPromotion, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getGoodsPromotion = this.methods.getGoodsPromotion;
                        getGoodsPromotion({ id: this.promotionId });
                        return [4 /*yield*/, request_1.request({ api: "marketActivity/queryMsg.nd?id=" + this.promotionId })];
                    case 1:
                        res = _a.sent();
                        if (res && res.list) {
                            this.barrageList = res.list;
                            this.$apply();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Custom.prototype.onUnload = function () {
        this.methods.reset();
    };
    Custom.prototype.onShow = function () {
        var _this = this;
        //取登陆状态
        this.loginStatus = !ramda_1.isEmpty(this.$parent.globalData.sessionId);
        var options = this.params;
        if (options && options.type) {
            this.type = options.type;
        }
        this.isFenXiao = options.isFenXiao;
        this.agentCisCode = options.agentCisCode;
        this.methods.reloadPage();
        if (options.isFenXiao == 'Y') {
            var item = [];
            item.push(options.code);
            this.methods.getGoodsDmsStock({
                productCodes: item,
                supplierCode: options.agentCisCode,
            }).then(function (res) {
                if (res && res.payload && res.payload.data && res.payload.data.length > 0) {
                    _this.dmsStock = res.payload.data[0].invQty;
                }
                else {
                    _this.dmsStock = 0;
                }
            });
            this.methods.getGoodsDmsPrice({
                orgId: options.orgId,
                productId: options.code,
            }).then(function (res) {
                if (res && res.payload && res.payload.list && res.payload.list.length > 0) {
                    _this.dmsPrice = res.payload.list[0].standardPrice;
                }
                else {
                    _this.dmsPrice = 0;
                }
                _this.$apply();
            });
        }
    };
    Custom.prototype.onLoad = function (options) {
        // 保存参数
        this.params = options;
        this.$apply();
    };
    Custom = __decorate([
        wepy_redux_1.connect({
            cartNum: function (_a) {
                var cart = _a.cart;
                return cart.num;
            },
            banners: function (_a) {
                var goods = _a.goods;
                return goods.banners;
            },
            promotion: function (_a) {
                var goods = _a.goods;
                return goods.promotion;
            },
            product: function (_a) {
                var goods = _a.goods;
                return goods.product;
            },
            price: function (_a) {
                var goods = _a.goods;
                return goods.price;
            },
            policies: function (_a) {
                var goods = _a.goods;
                return goods.policies;
            },
            infoList: function (_a) {
                var goods = _a.goods;
                return goods.infoList;
            },
            attrs: function (_a) {
                var goods = _a.goods;
                return goods.attrs;
            },
            modelInfo: function (_a) {
                var goods = _a.goods;
                return goods.modelInfo;
            },
        }, {
            getGoodsInfo: goods_2.getGoodsInfo,
            getGoodsPrice: goods_2.getGoodsPrice,
            getCartCount: cart_1.getCartCount,
            getGoodsPromotion: goods_2.getGoodsPromotion,
            getGoodsDmsStock: goods_2.getGoodsDmsStock,
            getGoodsDmsPrice: goods_2.getGoodsDmsPrice,
            getGoodsStock: goods_2.getGoodsStock,
            reset: goods_1.RESET_GOODS_INFO,
            getSalesOrderInfo: order_1.getSalesOrderInfo,
            getModelGoodsInfo: goods_2.getModelGoodsInfo
        })
    ], Custom);
    return Custom;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Custom , 'pages/goods/custom/index'));

