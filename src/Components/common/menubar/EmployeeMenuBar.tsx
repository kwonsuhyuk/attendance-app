import { useLocation, useNavigate } from "react-router-dom";
import { Home, CalendarClock, Plane, Megaphone, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "홈",
    path: "companymain",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "공지사항",
    path: "notice",
    icon: <Megaphone className="h-5 w-5" />,
  },
  {
    title: "출퇴근기록",
    path: "calendar",
    icon: <CalendarClock className="h-5 w-5" />,
  },

  {
    title: "휴가",
    path: "leave",
    icon: <Plane className="h-5 w-5" />,
  },

  {
    title: "마이페이지",
    path: "mypage",
    icon: <User className="h-5 w-5" />,
  },
];

interface EmployeeMenuBarProps {
  onLogout: () => void;
}

const BottomNavButton = ({
  icon,
  title,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  active: boolean;
}) => (
  <Button
    onClick={onClick}
    className={`flex h-full flex-1 flex-col items-center justify-center gap-1 rounded-none px-2 py-3 text-xs ${active ? "font-semibold text-point-color" : "text-white"} `}
  >
    {icon}
    {title}
  </Button>
);

const EmployeeMenuBar = ({ onLogout }: EmployeeMenuBarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const companyCode = pathname.split("/")[1];

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 flex h-14 w-full max-w-screen-sm -translate-x-1/2 border-t border-gray-200 bg-white-card-bg dark:border-gray-600 dark:bg-dark-bg">
      {navItems.map(item => {
        const pathMatch = pathname.includes(`/${companyCode}/${item.path}`);
        return (
          <BottomNavButton
            key={item.title}
            icon={item.icon}
            title={item.title}
            onClick={() => navigate(`/${companyCode}/${item.path}`)}
            active={pathMatch}
          />
        );
      })}
      <BottomNavButton
        icon={<LogOut className="h-5 w-5" />}
        title="로그아웃"
        onClick={onLogout}
        active={false}
      />
    </nav>
  );
};

export default EmployeeMenuBar;
