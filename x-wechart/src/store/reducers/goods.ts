import { handleActions } from 'redux-actions';
import { map, forEachObjIndexed, isEmpty, split, head, last, trim, divide, multiply, subtract, min } from 'ramda';
import { GET_GOODS_INFO, GET_GOODS_PRICE, RESET_GOODS_INFO, GET_GOODS_PROMOTION, GET_GOODS_MODEL, GET_MODEL_GOODS_INFO } from '@/store/types/goods';
import { formatImg, getDateDiff, getDateRange, formatDate } from '@/utils/index';

interface PromotionParams {
  purchaseQty: number;
  qty: number;
  canBuy: string;
  custPurchaseQty: number;
  endDate: string;
  startDate: string;
  pause: string;
  purchaseLimitQty: number;

}

export default handleActions({
  [GET_GOODS_PROMOTION](state, action) {
    const { payload }: any = action;
    // console.log('****');
    // console.log(payload);
    let promotion = {};
    if (payload.code === 0 && payload.status) {
      const { detail: { deposit,activityCode, activityId, activityName, activityType, matklId, standardPrice, billPrice, status: detailStatus, purchaseMinLimitQty }, status }: any = payload;
      /* pause: 是否暂停 Y暂停
      *  总数量: qty
      *  purchaseQty	活动总的已参与数量
      *  purchaseLimitQty	商家限制数量
      *  custPurchaseQty	当前账号参数数量
      */
      const { custPurchaseQty, endDate, pause, purchaseLimitQty, purchaseQty, qty, startDate }: PromotionParams = status;
      // 购买进度
      const percent = multiply(divide(purchaseQty, qty), 100) || 0;
      // 当前剩余数量
      const nowCount = subtract(qty, purchaseQty);
      // 最多购买数量
      // debugger
      const canBuyCount = min(nowCount, purchaseLimitQty - custPurchaseQty);
      // 活动状态
      const now: string = formatDate();
      let currentStatus = getDateRange(startDate, now, endDate);
      // 倒计时
      let timer = 0;
      // 开抢时间
      let timerStr = '';
      switch (currentStatus) {
        case 'next':
          timer = +new Date(startDate.replace(/-/g, '/')) - (+new Date());
          timerStr = formatDate(startDate, 'M月D日h点m分');
          break;
        case 'current':
          timer = +new Date(endDate.replace(/-/g, '/')) - (+new Date());
          break;
        default:
          break;
      }

      if (pause === 'Y' && currentStatus !== 'prev') {
        currentStatus = 'pause';
      }
      // 判断是否已经
      // debugger
      promotion = {
        qty,
        timer,
        timerStr,
        deposit,
        currentStatus,
        currentTime: formatDate(),
        standardPrice,
        billPrice,
        activityId,
        activityCode,
        activityName,
        activityType,
        matklId,
        percent,
        nowCount,
        canBuyCount,
        custPurchaseQty,
        purchaseLimitQty,
        startAt: formatDate(startDate, 'Y.M.D'),
        endAt: formatDate(endDate, 'Y.M.D'),
        detailStatus,
        canBuy: payload.canBuy,
        code: payload.code,
        purchaseMinLimitQty,
      };
    }
    return {
      ...state,
      promotion,
    };
  },
  [RESET_GOODS_INFO](state) {
    return {
      ...state,
      price: {},
      product: {},
      attrs: [],
      infoList: {},
      banners: [],
      policies: [],
      promotion: {},
    };
  },
  [GET_GOODS_INFO](state, action) {
    const { payload } = action;
    const { product, filedMap, infoList, pictures, versionList }: any = payload;
    let goods = {};
    let banners: any = [];
    let skus: any = [];
    const attrs: any = [];
    if (product && product.id) {
      const { materialGroup, picture } = product;
      // 轮播数据处理
      if (pictures && pictures.length > 0) {
        banners = map(({ pictureName }) => formatImg({
          name: pictureName,
          format: '650-650',
          itemId: product.id,
          materialId: materialGroup,
        }), pictures);
      } else {
        banners = [formatImg({ name: `${product.materialGroup}.jpg` })];
      }

      // 商品属性上添加如果所有banner图片均不可用，设置成此默认的
      product.errImg = formatImg({ name: `${product.materialGroup}.jpg` })
      // sku 主图处理
      product.attrImg = formatImg({
        name: picture,
        format: '180-180',
        itemId: product.id,
        materialId: materialGroup,
      });
      // 规格参数处理
      if (filedMap && !isEmpty(filedMap)) {
        forEachObjIndexed((value, key) => {
          const item: any = { label: key, child: [] };
          item.child = map((item) => {
            const attrArr = split(' : ', item);
            const attrKey = trim(head(attrArr));
            const attrValue = trim(last(attrArr));
            return { attrKey, attrValue };
          }, value);
          attrs.push(item);
        }, filedMap);
      }
      // sku 列表
      if (infoList && infoList.length > 0) {
        skus = map(({ id, color }) => ({
          id,
          color,
        }), infoList);
      }
      goods = {
        ...state,
        product,
        attrs,
        infoList: skus,
        banners,
        policies: versionList || [],
      };
    }
    return goods;
  },
  [GET_GOODS_PRICE](state, action) {
    const { payload } = action;
    return {
      ...state,
      price: payload,
    };
  },
  [GET_GOODS_MODEL](state, action) {
    const { payload } = action;
    return {
      ...state,
      goods: payload,
    };
  },
  [GET_MODEL_GOODS_INFO](state, action) {
    const { payload } = action;
    const { product, filedMap, infoList, pictures, versionList,modelInfo }: any = payload;
    let goods = {};
    let banners: any = [];
    let skus: any = [];
    const attrs: any = [];
    if (product && product.id) {
      const { materialGroup, picture } = product;
      // 轮播数据处理
      if (pictures && pictures.length > 0) {
        banners = map(({ pictureName }) => formatImg({
          name: pictureName,
          format: '650-650',
          itemId: product.id,
          materialId: materialGroup,
        }), pictures);
      } else {
        banners = [formatImg({ name: `${product.materialGroup}.jpg` })];
      }

      // 商品属性上添加如果所有banner图片均不可用，设置成此默认的
      product.errImg = formatImg({ name: `${product.materialGroup}.jpg` })
      // sku 主图处理
      product.attrImg = formatImg({
        name: picture,
        format: '180-180',
        itemId: product.id,
        materialId: materialGroup,
      });
      // 规格参数处理
      if (filedMap && !isEmpty(filedMap)) {
        forEachObjIndexed((value, key) => {
          const item: any = { label: key, child: [] };
          item.child = map((item) => {
            const attrArr = split(' : ', item);
            const attrKey = trim(head(attrArr));
            const attrValue = trim(last(attrArr));
            return { attrKey, attrValue };
          }, value);
          attrs.push(item);
        }, filedMap);
      }
      // sku 列表
      if (infoList && infoList.length > 0) {
        skus = map(({ id, color }) => ({
          id,
          color,
        }), infoList);
      }
      goods = {
        ...state,
        product,
        attrs,
        infoList: skus,
        banners,
        policies: versionList || [],
        modelInfo,
      };
    }
    return goods;
  },


}, {
  promotion: {},
  price: {},
  product: {},
  attrs: [],
  infoList: {},
  banners: [],
  policies: [],
  goods: []
});
