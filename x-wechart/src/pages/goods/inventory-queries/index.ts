import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { baseUrl } from '@/utils/request';
import { getBaseData } from '@/store/actions/purchaseshop';
import { forEachObjIndexed } from 'ramda';
import { RESET_INVENTORY_QUERIES_LIST } from '@/store/types/inventory';
import { getMaterialInventoryPage, getInvStatusType } from '@/store/actions/inventory';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  inputvalue: string;
  visible: boolean;
  Warehouserel: string;
  warehouseTitle: string,
  itemgroup: string;
  isCheckAll: boolean;
  Suppliersextend: boolean;
  Itemgroupextend: boolean;
  warehouseStatusName: string;
  invStatusTypeName: string;
  invTypeName: string;
  warehouseStatusVisible: boolean;
  invStatusTypeVisible:boolean;
  warehouseName: string;
  warehouseVisible: boolean;
  WarehouseListvisible: boolean;
  lockName: string;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  timeFrameVisible: boolean;
  calendarShow: boolean;
  filterForm: object;
  filterFormExtra: object;
  calendarConfig: object;
  currentDateName: string;
  baseUrl: string;
  headerTabList: any[];
}

@connect({
  inventoryList({ inventory }) {
    let inventoryList = inventory.inventoryList
    if(inventoryList && inventoryList.length && inventoryList.length>500){
      inventoryList = inventoryList.slice(0, 500)
    }
    return inventoryList
  },
  baseData({ purchaseshop }) {
    return purchaseshop.baseData
  },
  ItemgroupList({ purchaseshop }) {
    return purchaseshop.ItemgroupList
  },
  WarehouseStatusList({ purchaseshop }) {
    return purchaseshop.WarehouseStatusList
  },
  totalPage({ inventory }) {
    return inventory.totalPage
  },
  invStatusType({ inventory }) {
    return inventory.invStatus
  }
}, {
  getBaseData,
  getMaterialInventoryPage,
  getInvStatusType
})
export default class InventoryQueries extends wepy.page {
  config = {
    navigationBarTitleText: '当前库存',
    usingComponents: {
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-search': '../../../components/vant/search/index',
      'van-tab': '../../../components/vant/tab/index',
      'van-row': '../../../components/vant/row/index',
      'van-col': '../../../components/vant/col/index',
      'van-tabs': '../../../components/vant/tabs/index',
      'van-radio': '../../../components/vant/radio/index',
      'van-radio-group': '../../../components/vant/radio-group/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-stepper': '../../../components/vant/stepper/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-button': '../../../components/vant/button/index',
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index',
    },
  };
  components = {
    emptyDataType,
    headerTab,
  };
  data: Data = {
    inputvalue: '',
    Warehouserel: '',
    warehouseName: '仓库',
    warehouseTitle: '仓库类型',
    itemgroup: '物料组',
    isCheckAll: false,
    WarehouseListvisible: false,
    //warehouseName: '全部',
    warehouseStatusName: '全部',
    invStatusTypeName:'全部',
    invTypeName: '库存类型',
    visible: false,
    warehouseVisible: false,
    warehouseStatusVisible: false,
    invStatusTypeVisible:false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    timeFrameVisible: false,
    calendarShow: false,
    currentDateName: '',
    lockName: '',
    filterForm: {
      model: '',   //型号
      materialGroupCode: '', // 物料组编码
      materialGroupName: '', // 物料组
      colour: '',
      warehouseId: '', // 仓库id
      invStatusId: '', //仓库状态id
      invStatusType:'', // 补查状态ID
      isLock: '', // 是否锁定
      dealerMaterialGroupFlag: '', //物料组关系
      gicWarehouseType:'',//仓库类型
      invType: '', //库存类型
      pageSize: 10,
      pageNo: 1,
    },
    baseUrl: baseUrl,
    invTypeList: [
      {
        "key":"", "value": "请选择"
      },
      {
        "key":"110", "value": "在库"
      },
      {
        "key":"119", "value": "销售在途"
      },
      {
        "key":"120", "value": "转储在途"
      }
    ],
    headerTabList: [
      { name: '仓库', type: 'warehouseName', selectValue: '' },
      { name: '物料组', type: 'itemgroup', selectValue: '' },
      { name: '库存类型', type: 'invTypeName', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };
  // 页面内交互写在methods里
  methods = {
    // 供应商选择
    touchOrderSFilter: (tabItem) => {
      // console.log(name)
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
      this.OrderSFilterVisible = !this.OrderSFilterVisible
      this.CurrentOrderSFilterName = name
    },
    selectRelationship: (value: any) => {
      if (this.filterForm.dealerMaterialGroupFlag == value) {
        this.filterForm = { ...this.filterForm, dealerMaterialGroupFlag: '' }
      } else {
        this.filterForm = { ...this.filterForm, dealerMaterialGroupFlag: value }
      }
    },
    // 盘点锁定
    selectLock: (value: string) => {
      if (this.filterForm.isLock === (value == 'lock')) {
        this.filterForm = { ...this.filterForm, isLock: '' }
      } else {
        this.filterForm = { ...this.filterForm, isLock: value == 'lock' }
      }
    },
    selectWarehouseStatus: (value: any, key: any) => {
      this.filterForm = { ...this.filterForm, invStatusId: key }
      this.warehouseStatusName = value
      this.warehouseStatusVisible = false
    },
    onSelectWarehouseList: (value: any, key: any) => {
      this.filterForm = { ...this.filterForm, warehouseId: key }
      this.warehouseName = value
      this.warehouseVisible = false
    },
    onSelectInvStatusList: (value:any,key:any) => {
      console.log(key);
      this.filterForm = { ...this.filterForm, invStatusType: key }
      this.invStatusTypeName = value
      this.invStatusTypeVisible = false
    },
    // poupo close
    closePolicy: () => {
      this.WarehouseListvisible = false
    },
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    // 仓库类型
    onSelectWarehouseType(gicWarehouseType) {
      if(gicWarehouseType == '005'){
        this.warehouseTitle = '自有仓'
      }else if(gicWarehouseType == '003'){
        this.warehouseTitle = '共享仓'
      }else{
        this.warehouseTitle = '全部'
      }
      getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST, payload: [] })
      this.filterForm = { ...this.filterForm, gicWarehouseType, pageNo: 1  }
      // getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    //仓库选择
    onSelectWarehouseName(warehouseId, warehouseName) {
      this.warehouseName = warehouseName;
      getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST, payload: [] })
      this.filterForm = { ...this.filterForm, warehouseId, pageNo: 1  }
      this.headerTabList[0].selectValue = warehouseId
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    // 物料组下拉列表
    onSelectStatus(code: any, maters: string) {
      getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST, payload: [] })
      this.itemgroup = maters
      this.ItemgroupList.forEach((res: { value: any; isSelect: boolean; }) => {
        if (res.value == maters) {
          res.isSelect = true
        } else {
          res.isSelect = false
        }
      })
      if (maters == "全部") {
        maters = ''
      }
      //this.filterForm = { ...this.filterForm, materialGroupName: maters, pageNo: 1 }
      this.filterForm = { ...this.filterForm, materialGroupCode: code, pageNo: 1 }
      this.headerTabList[1].selectValue = code
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },

    // 库存类型
    onSelectInvType(code: any, maters: string) {
      getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST, payload: [] })
      this.invTypeName = maters
      this.invTypeList.forEach((res: { value: any; isSelect: boolean; }) => {
        if (res.value == maters) {
          res.isSelect = true
        } else {
          res.isSelect = false
        }
      })
      if (maters == "全部") {
        maters = ''
      }
      //this.filterForm = { ...this.filterForm, materialGroupName: maters, pageNo: 1 }
      this.filterForm = { ...this.filterForm, invType: code, pageNo: 1 }
      this.headerTabList[2].selectValue = code
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },

    onProductModelChange(e: { detail: any; }) {
      this.filterForm = { ...this.filterForm, model: e.detail }
    },
    onProductColorChange(e: { detail: any; }) {
      this.filterForm = { ...this.filterForm, colour: e.detail }
    },
    onToggleTimeFrame(value: string) {
      if (value == 'warehouse') {
        this.warehouseVisible = !this.warehouseVisible
      } else if(value == 'warehouseStatus') {
        this.warehouseStatusVisible = !this.warehouseStatusVisible
      } else {
        this.invStatusTypeVisible = !this.invStatusTypeVisible
      }
      this.timeFrameVisible = !this.timeFrameVisible
    },
    onSubmitFilterForm() {
      getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST, payload: [] })
      this.filterForm = { ...this.filterForm, pageNo: 1 }
      this.myGetOrderList()
      this.visible = !this.visible
    },
    // 重置侧边栏
    onSubmitFilterFormReset() {
      this.filterForm.model = '',
        this.filterForm.colour = ''
      this.filterForm.warehouseId = ''
      this.filterForm.invStatusId = ''
      this.filterForm.isLock = ''
      this.filterForm.dealerMaterialGroupFlag = ''
      this.filterForm.pageNo = 1,
        this.warehouseName = '全部'
        this.warehouseStatusName = '全部'
        this.invStatusTypeName = '全部'
      this.filterForm.invStatusType = ''
      this.setData({
        inputvalue: ''
      })
    },
    onGetOrderListNext() {
      if (this.totalPage > this.filterForm.pageNo) {
        this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1 }
        this.myGetOrderList()
      }
    },
    onMore(uniqueFlag) {
      this.inventoryList.forEach(inv => {
        if (uniqueFlag == inv.uniqueFlag) {
          inv.moreSign = !inv.moreSign
        }
      })
    }
  };
  myGetOrderList() {
    const { model, colour, warehouseId, invStatusId,invStatusType, isLock, dealerMaterialGroupFlag, materialGroupCode, materialGroupName,gicWarehouseType, pageNo, invType } = this.filterForm
    this.methods.getMaterialInventoryPage({
      _loading: true,
      cisCode: wepy.$instance.globalData.cisCode,
      terms: {
        model,
        colour,
        warehouseId,
        invStatusId,
        isLock,
        dealerMaterialGroupFlag,
        materialGroupCode,
        materialGroupName,
        gicWarehouseType,
        invStatusType,
        invType,
        bigQtyMin: ''  //最小可用库存数量,传空取所有的
      },
      page: { pageNo, pageSize: 10 }
    });
  }
  /*onShow() {
    getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST, payload: [] })
    this.myGetOrderList()
  }*/
  onLoad() {
    getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST, payload: [] })
    this.myGetOrderList()
    this.methods.getBaseData({
      cisCode: wepy.$instance.globalData.cisCode, "type": 'cglrrkck','orgId':'', userAccount: wepy.$instance.globalData.account
    }).then((res: { payload: { data: any[]; }; }) => {
      if (res && res.payload && res.payload.data && res.payload.data.length > 0) {
        forEachObjIndexed((value, key) => {
          this.Warehouserel = key
        }, res.payload.data[0])
      } else {
        this.Warehouserel = ''
      }
    })
    this.methods.getBaseData({ cisCode: wepy.$instance.globalData.cisCode, "type": 'kczt', userAccount: wepy.$instance.globalData.account })
    this.methods.getBaseData({ cisCode: wepy.$instance.globalData.cisCode, "type": 'wlz', userAccount: wepy.$instance.globalData.account })
    this.methods.getInvStatusType().then(res => {
      console.log(res);
    })
  }
}
