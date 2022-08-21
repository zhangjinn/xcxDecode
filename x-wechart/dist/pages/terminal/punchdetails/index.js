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
var requestJSON_1 = require('./../../../utils/requestJSON.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../utils/index.js');
var index_2 = require('./../../../utils/index.js');
var index_3 = require('./../../../components/empty-data-type/index.js');
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
            navigationBarTitleText: '打卡列表',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                // 'van-field': '../../../components/vant/field/index',
                // 'van-button': '../../../components/vant/button/index',
                // 'van-action-sheet': '../../../components/vant/action-sheet/index',
                // 'van-dialog': '../../../components/vant/dialog/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                "van-loading": "../../../components/vant/loading/index",
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {} };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_3.default,
        };
        _this.data = {
            previousDayDate: '',
            recodeList: [],
            pageNo: '1',
            signCishu: {},
            // show:false,
            show1: false,
            // show2:true,
            date: '开始时间',
            date1: '结束时间',
            today: 3,
            nowDayOfWeek: '',
            nowDay: '',
            nowMonth: '',
            nowYear: '',
            startTime: '',
            endTime: '',
            nowTime: '',
            weekStar: '',
            weekEnd: '',
            monthStart: '',
            monthEnd: '',
            nowDate: '',
            type: 'all',
            purchaseVisable: false,
            currentYear: '',
            currentMonth: '',
            dateOption: [],
            channelVisable: false,
            channelOption: [
                {
                    id: '14169732978',
                    name: '自有渠道',
                },
                {
                    id: '1',
                    name: '下沉门店',
                },
            ],
            commitParam: {
                month: "",
                channel: "14169732978",
                channelName: "自有渠道",
                isSinkChannel: "1",
                latitude: '',
                longitude: '',
            },
            statisticsList: {
                checkIn: '',
                shouldCheckIn: '',
                ratio: '',
                noCheckList: [],
            },
            isCheckNotClockIn: false,
            isQualified: false,
            canvasInfo: {
                width: 170,
                height: 90,
                lineWidth: 12,
                lineColorBig: '#1890FF',
                lineColorSmall: '#18D1BC',
            },
            canvasImg: '',
            imgObj: {
                'punchDetailsStore': 'http://3s-static.hisense.com/wechat/1/14722429883/1636445862765_3f2045e1364045b98327e3f445998e34.png',
                'checkInRecord': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993518586_ac57f37684044fbf8298b0fe29c9e368.png',
            },
        };
        _this.methods = {
            // 跳转到新增打卡
            viewDetail: function (item) {
                if (item) {
                    var url = "/pages/terminal/addrecord/index?fullName=" + item.shopFullName + "&distance=" + item.distance + "&shAddress=" + item.shAddress + "\n        &longitude=" + item.longitude + "&latitude=" + item.latitude + "&shopId=" + item.shopId + "&shopCisCode=" + item.shopCisCode + "}&isSpecialShop=" + item.isSpecialShop + "\n        &provinceId=" + item.provinceId + "&provinceName=" + item.provinceName + "&cityId=" + item.cityId + "&cityName=" + item.cityName + "}\n        &countyId=" + item.countyId + "&countyName=" + item.countyName + "&townId=" + item.townId + "&townName=" + item.townName + "}";
                    wx.navigateTo({
                        url: url
                    });
                }
            },
            // 改变是否仅看自己按钮状态
            changeType: function (e) {
                //   this.type=this.type==='all'?'self':'all';
                _this.type = e;
                _this.recodeList = [];
                _this.pageNo = 1;
                _this.getRecodeList(_this.pageNo, 1);
                _this.getCatcs();
            },
            // 改变未打卡选中按钮状态
            changeClockInType: function () {
                this.isCheckNotClockIn = !this.isCheckNotClockIn;
            },
            changeIsQualified: function () {
                this.isQualified = !this.isQualified;
                this.recodeList = [];
                this.pageNo = 1;
                this.getRecodeList(this.pageNo, 1);
                this.getCatcs();
            },
            //下拉
            tolower: function () {
                this.pageNo = this.pageNo + 1;
                this.getRecodeList(this.pageNo);
            },
            //上拉刷新
            upper: function () {
                this.pageNo = 1;
                this.getRecodeList(this.pageNo, 1);
            },
            //时间弹出框
            onClose1: function () {
                this.show1 = false;
            },
            onOpen1: function () {
                this.show1 = true;
            },
            // // 日期
            bindDateChange: function (e) {
                console.log('picker发送选择改变，携带值为', e);
                this.startTime = e.detail.value;
                this.setData({
                    startTime: e.detail.value
                });
            },
            bindDateChange1: function (e) {
                console.log('picker发送选择改变，携带值为', e.detail.value);
                this.endTime = e.detail.value;
                this.setData({
                    endTime: e.detail.value
                });
            },
            //切换日期
            taggleQiehuan: function (e) {
                if (e.currentTarget.dataset.id == 1) {
                    this.startTime = this.nowDate;
                    this.endTime = this.nowDate;
                }
                if (e.currentTarget.dataset.id == 2) {
                    this.getWeekStartDate();
                    this.getWeekEndDate();
                    this.startTime = this.weekStar;
                    this.endTime = this.weekEnd;
                }
                if (e.currentTarget.dataset.id == 3) {
                    this.getMonthStartDate();
                    this.getMonthEndDate();
                    this.startTime = this.monthStart;
                    this.endTime = this.monthEnd;
                }
                this.today = e.currentTarget.dataset.id;
                this.setData({
                    today: e.currentTarget.dataset.id
                });
            },
            // 统计数据---时间弹框显示
            handleDateTime: function () {
                this.purchaseVisable = true;
            },
            // 统计数据---修改时间
            oMonthchange: function (month) {
                this.commitParam.month = month;
                this.purchaseVisable = false;
                this.getStatistics();
                //打卡列表数据
                this.pageNo = 1;
                this.getRecodeList(this.pageNo, 1);
                this.getCatcs();
            },
            handleCancleDatePop: function () {
                this.purchaseVisable = false;
            },
            // 统计数据---渠道弹框显示
            handleChannel: function () {
                this.channelVisable = true;
            },
            // 统计数据---修改渠道
            oChannelchange: function (item) {
                this.commitParam.channel = item.id;
                this.commitParam.channelName = item.name;
                this.channelVisable = false;
                //获取统计数据
                this.getStatistics();
                //获取未打卡数据
                this.getNoClickList();
                //打卡列表数据
                this.pageNo = 1;
                this.getRecodeList(this.pageNo, 1);
                this.getCatcs();
            },
            handleCancleChannelPop: function () {
                this.channelVisable = false;
            }
        };
        return _this;
    }
    // canvas半圆形进度条
    WebViewPage.prototype.progress = function (val, totleVal) {
        //总弧线从0*PI画到1*PI == 180度
        // 分数所对应的度数 100分 == 180度
        var left = val * (180 / totleVal);
        // 分数对应弧度（结束点）
        var left_end = 2 - (0.5 / 90) * left;
        if (left_end == 2) {
            left_end = 0;
        }
        var ctx = wx.createCanvasContext('myCanvas');
        ctx.clearRect(0, 0, this.canvasInfo.width, this.canvasInfo.height);
        // 画圆环
        ctx.beginPath();
        ctx.arc(this.canvasInfo.width / 2, this.canvasInfo.width / 2 - this.canvasInfo.lineWidth / 2, this.canvasInfo.width / 2 - this.canvasInfo.lineWidth, 0 * Math.PI, 1 * Math.PI, true);
        ctx.setStrokeStyle(this.canvasInfo.lineColorBig); // 弧线的颜色
        ctx.setLineWidth(this.canvasInfo.lineWidth); // 弧的宽度
        ctx.setLineCap("round"); //线条结束端点样式 butt 平直 round 圆形 square 正方形
        ctx.stroke();
        // 画进度条,兼容安卓手机，为0直接不渲染
        if (left_end != 0) {
            ctx.beginPath();
            ctx.arc(this.canvasInfo.width / 2, this.canvasInfo.width / 2 - this.canvasInfo.lineWidth / 2, this.canvasInfo.width / 2 - this.canvasInfo.lineWidth * 2 - 6, 0 * Math.PI, left_end * Math.PI, true);
            ctx.setStrokeStyle(this.canvasInfo.lineColorSmall);
            ctx.setLineWidth(this.canvasInfo.lineWidth);
            ctx.setLineCap("round");
            ctx.stroke();
        }
        //画圆环里的实心圆
        ctx.beginPath();
        ctx.arc(this.canvasInfo.width - this.canvasInfo.lineWidth, this.canvasInfo.width / 2 - this.canvasInfo.lineWidth, this.canvasInfo.lineWidth / 2 - 2, 0, 360, false);
        ctx.fillStyle = "#fff"; //填充颜色,默认是黑色
        ctx.fill(); //画实心圆
        ctx.closePath();
        //画进度条里的实心圆
        ctx.beginPath();
        ctx.arc(this.canvasInfo.width - this.canvasInfo.lineWidth * 2 - 6, this.canvasInfo.width / 2 - this.canvasInfo.lineWidth, this.canvasInfo.lineWidth / 2 - 2, 0, 360, false);
        ctx.fillStyle = "#fff"; //填充颜色,默认是黑色
        ctx.fill(); //画实心圆
        ctx.closePath();
        ctx.draw();
        // 将canvas转换成图片
        var that = this;
        setTimeout(function () {
            wx.canvasToTempFilePath({
                width: that.canvasInfo.width,
                height: that.canvasInfo.height,
                canvasId: 'myCanvas',
                success: function (res) {
                    var tempFilePath = res.tempFilePath;
                    that.canvasImg = tempFilePath;
                },
                fail: function (res) {
                    console.log(res);
                }
            }, that);
        }, 500);
        this.$apply();
    };
    // 获取打卡记录统计数据
    WebViewPage.prototype.getStatistics = function () {
        var _this = this;
        var channel = '';
        var isSinkChannel = '0'; // 0不是下沉门店，1是下沉门店
        if (this.commitParam.channel == '14169732978') {
            channel = this.commitParam.channel;
        }
        else {
            isSinkChannel = this.commitParam.isSinkChannel;
        }
        toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
        requestJSON_1.request({
            api: "report/checkInSituation.nd",
            header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
            data: {
                month: "" + this.currentYear + this.commitParam.month,
                channel: channel,
                isSinkChannel: isSinkChannel,
                latitude: this.commitParam.latitude,
                longitude: this.commitParam.longitude,
            },
            method: 'POST',
            callback: function (res) {
                var data = res.data;
                if (data) {
                    toast_1.default.clear();
                    _this.statisticsList.checkIn = data.checkIn;
                    _this.statisticsList.shouldCheckIn = data.shouldCheckIn;
                    _this.statisticsList.ratio = data.ratio;
                    //   this.statisticsList.noCheckList = data.noCheckList
                    var newRatio = data.ratio.indexOf("-");
                    if (newRatio != -1) {
                        _this.statisticsList.ratio = '0.00%';
                    }
                }
                _this.progress(_this.statisticsList.checkIn, _this.statisticsList.shouldCheckIn);
                _this.$apply();
            }
        });
    };
    // 获取未打卡列表数据
    WebViewPage.prototype.getNoClickList = function () {
        var _this = this;
        var channel = '';
        var isSinkChannel = '0'; // 0不是下沉门店，1是下沉门店
        if (this.commitParam.channel == '14169732978') {
            channel = this.commitParam.channel;
        }
        else {
            isSinkChannel = this.commitParam.isSinkChannel;
        }
        toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
        requestJSON_1.request({
            api: "report/checkInSituation.nd",
            header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
            data: {
                //未打卡记录只查本月
                month: "" + new Date().getFullYear() + (new Date().getMonth() + 1 < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1)),
                // month: `202108`,
                channel: channel,
                isSinkChannel: isSinkChannel,
                latitude: this.commitParam.latitude,
                longitude: this.commitParam.longitude,
            },
            method: 'POST',
            callback: function (res) {
                var data = res.data;
                if (data) {
                    toast_1.default.clear();
                    _this.statisticsList.noCheckList = data.noCheckList;
                }
                _this.$apply();
            }
        });
    };
    //获取当前地理位置
    WebViewPage.prototype.getLocation = function () {
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                that.commitParam.latitude = res.latitude;
                that.commitParam.longitude = res.longitude;
                //获取统计数据
                that.getStatistics();
                //获取未打卡数据
                that.getNoClickList();
                that.$apply();
            }
        });
    };
    // 打卡记录统计数据--获取日期
    WebViewPage.prototype.getDate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now, i, j, month;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        this.currentYear = now.getFullYear();
                        //初始化月
                        for (i = 1; i <= 12; i++) {
                            j = i < 10 ? '0' + i : i;
                            this.dateOption.push({
                                month: j
                            });
                        }
                        month = now.getMonth() + 1;
                        month = month < 10 ? '0' + month : month;
                        this.commitParam.month = month;
                        this.currentMonth = month;
                        return [4 /*yield*/, this.getLocation()];
                    case 1:
                        _a.sent();
                        this.$apply();
                        return [2 /*return*/];
                }
            });
        });
    };
    //关闭弹框
    WebViewPage.prototype.closeTank = function () {
        this.recodeList = [];
        this.pageNo = 1;
        this.getRecodeList(this.pageNo, 1);
        this.getCatcs();
        this.show1 = false;
        if (this.startTime == this.weekStar && this.endTime == this.weekEnd) {
            this.date = '本周';
            this.setData({
                date: '本周'
            });
        }
        else if (this.startTime == this.monthStart && this.endTime == this.monthEnd) {
            this.date = '本月';
            this.setData({
                date: '本月'
            });
        }
        else if (this.startTime == this.nowDate && this.endTime == this.nowDate) {
            this.date = '今天';
            this.setData({
                date: '今天'
            });
        }
        else {
            var date = this.startTime + '~' + this.endTime;
            this.date = date;
            this.setData({
                date: date
            });
        }
        this.setData({
            show1: false
        });
    };
    //获得本周的开始日期
    WebViewPage.prototype.getWeekStartDate = function () {
        var that = this;
        var weekStartDate = new Date(that.nowYear, that.nowMonth, that.nowDay - that.nowDayOfWeek);
        this.date = '本周';
        var startTime = weekStartDate.Format('MM-dd');
        this.weekStar = that.nowYear + '-' + startTime;
    };
    //获得本周的结束日期
    WebViewPage.prototype.getWeekEndDate = function () {
        var that = this;
        var weekEndDate = new Date(that.nowYear, that.nowMonth, that.nowDay + (6 - that.nowDayOfWeek));
        var endtime = weekEndDate.Format('MM-dd');
        this.weekEnd = that.nowYear + '-' + endtime;
    };
    //获得本月的开始日期
    WebViewPage.prototype.getMonthStartDate = function () {
        var that = this;
        var monthStartDate = new Date(that.nowYear, that.nowMonth, 1);
        this.date = '本月';
        var startTime = monthStartDate.Format('MM-dd');
        this.monthStart = that.nowYear + '-' + startTime;
        this.startTime = this.monthStart;
    };
    //获得本月的结束日期
    WebViewPage.prototype.getMonthEndDate = function () {
        var that = this;
        var monthEndDate = new Date(that.nowYear, that.nowMonth, that.getMonthDays(that.nowMonth));
        var endtime = monthEndDate.Format('MM-dd');
        this.monthEnd = that.nowYear + '-' + endtime;
        this.endTime = this.monthEnd;
    };
    //获得某月的天数
    WebViewPage.prototype.getMonthDays = function (myMonth) {
        var that = this;
        var monthStartDate = new Date(that.nowYear, myMonth, 1);
        var monthEndDate = new Date(that.nowYear, myMonth + 1, 1);
        var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    };
    //浏览图片
    WebViewPage.prototype.browseImg = function (e) {
        var that = this;
        var fatheridx = e.currentTarget.dataset.fatheridx;
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
    };
    //获取打卡次数
    WebViewPage.prototype.getCatcs = function () {
        var that = this;
        requestJSON_1.request({
            api: "cts/ctsApi.nd?",
            data: {
                startTime: that.startTime,
                endTime: that.endTime,
                isSink: that.commitParam.channel == '14169732978' ? 'F' : 'T',
                storeCode: "",
                type: this.type,
                serviceCode: 'getSignDayAndCount',
                xjResult: !this.isQualified ? '' : 'F' //T 巡检合格  F巡检不合格 空查询全部
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
    //获取列表
    WebViewPage.prototype.getRecodeList = function (pageNo, type) {
        var that = this;
        if (type == 1) {
            that.loading = true;
        }
        // `${this.currentYear}${this.commitParam.month}`
        // const start = moment(`${new Date().getFullYear()}${topFilterCkd.month.val}`).startOf("month").format("YYYY-MM-DD");
        // const end = moment(`${new Date().getFullYear()}${topFilterCkd.month.val}`).endOf("month").format("YYYY-MM-DD");
        var currentTime = index_1.getTimeStamp(new Date(this.currentYear + "-" + this.commitParam.month));
        requestJSON_1.request({
            api: "cts/ctsApi.nd?",
            header: {
            // 'Content-Type': 'application/json', // 默认值
            },
            data: {
                //改造 根据头部统计上的条件 统一控制入仓
                // startTime: that.startTime,
                // endTime: that.endTime,
                //入参缺少自有渠道或下沉门店 后台待做
                startTime: new Date(currentTime.startTime).Format('yyyy-MM-dd'),
                endTime: new Date(currentTime.endTime).Format('yyyy-MM-dd'),
                storeCode: "",
                type: that.type,
                pageNo: pageNo,
                pageSize: '20',
                isSink: that.commitParam.channel == '14169732978' ? 'F' : 'T',
                serviceCode: 'querySignStoreRecord',
                xjResult: !this.isQualified ? '' : 'F' //T 巡检合格  F巡检不合格 空查询全部
            },
            method: 'POST',
            callback: function (res) {
                that.loading = false;
                that.setData({ loading: false });
                if (res.data.returnCode == 173) {
                    for (var i = 0; i < res.data.returnData.record.length; i++) {
                        res.data.returnData.record[i].img1 = res.data.returnData.record[i].img1.split(',');
                        res.data.returnData.record[i].img2 = res.data.returnData.record[i].img2.split(',');
                        res.data.returnData.record[i].img3 = res.data.returnData.record[i].img3.split(',');
                        res.data.returnData.record[i].img4 = res.data.returnData.record[i].img4.split(',');
                        res.data.returnData.record[i].img5 = res.data.returnData.record[i].img5.split(',');
                    }
                    if (type == 1) {
                        that.recodeList = res.data.returnData.record;
                    }
                    else {
                        that.recodeList = that.recodeList.concat(res.data.returnData.record);
                    }
                    that.setData({ recodeList: that.recodeList });
                }
                else {
                    wx.showToast({
                        title: res.data.returnMsg
                    });
                }
            }
        });
    };
    WebViewPage.prototype.onLoad = function () {
        var now = new Date(); //当前日期
        this.nowDayOfWeek = now.getDay(); //今天本周的第几天
        this.nowDay = now.getDate(); //当前日
        this.nowMonth = now.getMonth(); //当前月
        this.nowYear = now.getFullYear(); //当前年
        this.nowTime = now.Format('yyyy-MM-dd');
        // wx.setNavigationBarTitle({
        //   title: '打卡记录'
        // })
        // wx.setNavigationBarColor({
        //   frontColor: '#ffffff',
        //   backgroundColor: '#00aaa7',
        // })
        // this.date='今天';
        this.nowDate = now.Format('yyyy-MM-dd');
        // this.startTime=this.nowDate;
        // this.endTime=this.nowDate;
        // this.setData({
        //   date:'今天'
        // })
        this.previousDayDate = index_2.previousDay();
        this.getMonthEndDate();
        this.getMonthStartDate();
        this.getCatcs();
        this.getDate();
        this.getRecodeList(this.pageNo, 1);
    };
    return WebViewPage;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(WebViewPage , 'pages/terminal/punchdetails/index'));

