var _curry2=require("./internal/_curry2.js"),groupWith=_curry2(function(r,u){for(var e=[],o=0,t=u.length;o<t;){for(var i=o+1;i<t&&r(u[i-1],u[i]);)i+=1;e.push(u.slice(o,i)),o=i}return e});module.exports=groupWith;