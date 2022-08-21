import { handleActions } from 'redux-actions';
import { find, propEq, forEach, includes, map, filter } from 'ramda';
import {
  GET_DESIGN_DATA_BY_ID, GET_DESIGN_ALL,
  GET_ACTIVITY_BY_ID, GET_TAB_ACTIVITY_BY_ID,
  GET_ACTIVITY_DESIGN_DATA
} from '../types/design';

// 处理模板数据 如果不在配置文件里面的则过滤
const handleTemplateData = (templates: [any], relations: [any]) => {
  // 处理权限列表
  const authMaps: any = {
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
  forEach(({ type, data, price }) => {
    if (type === 1) {
      authMaps[type].push(data);
      authMaps.goods.push({ data, price });
    } else {
      authMaps[type].push(data);
    }
  }, relations);

  const templatesFiltered: any = [];
  // const templateConfigItem = find(propEq('id', id), configs);
  // templates 是总的装修数据
  forEach((item) => {
    const { component, content }: any = item;
    const { url, items, coordinates } = content.data;
    // 处理图片 文字 标题
    if (component === 'tabs') {
      // 标签处理
      const itemArr = [];
      forEach((componentItem: any) => {
        if (includes(componentItem.id, authMaps['7'])) {
          itemArr.push(componentItem);
        }
      }, items);
      if (itemArr.length > 0) {
        templatesFiltered.push(item);
      }
    } else if (includes(component, ['image', 'text', 'title'])) {
      if (url && url.pageType) {
        // 如果组件的跳转链接在权限里面
        if (includes(url.value, authMaps[url.pageType])) {
          templatesFiltered.push(item);
        }
      } else {
        templatesFiltered.push(item);
      }
    } else if (includes(component, ['swiper', 'navigationBar'])) {
      // 轮播 导航
      const itemArr = [];
      forEach((componentItem: any) => {
        if (componentItem.url && componentItem.url.pageType) {
          if (includes(componentItem.url.value, authMaps[componentItem.url.pageType])) {
            itemArr.push(componentItem);
          }
        } else {
          itemArr.push(componentItem);
        }
      }, items);
      if (itemArr.length > 0) {
        templatesFiltered.push(item);
      }
    } else if (component === 'thermalZone') {
      const itemArr = [];
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
      } else {
        for (const index in coordinates) {
          const itemCoordinates = coordinates[index]
          if (itemCoordinates && itemCoordinates.url == undefined) {
            templatesFiltered.push(item);
            break
          } else {
            if (itemCoordinates.url && itemCoordinates.url.pageType) {
              if (includes(itemCoordinates.url.value, authMaps[itemCoordinates.url.pageType])) {
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
    } else if (includes(component, ['goodsCard', 'goodsSlider'])) {
      const itemArr: any = [];
      forEach((componentItem: any) => {
        const { id, orgCode, orgId } = componentItem;
        const goodsId = `${id}_${orgId}_${orgCode}`;
        if (includes(goodsId, authMaps['1'])) {
          const goodsItem: any = find(propEq('data', goodsId), authMaps.goods);
          if (goodsItem && goodsItem.price) {
            componentItem.price = goodsItem.price;
          } else {
            // componentItem.price = '';
            componentItem.price = -1;
          }
          itemArr.push(componentItem);
        }
      }, items);
      item.content.data.items = itemArr
      if (itemArr.length > 0) {
        templatesFiltered.push(item);
      }
    } else {
      templatesFiltered.push(item);
    }
  }, templates);
  return templatesFiltered;
};

export default handleActions({
  [GET_ACTIVITY_DESIGN_DATA](state, action) {
    const { payload }: any = action;
    let config = [];
    let tabs = null;
    if (payload && payload.list.length > 0) {
      config = payload.list
      //const tabList = filter(({ type,name }) => type === 2 && name!=='首页轮播图', config);
      const tabList = filter(({ type }) => type === 2, config);
      tabs = map((item) => ({ id: item.id, name: item.name }), tabList);
    }
    return {
      ...state,
      tabs,
      config,
    };
  },
  [GET_ACTIVITY_BY_ID](state, action) {
    const { payload: { id, data } }: any = action;
    let items = [];
    try {
      items = JSON.parse(data) || [];
      const urlRelations: any = find(propEq('id', id), state.config) || {};
      if (urlRelations.id && items.length > 0) {
        items = handleTemplateData(items, urlRelations.relations);
      }
    } catch (error) {
      items = [];
    }
    const relArr: any = []
    forEach((res: any) => {
      res.key = new Date().getTime()
      if (res && res.content && res.content.component == 'tabsDesign') {
        if (res.content.data && res.content.data.items && res.content.data.items.length > 0) {
          forEach((item: any) => {
            forEach((arr: any) => {
              if (item.id == arr.id) {
                relArr.push(item)
              }
            }, state.config)
          }, res.content.data.items)
          res.content.data.items = relArr
        }
      }
    }, items)
    return {
      ...state,
      activity: {
        loading: false,
        items,
      },
    };
  },
  [GET_TAB_ACTIVITY_BY_ID](state, action) {
    const { activity } = state
    const { payload: { id, data, designIndex } }: any = action;
    let items = [];
    try {
      items = JSON.parse(data) || [];
      const urlRelations: any = find(propEq('id', id), state.config) || {};
      if (urlRelations.id && items.length > 0) {
        items = handleTemplateData(items, urlRelations.relations);
      }
    } catch (error) {
      items = [];
    }
    const relArr: any = []
    // console.log(items)
    forEach((res: any) => {
      res.key = new Date().getTime()
      if (res && res.content && res.content.component == 'tabsDesign') {
        if (res.content.data && res.content.data.items && res.content.data.items.length > 0) {
          forEach((item: any) => {
            forEach((arr: any) => {
              if (item.id == arr.id) {
                relArr.push(item)
              }
            }, state.config)
          }, res.content.data.items)
          res.content.data.items = relArr
        }
      }
    }, items)


    return {
      ...state,
      activity: {
        loading: false,
        items: activity.items.slice(0, designIndex + 1).concat(items),
      },
    };
  },
  [GET_DESIGN_ALL](state, action) {
    const { payload: { id, data, config } }: any = action;
    let items = [];
    let tabs = null;
    try {
      items = JSON.parse(data);
      const tabList: any = filter(({ type }) => type === 2, config);
      tabs = map((item) => ({ id: item.id, name: item.name }), tabList);
      const urlRelations: any = find(propEq('id', id), config);
      if (urlRelations.id && items.length > 0) {
        items = handleTemplateData(items, urlRelations.relations);
      }
    } catch (error) {
      items = [];
    }
    return {
      ...state,
      config,
      tabs,
      activity: {
        loading: false,
        items,
      },
    };
  },
  [GET_DESIGN_DATA_BY_ID](state, action) {
    const { payload: { id, data } }: any = action;
    let items = [];
    try {
      items = JSON.parse(data) || [];
      const urlRelations: any = find(propEq('id', id), state.config) || {};
      if (urlRelations.id && items.length > 0) {
        items = handleTemplateData(items, urlRelations.relations);
      }
    } catch (error) {
      items = [];
    }
    return {
      ...state,
      other: {
        loading: false,
        items,
      },
    };
  },

}, {
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
