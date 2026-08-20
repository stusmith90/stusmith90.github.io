import { useEffect } from "react";

/**
 * Publishes the pointer position as CSS custom properties so the ambient
 * backdrop can follow it without React re-rendering on pointer movement.
 */
export function useAmbientPointer(prefersReducedMotion: boolean) {
  useEffect(() => {
    const root = document.documentElement;

    const write = (x: number, y: number) => {
      root.style.setProperty("--pointer-x", x.toFixed(4));
      root.style.setProperty("--pointer-y", y.toFixed(4));
    };

    if (prefersReducedMotion) {
      write(0.5, 0.5);
      return;
    }

    let frame = 0;
    let pendingX = 0.5;
    let pendingY = 0.5;

    const flush = () => {
      frame = 0;
      write(pendingX, pendingY);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      pendingX = event.clientX / window.innerWidth;
      pendingY = event.clientY / window.innerHeight;

      if (frame === 0) {
        frame = window.requestAnimationFrame(flush);
      }
    };

    const reset = () => {
      pendingX = 0.5;
      pendingY = 0.5;

      if (frame === 0) {
        frame = window.requestAnimationFrame(flush);
      }
    };

    write(0.5, 0.5);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("blur", reset);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", reset);
    };
  }, [prefersReducedMotion]);
}
