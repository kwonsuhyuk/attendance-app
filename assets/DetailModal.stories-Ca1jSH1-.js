import{j as e}from"./jsx-runtime-CDt2p4po.js";import{D as x,a as u,b as h,c as g,e as y,X as b}from"./dialog-TQQT18eh.js";import{c as k}from"./createLucideIcon-o53MTRDg.js";import"./index-GiUgBvb1.js";import"./index-CSJqL_z7.js";import"./index-C7GeMJel.js";import"./index-CROobee-.js";import"./cn.util-MR_7Oyn8.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]],N=k("CalendarDays",f),d=({open:l,onClose:i,title:o,subtitle:a,icon:c,children:m,maxWidthClass:p="max-w-lg"})=>e.jsx(x,{open:l,onOpenChange:i,children:e.jsxs(u,{className:`w-[80vw] dark:bg-zinc-800 dark:text-white 사용${p}`,children:[e.jsxs(h,{className:"flex flex-col gap-2 pt-0 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[c,e.jsxs(g,{className:"flex items-center gap-3 text-lg font-bold text-gray-900 dark:text-white md:text-xl",children:[o,a&&e.jsx("span",{className:"text-sm font-semibold text-vacation-dark-color dark:text-blue-400 md:text-base",children:a})]})]}),e.jsx(y,{asChild:!0,children:e.jsx("button",{type:"button",className:"absolute right-3 top-3 rounded-sm bg-transparent p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-zinc-700 dark:hover:text-white","aria-label":"Close",children:e.jsx(b,{className:"h-5 w-5"})})})]}),e.jsx("div",{className:"mt-4 space-y-4",children:m})]})});d.__docgenInfo={description:"",methods:[],displayName:"DetailModal",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},title:{required:!0,tsType:{name:"ReactNode"},description:""},subtitle:{required:!1,tsType:{name:"string"},description:""},icon:{required:!1,tsType:{name:"ReactNode"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},maxWidthClass:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"max-w-lg"',computed:!1}}}};const z={title:"Components/Modal/DetailModal",component:d,tags:["autodocs"]},t={args:{open:!0,onClose:()=>alert("닫기"),title:"휴가 상세 정보",subtitle:"3일",icon:e.jsx(N,{className:"h-5 w-5 text-blue-500"}),children:e.jsx("div",{className:"space-y-3",children:e.jsxs("div",{className:"rounded-lg border p-4 dark:border-zinc-700 dark:bg-zinc-700",children:[e.jsxs("div",{className:"mb-2 flex justify-between",children:[e.jsx("span",{className:"font-semibold text-gray-800 dark:text-white",children:"김영희"}),e.jsx("span",{className:"rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-800 dark:text-blue-200",children:"연차"})]}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-300",children:"2024.05.01 ~ 2024.05.03"}),e.jsx("p",{className:"mt-1 text-sm text-gray-800 dark:text-white",children:"개인 사유로 인한 연차"})]})})}};var s,r,n;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    open: true,
    onClose: () => alert("닫기"),
    title: "휴가 상세 정보",
    subtitle: "3일",
    icon: <CalendarDays className="h-5 w-5 text-blue-500" />,
    children: <div className="space-y-3">
        <div className="rounded-lg border p-4 dark:border-zinc-700 dark:bg-zinc-700">
          <div className="mb-2 flex justify-between">
            <span className="font-semibold text-gray-800 dark:text-white">김영희</span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-800 dark:text-blue-200">
              연차
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">2024.05.01 ~ 2024.05.03</p>
          <p className="mt-1 text-sm text-gray-800 dark:text-white">개인 사유로 인한 연차</p>
        </div>
      </div>
  }
}`,...(n=(r=t.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};const _=["Default"];export{t as Default,_ as __namedExportsOrder,z as default};
