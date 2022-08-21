import wepy from 'wepy';

export interface SystemInfo {
  isIPhoneX: boolean;
  statusBarHeight: number;
}

let systemCache: SystemInfo | null;
let log: any = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null

export const getSystemInfo = () => new Promise((resolve, reject) => {
  if (systemCache != null) {
    resolve(systemCache);
  } else {
    wx.getSystemInfo({
      success: ({ model, screenHeight, statusBarHeight }) => {
        const iphoneX = /iphone x/i.test(model);
        const iphoneNew = /iPhone11/i.test(model) && screenHeight === 812;
        systemCache = {
          statusBarHeight,
          isIPhoneX: iphoneX || iphoneNew,
        };
        resolve(systemCache);
      },
      fail: reject,
    });
  }
});

// 函数节流
export function throttle(fn: any, gapTime: any) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }
  let _lastTime = null
  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   // 将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

// 设置 storage
export const setStorage = (key: string, data: any) => {
  try {
    wx.setStorageSync(key, data);
  } catch (e) {
    wx.setStorage({ key, data });
  }
};

// 删除 storage
export const removeStorage = (key: string) => {
  try {
    wx.removeStorageSync(key);
  } catch (e) {
    wx.removeStorage({ key });
  }
};

// 获取 storage
export const getStorage = (key: string) => {
  return new Promise((resolve, reject) => {
    try {
      const res = wx.getStorageSync(key);
      resolve(res);
    } catch (e) {
      wx.getStorage({ key, success: (wxRes) => { resolve(wxRes); }, fail: () => { reject('数据获取失败'); } });
    }
  });
};

// imgurl是图片服务器的前缀，650-650 是大小，可以是 380-350 180-180 50-50 pictures是数组
interface ImageProps {
  name: string;
  materialId?: string;
  itemId?: string;
  format?: '50-50' | '180-180' | '650-650';
}
interface MarketImageProps {
  img: string;
  defaultImg?: string;
}
// 格式化图片
export const formatImg = ({ name, materialId, itemId, format }: ImageProps) => {
  const { baseUrl, imgUrl } = wepy.$appConfig;
  let url = '';
  if (itemId && materialId && format) {
    url = `${imgUrl}/productImages/${materialId}/${itemId}/${format}/${name}`;
  } else {
    url = `${baseUrl}/assets/new/images/product/${name}`;
  }
  return url;
};
// 营销活动图片
export const MarketFormatImg = ({ img, defaultImg }: MarketImageProps) => {
  const { baseUrl, imgUrl } = wepy.$appConfig;
  let url = '';
  if (img) {
    url = `${imgUrl}/productImages/${img}`;
  } else {
    url = `${baseUrl}/${defaultImg}`;
  }
  return url;
};


interface FormatDmsImg {
  model: string;
  material: string;
}

// 拼接DMS图片
export const formatDmsImg = ({ model, material }: FormatDmsImg) => {
  const { baseUrl } = wepy.$appConfig;
  return {
    // img: `${baseUrl}/product/pic/${model}.nd`,
    img: `${baseUrl}/product/pic.nd?model=${model}`,
    err: `${baseUrl}/assets/new/images/product/${material}.jpg`
  };
};

// 比较两个日期的大小
export const getDateDiff = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return startDate.getTime() > endDate.getTime();
}

// 是否在日期范围内
export const getDateRange = (start: string, now: string, end: string) => {
  const nowDate = new Date(now.replace(/-/g, '/'));
  const startDate = new Date(start.replace(/-/g, '/'));
  const endDate = new Date(end.replace(/-/g, '/'));
  let status = 'next';

  if (nowDate.getTime() > startDate.getTime()) {
    status = 'next';
  }
  if (nowDate.getTime() > startDate.getTime() && nowDate.getTime() < endDate.getTime()) {
    status = 'current';
  }
  if (nowDate.getTime() > endDate.getTime()) {
    status = 'prev';
  }
  return status;
}

// 时间格式化
export const formatDate = (date?: string, type = 'Y-M-D h:m:s') => {
  let timestamp
  let myDate
  let hour
  let time
  if (date) {
    timestamp = parseInt(date, 10)
    if (timestamp < 10000) {
      timestamp = date
    }
    if (typeof timestamp === 'number') {
      myDate = new Date(timestamp)
    } else {
      myDate = new Date(timestamp.replace(/-/g, '/'))
    }
    hour = myDate.getHours()
  } else {
    myDate = new Date()
    hour = myDate.getHours()
  }
  const Y = myDate.getFullYear()
  const M = myDate.getMonth() + 1 < 10 ? `0${myDate.getMonth() + 1}` : myDate.getMonth() + 1
  const D = myDate.getDate() < 10 ? `0${myDate.getDate()}` : myDate.getDate()
  const h = hour < 10 ? `0${hour}` : hour
  const m = myDate.getMinutes() < 10 ? `0${myDate.getMinutes()}` : myDate.getMinutes()
  const s = myDate.getSeconds() < 10 ? `0${myDate.getSeconds()}` : myDate.getSeconds()
  time = type.replace('Y', Y)
  time = time.replace('M', M)
  time = time.replace('D', D)
  time = time.replace('h', h)
  time = time.replace('m', m)
  time = time.replace('s', s)
  return time
}

export const formatMobile = (mobile: string) => {
  if (mobile && mobile.length === 11) {
    return mobile.substr(0, 3) + "****" + mobile.substr(7, 11)
  }
  return mobile
}

// 获取接口返回的 cookie
export const getCookie = (name: string, cookie: string) => {
  // const reg = new RegExp(`${name}=([^;]*)(;|$)`);
  const reg = new RegExp(`${name}=([^,;]+)(?=;|,)`);
  const regStr = cookie.match(reg);
  let str = '';
  if (regStr) {
    str = unescape(regStr[1]);
  }
  return str;
}

// 数字补0
export const fillZero = (num: string) => num.length > 1 ? num : `0${num}`

export const resetInfo = (old: any, requestPayload: any, callback: any) {
  const infoMap = {};

  (requestPayload || []).forEach((newItemInfo) => {
    infoMap[`${newItemInfo.productCode}_${newItemInfo.orgId}`] = newItemInfo
  })

  old.forEach((oldItemInfo) => {
    const key = `${oldItemInfo.productCode}_${oldItemInfo.orgId}`
    if (infoMap[key]) {
      callback(oldItemInfo, infoMap[key])
    }
  })
}

export const filterGetPriceOrStock = (result: any) => {
  const loadingInventoryCode = []
  const loadingInventoryOrgId = []
  // const loadingInventoryOrgCode = []
  const loadingInventoryQueryType = ''

  const loadingPriceCode = []
  const loadingPriceOrgId = []
  const loadingPriceOrgCode = []

  // dms库存价格查询
  const loadingDmsPrice = []
  const loadingDmsInventory = []
  const loadingDmsOrgId = []

  // 获取需要动态获取的价格列表
  result.forEach(({ isFenXiao, loadingInventory, loadingPrice, productCode, orgId, orgCode }) => {
    if (isFenXiao !== 'Y') {
      if (loadingInventory) {
        loadingInventoryCode.push(productCode)
        loadingInventoryOrgId.push(orgId)
        // loadingInventoryOrgCode.push(orgCode)
        loadingInventoryQueryType = 'purchase'
      }

      if (loadingPrice) {
        loadingPriceCode.push(productCode)
        loadingPriceOrgId.push(orgId)
        loadingPriceOrgCode.push(orgCode)
      }
    } else {
      if (loadingInventory) {
        loadingInventoryCode.push(productCode)
        loadingInventoryOrgId.push(orgId)
        loadingInventoryQueryType = 'distribute'
      }

      loadingDmsOrgId.push(orgId)
      if (loadingInventory) {
        loadingDmsInventory.push(productCode)
      }
      if (loadingPrice) {
        loadingDmsPrice.push(productCode)
      }
    }
  })

  const loadingInfo = {}
  // 重新获取dms价格和库存
  if (loadingDmsPrice.length > 0) {
    loadingInfo.loadingDms = {
      orgId: loadingDmsOrgId.join(','),
      productId: loadingDmsPrice.join(','),
    }
  }
  if (loadingDmsInventory.length > 0) {
    loadingInfo.loadingDmsInventory = loadingDmsInventory
  }

  if (loadingInventoryCode.length > 0) {
    // 需要重新获取库存
    // loadingInfo.inventory = {
    //   code: loadingInventoryCode.join(','),
    //   orgCode: loadingInventoryOrgCode.join(','),
    //   orgId: loadingInventoryOrgId.join(',')
    // }
    loadingInfo.inventory = {
      code: loadingInventoryCode.join(','),
      queryType: loadingInventoryQueryType,
      orgId: loadingInventoryOrgId.join(',')
    }
  }

  if (loadingPriceCode.length > 0) {
    // 需要重新获取价格
    loadingInfo.price = {
      code: loadingPriceCode.join(','),
      orgCode: loadingPriceOrgCode.join(','),
      orgId: loadingPriceOrgId.join(',')
    }
  }
  return loadingInfo
}

export const checkTel = (tel: string) => {
  var mobile = /^1[3|5|6|7|8|9]\d{9}$/, phone = /^0\d{2,3}-?\d{7,8}$/;
  return mobile.test(tel) || phone.test(tel);
}

export const DX = (n: any) => {
  let fraction = ['角', '分']
  let digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  let unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  let head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(Math.floor(n * 1000 * 10 * Math.pow(10, i)) % (10 * 1000) / 1000)] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整')
}
// 金额处理
export const convertCurrencyAmt = (amount: any) => {

  if (typeof amount === 'number') {
    var p = /^[-]?\d+$/;
    var q = /(\d)(?=(\d{3})+(?!\d))/g;
    var value = undefined;
    if (p.test(amount)) {
      value = parseFloat(amount).toFixed(2);
      value = value.replace(q, "$1,");
      return value;
    } else {
      value = Math.round(parseFloat(amount) * 100) / 100;
      value = parseFloat(amount).toFixed(2);
      value = value.replace(q, "$1,");
      return value;
    }
  } else {
    return 0.00;
   }
}
// 获取当前时间的上个月的时间
export const getLastMonthYesterday = () => {
  const date = new Date();
  const daysInMonth: any = new Array([0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]);
  let strYear = date.getFullYear();
  let strDay: any = date.getDate();
  let strMonth: any = date.getMonth() + 1;
  let lastMonthYesterday = ''
  if (strYear % 4 == 0 && strYear % 100 != 0) {
    daysInMonth[2] = 29;
  }
  if (strMonth - 1 == 0) {
    strYear -= 1;
    strMonth = 12;
  } else {
    strMonth -= 1;
  }
  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
  if (strMonth < 10) {
    strMonth = "0" + strMonth;
  }
  if (strDay < 10) {
    strDay = "0" + strDay;
  }
  lastMonthYesterday = strYear + "-" + strMonth + "-" + strDay;
  return lastMonthYesterday;
}

//js获取前天的日期
export const previousDay = ()=> {
  let time=(new Date).getTime()-24*60*60*1000;
  let oDay=new Date(time);
  oDay=oDay.getFullYear() + "/" + (oDay.getMonth()> 9 ? (oDay.getMonth() + 1) : "0" + (oDay.getMonth() + 1)) + "/" +(oDay.getDate()> 9 ? (oDay.getDate()) : "0" + (oDay.getDate()));
  return oDay
}

//js获取明天的日期
export const nextDay = ()=> {
  let time=(new Date).getTime()+24*60*60*1000;
  let oDay=new Date(time);
  oDay=oDay.getFullYear() + "-" + (oDay.getMonth()> 9 ? (oDay.getMonth() + 1) : "0" + (oDay.getMonth() + 1)) + "-" +(oDay.getDate()> 9 ? (oDay.getDate()) : "0" + (oDay.getDate()));
  return oDay
}

  /**
   * 时间加减法 返回 str 格式 2019-4-10
   */
  export const addDate = (date:any, days:any)=> {
  var d = new Date(date);
  d.setDate(d.getDate() + days);
  var m = d.getMonth();
  if (m < 10) {
    m = "0" + m;
  }
  var day = d.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  return d.getFullYear() + '-' + m + '-' + day;
}
/**
 * 时间加减法 返回 str 格式 2019-4-10
 */
export const addMonth = (date:any, month:any)=> {
  var d = new Date(date);
  d.setMonth(d.getMonth() + month);
  var m = d.getMonth();
  if (m < 10) {
    m = "0" + m;
  }
  var day = d.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  return d.getFullYear() + '-' + m + '-' + day;
}

// 获取近一个月/一年/去年一整年的日期
export const getDateArea = (type:any) => {
  const date = new Date();
  let strYear = date.getFullYear();
  let strDay: any = date.getDate();
  let strMonth: any = date.getMonth() + 1;
  let returnDate = [];
  if (strMonth < 10) {
    strMonth = "0" + strMonth;
  }
  if (strDay < 10) {
    strDay = "0" + strDay;
  }
  if(type == '0') {   //最近一个月
    returnDate.push(`${strYear}-${strMonth}-01`);
    returnDate.push(`${strYear}-${strMonth}-${strDay}`);
  } else if (type == '1') {   //最近一年
    returnDate.push(`${strYear}-01-01`);
    returnDate.push(`${strYear}-${strMonth}-${strDay}`);
  } else {              //去年一整年
    returnDate.push(`${strYear-1}-01-01`);
    returnDate.push(`${strYear-1}-12-31`);
  }
  return returnDate;
}

/** 根据时间戳 获取其月开始时间戳和结束时间戳 */
//示例getTimeStamp(new Date).startTime
export const getTimeStamp = (timeStamp: any) => {
    let inDate = new Date(timeStamp)
    let year = inDate.getFullYear()
    let month = inDate.getMonth()
    let startTime = new Date(year, month, 1).getTime()
    let endTime =  new Date(year, month + 1, 1).getTime() - 1
    return {
      startTime: startTime,
      endTime: endTime
    }
  }
export const getUrl = (api: any, sys: any) => {
  // 增加cis访问微信接口判断 使用生产环境接口  测试环境经常调不通
  let url = ''
  let dmsRequest = false
  if(api.includes('uploadXtw.do')||api.includes('addInspectionRecord2.do')){
    // url = `http://xinshang.hisense.com:82/${api}`;
    url = `${wepy.$appConfig.ctsBaseUrl}/${api}`;;
  }else if (api.indexOf('wechatEntrance/entrance.do') !== -1) {
    url = `${wepy.$appConfig.dmsBaseUrl}/${api}`
    dmsRequest = true
  // }else if(api.indexOf('235777') !== -1) {
  }else if(sys === 'finance') {
    url = `${wepy.$appConfig.financeBaseUrl}/${api}`
  }else if(api.includes('queryCodeInfo.nd')) {
    url = `https://xtw.hisense.com/front/${api}`;
  }else if(api.includes('queryCisOrderStatusInfoMobile')) {
    url = `${api}`;
  }else if(api.includes('nearStores')||api.includes('queryAllMatkl')||api.includes('story-check')) {
    url = `${wepy.$appConfig.ctsBaseUrl}/${api}`;;
  } else {
  //}else if(api.includes('queryCisOrderStatusInfoMobile')) {
  //  url = `${api}`;
  // } else {
    url = `${wepy.$appConfig.baseUrl}/${api}`;
  }
  const item = {
    dmsRequest,
    url
  }
  return item;
}
export const logInfo = (logInfo: any) => {
  if (!log) return
  log.error.apply(log, logInfo)
}
//将数字以每三位一个逗号隔开
export const formatNum = (number) => {
  if (!number) {
    return "0.0";
  }
  let str = number.toString();
  let newStr = "";
  let count = 0;
  if (str.indexOf(".") == -1) {
    for (let i = str.length - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0 && str.charAt(i) != "-") {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr;
      }
      count++;
    }
// 自动补小数点后两位

    return newStr;
  } else {
    for (let i = str.indexOf(".") - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0 && str.charAt(i) != "-") {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr;
      }
      count++;
    }
    str = newStr + str.substr(str.indexOf("."), 3);
    return str;
  }
}
//金钱格式化
export const numFormat = (num) => {
  const format = (c) => {
    let count = c.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return count;
  };
  let str = num.toFixed(2);
  let result = "";
  if (str.length > 9 && str.split(".")[0].length !== 9) {
    result = format(str.slice(0, 10));
  } else if (str.split(".")[0].length === 9) {
    result = format(str.split(".")[0]);
  } else {
    result = format(str);
  }

  return result;
};

//将数组里某个属性相同的对象合并成一个数组(适用于组合购，目前使用有：活动列表页、确认认购页)
export const combineObjIntoAnArray = (resData) =>{
  let dataInfo = {};
  resData.forEach((item, index) => {
    let { productGroup } = item;
    if (!dataInfo[productGroup]) {
      dataInfo[productGroup] = {
        productGroup,
        child: []
      }
    }
    dataInfo[productGroup].child.push(item);
  });
  let list = Object.values(dataInfo); // list 转换成功的数据

  // 设置默认显示产品型号
  list = list.map((res, index)=>{
    res.child = res.child.map((child, idx)=>{
      child.isActive = false
      if(idx == 0){
        child.isActive = true
      }
      return child
    })
    return {
      ...res,
      ...res.child[0],
    }
  })
  return list
}

//将数组里某个属性相同的对象合并成一个数组(适用于组合购，目前使用有：我的抢购)
export const combineObjIntoAnArrayTwo = (resData) =>{
  let dataInfo = {};
  resData.forEach((item, index) => {
    let { productGroup } = item.actPro;
    if (!dataInfo[productGroup]) {
      dataInfo[productGroup] = {
        productGroup,
        child: []
      }
    }
    dataInfo[productGroup].child.push(item);
  });
  let list = Object.values(dataInfo); // list 转换成功的数据

  // 设置默认显示产品型号
  list = list.map((res, index)=>{
    return {
      ...res,
      ...res.child[0],
    }
  })
  return list
}

// 组合购提交前检测每组产品购买数量是否符合比例要求
export const checkCombinationPurchase = (resData) =>{
  let standardValArr = [] // 每个组实际要求数量
  let currValArr = [] // 每个组购买总数
  let multipleArr = [] // 每个组购买总数与实际要求数量成比例

  resData.forEach((val)=>{
    standardValArr.push(val.packageNum)
    currValArr.push(val.totleBuyNum)
    multipleArr.push(val.totleBuyNum%val.packageNum)
  })
  for(let i=0; i<currValArr.length; i++){
    if(currValArr[i]==0){
      return false
    }
  }
  for(let i=0; i<multipleArr.length; i++){
    if(multipleArr[i]!=0){
      return false
    }
  }

  let multiple = currValArr[0]/standardValArr[0] //先生成一个参考比例

  // 判断每组购买总数比例是否与实际要求比例相同
  for(let i=0; i<currValArr.length; i++){
    if(currValArr[i]/standardValArr[i] != multiple){
      return false
    }
  }

  return true
}

// 组合购认购套数和下单套数(适用于抢购)
export const combinationPurchaseNumberSets = (resData) =>{
  let buyNumAll = 0
  let orderNumberAll = 0
  resData[0].child.forEach((child, index)=>{
    buyNumAll += child.buyNum
    orderNumberAll += child.transNum
  })

  return {
    setsNumber: buyNumAll/resData[0].packageNum, // 组合购认购套数
    orderNumber: orderNumberAll/resData[0].packageNum, // 组合购下单套数
  }
}

// 根据id获取对应弹框提示
export const getAlertInfo = (id) =>{
  let msg = ''
  let currId = id
  let b2bAlert = wx.getStorageSync('b2b_alert')
  if(currId && b2bAlert){
    let result = JSON.parse(b2bAlert)
    result = result.filter((item)=>{
      return item.id == currId
    })

    if(result && result.length > 0){
      msg = result[0].msgDesc
    }
  }
  msg = msg.replace(/<\/br>/g, "\n").replace(/<br\/>/g, "\n")
  return msg
}

// 大于某个值显示某个值+
export const maximumLimit = (num, maxNum = 99) =>{
  if(num && num > maxNum){
    return maxNum + '+'
  }
  return num
}

// px转rpx
export const getRpx = (px) =>{
  let rpx = px * 750 / wx.getSystemInfoSync().windowWidth;
  return rpx
}

// 将路径里的第一个/和第二个/之间的内容替换成#(适用于小程序引入外部链接)
export const modifyUrl = (url) =>{
  let newUrl = url
  if(newUrl){
    // 将路径里的第一个/和第二个/之间的内容替换成#
    let urlKeyword = `/${newUrl.split('//')[1].split('/')[1]}/`
    newUrl = newUrl.replace(urlKeyword,'/#/')
  }
  return newUrl
}

// 获取协议域名
export const getDomain = (url) =>{
  let newUrl = url
  if(newUrl){
    let lead_slashes = newUrl.indexOf("//");
    let domain_start = lead_slashes + 2;
    let oHttp = newUrl.substring(0, domain_start); // 协议

    let without_resource = newUrl.substring(domain_start, newUrl.length);
    let next_slash = without_resource.indexOf("/");
    let domain = without_resource.substring(0, next_slash); //域名

    newUrl = oHttp + domain
  }
  return newUrl
}

// js判断是否为图片
export const isPicture = (suffix) =>{
  if(!suffix){
    return false
  }
  let suffixArr = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff', 'pic']
  return suffixArr.indexOf(suffix.toLowerCase()) !== -1;
}

//自定义加法运算
export const addNum = (num1: any, num2: any) => {
  let sq1,sq2,m;
  try {
    sq1 = num1.toString().split(".")[1].length;
  }
  catch (e) {
    sq1 = 0;
  }
  try {
    sq2 = num2.toString().split(".")[1].length;
  }
  catch (e) {
    sq2 = 0;
  }
  m = Math.pow(10,Math.max(sq1, sq2));
  return (num1 * m + num2 * m) / m;
}

//自定义乘法运算
export const mulNum = (arg1: any, arg2: any) => {
  let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  }catch(e){}
  try{
    m += s2.split(".")[1].length
  }catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

//移除空字符串或者非法字符串，返回""; 如果是合法字符串，则返回原值; @param obj 文本
export const removeIllegalStr = (obj) => {
  //typeof 返回的是字符串，有六种可能："number"、"string"、"boolean"、"object"、"function"、"undefined"
  if (typeof(obj) == "undefined" || obj === "" || obj === null || obj === "null" || obj.length == 0) {
    return "";
  } else {
    return obj;
  }
}

// 获取近⼀周时间
// 获取近⼀个⽉时间
// 获取近三个⽉时间
// 获取近半年时间
export const quickDateInterval = (type) => {
  let end = new Date();
  let year = end.getFullYear();
  let month = end.getMonth() + 1;//0-11表⽰1-12⽉
  let day = end.getDate();
  let dateObj = {
    start: '',
    end: '',
  };
  if(!type){
    return dateObj
  }
  let endYear = year
  let endMonth = month < 10 ? `0${month}` : month
  let endDay = day < 10 ? `0${day}` : day
  dateObj.end = endYear + '-' + endMonth + '-' + endDay;
  if(type === 'lastWeek'){ // 最近一周
    if (day - 7 <= 0) {   //如果在当⽉7⽇之前
      let startMonthDay = new Date(year, (parseInt(month) - 1), 0).getDate();    //1周前所在⽉的总天数
      if (month - 1 <= 0) { //如果在当年的1⽉份
        dateObj.start = (year - 1) + '-' + 12 + '-' + (31 - (7 - day));
      } else {
        dateObj.start = year + '-' + (month - 1) + '-' + (startMonthDay - (7 - day));
      }
    } else {
      dateObj.start = year + '-' + month + '-' + (day - 7);
    }
  }
  if(type === 'lastMonth'){ // 最近一个月
    let endMonthDay = new Date(year, month, 0).getDate();    //当前⽉的总天数
    if(month - 1 <= 0){ //如果是1⽉，年数往前推⼀年<br>
      dateObj.start = (year - 1) + '-' + 12 + '-' + day;
    }else{
      let startMonthDay = new Date(year, (parseInt(month) - 1), 0).getDate();
      if(startMonthDay < day){    //1个⽉前所在⽉的总天数⼩于现在的天⽇期
        if(day < endMonthDay){        //当前天⽇期⼩于当前⽉总天数
          dateObj.start = year + '-' + (month - 1) + '-' + (startMonthDay - (endMonthDay - day));
        }else{
          dateObj.start = year + '-' + (month - 1) + '-' + startMonthDay;
        }
      }else{
        dateObj.start = year + '-' + (month - 1) + '-' + day;
      }
    }
  }
  if(type === 'lastThreeMonths'){ // 最近三个月
    let endMonthDay = new Date(year, month, 0).getDate();    //当前⽉的总天数
    if(month - 3 <= 0){ //如果是1、2、3⽉，年数往前推⼀年
      let start3MonthDay = new Date((year - 1), (12 - (3 - parseInt(month))), 0).getDate();    //3个⽉前所在⽉的总天数
      if(start3MonthDay < day){    //3个⽉前所在⽉的总天数⼩于现在的天⽇期
        dateObj.start = (year - 1) + '-' + (12 - (3 - month)) + '-' + start3MonthDay;
      }else{
        dateObj.start = (year - 1) + '-' + (12 - (3 - month)) + '-' + day;
      }
    }else{
      let start3MonthDay = new Date(year, (parseInt(month) - 3), 0).getDate();    //3个⽉前所在⽉的总天数
      if(start3MonthDay < day){    //3个⽉前所在⽉的总天数⼩于现在的天⽇期
        if(day < endMonthDay){        //当前天⽇期⼩于当前⽉总天数,2⽉份⽐较特殊的⽉份
          dateObj.start = year + '-' + (month - 3) + '-' + (start3MonthDay - (endMonthDay - day));
        }else{
          dateObj.start = year + '-' + (month - 3) + '-' + start3MonthDay;
        }
      }else{
        dateObj.start = year + '-' + (month - 3) + '-' + day;
      }
    }
  }
  if(type === 'lastHalfYear'){ // 最近半年
    // 先获取当前时间
    let curDate = (new Date()).getTime();
    // 将半年的时间单位换算成毫秒
    let halfYear = 365 / 2 * 24 * 3600 * 1000;
    let pastResult = curDate - halfYear;  // 半年前的时间（毫秒单位）

    // 日期函数，定义起点为半年前
    let pastDate = new Date(pastResult),
    pastYear = pastDate.getFullYear(),
    pastMonth = pastDate.getMonth() + 1,
    pastDay = pastDate.getDate();
    dateObj.start = pastYear + '-' + pastMonth + '-' + pastDay;
  }
  let dateArr = dateObj.start.split('-')
  let startYear = dateArr[0]
  let startMonth = dateArr[1] < 10 ? `0${dateArr[1]}` : dateArr[1]
  let startDay = dateArr[2] < 10 ? `0${dateArr[2]}` : dateArr[2]
  dateObj.start = startYear + '-' + startMonth + '-' + startDay;
  return dateObj
}

export const getGreenCategoryPictures = (type) => {
  let url = `${wepy.$appConfig.baseUrl}/assets/images/potential/`
  switch(type){
    case 20160119001: // 电视
      return `${url}ds1.png`;
    case 20160119003: // 冰箱
      return `${url}bx1.png`;
    case 20160119005: // 冷柜
      return `${url}lg1.png`;
    case 20160119002: // 空调
      return `${url}kt1.png`;
    case 20160119004: // 洗衣机
      return `${url}xyj1.png`;
    case 20160119009: // 厨卫
      return `${url}cw1.png`;
    default:
      return '';
  }
}
export const getBlueCategoryPictures = (type) => {
  let url = `${wepy.$appConfig.baseUrl}/assets/images/potential/`
  switch(type){
    case 20160119001: // 电视
      return `${url}ds2.png`;
    case 20160119003: // 冰箱
      return `${url}bx2.png`;
    case 20160119005: // 冷柜
      return `${url}lg2.png`;
    case 20160119002: // 空调
      return `${url}kt2.png`;
    case 20160119004: // 洗衣机
      return `${url}xyj2.png`;
    case 20160119009: // 厨卫
      return `${url}cw2.png`;
    default:
      return '';
  }
}

// 获取当前年-月  'dividingLine'分割线 例如：'-'
export const getCurrentMonth = (dividingLine) =>{
  let date = new Date()
  let Y = date.getFullYear();
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let queryDate = Y + '' + M
  if(dividingLine){
    queryDate = Y + dividingLine + M
  }
  return queryDate
}
