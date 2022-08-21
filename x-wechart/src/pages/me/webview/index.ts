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
    login: false, // 登录状态
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
  }

  // 修改调研问卷URL
  changeUrl(){
    let questionId = this.questionId
    let account = wepy.$instance.globalData.account
    let url = `${wepy.$appConfig.baseUrl}/questionnaire/answer?questionId=${questionId}&account=${account}&source=XCX`

    // 将路径里的第一个/和第二个/之间的内容替换成#
    url = modifyUrl(url)
    return url
  }

  // 动态修改顶部标题
  dynamicStateTitle() {
    if(this.questionId){
      this.postName = '调研问卷答题列表'
    }else{
      this.postName = '电子签约'
    }
    wx.setNavigationBarTitle({
      title: this.postName
    })
  }

  onLoad(options: any) {
    let query = options.q // 获取到二维码原始链接内容
    let params = this.getQueryParams(query)
    let questionId = params && params.questionId
    this.questionId = questionId

    if (!this.isLogin()) { // 未登录
      this.login = false
      let surveyInfo = {
        questionId: this.questionId
      }
      setStorage('survey_info', JSON.stringify(surveyInfo));

    } else { // 已登录
      this.login = true
      let surveyInfo = wx.getStorageSync('survey_info')
      if(surveyInfo){ // 登录之后再次跳转到该页面, 获取本地存储调研问卷信息，访问调研问卷
        let result = JSON.parse(surveyInfo)
        if(result && result.questionId){
          this.questionId = result.questionId
          this.url = this.changeUrl()
          removeStorage('survey_info')
        }

      }else{ // 登录之后直接跳转到该页面
        if(query && this.questionId){ // 扫码进来的（调研问卷）
          this.url = this.changeUrl()
        }else{ // 列表跳转进来的（调研问卷、电子签约）
          if (options.url) {
            let params = this.getQueryParams(options.url)
            this.questionId = params && params.questionId
            this.url = decodeURIComponent(options.url);
          }
        }

      }
    }

    // 跳转页面后标题会自动带上，无需赋值
    // this.dynamicStateTitle();
    this.$apply()
    console.log(this.url)
  }
  getMsg(data) {
    console.error(data)
  }

  onShareAppMessage() {}

}
