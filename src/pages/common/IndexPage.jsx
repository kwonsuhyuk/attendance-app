import { useNavigate } from "react-router-dom";
import Seo from "@/components/Seo";

function IndexPage() {
  const navigate = useNavigate();
  return (
    <>
      <Seo
        title="출퇴근 서비스 시작하기 | On & Off"
        description="출퇴근 기록을 확인하고 관리하세요. 지금 바로 시작해보세요."
      />

      <div className="relative flex h-screen w-screen justify-center bg-dark-bg">
        <div className="absolute left-16 top-16 h-64 w-64 rounded-full bg-gradient-to-r from-gray-200 to-transparent"></div>
        <div
          className="absolute left-16 top-48 h-64 w-64 rounded-full"
          style={{ backgroundColor: "#4747474D" }}
        ></div>
        <div
          className="absolute right-1/3 top-1/3 hidden text-7xl text-dark-text xl:block"
          style={{ letterSpacing: 50 }}
        >
          Att-App
        </div>
        <div
          className="absolute bottom-1/4 w-full cursor-pointer text-center text-xl font-black text-dark-text"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </div>
        <div
          className="absolute bottom-10 flex w-11/12 justify-between text-xs text-dark-border"
          style={{ borderTop: "1px solid #FFFFFF80" }}
        >
          <div>Don’t have an account?</div>
          <div
            style={{ color: "#909090" }}
            onClick={() => navigate("/signup")}
            className="cursor-pointer"
          >
            Sign Up
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexPage;
