import { handleActions } from 'redux-actions';
import {
  GET_NOTICE_LIST, GET_NOTICE_DETAIL,
  GET_PROBLEM_LIST, GET_PROBLEM_DETAIL,
  GET_MESSAGE_LIST, RESET_MESSAGE_LIST,
  GET_NEW_INFO_ITEMS, GET_PLATES, GET_MENU_NOTICE_LIST,
  SET_MENU_NOTICE_LIST
} from '@/store/types/notice'
import { formatDate } from '@/utils/index'
import { forEach, concat } from 'ramda';

// class Notice {
//   id: number;
//   title: string
//   billBoardName?: string
//   publishDate: number
//   publishAt: string // publishDate 格式化
//   newMessage: boolean
//   organizationName: string
// }

// {"hideLi":true,"billboardMessage":{"id":14170126121,"lock_version":null,"creator":null,"modifyUser":null,"createDate":null,"lastUpdateDate":null,"isDeleted":false,"sendUserId":null,"sendUserName":null,"status":null,"fileName":[],"filePath":[],"billBoardId":null,"billBoardName":null,"classifyId":null,"classifyName":null,"title":"测试测试","content":"
// fsdfsfsfsdsfdfdsdfs

// ","publishDate":1568104970611,"regionCode":null,"regionName":null,"provinceCode":null,"provinceName":null,"isIndex":null,"ifTop":null,"orgType":null,"organizationId":null,"organizationCode":null,"organizationName":"海信集团","levelCode":null,"channelCode":null,"channelName":null,"startDate":null,"endDate":null,"newMessage":null},"lastBillboardMessage":{"id":14170126120,"lock_version":null,"creator":null,"modifyUser":null,"createDate":null,"lastUpdateDate":null,"isDeleted":false,"sendUserId":null,"sendUserName":null,"status":null,"fileName":null,"filePath":null,"billBoardId":null,"billBoardName":null,"classifyId":null,"classifyName":null,"title":"测试测试","content":null,"publishDate":null,"regionCode":null,"regionName":null,"provinceCode":null,"provinceName":null,"isIndex":null,"ifTop":null,"orgType":null,"organizationId":null,"organizationCode":null,"organizationName":null,"levelCode":null,"channelCode":null,"channelName":null,"startDate":null,"endDate":null,"newMessage":null},"nextBillboardMessage":{"id":14170126140,"lock_version":null,"creator":null,"modifyUser":null,"createDate":null,"lastUpdateDate":null,"isDeleted":false,"sendUserId":null,"sendUserName":null,"status":null,"fileName":null,"filePath":null,"billBoardId":null,"billBoardName":null,"classifyId":null,"classifyName":null,"title":"测试名字很长测试名字很长测测试名字很长","content":null,"publishDate":null,"regionCode":null,"regionName":null,"provinceCode":null,"provinceName":null,"isIndex":null,"ifTop":null,"orgType":null,"organizationId":null,"organizationCode":null,"organizationName":null,"levelCode":null,"channelCode":null,"channelName":null,"startDate":null,"endDate":null,"newMessage":null},"status":"nologin"}
export default handleActions({
  /**
   * 列表数据: messageList: [{
   *  "title": "xxx"   展示名称
   *  "billBoardName": "xxx" 板块
   *  "publishDate": 1568103238131 发布时间
   *  "id": 14170125965
   *  "newMessage": true 新消息
   *  "organizationName": 组织名称
   * }]
   *
   * 只需要这6个字段。
   * @param state
   * @param action
   */
  [RESET_MESSAGE_LIST](state, action) {
    const messageList: any = []
    state = {
      ...state,
      messageList,
    }
    return {
      ...state,
      messageList: [],
      totalPages: '0'
    };
  },
  // TODO:五期新加的东西
  [GET_NEW_INFO_ITEMS](state, action) {
    const { payload } = action
    return {
      ...state,
      Issue: payload
    };
  },
  [GET_MESSAGE_LIST](state, action) {
    const { payload } = action
    const { priceMessageList, totalPages } = payload
    const { messageList } = state
    if (priceMessageList && priceMessageList.length > 0) {
      forEach((item: any) => {
        item.createdDate = item.createdDate.substring(0,16)
        // 这里没用写好的时间方法是安卓和ios对时间格式要求不一样
        // item.createdDate = formatDate(item.createdDate, 'Y-M-D h:m')
      }, priceMessageList)
    }
    let newList = priceMessageList
    if (messageList && messageList.length > 0) {
      newList = concat(messageList, newList);
    }
    return {
      ...state,
      messageList: newList,
      totalPages
    };
  },
  [GET_NOTICE_LIST](state, action) {
    const { payload } = action;
    const { list } = state;
    payload.list.forEach((it: any) => {
      it.publishAt = formatDate(`${it.publishDate}`, 'Y-M-D')
    })
    const result = {
      noticeImageUrl: payload.noticeImageUrl,
      pageSize: payload.totalPages,
      datasCount: payload.datasCount,
      notices: []
    }
    // 第一页，初始化数据
    if (1 === +payload.currentPage) {
      result.notices = payload.list;
    } else {
      result.notices = list.notices.concat(payload.list)
    }

    return {
      ...state,
      list: result,
    };
  },
  [GET_MENU_NOTICE_LIST](state, action) {
    const { payload } = action;
    const list = (payload.list||[]).filter(it=>it.isPop=='1')
    return {
      ...state,
      menuNoticeList: list,
    };
  },
  [SET_MENU_NOTICE_LIST](state, action) {
    const { payload } = action;
    return {
      ...state,
      menuNoticeList: payload||[],
    };
  },
  [GET_NOTICE_DETAIL](state, action) {
    const { payload } = action
    payload.billboardMessage.publishAt = formatDate(`${payload.billboardMessage.publishDate}`, 'Y-M-D')

    return {
      ...state,
      detail: payload
    }
  },
  [GET_PROBLEM_LIST](state, action) {
    const { payload } = action
    const { problemlist } = state
    payload.list.forEach((it: any) => {
      it.startAt = formatDate(`${it.startTime}`, 'Y-M-D')
    })
    const result = {
      pageSize: payload.totalPages,
      problems: []
    }

    // 第一页，初始化数据
    if (1 === +payload.page) {
      result.problems = payload.list
    } else {
      result.problems = problemlist.problems.concat(payload.list)
    }

    return {
      ...state,
      problemlist: result,
    };
  },
  [GET_PROBLEM_DETAIL](state, action) {
    const { payload } = action
    payload.commonFAQModel.startAt = formatDate(`${payload.commonFAQModel.startTime}`, 'Y-M-D')
    if (!payload.commonFAQModel.answer) {
      payload.commonFAQModel.answer = '暂无回答'
    }
    return {
      ...state,
      problemdetail: payload.commonFAQModel
    }
  },
  [GET_PLATES](state, action) {
    const { payload } = action;
    return {
      ...state,
      plates: payload.plates
    }
  },
}, {
  list: {
    notices: [],
    pageSize: 0
  },
  detail: {},
  problemlist: {
    problems: [],
    pageSize: 0
  },
  problemdetail: {},
  messageList: [],
  totalPages: '',
  Issue: {},
  plates: {},
  menuNoticeList:[]
});
