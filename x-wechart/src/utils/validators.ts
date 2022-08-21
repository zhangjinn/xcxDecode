// const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9-]+[_|\_|\.-]?)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/;
const phoneReg = /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4(?:[14]0\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/;
const passwordReg = /^[a-zA-Z0-9_]*$/;
const taxNumRule = /^[A-Za-z0-9]{15}$|^[A-Za-z0-9]{18}$|^[A-Za-z0-9]{20}$/;

// 电子邮件
export const checkEmail = (value: string): boolean => {
  if (value && !emailReg.test(value)) {
    return false;
  } else {
    return true;
  }
};

export const checkPhone = (value: string): boolean => phoneReg.test(value);

export const isEmpty = (value: string): boolean => {
  if (!value || !passwordReg.test(value.replace(/\s/g, ''))) {
    return false;
  } else {
    return true;
  }
};

// 发票管理
export const valiTax = (value: string): boolean => taxNumRule.test(value);

// 密码校验规则
export const passwordValidate = (password: string) => {
  let message = '';
  if (!/^.{8,}$/.test(password)) {
    message = '密码至少8位';
  }
  if (!/^.*[0-9]+.*$/.test(password)) {
    message = '密码至少包含一个数字';
  }
  if (!/^.*[A-Za-z]+.*$/.test(password)) {
    message = '密码至少包含一个字母';
  }
  if (/^.*[<>')+\/&]+.*$/.test(password)) {
    message = '密码不能包含以下特殊字符<>\')+/&';
  }
  if (!/^.*[^<>')+\/&A-Za-z0-9]+.*$/.test(password)) {
    message = '密码必须包含一个特殊字符';
  }
  return message;
};

// 图片格式校验
export const isAssetTypeAnImage = (url: string) => {
  const IMAGE_EXT = ['jpeg','JPEG', 'jpg', 'JPG', 'gif', 'GIF', 'png', 'PNG', 'svg', 'SVG'];
  return IMAGE_EXT.some(ext => url.indexOf(`.${ext}`) !== -1);
}
