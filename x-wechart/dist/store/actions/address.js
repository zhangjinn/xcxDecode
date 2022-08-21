"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var request_1 = require('./../../utils/request.js');
var address_1 = require('./../types/address.js');
var dmsrequest_1 = require('./dmsrequest.js');
// 获取地址列表
exports.getAddressList = redux_actions_1.createAction(address_1.GET_ADDRESS_LIST, function (_a) {
    var page = _a.page, orgId = _a.orgId;
    return request_1.request({ api: "address/sendToAddressList.nd?page=" + page + "&orgId=" + orgId, method: 'POST' });
});
// dms 级联获取地址
exports.getDmsAddressCascade = redux_actions_1.createAction(address_1.DMS_ADDRESS_CASCADE, function (data) { return dmsrequest_1.dmsRequest({ data: data, method: 'addressCascade' }); });
