import wepy from 'wepy';
import Toast from '@/components/vant/toast/toast';
import { find, forEach, propEq,join,map} from 'ramda';
import { connect, getStore } from 'wepy-redux';
import { GET_CART_GOODS_LIST_INFO } from '@/store/types/distributorsorder';
import { request } from '@/utils/request';
import {combinationPurchaseNumberSets, MarketFormatImg,combineObjIntoAnArray} from '@/utils/index';

interface Props {
  currentPage: 'distributor' | 'my';
  item: Object;
  resource: String;
}

export default class SnappedFilter extends wepy.component {

  props: Props = {
    currentPage: String,
    item: Object,
  };
  data:{
    params:{}
  }
  methods = {

    //转单页面去付款
    goPay: (item: any) => {

      if(item.discountTypeId == '90603'){  //套购
        // const prdIds = join(',', map(({ id }: any) => id, item.slaveList));
        const buyNums = join(',', map(({ buyNum }: any) => buyNum, item.slaveList));
        const prdIds = join(',', map(({ actPro }: any) => actPro.id, item.slaveList));
        wx.navigateTo({
            url: `/pages/goods/market-activity-order/index?prdIds=${prdIds}&buyNums=${buyNums}&itemId=${item.id}&orderCodeAgain=${item.orderCode}&orgId=${item.actPro.fwOrgId}&payAgain=true&isRePay=true`
          })
      }else if(item.discountTypeId == '90605'){ // 组合购
        let prdIds1 = []
        let buyNums1 = []
        item.slaveList.forEach((item)=>{
          item.child.forEach((val)=>{
            prdIds1.push(val.actPro.id)
            buyNums1.push(val.buyNum)
          })
        })
        const prdIds2 = prdIds1.join(',')
        const buyNums2 = buyNums1.join(',')
        wx.navigateTo({
          url: `/pages/goods/market-activity-order/index?prdIds=${prdIds2}&buyNums=${buyNums2}&itemId=${item.id}&orderCodeAgain=${item.orderCode}&orgId=${item.actPro.fwOrgId}&payAgain=true&isRePay=true`
        })
      }else{
        wx.navigateTo({
          url: `/pages/goods/market-activity-order/index?prdIds=${item.actPro.id}&buyNums=${item.buyNum}&itemId=${item.id}&orderCodeAgain=${item.orderCode}&orgId=${item.actPro.fwOrgId}&payAgain=true&isRePay=true`
        })
      }
    },

    goOrder: (item: any) => {

      const transferExpireDateDesc = new Date(item.actPro.transferExpireDateDesc.replace(/-/g, "/"));
      const date = transferExpireDateDesc.getTime()
      const now = new Date().getTime()
      let buyNum = item.buyNum -(item.transNum||0)
      if(date<=now){
        item.disabledSubmit = true
      }else{
        item.disabledSubmit = false
      }
      // debugger
      if(item.disabledSubmit){
        Toast('已过期，不能转单！')
        return
      }
      if(item.transFlag==1){
        Toast('该订单已转单！')
        return
      }
      if(item.transFlag==2){
        Toast('该订单正在转单中！')
        return
      }
      if(item.transFlag==3){
        Toast('未支付订单不能转单！')
        return
      }
      if(item.transFlag==4){
        Toast('等待支付结果的订单不能转单！')
        return
      }
      //0:未转单 11:部分转单
      if(item.transFlag!==0&&item.transFlag!==11){
        Toast('只有未转单和部分转单的订单可以转单')
        return
      }
      if(item.discountTypeId == '90601' || item.discountTypeId == '90602'){
        if(buyNum<1){
          Toast('已转单！')
          return
        }
      }

      Toast.loading({
        forbidClick: true,
        message: '结算中...',
      });

      let userActId = ''
      let userActivityCode = item.orderCode

      if(item.slaveList && item.slaveList.length > 0){
        let idArr = [];
        let codeArr = [];
        if(item.discountTypeId == '90605'){ // 组合购
          item.slaveList.forEach((item)=>{
            item.child.forEach((val)=>{
              idArr.push(val.id)
              codeArr.push(item.orderCode)
            })
          })
        }else if(item.discountTypeId == '90603'){ // 套购
          for (const e of item.slaveList) {
            idArr.push(e.id);
          }
        }
        userActId = idArr.join(',')

      }else{
        //非套购
        userActId = item.id
      }

      request({ api: `marketActivity/actToOrderInit.nd?userActId=${userActId}`, method: 'POST'}).then(res => {
        if (res.isFenXiao=='Y') {
          const item =this.item.actPro

          const dmsGoods = res.activityList.map(pro=>{
            return {
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
              retainer:pro.deposit!=null ? pro.deposit : '',// 定金
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
            packageMainNum:res.mainOrderCode || '',//套购主单号
            orgCode: dmsGoods[0].orgIg,//暂时没有
            supplierId: agentName[0],//暂时没有
            matklId: res.matklId,
            supplierIdName: agentName[1],//暂时没有
            purchaseOrderItem:dmsGoods ,
            totalVolume: dmsGoods[0].volume,

          }
          getStore().dispatch({ type: GET_CART_GOODS_LIST_INFO, payload: item2 })
          Toast.clear();

          wx.navigateTo({
            url: `/pages/goods/distributors-order/index` + '?shareFlag=' + 'Y'+ '&activityName=' +item.activityName + '&activityNum=' +item.activityId+'&userActId=' + userActId+'&userActivityCode=' + userActivityCode
          })
        }else{

          wx.navigateTo({
            url: `/pages/goods/activity-order/index?userActId=${userActId}`
          })
        }
      })
    }
  }
}
