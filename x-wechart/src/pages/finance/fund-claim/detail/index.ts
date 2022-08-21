import wepy from 'wepy';
import { getFundClaimDetail } from '@/store/actions/fund-claim';
import { baseUrl } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';

interface Data {
  postData:object;
  visible: boolean;
  filterForm: object;
  filterFormExtra: object;
  baseUrl: string;
  popupName: string;
  deliveryPopupName: string;
  detailId:any;
  detailList:object;
  view_show:boolean;
  billType:any;
}

export default class Fundrendetail extends wepy.page {
  config = {
    navigationBarTitleText: '认领明细',
    usingComponents: {
      'van-rate': '../../../../components/vant/rate/index',
      'van-icon': '../../../../components/vant/icon/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-tab': '../../../../components/vant/tab/index',
      'van-field': '../../../../components/vant/field/index',
      'van-loading': '../../../../components/vant/loading/index',
      'van-stepper': '../../../../components/vant/stepper/index',
      'van-button': '../../../../components/vant/button/index',
      'img': '../../../../components/img/index',
    },
  };
  data: Data = {
    billType:'',
    view_show:false,
    postData:{
      method:"getNoticeBill",
      params:{
        id:""
      }
    },
    detailList:{},
    detailId:'',
    visible: false,
    popupName: '',
    deliveryPopupName: '全部',
    filterForm: {
      pageNo: 1,
    },
    baseUrl: baseUrl,
  };
  // 页面内交互写在methods里
  methods = {
    goPage(url: any) {
      this.navigator({ link: { url } });
    },
    selectagentPopup:() => {
      this.distributorsPopup = false
    },
    viewhandle:()=>{
      const _this = this
      wx.navigateTo({
        url: `/pages/finance/fund-claim/handle/index?id=`+ _this.postData.params.id +`&salenum=` + _this.detailList.saleorg.number
      })
    },
    getDetailMethod:()=>{
      const _this = this
      const toast = Toast.loading({
        forbidClick: true,
        message: '加载中',
      });
      getFundClaimDetail(this.postData,res=>{
        if(res.data.success){
          _this.detailList = res.data.data
          _this.view_show = true
          _this.$apply()
          Toast.clear()
        }
      })
    }
    // onGetOrderListNext() {
    //   const { totalPages } = this.orderList
    //   if(totalPages > this.filterForm.pageNo) {
    //     this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1}
    //     this.myGetOrderList()
    //   }
    // },
  };
  onShow() {
    this.methods.getDetailMethod()
  }
  onLoad(e:any){
    this.postData.params.id = e.id;
    this.billType = e.bill;
    this.$apply()
  }
}
