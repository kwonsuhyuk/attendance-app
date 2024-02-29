import React from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import { ListItem, ListItemText } from "@mui/material";
import ManagerSettingBasicPage from "./ManagerSettingBasicPage";
import MyDatePicker from "../Components/Calendar/MyDatePicker";
import { useSelector } from "react-redux";
import GuidePopover from "../Components/GuidePopover";

const ManagerSettingPage = () => {
  const location = useLocation();
  const { darkMode } = useSelector((state) => state.darkmodeSlice);
  const isSelected = (path) => {
    const currentPath = location.pathname;
    const baseName = currentPath.split("/").slice(-1)[0];
    return baseName === path;
  };

  return (
    <div
      className="px-10 lg:px-15 py-5 overflow-auto"
      style={{
        height: "calc(100vh - 18rem)",
        position: "relative",
      }}>
      <GuidePopover text="회사의 각종 정보를 수정할 수 있는 페이지 입니다. 변경 정보를 저장하시려면 반드시 저장 버튼을 클릭해 저장해 주세요." />
      <div
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
            <ListItemText primary="회사 공휴일 수정" />
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
