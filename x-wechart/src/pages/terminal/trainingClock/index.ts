import wepy from 'wepy';
import { request } from "@/utils/requestJSON";
import Toast from "@/components/vant/toast/toast";
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
  currentFilterName: string;
  purchaseVisable: boolean;
  currentYear: number | string;
  currentMonth: number | string;
  currentDate: number | string;
  selectDate: number | string;
  dateOption: any[];
  trainingList: any[];
  statisticsData: object;
  customerInfo: object;
  canvasImg: string;
  imgObj: object;
}

export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '培训打卡',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-circle': '../../../components/vant/circle/index',
      'img': '../../../components/img/index',
    },
  };
  components = {
    emptyDataType,
  };
  data: Data = {
    purchaseVisable: false,
    currentYear: '',
    currentMonth: '',
    currentDate: '',
    dateOption:[],
    selectDate: '',
    trainingList: [],
    statisticsData: {},
    customerInfo: {
      customerName: '', // 商家名称
      customerCode: '', // 商家编码
    },
    canvasImg: '',
    imgObj: {
      'trainingClockBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529880_e2edd1b4e90a42b993a2ec88c5825f1b.png',
      'trainingClockLogo': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552864_7a568383337a4c8586df776a3fe48fcc.png',
    },
  };

  // 页面内交互写在methods里
  methods = {

    // 跳转到新增打卡
    viewDetail: (item) => {
      if(this.currentDate < this.currentMonth){
        Toast('该培训任务已过期');
        return
      }
      if(this.currentDate > this.currentMonth){
        Toast('该培训任务未开始');
        return
      }

      if (item && item.id && item.title) {
        let url = `/pages/terminal/addrecord/index?trainingId=${item.id}&trainingTitle=${item.title}&trainingType=true`
        wx.navigateTo({
          url: url
        })
      }
    },

    // 跳转至培训记录
    handleToTrainingRecord(){
      let url = `/pages/terminal/trainingRecord/index`
      wx.navigateTo({
        url: url
      })
    },

    // 时间弹框显示
    handleDateTime(){
      this.selectDate = this.currentDate
      this.purchaseVisable = true
    },

    // 修改时间
    oMonthchange(month){
      this.selectDate = month
    },
    handleCancleDatePop(){
      this.purchaseVisable = false
    },
    async handleConfirmDatePop(){
      this.currentDate = this.selectDate
      this.purchaseVisable = false
      await this.getStatistics()
      await this.myGetDataList()
    },

    // 进度条子组件传值
    getCanvasImg(imgUrl){
      this.canvasImg = imgUrl.detail
    }
  };

  // 获取培训统计数据
  async getStatistics(){
    Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });
    await request({
      api: `cts/ctsApi.nd?`,
      data: {
        month: `${this.currentYear}-${this.currentDate}`,
        serviceCode:'getTrainOverviewMonth'
      },
      method:'POST',
      callback: (res) => {
        const { data } = res
        this.statisticsData = data.returnData
        this.$apply()
      }
    })
  }

  // 获取培训列表
  async myGetDataList() {
    await request({
      api: `cts/ctsApi.nd?`,
      data: {
        months: `${this.currentYear}-${this.currentDate}`,
        serviceCode:'getTrainingTaskListV1'
      },
      method:'POST',
      callback: (res) => {
        Toast.clear();
        const { data } = res
        this.trainingList = data.returnData
        this.$apply()
      }
    })
  }

  // 获取日期
  async getDate(){
    //初始化年
    let now = new Date();
    this.currentYear = now.getFullYear();

    //初始化月
    for (let i = 1;i <= 12; i++) {
      let j=i<10 ? '0'+i : i;
      this.dateOption.push({
        month:j
      })
    }
    let month = now.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    this.currentDate = month
    this.currentMonth = month
    const { customer: { customerName, customerCode } }=JSON.parse(wx.getStorageSync('b2b_token'))
    this.customerInfo.customerName = customerName
    this.customerInfo.customerCode = customerCode
    await this.getStatistics()
    await this.myGetDataList()
    this.$apply()
  }

  onShow() {
    this.getDate()
  }

}
