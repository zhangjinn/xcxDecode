function pipeK(){if(0===arguments.length)throw new Error("pipeK requires at least one argument");return composeK.apply(this,reverse(arguments))}var composeK=require("./composeK.js"),reverse=require("./reverse.js");module.exports=pipeK;