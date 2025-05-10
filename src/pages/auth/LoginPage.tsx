import { LogInIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/components/auth/LoginForm";
import Seo from "@/components/Seo";

const LoginPage = () => {
  return (
    <>
      <Seo title="로그인 | On & Off" description="On & Off에 로그인하고 근태 현황을 확인하세요." />
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="space-y-6 p-6">
            <AuthHeader icon={LogInIcon} title="로그인" />
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
