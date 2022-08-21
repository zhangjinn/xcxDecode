import wepy from 'wepy';
import { connect } from 'wepy-redux'
import { getConsultDetail, closeConsult, goAsk } from '@/store/actions/consultation'
import Toast from '@/components/vant/toast/toast';
import { isAssetTypeAnImage } from '@/utils/validators';

interface Data {
  form: object;
  popVisible: boolean;
  issub: boolean;
  addquestion: string;
  closedisable: boolean;
}

@connect({
  consultdetail({ consultation }) {
    return consultation.consultdetail
  }
}, {
  getConsultDetail,
  closeConsult,
  goAsk
})

export default class ProblemList extends wepy.page {

  config = {
    navigationBarTitleText: '我的问题',
    usingComponents: {
      'van-rate': '../../../../components/vant/rate/index',
      'van-field': '../../../../components/vant/field/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-toast': '../../../../components/vant/toast/index',
    },
  };

  data: Data = {
    addquestion: '',
    popVisible: false,
    form: {
      score: 5,
      feel: '',
      id: '',
    },
    issub: false,
    closedisable: true
  }

  methods = {
    onChangeRate(e: any) {
      const { detail } = e
      switch (detail) {
        case 5:
          this.consultdetail.ratetext = '非常好'
          break
        case 4:
          this.consultdetail.ratetext = '好'
          break
        case 3:
          this.consultdetail.ratetext = '一般'
          break
        case 2:
          this.consultdetail.ratetext = '差'
          break
        case 1:
          this.consultdetail.ratetext = '非常差'
          break
      }
      this.form.score = detail
    },
    addQuestion: () => {
      this.popVisible = true;
    },
    onClose: () => {
      this.popVisible = false
    },
    onFeelChange: (e: any) => {
      const { detail } = e
      if (detail) {
        this.closedisable = false;
      } else {
        this.closedisable = true;
      }
      this.form.feel = detail
    },
    onAddQuestionChange: (e: any) => {
      const { detail } = e
      this.addquestion = detail;
    },
    onQuestionClose: () => {
      if (!this.form.feel) {
        Toast.fail('请填写您的感想~');
        return
      }
      Toast.loading({
        message: '提交中....',
        duration: 0,
      });
      this.methods.closeConsult(this.form).then((res: { payload: { code: string; }; }) => {
        if (res.payload == "success") {
          Toast.success('提交成功');
          setTimeout(() => {
            this.methods.getConsultDetail(this.form.id)
          }, 2000);
        } else {
          Toast.fail(res.payload || '提交失败');
        }
      })
    },
    onSubmit: () => {
      if (!this.addquestion) {
        Toast.fail('请填写您的追问~');
        return
      }
      Toast.loading({
        message: '提交中....',
        duration: 0,
      });
      if (!this.issub) {
        this.issub = true;//避免重复提交
        this.methods.goAsk({ questionId: this.form.id, content: this.addquestion }).then((res: { payload: { code: string; }; }) => {
          this.issub = false;
          if (res.payload == "success") {
            Toast.success('提交成功');
            this.popVisible = false;
            this.addquestion = ''
            setTimeout(() => {
              this.methods.getConsultDetail(this.form.id)
            }, 2000);
          } else {
            Toast.fail(res.payload || '提交失败');
          }
        })
      }
    },

    downloadImg: (e: any) => {
      let flag =  isAssetTypeAnImage(e);
      if(flag){
        let imgs  = new Array();
        imgs.push(e);
        wx.previewImage({
          current: e,
          urls: imgs,
          fail() {
            wx.showToast({ title: '预览图片失败', icon: 'none' });
          }
        });
      }else{
        wx.downloadFile({
          url: e,　　　　　　　//需要下载的url
          success: function (res) {　　　　　　　　　　　　//成功后的回调函数
            wx.saveImageToPhotosAlbum({　　　　　　　　　//保存到本地
              filePath: res.tempFilePath,
              success(res) {
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                })
              },
              fail: function (err) {
                if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                  wx.openSetting({
                    success(settingdata) {
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                      } else {
                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                      }
                    }
                  })
                }
              }
            })
          }
        });
      }


    },

  }

  onLoad(e: { id: any; }) {
    const { id } = e
    this.form.id = id
    Toast.loading({
      message: '正在加载',
      duration: 0
    })
    this.methods.getConsultDetail(id).then(() => {
      Toast.clear()
    })
  }
}
