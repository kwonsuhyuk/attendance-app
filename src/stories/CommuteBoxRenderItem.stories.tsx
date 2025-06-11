import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import CommuteBoxRenderItem from "@/components/employee/mainpageBox/CommuteBoxRenderItem";

// 기본 설정
export default {
  title: "Employee/CommuteBoxRenderItem",
  component: CommuteBoxRenderItem,
  args: {
    onButtonClick: () => alert("버튼 클릭됨"),
  },
} as ComponentMeta<typeof CommuteBoxRenderItem>;

// 템플릿 생성
const Template: ComponentStory<typeof CommuteBoxRenderItem> = args => (
  <div className="max-w-md p-4">
    <CommuteBoxRenderItem {...args} />
  </div>
);

// 공통 테스트용 시간
const now = new Date().toISOString();

export const NotCheckedIn = Template.bind({});
NotCheckedIn.args = {
  status: "not-checked-in",
  commuteData: null,
};

export const CheckedInOnly = Template.bind({});
CheckedInOnly.args = {
  status: "checked-in-only",
  commuteData: {
    startTime: now,
  },
  startWorkplace: {
    name: "본사",
    address: "서울특별시 강남구 테헤란로 123",
  },
};

export const CheckedInAndOut = Template.bind({});
CheckedInAndOut.args = {
  status: "checked-in-and-out",
  commuteData: {
    startTime: now,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(), // 8시간 후
  },
  startWorkplace: {
    name: "본사",
    address: "서울특별시 강남구 테헤란로 123",
  },
  endWorkplace: {
    name: "지점 A",
    address: "서울특별시 중구 을지로 12",
  },
};

export const OutWorking = Template.bind({});
OutWorking.args = {
  status: "out-working",
  commuteData: {
    startTime: now,
    outworkingMemo: "고객사 방문",
  },
};

export const OutWorkingChecking = Template.bind({});
OutWorkingChecking.args = {
  status: "out-working-checking",
  commuteData: {
    requestTime: now,
    outworkingMemo: "회의 참석 요청",
  },
};

export const MissingCheckIn = Template.bind({});
MissingCheckIn.args = {
  status: "missing-check-in",
  commuteData: null,
};
