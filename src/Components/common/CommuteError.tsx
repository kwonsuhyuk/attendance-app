import { MapPinOff } from "lucide-react";
import React from "react";

const CommuteError = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
      <MapPinOff className="h-10 w-10 text-red-500" />
      <p className="text-lg font-semibold text-red-600">{error}</p>
    </div>
  );
};

export default CommuteError;
