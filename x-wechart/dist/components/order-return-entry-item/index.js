"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../vant/common/component.js');
var toast_1 = require('./../vant/toast/toast.js');
component_1.VantComponent({
    props: {
        goodsinfo: Object,
    },
    data: {
    // returnQty: '',
    // bprice: '',
    // goodId: '',
    // amount: '',
    // warehouse: '安信大库', //仓库
    // stockStatus: '正品', //库存状态
    // batch: '选择批次',
    },
    watch: {
        'goodsinfo': function (item) {
            // this.setData({
            //   goodId: item.itemId,
            //   bprice: item.bprice,
            //   returnQty: item.returnQty,
            //   amount: parseFloat(item.amount).toFixed(2)
            // })
        }
    },
    methods: {
        // 公共方法 向父组件发送商品的最新状态
        trigger: function (num, index, itemId) {
            // TODO: 存放下单的必要信息 emit到父组件里面
            // const { goodId, amount, returnQty, bprice } = this.data
            // const detail = {
            //   itemId: goodId,
            //   bprice,
            //   returnQty,
            //   amount,
            // }
            var detail = {
                num: num,
                index: index,
                itemId: itemId,
            };
            this.$emit('returnInfo', detail);
        },
        choose: function (type, index, itemId) {
            this.$emit('choose', { type: type, index: index, itemId: itemId });
        },
        // 修改数量
        onChangeFieldNumber: function (e) {
            var detail = e.detail, dataset = e.target.dataset;
            var isNumber = /^[0-9]*$/;
            if (isNumber.test(detail)) {
                this.trigger(detail, dataset.index, dataset.itemid);
            }
            else {
                toast_1.default('请输入正确的商品数量');
            }
        },
        // 修改价格
        onChangeFieldPrice: function (e) {
            if (isNaN(+e.detail)) {
                var v = e.detail;
                if (e.detail.startsWith('.')) {
                    v = '0' + e.detail;
                }
                e.detail = v.replace(/(\d+\.\d{0,2})(.*)/, "$1");
            }
            var returnQty = this.data.returnQty;
            var amount = (returnQty * e.detail).toFixed(2);
            this.setData({
                bprice: e.detail,
                amount: amount
            });
            this.trigger();
        },
        onToggleWarehouse: function (e) {
            var _a = e.currentTarget.dataset, index = _a.index, itemid = _a.itemid;
            this.choose('warehouse', index, itemid);
        },
        onToggleBatch: function (e) {
            var _a = e.currentTarget.dataset, index = _a.index, itemid = _a.itemid;
            this.choose('batch', index, itemid);
        },
        handle: function (type, itemId, index) {
            var detail = { type: type, itemId: itemId, index: index };
            this.$emit('handle', detail);
        },
        onAdd: function (e) {
            var dataset = e.currentTarget.dataset;
            var itemId = dataset.itemid;
            this.handle('add', itemId);
        },
        onDel: function (e) {
            var dataset = e.currentTarget.dataset;
            var itemId = dataset.itemid;
            var index = dataset.index;
            this.handle('del', itemId, index);
        }
    }
});
