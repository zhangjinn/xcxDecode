import wepy from 'wepy';
import {fillZero} from "@/utils/index";
import {
  commDict,
  getPotentialSpart,
  getDefevtiveProByMatkl,
} from '@/store/actions/order';
import {connect} from "wepy-redux";

@connect({
}, {
  commDict,
  getPotentialSpart, // 意向品类
  getDefevtiveProByMatkl, // 产品模糊搜索
})
export default class extends wepy.component {
  config = {
    usingComponents: {
      "van-field": "../../vant/field/index",
      "van-popup": "../../vant/popup/index",
      "van-toast": "../../vant/toast/index",
      "calendar": "../../calendar/index",
    },
  };
  props = {
    list: {
      type: Array,
      default: function (){
        return [
          {
            intendedCategory: {
              id: '',
              name: ''
            }, // 意向品类
            intendedProduct: '', // 意向产品
            purchaseBudget: {
              id: '',
              name: ''
            }, // 购买预算
            expectedDeliveryDate: '', // 计划购买时间
            popShow: false, // 是否显示意向产品模糊搜索弹框
          }
        ] // 购买意向
      }
    },
    pageType: {
      type: String,
      default: 'intendedUsers' // intendedUsers->意向用户录入，salesOpportunity -> 销售机会
    }
  }
  watch = {
    list: function (newVal){
      if(newVal && newVal.length>0){
        this.purchaseIntention = newVal.map((item)=>{
          return {
            intendedCategory: {
              id: item.spartId,
              name: item.spartName
            }, // 意向品类
            intendedProduct: item.product, // 意向产品
            purchaseBudget: {
              id: item.budget,
              name: item.budget
            }, // 购买预算
            expectedDeliveryDate: item.planBuyTimeStr, // 计划购买时间
            popShow: false, // 是否显示意向产品模糊搜索弹框
          }
        })
      }
      this.$apply()
    }
  }
  // 缓存触发
  callback = () => {};
  data = {
    calendarShow: false,
    calendarConfig: { // 日历配置
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    currentDate: new Date().getTime(), // 计划购买时间弹框显示当前日期
    imgObj: {
      'productInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864759346_77a464c855c841938c5dfa1149dc2f30.png', // 产品信息@2x.png
    },
    purchaseIntention: [
      {
        intendedCategory: {
          id: '',
          name: ''
        }, // 意向品类
        intendedProduct: '', // 意向产品
        purchaseBudget: {
          id: '',
          name: ''
        }, // 购买预算
        expectedDeliveryDate: '', // 计划购买时间
        popShow: false, // 是否显示意向产品模糊搜索弹框
      }
    ], // 购买意向
    popList: [], // 当前选择弹框列表
    popIndex: '-1',
    popTitle: '', // 当前选择弹框标题
    popFiledKey: '',
    popVisible: false, // 是否显示选择弹框
    compareInfo: {}, // 选择弹框当前选择列表项
    intendedCategoryOption: [], // 意向品类选择列表
    purchaseBudgetOption: [], // 购买预算选择列表
    intendedProductOption: [], // 意向产品列表
  }

  // 页面内交互写在methods里
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
      this.compareInfo = this.purchaseIntention[this.popIndex][this.popFiledKey]
      this.popVisible = true
    },
    // 修改意向产品
    onIntendedProductChange: ({ detail, currentTarget}: any) => {
      const { index, key } = currentTarget.dataset
      this.popIndex = index
      this.popFiledKey = key
      this.purchaseIntention[index][key] = detail
      this.purchaseIntention[this.popIndex].popShow = true
      this.getDefevtiveProByMatklInfo()
      this.$apply()
    },
    // 修改意向产品模糊搜索列表隐藏
    popHide: () => {
      this.purchaseIntention = this.purchaseIntention.map((item)=>{
        item.popShow = false
        return item
      })
      this.intendedProductOption = []
    },
    // 选择产品并赋值
    onProductSelect(item){
      const { name } = item
      this.purchaseIntention[this.popIndex][this.popFiledKey] = name
      this.methods.popHide()
    },
    onClose: () => {
      this.popVisible = false
    },
    onChoose: ({ currentTarget }: e) => {
      const { index } = currentTarget.dataset
      const { popFiledKey, popList, popIndex } = this.data
      this.purchaseIntention[popIndex][popFiledKey] = popList[index]
      this.popVisible = false
    },
    // 日期弹层
    openChooseDayPopup: (event) => {
      const { index, key, title } = event.currentTarget.dataset
      this.popIndex = index
      this.popFiledKey = key
      this.popTitle = title
      this.calendarShow = !this.calendarShow
    },
    // 关闭日期弹框
    closeCalendar() {
      this.calendarShow = false;
    },
    // 选择日期
    chooseDay(evt: { detail }) {
      const { year, month, day } = evt.detail;
      const currDate = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.purchaseIntention[this.popIndex][this.popFiledKey] = currDate
      this.calendarShow = false;
      this.$apply()
    },
    // 删除购买意向
    onDelete(event){
      const { index } = event.currentTarget.dataset
      if(this.purchaseIntention.length>1){
        this.purchaseIntention.splice(index, 1)
      }else{
        this.purchaseIntention = [
          {
            intendedCategory: {
              id: '',
              name: ''
            }, // 意向品类
            intendedProduct: '', // 意向产品
            purchaseBudget: {
              id: '',
              name: ''
            }, // 购买预算
            expectedDeliveryDate: '', // 计划购买时间
            popShow: false, // 是否显示意向产品模糊搜索弹框
          }
        ] // 购买意向
      }
    },
    // 继续添加
    onAdd(){
      this.purchaseIntention.push(
        {
          intendedCategory: {
            id: '',
            name: ''
          }, // 意向品类
          intendedProduct: '', // 意向产品
          purchaseBudget: {
            id: '',
            name: ''
          }, // 购买预算
          expectedDeliveryDate: '', // 计划购买时间
          popShow: false, // 是否显示意向产品模糊搜索弹框
        }
      )
      this.$apply()
    },

    // 重置表单数据
    initBaseData(){
      this.purchaseIntention ={
        intendedCategory: {
          id: '',
          name: ''
        }, // 意向品类
        intendedProduct: '', // 意向产品
        purchaseBudget: {
         id: '',
         name: ''
        }, // 购买预算
        expectedDeliveryDate: '', // 计划购买时间
        popShow: false, // 是否显示意向产品模糊搜索弹框
      }
      this.$apply()
    },

    // 校验
    checkParams: () => {
      let arr = this.purchaseIntention
      for(let i=0;i<arr.length;i++){
        if (!arr[i].intendedCategory.id) {
          return `第${i+1}条 购买意向 品类不能为空`
        }
      }
      return false
    },

    // 向父组件传参
    getParams: () => {
      return this.purchaseIntention
    }
  }

  commDictInfo(){
    // 获取购买预算选择列表
    this.methods.commDict({
      pid: '14927471376'
    }).then((res)=>{
      const { list } = res.payload
      this.purchaseBudgetOption = list.map((item)=>{
        return {
          ...item,
          id: item.name,
          name: item.name
        }
      })
      this.$apply()
    })

    // 获取意向品类选择列表
    this.methods.getPotentialSpart().then((res)=>{
      const { list } = res.payload
      this.intendedCategoryOption = list.map((item)=>{
        return {
          ...item,
          id: item.code,
          name: item.name
        }
      })
      this.$apply()
    })
  }

  // 获取产品列表
  getDefevtiveProByMatklInfo(){
    let oValue = this.purchaseIntention[this.popIndex][this.popFiledKey]
    this.methods.getDefevtiveProByMatkl({
      term: oValue
    }).then((res)=>{
      const { list } = res.payload
      this.intendedProductOption = list.map((item)=>{
        return {
          name: item
        }
      })
      this.$apply()
    })
  }
  onLoad(){
    this.commDictInfo()
  }

}
