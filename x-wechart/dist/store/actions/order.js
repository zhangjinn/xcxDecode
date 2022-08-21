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
var request_1 = require('./../../utils/request.js');
var order_1 = require('./../types/order.js');
exports.getOrderDeliveryMethod = redux_actions_1.createAction(order_1.GET_ORDER_DELIVERY_METHOD, function (data, callback) { return request_1.request({ api: 'comm/dict.nd?pid=50200', method: 'POST', data: data, callback: callback }); });
exports.getDistributorAddress = redux_actions_1.createAction(order_1.GET_DISTRIBUTOR_ADDRESS, function (data, callback) { return request_1.request({ api: 'address/changeDistributionAddress.nd', method: 'POST', data: data, callback: callback }); });
exports.getPeopleContacts = redux_actions_1.createAction(order_1.GET_PEOPLE_CONTACTS, function (data, callback) { return request_1.request({ api: 'address/changeCustomerAddress.nd', method: 'POST', data: data, callback: callback }); });
// 审核单下单初始化
exports.getSalesOrderInfo = redux_actions_1.createAction(order_1.GET_SALES_ORDER_INFO, function (data, callback) { return request_1.request({ api: 'cart/directBuyInit.nd', method: 'POST', data: data, callback: callback }); });
// 活动下单初始化--抢购
exports.takeActivityOrder = redux_actions_1.createAction(order_1.TAKE_ACTIVITY_COMMON, function (data, callback) { return request_1.request({ api: 'marketActivity/settlement.nd', method: 'POST', data: data, callback: callback }); });
// 活动下单初始化--认购
exports.takeActivityOrderRengou = redux_actions_1.createAction(order_1.TAKE_ACTIVITY_COMMON, function (data, callback) { return request_1.request({ api: 'marketActivity/settlementSimple.nd', method: 'POST', data: data, callback: callback }); });
// 我的抢单初始化
exports.takeActivitySnapped = redux_actions_1.createAction(order_1.TAKE_ACTIVITY_SNAPPED, function (data, callback) { return request_1.request({ api: 'marketActivity/actToOrderInit.nd', method: 'POST', data: data, callback: callback }); });
// 再来一单again
exports.againCommonOrder = redux_actions_1.createAction(order_1.AGAIN_ORDER_COMMON, function (data, callback) { return request_1.request({ api: 'cart/showAnotherOrderList.nd', data: data, callback: callback }); });
// 普通单下单
exports.takeCommonOrder = redux_actions_1.createAction(order_1.TAKE_ORDER_COMMON, function (data, callback) { return request_1.request({ api: 'cart/settlement.nd', method: 'POST', data: data, callback: callback }); });
// 我的订单订单列表以及筛选
exports.getOrderList = redux_actions_1.createAction(order_1.GET_ORDER_LIST, function (data) { return request_1.request({ api: "order/list.nd", method: 'POST', data: data }); });
// 订单筛选条件
exports.getOrderFilter = redux_actions_1.createAction(order_1.GET_ORDER_FILTER, function (data) { return request_1.request({ api: "order/orderList.nd", method: 'POST', data: data }); });
// 工程单下单
exports.takeProjectOrder = redux_actions_1.createAction(order_1.TAKE_ORDER_PROJECT, function (data, callback) { return request_1.request({ api: 'engineering/engineerOrderDetail.nd', data: data, callback: callback }); });
// 套购单下单
exports.buyOutOrder = redux_actions_1.createAction(order_1.GET_BUY_OUT_ORDER, function (data, callback) { return request_1.request({ api: 'packageActivity/packageDetail.nd', data: data, callback: callback }); });
// 特惠单下单
exports.takePreference = redux_actions_1.createAction(order_1.TAKE_PREFERENCE_ORDER, function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'preferential/preferOrderDetail.nd', data: data, callback: callback })];
            case 1:
                res = _a.sent();
                if (data.counts) {
                    res.counts = data.counts;
                }
                if (data.ids) {
                    res.ids = data.ids;
                }
                return [2 /*return*/, res];
        }
    });
}); });
// 获取商品信息
exports.getStocks = redux_actions_1.createAction(order_1.GET_CART_STOCK_LIST, function (data) { return __awaiter(_this, void 0, void 0, function () {
    var stockRes, stocks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'product/getStocks.nd', method: 'POST', data: data })];
            case 1:
                stockRes = _a.sent();
                stocks = [];
                return [2 /*return*/, stockRes];
        }
    });
}); });
//代理商取消订单
exports.agentCanceleOrder = redux_actions_1.createAction(order_1.AGENT_CANCELE_ORDER, function (data) { return request_1.request({ api: "order/cancelOrder.nd", method: 'POST', data: data }); });
//要求到货周
exports.cartOrderWeek = redux_actions_1.createAction(order_1.CART_ORDER_WEEK, function (data, callback) { return request_1.request({ api: 'cart/orderWeek.nd', method: 'POST', data: data, callback: callback }); });
//服务方式
exports.serviceList = redux_actions_1.createAction(order_1.GET_ORDER_SERVICE, function (data, callback) { return request_1.request({ api: 'comm/queryServiceTypeSelect.nd', method: 'POST', data: data, callback: callback }); });
//账户余额获取需要取自CIS【常规订单额度配置】表
exports.moneyByWeek = redux_actions_1.createAction(order_1.MONEY_BY_WEEK, function (data, callback) { return request_1.request({ api: 'cart/moneyByWeek.nd', method: 'POST', data: data, callback: callback }); });
;
exports.getWaitBalanceInfoList = redux_actions_1.createAction(order_1.GET_WAIT_BALANCE_INFO_LIST, function (_a) {
    var orgId = _a.orgId, matklId = _a.matklId, weekName = _a.weekName, purchaseType = _a.purchaseType;
    return request_1.request({ api: "balance/queryWaitBalanceInfoList.nd?orgIdParam=" + orgId + "&matklIdParam=" + matklId + "&weekName=" + weekName + "&purchaseType=" + purchaseType });
});
//我的常规订单
exports.getRoutineOrderList = redux_actions_1.createAction(order_1.GET_MY_ROUTINE_ORDER, function (data) { return request_1.request({ api: "custRoutineOrder/routineOrderList.htm", method: 'POST', data: data }); });
// 海信订单、零售订单用户录入详细地址，对接高德地图，搜索、解析、校验
exports.getAMapV5Placeext = redux_actions_1.createAction(order_1.GET_AMAP_V5_PLACEEXT, function (data, callback) { return request_1.request({ api: 'comm/aMapV5Placeext.nd', method: 'GET', data: data, callback: callback }); });
// 分销商根据地址id查询联系人
exports.getAddressContacts = redux_actions_1.createAction(order_1.GET_ADDRESS_CONTACTS, function (data, callback) { return request_1.request({ api: 'address/getAddressContacts.nd', method: 'GET', data: data, callback: callback }); });
// 保存意向用户
exports.saveShopPotentialUser = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'shopPotentialUser/saveShopPotentialUser.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 获取意向标签列表
exports.findLabelList = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'shopPotentialLabel/findList.nd', method: 'POST', data: data, callback: callback }); });
// 保存意向标签
exports.saveLabelInfo = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'shopPotentialLabel/saveInfo.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 获取意向用户来源列表
exports.findSourceList = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'shopPotentialSource/findList.nd', method: 'POST', data: data, callback: callback }); });
// 保存意向用户来源
exports.saveSourceInfo = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'shopPotentialSource/saveInfo.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 字典
exports.commDict = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'comm/dict.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 意向品类
exports.getPotentialSpart = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'fast/userReport/potentialSpart.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 顶部商家潜在客户数量
exports.getShopPotentialCustNum = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'fast/userReport/shopPotentialCustNum.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 潜在客户列表
exports.getShopPotentialUser = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'fast/potential/shopPotentialUser/page.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 潜在客户明细
exports.getShopPotentialHourse = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'fast/potential/shopPotentialHourse/page.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 获取意向用户详情
exports.getShopPotentialUserDetail = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'shopPotentialUser/getUser.nd', method: 'POST', data: data, callback: callback }); });
// 销售机会
exports.getShopPotentialProduct = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'fast/potential/shopPotentialProduct/page.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 购买记录
exports.getShopPotentialBuyRecord = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'fast/potential/shopPotentialBuyRecord/page.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 售后记录
exports.getShopPotentialAfterSales = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'fast/potential/shopPotentialAfterSales/page.nd', method: 'GET', type: 'application/json', data: data, callback: callback }); });
// 修改意向用户
exports.updateShopPotentialUser = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'shopPotentialUser/updateShopPotentialUser.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 新增房屋及家电
exports.saveShopPotentialUserDetail = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'shopPotentialUserDetail/save.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 修改房屋及家电
exports.updateShopPotentialUserDetail = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'shopPotentialUserDetail/update.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 删除房屋及家电
exports.delShopPotentialUserDetail = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'shopPotentialUserDetail/delete.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 添加销售机会
exports.saveShopPotentialProduct = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'shopPotentialProduct/save.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 删除销售机会
exports.delShopPotentialProduct = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'shopPotentialProduct/delete.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 修改销售机会
exports.updateShopPotentialProduct = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'shopPotentialProduct/update.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 跟进人列表
exports.getFollowPeopleList = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'fast/userReport/custAccountIdDict.nd', method: 'POST', data: data, callback: callback }); });
// 产品模糊搜索
exports.getDefevtiveProByMatkl = redux_actions_1.createAction(order_1.USER_OPERATION_PUBLIC_VARIABLE, function (data, callback) { return request_1.request({ api: 'comm/getDefevtiveProByMatkl.nd', method: 'GET', data: data, callback: callback }); });
