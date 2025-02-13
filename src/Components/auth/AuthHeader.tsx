import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LucideIcon } from "lucide-react";

interface IAuthHeaderProps {
  icon: LucideIcon;
  title: string;
}

const AuthHeader = ({ icon: Icon, title }: IAuthHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-12 w-12 bg-primary">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Icon className="h-6 w-6" />
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
    </div>
  );
};

export default AuthHeader;
