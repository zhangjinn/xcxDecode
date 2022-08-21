import wepy from 'wepy';
const { baseUrl, imgUrl } = wepy.$appConfig;
import { connect, getStore } from 'wepy-redux';
import {  getOrderFilter } from '@/store/actions/order';
import {getReturnGoods,getFiterWarehouse,getFiterStatusList} from "@/store/actions/returngoods"
import { fillZero, getLastMonthYesterday, getDateDiff } from '@/utils/index';
import { baseUrl, request } from '@/utils/request';
import utilsWxs from '../../../wxs/utils.wxs';
import { forEach, keys } from 'ramda';
import { RESET_ORDER_LIST } from '@/store/types/order';
import Dialog from '@/components/vant/dialog/dialog';
import { formatImg, MarketFormatImg } from '@/utils/index';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

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
  popupTitle: string;
  agentPopup: boolean;
  agentPopupName: string;
  statusName: string;
  purchasePopupName: string;
  cancelOrderPopup: boolean;
  cancelOrderId: string;
  continuePayPopup: boolean;
  continuePayId: string;
  scrollTop: number;
  returnGoodLength:number;
  headerTabList: any[];
}

@connect({
  filter({ order }) {
    return order.filter
  },
  // orderList({ returnGoods }) {
  //   return returnGoods.orderList
  // },
}, {
  getReturnGoods,
  getOrderFilter,
  getFiterWarehouse,
  getFiterStatusList

})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '共享退货明细',
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
      'van-dialog': '../../../../components/vant/dialog/index',
    },
  };
  components = {
    emptyDataType,
    headerTab,
  };
  wxs = {
    utils: utilsWxs,
  };
  data: Data = {
    visible: false,
    Suppliersextend: false,
    Itemgroupextend: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    timeFrameVisible: false,
    calendarShow: false,
    agentPopup: false,
    popupTitle: '',
    agentPopupName: '全部',
    statusName: '全部',
    purchasePopupName: '全部',
    currentDateName: '',
    cancelOrderPopup: false,
    cancelOrderId: '',
    continuePayPopup: false,
    continuePayId: '',
    scrollTop: 0,
    filterForm: {
      _loading: true,
      agentCheckStart: '',
      agentCheckEnd: '',
      pageNo: 1,
      orderTypeCode: '',
      status: '',
      sapOrderStatus: '',
      returnOrderCode: '',
      zzprdmodel: '',
      orgId: '',
      matklId: '',
      startOrderDate: '',
      endOrderDate: '',
      timeFrame: '',
      agentId: '',
      trans: '',
      directBuy: '',
      purchaseTypeId: '',
      returnWarehouse:'',
    },
    returnGoodLength:null,
    filterFormExtra: {
      orgName: '',
      matklName: '',
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    baseUrl: baseUrl,
    viewShowed:false,
    companyList:[],
    returnGoodsList:[],
    StatusList:[],
    headerTabList: [
      { name: '销售组织', type: 'orderType', selectValue: '' },
      { name: '状态', type: 'auditStatus', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };
  // 页面内交互写在methods里
  methods = {
    name(e) {
      // console.log('点击选中',e)
      this.filterForm.returnWarehouse = e.currentTarget.dataset.index
      this.viewShowed = false
    },


    onClearFilterForm(){
      this.filterForm.returnOrderCode = ''
      this.filterForm.zzprdmodel = ''
      this.filterForm.startOrderDate = ''
      this.filterForm.endOrderDate = ''
      this.filterForm.orgId = ''
      this.filterFormExtra.orgName = ''
      this.agentPopupName = ''
      this.filterForm.agentId = ''
      this.statusName = ''
      this.filterForm.status = ''
      this.filterForm.returnWarehouse = ''
    },

    onScroll: (event: Weapp.Event) => {
      if (event.detail.scrollTop >= 350) {
        if (this.scrollTop === 0) {
          this.scrollTop = event.detail.scrollTop
        }
      }
    },
    cancelOrderPopup: (id: any, code: any, orderType: any, states: any) => {
      /*this.cancelOrderId = id
      this.cancelOrderPopup = true
      this.$apply()*/
      //常规订单 BHO2000038043
      if(orderType == '8311' && (states == 'ALREADYPLANPRODUCT' || states == 'ARRANGEDPRODUCT' || states == 'UNCHKED' || states== 'WAITDELIVER' || states== 'PARTCHECKED' )){
        Dialog.confirm({
          message: "取消‘评审通过’,‘已安排生产’,‘待排发货计划’,‘待发货’,‘发货中’状态的常规订单，会判定为商家违约，请确认是否取消？",
        }).then(() => {
          //跳转到取消页面
          wx.navigateTo({
            url: `/pages/me/order-cancel/index?orderId=` + id + `&orderCode=` + code + `&ly=0`
          })
        }).catch(() => {
          // on cancel
        });
      }
    },



    selectAgent: (key: any) => {
      forEach((item) => {
        if (item.key == key) {
          this.agentPopupName = item.value
          this.filterForm = { ...this.filterForm, agentId: item.key }
        }
      }, this.filter.itemAgent)
      this.agentPopup = false
      this.$apply()
    },
    selectDelivery: (key: any) => {
      forEach((item: any) => {
        if (item.id == key) {
          this.statusName = item.name
          this.filterForm = { ...this.filterForm, status: item.id }
        }
      }, this.StatusList)
      this.agentPopup = false
      this.$apply()
    },

    selectagentPopup: (e) => {
      if (e == 'salesOrganization') {
        this.popupTitle = '销售组织'
      } else if (e == 'Warehouse') {
        this.popupTitle = '统仓仓库'
      } else if (e == 'state') {
        this.popupTitle = '状态'
      }
      this.agentPopup = !this.agentPopup
    },
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
      if (['orderType', 'orderStatus', 'auditStatus'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    viewDetail: (e: any) => {
      if (e) {
        wx.navigateTo({
          url: `/pages/me/order-detail/index?id=${e}`
        })
      }
    },
    Suppliers: () => {
      this.Suppliersextend = !this.Suppliersextend
    },
    Itemgroup: () => {
      this.Itemgroupextend = !this.Itemgroupextend
    },
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    onSelectOrderTypeCode(orgId) {
      this.filterForm = { ...this.filterForm, orgId, pageNo: 1 }
      this.headerTabList[0].selectValue = orgId
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.methods.touchOrderSFilter()
      this.myGetfiterOrder()
    },
    onSelectStatus(status) {
      this.filterForm = { ...this.filterForm, status, pageNo: 1 }
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.methods.touchOrderSFilter()
      this.myGetfiterOrder()
    },
    onSelectSOStatus(status) {
      this.filterForm = { ...this.filterForm, status, pageNo: 1 }
      this.headerTabList[1].selectValue = status
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.methods.touchOrderSFilter()
      this.myGetfiterOrder()
    },
    onSelectOrg(org: any) {
      const { key, value } = org
      if (this.filterForm.orgId === key) {
        this.filterForm = { ...this.filterForm, orgId: '' }
        this.filterFormExtra = { ...this.filterFormExtra, orgName: '' }
        return
      }
      this.filterForm = { ...this.filterForm, orgId: key }
      this.filterFormExtra = { ...this.filterFormExtra, orgName: value }
      this.agentPopup = false
    },
    onSelectmatkl(matkl: any) {
      const { key, value } = matkl
      if (this.filterForm.matklId === key) {
        this.filterForm = { ...this.filterForm, matklId: '' }
        this.filterFormExtra = { ...this.filterFormExtra, matklName: '' }
        return
      }
      this.filterForm = { ...this.filterForm, matklId: key }
      this.filterFormExtra = { ...this.filterFormExtra, matklName: value }
    },
    onZzprdmodelChange(e) {
      this.filterForm = { ...this.filterForm, zzprdmodel: e.detail }
    },
    onOrderCodeChange(e) {
      this.filterForm = { ...this.filterForm, returnOrderCode: e.detail }
    },
    onOrderWarehouse(e) {
      // this.filterForm = { ...this.filterForm, Warehouse: e.detail }
     // 调接口  如果接口列表不为空的话  this.viewShowed = true e.detail是模糊查询参数
        // console.log('e.detail',e.detail)
        let that = this
        let data = { term : e.detail}
        if (e.detail) {
          getFiterWarehouse(data, res => {
            // console.log(res)
            if(res.data.length > 0) {
              let arrList = [];
              for (let i in res.data) {
                var j = {};
                j.name = res.data[i]
                arrList.push(j);
              }
              // console.log(arrList)
              that.companyList.push(...arrList)
              // debugger
              that.viewShowed = true
              that.$apply()
            } else {
              this.filterForm.returnWarehouse = e.detail
              this.companyList = []
              that.viewShowed = false
              that.$apply()
            }
            // if (res.data.result && res.data.result.items && res.data.result.items.length > 0) {
            //   this.companyList = []
            //   that.companyList.push(...res.data.result.items)
            //   that.viewShowed = true
            //   that.$apply()
            // } else {
            //   this.companyList = []
            //   that.viewShowed = false
            //   that.$apply()
            // }
          })
        } else {
          that.viewShowed = false
          this.filterForm.returnWarehouse = ''
        }
    },
    onToggleTimeFrame() {
      this.timeFrameVisible = !this.timeFrameVisible
    },
    onSelectTimeFrame(timeFrame) {
      this.filterForm = { ...this.filterForm, timeFrame }
    },
    onSubmitFilterForm() {
      this.filterForm = { ...this.filterForm, pageNo: 1 }
      getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
      this.scrollTop = 0
      this.myGetfiterOrder()
      this.methods.orderfiltering()
    },
    // 选择日期
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { startOrderDate, endOrderDate, sapBeginDate, sapEndDate, agentCheckStart, agentCheckEnd } = this.filterForm;
      const { name, type } = e.target.dataset
      this.currentDateName = name
      let begin, end;
      if (type === 'date') {
        begin = startOrderDate
        end = endOrderDate
      }
      if (type === 'agent') {
        begin = agentCheckStart
        end = agentCheckEnd
      }
      if (type === 'sapDate') {
        begin = sapBeginDate
        end = sapEndDate
      }
      if (name.indexOf('beginDate') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if (name.indexOf('endDate') > -1) {
        this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
      }
      if (name.indexOf('agent') > -1) {
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
      // debugger
      const  totalPages  = this.returnGoodLength
      if (totalPages > this.filterForm.pageNo) {
        // debugger
        this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1 }
       this.myGetOrderList()
      }
    },
  };
    //  状态筛选条件
    getFiterStatus(){
      this.methods.getFiterStatusList().then(res=>{
        // debugger
        // console.log('res,',res.payload)
        let newArr = []
        for (let key in res.payload) {
            newArr.push({
              id:key,
              name: res.payload[key]
            })
        }
        // console.log(newArr);
        this.StatusList = newArr

      })
    }
  myGetOrderList() {
    this.methods.getReturnGoods(this.filterForm).then(res=>{
      this.returnGoodLength = res.payload.totalPages
      // console.log('获取数据',res);
      // this.returnGoodsList =  res.payload.list

      this.returnGoodsList = this.returnGoodsList.concat(res.payload.list)
      this.returnGoodsList.forEach(item=>{
        // console.log('cosnloe',item)
        // debugger
        item.itemInfoList.forEach(goods=>{
          if (goods.image) {
            // debugger
            const imgs = goods.image.split('/')
            goods.image = formatImg({
              format: imgs[2],
              name: imgs[3],
              materialId: imgs[0],
              itemId: imgs[1]
            }
            )}
          // console.log('goods.image',goods.image);

          if (goods.defaultImage) {
            const imgs = goods.defaultImage.split('/')
            goods.defaultImage = formatImg({
              name: imgs[imgs.length - 1]
            })
          }
        })

      })

      this.$apply()
    });

  }

  myGetfiterOrder() {
    this.methods.getReturnGoods(this.filterForm).then(res=>{
      this.returnGoodLength = res.payload.totalPages
      // console.log('获取数据',res);
      // this.returnGoodsList =  res.payload.list

      this.returnGoodsList = res.payload.list
      this.returnGoodsList.forEach(item=>{
        // console.log('cosnloe',item)
        // debugger
        item.itemInfoList.forEach(goods=>{
          if (goods.image) {
            // debugger
            const imgs = goods.image.split('/')
            goods.image = formatImg({
              format: imgs[2],
              name: imgs[3],
              materialId: imgs[0],
              itemId: imgs[1]
            }
            )}
          // console.log('goods.image',goods.image);

          if (goods.defaultImage) {
            const imgs = goods.defaultImage.split('/')
            goods.defaultImage = formatImg({
              name: imgs[imgs.length - 1]
            })
          }
        })

      })

      this.$apply()
    });

  }

  onShow() {
    // const now = new Date()
    // const month = now.getMonth() + 1
    // const day = now.getDate()
    // this.filterForm = {
    //   ...this.filterForm,
    //   // beginDate: `${now.getFullYear()}-01-01`,
    //   startOrderDate: getLastMonthYesterday(),
    //   endOrderDate: `${now.getFullYear()}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`
    // }

    this.myGetOrderList()
    // 销售组织筛选条件
    this.methods.getOrderFilter({ type: 1 });
    //  状态筛选条件
    this.getFiterStatus()
  }
}
