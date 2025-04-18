import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useCompanyStore } from "@/store/company.store";
import useCommuteBox from "@/hooks/employee/useCommuteBox";
import CommuteBoxRenderItem from "./CommuteBoxRenderItem";
import Clock from "../Clock";

const CommuteBox = () => {
  const { status, commuteData, startWorkplace, endWorkplace } = useCommuteBox();
  const { companyCode } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!companyCode) return;
    navigate(`/${companyCode}/commute`);
  };

  return (
    <Card className="flex w-full flex-col items-center justify-center gap-4 p-6 text-center shadow-lg">
      <Clock />
      <CommuteBoxRenderItem
        status={status}
        commuteData={commuteData}
        startWorkplace={startWorkplace}
        endWorkplace={endWorkplace}
        onButtonClick={handleClick}
      />
    </Card>
  );
};

export default CommuteBox;
