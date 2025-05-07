import React from "react";

export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length > 0) {
    const { name, value, color } = payload[0].payload;
    return (
      <div className="rounded-md border bg-white px-3 py-2 text-sm shadow-md">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
          <span className="font-medium text-gray-800">{name}</span>
        </div>
        <div className="mt-1 text-gray-500">{value}명</div>
      </div>
    );
  }
  return null;
};

export const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length > 0) {
    return (
      <div className="rounded-md border bg-white px-3 py-2 text-sm shadow-md">
        <p className="mb-1 font-medium text-gray-800">{label}</p>
        {payload.map((entry: any, idx: number) => {
          const { name, value, color } = entry;
          return (
            <div key={idx} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
                <span className="text-gray-800">{name}</span>
              </div>
              <span className="text-gray-500">{value}일</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};
