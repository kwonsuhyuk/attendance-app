import EmployeeEtcPageTitle from "@/components/employee/EmployeeEtcPageTitle";
import Seo from "@/components/Seo";

const NoticePage = () => {
  return (
    <>
      <Seo title="공지사항 | On & Off" description="On & Off에서 근태관리 서비스를 이용해보세요." />
      <div className="flex w-full flex-col gap-4 sm:py-5">
        <EmployeeEtcPageTitle />
      </div>
    </>
  );
};

export default NoticePage;
