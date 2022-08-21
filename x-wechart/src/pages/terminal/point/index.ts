import wepy from 'wepy'
import Dialog from '@/components/vant/dialog/dialog'
import { formatDate } from '@/utils/index'
import Toast from '@/components/vant/toast/toast'
import { connect } from 'wepy-redux'
import { findShowList,saveStoreCheckResult,upload2Img } from '@/store/actions/record'

@connect({}, {
  findShowList,
  saveStoreCheckResult,
  upload2Img
})
export default class WebViewPage extends wepy.page {

  config = {
    navigationBarTitleText: '终端巡查',
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
      'van-popup': '../../../components/vant/popup/index'
    }
  }
  data = {
    showSing: false,
    context: null,
    optionsTemp:null,
    list:[],
    checkResult:'F',
    hasDraw:false,
  }

  methods = {
    changeType:(index,indexChild)=>{
      this.list[index]['listStandar'][indexChild]['checkResult'] = this.list[index]['listStandar'][indexChild]['checkResult']=='F'?"T":"F"
      this.checkResult = "T"
      this.list.forEach(it=>{
        it.listStandar.forEach(item=>{
          if(item.checkResult == 'F'){
            this.checkResult = "F"
          }
        })
      })
      this.$apply()
    },
    onClose:(e)=>{
      if(e.target.dataset.type=='close'){
        this.showSing = false
      }
    },
    getData:()=>{
      const data = {
        'storeType': this.optionsTemp.isSpecialShop!=0 ? '1' : '2'
      }
      this.methods.findShowList(data).then(res => {
        const list = res.payload.returnData||[]
        list.forEach(it=>{
          it.listStandar.forEach(item=>{
            item.checkResult = 'F'
          })
        })
        this.list = list
        this.$apply();
      })
    },
    nextStep: () => {
      this.showSing = true
      setTimeout(() => {
        const context = wx.createCanvasContext('firstCanvas')
        context.setFillStyle('#fff')
        context.fillRect(0, 0, 500, 150)
        this.data.context = context
        context.draw()
      }, 1000)
    },
    bindtouchstart: function(e) {
      this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y)
    },
    /**
     * 记录移动点，刷新绘制
     * @param {*} e
     */
    bindtouchmove: function(e) {
      this.data.context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y)
      this.data.context.stroke()
      this.data.context.draw(true)
      this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
      this.hasDraw = true;
    },
    clear: function() {
      this.data.context.draw()
      this.data.context.setFillStyle('#fff')
      this.data.context.fillRect(0, 0, 500, 150);
      this.hasDraw = false;
    },
    submit:()=>{
      const listDetail = []
      this.list.forEach(it=>{
        it.listStandar.forEach(item=>{
            listDetail.push(
              {
                "checkResult": item.checkResult,
                "standardId": item.id
              }
            )
        })
      })
      const data = {
        "handwrittenId": this.handwrittenId,
        "dealerCode":  wepy.$instance.globalData.cisCode,//todo
        "listDetail": listDetail,
        "storeName": this.optionsTemp.storeName,
        "checkResult": this.checkResult,
        "storeCode": this.optionsTemp.shopCisCode
      }
      wx.showLoading()
      this.methods.saveStoreCheckResult(data).then(res=>{
        if( res.payload.returnCode == 100) {
          wx.showToast({
            title: '提交成功！',
            icon: 'none'
          })
          const id =res.payload.returnData.id
          wx.hideLoading()
          if(this.checkResult == "F"){
            wx.navigateTo({ url: '/pages/terminal/problemTrans/index?id='+id })
          }else{
            var pages = getCurrentPages()
            // var currPage = pages[pages.length - 1];   //当前页面
            var prevPage = pages[pages.length - 2]
            prevPage.data.optionsTemp.isCheck = true
            wx.navigateBack({
              delta: 1,
            })
          }
        }else{

        }
      })
    },
    exportImg: function() {
      if(!this.hasDraw){
        wx.showToast({
          title: '请先签字！',
          icon: 'none'
        })
        return
      }
      let that = this
      that.data.context.draw(true, wx.canvasToTempFilePath({
        fileType: 'jpg',
        canvasId: 'firstCanvas',
        success(res) {
          let { tempFilePath } = res
          wx.getFileSystemManager().readFile({
            filePath: tempFilePath, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              let base64 ='data:image/png;base64,' + res.data
              const data ={
                fileModuleName:'publicPictures',
                file:base64
              }
              that.methods.upload2Img(data).then(res=>{
                that.handwrittenId =res.payload.returnData.id
                that.methods.submit()
              })
            },
            fail: function (err) {
              // console.log('获取图片失败')
            }
          })
        },
        fail() {
          wx.showToast({
            title: '导出失败',
            icon: 'none',
            duration: 2000
          })
        }
      }))
    }
  }

  onLoad(options) {
    this.optionsTemp = JSON.parse(JSON.stringify(options))
    this.methods.getData()
  }
}
