var _concat=require("./_concat.js"),_curry2=require("./_curry2.js"),_xfBase=require("./_xfBase.js"),XAperture=function(){function t(t,r){this.xf=r,this.pos=0,this.full=!1,this.acc=new Array(t)}return t.prototype["@@transducer/init"]=_xfBase.init,t.prototype["@@transducer/result"]=function(t){return this.acc=null,this.xf["@@transducer/result"](t)},t.prototype["@@transducer/step"]=function(t,r){return this.store(r),this.full?this.xf["@@transducer/step"](t,this.getCopy()):t},t.prototype.store=function(t){this.acc[this.pos]=t,this.pos+=1,this.pos===this.acc.length&&(this.pos=0,this.full=!0)},t.prototype.getCopy=function(){return _concat(Array.prototype.slice.call(this.acc,this.pos),Array.prototype.slice.call(this.acc,0,this.pos))},t}(),_xaperture=_curry2(function(t,r){return new XAperture(t,r)});module.exports=_xaperture;