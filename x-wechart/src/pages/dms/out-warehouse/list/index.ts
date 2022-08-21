import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { clone, forEach } from 'ramda';
import CommonMixin from '@/mixins/common';
import { fillZero, getAlertInfo } from '@/utils/index';
import { getOutWarehouseOrderList, getOutWarehouseList, submitBatchOut, cancleOutWarehouseSalesOrder, salesOrderNeedScan, salesOrderBatchOut, cancelReview} from '@/store/actions/dmsoutwarehouse';
import { DMS_OUT_WAREHOUSE_CHG, DMS_CLEAR_OUT_WAREHOUSE } from '@/store/types/dmsoutwarehouse';
import Toast from '@/components/vant/toast/toast';
import Dialog from '@/components/vant/dialog/dialog';
import productCardInfo from "../product-card-info/index";
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  calendarConfig: object;
  statusVisible: boolean;
  documentTypeVisible: boolean;
  filterFormVisible: boolean;
  calendarShow: boolean;
  outFormVisible: boolean;
  currentDateName: string;
  statusList: any[];
  documentTypeList: any[];
  filterForm: object;
  dismissedPopup: boolean;
  dismissedPopupShow: any [];
  freeShippingTip: string;
  headerTabList: any[];
}

const defaultFilterForm = {
  documentNum: '',        //销售单号
  customerCode: '',          //客户编码
  customerName: '',              //客户名称
  warehouseCode: '',           //仓库编码
  warehouseName: '',         //仓库名称
  startDate: '',            //开始时间
  endDate: '',             //结束时间
  sellerName: '',                  //业务员
  status: '',                    //单据状态
  documentType: '',             //订单类型
}

const stores = getStore()

@connect({
  orderList({ dmsoutwarehouse }) {
    return dmsoutwarehouse.orderList
  },
  page({ dmsoutwarehouse }) {
    return dmsoutwarehouse.page
  },
  allChecked({ dmsoutwarehouse }) {
    return dmsoutwarehouse.allChecked
  },
  warehouseList({ dmsoutwarehouse }) {
    return dmsoutwarehouse.warehouseList
  },
}, {
  salesOrderBatchOut,
  getOutWarehouseOrderList,
  getOutWarehouseList,
  cancleOutWarehouseSalesOrder,
  cancelReview,
  reset: DMS_CLEAR_OUT_WAREHOUSE
})
export default class List extends wepy.page {
  config = {
    navigationBarTitleText: '销售出库',
    usingComponents: {
      'van-icon': '/components/vant/icon/index',
      'van-popup': '/components/vant/popup/index',
      'van-checkbox': '/components/vant/checkbox/index',
      'van-field': '/components/vant/field/index',
      'van-stepper': '/components/vant/stepper/index',
      'van-toast': '/components/vant/toast/index',
      'van-picker': '/components/vant/picker/index',
      'calendar': '/components/calendar/index',
      'img': '/components/img/index',
      'van-dialog': '/components/vant/dialog/index',
    },
  };
  mixins = [ CommonMixin ];
  data: Data = {
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    calendarShow: false,
    statusVisible: false,
    documentTypeVisible: false,
    filterFormVisible: false,
    outFormVisible: false,
    dismissedPopup: false,
    currentDateName: '',
    dismissedPopupShow: [],
    statusList: [
      { label: '全部', value: '' },
      { label: '已提交', value: 'submitted' },
      { label: '部分出库', value: 'part_shipped' },
      { label: '待发货', value: 'examined' }
      // { label: '已接受', value: 'accepted' },  // 暂时不做
    ],
    documentTypeList: [
      { label: '全部', value: '' },
      { label: '渠道订单', value: 'normal' },
      { label: '零售订单', value: 'retail' },
      { label: '分销商采购订单', value: 'purchase'},
    ],
    filterForm: defaultFilterForm,
    freeShippingTip: '', //免运费提示信息
    headerTabList: [
      { name: '单据状态', type: 'status', selectValue: '' },
      { name: '订单类型', type: 'documentType', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  }
  components = {
    productCardInfo,
    emptyDataType,
    headerTab,
  };
  methods = {
    // 确定驳回
    dismissedBeSure: () => {

    },
    // 取消驳回
    dismissedBeNotSure: () => {
      this.dismissedPopup = false
    },
    beSureDismissed: (id:any) => {
      const resArray = []
      forEach((item) => {
        if (item.id == id) {
          forEach((res) => {
            if (res.outChecked) {
              resArray.push(res)
            }
          },item.salesOrderItem)
          if (resArray.length == item.salesOrderItem.length || resArray.length == 0) {
            this.dismissedPopupShow = item.salesOrderItem
          } else {
            this.dismissedPopupShow = resArray
          }
        }
      },this.orderList)
      this.dismissedPopup = true
      this.$apply()
    },
    // 取消审核
    onCancelOrder: (salesOrderId) => {
      Dialog.confirm({
        title: '取消提醒',
        message: `您确定取消审核?`,
        confirmButtonText: '确定'
      }).then(async () => {
        let result = await this.methods.cancelReview({salesOrderId})

        // let result = await this.methods.cancleOutWarehouseSalesOrder({salesOrderId})
        const {payload: {code}} = result
        if (code === '0') {
          Toast.success('取消审核成功');
          setTimeout( () => {
            this.methods.getOutWarehouseOrderList(this.filterForm, 1)
          }, 2000)
        }
      }).catch(()=>{
        //cancle
      })

    },
    onDmsGoodsItems:(orderIndex: any, itemIndex: any,evt: { detail: string; }) => {
      let isNumber = /^(([1-9]{1}\d*)(\.\d{0,2})?|(0{1}\.\d{0,2}))$/
      const newOrderList = clone(this.orderList)
      if (evt.detail !== '') {
        if (isNumber.test(evt.detail)) {
          newOrderList[orderIndex].salesOrderItem[itemIndex].bprice = parseFloat(evt.detail)

        } else {
          Toast.fail({
            message: '请输入正确的数字',
            duration: 2000,
          })
        }
      } else {
        newOrderList[orderIndex].salesOrderItem[itemIndex].bprice = 0
      }
      this.dispatch({ orderList: newOrderList })
    },
    onToggleFilterItem(tabItem) {
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
      this.toggleFilterItem(name)
    },
    onSelectFilterItem(name, value) {
      this.toggleFilterItem(name)
      const filterForm = {
        ...this.filterForm,
        [name]: value,
      }
      this.headerTabList.forEach((res,index)=>{ // 筛选tab是否高亮
        if(res.type == name){
          this.headerTabList[index].selectValue = value
        }
      })
      this.filterForm = filterForm
      this.methods.getOutWarehouseOrderList(filterForm, 1)
    },
    onToggleFilterForm() {
      this.toggleFilterForm()
    },
    onFilterFormChange(evt) {
      const { detail, target: { dataset: { name } } } = evt
      this.filterForm = {
        ...this.filterForm,
        [name]: detail,
      }
    },
    onResetFilterForm() {
      const { status, documentType } = this.filterForm
      this.filterForm = {
        ...defaultFilterForm,
        status,
        documentType,
      }
    },
    onSubmitFilterForm() {
      this.methods.getOutWarehouseOrderList(this.filterForm, 1)
      this.toggleFilterForm()
    },
    onGetListNext() {
      const { currPage, totalPage } = this.page
      if(currPage < totalPage) {
        this.methods.getOutWarehouseOrderList(this.filterForm, currPage + 1)
      }
    },
    onCheckOrder(orderIndex) {
      const newOrderList = clone(this.orderList)
      const { outChecked } = newOrderList[orderIndex]
      newOrderList[orderIndex].outChecked = !outChecked
      newOrderList[orderIndex].halfChecked = !outChecked
      newOrderList[orderIndex].salesOrderItem.forEach(item => {
        item.outChecked = !outChecked
      })
      const allOrderChecked = newOrderList.some(order => !order.outChecked)
      this.dispatch({ orderList: newOrderList, allChecked: !allOrderChecked ? true : false })
    },
    onCheckAll() {
      const checked = this.allChecked
      const newOrderList = clone(this.orderList)
      newOrderList.forEach(order => {
        if (!order.isScan) {
          order.outChecked = !checked
          order.halfChecked = !checked
          order.salesOrderItem.forEach(item => {
            item.outChecked = !checked
            item.halfChecked = !checked
          })
        }
      })
      this.dispatch({ orderList: newOrderList, allChecked: !checked })
    },
    // 快速出库
    onBatchSubmitItemOut(salesOrderId){
      if(salesOrderId){
        let ids = [salesOrderId]
        this.methods.postOrderOut(ids)
      }
    },
    // 批量出库
    onBatchSubmitOut() {
      let that = this
      const orderList = that.orderList

      let checked = [],ids = [];
      orderList.forEach(order => {
        if(order.outChecked) {
          checked.push('1');
          ids.push(order.id);
        }
      })

      if(checked.length == 0) {
        Toast.fail('未选择订单')
        return
      }
      this.methods.postOrderOut(ids)

    },
    postOrderOut: (ids) => {
      let that = this
      Dialog.confirm({
        title: '出库提醒',
        message: `您确定出库?`,
        confirmButtonText: '确定'
      }).then(async () => {
        // 调用批量出库接口
        that.methods.salesOrderBatchOut(ids).then((res) => {
          res = res.payload;
          const { data } = res;
          if(res.code =='0'){
            Toast.success('出库成功');
            setTimeout(() => {
              this.methods.getOutWarehouseOrderList(this.filterForm, 1)
            }, 1000);
          } else {
            wx.showToast({
              title: data.message || data.msg || '系统错误,请稍后重试',
              duration: 5000,
              icon: 'none',
              mask: true // 是否显示透明蒙层，防止触摸穿透，默认：false
            });
            //重新加载数据
            setTimeout(() => { that.methods.getOutWarehouseOrderList(that.filterForm, that.page.currPage || 1) }, 5000)
          }
        })
      }).catch(()=>{
        //cancle
      })

    },
    onOutFormCancel() {
      this.toggleOutForm()
    },
    // 提交订单
    async onOutFormConfirm(evt) {
      const { detail: { value: { id, value } } } = evt
      const outOrders = this.orderList.filter(order => order.halfChecked && !order.disableCheck)
      let changes = {}
      let orderIds = []
      outOrders.forEach(({ id, salesOrderItem }) => {
        orderIds.push(id)
        changes[id] = salesOrderItem.filter(item => !item.disableCheck).map(({ itemId, bprice, outQty, outChecked }) => {
          const shippedBqty = outChecked ? outQty : 0
          // 出库不能修改价格  去掉bprice
          // return { itemId, shippedBqty, bprice }
          return { itemId, shippedBqty }
        })
      })
      let outForm = {
        warehouseId: id,
        orderIds,
        changes,
      }
      //37.	判断是否是扫码范围商家接口
      //const isScanDealerResult = await isScanDealer()
      //36.	判断产品是否需要扫码接口
      const isScanDealerResult = await salesOrderNeedScan({orderIds})
      if(isScanDealerResult.code === '0' ) {
        if(isScanDealerResult.isNeed){
          Toast.fail('存在需要扫码出库的订单，不可批量出库！')
        }else{
          const result = await submitBatchOut(outForm)
          if(result.code === '0') {
            this.toggleOutForm()
            Toast.success('出库成功');
            setTimeout(() => {
              this.methods.getOutWarehouseOrderList(this.filterForm, 1)
            }, 1000);
          }
        }
      }
    },
    // 选择日期
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { startDate, endDate } = this.filterForm;
      const { name } = e.target.dataset
      this.currentDateName = name
      if(name === 'startDate') {
        this.$wxpage.calendar.enableArea([minDate, endDate ? endDate : maxDate]);
      }
      if(name === 'endDate') {
        this.$wxpage.calendar.enableArea([startDate ? startDate : minDate, maxDate]);
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
  }
  toggleFilterItem(name) {
    if(name === 'status') {
      if(!this.statusVisible && this.documentTypeVisible) {
        this.documentTypeVisible = !this.documentTypeVisible
      }
      this.statusVisible = !this.statusVisible
      return
    }
    if(name === 'documentType') {
      if(!this.documentTypeVisible && this.statusVisible) {
        this.statusVisible = !this.statusVisible
      }
      this.documentTypeVisible = !this.documentTypeVisible
      return
    }
    this.statusVisible = false
    this.documentTypeVisible = false
  }
  toggleFilterForm() {
    this.filterFormVisible = !this.filterFormVisible
    this.statusVisible = false
    this.documentTypeVisible = false
  }
  toggleOutForm() {
    this.outFormVisible = !this.outFormVisible
  }
  dispatch(state) {
    stores.dispatch({ type: DMS_OUT_WAREHOUSE_CHG, payload: state })
  }
  onLoad() {
  }

  onUnload() {
    this.dispatch({allChecked: false })
    this.methods.reset()
  }
  onShow() {
    this.freeShippingTip = getAlertInfo('14187495683') // 免运费提示信息
    this.methods.getOutWarehouseOrderList(this.filterForm, this.page.currPage || 1)
  }
}
