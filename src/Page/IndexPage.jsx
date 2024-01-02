import { useNavigate } from "react-router-dom";

function IndexPage() {
  const navigate = useNavigate();
  return (
    <div>
      IndexPage{" "}
      <div>
        <button onClick={() => navigate("/signin")}>signin</button>
        <button onClick={() => navigate("/signup")}>signup</button>
      </div>
    </div>
  );
}

export default IndexPage;
