import wepy from 'wepy';
import {request} from '@/utils/requestJSON';
import { connect } from 'wepy-redux'
import {
  findDetailById
} from '@/store/actions/store'
@connect({
  checkIndetail({ store }) {
    return store.checkIndetail
  }
}, {
  findDetailById
})
export default class WebViewPage extends wepy.page {

  config = {
    navigationBarTitleText: '打卡详情',
    navigationBarBackgroundColor:'#00aaa7',
    navigationBarTextStyle:'white',
    usingComponents: {
    },
  };

  data = {
    date: '本月',
    radio:'',
    checked:false,
    show2:false,
    inspectionId:'',
    detailData:{}
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
    //浏览图片
    browseImg(e){
      let that=this
      // let fatheridx=e.currentTarget.dataset.fatheridx
      let arr=e.currentTarget.dataset.arr
      let current=e.currentTarget.dataset.current;
      let arrImg=[]
      if(arr=='checkIndetail.storeProPlanModel.imgList'&&Array.isArray(this.checkIndetail.storeProPlanModel.imgList)){
        this.checkIndetail.storeProPlanModel.imgList.forEach(it=>{
          if(it.imgName){
            arrImg.push(it.imgName)
          }
        })
      }
      if(that.detailData[arr+'1']){
        arrImg.push(that.detailData[arr+'1']);
      }
      if(that.detailData[arr+'2']){
        arrImg.push(that.detailData[arr+'2']);
      }
      if(that.detailData[arr+'3']){
        arrImg.push(that.detailData[arr+'3']);
      }
      if(that.detailData[arr+'4']){
        arrImg.push(that.detailData[arr+'4']);
      }
      if(that.detailData[arr+'5']){
        arrImg.push(that.detailData[arr+'5']);
      }
      wx.previewImage({
        urls:arrImg,
        current:current
      })
    },
    onClose2(){
      this.show2=false
    },
    openTank(){
      this.show2=true
    }
  },
  //获取信息
  getListMsg () {
    let that=this
    request({
      api: `cts/ctsApi.nd?`,
      data: {
        id: that.inspectionId,
        serviceCode:'getInspectionDetailById'
      },
      method:'POST',
      callback: (res) => {
        that.detailData=res.data.returnData
        that.setData({
          detailData:res.data.returnData
        })
      }
    })
  }
  onLoad(options) {
    this.inspectionId=options.id
    wx.setNavigationBarTitle({
      title: '打卡详情'
    })
    this.getListMsg();
    this.methods.findDetailById({id:options.id});
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#00aaa7',
    })
  },

}
