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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var activityare_1 = require('./../../../../store/actions/activityare.js');
var record_1 = require('./../../../../store/actions/record.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '代理商市场活动详情',
            usingComponents: {
                'van-toast': '../../../../components/vant/toast/index',
                "van-field": "../../../../components/vant/field/index",
                "van-cell": "../../../../components/vant/cell/index",
                'van-uploader': '../../../../components/vant/uploader/index',
                "van-icon": "../../../../components/vant/icon/index",
                'van-popup': '../../../../components/vant/popup/index',
                'van-dialog': '../../../../components/vant/dialog/index',
                'calendar': '../../../../components/calendar/index',
                "van-datetime-picker": "../../../../components/vant/datetime-picker/index",
                'van-search': '../../../../components/vant/search/index',
                'van-tab': '../../../../components/vant/tab/index',
                'van-tabs': '../../../../components/vant/tabs/index',
                'van-stepper': '../../../../components/vant/stepper/index',
            },
        };
        _this.data = {
            formData: {
                experienceSharing: [],
                voucherAttachs: [] // 结算凭证
            },
            tabActive: 'category',
            tabList: [
                { title: '参与品类', key: 'category', },
                { title: '物料', key: 'materials', },
                { title: '媒体宣传', key: 'media', },
                { title: '临促', key: 'prompt', },
                { title: '赠品', key: 'giveaway', },
                { title: 'TO小B费用', key: 'bFee', },
                { title: '其他', key: 'other', },
            ],
            tabInfoItem: {
                category: {
                    items: []
                },
                materials: {
                    totalNum: 0,
                    totalAmount: 0,
                    items: []
                },
                media: {
                    totalNum: 0,
                    totalAmount: 0,
                    items: []
                },
                prompt: {
                    totalNum: 0,
                    totalAmount: 0,
                    items: []
                },
                giveaway: {
                    totalNum: 0,
                    totalAmount: 0,
                    items: []
                },
                bFee: {
                    totalNum: 0,
                    totalAmount: 0,
                    items: []
                },
                other: {
                    totalNum: 0,
                    totalAmount: 0,
                    items: []
                },
            },
            currId: '',
            activeDetail: {},
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 切换视图
            tabChange: function (e) {
                var index = e.detail.index;
                this.tabActive = this.tabList[index].key;
                this.$apply();
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 查询图片回显路径
    Filter.prototype.getPictureUrl = function (file) {
        var photo = [];
        if (file && file.length) {
            photo = file.map(function (item) {
                return __assign({}, item, { id: item.id, name: item.attachName, url: item.attachPath, viewType: 'default' });
            });
        }
        return photo;
    };
    // 视图列表传参字段转换
    Filter.prototype.viewDataToParams = function (list) {
        var target = [];
        if (list && list.items && list.items.length > 0) {
            target = list.items.map(function (item) {
                return {
                    num: item.num || 0,
                    price: item.price || 0,
                    remark: item.remark,
                    total: item.total || 0,
                    type: item.type,
                };
            });
        }
        return target;
    };
    // 获取详情视图列表渲染字段转换
    Filter.prototype.viewDataConversion = function (list, type) {
        if (type && type === 'category') {
            var target = {
                items: []
            };
            if (list && list.length > 0) {
                target.items = list.map(function (item) {
                    return __assign({}, item, { materialGroup: {
                            id: item.matklId,
                            name: item.matklName,
                        }, viewType: 'default' });
                });
            }
            return target;
        }
        else {
            var target_1 = {
                totalNum: 0,
                totalAmount: 0,
                items: []
            };
            if (list && list.length > 0) {
                target_1.items = list.map(function (item) {
                    return __assign({}, item, { num: item.num || 0, price: item.price || 0, remark: item.remark, total: item.total || 0, type: item.type, viewType: 'default' });
                });
                target_1.items.forEach(function (item) {
                    target_1.totalNum += Number(item.num);
                    target_1.totalAmount += Number(item.total);
                });
            }
            return target_1;
        }
    };
    // 获取订单详细信息
    Filter.prototype.getDetailsData = function () {
        var _this = this;
        toast_1.default.loading({
            message: '正在加载',
            duration: 2000
        });
        var param = {
            id: this.currId
        };
        this.methods.getAgentActivityById(param).then(function (res) {
            toast_1.default.clear();
            var data = res.payload.data;
            if (data) {
                var detail = data;
                _this.activeDetail = detail;
                _this.formData = {
                    experienceSharing: _this.getPictureUrl(detail.attachs),
                    voucherAttachs: _this.getPictureUrl(detail.voucherAttachs) // 结算凭证
                };
                _this.tabInfoItem = {
                    category: _this.viewDataConversion(detail.productLineDtoList, 'category'),
                    materials: _this.viewDataConversion(detail.matklDtoList),
                    media: _this.viewDataConversion(detail.mediaDtoList),
                    prompt: _this.viewDataConversion(detail.tempDtoList),
                    giveaway: _this.viewDataConversion(detail.giftDtoList),
                    bFee: _this.viewDataConversion(detail.tobDtoList),
                    other: _this.viewDataConversion(detail.otherDtoList),
                };
            }
            _this.$apply();
        });
    };
    Filter.prototype.onLoad = function (_a) {
        var id = _a.id, type = _a.type;
        this.currId = '';
        if (id) {
            this.currId = id;
        }
        this.getDetailsData();
    };
    Filter = __decorate([
        wepy_redux_1.connect({}, {
            uploadImg: record_1.uploadImg,
            getAgentActivityById: activityare_1.getAgentActivityById,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/activity/agency-activity/detail/index'));

