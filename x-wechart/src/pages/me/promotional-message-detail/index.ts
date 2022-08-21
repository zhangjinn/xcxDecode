import wepy from 'wepy';
import { connect } from 'wepy-redux'
import { getAgentActivityApplyNotice } from '@/store/actions/notice'

import emptyDataType from "@/components/empty-data-type/index";
interface Data {
  messageList: any[];
  sourceId: string;
}

@connect({

}, {
  getAgentActivityApplyNotice
})

export default class filter extends wepy.page {
  config = {
    navigationBarTitleText: '代理商活动核销详情',
    usingComponents: {
      'van-toast': '../../../components/vant/toast/index',
      'van-loading': '../../../components/vant/loading/index',
      'no-permission': '../../../components/no-permission/index',
    },
  };
  components = {
    emptyDataType,
  };
  data: Data = {
    messageList: [],
    sourceId: ''
  }

  methods = {

  }
  getMessageList(){
    let param = {
      sourceId: this.sourceId
    }
    this.methods.getAgentActivityApplyNotice(param).then((res)=>{
      this.messageList = res.payload.list
      this.$apply()
    })
  }

  onShow() {
    this.getMessageList()
  }
  onLoad(e) {
    const { id } = e
    this.sourceId = id
  }
}
