import type { ElementType, ReactNode } from "react";

import { useReveal } from "../hooks/useReveal";

type RevealProps = {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
} & Record<string, unknown>;

/**
 * Wraps content in the shared scroll-reveal contract: the `reveal` class holds
 * the resting (hidden) state and `is-revealed` releases it. The transition lives
 * in CSS so it is switched off wholesale by the reduced-motion media query.
 */
export function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
  ...rest
}: RevealProps) {
  const { ref, hasRevealed } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal ${hasRevealed ? "is-revealed" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
