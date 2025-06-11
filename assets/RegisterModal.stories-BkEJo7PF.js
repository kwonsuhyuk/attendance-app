import{j as e}from"./jsx-runtime-CDt2p4po.js";import{D as b,a as v,b as j,c as y,X as S,d as N}from"./x-BRmaQ_0P.js";import{B as w}from"./button-B_gFhX21.js";import{c as k}from"./cn.util-MR_7Oyn8.js";import{S as T,a as q,b as C,c as D,d as r}from"./select-DGsoVI89.js";import"./index-GiUgBvb1.js";import"./index-CSJqL_z7.js";import"./index-C7GeMJel.js";import"./index-CROobee-.js";import"./createLucideIcon-o53MTRDg.js";import"./chevron-down-hSEeD0Jk.js";const m=({open:c,onClose:a,title:u,icon:p,subtitle:s,children:x,maxWidthClass:f="max-w-md",onSubmit:n,submitLabel:g,submitDisabled:h=!1,titleAlign:i="center"})=>e.jsx(b,{open:c,onOpenChange:a,children:e.jsxs(v,{className:`max-h-[95vh] w-[90vw] ${f} overflow-y-auto dark:border dark:border-dark-border`,children:[e.jsxs(j,{children:[e.jsxs(y,{className:k("flex items-center justify-center gap-3 text-lg font-bold dark:text-white-text md:text-xl",i==="center"?"justify-center":"justify-start"),children:[p,u,s&&i==="left"&&e.jsx("span",{className:"text-sm font-semibold md:text-base",children:s})]}),e.jsx("button",{onClick:a,className:"absolute right-6 top-9 rounded-md border-none bg-transparent text-gray-500 hover:text-gray-700 dark:text-white-text dark:hover:bg-dark-border dark:hover:bg-white-bg",children:e.jsx(S,{size:20,strokeWidth:3})})]}),e.jsx("div",{className:"mt-3 grid gap-6",children:x}),n&&e.jsx(N,{children:e.jsx(w,{type:"button",onClick:n,disabled:h,className:"mt-4 w-full dark:bg-dark-bg dark:text-dark-text",children:g||"등록"})})]})});m.__docgenInfo={description:"",methods:[],displayName:"RegisterModal",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},title:{required:!0,tsType:{name:"string"},description:""},icon:{required:!1,tsType:{name:"ReactNode"},description:""},subtitle:{required:!1,tsType:{name:"ReactNode"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},onSubmit:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}}},description:""},submitLabel:{required:!1,tsType:{name:"string"},description:""},submitDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},maxWidthClass:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"max-w-md"',computed:!1}},titleAlign:{required:!1,tsType:{name:"union",raw:'"left" | "center"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"center"'}]},description:"",defaultValue:{value:'"center"',computed:!1}}}};const z={title:"Components/Modal/RegisterModal",component:m,tags:["autodocs"]},t={args:{open:!0,onClose:()=>alert("닫기"),title:"휴가 요청",submitLabel:"등록",onSubmit:()=>alert("등록"),children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-sm font-medium",children:"휴가 유형"}),e.jsxs(T,{children:[e.jsx(q,{children:e.jsx(C,{placeholder:"선택하세요"})}),e.jsxs(D,{children:[e.jsx(r,{value:"연차",children:"연차"}),e.jsx(r,{value:"반차",children:"반차"}),e.jsx(r,{value:"특별",children:"특별"})]})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-sm font-medium",children:"사유"}),e.jsx("textarea",{className:"min-h-[200px] w-full border p-2"})]})]})}};var l,o,d;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    open: true,
    onClose: () => alert("닫기"),
    title: "휴가 요청",
    submitLabel: "등록",
    onSubmit: () => alert("등록"),
    children: <div className="space-y-4">
        <div>
          <p className="mb-1 text-sm font-medium">휴가 유형</p>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="연차">연차</SelectItem>
              <SelectItem value="반차">반차</SelectItem>
              <SelectItem value="특별">특별</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium">사유</p>
          <textarea className="min-h-[200px] w-full border p-2" />
        </div>
      </div>
  }
}`,...(d=(o=t.parameters)==null?void 0:o.docs)==null?void 0:d.source}}};const F=["Default"];export{t as Default,F as __namedExportsOrder,z as default};
