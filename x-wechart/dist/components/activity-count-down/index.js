"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../vant/common/component.js');
component_1.VantComponent({
    props: {
        time: Number
    },
    data: {
        timeData: {
            days: '',
            hours: '',
            minutes: '',
            seconds: ''
        }
    },
    methods: {
        onChange: function (e) {
            this.setData({
                timeData: e.detail
            });
        }
    }
});
