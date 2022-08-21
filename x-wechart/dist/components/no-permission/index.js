"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../vant/common/component.js');
component_1.VantComponent({
    props: {
        addHead: Boolean
    },
    methods: {
        gotoLogin: function () {
            wx.navigateTo({
                url: '/pages/auth/wechat/index'
            });
        },
        gotoHome: function () {
            wx.reLaunch({
                url: '/pages/main/home/index'
            });
        },
        goPage: function () {
            wx.reLaunch({
                url: '/pages/dms/intentionMerchants/index'
            });
        },
    }
});
