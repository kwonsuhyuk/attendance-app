import { useEffect, useState } from "react";
import { format } from "date-fns";

export const useCurrentTime = (
  active: boolean = true,
  formatTime: string = "yyyy-MM-dd HH:mm:ss",
) => {
  const [currentTime, setCurrentTime] = useState(() => format(new Date(), formatTime));

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), formatTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [active, formatTime]);

  return currentTime;
};
