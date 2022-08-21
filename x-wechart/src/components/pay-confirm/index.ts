import wepy from 'wepy';
import { trim } from 'ramda';
import { request } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';

interface Data {
  price: number;
  show: boolean;
  password: string;
  passwordVisible: boolean;
  subStatus: boolean;
}

export default class PayConfirm extends wepy.component {

  data: Data = {
    price: 0,
    show: false,
    password: '',
    passwordVisible: false,
    subStatus: true
  };
  callback = '';
  methods = {
    togglePwd() {
      this.passwordVisible = !this.passwordVisible;
    },
    show(price: number, callback: any) {
      this.price = parseFloat(price).toFixed(2);
      this.show = true;
      if (callback) {
        this.callback = callback;
      }
    },
    close() {
      this.price = 0;
      this.show = false;
      this.password = '';
    },
    onChange(evt: any) {
      this.password = trim(evt.detail);
    },
    validatePwd() {
      if(!this.subStatus){
        Toast.fail({
          message: '不可重复提交',
          zIndex: 9999999
        });
        return
      }
      //按钮置为不可用
      this.subStatus = false;
      if (this.password) {
        Toast.loading({
          message: '密码校验中...',
          forbidClick: true,
          duration: 0,
          zIndex: 9999999
        });
        request({
          api: 'checkPayPwd.nd',
          method: 'POST',
          data: { payPwd: this.password },
          callback: (res: any) => {
            Toast.clear();
            const { code, msg } = res.data;
            if (code == 0) {
              this.price = 0;
              this.show = false;
              this.password = '';
              this.$apply();
              this.callback();
            } else {
              Toast.fail({
                message: msg || '密码错误',
                zIndex: 9999999
              });
            }
            //按钮置为可用
            this.subStatus = true;
          },
        });
      } else {
        Toast('请输入密码');
      }
    },
  };

}
