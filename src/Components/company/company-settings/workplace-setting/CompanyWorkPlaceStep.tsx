import { useFormContext, useFieldArray } from "react-hook-form";
import { useState } from "react";
import CompanySettingTitle from "../CompanySettingTitle";
import WorkPlaceList from "./WorkPlaceList";
import { TWorkPlace, TworkPlacesList } from "@/model/types/company.type";
import { Button } from "@/components/ui/button";
import WorkPlaceModal from "@/components/common/modal/WorkPlaceModal";

interface ICompanyWorkPlaceStepProps {
  type?: "setting" | "firstpage";
}

const CompanyWorkPlaceStep = ({ type = "firstpage" }: ICompanyWorkPlaceStepProps) => {
  const { control } = useFormContext();
  const prefix = type === "firstpage" ? "companyWorkPlacesList." : "";
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `${prefix}companyWorkPlaces`,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<TWorkPlace | undefined>(undefined);

  const handleSaveWorkPlace = (workPlace: Omit<TWorkPlace, "id">) => {
    if (editingPlace) {
      const index = fields.findIndex(f => f.id === editingPlace.id);
      if (index !== -1) {
        update(index, { id: editingPlace.id, ...workPlace });
      }
    } else {
      append({
        id: String(Date.now()),
        ...workPlace,
      });
    }
    setIsModalOpen(false);
    setEditingPlace(undefined);
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center space-y-6">
      <CompanySettingTitle
        title="근무지 추가"
        description="회사에 소속되어 있는 근무지를 추가하세요."
      />
      <Button type="button" onClick={() => setIsModalOpen(true)} variant="outline">
        근무지 추가
      </Button>
      <WorkPlaceList
        workPlaces={fields as TworkPlacesList}
        onRemove={remove}
        onEdit={place => {
          setEditingPlace(place);
          setIsModalOpen(true);
        }}
      />

      <WorkPlaceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPlace(undefined);
        }}
        onSave={handleSaveWorkPlace}
        place={editingPlace}
      />
    </div>
  );
};

export default CompanyWorkPlaceStep;
