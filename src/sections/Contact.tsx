import { useEffect, useRef, useState } from "react";

import { contactEmail, githubUrl } from "../content";
import { Reveal } from "./Reveal";

export function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(resetTimer.current);
    },
    [],
  );

  const handleCopy = async () => {
    window.clearTimeout(resetTimer.current);

    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyState("copied");
    } catch {
      // Clipboard access is refused in some browsers and non-secure contexts;
      // the adjacent mailto link is always available as the fallback route.
      setCopyState("failed");
    }

    resetTimer.current = window.setTimeout(() => setCopyState("idle"), 2600);
  };

  return (
    <footer className="section section-ink section-contact" id="contact">
      <Reveal as="div" className="contact-inner">
        <p className="eyebrow">Contact</p>
        <h2>
          If any of this lines up with what you are building, I would like to
          hear about it.
        </h2>
        <p className="section-lede">
          Happy to talk about work across the stack, regulated or
          high-consequence products, or anything sitting awkwardly between the
          front end and the infrastructure.
        </p>

        <div className="contact-email">
          <a className="contact-email-link" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          <button
            type="button"
            className="contact-copy"
            onClick={handleCopy}
            aria-label={`Copy email address ${contactEmail} to clipboard`}
          >
            {copyState === "copied" ? "Copied" : "Copy"}
          </button>
        </div>

        <p className="contact-status" role="status" aria-live="polite">
          {copyState === "copied"
            ? "Email address copied to clipboard."
            : copyState === "failed"
              ? "Could not copy automatically — use the email link instead."
              : ""}
        </p>

        <div className="contact-links">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            github.com/stusmith90
          </a>
        </div>
      </Reveal>
    </footer>
  );
}
