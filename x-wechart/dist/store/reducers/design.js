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
var ramda_1 = require('./../../npm/ramda/src/index.js');
var design_1 = require('./../types/design.js');
// 处理模板数据 如果不在配置文件里面的则过滤
var handleTemplateData = function (templates, relations) {
    // 处理权限列表
    var authMaps = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        goods: [],
    };
    ramda_1.forEach(function (_a) {
        var type = _a.type, data = _a.data, price = _a.price;
        if (type === 1) {
            authMaps[type].push(data);
            authMaps.goods.push({ data: data, price: price });
        }
        else {
            authMaps[type].push(data);
        }
    }, relations);
    var templatesFiltered = [];
    // const templateConfigItem = find(propEq('id', id), configs);
    // templates 是总的装修数据
    ramda_1.forEach(function (item) {
        var component = item.component, content = item.content;
        var _a = content.data, url = _a.url, items = _a.items, coordinates = _a.coordinates;
        // 处理图片 文字 标题
        if (component === 'tabs') {
            // 标签处理
            var itemArr_1 = [];
            ramda_1.forEach(function (componentItem) {
                if (ramda_1.includes(componentItem.id, authMaps['7'])) {
                    itemArr_1.push(componentItem);
                }
            }, items);
            if (itemArr_1.length > 0) {
                templatesFiltered.push(item);
            }
        }
        else if (ramda_1.includes(component, ['image', 'text', 'title'])) {
            if (url && url.pageType) {
                // 如果组件的跳转链接在权限里面
                if (ramda_1.includes(url.value, authMaps[url.pageType])) {
                    templatesFiltered.push(item);
                }
            }
            else {
                templatesFiltered.push(item);
            }
        }
        else if (ramda_1.includes(component, ['swiper', 'navigationBar'])) {
            // 轮播 导航
            var itemArr_2 = [];
            ramda_1.forEach(function (componentItem) {
                if (componentItem.url && componentItem.url.pageType) {
                    if (ramda_1.includes(componentItem.url.value, authMaps[componentItem.url.pageType])) {
                        itemArr_2.push(componentItem);
                    }
                }
                else {
                    itemArr_2.push(componentItem);
                }
            }, items);
            if (itemArr_2.length > 0) {
                templatesFiltered.push(item);
            }
        }
        else if (component === 'thermalZone') {
            var itemArr = [];
            // 图片热区
            // 原逻辑
            // forEach((componentItem: any) => {
            //   if (componentItem.url && componentItem.url.pageType) {
            //     if (includes(componentItem.url.value, authMaps[componentItem.url.pageType])) {
            //       itemArr.push(componentItem);
            //     }
            //   }
            // }, coordinates);
            // if (itemArr.length > 0) {
            //   templatesFiltered.push(item);
            // }
            // 新逻辑
            if (coordinates && coordinates.length == 0) {
                templatesFiltered.push(item);
            }
            else {
                for (var index in coordinates) {
                    var itemCoordinates = coordinates[index];
                    if (itemCoordinates && itemCoordinates.url == undefined) {
                        templatesFiltered.push(item);
                        break;
                    }
                    else {
                        if (itemCoordinates.url && itemCoordinates.url.pageType) {
                            if (ramda_1.includes(itemCoordinates.url.value, authMaps[itemCoordinates.url.pageType])) {
                                itemArr.push(itemCoordinates);
                            }
                        }
                        if (itemArr.length > 0) {
                            templatesFiltered.push(item);
                        }
                    }
                }
            }
            // 修改 暂时不用 与上面新逻辑代码等价  但是少了一次遍历数组
            // if( coordinates && coordinates.length == 0) {
            //   templatesFiltered.push(item);
            // } else if (findIndex(propEq('url', undefined), coordinates) > -1) {
            //    templatesFiltered.push(item);
            // } else {
            //   forEach((componentItem: any) => {
            //     if (componentItem.url && componentItem.url.pageType) {
            //       if (includes(componentItem.url.value, authMaps[componentItem.url.pageType])) {
            //         itemArr.push(componentItem);
            //       }
            //     }
            //   }, coordinates);
            // }
        }
        else if (ramda_1.includes(component, ['goodsCard', 'goodsSlider'])) {
            var itemArr_3 = [];
            ramda_1.forEach(function (componentItem) {
                var id = componentItem.id, orgCode = componentItem.orgCode, orgId = componentItem.orgId;
                var goodsId = id + "_" + orgId + "_" + orgCode;
                if (ramda_1.includes(goodsId, authMaps['1'])) {
                    var goodsItem = ramda_1.find(ramda_1.propEq('data', goodsId), authMaps.goods);
                    if (goodsItem && goodsItem.price) {
                        componentItem.price = goodsItem.price;
                    }
                    else {
                        // componentItem.price = '';
                        componentItem.price = -1;
                    }
                    itemArr_3.push(componentItem);
                }
            }, items);
            item.content.data.items = itemArr_3;
            if (itemArr_3.length > 0) {
                templatesFiltered.push(item);
            }
        }
        else {
            templatesFiltered.push(item);
        }
    }, templates);
    return templatesFiltered;
};
exports.default = redux_actions_1.handleActions((_a = {},
    _a[design_1.GET_ACTIVITY_DESIGN_DATA] = function (state, action) {
        var payload = action.payload;
        var config = [];
        var tabs = null;
        if (payload && payload.list.length > 0) {
            config = payload.list;
            //const tabList = filter(({ type,name }) => type === 2 && name!=='首页轮播图', config);
            var tabList = ramda_1.filter(function (_a) {
                var type = _a.type;
                return type === 2;
            }, config);
            tabs = ramda_1.map(function (item) { return ({ id: item.id, name: item.name }); }, tabList);
        }
        return __assign({}, state, { tabs: tabs,
            config: config });
    },
    _a[design_1.GET_ACTIVITY_BY_ID] = function (state, action) {
        var _a = action.payload, id = _a.id, data = _a.data;
        var items = [];
        try {
            items = JSON.parse(data) || [];
            var urlRelations = ramda_1.find(ramda_1.propEq('id', id), state.config) || {};
            if (urlRelations.id && items.length > 0) {
                items = handleTemplateData(items, urlRelations.relations);
            }
        }
        catch (error) {
            items = [];
        }
        var relArr = [];
        ramda_1.forEach(function (res) {
            res.key = new Date().getTime();
            if (res && res.content && res.content.component == 'tabsDesign') {
                if (res.content.data && res.content.data.items && res.content.data.items.length > 0) {
                    ramda_1.forEach(function (item) {
                        ramda_1.forEach(function (arr) {
                            if (item.id == arr.id) {
                                relArr.push(item);
                            }
                        }, state.config);
                    }, res.content.data.items);
                    res.content.data.items = relArr;
                }
            }
        }, items);
        return __assign({}, state, { activity: {
                loading: false,
                items: items,
            } });
    },
    _a[design_1.GET_TAB_ACTIVITY_BY_ID] = function (state, action) {
        var activity = state.activity;
        var _a = action.payload, id = _a.id, data = _a.data, designIndex = _a.designIndex;
        var items = [];
        try {
            items = JSON.parse(data) || [];
            var urlRelations = ramda_1.find(ramda_1.propEq('id', id), state.config) || {};
            if (urlRelations.id && items.length > 0) {
                items = handleTemplateData(items, urlRelations.relations);
            }
        }
        catch (error) {
            items = [];
        }
        var relArr = [];
        // console.log(items)
        ramda_1.forEach(function (res) {
            res.key = new Date().getTime();
            if (res && res.content && res.content.component == 'tabsDesign') {
                if (res.content.data && res.content.data.items && res.content.data.items.length > 0) {
                    ramda_1.forEach(function (item) {
                        ramda_1.forEach(function (arr) {
                            if (item.id == arr.id) {
                                relArr.push(item);
                            }
                        }, state.config);
                    }, res.content.data.items);
                    res.content.data.items = relArr;
                }
            }
        }, items);
        return __assign({}, state, { activity: {
                loading: false,
                items: activity.items.slice(0, designIndex + 1).concat(items),
            } });
    },
    _a[design_1.GET_DESIGN_ALL] = function (state, action) {
        var _a = action.payload, id = _a.id, data = _a.data, config = _a.config;
        var items = [];
        var tabs = null;
        try {
            items = JSON.parse(data);
            var tabList = ramda_1.filter(function (_a) {
                var type = _a.type;
                return type === 2;
            }, config);
            tabs = ramda_1.map(function (item) { return ({ id: item.id, name: item.name }); }, tabList);
            var urlRelations = ramda_1.find(ramda_1.propEq('id', id), config);
            if (urlRelations.id && items.length > 0) {
                items = handleTemplateData(items, urlRelations.relations);
            }
        }
        catch (error) {
            items = [];
        }
        return __assign({}, state, { config: config,
            tabs: tabs, activity: {
                loading: false,
                items: items,
            } });
    },
    _a[design_1.GET_DESIGN_DATA_BY_ID] = function (state, action) {
        var _a = action.payload, id = _a.id, data = _a.data;
        var items = [];
        try {
            items = JSON.parse(data) || [];
            var urlRelations = ramda_1.find(ramda_1.propEq('id', id), state.config) || {};
            if (urlRelations.id && items.length > 0) {
                items = handleTemplateData(items, urlRelations.relations);
            }
        }
        catch (error) {
            items = [];
        }
        return __assign({}, state, { other: {
                loading: false,
                items: items,
            } });
    },
    _a), {
    config: [],
    tabs: null,
    activity: {
        loading: true,
        items: [],
    },
    other: {
        loading: true,
        items: [],
    },
});
