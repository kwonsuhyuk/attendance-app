import { Button } from "@/components/ui/button";

interface AdminMenuMobileProps {
  companyLogo: string;
  companyName: string;
  darkMode: boolean;
  logout: () => Promise<void>;
}

export const AdminMenuMobile = ({
  companyLogo,
  companyName,
  darkMode,
  logout,
}: AdminMenuMobileProps) => {
  return (
    <div className="flex h-28 items-center">
      <img src={companyLogo} alt="회사로고" className="rounded-full w-24 h-24 mr-5" />
      <div className="grid grid-rows-2 w-full">
        <div className="flex justify-between w-full items-end pb-2 border-b border-solid border-black dark:border-gray-300">
          <div className="font-black text-lg">{companyName}</div>
          <Button variant="ghost" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
