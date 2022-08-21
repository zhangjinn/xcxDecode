import wepy from 'wepy';
import Toast from "@/components/vant/toast/toast";
import {request} from "@/utils/requestJSON";
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
  id: string,
  trainingDetails: object,
  imgList: any[]
}

export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '培训记录详情',
    usingComponents: {
      'van-toast': '../../../components/vant/toast/index',
    },
  };
  components = {
    emptyDataType,
  };
  data: Data = {
    id: '',
    trainingDetails: {},
    imgList: []
  };

  // 页面内交互写在methods里
  methods = {
    //预览图片，放大预览
    preview(event) {
      let currentUrl = event.currentTarget.dataset.src
      wx.previewImage({
        current: currentUrl, // 当前显示图片的http链接
        urls: this.imgList, // 需要预览的图片http链接列表
        fail: function () {
          wx.showToast({ title: '预览图片失败', icon: 'none' });
        }
      })
    }
  };

// 获取培训记录
  myGetDetails() {
    let data = {
      id:this.id,
      serviceCode:'getTrainingRecordDeailsApp'
    }
    Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });
    request({
      api: `cts/ctsApi.nd?`,
      data: data,
      method:'POST',
      callback: (res) => {
        Toast.clear();
        const { data } = res

        this.trainingDetails = data.returnData[0]
        this.imgList = []
        if(this.trainingDetails.IMG1){
          this.imgList.push(this.trainingDetails.IMG1)
        }
        if(this.trainingDetails.IMG2){
          this.imgList.push(this.trainingDetails.IMG2)
        }
        if(this.trainingDetails.IMG3){
          this.imgList.push(this.trainingDetails.IMG3)
        }
        this.$apply()
      }
    })
  }
  onLoad({ id }) {
    this.id = id
    this.myGetDetails()
  }

}
