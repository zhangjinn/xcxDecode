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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var ramda_1 = require('./../../../../npm/ramda/src/index.js');
var balance_1 = require('./../../../../store/actions/balance.js');
var wepy_redux_2 = require('./../../../../npm/wepy-redux/lib/index.js');
var balance_2 = require('./../../../../store/types/balance.js');
var stores = wepy_redux_2.getStore();
var Balance = /** @class */ (function (_super) {
    __extends(Balance, _super);
    function Balance() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '我的余额',
            usingComponents: {
                'van-popup': '../../../../components/vant/popup/index',
                'van-cell': "../../../../components/vant/cell/index",
                "van-cell-group": "../../../../components/vant/cell-group/index",
                "van-button": "../../../../components/vant/button/index",
                'van-icon': '../../../../components/vant/icon/index',
            }
        };
        _this.data = {
            orgCode: '',
            orgName: '',
            matklCode: '',
            matklName: '',
            orgListShow: false,
            matklListShow: false,
            showDetail: false
        };
        _this.methods = {
            openOrgList: function () {
                this.orgListShow = true;
            },
            onOrgClose: function () {
                this.orgListShow = false;
            },
            chooseOrg: function (id) {
                this.orgListShow = false;
                var chooseOrg = ramda_1.find(ramda_1.propEq('id', id), this.orgs);
                this.orgCode = chooseOrg.organizationCode;
                this.orgName = chooseOrg.organizationName;
                // 每次重新选择物料组和组织，都将下面的金额数据隐藏
                stores.dispatch({ type: balance_2.RESET_BALANCE_DATA });
                this.methods.getBalanceInitData({ orgId: id });
            },
            openMatklList: function () {
                this.matklListShow = true;
            },
            onMatklClose: function () {
                this.matklListShow = false;
            },
            chooseMatkl: function (id) {
                this.matklListShow = false;
                var chooseMatkl = ramda_1.find(ramda_1.propEq('id', id), this.matkls);
                this.matklCode = chooseMatkl.matklCode;
                this.matklName = chooseMatkl.matklName;
                stores.dispatch({ type: balance_2.RESET_BALANCE_DATA });
            },
            submit: function () {
                this.methods.getBalance({ customerCode: this.customer.customerCode, orgCode: this.orgCode, matklCode: this.matklCode });
                this.methods.getWaitBalanceInfoList({ orgCode: this.orgCode, matklCode: this.matklCode });
            },
            showDetail: function () {
                _this.showDetail = true;
            },
            hiddenDetail: function () {
                _this.showDetail = false;
            },
        };
        return _this;
    }
    Balance.prototype.onLoad = function () {
        this.methods.getBalanceInitData({ orgId: '' });
    };
    Balance = __decorate([
        wepy_redux_1.connect({
            customer: function (_a) {
                var balance = _a.balance;
                return balance.initData.enterpriseUser;
            },
            orgs: function (_a) {
                var balance = _a.balance;
                var orgs = balance.initData.orgList;
                if (this.orgCode === '' && orgs.length > 0) {
                    this.orgCode = orgs[0].organizationCode;
                    this.orgName = orgs[0].organizationName;
                }
                return orgs;
            },
            matkls: function (_a) {
                var balance = _a.balance;
                var ms = balance.initData.matkls;
                if (ms.length > 0) {
                    var index = ramda_1.findIndex(ramda_1.propEq('matklCode', this.matklCode), ms);
                    if (index === -1) {
                        // 替换成最新的第一个
                        this.matklCode = ms[0].matklCode;
                        this.matklName = ms[0].matklName;
                    }
                }
                return ms;
            },
            balance: function (_a) {
                var balance = _a.balance;
                return balance.balance;
            },
            waitBalanceList: function (_a) {
                var balance = _a.balance;
                return balance.waitBalanceList;
            }
        }, {
            getBalanceInitData: balance_1.getBalanceInitData,
            getBalance: balance_1.getBalance,
            getWaitBalanceInfoList: balance_1.getWaitBalanceInfoList
        })
    ], Balance);
    return Balance;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Balance , 'pages/me/account-center/balance/index'));

