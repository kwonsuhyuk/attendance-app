import React, { useState } from "react";
import { TVacationRequest } from "@/model/types/vacation.type";
import EmployeeVacationDetailModal from "@/components/common/modal/EmployeeVacationDetailModal";

interface Props {
  request: TVacationRequest;
  icon: React.ReactNode;
  label: string;
  textColor: string;
  start: string;
  end: string;
  isSameDay: boolean;
}

const EmployeeVacationItem = ({
  request,
  icon,
  label,
  textColor,
  start,
  end,
  isSameDay,
}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div
        key={request.requestId}
        className="flex cursor-pointer items-center justify-between rounded-md px-4 py-2 text-sm shadow-md hover:bg-muted"
        onClick={() => setModalOpen(true)}
      >
        <div className="flex flex-col">
          <span className="font-medium text-foreground">
            {request.vacationType} | {isSameDay ? start : `${start} ~ ${end}`}
          </span>
          <span className="text-xs text-muted-foreground">{request.reason}</span>
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${textColor}`}>
          {icon}
          {label}
        </div>
      </div>
      <EmployeeVacationDetailModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        request={request}
        start={start}
        end={end}
        isSameDay={isSameDay}
        label={label}
      />
    </>
  );
};

export default EmployeeVacationItem;
