import { getAuth, signOut } from "firebase/auth";
import "../firebase";
import { Route, Routes, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import AccessCameraPage from "./AccessCameraPage";
import { useSelector } from "react-redux";
import DateCheckPage from "./DateCheckPage";

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
    <div>
      <div>main</div>
      <button onClick={logout}>logout</button>
      <button onClick={scan}>
        <FaCamera />
      </button>
      <button onClick={() => navigate(`/${currentUser.photoURL}/datecheck`)}>
        datecheckpage
      </button>
      <Routes>
        <Route path="/camera" element={<AccessCameraPage />} />
        <Route path="/datecheck" element={<DateCheckPage />} />
      </Routes>
    </div>
  );
}

export default MainPage;
