var _arity=require("./internal/_arity.js"),_concat=require("./internal/_concat.js"),_curry2=require("./internal/_curry2.js"),tryCatch=_curry2(function(r,t){return _arity(r.length,function(){try{return r.apply(this,arguments)}catch(r){return t.apply(this,_concat([r],arguments))}})});module.exports=tryCatch;