var _curry2=require("./internal/_curry2.js"),_isString=require("./internal/_isString.js"),nth=_curry2(function(r,n){var t=r<0?n.length+r:r;return _isString(n)?n.charAt(t):n[t]});module.exports=nth;