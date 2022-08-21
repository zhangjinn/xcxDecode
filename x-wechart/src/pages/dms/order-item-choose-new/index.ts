import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { DMS_ORDER_CHOOSE_ITEM_INFO, DMS_ORDER_PRODUCT_LIKE_INFO_CLEAR } from '@/store/types/dmsorder';
import { getProductListLikeCode, getCisPrice, getLsPrice, getZoneB2cServiceList } from '@/store/actions/dmsorder';
import { debounce } from 'throttle-debounce';
import { ORDER_RETURN_STOCK } from '@/store/types/return-stock';
import {RESET_INVENTORY_QUERIES_LIST} from '@/store/types/inventory';
import { getInventoryQueriesListNew, getInvStatusType } from '@/store/actions/inventory';
import utilsWxs from '../../../wxs/utils.wxs';
import Toast from '@/components/vant/toast/toast';
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
  productCode: string
  zzprdmodel: string
  key: string
  orgId: string
  itemIndexR :string
  itemProIndexR :string
  warehouseId: string
  ly: string
  isRequest: boolean
  isOpenSharedWarehouse: string
  isFuzzy: boolean
  requiredParameters: object
  details: any
  invType: any
  page: any
  invStatusId: any
  invStatusType: any
  selectedProductList: any
}

@connect({
  likePaging({ dmsorder }) {
    return dmsorder.likePaging
  },
  additionOrderDetailItem({ dmsorder }) {
    return dmsorder.chooseItemInfo
  },
  inventoryList({ inventory }) {
    return inventory.inventoryList
  }
  totalPage({ inventory }) {
    return inventory.totalPage
  }
}, {
  getProductListLikeCode,
  getCisPrice,
  getLsPrice,
  getInvStatusType,
  getInventoryQueriesListNew,
  getZoneB2cServiceList,
})
export default class OrderItemChoose extends wepy.page {
  config = {
    navigationBarTitleText: '产品信息',
    usingComponents: {
      "van-search": "/components/vant/search/index",
      "van-toast": "/components/vant/toast/index",
    },
  };
  components = {
    emptyDataType,
  };
  data: Data = {
    productCode: '',
    zzprdmodel: '',
    key: '',
    orgId: '',
    itemIndexR: '',
    itemProIndexR: '',
    warehouseId: '',
    ly: '',
    isRequest: false,
    isOpenSharedWarehouse: '', // 渠道订单审核跳转进来的时候如果传20，就只加载统仓，为空全部加载
    isFuzzy: true, // 是否模糊查询，false精准查询，true模糊查询; 默认模糊查询； 目前精准查询有 1、渠道订单审核查询产品
    requiredParameters: {}, // 零售订单传入的参数包括省市区，用于获取服务列表
    details: [], // 所有选择产品的key
    invType: '', // 查询列表时库存类型传参；订单审核查询时默认110，代表在库
    invStatusId: '', // 质量等级
    invStatusType: '', // 补差类型
    page: {
      pageNo: 1,
      pageSize: 10
    },
    selectedProductList: [], // 已经选择的产品列表
  };
  wxs = {
    utils: utilsWxs,
  };
  methods = {
    onChange: debounce(500, ({ detail }: wepy.Event) => {
      this.zzprdmodel = detail
      this.$apply()
      if ((detail || '').trim().length >= 3) {
        this.methods.onSearch({ detail }, this)
      }
    }),
    onSearch: async ({ detail }: wepy.Event) => {
      if(this.isRequest){
        return
      }
      this.zzprdmodel = detail
      await getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST, payload: [] })
      this.page.pageNo = 1
      await this.myGetOrderList(detail)
    },

    // 1、组织，仓库，产品编码，质量等级，补差类型都相同 销售数量加1，不新增；
    // 2、组织，仓库，产品编码相同，质量等级 或者 补差类型 不相同提示‘相同产品质量等级和补差类型必须保持一致，请重新选择！’；
    // 3、其他情况正常添加
    // 4、组织，仓库，产品编码，质量等级，补差类型都相同 产品列表显示已选标识
    // 零售录入新版、分销录入新版 新增产品时判断1、2、3、4；零售录入、分销录入、订单审核、调拨录入判断4
    checkProduct: (info, type)=>{
      let invMap = {}
      let uniqueInvMap = {}
      let selectedSame = {}
      let products = this.selectedProductList

      products.map((value, index)=>{
        let uniqueInvKey = value.orgCode + "_" + value.gicWarehouse + "_" + value.productCode
        let oKey = uniqueInvKey + "_" + value.invStatusId + "_" + value.invStatusType
        let oSame = oKey + "_" + value.share
        let returnObj = {
          index: index,
          value: value
        }
        invMap[uniqueInvKey] = returnObj
        invMap[oKey] = returnObj
        uniqueInvMap[uniqueInvKey] = returnObj
        selectedSame[oSame] = returnObj
      })

      if(type == '1'){ // 组织，仓库，产品编码，质量等级，补差类型相同
        if(invMap[info]){
          return invMap[info]
        }
      }
      if(type == '2'){ // 组织，仓库，产品编码相同
        if(uniqueInvMap[info]){
          return uniqueInvMap[info]
        }
      }
      if(type == '3'){ // 组织，仓库，产品编码，质量等级，补差类型，共享标识字段相同
        if(selectedSame[info]){
          return selectedSame[info]
        }
      }
      return false
    },

    chooseItem: (index: number) => {
      let oneItem = this.inventoryList[index];
      const chooseItem = {
        bigQty: oneItem.bigQty, // 可用数量
        colour: oneItem.colour,
        materialGroupId: '',
        materialGroupCode: oneItem.materialGroupCode,
        materialGroupName: oneItem.materialGroupName,
        model: oneItem.model,
        productCode: oneItem.productCode,  // 产品编码
        productName: oneItem.productName,
        productLabel: oneItem.productLabel,
        uom: oneItem.uom,
        volume: oneItem.volume,
        invTypeName:oneItem.invTypeName,
        warehouseName: oneItem.warehouseName,
        warehouseId: oneItem.warehouseId,
        gicWarehouseType: oneItem.gicWarehouseType, // 仓库类型
        invStatusId: oneItem.invStatusId, // 库存状态id
        invStatusName: oneItem.invStatusName, // 库存状态名称
        invStatusType: oneItem.invStatusType, // 补差类型id
        invStatusTypeName: oneItem.invStatusTypeName, // 补差类型名称
        gicWarehouseName:oneItem.gicWarehouseName, // 仓库名称(选完产品后仓库获取以gic仓库为准)
        gicWarehouse: oneItem.gicWarehouse, // 仓库id
        price: oneItem.price, // 建议零售价
        materialCode: oneItem.materialCode, //物料编码
        orgCode: oneItem.orgCode, // 销售组织
        orgName: oneItem.orgName, // 销售组织名称
        quantity: '1', // 销售数量默认
        inInvDate: oneItem.inInvDate, // 入库时间
        share: oneItem.share, // 共享标识字段
        sellingPrice: '', // 销售价格默认
      };

      let uniqueInvKey = chooseItem.orgCode + "_" + chooseItem.gicWarehouse + "_" + chooseItem.productCode
      let invStatusKey = chooseItem.invStatusId + "_" + chooseItem.invStatusType
      let currProKey = uniqueInvKey + "_" + invStatusKey

      if(this.selectedProductList && this.selectedProductList.length>0){
        // 组织，仓库，产品编码，质量等级，补差类型相同
        let checkResult = this.methods.checkProduct(currProKey,'1')
        if(checkResult){ // 将前一页已选列表的对应产品数量加1，然后直接返回
          let index = checkResult.index
          this.selectedProductList[index].quantity = Number(this.selectedProductList[index].quantity) + 1
          let chooseItem = this.selectedProductList[index]
          this.itemProIndexR = index
          this.methods.backToPrevious(chooseItem)
          return;
        }

        // 组织，仓库，产品编码相同，质量等级 或者 补差类型 不相同
        let checkResult2 = this.methods.checkProduct(uniqueInvKey,'2')
        if(checkResult2){
          Toast.fail('相同产品质量等级和补差类型必须保持一致，请重新选择！')
          return;
        }
      }

      this.methods.backToPrevious(chooseItem)
    },

    // 返回上一页并赋值
    backToPrevious: (chooseItem) => {
      const pages = getCurrentPages();
      const prevPage = pages[ pages.length - 2 ];
      const currentPage = pages[pages.length-1] //获取当前页面的对象
      const url = currentPage.route //当前页面url
      prevPage.setData({
        chooseItem: chooseItem,
        'itemIndexR': this.itemIndexR,
        'itemProIndexR': this.itemProIndexR,
        'curragePageUrl': url
      })
      wx.navigateBack({
        delta: 1
      })
    },

    onGetOrderListNext() {
      if (this.totalPage > this.page.pageNo) {
        this.page = { ...this.page, pageNo: this.page.pageNo + 1 }
        this.myGetOrderList(this.zzprdmodel)
      }
    },

  };

  async myGetOrderList(model: any,orgId:any) {
    this.isRequest = true
    await this.methods.getInventoryQueriesListNew({
      _loading: true,
      cisCode: wepy.$instance.globalData.cisCode,
      terms: {
        isFuzzy: this.isFuzzy,
        zzprdmodel: model,
        model: model,
        colour: '',
        warehouseId: this.warehouseId, // 仓库编码
        invStatusId: this.invStatusId, // 质量等级
        isLock: '',
        dealerMaterialGroupFlag: '',
        materialGroupCode: '',
        materialGroupName: '',
        gicWarehouseType: this.isOpenSharedWarehouse, // 仓库类型
        invStatusType: this.invStatusType, // 补差类型
        invType: this.invType, // 订单审核查询时默认传110，代表在库; 其他情况传空
        bigQtyMin: 0,  //0最小可用库存数量,dms后台取 >0 的结果
        orgId: this.orgId,
        gicInvStatus: '110' //库存状态只查正品
      },
      page: this.page
    });

    if(this.selectedProductList && this.selectedProductList.length>0){
      // 产品列表是否显示选中标识
      this.inventoryList = this.inventoryList.map((chooseItem)=>{
        // 已选产品和产品列表比较 组织，仓库，产品编码，质量等级，补差类型相同 则为选中状态
        let currProKey = chooseItem.orgCode + "_" + chooseItem.gicWarehouse + "_" + chooseItem.productCode + "_" + chooseItem.invStatusId + "_" + chooseItem.invStatusType
        let checkResult = this.methods.checkProduct(currProKey,'1')
        chooseItem.isSelected = false
        if(checkResult){
          chooseItem.isSelected = true
        }
        return chooseItem
      })
    }

    this.isRequest = false
    this.$apply()
  }

  onShow() {
    const pages = getCurrentPages();
    let prevpage= pages[pages.length - 2] // 上一个页面
    let data = prevpage.data // 获取上一页data里的数据
    if(data ) {
      this.selectedProductList = data.productList
    }
  }
  onLoad(e: { key: any; }) {
    if(e.ly){
      this.ly = e.ly
    }
    this.itemProIndexR = e.itemProIndexR
    if(this.ly == 'retailNew'){
      this.requiredParameters = JSON.parse(e.requiredParameters)  // 零售录入新版主要用来获取省市区
    }
    //清除产品查询列表
    getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST, payload: [] })
  }

}
