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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var request_1 = require('./../../../../utils/request.js');
var InventoryOverTime = /** @class */ (function (_super) {
    __extends(InventoryOverTime, _super);
    function InventoryOverTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '共享申请详情',
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
                'van-steps': '../../../../components/vant/steps/index',
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
        _this.data = {
            active: 0,
            applyNo: '',
            detail: {},
            list: [],
            steps: []
        };
        // 页面内交互写在methods里
        _this.methods = {
            getDetail: function () {
                request_1.request({
                    api: "exceedStockList/applyLog.htm", method: 'POST', data: {
                        applyNo: _this.applyNo
                    }
                }).then(function (res) {
                    res.list.forEach(function (it) {
                        it.ininvdate = new Date(it.ininvdate).Format('yyyy/MM/dd');
                    });
                    _this.list = res.list;
                    _this.$apply();
                });
            }
        };
        return _this;
    }
    InventoryOverTime.prototype.onLoad = function (option) {
        this.applyNo = option.applyNo;
        this.methods.getDetail();
        var self = this;
        var eventChannel = this.$wxpage.getOpenerEventChannel();
        eventChannel.on('inventory_share_record_page', function (data) {
            if (data.data.modifiedDate) {
                data.data.modifiedDate2 = new Date(data.data.modifiedDate).Format('yyyy/MM/dd hh:mm:ss');
                data.data.modifiedDate = new Date(data.data.modifiedDate).Format('yyyy/MM/dd');
            }
            if (data.data.createdDate) {
                data.data.createdDate2 = new Date(data.data.createdDate).Format('yyyy/MM/dd hh:mm:ss');
                data.data.createdDate = new Date(data.data.createdDate).Format('yyyy/MM/dd');
            }
            self.detail = data.data;
            var steps = [
                {
                    'text': '发起审批', 'desc': data.data.createdDate2 + '　　申请人：' + data.data.creator
                }
            ];
            if (data.data.modifier && data.data.modifiedDate) {
                steps.unshift({
                    'text': '分公司审批', 'desc': data.data.modifiedDate2 + '　　审批人：' + data.data.modifier
                });
            }
            self.steps = steps;
            console.log(data);
        });
    };
    return InventoryOverTime;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(InventoryOverTime , 'pages/goods/inventory-share-record/detail/index'));

