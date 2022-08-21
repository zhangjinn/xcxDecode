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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var dialog_1 = require('./../../../../components/vant/dialog/dialog.js');
var request_1 = require('./../../../../utils/request.js');
var toast_2 = require('./../../../../components/vant/toast/toast.js');
var index_1 = require('./../../../../utils/index.js');
/* import utilsWxs from '../../../../wxs/utils.wxs'; */
var balance_1 = require('./../../../../store/actions/balance.js');
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '',
            usingComponents: {
                'van-icon': '/components/vant/icon/index',
                'van-popup': '/components/vant/popup/index',
                'van-field': '/components/vant/field/index',
                'van-toast': '/components/vant/toast/index',
                'van-picker': '/components/vant/picker/index',
                'van-stepper': '/components/vant/stepper/index',
                'van-dialog': '/components/vant/dialog/index',
                'van-checkbox': '/components/vant/checkbox/index',
                'van-button': '/components/vant/button/index',
                'van-uploader': '/components/vant/uploader/index',
            },
        };
        _this.data = {
            currId: '',
            pageType: '',
            orderDetail: {},
            tableData: {
                // 表格标题
                th: ["序号", "品类", "各品类分摊比例", "扣除金额(元)"],
                // 表格内容
                td: []
            },
            formData: [{
                    examType: {
                        id: '',
                        name: ''
                    },
                    gapReduction: '',
                    reasonExplanation: '',
                    fileList: [],
                    gapAfterComplaintNum: 0,
                    actualAssessmentAmount: 0,
                }],
            appealBtnShow: false,
            popupTitle: '',
            selectIndex: 0,
            complaintReasonPopShow: false,
            complaintReasonOptions: [
                { id: '0', name: '不合作未在CIS系统冻结' },
                { id: '1', name: '重复门店' },
                { id: '2', name: '新建店未开业' },
                { id: '3', name: '其他' },
            ],
            steps: [
                {
                    text: '开始',
                    desc: '',
                    icon: 'icon-process-begins',
                    isBorder: false,
                },
                {
                    text: '商家发起',
                    desc: '',
                    icon: 'icon-merchant-initiated',
                    isBorder: true,
                },
                {
                    text: '营销中心',
                    desc: '客户发展部长',
                    icon: 'icon-development-minister',
                    isBorder: true,
                },
                {
                    text: '营销中心',
                    desc: '总经理',
                    icon: 'icon-general-manager',
                    isBorder: true,
                },
                {
                    text: '中国区营销总部',
                    desc: '客户发展部',
                    icon: 'icon-general-manager',
                    isBorder: true,
                },
                {
                    text: '结束',
                    desc: '',
                    icon: 'icon-process-end',
                    isBorder: false,
                },
            ],
            active: '0',
            imgObj: {
                'assessmentNoticeBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529577_0b7b5e76ef374c41b7db34441faf6b04.png',
                'marketMovement': 'http://3s-static.hisense.com/wechat/1/14722429883/1653961341882_b9a04fef3e704509b4900d1a1b4827cc.png',
                'networkExpansion': 'http://3s-static.hisense.com/wechat/1/14722429883/1653961371003_a305666f37ca4a89a5ea63b1368b3783.png',
                'promotionsExecution': 'http://3s-static.hisense.com/wechat/1/14722429883/1653961371137_542376c603c54530afab6ee644e97c2d.png',
                'trainingImplementation': 'http://3s-static.hisense.com/wechat/1/14722429883/1653961356509_d4a5ac29b0e6475e8403cf9212ed1194.png',
            },
            examTypeOption: [],
        };
        _this.methods = {
            // 添加申诉
            addAppeal: function () {
                this.formData.push({
                    examType: {
                        id: '',
                        name: ''
                    },
                    gapReduction: '',
                    reasonExplanation: '',
                    fileList: [],
                    gapAfterComplaintNum: 0,
                    actualAssessmentAmount: 0,
                });
            },
            // 删除申诉
            delAppeal: function (event) {
                var index = event.currentTarget.dataset.index;
                this.formData.splice(index, 1);
                this.$apply();
            },
            // 弹出弹框
            handleComplaintReasonPop: function (event) {
                var _a = event.currentTarget.dataset, title = _a.title, index = _a.index;
                this.popupTitle = title;
                this.selectIndex = index;
                this.complaintReasonPopShow = true;
            },
            // 改变考核类型
            chooseExamType: function (item) {
                var identicalItem = this.formData.filter(function (itm) { return item.id == itm.examType.id; });
                if (identicalItem.length > 0) {
                    toast_2.default.fail('每个类型只能添加一次');
                    return false;
                }
                this.formData[this.selectIndex].examType.id = item.id;
                this.formData[this.selectIndex].examType.name = item.name;
                this.formData[this.selectIndex].actualAssessCount = item.actualAssessCount; // 缺口数
                this.formData[this.selectIndex].standardPrice = item.standardPrice; // 标准单价
                this.formData[this.selectIndex].gapReduction = '';
                this.formData[this.selectIndex].gapAfterComplaintNum = '';
                this.formData[this.selectIndex].actualAssessmentAmount = '';
                this.complaintReasonPopShow = false;
                this.$apply();
            },
            // 关闭弹框
            onComplaintReasonPopClose: function () {
                this.complaintReasonPopShow = false;
            },
            // 改变申诉减免缺口
            ongapReductionChange: function (event) {
                var index = event.currentTarget.dataset.index;
                if (event.detail > this.formData[index].actualAssessCount) {
                    toast_2.default.fail('申诉减免缺口需小于缺口数');
                    this.formData[index].gapReduction = '';
                }
                else {
                    this.formData[index].gapReduction = event.detail;
                }
                // 申诉后缺口 = 缺口数 - 申诉减免缺口
                this.formData[index].gapAfterComplaintNum = this.formData[index].actualAssessCount - this.formData[index].gapReduction;
                // 实际考核金额 = 申诉后缺口 * 标准单价
                this.formData[index].actualAssessmentAmount = this.formData[index].gapAfterComplaintNum * this.formData[index].standardPrice;
                this.$apply();
            },
            // 改变原因说明
            onReasonExplanationChange: function (event) {
                var index = event.currentTarget.dataset.index;
                this.formData[index].reasonExplanation = event.detail;
            },
            // 显示申诉form表单
            handleAppeal: function () {
                this.appealBtnShow = true;
            },
            // 返回上一级
            handleCancel: function () {
                wx.navigateBack();
            },
            // 未申诉待确认》》弹出提示并返回上一级
            handleConfirm: function () {
                var that = this;
                dialog_1.default.confirm({
                    title: '考核通知单确认',
                    message: '请确定已经完成考核通知单的核对，后续将根据其明细做政策规则处罚，请知悉。',
                })
                    .then(function () {
                    that.appealFailConfirm();
                })
                    .catch(function () {
                    // on cancel
                });
            },
            // 提交申诉并返回上一页
            handleSubmitAppeal: function () {
                var checkResault = this.methods.checkParam();
                if (checkResault) {
                    var salesInfo = this.data.formData;
                    var salesInfoCommit = [];
                    salesInfoCommit = salesInfo.map(function (item) {
                        var fileIds = item.fileList.map(function (itm) {
                            return itm.id;
                        });
                        var obj = {
                            id: item.examType.id,
                            appealDecreaseCount: item.gapReduction,
                            appealReason: item.reasonExplanation,
                            appealFile: fileIds.toString(),
                        };
                        return obj;
                    });
                    var param = {
                        id: this.currId,
                        appealList: salesInfoCommit,
                        _loading: true
                    };
                    this.methods.assessmentNoticeAppealApplication(param).then(function (res) {
                        var payload = res.payload;
                        if (payload.code == 0) {
                            toast_1.default.success({
                                forbidClick: true,
                                duration: 1000,
                                message: '申诉成功',
                                onClose: function () {
                                    wx.navigateBack({
                                        delta: 1,
                                    });
                                },
                            });
                        }
                        else {
                            toast_1.default.fail(payload.msg);
                        }
                    });
                }
            },
            // 提交申诉前校验
            checkParam: function () {
                var salesInfo = _this.data.formData;
                if (salesInfo && salesInfo.length > 0) {
                    var tip = _this.isEmpty(salesInfo);
                    if (tip) {
                        toast_1.default.fail(tip);
                        return false;
                    }
                }
                else {
                    toast_1.default.fail('请先添加申诉');
                    return false;
                }
                return true;
            },
            // 未申诉取消申诉
            handleCancelAppeal: function () {
                this.appealBtnShow = false;
            },
            // 已申诉待确认
            handleAppealFailConfirm: function () {
                this.appealFailConfirm();
            },
            // 已申诉点击取消
            handleAppealFailCancel: function () {
                wx.navigateBack();
            },
            // 预览图片
            previewSqs: function (event) {
                // 拿到图片的地址url
                var _a = event.currentTarget.dataset, src = _a.src, index = _a.index;
                index = 0;
                var imgList = []; //定义一个放图片的数组
                // 循环模拟数据的数组取其中的图片字段，将其添加到imgList数组中
                var fileList = this.orderDetail.appealList[index].attaches;
                for (var i = 0; i < fileList.length; i++) {
                    imgList.push(fileList[i].url);
                }
                // 调用微信小程序预览图片的方法
                wx.previewImage({
                    current: src,
                    urls: imgList // 需要预览的图片http链接列表
                });
            },
            //删除图片
            deleteImg: function (event) {
                var index = event.currentTarget.dataset.index;
                this.formData[index].fileList.splice(event.detail.index, 1);
            },
            //上传图片
            afterRead: function (event) {
                var index = event.currentTarget.dataset.index;
                this.selImg(event.detail.file.path, index);
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    List.prototype.isEmpty = function (arr) {
        // 1、如果是市场跑动类型的通知单。申诉原因显示，申诉原因、申诉减免缺口必填；原因说明非必填
        // 2、如果不是市场跑动类型的。申诉原因不显示，申诉减免缺口必填；原因说明必填
        for (var i = 0; i < arr.length; i++) {
            if (!arr[i].examType.id) {
                return "\u7B2C" + (i + 1) + "\u6761\u5546\u5BB6\u7533\u8BC9 \u8003\u6838\u7C7B\u578B \u4E0D\u80FD\u4E3A\u7A7A";
            }
            if (!arr[i].gapReduction) {
                return "\u7B2C" + (i + 1) + "\u6761\u5546\u5BB6\u7533\u8BC9 \u7533\u8BC9\u51CF\u514D\u7F3A\u53E3 \u4E0D\u80FD\u4E3A\u7A7A";
            }
            if (!arr[i].reasonExplanation) {
                return "\u7B2C" + (i + 1) + "\u6761\u5546\u5BB6\u7533\u8BC9 \u7533\u8BC9\u539F\u56E0 \u4E0D\u80FD\u4E3A\u7A7A";
            }
        }
        return false;
    };
    //选择照片
    List.prototype.selImg = function (path, index) {
        if (!path) {
            return;
        }
        var that = this;
        var fileNameArr = path.split('/');
        var fileName = fileNameArr[fileNameArr.length - 1];
        var obj = {};
        var FSM = wx.getFileSystemManager();
        FSM.readFile({
            filePath: path,
            encoding: 'base64',
            success: function (res) {
                var data = {
                    'fileName': fileName,
                    'fileType': 'assessnotice',
                    'file': 'image/jpeg;base64,' + res.data
                };
                that.methods.uploadImg(data).then(function (res) {
                    obj.url = res.payload.url;
                    obj.id = res.payload.businessId;
                    obj.name = res.payload.fileNameString;
                    that.formData[index].fileList.push(obj);
                    that.$apply();
                });
            }
        });
    };
    // 考核通知单确认
    List.prototype.appealFailConfirm = function () {
        var id = this.currId;
        this.methods.assessmentNoticeConfirm(id).then(function (res) {
            var payload = res.payload;
            if (payload.type == 'success') {
                toast_1.default.success({
                    forbidClick: true,
                    duration: 1000,
                    message: '已确认',
                    onClose: function () {
                        wx.navigateBack({
                            delta: 1,
                        });
                    },
                });
            }
            else {
                toast_1.default.fail(payload.text);
            }
        });
    };
    // 获取订单详细信息
    List.prototype.getDetailsData = function () {
        var _this = this;
        toast_1.default.loading({
            message: '正在加载',
            duration: 2000
        });
        request_1.request({
            api: "custAssessNotice/editSum/" + this.currId + ".nd",
            method: 'GET',
            type: 'application/json',
            callback: function (res) {
                toast_1.default.clear();
                var data = res.data;
                if (data && data.data) {
                    _this.orderDetail = data.data;
                    // 待确认--ISSUED
                    // 申诉待确认--APPEALED
                    // 已确认--CONFIRMED
                    // 申诉已确认--APPEALCONFIRMED
                    // 申诉中--INAPPEAL
                    _this.pageType = _this.orderDetail.noticeStatus;
                    var title = '';
                    if (_this.pageType == 'ISSUED') {
                        title = '考核通知单处理';
                    }
                    else if (_this.pageType == 'APPEALED' || _this.pageType == 'INAPPEAL') {
                        title = '考核通知单申诉';
                    }
                    else {
                        title = '考核通知单详情';
                    }
                    wx.setNavigationBarTitle({
                        title: title
                    });
                    _this.active = _this.orderDetail.checkIndex;
                    _this.orderDetail.differenceAmtDx = _this.orderDetail.actualAssessMoney ? index_1.DX(_this.orderDetail.actualAssessMoney) : '';
                    // 表格列表
                    if (_this.orderDetail.details && _this.orderDetail.details.length > 0) {
                        _this.tableData.td = _this.orderDetail.details.map(function (item, index) {
                            return {
                                index: index,
                                shopTypeName: item.shopTypeName,
                                proportion: item.proportion,
                                deductionAmount: item.deductionAmount,
                                capitalize: item.capitalize,
                            };
                        });
                    }
                    if (_this.orderDetail.noticeList && _this.orderDetail.noticeList.length > 0) {
                        _this.examTypeOption = _this.orderDetail.noticeList.map(function (item) {
                            return __assign({}, item, { id: item.id, name: item.noticeTypeName });
                        });
                    }
                }
                _this.$apply();
            }
        });
    };
    List.prototype.onLoad = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.currId = id;
                this.getDetailsData();
                return [2 /*return*/];
            });
        });
    };
    List = __decorate([
        wepy_redux_1.connect({}, {
            assessmentNoticeAppealApplication: balance_1.assessmentNoticeAppealApplication,
            assessmentNoticeConfirm: balance_1.assessmentNoticeConfirm,
            uploadImg: balance_1.uploadImg,
        })
    ], List);
    return List;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(List , 'pages/finance/assessment-notice/detail-new/index'));

