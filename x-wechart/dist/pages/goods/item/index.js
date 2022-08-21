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
var index_1 = require('./../../../components/empty-data-type/index.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var width = wx.getMenuButtonBoundingClientRect().width;
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
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
            orgPopup: false,
            orgColumns: [],
            org: {},
            dmsPrice: '',
            invQty: '',
            gicInvQty: '',
            // stock: '',
            inventory: '',
            ownInv: '',
            sharedInv: '',
            isFenXiao: '',
            agentCisCode: '',
            type: 'booking',
            loginStatus: true,
            ly: '',
            zbActivityId: '',
            isPermission: false,
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
            // 打开组织面板
            closeOrgPopup: function () {
                this.orgPopup = false;
            },
            openOrgPopup: function () {
                this.orgPopup = true;
            },
            orgChange: function (event) {
                var _a = event.detail, picker = _a.picker, value = _a.value, index = _a.index;
                toast_1.default("\u5F53\u524D\u503C\uFF1A" + value + ", \u5F53\u524D\u7D22\u5F15\uFF1A" + index);
            },
            onSelecteSale: function (e) {
                this.org = e;
            },
            chooseItem: function (item) {
                if (item !== this.product.id) {
                    this.getGoodsBasicInfo(item);
                }
            },
            // 政策选择
            openPolicy: function () {
                this.policyVisible = true;
            },
            closePolicy: function () {
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
            // 添加到购物车
            addCart: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var getCartCount, num, orgId, data, res, error_2;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                getCartCount = this.methods.getCartCount;
                                num = this.cart[this.itemID];
                                orgId = this.params.orgId;
                                data = { orgId: orgId, productId: this.itemID, num: num };
                                this.submitting = true;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, request_1.request({ api: 'cart/addToCart.nd', data: data })];
                            case 2:
                                res = _a.sent();
                                if (res) {
                                    getCartCount();
                                    toast_1.default.success({
                                        message: '添加成功',
                                        duration: 2000,
                                        onClose: function () {
                                            _this.submitting = false;
                                            _this.$apply();
                                        },
                                    });
                                }
                                else {
                                    this.submitting = false;
                                    this.$apply();
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                error_2 = _a.sent();
                                toast_1.default.fail('购物车添加失败');
                                this.submitting = false;
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            },
            submitOrder: function (data) {
                var orgDict = _this.params.orgDict;
                wx.navigateTo({
                    url: "/pages/goods/market-activity-order/index?prdIds=" + data.prdId + "&buyNums=" + data.buyNum + "&orgDict=" + orgDict
                });
            },
            //这是原来的认购逻辑，替换未上面的跳结算页
            bookingConfirm: function () {
                if (this.promotion.currentStatus === 'current' && this.type == 'booking') {
                    var buyNum = this.cart[this.itemID];
                    var data = {
                        buyNum: buyNum,
                        prdId: this.promotionId,
                    };
                    this.methods.submitOrder(data);
                    // Toast.loading({ forbidClick: true, message: '抢购中...', duration: 0 });
                    // request({ api: 'marketActivity/save.nd', data, method: 'POST', callback: (res: any) => {
                    //   Toast.clear();
                    //   const { orderCode, msg } = res.data;
                    //   if (orderCode) {
                    //     wx.navigateTo({
                    //       // 新增orderType 1: 普通下单接口 2: 营销活动抢购
                    //       url: `/pages/goods/order-result/index?type=success&orderNum=${orderCode}&orderType=2`,
                    //       complete: () => {
                    //         this.methods.reloadPage();
                    //       }
                    //     });
                    //   } else {
                    //     Toast.fail(msg || '抢购失败');
                    //   }
                    //   this.attrPopup = false;
                    //   this.$apply();
                    // }});
                }
                else {
                    var buyNums = this.cart[this.itemID];
                    var prdId = this.promotionId;
                    var orgDict = this.params.orgDict;
                    debugger;
                    wx.navigateTo({
                        url: "/pages/goods/activity-order/index?prdIds=" + prdId + "&buyNums=" + buyNums + "&orgDict=" + orgDict
                    });
                    this.attrPopup = false;
                    this.$apply();
                }
            },
            bookingAttr: function () {
                if (this.promotion.canBuy == 'Y' && this.promotion.canBuyCount > 0) {
                    if (this.promotion.activityId && this.promotion.canBuyCount < this.promotion.purchaseMinLimitQty) {
                        toast_1.default.fail('最小购买数量大于可购买数量!');
                        return;
                    }
                    if (this.promotion.currentStatus === 'current') {
                        this.attrPopup = !this.attrPopup;
                        var orgList = JSON.parse(this.params.orgDict);
                        var mId = this.promotion.matklId;
                        if (this.params.orgDict !== 'null') {
                            this.orgColumns = orgList[mId];
                            this.org = this.orgColumns[0];
                        }
                    }
                }
                else {
                    toast_1.default.fail('抢购数量已达上限!');
                }
            },
            reloadPage: function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, code, promotionId, getCartCount;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.params, code = _a.code, promotionId = _a.promotionId;
                            getCartCount = this.methods.getCartCount;
                            // 初始化购物车
                            // this.cart[code] = 1;
                            this.itemID = code;
                            if (!promotionId) return [3 /*break*/, 2];
                            this.promotionId = promotionId;
                            return [4 /*yield*/, this.getPromotion()];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2:
                            this.cart[this.itemID] = this.promotion.purchaseMinLimitQty || 1;
                            this.getGoodsBasicInfo(code);
                            // 获取购物车数量
                            if (!this.promotion.activityId) {
                                getCartCount();
                            }
                            return [2 /*return*/];
                    }
                });
            }); }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 获取商品信息
    Home.prototype.getGoodsBasicInfo = function (code) {
        var _this = this;
        var _a = this.params, orgId = _a.orgId, orgCode = _a.orgCode;
        var _b = this.methods, getGoodsInfo = _b.getGoodsInfo, getGoodsPrice = _b.getGoodsPrice, getGoodsStock = _b.getGoodsStock;
        // 切换颜色的时候 如果没有改变过数量 默认是 1
        if (!this.cart[code]) {
            this.cart[code] = 1;
        }
        this.itemID = code;
        toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
        getGoodsInfo({ code: code, orgId: orgId, orderType: 'activity' }, function () {
            toast_1.default.clear();
        });
        // 如果是营销活动  因为对方接口太慢  就不请求了
        var promotionId = this.params.promotionId;
        if (!promotionId) {
            getGoodsPrice({ code: code, orgId: orgId, orgCode: orgCode, type: 'orderQty' });
            // getGoodsStock({
            //   code, orgId, orgCode, type: 'orderQty'
            // }).then((res) => {
            //   if(res && res.payload) {
            //     this.stock = res.payload.inventory;
            //   }
            //   this.$apply();
            // })
            getGoodsStock({
                code: code, orgId: orgId, queryType: this.isFenXiao != 'Y' ? 'purchase' : 'distribute'
            }).then(function (res) {
                console.log(res);
                if (res && res.payload && res.payload[0]) {
                    _this.inventory = res.payload[0].inventory;
                    _this.ownInv = res.payload[0].ownInv;
                    _this.sharedInv = res.payload[0].sharedInv;
                }
                _this.$apply();
            });
        }
        this.$apply();
        this.getGoodsStarStatus(code);
    };
    // 获取商品是否收藏
    Home.prototype.getGoodsStarStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var orgId, data;
            return __generator(this, function (_a) {
                orgId = this.params.orgId;
                data = { orgId: orgId, code: id };
                return [2 /*return*/];
            });
        });
    };
    // 获取营销活动
    Home.prototype.getPromotion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getGoodsPromotion, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getGoodsPromotion = this.methods.getGoodsPromotion;
                        return [4 /*yield*/, getGoodsPromotion({ id: this.promotionId }, function (res) {
                                _this.params.orgCode = res.data.detail.fwOrgCode;
                                _this.params.orgId = res.data.detail.fwOrgId;
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, request_1.request({ api: "marketActivity/queryMsg.nd?id=" + this.promotionId })];
                    case 2:
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
    // 获取已登陆状态下是否有采购产品权限
    Home.prototype.getPermissionList = function () {
        if (wx.getStorageSync('b2b_permission_list')) {
            var productPurchaseAuthority = JSON.parse(wx.getStorageSync('b2b_permission_list')).productPurchaseAuthority;
            this.isPermission = productPurchaseAuthority;
        }
        this.$apply();
    };
    Home.prototype.onUnload = function () {
        this.methods.reset();
    };
    Home.prototype.onShow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, custParamsStr, custParamsObj, res, orgDict, item;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPermissionList()
                        // code=31211414&orgId=154&orgCode=2601&promotionId=15501742183
                        //取登陆状态
                    ];
                    case 1:
                        _a.sent();
                        // code=31211414&orgId=154&orgCode=2601&promotionId=15501742183
                        //取登陆状态
                        this.loginStatus = !ramda_1.isEmpty(this.$parent.globalData.sessionId);
                        options = this.params;
                        if (!options.custom_params) return [3 /*break*/, 3];
                        custParamsStr = decodeURIComponent(decodeURIComponent(options.custom_params));
                        custParamsObj = JSON.parse(custParamsStr);
                        if (!(custParamsObj.ly == 1)) return [3 /*break*/, 3];
                        this.ly = '1';
                        //产品ID=> options.promotionId;
                        //活动ID=>  options.activityId;
                        this.zbActivityId = options.activityId;
                        return [4 /*yield*/, request_1.request({ api: "marketActivity/queryProductList.nd?id=" + options.promotionId })];
                    case 2:
                        res = _a.sent();
                        if (res.code == 0 && res.list && res.list.length > 0) {
                            if (res.list.length > 1 || (res.tgFlag && res.tgFlag === '1')) {
                                wx.navigateTo({
                                    url: "/pages/activity/activity-area/index",
                                });
                            }
                            else {
                                this.params.promotionId = res.list[0];
                                orgDict = JSON.stringify(res.orgDictMap);
                                this.params.orgDict = orgDict;
                            }
                        }
                        else {
                            //无权限
                            this.zbActivityId = null;
                        }
                        _a.label = 3;
                    case 3:
                        if (options && options.type) {
                            this.type = options.type;
                        }
                        // code=3451028&orgId=154&orgCode=2601&promotionId=14181700309
                        this.isFenXiao = options.isFenXiao;
                        this.agentCisCode = options.agentCisCode;
                        return [4 /*yield*/, this.methods.reloadPage()];
                    case 4:
                        _a.sent();
                        if (options.isFenXiao == 'Y') {
                            item = [];
                            item.push(options.code);
                            this.methods.getGoodsDmsStock({
                                productCodes: item,
                                supplierCode: options.agentCisCode,
                            }).then(function (res) {
                                if (res && res.payload && res.payload.data) {
                                    _this.invQty = res.payload.data[0].invQty;
                                    _this.gicInvQty = res.payload.data[0].gicInvQty;
                                    _this.$apply();
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
                        return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.onLoad = function (options) {
        // 保存参数
        this.params = options;
        this.$apply();
    };
    Home = __decorate([
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
        }, {
            getGoodsInfo: goods_2.getGoodsInfo,
            getGoodsPrice: goods_2.getGoodsPrice,
            getCartCount: cart_1.getCartCount,
            getGoodsPromotion: goods_2.getGoodsPromotion,
            getGoodsDmsStock: goods_2.getGoodsDmsStock,
            getGoodsDmsPrice: goods_2.getGoodsDmsPrice,
            getGoodsStock: goods_2.getGoodsStock,
            reset: goods_1.RESET_GOODS_INFO,
        })
    ], Home);
    return Home;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/goods/item/index'));

