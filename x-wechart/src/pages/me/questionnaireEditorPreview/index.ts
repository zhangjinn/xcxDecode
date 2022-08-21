import wepy from 'wepy';
import {modifyUrl, removeStorage, setStorage} from '@/utils/index';
import commonMixin from '@/mixins/common';

export default class WebViewPage extends wepy.page {
  config = {
    navigationBarTitleText: '',
    usingComponents: {
      'no-permission': '/components/no-permission/index',
    },
  };

  data = {
    url: '',
    postName: '',
    login: true, // 登录状态
    questionId: '', // 判断是否是调研问卷扫码访问
  };
  mixins = [commonMixin];

  // 调研问卷扫二维码进来参数获取
  getQueryParams (queryString) {
    // 微信扫码得到的内容进行了一次编码，所以官方要求需要进行decodeURIComponent一次
    if(!queryString){
      return
    }
    queryString = decodeURIComponent(queryString)
    let params = {}
    if (queryString) {
      // 参数为最后一个斜杠后的参数
      let queryArray = queryString.split('/')
      if (queryArray.length > 1) {
        let query = queryArray[queryArray.length-1]
        Object.assign(params, { questionId: decodeURI(query) })
      }
    }
    return params
  };


  onLoad(options: any) {
    let query = options.q // 获取到二维码原始链接内容
    let params = this.getQueryParams(query)
    let questionId = params && params.questionId
    this.questionId = questionId
    wx.setNavigationBarTitle({
      title: '问卷预览'
    })
    
    this.url = `${wepy.$appConfig.baseUrl}/questionnaireEditorPreview?questionId=${this.questionId}&source=XCX`
    this.url = modifyUrl(this.url)
    this.$apply()
    console.log(this.url)
  }
  getMsg(data) {
    console.error(data)
  }

  onShareAppMessage() {}

}
