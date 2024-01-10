import { getAuth, signOut } from "firebase/auth";
import "../firebase";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(getAuth());
    navigate("/");
  };

  return (
    <div>
      <div>main</div>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default MainPage;
