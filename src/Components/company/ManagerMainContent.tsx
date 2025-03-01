import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
import { useShallow } from "zustand/shallow";
import { Card } from "../ui/card";

const ManagerMainContent = () => {
  const { companyCode } = useUserStore(
    useShallow(state => ({
      companyCode: state.currentUser?.companyCode,
    })),
  );

  return <div data-tour="step-1"></div>;
};

export default ManagerMainContent;
