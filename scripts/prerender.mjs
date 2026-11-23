// Writes the server-rendered page into dist/index.html after both Vite builds.
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const indexPath = `${root}dist/index.html`;
const serverEntry = pathToFileURL(`${root}dist-ssr/entry-server.js`).href;

const { render } = await import(serverEntry);
const template = await readFile(indexPath, "utf8");
const placeholder = '<div id="root"></div>';

if (!template.includes(placeholder)) {
  throw new Error(`Expected ${placeholder} in dist/index.html`);
}

await writeFile(
  indexPath,
  template.replace(placeholder, `<div id="root">${render()}</div>`),
);
await rm(`${root}dist-ssr`, { recursive: true, force: true });
