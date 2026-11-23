import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import {
  contactEmail,
  cvRequestHref,
  githubUrl,
  sectionLinks,
} from "../content";

const openEventName = "command-palette:open";

/** Opens the palette from anywhere, such as a visible button, without threading state through the tree. */
export function openCommandPalette() {
  window.dispatchEvent(new Event(openEventName));
}

type PaletteCommand = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

function jumpTo(id: string) {
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  target.scrollIntoView({ block: "start" });
  // Moves focus with the view so keyboard and screen-reader users land in the section too.
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listId = useId();

  const commands = useMemo<PaletteCommand[]>(
    () => [
      ...sectionLinks.map((section) => ({
        id: `go-${section.id}`,
        label: `Go to ${section.label}`,
        hint: "Section",
        run: () => jumpTo(section.id),
      })),
      {
        id: "cv",
        label: "Request the full CV",
        hint: "Email",
        run: () => {
          window.location.href = cvRequestHref;
        },
      },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: "Email",
        run: () => {
          // Clipboard access can be refused; the email command below is the fallback.
          void navigator.clipboard?.writeText(contactEmail).catch(() => {});
        },
      },
      {
        id: "email",
        label: `Email ${contactEmail}`,
        hint: "Email",
        run: () => {
          window.location.href = `mailto:${contactEmail}`;
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "Link",
        run: () => {
          window.open(githubUrl, "_blank", "noopener,noreferrer");
        },
      },
    ],
    [],
  );

  const normalisedQuery = query.trim().toLowerCase();
  const visible = normalisedQuery
    ? commands.filter((command) =>
        command.label.toLowerCase().includes(normalisedQuery),
      )
    : commands;

  useEffect(() => {
    const open = () => {
      const dialog = dialogRef.current;

      if (!dialog || dialog.open) {
        return;
      }

      setQuery("");
      setActiveIndex(0);
      dialog.showModal();
      inputRef.current?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        open();
      }
    };

    const dialog = dialogRef.current;
    // A click landing on the dialog element itself, rather than its contents, is a click on the backdrop.
    const closeOnBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) {
        dialog?.close();
      }
    };

    dialog?.addEventListener("click", closeOnBackdrop);
    window.addEventListener(openEventName, open);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog?.removeEventListener("click", closeOnBackdrop);
      window.removeEventListener(openEventName, open);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const runCommand = (command: PaletteCommand) => {
    dialogRef.current?.close();
    command.run();
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (visible.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % visible.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (current) => (current - 1 + visible.length) % visible.length,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = visible[Math.min(activeIndex, visible.length - 1)];

      if (command) {
        runCommand(command);
      }
    }
  };

  const activeCommand = visible[Math.min(activeIndex, visible.length - 1)];

  return (
    <dialog ref={dialogRef} className="palette" aria-label="Quick navigation">
      <div className="palette-inner">
        <input
          ref={inputRef}
          className="palette-input"
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={
            activeCommand ? `${listId}-${activeCommand.id}` : undefined
          }
          aria-label="Search sections and actions"
          placeholder="Jump to a section or get in touch…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleInputKeyDown}
        />
        <div id={listId} className="palette-list" role="listbox">
          {visible.map((command) => {
            const isActive = command === activeCommand;

            return (
              // Keyboard selection happens on the combobox input through aria-activedescendant, so options take clicks only.
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                key={command.id}
                tabIndex={-1}
                id={`${listId}-${command.id}`}
                role="option"
                aria-selected={isActive}
                className={`palette-option ${isActive ? "is-active" : ""}`}
                onClick={() => runCommand(command)}
                onMouseMove={() => setActiveIndex(visible.indexOf(command))}
              >
                <span>{command.label}</span>
                <span className="palette-hint">{command.hint}</span>
              </div>
            );
          })}
          {visible.length === 0 ? (
            <p className="palette-empty">
              Nothing matches. Try “contact” or “work”.
            </p>
          ) : null}
        </div>
        <p className="palette-foot" aria-hidden="true">
          ↑↓ to move · Enter to open · Esc to close
        </p>
      </div>
    </dialog>
  );
}
