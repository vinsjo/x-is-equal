import{isArr as n,isObj as t,isDate as r}from"x-is-type";function e(n=null,t=null){return function(...r){if(r.length<2)return!0;if("function"==typeof n&&!n(...r))return!1;const e="function"==typeof t?t:(n,t)=>n===t;for(let n=1;n<r.length;n++)if(!e(r[n-1],r[n]))return!1;return!0}}const u=e(null,(n,t)=>{var r,e;return(null==n||null==(r=n.constructor)?void 0:r.name)===(null==t||null==(e=t.constructor)?void 0:e.name)}),o=e(r,(n,t)=>Number(n)===Number(t));function l(...t){return e(n,(n,t)=>{if(n.length!==t.length)return!1;for(let r=0;r<n.length;r++)if(n[r]!==t[r]&&!l(n[r],t[r])&&!f(n[r],t[r]))return!1;return!0})(...t)}function f(...n){return e((...n)=>t(...n)&&u(...n),(n,t)=>{const r=Object.keys(n),e=Object.keys(t);if(r.length!==e.length)return!1;for(const e of r)if(n[e]!==t[e]&&!l(n[e],t[e])&&!f(n[e],t[e])&&!o(n[e],t[e]))return!1;return!0})(...n)}function i(...n){return e(null,(n,t)=>n===t||f(n,t)||l(n,t))(...n)}export{i as isEqual,l as isEqualArr,u as isEqualConstructor,f as isEqualObj};
//# sourceMappingURL=index.modern.js.map