import wepy from 'wepy';
import { connect } from 'wepy-redux'
import { getNoticeList } from '@/store/actions/notice'
import Toast from '@/components/vant/toast/toast';
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
  pageNo: number;
  plate: string;
}
@connect({
  list({ notice }) {
    return notice.list
  },
}, {
  getNoticeList
})
export default class NoticeList extends wepy.page {

  config = {
    navigationBarTitleText: '公告',
    usingComponents: {
      "van-toast": "/components/vant/toast/index",
    },
  };
  components = {
    emptyDataType,
  };
  data: Data = {
    pageNo: 1,
    plate: ''
  }

  methods = {
    loadNextPage() {
      if (this.pageNo >= this.list.pageSize) {
        //
      } else {
        Toast.loading({
          message: '正在加载',
          duration: 0
        })
        this.pageNo++;
        this.methods.getNoticeList(this.pageNo, this.plate).then(() => {
          Toast.clear()
        })
      }
    },
    goDetails(id) {
      wx.navigateTo({
        url: '/pages/me/notice/detail/index?id=' + id
      });
    }
  }

  onShow() {
    Toast.loading({
      message: '正在加载',
      duration: 0
    });
    this.methods.getNoticeList(1,this.plate).then(res => {
      Toast.clear();
      this.pageNo = res.payload.currentPage;
    })
  }
  onLoad(e: {state: string}) {
    const{plate} = e;
    this.plate = plate;
    wx.setNavigationBarTitle({
      title: this.plate
    });
  }
}
