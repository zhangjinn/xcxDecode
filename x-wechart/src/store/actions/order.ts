import { createAction } from 'redux-actions';
import { request } from '@/utils/request';
import {
  TAKE_ORDER_COMMON, GET_ORDER_LIST, GET_ORDER_FILTER, AGAIN_ORDER_COMMON,
  TAKE_ORDER_PROJECT, GET_BUY_OUT_ORDER, TAKE_PREFERENCE_ORDER,GET_CART_STOCK_LIST,
  GET_DISTRIBUTOR_ADDRESS, GET_PEOPLE_CONTACTS,
  TAKE_ACTIVITY_COMMON, TAKE_ACTIVITY_SNAPPED, GET_ORDER_DELIVERY_METHOD,
  GET_SALES_ORDER_INFO, AGENT_CANCELE_ORDER, CART_ORDER_WEEK,GET_ORDER_SERVICE,MONEY_BY_WEEK,
  GET_WAIT_BALANCE_INFO_LIST, GET_MY_ROUTINE_ORDER, GET_AMAP_V5_PLACEEXT,GET_ADDRESS_CONTACTS,
  USER_OPERATION_PUBLIC_VARIABLE
} from '@/store/types/order';

export interface orderparameters {
  pageNo: number;
  orderCode: string;
  zzprdmodel: string;
  orderTypeCode: string;
  sapOrderStatus: string;
  matklId: number;
  orgId: number;
  status: number;
  beginDate: string;
  endDate: string;
  timeFrame: number;
  sapBeginDate: string;
  sapEndDate: string;
  type: string;
  agentId: string;
  fxId: string;
}
export interface address {
  customerId: string;
  orgId: string;
  matklId: string;
}
export interface people {
  sendToId: string;
}
export interface method {
  type: string;
}
export const getOrderDeliveryMethod= createAction(GET_ORDER_DELIVERY_METHOD, (data: method, callback: () => void) => request({ api: 'comm/dict.nd?pid=50200',method: 'POST', data, callback }));

export const getDistributorAddress= createAction(GET_DISTRIBUTOR_ADDRESS, (data: address, callback: () => void) => request({ api: 'address/changeDistributionAddress.nd',method: 'POST', data, callback }));
export const getPeopleContacts= createAction(GET_PEOPLE_CONTACTS, (data: people, callback: () => void) => request({ api: 'address/changeCustomerAddress.nd',method: 'POST', data, callback }));
// 审核单下单初始化
export const getSalesOrderInfo = createAction(GET_SALES_ORDER_INFO, (data: any, callback: () => void) => request({ api: 'cart/directBuyInit.nd', method: 'POST', data, callback }));
// 活动下单初始化--抢购
export const takeActivityOrder = createAction(TAKE_ACTIVITY_COMMON, (data: any, callback: () => void) => request({ api: 'marketActivity/settlement.nd', method: 'POST', data, callback }));
// 活动下单初始化--认购
export const takeActivityOrderRengou = createAction(TAKE_ACTIVITY_COMMON, (data: any, callback: () => void) => request({ api: 'marketActivity/settlementSimple.nd', method: 'POST', data, callback }));
// 我的抢单初始化
export const takeActivitySnapped = createAction(TAKE_ACTIVITY_SNAPPED, (data: any, callback: () => void) => request({ api: 'marketActivity/actToOrderInit.nd', method: 'POST', data, callback }));
// 再来一单again
export const againCommonOrder = createAction(AGAIN_ORDER_COMMON, (data: any, callback: () => void) => request({ api: 'cart/showAnotherOrderList.nd', data, callback }));
// 普通单下单
export const takeCommonOrder = createAction(TAKE_ORDER_COMMON, (data: any, callback: () => void) => request({ api: 'cart/settlement.nd', method: 'POST', data, callback }));

// 我的订单订单列表以及筛选
export const getOrderList = createAction(GET_ORDER_LIST, (data: orderparameters) => request({ api: `order/list.nd`, method: 'POST', data }))

// 订单筛选条件
export const getOrderFilter = createAction(GET_ORDER_FILTER, (data: any ) => request({ api: `order/orderList.nd`, method: 'POST',data }))

// 工程单下单
export const takeProjectOrder = createAction(TAKE_ORDER_PROJECT, (data: any, callback: () => void) => request({ api: 'engineering/engineerOrderDetail.nd', data, callback }));

// 套购单下单
export const buyOutOrder = createAction(GET_BUY_OUT_ORDER, (data: any, callback: () => void) => request({ api: 'packageActivity/packageDetail.nd', data, callback }));

// 特惠单下单
export const takePreference = createAction(TAKE_PREFERENCE_ORDER, async (data: any, callback: () => void) => {
  const res: any = await request({ api: 'preferential/preferOrderDetail.nd', data, callback });
  if (data.counts) {
    res.counts = data.counts;
  }
  if (data.ids) {
    res.ids = data.ids;
  }
  return res;
});

// 获取商品信息
export const getStocks = createAction(GET_CART_STOCK_LIST, async (data: PriceParams) => {
  const stockRes: any = await request({ api: 'product/getStocks.nd', method: 'POST', data });
  let stocks: any = [];

  return stockRes;
});

//代理商取消订单
export const agentCanceleOrder = createAction(AGENT_CANCELE_ORDER, (data: any ) => request({ api: `order/cancelOrder.nd`, method: 'POST',data }))

//要求到货周
export const cartOrderWeek = createAction(CART_ORDER_WEEK, (data: method, callback: () => void) => request({ api: 'cart/orderWeek.nd',method: 'POST', data, callback }));

//服务方式
export const serviceList = createAction(GET_ORDER_SERVICE, (data: method, callback: () => void) => request({ api: 'comm/queryServiceTypeSelect.nd',method: 'POST', data, callback }));

//账户余额获取需要取自CIS【常规订单额度配置】表
export const moneyByWeek = createAction(MONEY_BY_WEEK, (data: method, callback: () => void) => request({ api: 'cart/moneyByWeek.nd',method: 'POST', data, callback }));

// 查询预占用额度明细
interface BalanceParam {
  orgId: number;
  matklId: number;
  weekName: string;
  purchaseType: string;
};
export const getWaitBalanceInfoList = createAction(GET_WAIT_BALANCE_INFO_LIST, ({ orgId, matklId, weekName,purchaseType }: BalanceParam) => request({ api: `balance/queryWaitBalanceInfoList.nd?orgIdParam=${orgId}&matklIdParam=${matklId}&weekName=${weekName}&purchaseType=${purchaseType}` }));

//我的常规订单
export const getRoutineOrderList = createAction(GET_MY_ROUTINE_ORDER, (data: orderparameters) => request({ api: `custRoutineOrder/routineOrderList.htm`, method: 'POST', data }))

// 海信订单、零售订单用户录入详细地址，对接高德地图，搜索、解析、校验
export const getAMapV5Placeext = createAction(GET_AMAP_V5_PLACEEXT, (data: method, callback: () => void) => request({ api: 'comm/aMapV5Placeext.nd',method: 'GET', data, callback }));

// 分销商根据地址id查询联系人
export const getAddressContacts = createAction(GET_ADDRESS_CONTACTS, (data: method, callback: () => void) => request({ api: 'address/getAddressContacts.nd',method: 'GET', data, callback }));

// 保存意向用户
export const saveShopPotentialUser = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'shopPotentialUser/saveShopPotentialUser.nd',method: 'POST', type:'application/json', data, callback }));

// 获取意向标签列表
export const findLabelList = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'shopPotentialLabel/findList.nd',method: 'POST', data, callback }));

// 保存意向标签
export const saveLabelInfo = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'shopPotentialLabel/saveInfo.nd',method: 'POST', type:'application/json', data, callback }));

// 获取意向用户来源列表
export const findSourceList = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'shopPotentialSource/findList.nd',method: 'POST', data, callback }));

// 保存意向用户来源
export const saveSourceInfo = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'shopPotentialSource/saveInfo.nd',method: 'POST', type:'application/json', data, callback }));

// 字典
export const commDict = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'comm/dict.nd',method: 'GET', type:'application/json', data, callback }));

// 意向品类
export const getPotentialSpart = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'fast/userReport/potentialSpart.nd',method: 'GET', type:'application/json', data, callback }));

// 顶部商家潜在客户数量
export const getShopPotentialCustNum = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'fast/userReport/shopPotentialCustNum.nd',method: 'GET', type:'application/json', data, callback }));

// 潜在客户列表
export const getShopPotentialUser = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'fast/potential/shopPotentialUser/page.nd',method: 'GET', type:'application/json', data, callback }));

// 潜在客户明细
export const getShopPotentialHourse = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'fast/potential/shopPotentialHourse/page.nd',method: 'GET', type:'application/json', data, callback }));

// 获取意向用户详情
export const getShopPotentialUserDetail = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'shopPotentialUser/getUser.nd',method: 'POST', data, callback }));

// 销售机会
export const getShopPotentialProduct = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'fast/potential/shopPotentialProduct/page.nd',method: 'GET', type:'application/json', data, callback }));

// 购买记录
export const getShopPotentialBuyRecord = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'fast/potential/shopPotentialBuyRecord/page.nd',method: 'GET', type:'application/json', data, callback }));

// 售后记录
export const getShopPotentialAfterSales = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'fast/potential/shopPotentialAfterSales/page.nd',method: 'GET', type:'application/json', data, callback }));

// 修改意向用户
export const updateShopPotentialUser = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'shopPotentialUser/updateShopPotentialUser.nd',method: 'POST', type:'application/json', data, callback }));

// 新增房屋及家电
export const saveShopPotentialUserDetail = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'shopPotentialUserDetail/save.nd',method: 'POST', type:'application/json', data, callback }));

// 修改房屋及家电
export const updateShopPotentialUserDetail = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'shopPotentialUserDetail/update.nd',method: 'POST', type:'application/json', data, callback }));

// 删除房屋及家电
export const delShopPotentialUserDetail = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'shopPotentialUserDetail/delete.nd',method: 'POST', type:'application/json', data, callback }));

// 添加销售机会
export const saveShopPotentialProduct = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'shopPotentialProduct/save.nd',method: 'POST', type:'application/json', data, callback }));

// 删除销售机会
export const delShopPotentialProduct = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'shopPotentialProduct/delete.nd',method: 'POST', type:'application/json', data, callback }));

// 修改销售机会
export const updateShopPotentialProduct = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'shopPotentialProduct/update.nd',method: 'POST', type:'application/json', data, callback }));

// 跟进人列表
export const getFollowPeopleList = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'fast/userReport/custAccountIdDict.nd',method: 'POST', data, callback }));

// 产品模糊搜索
export const getDefevtiveProByMatkl = createAction(USER_OPERATION_PUBLIC_VARIABLE, (data: method, callback: () => void) => request({ api: 'comm/getDefevtiveProByMatkl.nd',method: 'GET', data, callback }));
