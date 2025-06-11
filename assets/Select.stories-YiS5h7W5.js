import{j as e}from"./jsx-runtime-CDt2p4po.js";import{S as d,a as l,b as i,c,d as n}from"./select-DGsoVI89.js";import"./index-GiUgBvb1.js";import"./index-CROobee-.js";import"./index-CSJqL_z7.js";import"./index-C7GeMJel.js";import"./cn.util-MR_7Oyn8.js";import"./chevron-down-hSEeD0Jk.js";import"./createLucideIcon-o53MTRDg.js";const j={title:"Components/Select",component:d,tags:["autodocs"],argTypes:{disabled:{control:"boolean",description:"선택박스를 비활성화합니다."}}},t={args:{disabled:!1},parameters:{docs:{description:{story:`
### 🌗 다크/라이트 모드 토글을 통해 모드별 디자인 확인 가능.
#### 👍 Select 사용 가이드
- **기본 선택 박스**: 일반적인 선택 기능 제공
- **비활성화 옵션**: \`disabled\` 속성을 활용하여 사용 가능
        `}}},render:s=>e.jsxs("div",{className:"rounded-md bg-white-bg p-6 text-black shadow-md dark:bg-dark-card-bg dark:text-dark-text",children:[e.jsx("p",{className:"mb-2 text-lg font-semibold dark:hidden",children:"☀️ Light Mode"}),e.jsx("p",{className:"mb-2 hidden text-lg font-semibold dark:block",children:"🌙 Dark Mode"}),e.jsxs(d,{...s,children:[e.jsx(l,{children:e.jsx(i,{placeholder:"Select an option"})}),e.jsxs(c,{children:[e.jsx(n,{value:"option1",children:"Option 1"}),e.jsx(n,{value:"option2",children:"Option 2"}),e.jsx(n,{value:"option3",children:"Option 3"})]})]})]})};var o,a,r;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: \`
### 🌗 다크/라이트 모드 토글을 통해 모드별 디자인 확인 가능.
#### 👍 Select 사용 가이드
- **기본 선택 박스**: 일반적인 선택 기능 제공
- **비활성화 옵션**: \\\`disabled\\\` 속성을 활용하여 사용 가능
        \`
      }
    }
  },
  render: args => <div className="rounded-md bg-white-bg p-6 text-black shadow-md dark:bg-dark-card-bg dark:text-dark-text">
      <p className="mb-2 text-lg font-semibold dark:hidden">☀️ Light Mode</p>
      <p className="mb-2 hidden text-lg font-semibold dark:block">🌙 Dark Mode</p>
      <Select {...args}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
}`,...(r=(a=t.parameters)==null?void 0:a.docs)==null?void 0:r.source}}};const f=["LightAndDark"];export{t as LightAndDark,f as __namedExportsOrder,j as default};
