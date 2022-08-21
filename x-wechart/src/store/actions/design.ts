import { createAction } from 'redux-actions';
import { head } from 'ramda';
import { GET_ACTIVITY_DESIGN_DATA, GET_DESIGN_DATA_BY_ID, GET_DESIGN_ALL, GET_ACTIVITY_BY_ID, GET_TAB_ACTIVITY_BY_ID } from '@/store/types/design';
import { request } from '@/utils/request';

export const getDesignById = createAction(GET_DESIGN_DATA_BY_ID, (componentId: string, callback: any) => request({ api: 'wechat/designComponent/data.nd', data: { componentId }, callback }));

export const getActivityById = createAction(GET_ACTIVITY_BY_ID, (componentId: string, callback: any) => request({ api: 'wechat/designComponent/data.nd', data: { componentId }, callback }));

export const getTabActivityById = createAction(GET_TAB_ACTIVITY_BY_ID, async (componentId: string, designIndex: number, callback: any) => {
  const result = await request({ api: 'wechat/designComponent/data.nd', data: { componentId }, callback }, 'cis')
  return {
    ...result,
    designIndex
  }
});

export const getActivityDesignData = createAction(GET_ACTIVITY_DESIGN_DATA, () => request({ api: 'wechat/designComponent/getCurrCustDesignComponent.nd' }));

// 获取装修数据和配置文件
export const getDesignAll = createAction(GET_DESIGN_ALL, async (callback: any) => {
  let designTemplate: any = '';
  let id = '';
  let config: any = [];
  const res: any = await request({ api: 'wechat/designComponent/getCurrCustDesignComponent.nd' });
  if (res && res.list && res.list.length > 0) {
    config = res.list;
    const designData: any = head(res.list);
    id = designData.id;
    const templateRes: any = await request({ api: 'wechat/designComponent/data.nd', data: { componentId: designData.id } });
    if (templateRes && templateRes.data) {
      designTemplate = templateRes.data;
    }
  }
  if (callback) {
    callback();
  }
  return { id, config, data: designTemplate };
});
