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
var toast_1 = require('./../../../components/vant/toast/toast.js');
var order_1 = require('./../../../store/actions/order.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var index_1 = require('./../../../utils/index.js');
var IntendedUsersOrder = /** @class */ (function (_super) {
    __extends(IntendedUsersOrder, _super);
    function IntendedUsersOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '编辑基本信息',
            usingComponents: {
                "van-popup": "/components/vant/popup/index",
                "van-toast": "/components/vant/toast/index",
                "van-icon": "/components/vant/icon/index",
                "van-field": "/components/vant/field/index",
                "van-dialog": "/components/vant/dialog/index",
                "tile-radio": "/components/tile-radio/index",
                "entry-label": "/components/user-operation/entry-label/index",
                "entry-source": "/components/user-operation/entry-source/index",
            },
        };
        _this.data = {
            baseFormData: {
                customerName: '',
                customerPhone: '',
                gender: {
                    id: '1',
                    name: '男'
                },
                addWeChat: {
                    id: '1',
                    name: '未加'
                },
                source: {
                    id: '',
                    name: ''
                },
                tag: {
                    id: [],
                    name: []
                },
                follower: {
                    id: '',
                    name: ''
                },
                remark: '',
            },
            popList: [],
            popIndex: '-1',
            popTitle: '',
            popVisible: false,
            popFiledKey: '',
            compareInfo: {},
            genderOption: [
                { id: '1', name: '男士' },
                { id: '2', name: '女士' },
            ],
            addWeChatOption: [
                { id: '0', name: '未加' },
                { id: '1', name: '已加' },
            ],
            tagOption: [],
            sourceOption: [],
            followerOption: [],
            custInfoId: '',
            detailId: '',
        };
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
                _this.compareInfo = _this.baseFormData[_this.popFiledKey];
                _this.popVisible = true;
            },
            onClose: function () {
                _this.popVisible = false;
            },
            onChoose: function (_a) {
                var currentTarget = _a.currentTarget;
                var index = currentTarget.dataset.index;
                var _b = _this.data, popFiledKey = _b.popFiledKey, popList = _b.popList, popIndex = _b.popIndex;
                _this.baseFormData[popFiledKey] = popList[index];
                _this.popVisible = false;
                if (popFiledKey === 'store') {
                    var storeId = popList[index].id;
                    _this.methods.getStoreMaterial(storeId);
                }
            },
            // 基本信息表单输入框改变
            onBaseFieldChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail, currentTarget = _a.currentTarget;
                var key = currentTarget.dataset.key;
                _this.baseFormData[key] = detail.trim();
                _this.$apply();
            }),
            // 自定义单选改变
            onRadioChange: function (event) {
                var detail = event.detail;
                var key = event.currentTarget.dataset.key;
                this.baseFormData[key] = detail;
                this.$apply();
            },
            // 选择用户来源
            onSourceChange: function (param) {
                var _a = param.detail, option = _a.option, index = _a.index;
                this.baseFormData.source = option;
                this.$apply();
            },
            // 保存用户来源
            saveSourcePop: function (param) {
                var _this = this;
                var _a = param.detail, name = _a.name, popActiveItem = _a.popActiveItem;
                if (name === '') {
                    this.baseFormData.source = popActiveItem;
                    return;
                }
                this.methods.saveSourceInfo({
                    custInfoId: this.custInfoId,
                    type: 2,
                    source: name,
                    remark: '',
                }).then(function (res) {
                    var _a = res.payload, code = _a.code, data = _a.data, msg = _a.msg;
                    if (code == 0) {
                        var currSource = {
                            id: data,
                            name: name,
                        };
                        _this.sourceOption.push(currSource);
                        _this.baseFormData.source = currSource;
                    }
                    else {
                        toast_1.default.fail(msg);
                    }
                    _this.$apply();
                });
            },
            // 选择用户标签
            onTagChange: function (param) {
                var _a = param.detail, option = _a.option, index = _a.index;
                this.tagOption[index].active = !this.tagOption[index].active;
                var ids = [];
                var names = [];
                this.tagOption.forEach(function (item) {
                    if (item.active) {
                        ids.push(item.id);
                        names.push(item.name);
                    }
                });
                this.baseFormData.tag.id = ids;
                this.baseFormData.tag.name = names;
                this.$apply();
            },
            // 保存新增标签
            saveTagPop: function (param) {
                var _this = this;
                var _a = param.detail, tagName = _a.tagName, tagDesc = _a.tagDesc, popOptions = _a.popOptions;
                this.tagOption = popOptions;
                this.baseFormData.tag.id = [];
                this.baseFormData.tag.name = [];
                this.tagOption.forEach(function (item) {
                    if (item.active) {
                        _this.baseFormData.tag.id.push(item.id);
                        _this.baseFormData.tag.name.push(item.name);
                    }
                });
                if (tagName === '') {
                    return;
                }
                this.methods.saveLabelInfo({
                    custInfoId: this.custInfoId,
                    type: 2,
                    label: tagName,
                    remark: tagDesc,
                }).then(function (res) {
                    var _a = res.payload, code = _a.code, data = _a.data, msg = _a.msg;
                    if (code == 0) {
                        _this.tagOption.push({
                            id: data,
                            name: tagName,
                            active: true,
                        });
                        _this.baseFormData.tag.id.push(data);
                        _this.baseFormData.tag.name.push(tagName);
                    }
                    else {
                        toast_1.default.fail(msg);
                    }
                    _this.$apply();
                });
            },
            // 提交
            submit: function () {
                var _a = _this.data.baseFormData, customerName = _a.customerName, customerPhone = _a.customerPhone, gender = _a.gender, addWeChat = _a.addWeChat, source = _a.source, tag = _a.tag, follower = _a.follower, remark = _a.remark;
                var that = _this;
                if (that.methods.checkParam()) {
                    var param = {
                        id: _this.detailId,
                        custInfoId: _this.custInfoId,
                        userName: customerName,
                        phone: customerPhone,
                        wechat: addWeChat.id,
                        gender: gender.id,
                        sourceId: source.id,
                        labelList: tag.id,
                        followPeople: follower.id,
                        remark: remark,
                    };
                    _this.methods.updateShopPotentialUser(param).then(function (res) {
                        var _a = res.payload, type = _a.type, text = _a.text, msg = _a.msg;
                        if (type === 'success') {
                            toast_1.default.success({
                                forbidClick: true,
                                duration: 1000,
                                message: text,
                                onClose: function () {
                                    var pages = getCurrentPages(); // 当前页面
                                    var beforePage = pages[pages.length - 2]; // 前一个页面
                                    // beforePage.data.tabBarActive = 'XXZL'
                                    var id = beforePage.data.detailId;
                                    beforePage.onLoad({ id: id, tabBarActive: 'XXZL' }); // 执行前一个页面的方法
                                    wx.navigateBack({
                                        delta: 1,
                                    });
                                    _this.$apply();
                                },
                            });
                        }
                        else {
                            toast_1.default.fail(msg);
                        }
                    });
                }
            },
            checkParam: function () {
                var customerPhone = _this.data.baseFormData.customerPhone;
                if (customerPhone === '') {
                    toast_1.default.fail('请填写手机号');
                    return false;
                }
                if (!index_1.checkTel(customerPhone)) {
                    toast_1.default.fail('请填写正确手机号');
                    return false;
                }
                return true;
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 获取标签列表、用户来源列表
    IntendedUsersOrder.prototype.findLabelListInfo = function () {
        var _this = this;
        var param = {
            custInfoId: this.custInfoId // 商家id
        };
        this.methods.findLabelList(param).then(function (res) {
            if (res && res.payload && res.payload.data) {
                _this.tagOption = res.payload.data.map(function (item) {
                    item.id = item.id;
                    item.name = item.label;
                    item.active = item.false;
                    if (_this.baseFormData.tag.id.indexOf(item.id) > -1) {
                        item.active = true;
                    }
                    return item;
                });
            }
            _this.$apply();
        });
        this.methods.findSourceList(param).then(function (res) {
            if (res && res.payload && res.payload.data) {
                _this.sourceOption = res.payload.data.map(function (item) {
                    return __assign({}, item, { id: item.id, name: item.source });
                });
            }
            _this.$apply();
        });
    };
    // 获取跟进人列表
    IntendedUsersOrder.prototype.getFollowPeopleListInfo = function () {
        var _this = this;
        var param = {
            shopInfoId: this.details.shopInfoId // 门店id
        };
        this.methods.getFollowPeopleList(param).then(function (res) {
            var list = res.payload.list;
            if (list) {
                _this.followerOption = list.map(function (item) {
                    item.id = item.code;
                    return item;
                });
            }
            _this.$apply();
        });
    };
    // 获取意向用户详情
    IntendedUsersOrder.prototype.getShopPotentialUserDetailInfo = function () {
        var _this = this;
        this.methods.getShopPotentialUserDetail({
            userId: this.detailId
        }).then(function (res) {
            var data = res.payload.data;
            _this.details = data;
            _this.baseFormData.customerName = data.userName; // 用户姓名*
            _this.baseFormData.customerPhone = data.phone; // 手机号*
            _this.baseFormData.gender.id = data.gender;
            _this.baseFormData.gender.name = data.genderName; // 用户性别
            _this.baseFormData.addWeChat.id = data.wechat;
            _this.baseFormData.addWeChat.name = data.wechat === '0' ? '未加' : data.wechat === '1' ? '已加' : ''; // 是否添加微信
            _this.baseFormData.source.id = data.sourceId;
            _this.baseFormData.source.name = data.sourceName; // 用户来源
            var tagNameArr = [];
            if (data.label) {
                tagNameArr = data.label.split(',');
            }
            _this.baseFormData.tag.id = data.labelList || [];
            _this.baseFormData.tag.name = tagNameArr; // 用户标签
            _this.baseFormData.follower.id = data.followPeople;
            _this.baseFormData.follower.name = data.followPeopleName; // 变更跟进人
            _this.baseFormData.remark = data.remark; // 备注
            _this.findLabelListInfo();
            _this.getFollowPeopleListInfo();
            _this.$apply();
        });
    };
    IntendedUsersOrder.prototype.onLoad = function (_a) {
        var id = _a.id;
        var customer = JSON.parse(wx.getStorageSync('b2b_token')).customer;
        this.custInfoId = customer && customer.id;
        this.detailId = id;
        this.getShopPotentialUserDetailInfo();
    };
    IntendedUsersOrder = __decorate([
        wepy_redux_1.connect({}, {
            findLabelList: order_1.findLabelList,
            saveLabelInfo: order_1.saveLabelInfo,
            findSourceList: order_1.findSourceList,
            saveSourceInfo: order_1.saveSourceInfo,
            updateShopPotentialUser: order_1.updateShopPotentialUser,
            getShopPotentialUserDetail: order_1.getShopPotentialUserDetail,
            getFollowPeopleList: order_1.getFollowPeopleList,
        })
    ], IntendedUsersOrder);
    return IntendedUsersOrder;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(IntendedUsersOrder , 'pages/operation/edit-base-info/index'));

