function mapValues(r,e){return keys(e).reduce(function(u,n){return u[n]=r(e[n]),u},{})}var _curry1=require("./internal/_curry1.js"),apply=require("./apply.js"),curryN=require("./curryN.js"),max=require("./max.js"),pluck=require("./pluck.js"),reduce=require("./reduce.js"),keys=require("./keys.js"),values=require("./values.js"),applySpec=_curry1(function r(e){return e=mapValues(function(e){return"function"==typeof e?e:r(e)},e),curryN(reduce(max,0,pluck("length",values(e))),function(){var r=arguments;return mapValues(function(e){return apply(e,r)},e)})});module.exports=applySpec;