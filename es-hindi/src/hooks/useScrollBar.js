import { useState, useCallback, useEffect } from "react";

export default function useScrollBar(isUp = false) {
    const [scrollUp, setScrollUp] = useState(true);
    const [scroll, setScroll] = useState(0);

    const handleScroll = useCallback(({ currentTarget }) => {
      const window = currentTarget;
      if(isUp) {
        if(scroll > window.scrollY) {
          setScrollUp(true);
        } else if(scroll < window.scrollY) {
          setScrollUp(false);
        } else {
          setScrollUp(true);
        }
      }
      setScroll(window.scrollY);
    }, [scroll]);

    useEffect(() => {
      setScroll(window.scrollY);
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    });

    return [scroll, scrollUp];
}
