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
var order_1 = require('./../../../store/actions/order.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
// 获取常用的 store
var stores = wepy_redux_1.getStore();
var OrderProjectItems = /** @class */ (function (_super) {
    __extends(OrderProjectItems, _super);
    function OrderProjectItems() {
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
        _this.data = {
            all: false,
            list: [],
        };
        _this.methods = {
            onCountChange: function (id, evt) {
                var quantity = parseInt(evt.detail, 10);
                stores.dispatch({ type: 'CHANGE_ORDER_PROJECT_ITEM', payload: { id: id, quantity: quantity } });
            },
            cancelChoose: function (id) {
                stores.dispatch({ type: 'CHANGE_ORDER_PROJECT_ITEM', payload: { id: id, quantity: 0 } });
            },
            viewChecked: function () {
                this.all = !this.all;
                this.list = this.all ? this.itemsSelected : this.items;
            },
            confirmChoose: function () {
                if (this.itemsSelected.length > 0) {
                    wx.navigateBack({ delta: 1 });
                }
                else {
                    toast_1.default('请至少选择一个商品');
                }
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    OrderProjectItems.prototype.onLoad = function () {
        this.list = this.items;
    };
    OrderProjectItems = __decorate([
        wepy_redux_1.connect({
            totalPrice: function (_a) {
                var order = _a.order;
                return order.projectOrder.totalPrice;
            },
            itemsSelected: function (_a) {
                var order = _a.order;
                return order.projectOrder.itemsSelected;
            },
            items: function (_a) {
                var order = _a.order;
                return order.projectOrder.items;
            },
        }, {
            takeProjectOrder: order_1.takeProjectOrder,
        })
    ], OrderProjectItems);
    return OrderProjectItems;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(OrderProjectItems , 'pages/goods/project-items/index'));

