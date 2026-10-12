"use client";

import { useEffect } from "react";

/**
 * Marks <html data-cina-scrolled> once the page leaves the top, so the CINA menu bar can compact.
 * Hysteresis (on past 80px, off under 8px) and change-only writes stop it from toggling back and
 * forth when the bar's own height change moves the page.
 */
export function ScrollFlag() {
  useEffect(() => {
    const root = document.documentElement;
    let on = false;
    const update = () => {
      const y = window.scrollY;
      if (!on && y > 80) {
        on = true;
        root.dataset.cinaScrolled = "";
      } else if (on && y < 8) {
        on = false;
        delete root.dataset.cinaScrolled;
      }
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
