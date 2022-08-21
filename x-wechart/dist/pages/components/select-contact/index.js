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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var order_1 = require('./../../../store/actions/order.js');
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
            type: {
                type: String,
                default: 'contact',
            },
            isRequired: {
                type: Boolean,
                default: false
            },
            prop: {
                type: Object,
                default: '',
            },
            disabled: {
                type: Boolean,
                default: false
            },
            val: {
                type: String,
                default: '',
            }
        };
        // 缓存触发
        _this.callback = function () { };
        _this.config = {
            usingComponents: {
                'van-field': '/components/vant/field/index',
            },
        };
        _this.data = {
            popShow: false,
            addressOptions: [],
            contacts: [],
            formData: {},
            contact: ''
        };
        _this.watch = {
            prop: function (v) {
                this.contact = v.contact;
                this.getContacts();
                this.$apply();
            }
        };
        _this.methods = {
            onChange: function (_a) {
                var detail = _a.detail;
                _this.formData = {
                    contact: { contact: detail, phone: _this.prop.contactInfo }
                };
                _this.contact = detail;
                _this.popShow = true;
                // this.getContacts()
                _this.toEmit();
                _this.$apply();
            },
            onCancel: function () {
                this.popShow = false;
                this.$apply();
            },
            onSelect: function (item) {
                this.formData = {
                    contact: item
                };
                this.contact = item.contact;
                this.popShow = false;
                this.toEmit();
                this.$apply();
            },
        };
        return _this;
    }
    Header.prototype.toEmit = function () {
        var param = {
            contact: this.formData.contact
        };
        this.$emit('chooseContact', param);
        this.$apply();
    };
    // 获取联系人列表
    Header.prototype.getContacts = function () {
        var _this = this;
        var param = {
            id: this.prop.shippingAddress.key,
        };
        this.methods.getAddressContacts(param).then(function (res) {
            if (res && res.payload && res.payload.list) {
                _this.contacts = res.payload.list;
                _this.$apply();
            }
        });
    };
    Header = __decorate([
        wepy_redux_1.connect({}, {
            getAMapV5Placeext: order_1.getAMapV5Placeext,
            getAddressContacts: order_1.getAddressContacts
        })
    ], Header);
    return Header;
}(wepy_1.default.component));
exports.default = Header;
