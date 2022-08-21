import { createAction } from 'redux-actions'
import {
  GET_USER_HOME, GET_USER_UNREAD_NUMBERS,GET_USER_UNREAD_DMS_NUMBERS,
  GEt_HOME_PAGE_PURCHASE_REPORT,GEt_HOME_PAGE_SALES_REPORT,
  GEt_HOME_PAGE_INVENTORY_REPORT,GEt_INV_CHANGE_EVERYDAY_REPORT,
  GET_NEW_USER_LIST_INFO,GET_NEW_HOME_CHANNEL_REPORTS,
  GET_USER_UNREAD_CIS_AUDIT_ORDER,GET_OPERATE_PLAN_REACH,
  GET_RURNOVER_RATE,GET_MARKET_COVERAGE,GET_PRODUCT_SALES_STRUCTURE,
  GET_GROSS_PROFIT_RATE,GET_O_2_O_SHOP_LIST,GET_SETTLE_STATISTIC,
  WRITE_LOG,GET_UN_TREAT_NUM,GET_NAVIGATION_MENU_RECORD
} from '@/store/types/home'
import { request } from '@/utils/request'
import { dmsRequest } from './dmsrequest'
import wepy from 'wepy';

export interface item {
  cisCode: string
  userAccount: string
}
// 五期首页消息轮播
export const getNewUserListInfo = createAction(GET_NEW_USER_LIST_INFO, (callback: any) => request({ api: `msg/indexMsg.nd`, method: 'GET', callback }))
// 未审核订单数量
export const getUserUnreadCisAuditOrder = createAction(GET_USER_UNREAD_CIS_AUDIT_ORDER, (data: data) => request({ api: `order/waitCheckNum.nd`, method: 'GET', data }));

// 首页提货报表接口
export const getHomePagePurchaseReport = createAction(GEt_HOME_PAGE_PURCHASE_REPORT, (data: data) => request({ api: `report/custSales.nd`, data }));

// 首页渠道报表接口
export const getNewHomeChannelReports = createAction(GET_NEW_HOME_CHANNEL_REPORTS, async (item: any) => {
  return dmsRequest({
    data: item,
    method: 'homepageNormalSalesReport'
  })
})
// 首页销售报表接口
export const getHomePageSalesReport = createAction(GEt_HOME_PAGE_SALES_REPORT, async (item: any) => {
  return dmsRequest({
    data: item,
    method: 'homepageSalesReport'
  })
})
// 首页库存报表接口
// export const getHomePageInventoryReport = createAction(GEt_HOME_PAGE_INVENTORY_REPORT, async (item: any) => {
//   return dmsRequest({
//     data: item,
//     method: 'homepageInventoryReport'
//   })
// })
export const getHomePageInventoryReport = createAction(GEt_HOME_PAGE_INVENTORY_REPORT, (data: data) => request({ api: `report/inventoryReports.nd`, method: 'POST',type:'json', data }));


// 首页库存报表接口
export const getInvChangeEverydayReport = createAction(GEt_INV_CHANGE_EVERYDAY_REPORT, async (item: any) => {
  return dmsRequest({
    data: item,
    method: 'invChangeEverydayReport'
  })
})
// 首页
export const getUserHome = createAction(GET_USER_HOME, (callback: any) => request({ api: `index.nd`, method: 'POST', callback }))

// 未读公告数量、未处理待办数量、未读消息数量接口
export const getUnTreatNum= createAction(GET_UN_TREAT_NUM, (callback: any) => request({ api: `priceMessage/getUnTreatNum.nd`, method: 'GET', callback }))

// 首页未读数字
export const getUserUnreadNumbers= createAction(GET_USER_UNREAD_NUMBERS, (callback: any) => request({ api: `priceMessage/getPriceMessageNum.nd`, method: 'POST', callback }))

//首页dms相关未读数字
export const getUnreadDmsNumber = createAction(GET_USER_UNREAD_DMS_NUMBERS, (module: any) => {
  return dmsRequest({
    data: {
     userAccount: wepy.$instance.globalData.account,
     module,
    },
    method: 'getSuperscriptModuleCount'
   })
})
// 首页运营报表接口
export const getOperatePlanReach = createAction(GET_OPERATE_PLAN_REACH, (data: data) => request({ api: `report/operatePlanReach.nd`, method: 'POST',type:'json', data }));
//首页动销率
export const getRurnoverRate = createAction(GET_RURNOVER_RATE, (data: data) => request({ api: `report/turnoverRate.nd`, method: 'POST',type:'json', data }));
// 市场覆盖率
export const getMarketCoverage = createAction(GET_MARKET_COVERAGE, (data: data) => request({ api: `report/marketCoverage.nd`, method: 'POST',type:'json', data }));
// 销售结构
export const getProductSalesStructure = createAction(GET_PRODUCT_SALES_STRUCTURE, (data: data) => request({ api: `report/productSalesStructure.nd`, method: 'POST',type:'json', data }));
//毛利率
export const getGrossProfitRate = createAction(GET_GROSS_PROFIT_RATE, (data: data) => request({ api: `report/grossProfitRate.nd`, method: 'POST',type:'json', data }));
//o2o门店
export const getO2oShopList = createAction(GET_O_2_O_SHOP_LIST, (data: data) => request({ api: `o2o/shopList.nd`, method: 'get',type:'json', data }));
//o2o收入报表
export const getSettleStatistic = createAction(GET_SETTLE_STATISTIC, (data: data) => request({ api: `o2o/settleStatistic.nd`, method: 'get',type:'json', data }));
//写入日志接口
export const writeLog = createAction(WRITE_LOG, (data: data) => request({ api: `log/writeLog.nd`, method: 'get', data }));
// 首页导航图标查询-list
export const getNavigationMenuRecord = createAction(GET_NAVIGATION_MENU_RECORD, (data: any, callback: any) => request({ api: 'custMenuVisit/homePageMenuList.nd?clientPlatform=XCX', method: 'GET', type: 'application/json', data, callback }));

// 移动端-运营中心-提货
export const getPickUpGoods = createAction(GET_NAVIGATION_MENU_RECORD, (data: any, callback: any) => request({ api: 'evaluation/findOperationCenter/pickUpGoods.nd', method: 'GET', type: 'application/json', data, callback }));
// 移动端-运营中心-销售
export const getFrontChannel = createAction(GET_NAVIGATION_MENU_RECORD, (data: any, callback: any) => request({ api: 'evaluation/findOperationCenter/frontChannel.nd', method: 'GET', type: 'application/json', data, callback }));
// 移动端-运营中心-毛利率
export const getGrossProfitMargin = createAction(GET_NAVIGATION_MENU_RECORD, (data: any, callback: any) => request({ api: 'evaluation//findOperationCenter/grossMargin.nd', method: 'GET', type: 'application/json', data, callback }));
// 移动端-运营中心-综合评价
export const getComprehensive = createAction(GET_NAVIGATION_MENU_RECORD, (data: any, callback: any) => request({ api: 'evaluation/findOperationCenter/comprehensive.nd', method: 'GET', type: 'application/json', data, callback }));
// 移动端-运营中心-分销网络拓展与维护
export const getDistributeNetwork = createAction(GET_NAVIGATION_MENU_RECORD, (data: any, callback: any) => request({ api: 'evaluation/findOperationCenter/distributeNetwork.nd', method: 'GET', type: 'application/json', data, callback }));
// 移动端-运营中心-库存周转
export const getInventoryTurnover = createAction(GET_NAVIGATION_MENU_RECORD, (data: any, callback: any) => request({ api: 'evaluation/findOperationCenter/inventory.nd', method: 'GET', type: 'application/json', data, callback }));
// 覆盖率明细
export const getReportFuGaiLvDetail = createAction(GET_NAVIGATION_MENU_RECORD, (data: any, callback: any) => request({ api: 'fast/userReport/reportFuGaiLvDetail.nd', method: 'GET', type: 'application/json', data, callback }));
// 跑动率明细
export const getReportPaoDongLvDetail = createAction(GET_NAVIGATION_MENU_RECORD, (data: any, callback: any) => request({ api: 'xx1_1657762106094', method: 'GET', type: 'application/json', data, callback }));
// 毛利率明细
export const getReportMaoLiLvDetail = createAction(GET_NAVIGATION_MENU_RECORD, (data: any, callback: any) => request({ api: 'xx1_1657762102766', method: 'GET', type: 'application/json', data, callback }));
