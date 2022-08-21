"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var wepy_redux_1 = require('./../../npm/wepy-redux/lib/index.js');
var order_1 = require('./../../store/actions/order.js');
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    function Address() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
            title: {
                type: String,
            },
        };
        _this.itemsCache = [];
        _this.callback = null;
        _this.data = {
            show: false,
            id: '',
            code: '',
            items: [],
            matklId: '',
            orgId: '',
            type: '',
        };
        _this.methods = {
            onSearchChange: function (evt) {
                var key = ramda_1.trim(evt.detail);
                if (key) {
                    this.items = ramda_1.filter(function (_a) {
                        var name = _a.name;
                        return ramda_1.includes(key, name);
                    }, this.itemsCache);
                }
                else {
                    this.items = this.itemsCache;
                }
            },
            fixadress: function (list) {
                return ramda_1.map(function (_a) {
                    var id = _a.id, address = _a.address;
                    return {
                        id: id,
                        name: address,
                    };
                }, list || []);
            },
            chooseItem: function (item) {
                var _this = this;
                if (this.type == 'fxs') {
                    this.id = item.id;
                    this.code = item.code;
                    var allinfo_1 = {
                        id: '',
                        code: '',
                        name: '',
                        address: [],
                        contact: '',
                        phone: ''
                    };
                    allinfo_1.id = item.id;
                    allinfo_1.code = item.code;
                    allinfo_1.name = item.name;
                    this.methods.getDistributorAddress({
                        customerId: item.id,
                        orgId: this.orgId,
                        matklId: this.matklId
                    }).then(function (res) {
                        if (res && res.payload && res.payload.length > 0) {
                            allinfo_1.address = _this.methods.fixadress(res.payload);
                            var id = res.payload[0].id;
                            _this.methods.getPeopleContacts({ sendToId: id }).then(function (item) {
                                allinfo_1.contact = item.payload.contact;
                                allinfo_1.phone = item.payload.phone;
                            }).then(function () {
                                _this.callback && _this.callback(allinfo_1);
                            });
                        }
                        else {
                            allinfo_1.contact = '';
                            allinfo_1.phone = '';
                            _this.callback && _this.callback(allinfo_1);
                        }
                    });
                }
                else {
                    this.id = item.id;
                    this.code = item.code;
                    var allinfo_2 = __assign({}, item);
                    this.methods.getPeopleContacts({ sendToId: item.id }).then(function (item) {
                        allinfo_2.contact = item.payload.contact;
                        allinfo_2.phone = item.payload.phone;
                    }).then(function () {
                        _this.callback && _this.callback(allinfo_2);
                    });
                    this.items = this.itemsCache;
                    this.show = false;
                }
                this.items = this.itemsCache;
                this.show = false;
            },
            closeSearch: function () {
                this.show = false;
            },
            open: function (items, id, orgId, matklId, type, callback) {
                this.matklId = matklId;
                this.orgId = orgId;
                this.itemsCache = items;
                this.type = type;
                this.id = id;
                this.items = items;
                this.callback = callback;
                this.show = true;
            },
            openNormal: function (items, id, type, callback) {
                this.type = type;
                this.itemsCache = items;
                this.id = id;
                this.code = id;
                this.items = items;
                this.callback = callback;
                this.show = true;
            }
        };
        return _this;
    }
    Address = __decorate([
        wepy_redux_1.connect({
            user: function (_a) {
                var user = _a.user;
                return user.info;
            },
            list: function (_a) {
                var cart = _a.cart;
                return cart.list;
            },
        }, {
            getPeopleContacts: order_1.getPeopleContacts,
            getDistributorAddress: order_1.getDistributorAddress
        })
    ], Address);
    return Address;
}(wepy_1.default.component));
exports.default = Address;
