var _arity=require("./internal/_arity.js"),_curry1=require("./internal/_curry1.js"),_curry2=require("./internal/_curry2.js"),_curryN=require("./internal/_curryN.js"),curryN=_curry2(function(r,u){return 1===r?_curry1(u):_arity(r,_curryN(r,[],u))});module.exports=curryN;