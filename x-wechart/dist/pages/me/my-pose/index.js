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
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var consultation_1 = require('./../../../store/actions/consultation.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var consultation_2 = require('./../../../store/types/consultation.js');
var validators_1 = require('./../../../utils/validators.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var defaultctQuestion = {
    questionType: {
        code: '',
        name: '请选择'
    },
    salesOrg: {
        code: '',
        name: '请选择'
    },
    materialCode: {
        code: '',
        name: '请选择'
    }
};
var DistributorOrder = /** @class */ (function (_super) {
    __extends(DistributorOrder, _super);
    function DistributorOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '我要提问',
            usingComponents: {
                'van-popup': '../../../components/vant/popup/index',
                "van-toast": "../../../components/vant/toast/index"
            },
        };
        _this.watch = {};
        // 声明
        _this.data = {
            orgId: '',
            ctQuestion: {
                questionType: {
                    code: '',
                    name: '请选择'
                },
                salesOrg: {
                    code: '',
                    name: '请选择'
                },
                materialCode: {
                    code: '',
                    name: '请选择'
                }
            },
            form: {
                questionType: '',
                organization: '',
                title: '',
                question: '',
                name: '',
                phone: '',
                department: '',
                email: '',
                account: '',
                materialGroupCode: ''
            },
            popList: [],
            popTitle: '',
            display: false,
            popVisible: false,
            popFiledName: '',
            compareInfo: {},
            color: 1
        };
        _this.watch = {
            form: function () {
                if ((this.form.materialGroupCode && this.form.organization && this.form.questionType && this.form.phone && this.form.department && this.form.name && this.form.title && this.form.question) != "" && (this.ctQuestion.questionType.name && this.ctQuestion.salesOrg.name && this.ctQuestion.materialCode.name) != "请选择") {
                    this.color = 2;
                }
                else {
                    this.color = 1;
                }
            }
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 应该获取那个值给popList   应该对比那个字段为选中信息
            openChoose: function (propName, questionType, name) {
                var list = _this[propName];
                if (!list) {
                    list = _this.commitQuestion[propName];
                }
                if (list.length === 0) {
                    return;
                }
                _this.popList = list;
                _this.compareInfo = _this.data.ctQuestion[questionType];
                _this.popFiledName = questionType;
                _this.popTitle = name;
                _this.popVisible = true;
            },
            openChooseMa: function () {
                _this.display = true;
            },
            onClose: function () {
                _this.popVisible = false;
            },
            onChooseMa: function (_a) {
                var currentTarget = _a.currentTarget;
                var dataset = currentTarget.dataset;
                var index = dataset.index;
                _this.data.ctQuestion["materialCode"] = _this.materialCode[index];
                _this.display = false;
                _this.form.materialGroupCode = _this.materialCode[index].code;
            },
            onCloseMa: function () {
                _this.display = false;
            },
            onChoose: function (_a) {
                var currentTarget = _a.currentTarget;
                var dataset = currentTarget.dataset;
                var index = dataset.index;
                var _b = _this.data, popFiledName = _b.popFiledName, popList = _b.popList;
                var oldordcode = _this.data.ctQuestion.salesOrg.code;
                _this.data.ctQuestion[popFiledName] = popList[index];
                // console.log( this.data.ccommitQuestion.questionType)
                _this.popVisible = false;
                _this.data.orgId = _this.data.ctQuestion.salesOrg.code;
                if (popFiledName == 'questionType') {
                    _this.form.questionType = popList[index].code;
                }
                if (popFiledName == 'salesOrg') {
                    _this.form.organization = popList[index].code;
                    if (popList[index].code != oldordcode && oldordcode != '') {
                        _this.data.ctQuestion.materialCode.name = "请选择";
                        _this.data.ctQuestion.materialCode.code = "";
                        _this.form.materialCode = "";
                    }
                    _this.getMaterialCode();
                }
            },
            onNameChange: function (_a) {
                var detail = _a.detail;
                this.form.name = detail.value;
            },
            onPhoneChange: function (_a) {
                var detail = _a.detail;
                this.form.phone = detail.value;
            },
            onDepChange: function (_a) {
                var detail = _a.detail;
                this.form.department = detail.value;
            },
            onEmailChange: function (_a) {
                var detail = _a.detail;
                this.form.email = detail.value;
            },
            onTitleChange: function (_a) {
                var detail = _a.detail;
                this.form.title = detail.value;
            },
            onDescChange: function (_a) {
                var detail = _a.detail;
                this.form.question = detail.value;
            },
            onBtnChange: function () {
                var _this = this;
                if (!this.form.name) {
                    toast_1.default.fail('请输入您的姓名~');
                    return;
                }
                if (this.form.name.length < 2 || this.form.name.length > 16) {
                    toast_1.default.fail('姓名长度为2~16');
                    return;
                }
                if (!this.form.phone) {
                    toast_1.default.fail('请输入您的电话~');
                    return;
                }
                var mobileReg = /^1\d{10}$/;
                var telReg = /^\d{3,4}-?\d{7,9}$/;
                if (!mobileReg.test(this.form.phone) && !telReg.test(this.form.phone)) {
                    toast_1.default.fail('请填写正确的电话号码~');
                    return;
                }
                if (!this.form.email) {
                    toast_1.default.fail('请填写您的邮箱~');
                    return;
                }
                if (this.form.email && !validators_1.checkEmail(this.form.email)) {
                    toast_1.default.fail('请填写正确的邮箱~');
                    return;
                }
                if (this.form.question == "") {
                    toast_1.default.fail('请填写您的问题描述~');
                    return;
                }
                if (this.form.title == "") {
                    toast_1.default.fail('请填写您的问题标题~');
                    return;
                }
                if (this.form.department == "") {
                    toast_1.default.fail('请填写您所属部门~');
                    return;
                }
                if (this.form.questionType == "") {
                    toast_1.default.fail('请选择问题分类~');
                    return;
                }
                if (this.form.organization == "") {
                    toast_1.default.fail('请选择供应商~');
                    return;
                }
                if (this.form.materialGroupCode == "") {
                    toast_1.default.fail('请选择物料组~');
                    return;
                }
                toast_1.default.loading({
                    message: '提交中....',
                    duration: 0,
                });
                this.methods.postMineQuestion(this.form).then(function (res) {
                    if (res.payload.indexOf('success') != -1) {
                        toast_1.default.success('提交成功');
                        wepy_redux_1.getStore().dispatch({ type: consultation_2.RS_CONSULT_LIST, payload: [] });
                        var emptyct = ramda_1.clone(defaultctQuestion);
                        _this.ctQuestion = emptyct;
                        _this.form = __assign({}, _this.form, { questionType: '', organization: '', title: '', question: '', materialGroupCode: '' });
                        _this.$apply();
                        setTimeout(function () {
                            wx.navigateTo({
                                url: "/pages/me/my-consultation/list/index",
                            });
                        }, 2000);
                    }
                    else {
                        toast_1.default.fail(res.payload || '提交失败');
                    }
                });
            }
        };
        return _this;
    }
    DistributorOrder.prototype.getcommitQuestion = function () {
        var _this = this;
        this.methods.getcommitQuestion().then(function (res) {
            _this.form.account = res.payload.account;
            _this.form.dept = res.payload.dept;
            _this.form.email = res.payload.email;
            _this.form.name = res.payload.name;
            _this.form.phone = res.payload.phone;
            _this.$apply();
        });
    };
    DistributorOrder.prototype.getMaterialCode = function () {
        this.methods.getMaterialCode(this.data.orgId, Number);
    };
    DistributorOrder.prototype.onLoad = function () {
        this.getcommitQuestion();
    };
    DistributorOrder.prototype.onUnload = function () {
        wepy_redux_1.getStore().dispatch({ type: consultation_2.RS_CONSULT_LIST, payload: [] });
    };
    DistributorOrder = __decorate([
        wepy_redux_1.connect({
            commitQuestion: function (_a) {
                var consultation = _a.consultation;
                return consultation.commitQuestion;
            },
            materialCode: function (_a) {
                var consultation = _a.consultation;
                return consultation.materialCode;
            }
        }, {
            // getBaseData,
            postMineQuestion: consultation_1.postMineQuestion,
            getcommitQuestion: consultation_1.getcommitQuestion,
            getMaterialCode: consultation_1.getMaterialCode
        })
    ], DistributorOrder);
    return DistributorOrder;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(DistributorOrder , 'pages/me/my-pose/index'));

