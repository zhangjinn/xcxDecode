var _curry3=require("./internal/_curry3.js"),_has=require("./internal/_has.js"),mergeWithKey=_curry3(function(r,e,a){var i,n={};for(i in e)_has(i,e)&&(n[i]=_has(i,a)?r(i,e[i],a[i]):e[i]);for(i in a)_has(i,a)&&!_has(i,n)&&(n[i]=a[i]);return n});module.exports=mergeWithKey;