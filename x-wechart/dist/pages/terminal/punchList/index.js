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
// import {baseUrl} from '@/utils/request';
var requestJSON_1 = require('./../../../utils/requestJSON.js');
var WebViewPage = /** @class */ (function (_super) {
    __extends(WebViewPage, _super);
    function WebViewPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '详情信息',
            navigationBarBackgroundColor: '#00aaa7',
            navigationBarTextStyle: 'white',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-field': '../../../components/vant/field/index',
                'van-button': '../../../components/vant/button/index',
                'van-action-sheet': '../../../components/vant/action-sheet/index',
                'van-dialog': '../../../components/vant/dialog/index',
                'van-toast': '../../../components/vant/toast/index',
                "van-loading": "../../../components/vant/loading/index"
            },
        };
        _this.data = {
            date: '本月',
            radio: '',
            checked: false,
            isUnqualified: false,
            show2: false,
            storeCode: '',
            pageNo: 1,
            recodeList: [],
            signCishu: {},
            storeRenList: [],
            loading: ''
        };
        _this.methods = {
            //关闭弹框
            closeTankuan: function () {
                this.show2 = false;
                // this.setData({show})
            },
            //拨打电话
            telphontFun: function (e) {
                // console.log(e.currentTarget.dataset.tel)
                var phone = e.currentTarget.dataset.tel;
                wx.makePhoneCall({
                    phoneNumber: phone
                });
            },
            //看自己和全部切换
            onChange: function () {
                if (this.checked == true) {
                    this.checked = false;
                    this.setData({ checked: false });
                }
                else {
                    this.checked = true;
                    this.setData({ checked: true });
                }
                this.getRecodeList(this.pageNo, 1);
                this.getCatcs();
            },
            // 不合格
            unqualifiedChange: function () {
                this.setData({ isUnqualified: !this.isUnqualified });
                this.isUnqualified = !this.isUnqualified;
                this.getRecodeList(this.pageNo, 1);
                this.getCatcs();
            },
            //上拉刷新
            upper: function () {
                this.pageNo = 1;
                this.getRecodeList(this.pageNo, 3);
            },
            //分页
            tolower: function () {
                this.pageNo = this.pageNo + 1;
                this.getRecodeList(this.pageNo, 2);
            },
            onClose2: function () {
                this.show2 = false;
            },
            openTank: function () {
                this.show2 = true;
            },
            //浏览图片
            browseImg: function (e) {
                var that = this;
                var fatheridx = e.currentTarget.dataset.fatheridx;
                // let arr=e.currentTarget.dataset.arr
                var current = e.currentTarget.dataset.current;
                var arrImg = [];
                if (that.recodeList[fatheridx].img1[0].length > 0) {
                    arrImg = arrImg.concat(that.recodeList[fatheridx].img1);
                }
                if (that.recodeList[fatheridx].img2[0].length > 0) {
                    arrImg = arrImg.concat(that.recodeList[fatheridx].img2);
                }
                if (that.recodeList[fatheridx].img3[0].length > 0) {
                    arrImg = arrImg.concat(that.recodeList[fatheridx].img3);
                }
                if (that.recodeList[fatheridx].img4[0].length > 0) {
                    arrImg = arrImg.concat(that.recodeList[fatheridx].img4);
                }
                if (that.recodeList[fatheridx].img5[0].length > 0) {
                    arrImg = arrImg.concat(that.recodeList[fatheridx].img5);
                }
                wx.previewImage({
                    urls: arrImg,
                    current: current
                });
            },
        };
        return _this;
    }
    //获取门店人员信息
    WebViewPage.prototype.getStoreRen = function () {
        var that = this;
        console.log('this.storeCode', this.storeCode);
        requestJSON_1.request({
            api: "cts/ctsApi.nd?",
            header: {
            // 'Content-Type': 'application/json', // 默认值
            },
            data: {
                storeCode: that.storeCode,
                serviceCode: 'getStoryPersons'
            },
            method: 'POST',
            callback: function (res) {
                console.log('门店人员信息', res);
                for (var i = 0; i < res.data.returnData.length; i++) {
                    res.data.returnData[i].tel1 = res.data.returnData[i].tel.substr(0, 3) + "*****" + res.data.returnData[i].tel.substring(res.data.returnData[i].tel.length - 4, res.data.returnData[i].tel.length);
                }
                that.storeRenList = res.data.returnData;
            }
        });
    };
    WebViewPage.prototype.onLoad = function (options) {
        console.log(options);
        this.storeCode = options.storeCode;
        wx.setNavigationBarTitle({
            title: '详情信息'
        });
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#00aaa7',
        });
        this.getRecodeList(this.pageNo, 2);
        this.getCatcs();
        this.getStoreRen();
    };
    //获取列表
    WebViewPage.prototype.getRecodeList = function (pageNo, state) {
        var that = this;
        var type = 'all';
        if (that.checked) {
            type = 'self';
        }
        if (state == 3) {
            that.loading = true;
        }
        requestJSON_1.request({
            api: "cts/ctsApi.nd?",
            header: {
            // 'Content-Type': 'application/json', // 默认值
            },
            data: {
                startTime: "",
                endTime: "",
                storeCode: that.storeCode,
                type: type,
                pageNo: pageNo,
                pageSize: '20',
                serviceCode: 'querySignStoreRecord',
                xjResult: this.isUnqualified ? 'F' : '' //T 巡检合格  F巡检不合格 空查询全部
            },
            method: 'POST',
            callback: function (res) {
                that.loading = false;
                that.setData({ loading: false });
                console.log('dierb', res);
                if (res.data.returnCode == 173) {
                    for (var i = 0; i < res.data.returnData.record.length; i++) {
                        res.data.returnData.record[i].img1 = res.data.returnData.record[i].img1.split(',');
                        res.data.returnData.record[i].img2 = res.data.returnData.record[i].img2.split(',');
                        res.data.returnData.record[i].img3 = res.data.returnData.record[i].img3.split(',');
                        res.data.returnData.record[i].img4 = res.data.returnData.record[i].img4.split(',');
                        res.data.returnData.record[i].img5 = res.data.returnData.record[i].img5.split(',');
                    }
                    if (state == 1 || state == 3) { //不追加，不分页
                        that.recodeList = res.data.returnData.record;
                    }
                    else {
                        that.recodeList = that.recodeList.concat(res.data.returnData.record);
                    }
                    that.setData({ recodeList: that.recodeList });
                }
                console.log(res.data.returnData.record);
            }
        });
    };
    //获取打卡次数
    WebViewPage.prototype.getCatcs = function () {
        var that = this;
        var that = this;
        var type = 'all';
        if (that.checked) {
            type = 'self';
        }
        requestJSON_1.request({
            api: "cts/ctsApi.nd?",
            data: {
                startTime: "",
                endTime: "",
                storeCode: that.storeCode,
                type: type,
                serviceCode: 'getSignDayAndCount',
                xjResult: this.isUnqualified ? 'F' : '' //T 巡检合格  F巡检不合格 空查询全部
            },
            method: 'POST',
            callback: function (res) {
                that.signCishu = res.data.returnData;
                that.setData({
                    signCishu: res.data.returnData
                });
                console.log('打卡次数', res.data.returnData);
            }
        });
    };
    return WebViewPage;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(WebViewPage , 'pages/terminal/punchList/index'));

