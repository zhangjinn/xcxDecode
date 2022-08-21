import wepy, {Event} from 'wepy';
import {connect} from "wepy-redux";
import Toast from "@/components/vant/toast/toast";
import {
  getAgentActivityById,
} from '@/store/actions/activityare'

import {
  uploadImg,
} from '@/store/actions/record'
import utilsWxs from '../../../../wxs/utils.wxs';

interface Data {
  formData: object;
  currId: any;
  isClickable: boolean;
  activeDetail: any;
  tabActive: string;
  tabList: any[];
  tabInfoItem: object;
}
@connect({

}, {
  uploadImg,
  getAgentActivityById,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '代理商市场活动详情',
    usingComponents: {
      'van-toast': '../../../../components/vant/toast/index',
      "van-field": "../../../../components/vant/field/index",
      "van-cell": "../../../../components/vant/cell/index",
      'van-uploader': '../../../../components/vant/uploader/index',
      "van-icon": "../../../../components/vant/icon/index",
      'van-popup': '../../../../components/vant/popup/index',
      'van-dialog': '../../../../components/vant/dialog/index',
      'calendar': '../../../../components/calendar/index',
      "van-datetime-picker": "../../../../components/vant/datetime-picker/index",
      'van-search': '../../../../components/vant/search/index',
      'van-tab': '../../../../components/vant/tab/index',
      'van-tabs': '../../../../components/vant/tabs/index',
      'van-stepper': '../../../../components/vant/stepper/index',
    },
  };
  data: Data = {
    formData:{
      experienceSharing: [], // 附件
      voucherAttachs: [] // 结算凭证
    },
    tabActive: 'category', // 默认显示参与品类
    tabList: [
      { title: '参与品类', key: 'category', },
      { title: '物料', key: 'materials', },
      { title: '媒体宣传', key: 'media', },
      { title: '临促', key: 'prompt', },
      { title: '赠品', key: 'giveaway', },
      { title: 'TO小B费用', key: 'bFee', },
      { title: '其他', key: 'other', },
    ],
    tabInfoItem: {
      category: { // 参与品类
        items:[]
      },
      materials: { // 物料
        totalNum: 0,
        totalAmount: 0,
        items:[]
      },
      media: { // 媒体宣传
        totalNum: 0,
        totalAmount: 0,
        items:[]
      },
      prompt: { // 临促
        totalNum: 0,
        totalAmount: 0,
        items:[]
      },
      giveaway: { // 赠品
        totalNum: 0,
        totalAmount: 0,
        items:[]
      },
      bFee: { // TO小B费用
        totalNum: 0,
        totalAmount: 0,
        items:[]
      },
      other: { // 其他
        totalNum: 0,
        totalAmount: 0,
        items:[]
      },
    },
    currId: '', // 当前详情id; 值是空则为新增,非空为查看详情或编辑
    activeDetail: {}, // 活动详情
  };

  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {
    // 切换视图
    tabChange(e){
      let { index } = e.detail
      this.tabActive = this.tabList[index].key
      this.$apply()
    },

  };

  // 查询图片回显路径
  getPictureUrl(file){
    let photo = []
    if(file && file.length){
      photo = file.map((item)=>{
        return {
          ...item,
          id: item.id,
          name: item.attachName,
          url: item.attachPath,
          viewType: 'default',
        }
      })
    }
    return photo
  }

  // 视图列表传参字段转换
  viewDataToParams(list){
    let target = []
    if(list && list.items &&  list.items.length>0){
      target = list.items.map((item)=>{
        return {
          num: item.num || 0, // 数量
          price: item.price || 0, // 单价
          remark: item.remark, // 备注
          total: item.total || 0, // 小计
          type: item.type, // 种类
        }
      })
    }
    return target
  }

  // 获取详情视图列表渲染字段转换
  viewDataConversion(list, type){
    if(type && type === 'category'){
      let target = {
        items:[]
      }
      if(list && list.length>0){
        target.items = list.map((item)=>{
          return {
            ...item,
            materialGroup: {
              id: item.matklId,
              name: item.matklName,
            },
            viewType: 'default',
          }
        })
      }
      return target
    }else{
      let target = {
        totalNum: 0,
        totalAmount: 0,
        items:[]
      }
      if(list && list.length>0){
        target.items = list.map((item)=>{
          return {
            ...item,
            num: item.num || 0, // 数量
            price: item.price || 0, // 单价
            remark: item.remark, // 备注
            total: item.total || 0, // 小计
            type: item.type, // 种类
            viewType: 'default', // 视图类型，viewType=default为详情中返回的数据
          }
        })
        target.items.forEach((item)=>{
          target.totalNum += Number(item.num)
          target.totalAmount += Number(item.total)
        })
      }
      return target
    }

  }

  // 获取订单详细信息
  getDetailsData(){
    Toast.loading({
      message: '正在加载',
      duration: 2000
    });
    let param = {
      id: this.currId
    }
    this.methods.getAgentActivityById(param).then((res)=>{
      Toast.clear()
      const { data } = res.payload
      if(data){
        let detail = data
        this.activeDetail = detail
        this.formData = {
          experienceSharing: this.getPictureUrl(detail.attachs), // 附件
          voucherAttachs: this.getPictureUrl(detail.voucherAttachs) // 结算凭证
        }

        this.tabInfoItem = {
          category: this.viewDataConversion(detail.productLineDtoList, 'category'), // 参与品类
          materials: this.viewDataConversion(detail.matklDtoList), // 物料
          media: this.viewDataConversion(detail.mediaDtoList), // 媒体宣传
          prompt: this.viewDataConversion(detail.tempDtoList), // 临促
          giveaway: this.viewDataConversion(detail.giftDtoList), // 赠品
          bFee: this.viewDataConversion(detail.tobDtoList), // TO小B费用
          other: this.viewDataConversion(detail.otherDtoList), // 其他
        }

      }
      this.$apply()
    })
  }

  onLoad({ id, type }) {
    this.currId = ''
    if(id){
      this.currId = id
    }
    this.getDetailsData()
  }
}
