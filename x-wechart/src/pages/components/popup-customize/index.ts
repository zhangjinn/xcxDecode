import wepy from 'wepy';
import utilsWxs from '../../../wxs/utils.wxs';

/**
 * options入参格式参考
 * [{id:'1',name:'11'},{id:'2',name:'22'},]
 *
 * selectedOption入参格式参考
 * {id:'1',name:'11'}单选
 * {id:['1'],name:['11']}多选
* */
interface Data {
  show: boolean;
}
export default class PopupCustomize extends wepy.component {
  config = {
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-search': '../../../components/vant/search/index',
    },
  };
  props = {
    options: { // 选项列表
      type: Array,
      default: function () {
        return [];
      },
    },
    selectedOption: { // 默认选中项
      type: Object,
      default: {},
    },
    title: { // 弹框标题
      type: String,
      default: '',
    },
    multiple: { // 是否多选
      type: Boolean,
      default: false,
    },
    isSearch: { // 是否搜索
      type: Boolean,
      default: false,
    }
  }
  wxs = {
    utils: utilsWxs,
  };
  data: Data = {
    show: false,
  };
  methods = {
    onClose(){
      this.show = false
    },
    onShow(callback: any) {
      this.show = true;
      if (callback) {
        this.callback = callback;
      }
    },
    chooseOption(e){
      const { item } = e.currentTarget.dataset
      if(this.selectedOption && this.selectedOption.id && item.id == this.selectedOption.id){
        this.show = false
        return
      }
      this.$emit('onSelect', item)
    },
    onChange(e){
      let searchValue = e.detail
      this.$emit('onSearch', searchValue)
    }
  };

}
