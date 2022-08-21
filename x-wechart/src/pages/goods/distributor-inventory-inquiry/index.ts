import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import emptyDataType from "@/components/empty-data-type/index";
import { getDistributorInventoryInquiry, getDistributorType } from '@/store/actions/inventory';
import { RESET_DISTRIBUTOR_INVENTORY_INQUIRY } from '@/store/types/inventory';
interface Data {
  onShow:boolean
  inputValue: string
  filterForm: object
  dealerNameOptionListInit: any[]
  dealerNameOptionList: any[]
  currentDealerNameId: String
  dealerNameOptionShow: boolean
}

@connect({
  distributorInventoryList({ inventory }) {
    return inventory.distributorInventoryList;
  },
  distributorTotalPage({ inventory }) {
    return inventory.distributorTotalPage;
  },
}, {
  getDistributorInventoryInquiry,
  getDistributorType
})
export default class OrderCommon extends wepy.page {
  config = {
    navigationBarTitleText: '分销商库存查询',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-button': '../../../components/vant/button/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-search': '../../../components/vant/search/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      'van-checkbox': '../../../components/vant/checkbox/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-submit-bar': '../../../components/vant/submit-bar/index',
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index',
    },
  };
  components = {
    emptyDataType,
  };
  data: Data = {
    inputValue: '',
    onShow: false, // 展位图展示
    filterForm: {
      model: '', // 产品型号
      colour: '', // 颜色
      dealerName: '', // 商家名字
      pageNo: 1
    },
    dealerNameOptionShow: false,
    currentDealerNameId: '',
    dealerNameOptionList: [],
    dealerNameOptionListInit: []
  }
  myGetDistributorList() {
      this.methods.getDistributorInventoryInquiry({
        _loading: true,
        cisCode: wepy.$instance.globalData.cisCode,
        terms: {
          model: this.filterForm.model,
          colour: this.filterForm.colour,
          dealerName: this.filterForm.dealerName, // 商家名字
        },
        page: { pageNo: this.filterForm.pageNo, pageSize: 10 }
      });
  }
  methods = {
    // 产品型号
    onGoodsModel: (e: { detail: any; }) => {
      this.filterForm = { ...this.filterForm, model: e.detail }
    },
    // 产品颜色
    onGoodsColor: (e: { detail: any; }) => {
      this.filterForm = { ...this.filterForm, colour: e.detail }
    },
    // 产品名称
    onShopName: (e: { detail: any; }) => {
      let searchVal=e.detail
      this.filterForm.dealerName = searchVal
      let newListData = []; //  用于存放搜索出来数据的新数组
      this.dealerNameOptionListInit.filter(item => {
        if (item.name.toLowerCase().indexOf(searchVal) !== -1) {
          newListData.push(item);
        }
      })
      this.dealerNameOptionList = newListData
    },

    // 商家模糊搜索
    selectOptionItem(item){
      this.currentDealerNameId = item.id
      this.filterForm.dealerName = item.name
      this.dealerNameOptionShow = false
      this.$apply()
    },
    onShopFocus(e: { detail: any; }){
      let searchVal=e.detail.value

      let newListData = []; // 用于存放搜索出来数据的新数组
      this.dealerNameOptionListInit.filter(item => {
        if (item.name.toLowerCase().indexOf(searchVal) !== -1) {
          newListData.push(item);
        }
      })
      this.dealerNameOptionList = newListData
      this.dealerNameOptionShow = true
      this.$apply()
    },
    onShopBlur(){
      this.dealerNameOptionShow = false
      this.$apply()
    },

    // 查询
    onQueryInventory: () => {
      this.filterForm = { ...this.filterForm, pageNo: 1 }
      getStore().dispatch({ type: RESET_DISTRIBUTOR_INVENTORY_INQUIRY, payload: [] })
      this.onShow = true
      this.myGetDistributorList()
    },
    onGetDistributorNext:() => {
      if (this.distributorTotalPage > this.filterForm.pageNo) {
        this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1 }
        this.myGetDistributorList()
      }
    },
  };
  onShow(){
    this.methods.getDistributorType({
      field: "customerCode",
      formCode: "dmsInventoryHisenseCondition",
    }).then((res)=>{
      const { payload: { data }} = res
      this.dealerNameOptionListInit = []
      this.dealerNameOptionListInit = data.map((item)=>{
        return {
          id: item.code,
          name: item.name
        }
      })
    })
  }
  onUnload() {
    getStore().dispatch({ type: RESET_DISTRIBUTOR_INVENTORY_INQUIRY, payload: [] })
  }
}
