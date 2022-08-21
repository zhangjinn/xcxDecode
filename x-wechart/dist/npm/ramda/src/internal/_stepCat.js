function _stepCat(r){if(_isTransformer(r))return r;if(_isArrayLike(r))return _stepCatArray;if("string"==typeof r)return _stepCatString;if("object"==typeof r)return _stepCatObject;throw new Error("Cannot create transformer for "+r)}var _objectAssign=require("./_objectAssign.js"),_identity=require("./_identity.js"),_isArrayLike=require("./_isArrayLike.js"),_isTransformer=require("./_isTransformer.js"),objOf=require("./../objOf.js"),_stepCatArray={"@@transducer/init":Array,"@@transducer/step":function(r,t){return r.push(t),r},"@@transducer/result":_identity},_stepCatString={"@@transducer/init":String,"@@transducer/step":function(r,t){return r+t},"@@transducer/result":_identity},_stepCatObject={"@@transducer/init":Object,"@@transducer/step":function(r,t){return _objectAssign(r,_isArrayLike(t)?objOf(t[0],t[1]):t)},"@@transducer/result":_identity};module.exports=_stepCat;