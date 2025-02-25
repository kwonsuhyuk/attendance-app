import { useFormContext, useFieldArray } from "react-hook-form";
import { useState } from "react";
import CompanySettingTitle from "../CompanySettingTitle";
import WorkPlaceList from "./WorkPlaceList";
<<<<<<< HEAD:src/Components/company-setting/CompanyWorkPlaceStep.tsx
import { Button } from "../ui/button";
import { TWorkPlace, TworkPlacesList } from "@/model/types/company.type";
=======
import { TWorkPlace, TworkPlacesList } from "@/model";
import { Button } from "@/components/ui/button";
import WorkPlaceModal from "@/components/common/modal/WorkPlaceModal";
>>>>>>> b9f1e83e66b1a5b50a8fad2cbef5ffc44eddf976:src/Components/company/company-settings/workplace-setting/CompanyWorkPlaceStep.tsx

const CompanyWorkPlaceStep = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "companyWorkPlacesList.companyWorkPlaces",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveWorkPlace = (workPlace: Omit<TWorkPlace, "id">) => {
    append({
      id: String(Date.now()),
      ...workPlace,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md">
      <CompanySettingTitle
        title="근무지 추가"
        description="회사에 소속되어 있는 근무지를 추가하세요."
      />
      <Button onClick={() => setIsModalOpen(true)} className="w-full">
        근무지 추가
      </Button>
      <WorkPlaceList workPlaces={fields as TworkPlacesList} onRemove={remove} />
      <WorkPlaceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveWorkPlace}
      />
    </div>
  );
};

export default CompanyWorkPlaceStep;
