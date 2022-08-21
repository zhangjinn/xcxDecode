"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var order_1 = require('./../types/order.js');
var index_1 = require('./../../utils/index.js');
var getCommonInfo = function (payload) {
    var provinceArr = [];
    var provinceId = '';
    var cityId = '';
    var areaId = '';
    // 供应商和物料组
    var orgId = '';
    var matklId = '';
    if (payload.orgAndGroup) {
        var orgOrmatCode = payload.orgAndGroup.trim().split("-");
        orgId = orgOrmatCode[0] || '';
        matklId = orgOrmatCode[1] || '';
    }
    else if (payload && payload.cartOrder) {
        orgId = payload.cartOrder.orgId || '';
        matklId = payload.cartOrder.matklId || '';
    }
    // 开票户头
    var bill = {};
    var bills = [];
    // 收货地址
    var addresses = [];
    // 默认地址收货地址
    var receiver = {
        address: '请选择',
    };
    // 配送方式: 只有 直配到用户-502004 才有选择地址 分销商-502005 有分销商选择和分销商地址选择
    var deliveries = [];
    // 默认配送方式
    var delivery = {};
    // 分销商
    var custMarkets = [];
    var custMarket = {};
    // 分销商地址
    var custMarketsAddress = [];
    var custMarketAddress = {};
    // 结算信息
    var deadMaxDate = '';
    var deadMinDate = '';
    // 结算方式
    var orderType = '01';
    // 直送地址
    var toAddress = {};
    // 采购单号
    var takeCode = '';
    // 提交订单其他参数
    var versions = (payload.cartOrder && payload.cartOrder.versions) || '';
    var carts = (payload.cartOrder && payload.cartOrder.carts) || '';
    var orgAndGroup = (payload.cartOrder && payload.cartOrder.orgAndGroup) || '';
    var _a = payload.cartOrder, billToDTOs = _a.billToDTOs, _b = _a.custMarketModelDtos, custMarketModelDtos = _b === void 0 ? [] : _b, marketAddress = _a.marketAddress, customerAddressDTOs = _a.customerAddressDTOs, deliveryList = _a.deliveryList, maxDate = _a.maxDate, minDate = _a.minDate, tradeType = _a.tradeType, defaultProvice = _a.defaultProvice, defaultCity = _a.defaultCity, defaultDistrict = _a.defaultDistrict, defaultContcat = _a.defaultContcat, defaultMobile = _a.defaultMobile, provices = _a.provices, citys = _a.citys, districts = _a.districts, purchaseCode = _a.purchaseCode, advancePayRate = _a.advancePayRate, purchaseType = _a.purchaseType, isPujie = _a.isPujie;
    deadMaxDate = maxDate;
    deadMinDate = minDate;
    orderType = tradeType;
    // 默认地址
    provinceArr = ramda_1.map(function (_a) {
        var id = _a.id, provinceCode = _a.provinceCode, provinceName = _a.provinceName;
        return ({ id: id, name: provinceName, code: provinceCode, level: 1 });
    }, provices);
    provinceId = defaultProvice;
    cityId = defaultCity;
    areaId = defaultDistrict;
    takeCode = purchaseCode;
    // 开票户头
    bills = ramda_1.map(function (_a) {
        var id = _a.id, drawerName = _a.drawerName, drawerCode = _a.drawerCode;
        return ({
            id: id, drawerName: drawerName, drawerCode: drawerCode,
        });
    }, billToDTOs);
    if (bills && bills.length > 0) {
        bill = ramda_1.head(bills);
    }
    // 收货地址
    addresses = ramda_1.map(function (_a) {
        var id = _a.id, provinceCode = _a.provinceCode, cityCode = _a.cityCode, areaCode = _a.areaCode, address = _a.address, contactPerson = _a.contactPerson, contactPersonTel = _a.contactPersonTel, defaultType = _a.defaultType, regionStatus = _a.regionStatus;
        return ({ id: id, provinceCode: provinceCode, cityCode: cityCode, areaCode: areaCode, name: address, contactPerson: contactPerson, contactPersonTel: contactPersonTel.replace('\u202d', '').replace('\u202c', ''), defaultType: defaultType, regionStatus: regionStatus });
    }, customerAddressDTOs);
    if (addresses && addresses.length > 0 && addresses[0].regionStatus === 'A') {
        receiver = ramda_1.head(addresses);
    }
    // 再来一单 重置上面的 receiver 默认联系人和联系方式 defaultContcat, defaultMobile
    if (defaultContcat) {
        receiver.contactPerson = defaultContcat;
    }
    if (defaultMobile) {
        receiver.contactPersonTel = defaultMobile.replace('\u202d', '').replace('\u202c', '');
    }
    // 配送方式
    deliveries = ramda_1.map(function (_a) {
        var id = _a.id, propertyName = _a.propertyName;
        return ({ id: id, propertyName: propertyName });
    }, deliveryList);
    if (deliveries && deliveries.length > 0) {
        delivery = ramda_1.head(deliveries);
    }
    // 分销商
    if (ramda_1.is(Array, custMarketModelDtos)) {
        custMarkets = ramda_1.map(function (_a) {
            var customerInfoId = _a.customerInfoId, customerInfoName = _a.customerInfoName;
            return ({ id: customerInfoId, name: customerInfoName });
        }, custMarketModelDtos);
        if (custMarkets && custMarkets.length > 0) {
            custMarket = ramda_1.head(custMarkets);
        }
    }
    if (ramda_1.is(Array, marketAddress)) {
        // 分销商地址
        custMarketsAddress = ramda_1.map(function (_a) {
            var id = _a.id, provinceCode = _a.provinceCode, cityCode = _a.cityCode, areaCode = _a.areaCode, address = _a.address, contactPerson = _a.contactPerson, contactPersonTel = _a.contactPersonTel;
            return ({ id: id, provinceCode: provinceCode, cityCode: cityCode, areaCode: areaCode, name: address, contactPerson: contactPerson, contactPersonTel: contactPersonTel.replace('\u202d', '').replace('\u202c', '') });
        }, marketAddress);
        if (custMarketsAddress && custMarketsAddress.length > 0) {
            custMarketAddress = ramda_1.head(custMarketsAddress);
        }
    }
    // 直送地址
    toAddress = {
        id: defaultDistrict,
        name: '',
    };
    var toProvince = ramda_1.find(ramda_1.propEq('provinceCode', defaultProvice), provices) || {};
    var toCity = ramda_1.find(ramda_1.propEq('cityCode', defaultCity), citys) || {};
    var toDistricts = ramda_1.find(ramda_1.propEq('districtCode', defaultDistrict), districts) || {};
    if (toProvince.id) {
        toAddress.name += toProvince.provinceName;
    }
    if (toCity.id) {
        toAddress.name += toCity.cityName;
    }
    if (toDistricts.id) {
        toAddress.name += toDistricts.districtName;
    }
    //是否启用共享
    var shareFlag = payload.shareFlag;
    //办事处列表
    var offices = [];
    var office = {};
    //启用共享仓
    if (shareFlag === 'Y') {
        ramda_1.forEach(function (item) {
            var office = {};
            office.id = item.code;
            office.name = item.name;
            offices.push(office);
        }, payload.office);
    }
    if (offices && offices.length > 0) {
        office = ramda_1.head(offices);
    }
    // 销售所属门店
    var salesShopInfoId = payload.salesShopInfoId;
    return {
        bill: bill,
        bills: bills,
        orgId: orgId,
        matklId: matklId,
        custMarkets: custMarkets,
        custMarket: custMarket,
        custMarketsAddress: custMarketsAddress,
        custMarketAddress: custMarketAddress,
        toAddress: toAddress,
        receiver: receiver,
        addresses: addresses,
        delivery: delivery,
        deliveries: deliveries,
        deadMaxDate: deadMaxDate,
        deadMinDate: deadMinDate,
        provinceArr: provinceArr,
        provinceId: provinceId,
        cityId: cityId,
        areaId: areaId,
        orderType: orderType,
        versions: versions,
        carts: carts,
        orgAndGroup: orgAndGroup,
        takeCode: takeCode,
        advancePayRate: advancePayRate,
        purchaseType: purchaseType,
        isPujie: isPujie,
        shareFlag: shareFlag,
        offices: offices,
        office: office,
        salesShopInfoId: salesShopInfoId
    };
};
var getActivityInfo = function (payload) {
    var provinceArr = [];
    var provinceId = '';
    var cityId = '';
    var areaId = '';
    // 供应商和物料组
    var orgId = '';
    var matklId = '';
    if (payload.orgAndGroup) {
        var orgOrmatCode = payload.orgAndGroup.trim().split("-");
        orgId = orgOrmatCode[0] || '';
        matklId = orgOrmatCode[1] || '';
    }
    else {
        orgId = payload.orgId || '';
        matklId = payload.matklId || '';
    }
    // 开票户头
    var bill = {};
    var bills = [];
    // 收货地址
    var addresses = [];
    // 默认地址收货地址
    var receiver = {
        address: '请选择',
    };
    // 配送方式: 只有 直配到用户-502004 才有选择地址 分销商-502005 有分销商选择和分销商地址选择
    var deliveries = [];
    // 默认配送方式
    var delivery = {};
    // 分销商
    var custMarkets = [];
    var custMarket = {};
    // 分销商地址
    var custMarketsAddress = [];
    var custMarketAddress = {};
    var custActivity = {};
    // 结算信息
    var deadMaxDate = '';
    var deadMinDate = '';
    // 结算方式
    var orderType = '01';
    // 直送地址
    var toAddress = {};
    // 采购单号
    var takeCode = '';
    // 提交订单其他参数
    var versions = (payload.cartOrder && payload.cartOrder.versions) || '';
    var carts = (payload.cartOrder && payload.cartOrder.carts) || '';
    var orgAndGroup = (payload.cartOrder && payload.cartOrder.orgAndGroup) || '';
    var billToDTOs = payload.billToDTOs, _a = payload.custMarketModels, custMarketModels = _a === void 0 ? [] : _a, marketAddress = payload.marketAddress, activityList = payload.activityList, customerAddressDTOs = payload.customerAddressDTOs, deliveryList = payload.deliveryList, maxEndDate = payload.maxEndDate, minDate = payload.minDate, tradeType = payload.tradeType, defaultProvice = payload.defaultProvice, defaultCity = payload.defaultCity, defaultDistrict = payload.defaultDistrict, defaultContcat = payload.defaultContcat, defaultMobile = payload.defaultMobile, provices = payload.provices, citys = payload.citys, districts = payload.districts, purchaseCode = payload.purchaseCode, shareFlag = payload.shareFlag;
    deadMaxDate = maxEndDate;
    deadMinDate = minDate;
    orderType = tradeType;
    // 默认地址
    if (provices) {
        provinceArr = ramda_1.map(function (_a) {
            var id = _a.id, provinceCode = _a.provinceCode, provinceName = _a.provinceName;
            return ({ id: id, name: provinceName, code: provinceCode, level: 1 });
        }, provices);
    }
    provinceId = defaultProvice;
    cityId = defaultCity;
    areaId = defaultDistrict;
    takeCode = purchaseCode;
    // 开票户头
    if (billToDTOs) {
        bills = ramda_1.map(function (_a) {
            var id = _a.id, drawerName = _a.drawerName, drawerCode = _a.drawerCode;
            return ({
                id: id, drawerName: drawerName, drawerCode: drawerCode,
            });
        }, billToDTOs);
    }
    if (bills && bills.length > 0) {
        bill = ramda_1.head(bills);
    }
    // 收货地址
    if (customerAddressDTOs) {
        addresses = ramda_1.map(function (_a) {
            var id = _a.id, provinceCode = _a.provinceCode, cityCode = _a.cityCode, areaCode = _a.areaCode, address = _a.address, contactPerson = _a.contactPerson, contactPersonTel = _a.contactPersonTel, defaultType = _a.defaultType, regionStatus = _a.regionStatus;
            return ({ id: id, provinceCode: provinceCode, cityCode: cityCode, areaCode: areaCode, name: address, contactPerson: contactPerson, contactPersonTel: contactPersonTel.replace('\u202d', '').replace('\u202c', ''), defaultType: defaultType, regionStatus: regionStatus });
        }, customerAddressDTOs);
    }
    if (addresses && addresses.length > 0 && addresses[0].regionStatus === 'A') { // 判断行政区域地址库是否失效 A有效，D失效。有效才赋默认值
        receiver = ramda_1.head(addresses);
    }
    // 再来一单 重置上面的 receiver 默认联系人和联系方式 defaultContcat, defaultMobile
    if (defaultContcat) {
        receiver.contactPerson = defaultContcat;
    }
    if (defaultMobile) {
        receiver.contactPersonTel = defaultMobile.replace('\u202d', '').replace('\u202c', '');
    }
    // 配送方式
    if (deliveryList) {
        deliveries = ramda_1.map(function (_a) {
            var id = _a.id, propertyName = _a.propertyName;
            return ({ id: id, propertyName: propertyName });
        }, deliveryList);
    }
    if (deliveries && deliveries.length > 0) {
        delivery = ramda_1.head(deliveries);
    }
    // 分销商
    if (ramda_1.is(Array, custMarketModels)) {
        custMarkets = ramda_1.map(function (_a) {
            var customerInfoId = _a.customerInfoId, customerInfoName = _a.customerInfoName;
            return ({ id: customerInfoId, name: customerInfoName });
        }, custMarketModels);
        if (custMarkets && custMarkets.length > 0) {
            custMarket = ramda_1.head(custMarkets);
        }
    }
    if (ramda_1.is(Array, marketAddress)) {
        // 分销商地址
        custMarketsAddress = ramda_1.map(function (_a) {
            var id = _a.id, provinceCode = _a.provinceCode, cityCode = _a.cityCode, areaCode = _a.areaCode, address = _a.address, contactPerson = _a.contactPerson, contactPersonTel = _a.contactPersonTel;
            return ({ id: id, provinceCode: provinceCode, cityCode: cityCode, areaCode: areaCode, name: address, contactPerson: contactPerson, contactPersonTel: contactPersonTel.replace('\u202d', '').replace('\u202c', '') });
        }, marketAddress);
        if (custMarketsAddress && custMarketsAddress.length > 0) {
            custMarketAddress = ramda_1.head(custMarketsAddress);
        }
    }
    if (ramda_1.is(Array, activityList)) {
        // 活动列表
        if (activityList && activityList.length > 0) {
            custActivity = ramda_1.head(activityList);
        }
    }
    // 直送地址
    toAddress = {
        id: defaultDistrict,
        name: '',
    };
    var toProvince = provices ? ramda_1.find(ramda_1.propEq('provinceCode', defaultProvice), provices) || {} : {};
    var toCity = citys ? ramda_1.find(ramda_1.propEq('cityCode', defaultCity), citys) || {} : {};
    var toDistricts = districts ? ramda_1.find(ramda_1.propEq('districtCode', defaultDistrict), districts) || {} : {};
    if (toProvince.id) {
        toAddress.name += toProvince.provinceName;
    }
    if (toCity.id) {
        toAddress.name += toCity.cityName;
    }
    if (toDistricts.id) {
        toAddress.name += toDistricts.districtName;
    }
    //办事处列表
    var offices = [];
    var office = {};
    //启用共享仓
    if (shareFlag === 'Y') {
        ramda_1.forEach(function (item) {
            var office = {};
            office.id = item.code;
            office.name = item.name;
            offices.push(office);
        }, payload.office);
    }
    if (offices && offices.length > 0) {
        office = ramda_1.head(offices);
    }
    return {
        shareFlag: shareFlag,
        offices: offices,
        office: office,
        bill: bill,
        bills: bills,
        orgId: orgId,
        matklId: matklId,
        custMarkets: custMarkets,
        custMarket: custMarket,
        custMarketsAddress: custMarketsAddress,
        custMarketAddress: custMarketAddress,
        toAddress: toAddress,
        receiver: receiver,
        addresses: addresses,
        delivery: delivery,
        deliveries: deliveries,
        deadMaxDate: deadMaxDate,
        deadMinDate: deadMinDate,
        provinceArr: provinceArr,
        provinceId: provinceId,
        cityId: cityId,
        areaId: areaId,
        orderType: orderType,
        custActivity: custActivity,
        versions: versions,
        carts: carts,
        orgAndGroup: orgAndGroup,
        takeCode: takeCode,
    };
};
exports.default = redux_actions_1.handleActions((_a = {},
    _a[order_1.RESET_ORDER_LIST] = function (state, action) {
        return __assign({}, state, { orderList: [] });
    },
    _a[order_1.GET_ORDER_DELIVERY_METHOD] = function (state, action) {
        var list = action.payload.list;
        var item = {
            code: '',
            name: '全部',
            desc: null
        };
        list.unshift(item);
        return __assign({}, state, { deliveryMethod: list });
    },
    _a[order_1.TAKE_ACTIVITY_COMMON] = function (state, action) {
        var payload = action.payload;
        var common = {};
        // 商品
        var items = [];
        // 商品数量
        var totalNum = 0;
        var totalDeposit = 0;
        var balance = {};
        var actCode = '';
        var isPackageOrder = '';
        var isFenXiao = '';
        var discountTypeName = '';
        var isPurchaseStandard = true; // 组合购购买产品数量是否符合标准（默认不符合标准）
        var agentArr = {
            agentName: '',
            agentCode: ''
        };
        // 基本订单信息
        if (payload && payload.code == 1) {
            common = payload;
        }
        else {
            common = getActivityInfo(payload);
            ramda_1.forEach(function (_a) {
                var id = _a.id, deposit = _a.deposit, color = _a.color, img = _a.img, rebateMoney = _a.rebateMoney, billPrice = _a.billPrice, defaultImg = _a.defaultImg, discountTypeName = _a.discountTypeName, productInfoId = _a.productInfoId, fwOrgId = _a.fwOrgId, fwOrgCode = _a.fwOrgCode, fwOrgName = _a.fwOrgName, productName = _a.productName, specialPrice = _a.specialPrice, standardPrice = _a.standardPrice, priceGroupName = _a.priceGroupName, buyQty = _a.buyQty, makeUpTypeName = _a.makeUpTypeName, materialGroup = _a.materialGroup, policyName = _a.policyName, specialPriceVcode = _a.specialPriceVcode, isPackage = _a.isPackage, packageNum = _a.packageNum, discountTypeId = _a.discountTypeId, matklCode = _a.matklCode, productGroupRemark = _a.productGroupRemark, productGroup = _a.productGroup, packageCode = _a.packageCode, productInfoZzprdmodel = _a.productInfoZzprdmodel, purchaseLimitQty = _a.purchaseLimitQty;
                totalNum = ramda_1.add(totalNum, buyQty); // 组合购购买产品总数
                totalDeposit = ramda_1.add(totalDeposit, deposit * buyQty); // 组合购》认购》定金总和
                isPackageOrder = isPackage;
                items.push({
                    id: id,
                    discountTypeName: discountTypeName,
                    discountTypeId: discountTypeId,
                    isPackage: isPackage,
                    rebateMoney: rebateMoney,
                    color: color,
                    deposit: deposit,
                    orgId: fwOrgId,
                    orgCode: fwOrgCode,
                    fwOrgName: fwOrgName,
                    productId: productInfoId,
                    productName: productName,
                    price: billPrice,
                    specialPrice: specialPrice,
                    standardPrice: standardPrice,
                    priceGroupName: priceGroupName,
                    quantity: buyQty,
                    // maxQty: buyQty,
                    maxQty: purchaseLimitQty,
                    makeUpTypeName: makeUpTypeName,
                    src: img ? index_1.MarketFormatImg({ img: img }) : img,
                    errImg: defaultImg ? index_1.MarketFormatImg({ defaultImg: defaultImg }) : defaultImg,
                    policyName: policyName,
                    specialPriceVcode: specialPriceVcode,
                    packageNum: packageNum,
                    matklCode: matklCode,
                    productGroupRemark: productGroupRemark,
                    productGroup: productGroup,
                    packageCode: packageCode,
                    productInfoZzprdmodel: productInfoZzprdmodel,
                });
            }, payload.activityList);
            balance = payload.balanceDTO;
            actCode = payload.actCode || '';
            isFenXiao = payload.isFenXiao || '';
            if (isFenXiao == 'Y' && payload.agentName) {
                var arr = payload.agentName.trim().split("-");
                agentArr.agentCode = arr[0],
                    agentArr.agentName = arr[1];
            }
        }
        var matklCodeArr = [];
        var MatklCodeAll = [];
        items.forEach(function (item, index) {
            matklCodeArr.push(item.matklCode);
        });
        function uniq(array) {
            var temp = []; //一个新的临时数组
            for (var i = 0; i < array.length; i++) {
                if (temp.indexOf(array[i]) == -1) {
                    temp.push(array[i]);
                }
            }
            return temp;
        }
        MatklCodeAll = uniq(matklCodeArr);
        if (items.length) {
            discountTypeName = items[0].discountTypeName;
            if (items[0].discountTypeName == '组合购') {
                var combinationPurchaseList_1 = [];
                //组合购将数组里'productGroup'属性相同的对象合并成一个数组
                combinationPurchaseList_1 = index_1.combineObjIntoAnArray(items);
                combinationPurchaseList_1.forEach(function (item, index) {
                    var totleBuyNum = 0;
                    item.child.forEach(function (val, i) {
                        totleBuyNum += val.quantity;
                    });
                    combinationPurchaseList_1[index].isFold = true;
                    combinationPurchaseList_1[index].totleBuyNum = totleBuyNum;
                });
                items = combinationPurchaseList_1;
                isPurchaseStandard = index_1.checkCombinationPurchase(items);
            }
        }
        return __assign({}, state, { common: common, commonOrder: __assign({ isPackage: isPackageOrder, items: items,
                discountTypeName: discountTypeName,
                totalNum: totalNum,
                totalDeposit: totalDeposit,
                isPurchaseStandard: isPurchaseStandard }, balance, { actCode: actCode,
                isFenXiao: isFenXiao,
                agentArr: agentArr,
                MatklCodeAll: MatklCodeAll }) });
    },
    _a[order_1.TAKE_ACTIVITY_SNAPPED] = function (state, action) {
        var payload = action.payload;
        var common = {};
        // 商品
        var items = [];
        // 商品数量
        var totalNum = 0;
        var balance = {};
        var actCode = '';
        var isFenXiao = '';
        var totalPrice = 0;
        var discountTypeName = '';
        var isPurchaseStandard = true; // 组合购购买产品数量是否符合标准（默认不符合标准）
        var agentArr = {
            agentName: '',
            agentCode: ''
        };
        // 基本订单信息
        if (payload && payload.code == 1) {
            common = payload;
        }
        else {
            common = getActivityInfo(payload);
            ramda_1.forEach(function (_a) {
                var id = _a.id, color = _a.color, img = _a.img, billPrice = _a.billPrice, defaultImg = _a.defaultImg, productInfoId = _a.productInfoId, fwOrgId = _a.fwOrgId, fwOrgCode = _a.fwOrgCode, fwOrgName = _a.fwOrgName, productName = _a.productName, specialPrice = _a.specialPrice, standardPrice = _a.standardPrice, priceGroupName = _a.priceGroupName, buyQty = _a.buyQty, makeUpTypeName = _a.makeUpTypeName, materialGroup = _a.materialGroup, policyName = _a.policyName, specialPriceVcode = _a.specialPriceVcode, discountTypeId = _a.discountTypeId, discountTypeName = _a.discountTypeName, custTag = _a.custTag, packageCode = _a.packageCode, packageNum = _a.packageNum, rebateMoney = _a.rebateMoney, productGroupRemark = _a.productGroupRemark, productGroup = _a.productGroup, productInfoZzprdmodel = _a.productInfoZzprdmodel;
                //总数量 套购-》根据packageNum多少套计算
                // totalNum = add(totalNum, discountTypeId == '90603' ? buyQty * packageNum : buyQty);
                totalNum = ramda_1.add(totalNum, buyQty);
                totalPrice = ramda_1.add(totalPrice, billPrice * buyQty);
                items.push({
                    id: id,
                    color: color,
                    orgId: fwOrgId,
                    orgCode: fwOrgCode,
                    fwOrgName: fwOrgName,
                    productId: productInfoId,
                    productName: productName,
                    price: billPrice,
                    specialPrice: specialPrice,
                    standardPrice: standardPrice,
                    priceGroupName: priceGroupName,
                    quantity: buyQty,
                    maxQty: buyQty,
                    makeUpTypeName: makeUpTypeName,
                    src: img ? index_1.MarketFormatImg({ img: img }) : img,
                    errImg: defaultImg ? index_1.MarketFormatImg({ defaultImg: defaultImg }) : defaultImg,
                    policyName: policyName,
                    specialPriceVcode: specialPriceVcode,
                    // discountTypeId:90603,//促销方式Id
                    discountTypeId: discountTypeId,
                    discountTypeName: discountTypeName,
                    custTag: custTag,
                    packageCode: packageCode,
                    packageNum: packageNum,
                    // packageNum:1,//每套多少个
                    rebateMoney: rebateMoney,
                    // defaultNum:buyQty/1//packageNum -> 1 初始套数
                    defaultNum: buyQty / packageNum,
                    productGroupRemark: productGroupRemark,
                    productGroup: productGroup,
                    productInfoZzprdmodel: productInfoZzprdmodel
                });
            }, payload.activityList);
            balance = payload.balanceDTO;
            balance.totalMoney = totalPrice;
            actCode = payload.actCode || '';
            isFenXiao = payload.isFenXiao || '';
            if (isFenXiao == 'Y' && payload.agentName) {
                var arr = payload.agentName.trim().split("-");
                agentArr.agentCode = arr[0],
                    agentArr.agentName = arr[1];
            }
        }
        if (items.length) {
            discountTypeName = items[0].discountTypeName;
            if (items[0].discountTypeName == '组合购') {
                var combinationPurchaseList_2 = [];
                //组合购将数组里'productGroup'属性相同的对象合并成一个数组
                combinationPurchaseList_2 = index_1.combineObjIntoAnArray(items);
                combinationPurchaseList_2.forEach(function (item, index) {
                    var totleBuyNum = 0;
                    item.child.forEach(function (val, i) {
                        totleBuyNum += val.quantity;
                    });
                    combinationPurchaseList_2[index].isFold = true;
                    combinationPurchaseList_2[index].totleBuyNum = totleBuyNum;
                });
                items = combinationPurchaseList_2;
                isPurchaseStandard = index_1.checkCombinationPurchase(items);
            }
        }
        return __assign({}, state, { common: common, commonOrder: __assign({ items: items,
                totalNum: totalNum,
                discountTypeName: discountTypeName,
                isPurchaseStandard: isPurchaseStandard }, balance, { actCode: actCode,
                isFenXiao: isFenXiao,
                agentArr: agentArr }) });
    },
    // 订单筛选列表
    _a[order_1.GET_ORDER_FILTER] = function (state, action) {
        var payload = action.payload;
        var orderfilter = {
            itemgroup: [],
            suppliers: [],
            itemAgent: [],
            itemFxmap: [],
        };
        var all = {
            value: '全部',
            key: '',
            stock: false
        };
        orderfilter.itemAgent.push(all);
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                value: value,
                key: key,
                stock: false
            };
            orderfilter.itemAgent.push(item);
        }, payload.agentMap);
        orderfilter.itemFxmap.push(all);
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                value: value,
                key: key,
                stock: false
            };
            orderfilter.itemFxmap.push(item);
        }, payload.fxMap);
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                value: value,
                key: key,
                stock: false
            };
            orderfilter.suppliers.push(item);
        }, payload.fwOrgsGroupMap);
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                value: value,
                key: key
            };
            orderfilter.itemgroup.push(item);
        }, payload.productGroupMap);
        return __assign({}, state, { loading: false, filter: orderfilter });
    },
    _a[order_1.GET_ORDER_LIST] = function (state, action) {
        var payload = action.payload;
        var orderList = state.orderList;
        var orderListNew = payload;
        if (payload.currentPage && payload.currentPage !== 1) {
            orderListNew = __assign({}, payload, { orderHeaderList: orderList.orderHeaderList.concat(payload.orderHeaderList) });
        }
        orderListNew.orderHeaderList.forEach(function (order, index) {
            ramda_1.forEach(function (item) {
                if (item.img) {
                    var imgs = item.img.split('/');
                    item.img = index_1.formatImg({
                        format: imgs[2],
                        name: imgs[3],
                        materialId: imgs[0],
                        itemId: imgs[1]
                    });
                }
                if (item.defaultImg) {
                    var imgs = item.defaultImg.split('/');
                    item.errImg = index_1.formatImg({
                        name: imgs[imgs.length - 1]
                    });
                }
            }, order.items || []);
            if (order.items.length) {
                if (order.productGroupFlag == 'Y') {
                    var combinationPurchaseList = [];
                    //组合购将数组里'productGroup'属性相同的对象合并成一个数组
                    combinationPurchaseList = index_1.combineObjIntoAnArray(order.items);
                    orderListNew.orderHeaderList[index].itemsChange = combinationPurchaseList;
                }
            }
        });
        return __assign({}, state, { loading: false, orderList: orderListNew });
    },
    _a[order_1.GET_SALES_ORDER_INFO] = function (state, action) {
        var payload = action.payload;
        // 基本订单信息
        var common = {};
        // 商品
        var items = [];
        // 商品数量
        var totalNum = 0;
        var balance = {};
        var balanceDTO = payload.cartOrder.balanceDTO;
        var totalPrice = 0;
        var totalLoadVolume = 0;
        payload.cartOrder.orgAndGroup = payload.orgAndGroup;
        common = getCommonInfo(payload);
        var policyMap = payload.policyMap;
        var policies = {};
        ramda_1.forEachObjIndexed(function (value, key) {
            // 如果当前选的这个
            policies[key] = ramda_1.map(function (_a) {
                var id = _a.id, versionCode = _a.versionCode, policyName = _a.policyName, standardPrice = _a.standardPrice, price = _a.price, discount = _a.discount, reduce = _a.reduce, total = _a.total, remain = _a.remain, canQuantity = _a.canQuantity;
                return ({
                    id: id, versionCode: versionCode, policyName: policyName, standardPrice: standardPrice, price: price, discount: discount, reduce: reduce, total: total, remain: remain, canQuantity: canQuantity,
                });
            }, value);
        }, policyMap);
        // 这是特有的
        var delivery = {
            id: 502005,
            propertyName: '直配到分销商'
        };
        common = __assign({}, common, { delivery: delivery, policies: policies });
        // 商品列表
        ramda_1.forEach(function (_a) {
            var id = _a.id, color = _a.color, productId = _a.productId, picture = _a.picture, orgId = _a.orgId, loadVolume = _a.loadVolume, orgCode = _a.orgCode, productName = _a.productName, price = _a.price, specialPrice = _a.specialPrice, standardPrice = _a.standardPrice, priceGroupName = _a.priceGroupName, quantity = _a.quantity, makeUpTypeName = _a.makeUpTypeName, materialGroup = _a.materialGroup, policyName = _a.policyName, specialPriceVcode = _a.specialPriceVcode;
            totalNum = ramda_1.add(totalNum, quantity);
            totalPrice = ramda_1.add(totalPrice, price * quantity);
            totalLoadVolume = ramda_1.add(totalLoadVolume, loadVolume * quantity);
            items.push({
                id: id,
                color: color,
                orgId: orgId,
                orgCode: orgCode,
                productId: productId,
                productName: productName,
                price: price,
                specialPrice: specialPrice,
                standardPrice: standardPrice,
                priceGroupName: priceGroupName,
                quantity: quantity,
                makeUpTypeName: makeUpTypeName,
                src: index_1.formatImg(picture ? {
                    format: '180-180',
                    name: picture,
                    materialId: materialGroup,
                    itemId: productId,
                } : {
                    name: materialGroup + ".jpg",
                }),
                errImg: index_1.formatImg({
                    name: materialGroup + ".jpg",
                }),
                policyName: policyName,
                specialPriceVcode: specialPriceVcode,
            });
        }, payload.cartDTOs);
        // blance
        balance = balanceDTO;
        balance.totalMoney = totalPrice;
        balance.totalLoadVolume = totalLoadVolume;
        var pop = ramda_1.map(function (_a) {
            var id = _a.id;
            return id;
        }, payload.defaultPolicMap);
        var ver = [];
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                value: value,
                key: key
            };
            ver.push(item);
        }, pop);
        var rel = [];
        ramda_1.forEach(function (item) {
            ramda_1.forEach(function (res) {
                if (res.key == item.productId) {
                    item.versions = res.value;
                }
            }, ver);
            if (item.versions) {
                rel.push(item.versions);
            }
            else {
                rel.push('');
            }
        }, payload.cartDTOs);
        balance.versions = ramda_1.join(',', rel);
        return __assign({}, state, { common: common, commonOrder: __assign({ orderId: payload.orderId, items: items,
                totalNum: totalNum }, balance, { modelId: payload.modelId }) });
    },
    _a[order_1.AGAIN_ORDER_COMMON] = function (state, action) {
        var payload = action.payload;
        // 基本订单信息
        var common = {};
        // 商品
        var items = [];
        // 商品数量
        var totalNum = 0;
        var balance = {};
        if (payload.orderId) {
            var balanceDTO = payload.cartOrder.balanceDTO;
            var totalPrice_1 = 0;
            payload.cartOrder.orgAndGroup = payload.orgAndGroup;
            common = getCommonInfo(payload);
            // 商品列表
            ramda_1.forEach(function (_a) {
                var id = _a.id, color = _a.color, productId = _a.productId, picture = _a.picture, orgId = _a.orgId, orgCode = _a.orgCode, productName = _a.productName, price = _a.price, specialPrice = _a.specialPrice, standardPrice = _a.standardPrice, priceGroupName = _a.priceGroupName, quantity = _a.quantity, makeUpTypeName = _a.makeUpTypeName, materialGroup = _a.materialGroup, policyName = _a.policyName, specialPriceVcode = _a.specialPriceVcode, stockAgeNum = _a.stockAgeNum;
                totalNum = ramda_1.add(totalNum, quantity);
                totalPrice_1 = ramda_1.add(totalPrice_1, price * quantity);
                items.push({
                    id: id,
                    color: color,
                    orgId: orgId,
                    orgCode: orgCode,
                    productId: productId,
                    productName: productName,
                    price: price,
                    specialPrice: specialPrice,
                    standardPrice: standardPrice,
                    priceGroupName: priceGroupName,
                    quantity: quantity,
                    makeUpTypeName: makeUpTypeName,
                    src: index_1.formatImg(picture ? {
                        format: '180-180',
                        name: picture,
                        materialId: materialGroup,
                        itemId: productId,
                    } : {
                        name: materialGroup + ".jpg",
                    }),
                    errImg: index_1.formatImg({
                        name: materialGroup + ".jpg",
                    }),
                    policyName: policyName,
                    specialPriceVcode: specialPriceVcode,
                    stockAgeNum: stockAgeNum,
                });
            }, payload.cartDTOs);
            // blance
            balance = balanceDTO;
            balance.totalMoney = totalPrice_1;
            var pop = ramda_1.map(function (_a) {
                var id = _a.id;
                return id;
            }, payload.defaultPolicMap);
            var ver_1 = [];
            ramda_1.forEachObjIndexed(function (value, key) {
                var item = {
                    value: value,
                    key: key
                };
                ver_1.push(item);
            }, pop);
            var rel_1 = [];
            ramda_1.forEach(function (item) {
                ramda_1.forEach(function (res) {
                    if (res.key == item.productId) {
                        item.versions = res.value;
                    }
                }, ver_1);
                if (item.versions) {
                    rel_1.push(item.versions);
                }
                else {
                    rel_1.push('');
                }
            }, payload.cartDTOs);
            balance.versions = ramda_1.join(',', rel_1);
        }
        return __assign({}, state, { common: common, commonOrder: __assign({ orderId: payload.orderId, items: items,
                totalNum: totalNum }, balance) });
    },
    _a[order_1.TAKE_ORDER_COMMON] = function (state, action) {
        var payload = action.payload;
        // 基本订单信息
        var common = {};
        // 商品
        var items = [];
        // 商品数量
        var totalNum = 0;
        var balance = {};
        if (payload.cartOrder) {
            var _a = payload.cartOrder, cartMap = _a.cartMap, balanceMap = _a.balanceMap;
            common = getCommonInfo(payload);
            // 商品列表
            ramda_1.forEachObjIndexed(function (value) {
                ramda_1.forEach(function (_a) {
                    var id = _a.id, color = _a.color, picture = _a.picture, productId = _a.productId, orgId = _a.orgId, orgCode = _a.orgCode, productName = _a.productName, price = _a.price, specialPrice = _a.specialPrice, standardPrice = _a.standardPrice, priceGroupName = _a.priceGroupName, quantity = _a.quantity, makeUpTypeName = _a.makeUpTypeName, materialGroup = _a.materialGroup, policyName = _a.policyName, specialPriceVcode = _a.specialPriceVcode, stockAgeNum = _a.stockAgeNum;
                    totalNum = ramda_1.add(totalNum, quantity);
                    items.push({
                        id: id,
                        color: color,
                        orgId: orgId,
                        orgCode: orgCode,
                        productId: productId,
                        productName: productName,
                        price: price,
                        specialPrice: specialPrice,
                        standardPrice: standardPrice,
                        priceGroupName: priceGroupName,
                        quantity: quantity,
                        makeUpTypeName: makeUpTypeName,
                        src: index_1.formatImg(picture ? {
                            format: '180-180',
                            name: picture,
                            materialId: materialGroup,
                            itemId: productId,
                        } : {
                            name: materialGroup + ".jpg",
                        }),
                        errImg: index_1.formatImg({
                            name: materialGroup + ".jpg",
                        }),
                        policyName: policyName,
                        specialPriceVcode: specialPriceVcode,
                        stockAgeNum: stockAgeNum,
                    });
                }, value);
            }, cartMap);
            // 结算信息
            ramda_1.forEachObjIndexed(function (value) {
                // 看不懂他们 PC 逻辑 默认第一个
                balance = value;
            }, balanceMap);
        }
        return __assign({}, state, { common: common, commonOrder: __assign({ items: items,
                totalNum: totalNum }, balance) });
    },
    _a[order_1.CART_ORDER_WEEK] = function (state, action) {
        var list = action.payload.list;
        return __assign({}, state, { weekList: { list: list } });
    },
    //服务方式
    _a[order_1.GET_ORDER_SERVICE] = function (state, action) {
        var list = action.payload.list;
        return __assign({}, state, { serviceList: { list: list } });
    },
    _a[order_1.MONEY_BY_WEEK] = function (state, action) {
        var balance = action.payload.balance;
        return __assign({}, state, { balance: { balance: balance } });
    },
    _a[order_1.GET_WAIT_BALANCE_INFO_LIST] = function (state, action) {
        var dataList = action.payload.dataList;
        return __assign({}, state, { waitBalanceList: dataList });
    },
    _a[order_1.TAKE_ORDER_PROJECT] = function (state, action) {
        var payload = action.payload;
        // 基本订单信息
        var common = {};
        // 商品
        var items = [];
        // 选择好的商品
        var itemsSelected = [];
        // 商品数量
        var totalNum = 0;
        var balance = {};
        // 基本信息
        var basic = {};
        // 提交必要参数
        var profitParam = 0;
        var sapRebateAccountParam = 0;
        var projectApplyCodeParam = '';
        if (payload.epProjectInfo) {
            var profit = payload.profit, orgId = payload.orgId, matklId = payload.matklId, sapRebateAccount = payload.sapRebateAccount, billToDTOs = payload.billToDTOs, _a = payload.custMarketModels, custMarketModels = _a === void 0 ? [] : _a, marketAddress = payload.marketAddress, customerAddressDTOs = payload.customerAddressDTOs, deliveryList = payload.deliveryList, tradeType = payload.tradeType, defaultProvice = payload.defaultProvice, defaultCity = payload.defaultCity, defaultDistrict = payload.defaultDistrict, provices = payload.provices, citys = payload.citys, districts = payload.districts, epProjectInfo = payload.epProjectInfo, balanceDTO = payload.balanceDTO, epInfoDetail = payload.epInfoDetail, shareFlag = payload.shareFlag, office = payload.office;
            var projectApplyCode = epProjectInfo.projectApplyCode, orgId_name = epProjectInfo.orgId_name, projectCode = epProjectInfo.projectCode, projectName = epProjectInfo.projectName, projectPurpose_name = epProjectInfo.projectPurpose_name, customerName = epProjectInfo.customerName, contractOrg_name = epProjectInfo.contractOrg_name, customerAddr = epProjectInfo.customerAddr, agent = epProjectInfo.agent, customerTel = epProjectInfo.customerTel, beginDate = epProjectInfo.beginDate, endDate = epProjectInfo.endDate;
            basic = { orgId_name: orgId_name, projectCode: projectCode, projectName: projectName, projectPurpose_name: projectPurpose_name, customerName: customerName, contractOrg_name: contractOrg_name, customerAddr: customerAddr, agent: agent, customerTel: customerTel, beginDate: beginDate, endDate: endDate };
            balance = balanceDTO;
            // 提交必要参数
            profitParam = profit;
            sapRebateAccountParam = sapRebateAccount;
            projectApplyCodeParam = projectApplyCode;
            // 处理商品
            items = ramda_1.map(function (_a) {
                var id = _a.id, zzprdmodel = _a.zzprdmodel, productLabel = _a.productLabel, singlePrice = _a.singlePrice, loadVolume = _a.loadVolume, standardPrice = _a.standardPrice, buckle = _a.buckle, amount = _a.amount, finishOrder = _a.finishOrder, diffentPrice = _a.diffentPrice;
                return ({
                    product_id: id,
                    productName: zzprdmodel,
                    productLabel: productLabel,
                    singlePrice: singlePrice,
                    loadVolume: loadVolume,
                    standardPrice: standardPrice,
                    buckle: buckle,
                    amount: amount,
                    finishOrder: finishOrder,
                    diffentPrice: diffentPrice,
                    count: 0,
                    canBuy: ramda_1.subtract(amount, finishOrder),
                });
            }, epInfoDetail);
            common = getCommonInfo({
                cartOrder: {
                    maxDate: endDate,
                    minDate: beginDate,
                    billToDTOs: billToDTOs, custMarketModelDtos: custMarketModels, marketAddress: marketAddress, customerAddressDTOs: customerAddressDTOs,
                    deliveryList: deliveryList, tradeType: tradeType, defaultProvice: defaultProvice, defaultCity: defaultCity,
                    defaultDistrict: defaultDistrict, provices: provices, citys: citys, districts: districts,
                    orgId: orgId,
                    matklId: matklId
                },
                shareFlag: shareFlag,
                office: office
            });
        }
        return __assign({}, state, { common: common, projectOrder: __assign({ profitParam: profitParam,
                sapRebateAccountParam: sapRebateAccountParam,
                projectApplyCodeParam: projectApplyCodeParam,
                basic: basic,
                itemsSelected: itemsSelected,
                items: items,
                totalNum: totalNum }, balance) });
    },
    _a[order_1.CHANGE_ORDER_PROJECT_ITEM] = function (state, action) {
        var projectOrder = state.projectOrder;
        var _a = action.payload, id = _a.id, quantity = _a.quantity;
        var quantityList = projectOrder.items;
        var index = ramda_1.findIndex(ramda_1.propEq('product_id', id), projectOrder.items);
        if (index >= 0) {
            var item = projectOrder.items[index];
            item.count = quantity;
            quantityList = ramda_1.update(index, item, projectOrder.items);
        }
        var itemsSelected = ramda_1.filter(function (_a) {
            var count = _a.count;
            return count > 0;
        }, quantityList);
        var totalNum = 0;
        var totalPrice = 0;
        var loadVolumeAll = 0; // 全部体积
        ramda_1.forEach(function (_a) {
            var count = _a.count, singlePrice = _a.singlePrice, loadVolume = _a.loadVolume;
            totalNum = ramda_1.add(totalNum, count);
            totalPrice = ramda_1.add(totalPrice, count * singlePrice);
            loadVolumeAll = ramda_1.add(loadVolumeAll, count * loadVolume);
        }, itemsSelected);
        var totalRebate = totalPrice * 0.01 * projectOrder.profitParam;
        return __assign({}, state, { projectOrder: __assign({}, projectOrder, { items: quantityList, itemsSelected: itemsSelected,
                totalRebate: totalRebate,
                totalNum: totalNum,
                totalPrice: totalPrice,
                loadVolumeAll: loadVolumeAll }) });
    },
    _a[order_1.GET_BUY_OUT_ORDER] = function (state, action) {
        var payload = action.payload;
        // 基本订单信息
        var common = {};
        // 商品
        var items = [];
        // 商品数量
        var totalNum = 0;
        // 总商品价格
        var totalItemPrice = 0;
        // 初始总体积
        var initloadVolumeAll = 0;
        var balance = {};
        var orderType = '01';
        // 提交必要参数
        if (payload.salesPackage) {
            var billToDTOs = payload.billToDTOs, custMarketModels = payload.custMarketModels, marketAddress = payload.marketAddress, customerAddressDTOs = payload.customerAddressDTOs, deliveryList = payload.deliveryList, tradeType = payload.tradeType, defaultProvice = payload.defaultProvice, defaultCity = payload.defaultCity, defaultDistrict = payload.defaultDistrict, provices = payload.provices, citys = payload.citys, districts = payload.districts, balanceDTO = payload.balanceDTO, packageProducts = payload.packageProducts, maxDate = payload.maxDate, minDate = payload.minDate, orgId = payload.orgId, matklId = payload.matklId, shareFlag = payload.shareFlag, office = payload.office;
            orderType = tradeType;
            balance = balanceDTO;
            // 提交必要参数
            // 处理商品
            items = ramda_1.map(function (_a) {
                var id = _a.id, productName = _a.productName, productLabel = _a.productLabel, billPriceShow = _a.billPriceShow, price = _a.price, deduct = _a.deduct, qty = _a.qty, loadVolume = _a.loadVolume, errorMessage = _a.errorMessage;
                totalItemPrice = ramda_1.add(totalItemPrice, ramda_1.multiply(qty, billPriceShow));
                initloadVolumeAll = ramda_1.add(initloadVolumeAll, ramda_1.multiply(qty, loadVolume));
                return {
                    id: id,
                    productName: productName,
                    productLabel: productLabel,
                    singlePrice: billPriceShow,
                    standardPrice: price,
                    deduct: deduct,
                    amount: qty,
                    errorMessage: errorMessage,
                };
            }, packageProducts || []);
            common = getCommonInfo({
                cartOrder: {
                    maxDate: maxDate,
                    minDate: minDate,
                    orgId: orgId,
                    matklId: matklId,
                    billToDTOs: billToDTOs, custMarketModelDtos: custMarketModels, marketAddress: marketAddress, customerAddressDTOs: customerAddressDTOs,
                    deliveryList: deliveryList, tradeType: tradeType, defaultProvice: defaultProvice, defaultCity: defaultCity,
                    defaultDistrict: defaultDistrict, provices: provices, citys: citys, districts: districts,
                },
                shareFlag: shareFlag,
                office: office
            });
        }
        return __assign({}, state, { common: common, buyOutOrder: __assign({ items: items,
                totalItemPrice: totalItemPrice,
                initloadVolumeAll: initloadVolumeAll,
                totalNum: totalNum, totalPrice: 0, loadVolumeAll: 0, tradeType: orderType }, balance) });
    },
    _a[order_1.CHANGE_BYU_OUT_PRICE] = function (state, action) {
        var count = action.payload.count;
        var buyOutOrder = state.buyOutOrder;
        var totalItemPrice = buyOutOrder.totalItemPrice, rebate = buyOutOrder.rebate, rebateAccount = buyOutOrder.rebateAccount, initloadVolumeAll = buyOutOrder.initloadVolumeAll;
        var totalPrice = ramda_1.multiply(totalItemPrice, count);
        var loadVolumeAll = ramda_1.multiply(initloadVolumeAll, count);
        var totalRebate = ramda_1.multiply(rebate, count);
        return __assign({}, state, { buyOutOrder: __assign({}, buyOutOrder, { totalRebate: rebateAccount > totalRebate ? totalRebate : rebateAccount, totalPrice: totalPrice,
                loadVolumeAll: loadVolumeAll, totalNum: count }) });
    },
    _a[order_1.CHANGE_PREFERENCE_ITEM_COUNT] = function (state, action) {
        var preferenceOrder = state.preferenceOrder;
        var _a = action.payload, id = _a.id, quantity = _a.quantity;
        var quantityList = preferenceOrder.items;
        var index = ramda_1.findIndex(ramda_1.propEq('id', id), preferenceOrder.items);
        if (index >= 0) {
            var item = preferenceOrder.items[index];
            item.num = quantity;
            quantityList = ramda_1.update(index, item, preferenceOrder.items);
        }
        var itemsSelected = ramda_1.filter(function (_a) {
            var num = _a.num;
            return num > 0;
        }, quantityList);
        var totalNum = 0;
        var totalPrice = 0;
        var loadVolumeAll = 0; //总体积
        ramda_1.forEach(function (_a) {
            var num = _a.num, billPrice = _a.billPrice, loadVolume = _a.loadVolume;
            totalNum = ramda_1.add(totalNum, num);
            totalPrice = ramda_1.add(totalPrice, num * billPrice);
            loadVolumeAll = ramda_1.add(loadVolumeAll, num * loadVolume);
        }, itemsSelected);
        return __assign({}, state, { preferenceOrder: __assign({}, preferenceOrder, { items: quantityList, itemsSelected: itemsSelected,
                totalNum: totalNum,
                totalPrice: totalPrice,
                loadVolumeAll: loadVolumeAll }) });
    },
    _a[order_1.CHANGE_PREFERENCE_ITEM_PRICE] = function (state, action) {
        var preferenceOrder = state.preferenceOrder;
        var priceItems = preferenceOrder.items;
        if (ramda_1.is(Array, action.payload)) {
            priceItems = ramda_1.map(function (item) {
                var priceItem = ramda_1.find(ramda_1.propEq('id', "" + item.id), action.payload);
                if (priceItem && priceItem.id) {
                    item.standardPrice = parseFloat(priceItem.standardPrice);
                    item.straightBuckle = parseFloat(priceItem.straightBuckle);
                }
                return item;
            }, priceItems);
        }
        return __assign({}, state, { preferenceOrder: __assign({}, preferenceOrder, { isGetPrice: true, items: priceItems }) });
    },
    _a[order_1.TAKE_PREFERENCE_ORDER] = function (state, action) {
        var payload = action.payload;
        // 基本订单信息
        var common = {};
        // 商品
        var items = [];
        // 选择好的商品
        var itemsSelected = [];
        // 商品数量
        var totalNum = 0;
        var balance = {};
        // 价格和数量
        var totalPrice = 0;
        // 商品总体积
        var loadVolumeAll = 0;
        // 基本信息
        var basic = {};
        if (payload.detail) {
            var counts = payload.counts, balanceDTO = payload.balanceDTO, billToDTOs = payload.billToDTOs, marketAddress = payload.marketAddress, custMarketModels = payload.custMarketModels, customerAddressDTOs = payload.customerAddressDTOs, deliveryList = payload.deliveryList, defaultCity = payload.defaultCity, defaultDistrict = payload.defaultDistrict, defaultProvice = payload.defaultProvice, districts = payload.districts, provices = payload.provices, citys = payload.citys, detailList = payload.detailList, shareFlag = payload.shareFlag, office = payload.office, ids = payload.ids;
            var _a = payload.detail, id = _a.id, fwOrgId = _a.fwOrgId, orgMatkl = _a.orgMatkl, fwOrgName = _a.fwOrgName, preferCode = _a.preferCode, reportCode = _a.reportCode, status = _a.status, startDate = _a.startDate, endDate = _a.endDate, createDate = _a.createDate;
            balance = balanceDTO;
            // 基础信息
            basic = {
                id: id,
                fwOrgId: fwOrgId,
                orgMatkl: orgMatkl,
                fwOrgName: fwOrgName,
                preferCode: preferCode,
                reportCode: reportCode,
                status: status,
                startDate: startDate,
                endDate: endDate,
                createDate: createDate,
            };
            // 商品列表
            items = ramda_1.map(function (_a) {
                var productId = _a.productId, productName = _a.productName, matklName = _a.matklName, productModel = _a.productModel, batch = _a.batch, count = _a.count, buyCount = _a.buyCount, billPrice = _a.billPrice, loadVolume = _a.loadVolume, rest = __rest(_a, ["productId", "productName", "matklName", "productModel", "batch", "count", "buyCount", "billPrice", "loadVolume"]);
                return ({
                    id: rest.id, productId: productId, productName: productName, matklName: matklName,
                    productModel: productModel, batch: batch, count: count, buyCount: buyCount,
                    status: rest.status, billPrice: billPrice, loadVolume: loadVolume, num: 0,
                });
            }, detailList);
            // 商品维度下单
            if (counts) {
                var countArry_1 = ramda_1.split(',', counts);
                var idArry_1 = ramda_1.split(',', ids);
                itemsSelected = items.map(function (item, index) {
                    var i = 0;
                    ramda_1.forEach(function (idItem) {
                        if (item.id == idItem) {
                            item.num = countArry_1[i];
                            totalNum = ramda_1.add(totalNum, item.num);
                            totalPrice = ramda_1.add(totalPrice, item.num * item.billPrice);
                            loadVolumeAll = ramda_1.add(loadVolumeAll, item.num * item.loadVolume);
                        }
                        i++;
                    }, idArry_1);
                    return item;
                });
                /*
                itemsSelected = items.map((item: any, index: number) => {
                  item.num = countArry[index];
                  totalNum = add(totalNum, item.num);
                  totalPrice = add(totalPrice, item.num * item.billPrice);
                  loadVolumeAll = add(loadVolumeAll,item.num * item.loadVolume)
                  return item;
                });
                */
            }
            // 通用单下单
            common = getCommonInfo({
                cartOrder: {
                    maxDate: endDate,
                    orgId: fwOrgId,
                    matklId: detailList[0].matklId,
                    minDate: startDate,
                    tradeType: '01',
                    billToDTOs: billToDTOs, custMarketModelDtos: custMarketModels, marketAddress: marketAddress, customerAddressDTOs: customerAddressDTOs,
                    deliveryList: deliveryList, defaultProvice: defaultProvice, defaultCity: defaultCity,
                    defaultDistrict: defaultDistrict, provices: provices, citys: citys, districts: districts,
                },
                shareFlag: shareFlag,
                office: office
            });
        }
        return __assign({}, state, { common: common, preferenceOrder: __assign({ basic: basic,
                itemsSelected: itemsSelected, isGetPrice: false, items: items,
                totalNum: totalNum,
                totalPrice: totalPrice,
                loadVolumeAll: loadVolumeAll }, balance) });
    },
    _a[order_1.GET_MY_ROUTINE_ORDER] = function (state, action) {
        var payload = action.payload;
        var orderList = state.orderList;
        var orderListNew = payload;
        if (payload.currentPage && payload.currentPage !== 1) {
            orderListNew = __assign({}, payload, { list: orderList.list.concat(payload.list) });
        }
        return __assign({}, state, { loading: false, orderList: orderListNew });
    },
    _a), {
    common: {},
    commonOrder: {},
    preferenceOrder: {},
    buyOutOrder: {},
    projectOrder: {},
    orderList: {},
    filter: {},
    deliveryMethod: {},
    weekList: {},
    balance: {},
    loadVolume: {},
});
