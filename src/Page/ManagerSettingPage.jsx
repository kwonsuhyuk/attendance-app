import { Route, Routes, Link, useLocation } from "react-router-dom";
import { ListItem, ListItemText } from "@mui/material";
import ManagerSettingBasicPage from "./ManagerSettingBasicPage";
import MyDatePicker from "../components/Calendar/MyDatePicker";
import { useSelector } from "react-redux";
import GuidePopover from "../components/GuidePopover";
import { useEffect } from "react";
import { useTour } from "@reactour/tour";
import { SETTING_STEPS } from "../constant/tourStep";

const ManagerSettingPage = () => {
  const location = useLocation();
  const { darkMode } = useSelector(state => state.darkmodeSlice);
  const isSelected = path => {
    const currentPath = location.pathname;
    const baseName = currentPath.split("/").slice(-1)[0];
    return baseName === path;
  };
  const { isOpen, setCurrentStep, setSteps } = useTour();
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setSteps(SETTING_STEPS);
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
      }}
    >
      <div
        data-tour="step-19"
        className="grid h-full w-full"
        style={{ gridTemplateColumns: "1fr 6fr" }}
      >
        <div
          className="flex flex-col"
          style={{
            borderRight: !darkMode ? "2px solid #00000080" : "2px solid #FFFFFF80",
          }}
        >
          <ListItem button component={Link} to="." selected={isSelected("setting")}>
            <ListItemText primary="회사 기본 정보 수정" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="./holidaysetting"
            selected={isSelected("holidaysetting")}
          >
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
