var _curry1=require("./internal/_curry1.js"),curryN=require("./curryN.js"),max=require("./max.js"),pluck=require("./pluck.js"),reduce=require("./reduce.js"),allPass=_curry1(function(r){return curryN(reduce(max,0,pluck("length",r)),function(){for(var e=0,u=r.length;e<u;){if(!r[e].apply(this,arguments))return!1;e+=1}return!0})});module.exports=allPass;