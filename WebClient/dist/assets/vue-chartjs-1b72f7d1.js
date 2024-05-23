import{C as P,L as j}from"./chart.js-31475a6b.js";import{d as L,s as O,h,v as q,r as A,o as K,a as R,w as U,t as D,n as k,i as C}from"./@vue-9167488b.js";const w={data:{type:Object,required:!0},options:{type:Object,default:()=>({})},plugins:{type:Array,default:()=>[]},datasetIdKey:{type:String,default:"label"},updateMode:{type:String,default:void 0}},N={ariaLabel:{type:String},ariaDescribedby:{type:String}},$={type:{type:String,required:!0},destroyDelay:{type:Number,default:0},...w,...N},z=q[0]==="2"?(t,e)=>Object.assign(t,{attrs:e}):(t,e)=>Object.assign(t,e);function u(t){return C(t)?D(t):t}function B(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:t;return C(e)?new Proxy(t,{}):t}function E(t,e){const s=t.options;s&&e&&Object.assign(s,e)}function S(t,e){t.labels=e}function I(t,e,s){const o=[];t.datasets=e.map(n=>{const a=t.datasets.find(d=>d[s]===n[s]);return!a||!n.data||o.includes(a)?{...n}:(o.push(a),Object.assign(a,n),a)})}function F(t,e){const s={labels:[],datasets:[]};return S(s,t.labels),I(s,t.datasets,e),s}const G=L({props:$,setup(t,e){let{expose:s,slots:o}=e;const n=A(null),a=O(null);s({chart:a});const d=()=>{if(!n.value)return;const{type:r,data:p,options:y,plugins:f,datasetIdKey:v}=t,b=F(p,v),i=B(b,p);a.value=new P(n.value,{type:r,data:i,options:{...y},plugins:f})},c=()=>{const r=D(a.value);r&&(t.destroyDelay>0?setTimeout(()=>{r.destroy(),a.value=null},t.destroyDelay):(r.destroy(),a.value=null))},M=r=>{r.update(t.updateMode)};return K(d),R(c),U([()=>t.options,()=>t.data],(r,p)=>{let[y,f]=r,[v,b]=p;const i=D(a.value);if(!i)return;let g=!1;if(y){const l=u(y),m=u(v);l&&l!==m&&(E(i,l),g=!0)}if(f){const l=u(f.labels),m=u(b.labels),x=u(f.datasets),T=u(b.datasets);l!==m&&(S(i.config.data,l),g=!0),x&&x!==T&&(I(i.config.data,x,t.datasetIdKey),g=!0)}g&&k(()=>{M(i)})},{deep:!0}),()=>h("canvas",{role:"img",ariaLabel:t.ariaLabel,ariaDescribedby:t.ariaDescribedby,ref:n},[h("p",{},[o.default?o.default():""])])}});function H(t,e){return P.register(e),L({props:w,setup(s,o){let{expose:n}=o;const a=O(null),d=c=>{a.value=c==null?void 0:c.chart};return n({chart:a}),()=>h(G,z({ref:d},{type:t,...s}))}})}const V=H("line",j);export{V as L};
