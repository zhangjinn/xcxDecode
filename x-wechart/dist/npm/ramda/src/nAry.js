var _curry2=require("./internal/_curry2.js"),nAry=_curry2(function(r,n){switch(r){case 0:return function(){return n.call(this)};case 1:return function(r){return n.call(this,r)};case 2:return function(r,t){return n.call(this,r,t)};case 3:return function(r,t,e){return n.call(this,r,t,e)};case 4:return function(r,t,e,u){return n.call(this,r,t,e,u)};case 5:return function(r,t,e,u,c){return n.call(this,r,t,e,u,c)};case 6:return function(r,t,e,u,c,a){return n.call(this,r,t,e,u,c,a)};case 7:return function(r,t,e,u,c,a,i){return n.call(this,r,t,e,u,c,a,i)};case 8:return function(r,t,e,u,c,a,i,s){return n.call(this,r,t,e,u,c,a,i,s)};case 9:return function(r,t,e,u,c,a,i,s,l){return n.call(this,r,t,e,u,c,a,i,s,l)};case 10:return function(r,t,e,u,c,a,i,s,l,o){return n.call(this,r,t,e,u,c,a,i,s,l,o)};default:throw new Error("First argument to nAry must be a non-negative integer no greater than ten")}});module.exports=nAry;