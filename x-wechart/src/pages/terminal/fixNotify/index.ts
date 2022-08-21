import wepy from 'wepy'
import { connect } from 'wepy-redux'
import { saveStoreProPlan, findNoPassList,updateDelegate,upload2Img } from '@/store/actions/record'
import { request } from '@/utils/request'

@connect({
}, {
  saveStoreProPlan, findNoPassList,updateDelegate,upload2Img
})
export default class WebViewPage extends wepy.page {

  config = {
    navigationBarTitleText: '整改通知',
    navigationBarBackgroundColor: '#00aaa7',
    navigationBarTextStyle: 'white',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-field': '../../../components/vant/field/index',
      'van-button': '../../../components/vant/button/index',
      'van-action-sheet': '../../../components/vant/action-sheet/index',
      'van-dialog': '../../../components/vant/dialog/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-uploader': '../../../components/vant/uploader/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-checkbox': '../../../components/vant/checkbox/index'
    }
  }
  data = {
    camera: ['camera'],
    imgList: [],//图片列表
    showSing: false,
    name: '',
    detail: {},
    optionsTemp: {},
    planConent:'',
    imgObj: {
      'pointPass':'http://3s-static.hisense.com/wechat/1/14722429883/1635993518758_3eacfdc1c5064a02b97d30ee91ceb680.png',
      'pointUnpass': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529826_e5716a140bad48a095da690b9b3709fd.png',
    }
  }

  methods = {
    onDescriptionChange(event) {
      this.planConent = event.detail
    },
    back:()=>{
      wx.navigateBack({
        delta: 1
      })
    },
    submit: () => {
      if(this.imgList.length<1){
        wx.showToast({
          title: '请上传整改方案图片！',
          icon: 'none'
        })
        return
      }
      if(!this.planConent){
        wx.showToast({
          title: '请录入整改方案！',
          icon: 'none'
        })
        return
      }
      const data = {
        'resultId': this.optionsTemp.resultId,
        'planConent': this.planConent,
        'imgList': this.imgList
      }
      wx.showLoading()
      this.methods.saveStoreProPlan(data).then(res=>{
        if( res.payload.returnCode == 100){
          const data = {
            ctsId:this.optionsTemp.resultId
          }
          this.methods.updateDelegate(data).then(res=>{
            wx.showToast({
              title: '提交成功！',
              icon: 'none'
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
            wx.hideLoading()
          })
        }else{
          wx.showToast({
            title: res.payload.returnMsg,
            icon: 'none'
          })
        }
      }).finally(()=>{
        wx.hideLoading()
      })
    },
    //删除图片
    deleteImg(event) {
      let imgList
      imgList = this.doorImgs.splice(event.detail.index, 1)
      this.setData({ imgList: imgList })

    },
    //上传图片
    afterRead(event) {
      this.selImg(event.detail.file.path, event.currentTarget.dataset.state)
    }
  }

  //选择照片
  selImg(path, state) {
    let that = this
    let FSM = wx.getFileSystemManager()
    let obj = {}
    FSM.readFile({
      filePath: path,
      encoding: 'base64',
      success: function(res) {
        const data = {
          'serviceCode': 'uploadXtw',
            'fileModuleName': 'publicPictures',
            'file': 'image/jpeg;base64,' + res.data
        }
        that.methods.upload2Img(data).then(res2 => {
          obj.imgName = res2.payload.returnData.id
          obj.urlId = res2.payload.returnData.id
          obj.url = res2.payload.returnData.fileMapperPath
          let imgList = that.imgList
          imgList.push(obj)
          that.imgList = imgList
          that.setData({ imgList: imgList })
        })
      }
    })
  }

  onLoad(options) {
    this.optionsTemp = JSON.parse(JSON.stringify(options))
    this.$apply()
    this.methods.findNoPassList({ id: options.resultId }).then(res => {
      this.detail = res.payload.returnData
      this.detail.listStandard = this.detail.listStandard || []
      this.$apply()
    })
  }
}
