/**
 * 通用处理逻辑
 * 获取系统通用信息
 */

import wepy from 'wepy';
import { getSystemInfo, SystemInfo } from '@/utils/index';

interface Data {
  sys: SystemInfo | null;
}

export default class SystemMixins extends wepy.mixin {
  data: Data = {
    sys: null,
  };
  onLoad() {
    getSystemInfo().then((res) => {
      this.sys = res;
      this.$apply();
    });
  }
}
