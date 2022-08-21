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
// import {baseUrl, request} from '@/utils/request';
var requestJSON_1 = require('./../../../utils/requestJSON.js');
// @ts-ignore
// import qqmap  from '@/utils/qqmap-wx-jssdk.min.js';
// interface Data {
//   show2: false,
//   show3:false,
//   show1:false,
//   show4:false,
//   doorImgs:'dfgdg',
// }
var WebViewPage = /** @class */ (function (_super) {
    __extends(WebViewPage, _super);
    function WebViewPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '胶州福州路移动厅',
            navigationBarBackgroundColor: '#00aaa7',
            navigationBarTextStyle: 'white',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-field': '../../../components/vant/field/index',
                'van-button': '../../../components/vant/button/index',
                'van-action-sheet': '../../../components/vant/action-sheet/index',
                'van-dialog': '../../../components/vant/dialog/index',
                'van-toast': '../../../components/vant/toast/index',
            },
        };
        _this.data = {
            date: '本月',
            radio: '',
            checked: false,
            show2: false,
            storeMsg: {},
            storeCode: '',
            materialCode: '',
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
            onClose2: function () {
                this.show2 = false;
            },
            openTank: function () {
                this.show2 = true;
            }
        };
        return _this;
    }
    //获取评价详情
    WebViewPage.prototype.getEvaluateDetail = function () {
        var that = this;
        requestJSON_1.request({
            api: "cts/ctsApi.nd?",
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                storeCode: this.storeCode,
                materialCode: this.materialCode,
                serviceCode: 'storeEvaluationChart'
            },
            method: 'POST',
            callback: function (res) {
                console.log('门店综合评价', res.data.returnData);
                that.storeMsg = res.data.returnData.nextTable;
                that.setData({
                    storeMsg: res.data.returnData.nextTable
                });
            }
        });
    };
    WebViewPage.prototype.onLoad = function (options) {
        if (options.storeCode) {
            this.storeCode = options.storeCode;
        }
        else {
            this.storeCode = '708028702';
        }
        if (options.materialCode) {
            this.materialCode = options.materialCode;
        }
        else {
            this.materialCode = '1320201';
        }
        wx.setNavigationBarTitle({
            title: options.shopName
        });
        // this.getLocation();
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#00aaa7',
        });
        this.getEvaluateDetail();
    };
    return WebViewPage;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(WebViewPage , 'pages/terminal/overallMerit/index'));

