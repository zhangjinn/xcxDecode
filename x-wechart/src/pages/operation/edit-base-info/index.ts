import wepy from 'wepy';
import { connect } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import {
  findLabelList,
  saveLabelInfo,
  findSourceList,
  saveSourceInfo,
  getShopPotentialUserDetail,
  updateShopPotentialUser,
  getFollowPeopleList,
} from '@/store/actions/order';
import { debounce } from 'throttle-debounce';
import {checkTel} from '@/utils/index';
import utilsWxs from '../../../wxs/utils.wxs';

interface Data {
  popTitle: string;
  compareInfo: {};
  popFiledKey: string;
  popVisible: boolean;
  popFiBookVisible: boolean;
  popList: any[];
  popIndex: any;
  warehouseList: any[];
  genderOption: any[];
  addWeChatOption: any[];
  baseFormData: object;
  tagOption:any[];
  sourceOption:any[];
  purchaseBudgetOption: any[];
  followerOption: any[];
  custInfoId: any;
  detailId: any;
}

@connect({

}, {
  findLabelList, // 获取意向标签列表
  saveLabelInfo, // 保存意向标签
  findSourceList, // 获取意向用户来源列表
  saveSourceInfo, // 保存意向用户来源
  updateShopPotentialUser, // 修改意向用户
  getShopPotentialUserDetail, // 获取意向用户详情
  getFollowPeopleList, // 跟进人列表
})
export default class IntendedUsersOrder extends wepy.page {
  config = {
    navigationBarTitleText: '编辑基本信息',
    usingComponents: {
      "van-popup": "/components/vant/popup/index",
      "van-toast": "/components/vant/toast/index",
      "van-icon": "/components/vant/icon/index",
      "van-field": "/components/vant/field/index",
      "van-dialog": "/components/vant/dialog/index",
      "tile-radio": "/components/tile-radio/index",
      "entry-label": "/components/user-operation/entry-label/index",
      "entry-source": "/components/user-operation/entry-source/index",
    },
  };
  wxs = {
    utils: utilsWxs,
  };
  data: Data = {
    baseFormData: {
      customerName: '', // 用户姓名*
      customerPhone: '', // 手机号*
      gender: {
        id: '1',
        name: '男'
      }, // 用户性别
      addWeChat: {
        id: '1',
        name: '未加'
      }, // 是否添加微信
      source: {
        id: '',
        name: ''
      }, // 用户来源
      tag: {
        id: [],
        name: []
      }, // 用户标签
      follower: {
        id: '',
        name: ''
      }, // 变更跟进人
      remark: '', // 备注
    },
    popList: [],
    popIndex: '-1',
    popTitle: '',
    popVisible: false,
    popFiledKey: '',
    compareInfo: {},
    genderOption: [
      {id:'1', name:'男士'},
      {id:'2', name:'女士'},
    ], // 用户性别选择列表
    addWeChatOption: [
      {id:'0', name:'未加'},
      {id:'1', name:'已加'},
    ], // 是否添加微信选择列表
    tagOption: [], // 标签选择列表
    sourceOption: [], // 用户来源选择列表
    followerOption: [], // 变更跟进人选择列表
    custInfoId: '', // 商家id
    detailId: '', // 请求详情id
  };

  methods = {

    // 应该获取那个值给popList   应该对比那个字段为选中信息
    openChoose: (event) => {
      const { title, index, key, options } = event.currentTarget.dataset
      let list = this[options]
      if (!list || list.length === 0) {
        return
      }
      this.popList = list
      this.popIndex = index
      this.popFiledKey = key
      this.popTitle = title
      this.compareInfo = this.baseFormData[this.popFiledKey]

      this.popVisible = true
    },
    onClose: () => {
      this.popVisible = false
    },
    onChoose: ({ currentTarget }: e) => {
      const { index } = currentTarget.dataset
      const { popFiledKey, popList, popIndex } = this.data
      this.baseFormData[popFiledKey] = popList[index]
      this.popVisible = false

      if (popFiledKey === 'store') {
        const storeId = popList[index].id
        this.methods.getStoreMaterial(storeId)
      }
    },

    // 基本信息表单输入框改变
    onBaseFieldChange: debounce(500, ({ detail, currentTarget }: any) => {
      const { key } = currentTarget.dataset
      this.baseFormData[key] = detail.trim()
      this.$apply()
    }),

    // 自定义单选改变
    onRadioChange(event){
      const { detail } = event
      const { key } = event.currentTarget.dataset
      this.baseFormData[key] = detail
      this.$apply()
    },

    // 选择用户来源
    onSourceChange(param){
      const { option, index } = param.detail
      this.baseFormData.source = option
      this.$apply()
    },

    // 保存用户来源
    saveSourcePop(param){
      const { name, popActiveItem } = param.detail
      if(name === ''){
        this.baseFormData.source = popActiveItem
        return
      }
      this.methods.saveSourceInfo({
        custInfoId: this.custInfoId, // 商家id
        type: 2, // 类别 1系统，2自定义
        source: name, // 来源名
        remark: '', // 备注
      }).then((res)=>{
        const { code, data, msg } = res.payload
        if(code == 0) {
          let currSource = {
            id: data,
            name: name,
          }
          this.sourceOption.push(currSource)
          this.baseFormData.source = currSource
        }else{
          Toast.fail(msg)
        }
        this.$apply()
      })
    },

    // 选择用户标签
    onTagChange(param){
      const { option, index } = param.detail
      this.tagOption[index].active=!this.tagOption[index].active
      let ids = []
      let names = []
      this.tagOption.forEach((item)=>{
        if(item.active){
          ids.push(item.id)
          names.push(item.name)
        }
      })
      this.baseFormData.tag.id = ids
      this.baseFormData.tag.name = names
      this.$apply()
    },

    // 保存新增标签
    saveTagPop(param){
      const { tagName, tagDesc, popOptions } = param.detail
      this.tagOption = popOptions
      this.baseFormData.tag.id = []
      this.baseFormData.tag.name = []
      this.tagOption.forEach((item)=>{
        if(item.active){
          this.baseFormData.tag.id.push(item.id)
          this.baseFormData.tag.name.push(item.name)
        }
      })
      if(tagName === ''){
        return
      }
      this.methods.saveLabelInfo({
        custInfoId: this.custInfoId, // 商家id
        type: 2, // 类别 1系统，2自定义
        label: tagName, // 标签名
        remark: tagDesc, // 备注
      }).then((res)=>{
        const { code, data, msg } = res.payload
        if(code == 0) {
          this.tagOption.push({
            id: data,
            name: tagName,
            active: true,
          })
          this.baseFormData.tag.id.push(data)
          this.baseFormData.tag.name.push(tagName)
        }else{
          Toast.fail(msg)
        }
        this.$apply()
      })
    },

    // 提交
    submit: () => {
      const { customerName, customerPhone, gender, addWeChat, source, tag, follower, remark } = this.data.baseFormData
      let that = this
      if (that.methods.checkParam()) {
        let param = {
          id: this.detailId,
          custInfoId: this.custInfoId, // 商家id
          userName: customerName, // 用户名
          phone: customerPhone, // 电话
          wechat: addWeChat.id, // 微信
          gender: gender.id, // 性别
          sourceId: source.id, // 来源id
          labelList: tag.id, // 标签数组,number []
          followPeople: follower.id, // 变更跟进人
          remark: remark, // 备注
        }

        this.methods.updateShopPotentialUser(param).then((res)=>{
          const { type, text, msg} = res.payload
          if(type === 'success'){
            Toast.success({
              forbidClick: true,
              duration: 1000,
              message: text,
              onClose: () => {
                let pages = getCurrentPages(); // 当前页面
                let beforePage = pages[pages.length - 2]; // 前一个页面
                // beforePage.data.tabBarActive = 'XXZL'
                let id=beforePage.data.detailId
                beforePage.onLoad({id:id, tabBarActive: 'XXZL'}); // 执行前一个页面的方法
                wx.navigateBack({
                  delta: 1,
                });
                this.$apply()
              },
            });
          }else{
            Toast.fail(msg)
          }
        })
      }
    },

    checkParam: () => {
      const { customerPhone } = this.data.baseFormData
      if (customerPhone === '') {
        Toast.fail('请填写手机号')
        return false
      }
      if (!checkTel(customerPhone)) {
        Toast.fail('请填写正确手机号')
        return false
      }
      return true
    },

  }
  // 获取标签列表、用户来源列表
  findLabelListInfo(){
    let param = {
      custInfoId: this.custInfoId // 商家id
    }
    this.methods.findLabelList(param).then((res)=>{
      if(res && res.payload && res.payload.data) {
        this.tagOption = res.payload.data.map(item => {
          item.id = item.id
          item.name = item.label
          item.active = item.false
          if(this.baseFormData.tag.id.indexOf(item.id)>-1){
            item.active = true
          }
          return item
        })
      }
      this.$apply()
    })
    this.methods.findSourceList(param).then((res)=>{
      if(res && res.payload && res.payload.data) {
        this.sourceOption = res.payload.data.map(item => {
          return {
            ...item,
            id: item.id,
            name: item.source,
          }
        })
      }
      this.$apply()
    })
  }

  // 获取跟进人列表
  getFollowPeopleListInfo(){
    let param = {
      shopInfoId: this.details.shopInfoId // 门店id
    }
    this.methods.getFollowPeopleList(param).then((res)=>{
      const { list } = res.payload
      if(list) {
        this.followerOption = list.map(item => {
          item.id = item.code
          return item
        })
      }
      this.$apply()
    })
  }

  // 获取意向用户详情
  getShopPotentialUserDetailInfo(){
    this.methods.getShopPotentialUserDetail({
      userId: this.detailId
    }).then((res)=>{
      const { data } = res.payload
      this.details = data
      this.baseFormData.customerName = data.userName // 用户姓名*
      this.baseFormData.customerPhone = data.phone // 手机号*
      this.baseFormData.gender.id = data.gender
      this.baseFormData.gender.name = data.genderName // 用户性别
      this.baseFormData.addWeChat.id = data.wechat
      this.baseFormData.addWeChat.name = data.wechat === '0' ? '未加': data.wechat === '1' ? '已加': '' // 是否添加微信
      this.baseFormData.source.id = data.sourceId
      this.baseFormData.source.name = data.sourceName // 用户来源

      let tagNameArr = []
      if(data.label){
        tagNameArr = data.label.split(',')
      }
      this.baseFormData.tag.id = data.labelList || []
      this.baseFormData.tag.name = tagNameArr // 用户标签

      this.baseFormData.follower.id = data.followPeople
      this.baseFormData.follower.name = data.followPeopleName // 变更跟进人
      this.baseFormData.remark = data.remark // 备注

      this.findLabelListInfo()
      this.getFollowPeopleListInfo()
      this.$apply()
    })
  }

  onLoad({ id }){
    const { customer }=JSON.parse(wx.getStorageSync('b2b_token'))
    this.custInfoId=customer && customer.id
    this.detailId = id
    this.getShopPotentialUserDetailInfo()
  }
}
