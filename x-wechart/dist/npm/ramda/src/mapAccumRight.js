var _curry3=require("./internal/_curry3.js"),mapAccumRight=_curry3(function(r,u,c){for(var e=c.length-1,t=[],n=[u];e>=0;)n=r(n[0],c[e]),t[e]=n[1],e-=1;return[n[0],t]});module.exports=mapAccumRight;