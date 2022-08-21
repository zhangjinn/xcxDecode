import { VantComponent } from '@/components/vant/common/component'
import { forEach, map, propEq, findIndex, join } from 'ramda';
import Toast from '@/components/vant/toast/toast';
import {request} from "@/utils/request";
import {MarketFormatImg} from "@/utils/index";
import {getStore} from "wepy-redux";
import {GET_CART_GOODS_LIST_INFO} from "@/store/types/distributorsorder";

VantComponent({
  props: {
    timestatus: String, // 1 未开始 2 进行中 3 已结束
    containerItem: Object, // 具体商品信息
  },
  data: {
    show: true,
    allGoodsInfo: [],
  },

  methods: {
    // 抢购去下单  跳转下单页
    submitOrder(e: { currentTarget: { dataset: { setpurchase: any; }; }; }) {
      const { allGoodsInfo } = this.data
      const discountTypeName = this.data.containerItem.discountTypeName
      const custId = this.data.containerItem.custId

      if(discountTypeName=='套购'||discountTypeName=='跨品类套购' || discountTypeName=='组合购'){
        let { productDtoList,orgDict,fwOrgId } = this.data.containerItem
        if(e.currentTarget.dataset && e.currentTarget.dataset.setpurchase){
          productDtoList = e.currentTarget.dataset.setpurchase
        }


        if(discountTypeName=='组合购'){
          let combinationPurchaseList = []
          if(e.currentTarget.dataset && e.currentTarget.dataset.setpurchase){
            e.currentTarget.dataset.setpurchase.forEach((item)=>{
              item.child.forEach((val)=>{
                combinationPurchaseList.push(val)
              })
            })
          }
          productDtoList = combinationPurchaseList
        }

        const prdIds = join(',', map(({ id }: any) => id, productDtoList));
        let buyNums = join(',', map(({ packageNum }: any) => packageNum, productDtoList));
        if(discountTypeName=='组合购'){
          buyNums = join(',', map(() => 0, productDtoList));
        }

        // custId有值为代理商活动，需要跳转到下单页
        if(custId){
          Toast.loading({
            forbidClick: true,
            message: '加载中...'
          })
          request({
            api: `marketActivity/settlement.nd?prdIds=${prdIds}&buyNums=${buyNums}&orgId=${fwOrgId}`,
            method: 'POST',
            type: 'application/x-www-form-urlencoded'
          }).then(res => {

            let buyNum = 0

            const dmsGoods = res.activityList.map(pro=>{
              return {
                id: pro.id,
                activityName: pro.activityName,
                activityId: pro.activityId,
                productCode: pro.productInfoId,
                productName: pro.productName,
                src: pro.img ? MarketFormatImg({ img: pro.img }) : pro.img,
                errImg: pro.defaultImg ? MarketFormatImg({ defaultImg: pro.defaultImg }) : pro.defaultImg,
                model: pro.productInfoZzprdmodel,
                colour: pro.color,
                invStatusId: '', // 库存状态id
                priceId: '', // 价格id
                price: pro.billPrice, // 价格
                orderedQty: buyNum || 1,
                cartId: '',//暂时没有
                loadVolume: pro.volume,  //产品体积
                orgIg:pro.fwOrgId,   //组织id
                fwOrgName:pro.fwOrgName,   //组织id
                retainer:pro.deposit || '', //定金
                discountTypeId:pro.discountTypeId || '',//促销方式 id
                discountTypeName:pro.discountTypeName || '',//促销方式
                custTag:pro.custTag || '',//商家标签
                packageCode:pro.packageCode || '',//套购编码
                rebateMoney:pro.rebateMoney || '',//返利金额
                packageNum:pro.packageNum || '',//每套多少个
                buyNum,
                defaultNum:pro.packageNum ? buyNum/pro.packageNum : '',//默认套数
                activityCode:pro.activityCode, //单号
                productGroupRemark:pro.productGroupRemark,
                productGroup:pro.productGroup,
                productInfoZzprdmodel:pro.productInfoZzprdmodel,
                quantity: pro.buyQty,
                maxQty: pro.buyQty,
                buyQty: pro.buyQty, // 每个型号购买数量
                totalNum: pro.totalNum, // 购买总数量
                priceGroupName: pro.priceGroupName,
                orderCode: pro.orderCode,

              }
            })
            const agentName = res.agentName.split('-')
            // 模拟数据
            const item2 = {
              // packageMainNum:res.mainOrderCode || '',//套购主单号
              orgCode: res.orgId,//暂时没有
              supplierId: agentName[0],//暂时没有
              matklId: res.matklId, //物料组
              supplierIdName: agentName[1],//暂时没有
              purchaseOrderItem:dmsGoods,
              totalVolume: dmsGoods[0].volume,
            }
            getStore().dispatch({ type: GET_CART_GOODS_LIST_INFO, payload: item2 })

            wx.navigateTo({
              url: `/pages/goods/distributors-order/index?shareFlag=Y&activityName=${dmsGoods[0].activityName}&activityNum=${dmsGoods[0].activityId}&userActId=${prdIds}&custId=${custId}`
            })

            Toast.clear()
          })

        }else{
          wx.navigateTo({
            url: `/pages/goods/activity-order/index?prdIds=${prdIds}&buyNums=${buyNums}&orgDict=${JSON.stringify(orgDict)}`
          })
        }

        return
      }
      if (allGoodsInfo.length == 0 || findIndex(propEq('itemSelect', true), allGoodsInfo) == -1) {
        Toast.fail('请选择商品')
      } else {

        // TODO: 下单页我需要的所有数据
        const relArr: any = []
        forEach((item: any) => {
          if (item.itemSelect) {
            relArr.push(item)
          }
        }, allGoodsInfo)
        const prdIds = join(',', map(({ id }: any) => id, relArr));
        const buyNums = join(',', map(({ number }: any) => number, relArr));
        const { orgDict, fwOrgId } = this.data.containerItem

        // custId有值为代理商活动，需要跳转到下单页
        if(custId){
          Toast.loading({
            forbidClick: true,
            message: '加载中...'
          })
          request({
            api: `marketActivity/settlement.nd?prdIds=${prdIds}&buyNums=${buyNums}&orgId=${fwOrgId}`,
            method: 'POST',
            type: 'application/x-www-form-urlencoded'
          }).then(res => {

            const dmsGoods = res.activityList.map(pro=>{
              return {
                id: pro.id,
                activityName: pro.activityName,
                activityId: pro.activityId,
                productCode: pro.productInfoId,
                productName: pro.productName,
                src: pro.img ? MarketFormatImg({ img: pro.img }) : pro.img,
                errImg: pro.defaultImg ? MarketFormatImg({ defaultImg: pro.defaultImg }) : pro.defaultImg,
                model: pro.productInfoZzprdmodel,
                colour: pro.color,
                invStatusId: '', // 库存状态id
                priceId: '', // 价格id
                price: pro.billPrice, // 价格
                orderedQty: pro.buyQty || 1,
                cartId: '',//暂时没有
                loadVolume: pro.volume,  //产品体积
                orgIg:pro.fwOrgId,   //组织id
                fwOrgName:pro.fwOrgName,   //组织id
                retainer:pro.deposit,
                discountTypeId:pro.discountTypeId || '',//促销方式 id
                discountTypeName:pro.discountTypeName || '',//促销方式
                custTag:pro.custTag || '',//商家标签
                packageCode:pro.packageCode || '',//套购编码
                rebateMoney:pro.rebateMoney || '',//返利金额
                packageNum:pro.packageNum || '',//每套多少个
                buyNum:pro.buyQty,
                defaultNum:pro.packageNum ? pro.buyQty/pro.packageNum : '',//默认套数
                activityCode:pro.activityCode, //单号
                productGroupRemark:pro.productGroupRemark,
                productGroup:pro.productGroup,
                productInfoZzprdmodel:pro.productInfoZzprdmodel,
                quantity: pro.buyQty,
                maxQty: pro.buyQty,
                buyQty: pro.buyQty, // 每个型号购买数量
                totalNum: pro.totalNum, // 购买总数量
                priceGroupName: pro.priceGroupName,
                orderCode: pro.orderCode,

              }
            })
            const agentName = res.agentName.split('-')
            // 模拟数据
            const item2 = {
              // packageMainNum:res.mainOrderCode || '',//套购主单号
              orgCode: res.orgId,//暂时没有
              supplierId: agentName[0],//暂时没有
              matklId: res.matklId, //物料组
              supplierIdName: agentName[1],//暂时没有
              purchaseOrderItem:dmsGoods ,
              totalVolume: dmsGoods[0].volume,
            }
            getStore().dispatch({ type: GET_CART_GOODS_LIST_INFO, payload: item2 })

            wx.navigateTo({
              url: `/pages/goods/distributors-order/index?shareFlag=Y&activityName=${dmsGoods[0].activityName}&activityNum=${dmsGoods[0].activityId}&userActId=${prdIds}&custId=${custId}`
            })
            Toast.clear()
          })

        }else{
          wx.navigateTo({
            url: `/pages/goods/activity-order/index?prdIds=${prdIds}&buyNums=${buyNums}&orgDict=${JSON.stringify(orgDict)}`
          })
        }
      }
    },
    // 认购去下单  跳转下单页
    submitMarketOrder(e: { currentTarget: { dataset: { setpurchase: any; }; }; }) {

      let { productDtoList,orgDict,discountTypeName } = this.data.containerItem

      if(discountTypeName=='套购'||discountTypeName=='跨品类套购'){
        if(e.currentTarget.dataset && e.currentTarget.dataset.setpurchase){
          productDtoList = e.currentTarget.dataset.setpurchase
        }
      }

      if(discountTypeName=='组合购'){
        let combinationPurchaseList = []
        if(e.currentTarget.dataset && e.currentTarget.dataset.setpurchase){
          e.currentTarget.dataset.setpurchase.forEach((item)=>{
            item.child.forEach((val)=>{
              combinationPurchaseList.push(val)
            })
          })
        }
        productDtoList = combinationPurchaseList
      }

      if (productDtoList.length == 0) {
        Toast.fail('当前活动没有商品可以购买！')
      } else {
        const prdIds = join(',', map(({ id }: any) => id, productDtoList));
        let buyNums = join(',', map(({ packageNum }: any) => packageNum, productDtoList));
        if(discountTypeName=='组合购'){
          buyNums = join(',', map(() => 0, productDtoList));
        }

        wx.navigateTo({
          url: `/pages/goods/market-activity-order/index?prdIds=${prdIds}&buyNums=${buyNums}&orgDict=${JSON.stringify(orgDict)}`
        })
      }
    },
    // 接受子组件emit上来的商品信息
    goodInfo(e: { detail: { id: any; }; }) {
      const { allGoodsInfo } = this.data
      let allGoodsInfoArr = map((item) => item, allGoodsInfo)
      const newItem = findIndex(propEq('id', e.detail.id), allGoodsInfoArr)
      if (newItem == -1) {
        allGoodsInfoArr.push(e.detail)
      } else {
        allGoodsInfoArr[newItem] = e.detail
      }
      this.setData({
        allGoodsInfo: allGoodsInfoArr
      })
    },
    closeItUp() {
      this.setData({
        show: !this.data.show
      })
    },
    goNext(e: { currentTarget: { dataset: { url: any; }; }; }) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    },
    imgLose({ detail }: any) {
      this.$emit('imgLose', detail)
    },

    changeModel({ detail }: any){
      this.$emit('changeModel', detail)
    },

    // 打开组合购更多型号弹框
    showMoreModel({ detail }: any){
      this.$emit('showMoreModel', detail)
    }

  }
})
