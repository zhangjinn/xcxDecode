import wepy from 'wepy';

/**
* canvas半圆形进度条
* data: 图表数据
* 格式eg：{
      id: 'myPickCanvas', // canvas的id
      val: 18, // 当前完成量
      totalVal: 100, // 需要完成总量
      config: { // canvas样式配置
        lineBarBg: '#FF8A8A'
      }
    }
**/
export const progress = (data) => {
  if(!data){
    return
  }
  if(data.val && data.val>100){
    data.val = 100
  }
  let left = data.val / (data.totalVal || 100) // 进度（百分比）= 当前完成量 / 应完成总量
  let canvasConfig = { // 回款提货canvas数据
    width: 170, // canvas宽度
    height: 90, // canvas高度
    lineWidth: 12, // 进度条宽度
    lineTrackBg: '#E1E1E1', // 轨道背景色
    lineBarBg: '#1890FF', // 进度条背景色
    filledCircleBg: '#FFFFFF', // 进度小圆点背景色
  }
  if(data.config){
    canvasConfig = {
      ...canvasConfig,
      ...data.config,
    }
  }
  let ctx = wx.createCanvasContext(data.id)
  ctx.clearRect(0, 0, canvasConfig.width, canvasConfig.height);

  // 画圆环
  ctx.beginPath()
  ctx.arc(canvasConfig.width/2, canvasConfig.width/2-canvasConfig.lineWidth/2, canvasConfig.width/2-canvasConfig.lineWidth, Math.PI, Math.PI * 2,false)
  ctx.setStrokeStyle(canvasConfig.lineTrackBg) // 弧线的颜色
  ctx.setLineWidth(canvasConfig.lineWidth) // 弧的宽度
  ctx.setLineCap("round") //线条结束端点样式 butt 平直 round 圆形 square 正方形
  ctx.stroke()

  // 画进度条,兼容安卓手机，为0直接不渲染
  ctx.beginPath()
  ctx.arc(canvasConfig.width/2, canvasConfig.width/2-canvasConfig.lineWidth/2, canvasConfig.width/2-canvasConfig.lineWidth, Math.PI, Math.PI * (1 + left),false)
  ctx.setStrokeStyle(canvasConfig.lineBarBg)
  ctx.setLineWidth(canvasConfig.lineWidth)
  ctx.setLineCap("round");
  ctx.stroke()

  //画进度条里的实心圆
  ctx.beginPath();
  let cx = canvasConfig.width - (canvasConfig.width/2 + Math.cos(Math.PI / 180 * (180*left)) * (canvasConfig.width/2-canvasConfig.lineWidth))
  let cy = canvasConfig.width/2-canvasConfig.lineWidth/2- Math.sin( Math.PI / 180 * (180*left)) * (canvasConfig.width/2-canvasConfig.lineWidth)
  let r = canvasConfig.lineWidth/2-2
  ctx.arc(cx,cy,r, 0, Math.PI * 2,false);
  ctx.fillStyle=canvasConfig.filledCircleBg;//填充颜色,默认是黑色
  ctx.fill();//画实心圆
  ctx.closePath();

  return ctx.draw();
}

/**
 * 综合评价图表
 * data: 图表数据
 * 格式eg： [
 {value: 48, name: '销售结构'},
 {value: 200, name: '全渠道口径出货'},
 {value: 120, name: '分销网络拓展与维护'},
 {value: 58, name: '增值业务(前置渠道)'},
 ]
 totalScore: 总分
 **/
export const optionOverviewData = (data, totalScore) => {
  if(!data){
    return
  }
  let chartData = [];
  let total = '--'
  if(totalScore){
    total = totalScore
  }

  data.forEach((item)=>{
    if(item.name === '销售结构'){
      chartData.push({
        value: item.value,
        name: item.name,
        itemStyle: {
          color: {
            colorStops: [{
              offset: 0,
              color: '#F69A52'
            },
              {
                offset: 1,
                color: '#F8CA6C'
              }
            ],
          }
        },
      })
    }else if(item.name === '全渠道口径出货'){
      chartData.push({
        value: item.value,
        name: item.name,
        itemStyle: {
          color: {
            colorStops: [{
              offset: 0,
              color: '#8385E9'
            }, {
              offset: 1,
              color: '#BFC1F7'
            }],
          }
        },
      })
    }else if(item.name === '分销网络拓展与维护'){
      chartData.push({
        value: item.value,
        name: item.name,
        itemStyle: {
          color: {
            colorStops: [{
              offset: 0,
              color: '#9DFDD5'
            }, {
              offset: 1,
              color: '#22C7BB'
            }],
          }
        },
      })
    }else if(item.name === '增值业务(前置渠道)'){
      chartData.push({
        value: item.value,
        name: item.name,
        itemStyle: {
          color: {
            colorStops: [{
              offset: 0,
              color: '#FFAF9B'
            }, {
              offset: 1,
              color: '#F36556'
            }],
          }
        },
      })
    }
  })

  let option = {
    title: {
      text: '{a|' + total + '} {b|分}',
      textStyle: {
        rich: {
          a: {
            fontSize: 24,
            color: '#262626',
            fontWeight: '500',
          },
          b: {
            fontSize: 12,
            color: '#777777',
            fontWeight: '600',
            padding:[0,0,8,-4,]
          },
        },
      },
      left: 'center',
      bottom: 'middle',
    },
    series: [{
      type: 'pie',
      radius: ["68%", "88%"], //圆的大小
      center: ["50%", "50%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 3,
      },
      labelLine: {
        show: false
      },
      label: {
        show: false,
        position: 'center'
      },
      data: chartData
    },
      {
        name: '',
        type: 'pie',
        radius: '69%',
        center: ['50%', '50%'],
        itemStyle: {
          normal: {
            labelLine: {
              show: false,
            },
            color: '#FFFFFF',
          },
        },
        data: [
          {
            value: 100,
          },
        ],
      },
      {
        name: '',
        type: 'pie',
        radius: '61%',
        center: ['50%', '50%'],
        itemStyle: {
          normal: {
            labelLine: {
              show: false,
            },
            color: '#C9EEF2',
          },
        },
        data: [
          {
            value: 100,
          },
        ],
      },
      {
        name: '',
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        itemStyle: {
          normal: {
            labelLine: {
              show: false,
            },
            color: {
              colorStops: [{
                offset: 0,
                color: '#F9FDFE'
              }, {
                offset: 1,
                color: '#E0F6F8'
              }],
            },
          },
        },
        data: [
          {
            value: 100,
          },
        ],
      }]
  };
  return option
}

/**
 * 库存配置
 * data: 图表数据
 * 格式eg： [ 48, 200, 120] // 容声冰箱, 海信空调, 海信电视
 ]
 **/
export const optionInventoryData = (data,total) => {
  if(!data){
    return
  }
  total = total || '--'

  const colors = [
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: '#727EFF', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#727EFF', // 100% 处的颜色
        },
      ],
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: '#FF8A8A', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#FF8A8A', // 100% 处的颜色
        },
      ],
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: '#FAB81B', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#FAB81B', // 100% 处的颜色
        },
      ],
    },
  ];

  let num = 0
  let option = {
    title: {
      text: '{a|' + total + '} {b|台}',
      textStyle: {
        rich: {
          a: {
            fontSize: 32,
            color: '#262626',
            fontWeight: '500',
          },
          b: {
            fontSize: 12,
            color: '#262626',
            fontWeight: '500',
          },
        },
      },
      left: 'center',
      bottom: 'middle',
    },
    angleAxis: {
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      startAngle: 135,
    },
    radiusAxis: {
      type: 'category',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    polar: {
      radius: '90%'
    },
    series: []
  }
  // option是对传入的数据的一个处理
  let options = data.map((item, index) => {
    num += item
    const a = {
      type: 'bar',
      data: [0, 0, 0, num],
      coordinateSystem: 'polar',
      z: 9999 - index,
      roundCap: true,
      color: colors[index] || '#E1E1E1',
      barGap: '-100%',
      barWidth: '1%',
      itemStyle: {
        // 控制弧的宽,弧的宽的控制并没有做太多的情况判断,简单的区分了一下
        borderWidth: index === 0 ? 17 : index === 1 ? 12 : 9,
        borderColor: colors[index] || '#E1E1E1',
        shadowColor: colors[index] || '#E1E1E1',
      },
    }
    return a
  })

  let defaultOption = [{
    type: 'bar',
    data: [0, 0, 0, 1000],
    coordinateSystem: 'polar',
    z: 9990,
    roundCap: true,
    color: '#E1E1E1',
    barGap: '-100%',
    barWidth: '1%',
    itemStyle: {
      // 控制弧的宽,弧的宽的控制并没有做太多的情况判断,简单的区分了一下
      borderWidth: 9,
      borderColor: '#E1E1E1',
      shadowColor: '#E1E1E1',
    },
  }]
  if(!data[0] && !data[1] && !data[2]){
    option.series = defaultOption
  }else{
    option.series = options
  }

  return option
}

/**
 * 销售额
 * data: 图表数据
 * 格式eg：[
 { value: 2048, name: '零售' },
 { value: 735, name: '分销' },
 ]
 **/
export const optionSalesAmountData = (data) => {
  if(!data){
    return
  }
    let option = {
      color: ['#18D1BC', '#1890FF'],
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      series: [
        {
          name: '销售额',
          type: 'pie',
          radius: '80%',
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
          },
          labelLine: {
            show: false
          },
          label: {
            show: false,
            position: 'center'
          },
          data: data,
        }
      ]
    };
    return option
}

/**
 * 分销跑动、下沉门店
 * data: 图表数据
 * 格式eg: {
      total: 301,
      color: [[0.64, '#18D1BC'], [1, 'rgba(151,151,151,0.2200)']]
    }
 **/
export const optionDistributionRunData = (data) => {
  if(!data && !data.value){
    return
  }
  let color = data.color
  let option = {
    title: {
      text: '{a|'+ data.total +'} {b|家}',
      subtext: '本月跑动',
      left: 'center',
      top: '30', //top待调整
      textStyle: {
        rich: {
          a: {
            fontSize: 18,
            color: '#262626',
            fontWeight: '500',
          },
          b: {
            fontSize: 11,
            color: '#262626',
            fontWeight: '600',
            padding:[0,0,4,-4,]
          },
        },
      },
      subtextStyle: {
        color: '#AAAAAA',
        fontSize: 11,
      },
      itemGap: 2 // 主副标题间距
    },
    series: [
      {
        name: '分销跑动',
        type: 'gauge',
        z: 3,
        min: 0,
        max: 100,
        radius: '95%',
        axisLine: { // 坐标轴线
          roundCap: true,
          lineStyle: {
            width: 6, // 这个是修改宽度的属性
            color: color, // 下面仪表盘颜色
          }
        },
        axisTick: { // 刻度样式
          show: false
        },
        splitLine: { // 分隔线样式
          length: 6, // 属性length控制线长
          lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
            width: 3,
            color: '#F7F7F7',
          }
        },
        axisLabel: { // 刻度标签
          show:false,
        },
        pointer:{
          show:false // 是否显示指针
        },
        detail: {
          show: false,
        },
        data: [{value: 100}]
      },
      {
        name: '',
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        itemStyle: {
          normal: {
            labelLine: {
              show: false,
            },
            color: '#FFFFFF',
          },
        },
        data: [
          {
            value: 100,
          },
        ],
      }
    ]
  }
  return option
}
