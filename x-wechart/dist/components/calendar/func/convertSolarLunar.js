'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * @1900-2100区间内的公历、农历互转
 * @Version 1.0.3
 * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
 * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
 */
/* 公历年月日转农历数据 返回json */
// calendar.solar2lunar(1987,11,01);
/** 农历年月日转公历年月日 **/
// calendar.lunar2solar(1987,9,10);
// 调用以上方法后返回类似如下object（json）具体以上就不需要解释了吧！
// c开头的是公历各属性值 l开头的自然就是农历咯 gz开头的就是天干地支纪年的数据啦~
// {
//  Animal: "兔",
//  IDayCn: "初十",
//  IMonthCn: "九月",
//  Term: null,
//  astro: "天蝎座",
//  cDay: 1,
//  cMonth: 11,
//  cYear: 1987,
//  gzDay: "甲寅",
//  gzMonth: "庚戌",
//  gzYear: "丁卯",
//  isLeap: false,
//  isTerm: false,
//  isToday: false,
//  lDay: 10,
//  lMonth: 9,
//  lYear: 1987,
//  nWeek: 7,
//  ncWeek: "星期日"
// }
// 该代码还有其他可以调用的方法，请自己查看代码中的详细注释
var calendar = {
  /**
   * 农历1900-2100的润大小信息表
   * @Array Of Property
   * @return Hex
   */
  lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
  /** Add By JJonline@JJonline.Cn **/
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
  0x0d520], // 2100

  /**
   * 公历每个月份的天数普通表
   * @Array Of Property
   * @return Number
   */
  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  /**
   * 天干地支之天干速查表
   * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
   * @return Cn string
   */
  Gan: ['\u7532', '\u4E59', '\u4E19', '\u4E01', '\u620A', '\u5DF1', '\u5E9A', '\u8F9B', '\u58EC', '\u7678'],

  /**
   * 天干地支之地支速查表
   * @Array Of Property
   * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
   * @return Cn string
   */
  Zhi: ['\u5B50', '\u4E11', '\u5BC5', '\u536F', '\u8FB0', '\u5DF3', '\u5348', '\u672A', '\u7533', '\u9149', '\u620C', '\u4EA5'],

  /**
   * 天干地支之地支速查表<=>生肖
   * @Array Of Property
   * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
   * @return Cn string
   */
  Animals: ['\u9F20', '\u725B', '\u864E', '\u5154', '\u9F99', '\u86C7', '\u9A6C', '\u7F8A', '\u7334', '\u9E21', '\u72D7', '\u732A'],

  /**
   * 24节气速查表
   * @Array Of Property
   * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
   * @return Cn string
   */
  solarTerm: ['\u5C0F\u5BD2', '\u5927\u5BD2', '\u7ACB\u6625', '\u96E8\u6C34', '\u60CA\u86F0', '\u6625\u5206', '\u6E05\u660E', '\u8C37\u96E8', '\u7ACB\u590F', '\u5C0F\u6EE1', '\u8292\u79CD', '\u590F\u81F3', '\u5C0F\u6691', '\u5927\u6691', '\u7ACB\u79CB', '\u5904\u6691', '\u767D\u9732', '\u79CB\u5206', '\u5BD2\u9732', '\u971C\u964D', '\u7ACB\u51AC', '\u5C0F\u96EA', '\u5927\u96EA', '\u51AC\u81F3'],

  /**
   * 1900-2100各年的24节气日期速查表
   * @Array Of Property
   * @return 0x string For splice
   */
  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

  /**
   * 数字转中文速查表
   * @Array Of Property
   * @trans ['日','一','二','三','四','五','六','七','八','九','十']
   * @return Cn string
   */
  nStr1: ['\u65E5', '\u4E00', '\u4E8C', '\u4E09', '\u56DB', '\u4E94', '\u516D', '\u4E03', '\u516B', '\u4E5D', '\u5341'],

  /**
   * 日期转农历称呼速查表
   * @Array Of Property
   * @trans ['初','十','廿','卅']
   * @return Cn string
   */
  nStr2: ['\u521D', '\u5341', '\u5EFF', '\u5345'],

  /**
   * 月份转农历称呼速查表
   * @Array Of Property
   * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
   * @return Cn string
   */
  nStr3: ['\u6B63', '\u4E8C', '\u4E09', '\u56DB', '\u4E94', '\u516D', '\u4E03', '\u516B', '\u4E5D', '\u5341', '\u51AC', '\u814A'],

  /**
   * 返回农历y年一整年的总天数
   * @param lunar Year
   * @return Number
   * @eg:var count = calendar.lYearDays(1987) ;//count=387
   */
  lYearDays: function lYearDays(y) {
    var i = void 0;
    var sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
      sum += calendar.lunarInfo[y - 1900] & i ? 1 : 0;
    }
    return sum + calendar.leapDays(y);
  },

  /**
   * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
   * @param lunar Year
   * @return Number (0-12)
   * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
   */
  leapMonth: function leapMonth(y) {
    // 闰字编码 \u95f0
    return calendar.lunarInfo[y - 1900] & 0xf;
  },

  /**
   * 返回农历y年闰月的天数 若该年没有闰月则返回0
   * @param lunar Year
   * @return Number (0、29、30)
   * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
   */
  leapDays: function leapDays(y) {
    if (calendar.leapMonth(y)) {
      return calendar.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
    }
    return 0;
  },

  /**
   * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
   * @param lunar Year
   * @return Number (-1、29、30)
   * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
   */
  monthDays: function monthDays(y, m) {
    if (m > 12 || m < 1) return -1; // 月份参数从1至12，参数错误返回-1
    return calendar.lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
  },

  /**
   * 返回公历(!)y年m月的天数
   * @param solar Year
   * @return Number (-1、28、29、30、31)
   * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
   */
  solarDays: function solarDays(y, m) {
    if (m > 12 || m < 1) return -1; // 若参数错误 返回-1
    var ms = m - 1;
    if (+ms === 1) {
      // 2月份的闰平规律测算后确认返回28或29
      return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0 ? 29 : 28;
    } else {
      return calendar.solarMonth[ms];
    }
  },

  /**
   * 农历年份转换为干支纪年
   * @param  lYear 农历年的年份数
   * @return Cn string
   */
  toGanZhiYear: function toGanZhiYear(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (+ganKey === 0) ganKey = 10; // 如果余数为0则为最后一个天干
    if (+zhiKey === 0) zhiKey = 12; // 如果余数为0则为最后一个地支
    return calendar.Gan[ganKey - 1] + calendar.Zhi[zhiKey - 1];
  },

  /**
   * 公历月、日判断所属星座
   * @param  cMonth [description]
   * @param  cDay [description]
   * @return Cn string
   */
  toAstro: function toAstro(cMonth, cDay) {
    var s = '\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF';
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + '\u5EA7'; // 座
  },

  /**
   * 传入offset偏移量返回干支
   * @param offset 相对甲子的偏移量
   * @return Cn string
   */
  toGanZhi: function toGanZhi(offset) {
    return calendar.Gan[offset % 10] + calendar.Zhi[offset % 12];
  },

  /**
   * 传入公历(!)y年获得该年第n个节气的公历日期
   * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
   * @return day Number
   * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
   */
  getTerm: function getTerm(y, n) {
    if (y < 1900 || y > 2100) return -1;
    if (n < 1 || n > 24) return -1;
    var _table = calendar.sTermInfo[y - 1900];
    var _info = [parseInt('0x' + _table.substr(0, 5)).toString(), parseInt('0x' + _table.substr(5, 5)).toString(), parseInt('0x' + _table.substr(10, 5)).toString(), parseInt('0x' + _table.substr(15, 5)).toString(), parseInt('0x' + _table.substr(20, 5)).toString(), parseInt('0x' + _table.substr(25, 5)).toString()];
    var _calday = [_info[0].substr(0, 1), _info[0].substr(1, 2), _info[0].substr(3, 1), _info[0].substr(4, 2), _info[1].substr(0, 1), _info[1].substr(1, 2), _info[1].substr(3, 1), _info[1].substr(4, 2), _info[2].substr(0, 1), _info[2].substr(1, 2), _info[2].substr(3, 1), _info[2].substr(4, 2), _info[3].substr(0, 1), _info[3].substr(1, 2), _info[3].substr(3, 1), _info[3].substr(4, 2), _info[4].substr(0, 1), _info[4].substr(1, 2), _info[4].substr(3, 1), _info[4].substr(4, 2), _info[5].substr(0, 1), _info[5].substr(1, 2), _info[5].substr(3, 1), _info[5].substr(4, 2)];
    return parseInt(_calday[n - 1]);
  },

  /**
   * 传入农历数字月份返回汉语通俗表示法
   * @param lunar month
   * @return Cn string
   * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
   */
  toChinaMonth: function toChinaMonth(m) {
    // 月 => \u6708
    if (m > 12 || m < 1) return -1; // 若参数错误 返回-1
    var s = calendar.nStr3[m - 1];
    s += '\u6708'; // 加上月字
    return s;
  },

  /**
   * 传入农历日期数字返回汉字表示法
   * @param lunar day
   * @return Cn string
   * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
   */
  toChinaDay: function toChinaDay(d) {
    // 日 => \u65e5
    var s = void 0;
    switch (d) {
      case 10:
        s = '\u521D\u5341';
        break;
      case 20:
        s = '\u4E8C\u5341';
        break;
      case 30:
        s = '\u4E09\u5341';
        break;
      default:
        s = calendar.nStr2[Math.floor(d / 10)];
        s += calendar.nStr1[d % 10];
    }
    return s;
  },

  /**
   * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
   * @param y year
   * @return Cn string
   * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
   */
  getAnimal: function getAnimal(y) {
    return calendar.Animals[(y - 4) % 12];
  },

  /**
   * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
   * @param y  solar year
   * @param m  solar month
   * @param d  solar day
   * @return JSON object
   * @eg:console.log(calendar.solar2lunar(1987,11,01));
   */
  solar2lunar: function solar2lunar(y, m, d) {
    // 参数区间1900.1.31~2100.12.31
    // 年份限定、上限
    if (y < 1900 || y > 2100) {
      return -1; // undefined转换为数字变为NaN
    }
    // 公历传参最下限
    if (+y === 1900 && +m === 1 && +d < 31) {
      return -1;
    }
    // 未传参 获得当天
    var objDate = void 0;
    if (!y) {
      objDate = new Date();
    } else {
      objDate = new Date(y, parseInt(m) - 1, d);
    }
    var i = void 0;
    var leap = 0;
    var temp = 0;
    // 修正ymd参数
    y = objDate.getFullYear();
    m = objDate.getMonth() + 1;
    d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = calendar.lYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;
      i--;
    }

    // 是否今天
    var isTodayObj = new Date();
    var isToday = false;
    if (isTodayObj.getFullYear() === +y && isTodayObj.getMonth() + 1 === +m && isTodayObj.getDate() === +d) {
      isToday = true;
    }
    // 星期几
    var nWeek = objDate.getDay();
    var cWeek = calendar.nStr1[nWeek];
    // 数字表示周几顺应天朝周一开始的惯例
    if (+nWeek === 0) {
      nWeek = 7;
    }
    // 农历年
    var year = i;
    leap = calendar.leapMonth(i); // 闰哪个月
    var isLeap = false;

    // 效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      // 闰月
      if (leap > 0 && i === leap + 1 && isLeap === false) {
        --i;
        isLeap = true;
        temp = calendar.leapDays(year); // 计算农历闰月天数
      } else {
        temp = calendar.monthDays(year, i); // 计算农历普通月天数
      }
      // 解除闰月
      if (isLeap === true && i === leap + 1) isLeap = false;
      offset -= temp;
    }
    // 闰月导致数组下标重叠取反
    if (offset === 0 && leap > 0 && i === leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --i;
      }
    }
    if (offset < 0) {
      offset += temp;
      --i;
    }
    // 农历月
    var month = i;
    // 农历日
    var day = offset + 1;
    // 天干地支处理
    var sm = m - 1;
    var gzY = calendar.toGanZhiYear(year);

    // 当月的两个节气
    // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
    var firstNode = calendar.getTerm(y, m * 2 - 1); // 返回当月「节」为几日开始
    var secondNode = calendar.getTerm(y, m * 2); // 返回当月「节」为几日开始

    // 依据12节气修正干支月
    var gzM = calendar.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = calendar.toGanZhi((y - 1900) * 12 + m + 12);
    }

    // 传入的日期的节气与否
    var isTerm = false;
    var Term = null;
    if (+firstNode === d) {
      isTerm = true;
      Term = calendar.solarTerm[m * 2 - 2];
    }
    if (+secondNode === d) {
      isTerm = true;
      Term = calendar.solarTerm[m * 2 - 1];
    }
    // 日柱 当月一日与 1900/1/1 相差天数
    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = calendar.toGanZhi(dayCyclical + d - 1);
    // 该日期所属的星座
    var astro = calendar.toAstro(m, d);

    return {
      lYear: year,
      lMonth: month,
      lDay: day,
      Animal: calendar.getAnimal(year),
      IMonthCn: (isLeap ? '\u95F0' : '') + calendar.toChinaMonth(month),
      IDayCn: calendar.toChinaDay(day),
      cYear: y,
      cMonth: m,
      cDay: d,
      gzYear: gzY,
      gzMonth: gzM,
      gzDay: gzD,
      isToday: isToday,
      isLeap: isLeap,
      nWeek: nWeek,
      ncWeek: '\u661F\u671F' + cWeek,
      isTerm: isTerm,
      Term: Term,
      astro: astro
    };
  },

  /**
   * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
   * @param y  lunar year
   * @param m  lunar month
   * @param d  lunar day
   * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
   * @return JSON object
   * @eg:console.log(calendar.lunar2solar(1987,9,10));
   */
  lunar2solar: function lunar2solar(y, m, d, isLeapMonth) {
    // 参数区间1900.1.31~2100.12.1
    isLeapMonth = !!isLeapMonth;
    // let leapOffset = 0;
    var leapMonth = calendar.leapMonth(y);
    // let leapDay = calendar.leapDays(y);
    if (isLeapMonth && leapMonth !== m) return -1; // 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if (+y === 2100 && +m === 12 && +d > 1 || +y === 1900 && +m === 1 && +d < 31) return -1; // 超出了最大极限值
    var day = calendar.monthDays(y, m);
    var _day = day;
    // bugFix 2016-9-25
    // if month is leap, _day use leapDays method
    if (isLeapMonth) {
      _day = calendar.leapDays(y, m);
    }
    if (y < 1900 || y > 2100 || d > _day) return -1; // 参数合法性效验

    // 计算农历的时间差
    var offset = 0;
    for (var i = 1900; i < y; i++) {
      offset += calendar.lYearDays(i);
    }
    var leap = 0;
    var isAdd = false;
    for (var _i = 1; _i < m; _i++) {
      leap = calendar.leapMonth(y);
      if (!isAdd) {
        // 处理闰月
        if (leap <= _i && leap > 0) {
          offset += calendar.leapDays(y);
          isAdd = true;
        }
      }
      offset += calendar.monthDays(y, _i);
    }
    // 转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) offset += day;
    // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();

    return calendar.solar2lunar(cY, cM, cD);
  }
};

var Gan = calendar.Gan,
    Zhi = calendar.Zhi,
    nStr1 = calendar.nStr1,
    nStr2 = calendar.nStr2,
    nStr3 = calendar.nStr3,
    Animals = calendar.Animals,
    solarTerm = calendar.solarTerm,
    lunarInfo = calendar.lunarInfo,
    sTermInfo = calendar.sTermInfo,
    solarMonth = calendar.solarMonth,
    rest = _objectWithoutProperties(calendar, ['Gan', 'Zhi', 'nStr1', 'nStr2', 'nStr3', 'Animals', 'solarTerm', 'lunarInfo', 'sTermInfo', 'solarMonth']);

exports.default = rest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnZlcnRTb2xhckx1bmFyLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwibHVuYXJJbmZvIiwic29sYXJNb250aCIsIkdhbiIsIlpoaSIsIkFuaW1hbHMiLCJzb2xhclRlcm0iLCJzVGVybUluZm8iLCJuU3RyMSIsIm5TdHIyIiwiblN0cjMiLCJsWWVhckRheXMiLCJ5IiwiaSIsInN1bSIsImxlYXBEYXlzIiwibGVhcE1vbnRoIiwibW9udGhEYXlzIiwibSIsInNvbGFyRGF5cyIsIm1zIiwidG9HYW5aaGlZZWFyIiwibFllYXIiLCJnYW5LZXkiLCJ6aGlLZXkiLCJ0b0FzdHJvIiwiY01vbnRoIiwiY0RheSIsInMiLCJhcnIiLCJzdWJzdHIiLCJ0b0dhblpoaSIsIm9mZnNldCIsImdldFRlcm0iLCJuIiwiX3RhYmxlIiwiX2luZm8iLCJwYXJzZUludCIsInRvU3RyaW5nIiwiX2NhbGRheSIsInRvQ2hpbmFNb250aCIsInRvQ2hpbmFEYXkiLCJkIiwiTWF0aCIsImZsb29yIiwiZ2V0QW5pbWFsIiwic29sYXIybHVuYXIiLCJvYmpEYXRlIiwiRGF0ZSIsImxlYXAiLCJ0ZW1wIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJVVEMiLCJpc1RvZGF5T2JqIiwiaXNUb2RheSIsIm5XZWVrIiwiZ2V0RGF5IiwiY1dlZWsiLCJ5ZWFyIiwiaXNMZWFwIiwibW9udGgiLCJkYXkiLCJzbSIsImd6WSIsImZpcnN0Tm9kZSIsInNlY29uZE5vZGUiLCJnek0iLCJpc1Rlcm0iLCJUZXJtIiwiZGF5Q3ljbGljYWwiLCJnekQiLCJhc3RybyIsImxNb250aCIsImxEYXkiLCJBbmltYWwiLCJJTW9udGhDbiIsIklEYXlDbiIsImNZZWFyIiwiZ3pZZWFyIiwiZ3pNb250aCIsImd6RGF5IiwibmNXZWVrIiwibHVuYXIyc29sYXIiLCJpc0xlYXBNb250aCIsIl9kYXkiLCJpc0FkZCIsInN0bWFwIiwiY2FsT2JqIiwiY1kiLCJnZXRVVENGdWxsWWVhciIsImNNIiwi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Q0FMLFMsR0FJRUQsUSxDQUpGQyxTO0lBQ0FNLFMsR0FHRVAsUSxDQUhGTyxTO0lBQ0FMLFUsR0FFRUYsUSxDQUZGRSxVO0lBQ0c4RixJLDRCQUNEaEcsUTs7a0JBRVdnRyxJIiwiZmlsZSI6ImNvbnZlcnRTb2xhckx1bmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAMTkwMC0yMTAw5Yy66Ze05YaF55qE5YWs5Y6G44CB5Yac5Y6G5LqS6L2sXG4gKiBAVmVyc2lvbiAxLjAuM1xuICogQOWFrOWOhui9rOWGnOWOhu+8mmNhbGVuZGFyLnNvbGFyMmx1bmFyKDE5ODcsMTEsMDEpOyAvL1t5b3UgY2FuIGlnbm9yZSBwYXJhbXMgb2YgcHJlZml4IDBdXG4gKiBA5Yac5Y6G6L2s5YWs5Y6G77yaY2FsZW5kYXIubHVuYXIyc29sYXIoMTk4NywwOSwxMCk7IC8vW3lvdSBjYW4gaWdub3JlIHBhcmFtcyBvZiBwcmVmaXggMF1cbiAqL1xuLyog5YWs5Y6G5bm05pyI5pel6L2s5Yac5Y6G5pWw5o2uIOi/lOWbnmpzb24gKi9cbi8vIGNhbGVuZGFyLnNvbGFyMmx1bmFyKDE5ODcsMTEsMDEpO1xuLyoqIOWGnOWOhuW5tOaciOaXpei9rOWFrOWOhuW5tOaciOaXpSAqKi9cbi8vIGNhbGVuZGFyLmx1bmFyMnNvbGFyKDE5ODcsOSwxMCk7XG4vLyDosIPnlKjku6XkuIrmlrnms5XlkI7ov5Tlm57nsbvkvLzlpoLkuItvYmplY3TvvIhqc29u77yJ5YW35L2T5Lul5LiK5bCx5LiN6ZyA6KaB6Kej6YeK5LqG5ZCn77yBXG4vLyBj5byA5aS055qE5piv5YWs5Y6G5ZCE5bGe5oCn5YC8IGzlvIDlpLTnmoToh6rnhLblsLHmmK/lhpzljoblkq8gZ3rlvIDlpLTnmoTlsLHmmK/lpKnlubLlnLDmlK/nuqrlubTnmoTmlbDmja7llaZ+XG4vLyB7XG4vLyAgQW5pbWFsOiBcIuWFlFwiLFxuLy8gIElEYXlDbjogXCLliJ3ljYFcIixcbi8vICBJTW9udGhDbjogXCLkuZ3mnIhcIixcbi8vICBUZXJtOiBudWxsLFxuLy8gIGFzdHJvOiBcIuWkqeidjuW6p1wiLFxuLy8gIGNEYXk6IDEsXG4vLyAgY01vbnRoOiAxMSxcbi8vICBjWWVhcjogMTk4Nyxcbi8vICBnekRheTogXCLnlLLlr4VcIixcbi8vICBnek1vbnRoOiBcIuW6muaIjFwiLFxuLy8gIGd6WWVhcjogXCLkuIHlja9cIixcbi8vICBpc0xlYXA6IGZhbHNlLFxuLy8gIGlzVGVybTogZmFsc2UsXG4vLyAgaXNUb2RheTogZmFsc2UsXG4vLyAgbERheTogMTAsXG4vLyAgbE1vbnRoOiA5LFxuLy8gIGxZZWFyOiAxOTg3LFxuLy8gIG5XZWVrOiA3LFxuLy8gIG5jV2VlazogXCLmmJ/mnJ/ml6VcIlxuLy8gfVxuLy8g6K+l5Luj56CB6L+Y5pyJ5YW25LuW5Y+v5Lul6LCD55So55qE5pa55rOV77yM6K+36Ieq5bex5p+l55yL5Luj56CB5Lit55qE6K+m57uG5rOo6YeKXG5jb25zdCBjYWxlbmRhciA9IHtcbiAgLyoqXG4gICAqIOWGnOWOhjE5MDAtMjEwMOeahOa2puWkp+Wwj+S/oeaBr+ihqFxuICAgKiBAQXJyYXkgT2YgUHJvcGVydHlcbiAgICogQHJldHVybiBIZXhcbiAgICovXG4gIGx1bmFySW5mbzogW1xuICAgIDB4MDRiZDgsXG4gICAgMHgwNGFlMCxcbiAgICAweDBhNTcwLFxuICAgIDB4MDU0ZDUsXG4gICAgMHgwZDI2MCxcbiAgICAweDBkOTUwLFxuICAgIDB4MTY1NTQsXG4gICAgMHgwNTZhMCxcbiAgICAweDA5YWQwLFxuICAgIDB4MDU1ZDIsIC8vIDE5MDAtMTkwOVxuICAgIDB4MDRhZTAsXG4gICAgMHgwYTViNixcbiAgICAweDBhNGQwLFxuICAgIDB4MGQyNTAsXG4gICAgMHgxZDI1NSxcbiAgICAweDBiNTQwLFxuICAgIDB4MGQ2YTAsXG4gICAgMHgwYWRhMixcbiAgICAweDA5NWIwLFxuICAgIDB4MTQ5NzcsIC8vIDE5MTAtMTkxOVxuICAgIDB4MDQ5NzAsXG4gICAgMHgwYTRiMCxcbiAgICAweDBiNGI1LFxuICAgIDB4MDZhNTAsXG4gICAgMHgwNmQ0MCxcbiAgICAweDFhYjU0LFxuICAgIDB4MDJiNjAsXG4gICAgMHgwOTU3MCxcbiAgICAweDA1MmYyLFxuICAgIDB4MDQ5NzAsIC8vIDE5MjAtMTkyOVxuICAgIDB4MDY1NjYsXG4gICAgMHgwZDRhMCxcbiAgICAweDBlYTUwLFxuICAgIDB4MDZlOTUsXG4gICAgMHgwNWFkMCxcbiAgICAweDAyYjYwLFxuICAgIDB4MTg2ZTMsXG4gICAgMHgwOTJlMCxcbiAgICAweDFjOGQ3LFxuICAgIDB4MGM5NTAsIC8vIDE5MzAtMTkzOVxuICAgIDB4MGQ0YTAsXG4gICAgMHgxZDhhNixcbiAgICAweDBiNTUwLFxuICAgIDB4MDU2YTAsXG4gICAgMHgxYTViNCxcbiAgICAweDAyNWQwLFxuICAgIDB4MDkyZDAsXG4gICAgMHgwZDJiMixcbiAgICAweDBhOTUwLFxuICAgIDB4MGI1NTcsIC8vIDE5NDAtMTk0OVxuICAgIDB4MDZjYTAsXG4gICAgMHgwYjU1MCxcbiAgICAweDE1MzU1LFxuICAgIDB4MDRkYTAsXG4gICAgMHgwYTViMCxcbiAgICAweDE0NTczLFxuICAgIDB4MDUyYjAsXG4gICAgMHgwYTlhOCxcbiAgICAweDBlOTUwLFxuICAgIDB4MDZhYTAsIC8vIDE5NTAtMTk1OVxuICAgIDB4MGFlYTYsXG4gICAgMHgwYWI1MCxcbiAgICAweDA0YjYwLFxuICAgIDB4MGFhZTQsXG4gICAgMHgwYTU3MCxcbiAgICAweDA1MjYwLFxuICAgIDB4MGYyNjMsXG4gICAgMHgwZDk1MCxcbiAgICAweDA1YjU3LFxuICAgIDB4MDU2YTAsIC8vIDE5NjAtMTk2OVxuICAgIDB4MDk2ZDAsXG4gICAgMHgwNGRkNSxcbiAgICAweDA0YWQwLFxuICAgIDB4MGE0ZDAsXG4gICAgMHgwZDRkNCxcbiAgICAweDBkMjUwLFxuICAgIDB4MGQ1NTgsXG4gICAgMHgwYjU0MCxcbiAgICAweDBiNmEwLFxuICAgIDB4MTk1YTYsIC8vIDE5NzAtMTk3OVxuICAgIDB4MDk1YjAsXG4gICAgMHgwNDliMCxcbiAgICAweDBhOTc0LFxuICAgIDB4MGE0YjAsXG4gICAgMHgwYjI3YSxcbiAgICAweDA2YTUwLFxuICAgIDB4MDZkNDAsXG4gICAgMHgwYWY0NixcbiAgICAweDBhYjYwLFxuICAgIDB4MDk1NzAsIC8vIDE5ODAtMTk4OVxuICAgIDB4MDRhZjUsXG4gICAgMHgwNDk3MCxcbiAgICAweDA2NGIwLFxuICAgIDB4MDc0YTMsXG4gICAgMHgwZWE1MCxcbiAgICAweDA2YjU4LFxuICAgIDB4MDU1YzAsXG4gICAgMHgwYWI2MCxcbiAgICAweDA5NmQ1LFxuICAgIDB4MDkyZTAsIC8vIDE5OTAtMTk5OVxuICAgIDB4MGM5NjAsXG4gICAgMHgwZDk1NCxcbiAgICAweDBkNGEwLFxuICAgIDB4MGRhNTAsXG4gICAgMHgwNzU1MixcbiAgICAweDA1NmEwLFxuICAgIDB4MGFiYjcsXG4gICAgMHgwMjVkMCxcbiAgICAweDA5MmQwLFxuICAgIDB4MGNhYjUsIC8vIDIwMDAtMjAwOVxuICAgIDB4MGE5NTAsXG4gICAgMHgwYjRhMCxcbiAgICAweDBiYWE0LFxuICAgIDB4MGFkNTAsXG4gICAgMHgwNTVkOSxcbiAgICAweDA0YmEwLFxuICAgIDB4MGE1YjAsXG4gICAgMHgxNTE3NixcbiAgICAweDA1MmIwLFxuICAgIDB4MGE5MzAsIC8vIDIwMTAtMjAxOVxuICAgIDB4MDc5NTQsXG4gICAgMHgwNmFhMCxcbiAgICAweDBhZDUwLFxuICAgIDB4MDViNTIsXG4gICAgMHgwNGI2MCxcbiAgICAweDBhNmU2LFxuICAgIDB4MGE0ZTAsXG4gICAgMHgwZDI2MCxcbiAgICAweDBlYTY1LFxuICAgIDB4MGQ1MzAsIC8vIDIwMjAtMjAyOVxuICAgIDB4MDVhYTAsXG4gICAgMHgwNzZhMyxcbiAgICAweDA5NmQwLFxuICAgIDB4MDRhZmIsXG4gICAgMHgwNGFkMCxcbiAgICAweDBhNGQwLFxuICAgIDB4MWQwYjYsXG4gICAgMHgwZDI1MCxcbiAgICAweDBkNTIwLFxuICAgIDB4MGRkNDUsIC8vIDIwMzAtMjAzOVxuICAgIDB4MGI1YTAsXG4gICAgMHgwNTZkMCxcbiAgICAweDA1NWIyLFxuICAgIDB4MDQ5YjAsXG4gICAgMHgwYTU3NyxcbiAgICAweDBhNGIwLFxuICAgIDB4MGFhNTAsXG4gICAgMHgxYjI1NSxcbiAgICAweDA2ZDIwLFxuICAgIDB4MGFkYTAsIC8vIDIwNDAtMjA0OVxuICAgIC8qKiBBZGQgQnkgSkpvbmxpbmVASkpvbmxpbmUuQ24gKiovXG4gICAgMHgxNGI2MyxcbiAgICAweDA5MzcwLFxuICAgIDB4MDQ5ZjgsXG4gICAgMHgwNDk3MCxcbiAgICAweDA2NGIwLFxuICAgIDB4MTY4YTYsXG4gICAgMHgwZWE1MCxcbiAgICAweDA2YjIwLFxuICAgIDB4MWE2YzQsXG4gICAgMHgwYWFlMCwgLy8gMjA1MC0yMDU5XG4gICAgMHgwYTJlMCxcbiAgICAweDBkMmUzLFxuICAgIDB4MGM5NjAsXG4gICAgMHgwZDU1NyxcbiAgICAweDBkNGEwLFxuICAgIDB4MGRhNTAsXG4gICAgMHgwNWQ1NSxcbiAgICAweDA1NmEwLFxuICAgIDB4MGE2ZDAsXG4gICAgMHgwNTVkNCwgLy8gMjA2MC0yMDY5XG4gICAgMHgwNTJkMCxcbiAgICAweDBhOWI4LFxuICAgIDB4MGE5NTAsXG4gICAgMHgwYjRhMCxcbiAgICAweDBiNmE2LFxuICAgIDB4MGFkNTAsXG4gICAgMHgwNTVhMCxcbiAgICAweDBhYmE0LFxuICAgIDB4MGE1YjAsXG4gICAgMHgwNTJiMCwgLy8gMjA3MC0yMDc5XG4gICAgMHgwYjI3MyxcbiAgICAweDA2OTMwLFxuICAgIDB4MDczMzcsXG4gICAgMHgwNmFhMCxcbiAgICAweDBhZDUwLFxuICAgIDB4MTRiNTUsXG4gICAgMHgwNGI2MCxcbiAgICAweDBhNTcwLFxuICAgIDB4MDU0ZTQsXG4gICAgMHgwZDE2MCwgLy8gMjA4MC0yMDg5XG4gICAgMHgwZTk2OCxcbiAgICAweDBkNTIwLFxuICAgIDB4MGRhYTAsXG4gICAgMHgxNmFhNixcbiAgICAweDA1NmQwLFxuICAgIDB4MDRhZTAsXG4gICAgMHgwYTlkNCxcbiAgICAweDBhMmQwLFxuICAgIDB4MGQxNTAsXG4gICAgMHgwZjI1MiwgLy8gMjA5MC0yMDk5XG4gICAgMHgwZDUyMFxuICBdLCAvLyAyMTAwXG5cbiAgLyoqXG4gICAqIOWFrOWOhuavj+S4quaciOS7veeahOWkqeaVsOaZrumAmuihqFxuICAgKiBAQXJyYXkgT2YgUHJvcGVydHlcbiAgICogQHJldHVybiBOdW1iZXJcbiAgICovXG4gIHNvbGFyTW9udGg6IFszMSwgMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXSxcblxuICAvKipcbiAgICog5aSp5bmy5Zyw5pSv5LmL5aSp5bmy6YCf5p+l6KGoXG4gICAqIEBBcnJheSBPZiBQcm9wZXJ0eSB0cmFuc1tcIueUslwiLFwi5LmZXCIsXCLkuJlcIixcIuS4gVwiLFwi5oiKXCIsXCLlt7FcIixcIuW6mlwiLFwi6L6bXCIsXCLlo6xcIixcIueZuFwiXVxuICAgKiBAcmV0dXJuIENuIHN0cmluZ1xuICAgKi9cbiAgR2FuOiBbXG4gICAgJ1xcdTc1MzInLFxuICAgICdcXHU0ZTU5JyxcbiAgICAnXFx1NGUxOScsXG4gICAgJ1xcdTRlMDEnLFxuICAgICdcXHU2MjBhJyxcbiAgICAnXFx1NWRmMScsXG4gICAgJ1xcdTVlOWEnLFxuICAgICdcXHU4ZjliJyxcbiAgICAnXFx1NThlYycsXG4gICAgJ1xcdTc2NzgnXG4gIF0sXG5cbiAgLyoqXG4gICAqIOWkqeW5suWcsOaUr+S5i+WcsOaUr+mAn+afpeihqFxuICAgKiBAQXJyYXkgT2YgUHJvcGVydHlcbiAgICogQHRyYW5zW1wi5a2QXCIsXCLkuJFcIixcIuWvhVwiLFwi5Y2vXCIsXCLovrBcIixcIuW3s1wiLFwi5Y2IXCIsXCLmnKpcIixcIueUs1wiLFwi6YWJXCIsXCLmiIxcIixcIuS6pVwiXVxuICAgKiBAcmV0dXJuIENuIHN0cmluZ1xuICAgKi9cbiAgWmhpOiBbXG4gICAgJ1xcdTViNTAnLFxuICAgICdcXHU0ZTExJyxcbiAgICAnXFx1NWJjNScsXG4gICAgJ1xcdTUzNmYnLFxuICAgICdcXHU4ZmIwJyxcbiAgICAnXFx1NWRmMycsXG4gICAgJ1xcdTUzNDgnLFxuICAgICdcXHU2NzJhJyxcbiAgICAnXFx1NzUzMycsXG4gICAgJ1xcdTkxNDknLFxuICAgICdcXHU2MjBjJyxcbiAgICAnXFx1NGVhNSdcbiAgXSxcblxuICAvKipcbiAgICog5aSp5bmy5Zyw5pSv5LmL5Zyw5pSv6YCf5p+l6KGoPD0+55Sf6IKWXG4gICAqIEBBcnJheSBPZiBQcm9wZXJ0eVxuICAgKiBAdHJhbnNbXCLpvKBcIixcIueJm1wiLFwi6JmOXCIsXCLlhZRcIixcIum+mVwiLFwi6JuHXCIsXCLpqaxcIixcIue+ilwiLFwi54y0XCIsXCLpuKFcIixcIueLl1wiLFwi54yqXCJdXG4gICAqIEByZXR1cm4gQ24gc3RyaW5nXG4gICAqL1xuICBBbmltYWxzOiBbXG4gICAgJ1xcdTlmMjAnLFxuICAgICdcXHU3MjViJyxcbiAgICAnXFx1ODY0ZScsXG4gICAgJ1xcdTUxNTQnLFxuICAgICdcXHU5Zjk5JyxcbiAgICAnXFx1ODZjNycsXG4gICAgJ1xcdTlhNmMnLFxuICAgICdcXHU3ZjhhJyxcbiAgICAnXFx1NzMzNCcsXG4gICAgJ1xcdTllMjEnLFxuICAgICdcXHU3MmQ3JyxcbiAgICAnXFx1NzMyYSdcbiAgXSxcblxuICAvKipcbiAgICogMjToioLmsJTpgJ/mn6XooahcbiAgICogQEFycmF5IE9mIFByb3BlcnR5XG4gICAqIEB0cmFuc1tcIuWwj+WvklwiLFwi5aSn5a+SXCIsXCLnq4vmmKVcIixcIumbqOawtFwiLFwi5oOK6JuwXCIsXCLmmKXliIZcIixcIua4heaYjlwiLFwi6LC36ZuoXCIsXCLnq4vlpI9cIixcIuWwj+a7oVwiLFwi6IqS56eNXCIsXCLlpI/oh7NcIixcIuWwj+aakVwiLFwi5aSn5pqRXCIsXCLnq4vnp4tcIixcIuWkhOaakVwiLFwi55m96ZyyXCIsXCLnp4vliIZcIixcIuWvkumcslwiLFwi6Zyc6ZmNXCIsXCLnq4vlhqxcIixcIuWwj+mbqlwiLFwi5aSn6ZuqXCIsXCLlhqzoh7NcIl1cbiAgICogQHJldHVybiBDbiBzdHJpbmdcbiAgICovXG4gIHNvbGFyVGVybTogW1xuICAgICdcXHU1YzBmXFx1NWJkMicsXG4gICAgJ1xcdTU5MjdcXHU1YmQyJyxcbiAgICAnXFx1N2FjYlxcdTY2MjUnLFxuICAgICdcXHU5NmU4XFx1NmMzNCcsXG4gICAgJ1xcdTYwY2FcXHU4NmYwJyxcbiAgICAnXFx1NjYyNVxcdTUyMDYnLFxuICAgICdcXHU2ZTA1XFx1NjYwZScsXG4gICAgJ1xcdThjMzdcXHU5NmU4JyxcbiAgICAnXFx1N2FjYlxcdTU5MGYnLFxuICAgICdcXHU1YzBmXFx1NmVlMScsXG4gICAgJ1xcdTgyOTJcXHU3OWNkJyxcbiAgICAnXFx1NTkwZlxcdTgxZjMnLFxuICAgICdcXHU1YzBmXFx1NjY5MScsXG4gICAgJ1xcdTU5MjdcXHU2NjkxJyxcbiAgICAnXFx1N2FjYlxcdTc5Y2InLFxuICAgICdcXHU1OTA0XFx1NjY5MScsXG4gICAgJ1xcdTc2N2RcXHU5NzMyJyxcbiAgICAnXFx1NzljYlxcdTUyMDYnLFxuICAgICdcXHU1YmQyXFx1OTczMicsXG4gICAgJ1xcdTk3MWNcXHU5NjRkJyxcbiAgICAnXFx1N2FjYlxcdTUxYWMnLFxuICAgICdcXHU1YzBmXFx1OTZlYScsXG4gICAgJ1xcdTU5MjdcXHU5NmVhJyxcbiAgICAnXFx1NTFhY1xcdTgxZjMnXG4gIF0sXG5cbiAgLyoqXG4gICAqIDE5MDAtMjEwMOWQhOW5tOeahDI06IqC5rCU5pel5pyf6YCf5p+l6KGoXG4gICAqIEBBcnJheSBPZiBQcm9wZXJ0eVxuICAgKiBAcmV0dXJuIDB4IHN0cmluZyBGb3Igc3BsaWNlXG4gICAqL1xuICBzVGVybUluZm86IFtcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiY2Y5N2MzNTk4MDgyYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAnOTdiZDBiMDZiZGIwNzIyYzk2NWNlMWNmY2M5MjBmJyxcbiAgICAnYjAyNzA5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAnOTdiZDBiMDZiZGIwNzIyYzk2NWNlMWNmY2M5MjBmJyxcbiAgICAnYjAyNzA5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAnOTdiZDBiMDZiZGIwNzIyYzk2NWNlMWNmY2M5MjBmJyxcbiAgICAnYjAyNzA5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTc3ODM5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAnOTdiZDA5ODAxZDk4MDgyYzk1ZjhlMWNmY2M5MjBmJyxcbiAgICAnOTdiZDA5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAnOTc3ODM5N2JkMTk3YzM2YzkyMTBjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBlJyxcbiAgICAnOTdiZDA5ODAxZDk4MDgyYzk1ZjhlMWNmY2M5MjBmJyxcbiAgICAnOTdiZDA5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBlJyxcbiAgICAnOTdiY2Y5N2MzNTk4MDgyYzk1ZjhlMWNmY2M5MjBmJyxcbiAgICAnOTdiZDA5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiY2Y5N2MzNTk4MDgyYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAnOTdiZDA5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiY2Y5N2MzNTk4MDgyYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAnOTdiZDA5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAnOTdiZDA5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAnOTdiZDA5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAnOTdiZDA5N2JkMDdmNTk1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAnOTc3ODM5N2JkMTk4MDFlYzkyMTBjOTI3NGM5MjBlJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAnOTdiZDA3ZjUzMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MjBlJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAnOTdiZDA3ZjUzMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiZDA3ZjE0ODdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiY2Y3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiY2Y3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiY2Y3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAnOTdiY2Y3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDdmNTk1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTI3NGM5MjBlJyxcbiAgICAnOTdiY2Y3ZjBlNDdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM5MWFhJyxcbiAgICAnOTdiNmI5N2JkMTk3YzM2YzkyMTBjOTI3NGM5MjBlJyxcbiAgICAnOTdiY2Y3ZjBlNDdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MjBlJyxcbiAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM3ZjUzMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNzBjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTM3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTI3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMDc4N2IwNzIxJyxcbiAgICAnN2YwZTI3ZjBlNDdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM5MWFhJyxcbiAgICAnOTdiNmI3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJyxcbiAgICAnN2YwZTI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAnOTc3ODM3ZjBlMzdmMTQ5YjA3MjNiMDc4N2IwNzIxJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM3ZjUzMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTM3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJyxcbiAgICAnN2YwZTI3ZjBlNDdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDcyM2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlMzdmMTQ5YjA3MjNiMDc4N2IwNzIxJyxcbiAgICAnN2YwZTI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAnOTc3ODM3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JyxcbiAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JyxcbiAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JyxcbiAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTM3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM3ZjBlMzdmMTQ4OTgwODJiMDcyMjk3YzM1JyxcbiAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM3ZjBlMzdmMTQ4OTgwODJiMDcyMjk3YzM1JyxcbiAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JyxcbiAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJyxcbiAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JyxcbiAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDcyM2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJyxcbiAgICAnN2YwZTI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JyxcbiAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDcyM2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlMzdmMTQ5OTgwODNiMDc4N2IwNzIxJyxcbiAgICAnN2YwZTI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JyxcbiAgICAnN2VjOTY3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JyxcbiAgICAnN2YwN2U3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM2NjY1YjY2YWE4OTgwMWU5ODA4Mjk3YzM1JyxcbiAgICAnNjY1ZjY3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JyxcbiAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcbiAgICAnN2YwZTM2NjY1YjY2YTQ0OTgwMWU5ODA4Mjk3YzM1JyxcbiAgICAnNjY1ZjY3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JyxcbiAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTM2NjY1YjY2YTQ0OTgwMWU5ODA4Mjk3YzM1JyxcbiAgICAnNjY1ZjY3ZjBlMzdmMTQ4OTgwODJiMDcyMjk3YzM1JyxcbiAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTI2NjY1YjY2YTQ0OTgwMWU5ODA4Mjk3YzM1JyxcbiAgICAnNjY1ZjY3ZjBlMzdmMTQ4OTgwMWViMDcyMjk3YzM1JyxcbiAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJ1xuICBdLFxuXG4gIC8qKlxuICAgKiDmlbDlrZfovazkuK3mlofpgJ/mn6XooahcbiAgICogQEFycmF5IE9mIFByb3BlcnR5XG4gICAqIEB0cmFucyBbJ+aXpScsJ+S4gCcsJ+S6jCcsJ+S4iScsJ+WbmycsJ+S6lCcsJ+WFrScsJ+S4gycsJ+WFqycsJ+S5nScsJ+WNgSddXG4gICAqIEByZXR1cm4gQ24gc3RyaW5nXG4gICAqL1xuICBuU3RyMTogW1xuICAgICdcXHU2NWU1JyxcbiAgICAnXFx1NGUwMCcsXG4gICAgJ1xcdTRlOGMnLFxuICAgICdcXHU0ZTA5JyxcbiAgICAnXFx1NTZkYicsXG4gICAgJ1xcdTRlOTQnLFxuICAgICdcXHU1MTZkJyxcbiAgICAnXFx1NGUwMycsXG4gICAgJ1xcdTUxNmInLFxuICAgICdcXHU0ZTVkJyxcbiAgICAnXFx1NTM0MSdcbiAgXSxcblxuICAvKipcbiAgICog5pel5pyf6L2s5Yac5Y6G56ew5ZG86YCf5p+l6KGoXG4gICAqIEBBcnJheSBPZiBQcm9wZXJ0eVxuICAgKiBAdHJhbnMgWyfliJ0nLCfljYEnLCflu78nLCfljYUnXVxuICAgKiBAcmV0dXJuIENuIHN0cmluZ1xuICAgKi9cbiAgblN0cjI6IFsnXFx1NTIxZCcsICdcXHU1MzQxJywgJ1xcdTVlZmYnLCAnXFx1NTM0NSddLFxuXG4gIC8qKlxuICAgKiDmnIjku73ovazlhpzljobnp7DlkbzpgJ/mn6XooahcbiAgICogQEFycmF5IE9mIFByb3BlcnR5XG4gICAqIEB0cmFucyBbJ+atoycsJ+S4gCcsJ+S6jCcsJ+S4iScsJ+WbmycsJ+S6lCcsJ+WFrScsJ+S4gycsJ+WFqycsJ+S5nScsJ+WNgScsJ+WGrCcsJ+iFiiddXG4gICAqIEByZXR1cm4gQ24gc3RyaW5nXG4gICAqL1xuICBuU3RyMzogW1xuICAgICdcXHU2YjYzJyxcbiAgICAnXFx1NGU4YycsXG4gICAgJ1xcdTRlMDknLFxuICAgICdcXHU1NmRiJyxcbiAgICAnXFx1NGU5NCcsXG4gICAgJ1xcdTUxNmQnLFxuICAgICdcXHU0ZTAzJyxcbiAgICAnXFx1NTE2YicsXG4gICAgJ1xcdTRlNWQnLFxuICAgICdcXHU1MzQxJyxcbiAgICAnXFx1NTFhYycsXG4gICAgJ1xcdTgxNGEnXG4gIF0sXG5cbiAgLyoqXG4gICAqIOi/lOWbnuWGnOWOhnnlubTkuIDmlbTlubTnmoTmgLvlpKnmlbBcbiAgICogQHBhcmFtIGx1bmFyIFllYXJcbiAgICogQHJldHVybiBOdW1iZXJcbiAgICogQGVnOnZhciBjb3VudCA9IGNhbGVuZGFyLmxZZWFyRGF5cygxOTg3KSA7Ly9jb3VudD0zODdcbiAgICovXG4gIGxZZWFyRGF5czogZnVuY3Rpb24oeSkge1xuICAgIGxldCBpO1xuICAgIGxldCBzdW0gPSAzNDg7XG4gICAgZm9yIChpID0gMHg4MDAwOyBpID4gMHg4OyBpID4+PSAxKSB7XG4gICAgICBzdW0gKz0gY2FsZW5kYXIubHVuYXJJbmZvW3kgLSAxOTAwXSAmIGkgPyAxIDogMDtcbiAgICB9XG4gICAgcmV0dXJuIHN1bSArIGNhbGVuZGFyLmxlYXBEYXlzKHkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiDov5Tlm57lhpzljoZ55bm06Zew5pyI5piv5ZOq5Liq5pyI77yb6IuleeW5tOayoeaciemXsOaciCDliJnov5Tlm54wXG4gICAqIEBwYXJhbSBsdW5hciBZZWFyXG4gICAqIEByZXR1cm4gTnVtYmVyICgwLTEyKVxuICAgKiBAZWc6dmFyIGxlYXBNb250aCA9IGNhbGVuZGFyLmxlYXBNb250aCgxOTg3KSA7Ly9sZWFwTW9udGg9NlxuICAgKi9cbiAgbGVhcE1vbnRoOiBmdW5jdGlvbih5KSB7XG4gICAgLy8g6Zew5a2X57yW56CBIFxcdTk1ZjBcbiAgICByZXR1cm4gY2FsZW5kYXIubHVuYXJJbmZvW3kgLSAxOTAwXSAmIDB4ZjtcbiAgfSxcblxuICAvKipcbiAgICog6L+U5Zue5Yac5Y6GeeW5tOmXsOaciOeahOWkqeaVsCDoi6Xor6XlubTmsqHmnInpl7DmnIjliJnov5Tlm54wXG4gICAqIEBwYXJhbSBsdW5hciBZZWFyXG4gICAqIEByZXR1cm4gTnVtYmVyICgw44CBMjnjgIEzMClcbiAgICogQGVnOnZhciBsZWFwTW9udGhEYXkgPSBjYWxlbmRhci5sZWFwRGF5cygxOTg3KSA7Ly9sZWFwTW9udGhEYXk9MjlcbiAgICovXG4gIGxlYXBEYXlzOiBmdW5jdGlvbih5KSB7XG4gICAgaWYgKGNhbGVuZGFyLmxlYXBNb250aCh5KSkge1xuICAgICAgcmV0dXJuIGNhbGVuZGFyLmx1bmFySW5mb1t5IC0gMTkwMF0gJiAweDEwMDAwID8gMzAgOiAyOTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOi/lOWbnuWGnOWOhnnlubRt5pyI77yI6Z2e6Zew5pyI77yJ55qE5oC75aSp5pWw77yM6K6h566XbeS4uumXsOaciOaXtueahOWkqeaVsOivt+S9v+eUqGxlYXBEYXlz5pa55rOVXG4gICAqIEBwYXJhbSBsdW5hciBZZWFyXG4gICAqIEByZXR1cm4gTnVtYmVyICgtMeOAgTI544CBMzApXG4gICAqIEBlZzp2YXIgTW9udGhEYXkgPSBjYWxlbmRhci5tb250aERheXMoMTk4Nyw5KSA7Ly9Nb250aERheT0yOVxuICAgKi9cbiAgbW9udGhEYXlzOiBmdW5jdGlvbih5LCBtKSB7XG4gICAgaWYgKG0gPiAxMiB8fCBtIDwgMSkgcmV0dXJuIC0xOyAvLyDmnIjku73lj4LmlbDku44x6IezMTLvvIzlj4LmlbDplJnor6/ov5Tlm54tMVxuICAgIHJldHVybiBjYWxlbmRhci5sdW5hckluZm9beSAtIDE5MDBdICYgKDB4MTAwMDAgPj4gbSkgPyAzMCA6IDI5O1xuICB9LFxuXG4gIC8qKlxuICAgKiDov5Tlm57lhazljoYoISl55bm0beaciOeahOWkqeaVsFxuICAgKiBAcGFyYW0gc29sYXIgWWVhclxuICAgKiBAcmV0dXJuIE51bWJlciAoLTHjgIEyOOOAgTI544CBMzDjgIEzMSlcbiAgICogQGVnOnZhciBzb2xhck1vbnRoRGF5ID0gY2FsZW5kYXIubGVhcERheXMoMTk4NykgOy8vc29sYXJNb250aERheT0zMFxuICAgKi9cbiAgc29sYXJEYXlzOiBmdW5jdGlvbih5LCBtKSB7XG4gICAgaWYgKG0gPiAxMiB8fCBtIDwgMSkgcmV0dXJuIC0xOyAvLyDoi6Xlj4LmlbDplJnor68g6L+U5ZueLTFcbiAgICBjb25zdCBtcyA9IG0gLSAxO1xuICAgIGlmICgrbXMgPT09IDEpIHtcbiAgICAgIC8vIDLmnIjku73nmoTpl7DlubPop4TlvovmtYvnrpflkI7noa7orqTov5Tlm54yOOaIljI5XG4gICAgICByZXR1cm4gKHkgJSA0ID09PSAwICYmIHkgJSAxMDAgIT09IDApIHx8IHkgJSA0MDAgPT09IDAgPyAyOSA6IDI4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2FsZW5kYXIuc29sYXJNb250aFttc107XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiDlhpzljoblubTku73ovazmjaLkuLrlubLmlK/nuqrlubRcbiAgICogQHBhcmFtICBsWWVhciDlhpzljoblubTnmoTlubTku73mlbBcbiAgICogQHJldHVybiBDbiBzdHJpbmdcbiAgICovXG4gIHRvR2FuWmhpWWVhcjogZnVuY3Rpb24obFllYXIpIHtcbiAgICBsZXQgZ2FuS2V5ID0gKGxZZWFyIC0gMykgJSAxMDtcbiAgICBsZXQgemhpS2V5ID0gKGxZZWFyIC0gMykgJSAxMjtcbiAgICBpZiAoK2dhbktleSA9PT0gMCkgZ2FuS2V5ID0gMTA7IC8vIOWmguaenOS9meaVsOS4ujDliJnkuLrmnIDlkI7kuIDkuKrlpKnlubJcbiAgICBpZiAoK3poaUtleSA9PT0gMCkgemhpS2V5ID0gMTI7IC8vIOWmguaenOS9meaVsOS4ujDliJnkuLrmnIDlkI7kuIDkuKrlnLDmlK9cbiAgICByZXR1cm4gY2FsZW5kYXIuR2FuW2dhbktleSAtIDFdICsgY2FsZW5kYXIuWmhpW3poaUtleSAtIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiDlhazljobmnIjjgIHml6XliKTmlq3miYDlsZ7mmJ/luqdcbiAgICogQHBhcmFtICBjTW9udGggW2Rlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIGNEYXkgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIENuIHN0cmluZ1xuICAgKi9cbiAgdG9Bc3RybzogZnVuY3Rpb24oY01vbnRoLCBjRGF5KSB7XG4gICAgY29uc3QgcyA9XG4gICAgICAnXFx1OWI1NFxcdTdmYWZcXHU2YzM0XFx1NzRmNlxcdTUzY2NcXHU5YzdjXFx1NzY3ZFxcdTdmOGFcXHU5MWQxXFx1NzI1YlxcdTUzY2NcXHU1YjUwXFx1NWRlOFxcdTg3ZjlcXHU3MmVlXFx1NWI1MFxcdTU5MDRcXHU1OTczXFx1NTkyOVxcdTc5ZTRcXHU1OTI5XFx1ODc0ZVxcdTVjMDRcXHU2MjRiXFx1OWI1NFxcdTdmYWYnO1xuICAgIGNvbnN0IGFyciA9IFsyMCwgMTksIDIxLCAyMSwgMjEsIDIyLCAyMywgMjMsIDIzLCAyMywgMjIsIDIyXTtcbiAgICByZXR1cm4gKFxuICAgICAgcy5zdWJzdHIoY01vbnRoICogMiAtIChjRGF5IDwgYXJyW2NNb250aCAtIDFdID8gMiA6IDApLCAyKSArICdcXHU1ZWE3J1xuICAgICk7IC8vIOW6p1xuICB9LFxuXG4gIC8qKlxuICAgKiDkvKDlhaVvZmZzZXTlgY/np7vph4/ov5Tlm57lubLmlK9cbiAgICogQHBhcmFtIG9mZnNldCDnm7jlr7nnlLLlrZDnmoTlgY/np7vph49cbiAgICogQHJldHVybiBDbiBzdHJpbmdcbiAgICovXG4gIHRvR2FuWmhpOiBmdW5jdGlvbihvZmZzZXQpIHtcbiAgICByZXR1cm4gY2FsZW5kYXIuR2FuW29mZnNldCAlIDEwXSArIGNhbGVuZGFyLlpoaVtvZmZzZXQgJSAxMl07XG4gIH0sXG5cbiAgLyoqXG4gICAqIOS8oOWFpeWFrOWOhighKXnlubTojrflvpfor6XlubTnrKxu5Liq6IqC5rCU55qE5YWs5Y6G5pel5pyfXG4gICAqIEBwYXJhbSB55YWs5Y6G5bm0KDE5MDAtMjEwMCnvvJtu5LqM5Y2B5Zub6IqC5rCU5Lit55qE56ys5Yeg5Liq6IqC5rCUKDF+MjQp77yb5LuObj0xKOWwj+WvkinnrpfotbdcbiAgICogQHJldHVybiBkYXkgTnVtYmVyXG4gICAqIEBlZzp2YXIgXzI0ID0gY2FsZW5kYXIuZ2V0VGVybSgxOTg3LDMpIDsvL18yND00O+aEj+WNszE5ODflubQy5pyINOaXpeeri+aYpVxuICAgKi9cbiAgZ2V0VGVybTogZnVuY3Rpb24oeSwgbikge1xuICAgIGlmICh5IDwgMTkwMCB8fCB5ID4gMjEwMCkgcmV0dXJuIC0xO1xuICAgIGlmIChuIDwgMSB8fCBuID4gMjQpIHJldHVybiAtMTtcbiAgICBjb25zdCBfdGFibGUgPSBjYWxlbmRhci5zVGVybUluZm9beSAtIDE5MDBdO1xuICAgIGNvbnN0IF9pbmZvID0gW1xuICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoMCwgNSkpLnRvU3RyaW5nKCksXG4gICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cig1LCA1KSkudG9TdHJpbmcoKSxcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDEwLCA1KSkudG9TdHJpbmcoKSxcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDE1LCA1KSkudG9TdHJpbmcoKSxcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDIwLCA1KSkudG9TdHJpbmcoKSxcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDI1LCA1KSkudG9TdHJpbmcoKVxuICAgIF07XG4gICAgY29uc3QgX2NhbGRheSA9IFtcbiAgICAgIF9pbmZvWzBdLnN1YnN0cigwLCAxKSxcbiAgICAgIF9pbmZvWzBdLnN1YnN0cigxLCAyKSxcbiAgICAgIF9pbmZvWzBdLnN1YnN0cigzLCAxKSxcbiAgICAgIF9pbmZvWzBdLnN1YnN0cig0LCAyKSxcblxuICAgICAgX2luZm9bMV0uc3Vic3RyKDAsIDEpLFxuICAgICAgX2luZm9bMV0uc3Vic3RyKDEsIDIpLFxuICAgICAgX2luZm9bMV0uc3Vic3RyKDMsIDEpLFxuICAgICAgX2luZm9bMV0uc3Vic3RyKDQsIDIpLFxuXG4gICAgICBfaW5mb1syXS5zdWJzdHIoMCwgMSksXG4gICAgICBfaW5mb1syXS5zdWJzdHIoMSwgMiksXG4gICAgICBfaW5mb1syXS5zdWJzdHIoMywgMSksXG4gICAgICBfaW5mb1syXS5zdWJzdHIoNCwgMiksXG5cbiAgICAgIF9pbmZvWzNdLnN1YnN0cigwLCAxKSxcbiAgICAgIF9pbmZvWzNdLnN1YnN0cigxLCAyKSxcbiAgICAgIF9pbmZvWzNdLnN1YnN0cigzLCAxKSxcbiAgICAgIF9pbmZvWzNdLnN1YnN0cig0LCAyKSxcblxuICAgICAgX2luZm9bNF0uc3Vic3RyKDAsIDEpLFxuICAgICAgX2luZm9bNF0uc3Vic3RyKDEsIDIpLFxuICAgICAgX2luZm9bNF0uc3Vic3RyKDMsIDEpLFxuICAgICAgX2luZm9bNF0uc3Vic3RyKDQsIDIpLFxuXG4gICAgICBfaW5mb1s1XS5zdWJzdHIoMCwgMSksXG4gICAgICBfaW5mb1s1XS5zdWJzdHIoMSwgMiksXG4gICAgICBfaW5mb1s1XS5zdWJzdHIoMywgMSksXG4gICAgICBfaW5mb1s1XS5zdWJzdHIoNCwgMilcbiAgICBdO1xuICAgIHJldHVybiBwYXJzZUludChfY2FsZGF5W24gLSAxXSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOS8oOWFpeWGnOWOhuaVsOWtl+aciOS7vei/lOWbnuaxieivremAmuS/l+ihqOekuuazlVxuICAgKiBAcGFyYW0gbHVuYXIgbW9udGhcbiAgICogQHJldHVybiBDbiBzdHJpbmdcbiAgICogQGVnOnZhciBjbk1vbnRoID0gY2FsZW5kYXIudG9DaGluYU1vbnRoKDEyKSA7Ly9jbk1vbnRoPSfohYrmnIgnXG4gICAqL1xuICB0b0NoaW5hTW9udGg6IGZ1bmN0aW9uKG0pIHtcbiAgICAvLyDmnIggPT4gXFx1NjcwOFxuICAgIGlmIChtID4gMTIgfHwgbSA8IDEpIHJldHVybiAtMTsgLy8g6Iul5Y+C5pWw6ZSZ6K+vIOi/lOWbni0xXG4gICAgbGV0IHMgPSBjYWxlbmRhci5uU3RyM1ttIC0gMV07XG4gICAgcyArPSAnXFx1NjcwOCc7IC8vIOWKoOS4iuaciOWtl1xuICAgIHJldHVybiBzO1xuICB9LFxuXG4gIC8qKlxuICAgKiDkvKDlhaXlhpzljobml6XmnJ/mlbDlrZfov5Tlm57msYnlrZfooajnpLrms5VcbiAgICogQHBhcmFtIGx1bmFyIGRheVxuICAgKiBAcmV0dXJuIENuIHN0cmluZ1xuICAgKiBAZWc6dmFyIGNuRGF5ID0gY2FsZW5kYXIudG9DaGluYURheSgyMSkgOy8vY25Nb250aD0n5bu/5LiAJ1xuICAgKi9cbiAgdG9DaGluYURheTogZnVuY3Rpb24oZCkge1xuICAgIC8vIOaXpSA9PiBcXHU2NWU1XG4gICAgbGV0IHM7XG4gICAgc3dpdGNoIChkKSB7XG4gICAgICBjYXNlIDEwOlxuICAgICAgICBzID0gJ1xcdTUyMWRcXHU1MzQxJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDIwOlxuICAgICAgICBzID0gJ1xcdTRlOGNcXHU1MzQxJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDMwOlxuICAgICAgICBzID0gJ1xcdTRlMDlcXHU1MzQxJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzID0gY2FsZW5kYXIublN0cjJbTWF0aC5mbG9vcihkIC8gMTApXTtcbiAgICAgICAgcyArPSBjYWxlbmRhci5uU3RyMVtkICUgMTBdO1xuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfSxcblxuICAvKipcbiAgICog5bm05Lu96L2s55Sf6IKWWyHku4Xog73lpKfoh7TovazmjaJdID0+IOeyvuehruWIkuWIhueUn+iCluWIhueVjOe6v+aYr+KAnOeri+aYpeKAnVxuICAgKiBAcGFyYW0geSB5ZWFyXG4gICAqIEByZXR1cm4gQ24gc3RyaW5nXG4gICAqIEBlZzp2YXIgYW5pbWFsID0gY2FsZW5kYXIuZ2V0QW5pbWFsKDE5ODcpIDsvL2FuaW1hbD0n5YWUJ1xuICAgKi9cbiAgZ2V0QW5pbWFsOiBmdW5jdGlvbih5KSB7XG4gICAgcmV0dXJuIGNhbGVuZGFyLkFuaW1hbHNbKHkgLSA0KSAlIDEyXTtcbiAgfSxcblxuICAvKipcbiAgICog5Lyg5YWl6Ziz5Y6G5bm05pyI5pel6I635b6X6K+m57uG55qE5YWs5Y6G44CB5Yac5Y6Gb2JqZWN05L+h5oGvIDw9PkpTT05cbiAgICogQHBhcmFtIHkgIHNvbGFyIHllYXJcbiAgICogQHBhcmFtIG0gIHNvbGFyIG1vbnRoXG4gICAqIEBwYXJhbSBkICBzb2xhciBkYXlcbiAgICogQHJldHVybiBKU09OIG9iamVjdFxuICAgKiBAZWc6Y29uc29sZS5sb2coY2FsZW5kYXIuc29sYXIybHVuYXIoMTk4NywxMSwwMSkpO1xuICAgKi9cbiAgc29sYXIybHVuYXI6IGZ1bmN0aW9uKHksIG0sIGQpIHtcbiAgICAvLyDlj4LmlbDljLrpl7QxOTAwLjEuMzF+MjEwMC4xMi4zMVxuICAgIC8vIOW5tOS7vemZkOWumuOAgeS4iumZkFxuICAgIGlmICh5IDwgMTkwMCB8fCB5ID4gMjEwMCkge1xuICAgICAgcmV0dXJuIC0xOyAvLyB1bmRlZmluZWTovazmjaLkuLrmlbDlrZflj5jkuLpOYU5cbiAgICB9XG4gICAgLy8g5YWs5Y6G5Lyg5Y+C5pyA5LiL6ZmQXG4gICAgaWYgKCt5ID09PSAxOTAwICYmICttID09PSAxICYmICtkIDwgMzEpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgLy8g5pyq5Lyg5Y+CIOiOt+W+l+W9k+WkqVxuICAgIGxldCBvYmpEYXRlO1xuICAgIGlmICgheSkge1xuICAgICAgb2JqRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9iakRhdGUgPSBuZXcgRGF0ZSh5LCBwYXJzZUludChtKSAtIDEsIGQpO1xuICAgIH1cbiAgICBsZXQgaTtcbiAgICBsZXQgbGVhcCA9IDA7XG4gICAgbGV0IHRlbXAgPSAwO1xuICAgIC8vIOS/ruato3ltZOWPguaVsFxuICAgIHkgPSBvYmpEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgbSA9IG9iakRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgZCA9IG9iakRhdGUuZ2V0RGF0ZSgpO1xuICAgIGxldCBvZmZzZXQgPVxuICAgICAgKERhdGUuVVRDKG9iakRhdGUuZ2V0RnVsbFllYXIoKSwgb2JqRGF0ZS5nZXRNb250aCgpLCBvYmpEYXRlLmdldERhdGUoKSkgLVxuICAgICAgICBEYXRlLlVUQygxOTAwLCAwLCAzMSkpIC9cbiAgICAgIDg2NDAwMDAwO1xuICAgIGZvciAoaSA9IDE5MDA7IGkgPCAyMTAxICYmIG9mZnNldCA+IDA7IGkrKykge1xuICAgICAgdGVtcCA9IGNhbGVuZGFyLmxZZWFyRGF5cyhpKTtcbiAgICAgIG9mZnNldCAtPSB0ZW1wO1xuICAgIH1cbiAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgb2Zmc2V0ICs9IHRlbXA7XG4gICAgICBpLS07XG4gICAgfVxuXG4gICAgLy8g5piv5ZCm5LuK5aSpXG4gICAgY29uc3QgaXNUb2RheU9iaiA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGlzVG9kYXkgPSBmYWxzZTtcbiAgICBpZiAoXG4gICAgICBpc1RvZGF5T2JqLmdldEZ1bGxZZWFyKCkgPT09ICt5ICYmXG4gICAgICBpc1RvZGF5T2JqLmdldE1vbnRoKCkgKyAxID09PSArbSAmJlxuICAgICAgaXNUb2RheU9iai5nZXREYXRlKCkgPT09ICtkXG4gICAgKSB7XG4gICAgICBpc1RvZGF5ID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8g5pif5pyf5YegXG4gICAgbGV0IG5XZWVrID0gb2JqRGF0ZS5nZXREYXkoKTtcbiAgICBjb25zdCBjV2VlayA9IGNhbGVuZGFyLm5TdHIxW25XZWVrXTtcbiAgICAvLyDmlbDlrZfooajnpLrlkajlh6DpobrlupTlpKnmnJ3lkajkuIDlvIDlp4vnmoTmg6/kvotcbiAgICBpZiAoK25XZWVrID09PSAwKSB7XG4gICAgICBuV2VlayA9IDc7XG4gICAgfVxuICAgIC8vIOWGnOWOhuW5tFxuICAgIGNvbnN0IHllYXIgPSBpO1xuICAgIGxlYXAgPSBjYWxlbmRhci5sZWFwTW9udGgoaSk7IC8vIOmXsOWTquS4quaciFxuICAgIGxldCBpc0xlYXAgPSBmYWxzZTtcblxuICAgIC8vIOaViOmqjOmXsOaciFxuICAgIGZvciAoaSA9IDE7IGkgPCAxMyAmJiBvZmZzZXQgPiAwOyBpKyspIHtcbiAgICAgIC8vIOmXsOaciFxuICAgICAgaWYgKGxlYXAgPiAwICYmIGkgPT09IGxlYXAgKyAxICYmIGlzTGVhcCA9PT0gZmFsc2UpIHtcbiAgICAgICAgLS1pO1xuICAgICAgICBpc0xlYXAgPSB0cnVlO1xuICAgICAgICB0ZW1wID0gY2FsZW5kYXIubGVhcERheXMoeWVhcik7IC8vIOiuoeeul+WGnOWOhumXsOaciOWkqeaVsFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcCA9IGNhbGVuZGFyLm1vbnRoRGF5cyh5ZWFyLCBpKTsgLy8g6K6h566X5Yac5Y6G5pmu6YCa5pyI5aSp5pWwXG4gICAgICB9XG4gICAgICAvLyDop6PpmaTpl7DmnIhcbiAgICAgIGlmIChpc0xlYXAgPT09IHRydWUgJiYgaSA9PT0gbGVhcCArIDEpIGlzTGVhcCA9IGZhbHNlO1xuICAgICAgb2Zmc2V0IC09IHRlbXA7XG4gICAgfVxuICAgIC8vIOmXsOaciOWvvOiHtOaVsOe7hOS4i+agh+mHjeWPoOWPluWPjVxuICAgIGlmIChvZmZzZXQgPT09IDAgJiYgbGVhcCA+IDAgJiYgaSA9PT0gbGVhcCArIDEpIHtcbiAgICAgIGlmIChpc0xlYXApIHtcbiAgICAgICAgaXNMZWFwID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc0xlYXAgPSB0cnVlO1xuICAgICAgICAtLWk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICBvZmZzZXQgKz0gdGVtcDtcbiAgICAgIC0taTtcbiAgICB9XG4gICAgLy8g5Yac5Y6G5pyIXG4gICAgY29uc3QgbW9udGggPSBpO1xuICAgIC8vIOWGnOWOhuaXpVxuICAgIGNvbnN0IGRheSA9IG9mZnNldCArIDE7XG4gICAgLy8g5aSp5bmy5Zyw5pSv5aSE55CGXG4gICAgY29uc3Qgc20gPSBtIC0gMTtcbiAgICBjb25zdCBnelkgPSBjYWxlbmRhci50b0dhblpoaVllYXIoeWVhcik7XG5cbiAgICAvLyDlvZPmnIjnmoTkuKTkuKroioLmsJRcbiAgICAvLyBidWdmaXgtMjAxNy03LTI0IDExOjAzOjM4IHVzZSBsdW5hciBZZWFyIFBhcmFtIGB5YCBOb3QgYHllYXJgXG4gICAgY29uc3QgZmlyc3ROb2RlID0gY2FsZW5kYXIuZ2V0VGVybSh5LCBtICogMiAtIDEpOyAvLyDov5Tlm57lvZPmnIjjgIzoioLjgI3kuLrlh6Dml6XlvIDlp4tcbiAgICBjb25zdCBzZWNvbmROb2RlID0gY2FsZW5kYXIuZ2V0VGVybSh5LCBtICogMik7IC8vIOi/lOWbnuW9k+aciOOAjOiKguOAjeS4uuWHoOaXpeW8gOWni1xuXG4gICAgLy8g5L6d5o2uMTLoioLmsJTkv67mraPlubLmlK/mnIhcbiAgICBsZXQgZ3pNID0gY2FsZW5kYXIudG9HYW5aaGkoKHkgLSAxOTAwKSAqIDEyICsgbSArIDExKTtcbiAgICBpZiAoZCA+PSBmaXJzdE5vZGUpIHtcbiAgICAgIGd6TSA9IGNhbGVuZGFyLnRvR2FuWmhpKCh5IC0gMTkwMCkgKiAxMiArIG0gKyAxMik7XG4gICAgfVxuXG4gICAgLy8g5Lyg5YWl55qE5pel5pyf55qE6IqC5rCU5LiO5ZCmXG4gICAgbGV0IGlzVGVybSA9IGZhbHNlO1xuICAgIGxldCBUZXJtID0gbnVsbDtcbiAgICBpZiAoK2ZpcnN0Tm9kZSA9PT0gZCkge1xuICAgICAgaXNUZXJtID0gdHJ1ZTtcbiAgICAgIFRlcm0gPSBjYWxlbmRhci5zb2xhclRlcm1bbSAqIDIgLSAyXTtcbiAgICB9XG4gICAgaWYgKCtzZWNvbmROb2RlID09PSBkKSB7XG4gICAgICBpc1Rlcm0gPSB0cnVlO1xuICAgICAgVGVybSA9IGNhbGVuZGFyLnNvbGFyVGVybVttICogMiAtIDFdO1xuICAgIH1cbiAgICAvLyDml6Xmn7Eg5b2T5pyI5LiA5pel5LiOIDE5MDAvMS8xIOebuOW3ruWkqeaVsFxuICAgIGNvbnN0IGRheUN5Y2xpY2FsID0gRGF0ZS5VVEMoeSwgc20sIDEsIDAsIDAsIDAsIDApIC8gODY0MDAwMDAgKyAyNTU2NyArIDEwO1xuICAgIGNvbnN0IGd6RCA9IGNhbGVuZGFyLnRvR2FuWmhpKGRheUN5Y2xpY2FsICsgZCAtIDEpO1xuICAgIC8vIOivpeaXpeacn+aJgOWxnueahOaYn+W6p1xuICAgIGNvbnN0IGFzdHJvID0gY2FsZW5kYXIudG9Bc3RybyhtLCBkKTtcblxuICAgIHJldHVybiB7XG4gICAgICBsWWVhcjogeWVhcixcbiAgICAgIGxNb250aDogbW9udGgsXG4gICAgICBsRGF5OiBkYXksXG4gICAgICBBbmltYWw6IGNhbGVuZGFyLmdldEFuaW1hbCh5ZWFyKSxcbiAgICAgIElNb250aENuOiAoaXNMZWFwID8gJ1xcdTk1ZjAnIDogJycpICsgY2FsZW5kYXIudG9DaGluYU1vbnRoKG1vbnRoKSxcbiAgICAgIElEYXlDbjogY2FsZW5kYXIudG9DaGluYURheShkYXkpLFxuICAgICAgY1llYXI6IHksXG4gICAgICBjTW9udGg6IG0sXG4gICAgICBjRGF5OiBkLFxuICAgICAgZ3pZZWFyOiBnelksXG4gICAgICBnek1vbnRoOiBnek0sXG4gICAgICBnekRheTogZ3pELFxuICAgICAgaXNUb2RheTogaXNUb2RheSxcbiAgICAgIGlzTGVhcDogaXNMZWFwLFxuICAgICAgbldlZWs6IG5XZWVrLFxuICAgICAgbmNXZWVrOiAnXFx1NjYxZlxcdTY3MWYnICsgY1dlZWssXG4gICAgICBpc1Rlcm06IGlzVGVybSxcbiAgICAgIFRlcm06IFRlcm0sXG4gICAgICBhc3RybzogYXN0cm9cbiAgICB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiDkvKDlhaXlhpzljoblubTmnIjml6Xku6Xlj4rkvKDlhaXnmoTmnIjku73mmK/lkKbpl7DmnIjojrflvpfor6bnu4bnmoTlhazljobjgIHlhpzljoZvYmplY3Tkv6Hmga8gPD0+SlNPTlxuICAgKiBAcGFyYW0geSAgbHVuYXIgeWVhclxuICAgKiBAcGFyYW0gbSAgbHVuYXIgbW9udGhcbiAgICogQHBhcmFtIGQgIGx1bmFyIGRheVxuICAgKiBAcGFyYW0gaXNMZWFwTW9udGggIGx1bmFyIG1vbnRoIGlzIGxlYXAgb3Igbm90LlvlpoLmnpzmmK/lhpzljobpl7DmnIjnrKzlm5vkuKrlj4LmlbDotYvlgLx0cnVl5Y2z5Y+vXVxuICAgKiBAcmV0dXJuIEpTT04gb2JqZWN0XG4gICAqIEBlZzpjb25zb2xlLmxvZyhjYWxlbmRhci5sdW5hcjJzb2xhcigxOTg3LDksMTApKTtcbiAgICovXG4gIGx1bmFyMnNvbGFyOiBmdW5jdGlvbih5LCBtLCBkLCBpc0xlYXBNb250aCkge1xuICAgIC8vIOWPguaVsOWMuumXtDE5MDAuMS4zMX4yMTAwLjEyLjFcbiAgICBpc0xlYXBNb250aCA9ICEhaXNMZWFwTW9udGg7XG4gICAgLy8gbGV0IGxlYXBPZmZzZXQgPSAwO1xuICAgIGNvbnN0IGxlYXBNb250aCA9IGNhbGVuZGFyLmxlYXBNb250aCh5KTtcbiAgICAvLyBsZXQgbGVhcERheSA9IGNhbGVuZGFyLmxlYXBEYXlzKHkpO1xuICAgIGlmIChpc0xlYXBNb250aCAmJiBsZWFwTW9udGggIT09IG0pIHJldHVybiAtMTsgLy8g5Lyg5Y+C6KaB5rGC6K6h566X6K+l6Zew5pyI5YWs5Y6GIOS9huivpeW5tOW+l+WHuueahOmXsOaciOS4juS8oOWPgueahOaciOS7veW5tuS4jeWQjFxuICAgIGlmIChcbiAgICAgICgreSA9PT0gMjEwMCAmJiArbSA9PT0gMTIgJiYgK2QgPiAxKSB8fFxuICAgICAgKCt5ID09PSAxOTAwICYmICttID09PSAxICYmICtkIDwgMzEpXG4gICAgKVxuICAgICAgcmV0dXJuIC0xOyAvLyDotoXlh7rkuobmnIDlpKfmnoHpmZDlgLxcbiAgICBjb25zdCBkYXkgPSBjYWxlbmRhci5tb250aERheXMoeSwgbSk7XG4gICAgbGV0IF9kYXkgPSBkYXk7XG4gICAgLy8gYnVnRml4IDIwMTYtOS0yNVxuICAgIC8vIGlmIG1vbnRoIGlzIGxlYXAsIF9kYXkgdXNlIGxlYXBEYXlzIG1ldGhvZFxuICAgIGlmIChpc0xlYXBNb250aCkge1xuICAgICAgX2RheSA9IGNhbGVuZGFyLmxlYXBEYXlzKHksIG0pO1xuICAgIH1cbiAgICBpZiAoeSA8IDE5MDAgfHwgeSA+IDIxMDAgfHwgZCA+IF9kYXkpIHJldHVybiAtMTsgLy8g5Y+C5pWw5ZCI5rOV5oCn5pWI6aqMXG5cbiAgICAvLyDorqHnrpflhpzljobnmoTml7bpl7Tlt65cbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMTkwMDsgaSA8IHk7IGkrKykge1xuICAgICAgb2Zmc2V0ICs9IGNhbGVuZGFyLmxZZWFyRGF5cyhpKTtcbiAgICB9XG4gICAgbGV0IGxlYXAgPSAwO1xuICAgIGxldCBpc0FkZCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbTsgaSsrKSB7XG4gICAgICBsZWFwID0gY2FsZW5kYXIubGVhcE1vbnRoKHkpO1xuICAgICAgaWYgKCFpc0FkZCkge1xuICAgICAgICAvLyDlpITnkIbpl7DmnIhcbiAgICAgICAgaWYgKGxlYXAgPD0gaSAmJiBsZWFwID4gMCkge1xuICAgICAgICAgIG9mZnNldCArPSBjYWxlbmRhci5sZWFwRGF5cyh5KTtcbiAgICAgICAgICBpc0FkZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9mZnNldCArPSBjYWxlbmRhci5tb250aERheXMoeSwgaSk7XG4gICAgfVxuICAgIC8vIOi9rOaNoumXsOaciOWGnOWOhiDpnIDooaXlhYXor6XlubTpl7DmnIjnmoTliY3kuIDkuKrmnIjnmoTml7blt65cbiAgICBpZiAoaXNMZWFwTW9udGgpIG9mZnNldCArPSBkYXk7XG4gICAgLy8gMTkwMOW5tOWGnOWOhuato+aciOS4gOaXpeeahOWFrOWOhuaXtumXtOS4ujE5MDDlubQx5pyIMzDml6Uw5pe2MOWIhjDnp5Io6K+l5pe26Ze05Lmf5piv5pys5Yac5Y6G55qE5pyA5byA5aeL6LW35aeL54K5KVxuICAgIGNvbnN0IHN0bWFwID0gRGF0ZS5VVEMoMTkwMCwgMSwgMzAsIDAsIDAsIDApO1xuICAgIGNvbnN0IGNhbE9iaiA9IG5ldyBEYXRlKChvZmZzZXQgKyBkIC0gMzEpICogODY0MDAwMDAgKyBzdG1hcCk7XG4gICAgY29uc3QgY1kgPSBjYWxPYmouZ2V0VVRDRnVsbFllYXIoKTtcbiAgICBjb25zdCBjTSA9IGNhbE9iai5nZXRVVENNb250aCgpICsgMTtcbiAgICBjb25zdCBjRCA9IGNhbE9iai5nZXRVVENEYXRlKCk7XG5cbiAgICByZXR1cm4gY2FsZW5kYXIuc29sYXIybHVuYXIoY1ksIGNNLCBjRCk7XG4gIH1cbn07XG5cbmNvbnN0IHtcbiAgR2FuLFxuICBaaGksXG4gIG5TdHIxLFxuICBuU3RyMixcbiAgblN0cjMsXG4gIEFuaW1hbHMsXG4gIHNvbGFyVGVybSxcbiAgbHVuYXJJbmZvLFxuICBzVGVybUluZm8sXG4gIHNvbGFyTW9udGgsXG4gIC4uLnJlc3Rcbn0gPSBjYWxlbmRhcjtcblxuZXhwb3J0IGRlZmF1bHQgcmVzdDtcbiJdfQ==