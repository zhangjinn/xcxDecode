var _curry2=require("./internal/_curry2.js"),_assertPromise=require("./internal/_assertPromise.js"),otherwise=_curry2(function(r,e){return _assertPromise("otherwise",e),e.then(null,r)});module.exports=otherwise;