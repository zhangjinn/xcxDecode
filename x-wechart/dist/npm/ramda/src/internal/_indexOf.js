function _indexOf(e,n,r){var f,t;if("function"==typeof e.indexOf)switch(typeof n){case"number":if(0===n){for(f=1/n;r<e.length;){if(0===(t=e[r])&&1/t===f)return r;r+=1}return-1}if(n!==n){for(;r<e.length;){if("number"==typeof(t=e[r])&&t!==t)return r;r+=1}return-1}return e.indexOf(n,r);case"string":case"boolean":case"function":case"undefined":return e.indexOf(n,r);case"object":if(null===n)return e.indexOf(n,r)}for(;r<e.length;){if(equals(e[r],n))return r;r+=1}return-1}var equals=require("./../equals.js");module.exports=_indexOf;