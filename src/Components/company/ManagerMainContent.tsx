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
    <div
      data-tour="step-1"
      className="flex items-center justify-center border-b border-white-border bg-white-bg text-white-text dark:border-dark-border dark:bg-dark-bg dark:text-dark-text"
    >
      대시보드
    </div>
  );
};

export default ManagerMainContent;
