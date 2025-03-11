import{j as l}from"./jsx-runtime-DiklIkkE.js";import{r as V}from"./index-DRjF_FHU.js";import{S as w}from"./index-BxeovsC2.js";import{a as _,c as z}from"./cn.util-jAU0Cazi.js";const h=t=>typeof t=="boolean"?`${t}`:t===0?"0":t,x=_,M=(t,r)=>e=>{var d;if((r==null?void 0:r.variants)==null)return x(t,e==null?void 0:e.class,e==null?void 0:e.className);const{variants:c,defaultVariants:a}=r,v=Object.keys(c).map(n=>{const o=e==null?void 0:e[n],i=a==null?void 0:a[n];if(o===null)return null;const s=h(o)||h(i);return c[n][s]}),g=e&&Object.entries(e).reduce((n,o)=>{let[i,s]=o;return s===void 0||(n[i]=s),n},{}),N=r==null||(d=r.compoundVariants)===null||d===void 0?void 0:d.reduce((n,o)=>{let{class:i,className:s,...j}=o;return Object.entries(j).every(C=>{let[f,b]=C;return Array.isArray(b)?b.includes({...a,...g}[f]):{...a,...g}[f]===b})?[...n,i,s]:n},[]);return x(t,v,N,e==null?void 0:e.class,e==null?void 0:e.className)},B=M("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary border-none text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"dark:text-white border border-gray-300 dark:border-gray-800 border-solid bg-background hover:bg-accent hover:text-accent-foreground shadow-none ring-0 outline-none",secondary:"bg-point-color text-gray-700 hover:bg-point-color/80 border-none",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),m=V.forwardRef(({className:t,variant:r,size:e,asChild:d=!1,...c},a)=>{const v=d?w:"button";return l.jsx(v,{className:z(B({variant:r,size:e,className:t})),ref:a,...c})});m.displayName="Button";m.__docgenInfo={description:"",methods:[],displayName:"Button",props:{asChild:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}},composes:["VariantProps"]};const S={title:"Components/Button",component:m,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","destructive","outline","secondary","ghost","link"]},size:{control:"select",options:["default","sm","lg","icon"]},disabled:{control:"boolean"},asChild:{control:"boolean"},children:{control:"text"}}},u={args:{variant:"default",size:"default",disabled:!1,children:"Click Me"},parameters:{docs:{description:{story:`
### 🌗 우측 상단에 다크/라이트 모드를 클릭해서 모드별 디자인 확인 가능.
#### 👍 variant 사용하는 곳
- \`default\` 는 **강조되는 부분**에 사용하기 ("저장" 등)
- \`outline\` 는 **기본**으로 강조 되는 부분 이외 부분에 사용하기
- \`secondary\` 는 **포인트 색깔 버튼**으로 포인트 줄 곳에 사용하기 (많이사용x)

위의 세가지 variant만 사용하는 것 권장합니다.
        `}}},render:t=>l.jsxs("div",{className:"rounded-md bg-white-bg p-6 text-black shadow-md dark:bg-dark-card-bg dark:text-dark-text",children:[l.jsx("p",{className:"mb-2 text-lg font-semibold dark:hidden",children:"☀️ Light Mode"}),l.jsx("p",{className:"mb-2 hidden text-lg font-semibold dark:block",children:"🌙 Dark Mode"}),l.jsx(m,{...t})]})};var p,k,y;u.parameters={...u.parameters,docs:{...(p=u.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(y=(k=u.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};const E=["LightAndDark"];export{u as LightAndDark,E as __namedExportsOrder,S as default};
