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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var request_1 = require('./../../../../utils/request.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var index_1 = require('./../../../../components/empty-data-type/index.js');
var InventoryOverTime = /** @class */ (function (_super) {
    __extends(InventoryOverTime, _super);
    function InventoryOverTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '库存共享申请',
            usingComponents: {
                'van-rate': '../../../../components/vant/rate/index',
                'van-icon': '../../../../components/vant/icon/index',
                'van-toast': '../../../../components/vant/toast/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-picker': '../../../../components/vant/picker/index',
                'van-search': '../../../../components/vant/search/index',
                'van-tab': '../../../../components/vant/tab/index',
                'van-row': '../../../../components/vant/row/index',
                'van-col': '../../../../components/vant/col/index',
                'van-tabs': '../../../../components/vant/tabs/index',
                'van-checkbox': '../../../../components/vant/checkbox/index',
                'van-radio': '../../../../components/vant/radio/index',
                'van-radio-group': '../../../../components/vant/radio-group/index',
                'van-cell': '../../../../components/vant/cell/index',
                'van-field': '../../../../components/vant/field/index',
                'van-loading': '../../../../components/vant/loading/index',
                'van-stepper': '../../../../components/vant/stepper/index',
                'van-cell-group': '../../../../components/vant/cell-group/index',
                'van-button': '../../../../components/vant/button/index',
                'calendar': '../../../../components/calendar/index',
                'img': '../../../../components/img/index',
                'van-datetime-picker': '../../../../components/vant/datetime-picker/index'
            }
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {} };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.data = {
            showResult: false,
            inventoryList: [],
            filterForm: {},
            appleCode: ''
        };
        // 页面内交互写在methods里
        _this.methods = {
            onCountChange: function (item, index, e) {
                this.inventoryList[index].quantity = e.detail;
            },
            removeItem: function (index) {
                if (this.inventoryList.length < 2) {
                    toast_1.default('请至少保留一条记录！');
                    return;
                }
                this.inventoryList.splice(index, 1);
            },
            getList: function () {
                request_1.request({
                    api: "exceedStockList/applyShare.htm", method: 'get', data: __assign({ _loading: true }, _this.filterForm)
                }).then(function (res) {
                    res.list.forEach(function (item) {
                        item.quantity = Math.max((item.avbshareqty - (item.checkqty || 0)), 0);
                        item.maxQuantity = item.quantity;
                        if (item.ininvdate) {
                            item.ininvdate = new Date(item.ininvdate).Format('yyyy/MM/dd');
                        }
                    });
                    _this.inventoryList = res.list;
                    _this.$apply();
                });
            },
            submit: function () {
                var applys = '';
                var flag = true;
                if (_this.inventoryList.length < 1) {
                    return;
                }
                for (var i = 0; i < _this.inventoryList.length; i++) {
                    if (_this.inventoryList[i].quantity > 0) {
                        flag = false;
                    }
                    applys += _this.inventoryList[i].gicId;
                    applys += ',';
                    applys += _this.inventoryList[i].quantity;
                    applys += ',2';
                    if (i != _this.inventoryList[i].length - 1) {
                        applys += 'ytjl';
                    }
                }
                if (flag) {
                    toast_1.default('共享数不能为0！');
                    return;
                }
                request_1.request({
                    api: "exceedStockList/submitApply.nd", method: 'POST', data: {
                        _loading: true,
                        applys: applys
                    }
                }).then(function (res) {
                    if (res.code == 0) {
                        _this.showResult = true;
                        _this.appleCode = res.msg.replace('提交成功，申请单号为：', '');
                        _this.$apply();
                    }
                    else {
                        toast_1.default(res.msg);
                    }
                });
            },
            goHome: function () {
                wx.reLaunch({
                    url: '/pages/main/home/index'
                });
            },
            cancle: function () {
                wx.navigateBack();
            },
            goApply: function () {
                wx.navigateTo({
                    url: '/pages/goods/inventory-overtime/index'
                });
            }
        };
        return _this;
    }
    InventoryOverTime.prototype.onLoad = function () {
        var self = this;
        var eventChannel = this.$wxpage.getOpenerEventChannel();
        eventChannel.on('acceptDataFromOpenerPage', function (data) {
            var ids = data.data.map(function (it) { return it.gicId; }).join(',');
            self.filterForm.ids = ids;
            self.filterForm.stockName = data.stockName;
            self.filterForm.orgName = data.orgName;
            console.log(data);
            self.methods.getList();
        });
    };
    return InventoryOverTime;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(InventoryOverTime , 'pages/goods/inventory-overtime/apply/index'));

