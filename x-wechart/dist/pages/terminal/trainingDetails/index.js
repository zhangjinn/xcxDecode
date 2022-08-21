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
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var requestJSON_1 = require('./../../../utils/requestJSON.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '培训记录详情',
            usingComponents: {
                'van-toast': '../../../components/vant/toast/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {} };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.data = {
            id: '',
            trainingDetails: {},
            imgList: []
        };
        // 页面内交互写在methods里
        _this.methods = {
            //预览图片，放大预览
            preview: function (event) {
                var currentUrl = event.currentTarget.dataset.src;
                wx.previewImage({
                    current: currentUrl,
                    urls: this.imgList,
                    fail: function () {
                        wx.showToast({ title: '预览图片失败', icon: 'none' });
                    }
                });
            }
        };
        return _this;
    }
    // 获取培训记录
    Filter.prototype.myGetDetails = function () {
        var _this = this;
        var data = {
            id: this.id,
            serviceCode: 'getTrainingRecordDeailsApp'
        };
        toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
        requestJSON_1.request({
            api: "cts/ctsApi.nd?",
            data: data,
            method: 'POST',
            callback: function (res) {
                toast_1.default.clear();
                var data = res.data;
                _this.trainingDetails = data.returnData[0];
                _this.imgList = [];
                if (_this.trainingDetails.IMG1) {
                    _this.imgList.push(_this.trainingDetails.IMG1);
                }
                if (_this.trainingDetails.IMG2) {
                    _this.imgList.push(_this.trainingDetails.IMG2);
                }
                if (_this.trainingDetails.IMG3) {
                    _this.imgList.push(_this.trainingDetails.IMG3);
                }
                _this.$apply();
            }
        });
    };
    Filter.prototype.onLoad = function (_a) {
        var id = _a.id;
        this.id = id;
        this.myGetDetails();
    };
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/terminal/trainingDetails/index'));

