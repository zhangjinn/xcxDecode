"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../vant/common/component.js');
var dmsrequest_1 = require('./../../store/actions/dmsrequest.js');
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
component_1.VantComponent({
    props: {
        item: Object,
    },
    data: {
        materialGroup: []
    },
    watch: {
        // 监听传入参数
        'item': function (item) {
            var _a = item.customerCode, customerCode = _a === void 0 ? '' : _a, _b = item.orgId, orgId = _b === void 0 ? '' : _b;
            var context = this;
            var cisCode = wepy_1.default.$instance.globalData.cisCode;
            if (customerCode !== '') {
                dmsrequest_1.dmsRequest({
                    data: {
                        cisCode: cisCode,
                        customerCode: customerCode,
                        orgId: orgId,
                    },
                    method: 'findMaterialByCustomer'
                }).then(function (res) {
                    if (res && res.code == '0') {
                        context.setData({
                            materialGroup: res.materialGroup
                        });
                    }
                });
            }
        }
    },
    methods: {},
});
