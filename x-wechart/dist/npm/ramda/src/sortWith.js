var _curry2=require("./internal/_curry2.js"),sortWith=_curry2(function(r,t){return Array.prototype.slice.call(t,0).sort(function(t,e){for(var o=0,n=0;0===o&&n<r.length;)o=r[n](t,e),n+=1;return o})});module.exports=sortWith;