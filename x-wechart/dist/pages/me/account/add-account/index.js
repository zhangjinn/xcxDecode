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
var ramda_1 = require('./../../../../npm/ramda/src/index.js');
var request_1 = require('./../../../../utils/request.js');
var validators_1 = require('./../../../../utils/validators.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var addAccount_1 = require('./../../../../store/actions/addAccount.js');
var AddAccount = /** @class */ (function (_super) {
    __extends(AddAccount, _super);
    function AddAccount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '新增账号',
            usingComponents: {
                'van-button': '../../../../components/vant/button/index',
                'van-cell-group': '../../../../components/vant/cell-group/index',
                'van-field': '../../../../components/vant/field/index',
                'van-toast': '../../../../components/vant/toast/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-picker': '../../../../components/vant/picker/index',
                'van-icon': '../../../../components/vant/icon/index',
                'van-cell': '../../../../components/vant/cell/index',
            },
        };
        _this.data = {
            formData: {
                userName: '',
                mobile: '',
                email: '',
                sale: '',
                saleId: '',
                postNames: [],
                postIds: [],
                matklIds: [],
                matklNames: [],
                custIds: [],
                custNames: [],
                shopCkIds: [],
                shopCkNames: [],
                shopIds: [],
                shopNames: [],
                upcomingIds: [],
                upcomingNames: [],
                noticeIds: [],
                noticeNames: [],
            },
            baseMatklVisible: false,
            custVisible: false,
            shopCkVisible: false,
            shopVisible: false,
            upcomingVisible: false,
            noticeVisible: false,
            saleListVisible: false,
            postListVisible: false,
            otherInfoIndex: 0,
            saleIndex: -1,
            saleList: [
                {
                    id: 1,
                    name: '是',
                    selected: false,
                },
                {
                    id: 0,
                    name: '否',
                    selected: false,
                },
            ],
            postIndex: -1,
            postList: [],
            matklList: [],
            custList: [],
            shopCkList: [],
            shopList: [],
            upcomingList: [],
            noticeList: [],
            shop: false,
            customer: {}
        };
        // 页面内交互写在methods里
        _this.methods = {
            onSubmitForm: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, userName, mobile, email, saleId, postIds, matklIds, custIds, shopCkIds, shopIds, upcomingIds, noticeIds, param, result;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!this.checkForm()) {
                                    return [2 /*return*/];
                                }
                                _a = this.formData, userName = _a.userName, mobile = _a.mobile, email = _a.email, saleId = _a.saleId, postIds = _a.postIds, matklIds = _a.matklIds, custIds = _a.custIds, shopCkIds = _a.shopCkIds, shopIds = _a.shopIds, upcomingIds = _a.upcomingIds, noticeIds = _a.noticeIds;
                                param = {
                                    name: userName,
                                    phone: mobile,
                                    email: email,
                                    shopIds: shopIds.toString(),
                                    businessFlag: saleId,
                                    custAccountId: this.customer.id,
                                    roleIds: custIds.toString(),
                                    matklIds: matklIds.toString(),
                                    noticeIds: noticeIds.toString(),
                                    dealIds: upcomingIds.toString(),
                                    workIds: postIds.toString(),
                                    account: this.editAccount.account,
                                    wareIds: shopCkIds.toString(),
                                };
                                return [4 /*yield*/, request_1.request({ api: '/customer/addUser.nd', method: 'POST', data: param })];
                            case 1:
                                result = _b.sent();
                                if (result.code == 0) {
                                    toast_1.default.success('新增账号成功！初始密码已经发送至您设置的用户邮箱中！');
                                    setTimeout(function () {
                                        wx.navigateBack();
                                    }, 2000);
                                }
                                else {
                                    toast_1.default.fail(result);
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            },
            inputName: function (event) {
                this.formData.userName = event.detail;
            },
            inputMobile: function (event) {
                this.formData.mobile = event.detail;
            },
            inputEmail: function (event) {
                this.formData.email = event.detail;
            },
            // 营销经理显示隐藏
            onToggleSaleListPopup: function () {
                this.saleListVisible = !this.saleListVisible;
            },
            // 营销经理选择
            onSelecteSale: function (e) {
                if (e.id == 0) {
                    this.formData.sale = e.name;
                    this.formData.saleId = e.id;
                    this.saleIndex = e.id;
                    this.saleListVisible = false;
                    return;
                }
                this.modalTip();
            },
            // 岗位显示隐藏
            onTogglePostListPopup: function () {
                this.postListVisible = !this.postListVisible;
            },
            // 岗位选择
            onSelectePost: function (selectItem) {
                if (selectItem.id == '14181287852' || selectItem.id == '14181287847' || selectItem.id == '14181287855') { // 营销经理-**
                    this.modalTip();
                }
                else if (selectItem.id == '17594638392') { // 下沉渠道专职运营经理
                    this.modalTip();
                }
                else {
                    var infoNew = ramda_1.clone(this.postList);
                    var listNew = infoNew.map(function (item) {
                        if (item.id === selectItem.id) {
                            item.selected = !item.selected;
                        }
                        return __assign({}, item);
                    });
                    this.postList = listNew;
                }
            },
            // 岗位选择确定
            onConfirmBasePostPopup: function () {
                var infoNew = ramda_1.clone(this.formData);
                var selectedList = this.postList.filter(function (item) { return item.selected; });
                infoNew.postIds = selectedList.map(function (item) { return item.id; });
                infoNew.postNames = selectedList.map(function (item) { return item.name; });
                this.formData = infoNew;
                this.postListVisible = !this.postListVisible;
            },
            // 清空岗位
            onClearPostInfo: function () {
                var infoNew = ramda_1.clone(this.formData);
                var listnew = this.postList.map(function (item) {
                    item.selected = false;
                    return __assign({}, item);
                });
                this.postList = listnew;
                infoNew.postIds = [];
                infoNew.postNames = [];
                this.formData = infoNew;
            },
            // 物料组弹框显示隐藏
            toggleBaseMaktlPopup: function () {
                this.baseMatklVisible = !this.baseMatklVisible;
            },
            // 选择物料组
            onSelectBaseMatkl: function (selectItem) {
                var infoNew = ramda_1.clone(this.matklList);
                var listNew = infoNew.map(function (item) {
                    if (item.id === selectItem.id) {
                        item.selected = !item.selected;
                    }
                    return __assign({}, item);
                });
                this.matklList = listNew;
            },
            // 选择物料组确定
            onConfirmBaseMatklPopup: function () {
                var infoNew = ramda_1.clone(this.formData);
                var selectedList = this.matklList.filter(function (item) { return item.selected; });
                infoNew.matklIds = selectedList.map(function (item) { return item.id; });
                infoNew.matklNames = selectedList.map(function (item) { return item.name; });
                this.formData = infoNew;
                this.baseMatklVisible = !this.baseMatklVisible;
            },
            // 清空物料组
            onClearMatklInfo: function () {
                var infoNew = ramda_1.clone(this.formData);
                var listnew = this.matklList.map(function (item) {
                    item.selected = false;
                    return __assign({}, item);
                });
                this.matklList = listnew;
                infoNew.matklIds = [];
                infoNew.matklNames = [];
                this.formData = infoNew;
            },
            // 角色弹框显示隐藏
            onToggleCustPopup: function () {
                this.custVisible = !this.custVisible;
            },
            // 选择角色
            onSelectCust: function (selectItem) {
                var infoNew = ramda_1.clone(this.custList);
                var listNew = infoNew.map(function (item) {
                    if (item.id === selectItem.id) {
                        item.selected = !item.selected;
                    }
                    return __assign({}, item);
                });
                this.custList = listNew;
            },
            // 选择角色确定
            onConfirmCustPopup: function () {
                var infoNew = ramda_1.clone(this.formData);
                var selectedList = this.custList.filter(function (item) { return item.selected; });
                infoNew.custIds = selectedList.map(function (item) { return item.id; });
                infoNew.custNames = selectedList.map(function (item) { return item.name; });
                this.formData = infoNew;
                this.custVisible = !this.custVisible;
            },
            // 清空角色
            onClearCustInfo: function () {
                var infoNew = ramda_1.clone(this.formData);
                var listnew = this.custList.map(function (item) {
                    item.selected = false;
                    return __assign({}, item);
                });
                this.custList = listnew;
                infoNew.custIds = [];
                infoNew.custNames = [];
                this.formData = infoNew;
            },
            // 待办弹框显示隐藏
            onToggleUpcomingPopup: function () {
                this.upcomingVisible = !this.upcomingVisible;
            },
            // 选择待办
            onSelectUpcoming: function (selectItem) {
                var infoNew = ramda_1.clone(this.upcomingList);
                var listNew = infoNew.map(function (item) {
                    if (item.id === selectItem.id) {
                        item.selected = !item.selected;
                    }
                    return __assign({}, item);
                });
                this.upcomingList = listNew;
            },
            // 选择待办确定
            onConfirmUpcomingPopup: function () {
                var infoNew = ramda_1.clone(this.formData);
                var selectedList = this.upcomingList.filter(function (item) { return item.selected; });
                infoNew.upcomingIds = selectedList.map(function (item) { return item.id; });
                infoNew.upcomingNames = selectedList.map(function (item) { return item.name; });
                this.formData = infoNew;
                this.upcomingVisible = !this.upcomingVisible;
            },
            // 清空待办
            onClearUpcomingInfo: function () {
                var infoNew = ramda_1.clone(this.formData);
                var listnew = this.upcomingList.map(function (item) {
                    item.selected = false;
                    return __assign({}, item);
                });
                this.upcomingList = listnew;
                infoNew.upcomingIds = [];
                infoNew.upcomingNames = [];
                this.formData = infoNew;
            },
            // 管理仓库弹框显示隐藏
            onToggleShopCkPopup: function () {
                this.shopCkVisible = !this.shopCkVisible;
            },
            // 选择管理仓库
            onSelectShopCk: function (selectItem) {
                var infoNew = ramda_1.clone(this.shopCkList);
                var listNew = infoNew.map(function (item) {
                    if (item.id === selectItem.id) {
                        item.selected = !item.selected;
                    }
                    return __assign({}, item);
                });
                this.shopCkList = listNew;
            },
            // 选择管理仓库确定
            onConfirmShopCkPopup: function () {
                var infoNew = ramda_1.clone(this.formData);
                var selectedList = this.shopCkList.filter(function (item) { return item.selected; });
                infoNew.shopCkIds = selectedList.map(function (item) { return item.id; });
                infoNew.shopCkNames = selectedList.map(function (item) { return item.name; });
                this.formData = infoNew;
                this.shopCkVisible = !this.shopCkVisible;
            },
            // 清空管理仓库
            onClearShopCkInfo: function () {
                var infoNew = ramda_1.clone(this.formData);
                var listnew = this.shopCkList.map(function (item) {
                    item.selected = false;
                    return __assign({}, item);
                });
                this.shopCkList = listnew;
                infoNew.shopCkIds = [];
                infoNew.shopCkNames = [];
                this.formData = infoNew;
            },
            // 管辖门店弹框显示隐藏
            onToggleShopPopup: function () {
                this.shopVisible = !this.shopVisible;
            },
            // 选择管辖门店
            onSelectShop: function (selectItem) {
                var infoNew = ramda_1.clone(this.shopList);
                var listNew = infoNew.map(function (item) {
                    if (item.id === selectItem.id) {
                        item.selected = !item.selected;
                    }
                    return __assign({}, item);
                });
                this.shopList = listNew;
            },
            // 选择管辖门店确定
            onConfirmShopPopup: function () {
                var infoNew = ramda_1.clone(this.formData);
                var selectedList = this.shopList.filter(function (item) { return item.selected; });
                infoNew.shopIds = selectedList.map(function (item) { return item.id; });
                infoNew.shopNames = selectedList.map(function (item) { return item.name; });
                this.formData = infoNew;
                this.shopVisible = !this.shopVisible;
            },
            // 清空管辖门店
            onClearShopInfo: function () {
                var infoNew = ramda_1.clone(this.formData);
                var listnew = this.shopList.map(function (item) {
                    item.selected = false;
                    return __assign({}, item);
                });
                this.shopList = listnew;
                infoNew.shopIds = [];
                infoNew.shopNames = [];
                this.formData = infoNew;
            },
            // 通知弹框显示隐藏
            onToggleNoticePopup: function () {
                this.noticeVisible = !this.noticeVisible;
            },
            // 选择通知
            onSelectNotice: function (selectItem) {
                var infoNew = ramda_1.clone(this.noticeList);
                var listNew = infoNew.map(function (item) {
                    if (item.id === selectItem.id) {
                        item.selected = !item.selected;
                    }
                    return __assign({}, item);
                });
                this.noticeList = listNew;
            },
            // 选择通知确定
            onConfirmNoticePopup: function () {
                var infoNew = ramda_1.clone(this.formData);
                var selectedList = this.noticeList.filter(function (item) { return item.selected; });
                infoNew.noticeIds = selectedList.map(function (item) { return item.id; });
                infoNew.noticeNames = selectedList.map(function (item) { return item.name; });
                this.formData = infoNew;
                this.noticeVisible = !this.noticeVisible;
            },
            // 清空通知
            onClearNoticeInfo: function () {
                var infoNew = ramda_1.clone(this.formData);
                var listnew = this.noticeList.map(function (item) {
                    item.selected = false;
                    return __assign({}, item);
                });
                this.noticeList = listnew;
                infoNew.noticeIds = [];
                infoNew.noticeNames = [];
                this.formData = infoNew;
            },
        };
        return _this;
    }
    AddAccount.prototype.modalTip = function (tip) {
        var nowTip = '此岗位需要先创建档案，然后再绑定账号，请到PC端操作';
        if (tip) {
            nowTip = tip;
        }
        wx.showModal({
            title: '温馨提示',
            content: nowTip,
            confirmText: '我知道了',
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                }
            }
        });
    };
    AddAccount.prototype.checkForm = function () {
        var _a = this.data.formData, userName = _a.userName, mobile = _a.mobile, email = _a.email, sale = _a.sale, postNames = _a.postNames, matklNames = _a.matklNames, custNames = _a.custNames, upcomingNames = _a.upcomingNames, noticeNames = _a.noticeNames;
        var status = true;
        if (!userName) {
            status = false;
            toast_1.default.fail("\u8BF7\u586B\u5199\u59D3\u540D");
        }
        else if (!mobile) {
            status = false;
            toast_1.default.fail("\u8BF7\u586B\u5199\u624B\u673A");
        }
        else if (mobile && !validators_1.checkPhone(mobile)) {
            status = false;
            toast_1.default.fail("\u8BF7\u586B\u5199\u6B63\u786E\u7684\u624B\u673A");
            // this.errorMessage = { ...this.errorMessage, phone: '请填写正确的手机' }
        }
        else if (!email) {
            status = false;
            toast_1.default.fail("\u8BF7\u586B\u5199\u90AE\u7BB1");
        }
        else if (email && !validators_1.checkEmail(email)) {
            status = false;
            toast_1.default.fail("\u8BF7\u586B\u5199\u6B63\u786E\u7684\u90AE\u7BB1");
        }
        else if (!sale) {
            status = false;
            toast_1.default.fail("\u8BF7\u9009\u62E9\u662F\u5426\u4E3A\u8425\u9500\u7ECF\u7406");
        }
        else if (postNames.length == 0) {
            status = false;
            toast_1.default.fail("\u8BF7\u9009\u62E9\u5C97\u4F4D");
        }
        else if (matklNames.length == 0) {
            status = false;
            toast_1.default.fail("\u8BF7\u9009\u62E9\u7269\u6599\u7EC4");
        }
        else if (custNames.length == 0) {
            status = false;
            toast_1.default.fail("\u8BF7\u9009\u62E9\u89D2\u8272\u5206\u914D");
        }
        else if (upcomingNames.length == 0) {
            status = false;
            toast_1.default.fail("\u8BF7\u9009\u62E9\u5F85\u529E");
        }
        else if (noticeNames.length == 0) {
            status = false;
            toast_1.default.fail("\u8BF7\u9009\u62E9\u901A\u77E5");
        }
        this.$apply();
        return status;
    };
    // 获取所有选择项列表项
    AddAccount.prototype.getOptions = function () {
        var _this = this;
        var res = wx.getStorageSync('b2b_token');
        var customer = JSON.parse(res).customer;
        this.customer = customer;
        // 岗位
        this.methods.getPostOptionList().then(function (res) {
            var list = res.payload.list;
            var listnew = list.map(function (item) {
                return { id: item.code, name: item.name, selected: false };
            });
            _this.postList = listnew;
        });
        // 待办
        this.methods.getUpcomingOptionList().then(function (res) {
            var list = res.payload.list;
            var listnew = list.map(function (item) {
                return { id: item.code, name: item.name, selected: false };
            });
            _this.upcomingList = listnew;
        });
        // 通知
        this.methods.getNoticeOptionList().then(function (res) {
            var list = res.payload.list;
            var listnew = list.map(function (item) {
                return { id: item.code, name: item.name, selected: false };
            });
            _this.noticeList = listnew;
        });
        // 角色、管理仓库、管辖门店
        this.methods.getCustOptionList({
            custId: this.customer.id,
            queryPage: {
                custId: this.customer.id,
                page: 1,
                pageSize: 10
            }
        }).then(function (res) {
            var _a = res.payload.data, roleList = _a.roleList, shopCkList = _a.shopCkList, shopList = _a.shopList;
            _this.custList = roleList;
            _this.shopCkList = shopCkList;
            _this.shopList = shopList;
        });
        // 物料组
        this.methods.getMatklOptionList().then(function (res) {
            var baseMatklList = res.payload.data.baseMatklList;
            _this.matklList = baseMatklList.map(function (item) {
                return { id: item.id, name: item.matklName, selected: false };
            });
        });
    };
    AddAccount.prototype.onUnload = function () {
        // const { formData: {userName, mobile, email, sale, postNames, matklNames, custNames, shopCkNames, shopNames, upcomingNames, noticeNames} } = this.data
        //
        // if(userName|| mobile || email || sale || postNames || matklNames.length>0 || custNames.length>0 || shopCkNames.length>0 || shopNames.length>0 || upcomingNames.length>0 || noticeNames.length>0){
        //   wx.showModal({
        //     title: '',
        //     content: '尚未保存，是否要离开？',
        //     success: function(res) {
        //       if (res.confirm) {
        //         wx.navigateBack()
        //       } else if (res.cancel) {
        //         console.log('用户点击取消')
        //       }
        //     }
        //   })
        // }
    };
    AddAccount.prototype.onShow = function () {
        this.getOptions();
    };
    AddAccount = __decorate([
        wepy_redux_1.connect({
            editAccount: function (_a) {
                var account = _a.account;
                return account.editAccount;
            },
        }, {
            getPostOptionList: addAccount_1.getPostOptionList,
            getUpcomingOptionList: addAccount_1.getUpcomingOptionList,
            getNoticeOptionList: addAccount_1.getNoticeOptionList,
            getCustOptionList: addAccount_1.getCustOptionList,
            getMatklOptionList: addAccount_1.getMatklOptionList,
        })
    ], AddAccount);
    return AddAccount;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(AddAccount , 'pages/me/account/add-account/index'));

