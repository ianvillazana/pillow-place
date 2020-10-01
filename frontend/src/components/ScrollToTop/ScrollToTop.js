import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Component's purpose is to scroll page back to the top when routing.

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
