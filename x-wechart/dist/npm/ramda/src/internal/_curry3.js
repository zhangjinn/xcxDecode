function _curry3(r){return function e(c,u,l){switch(arguments.length){case 0:return e;case 1:return _isPlaceholder(c)?e:_curry2(function(e,u){return r(c,e,u)});case 2:return _isPlaceholder(c)&&_isPlaceholder(u)?e:_isPlaceholder(c)?_curry2(function(e,c){return r(e,u,c)}):_isPlaceholder(u)?_curry2(function(e,u){return r(c,e,u)}):_curry1(function(e){return r(c,u,e)});default:return _isPlaceholder(c)&&_isPlaceholder(u)&&_isPlaceholder(l)?e:_isPlaceholder(c)&&_isPlaceholder(u)?_curry2(function(e,c){return r(e,c,l)}):_isPlaceholder(c)&&_isPlaceholder(l)?_curry2(function(e,c){return r(e,u,c)}):_isPlaceholder(u)&&_isPlaceholder(l)?_curry2(function(e,u){return r(c,e,u)}):_isPlaceholder(c)?_curry1(function(e){return r(e,u,l)}):_isPlaceholder(u)?_curry1(function(e){return r(c,e,l)}):_isPlaceholder(l)?_curry1(function(e){return r(c,u,e)}):r(c,u,l)}}}var _curry1=require("./_curry1.js"),_curry2=require("./_curry2.js"),_isPlaceholder=require("./_isPlaceholder.js");module.exports=_curry3;