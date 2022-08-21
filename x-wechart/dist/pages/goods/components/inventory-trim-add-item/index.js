"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../../../../components/vant/common/component.js');
var dmsrequest_1 = require('./../../../../store/actions/dmsrequest.js');
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
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
        type: String,
        orgId: String,
        isDisabled: {
            type: Boolean,
            default: false // true表单不可修改，，，false表单可修改
        },
    },
    data: {
        inventory: '',
        inventoryName: '请选择',
        backInventory: '',
        backInventoryName: '请选择',
        invState: '',
        invStateName: '请选择',
        alertInvStatus: '',
        alertInvStatusName: '请选择',
        warehouseId: '',
        warehouseName: '请选择',
        quantity: '1',
        price: '',
        lock: false,
        time: '',
        amount: '0.00',
        chooseInvShow: false,
        wareHouseShow: false,
        chooseInvStateShow: false,
        bavailqty: 0,
        buTitle: '补差类型',
        kuTitle: '库存状态',
        buchaShow: false
    },
    watch: {
        'outInv': function (newValue, oldValue) {
            return newValue;
        },
        'warehouseId': function (newValue, oldValue) {
            //查询可用数量
            if (this.data.type !== 'otherIn') {
                this.getBavailqty();
            }
            return newValue;
        },
        'itemInfo': function (newValue, oldValue) {
            if (!newValue) {
                return;
            }
            var inventoryName = this.data.inventoryName;
            if (newValue.invStatusId && '请选择' === inventoryName && newValue.invStatus.length > 0) {
                var r = newValue.invStatus.filter(function (item) { return newValue.invStatusId === item.key; });
                if (r.length > 0) {
                    this.setData({
                        inventoryName: r[0].value
                    });
                    // info.inventoryName = r[0].name
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
            // this.calcVolume()
            // 如果传参isDisabled=true，表单不可编辑（销售数量、销售价格除外），补差类型默认是选择产品带过来的数据
            if (this.data.isDisabled) {
                this.setData({
                    inventory: newValue.invStatusId ? newValue.invStatusId : '',
                    inventoryName: newValue.invStatusName ? newValue.invStatusName : '请选择',
                    invState: newValue.invStatusType ? newValue.invStatusType : '',
                    invStateName: newValue.invStatusTypeName ? newValue.invStatusTypeName : '请选择',
                    bavailqty: newValue.bigQty,
                });
            }
        },
        'orgId': function (newValue, oldValue) {
            if (newValue) {
                // this.getBucha();
            }
            return newValue;
        }
    },
    methods: {
        getBucha: function () {
            var _this = this;
            var app = this;
            dmsrequest_1.dmsRequest({
                data: {
                    'cisCode': wepy_1.default.$instance.globalData.cisCode,
                    'orgCode': this.data.orgId
                },
                method: 'isEnableOrNot'
            }).then(function (res) {
                _this.buchaShow = res.data;
                _this.setData({
                    'buchaShow': res.data,
                });
            });
        },
        chooseItem: function () {
            this.$emit('chooseItem', {
                id: this.data.itemId,
                type: this.data.type
            });
        },
        del: function () {
            this.$emit('itemDel', {
                id: this.data.itemId,
                amount: this.data.amount
                // volume: this.data.volume
            });
        },
        // 库存状态
        openChooseInv: function (_a) {
            var currentTarget = _a.currentTarget;
            var dataset = currentTarget.dataset;
            var title = dataset.title;
            var _b = this.data, isDisabled = _b.isDisabled, itemInfo = _b.itemInfo;
            if (title == 'back') {
                this.kuTitle = "调整后库存状态";
            }
            else {
                this.kuTitle = "库存状态";
                if (isDisabled) {
                    return;
                }
            }
            if (itemInfo.invStatus.length > 0) {
                this.setData({
                    chooseInvShow: true,
                    kuTitle: this.kuTitle
                });
            }
        },
        onClose: function () {
            this.setData({
                chooseInvShow: false
            });
        },
        // 选择库存状态
        chooseInv: function (_a) {
            var currentTarget = _a.currentTarget;
            var dataset = currentTarget.dataset;
            var key = dataset.key;
            var invStatus = this.data.itemInfo.invStatus;
            for (var index in invStatus) {
                var status = invStatus[index];
                if (status.key === key) {
                    if (this.kuTitle == '库存状态') {
                        this.setData({
                            inventory: status.key,
                            inventoryName: status.value,
                            chooseInvShow: false
                        });
                        break;
                    }
                    else {
                        this.setData({
                            backInventory: status.key,
                            backInventoryName: status.value,
                            chooseInvShow: false
                        });
                        break;
                    }
                }
            }
            //查询可用数量
            if (this.data.type !== 'otherIn') {
                this.getBavailqty();
            }
        },
        // 点击补差类型
        openChooseInvState: function (_a) {
            var currentTarget = _a.currentTarget;
            var dataset = currentTarget.dataset;
            var title = dataset.title;
            var _b = this.data, isDisabled = _b.isDisabled, itemInfo = _b.itemInfo;
            if (title == 'back') {
                this.buTitle = "调整后补差类型";
            }
            else {
                this.buTitle = "补差类型";
                if (isDisabled) {
                    return;
                }
            }
            if (itemInfo.invStateTypes.length > 0) {
                this.setData({
                    chooseInvStateShow: true,
                    buTitle: this.buTitle
                });
            }
        },
        onCloseState: function () {
            this.setData({
                chooseInvStateShow: false
            });
        },
        // 选择补差类型
        chooseInvState: function (_a) {
            var currentTarget = _a.currentTarget;
            var dataset = currentTarget.dataset;
            var key = dataset.key;
            var title = dataset.title;
            var invStateTypes = this.data.itemInfo.invStateTypes;
            for (var index in invStateTypes) {
                var status = invStateTypes[index];
                if (status.key === key) {
                    if (this.buTitle !== "调整后补差类型") {
                        this.setData({
                            invState: status.key,
                            invStateName: status.value,
                            chooseInvStateShow: false
                        });
                        break;
                    }
                    else {
                        this.setData({
                            alertInvStatus: status.key,
                            alertInvStatusName: status.value,
                            chooseInvStateShow: false
                        });
                        break;
                    }
                }
            }
            //查询可用数量
            if (this.data.type !== 'otherIn') {
                this.getBavailqty();
            }
        },
        // 无
        openChooseWareHouse: function () {
            var itemInfo = this.data.itemInfo;
            this.setData({
                wareHouseShow: true
            });
        },
        // 无
        onCloseWarehouse: function () {
            this.setData({
                wareHouseShow: false
            });
        },
        // 无
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
            if (this.data.type !== 'otherIn') {
                this.getBavailqty();
            }
        },
        //获取可用库存
        getBavailqty: function () {
            var _this = this;
            try {
                var _a = this.data, itemInfo = _a.itemInfo, warehouseId = _a.warehouseId, invState = _a.invState, inventory = _a.inventory;
                if (itemInfo.productCode && warehouseId && inventory) {
                    var bavailqtyPromise = dmsrequest_1.dmsRequest({
                        data: {
                            productCode: itemInfo.productCode,
                            warehouseId: warehouseId,
                            invStatusType: invState,
                            invStatusId: inventory,
                            invBatchId: '',
                        },
                        method: 'getInvQty'
                    }).then(function (res) {
                        var bavailqty = res.bavailqty;
                        var code = res.code;
                        if (code == 0) {
                            _this.setData({
                                bavailqty: bavailqty,
                            });
                        }
                    }).catch(function (error) {
                        _this.setData({
                            bavailqty: 0,
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
            var _a = this.data, itemInfo = _a.itemInfo, inventory = _a.inventory, quantity = _a.quantity, price = _a.price, index = _a.index, outInv = _a.outInv, invState = _a.invState, bavailqty = _a.bavailqty;
            var empty = !itemInfo.productCode && !inventory && !price;
            var finish = itemInfo.productCode && itemInfo.model && inventory && price;
            var errMsg = '';
            //如果是否出库选择是，销售数量不可大于可用数量
            //是否出库选择否，仓库不是必填，如果没有选择仓库，产品行上没有可用数量字段，如果是否出库选择是，仓库必填
            if (outInv && outInv.name === '是') {
                // 验证数量
                if (this.data.type !== 'otherIn') {
                    if (quantity * 1 > bavailqty) {
                        errMsg = "\u7B2C" + (index + 1) + "\u4E2A\u5546\u54C1\u7684\u8C03\u62E8\u6570\u91CF\u4E0D\u53EF\u5927\u4E8E\u53EF\u7528\u6570\u91CF";
                    }
                }
            }
            if (!empty && !finish) {
                // 错误
                errMsg = "\u7B2C" + (index + 1) + "\u4E2A\u5546\u54C1\u7684\u4FE1\u606F\u4E0D\u5B8C\u6574";
                if (!inventory) {
                    errMsg = "\u7B2C" + (index + 1) + "\u4E2A\u5546\u54C1\u7684\u5E93\u5B58\u72B6\u6001\u4E0D\u5B8C\u6574";
                }
                else if (!price) {
                    errMsg = "\u7B2C" + (index + 1) + "\u4E2A\u5546\u54C1\u7684\u4EF7\u683C\u4E0D\u5B8C\u6574";
                }
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
            return {
                empty: empty,
                finish: finish,
                errMsg: errMsg
            };
        },
        getParam: function () {
            var _a = this.data, itemInfo = _a.itemInfo, inventory = _a.inventory, quantity = _a.quantity, price = _a.price, amount = _a.amount, invState = _a.invState, alertInvStatus = _a.alertInvStatus, backInventory = _a.backInventory;
            var finish = itemInfo.productCode && itemInfo.model && inventory && quantity;
            return {
                itemInfo: itemInfo,
                inventory: inventory,
                quantity: quantity,
                price: price,
                amount: amount,
                finish: finish,
                invState: invState,
                alertInvStatus: alertInvStatus,
                backInventory: backInventory
            };
        },
        onQuantityChange: function (_a) {
            var detail = _a.detail;
            this.data.quantity = detail;
            this.calcAmount();
            // this.calcVolume()
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
            this.calcAmount();
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
        calcAmount: function () {
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
        },
    }
});
