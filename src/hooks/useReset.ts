import { useEffect } from "react";

const useReset = (timeout: number, callback: () => void, deps: any[]) => {
  useEffect(() => {
    const func = setTimeout(() => {
      callback();
    }, timeout);

    return () => clearTimeout(func);
  }, deps);
};

export default useReset;
