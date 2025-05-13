import { useBlocker } from "react-router-dom";
import { useEffect } from "react";

export const useFormBlocker = (when: boolean) => {
  const blocker = useBlocker(when);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirmLeave = window.confirm(
        "변경사항이 저장되지 않았습니다. 페이지를 벗어나시겠습니까?",
      );
      if (confirmLeave) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);
};
