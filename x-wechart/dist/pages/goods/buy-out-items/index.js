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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
// 获取常用的 store
var stores = wepy_redux_1.getStore();
var BuyOutItems = /** @class */ (function (_super) {
    __extends(BuyOutItems, _super);
    function BuyOutItems() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '商品列表',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-stepper': '../../../components/vant/stepper/index',
                'van-swipe-cell': '../../../components/vant/swipe-cell/index',
                'van-submit-bar': '../../../components/vant/submit-bar/index',
            },
        };
        _this.attrActionType = '';
        _this.methods = {
            onCountChange: function (evt) {
                var count = parseInt(evt.detail, 10);
                stores.dispatch({ type: 'CHANGE_BYU_OUT_PRICE', payload: { count: count } });
            },
            confirmChoose: function () {
                if (this.totalNum > 0) {
                    wx.navigateBack({ delta: 1 });
                }
                else {
                    toast_1.default('请输入购物套数');
                }
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    BuyOutItems = __decorate([
        wepy_redux_1.connect({
            totalPrice: function (_a) {
                var order = _a.order;
                return order.buyOutOrder.totalPrice;
            },
            totalNum: function (_a) {
                var order = _a.order;
                return order.buyOutOrder.totalNum;
            },
            items: function (_a) {
                var order = _a.order;
                return order.buyOutOrder.items;
            },
        })
    ], BuyOutItems);
    return BuyOutItems;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(BuyOutItems , 'pages/goods/buy-out-items/index'));

