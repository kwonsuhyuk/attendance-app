import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
import { useShallow } from "zustand/shallow";

const ManagerMainContent = () => {
  const navigate = useNavigate();
  const { companyCode } = useUserStore(
    useShallow(state => ({
      companyCode: state.currentUser?.companyCode,
    })),
  );

  return (
    <div data-tour="step-1" className="bg-dark-card-bg">
      <div className="">대시보드</div>
      <div className="mb-48">대시보드</div>
      <div className="mb-48">대시보드</div>
      <div className="mb-48">대시보드</div>
      <div className="mb-48">대시보드</div>
      <div className="mb-48">대시보드</div>
      <div className="mb-48">대시보드</div>
      <div className="">대시보드</div>
    </div>
  );
};

export default ManagerMainContent;
