/*
 * @Auth: Turbo
 * @Email: 691209942@qq.com
 * @Date: 2019-09-27 14:06:04
 * @Description:
 */
import { handleActions } from 'redux-actions';
import { forEach } from 'ramda';
import { GET_AUDIT_ORDERS, GET_AUDIT_ORDER_DETAIL } from '@/store/types/audit-order';
import { formatImg, convertCurrencyAmt } from '@/utils/index';

export default handleActions({

  [GET_AUDIT_ORDERS](state, action) {
    const { payload: { orderHeaderList } }: any = action;
    forEach(({ items }: any) => {
      forEach((item: any) => {
        if (item.img) {
          const imgs: any = item.img.split('/');
          item.img = formatImg({
            format: imgs[2],
            name: imgs[3],
            materialId: imgs[0],
            itemId: imgs[1],
          });
        }

        if (item.defaultImg) {
          const imgs = item.defaultImg.split('/');
          item.errImg = formatImg({
            name: imgs[imgs.length - 1],
          });
        }
      }, items || []);
    }, orderHeaderList || []);
    return {
      ...state,
      items: orderHeaderList || [],
    };
  },
  [GET_AUDIT_ORDER_DETAIL](state, action) {
    const { payload }: any = action;
    let totalPrice = 0;
    if (payload.orderLines && payload.orderLines.length > 0) {
      forEach((item: any) => {
        totalPrice += item.billPrice * item.qty;
        if (item.img) {
          const imgs: any = item.img.split('/');
          item.img = formatImg({
            format: imgs[2],
            name: imgs[3],
            materialId: imgs[0],
            itemId: imgs[1],
          });
        }
        if (item.defaultImg) {
          const imgs = item.defaultImg.split('/');
          item.errImg = formatImg({
            name: imgs[imgs.length - 1],
          });
        }
      }, payload.orderLines || []);
    }
    payload.totalPrice = convertCurrencyAmt(totalPrice) || 0.00;
    return {
      ...state,
      order: payload,
    };
  },
}, {
  order: {
    orderHeader: {},
    orderLines: [],
  },
  items: [],
});
