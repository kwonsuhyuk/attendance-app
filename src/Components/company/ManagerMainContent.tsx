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

  return <div data-tour="step-1"></div>;
};

export default ManagerMainContent;
