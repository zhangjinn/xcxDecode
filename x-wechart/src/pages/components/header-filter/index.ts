import wepy from 'wepy';

export default class extends wepy.component {
  config = {
    usingComponents: {
      'van-search': '../../../../components/vant/search/index',
    },
  };
  props = {
    tabList: { // tab列表
      type: Array,
      default: function () {
        return [
          {
            name: '未读',
            count: 0
          },
          {
            name: '已读',
            count: 0
          },
        ];
      },
    },
    tabActive: { // 默认tab选中项
      type: String || Number,
      default: 0,
    },
    showTab: { // 是否显示tab
      type: Boolean,
      default: true,
    },
    showSearch: { // 是否显示搜索框
      type: Boolean,
      default: true,
    },
    activeLineStyle: { // 选中状态下 下划线的样式
      type: Object,
      default: function () {
        return {
          width: '32rpx',
          height: '8rpx'
        }
      },
    }
  }
  externalClasses = ['custom-class'] // 外部传入class类
  data = {
    searchKey: '',
  };
  // 页面内交互写在methods里
  methods = {
    changeTab(oIndex){
      this.$emit('tabChange', {
        tabActive: oIndex,
      })
      this.$apply()
    },
    onChange: (e: any) => {
      this.searchKey = e.detail;
      this.$emit('searchChange', {
        searchKey: this.searchKey,
      })
    },
    onCancel: () => {
      this.searchKey = '';
      this.$emit('searchChange', {
        searchKey: this.searchKey,
      })
    },
    onSearch: () => {
      this.$emit('searchChange', {
        searchKey: this.searchKey,
      })
    },

  };

}
