import wepy from 'wepy';
import systemMixin from '@/mixins/system';

interface Data {
  type: string;
  menuWidth: number;
}

const { width } = wx.getMenuButtonBoundingClientRect();

export default class Header extends wepy.component {

  data: Data = {
    type: 'info',
    menuWidth: width,
  };
  mixins = [systemMixin];
  events = {
    'index-broadcast': (...args) => {
      let $event = args[args.length - 1]
    }
  }

  methods = {
    tap() {
      // this.num = this.num + 1
    },
    add() {
      let len = this.list.length
      this.list.push({ id: len + 1, title: 'title_' + len })
    },
  };
}
