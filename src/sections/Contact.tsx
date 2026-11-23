import { useEffect, useRef, useState } from "react";

import { contactEmail, cvRequestHref, githubUrl } from "../content";
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
    <section className="section section-ink section-contact" id="contact">
      <Reveal as="div" className="contact-inner">
        <p className="eyebrow">Contact</p>
        <h2>Hiring for a senior full-stack role? Email me for the CV.</h2>
        <p className="section-lede">
          In any industry, particularly where the details have consequences and
          the team cares how software is built.
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
          <a href={cvRequestHref}>Request the full CV</a>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            github.com/stusmith90
          </a>
        </div>
      </Reveal>
    </section>
  );
}
