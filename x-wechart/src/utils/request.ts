import wepy from 'wepy';
import Toast from '../components/vant/toast/toast';
import { getStore } from 'wepy-redux';
import { LOADING_MSG, SHOW_POPUP_TOAST } from '@/store/types/loading';
import { setStorage, getCookie, getUrl,logInfo } from '@/utils/index';

/**
 * 测试环境: http://b2b-front-cis.devapps.hisense.com
 * 正式环境: http://b2b-front-cis.devapps.hisense.com
 */
// export const baseUrl = 'http://b2b-front-cis.devapps.hisense.com';
export const baseUrl = 'https://xtw.hisense.com/front';
export const baseUrl1 = 'http://xinshang.hisense.com:82';
const STATUS_CODE = {
  'user.not.match': '用户信息未找到',
  'Required String parameter \'mobile\' is not present': '手机号码格式不正确',
};

// 验证超时名单
const BLACK_LIST = {
  'product/list.nd': true
};

const IGNORE_MSG = {
  '会员不存在': true,
  '请登录！': true,
  '未绑定用户': true
};

interface Params {
  api: string;
  method?: 'GET'
  | 'OPTIONS'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';
  data?: any;
  type:string;
  header?: any;
  callback?: (res:any) => void;
}

export const request = ({ api, method = 'GET', data, type = 'form', header = {}, callback }: Params, sys: String = "normal") => new Promise((resolve, reject) => {

  const ignoreToastError = (data || {})['_ignoreToast']
  const usePopupError = (data || {})['_popup']
  const item = getUrl(api, sys)
  const dmsRequest = item.dmsRequest
  const url = item.url
  // 增强体验：加载中
  wx.showNavigationBarLoading();
  if (api.indexOf('_loading') > 0 || (data || {})['_loading']) {
    getStore().dispatch({ type: LOADING_MSG, payload: true })
    Toast.loading({
      message: '正在加载',
      duration: 15000,
    });
  }
  wepy.request({
    url,
    method,
    data,
    timeout: BLACK_LIST[api] ? 6000 : 0,
    header: { 'content-type': type == 'form' ? 'application/x-www-form-urlencoded;charset=utf-8' : 'application/json', ...header },
    success: (res: any) => {
      const { data } = res;

      const successStatus = res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 204
      const successMsg = (data.code || '0') === '0'
      if ((!dmsRequest && successStatus) || (dmsRequest && successStatus && successMsg)) {
        // 如果状态码为200，但是data.startWith <!DOCTYPE  则跳转至登录页面
        resolve(data);
      } else {
        if (!IGNORE_MSG[data.message || data.msg || '--'] && !ignoreToastError) {

          Toast.fail({
            forbidClick: true,
            duration: 2000,
            message: STATUS_CODE[data.message] || data.message || data.msg || '系统错误,请稍后重试',
          })

        } else if (usePopupError) {
          // 使用popup组件进行提示
          getStore().dispatch({ type: SHOW_POPUP_TOAST, payload: {
            info: data.msg,
            show: true
          } })

        }
        reject(res);
      }
    },
    fail: (err: any) => {
      if(err && err.errMsg == 'request:fail timeout') {
        wx.showToast({
          title: '请求超时',
          duration: 2000, // 提示的延迟时间，单位毫秒，默认：1500
          icon: 'none',
          mask: false, // 是否显示透明蒙层，防止触摸穿透，默认：false
        });
      }
      reject(err);
    },
    complete: (res: any) => {
      if(res.statusCode == 500) {
        logInfo(res)
      }
      // 隐藏加载提示
      wx.hideNavigationBarLoading();
      if (api.indexOf('_loading') > 0 || (data || {})['_loading']) {
        // 隐藏Loading
        Toast.clear()
        getStore().dispatch({ type: LOADING_MSG, payload: false })
      }
      // 获取响应 cookies
      const item = getUrl(api, sys)
      if (item.url.indexOf('xtw.hisense.com') > -1 || item.url.indexOf('b2b-front-cis.devapps.hisense.com') > -1) {
        let cookies = res.header ? res.header['Set-Cookie'] || res.header['set-cookie'] : ''
        if (cookies) {
          const token = getCookie('JSESSIONID', cookies);
          const globalData = wepy.$instance.globalData
          if (token && globalData.sessionId) {
            globalData.modifySession = token;
            globalData.sessionId = token;
            const item = {
              sessionid: token,
              ...globalData,
            }
            setStorage('b2b_token', JSON.stringify(item));
          }
        }
      }
      // tslint:disable-next-line: no-unused-expression
      callback && callback(res);
    },
  });
});
