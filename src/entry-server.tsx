import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import App from "./App";

/** Renders the page to HTML at build time, so content is present before any script runs. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
