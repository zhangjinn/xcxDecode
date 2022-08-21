/*
 * @Auth: Turbo
 * @Email: 691209942@qq.com
 * @Date: 2019-09-27 14:06:04
 * @Description:
 */
import { handleActions } from 'redux-actions';
import { USER_LOGIN_ACTION, USER_LOGOUT_ACTION, USER_BIND_ACTION, USER_PERMISSIONS, USER_ALERT } from '@/store/types/user';
import {removeStorage, setStorage} from '@/utils/index';

export default handleActions({
  [USER_LOGIN_ACTION](state, action) {
    const { payload } = action;
    let accountConfirm = {};
    const { sessionid, code, account, ...rest }: any = payload;
    let user = {
      organizationList: [],
      orgAndMatklList: [],
      basePartInfo: [],
      info: {},
      customer: {},
    };
    if (sessionid) {
      user = { ...rest, info: account };
    }
    if (code === 1001) {
      accountConfirm = account;
    }
    return {
      ...state,
      ...user,
      account: accountConfirm,
    };
  },
  [USER_BIND_ACTION](state) {
    return {
      ...state
    }
  },
  [USER_LOGOUT_ACTION](state) {
    return {
      ...state,
      organizationList: [],
      orgAndMatklList: [],
      basePartInfo: [],
      info: {},
      customer: {},
      // 待确认信息的(首次登录需要)
      account: {},
    };
  },
  [USER_PERMISSIONS](state, action) {
    const { payload: { list } } = action;
    removeStorage('b2b_permission_list')
    let storeObj = {}, subMenuList = [], subPurchaseMenuList = [], reportArea = [], specialArea = [], specialAreaNameList = [];
    // 所有权限列表
    storeObj.list = list
    list.forEach(item => {
      if(item.sourceName.indexOf('首页') >= 0){
        subMenuList = item.subMenuList
      }
      if(item.sourceName === '采购中心'){
        subPurchaseMenuList = item.subMenuList
      }
    })
    if(subMenuList.find(item => item.sourceName === '报表')){
      reportArea = subMenuList.find(item => item.sourceName === '报表').subMenuList
    }
    if(subMenuList.find(item => item.sourceName === '专区')){
      specialArea = subMenuList.find(item => item.sourceName === '专区').subMenuList
    }
    specialAreaNameList = specialArea.map(item => {
      return item.sourceName
    })
    // 首页报表权限
    storeObj.reportArea = reportArea
    // 首页专区权限(如果没权限，跳转到产品采购页面时显示无权限)
    storeObj.specialArea = specialAreaNameList
    // 首页专区权限影响的产品采购权限(如果以下四个专区均无权限，点击产品采购tab时，产品采购页面显示未登陆状态下的产品列表)
    storeObj.productPurchaseAuthority = false
    if(specialAreaNameList.includes('工程专区') || specialAreaNameList.includes('特惠专区') || specialAreaNameList.includes('套购专区') || specialAreaNameList.includes('定制专区')){
      storeObj.productPurchaseAuthority = true
    }
    // 购物车权限
    storeObj.shoppingCartPermissions = false
    if(subPurchaseMenuList.find(item => item.sourceName === '购物车')){
      storeObj.shoppingCartPermissions = true
    }
    // 搜索权限
    storeObj.searchPermissions = false
    if(subPurchaseMenuList.find(item => item.sourceName === '搜索框')){
      storeObj.searchPermissions = true
    }
    // 产品采购权限(如果没有产品采购权限菜单，点击产品采购tab时，海信采购列表、渠道采购列表显示无权限，其他专区列表显示根据各专区权限)
    storeObj.generalZonePermissions = false
    if(list.find(item => item.sourceName === '产品采购')){
      storeObj.generalZonePermissions = true
    }
    setStorage('b2b_permission_list', JSON.stringify(storeObj));
    return {
      ...state,
      storePermissions: storeObj,
    };
  },
  [USER_ALERT](state, action) {
    const { payload: { list } } = action;
    removeStorage('b2b_alert')
    setStorage('b2b_alert', JSON.stringify(list));
    return {
      ...state,
      storeAlert: list,
    };
  },
}, {
  organizationList: [],
  orgAndMatklList: [],
  basePartInfo: [],
  info: {},
  customer: {},
  // 待确认信息的(首次登录需要)
  account: {},
  storePermissions: {},
  storeAlert: {},
});
