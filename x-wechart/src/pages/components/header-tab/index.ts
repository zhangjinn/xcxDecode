import wepy from 'wepy';
/**
 * tabList传参格式: [{ name: '类型', type:'type', selectValue: ''  }], 最多显示四个
* */
export default class extends wepy.component {
  props = {
    tabList: { // tab列表
      type: Array,
      default: function () {
        return [];
      },
    },
    showRightBtn: { // 是否显示右侧筛选按钮，默认显示
      type: Boolean,
      default: true,
    },
    showRightBtnLine: { // 是否显示右侧筛选按钮竖线，默认显示
      type: Boolean,
      default: true,
    },
    showArrowIcon: { // 是否显示下拉箭头
      type: Boolean,
      default: true,
    },
  }
  computed = {
    tabListNew() {
      return this.tabList.slice(0,4);
    }
  }
  externalClasses = ['custom-class'] // 外部传入class类
  data = {};
  // 页面内交互写在methods里
  methods = {
    changeTab(item){
      this.$emit('onTabChange', item)
    },
    onSideFilter(){
      this.$emit('onSideFilter')
    }
  };

}
