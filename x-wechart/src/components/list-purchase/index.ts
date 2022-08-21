
// 在主页面引入van-toast !!!

  // productCode 商品id
  // orgId 组织id
  // orgCode 组织编码
  //
  // 跳转至商品详情: /goods/item/index?code={{id}}&orgId={{orgId}}&orgCode={{orgCode}}

  // img  主图
  // errImg 备用图
  // orgName 组织名称
  // inventory 库存数量
  // loadingInventory 是否需要loading库存信息
  // autoLoadingInventory 是否自动loading库存

  // b2bName 商品名称
  // importInfo 副标题 空会自动设成''

  // price 价格
  // loadingPrice 是否loading价格
  // autoLoadingPrice 是否自动loading价格

  // collection boolean 是否已经收藏

import { VantComponent } from '../vant/common/component'
import { request } from '../../utils/request';
import Toast from '../vant/toast/toast';
import { length, map, is } from 'ramda';

// 自定义图片样式，传入custom-class
// 图片返回错误以后，如果有默认的图片，则替换成默认图片，并emit一个事件，上层根据事件进行相应处理
// emit 时，会将flag和src传递上去
VantComponent({
  props: {
    item: Object,
    lazyLoad: Boolean,
    hiddenCollecion: Boolean
  },

  watch: {
    'item': function(item) {
      if (item.loadingPriceOver || item.loadingInventoryOver) {
        // 已经执行过loading
        return
      }
       // const data = { code: item.id, orgId: item.orgId, orgCode: item.orgCode }
      //     const priceRes: any = await request({ api: 'product/getPrices.nd', method: 'POST', data });
      //     const stockRes: any = await request({ api: 'product/getStocks.nd', method: 'POST', data });
      //     let prices: any = [];
      //     let stocks: any = [];
      //     if (is(Array, priceRes) && length(priceRes) > 0) {
      //       prices = map(({ productCode, fixedDiscount, makeUpType, price, standardPrice, pricingGroupName }) => ({
      //         productCode, fixedDiscount, makeUpType, price, standardPrice, pricingGroupName,
      //       }), priceRes);
      //     }
      //     if (is(Array, stockRes) && length(stockRes) > 0) {
      //       stocks = map(({ productCode, inventory }) => ({ productCode, inventory }), stockRes);
      //     }
      //     item.prices = prices
      //     item.stocks = stocks
      const context = this
      const data = { code: item.productCode, orgId: item.orgId, orgCode: item.orgCode }
      if (item.autoLoadingPrice) {
        if (item.loadingPrice) {
          request({ api: 'product/getPrices.nd', method: 'POST', data }).then((res: any) => {
            if (is(Array, res) && length(res) > 0) {
              const prices = map(({ productCode, fixedDiscount, makeUpType, price, standardPrice, pricingGroupName }) => ({
                productCode, fixedDiscount, makeUpType, price, standardPrice, pricingGroupName,
              }), res);
              item = {
                ...item,
                loadingPrice: false,
                loadingPriceOver: true,
                price: prices[0].price
              }
              context.setData({
                item: item
              })
            }
          })
        }
      }

      if(item.autoLoadingInventory) {
        if (item.loadingInventory) {
          request({ api: 'product/getStocks.nd', method: 'POST', data }).then((res: any) => {
            if (is(Array, res) && length(res) > 0) {
              const stocks = map(({ productCode, inventory }) => ({ productCode, inventory }), res);
              item = {
                ...item,
                loadingInventory: false,
                loadingInventoryOver: true,
                inventory: stocks[0].inventory
              }
              context.setData({
                item: item
              })
            }
          })
        }
      }

    }
  },

  created() {
  },

  methods: {
    // 添加/取消收藏
    async toggleCollection() {
      const { item } = this.data
      const data = { orgId: item.orgId, id: item.productCode };

      try {
        const res: any = await request({ api: item.collection ? 'oftenProduct/deleteOftenProduct.nd' : 'oftenProduct/addOftenProduct.nd', method: 'POST', data });

        if (item.collection) {
          if (res && res.status == "true") {
            Toast.success({
              message: '取消收藏成功',
              duration: 1000,
            });
            this.setData({
              item: {
                ...item,
                collection: !item.collection
              }
            })
            this.$emit('toggle-collection', item)
          } else {
            Toast.fail('取消失败');
          }
        } else {
          // addOftenProduct
          if (res && res == 'Y') {
            Toast.success({
              message: '收藏成功',
              duration: 1000,
            });
            this.setData({
              item: {
                ...item,
                collection: !item.collection
              }
            })
            this.$emit('toggle-collection', item)
          } else {
            Toast.fail('收藏失败');
          }
        }
      } catch (error) {
        Toast.fail(item.collection ? '取消失败' : '收藏失败');
      }
    },

    goods() {
      const { item } = this.data

      wx.navigateTo({
        url: `/pages/goods/item/index?code=${item.productCode}&orgId=${item.orgId}&orgCode=${item.orgCode}`,
      })
    },
    async addCart() {
      const { item } = this.data
      const data = { orgId: item.orgId, productId: item.productCode, num: 1 };
      try {
        const res = await request({ api: 'cart/addToCart.nd', data });
        if (res) {
          Toast.success({
            message: '添加成功',
            duration: 2000
          });
        } else {
          Toast.success({
            message: '添加失败',
            duration: 2000
          });
        }
      } catch (error) {
        Toast.fail('购物车添加失败');
      }
    },

    imgLose({ detail }: any) {
      this.$emit('img-lose', detail)
    }
  },


})
