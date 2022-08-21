import wepy from 'wepy';
import { connect } from 'wepy-redux'
import { getProblemDetail } from '@/store/actions/notice'
import Toast from '@/components/vant/toast/toast';

interface Data {
  info:any{};
}

@connect({
    problemdetail({ notice }) {
      return notice.problemdetail
    }
  }, {
    getProblemDetail
})

export default class ProblemList extends wepy.page {

  config = {
    navigationBarTitleText: '常见问题',
    usingComponents: {
      "van-toast": "../../../../components/vant/toast/index",
    },
  };

  data: Data = {

  }

  methods = {

  }

  onLoad(e: { id: any; }) {
    Toast.loading({
      message: '正在加载',
      duration: 0
    })
    const { id } = e
    this.methods.getProblemDetail(id).then(() => {
      Toast.clear()
    });
  }
}
