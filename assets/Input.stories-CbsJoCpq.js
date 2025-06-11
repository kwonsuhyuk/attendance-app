import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as i}from"./index-GiUgBvb1.js";import{c as p}from"./cn.util-MR_7Oyn8.js";const a=i.forwardRef(({className:t,type:n,...l},c)=>e.jsx("div",{className:"mx-auto w-full max-w-[500px]",children:e.jsx("input",{type:n,className:p("flex h-12 w-full rounded-lg bg-background bg-white p-2 py-2 text-base","border-[0px] border-slate-200","shadow-[0_0_0_1px_rgba(0,0,0,0.2)]","dark:bg-dark-border-sub dark:text-white-bg dark:placeholder-dark-border","focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2","disabled:cursor-not-allowed disabled:opacity-50",t),ref:c,...l})}));a.displayName="Input";a.__docgenInfo={description:"",methods:[],displayName:"Input"};const g={title:"Components/Input",component:a,tags:["autodocs"],argTypes:{type:{control:"select",options:["text","password","email","number","search","tel"]},placeholder:{control:"text"},disabled:{control:"boolean"}}},r={args:{type:"text",placeholder:"Enter text...",disabled:!1},parameters:{docs:{description:{story:"\n### 🌗 우측 상단 다크/라이트 모드 토글로 모드별 디자인 확인 가능.\n#### 👍 Input 사용 가이드\n- **텍스트 입력**: 기본적으로 사용 (`text`)\n- **비밀번호 입력**: `password` 타입 활용\n- **이메일 입력**: `email` 타입 활용\n- **숫자 입력**: `number` 타입 활용\n- **검색 입력 필드**: `search` 타입 활용\n        "}}},render:t=>e.jsxs("div",{className:"rounded-md bg-white-bg p-6 text-black shadow-md dark:bg-dark-card-bg dark:text-dark-text",children:[e.jsx("p",{className:"mb-2 text-lg font-semibold dark:hidden",children:"☀️ Light Mode"}),e.jsx("p",{className:"mb-2 hidden text-lg font-semibold dark:block",children:"🌙 Dark Mode"}),e.jsx(a,{...t,className:"dark:bg-dark-border-sub dark:text-white-bg dark:placeholder-dark-border"})]})};var d,s,o;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    type: "text",
    placeholder: "Enter text...",
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: \`
### 🌗 우측 상단 다크/라이트 모드 토글로 모드별 디자인 확인 가능.
#### 👍 Input 사용 가이드
- **텍스트 입력**: 기본적으로 사용 (\\\`text\\\`)
- **비밀번호 입력**: \\\`password\\\` 타입 활용
- **이메일 입력**: \\\`email\\\` 타입 활용
- **숫자 입력**: \\\`number\\\` 타입 활용
- **검색 입력 필드**: \\\`search\\\` 타입 활용
        \`
      }
    }
  },
  render: args => <div className="rounded-md bg-white-bg p-6 text-black shadow-md dark:bg-dark-card-bg dark:text-dark-text">
      <p className="mb-2 text-lg font-semibold dark:hidden">☀️ Light Mode</p>
      <p className="mb-2 hidden text-lg font-semibold dark:block">🌙 Dark Mode</p>
      <Input {...args} className="dark:bg-dark-border-sub dark:text-white-bg dark:placeholder-dark-border" />
    </div>
}`,...(o=(s=r.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};const k=["LightAndDark"];export{r as LightAndDark,k as __namedExportsOrder,g as default};
