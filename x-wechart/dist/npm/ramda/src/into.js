var _clone=require("./internal/_clone.js"),_curry3=require("./internal/_curry3.js"),_isTransformer=require("./internal/_isTransformer.js"),_reduce=require("./internal/_reduce.js"),_stepCat=require("./internal/_stepCat.js"),into=_curry3(function(r,e,n){return _isTransformer(r)?_reduce(e(r),r["@@transducer/init"](),n):_reduce(e(_stepCat(r)),_clone(r,[],[],!1),n)});module.exports=into;