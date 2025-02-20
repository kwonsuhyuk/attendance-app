import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage, FormControl, FormField, FormItem } from "@/components/ui/form";
import ImageModal from "@/components/modal/ImageModal";
import { Camera, ImageIcon } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "@/store/user.store";
import { Card } from "../ui/card";

const CompanyBasicStep = () => {
  const { control, watch, setValue } = useFormContext();
  const [imageOpenModal, setImageOpenModal] = useState(false);
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const imageUrl = watch("companyBasic.imageUrl");

  return (
    <Card className="flex flex-col items-center space-y-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800">회사 기본 설정</h2>
      <p className="text-sm text-gray-600">기본 설정은 바꾸기 어려우니 신중히 작성해주세요.</p>

      {/* ✅ 회사 이름 입력 */}
      <FormField
        control={control}
        name="companyBasic.companyName"
        render={({ field }) => (
          <FormItem className="w-full">
            <Label htmlFor="company-name">회사 이름</Label>
            <FormControl>
              <Input id="company-name" {...field} placeholder="회사 이름을 입력하세요" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ✅ 대표자 이름 입력 */}
      <FormField
        control={control}
        name="companyBasic.adminName"
        render={({ field }) => (
          <FormItem className="w-full">
            <Label htmlFor="admin-name">대표자 이름</Label>
            <FormControl>
              <Input id="admin-name" {...field} placeholder="대표자 이름을 입력하세요" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ✅ 회사 한줄 소개 */}
      <FormField
        control={control}
        name="companyBasic.companyIntro"
        render={({ field }) => (
          <FormItem className="w-full">
            <Label htmlFor="company-intro">회사 한줄 소개</Label>
            <FormControl>
              <Input
                id="company-intro"
                {...field}
                placeholder="회사에 대한 간단한 설명을 입력하세요"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ✅ 회사 로고 업로드 */}
      <div className="flex flex-col items-center">
        <Label className="text-gray-600 text-sm mb-1 font-medium">회사 로고</Label>
        <div className="text-xs text-gray-500 mb-3">(JPEG, JPG, PNG 형식만 지원됩니다.)</div>

        <div
          onClick={() => setImageOpenModal(true)}
          className="relative cursor-pointer w-28 h-28 border-4 border-gray-300 bg-gray-100 flex justify-center items-center rounded-full shadow-md transition-all hover:shadow-lg hover:bg-gray-200"
          role="button"
          aria-label="회사 로고 업로드"
        >
          {!imageUrl ? (
            <div className="flex flex-col items-center text-gray-500">
              <Camera className="w-8 h-8 mb-1" />
              <span className="text-sm">로고 업로드</span>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="로고 이미지"
              className="w-full h-full rounded-full object-cover"
            />
          )}

          {imageUrl && (
            <div className="absolute inset-0 flex justify-center items-center bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* 이미지 업로드 모달 */}
      <ImageModal
        companyCode={companyCode!}
        open={imageOpenModal}
        setImageUrl={url => setValue("companyBasic.imageUrl", url)}
        handleClose={() => setImageOpenModal(false)}
      />
    </Card>
  );
};

export default CompanyBasicStep;
