import { type PointerEvent as ReactPointerEvent } from "react";

/**
 * Tilts a surface towards the pointer by writing CSS custom properties; the
 * easing lives in the stylesheet, so React never re-renders on pointer movement.
 */
export function useInteractiveSurface(prefersReducedMotion: boolean) {
  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") {
      return;
    }

    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const xRatio = (event.clientX - bounds.left) / bounds.width - 0.5;
    const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;

    element.style.setProperty("--tilt-x", `${(yRatio * -6).toFixed(2)}deg`);
    element.style.setProperty("--tilt-y", `${(xRatio * 8).toFixed(2)}deg`);
    element.style.setProperty("--shift-x", `${(xRatio * 12).toFixed(1)}px`);
    element.style.setProperty("--shift-y", `${(yRatio * 10).toFixed(1)}px`);
  };

  const resetSurface = (event: ReactPointerEvent<HTMLElement>) => {
    for (const property of ["--tilt-x", "--tilt-y", "--shift-x", "--shift-y"]) {
      event.currentTarget.style.removeProperty(property);
    }
  };

  return prefersReducedMotion
    ? {}
    : { onPointerMove: handlePointerMove, onPointerLeave: resetSurface };
}
