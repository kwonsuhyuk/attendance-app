import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  boxName: string;
  toNavigate: string;
  guideProps?: React.ReactNode;
}

const ManagerHomeBoxLayout = ({ children, boxName, toNavigate, guideProps }: Props) => {
  const navigate = useNavigate();
  const { companyCode } = useParams();
  return (
    <Card className="relative shadow-none">
      <CardTitle className="flex items-center gap-2 p-4 text-lg font-semibold md:text-xl">
        {boxName}
        <div className="flex items-center gap-2">{guideProps}</div>
      </CardTitle>
      {/* 이동 아이콘 */}
      <ChevronRight
        onClick={() => navigate(`/${companyCode}/manager/${toNavigate}`)}
        className="absolute right-4 top-4 h-6 w-6 cursor-pointer text-muted-foreground transition hover:bg-muted/50 group-hover:text-foreground"
      />
      <CardContent className="px-6">{children}</CardContent>
    </Card>
  );
};

export default ManagerHomeBoxLayout;
