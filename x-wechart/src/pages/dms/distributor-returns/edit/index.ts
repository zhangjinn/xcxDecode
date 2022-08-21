import wepy, {Event} from 'wepy';
import {connect} from 'wepy-redux';
import {
  getPurchaseOrderReturnDetail,
  createReturnOrderByPurchaseOrder,
  getDistributorReturnOrderDetail,
  createDistributorReturnOrderOutbound,
} from '@/store/actions/returnbefore';
import popupCustomize from "../../../components/popup-customize/index";
import Toast from "@/components/vant/toast/toast";
import {clone, forEach} from "ramda";

interface Data {
  formData: object;
  popTitle: string;
  popSelectedOption: object;
  formKey: string;
  salesmanOptions: any[];
  orderdetail: object;
  itemIndex: number;
  outIndex: number;
  orderId: string;
  pageType: string;
}

@connect({
}, {
  getPurchaseOrderReturnDetail,
  createReturnOrderByPurchaseOrder,
  getDistributorReturnOrderDetail,
  createDistributorReturnOrderOutbound,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '分销商出库',
    usingComponents: {
      'van-icon': '/components/vant/icon/index',
      'van-toast': '/components/vant/toast/index',
      'van-loading': '/components/vant/loading/index',
      'van-popup': '/components/vant/popup/index',
      'van-field': '/components/vant/field/index',
      'van-stepper': '/components/vant/stepper/index',
    },
  };
  components = {
    popupCustomize,
  };
  data: Data = {
    formData: {
      salesman: {
        id:'',
        name:''
      }, // 业务员
      remark: '', // 备注
    },
    salesmanOptions: [],
    popTitle: '',
    popSelectedOption: {},
    formKey: '',
    orderdetail: {}, // 明细信息
    itemIndex: 0,
    outIndex: 0,
    orderId: '',
    pageType: '', // 页面类型 initiate:退货发起, outStock:退货出库
  };

  // 页面内交互写在methods里
  methods = {
    returnBack(){
      wx.navigateBack({
        delta: 1 //返回上一级页面
      })
    },
    // 添加、修改产品信息
    jumpClick (evt: { currentTarget: { dataset: { itemIndex: any; outIndex: any; }; }; } ){
      const { currentTarget: { dataset: { itemIndex, outIndex, type } } } = evt
      if( type==='add' ){ // 添加
        let outItem = this.orderdetail.returnOrderItemList[itemIndex].outItems
        if( outItem && outItem.length >= 1 ){
          Toast.fail('请先删除已选库存再进行添加');
          return;
        }
      }
      const zzprdmodel = this.orderdetail.returnOrderItemList[itemIndex].model
      const invStatusId = this.orderdetail.returnOrderItemList[itemIndex].invStatusId // 质量等级
      const invStatusType = this.orderdetail.returnOrderItemList[itemIndex].invStatusType || '-1' // 补差类型
      const warehouseId = this.orderdetail.returnOrderItemList[itemIndex].gicOutWarehouse // 仓库编码
      const orgId = this.orderdetail.orgCode
      const isOpenSharedWarehouse = 70 // 只能原仓
      wx.navigateTo({
        url: '/pages/dms/order-item-choose/index?&ly=' + 'distributorReturns' +'&itemIndex=' + itemIndex +'&outIndex=' + outIndex + '&orgId=' + orgId + '&zzprdmodel=' + zzprdmodel+ '&invStatusId=' + invStatusId+ '&invStatusType=' + invStatusType+ '&warehouseId=' + warehouseId+ '&isOpenSharedWarehouse=' + isOpenSharedWarehouse+ '&isFuzzy=false'
      })
    },
    // 删除产品信息
    onRemoveOutItem(evt: { currentTarget: { dataset: { itemIndex: any; outIndex: any; }; }; }) {
      const { currentTarget: { dataset: { itemIndex, outIndex } } } = evt
      const newOrderDetail = clone(this.orderdetail)
      const length = newOrderDetail.returnOrderItemList[itemIndex].outItems.length
      if(length > 0) {
        newOrderDetail.returnOrderItemList[itemIndex].outItems.splice(outIndex, 1)
        this.orderdetail = newOrderDetail
      }
    },
    onRemarkChange(e){
      const { key } = e.currentTarget.dataset
      let detail =e.detail
      this.formData[key] = detail
    },
    onShippedBqtyChg(evt: Event) {
      const { detail, target: { dataset: { itemIndex, outIndex } } } = evt
      // bug:  触发两次
      if (typeof detail === 'undefined') {
        return
      }
      const newOrderDetail = clone(this.orderdetail)
      newOrderDetail.returnOrderItemList[itemIndex].outItems[outIndex].bactualQty = detail
      this.orderdetail = newOrderDetail
    },
    onPopShow(e){
      const { title, key } = e.currentTarget.dataset
      this.popTitle = title
      this.formKey = key
      this.popSelectedOption = this.formData[this.formKey]
      this.$invoke('popupCustomize', 'onShow');
    },

    // 弹框组件选择列表项
    onSelect(param){
      this.formData[this.formKey] = param
      this.popSelectedOption = this.formData[this.formKey]
      this.$apply()
    },
    // 退货发起提交并出库
    onInitSubmit(){
      const { remark } = this.formData
      const { returnOrderItemList } = this.orderdetail
      let orderItem = []
      let mag = [] // 提交前校验入库数量是否满足
      let warehousingQty = 0 // 添加所有产品的总数量
      let productNum = 0 // 添加的总产品行数
      forEach((item: any)=> {
        if(item.outItems && item.outItems.length>0) { //item.outItems只允许有一条数据
          forEach((out: any) => {
            const data = {
              model: out.model, // 型号
              productCode: out.productCode, // 产品编码
              borderedQty: out.bactualQty, // 退货数量 (大单位)
              bprice: item.bprice, // 退货价格(大单位)
              amount: item.amount, // 金额
              invStatusId: item.invStatusId, // 库存状态ID
              invStatusName: item.invStatusName, // 库存状态
              warehouseId: out.warehouseId, // 仓库id
            };
            productNum += 1
            warehousingQty += Number(out.bactualQty)
            if(out.bactualQty > 0){
              orderItem.push(data);
            }
          }, item.outItems);
        }
      },returnOrderItemList);

      if(productNum <= 0){
        mag.push(`请先添加出库信息！`)
      }

      if(warehousingQty <= 0){
        mag.push(`出库数量需大于0！`)
      }

      if(mag.length>0){
        Toast.fail(mag[0])
        return false
      }

      let param = {
        cisCode: wepy.$instance.globalData.cisCode, // cis编码
        purchaseOrderId: this.orderId, // 采购单id
        returnOrder: { // 退货单信息
          outWarehouse:'', // 出库仓库 orderItem.warehouseId已传参；该项置空
          message: remark, // 备注
          returnItemList: orderItem
        }
      }
      this.methods.createReturnOrderByPurchaseOrder(param).then((res)=>{
        const { code } = res.payload
        if(code == '0'){
          Toast.success({
            forbidClick: true,
            duration: 1000,
            message: '提交出库成功',
            onClose: () => {
              wx.navigateBack({
                delta: 1,
              });
            },
          });
        }
      })
    },

    // 退货出库提交并出库
    onOutSubmit(){
      const { returnOrderItemList } = this.orderdetail
      let orderItem = []
      let mag = [] // 提交前校验入库数量是否满足
      let warehousingQty = 0
      let productNum = 0 // 添加的总产品行数
      forEach((item: any)=> {
        if(item.outItems && item.outItems.length>0) { //item.outItems只允许有一条数据
          forEach((out: any) => {
            const data = {
              model: out.model, // 型号
              productCode: out.productCode, // 产品编码
              materialCode: out.materialCode, // 物料号
              invStatusId: out.invStatusId, // 库存状态ID
              invStatusType: out.invStatusType, // 补差类型
              warehouseId: out.warehouseId, // 仓库id
              outboundQty: out.bactualQty, // 本次出库数量
            };
            productNum += 1
            warehousingQty += Number(out.bactualQty)
            if(out.bactualQty > 0){
              orderItem.push(data);
            }
          }, item.outItems);
        }
      },returnOrderItemList);

      if(productNum <= 0){
        mag.push(`请先添加出库信息！`)
      }

      if(warehousingQty <= 0){
        mag.push(`出库数量需大于0！`)
      }

      if(mag.length>0){
        Toast.fail(mag[0])
        return false
      }

      let param = {
        cisCode: wepy.$instance.globalData.cisCode, // cis编码
        returnOrderId: this.orderId, // 采购单id
        returnItemList: orderItem
      }
      this.methods.createDistributorReturnOrderOutbound(param).then((res)=>{
        const { code } = res.payload
        if(code == '0'){
          Toast.success({
            forbidClick: true,
            duration: 1000,
            message: '提交出库成功',
            onClose: () => {
              wx.navigateBack({
                delta: 1,
              });
            },
          });
        }
      })
    }

  };
  // 添加或修改产品赋值
  productAssignment(chooseItem, itemIndex, outIndex){
    let outItems = this.orderdetail.returnOrderItemList[itemIndex].outItems;
    let outBoundItem = {
      bactualQty: chooseItem.bactualQty, // 退货数量
      warehouseId: chooseItem.gicWarehouse, // 仓库id
      warehouseName: chooseItem.gicWarehouseName, // 仓库名称
      invStatusType: chooseItem.invStatusType, // 补差类型id
      invStatusTypeName: chooseItem.invStatusTypeName, // 补差类型名称
      materialCode: chooseItem.materialCode, // 物料编码
      invStatus: chooseItem.invStatusName, // 库存状态名称
      invStatusId: chooseItem.invStatusId, // 库存状态id
      bavailQty: chooseItem.bigQty, // 可用数量
      inInvDate: chooseItem.inInvDate, // 入库时间
      productCode: chooseItem.productCode, // 产品编码
      orgCode: chooseItem.orgCode, // 组织编码
      colour: chooseItem.colour, // 产品颜色
      model: chooseItem.model, // 产品型号
    };
    if(!Array.isArray(outItems){
      outItems =[];
    })
    if(outIndex && outIndex !== 'undefined'){ // 如果outIndex有值为编辑直接替换数据；否则为新增
      outItems[outIndex] = outBoundItem ;
    }else{
      outItems.push(outBoundItem);
    }
    this.orderdetail.returnOrderItemList[itemIndex].outItems = outItems
    this.$apply()
  }

  // 获取退货发起详情 || 退货出库详情
  getMyOrderDetail(){
    let param={
      cisCode: wepy.$instance.globalData.cisCode,
    }
    Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });
    if(this.pageType === 'initiate'){ // 退货发起
      param.purchaseOrderId = this.orderId
      this.methods.getPurchaseOrderReturnDetail(param).then((res)=>{
        Toast.clear()
        const { data } = res.payload
        this.orderdetail = data
        this.formData.remark = this.orderdetail.message || ''
        if(this.orderdetail.returnOrderItemList && this.orderdetail.returnOrderItemList.length>0){
          this.orderdetail.returnOrderItemList = this.orderdetail.returnOrderItemList.map((item)=>{
            item.maxReturnNum = item.inboundQty - item.breturnQty
            return item
          })
        }
        this.$apply()
      })
    }else if(this.pageType === 'outStock'){ // 退货出库
      param.returnOrderId = this.orderId
      this.methods.getDistributorReturnOrderDetail(param).then((res)=>{
        Toast.clear()
        const { data } = res.payload
        this.orderdetail = data
        this.formData.remark = this.orderdetail.message || ''
        this.orderdetail.returnOrderItemList = this.orderdetail.itemList
        if(this.orderdetail.returnOrderItemList && this.orderdetail.returnOrderItemList.length>0){
          this.orderdetail.returnOrderItemList = this.orderdetail.returnOrderItemList.map((item)=>{
            item.maxReturnNum = item.borderedQty - item.shippedBqty
            return item
          })
        }
        this.$apply()
      })
    }
  }

  onShow() {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if(currPage.data.chooseItem ) {
      const itemIndex  = currPage.data.itemIndexR
      const outIndex  = currPage.data.outIndexR
      if(this.orderdetail.returnOrderItemList[itemIndex].productCode !== currPage.data.chooseItem.productCode){
        setTimeout(() => {
          Toast.fail('不是同一产品，请重新选择')
        }, 500);
      } else {
        currPage.data.chooseItem.bactualQty = 0 // 退货数量默认0
        this.productAssignment(currPage.data.chooseItem, itemIndex, outIndex)
        currPage.data.chooseItem = null
        this.$apply();
      }
    }
  }
  onLoad(e: { id: any; type: any}) {
    const { id, type } = e
    this.orderId = id
    this.pageType = type
    this.getMyOrderDetail()
    this.$apply()
  }

}
