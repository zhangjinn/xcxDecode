var _curry1=require("./internal/_curry1.js"),_has=require("./internal/_has.js"),keys=require("./keys.js"),invert=_curry1(function(r){for(var e=keys(r),n=e.length,s=0,t={};s<n;){var u=e[s],a=r[u],i=_has(a,t)?t[a]:t[a]=[];i[i.length]=u,s+=1}return t});module.exports=invert;