import { useEffect, useRef, useState } from "react";

/**
 * Adds a one-way "has entered the viewport" flag for scroll reveals. One-way is
 * deliberate: re-hiding content the reader has already passed makes scrolling
 * back up feel broken.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.18,
) {
  const ref = useRef<T | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || hasRevealed) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setHasRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasRevealed, threshold]);

  return { ref, hasRevealed };
}
