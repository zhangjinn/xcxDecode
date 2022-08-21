import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { getOrderList, getOrderFilter } from '@/store/actions/order';
import Toast from '@/components/vant/toast/toast';
import { againCommonOrder } from '@/store/actions/order';
import { fillZero, formatDate, getDateDiff } from '@/utils/index';
import { baseUrl } from '@/utils/request';
import { getPurchaseList, getBaseData, getPurchaseListIn, getMerchantSuppliersList, getVendorItemGroupList } from '@/store/actions/purchaseshop';
import { forEachObjIndexed } from 'ramda';
import { RESET_PURCHASE_LIST,RESET_VENDOR_ITEM_GROUP, RESET_PURCHASE_IMG } from '@/store/types/purchaseshop';
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
  visible: boolean;
  Suppliersextend: boolean;
  Itemgroupextend: boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  timeFrameVisible: boolean;
  calendarShow: boolean;
  filterForm: object;
  filterFormExtra: object;
  calendarConfig: object;
  currentDateName: string;
  baseUrl: string;
  errorText: string;
  errorPopup: boolean;
  inputvalue: string;
  Warehouserel: string;
  Supplier: string;
  itemgroup: string;
  isCheckAll: boolean;
  WarehouseListvisible: boolean;
  deliveryMethod: string;
}

@connect({
  purchaseList({ purchaseshop }) {
    return purchaseshop.purchaseList
  },
  baseData({ purchaseshop }) {
    return purchaseshop.baseData
  },
  SuppliersList({ purchaseshop }) {
    return purchaseshop.purchaseSupplier
  },
  ItemgroupList({ purchaseshop }) {
    return purchaseshop.purchaseMaterialGroup
  },
  totalPage({ purchaseshop }) {
    return purchaseshop.totalPage
  },
  filter({ order }) {
    return order.filter
  },
}, {
  getOrderFilter,
  getPurchaseList,
  getBaseData,
  getPurchaseListIn,
  getMerchantSuppliersList,
  getVendorItemGroupList
})
export default class PurchaseShop extends wepy.page {
  config = {
    navigationBarTitleText: '直采入库',
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
  };
  data: Data = {
    errorPopup: false,
    errorText: '',
    inputvalue: '',
    Warehouserel: '',
    Supplier: '供应商',
    itemgroup: '物料组',
    isCheckAll: false,
    WarehouseListvisible: false,
    deliveryMethod: '全部',
    visible: false,
    Suppliersextend: false,
    Itemgroupextend: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    timeFrameVisible: false,
    calendarShow: false,
    currentDateName: '',
    filterForm: {
      supplierCode: '', // 供应商编码
      maters: '', // 物料组
      pageNo: 1,
      // 采购业务员
      PurchasingSalesman: '',
      // 采购单号
      purchaseorderNo: '',
      beginDate: '',
      endDate: '',
      // 配送方式
      deliveryMethodtype: '',
      // 起止时间
      sapBeginDate: '',
      sapEndDate: '',
    },
    filterFormExtra: {
      orgName: '',
      matklName: '',
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    baseUrl: baseUrl,
  };
  // 页面内交互写在methods里
  methods = {
    imgLose: ({ detail }: any) => {
      getStore().dispatch({ type: RESET_PURCHASE_IMG, payload: detail })
    }
    // 选择仓库
    chooseWarehouse: (key) => {
      this.baseData.forEach((res) => {
        if (res.key == key) {
          res.isSelect = true
        } else {
          res.isSelect = false
        }
      })
      this.Warehouserel = key
    },
    // 全选 神他妈的逻辑  下次用些的数组
    checkAll: () => {
      this.isCheckAll = !this.isCheckAll
      let type = 1
      this.purchaseList.forEach((element: { id: any; isSelect: boolean; }) => {
        if (element.isSelect !== true) {
          type = 2
          return
        }
      });
      if (type == 1) {
        this.purchaseList.forEach((res: { isSelect: boolean; }) => {
          res.isSelect = false
        })
      } else {
        if (this.isCheckAll) {
          this.purchaseList.forEach((res: { isSelect: boolean; }) => {
            res.isSelect = true
          })
        } else {
          this.purchaseList.forEach((res: { isSelect: boolean; }) => {
            res.isSelect = false
          })
        }
      }
    },
    // 订单选中
    selectPuchaseItem: (id: any) => {
      this.purchaseList.forEach((element: { id: any; isSelect: boolean; }) => {
        if (element.id == id) {
          element.isSelect = !element.isSelect
        }
      });
    },
    errorBeSure:() => {
      getStore().dispatch({ type: RESET_PURCHASE_LIST, payload: [] })
      this.myGetOrderList()
      this.errorPopup = false
      this.errorText = ''
      this.isCheckAll = false
      this.filterForm.pageNo = 1
      this.$apply()
    },
    OnseleWarehouse: () => {
      let purchaseOrderIds = []
      this.purchaseList.forEach((res) => {
        if (res.isSelect == true) {
          purchaseOrderIds.push(res.id)
        }
      })
      if (purchaseOrderIds.length > 0) {
        this.WarehouseListvisible = !this.WarehouseListvisible
      } else {
        Toast.fail({
          message: '请选择商品',
          duration: 1000,
        });
      }
    },
    // 批量入库
    submitOrder: () => {
      this.WarehouseListvisible = !this.WarehouseListvisible
      let purchaseOrderIds = []
      this.purchaseList.forEach((res) => {
        if (res.isSelect == true) {
          purchaseOrderIds.push(res.id)
        }
      })
      if (purchaseOrderIds.length > 0) {
        this.methods.getPurchaseListIn({
          _loading: true,_ignoreToast: true, warehouseId: this.Warehouserel, purchaseOrderIds: purchaseOrderIds
        }
        ).then((res) => {
          if (res && res.payload && res.payload.data && res.payload.data.code && res.payload.data.code == "1") {
            this.errorPopup = true
            this.errorText = res.payload.data.msg
            this.$apply()
          } else if (res && res.payload && res.payload.code && res.payload.code == "0") {
            Toast.success({
              message: '商品入库成功',
              duration: 1000,
            });
            setTimeout(() => {
              getStore().dispatch({ type: RESET_PURCHASE_LIST, payload: [] })
              this.myGetOrderList()
              this.isCheckAll = false
              this.filterForm.pageNo = 1
            }, 1000);
          }
        })
      } else {
        Toast.fail({
          message: '请选择商品',
          duration: 1000,
        });
      }
    },
    // poupo close
    closePolicy: () => {
      this.WarehouseListvisible = false
    },
    // 供应商选择
    touchOrderSFilter: (name) => {
      if (!this.OrderSFilterVisible) {
        this.OrderSFilterVisible = true
        this.CurrentOrderSFilterName = name
        return
      }
      if (!name) {
        this.OrderSFilterVisible = false
        this.CurrentOrderSFilterName = ''
        return
      }
      if (this.CurrentOrderSFilterName === name) {
        this.OrderSFilterVisible = false
        this.CurrentOrderSFilterName = ''
        return
      }
      if (['orderType', 'orderStatus', 'auditStatus'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    // 查看详情
    viewDetail: (e: any) => {
      if (e) {
        wx.navigateTo({
          url: `/pages/dms/purchase-detail/index?purchaseOrderId=${e}`
        })
      }
    },
    // 筛选
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    // 供应商下拉列表
    onSelectOrderTypeCode(supplierCode, orgId, fullName) {
      getStore().dispatch({ type: RESET_PURCHASE_LIST, payload: [] })
      getStore().dispatch({ type: RESET_VENDOR_ITEM_GROUP, payload: [] })
      if (fullName) {
        this.Supplier = fullName
      }
      this.itemgroup = '物料组'
      this.filterForm = { ...this.filterForm, maters: '' }
      this.methods.getVendorItemGroupList({
        cisCode: wepy.$instance.globalData.cisCode,
        supplierCode: supplierCode,
        orgId: orgId
      })
      this.SuppliersList.forEach((res) => {
        if (res.supplierCode == supplierCode && res.orgId == orgId) {
          res.isSelect = true
        } else {
          res.isSelect = false
        }
      })
      this.filterForm = { ...this.filterForm, supplierCode, pageNo: 1 }
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    onSelectStatus(maters) {
      getStore().dispatch({ type: RESET_PURCHASE_LIST, payload: [] })
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
      this.filterForm = { ...this.filterForm, maters, pageNo: 1 }
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
    },
    // onSelectmatkl(matkl) {
    //   const { key, value } = matkl
    //   if (this.filterForm.matklId === key) {
    //     this.filterForm = { ...this.filterForm, matklId: '' }
    //     this.filterFormExtra = { ...this.filterFormExtra, matklName: '' }
    //     return
    //   }
    //   this.filterForm = { ...this.filterForm, matklId: key }
    //   this.filterFormExtra = { ...this.filterFormExtra, matklName: value }
    // },
    onZzprdmodelChange(e) {
      this.filterForm = { ...this.filterForm, purchaseorderNo: e.detail }
    },
    onOrderCodeChange(e) {
      this.filterForm = { ...this.filterForm, PurchasingSalesman: e.detail }
    },
    onToggleTimeFrame() {
      this.timeFrameVisible = !this.timeFrameVisible
    },
    onSelectTimeFrame(deliveryMethodtype: string) {
      this.filterForm = { ...this.filterForm, deliveryMethodtype }
      if (deliveryMethodtype == '') {
        this.deliveryMethod = '全部'
      } else if (deliveryMethodtype == '06') {
        this.deliveryMethod = '直配（分销商）'
      } else if (deliveryMethodtype == '04') {
        this.deliveryMethod = '直配（个人）'
      } else if (deliveryMethodtype == '01') {
        this.deliveryMethod = '自提'
      } else if (deliveryMethodtype == '02') {
        this.deliveryMethod = '配送'
      }
      this.timeFrameVisible = !this.timeFrameVisible
    },
    onSubmitFilterForm() {
      getStore().dispatch({ type: RESET_PURCHASE_LIST, payload: [] })
      this.filterForm = { ...this.filterForm, pageNo: 1 }
      // TODO:
      this.myGetOrderList()
      this.visible = !this.visible
    },
    // 重置侧边栏
    onSubmitFilterFormReset() {
      this.filterForm.deliveryMethodtype = '',
        this.filterForm.purchaseorderNo = ''
      this.filterForm.sapBeginDate = ''
      this.filterForm.sapEndDate = ''
      this.filterForm.PurchasingSalesman = ''
      this.filterForm.pageNo = 1,
        this.deliveryMethod = '全部'
      this.setData({
        inputvalue: ''
      })
    }
    // 选择日期
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { sapBeginDate, sapEndDate } = this.filterForm;
      const { name, type } = e.target.dataset
      this.currentDateName = name
      let begin, end;
      if (type === 'sapDate') {
        begin = sapBeginDate
        end = sapEndDate
      }
      if (name.indexOf('eginDate') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if (name.indexOf('ndDate') > -1) {
        this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
      }
      this.calendarShow = true;
    },
    closeCalendar() {
      this.calendarShow = false;
    },
    clearCalendar(name) {
      this.filterForm = { ...this.filterForm, [name]: '' }
    },
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.filterForm = { ...this.filterForm, [this.currentDateName]: day }
      this.calendarShow = false;
    },
    onGetOrderListNext() {
      if (this.totalPage > this.filterForm.pageNo) {
        this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1 }
        this.myGetOrderList()
      }
      this.isCheckAll = false
      this.purchaseList.forEach((res: { isSelect: boolean; }) => {
        res.isSelect = false
      })
    },
  };
  myGetOrderList() {
    if (wepy.$instance.globalData.cisCode) {
      this.methods.getPurchaseList({
        _loading: true, cisCode: wepy.$instance.globalData.cisCode,
        terms: {
          documentNum: this.filterForm.purchaseorderNo,
          supplierCode: this.filterForm.supplierCode,
          maters: this.filterForm.maters,
          startDocumentDate: this.filterForm.sapBeginDate,
          endDocumentDate: this.filterForm.sapEndDate,
          deliveryTypeCode: this.filterForm.deliveryMethodtype,
          userName: this.filterForm.PurchasingSalesman
        },
        page: { pageNo: this.filterForm.pageNo, pageSize: 10 }
      });
    }
  }
  onShow() {
    getStore().dispatch({ type: RESET_PURCHASE_LIST, payload: [] })
    this.myGetOrderList()
  }
  onLoad() {
    this.methods.getMerchantSuppliersList({
      cisCode: wepy.$instance.globalData.cisCode
    }),
      this.methods.getBaseData({
        cisCode: wepy.$instance.globalData.cisCode, "type": 'cglrrkck', userAccount: wepy.$instance.globalData.account
      },
      ).then((res: { payload: { data: any[]; }; }) => {
        forEachObjIndexed((value, key) => {
          this.Warehouserel = key
        }, res.payload.data[0])
      })
    // this.methods.getBaseData({
    //   _loading: true, cisCode: wepy.$instance.globalData.cisCode, "type": 'wlz', userAccount: wepy.$instance.globalData.account,
    // }
    // )
    // // gys
    // this.methods.getBaseData({
    //   _loading: true, cisCode: wepy.$instance.globalData.cisCode, "type": 'gys', userAccount: wepy.$instance.globalData.account,
    // }
    // ).then((res: { payload: { data: any[]; }; }) => {
    //   forEachObjIndexed((value, key) => {
    //     this.Supplier = value
    //     this.filterForm.supplierCode = key
    //   }, res.payload.data[0])
    //   this.myGetOrderList()
    // })
  }
}
