import u from"./ProseCodeCopyButton.e17272a8.js";import{k as d,r as i,o as n,e as a,I as f,s as m,O as c,h as p,t as g,b as v}from"./entry.319287c6.js";/* empty css                      */import"./index.10900dff.js";const y={key:0,class:"filename"},h=d({__name:"ProseCode",props:{code:{type:String,default:""},language:{type:String,default:null},filename:{type:String,default:null},highlights:{type:Array,default:()=>[]}},setup(e){const o=i(!1);return(s,t)=>{const l=u;return n(),a("div",{class:g([[`highlight-${e.language}`],"prose-code"]),onMouseenter:t[0]||(t[0]=r=>o.value=!0),onMouseleave:t[1]||(t[1]=r=>o.value=!1)},[e.filename?(n(),a("span",y,f(e.filename),1)):m("",!0),c(s.$slots,"default",{},void 0,!0),p(l,{show:o.value,content:e.code,class:"copy-button"},null,8,["show","content"])],34)}}}),$=v(h,[["__scopeId","data-v-ed004e2f"]]);export{$ as default};
