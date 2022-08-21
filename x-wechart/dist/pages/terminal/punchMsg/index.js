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
var requestJSON_1 = require('./../../../utils/requestJSON.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var store_1 = require('./../../../store/actions/store.js');
var WebViewPage = /** @class */ (function (_super) {
    __extends(WebViewPage, _super);
    function WebViewPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '打卡详情',
            navigationBarBackgroundColor: '#00aaa7',
            navigationBarTextStyle: 'white',
            usingComponents: {},
        };
        _this.data = {
            date: '本月',
            radio: '',
            checked: false,
            show2: false,
            inspectionId: '',
            detailData: {}
        };
        _this.methods = {
            onChange: function () {
                if (this.checked == true) {
                    this.checked = false;
                    this.setData({ checked: false });
                }
                else {
                    this.checked = true;
                    this.setData({ checked: true });
                }
            },
            //浏览图片
            browseImg: function (e) {
                var that = this;
                // let fatheridx=e.currentTarget.dataset.fatheridx
                var arr = e.currentTarget.dataset.arr;
                var current = e.currentTarget.dataset.current;
                var arrImg = [];
                if (arr == 'checkIndetail.storeProPlanModel.imgList' && Array.isArray(this.checkIndetail.storeProPlanModel.imgList)) {
                    this.checkIndetail.storeProPlanModel.imgList.forEach(function (it) {
                        if (it.imgName) {
                            arrImg.push(it.imgName);
                        }
                    });
                }
                if (that.detailData[arr + '1']) {
                    arrImg.push(that.detailData[arr + '1']);
                }
                if (that.detailData[arr + '2']) {
                    arrImg.push(that.detailData[arr + '2']);
                }
                if (that.detailData[arr + '3']) {
                    arrImg.push(that.detailData[arr + '3']);
                }
                if (that.detailData[arr + '4']) {
                    arrImg.push(that.detailData[arr + '4']);
                }
                if (that.detailData[arr + '5']) {
                    arrImg.push(that.detailData[arr + '5']);
                }
                wx.previewImage({
                    urls: arrImg,
                    current: current
                });
            },
            onClose2: function () {
                this.show2 = false;
            },
            openTank: function () {
                this.show2 = true;
            }
        };
        return _this;
    }
    //获取信息
    WebViewPage.prototype.getListMsg = function () {
        var that = this;
        requestJSON_1.request({
            api: "cts/ctsApi.nd?",
            data: {
                id: that.inspectionId,
                serviceCode: 'getInspectionDetailById'
            },
            method: 'POST',
            callback: function (res) {
                that.detailData = res.data.returnData;
                that.setData({
                    detailData: res.data.returnData
                });
            }
        });
    };
    WebViewPage.prototype.onLoad = function (options) {
        this.inspectionId = options.id;
        wx.setNavigationBarTitle({
            title: '打卡详情'
        });
        this.getListMsg();
        this.methods.findDetailById({ id: options.id });
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#00aaa7',
        });
    };
    WebViewPage = __decorate([
        wepy_redux_1.connect({
            checkIndetail: function (_a) {
                var store = _a.store;
                return store.checkIndetail;
            }
        }, {
            findDetailById: store_1.findDetailById
        })
    ], WebViewPage);
    return WebViewPage;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(WebViewPage , 'pages/terminal/punchMsg/index'));

