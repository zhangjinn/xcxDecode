"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Page({
    data: {
        baseUrl: ''
    },
    onLoad: function (options) {
        var id = options.id;
        this.baseUrl = 'http://b2b-front-cis.devapps.hisense.com/IntentionCust/interestedMerchants.nd?id=' + id;
        this.setData({
            baseUrl: 'http://b2b-front-cis.devapps.hisense.com/IntentionCust/interestedMerchants.nd?id=' + id
        });
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
});
