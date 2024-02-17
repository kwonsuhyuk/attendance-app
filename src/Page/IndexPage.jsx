import { useNavigate } from "react-router-dom";

function IndexPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-dark-bg w-screen h-screen relative flex justify-center">
      <div className="bg-gradient-to-r from-gray-200 to-transparent w-64 h-64 rounded-full absolute top-16 left-16 "></div>
      <div
        className="w-64 h-64 rounded-full absolute top-48 left-16 xl:absolute top-16 left-16"
        style={{ backgroundColor: "#4747474D" }}></div>
      <div className="hidden xl:block absolute top-1/3 right-1/3 text-dark-text text-7xl">
        Att-App
      </div>
      <div
        className="text-dark-text font-black text-xl absolute bottom-1/4 w-full text-center"
        onClick={() => navigate("/signin")}>
        Sign In
      </div>
      <div
        className="text-dark-border text-xs absolute bottom-10 w-11/12 flex justify-between"
        style={{ borderTop: "1px solid #FFFFFF80" }}>
        <div>Don’t have an account?</div>
        <div style={{ color: "#909090" }} onClick={() => navigate("/signup")}>
          Sign Up
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
