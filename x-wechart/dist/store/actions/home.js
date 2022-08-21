"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var home_1 = require('./../types/home.js');
var request_1 = require('./../../utils/request.js');
var dmsrequest_1 = require('./dmsrequest.js');
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
// 五期首页消息轮播
exports.getNewUserListInfo = redux_actions_1.createAction(home_1.GET_NEW_USER_LIST_INFO, function (callback) { return request_1.request({ api: "msg/indexMsg.nd", method: 'GET', callback: callback }); });
// 未审核订单数量
exports.getUserUnreadCisAuditOrder = redux_actions_1.createAction(home_1.GET_USER_UNREAD_CIS_AUDIT_ORDER, function (data) { return request_1.request({ api: "order/waitCheckNum.nd", method: 'GET', data: data }); });
// 首页提货报表接口
exports.getHomePagePurchaseReport = redux_actions_1.createAction(home_1.GEt_HOME_PAGE_PURCHASE_REPORT, function (data) { return request_1.request({ api: "report/custSales.nd", data: data }); });
// 首页渠道报表接口
exports.getNewHomeChannelReports = redux_actions_1.createAction(home_1.GET_NEW_HOME_CHANNEL_REPORTS, function (item) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: item,
                method: 'homepageNormalSalesReport'
            })];
    });
}); });
// 首页销售报表接口
exports.getHomePageSalesReport = redux_actions_1.createAction(home_1.GEt_HOME_PAGE_SALES_REPORT, function (item) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: item,
                method: 'homepageSalesReport'
            })];
    });
}); });
// 首页库存报表接口
// export const getHomePageInventoryReport = createAction(GEt_HOME_PAGE_INVENTORY_REPORT, async (item: any) => {
//   return dmsRequest({
//     data: item,
//     method: 'homepageInventoryReport'
//   })
// })
exports.getHomePageInventoryReport = redux_actions_1.createAction(home_1.GEt_HOME_PAGE_INVENTORY_REPORT, function (data) { return request_1.request({ api: "report/inventoryReports.nd", method: 'POST', type: 'json', data: data }); });
// 首页库存报表接口
exports.getInvChangeEverydayReport = redux_actions_1.createAction(home_1.GEt_INV_CHANGE_EVERYDAY_REPORT, function (item) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: item,
                method: 'invChangeEverydayReport'
            })];
    });
}); });
// 首页
exports.getUserHome = redux_actions_1.createAction(home_1.GET_USER_HOME, function (callback) { return request_1.request({ api: "index.nd", method: 'POST', callback: callback }); });
// 未读公告数量、未处理待办数量、未读消息数量接口
exports.getUnTreatNum = redux_actions_1.createAction(home_1.GET_UN_TREAT_NUM, function (callback) { return request_1.request({ api: "priceMessage/getUnTreatNum.nd", method: 'GET', callback: callback }); });
// 首页未读数字
exports.getUserUnreadNumbers = redux_actions_1.createAction(home_1.GET_USER_UNREAD_NUMBERS, function (callback) { return request_1.request({ api: "priceMessage/getPriceMessageNum.nd", method: 'POST', callback: callback }); });
//首页dms相关未读数字
exports.getUnreadDmsNumber = redux_actions_1.createAction(home_1.GET_USER_UNREAD_DMS_NUMBERS, function (module) {
    return dmsrequest_1.dmsRequest({
        data: {
            userAccount: wepy_1.default.$instance.globalData.account,
            module: module,
        },
        method: 'getSuperscriptModuleCount'
    });
});
// 首页运营报表接口
exports.getOperatePlanReach = redux_actions_1.createAction(home_1.GET_OPERATE_PLAN_REACH, function (data) { return request_1.request({ api: "report/operatePlanReach.nd", method: 'POST', type: 'json', data: data }); });
//首页动销率
exports.getRurnoverRate = redux_actions_1.createAction(home_1.GET_RURNOVER_RATE, function (data) { return request_1.request({ api: "report/turnoverRate.nd", method: 'POST', type: 'json', data: data }); });
// 市场覆盖率
exports.getMarketCoverage = redux_actions_1.createAction(home_1.GET_MARKET_COVERAGE, function (data) { return request_1.request({ api: "report/marketCoverage.nd", method: 'POST', type: 'json', data: data }); });
// 销售结构
exports.getProductSalesStructure = redux_actions_1.createAction(home_1.GET_PRODUCT_SALES_STRUCTURE, function (data) { return request_1.request({ api: "report/productSalesStructure.nd", method: 'POST', type: 'json', data: data }); });
//毛利率
exports.getGrossProfitRate = redux_actions_1.createAction(home_1.GET_GROSS_PROFIT_RATE, function (data) { return request_1.request({ api: "report/grossProfitRate.nd", method: 'POST', type: 'json', data: data }); });
//o2o门店
exports.getO2oShopList = redux_actions_1.createAction(home_1.GET_O_2_O_SHOP_LIST, function (data) { return request_1.request({ api: "o2o/shopList.nd", method: 'get', type: 'json', data: data }); });
//o2o收入报表
exports.getSettleStatistic = redux_actions_1.createAction(home_1.GET_SETTLE_STATISTIC, function (data) { return request_1.request({ api: "o2o/settleStatistic.nd", method: 'get', type: 'json', data: data }); });
//写入日志接口
exports.writeLog = redux_actions_1.createAction(home_1.WRITE_LOG, function (data) { return request_1.request({ api: "log/writeLog.nd", method: 'get', data: data }); });
// 首页导航图标查询-list
exports.getNavigationMenuRecord = redux_actions_1.createAction(home_1.GET_NAVIGATION_MENU_RECORD, function (data, callback) { return request_1.request({ api: 'custMenuVisit/homePageMenuList.nd?clientPlatform=XCX', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 移动端-运营中心-提货
exports.getPickUpGoods = redux_actions_1.createAction(home_1.GET_NAVIGATION_MENU_RECORD, function (data, callback) { return request_1.request({ api: 'evaluation/findOperationCenter/pickUpGoods.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 移动端-运营中心-销售
exports.getFrontChannel = redux_actions_1.createAction(home_1.GET_NAVIGATION_MENU_RECORD, function (data, callback) { return request_1.request({ api: 'evaluation/findOperationCenter/frontChannel.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 移动端-运营中心-毛利率
exports.getGrossProfitMargin = redux_actions_1.createAction(home_1.GET_NAVIGATION_MENU_RECORD, function (data, callback) { return request_1.request({ api: 'evaluation//findOperationCenter/grossMargin.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 移动端-运营中心-综合评价
exports.getComprehensive = redux_actions_1.createAction(home_1.GET_NAVIGATION_MENU_RECORD, function (data, callback) { return request_1.request({ api: 'evaluation/findOperationCenter/comprehensive.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 移动端-运营中心-分销网络拓展与维护
exports.getDistributeNetwork = redux_actions_1.createAction(home_1.GET_NAVIGATION_MENU_RECORD, function (data, callback) { return request_1.request({ api: 'evaluation/findOperationCenter/distributeNetwork.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 移动端-运营中心-库存周转
exports.getInventoryTurnover = redux_actions_1.createAction(home_1.GET_NAVIGATION_MENU_RECORD, function (data, callback) { return request_1.request({ api: 'evaluation/findOperationCenter/inventory.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 覆盖率明细
exports.getReportFuGaiLvDetail = redux_actions_1.createAction(home_1.GET_NAVIGATION_MENU_RECORD, function (data, callback) { return request_1.request({ api: 'fast/userReport/reportFuGaiLvDetail.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 跑动率明细
exports.getReportPaoDongLvDetail = redux_actions_1.createAction(home_1.GET_NAVIGATION_MENU_RECORD, function (data, callback) { return request_1.request({ api: 'xx1_1657762106094', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 毛利率明细
exports.getReportMaoLiLvDetail = redux_actions_1.createAction(home_1.GET_NAVIGATION_MENU_RECORD, function (data, callback) { return request_1.request({ api: 'xx1_1657762102766', method: 'GET', type: 'application/json', data: data, callback: callback }); });
