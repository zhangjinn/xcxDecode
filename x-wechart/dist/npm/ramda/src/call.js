var curry=require("./curry.js"),call=curry(function(r){return r.apply(this,Array.prototype.slice.call(arguments,1))});module.exports=call;