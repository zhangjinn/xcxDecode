var _curry3=require("./internal/_curry3.js"),move=_curry3(function(e,c,r){var n=r.length,t=r.slice(),l=e<0?n+e:e,o=c<0?n+c:c,i=t.splice(l,1);return l<0||l>=r.length||o<0||o>=r.length?r:[].concat(t.slice(0,o)).concat(i).concat(t.slice(o,r.length))});module.exports=move;