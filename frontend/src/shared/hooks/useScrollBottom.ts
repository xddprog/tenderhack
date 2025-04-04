import { useLayoutEffect, useRef } from "react";

export const useScrollBottom = <T>(deps: Array<T>) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, deps);

  return {
    contentRef,
  };
};
