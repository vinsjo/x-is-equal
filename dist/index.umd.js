!function(n,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("x-is-type")):"function"==typeof define&&define.amd?define(["exports","x-is-type"],r):r((n||self).xIsEqual={},n.xIsType)}(this,function(n,r){function t(n,r){(null==r||r>n.length)&&(r=n.length);for(var t=0,e=new Array(r);t<r;t++)e[t]=n[t];return e}function e(n,r){var e="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(e)return(e=e.call(n)).next.bind(e);if(Array.isArray(n)||(e=function(n,r){if(n){if("string"==typeof n)return t(n,r);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?t(n,r):void 0}}(n))||r&&n&&"number"==typeof n.length){e&&(n=e);var i=0;return function(){return i>=n.length?{done:!0}:{done:!1,value:n[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(n,r){return void 0===n&&(n=null),void 0===r&&(r=null),function(){var t=[].slice.call(arguments);if(t.length<2)return!0;if("function"==typeof n&&!n.apply(void 0,t))return!1;for(var e=function(n,t){return n===t||"function"==typeof r&&r(n,t)},i=1;i<t.length;i++){var o=t[i-1],u=t[i];if(!e(o,u))return!1}return!0}}var o=i(null,function(n,r){var t,e;return(null==n||null==(t=n.constructor)?void 0:t.name)===(null==r||null==(e=r.constructor)?void 0:e.name)}),u=i(r.isDate,function(n,r){return n.getTime()===r.getTime()});function l(){return i(r.isArr,function(n,r){if(n.length!==r.length)return!1;for(var t=0;t<n.length;t++)if(n[t]!==r[t]&&!l(n[t],r[t])&&!a(n[t],r[t]))return!1;return!0}).apply(void 0,[].slice.call(arguments))}function a(){var n=function(n){return Object.keys(n).filter(function(r){return n[r]!==n})};return i(function(){var n=[].slice.call(arguments);return r.isObj.apply(void 0,n)&&o.apply(void 0,n)},function(r,t){var i={a:n(r),b:n(t)};if(i.a.length!==i.b.length)return!1;for(var o,f=e(i.a);!(o=f()).done;){var c=o.value;if(r[c]!==t[c]&&!l(r[c],t[c])&&!a(r[c],t[c])&&!u(r[c],t[c]))return!1}return!0}).apply(void 0,[].slice.call(arguments))}n.isEqual=function(){return i(null,function(n,r){return n===r||a(n,r)||l(n,r)}).apply(void 0,[].slice.call(arguments))},n.isEqualArr=l,n.isEqualConstructor=o,n.isEqualObj=a});
//# sourceMappingURL=index.umd.js.map
