import{j as f}from"./jsx-runtime-DiklIkkE.js";import{r as i}from"./index-DRjF_FHU.js";import{a as S,c as _}from"./cn.util-jAU0Cazi.js";function y(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function w(...e){return t=>{let n=!1;const o=e.map(r=>{const a=y(r,t);return!n&&typeof a=="function"&&(n=!0),a});if(n)return()=>{for(let r=0;r<o.length;r++){const a=o[r];typeof a=="function"?a():y(e[r],null)}}}}function R(e){const t=A(e),n=i.forwardRef((o,r)=>{const{children:a,...d}=o,l=i.Children.toArray(a),p=l.find(B);if(p){const s=p.props.children,c=l.map(u=>u===p?i.Children.count(s)>1?i.Children.only(null):i.isValidElement(s)?s.props.children:null:u);return f.jsx(t,{...d,ref:r,children:i.isValidElement(s)?i.cloneElement(s,void 0,c):null})}return f.jsx(t,{...d,ref:r,children:a})});return n.displayName=`${e}.Slot`,n}var O=R("Slot");function A(e){const t=i.forwardRef((n,o)=>{const{children:r,...a}=n;if(i.isValidElement(r)){const d=z(r),l=D(a,r.props);return r.type!==i.Fragment&&(l.ref=o?w(o,d):d),i.cloneElement(r,l)}return i.Children.count(r)>1?i.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}var P=Symbol("radix.slottable");function B(e){return i.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===P}function D(e,t){const n={...t};for(const o in t){const r=e[o],a=t[o];/^on[A-Z]/.test(o)?r&&a?n[o]=(...l)=>{a(...l),r(...l)}:r&&(n[o]=r):o==="style"?n[o]={...r,...a}:o==="className"&&(n[o]=[r,a].filter(Boolean).join(" "))}return{...e,...n}}function z(e){var o,r;let t=(o=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(r=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}const x=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,k=S,I=(e,t)=>n=>{var o;if((t==null?void 0:t.variants)==null)return k(e,n==null?void 0:n.class,n==null?void 0:n.className);const{variants:r,defaultVariants:a}=t,d=Object.keys(r).map(s=>{const c=n==null?void 0:n[s],u=a==null?void 0:a[s];if(c===null)return null;const m=x(c)||x(u);return r[s][m]}),l=n&&Object.entries(n).reduce((s,c)=>{let[u,m]=c;return m===void 0||(s[u]=m),s},{}),p=t==null||(o=t.compoundVariants)===null||o===void 0?void 0:o.reduce((s,c)=>{let{class:u,className:m,...j}=c;return Object.entries(j).every(E=>{let[h,b]=E;return Array.isArray(b)?b.includes({...a,...l}[h]):{...a,...l}[h]===b})?[...s,u,m]:s},[]);return k(e,d,p,n==null?void 0:n.class,n==null?void 0:n.className)},L=I("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary border-none text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"dark:text-white border border-gray-300 dark:border-gray-800 border-solid bg-background hover:bg-accent hover:text-accent-foreground shadow-none ring-0 outline-none",secondary:"bg-point-color text-gray-700 hover:bg-point-color/80 border-none",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),v=i.forwardRef(({className:e,variant:t,size:n,asChild:o=!1,...r},a)=>{const d=o?O:"button";return f.jsx(d,{className:_(L({variant:t,size:n,className:e})),ref:a,...r})});v.displayName="Button";v.__docgenInfo={description:"",methods:[],displayName:"Button",props:{asChild:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}},composes:["VariantProps"]};const $={title:"Components/Button",component:v,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","destructive","outline","secondary","ghost","link"]},size:{control:"select",options:["default","sm","lg","icon"]},disabled:{control:"boolean"},asChild:{control:"boolean"},children:{control:"text"}}},g={args:{variant:"default",size:"default",disabled:!1,children:"Click Me"},parameters:{docs:{description:{story:`
### 🌗 우측 상단에 다크/라이트 모드를 클릭해서 모드별 디자인 확인 가능.
#### 👍 variant 사용하는 곳
- \`default\` 는 **강조되는 부분**에 사용하기 ("저장" 등)
- \`outline\` 는 **기본**으로 강조 되는 부분 이외 부분에 사용하기
- \`secondary\` 는 **포인트 색깔 버튼**으로 포인트 줄 곳에 사용하기 (많이사용x)

위의 세가지 variant만 사용하는 것 권장합니다.
        `}}},render:e=>f.jsxs("div",{className:"rounded-md bg-white-bg p-6 text-black shadow-md dark:bg-dark-card-bg dark:text-dark-text",children:[f.jsx("p",{className:"mb-2 text-lg font-semibold dark:hidden",children:"☀️ Light Mode"}),f.jsx("p",{className:"mb-2 hidden text-lg font-semibold dark:block",children:"🌙 Dark Mode"}),f.jsx(v,{...e})]})};var C,N,V;g.parameters={...g.parameters,docs:{...(C=g.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    variant: "default",
    size: "default",
    disabled: false,
    children: "Click Me"
  },
  parameters: {
    docs: {
      description: {
        story: \`
### 🌗 우측 상단에 다크/라이트 모드를 클릭해서 모드별 디자인 확인 가능.
#### 👍 variant 사용하는 곳
- \\\`default\\\` 는 **강조되는 부분**에 사용하기 ("저장" 등)
- \\\`outline\\\` 는 **기본**으로 강조 되는 부분 이외 부분에 사용하기
- \\\`secondary\\\` 는 **포인트 색깔 버튼**으로 포인트 줄 곳에 사용하기 (많이사용x)

위의 세가지 variant만 사용하는 것 권장합니다.
        \`
      }
    }
  },
  render: args => <div className="rounded-md bg-white-bg p-6 text-black shadow-md dark:bg-dark-card-bg dark:text-dark-text">
      <p className="mb-2 text-lg font-semibold dark:hidden">☀️ Light Mode</p>
      <p className="mb-2 hidden text-lg font-semibold dark:block">🌙 Dark Mode</p>
      <Button {...args} />
    </div>
}`,...(V=(N=g.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};const F=["LightAndDark"];export{g as LightAndDark,F as __namedExportsOrder,$ as default};
