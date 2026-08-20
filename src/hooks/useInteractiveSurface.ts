import { useSpring } from "@react-spring/web";
import { useEffect, type PointerEvent as ReactPointerEvent } from "react";

export function useInteractiveSurface(prefersReducedMotion: boolean) {
  const [surfaceSpring, surfaceApi] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    x: 0,
    y: 0,
    config: { tension: 210, friction: 24 },
  }));

  useEffect(() => {
    if (!prefersReducedMotion) {
      return;
    }

    surfaceApi.start({ rotateX: 0, rotateY: 0, x: 0, y: 0, immediate: true });
  }, [prefersReducedMotion, surfaceApi]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || event.pointerType === "touch") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const xRatio = (event.clientX - bounds.left) / bounds.width - 0.5;
    const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;

    surfaceApi.start({
      rotateX: yRatio * -6,
      rotateY: xRatio * 8,
      x: xRatio * 12,
      y: yRatio * 10,
    });
  };

  const resetSurface = () => {
    surfaceApi.start({ rotateX: 0, rotateY: 0, x: 0, y: 0 });
  };

  return {
    surfaceSpring,
    interactiveProps: prefersReducedMotion
      ? {}
      : { onPointerMove: handlePointerMove, onPointerLeave: resetSurface },
  };
}
