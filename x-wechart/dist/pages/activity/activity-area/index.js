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
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var index_1 = require('./../../../components/goodsHeader/index.js');
var system_1 = require('./../../../mixins/system.js');
var activityare_1 = require('./../../../store/actions/activityare.js');
var classification_1 = require('./../../../store/actions/classification.js');
var activityare_2 = require('./../../../store/types/activityare.js');
var search_1 = require('./../../../store/types/search.js');
var index_2 = require('./../../../utils/index.js');
var index_3 = require('./../../../components/empty-data-type/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '',
            navigationStyle: 'custom',
            usingComponents: {
                'van-rate': '../../../components/vant/rate/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-search': '../../../components/vant/search/index',
                'van-tab': '../../../components/vant/tab/index',
                'van-tabs': '../../../components/vant/tabs/index',
                'van-field': '../../../components/vant/field/index',
                'van-count-down': '../../../components/vant/count-down/index',
                'img': '../../../components/img/index',
                'calendar': '../../../components/calendar/index',
                'activity-good-info': '../activity-good-info/index',
                'van-loading': '../../../components/vant/loading/index',
                'item': '../../../components/list-item/index',
                'activity-count-down': '../../../components/activity-count-down/index',
                'activity-good-container': '../activity-good-container/index',
                'activity-good-more': '../activity-good-more/index'
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "活动" }, "emptyDataAuth": { "description": "权限" } };
        _this.$events = {};
        _this.components = {
            header: index_1.default,
            emptyDataType: index_3.default,
            emptyDataAuth: index_3.default,
        };
        _this.watch = {
            listId: function () {
                if (this.listId && this.listId.length > 0) {
                    this.methods.getActivityStatus({ ids: this.listId });
                }
            }
        };
        // 声明
        _this.data = {
            key: '',
            visible: false,
            wlz_visible: false,
            gys_visible: false,
            statusBarHeight: '',
            // 回到顶部
            visibelTop: false,
            scrollTop: -1,
            filterIndex: 0,
            filterSale: 0,
            sortField: '',
            sortType: '',
            onOpen: false,
            time: 74361,
            searchstatuspopup: '',
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            // 倒计时
            calendarShow: false,
            matklname: '全部',
            orgIdname: '全部',
            dataName: '',
            filterForm: {
                _loading: true,
                pageNo: 1,
                status: '2',
                startDate: '',
                endDate: '',
                activityName: '',
                matkl: '',
                orgId: '',
            },
            isPermission: false,
            moreModelPopup: false,
            popupShowMoreModelInfo: {
                containerItem: Object,
                item: Object,
                mark: String,
            },
            imgObj: {
                'activeHeaderBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552533_e99dd0572f5d485c993894060c749626.png',
                'activeHeaderLogo': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993518246_ff7aae8b32ec49e08b2260f648980a5d.png',
                'activeHeaderTab': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529283_6e66affe82df4efaa0a62c2a84752f25.png',
                'emptyActivity': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552691_234752c5bcf74f2c8293e1ab460b1c43.png',
                'share_item_info': 'http://3s-static.hisense.com/wechat/1/14722429883/1643097372976_061953fd860d42efa932dd721521a995.png',
            },
        };
        _this.mixins = [system_1.default];
        // 页面内交互写在methods里
        _this.methods = {
            moveHandle: function () { },
            onShareAppMessage: function () {
                var shareItemInfo = _this.imgObj.share_item_info;
                return {
                    imageUrl: shareItemInfo,
                    query: ''
                };
            },
            closeItUp: function (id) {
                ramda_1.forEach(function (item) {
                    if (item.id == id) {
                        item.isShow = !item.isShow;
                    }
                }, _this.ActivityList);
            },
            // 选择物料组
            onSelectGysFrame: function (value, key) {
                _this.orgIdname = value;
                _this.filterForm = __assign({}, _this.filterForm, { orgId: key });
                _this.gys_visible = false;
            },
            // 选择物料组
            onSelectWlzFrame: function (value, key) {
                _this.matklname = value;
                _this.filterForm = __assign({}, _this.filterForm, { matkl: key });
                _this.wlz_visible = false;
            },
            // 活动名称
            onZzprdmodelChange: function (e) {
                _this.filterForm = __assign({}, _this.filterForm, { activityName: e.detail });
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm, startDate = _a.startDate, endDate = _a.endDate;
                var _b = e.target.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'sapDate') {
                    begin = startDate;
                    end = endDate;
                }
                if (name.indexOf('eginDate') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('ndDate') > -1) {
                    this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
                }
                this.calendarShow = true;
            },
            closeCalendar: function () {
                this.calendarShow = false;
            },
            clearCalendar: function (name) {
                var _a;
                var dataName = (name == "sapBeginDate" ? 'startDate' : 'endDate');
                this.filterForm = __assign({}, this.filterForm, (_a = {}, _a[dataName] = '', _a));
            },
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_2.fillZero("" + month) + "-" + index_2.fillZero("" + day);
                this.dataName = (this.currentDateName == "sapBeginDate" ? 'startDate' : 'endDate');
                this.filterForm = __assign({}, this.filterForm, (_a = {}, _a[this.dataName] = day, _a));
                this.calendarShow = false;
            },
            chosebar: function (status) {
                // 切换tab是不需要重置了 如需要👇这行打开
                // this.methods.resetSearch()
                _this.filterForm = __assign({}, _this.filterForm, { status: status, pageNo: 1 });
                // TODO: 接一个搜索方法
                wepy_redux_1.getStore().dispatch({ type: activityare_2.RESET_ACTIVITY_LIST, payload: [] });
                _this.myGetOrderList();
            },
            onScroll: function (event) {
                if (event.detail.scrollTop >= 350) {
                    _this.visibelTop = true;
                    if (_this.scrollTop === 0) {
                        _this.scrollTop = event.detail.scrollTop;
                    }
                }
                else {
                    _this.visibelTop = false;
                }
            },
            //滚动触发
            onPullBottom: function () {
                // debugger
                var index = _this.filterForm.pageNo + 1;
                if (index < _this.totalPages || index == _this.totalPages) {
                    _this.filterForm = __assign({}, _this.filterForm, { pageNo: index });
                    _this.myGetOrderList();
                }
            },
            // 筛选条件
            resetSearch: function () {
                _this.filterForm = __assign({}, _this.filterForm, { pageNo: 1, startDate: '', endDate: '', activityName: '', matkl: '', orgId: '' });
                _this.matklname = '全部';
                _this.orgIdname = '全部';
            },
            confirmSearch: function () {
                wepy_redux_1.getStore().dispatch({ type: activityare_2.RESET_ACTIVITY_LIST, payload: [] });
                _this.filterForm = __assign({}, _this.filterForm, { pageNo: 1 });
                _this.myGetOrderList();
                _this.methods.scrollToTop();
                _this.visible = false;
            },
            // 运营商开关
            onOpen: function (key) {
                if (key == 'wlz') {
                    _this.wlz_visible = !_this.wlz_visible;
                }
                else if (key == 'gys') {
                    _this.gys_visible = !_this.gys_visible;
                }
            },
            onToggleTimeFrame: function (key) {
                if (key == 'wlz') {
                    this.wlz_visible = !this.wlz_visible;
                }
                else if (key == 'gys') {
                    this.gys_visible = !this.gys_visible;
                }
            },
            openDrawer: function () {
                _this.visible = !_this.visible;
            },
            // 返回上一级
            goback: function () {
                var route = getCurrentPages();
                var url = route[0].route;
                wx.switchTab({
                    url: "../../../pages/main/home/index"
                });
            },
            // 回到顶部
            scrollToTop: function () {
                _this.visibelTop = false;
                _this.scrollTop = 0;
            },
            toggleCollection: function (_a) {
                var detail = _a.detail;
                wepy_redux_1.getStore().dispatch({ type: search_1.TOGGLE_SEARCH_COLLECTION, payload: detail });
            },
            imgLose: function (_a) {
                var detail = _a.detail;
                wepy_redux_1.getStore().dispatch({ type: activityare_2.RESET_ACTIVITY_IMG, payload: detail });
            },
            // 子组件传参--列表页组合购改变型号默认型号跟着变化
            changeModel: function (_a) {
                var detail = _a.detail;
                _this.ActivityList.forEach(function (item, index) {
                    if (item.id == detail.activeId) {
                        var currItem_1 = item.setPurchaseList[detail.mark];
                        currItem_1.forEach(function (val, i) {
                            if (val.productGroup == detail.product.productGroup) {
                                val.child = val.child.map(function (child, idx) {
                                    child.isActive = false;
                                    if (idx == detail.modelIndex) {
                                        child.isActive = true;
                                    }
                                    return child;
                                });
                                currItem_1[i] = __assign({}, currItem_1[i], val.child[detail.modelIndex]);
                            }
                        });
                        _this.ActivityList[index] = item;
                    }
                });
                _this.$apply();
            },
            // 子组件传参--组合购展示更多型号
            showMoreModel: function (_a) {
                var detail = _a.detail;
                this.popupShowMoreModelInfo = detail;
                this.moreModelPopup = true;
                this.$apply();
            },
            // 关闭组合购更多弹框
            closeMoreModelPopup: function () {
                this.moreModelPopup = false;
                this.$apply();
            },
            //弹框组合购改变型号默认型号跟着变化
            changePopModel: function (_a) {
                var detail = _a.detail;
                this.popupShowMoreModelInfo = detail;
                this.$apply();
            }
        };
        return _this;
    }
    Filter.prototype.myGetOrderList = function () {
        this.methods.getActivityList(this.filterForm);
    };
    Filter.prototype.onShow = function () {
        var globalData = wepy_1.default.$instance.globalData;
        this.isPermission = globalData.isPermission;
        wepy_redux_1.getStore().dispatch({ type: activityare_2.RESET_ACTIVITY_LIST, payload: [] });
        this.myGetOrderList();
    };
    Filter.prototype.onLoad = function (_a) {
        var activityName = _a.activityName;
        if (activityName) {
            this.filterForm.activityName = activityName;
        }
        this.methods.getSpecialFilters();
    };
    Filter.prototype.onUnload = function () {
        this.listId = '';
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            ActivityList: function (_a) {
                var activityare = _a.activityare;
                return activityare.ActivityList;
            },
            totalPages: function (_a) {
                var activityare = _a.activityare;
                return activityare.totalPages;
            },
            listId: function (_a) {
                var activityare = _a.activityare;
                return activityare.listId;
            },
            specialfilters: function (_a) {
                var classification = _a.classification;
                return classification.specialfilters;
            },
            user: function (_a) {
                var user = _a.user;
                return user;
            }
        }, {
            getSpecialFilters: classification_1.getSpecialFilters,
            getActivityList: activityare_1.getActivityList,
            getActivityStatus: activityare_1.getActivityStatus
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/activity/activity-area/index'));

