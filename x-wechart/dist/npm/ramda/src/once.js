var _arity=require("./internal/_arity.js"),_curry1=require("./internal/_curry1.js"),once=_curry1(function(r){var e,n=!1;return _arity(r.length,function(){return n?e:(n=!0,e=r.apply(this,arguments))})});module.exports=once;