var _curry2=require("./internal/_curry2.js"),equals=require("./equals.js"),takeLast=require("./takeLast.js"),endsWith=_curry2(function(e,r){return equals(takeLast(e.length,r),e)});module.exports=endsWith;