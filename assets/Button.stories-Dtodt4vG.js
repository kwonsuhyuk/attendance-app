import{j as e}from"./jsx-runtime-CDt2p4po.js";import{B as r}from"./button-B_gFhX21.js";import"./index-GiUgBvb1.js";import"./index-C7GeMJel.js";import"./cn.util-MR_7Oyn8.js";const p={title:"Components/Button",component:r,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","destructive","outline","secondary","ghost","link"]},size:{control:"select",options:["default","sm","lg","icon"]},disabled:{control:"boolean"},asChild:{control:"boolean"},children:{control:"text"}}},t={args:{variant:"default",size:"default",disabled:!1,children:"Click Me"},parameters:{docs:{description:{story:`
### 🌗 우측 상단에 다크/라이트 모드를 클릭해서 모드별 디자인 확인 가능.
#### 👍 variant 사용하는 곳
- \`default\` 는 **강조되는 부분**에 사용하기 ("저장" 등)
- \`outline\` 는 **기본**으로 강조 되는 부분 이외 부분에 사용하기
- \`secondary\` 는 **포인트 색깔 버튼**으로 포인트 줄 곳에 사용하기 (많이사용x)

위의 세가지 variant만 사용하는 것 권장합니다.
        `}}},render:o=>e.jsxs("div",{className:"rounded-md bg-white-bg p-6 text-black shadow-md dark:bg-dark-card-bg dark:text-dark-text",children:[e.jsx("p",{className:"mb-2 text-lg font-semibold dark:hidden",children:"☀️ Light Mode"}),e.jsx("p",{className:"mb-2 hidden text-lg font-semibold dark:block",children:"🌙 Dark Mode"}),e.jsx(r,{...o})]})};var a,n,d;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(d=(n=t.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};const b=["LightAndDark"];export{t as LightAndDark,b as __namedExportsOrder,p as default};
