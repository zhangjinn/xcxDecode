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
var index_1 = require('./../../../utils/index.js');
var order_1 = require('./../../../store/actions/order.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            usingComponents: {
                "van-field": "../../vant/field/index",
                "van-popup": "../../vant/popup/index",
                "van-toast": "../../vant/toast/index",
                "calendar": "../../calendar/index",
            },
        };
        _this.props = {
            list: {
                type: Array,
                default: function () {
                    return [
                        {
                            intendedCategory: {
                                id: '',
                                name: ''
                            },
                            intendedProduct: '',
                            purchaseBudget: {
                                id: '',
                                name: ''
                            },
                            expectedDeliveryDate: '',
                            popShow: false,
                        }
                    ]; // 购买意向
                }
            },
            pageType: {
                type: String,
                default: 'intendedUsers' // intendedUsers->意向用户录入，salesOpportunity -> 销售机会
            }
        };
        _this.watch = {
            list: function (newVal) {
                if (newVal && newVal.length > 0) {
                    this.purchaseIntention = newVal.map(function (item) {
                        return {
                            intendedCategory: {
                                id: item.spartId,
                                name: item.spartName
                            },
                            intendedProduct: item.product,
                            purchaseBudget: {
                                id: item.budget,
                                name: item.budget
                            },
                            expectedDeliveryDate: item.planBuyTimeStr,
                            popShow: false,
                        };
                    });
                }
                this.$apply();
            }
        };
        // 缓存触发
        _this.callback = function () { };
        _this.data = {
            calendarShow: false,
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            currentDate: new Date().getTime(),
            imgObj: {
                'productInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864759346_77a464c855c841938c5dfa1149dc2f30.png',
            },
            purchaseIntention: [
                {
                    intendedCategory: {
                        id: '',
                        name: ''
                    },
                    intendedProduct: '',
                    purchaseBudget: {
                        id: '',
                        name: ''
                    },
                    expectedDeliveryDate: '',
                    popShow: false,
                }
            ],
            popList: [],
            popIndex: '-1',
            popTitle: '',
            popFiledKey: '',
            popVisible: false,
            compareInfo: {},
            intendedCategoryOption: [],
            purchaseBudgetOption: [],
            intendedProductOption: [],
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 应该获取那个值给popList   应该对比那个字段为选中信息
            openChoose: function (event) {
                var _a = event.currentTarget.dataset, title = _a.title, index = _a.index, key = _a.key, options = _a.options;
                var list = _this[options];
                if (!list || list.length === 0) {
                    return;
                }
                _this.popList = list;
                _this.popIndex = index;
                _this.popFiledKey = key;
                _this.popTitle = title;
                _this.compareInfo = _this.purchaseIntention[_this.popIndex][_this.popFiledKey];
                _this.popVisible = true;
            },
            // 修改意向产品
            onIntendedProductChange: function (_a) {
                var detail = _a.detail, currentTarget = _a.currentTarget;
                var _b = currentTarget.dataset, index = _b.index, key = _b.key;
                _this.popIndex = index;
                _this.popFiledKey = key;
                _this.purchaseIntention[index][key] = detail;
                _this.purchaseIntention[_this.popIndex].popShow = true;
                _this.getDefevtiveProByMatklInfo();
                _this.$apply();
            },
            // 修改意向产品模糊搜索列表隐藏
            popHide: function () {
                _this.purchaseIntention = _this.purchaseIntention.map(function (item) {
                    item.popShow = false;
                    return item;
                });
                _this.intendedProductOption = [];
            },
            // 选择产品并赋值
            onProductSelect: function (item) {
                var name = item.name;
                this.purchaseIntention[this.popIndex][this.popFiledKey] = name;
                this.methods.popHide();
            },
            onClose: function () {
                _this.popVisible = false;
            },
            onChoose: function (_a) {
                var currentTarget = _a.currentTarget;
                var index = currentTarget.dataset.index;
                var _b = _this.data, popFiledKey = _b.popFiledKey, popList = _b.popList, popIndex = _b.popIndex;
                _this.purchaseIntention[popIndex][popFiledKey] = popList[index];
                _this.popVisible = false;
            },
            // 日期弹层
            openChooseDayPopup: function (event) {
                var _a = event.currentTarget.dataset, index = _a.index, key = _a.key, title = _a.title;
                _this.popIndex = index;
                _this.popFiledKey = key;
                _this.popTitle = title;
                _this.calendarShow = !_this.calendarShow;
            },
            // 关闭日期弹框
            closeCalendar: function () {
                this.calendarShow = false;
            },
            // 选择日期
            chooseDay: function (evt) {
                var _a = evt.detail, year = _a.year, month = _a.month, day = _a.day;
                var currDate = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.purchaseIntention[this.popIndex][this.popFiledKey] = currDate;
                this.calendarShow = false;
                this.$apply();
            },
            // 删除购买意向
            onDelete: function (event) {
                var index = event.currentTarget.dataset.index;
                if (this.purchaseIntention.length > 1) {
                    this.purchaseIntention.splice(index, 1);
                }
                else {
                    this.purchaseIntention = [
                        {
                            intendedCategory: {
                                id: '',
                                name: ''
                            },
                            intendedProduct: '',
                            purchaseBudget: {
                                id: '',
                                name: ''
                            },
                            expectedDeliveryDate: '',
                            popShow: false,
                        }
                    ]; // 购买意向
                }
            },
            // 继续添加
            onAdd: function () {
                this.purchaseIntention.push({
                    intendedCategory: {
                        id: '',
                        name: ''
                    },
                    intendedProduct: '',
                    purchaseBudget: {
                        id: '',
                        name: ''
                    },
                    expectedDeliveryDate: '',
                    popShow: false,
                });
                this.$apply();
            },
            // 重置表单数据
            initBaseData: function () {
                this.purchaseIntention = {
                    intendedCategory: {
                        id: '',
                        name: ''
                    },
                    intendedProduct: '',
                    purchaseBudget: {
                        id: '',
                        name: ''
                    },
                    expectedDeliveryDate: '',
                    popShow: false,
                };
                this.$apply();
            },
            // 校验
            checkParams: function () {
                var arr = _this.purchaseIntention;
                for (var i = 0; i < arr.length; i++) {
                    if (!arr[i].intendedCategory.id) {
                        return "\u7B2C" + (i + 1) + "\u6761 \u8D2D\u4E70\u610F\u5411 \u54C1\u7C7B\u4E0D\u80FD\u4E3A\u7A7A";
                    }
                }
                return false;
            },
            // 向父组件传参
            getParams: function () {
                return _this.purchaseIntention;
            }
        };
        return _this;
    }
    default_1.prototype.commDictInfo = function () {
        var _this = this;
        // 获取购买预算选择列表
        this.methods.commDict({
            pid: '14927471376'
        }).then(function (res) {
            var list = res.payload.list;
            _this.purchaseBudgetOption = list.map(function (item) {
                return __assign({}, item, { id: item.name, name: item.name });
            });
            _this.$apply();
        });
        // 获取意向品类选择列表
        this.methods.getPotentialSpart().then(function (res) {
            var list = res.payload.list;
            _this.intendedCategoryOption = list.map(function (item) {
                return __assign({}, item, { id: item.code, name: item.name });
            });
            _this.$apply();
        });
    };
    // 获取产品列表
    default_1.prototype.getDefevtiveProByMatklInfo = function () {
        var _this = this;
        var oValue = this.purchaseIntention[this.popIndex][this.popFiledKey];
        this.methods.getDefevtiveProByMatkl({
            term: oValue
        }).then(function (res) {
            var list = res.payload.list;
            _this.intendedProductOption = list.map(function (item) {
                return {
                    name: item
                };
            });
            _this.$apply();
        });
    };
    default_1.prototype.onLoad = function () {
        this.commDictInfo();
    };
    default_1 = __decorate([
        wepy_redux_1.connect({}, {
            commDict: order_1.commDict,
            getPotentialSpart: order_1.getPotentialSpart,
            getDefevtiveProByMatkl: order_1.getDefevtiveProByMatkl,
        })
    ], default_1);
    return default_1;
}(wepy_1.default.component));
exports.default = default_1;
