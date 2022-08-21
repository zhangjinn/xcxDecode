"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../npm/wepy/lib/wepy.js');
var systemCache;
var log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
exports.getSystemInfo = function () { return new Promise(function (resolve, reject) {
    if (systemCache != null) {
        resolve(systemCache);
    }
    else {
        wx.getSystemInfo({
            success: function (_a) {
                var model = _a.model, screenHeight = _a.screenHeight, statusBarHeight = _a.statusBarHeight;
                var iphoneX = /iphone x/i.test(model);
                var iphoneNew = /iPhone11/i.test(model) && screenHeight === 812;
                systemCache = {
                    statusBarHeight: statusBarHeight,
                    isIPhoneX: iphoneX || iphoneNew,
                };
                resolve(systemCache);
            },
            fail: reject,
        });
    }
}); };
// 函数节流
function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500;
    }
    var _lastTime = null;
    // 返回新的函数
    return function () {
        var _nowTime = +new Date();
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments); // 将this和参数传给原函数
            _lastTime = _nowTime;
        }
    };
}
exports.throttle = throttle;
// 设置 storage
exports.setStorage = function (key, data) {
    try {
        wx.setStorageSync(key, data);
    }
    catch (e) {
        wx.setStorage({ key: key, data: data });
    }
};
// 删除 storage
exports.removeStorage = function (key) {
    try {
        wx.removeStorageSync(key);
    }
    catch (e) {
        wx.removeStorage({ key: key });
    }
};
// 获取 storage
exports.getStorage = function (key) {
    return new Promise(function (resolve, reject) {
        try {
            var res = wx.getStorageSync(key);
            resolve(res);
        }
        catch (e) {
            wx.getStorage({ key: key, success: function (wxRes) { resolve(wxRes); }, fail: function () { reject('数据获取失败'); } });
        }
    });
};
// 格式化图片
exports.formatImg = function (_a) {
    var name = _a.name, materialId = _a.materialId, itemId = _a.itemId, format = _a.format;
    var _b = wepy_1.default.$appConfig, baseUrl = _b.baseUrl, imgUrl = _b.imgUrl;
    var url = '';
    if (itemId && materialId && format) {
        url = imgUrl + "/productImages/" + materialId + "/" + itemId + "/" + format + "/" + name;
    }
    else {
        url = baseUrl + "/assets/new/images/product/" + name;
    }
    return url;
};
// 营销活动图片
exports.MarketFormatImg = function (_a) {
    var img = _a.img, defaultImg = _a.defaultImg;
    var _b = wepy_1.default.$appConfig, baseUrl = _b.baseUrl, imgUrl = _b.imgUrl;
    var url = '';
    if (img) {
        url = imgUrl + "/productImages/" + img;
    }
    else {
        url = baseUrl + "/" + defaultImg;
    }
    return url;
};
// 拼接DMS图片
exports.formatDmsImg = function (_a) {
    var model = _a.model, material = _a.material;
    var baseUrl = wepy_1.default.$appConfig.baseUrl;
    return {
        // img: `${baseUrl}/product/pic/${model}.nd`,
        img: baseUrl + "/product/pic.nd?model=" + model,
        err: baseUrl + "/assets/new/images/product/" + material + ".jpg"
    };
};
// 比较两个日期的大小
exports.getDateDiff = function (start, end) {
    var startDate = new Date(start);
    var endDate = new Date(end);
    return startDate.getTime() > endDate.getTime();
};
// 是否在日期范围内
exports.getDateRange = function (start, now, end) {
    var nowDate = new Date(now.replace(/-/g, '/'));
    var startDate = new Date(start.replace(/-/g, '/'));
    var endDate = new Date(end.replace(/-/g, '/'));
    var status = 'next';
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
};
// 时间格式化
exports.formatDate = function (date, type) {
    if (type === void 0) { type = 'Y-M-D h:m:s'; }
    var timestamp;
    var myDate;
    var hour;
    var time;
    if (date) {
        timestamp = parseInt(date, 10);
        if (timestamp < 10000) {
            timestamp = date;
        }
        if (typeof timestamp === 'number') {
            myDate = new Date(timestamp);
        }
        else {
            myDate = new Date(timestamp.replace(/-/g, '/'));
        }
        hour = myDate.getHours();
    }
    else {
        myDate = new Date();
        hour = myDate.getHours();
    }
    var Y = myDate.getFullYear();
    var M = myDate.getMonth() + 1 < 10 ? "0" + (myDate.getMonth() + 1) : myDate.getMonth() + 1;
    var D = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate();
    var h = hour < 10 ? "0" + hour : hour;
    var m = myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate.getMinutes();
    var s = myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds();
    time = type.replace('Y', Y);
    time = time.replace('M', M);
    time = time.replace('D', D);
    time = time.replace('h', h);
    time = time.replace('m', m);
    time = time.replace('s', s);
    return time;
};
exports.formatMobile = function (mobile) {
    if (mobile && mobile.length === 11) {
        return mobile.substr(0, 3) + "****" + mobile.substr(7, 11);
    }
    return mobile;
};
// 获取接口返回的 cookie
exports.getCookie = function (name, cookie) {
    // const reg = new RegExp(`${name}=([^;]*)(;|$)`);
    var reg = new RegExp(name + "=([^,;]+)(?=;|,)");
    var regStr = cookie.match(reg);
    var str = '';
    if (regStr) {
        str = unescape(regStr[1]);
    }
    return str;
};
// 数字补0
exports.fillZero = function (num) { return num.length > 1 ? num : "0" + num; };
exports.resetInfo = function (old, requestPayload, callback) {
    var infoMap = {};
    (requestPayload || []).forEach(function (newItemInfo) {
        infoMap[newItemInfo.productCode + "_" + newItemInfo.orgId] = newItemInfo;
    });
    old.forEach(function (oldItemInfo) {
        var key = oldItemInfo.productCode + "_" + oldItemInfo.orgId;
        if (infoMap[key]) {
            callback(oldItemInfo, infoMap[key]);
        }
    });
};
exports.filterGetPriceOrStock = function (result) {
    var loadingInventoryCode = [];
    var loadingInventoryOrgId = [];
    // const loadingInventoryOrgCode = []
    var loadingInventoryQueryType = '';
    var loadingPriceCode = [];
    var loadingPriceOrgId = [];
    var loadingPriceOrgCode = [];
    // dms库存价格查询
    var loadingDmsPrice = [];
    var loadingDmsInventory = [];
    var loadingDmsOrgId = [];
    // 获取需要动态获取的价格列表
    result.forEach(function (_a) {
        var isFenXiao = _a.isFenXiao, loadingInventory = _a.loadingInventory, loadingPrice = _a.loadingPrice, productCode = _a.productCode, orgId = _a.orgId, orgCode = _a.orgCode;
        if (isFenXiao !== 'Y') {
            if (loadingInventory) {
                loadingInventoryCode.push(productCode);
                loadingInventoryOrgId.push(orgId);
                // loadingInventoryOrgCode.push(orgCode)
                loadingInventoryQueryType = 'purchase';
            }
            if (loadingPrice) {
                loadingPriceCode.push(productCode);
                loadingPriceOrgId.push(orgId);
                loadingPriceOrgCode.push(orgCode);
            }
        }
        else {
            if (loadingInventory) {
                loadingInventoryCode.push(productCode);
                loadingInventoryOrgId.push(orgId);
                loadingInventoryQueryType = 'distribute';
            }
            loadingDmsOrgId.push(orgId);
            if (loadingInventory) {
                loadingDmsInventory.push(productCode);
            }
            if (loadingPrice) {
                loadingDmsPrice.push(productCode);
            }
        }
    });
    var loadingInfo = {};
    // 重新获取dms价格和库存
    if (loadingDmsPrice.length > 0) {
        loadingInfo.loadingDms = {
            orgId: loadingDmsOrgId.join(','),
            productId: loadingDmsPrice.join(','),
        };
    }
    if (loadingDmsInventory.length > 0) {
        loadingInfo.loadingDmsInventory = loadingDmsInventory;
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
        };
    }
    if (loadingPriceCode.length > 0) {
        // 需要重新获取价格
        loadingInfo.price = {
            code: loadingPriceCode.join(','),
            orgCode: loadingPriceOrgCode.join(','),
            orgId: loadingPriceOrgId.join(',')
        };
    }
    return loadingInfo;
};
exports.checkTel = function (tel) {
    var mobile = /^1[3|5|6|7|8|9]\d{9}$/, phone = /^0\d{2,3}-?\d{7,8}$/;
    return mobile.test(tel) || phone.test(tel);
};
exports.DX = function (n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(Math.floor(n * 1000 * 10 * Math.pow(10, i)) % (10 * 1000) / 1000)] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};
// 金额处理
exports.convertCurrencyAmt = function (amount) {
    if (typeof amount === 'number') {
        var p = /^[-]?\d+$/;
        var q = /(\d)(?=(\d{3})+(?!\d))/g;
        var value = undefined;
        if (p.test(amount)) {
            value = parseFloat(amount).toFixed(2);
            value = value.replace(q, "$1,");
            return value;
        }
        else {
            value = Math.round(parseFloat(amount) * 100) / 100;
            value = parseFloat(amount).toFixed(2);
            value = value.replace(q, "$1,");
            return value;
        }
    }
    else {
        return 0.00;
    }
};
// 获取当前时间的上个月的时间
exports.getLastMonthYesterday = function () {
    var date = new Date();
    var daysInMonth = new Array([0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]);
    var strYear = date.getFullYear();
    var strDay = date.getDate();
    var strMonth = date.getMonth() + 1;
    var lastMonthYesterday = '';
    if (strYear % 4 == 0 && strYear % 100 != 0) {
        daysInMonth[2] = 29;
    }
    if (strMonth - 1 == 0) {
        strYear -= 1;
        strMonth = 12;
    }
    else {
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
};
//js获取前天的日期
exports.previousDay = function () {
    var time = (new Date).getTime() - 24 * 60 * 60 * 1000;
    var oDay = new Date(time);
    oDay = oDay.getFullYear() + "/" + (oDay.getMonth() > 9 ? (oDay.getMonth() + 1) : "0" + (oDay.getMonth() + 1)) + "/" + (oDay.getDate() > 9 ? (oDay.getDate()) : "0" + (oDay.getDate()));
    return oDay;
};
//js获取明天的日期
exports.nextDay = function () {
    var time = (new Date).getTime() + 24 * 60 * 60 * 1000;
    var oDay = new Date(time);
    oDay = oDay.getFullYear() + "-" + (oDay.getMonth() > 9 ? (oDay.getMonth() + 1) : "0" + (oDay.getMonth() + 1)) + "-" + (oDay.getDate() > 9 ? (oDay.getDate()) : "0" + (oDay.getDate()));
    return oDay;
};
/**
 * 时间加减法 返回 str 格式 2019-4-10
 */
exports.addDate = function (date, days) {
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
};
/**
 * 时间加减法 返回 str 格式 2019-4-10
 */
exports.addMonth = function (date, month) {
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
};
// 获取近一个月/一年/去年一整年的日期
exports.getDateArea = function (type) {
    var date = new Date();
    var strYear = date.getFullYear();
    var strDay = date.getDate();
    var strMonth = date.getMonth() + 1;
    var returnDate = [];
    if (strMonth < 10) {
        strMonth = "0" + strMonth;
    }
    if (strDay < 10) {
        strDay = "0" + strDay;
    }
    if (type == '0') { //最近一个月
        returnDate.push(strYear + "-" + strMonth + "-01");
        returnDate.push(strYear + "-" + strMonth + "-" + strDay);
    }
    else if (type == '1') { //最近一年
        returnDate.push(strYear + "-01-01");
        returnDate.push(strYear + "-" + strMonth + "-" + strDay);
    }
    else { //去年一整年
        returnDate.push(strYear - 1 + "-01-01");
        returnDate.push(strYear - 1 + "-12-31");
    }
    return returnDate;
};
/** 根据时间戳 获取其月开始时间戳和结束时间戳 */
//示例getTimeStamp(new Date).startTime
exports.getTimeStamp = function (timeStamp) {
    var inDate = new Date(timeStamp);
    var year = inDate.getFullYear();
    var month = inDate.getMonth();
    var startTime = new Date(year, month, 1).getTime();
    var endTime = new Date(year, month + 1, 1).getTime() - 1;
    return {
        startTime: startTime,
        endTime: endTime
    };
};
exports.getUrl = function (api, sys) {
    // 增加cis访问微信接口判断 使用生产环境接口  测试环境经常调不通
    var url = '';
    var dmsRequest = false;
    if (api.includes('uploadXtw.do') || api.includes('addInspectionRecord2.do')) {
        // url = `http://xinshang.hisense.com:82/${api}`;
        url = wepy_1.default.$appConfig.ctsBaseUrl + "/" + api;
        ;
    }
    else if (api.indexOf('wechatEntrance/entrance.do') !== -1) {
        url = wepy_1.default.$appConfig.dmsBaseUrl + "/" + api;
        dmsRequest = true;
        // }else if(api.indexOf('235777') !== -1) {
    }
    else if (sys === 'finance') {
        url = wepy_1.default.$appConfig.financeBaseUrl + "/" + api;
    }
    else if (api.includes('queryCodeInfo.nd')) {
        url = "https://xtw.hisense.com/front/" + api;
    }
    else if (api.includes('queryCisOrderStatusInfoMobile')) {
        url = "" + api;
    }
    else if (api.includes('nearStores') || api.includes('queryAllMatkl') || api.includes('story-check')) {
        url = wepy_1.default.$appConfig.ctsBaseUrl + "/" + api;
        ;
    }
    else {
        //}else if(api.includes('queryCisOrderStatusInfoMobile')) {
        //  url = `${api}`;
        // } else {
        url = wepy_1.default.$appConfig.baseUrl + "/" + api;
    }
    var item = {
        dmsRequest: dmsRequest,
        url: url
    };
    return item;
};
exports.logInfo = function (logInfo) {
    if (!log)
        return;
    log.error.apply(log, logInfo);
};
//将数字以每三位一个逗号隔开
exports.formatNum = function (number) {
    if (!number) {
        return "0.0";
    }
    var str = number.toString();
    var newStr = "";
    var count = 0;
    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0 && str.charAt(i) != "-") {
                newStr = str.charAt(i) + "," + newStr;
            }
            else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        // 自动补小数点后两位
        return newStr;
    }
    else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0 && str.charAt(i) != "-") {
                newStr = str.charAt(i) + "," + newStr;
            }
            else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr + str.substr(str.indexOf("."), 3);
        return str;
    }
};
//金钱格式化
exports.numFormat = function (num) {
    var format = function (c) {
        var count = c.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return count;
    };
    var str = num.toFixed(2);
    var result = "";
    if (str.length > 9 && str.split(".")[0].length !== 9) {
        result = format(str.slice(0, 10));
    }
    else if (str.split(".")[0].length === 9) {
        result = format(str.split(".")[0]);
    }
    else {
        result = format(str);
    }
    return result;
};
//将数组里某个属性相同的对象合并成一个数组(适用于组合购，目前使用有：活动列表页、确认认购页)
exports.combineObjIntoAnArray = function (resData) {
    var dataInfo = {};
    resData.forEach(function (item, index) {
        var productGroup = item.productGroup;
        if (!dataInfo[productGroup]) {
            dataInfo[productGroup] = {
                productGroup: productGroup,
                child: []
            };
        }
        dataInfo[productGroup].child.push(item);
    });
    var list = Object.values(dataInfo); // list 转换成功的数据
    // 设置默认显示产品型号
    list = list.map(function (res, index) {
        res.child = res.child.map(function (child, idx) {
            child.isActive = false;
            if (idx == 0) {
                child.isActive = true;
            }
            return child;
        });
        return __assign({}, res, res.child[0]);
    });
    return list;
};
//将数组里某个属性相同的对象合并成一个数组(适用于组合购，目前使用有：我的抢购)
exports.combineObjIntoAnArrayTwo = function (resData) {
    var dataInfo = {};
    resData.forEach(function (item, index) {
        var productGroup = item.actPro.productGroup;
        if (!dataInfo[productGroup]) {
            dataInfo[productGroup] = {
                productGroup: productGroup,
                child: []
            };
        }
        dataInfo[productGroup].child.push(item);
    });
    var list = Object.values(dataInfo); // list 转换成功的数据
    // 设置默认显示产品型号
    list = list.map(function (res, index) {
        return __assign({}, res, res.child[0]);
    });
    return list;
};
// 组合购提交前检测每组产品购买数量是否符合比例要求
exports.checkCombinationPurchase = function (resData) {
    var standardValArr = []; // 每个组实际要求数量
    var currValArr = []; // 每个组购买总数
    var multipleArr = []; // 每个组购买总数与实际要求数量成比例
    resData.forEach(function (val) {
        standardValArr.push(val.packageNum);
        currValArr.push(val.totleBuyNum);
        multipleArr.push(val.totleBuyNum % val.packageNum);
    });
    for (var i = 0; i < currValArr.length; i++) {
        if (currValArr[i] == 0) {
            return false;
        }
    }
    for (var i = 0; i < multipleArr.length; i++) {
        if (multipleArr[i] != 0) {
            return false;
        }
    }
    var multiple = currValArr[0] / standardValArr[0]; //先生成一个参考比例
    // 判断每组购买总数比例是否与实际要求比例相同
    for (var i = 0; i < currValArr.length; i++) {
        if (currValArr[i] / standardValArr[i] != multiple) {
            return false;
        }
    }
    return true;
};
// 组合购认购套数和下单套数(适用于抢购)
exports.combinationPurchaseNumberSets = function (resData) {
    var buyNumAll = 0;
    var orderNumberAll = 0;
    resData[0].child.forEach(function (child, index) {
        buyNumAll += child.buyNum;
        orderNumberAll += child.transNum;
    });
    return {
        setsNumber: buyNumAll / resData[0].packageNum,
        orderNumber: orderNumberAll / resData[0].packageNum,
    };
};
// 根据id获取对应弹框提示
exports.getAlertInfo = function (id) {
    var msg = '';
    var currId = id;
    var b2bAlert = wx.getStorageSync('b2b_alert');
    if (currId && b2bAlert) {
        var result = JSON.parse(b2bAlert);
        result = result.filter(function (item) {
            return item.id == currId;
        });
        if (result && result.length > 0) {
            msg = result[0].msgDesc;
        }
    }
    msg = msg.replace(/<\/br>/g, "\n").replace(/<br\/>/g, "\n");
    return msg;
};
// 大于某个值显示某个值+
exports.maximumLimit = function (num, maxNum) {
    if (maxNum === void 0) { maxNum = 99; }
    if (num && num > maxNum) {
        return maxNum + '+';
    }
    return num;
};
// px转rpx
exports.getRpx = function (px) {
    var rpx = px * 750 / wx.getSystemInfoSync().windowWidth;
    return rpx;
};
// 将路径里的第一个/和第二个/之间的内容替换成#(适用于小程序引入外部链接)
exports.modifyUrl = function (url) {
    var newUrl = url;
    if (newUrl) {
        // 将路径里的第一个/和第二个/之间的内容替换成#
        var urlKeyword = "/" + newUrl.split('//')[1].split('/')[1] + "/";
        newUrl = newUrl.replace(urlKeyword, '/#/');
    }
    return newUrl;
};
// 获取协议域名
exports.getDomain = function (url) {
    var newUrl = url;
    if (newUrl) {
        var lead_slashes = newUrl.indexOf("//");
        var domain_start = lead_slashes + 2;
        var oHttp = newUrl.substring(0, domain_start); // 协议
        var without_resource = newUrl.substring(domain_start, newUrl.length);
        var next_slash = without_resource.indexOf("/");
        var domain = without_resource.substring(0, next_slash); //域名
        newUrl = oHttp + domain;
    }
    return newUrl;
};
// js判断是否为图片
exports.isPicture = function (suffix) {
    if (!suffix) {
        return false;
    }
    var suffixArr = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff', 'pic'];
    return suffixArr.indexOf(suffix.toLowerCase()) !== -1;
};
//自定义加法运算
exports.addNum = function (num1, num2) {
    var sq1, sq2, m;
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
    m = Math.pow(10, Math.max(sq1, sq2));
    return (num1 * m + num2 * m) / m;
};
//自定义乘法运算
exports.mulNum = function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) { }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};
//移除空字符串或者非法字符串，返回""; 如果是合法字符串，则返回原值; @param obj 文本
exports.removeIllegalStr = function (obj) {
    //typeof 返回的是字符串，有六种可能："number"、"string"、"boolean"、"object"、"function"、"undefined"
    if (typeof (obj) == "undefined" || obj === "" || obj === null || obj === "null" || obj.length == 0) {
        return "";
    }
    else {
        return obj;
    }
};
// 获取近⼀周时间
// 获取近⼀个⽉时间
// 获取近三个⽉时间
// 获取近半年时间
exports.quickDateInterval = function (type) {
    var end = new Date();
    var year = end.getFullYear();
    var month = end.getMonth() + 1; //0-11表⽰1-12⽉
    var day = end.getDate();
    var dateObj = {
        start: '',
        end: '',
    };
    if (!type) {
        return dateObj;
    }
    var endYear = year;
    var endMonth = month < 10 ? "0" + month : month;
    var endDay = day < 10 ? "0" + day : day;
    dateObj.end = endYear + '-' + endMonth + '-' + endDay;
    if (type === 'lastWeek') { // 最近一周
        if (day - 7 <= 0) { //如果在当⽉7⽇之前
            var startMonthDay = new Date(year, (parseInt(month) - 1), 0).getDate(); //1周前所在⽉的总天数
            if (month - 1 <= 0) { //如果在当年的1⽉份
                dateObj.start = (year - 1) + '-' + 12 + '-' + (31 - (7 - day));
            }
            else {
                dateObj.start = year + '-' + (month - 1) + '-' + (startMonthDay - (7 - day));
            }
        }
        else {
            dateObj.start = year + '-' + month + '-' + (day - 7);
        }
    }
    if (type === 'lastMonth') { // 最近一个月
        var endMonthDay = new Date(year, month, 0).getDate(); //当前⽉的总天数
        if (month - 1 <= 0) { //如果是1⽉，年数往前推⼀年<br>
            dateObj.start = (year - 1) + '-' + 12 + '-' + day;
        }
        else {
            var startMonthDay = new Date(year, (parseInt(month) - 1), 0).getDate();
            if (startMonthDay < day) { //1个⽉前所在⽉的总天数⼩于现在的天⽇期
                if (day < endMonthDay) { //当前天⽇期⼩于当前⽉总天数
                    dateObj.start = year + '-' + (month - 1) + '-' + (startMonthDay - (endMonthDay - day));
                }
                else {
                    dateObj.start = year + '-' + (month - 1) + '-' + startMonthDay;
                }
            }
            else {
                dateObj.start = year + '-' + (month - 1) + '-' + day;
            }
        }
    }
    if (type === 'lastThreeMonths') { // 最近三个月
        var endMonthDay = new Date(year, month, 0).getDate(); //当前⽉的总天数
        if (month - 3 <= 0) { //如果是1、2、3⽉，年数往前推⼀年
            var start3MonthDay = new Date((year - 1), (12 - (3 - parseInt(month))), 0).getDate(); //3个⽉前所在⽉的总天数
            if (start3MonthDay < day) { //3个⽉前所在⽉的总天数⼩于现在的天⽇期
                dateObj.start = (year - 1) + '-' + (12 - (3 - month)) + '-' + start3MonthDay;
            }
            else {
                dateObj.start = (year - 1) + '-' + (12 - (3 - month)) + '-' + day;
            }
        }
        else {
            var start3MonthDay = new Date(year, (parseInt(month) - 3), 0).getDate(); //3个⽉前所在⽉的总天数
            if (start3MonthDay < day) { //3个⽉前所在⽉的总天数⼩于现在的天⽇期
                if (day < endMonthDay) { //当前天⽇期⼩于当前⽉总天数,2⽉份⽐较特殊的⽉份
                    dateObj.start = year + '-' + (month - 3) + '-' + (start3MonthDay - (endMonthDay - day));
                }
                else {
                    dateObj.start = year + '-' + (month - 3) + '-' + start3MonthDay;
                }
            }
            else {
                dateObj.start = year + '-' + (month - 3) + '-' + day;
            }
        }
    }
    if (type === 'lastHalfYear') { // 最近半年
        // 先获取当前时间
        var curDate = (new Date()).getTime();
        // 将半年的时间单位换算成毫秒
        var halfYear = 365 / 2 * 24 * 3600 * 1000;
        var pastResult = curDate - halfYear; // 半年前的时间（毫秒单位）
        // 日期函数，定义起点为半年前
        var pastDate = new Date(pastResult), pastYear = pastDate.getFullYear(), pastMonth = pastDate.getMonth() + 1, pastDay = pastDate.getDate();
        dateObj.start = pastYear + '-' + pastMonth + '-' + pastDay;
    }
    var dateArr = dateObj.start.split('-');
    var startYear = dateArr[0];
    var startMonth = dateArr[1] < 10 ? "0" + dateArr[1] : dateArr[1];
    var startDay = dateArr[2] < 10 ? "0" + dateArr[2] : dateArr[2];
    dateObj.start = startYear + '-' + startMonth + '-' + startDay;
    return dateObj;
};
exports.getGreenCategoryPictures = function (type) {
    var url = wepy_1.default.$appConfig.baseUrl + "/assets/images/potential/";
    switch (type) {
        case 20160119001: // 电视
            return url + "ds1.png";
        case 20160119003: // 冰箱
            return url + "bx1.png";
        case 20160119005: // 冷柜
            return url + "lg1.png";
        case 20160119002: // 空调
            return url + "kt1.png";
        case 20160119004: // 洗衣机
            return url + "xyj1.png";
        case 20160119009: // 厨卫
            return url + "cw1.png";
        default:
            return '';
    }
};
exports.getBlueCategoryPictures = function (type) {
    var url = wepy_1.default.$appConfig.baseUrl + "/assets/images/potential/";
    switch (type) {
        case 20160119001: // 电视
            return url + "ds2.png";
        case 20160119003: // 冰箱
            return url + "bx2.png";
        case 20160119005: // 冷柜
            return url + "lg2.png";
        case 20160119002: // 空调
            return url + "kt2.png";
        case 20160119004: // 洗衣机
            return url + "xyj2.png";
        case 20160119009: // 厨卫
            return url + "cw2.png";
        default:
            return '';
    }
};
// 获取当前年-月  'dividingLine'分割线 例如：'-'
exports.getCurrentMonth = function (dividingLine) {
    var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var queryDate = Y + '' + M;
    if (dividingLine) {
        queryDate = Y + dividingLine + M;
    }
    return queryDate;
};
