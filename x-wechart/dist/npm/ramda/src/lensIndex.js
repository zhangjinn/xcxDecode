var _curry1=require("./internal/_curry1.js"),lens=require("./lens.js"),nth=require("./nth.js"),update=require("./update.js"),lensIndex=_curry1(function(e){return lens(nth(e),update(e))});module.exports=lensIndex;