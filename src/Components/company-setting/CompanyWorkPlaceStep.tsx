import { useFormContext, useFieldArray } from "react-hook-form";
import { useState } from "react";
import CompanySettingTitle from "./CompanySettingTitle";
import WorkPlaceModal from "../modal/WorkPlaceModal";
import WorkPlaceList from "./WorkPlaceList";
import { Button } from "../ui/button";
import { TWorkPlace, TworkPlacesList } from "@/model";

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
