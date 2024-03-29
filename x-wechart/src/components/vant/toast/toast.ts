import { isObj } from '../common/utils';

type ToastMessage = string | number;

interface ToastOptions {
  show?: boolean;
  type?: string;
  mask?: boolean;
  zIndex?: number;
  context?: WechatMiniprogram.Component.TrivialInstance | WechatMiniprogram.Page.TrivialInstance;
  position?: string;
  duration?: number;
  selector?: string;
  forbidClick?: boolean;
  loadingType?: string;
  message?: ToastMessage;
  onClose?: () => void;
}

const defaultOptions = {
  type: 'text',
  mask: false,
  message: '',
  show: true,
  zIndex: 1000,
  duration: 3000,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular',
  selector: '#van-toast',
  recursive: ['#container', '#van-toast']
};

let queue = [];
let currentOptions: ToastOptions = { ...defaultOptions };

function parseOptions(message): ToastOptions {
  return isObj(message) ? message : { message };
}

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

function Toast(toastOptions: ToastOptions | ToastMessage): WechatMiniprogram.Component.TrivialInstance {
  const options = {
    ...currentOptions,
    ...parseOptions(toastOptions)
  } as ToastOptions;

  const context = options.context || getContext();
  const toast = context.selectComponent(options.selector);

  if (!toast) {
    let rcontext = context
    for (let i = 0; i < options.recursive.length; i++ ) {
      const selector = options.recursive[i];
      rcontext = rcontext.selectComponent(selector);
      if (!rcontext) {
        break
      }

      if (i === options.recursive.length - 1) {
        toast = rcontext // 找到了最里面的节点
      }
    }
  }
  if (!toast) {
    console.warn('未找到 van-toast 节点，请确认 selector 及 context 是否正确');
    return;
  }

  delete options.context;
  delete options.selector;

  toast.clear = () => {
    toast.set({ show: false });

    if (options.onClose) {
      options.onClose();
    }
  };

  queue.push(toast);
  toast.set(options);
  clearTimeout(toast.timer);

  if (options.duration > 0) {
    toast.timer = setTimeout(() => {
      toast.clear();
      queue = queue.filter(item => item !== toast);
    }, options.duration);
  }

  return toast;
}

const createMethod = (type: string) => (options: ToastOptions | ToastMessage) =>
  Toast({
    type,
    ...parseOptions(options)
  });

Toast.loading = createMethod('loading');
Toast.success = createMethod('success');
Toast.fail = createMethod('fail');

Toast.clear = () => {
  queue.forEach(toast => {
    toast.clear();
  });
  queue = [];
};

Toast.setDefaultOptions = (options: ToastOptions) => {
  Object.assign(currentOptions, options);
};

Toast.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
};

export default Toast;
