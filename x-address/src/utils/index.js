
//自定义乘法运算
export const mulNum = (arg1, arg2) => {
  let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  }catch(e){}
  try{
    m += s2.split(".")[1].length
  }catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
