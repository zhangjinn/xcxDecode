import wepy from 'wepy';
// import {baseUrl, request} from '@/utils/request';
import {request} from '@/utils/requestJSON'
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
    navigationBarTitleText: '胶州福州路移动厅',
    navigationBarBackgroundColor:'#00aaa7',
    navigationBarTextStyle:'white',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-field': '../../../components/vant/field/index',
      'van-button': '../../../components/vant/button/index',
      'van-action-sheet': '../../../components/vant/action-sheet/index',
      'van-dialog': '../../../components/vant/dialog/index',
      'van-toast': '../../../components/vant/toast/index',
    },
  };

  data = {
    date: '本月',
    radio:'',
    checked:false,
    show2:false,
    storeMsg:{},
    storeCode:'',
    materialCode:'',
  };
  
  methods = {
    onChange() {
      if(this.checked==true){
        this.checked=false
        this.setData({checked:false})
      }else {
        this.checked=true
        this.setData({checked:true})
      }
    },
    onClose2(){
      this.show2=false
    },
    openTank(){
      this.show2=true
    }
  },
  //获取评价详情
  getEvaluateDetail(){
    let that=this
    request({
      api: `cts/ctsApi.nd?`,
      header: {
        'Content-Type': 'application/json', // 默认值
      },
      data: {
        storeCode:this.storeCode,
        materialCode:this.materialCode,
        serviceCode:'storeEvaluationChart'
      },
      method:'POST',
      callback: (res) => {
        console.log('门店综合评价',res.data.returnData)
        that.storeMsg=res.data.returnData.nextTable
        that.setData({
          storeMsg:res.data.returnData.nextTable
        })
      }
    })
  }，
  onLoad(options) {
    if(options.storeCode){
      this.storeCode=options.storeCode
    }else {
      this.storeCode= '708028702'
    }
    if(options.materialCode){
      this.materialCode=options.materialCode
    }else {
      this.materialCode='1320201'
    }


    wx.setNavigationBarTitle({
      title: options.shopName
    })
    // this.getLocation();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#00aaa7',
    })
    this.getEvaluateDetail()
  }

  
}
