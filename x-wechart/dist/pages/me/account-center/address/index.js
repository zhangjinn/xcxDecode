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
/*
 * @Auth: Turbo
 * @Email: 691209942@qq.com
 * @Date: 2019-09-17 15:12:14
 * @Description:
 */
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var address_1 = require('./../../../../store/actions/address.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var index_1 = require('./../../../../components/empty-data-type/index.js');
var index_2 = require('./../../../components/header-tab/index.js');
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    function Address() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '我的地址',
            usingComponents: {
                'van-popup': '../../../../components/vant/popup/index',
                "van-toast": "../../../../components/vant/toast/index",
            }
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "地址" }, "headerTab": { "xmlns:v-bind": "", "v-bind:showRightBtn.once": "showRightBtn", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "toggleOrgListVisible" } };
        _this.components = {
            emptyDataType: index_1.default,
            headerTab: index_2.default,
        };
        _this.data = {
            orgId: '',
            displayName: '全部销售组织',
            pageNo: 1,
            orgListVisible: false,
            showRightBtn: false,
            headerTabList: [
                { name: '销售组织', type: 'org', selectValue: '' },
            ],
        };
        _this.methods = {
            loadNextPage: function () {
                if (this.pageNo >= this.addressList.totalPages) {
                    return;
                }
                toast_1.default.loading({
                    message: '正在加载',
                    duration: 0
                });
                this.pageNo = ++this.pageNo;
                this.methods.getAddressList({ page: this.pageNo, orgId: this.orgId }).then(function () {
                    toast_1.default.clear();
                });
            },
            toggleOrgListVisible: function () {
                this.orgListVisible = !this.orgListVisible;
            },
            chooseOrg: function (id) {
                toast_1.default.loading({
                    message: '正在加载',
                    duration: 0
                });
                this.headerTabList[0].selectValue = id;
                this.orgListVisible = false;
                this.orgId = id;
                this.pageNo = 1;
                this.displayName = this.organizationList.find(function (org) {
                    return +org.id === +id;
                }).displayName;
                this.methods.getAddressList({ _loading: true, page: this.pageNo, orgId: this.orgId }).then(function () {
                    toast_1.default.clear();
                });
            }
        };
        return _this;
    }
    Address.prototype.onLoad = function () {
        toast_1.default.loading({
            message: '正在加载',
            duration: 0
        });
        this.methods.getAddressList({ _loading: true, page: this.pageNo, orgId: this.orgId }).then(function () {
            toast_1.default.clear();
        });
    };
    Address = __decorate([
        wepy_redux_1.connect({
            // 组织列表
            // [{"id":2354,"pId":613,"organizationCode":"4000","organizationName":"青岛海信通信有限公司","organizationTypeCode":null,"organizationTypeName":null,"organizationDescrip":null,"organizationCatalogId":null,"organizationCatalogName":null,"organizationRegionCode":null,"forecastType":null,"manager":null,"address":null,"regAddress":null,"regDate":null,"capital":null,"no1":null,"no2":null,"no3":null,"pID":null,"pCodes":null,"pTitles":null,"ogLevel":null,"adminId":null,"adminName":null,"adminAccount":null,"adminJobNumber":null},{"id":1666,"pId":1418,"organizationCode":"6837","organizationName":"空调烟台","organizationTypeCode":null,"organizationTypeName":null,"organizationDescrip":null,"organizationCatalogId":null,"organizationCatalogName":null,"organizationRegionCode":null,"forecastType":null,"manager":null,"address":null,"regAddress":null,"regDate":null,"capital":null,"no1":null,"no2":null,"no3":null,"pID":null,"pCodes":null,"pTitles":null,"ogLevel":null,"adminId":null,"adminName":null,"adminAccount":null,"adminJobNumber":null},{"id":154,"pId":5,"organizationCode":"2601","organizationName":"股份青岛","organizationTypeCode":null,"organizationTypeName":null,"organizationDescrip":null,"organizationCatalogId":null,"organizationCatalogName":null,"organizationRegionCode":null,"forecastType":null,"manager":null,"address":null,"regAddress":null,"regDate":null,"capital":null,"no1":null,"no2":null,"no3":null,"pID":null,"pCodes":null,"pTitles":null,"ogLevel":null,"adminId":null,"adminName":null,"adminAccount":null,"adminJobNumber":null},{"id":1047,"pId":786,"organizationCode":"6734","organizationName":"冰箱青岛","organizationTypeCode":null,"organizationTypeName":null,"organizationDescrip":null,"organizationCatalogId":null,"organizationCatalogName":null,"organizationRegionCode":null,"forecastType":null,"manager":null,"address":null,"regAddress":null,"regDate":null,"capital":null,"no1":null,"no2":null,"no3":null,"pID":null,"pCodes":null,"pTitles":null,"ogLevel":null,"adminId":null,"adminName":null,"adminAccount":null,"adminJobNumber":null},{"id":663,"pId":613,"organizationCode":"4103","organizationName":"通信青岛","organizationTypeCode":null,"organizationTypeName":null,"organizationDescrip":null,"organizationCatalogId":null,"organizationCatalogName":null,"organizationRegionCode":null,"forecastType":null,"manager":null,"address":null,"regAddress":null,"regDate":null,"capital":null,"no1":null,"no2":null,"no3":null,"pID":null,"pCodes":null,"pTitles":null,"ogLevel":null,"adminId":null,"adminName":null,"adminAccount":null,"adminJobNumber":null},{"id":1653,"pId":1418,"organizationCode":"6834","organizationName":"空调青岛","organizationTypeCode":null,"organizationTypeName":null,"organizationDescrip":null,"organizationCatalogId":null,"organizationCatalogName":null,"organizationRegionCode":null,"forecastType":null,"manager":null,"address":null,"regAddress":null,"regDate":null,"capital":null,"no1":null,"no2":null,"no3":null,"pID":null,"pCodes":null,"pTitles":null,"ogLevel":null,"adminId":null,"adminName":null,"adminAccount":null,"adminJobNumber":null}]
            organizationList: function (_a) {
                var user = _a.user;
                var orgs = [{
                        id: '',
                        organizationCode: '',
                        organizationName: '全部销售组织' // 组织名称
                    }].concat(user.organizationList || []);
                orgs.forEach(function (org) {
                    org.displayName = org.organizationName + (org.organizationCode === '' ? '' : "(" + org.organizationCode + ")");
                });
                return orgs;
            },
            addressList: function (_a) {
                var address = _a.address;
                return address.list;
            }
        }, {
            getAddressList: address_1.getAddressList
        })
    ], Address);
    return Address;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Address , 'pages/me/account-center/address/index'));

