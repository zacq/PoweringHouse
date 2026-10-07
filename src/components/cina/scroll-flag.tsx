"use client";

import { useEffect } from "react";

/** Marks <html data-cina-scrolled> once the page leaves the top, so the CINA menu bar can compact. */
export function ScrollFlag() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      if (window.scrollY > 24) root.dataset.cinaScrolled = "";
      else delete root.dataset.cinaScrolled;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      delete root.dataset.cinaScrolled;
    };
  }, []);
  return null;
}
