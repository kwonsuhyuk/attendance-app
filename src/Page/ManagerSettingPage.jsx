import { Route, Routes, Link, useLocation } from "react-router-dom";
import { ListItem, ListItemText } from "@mui/material";
import ManagerSettingBasicPage from "./ManagerSettingBasicPage";
import MyDatePicker from "../Components/Calendar/MyDatePicker";
import { useSelector } from "react-redux";
import GuidePopover from "../Components/GuidePopover";
import { useEffect } from "react";
import { useTour } from "@reactour/tour";

const ManagerSettingPage = () => {
  const location = useLocation();
  const { darkMode } = useSelector((state) => state.darkmodeSlice);
  const isSelected = (path) => {
    const currentPath = location.pathname;
    const baseName = currentPath.split("/").slice(-1)[0];
    return baseName === path;
  };
  const { isOpen, setCurrentStep, setSteps } = useTour();
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setSteps([
          {
            selector: '[data-tour="step-19"]',
            content: `이곳은 회사의 설정들을 바꿀 수 있는 설정 페이지 입니다. `,
          },
          {
            selector: '[data-tour="step-20"]',
            content: `첫번째로 설정하셨던 직원들의 직종들을 삭제, 추가 할 수 있는 직종 수정 칸입니다. 삭제 시 직종 옆 X 버튼을 클릭하면 삭제되고, 왼쪽 입력칸에 추가하실 직종을 입력 후 + 버튼을 클릭하거나 엔터를 누를 시 직종이 추가 됩니다.`,
          },
          {
            selector: '[data-tour="step-21"]',
            content: `다음은 급여 정산 날짜 수정 칸 입니다. 전에 직원 정산 버튼으로 직원들을 정산시에 기본값으로 들어가게 되는 날짜를 수정 하실 수 있습니다.`,
          },
          {
            selector: '[data-tour="step-22"]',
            content: `이곳은 주간,야간의 급여를 구분할지 설정 하는 칸입니다. 체크항목 체크시에 야간시간을 설정하고 야간에 급여 수당 배율을 설정하여 직원들의 급여를 시간대에 따라 다르게 할 수 있습니다. 
(월급 직원들은 반영되지 x)`,
          },
          {
            selector: '[data-tour="step-23"]',
            content: `수정사항을 변경후에는 반드시 아래 저장 버튼을 클릭하셔야 저장내용이 반영됩니다!`,
          },
          {
            selector: '[data-tour="step-24"]',
            content: `회사공휴일 수정 페이지로 이동해 보겠습니다. 회사 공휴일 수정 버튼을 클릭해주세요.`,
          },
        ]);
      }, 300);

      return () => {
        clearTimeout(timer), setSteps([]);
      };
    }
  }, [isOpen, setCurrentStep, setSteps]);

  return (
    <div
      className="px-10 lg:px-15 py-5 overflow-auto"
      style={{
        height: "calc(100vh - 18rem)",
        position: "relative",
      }}>
      <div
        data-tour="step-19"
        className="grid h-full w-full"
        style={{ gridTemplateColumns: "1fr 6fr" }}>
        <div
          className="flex flex-col"
          style={{
            borderRight: !darkMode
              ? "2px solid #00000080"
              : "2px solid #FFFFFF80",
          }}>
          <ListItem
            button
            component={Link}
            to="."
            selected={isSelected("setting")}>
            <ListItemText primary="회사 기본 정보 수정" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="./holidaysetting"
            selected={isSelected("holidaysetting")}>
            <ListItemText primary="회사 공휴일 수정" data-tour="step-24" />
          </ListItem>
        </div>
        <div className="overflow-auto px-10 pt-5 lg:px-40">
          <Routes>
            <Route path="/" element={<ManagerSettingBasicPage />} />
            <Route path="holidaysetting" element={<MyDatePicker />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ManagerSettingPage;
