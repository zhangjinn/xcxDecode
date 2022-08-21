import wepy from 'wepy';
import {
  getPotentialSpart,
  getDefevtiveProByMatkl,
} from '@/store/actions/order';
import {connect} from "wepy-redux";
import Toast from "@/components/vant/toast/toast";

@connect({
}, {
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

  data = {
    purchaseIntention: [], // 家电信息
    popList: [], // 当前选择弹框列表
    popIndex: '-1',
    popTitle: '', // 当前选择弹框标题
    popFiledKey: '',
    popVisible: false, // 是否显示选择弹框
    compareInfo: {}, // 选择弹框当前选择列表项
    intendedCategoryOption: [], // 品类选择列表
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
    // 修改输入框
    onBaseFieldChange: ({ detail, currentTarget}: any) => {
      const { index, key } = currentTarget.dataset
      this.popIndex = index
      this.popFiledKey = key
      this.purchaseIntention[index][key] = detail
      if( key === 'intendedProduct' ){
        this.purchaseIntention[this.popIndex].popShow = true
        this.getDefevtiveProByMatklInfo()
      }

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

    // 删除家电信息
    onDelete(event){
      const { index } = event.currentTarget.dataset
      this.purchaseIntention.splice(index, 1)
    },
    // 继续添加
    onAdd(){
      this.purchaseIntention.push(
        {
          intendedCategory: {
            id: '',
            name: ''
          }, // 品类
          intendedProduct: '', // 产品
          brand: '', // 品牌
          years: '', // 年限
          remark: '', // 备注
        }
      )
      this.$apply()
    },

    // 校验
    checkParams: () => {
      let arr = this.purchaseIntention
      for(let i=0;i<arr.length;i++){
        if (!arr[i].intendedCategory.id) {
          return `第${i+1}条 家电信息 品类不能为空`
        }
        if (arr[i].years && arr[i].years>100) {
          return `第${i+1}条家电信息年限不能超过100年`
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
