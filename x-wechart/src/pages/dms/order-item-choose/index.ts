import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { DMS_ORDER_CHOOSE_ITEM_INFO, DMS_ORDER_PRODUCT_LIKE_INFO_CLEAR } from '@/store/types/dmsorder';
import { getProductListLikeCode, getItemInvStatus, getCisPrice, getLsPrice, getZoneB2cServiceList } from '@/store/actions/dmsorder';
import { debounce } from 'throttle-debounce';
import { ORDER_RETURN_STOCK } from '@/store/types/return-stock';
import {RESET_INVENTORY_QUERIES_LIST} from '@/store/types/inventory';
import { getInventoryQueriesListNew, getInvStatusType } from '@/store/actions/inventory';
import utilsWxs from '../../../wxs/utils.wxs';
import Toast from '@/components/vant/toast/toast';
import {forEachObjIndexed} from "ramda";
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
  productCode: string
  zzprdmodel: string
  key: string
  orgId: string
  itemIndexR :string
  outIndexR :string
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
  getItemInvStatus,
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
    outIndexR: '',
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
    }
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
    // 零售录入、零售录入新、分销录入、分销录入新、调拨录入适用判断函数
    checkProduct: (info, type)=>{
      let invMap = {}
      let uniqueInvMap = {}
      let selectedSame = {}
      let products = this.additionOrderDetailItem.itemInfo
      forEachObjIndexed((value, key) => {
        let uniqueInvKey = value.orgCode + "_" + value.gicWarehouse + "_" + value.productCode
        let oKey = uniqueInvKey + "_" + value.invStatusId + "_" + value.invStatusType
        let oSame = oKey + "_" + value.share
        invMap[uniqueInvKey] = value
        invMap[oKey] = key
        uniqueInvMap[uniqueInvKey] = key
        selectedSame[oSame] = key
      }, products)

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
    // 订单审核适用判断函数
    checkPrevProduct: (info, type)=>{
      const pages = getCurrentPages();
      let prevpage= pages[pages.length - 2] // 上一个页面
      let data = prevpage.data // 获取上一页data里的数据
      if(prevpage){ // 存在上一页
        let invMap = {}
        let products = {}
        if(this.ly === 'ReviewOrder'){ // 订单审核
          products = data.orderdetail.data.salesOrderItem[this.itemIndexR]
        }
        if(this.ly === 'distributorReturns'){ // 分销商退货
          products = data.orderdetail.returnOrderItemList[this.itemIndexR]
        }
        if(products && products.outItems){
          products.outItems.map((value)=>{
            let uniqueInvKey = value.orgCode + "_" + value.warehouseId + "_" + value.productCode
            let oKey = uniqueInvKey + "_" + value.invStatusId + "_" + value.invStatusType
            invMap[oKey] = value
          })
        }
        if(type == '1'){ // 组织，仓库，产品编码，质量等级，补差类型相同
          if(invMap[info]){
            return invMap[info]
          }
        }
      }
      return false
    },
    chooseItem: (index: number) => {
      let oneItem = this.inventoryList[index];
      const chooseItem = {
        bigQty: oneItem.bigQty,
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
        invStatusId: oneItem.invStatusId, // 质量等级（库存状态）
        invStatusName: oneItem.invStatusName,
        invStatusType: oneItem.invStatusType, // 补差类型
        invStatusTypeName: oneItem.invStatusTypeName,
        gicWarehouseName:oneItem.gicWarehouseName, // 仓库名称(选完产品后仓库获取以gic仓库为准)
        gicWarehouse: oneItem.gicWarehouse, // 仓库id
        price: oneItem.price,
        materialCode: oneItem.materialCode,
        orgCode: oneItem.orgCode, // 销售组织
        orgName: oneItem.orgName, // 销售组织名称
        quantity: '1', // 销售数量默认
        inInvDate: oneItem.inInvDate, // 入库时间
        share: oneItem.share, // 共享标识字段
      };
      if (this.key !== '') {
        this.methods.getItemInvStatus({
          productCode: chooseItem.productCode
        }).then((res: any) => {
          const item = {
            key: this.key,
            chooseItem,
            stock: res.payload
          }
          getStore().dispatch({
            type: ORDER_RETURN_STOCK,
            payload: item
          })
        })
      } else {
        if(this.ly === 'retailNew' || this.ly === 'channelNew'){ // 零售录入（新）、分销录入（新）
          let uniqueInvKey = chooseItem.orgCode + "_" + chooseItem.gicWarehouse + "_" + chooseItem.productCode
          let invStatusKey = chooseItem.invStatusId + "_" + chooseItem.invStatusType
          let currProKey = uniqueInvKey + "_" + invStatusKey

          // 组织，仓库，产品编码，质量等级，补差类型相同
          let checkResult = this.methods.checkProduct(currProKey,'1')
          if(checkResult && this.additionOrderDetailItem.itemInfo[checkResult]){
            this.additionOrderDetailItem.itemInfo[checkResult].quantity = Number(this.additionOrderDetailItem.itemInfo[checkResult].quantity) + 1
            let chooseItemId = this.additionOrderDetailItem.chooseItemId
            getStore().dispatch({
              type: DMS_ORDER_CHOOSE_ITEM_INFO,
              payload: {
                ...this.additionOrderDetailItem.itemInfo[chooseItemId],
              }
            })
            wx.navigateBack({
              delta: 1
            })
            return;
          }

          // 组织，仓库，产品编码相同，质量等级 或者 补差类型 不相同
          let checkResult2 = this.methods.checkProduct(uniqueInvKey,'2')
          if(checkResult2){
            Toast.fail('相同产品质量等级和补差类型必须保持一致，请重新选择！')
            return;
          }
        }
        // 零售录入（新）、分销录入（新）；表单中销售组织和发货仓库已删除;  分销录入（新）需要先选择客户信息，获取到orgId才走以下if判断中内容
        if (this.additionOrderDetailItem.orgId || this.additionOrderDetailItem.shopCisCode) {

          const key = this.additionOrderDetailItem.chooseItemId
          // 本key选择其他商品时才更新价格之类的信息，同一个商品不用更新价格
          if (this.ly === 'channel' || this.ly === 'channelNew') {
            // 本key选择其他商品时才更新价格之类的信息，同一个商品不用更新价格
            if (this.additionOrderDetailItem.itemInfo[key].productCode !== chooseItem.productCode) {
              this.methods.getCisPrice({
                type: this.additionOrderDetailItem.shopCisCode != '' ? '3' : '2',
                orgId: this.additionOrderDetailItem.orgId,
                cisCode: this.additionOrderDetailItem.cisCode,
                shopCisCode: this.additionOrderDetailItem.shopCisCode,
                productId: chooseItem.productCode,
                refreshPrice: true,
              }).then((res: any) => {
                const {itemInfo} = this.additionOrderDetailItem;
                let key = this.additionOrderDetailItem.chooseItemId;
                if(res.payload.code === 0) {
                  itemInfo[key].price = res.payload.list[0].retailPrice;
                  getStore().dispatch({
                    type: DMS_ORDER_CHOOSE_ITEM_INFO,
                    payload: {
                      ...chooseItem,
                      price: res.payload.list[0].retailPrice
                    }
                  })
                }
              });
            }
          }else{
            if(this.additionOrderDetailItem.itemInfo[key].productCode !== chooseItem.productCode){
              this.methods.getLsPrice({
                type: this.additionOrderDetailItem.shopCisCode != '' ? '3' : '2',
                orgId: this.additionOrderDetailItem.orgId,
                cisCode: this.additionOrderDetailItem.cisCode,
                shopCisCode: this.additionOrderDetailItem.shopCisCode,
                productId: chooseItem.productCode,
                refreshPrice: true,
              }).then((res: any) => {
                  const {itemInfo} = this.additionOrderDetailItem;
                  let key = this.additionOrderDetailItem.chooseItemId;
                  itemInfo[key].price =  res.payload.price
                  getStore().dispatch({
                    type: DMS_ORDER_CHOOSE_ITEM_INFO,
                    payload: {
                      ...chooseItem,
                      price: res.payload.price
                    }
                  })
                });
            }
          }
        }

        this.methods.getItemInvStatus({
          productCode: chooseItem.productCode
        });

        //获取补差类型
        this.methods.getInvStatusType().then((res: any) => {
          const {itemInfo} = this.additionOrderDetailItem;
          let list = res.payload.data;
          let key = this.additionOrderDetailItem.chooseItemId;
          itemInfo[key].invStateTypes = list.map((item: Object) => {
            for (const key in item) {
              return {
                key: key,
                value: item[key]
              }
            }
          });
          //添加请选择
          let nullWare = {
            key: "",
            value: "请选择"
          }
          itemInfo[key].invStateTypes.unshift(nullWare)
          this.$apply()
        });

        //零售录入新版本获取服务列表
        if(this.ly == 'retailNew'){
          this.methods.getServiceList(oneItem,chooseItem)
        }

        getStore().dispatch({
          type: DMS_ORDER_CHOOSE_ITEM_INFO,
          payload: chooseItem
        })

      }

      const pages = getCurrentPages();
      const prevPage = pages[ pages.length - 2 ];
      var currentPage = pages[pages.length-1] //获取当前页面的对象
      var url = currentPage.route //当前页面url
      prevPage.setData({
        chooseItem: chooseItem,
        'itemIndexR': this.itemIndexR,
        'outIndexR': this.outIndexR, // 订单审核详情用到
        'curragePageUrl': url
      })
      wx.navigateBack({
        delta: 1
      })
    },

    // 获取服务列表
    getServiceList:(oneItem, chooseItem)=>{
      const { chooseProvinceInfo, chooseCityInfo, chooseRegionInfo, chooseTownInfo, deliveryMethod} = this.requiredParameters
      const {itemInfo} = this.additionOrderDetailItem;
      let key = this.additionOrderDetailItem.chooseItemId;

      // 根据发货仓库+配送方式，服务方式字段变化显示
      // 如果仓库为统仓，配送方式选择“配送、自提、配送（加急）“，服务方式字段显示，可选择
      // 如果仓库为统仓，配送方式为“直配到工地“，服务方式字段隐藏，取值空
      // 如果仓库为原仓，服务方式字段隐藏，取值空
      // 省市区必须要有值不然会报错
      if(oneItem.gicWarehouseType=='20' && deliveryMethod && deliveryMethod.id && deliveryMethod.id != '07' && chooseProvinceInfo.id && chooseCityInfo.id && chooseRegionInfo.id && chooseTownInfo.id){
        this.methods.getZoneB2cServiceList({
          orgCode: oneItem.orgCode,
          warehouseCode: oneItem.gicWarehouse,
          provinceCode: chooseProvinceInfo.id,
          cityCode: chooseCityInfo.id,
          countyCode: chooseRegionInfo.id,
          townCode: chooseTownInfo.id,
        }).then((res) => {
          const { payload } = res
          if( payload.data && payload.code == 0 && payload.data.length > 0){
            let serviceList = payload.data
            let zoneB2cService = []
            let zoneB2cServiceName = []
            serviceList.forEach(it => {
              if (it.isSupport === '1' && it.isDefault === '1') {
                zoneB2cService.push(it.serviceCode)
                zoneB2cServiceName.push(it.serviceName)
              }
            })
            itemInfo[key].serviceList = serviceList
            itemInfo[key].zoneB2cService = zoneB2cService
            itemInfo[key].zoneB2cServiceName = zoneB2cServiceName
            getStore().dispatch({
              type: DMS_ORDER_CHOOSE_ITEM_INFO,
              payload: {
                ...chooseItem,
                zoneB2cService: zoneB2cService, // 服务方式id
                zoneB2cServiceName: zoneB2cServiceName, // 服务方式名称
                serviceList: serviceList // 服务方式列表
              }
            })
          }
          this.$apply();
        });
      }
      this.$apply();
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

    // 产品列表是否显示选中标识
    this.inventoryList = this.inventoryList.map((chooseItem)=>{
      // 已选产品和产品列表比较 组织，仓库，产品编码，质量等级，补差类型相同 则为选中状态
      let currProKey = chooseItem.orgCode + "_" + chooseItem.gicWarehouse + "_" + chooseItem.productCode + "_" + chooseItem.invStatusId + "_" + chooseItem.invStatusType
      let checkResult = false
      if( this.ly == 'ReviewOrder' || this.ly === 'distributorReturns'){ // 订单审核||分销商退货
        checkResult = this.methods.checkPrevProduct(currProKey,'1')
      }else{ // 分销录入、分销录入新、零售录入、零售录入新、调拨录入
        checkResult = this.methods.checkProduct(currProKey,'1')
      }
      chooseItem.isSelected = false
      if(checkResult){
        chooseItem.isSelected = true
      }
      return chooseItem
    })

    this.isRequest = false
    this.$apply()
  }

  onLoad(e: { key: any; }) {
    if(e.ly == 'ReviewOrder' || e.ly == 'distributorReturns'){ // 订单审核详情添加出库信息进入, 分销商出库详情添加出库信息进入
        this.ly = e.ly
        this.zzprdmodel = e.zzprdmodel
        this.itemIndexR = e.itemIndex
        this.outIndexR = e.outIndex
        if(e.orgId && e.orgId!=='undefined'){
          this.orgId = e.orgId
        }
        if(e.isOpenSharedWarehouse && e.isOpenSharedWarehouse!=='undefined'){
          this.isOpenSharedWarehouse = e.isOpenSharedWarehouse
        }
        if(e.warehouseId && e.warehouseId!=='undefined'){ // 仓库编码
          this.warehouseId = e.warehouseId
        }
        if(e.invStatusId && e.invStatusId!=='undefined'){ // 质量等级
          this.invStatusId = e.invStatusId
        }
        if(e.invStatusType && e.invStatusType!=='undefined'){ // 补差类型
          this.invStatusType = e.invStatusType
        }
        if(e.isFuzzy == false || e.isFuzzy == 'false'){
          this.isFuzzy = false
        }
        this.invType = '110'
        this.page.pageNo = 1
        this.myGetOrderList(this.zzprdmodel)
    }
    const { key } = e
    if (key) {
      this.key = key
    } else {
      this.key = ''
    }

    //销售组织；零售订单录入，需要根据组织+仓库查询库存
    if(e.orgId && e.orgId!=='undefined'){
      this.orgId = e.orgId
    }
    // 发货仓库；
    if(e.warehouseId && e.warehouseId!=='undefined'){
      this.warehouseId = e.warehouseId
    }
    if(e.ly){
      this.ly = e.ly
    }
    if(e.details){
      this.details = JSON.parse(e.details) // 产品列表key数组, 暂时不用
    }
    if(this.ly == 'retailNew'){
      this.requiredParameters = JSON.parse(e.requiredParameters)  // 零售录入新版主要用来获取省市区
    }

    //清除产品查询列表
    getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST, payload: [] })
  }

  onUnload() {
    getStore().dispatch({
      type: DMS_ORDER_PRODUCT_LIKE_INFO_CLEAR,
    })

  }
}
