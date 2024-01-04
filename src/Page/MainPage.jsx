import { getAuth, signOut } from "firebase/auth";
import "../firebase";

function MainPage() {
  const logout = async () => {
    await signOut(getAuth());

    console.log("logout!");
  };

  return (
    <div>
      <div>main</div>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default MainPage;
