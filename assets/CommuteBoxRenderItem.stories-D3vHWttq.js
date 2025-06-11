import{j as e}from"./jsx-runtime-CDt2p4po.js";import{B as h}from"./button-B_gFhX21.js";import{a as L}from"./cn.util-MR_7Oyn8.js";import{c as s}from"./createLucideIcon-o53MTRDg.js";import"./index-GiUgBvb1.js";import"./index-C7GeMJel.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]],U=s("Building2",H);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],J=s("CircleAlert",F);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],b=s("Clock",K);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"m11 17 2 2a1 1 0 1 0 3-3",key:"efffak"}],["path",{d:"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",key:"9pr0kb"}],["path",{d:"m21 3 1 11h-2",key:"1tisrp"}],["path",{d:"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",key:"1uvwmv"}],["path",{d:"M3 4h8",key:"1ep09j"}]],Z=s("Handshake",V);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]],Q=s("LogIn",G);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],Y=s("LogOut",X);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]],ee=s("Timer",D);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],ne=s("TriangleAlert",re);function o(t){const r=new Date(t);return new Intl.DateTimeFormat("ko-KR",{timeZone:"Asia/Seoul",hour:"2-digit",minute:"2-digit",hour12:!1}).format(r)}const te=(t,r)=>{const n=new Date(t),a=new Date(r).getTime()-n.getTime();if(a<=0)return"0분";const p=Math.floor(a/(1e3*60)),v=Math.floor(p/60),j=p%60;return v>0?`${v}시간 ${j}분`:`${j}분`},w=({status:t,commuteData:r,startWorkplace:n,endWorkplace:d,onButtonClick:a})=>{switch(t){case"not-checked-in":return e.jsx(h,{className:"w-full bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600",size:"lg",onClick:a,children:"출근하기"});case"checked-in-only":return e.jsxs(e.Fragment,{children:[e.jsxs(l,{borderColor:"border-green-500",bgColor:"bg-white",darkBorderColor:"border-green-600",darkBgColor:"bg-green-900",children:[n?e.jsxs("div",{className:"rounded-xl border border-solid border-green-300 bg-white p-4 shadow-sm dark:border-green-600",children:[e.jsxs("div",{className:"mb-2 flex items-center gap-2",children:[e.jsx(U,{className:"h-4 w-4 text-green-600"}),e.jsx("p",{className:"text-sm font-semibold text-gray-900",children:"근무지 정보"})]}),e.jsxs("div",{className:"pl-6",children:[e.jsx("p",{className:"text-sm font-medium text-gray-800",children:n.name}),e.jsx("p",{className:"mt-1 text-xs text-gray-600",title:n.address,children:n.address})]})]}):e.jsx("p",{className:"mt-4 text-sm text-red-500 dark:text-red-300",children:"근무지 정보를 찾을 수 없습니다."}),(r==null?void 0:r.startTime)&&e.jsxs("div",{className:"mt-3 flex items-center justify-between rounded-md bg-green-200 px-4 py-2 text-sm text-green-900 shadow-sm dark:bg-green-800 dark:text-green-100",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(b,{className:"h-4 w-4 text-green-700 dark:text-green-300"}),e.jsx("span",{className:"font-medium",children:"출근 시간"})]}),e.jsx("span",{className:"text-xs font-semibold",children:o(r.startTime)})]})]}),e.jsx(h,{className:"mt-5 w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-600",onClick:a,children:"퇴근하기"})]});case"checked-in-and-out":return e.jsxs(l,{borderColor:"border-gray-100",bgColor:"bg-white",darkBorderColor:"border-gray-700",darkBgColor:"bg-zinc-800",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-2 text-gray-500 dark:text-white",children:[e.jsx(Z,{className:"h-5 w-5"}),e.jsx("span",{className:"text-sm font-semibold",children:"오늘도 수고 많으셨습니다!"})]}),(r==null?void 0:r.startTime)&&n&&e.jsxs("div",{className:"mb-2 flex items-start gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3 dark:border-green-600 dark:bg-green-900",children:[e.jsx(Q,{className:"mt-1 h-5 w-5 text-green-600 dark:text-green-300"}),e.jsxs("div",{className:"flex flex-col text-sm",children:[e.jsxs("span",{className:"font-semibold text-green-800 dark:text-green-100",children:["출근: ",o(r.startTime)]}),e.jsxs("span",{className:"mt-1 text-xs text-gray-700 dark:text-green-300",children:["근무지: ",n.name]})]})]}),(r==null?void 0:r.endTime)&&d&&e.jsxs("div",{className:"mb-2 flex items-start gap-3 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-600 dark:bg-blue-900",children:[e.jsx(Y,{className:"mt-1 h-5 w-5 text-blue-600 dark:text-blue-300"}),e.jsxs("div",{className:"flex flex-col text-sm",children:[e.jsxs("span",{className:"font-semibold text-blue-800 dark:text-blue-100",children:["퇴근: ",o(r.endTime)]}),e.jsxs("span",{className:"mt-1 text-xs text-gray-700 dark:text-blue-300",children:["근무지: ",d.name]})]})]}),(r==null?void 0:r.startTime)&&(r==null?void 0:r.endTime)&&e.jsxs("div",{className:"mt-4 flex items-center justify-between border-t pt-3 text-sm text-gray-700 dark:text-gray-200",children:[e.jsxs("div",{className:"flex items-center gap-2 font-medium",children:[e.jsx(ee,{className:"h-4 w-4 text-gray-500 dark:text-white"}),"총 근무 시간"]}),e.jsx("span",{className:"font-semibold text-gray-900 dark:text-white",children:te(r.startTime,r.endTime)})]})]});case"missing-check-in":return e.jsxs(l,{borderColor:"border-red-500",bgColor:"bg-white",darkBorderColor:"border-red-900",darkBgColor:"bg-red-950",children:[e.jsxs("div",{className:"flex items-center gap-3 text-base font-semibold text-red-600 dark:text-red-300",children:[e.jsx(ne,{className:"h-5 w-5 text-red-500 dark:text-red-400"}),"출근 정보 누락"]}),e.jsx("div",{className:"text-sm text-red-700 dark:text-red-300",children:"관리자에게 문의하거나 출근을 다시 시작해 주세요."}),e.jsx(h,{className:"mt-4 w-full bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",size:"lg",onClick:a,children:"출근하기"})]});case"out-working":return e.jsxs(l,{borderColor:"border-orange-300",bgColor:"bg-white",darkBorderColor:"border-orange-800",darkBgColor:"bg-zinc-800",children:[e.jsxs("div",{className:"rounded-xl border border-solid border-orange-300 bg-white p-4 shadow-sm dark:border-zinc-600 dark:bg-zinc-800",children:[e.jsx("p",{className:"mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100",children:"외근 메모"}),e.jsx("div",{children:e.jsx("p",{className:"text-sm text-gray-700 dark:text-gray-300",children:(r==null?void 0:r.outworkingMemo)||e.jsx("span",{className:"text-gray-400 dark:text-gray-500",children:"메모 없음"})})})]}),e.jsx("div",{className:"my-4 h-px w-full bg-gray-200 dark:bg-zinc-600"}),(r==null?void 0:r.startTime)&&e.jsxs("div",{className:"mt-3 flex items-center justify-between rounded-md bg-orange-100 px-4 py-2 text-sm text-orange-900 shadow-sm dark:bg-zinc-700 dark:text-orange-300",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(b,{className:"h-4 w-4 text-orange-700 dark:text-orange-400"}),e.jsx("span",{className:"font-medium",children:"출근 시간"})]}),e.jsx("span",{className:"text-xs font-semibold",children:o(r.startTime)})]}),e.jsxs("div",{className:"mt-4 rounded-md border border-orange-100 bg-orange-50 px-4 py-2 text-xs text-orange-800 dark:border-zinc-600 dark:bg-zinc-700 dark:text-gray-200",children:["외근으로 출근이 처리되었습니다. ",e.jsx("br",{}),"금일 별도의 퇴근 처리는 필요하지 않습니다."]})]});case"out-working-checking":return e.jsxs(l,{borderColor:"border-yellow-500",bgColor:"bg-white",darkBorderColor:"border-yellow-400",darkBgColor:"bg-zinc-800",children:[e.jsxs("div",{className:"mb-3 flex items-center gap-2",children:[e.jsx(J,{className:"h-5 w-5 text-yellow-500 dark:text-yellow-300"}),e.jsx("span",{className:"text-sm font-semibold text-yellow-700 dark:text-yellow-200",children:"외근 요청 승인 대기중"})]}),e.jsxs("div",{className:"rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-zinc-600 dark:bg-zinc-900",children:[e.jsx("p",{className:"mb-1 text-xs font-semibold text-gray-700 dark:text-gray-200",children:"외근 메모"}),e.jsx("p",{className:"text-sm text-gray-800 dark:text-gray-300",children:(r==null?void 0:r.outworkingMemo)||"메모 없음"})]}),(r==null?void 0:r.requestTime)&&e.jsxs("div",{className:"mt-3 flex items-center justify-between rounded-md bg-yellow-50 px-3 py-2 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(b,{className:"h-4 w-4"}),"요청 시간"]}),e.jsx("span",{className:"text-xs font-semibold",children:o(r.requestTime)})]}),e.jsxs("div",{className:"mt-4 px-4 py-2 text-xs text-yellow-800 dark:text-yellow-300",children:["관리자의 승인을 기다리고 있습니다. ",e.jsx("br",{}),"승인 전까지 출근 처리가 완료되지 않습니다."]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{onClick:a,className:"rounded-md border border-yellow-500 bg-white px-4 py-1 text-sm font-semibold text-yellow-600 transition hover:bg-yellow-50 dark:border-yellow-400 dark:bg-transparent dark:text-yellow-300 dark:hover:bg-yellow-900",children:"요청 취소"})})]});default:return null}},l=({children:t,borderColor:r,bgColor:n,darkBorderColor:d,darkBgColor:a,className:p})=>e.jsx("div",{className:L("relative w-full rounded-xl border-l-4 border-solid p-4 shadow-md",r,n,`dark:${d}`,`dark:${a}`,p),children:t});w.__docgenInfo={description:"",methods:[],displayName:"CommuteBoxRenderItem",props:{status:{required:!0,tsType:{name:"union",raw:`| "not-checked-in" // 아직 출근 안 한 상태
| "checked-in-only" // 출근은 했고, 퇴근은 안 한 상태
| "checked-in-and-out" // 출퇴근 모두 완료
| "out-working" // 외근
| "out-working-checking" // 외근 요청 대기
| "missing-check-in"`,elements:[{name:"literal",value:'"not-checked-in"'},{name:"literal",value:'"checked-in-only"'},{name:"literal",value:'"checked-in-and-out"'},{name:"literal",value:'"out-working"'},{name:"literal",value:'"out-working-checking"'},{name:"literal",value:'"missing-check-in"'}]},description:""},commuteData:{required:!0,tsType:{name:"union",raw:"TCommuteData | null",elements:[{name:"Partial",elements:[{name:"intersection",raw:`TStartCommutePayload &
TEndCommutePayload &
TStartOutWorkingPayload &
TEndOutwokingPayload &
TOutworkRequest`,elements:[{name:"signature",type:"object",raw:`{
  startTime: string;
  startWorkplaceId: string;
}`,signature:{properties:[{key:"startTime",value:{name:"string",required:!0}},{key:"startWorkplaceId",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
  endTime: string;
  endWorkplaceId: string;
}`,signature:{properties:[{key:"endTime",value:{name:"string",required:!0}},{key:"endWorkplaceId",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
  startWorkplaceId: "외근";
  outworkingMemo: string;
  startTime: string;
}`,signature:{properties:[{key:"startWorkplaceId",value:{name:"literal",value:'"외근"',required:!0}},{key:"outworkingMemo",value:{name:"string",required:!0}},{key:"startTime",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
  endWorkplaceId: "외근";
  outworkingMemo: string;
  endTime: string;
}`,signature:{properties:[{key:"endWorkplaceId",value:{name:"literal",value:'"외근"',required:!0}},{key:"outworkingMemo",value:{name:"string",required:!0}},{key:"endTime",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
  requester: TEmpUserData;
  outworkingMemo: string;
  requestTime: string;
  isCheckout: boolean;
  status: TCommuteStatus;
}`,signature:{properties:[{key:"requester",value:{name:"intersection",raw:`Omit<TUserBase, "userType"> & {
  userType: "employee";
  jobName: TSelectableJobName<T>;
  salaryAmount?: number;
  salaryType?: string;
  // date?: DateMap<WorkTime>;
  // workDates?: DateMap<WorkData>;
  employmentType: TEmploymentType;
}`,elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
  uid: string;
  name: string;
  email: string;
  companyCode: string;
  phoneNumber: string;
  userType: TPosition;
}`,signature:{properties:[{key:"uid",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"email",value:{name:"string",required:!0}},{key:"companyCode",value:{name:"string",required:!0}},{key:"phoneNumber",value:{name:"string",required:!0}},{key:"userType",value:{name:"union",raw:'"manager" | "employee"',elements:[{name:"literal",value:'"manager"'},{name:"literal",value:'"employee"'}],required:!0}}]}},{name:"literal",value:'"userType"'}],raw:'Omit<TUserBase, "userType">'},{name:"signature",type:"object",raw:`{
  userType: "employee";
  jobName: TSelectableJobName<T>;
  salaryAmount?: number;
  salaryType?: string;
  // date?: DateMap<WorkTime>;
  // workDates?: DateMap<WorkData>;
  employmentType: TEmploymentType;
}`,signature:{properties:[{key:"userType",value:{name:"literal",value:'"employee"',required:!0}},{key:"jobName",value:{name:"union",raw:'T[number]["name"] | "선택안함"',elements:[{name:'T[number]["name"]',raw:'T[number]["name"]'},{name:"literal",value:'"선택안함"'}],required:!0}},{key:"salaryAmount",value:{name:"number",required:!1}},{key:"salaryType",value:{name:"string",required:!1}},{key:"employmentType",value:{name:"union",raw:'"정규직" | "계약직" | "일용직" | "선택안함"',elements:[{name:"literal",value:'"정규직"'},{name:"literal",value:'"계약직"'},{name:"literal",value:'"일용직"'},{name:"literal",value:'"선택안함"'}],required:!0}}]}}],required:!0}},{key:"outworkingMemo",value:{name:"string",required:!0}},{key:"requestTime",value:{name:"string",required:!0}},{key:"isCheckout",value:{name:"boolean",required:!0}},{key:"status",value:{name:"union",raw:`| "not-checked-in" // 아직 출근 안 한 상태
| "checked-in-only" // 출근은 했고, 퇴근은 안 한 상태
| "checked-in-and-out" // 출퇴근 모두 완료
| "out-working" // 외근
| "out-working-checking" // 외근 요청 대기
| "missing-check-in"`,elements:[{name:"literal",value:'"not-checked-in"'},{name:"literal",value:'"checked-in-only"'},{name:"literal",value:'"checked-in-and-out"'},{name:"literal",value:'"out-working"'},{name:"literal",value:'"out-working-checking"'},{name:"literal",value:'"missing-check-in"'}],required:!0}}]}}]}],raw:`Partial<
  TStartCommutePayload &
    TEndCommutePayload &
    TStartOutWorkingPayload &
    TEndOutwokingPayload &
    TOutworkRequest
>`},{name:"null"}]},description:""},startWorkplace:{required:!1,tsType:{name:"Workplace"},description:""},endWorkplace:{required:!1,tsType:{name:"Workplace"},description:""},onButtonClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const me={title:"Employee/CommuteBoxRenderItem",component:w,args:{onButtonClick:()=>alert("버튼 클릭됨")}},i=t=>e.jsx("div",{className:"max-w-md p-4",children:e.jsx(w,{...t})}),y=new Date().toISOString(),m=i.bind({});m.args={status:"not-checked-in",commuteData:null};const c=i.bind({});c.args={status:"checked-in-only",commuteData:{startTime:y},startWorkplace:{name:"본사",address:"서울특별시 강남구 테헤란로 123"}};const u=i.bind({});u.args={status:"checked-in-and-out",commuteData:{startTime:y,endTime:new Date(Date.now()+1e3*60*60*8).toISOString()},startWorkplace:{name:"본사",address:"서울특별시 강남구 테헤란로 123"},endWorkplace:{name:"지점 A",address:"서울특별시 중구 을지로 12"}};const g=i.bind({});g.args={status:"out-working",commuteData:{startTime:y,outworkingMemo:"고객사 방문"}};const x=i.bind({});x.args={status:"out-working-checking",commuteData:{requestTime:y,outworkingMemo:"회의 참석 요청"}};const k=i.bind({});k.args={status:"missing-check-in",commuteData:null};var T,N,f;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`args => <div className="max-w-md p-4">
    <CommuteBoxRenderItem {...args} />
  </div>`,...(f=(N=m.parameters)==null?void 0:N.docs)==null?void 0:f.source}}};var C,q,I;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`args => <div className="max-w-md p-4">
    <CommuteBoxRenderItem {...args} />
  </div>`,...(I=(q=c.parameters)==null?void 0:q.docs)==null?void 0:I.source}}};var M,B,O;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`args => <div className="max-w-md p-4">
    <CommuteBoxRenderItem {...args} />
  </div>`,...(O=(B=u.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};var W,_,S;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`args => <div className="max-w-md p-4">
    <CommuteBoxRenderItem {...args} />
  </div>`,...(S=(_=g.parameters)==null?void 0:_.docs)==null?void 0:S.source}}};var z,R,A;x.parameters={...x.parameters,docs:{...(z=x.parameters)==null?void 0:z.docs,source:{originalSource:`args => <div className="max-w-md p-4">
    <CommuteBoxRenderItem {...args} />
  </div>`,...(A=(R=x.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var $,P,E;k.parameters={...k.parameters,docs:{...($=k.parameters)==null?void 0:$.docs,source:{originalSource:`args => <div className="max-w-md p-4">
    <CommuteBoxRenderItem {...args} />
  </div>`,...(E=(P=k.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};const ce=["NotCheckedIn","CheckedInOnly","CheckedInAndOut","OutWorking","OutWorkingChecking","MissingCheckIn"];export{u as CheckedInAndOut,c as CheckedInOnly,k as MissingCheckIn,m as NotCheckedIn,g as OutWorking,x as OutWorkingChecking,ce as __namedExportsOrder,me as default};
