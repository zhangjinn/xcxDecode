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
var _a;
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var address_1 = require('./../types/address.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[address_1.GET_ADDRESS_LIST] = function (state, action) {
        var payload = action.payload;
        var list = state.list;
        if (payload.currentPage === 1) {
            return __assign({}, state, { list: payload });
        }
        else {
            list.list = list.list.concat(payload.list);
            list.totalPages = payload.totalPages;
            list.currentPage = payload.currentPage; // 没啥用
            return __assign({}, state, { list: list });
        }
    },
    _a[address_1.DMS_ADDRESS_CASCADE] = function (state, action) {
        var payload = action.payload;
        var address = payload.address;
        var dmsAddress = state.dmsAddress;
        ramda_1.forEachObjIndexed(function (value, field) {
            dmsAddress[field] = [];
            ramda_1.forEachObjIndexed(function (value, key) {
                var item = {
                    name: value,
                    id: key,
                };
                dmsAddress[field].push(item);
            }, value);
        }, address);
        return __assign({}, state, { dmsAddress: __assign({}, dmsAddress) });
    },
    _a), {
    list: {
        totalPages: 0,
        list: []
    },
    dmsAddress: {
        province: [],
        city: [],
        country: [],
        town: []
    }
});
