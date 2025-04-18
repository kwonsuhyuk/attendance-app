import { MapPinOff } from "lucide-react";
import React from "react";

const CommuteNotFound = () => {
  return (
    <div className="max-w-md space-y-4 text-center">
      <div className="flex flex-col items-center gap-3">
        <MapPinOff className="h-10 w-10 text-red-600 dark:text-red-400" />
        <p className="text-lg font-medium text-red-600 dark:text-red-400">
          근처에 등록된 근무지가 없습니다.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          현재 위치를 기준으로 근처 근무지를 확인할 수 없습니다. <br />
          위치 접근 권한이 허용되어 있는지 확인해 주세요. <br />
          문제가 지속된다면 관리자에게 문의해 주세요.
        </p>
      </div>
    </div>
  );
};

export default CommuteNotFound;
