import { useNavigate } from "react-router-dom";

function IndexPage() {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden w-screen h-screen">
      <button
        className="w-[300px] h-[50px] text-sm bg-white rounded-full border-2 shadow-lg border-gray-400 text-black"
        onClick={() => navigate("/signin")}>
        Sign In
      </button>
      <button
        className="w-[300px] h-[50px] text-sm bg-white rounded-full border-2 shadow-lg border-gray-400 text-black"
        onClick={() => navigate("/signup")}>
        Sign Up
      </button>
    </div>
  );
}

export default IndexPage;
