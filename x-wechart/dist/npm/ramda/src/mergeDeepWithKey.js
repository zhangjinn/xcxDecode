var _curry3=require("./internal/_curry3.js"),_isObject=require("./internal/_isObject.js"),mergeWithKey=require("./mergeWithKey.js"),mergeDeepWithKey=_curry3(function e(r,i,t){return mergeWithKey(function(i,t,u){return _isObject(t)&&_isObject(u)?e(r,t,u):r(i,t,u)},i,t)});module.exports=mergeDeepWithKey;