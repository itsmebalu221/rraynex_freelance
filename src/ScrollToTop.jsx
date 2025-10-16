import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const STORAGE_PREFIX = "scroll-pos:";

function ScrollToTop() {
  const { pathname } = useLocation();
  const previousPathRef = useRef(pathname);
  const isInitialRenderRef = useRef(true);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || typeof sessionStorage === "undefined") return;

    const keyFor = (path) => `${STORAGE_PREFIX}${path}`;

    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      const storedPosition = sessionStorage.getItem(keyFor(pathname));
      const targetY = storedPosition !== null ? Number(storedPosition) : 0;
      window.scrollTo(0, Number.isNaN(targetY) ? 0 : targetY);
      previousPathRef.current = pathname;
      return;
    }

    const previousPath = previousPathRef.current;
    sessionStorage.setItem(keyFor(previousPath), String(window.scrollY));

    previousPathRef.current = pathname;

    const storedPosition = sessionStorage.getItem(keyFor(pathname));
    const targetY = storedPosition !== null ? Number(storedPosition) : 0;
    window.scrollTo(0, Number.isNaN(targetY) ? 0 : targetY);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
