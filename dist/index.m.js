import{isDate as r,isArr as n,isObj as t}from"x-is-type";function e(r,n){(null==n||n>r.length)&&(n=r.length);for(var t=0,e=new Array(n);t<n;t++)e[t]=r[t];return e}function o(r,n){var t="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(t)return(t=t.call(r)).next.bind(t);if(Array.isArray(r)||(t=function(r,n){if(r){if("string"==typeof r)return e(r,n);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?e(r,n):void 0}}(r))||n&&r&&"number"==typeof r.length){t&&(r=t);var o=0;return function(){return o>=r.length?{done:!0}:{done:!1,value:r[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(r,n){return void 0===r&&(r=null),void 0===n&&(n=null),function(){var t=[].slice.call(arguments);if(t.length<2)return!0;if("function"==typeof r&&!r.apply(void 0,t))return!1;for(var e="function"==typeof n?n:function(r,n){return r===n},o=1;o<t.length;o++){var l=t[o-1],u=t[o];if(!e(l,u))return!1}return!0}}var u=l(null,function(r,n){var t,e;return(null==r||null==(t=r.constructor)?void 0:t.name)===(null==n||null==(e=n.constructor)?void 0:e.name)}),i=l(r,function(r,n){return Number(r)===Number(n)});function a(){return l(n,function(r,n){if(r.length!==n.length)return!1;for(var t=0;t<r.length;t++)if(r[t]!==n[t]&&!a(r[t],n[t])&&!c(r[t],n[t]))return!1;return!0}).apply(void 0,[].slice.call(arguments))}function c(){return l(function(){var r=[].slice.call(arguments);return t.apply(void 0,r)&&u.apply(void 0,r)},function(r,n){var t={a:Object.keys(r),b:Object.keys(n)};if(t.a.length!==t.b.length)return!1;for(var e,l=o(t.a);!(e=l()).done;){var u=e.value;if(r[u]!==n[u]&&!a(r[u],n[u])&&!c(r[u],n[u])&&!i(r[u],n[u]))return!1}return!0}).apply(void 0,[].slice.call(arguments))}function f(){return l(null,function(r,n){return r===n||c(r,n)||a(r,n)}).apply(void 0,[].slice.call(arguments))}export{f as isEqual,a as isEqualArr,u as isEqualConstructor,c as isEqualObj};
//# sourceMappingURL=index.m.js.map
