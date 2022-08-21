import wepy from 'wepy';
// import {baseUrl} from '@/utils/request';
import { request } from '@/utils/requestJSON';
export default class WebViewPage extends wepy.page {

  config = {
    navigationBarTitleText: '详情信息',
    navigationBarBackgroundColor:'#00aaa7',
    navigationBarTextStyle:'white',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-field': '../../../components/vant/field/index',
      'van-button': '../../../components/vant/button/index',
      'van-action-sheet': '../../../components/vant/action-sheet/index',
      'van-dialog': '../../../components/vant/dialog/index',
      'van-toast': '../../../components/vant/toast/index',
      "van-loading": "../../../components/vant/loading/index"
    },
  };
  data = {
    date: '本月',
    radio:'',
    checked:false,
    isUnqualified: false, // 不合格状态选中
    show2:false,
    storeCode:'',
    pageNo:1,
    recodeList:[],
    signCishu:{},
    storeRenList:[],
    loading:''
  };
  
  methods = {
    //关闭弹框
    closeTankuan(){
      this.show2=false
      // this.setData({show})
    },
    //拨打电话
    telphontFun(e){
      // console.log(e.currentTarget.dataset.tel)
      let phone=e.currentTarget.dataset.tel
      wx.makePhoneCall({
        phoneNumber:phone
      })
    },
    //看自己和全部切换
    onChange() {
      if(this.checked==true){
        this.checked=false
        this.setData({checked:false})
      }else {
        this.checked=true
        this.setData({checked:true})
      }
      this.getRecodeList(this.pageNo,1)
      this.getCatcs()
    },
    // 不合格
    unqualifiedChange() {
      this.setData({isUnqualified: !this.isUnqualified})
      this.isUnqualified = !this.isUnqualified
      this.getRecodeList(this.pageNo,1)
      this.getCatcs()
    },
    //上拉刷新
    upper:function(){
      this.pageNo=1
      this.getRecodeList(this.pageNo,3)
    },
    //分页
    tolower(){
      this.pageNo=this.pageNo+1
      this.getRecodeList(this.pageNo,2)
    },
    onClose2(){
      this.show2=false
    },
    openTank(){
      this.show2=true
    },
    //浏览图片
    browseImg(e){
      let that=this
      let fatheridx=e.currentTarget.dataset.fatheridx
      // let arr=e.currentTarget.dataset.arr
      let current=e.currentTarget.dataset.current;
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
  },
  //获取门店人员信息
  getStoreRen(){
    let that=this;
    console.log('this.storeCode',this.storeCode)
    request({
      api: `cts/ctsApi.nd?`,
      header: {
        // 'Content-Type': 'application/json', // 默认值
      },
      data: {
        storeCode: that.storeCode,
        serviceCode:'getStoryPersons'
      },
      method:'POST',
      callback: (res) => {
        console.log('门店人员信息',res)
        for(let i=0;i<res.data.returnData.length;i++){
          res.data.returnData[i].tel1=res.data.returnData[i].tel.substr(0,3)+"*****"+res.data.returnData[i].tel.substring(res.data.returnData[i].tel.length-4,res.data.returnData[i].tel.length)
        }
        that.storeRenList=res.data.returnData
      }
    })
  },
  onLoad(options) {
    console.log(options)
    this.storeCode=options.storeCode
    wx.setNavigationBarTitle({
      title: '详情信息'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#00aaa7',
    })
    this.getRecodeList(this.pageNo，2)
    this.getCatcs()
    this.getStoreRen()
  },
  //获取列表
  getRecodeList (pageNo,state) {
    let that=this;
    let type='all'
    if(that.checked){
      type='self'
    }
    if(state==3){
      that.loading=true
    }
    request({
      api: `cts/ctsApi.nd?`,
      header: {
        // 'Content-Type': 'application/json', // 默认值
      },
      data: {
        startTime: "",
        endTime: "",
        storeCode:that.storeCode,
        type: type,
        pageNo:pageNo,
        pageSize:'20',
        serviceCode:'querySignStoreRecord',
        xjResult: this.isUnqualified ?'F' :'' //T 巡检合格  F巡检不合格 空查询全部
      },
      method:'POST',
      callback: (res) => {
        that.loading=false
        that.setData({loading:false})
        console.log('dierb',res)
        if(res.data.returnCode==173){
          for(let i=0;i<res.data.returnData.record.length;i++){
            res.data.returnData.record[i].img1=res.data.returnData.record[i].img1.split(',')
            res.data.returnData.record[i].img2=res.data.returnData.record[i].img2.split(',')
            res.data.returnData.record[i].img3=res.data.returnData.record[i].img3.split(',')
            res.data.returnData.record[i].img4=res.data.returnData.record[i].img4.split(',')
            res.data.returnData.record[i].img5=res.data.returnData.record[i].img5.split(',')
          }
          if(state==1||state==3){//不追加，不分页
            that.recodeList=res.data.returnData.record
          }else {
            that.recodeList=that.recodeList.concat(res.data.returnData.record)
          }
          that.setData({recodeList:that.recodeList})
        }
        console.log(res.data.returnData.record)

      }
    })
  },
  //获取打卡次数
  getCatcs(){
    let that=this
    let that=this;
    let type='all'
    if(that.checked){
      type='self'
    }
    request({
      api: `cts/ctsApi.nd?`,
      data: {
        startTime: "",
        endTime: "",
        storeCode: that.storeCode,
        type: type,
        serviceCode:'getSignDayAndCount',
        xjResult: this.isUnqualified ?'F' :'' //T 巡检合格  F巡检不合格 空查询全部
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
  
}
