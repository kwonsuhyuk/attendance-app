import { getAuth, signOut } from "firebase/auth";
import "../firebase";
import { Route, Routes, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import AccessCameraPage from "./AccessCameraPage";
import { useSelector } from "react-redux";
import DateCheckPage from "./DateCheckPage";
import ShowSalary from "../Components/ShowSalary/ShowSalary";
import ManagerSettingPage from "./managerSettingPage";

function MainPage() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const logout = async () => {
    await signOut(getAuth());
    navigate("/");
  };

  const scan = () => {
    navigate(`/${currentUser.photoURL}/camera`);
  };

  return (
    <div className="m-10">
      <div>main</div>
      <button onClick={logout}>logout</button>
      <button onClick={scan}>
        <FaCamera />
      </button>
      <button onClick={() => navigate(`/${currentUser.photoURL}/datecheck`)}>
        datecheckpage
      </button>
      <button onClick={() => navigate(`/${currentUser.photoURL}/setting`)}>
        설정페이지 이동
      </button>
      <div style={{ backgroundColor: "red" }}>
        <ShowSalary />
      </div>
      <Routes>
        <Route path="/camera" element={<AccessCameraPage />} />
        <Route path="/datecheck" element={<DateCheckPage />} />
        <Route path="/setting" element={<ManagerSettingPage />} />
      </Routes>
    </div>
  );
}

export default MainPage;
