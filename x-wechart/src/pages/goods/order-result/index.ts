import wepy from 'wepy';
import { getStore } from 'wepy-redux';
import { GET_CART_GOODS_LIST_INFO } from '@/store/types/distributorsorder';
import { request } from '@/utils/request'
import { MarketFormatImg } from "@/utils/index";
import Toast from '@/components/vant/toast/toast'

interface Data {
  type: string;
  orderNum: string;
  errorMsg: string;
  sys: any;
  orderType: any;
  goWhere: any;
  activity: any;
  sales: any;
  transferOrderId: any;
}

const { top, height } = wx.getMenuButtonBoundingClientRect();

export default class OrderResult extends wepy.page {
  config = {
    navigationStyle: 'custom',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
    },
  };
  data: Data = {
    type: 'success',
    orderNum: '',
    orderNums: [],
    errorMsg: '',
    sys: { top, height },
    orderType: '',
    goWhere: '',
    activity: '',
    sales: '',
    transferOrderId: '',
  };
  methods = {
    goBack(delta=1) {
      wx.navigateBack({
        delta: delta,
      });
    },

    // 认购成功直接去转单
    goToTransfer(){
      if(!this.transferOrderId){
        return
      }

      Toast.loading({
        forbidClick: true,
        message: '结算中...',
      });
      let userActId = this.transferOrderId
      request({ api: `marketActivity/actToOrderInit.nd?userActId=${userActId}`, method: 'POST'}).then(res => {
        let uActId = []
        let uActIdStr = ''
        res.activityList.forEach(item=>{
          uActId.push(item.id)
        })
        uActIdStr = uActId.toString()
        if (res.isFenXiao=='Y') {
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
              orderedQty: pro.buyQty || 1,
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
              activityName: pro.activityName,
              activityId: pro.activityId,
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
            purchaseOrderItem:dmsGoods,
            totalVolume: dmsGoods[0].volume,

          }
          getStore().dispatch({ type: GET_CART_GOODS_LIST_INFO, payload: item2 })
          Toast.clear();
          wx.redirectTo({
            url: `/pages/goods/distributors-order/index` + '?shareFlag=' + 'Y'+ '&activityName=' +dmsGoods[0].activityName + '&activityNum=' +dmsGoods[0].activityId+'&userActId=' + uActIdStr+'&userActivityCode=' + dmsGoods[0].orderCode
          })
        }else{
          wx.redirectTo({
            url: `/pages/goods/activity-order/index?userActId=${uActIdStr}`
          })
        }
      })
    }
  };
  onLoad({ type, orderNum, errorMsg, orderType, goWhere, activity,sales,transferOrderId }) {
    if (type) {
      this.type = type;
    }
    if (activity) {
      this.activity = activity
    }
    if (orderNum) {
      this.orderNum = orderNum;
      this.orderNums = orderNum.split(',');
    }
    if (errorMsg) {
      this.errorMsg = errorMsg;
    }
    if (goWhere) {
      this.goWhere = goWhere;
    }
    if (orderType) {
      this.orderType = orderType;
    }
    if (sales) {
      this.sales = sales;
    }
    if(transferOrderId){
      this.transferOrderId=transferOrderId
    }
  }
}
