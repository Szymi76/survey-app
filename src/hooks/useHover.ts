import { useState, useEffect } from "react";

const useHover = (id: string) => {
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      setHover(true);
    };
    const handleMouseLeave = (e: MouseEvent) => {
      setHover(false);
    };

    const element = document.getElementById(id);
    if (!element) return;

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return { hover } as const;
};

export default useHover;
