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
var wepy_1 = require('./../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../npm/wepy-redux/lib/index.js');
var classification_1 = require('./../store/actions/classification.js');
//
// 将此mixin放在第一个
//
// 供应商使用使用user.organizationList | 或者使用修改后的organizationList , 头部增加了全部, 数据格式为{id: '', name: ''}
// 物料组根据供应商变化, 选中organization.id, 在orgMatkl中查找有权限的物料组
//
var SystemMixins = /** @class */ (function (_super) {
    __extends(SystemMixins, _super);
    function SystemMixins() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {
            orgMatkl: {},
            organizationList: [],
        };
        _this.watch = {
            'user': function (newValue) {
                this.$mixins[0].methods.calcAuth(newValue, this.specialfilters, this);
            },
            'specialfilters': function (newValue) {
                this.$mixins[0].methods.calcAuth(this.user, newValue, this);
                this.$apply();
            }
        };
        _this.methods = {
            calcAuth: function (user, specialfilters, context) {
                var auth = {};
                (user.orgAndMatklList || []).forEach(function (mapping) {
                    var orgId = Object.keys(mapping)[0];
                    var matklId = mapping[orgId];
                    var matklName = ((specialfilters.productGroupMap || []).find(function (item) { return item.key === "" + matklId; }) || {}).value;
                    if (matklName) {
                        var key = "_" + orgId;
                        if (auth[key]) {
                            auth[key].push({
                                id: matklId,
                                name: matklName,
                            });
                        }
                        else {
                            auth[key] = [{
                                    id: '',
                                    name: '全部'
                                }, {
                                    id: matklId,
                                    name: matklName,
                                }];
                        }
                    }
                });
                var organizationList = (user.organizationList || []).map(function (_a) {
                    var id = _a.id, organizationName = _a.organizationName;
                    return {
                        id: id,
                        name: organizationName,
                    };
                });
                context.organizationList = [{
                        id: '',
                        name: '全部'
                    }].concat(organizationList);
                context.orgMatkl = auth;
                context.$apply();
            }
        };
        return _this;
    }
    SystemMixins.prototype.onLoad = function () {
        this.$mixins[0].methods.getSpecialFilters();
    };
    SystemMixins.prototype.onUnload = function () {
        this.classification.specialfilters = [];
    };
    SystemMixins = __decorate([
        wepy_redux_1.connect({
            user: function (_a) {
                var user = _a.user;
                return user;
            },
            specialfilters: function (_a) {
                var classification = _a.classification;
                return classification.specialfilters;
            },
            classification: function (_a) {
                var classification = _a.classification;
                return classification;
            }
        }, {
            // 使用本mixins的页面|组件connect此方法
            getSpecialFilters: classification_1.getSpecialFilters
        })
    ], SystemMixins);
    return SystemMixins;
}(wepy_1.default.mixin));
exports.default = SystemMixins;
