import { useCallback, useEffect } from "react";

export default function useClickOutside(refs, handler) {
  const listener = useCallback(
    (e) => {
      let outside = true;
      for (let ref of refs) {
        const el = ref?.current;
        if (el && el.contains(e.target)) {
          outside = false;
          break;
        }
      }
      if (outside) {
        handler();
      }
    },
    [refs, handler]
  );
  useEffect(() => {
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [listener]);
}
