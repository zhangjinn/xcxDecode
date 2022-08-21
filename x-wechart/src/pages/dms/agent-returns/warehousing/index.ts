import wepy, {Event} from 'wepy';
import {connect} from 'wepy-redux';
import {
  getAgentReturnOrderDetail,
  createAgentReturnOrderInbound,
  cancelReturn,
} from '@/store/actions/returnbefore';
import { getStoreHouse } from '@/store/actions/inventoryTrim'
import popupCustomize from "../../../components/popup-customize/index";
import Toast from "@/components/vant/toast/toast";
import {clone, forEach} from "ramda";

interface Data {
  formData: object;
  popTitle: string;
  popSelectedOption: object;
  formKey: string;
  warehouseOptions: any[];
  orderdetail: object;
  itemIndex: number;
  outIndex: number;
  returnOrderId: string;
  documentNum: string;
}

@connect({
}, {
  getAgentReturnOrderDetail,
  createAgentReturnOrderInbound,
  cancelReturn,
  getStoreHouse,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '销售退货入库',
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
      remark: '', // 备注
    },
    warehouseOptions: [],
    popTitle: '',
    popSelectedOption: {},
    formKey: '',
    orderdetail: {}, // 明细信息
    itemIndex: 0,
    outIndex: 0,
    returnOrderId: '', // 代理商退货单id
    documentNum: '', // 退货单号
  };

  // 页面内交互写在methods里
  methods = {
    returnBack(){
      wx.navigateBack({
        delta: 1 //返回上一级页面
      })
    },
    onRemarkChange(e){
      const { key } = e.currentTarget.dataset
      let detail =e.detail
      this.formData[key] = detail
    },
    // 正品退货数量 || 残次退货数量赋值，并计算小记金额
    onShippedBqtyChg(evt: Event) {
      const { detail, target: { dataset: { itemIndex, outIndex, key } } } = evt
      // bug:  触发两次
      if (typeof detail === 'undefined') {
        return
      }
      const newOrderDetail = clone(this.orderdetail)
      newOrderDetail.itemList[itemIndex].outItems[outIndex][key] = detail

      let bprice = newOrderDetail.itemList[itemIndex].outItems[outIndex].bprice
      // 退货数量 = 正品退货数量 + 残次退货数量
      let bactualQty = newOrderDetail.itemList[itemIndex].outItems[outIndex].bactualQty
      let defectiveQty = newOrderDetail.itemList[itemIndex].outItems[outIndex].defectiveQty
      let bQty = bactualQty + defectiveQty

      let subtotal = bQty * bprice
      newOrderDetail.itemList[itemIndex].outItems[outIndex].subtotal = subtotal.toFixed(2)
      this.orderdetail = newOrderDetail
    },
    onPopShow(e){
      const { title, key, itemIndex, outIndex } = e.currentTarget.dataset
      this.popTitle = title
      this.formKey = key
      this.itemIndex = itemIndex
      this.outIndex = outIndex
      this.popSelectedOption = this.orderdetail.itemList[itemIndex].outItems[outIndex].warehouse
      this.$invoke('popupCustomize', 'onShow');
      this.$apply()
    },

    // 弹框组件选择列表项
    onSelect(param){
      this.orderdetail.itemList[this.itemIndex].outItems[this.outIndex].warehouse = param
      this.popSelectedOption = param
      this.$invoke('popupCustomize', 'onClose');
      this.$apply()
    },

    // 添加产品信息
    jumpClick(e){
      const { itemIndex } = e.currentTarget.dataset
      let chooseItem = this.orderdetail.itemList[itemIndex]
      this.productAssignment(chooseItem, itemIndex)
    },

    // 删除产品信息
    onRemoveOutItem(evt: { currentTarget: { dataset: { itemIndex: any; outIndex: any; }; }; }) {
      const { currentTarget: { dataset: { itemIndex, outIndex } } } = evt
      const newOrderDetail = clone(this.orderdetail)
      const length = newOrderDetail.itemList[itemIndex].outItems.length
      if(length > 0) {
        newOrderDetail.itemList[itemIndex].outItems.splice(outIndex, 1)
        this.orderdetail = newOrderDetail
      }
    },

    // 退货入库提交
    onInitSubmit(){
      const { itemList } = this.orderdetail
      let orderItem = []
      let totalAmount = 0
      let mag = [] // 提交前校验入库数量是否满足
      let warehousingQty = 0 // 添加所有产品的总数量
      forEach((item: any)=> {
        let warehousingItemQty = 0 // 当前产品的数量
        if(item.outItems && item.outItems.length>0) { //item.outItems只允许有多条数据
          forEach((out: any) => {
            const data = {
              model: item.model, // 型号
              productCode: item.productCode, // 产品编码
              materialCode: item.materialCode, // 物料号
              invStatusId: item.invStatusId, // 库存状态ID
              ordinaryQty: out.bactualQty, // 入库正品数量
              imperfectQty: out.defectiveQty, // 入库残次数量
              warehouseId: out.warehouse.id, // 仓库编码
              bprice: out.bprice // 价格
            };
            totalAmount += Number(out.subtotal)
            let allQty = (Number(out.bactualQty) + Number(out.defectiveQty))
            warehousingQty += allQty
            warehousingItemQty += allQty
            if( allQty > 0 ){ // 入库数量大于0才提交
              orderItem.push(data);
            }
          }, item.outItems);
        }

        if(warehousingItemQty > item.maxQty){
          mag.push(`产品【${item.model}】入库数量需小于等于(退货数量-已入库数量)！`)
        }
      },itemList);

      if(warehousingQty <= 0){
        mag.push(`入库数量需大于0！`)
      }

      if(mag.length>0){
        Toast.fail(mag[0])
        return false
      }

      let param = {
        cisCode: wepy.$instance.globalData.cisCode, // cis编码
        returnOrderId: this.returnOrderId, // 代理商退货单id
        returnItemList: orderItem, // 退货入库明细
      }
      this.methods.createAgentReturnOrderInbound(param).then((res)=>{
        const { code } = res.payload
        if(code == '0'){
          Toast.success({
            forbidClick: true,
            duration: 1000,
            message: '入库成功',
            onClose: () => {
              wx.navigateBack({
                delta: 1,
              });
            },
          });
        }
      })
    },

    // 驳回
    onTurnDown(){
      let that = this
      wx.showModal({
        title: '提示',
        content: '确定驳回',
        success: async function (res) {
          if (res.confirm) {
            let param = {
              cisCode: wepy.$instance.globalData.cisCode, // cis编码
              documentNum: that.orderdetail.documentNum, // 用详情里的退货单号
              message:'', // 退货原因
            }
            that.methods.cancelReturn(param).then((res1)=>{
              const { code } = res1.payload
              if(code == '0'){
                Toast.success({
                  forbidClick: true,
                  duration: 1000,
                  message: '驳回成功',
                  onClose: () => {
                    wx.navigateBack({
                      delta: 1,
                    });
                  },
                });
              }
            })
          }
        },
      })
    }
  };
  // 获取仓库
  getStoreHouseData(){
    let param = {
      orgId: this.orderdetail.orgId
    }
    this.methods.getStoreHouse(param).then((res)=>{
      const { data } = res.payload
      if(data && data.length){
        this.warehouseOptions = data.map((item)=>{
          return {
            ...item,
            id: item.cId,
            name: item.name
          }
        })
      }
      if(this.orderdetail.itemList && this.orderdetail.itemList.length>0){
        this.orderdetail.itemList.forEach((item, index)=>{
          // 最大入库数量 = 退货数量 - 已入库数量
          this.orderdetail.itemList[index].maxQty = item.borderedQty - item.shippedBqty
          this.productAssignment(item, index, 0)
        })
      }
      this.$apply()
    })
  }

  // 添加或修改产品赋值
  productAssignment(chooseItem, itemIndex, outIndex){
    let outItems = this.orderdetail.itemList[itemIndex].outItems;
    let warehouse = this.warehouseOptions[0]
    let outBoundItem = {
      warehouse: {
        id: warehouse && warehouse.id,
        name: warehouse && warehouse.name
      }, // 仓库
      bactualQty: 0, // 正品退货数量
      defectiveQty: 0, // 残次退货数量
      bprice: chooseItem.bprice, // 退货价格(元)
      subtotal: 0.00, // 小计
    };
    outBoundItem.subtotal = outBoundItem.subtotal.toFixed(2)
    if(!Array.isArray(outItems){
      outItems =[];
    })
    if(outIndex && outIndex !== 'undefined'){ // 如果outIndex有值为编辑直接替换数据；否则为新增
      outItems[outIndex] = outBoundItem;
    }else{
      outItems.push(outBoundItem);
    }
    this.orderdetail.itemList[itemIndex].outItems = outItems
    this.$apply()
  }

  // 获取退货发起详情
  getMyOrderDetail(){
    let param={
      cisCode: wepy.$instance.globalData.cisCode,
      returnOrderId: this.returnOrderId,
    }
    Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });
    this.methods.getAgentReturnOrderDetail(param).then((res)=>{
      Toast.clear()
      const { data } = res.payload
      this.orderdetail = data
      this.formData.remark = this.orderdetail.message || ''
      this.getStoreHouseData()

      this.$apply()
    })
  }

  onShow() {

  }

  onLoad(e: { returnOrderId: any; documentNum: any }) {
    const { returnOrderId, documentNum } = e
    this.returnOrderId = returnOrderId
    this.documentNum = documentNum
    this.getMyOrderDetail()
    this.$apply()
  }

}
