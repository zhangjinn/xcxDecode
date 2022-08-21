import wepy from 'wepy';
import {baseUrl, request} from '@/utils/requestJSON';
import Toast from "@/components/vant/toast/toast";
import {formatDate, getTimeStamp} from '@/utils/index';
import { previousDay } from '@/utils/index';
import emptyDataType from "@/components/empty-data-type/index";

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
    navigationBarTitleText: '打卡列表',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      // 'van-field': '../../../components/vant/field/index',
      // 'van-button': '../../../components/vant/button/index',
      // 'van-action-sheet': '../../../components/vant/action-sheet/index',
      // 'van-dialog': '../../../components/vant/dialog/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      "van-loading": "../../../components/vant/loading/index",
    },
  };
  components = {
    emptyDataType,
  };
  data = {
    previousDayDate: '', // 前一天日期
    recodeList:[],
    pageNo:'1',
    signCishu:{},

    // show:false,
    show1:false,
    // show2:true,
    date:'开始时间',
    date1:'结束时间',
    today:3,//1:今天，2：本周，3：本月
    nowDayOfWeek:'',
    nowDay:'',
    nowMonth:'',
    nowYear:'',
    startTime:'',
    endTime:'',
    nowTime:'',
    weekStar:'',
    weekEnd:'',
    monthStart:'',
    monthEnd:'',
    nowDate:'',
    type:'all',
    purchaseVisable: false, // 统计日历弹框显示隐藏
    currentYear: '',
    currentMonth: '',
    dateOption:[],
    channelVisable: false, // 统计渠道弹框显示隐藏
    channelOption:[
      {
        id: '14169732978',
        name: '自有渠道',
      },
      {
        id: '1',
        name: '下沉门店',
      },
    ],
    commitParam:{
      month: "",
      channel: "14169732978",
      channelName: "自有渠道",
      isSinkChannel: "1",
      latitude: '', // 当前位置纬度
      longitude: '', // 当前位置经度
    },
    statisticsList:{
      checkIn: '', // 已打卡
      shouldCheckIn: '', // 应打卡
      ratio: '', // 占比
      noCheckList: [], // 未打卡列表
    },
    isCheckNotClockIn: false, // 是否选中未打卡按钮,默认未选中
    isQualified: false, // 是否选中不合格,默认未选中
    canvasInfo:{
      width: 170,
      height: 90,
      lineWidth: 12,
      lineColorBig: '#1890FF',
      lineColorSmall: '#18D1BC',
    },
    canvasImg:'',
    imgObj: {
      'punchDetailsStore': 'http://3s-static.hisense.com/wechat/1/14722429883/1636445862765_3f2045e1364045b98327e3f445998e34.png', // 门店.png
      'checkInRecord': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993518586_ac57f37684044fbf8298b0fe29c9e368.png',
    },
  };

  methods = {
    // 跳转到新增打卡
    viewDetail: (item) => {
      if (item) {
        let url = `/pages/terminal/addrecord/index?fullName=${item.shopFullName}&distance=${item.distance}&shAddress=${item.shAddress}
        &longitude=${item.longitude}&latitude=${item.latitude}&shopId=${item.shopId}&shopCisCode=${item.shopCisCode}}&isSpecialShop=${item.isSpecialShop}
        &provinceId=${item.provinceId}&provinceName=${item.provinceName}&cityId=${item.cityId}&cityName=${item.cityName}}
        &countyId=${item.countyId}&countyName=${item.countyName}&townId=${item.townId}&townName=${item.townName}}`
        wx.navigateTo({
          url: url
        })
      }
    },
    // 改变是否仅看自己按钮状态
    changeType:(e)=>{
    //   this.type=this.type==='all'?'self':'all';
      this.type=e;
      this.recodeList=[]
      this.pageNo=1
      this.getRecodeList(this.pageNo, 1)
      this.getCatcs()
    },
    // 改变未打卡选中按钮状态
    changeClockInType(){
      this.isCheckNotClockIn = !this.isCheckNotClockIn
    },
    changeIsQualified() {
      this.isQualified = !this.isQualified
      this.recodeList=[]
      this.pageNo=1
      this.getRecodeList(this.pageNo, 1)
      this.getCatcs()
    },
    //下拉
    tolower(){
      this.pageNo=this.pageNo+1
      this.getRecodeList(this.pageNo);
    },
    //上拉刷新
    upper:function(){
      this.pageNo=1
      this.getRecodeList(this.pageNo,1);
    },
    //时间弹出框
    onClose1() {
      this.show1 = false
    },
    onOpen1() {
      this.show1 = true
    },
    // // 日期
    bindDateChange: function (e) {
      console.log('picker发送选择改变，携带值为', e)
      this.startTime=e.detail.value
      this.setData({
        startTime: e.detail.value
      })
    },
    bindDateChange1 (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.endTime=e.detail.value
      this.setData({
        endTime: e.detail.value
      })
    },
    //切换日期
    taggleQiehuan(e){
      if(e.currentTarget.dataset.id==1){
        this.startTime=this.nowDate;
        this.endTime=this.nowDate;
      }
      if(e.currentTarget.dataset.id==2){
        this.getWeekStartDate()
        this.getWeekEndDate()
        this.startTime=this.weekStar;
        this.endTime=this.weekEnd;
      }
      if(e.currentTarget.dataset.id==3){
        this.getMonthStartDate()
        this.getMonthEndDate()
        this.startTime=this.monthStart;
        this.endTime=this.monthEnd;
      }
      this.today=e.currentTarget.dataset.id
      this.setData({
        today:e.currentTarget.dataset.id
      })
    },

    // 统计数据---时间弹框显示
    handleDateTime(){
      this.purchaseVisable = true
    },

    // 统计数据---修改时间
    oMonthchange(month){
      this.commitParam.month = month
      this.purchaseVisable = false
      this.getStatistics();
      //打卡列表数据
      this.pageNo=1
      this.getRecodeList(this.pageNo,1)
      this.getCatcs()
    },
    handleCancleDatePop(){
      this.purchaseVisable = false
    },

    // 统计数据---渠道弹框显示
    handleChannel(){
      this.channelVisable = true
    },
    // 统计数据---修改渠道
    oChannelchange(item){
      this.commitParam.channel = item.id
      this.commitParam.channelName = item.name
      this.channelVisable = false
      //获取统计数据
      this.getStatistics()
      //获取未打卡数据
      this.getNoClickList()

      //打卡列表数据
      this.pageNo=1
      this.getRecodeList(this.pageNo,1)
      this.getCatcs()
    },
    handleCancleChannelPop(){
      this.channelVisable = false
    }
  }

  // canvas半圆形进度条
  progress (val,totleVal) {
    //总弧线从0*PI画到1*PI == 180度
    // 分数所对应的度数 100分 == 180度

    let left = val * (180/totleVal)
    // 分数对应弧度（结束点）
    let left_end = 2 - (0.5/90) * left
    if(left_end==2){
      left_end = 0
    }
    let ctx = wx.createCanvasContext('myCanvas')
    ctx.clearRect(0, 0, this.canvasInfo.width, this.canvasInfo.height);

    // 画圆环
    ctx.beginPath()
    ctx.arc(this.canvasInfo.width/2, this.canvasInfo.width/2-this.canvasInfo.lineWidth/2, this.canvasInfo.width/2-this.canvasInfo.lineWidth, 0*Math.PI, 1 * Math.PI,true)
    ctx.setStrokeStyle(this.canvasInfo.lineColorBig) // 弧线的颜色
    ctx.setLineWidth(this.canvasInfo.lineWidth) // 弧的宽度
    ctx.setLineCap("round") //线条结束端点样式 butt 平直 round 圆形 square 正方形
    ctx.stroke()

    // 画进度条,兼容安卓手机，为0直接不渲染
    if(left_end != 0){
      ctx.beginPath()
      ctx.arc(this.canvasInfo.width/2, this.canvasInfo.width/2-this.canvasInfo.lineWidth/2, this.canvasInfo.width/2-this.canvasInfo.lineWidth*2-6, 0*Math.PI, left_end * Math.PI,true)
      ctx.setStrokeStyle(this.canvasInfo.lineColorSmall)
      ctx.setLineWidth(this.canvasInfo.lineWidth)
      ctx.setLineCap("round");
      ctx.stroke()
    }

    //画圆环里的实心圆
    ctx.beginPath();
    ctx.arc(this.canvasInfo.width-this.canvasInfo.lineWidth,this.canvasInfo.width/2-this.canvasInfo.lineWidth,this.canvasInfo.lineWidth/2-2,0,360,false);
    ctx.fillStyle="#fff";//填充颜色,默认是黑色
    ctx.fill();//画实心圆
    ctx.closePath();

    //画进度条里的实心圆
    ctx.beginPath();
    ctx.arc(this.canvasInfo.width-this.canvasInfo.lineWidth*2-6,this.canvasInfo.width/2-this.canvasInfo.lineWidth,this.canvasInfo.lineWidth/2-2,0,360,false);
    ctx.fillStyle="#fff";//填充颜色,默认是黑色
    ctx.fill();//画实心圆
    ctx.closePath();
    ctx.draw();
    // 将canvas转换成图片
    let that = this
    setTimeout(function(){
      wx.canvasToTempFilePath({
        width: that.canvasInfo.width,
        height: that.canvasInfo.height,
        canvasId: 'myCanvas',
        success: function (res) {
          let tempFilePath = res.tempFilePath;
          that.canvasImg = tempFilePath
        },
        fail: function (res) {
          console.log(res);
        }
      },that);
    },500);
    this.$apply()
  }

  // 获取打卡记录统计数据
  getStatistics(){
    let channel = ''
    let isSinkChannel = '0' // 0不是下沉门店，1是下沉门店
    if(this.commitParam.channel == '14169732978'){
      channel = this.commitParam.channel
    }else{
      isSinkChannel = this.commitParam.isSinkChannel
    }
    Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });

    request({
      api: `report/checkInSituation.nd`,
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' }, //form Data 格式传参
      data: {
        month: `${this.currentYear}${this.commitParam.month}`,
        channel: channel,
        isSinkChannel: isSinkChannel,
        latitude: this.commitParam.latitude,
        longitude: this.commitParam.longitude,
      },
      method:'POST',
      callback: (res) => {
        const { data } =res
        if(data){
          Toast.clear();
          this.statisticsList.checkIn = data.checkIn
          this.statisticsList.shouldCheckIn = data.shouldCheckIn
          this.statisticsList.ratio = data.ratio
        //   this.statisticsList.noCheckList = data.noCheckList

          let newRatio = data.ratio.indexOf("-")
          if(newRatio!= -1){
            this.statisticsList.ratio = '0.00%'
          }
        }
        this.progress(this.statisticsList.checkIn,this.statisticsList.shouldCheckIn)
        this.$apply()
      }
    })
  }

  // 获取未打卡列表数据
  getNoClickList(){
    let channel = ''
    let isSinkChannel = '0' // 0不是下沉门店，1是下沉门店
    if(this.commitParam.channel == '14169732978'){
      channel = this.commitParam.channel
    }else{
      isSinkChannel = this.commitParam.isSinkChannel
    }
    Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });

    request({
      api: `report/checkInSituation.nd`,
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' }, //form Data 格式传参
      data: {
        //未打卡记录只查本月
        month: `${new Date().getFullYear()}${(new Date().getMonth() + 1 < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1))}`,
        // month: `202108`,
        channel: channel,
        isSinkChannel: isSinkChannel,
        latitude: this.commitParam.latitude,
        longitude: this.commitParam.longitude,
      },
      method:'POST',
      callback: (res) => {
        const { data } =res
        if(data){
          Toast.clear();
          this.statisticsList.noCheckList = data.noCheckList
        }
        this.$apply()
      }
    })
  }
  //获取当前地理位置
  getLocation () {
    let that=this
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        that.commitParam.latitude=res.latitude
        that.commitParam.longitude=res.longitude
        //获取统计数据
        that.getStatistics()
        //获取未打卡数据
        that.getNoClickList()
        that.$apply()
      }
    })
  }
  // 打卡记录统计数据--获取日期
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
    this.commitParam.month = month
    this.currentMonth = month
    await this.getLocation()

    this.$apply()
  }
  //关闭弹框
  closeTank(){
    this.recodeList=[]
    this.pageNo=1
    this.getRecodeList(this.pageNo,1)
    this.getCatcs()
    this.show1=false
    if(this.startTime==this.weekStar&&this.endTime==this.weekEnd){
      this.date='本周'
      this.setData({
        date:'本周'
      })
    }else if(this.startTime==this.monthStart&&this.endTime==this.monthEnd){
      this.date='本月'
      this.setData({
        date:'本月'
      })
    }else if(this.startTime==this.nowDate&&this.endTime==this.nowDate){
      this.date='今天'
      this.setData({
        date:'今天'
      })
    }else {
      let date=this.startTime+'~'+this.endTime;
      this.date=date
      this.setData({
        date:date
      })
    }
    this.setData({
      show1:false
    })
  },
  //获得本周的开始日期
  getWeekStartDate() {
    let that=this
    var weekStartDate = new Date(that.nowYear, that.nowMonth, that.nowDay - that.nowDayOfWeek);
    this.date='本周'
    let startTime=weekStartDate.Format('MM-dd')
    this.weekStar=that.nowYear+'-'+startTime;
  },
  //获得本周的结束日期
  getWeekEndDate() {
    let that=this
    var weekEndDate = new Date(that.nowYear, that.nowMonth, that.nowDay + (6 - that.nowDayOfWeek));
    let endtime=weekEndDate.Format('MM-dd')
    this.weekEnd=that.nowYear+'-'+endtime
  },
  //获得本月的开始日期
   getMonthStartDate(){
    let that=this
    var monthStartDate = new Date(that.nowYear, that.nowMonth, 1);
     this.date='本月'
     let startTime=monthStartDate.Format('MM-dd')
     this.monthStart=that.nowYear+'-'+startTime;
     this.startTime=this.monthStart;
  }
  //获得本月的结束日期
   getMonthEndDate(){
    let that=this
    var monthEndDate = new Date(that.nowYear, that.nowMonth, that.getMonthDays(that.nowMonth));
     let endtime=monthEndDate.Format('MM-dd')
     this.monthEnd=that.nowYear+'-'+endtime
     this.endTime= this.monthEnd;
  },
  //获得某月的天数
   getMonthDays(myMonth){
    let that=this
    var monthStartDate = new Date(that.nowYear, myMonth, 1);
    var monthEndDate = new Date(that.nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
    return days;
  }
  //浏览图片
  browseImg(e){
    let that=this
    let fatheridx=e.currentTarget.dataset.fatheridx
    let current=e.currentTarget.dataset.current
    let arrImg=[]
    if(that.recodeList[fatheridx].img1[0].length>0){
      arrImg=arrImg.concat(that.recodeList[fatheridx].img1);
    }
    if(that.recodeList[fatheridx].img2[0].length>0){
      arrImg=arrImg.concat(that.recodeList[fatheridx].img2);
    }
    if(that.recodeList[fatheridx].img3[0].length>0){
      arrImg=arrImg.concat(that.recodeList[fatheridx].img3);
    }
    if(that.recodeList[fatheridx].img4[0].length>0){
      arrImg=arrImg.concat(that.recodeList[fatheridx].img4);
    }
    if(that.recodeList[fatheridx].img5[0].length>0){
      arrImg=arrImg.concat(that.recodeList[fatheridx].img5);
    }
    wx.previewImage({
      urls:arrImg,
      current:current
    })
  },
  //获取打卡次数
  getCatcs(){
    let that=this
    request({
      api: `cts/ctsApi.nd?`,
      data: {
        startTime: that.startTime,
        endTime: that.endTime,
        isSink:that.commitParam.channel == '14169732978' ? 'F' : 'T',
        storeCode: "",
        type: this.type,
        serviceCode:'getSignDayAndCount',
        xjResult: !this.isQualified ?'' :'F' //T 巡检合格  F巡检不合格 空查询全部
      },
      method:'POST',
      callback: (res) => {
        that.signCishu=res.data.returnData
        that.setData({
          signCishu:res.data.returnData
        })
        console.log('打卡次数',res.data.returnData)

      }
    })
  }
  //获取列表
  getRecodeList (pageNo,type) {
    let that=this
    if(type==1){
      that.loading=true
    }
    // `${this.currentYear}${this.commitParam.month}`
    // const start = moment(`${new Date().getFullYear()}${topFilterCkd.month.val}`).startOf("month").format("YYYY-MM-DD");
    // const end = moment(`${new Date().getFullYear()}${topFilterCkd.month.val}`).endOf("month").format("YYYY-MM-DD");
    const currentTime = getTimeStamp(new Date(`${this.currentYear}-${this.commitParam.month}`))
    request({
      api: `cts/ctsApi.nd?`,
      header: {
        // 'Content-Type': 'application/json', // 默认值
      },
      data: {
          //改造 根据头部统计上的条件 统一控制入仓
        // startTime: that.startTime,
        // endTime: that.endTime,
        //入参缺少自有渠道或下沉门店 后台待做
        startTime: new Date(currentTime.startTime).Format('yyyy-MM-dd'),
        endTime: new Date(currentTime.endTime).Format('yyyy-MM-dd'),
        storeCode: "",
        type: that.type,
        pageNo:pageNo,
        pageSize:'20',
        isSink:that.commitParam.channel == '14169732978' ? 'F' : 'T',
        serviceCode:'querySignStoreRecord',
        xjResult: !this.isQualified ?'' :'F' //T 巡检合格  F巡检不合格 空查询全部
      },
      method:'POST',
      callback: (res) => {
        that.loading=false
        that.setData({loading:false})
        if(res.data.returnCode==173){
          for(let i=0;i<res.data.returnData.record.length;i++){
            res.data.returnData.record[i].img1=res.data.returnData.record[i].img1.split(',')
            res.data.returnData.record[i].img2=res.data.returnData.record[i].img2.split(',')
            res.data.returnData.record[i].img3=res.data.returnData.record[i].img3.split(',')
            res.data.returnData.record[i].img4=res.data.returnData.record[i].img4.split(',')
            res.data.returnData.record[i].img5=res.data.returnData.record[i].img5.split(',')
          }
          if(type==1){
            that.recodeList=res.data.returnData.record
          }else {
            that.recodeList=that.recodeList.concat(res.data.returnData.record)
          }

          that.setData({recodeList:that.recodeList})
        }else {
          wx.showToast({
            title:res.data.returnMsg
          })
        }
      }
    })
  },

  onLoad() {
    let now = new Date(); //当前日期
    this.nowDayOfWeek = now.getDay(); //今天本周的第几天
    this.nowDay = now.getDate(); //当前日
    this.nowMonth = now.getMonth(); //当前月
    this.nowYear = now.getFullYear(); //当前年
    this.nowTime=now.Format('yyyy-MM-dd');
    // wx.setNavigationBarTitle({
    //   title: '打卡记录'
    // })
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#00aaa7',
    // })

    // this.date='今天';
    this.nowDate=now.Format('yyyy-MM-dd')
    // this.startTime=this.nowDate;
    // this.endTime=this.nowDate;
    // this.setData({
    //   date:'今天'
    // })

    this.previousDayDate = previousDay()

    this.getMonthEndDate()
    this.getMonthStartDate()
    this.getCatcs()
    this.getDate()
    this.getRecodeList(this.pageNo,1);

  }

}
