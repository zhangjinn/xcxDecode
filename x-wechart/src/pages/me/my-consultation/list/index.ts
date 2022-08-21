import wepy from 'wepy';
import { connect } from 'wepy-redux'
import { getConsultList } from '@/store/actions/consultation'
import Toast from '@/components/vant/toast/toast';
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  TimeFilterVisible: boolean;
  StatusFilterVisible: boolean;
  timeList: any[];
  statusList: any[];
  pageNo: number;
  showRightBtn: false;
  headerTabList: any[];
}

@connect({
    consultlist({ consultation }) {
      return consultation.consultlist
    }
  }, {
    getConsultList
})

export default class ProblemList extends wepy.page {

  config = {
    navigationBarTitleText: '我的问题',
    usingComponents: {
      'van-popup': '../../../../components/vant/popup/index',
      'van-icon': '../../../../components/vant/icon/index',
      "van-toast": "../../../../components/vant/toast/index",
    },
  };
  components = {
    headerTab,
  };
  data: Data = {
    TimeFilterVisible: false,
    StatusFilterVisible: false,
    timeList: [
      { label: '全部时间', value: '' },
      { label: '最近一个周', value: '7' },
      { label: '最近一个月', value: '1' },
      { label: '最近三个月', value: '3' },
      { label: '最近六个月', value: '6' },
    ],
    statusList:[
      { label: '全部状态', value: '' },
      { label: '未回答', value: 'N' },
      { label: '已回答', value: 'Y' },
      { label: '已关闭', value: 'close' },
    ],
    pageNo: 1,
    title:'',
    beginDate:'',
    answerFlag:'',
    timelabel:'全部时间',
    flaglabel:'全部状态',
    showRightBtn: false,
    headerTabList: [
      { name: '时间', type: 'time', selectValue: '' },
      { name: '状态', type: 'status', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  }

  methods = {
    onToggleFilterItem(tabItem){
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
      this.toggleFilterItem(name)
    },
    onSelectTime(value,name) {
      this.beginDate=value;
      this.timelabel=name;
      this.headerTabList[0].selectValue = value
      this.toggleFilterItem()
      this.pageNo=1
      this.getConsultList();
    },
    onSelectStatus(value,name) {
      this.answerFlag=value;
      this.flaglabel=name;
      this.headerTabList[1].selectValue = value
      this.toggleFilterItem()
      this.pageNo=1
      this.getConsultList();
    },
    gotodetail(e: any){
      wx.navigateTo({
        url: `/pages/me/my-consultation/detail/index?id=${e}`
      })
    },
    loadNextPage(){
      if (this.pageNo >= this.consultlist.pageSize) {
        //
      } else {
        this.pageNo++
        this.getConsultList()
      }
    },
    onTitleChange(e:any){
      const {detail}=e;
      this.title=detail.value;
    },
    onSearch(){
      this.pageNo=1
      this.getConsultList();
    }
  }

  toggleFilterItem(name) {

    if(name === 'time') {
      if(!this.TimeFilterVisible && this.StatusFilterVisible) {
        this.StatusFilterVisible = !this.StatusFilterVisible
      }
      this.TimeFilterVisible = !this.TimeFilterVisible
      return
    }
    if(name === 'status') {
      if(!this.StatusFilterVisible && this.TimeFilterVisible) {
        this.TimeFilterVisible = !this.TimeFilterVisible
      }
      this.StatusFilterVisible = !this.StatusFilterVisible
      return
    }
    this.StatusFilterVisible = false
    this.TimeFilterVisible = false
  }
  getConsultList(){
    Toast.loading({
      message: '正在加载',
      duration: 0
    })
    this.methods.getConsultList(this.pageNo,this.title,this.beginDate,this.answerFlag).then(() => {
      Toast.clear()
    })
  }
  onShow() {
    this.pageNo=1
    this.getConsultList();
  }
}
