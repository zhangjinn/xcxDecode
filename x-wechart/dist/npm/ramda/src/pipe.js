function pipe(){if(0===arguments.length)throw new Error("pipe requires at least one argument");return _arity(arguments[0].length,reduce(_pipe,arguments[0],tail(arguments)))}var _arity=require("./internal/_arity.js"),_pipe=require("./internal/_pipe.js"),reduce=require("./reduce.js"),tail=require("./tail.js");module.exports=pipe;