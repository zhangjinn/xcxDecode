import wepy from 'wepy';

export default class extends wepy.component {
  props = {
    description: { // 默认描述
      type: String,
      default: '',
    },
  }
  externalClasses = ['custom-class'] // 外部传入class类
  data = {
    imgObj: {
      emptyActivity: 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552691_234752c5bcf74f2c8293e1ab460b1c43.png',
    },
  };
  computed = {
    descriptionText: function () {
      let desc = this.descriptionTextChange(this.description)
      return desc
    },
  }
  descriptionTextChange(description){
    if(description){
      if(description === '购物车'){
        return '您的购物车空空如也哦~'
      }
      return `暂无${description}哦～`
    }else{
      return '暂无数据哦~'
    }
  }
}
