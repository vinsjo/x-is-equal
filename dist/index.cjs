var r=require("x-is-type");function n(r,n){(null==n||n>r.length)&&(n=r.length);for(var t=0,e=new Array(n);t<n;t++)e[t]=r[t];return e}function t(r,t){var e="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(e)return(e=e.call(r)).next.bind(e);if(Array.isArray(r)||(e=function(r,t){if(r){if("string"==typeof r)return n(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);return"Object"===e&&r.constructor&&(e=r.constructor.name),"Map"===e||"Set"===e?Array.from(r):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?n(r,t):void 0}}(r))||t&&r&&"number"==typeof r.length){e&&(r=e);var o=0;return function(){return o>=r.length?{done:!0}:{done:!1,value:r[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function e(r,n){return void 0===r&&(r=null),void 0===n&&(n=null),function(){var t=[].slice.call(arguments);if(t.length<2)return!0;if("function"==typeof r&&!r.apply(void 0,t))return!1;for(var e=function(r,t){return r===t||"function"==typeof n&&n(r,t)},o=1;o<t.length;o++){var u=t[o-1],i=t[o];if(!e(u,i))return!1}return!0}}var o=e(null,function(r,n){var t,e;return(null==r||null==(t=r.constructor)?void 0:t.name)===(null==n||null==(e=n.constructor)?void 0:e.name)}),u=e(r.isDate,function(r,n){return Number(r)===Number(n)});function i(){return e(r.isArr,function(r,n){if(r.length!==n.length)return!1;for(var t=0;t<r.length;t++)if(r[t]!==n[t]&&!i(r[t],n[t])&&!l(r[t],n[t]))return!1;return!0}).apply(void 0,[].slice.call(arguments))}function l(){var n=function(r){return Object.keys(r).filter(function(n){return r[n]!==r})};return e(function(){var n=[].slice.call(arguments);return r.isObj.apply(void 0,n)&&o.apply(void 0,n)},function(r,e){var o={a:n(r),b:n(e)};if(o.a.length!==o.b.length)return!1;for(var a,c=t(o.a);!(a=c()).done;){var f=a.value;if(r[f]!==e[f]&&!i(r[f],e[f])&&!l(r[f],e[f])&&!u(r[f],e[f]))return!1}return!0}).apply(void 0,[].slice.call(arguments))}exports.isEqual=function(){return e(null,function(r,n){return r===n||l(r,n)||i(r,n)}).apply(void 0,[].slice.call(arguments))},exports.isEqualArr=i,exports.isEqualConstructor=o,exports.isEqualObj=l;
//# sourceMappingURL=index.cjs.map
