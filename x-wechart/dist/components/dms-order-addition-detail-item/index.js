"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../vant/common/component.js');
var dmsrequest_1 = require('./../../store/actions/dmsrequest.js');
var toast_1 = require('./../vant/toast/toast.js');
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
var index_1 = require('./../../utils/index.js');
//子组件
component_1.VantComponent({
    props: {
        itemId: String,
        itemInfo: Object,
        index: Number,
        from: String,
        warehouseId: String,
        outInv: {
            type: Object,
            twoWay: true
        },
        orgId: String,
        ly: String,
        isDisabled: {
            type: Boolean,
            default: false // true表单不可修改，，，false表单可修改
        },
        requiredParameters: Object
    },
    data: {
        materialCode: '',
        inventory: '',
        inventoryName: '请选择',
        invState: '',
        invStateName: '请选择',
        warehouseName: '',
        zoneB2cService: [],
        zoneB2cServiceName: [],
        serverPopVisible: false,
        quantity: '1',
        price: '',
        suggestPrice: '',
        lock: false,
        time: '',
        amount: '0.00',
        volumeTotal: '0.00',
        chooseInvShow: false,
        wareHouseShow: false,
        chooseInvStateShow: false,
        bavailqty: 0,
        buchaShow: true,
    },
    watch: {
        'outInv': function (newValue, oldValue) {
            return newValue;
        },
        'warehouseId': function (newValue, oldValue) {
            //查询可用数量
            this.getBavailqty();
            return newValue;
        },
        'orgId': function (newValue, oldValue) {
            // this.getBucha()
            return newValue;
        },
        'itemInfo': function (newValue, oldValue) {
            if (!newValue) {
                return;
            }
            //库存状态
            var inventoryName = this.data.inventoryName;
            if (newValue.invStatusId && '请选择' === inventoryName && newValue.invStatus && newValue.invStatus.length > 0) {
                var r = newValue.invStatus.filter(function (item) { return newValue.invStatusId === item.key; });
                if (r.length > 0) {
                    this.setData({
                        inventory: r[0].key,
                        inventoryName: r[0].value
                    });
                }
            }
            if ((newValue || {}).productCode !== (oldValue || {}).productCode) {
                var info = {
                    inventory: '',
                    inventoryName: '请选择',
                    quantity: '1',
                    price: '',
                    lock: (newValue || {}).lock || false,
                    time: (newValue || {}).time
                };
                var newAmount = '0.00';
                var newVolume = '0.00';
                if (newValue.price) {
                    info.price = newValue.price;
                }
                if (newValue.invStatusId) {
                    info.inventory = newValue.invStatusId;
                }
                if (newValue.quantity) {
                    info.quantity = newValue.quantity;
                }
                this.setData(info);
                if (newValue.amount) {
                    newAmount = newValue.amount;
                }
                var amount = this.data.amount;
                if (amount !== newAmount) {
                    this.setData({
                        amount: newAmount,
                    });
                    this.$emit('amountChange', {
                        amount: (+newAmount) - (+amount)
                    });
                }
                //体积计算
                if (newValue.volumeTotal) {
                    newVolume = newValue.volumeTotal;
                }
                var volumeTotal = this.data.volumeTotal;
                if (volumeTotal !== newVolume) {
                    this.setData({
                        volumeTotal: newVolume,
                    });
                    this.$emit('volumeChange', {
                        volumeTotal: (+newVolume) - (+volumeTotal)
                    });
                }
            }
            else if ((newValue || {}).price !== this.data.price && newValue.refreshPrice && newValue.time !== this.data.time) {
                var _a = this.data, amount = _a.amount, quantity = _a.quantity;
                var newPrice = (newValue || {}).price;
                var newAmount = (newPrice || 0) * (quantity || 0);
                this.setData({
                    lock: (newValue || {}).lock || false,
                    price: newPrice,
                    amount: newAmount,
                    time: (newValue || {}).time
                });
                if (amount !== newAmount) {
                    this.$emit('amountChange', {
                        amount: (+newAmount) - (+amount)
                    });
                }
            }
            else if ((newValue || {}).lock !== this.data.lock) {
                this.setData({
                    lock: (newValue || {}).lock || false,
                    time: (newValue || {}).time
                });
            }
            else if ((newValue || {}).time !== this.data.time) {
                this.setData({
                    time: newValue.time
                });
            }
            this.calcVolume();
            // 重置建议零售价格
            this.setData({
                suggestPrice: this.data.itemInfo.price,
                price: this.data.price || this.data.itemInfo.price,
            });
            // 如果传参isDisabled=true，表单不可编辑（销售数量、销售价格除外），补差类型默认是选择产品带过来的数据;并且添加物料编码字段
            if (this.data.isDisabled) {
                this.setData({
                    inventory: this.data.itemInfo.invStatusId ? this.data.itemInfo.invStatusId : '',
                    inventoryName: this.data.itemInfo.invStatusName ? this.data.itemInfo.invStatusName : '',
                    invState: this.data.itemInfo.invStatusType ? this.data.itemInfo.invStatusType : '',
                    invStateName: this.data.itemInfo.invStatusTypeName ? this.data.itemInfo.invStatusTypeName : '',
                    materialCode: this.data.itemInfo.materialCode ? this.data.itemInfo.materialCode : '',
                    warehouseName: this.data.itemInfo.gicWarehouseName ? this.data.itemInfo.gicWarehouseName : '',
                    bavailqty: this.data.itemInfo.bigQty,
                });
            }
            else {
                //查询可用库存
                this.getBavailqty();
            }
            // 零售录入新版本给服务列表、销售数量赋值
            if (this.data.ly == 'retailNew') {
                this.setData({
                    zoneB2cService: this.data.itemInfo.zoneB2cService && this.data.itemInfo.zoneB2cService.length > 0 ? this.data.itemInfo.zoneB2cService : [],
                    zoneB2cServiceName: this.data.itemInfo.zoneB2cServiceName && this.data.itemInfo.zoneB2cServiceName.length > 0 ? this.data.itemInfo.zoneB2cServiceName : [],
                    quantity: this.data.itemInfo.quantity ? this.data.itemInfo.quantity : '1',
                });
            }
            // 分销录入新版本给销售数量赋值
            if (this.data.ly == 'channelNew') {
                this.setData({
                    quantity: this.data.itemInfo.quantity ? this.data.itemInfo.quantity : '1',
                });
            }
            this.calcAmount();
        }
    },
    onload: function () {
    },
    methods: {
        getBucha: function () {
            var _this = this;
            var abbbaa = this;
            try {
                var aaa = dmsrequest_1.dmsRequest({
                    data: {
                        'cisCode': wepy_1.default.$instance.globalData.cisCode,
                        'orgCode': this.data.orgId
                    },
                    method: 'isEnableOrNot'
                }).then(function (res) {
                    _this.buchaShow = res.data;
                    abbbaa.setData({
                        'buchaShow': res.data,
                    });
                    _this.$apply();
                }).catch(function (res) {
                });
            }
            catch (error) {
            }
        },
        checkRequiredParameters: function () {
            var _a = this.data.requiredParameters, store = _a.store, customerName = _a.customerName, customerPhone = _a.customerPhone, chooseProvinceInfo = _a.chooseProvinceInfo, saleType = _a.saleType, receiverDetail = _a.receiverDetail, deliveryMethod = _a.deliveryMethod;
            if (customerName === '') {
                toast_1.default.fail('请填写客户名称');
                return false;
            }
            if (customerPhone === '') {
                toast_1.default.fail('请填写联系电话');
                return false;
            }
            if (!index_1.checkTel(customerPhone)) {
                toast_1.default.fail('请填写正确手机号或座机');
                return false;
            }
            if (!chooseProvinceInfo.id) {
                toast_1.default.fail('请选择省市区县');
                return false;
            }
            if (receiverDetail === '') {
                toast_1.default.fail('请填写详细地址');
                return false;
            }
            if (!deliveryMethod.id) {
                toast_1.default.fail('请选择配送方式');
                return false;
            }
            return true;
        },
        chooseItem: function () {
            if (this.data.ly === 'retailNew') { // 零售录入新版必填项判断
                var checkResult = this.checkRequiredParameters();
                if (!checkResult) {
                    return;
                }
            }
            else {
                if (this.data.ly !== 'channelNew') {
                    if (this.data.ly !== 'channel') {
                        //销售组织必选
                        if (!this.data.orgId) {
                            toast_1.default.fail('请选择销售组织');
                            return;
                        }
                    }
                    //仓库必选
                    if (!this.data.warehouseId) {
                        toast_1.default.fail('请选择仓库');
                        return;
                    }
                }
            }
            this.calcVolume();
            this.calcAmount();
            this.$emit('chooseItem', {
                id: this.data.itemId,
                ly: this.data.ly
            });
        },
        del: function () {
            this.$emit('itemDel', {
                id: this.data.itemId,
                amount: this.data.amount,
                volume: this.data.volume
            });
        },
        openChooseInv: function () {
            var _a = this.data, isDisabled = _a.isDisabled, itemInfo = _a.itemInfo;
            if (isDisabled) {
                return;
            }
            if (itemInfo.invStatus.length > 0) {
                this.setData({
                    chooseInvShow: true
                });
            }
        },
        onClose: function () {
            this.setData({
                chooseInvShow: false
            });
        },
        chooseInv: function (_a) {
            var currentTarget = _a.currentTarget;
            var dataset = currentTarget.dataset;
            var key = dataset.key;
            var invStatus = this.data.itemInfo.invStatus;
            for (var index in invStatus) {
                var status = invStatus[index];
                if (status.key === key) {
                    this.setData({
                        inventory: status.key,
                        inventoryName: status.value,
                        chooseInvShow: false
                    });
                    break;
                }
            }
            //查询可用数量
            this.getBavailqty();
        },
        openChooseInvState: function () {
            var _a = this.data, isDisabled = _a.isDisabled, itemInfo = _a.itemInfo;
            if (isDisabled) {
                return;
            }
            if (itemInfo.invStatus.length > 0) {
                this.setData({
                    chooseInvStateShow: true
                });
            }
        },
        onCloseState: function () {
            this.setData({
                chooseInvStateShow: false
            });
        },
        chooseInvState: function (_a) {
            var currentTarget = _a.currentTarget;
            var dataset = currentTarget.dataset;
            var key = dataset.key;
            var invStateTypes = this.data.itemInfo.invStateTypes;
            for (var index in invStateTypes) {
                var status = invStateTypes[index];
                if (status.key === key) {
                    this.setData({
                        invState: status.key,
                        invStateName: status.value,
                        chooseInvStateShow: false
                    });
                    break;
                }
            }
            //查询可用数量
            this.getBavailqty();
        },
        openChooseWareHouse: function () {
            this.setData({
                wareHouseShow: true
            });
        },
        onCloseWarehouse: function () {
            this.setData({
                wareHouseShow: false
            });
        },
        chooseWarehouse: function (_a) {
            var currentTarget = _a.currentTarget;
            var dataset = currentTarget.dataset;
            var key = dataset.key;
            var inWarehouseList = this.data.itemInfo.inWarehouseList;
            for (var index in inWarehouseList) {
                var status = inWarehouseList[index];
                if (status.key === key) {
                    this.setData({
                        warehouseId: status.key,
                        warehouseName: status.value,
                        wareHouseShow: false
                    });
                    break;
                }
            }
            //查询可用数量
            this.getBavailqty();
        },
        //获取可用库存
        getBavailqty: function () {
            var _this = this;
            try {
                var _a = this.data, itemInfo = _a.itemInfo, warehouseId = _a.warehouseId, invState = _a.invState, inventory = _a.inventory, orgId = _a.orgId;
                if (itemInfo.productCode && warehouseId && inventory) {
                    var aaa = dmsrequest_1.dmsRequest({
                        data: {
                            productCode: itemInfo.productCode,
                            warehouseId: warehouseId,
                            invStatusType: invState,
                            invStatusId: inventory,
                            invBatchId: '',
                            orgCode: orgId,
                        },
                        method: 'getInvQty'
                    }).then(function (res) {
                        var bavailqty = res.bavailqty;
                        _this.setData({
                            bavailqty: bavailqty,
                        });
                    }).catch(function (res) {
                        _this.setData({
                            bavailqty: 0
                        });
                    });
                }
            }
            catch (error) {
            }
        },
        // {
        // empty: false // 是否使用了
        // finish: false // 使用了是否填写完整
        // errMsg: '' // 提示错误信息
        // }
        checkParam: function () {
            var _a = this.data, itemInfo = _a.itemInfo, inventory = _a.inventory, quantity = _a.quantity, price = _a.price, index = _a.index, outInv = _a.outInv, bavailqty = _a.bavailqty, suggestPrice = _a.suggestPrice;
            var empty = !itemInfo.productCode && !inventory && !price;
            var finish = itemInfo.productCode && itemInfo.model && inventory && price;
            var errMsg = '';
            //如果是否出库选择是，销售数量不可大于可用数量
            //是否出库选择否，仓库不是必填，如果没有选择仓库，产品行上没有可用数量字段，如果是否出库选择是，仓库必填
            if (outInv && outInv.name === '是') {
                // 验证数量
                if (quantity * 1 > bavailqty) {
                    errMsg = "\u7B2C" + (index + 1) + "\u4E2A\u5546\u54C1\u7684\u9500\u552E\u6570\u91CF\u4E0D\u53EF\u5927\u4E8E\u53EF\u7528\u6570\u91CF";
                }
            }
            if (!empty && !finish) {
                // 错误
                errMsg = "\u7B2C" + (index + 1) + "\u4E2A\u5546\u54C1\u7684\u4FE1\u606F\u4E0D\u5B8C\u6574";
            }
            else if (+price > 99999) {
                errMsg = "\u7B2C" + (index + 1) + "\u4E2A\u5546\u54C1\u4EF7\u683C\u4E0D\u80FD\u5927\u4E8E99999";
            }
            else if (+price === 0.00) {
                errMsg = "\u7B2C" + (index + 1) + "\u4E2A\u5546\u54C1\u4EF7\u683C\u4E0D\u80FD\u4E3A0";
            }
            else if (+quantity === 0) {
                errMsg = "\u7B2C" + (index + 1) + "\u4E2A\u5546\u54C1\u6570\u91CF\u4E0D\u80FD\u4E3A0";
            }
            if (this.data.ly === 'retail' || this.data.ly === 'retailNew') {
                if (suggestPrice && ((+price < suggestPrice * 0.5) || (+price > suggestPrice * 1.75))) {
                    errMsg = "\u7B2C" + (index + 1) + "\u4E2A\u5546\u54C1\u5EFA\u8BAE\u96F6\u552E\u4EF7L\u4E3A" + suggestPrice + "\u5143\uFF0C\u53EF\u586B\u8303\u56F4\u57280.5 \u500D\u52301.75\u500D\u4E4B\u95F4\u3002";
                }
            }
            return {
                empty: empty,
                finish: finish,
                errMsg: errMsg
            };
        },
        getParam: function () {
            var _a = this.data, itemInfo = _a.itemInfo, inventory = _a.inventory, quantity = _a.quantity, price = _a.price, amount = _a.amount, invState = _a.invState;
            var finish = itemInfo.productCode && itemInfo.model && inventory && quantity && price;
            return {
                itemInfo: itemInfo,
                inventory: inventory,
                quantity: quantity,
                price: price,
                amount: amount,
                finish: finish,
                invState: invState
            };
        },
        onQuantityChange: function (_a) {
            var detail = _a.detail;
            this.data.quantity = detail;
            this.$emit('quantityChange', {
                quantity: detail,
                index: this.data.index,
            });
            this.calcAmount();
            this.calcVolume();
        },
        onPriceChange: function (_a) {
            var detail = _a.detail;
            if (isNaN(+detail)) {
                var v = detail;
                if (detail.startsWith('.')) {
                    v = '0' + detail;
                }
                v = v.replace(/(\d+\.\d{0,2})(.*)/, "$1");
                this.data.price = v;
            }
            else {
                this.data.price = detail;
            }
            this.calcAmount('onPriceChange'); // 手动输入调用calcAmount函数，传参onPriceChange，方便在函数中进行特殊处理
        },
        onPriceBlur: function (_a) {
            var detail = _a.detail;
            var value = detail.value;
            if (isNaN(+value)) {
                var v = value;
                if (value.startsWith('.')) {
                    v = '0' + value;
                }
                v = v.replace(/(\d+\.\d{0,2})(.*)/, "$1");
                this.setData({
                    price: v,
                });
            }
            else if ((+value).toFixed(2) !== value) {
                // 说明小数点后两位
                var price = (+value).toFixed(2);
                this.setData({
                    price: price,
                });
            }
        },
        calcAmount: function (type) {
            var _a = this.data, price = _a.price, quantity = _a.quantity, amount = _a.amount;
            var newAmount = '0.00';
            if (price && quantity) {
                // 计算金额
                newAmount = (price * quantity).toFixed(2);
                this.setData({
                    amount: newAmount,
                });
                this.$emit('amountChange', {
                    amount: (+newAmount) - (+amount)
                });
            }
            else {
                this.setData({
                    amount: 0,
                });
                if (type && type === 'onPriceChange') { // 有type参数，且参数 type ==='onPriceChange' 为手动输入金额，手动输入金额如果金额为空的话依然向父组件传值
                    this.$emit('amountChange', {
                        amount: (+newAmount) - (+amount)
                    });
                }
            }
        },
        //动态计算体积
        calcVolume: function () {
            var _a = this.data, quantity = _a.quantity, volumeTotal = _a.volumeTotal;
            var volume = this.data.itemInfo.volume;
            var newVolume = '0.00';
            if (volume || volume === 0) {
                // 计算体积
                newVolume = (volume * quantity).toFixed(2);
                this.setData({
                    volumeTotal: newVolume,
                });
                this.$emit('volumeChange', {
                    volume: (+newVolume) - (+volumeTotal)
                });
            }
        },
        // 展示服务列表
        openServerPopVisible: function () {
            var itemInfo = this.data.itemInfo;
            if (itemInfo.serviceList && itemInfo.serviceList.length > 0) {
                this.setData({
                    serverPopVisible: true
                });
            }
        },
        // 关闭服务列表
        closeServerPopVisible: function () {
            this.setData({
                serverPopVisible: false
            });
        },
        // 选择服务列表
        onChooseService: function (_a) {
            var currentTarget = _a.currentTarget;
            if (currentTarget.dataset.issupport == 0) {
                return;
            }
            var key = currentTarget.dataset.key;
            var name = currentTarget.dataset.name;
            var ids = new Set(this.data.zoneB2cService);
            if (ids.has(key)) {
                ids.delete(key);
            }
            else {
                ids.add(key);
            }
            var zoneB2cService = Array.from(ids);
            var names = new Set(this.data.zoneB2cServiceName);
            if (names.has(name)) {
                names.delete(name);
            }
            else {
                names.add(name);
            }
            var zoneB2cServiceName = Array.from(names);
            this.setData({
                zoneB2cService: zoneB2cService,
                zoneB2cServiceName: zoneB2cServiceName
            });
            this.$emit('serviceChange', {
                zoneB2cService: zoneB2cService,
                zoneB2cServiceName: zoneB2cServiceName,
                index: this.data.index,
            });
        },
    }
});
