import wepy from 'wepy';
import { connect } from 'wepy-redux'
import { getProblemList } from '@/store/actions/notice'
import Toast from '@/components/vant/toast/toast';

interface Data {
  TimeFilterVisible: boolean;
  timeList: any[];
  qlist: any[];
  time: string;
  title: string;
  pageNo: number;
}

@connect({
  problemlist({ notice }) {
    return notice.problemlist
  }
}, {
  getProblemList
})

export default class ProblemList extends wepy.page {

  config = {
    navigationBarTitleText: '常见问题',
    usingComponents: {
      'van-popup': '../../../../components/vant/popup/index',
      "van-toast": "../../../../components/vant/toast/index",
      'van-icon': '../../../../components/vant/icon/index',
    },
  };

  data: Data = {
    TimeFilterVisible: false,
    timeList: [
      { label: '全部时间', value: '' },
      { label: '最近一个周', value: '7' },
      { label: '最近一个月', value: '1' },
      { label: '最近三个月', value: '3' },
      { label: '最近六个月', value: '6' },
    ],
    pageNo: 1,
    time: '',
    title: '',
    timelabel: '全部时间'
  }

  methods = {
    touchTimeFilter: () => {
      if (!this.TimeFilterVisible) {
        this.TimeFilterVisible = true
        return
      }
      this.TimeFilterVisible = false
    },
    onSelectTime(Time, Label) {
      this.time = Time
      this.timelabel = Label
      this.methods.touchTimeFilter()
      this.pageNo = 1
      this.getProblem();
    },
    gotodetail(e: any) {
      wx.navigateTo({
        url: `/pages/me/common-problem/detail/index?id=${e}`
      })
    },
    loadNextPage() {
      if (this.pageNo >= this.problemlist.pageSize) {
        //
      } else {
        this.pageNo++
        this.getProblem();
      }
    },
    onTitleChange(e: any) {
      const { detail } = e;
      this.title = detail.value;
    },
    onSearch() {
      this.pageNo = 1
      this.getProblem();
    }
  }
  getProblem() {
    Toast.loading({
      message: '正在加载',
      duration: 0
    })
    this.methods.getProblemList(this.pageNo, this.time, this.title).then(() => {
      Toast.clear()
    })
  }
  onShow() {
    this.getProblem();
  }
}
