import { handleActions } from 'redux-actions';
import { forEach, is, map, forEachObjIndexed, isEmpty, update, findIndex, find, propEq, remove } from 'ramda';
import {
  GET_CART_COUNT, GET_CART_LIST, GET_CART_STOCK_LIST,
  GET_CART_POLICY_ITEM, RESET_CART_ITEM_POLICY,
  UPDATE_CART_ITEM_COUNT, REMOVE_CART_ITEM, GET_CART_PRICE_LIST,
  RESET_CART_ITEM_QUANTITY,GET_CART_SUPPLY_AND_ITEM_GROUP,
  GET_DMS_PRIDE_AND_ID,GET_CART_DMS_STOCK_LIST
} from '@/store/types/cart';
import { formatImg } from '@/utils/index';

const getDiscount = (fixedDiscount: string) => {
  const discountStr: any = (100 - parseFloat(fixedDiscount)) / 100;
  const discount = parseFloat(discountStr);
  return discount;
};

export default handleActions({
  [GET_DMS_PRIDE_AND_ID](state, action) {
    const { payload }: any = action;
    const { list } = state;
    const items = []
    if(list && list.length > 0) {
       items = map(({ productId, quantity, ...rest }: any) => {
        const item = find(propEq('productId',productId ), payload.list) || {};
        if(item.standardPrice == -1) {
          item.dmsIsSell = false
        } else {
          item.dmsIsSell = true
        }
        return { ...rest, ...item, productId, quantity };
      }, list);
    }
    return {
      ...state,
      list: items,
    };
  },
  [GET_CART_SUPPLY_AND_ITEM_GROUP] (state, action) {
    const { payload } = action
    const orgList = []
    forEach((item) => {
      const Item = {
        key: item.code,
        value: item.name,
        type: item.type,
        child: item.child,
      }
      orgList.push(Item)
    },payload.list)
    return {
      ...state,
      orgList,
    }
  },
  [RESET_CART_ITEM_QUANTITY] (state, action) {
    const { list } = state
    return {
      ...state,
      list: {...list}
    }
  },
  [GET_CART_COUNT](state, action) {
    const { payload }: any = action;
    let num: number = 0;
    if (is(Number, payload) && payload > 0) {
      num = payload;
    }
    return {
      ...state,
      num,
    };
  },
  [REMOVE_CART_ITEM](state, action) {
    const { payload: { res, cartId, cartIds } }: any = action;
    const { list } = state;
    let items: any = list;
    if (res === 'Y') {
      if (cartId) {
        const index = findIndex(propEq('id', cartId), list);
        if (index >= 0) {
          items = remove(index, 1, list);
        }
      } else {
        let ids = cartIds.split(',')
        items = list.filter(value => {
          let re = true;
          ids.forEach(res => {
            if (+res === value.id) {
              re = false;
              return;
            }
          })
          return re;
        })
      }
    }

    return {
      ...state,
      list: items,
    };
  },
  [UPDATE_CART_ITEM_COUNT](state, action) {
    const { payload: { res, cartId, quantity } }: any = action;
    const { list } = state;
    let quantityList: any = list;
    if (res === 'Y') {
      const index = findIndex(propEq('id', cartId), list);
      if (index >= 0) {
        const item: any = list[index];
        item.quantity = quantity;
        quantityList = update(index, item, list);
      }
    }
    return {
      ...state,
      list: quantityList,
    };
  },
  [RESET_CART_ITEM_POLICY](state, action) {
    const { payload }: any = action;
    const { list } = state;
    const index = findIndex(propEq('productCode', `${payload.productCode}`), list);
    let policyList: any = list;
    if (index >= 0) {
      const item: any = list[index];
      delete item.policy;
      policyList = update(index, item, list);
    }
    return {
      ...state,
      list: policyList,
    };
  },
  [GET_CART_POLICY_ITEM](state, action) {
    const { payload }: any = action;
    const { list } = state;
    let policyList: any = list;
    if (payload.pricingGroupName) {
      const { productId, fixedDiscount, policy, pricingGroupName, makeUpType } = payload;
      const index = findIndex(propEq('productCode', `${productId}`), list);
      if (index >= 0) {
        const item: any = list[index];
        const { price } = policy;
        const discount = getDiscount(fixedDiscount);
        policy.makeUpType = makeUpType;
        item.policy = {
          ...policy,
          fixedDiscount,
          pricingGroupName,
          policyDiscount: discount, // 计算出来的折扣
          policyPrice: (price * discount).toFixed(2), // 计算完的单价
          policyTotalPrice: ((price * item.quantity) * discount).toFixed(2), // 当前商品的总价
        };
        policyList = update(index, item, list);
      }
    }
    return {
      ...state,
      list: policyList,  // 由于数据重组list取值错误，该代码块无效；重新赋值list代码已移到cart/index.ts中
    };
  },
  [GET_CART_STOCK_LIST](state, action) {
    const { payload }: any = action;
    const { list } = state;
    const items = map(({ productId, ...rest }: any) => {
      const item = find(propEq('productCode', `${productId}`), payload) || {};
      return { ...rest, ...item, productId };
    }, list);
    return {
      ...state,
      list: items,
    };
  },
  //获取 DMS库存
  [GET_CART_DMS_STOCK_LIST](state, action) {
    const { payload }: any = action;
    const { list } = state;
    const items = map(({ productId, ...rest }: any) => {
      const item = find(propEq('productCode', `${productId}`), payload) || {};
      return { ...rest, ...item, productId };
    }, list);
    return {
      ...state,
      list: items,
    };
  },
  // [GET_CART_PRICE_LIST](state, action) {
  //   const { payload }: any = action;
  //   const { list } = state;
  //   const items = map(({ productId, quantity, ...rest }: any) => {
  //     const item = find(propEq('productCode', `${productId}`), payload) || {};
  //     if (item && item.productCode) {
  //       const { fixedDiscount, price, standardPrice }: any = item;
  //       const discount = getDiscount(fixedDiscount);
  //       item.discount = discount; // 计算出来的折扣
  //       item.discountPrice = (price * discount).toFixed(2); // 计算完的单价
  //       item.totalPrice = ((price * quantity) * discount).toFixed(2); // 当前商品的总价
  //       // 处理购买逻辑: isSell 为 Y 而且standardPrice必须大于 0 才能购买
  //       item.isSell = rest.isSell && standardPrice >= 0;
  //     }
  //     return { quantity, ...rest, ...item, productId };
  //   }, list);
  //   return {
  //     ...state,
  //     list: items,
  //   };
  // },
  [GET_CART_PRICE_LIST](state, action) {
    const { payload }: any = action;
    const { list } = state;
    const items = map(({ productId, quantity, ...rest }: any) => {
      const item = find(propEq('productCode', `${productId}`), payload) || {};
      if (item && item.productCode) {
        const { fixedDiscount, price, standardPrice, loadVolume }: any = item;
        const discount = getDiscount(fixedDiscount);
        item.discount = discount; // 计算出来的折扣
        item.discountPrice = (price * discount).toFixed(2); // 计算完的单价
        item.totalPrice = ((price * quantity) * discount).toFixed(2); // 当前商品的总价
        // item.loadVolume = loadVolume ? loadVolume.toFixed(2) : '0.00'; // 计算完的体积
        // item.discountLoadVolume = loadVolume ? loadVolume.toFixed(2) : '0.00'; // 计算完的体积
        // item.totalVolume = item.discountLoadVolume ? (item.discountLoadVolume * quantity).toFixed(2) : '0.00'; // 当前商品的体积
        // 处理购买逻辑: isSell 为 Y 而且standardPrice必须大于 0 才能购买
        item.isSell = rest.isSell && standardPrice >= 0;
      }
      return { quantity, ...rest, ...item, productId };
    }, list);
    return {
      ...state,
      list: items,
    };
  },
  [GET_CART_LIST](state, action) {
    const { payload }: any = action;
    let list: any = [];
    let orgName = '请选择';
    let orgAndGroupId = '';
    const orgAndGroups: any = [];
    const policies: any = {};
    if (!isEmpty(payload) && payload.cartDTOs) {
      const { orgAndGroupMap, cartDTOs, orgAndGroup, policyMap } = payload;
      // 商品列表
      list = map(({ id, productName, agentCisCode, agentCode, agentName, productId, productLabel, fullName, isSell, quantity, color, orgId, orgName, orgCode, materialGroup, materialGroupId, materialGroupName, picture, purchaseType,loadVolume,shareFlag,agentShareFlag }) => ({
        id,
        productId,
        productLabel,
        name: productName,
        quantity,
        fullName,
        color,
        orgId,
        orgName,
        orgCode,
        agentCisCode,
        agentCode,
        agentName,
        purchaseType,
        shareFlag,
        agentShareFlag,
        materialGroupId,
        materialGroupName,
        isSell: isSell === 'Y',
        img: formatImg(picture ? {
          format: '180-180',
          name: picture,
          materialId: materialGroup,
          itemId: productId,
        } : {
          name: `${materialGroup}.jpg`,
        }),
        errImg: formatImg({
          name: `${materialGroup}.jpg`,
        }),
        loadVolume:loadVolume ? loadVolume.toFixed(3) : '0.000'
      }), cartDTOs);
      // 供应商列表

      if (!isEmpty(orgAndGroupMap)) {
        orgName = orgAndGroupMap[orgAndGroup] || '请选择';
        orgAndGroupId = orgAndGroup;
        forEachObjIndexed((value, key) => {
          orgAndGroups.push({ key, value });
        }, orgAndGroupMap);
      }
      // 政策列表
      forEachObjIndexed((value, key) => {
        // 如果当前选的这个
        policies[key] = map(({ id, versionCode, policyName, standardPrice, price, discount, reduce, total, remain, canQuantity }) => ({
          id, versionCode, policyName, standardPrice, price, discount, reduce, total, remain, canQuantity,
        }), value);
      }, policyMap);
    }

    return {
      ...state,
      list,
      orgName, // 没用到
      orgAndGroups, // 没用到
      orgAndGroupId, // 没用到
      policies,
    };
  },
}, {
  num: 0,
  list: [],
  totalPrice: 0,
  orgAndGroupId: '',
  orgAndGroups: [],
  policies: {},
  orgName: '请选择',
  orgList: [],
});
