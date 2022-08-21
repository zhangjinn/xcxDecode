import wepy from 'wepy';
// import {baseUrl, request} from '@/utils/request';
import { request} from '@/utils/requestJSON';
// @ts-ignore
// import qqmap  from '@/utils/qqmap-wx-jssdk.min.js';
// interface Data {
//   show2: false,
//   show3:false,
//   show1:false,
//   show4:false,
//   doorImgs:'dfgdg',
// }

export default class WebViewPage extends wepy.page {

  config = {
    navigationBarTitleText: '销售明细',
    navigationBarBackgroundColor: '#00aaa7',
    navigationBarTextStyle: 'white',
    enablePullDownRefresh: true,
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-popup': '../../../components/vant/popup/index',
      "van-loading": "../../../components/vant/loading/index",
    },
  };

  data = {
    show: false,
    show1: false,
    show2: true,
    startTime: '开始时间',
    endTime: '结束时间',
    today: 3,
    nowTime: '',
    weekStar: '',
    weekEnd: '',
    monthStart: '',
    monthEnd: '',
    nowDate: '',
    MaterialGroup:[],//物料组信息
    selMaterial:null,
    selMaterialName:'物料组',
    pageNo:1,
    storeCode:'',
    selArre:[],
    materialGroupCode:[],
    loading:false
  };

  methods = {
    //下拉
    tolower(){
      this.pageNo=this.pageNo+1
      this.getStoreSaleDetail(1)
    },
    //上拉
    // upper(){
    //   this.pageNo=1
    //   this.getStoreSaleDetail(2);
    // },
    //切换物料组
    taggleMaterial(e){
      if(this.selArre.indexOf(e.currentTarget.dataset.name)==-1){
        this.selArre.push(e.currentTarget.dataset.name)
      }else {
        let index=this.selArre.indexOf(e.currentTarget.dataset.name)
        this.selArre.splice(index,1)
      }
      this.materialGroupCode=[]
      for(let i=0;i<this.MaterialGroup.length;i++){
        this.MaterialGroup[i].sel=false
        for(let j=0;j<this.selArre.length;j++){
          if(this.MaterialGroup[i].materialName==this.selArre[j]){
            this.MaterialGroup[i].sel=true
            this.materialGroupCode.push(this.MaterialGroup[i].materialCode)
          }
        }
      }
    },
    //重置
    resetMaterial(){
      this.selMaterialName='全部';
      this.selArre=[]
      this.materialGroupCode=[]
      for(let i=0;i<this.MaterialGroup.length;i++) {
        this.MaterialGroup[i].sel = false
      }
      this.getStoreSaleDetail()
    },
    //分类弹出框
    onClose() {
      if(this.selArre.length>0){
        this.selMaterialName=this.selArre.toString()
      }
      this.show = false
      this.getStoreSaleDetail()
    },
    onOpen() {
      this.show = true
    },
    //时间弹出框
    onClose1() {
      this.show1 = false
    },
    onOpen1() {
      this.show1 = true
    },
    //选择日期--确定
    comfireTime() {
      this.show1 = false
      this.show1 = false
      if (this.startTime == this.weekStar && this.endTime == this.weekEnd) {
        // this.date = '本周'
        // this.setData({
        //   date: '本周'
        // })
      } else if (this.startTime == this.monthStart && this.endTime == this.monthEnd) {
        // this.date = '本月'
        // this.setData({
        //   date: '本月'
        // })
      } else if (this.startTime == this.nowDate && this.endTime == this.nowDate) {
        // this.date = '今天'
        // this.setData({
        //   date: '今天'
        // })
      }
      // else {
        let date = this.startTime + '~' + this.endTime;
        this.date = date
        this.setData({
          date: date
        })
      // }
      this.getStoreSaleDetail()
    },
    // 日期
    bindDateChange(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.startTime = e.detail.value
      this.setData({
        startTime: e.detail.value
      })
    },
    bindDateChange1(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.endTime = e.detail.value
      this.setData({
        endTime: e.detail.value
      })
    },
    //切换日期
    taggleQiehuan(e) {
      if (e.currentTarget.dataset.id == 1) {
        this.startTime = this.nowDate;
        this.endTime = this.nowDate;
      }
      if (e.currentTarget.dataset.id == 2) {
        this.getWeekStartDate()
        this.getWeekEndDate()
        this.startTime = this.weekStar;
        this.endTime = this.weekEnd;
      }
      if (e.currentTarget.dataset.id == 3) {
        this.getMonthStartDate()
        this.getMonthEndDate()
        this.startTime = this.monthStart;
        this.endTime = this.monthEnd;
      }
      this.today = e.currentTarget.dataset.id
      this.setData({
        today: e.currentTarget.dataset.id
      })
    },
  },
//获取物料组
  getMaterialGroup(){
    let that = this
    request({
      api: `cts/ctsApi.nd?`,
      header: {
        // 'Content-Type': 'application/json', // 默认值
      },
      data: {
        storeCode: that.storeCode,
        serviceCode:'queryAllMatkl'
      },
      method: 'POST',
      callback: (res) => {
        // console.log('物料组信息', res.data.returnData)
        that.MaterialGroup=res.data.returnData
        that.setData({
          MaterialGroup:res.data.returnData
        })
      }
    })
  },
//获取门店销售明细
  getStoreSaleDetail(type) {
    console.log(type)
    let that = this
    console.log('this.materialGroupCode.toString()',this.materialGroupCode.toString())
    let start=that.startTime.split("-")
    let starttime=start.join("")
    let end=that.endTime.split("-")
    let endtime=end.join("")
    if(type==2){
      wx.stopPullDownRefresh();
      that.loading=true
      that.setData({loading:true})
    }
    request({
      api: `cts/ctsApi.nd?`,
      header: {
        // 'Content-Type': 'application/json', // 默认值
      },
      data: {
        pageNo: this.pageNo,
        pageSize: 20,
        storeCode: that.storeCode,
        materialGroupCode:this.materialGroupCode.toString(),
        startDate: starttime,
        endDate: endtime,
        serviceCode:'queryAllStoreSalesDetailXtw'
      },
      method: 'POST',
      callback: (res) => {
        that.loading=false
        that.setData({loading:false})
        if(res.data.returnCode==100){
          if(type==1){
            that.storeDetail=that.storeDetail.concat(res.data.returnData)
          }else {
            that.storeDetail=res.data.returnData
          }
          that.setData({
            storeDetail:that.storeDetail
            })
        }
        console.log('门店销售明细', res)

      }
    })
  },

  //获得本周的开始日期
  getWeekStartDate() {
    let that = this
    var weekStartDate = new Date(that.nowYear, that.nowMonth, that.nowDay - that.nowDayOfWeek);
    console.log('本周开始日期', weekStartDate.Format('MM-dd'))
    this.date = '本周'
    let startTime = weekStartDate.Format('MM-dd')
    this.weekStar = that.nowYear + '-' + startTime;
  },

  //获得本周的结束日期
  getWeekEndDate() {
    let that = this
    var weekEndDate = new Date(that.nowYear, that.nowMonth, that.nowDay + (6 - that.nowDayOfWeek));
    console.log('本周结束日期', weekEndDate.Format('MM-dd'))
    let endtime = weekEndDate.Format('MM-dd')
    this.weekEnd = that.nowYear + '-' + endtime
  },

  //获得本月的开始日期
  getMonthStartDate() {
    let that = this
    var monthStartDate = new Date(that.nowYear, that.nowMonth, 1);
    console.log('本月开始日期', monthStartDate.Format('MM-dd'))
    // this.date = '本月'
    let startTime = monthStartDate.Format('MM-dd')
    this.monthStart = that.nowYear + '-' + startTime;
    this.startTime=this.monthStart;
    let date = this.startTime + '~' + this.endTime;
    this.date = date
    this.setData({
      date: date
    })
  }

  //获得本月的结束日期
  getMonthEndDate() {
    let that = this
    console.log('某月天数', that.getMonthDays(that.nowMonth))
    var monthEndDate = new Date(that.nowYear, that.nowMonth, that.getMonthDays(that.nowMonth));
    console.log('本月结束日期', monthEndDate.Format('MM-dd'))
    let endtime = monthEndDate.Format('MM-dd')
    this.monthEnd = that.nowYear + '-' + endtime
    this.endTime= this.monthEnd;
    let date = this.startTime + '~' + this.endTime;
    this.date = date
    this.setData({
      date: date
    })
  },

  //获得某月的天数
  getMonthDays(myMonth) {
    let that = this
    var monthStartDate = new Date(that.nowYear, myMonth, 1);
    var monthEndDate = new Date(that.nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  }

  onLoad(options) {
    if(options.storeCode){
      this.storeCode=options.storeCode
    }else {
      this.storeCode='708084512'
    }
    let now = new Date(); //当前日期
    this.nowDayOfWeek = now.getDay(); //今天本周的第几天
    this.nowDay = now.getDate(); //当前日
    this.nowMonth = now.getMonth(); //当前月
    this.nowYear = now.getFullYear(); //当前年
    this.nowTime = now.Format('yyyy-MM-dd');
    this.pageNo=1
    wx.setNavigationBarTitle({
      title: '销售明细'
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#00aaa7',
    })
    // this.date = '本月';
    this.nowDate = now.Format('yyyy-MM-dd')
    // this.startTime = this.nowDate;
    // this.endTime = this.nowDate;
    // this.setData({
    //   date: '本月'
    // })
    this.getMonthEndDate()
    this.getMonthStartDate()
    this.getMaterialGroup()
    this.getStoreSaleDetail()
  }
  onPullDownRefresh() {
    console.log('来了')
    this.pageNo=1
    this.getStoreSaleDetail(2);
  }
  onReachBottom(){
    this.pageNo=this.pageNo+1
    this.getStoreSaleDetail(1)
  }
}
