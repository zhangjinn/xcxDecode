import wepy from 'wepy';

export default class Header extends wepy.component {
  props = {
    translateX: { // 移动的距离
      type: String || Number,
      default: 0,
    },
    bgColorOut: { // 外部进度条背景颜色
      type: String,
      default: 'rgba(255, 255, 255, 0.35)',
    },
    bgColorInner: { // 内部进度条背景颜色
      type: String,
      default: 'rgba(204, 204, 204, 0.88)',
    },
    isAnimationDelay: { // 内部进度条移动动画
      type: Boolean,
      default: true,
    }
  };
}
