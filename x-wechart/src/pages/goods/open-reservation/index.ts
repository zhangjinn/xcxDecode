import wepy from 'wepy';
import {connect, getStore} from 'wepy-redux';
import { fillZero } from '@/utils/index';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
import {baseUrl, request} from '@/utils/request';
import { getOpenReservationList, getDistributorType } from '@/store/actions/inventory';
import { RESET_OPEN_RESERVATION } from '@/store/types/inventory';
interface Data {
  visible: boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  calendarShow: boolean;
  filterForm: object;
  calendarConfig: object;
  currentDateName: string;
  baseUrl: string;
  scrollTop: number;
  orgList: object[];
  subAccountList: object[];
  warehouseList: object[];
  headerTabList: any[];
}

@connect({
  openReservationList({inventory}) {
    return inventory.openReservationList
  },
  openReservationTotalPage({inventory}) {
    return inventory.openReservationTotalPage
  },

}, {
  getOpenReservationList,
  getDistributorType,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '未结预留',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-field': '../../../components/vant/field/index',
      'van-loading': '../../../components/vant/loading/index',
      'calendar': '../../../components/calendar/index',
    },
  };
  components = {
    emptyDataType,
    headerTab,
  };
  data: Data = {
    visible: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    calendarShow: false,
    currentDateName: '',
    scrollTop: -1,
    filterForm: {
      terms: {
        startDate: '',
        endDate: '',
        orgCode: '', // 销售组织
        subAccountCode: '', // 子账号
        warehouseCode: '', // 仓库
        documentNumber: '', // 单据编号
        materialGroupName: '', // 物料组名称
        model: '', // 型号
      },
      page: {
        pageNo: 1,
        pageSize: 10,
      },
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    baseUrl: baseUrl,
    orgList:[],
    subAccountList:[],
    warehouseList:[],
    headerTabList: [
      { name: '销售组织', type: 'orderOrg', selectValue: '' },
      { name: '子账号', type: 'orderSubAccount', selectValue: '' },
      { name: '仓库', type: 'orderWarehouse', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };
  // 页面内交互写在methods里
  methods = {

    // 切换顶部快捷筛选
    touchOrderSFilter: (tabItem) => {
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
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
      if (['orderOrg','orderSubAccount','orderWarehouse'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 选择快捷筛选内容列表
    onSelectOrg(data, type) {
      getStore().dispatch({ type: RESET_OPEN_RESERVATION, payload: [] })

      let newData = {}
      if(type == 'orderOrg'){
        newData.orgCode = data
        this.headerTabList[0].selectValue = data
      }else if(type == 'orderSubAccount'){
        newData.subAccountCode = data
        this.headerTabList[1].selectValue = data
      }else if(type == 'orderWarehouse'){
        newData.warehouseCode = data
        this.headerTabList[2].selectValue = data
      }
      this.filterForm.terms = { ...this.filterForm.terms, ...newData }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },

    // 点击普通筛选按钮-显示或隐藏左侧筛选框
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 筛选确定
    onSubmitFilterForm() {
      getStore().dispatch({ type: RESET_OPEN_RESERVATION, payload: [] })

      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
      this.methods.scrollToTop()
    },

    // 筛选重置
    onResetFilterForm() {
      this.filterForm.terms = {
        ...this.filterForm.terms,
        documentNumber: '',
        materialGroupName: '',
        model: '',
        startDate: '',
        endDate: ''
      }
    },

    // 打开日历
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { startDate, endDate } = this.filterForm.terms;
      const { name, type } = e.target.dataset
      this.currentDateName = name
      let begin, end;
      if (type === 'date') {
        begin = startDate
        end = endDate
      }
      if (type === 'sapDate') {
        begin = startDate
        end = endDate
      }
      if (name.indexOf('startDate') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if (name.indexOf('ndDate') > -1) {
        this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
      }
      this.calendarShow = true;
    },

    // 关闭日历
    closeCalendar() {
      this.calendarShow = false;
    },

    // 清空已选日期
    clearCalendar(name) {
      this.filterForm.terms = { ...this.filterForm.terms, [name]: '' }
    },

    // 选择日期
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.filterForm.terms = { ...this.filterForm.terms, [this.currentDateName]: day }
      this.calendarShow = false;
    },

    // 改变单据编号
    onDocumentNumberChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, documentNumber: e.detail }
    },

    // 改变物料组名称
    onMaterialGroupNameChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, materialGroupName: e.detail }
    },

    // 改变型号
    onModelChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, model: e.detail }
    },

    // 回到顶部
    scrollToTop: () => {
      this.scrollTop = 0
    },

    // 滚动列表
    onScroll: (event: Weapp.Event) => {
      if (this.scrollTop === 0) {
        this.scrollTop = event.detail.scrollTop
      }
    },

    // 列表分页
    onGetOrderListNext() {
      let totalPage = this.openReservationTotalPage
      if (totalPage > this.filterForm.page.pageNo) {
        this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1 }
        this.myGetOrderList()
      }
    },

  };

  myGetOrderList() {
    let { terms, page } = this.filterForm
    let param = {
      page: {
        pageNo: page.pageNo,
        pageSize: page.pageSize,
      },
      terms: {
        startDocumentDate: terms.startDate, // 开始日期
        endDocumentDate: terms.endDate, // 结束日期
        documentNum: terms.documentNumber, // 单据编号
        gicWarehouse: terms.warehouseCode, // 仓库编码
        materialGroupName: terms.materialGroupName, // 物料组名称
        model: terms.model, // 型号
        orgCode: terms.orgCode, // 销售组织
        childDealerCode: terms.subAccountCode, // 子账号
      }
    }
    this.methods.getOpenReservationList({ _loading: true, ...param })

  }
  getFilterCondition(){

    // 获取子账号
    this.methods.getDistributorType({
      field: "childDealerCode",
      formCode: "notReleaseReserveCondition",
    }).then((res)=>{
      const { payload: { data }} = res
      this.subAccountList = []
      this.subAccountList = data.map((item)=>{
        return {
          id: item.code,
          name: item.name
        }
      })
    })

    // 获取仓库
    this.methods.getDistributorType({
      field: "gicWarehouse",
      formCode: "notReleaseReserveCondition",
    }).then((res)=>{
      const { payload: { data }} = res
      this.warehouseList = []
      this.warehouseList = data.map((item)=>{
        return {
          id: item.code,
          name: item.name
        }
      })
    })

    // 获取组织
    request({
      api: 'comm/queryOrg.nd',
      method: 'GET',
      callback: (res: any) => {
        const { orgList } = res.data;
        if (orgList && orgList.length > 0) {
          this.orgList = orgList.map((item)=>{
            return {
              id: item.code,
              name: item.name
            }
          });
          this.$apply();
        }
      },
    });
  }
  onShow() {
    this.getFilterCondition()
    getStore().dispatch({ type: RESET_OPEN_RESERVATION, payload: [] })

    this.myGetOrderList()
  }

}
