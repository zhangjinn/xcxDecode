var curryN=require("./curryN.js"),_curry1=require("./internal/_curry1.js"),thunkify=_curry1(function(r){return curryN(r.length,function(){var u=arguments;return function(){return r.apply(this,u)}})});module.exports=thunkify;