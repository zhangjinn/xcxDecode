import wepy from 'wepy';
import * as echarts from '../ec-canvas/echarts@4.9.0.js';

var chart;
var ecComponent;
export default class extends wepy.component {
  config = {
    usingComponents: {
      'ec-canvas': '../ec-canvas/ec-canvas'
    }
  };
  props = { option: Object, height: String, width: String, canvasId: String };
  data = {
    ec: {
      lazyLoad: true
    }
  };
  watch = {
    option(newVal: any, oldVal: any) {
      if (newVal) {
        console.log('aaa'+this.canvasId)
        ecComponent = this.$wxpage.selectComponent('#' + this.canvasId);
        if(!ecComponent){
          return
        }
        ecComponent.init(this.initChart(this));
      }
    }
  };
  onLoad() {}
  initChart(_this: { option: any; height: string; width: string;}) {
    return function(canvas: { setChart: (arg0: any) => void; }, width: number, height: number) {
      var option = _this.option;
      width = parseFloat(_this.width) || wx.getSystemInfoSync().windowWidth - 20;
      height = parseFloat(_this.height) || wx.getSystemInfoSync().windowHeight / 2;
      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      chart.setOption(option);
      return chart;
    };
  }
  methods = {};
}
