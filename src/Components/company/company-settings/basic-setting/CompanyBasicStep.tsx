import { useFormContext } from "react-hook-form";
import { useUserStore } from "@/store/user.store";
import { Card } from "@/components/ui/card";
import FormInputField from "../form/FormInputField";
import CompanyLogoUploader from "./CompanyLogoUploader";
import CompanySettingTitle from "./CompanySettingTitle";

const CompanyBasicStep = () => {
  const { control, watch, setValue } = useFormContext();
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const imageUrl = watch("companyBasic.imageUrl");

  return (
    <Card className="flex flex-col items-center space-y-6 w-full max-w-md">
      <CompanySettingTitle
        title="회사 기본 설정"
        description="기본 설정은 바꾸기 어려우니 신중히 작성해주세요."
      />
      <FormInputField
        control={control}
        name="companyBasic.companyName"
        label="회사 이름"
        placeholder="회사 이름을 입력하세요"
      />
      <FormInputField
        control={control}
        name="companyBasic.adminName"
        label="대표자 이름"
        placeholder="대표자 이름을 입력하세요"
      />
      <FormInputField
        control={control}
        name="companyBasic.companyIntro"
        label="회사 한줄 소개"
        placeholder="회사에 대한 간단한 설명을 입력하세요"
      />

      {/*  로고 업로더 컴포넌트 활용 */}
      <CompanyLogoUploader
        imageUrl={imageUrl}
        companyCode={companyCode!}
        setImageUrl={url => setValue("companyBasic.imageUrl", url)}
      />
    </Card>
  );
};

export default CompanyBasicStep;
