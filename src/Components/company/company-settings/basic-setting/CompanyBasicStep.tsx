import { useFormContext } from "react-hook-form";
import { useUserStore } from "@/store/user.store";
import { Card } from "@/components/ui/card";

import CompanyLogoUploader from "./CompanyLogoUploader";
import FormInputField from "../../form/FormInputField";
import CompanySettingTitle from "../CompanySettingTitle";

interface ICompanyBasicStepProps {
  type?: "setting" | "firstpage";
}

const CompanyBasicStep = ({ type = "firstpage" }: ICompanyBasicStepProps) => {
  const { control, watch, setValue } = useFormContext();
  const companyCode = useUserStore(state => state.currentUser?.companyCode);

  const prefix = type === "firstpage" ? "companyBasic." : "";

  return (
    <Card className="flex w-full max-w-md flex-col items-center space-y-6">
      <CompanySettingTitle
        title="회사 기본 설정"
        description="회사의 기본 정보에 관한 설정 입니다."
      />
      <FormInputField
        control={control}
        name={`${prefix}companyName`}
        label="회사 이름"
        placeholder="회사 이름을 입력하세요"
      />
      <FormInputField
        control={control}
        name={`${prefix}adminName`}
        label="대표자 이름"
        placeholder="대표자 이름을 입력하세요"
      />
      <FormInputField
        control={control}
        name={`${prefix}companyIntro`}
        label="회사 한줄 소개"
        placeholder="회사에 대한 간단한 설명을 입력하세요"
      />

      <CompanyLogoUploader
        imageUrl={watch(`${prefix}companyLogo`) || ""}
        companyCode={companyCode!}
        setImageUrl={url => setValue(`${prefix}companyLogo`, url)}
      />
    </Card>
  );
};

export default CompanyBasicStep;
