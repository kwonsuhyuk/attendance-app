import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, X } from "lucide-react";
import WorkPlaceModal from "../modal/WorkPlaceModal";
import { useState } from "react";

interface IWorkPlace {
  name: string;
  memo: string;
  address: string;
  lat: number;
  lng: number;
}

const CompanyWorkPlaceStep = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "companyWorkPlacesList.companyWorkPlaces",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ 모달에서 근무지 추가 시 react-hook-form에 append
  const handleSaveWorkPlace = (workPlace: IWorkPlace) => {
    append({
      id: String(Date.now()),
      ...workPlace,
    });
    setIsModalOpen(false);
  };

  type JobField = {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
  };

  const jobFields = fields as JobField[];

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800">근무지 추가</h2>
      <Button onClick={() => setIsModalOpen(true)}>근무지 추가</Button>
      <WorkPlaceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveWorkPlace}
      />
      {jobFields.length > 0 && (
        <Card className="w-full mt-4">
          <CardHeader>
            <CardTitle className="text-lg">추가된 근무지</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {jobFields.map((field, index) => (
              <Card key={field.id} className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                  {/* ✅ 왼쪽에 위치 아이콘 추가 */}
                  <MapPin className="w-5 h-5 text-gray-500" />

                  <div>
                    <p className="text-sm font-medium">{field.name}</p>
                    <p className="text-xs text-gray-500">{field.address}</p>
                    <p className="text-xs text-gray-400">
                      좌표: ({field.lat}, {field.lng})
                    </p>
                  </div>
                </div>

                {/* 삭제 버튼 */}
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="h-auto p-0 bg-transparent hover:bg-transparent hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </Button>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyWorkPlaceStep;
